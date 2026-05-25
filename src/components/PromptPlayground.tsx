import { useState, useEffect } from "react";
import { PromptTemplate } from "../types";
import { Sparkles, Terminal, Play, RotateCcw, Copy, Check, MessageSquare, Loader2, Info, HelpCircle } from "lucide-react";

interface PromptPlaygroundProps {
  initialTemplate?: PromptTemplate;
  initialValues?: Record<string, string>;
}

export default function PromptPlayground({ initialTemplate, initialValues }: PromptPlaygroundProps) {
  const [model, setModel] = useState("gemini-3.5-flash");
  const [promptText, setPromptText] = useState("");
  const [rawToOptimize, setRawToOptimize] = useState("");
  
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [apiOutput, setApiOutput] = useState("");

  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [quotaErrorDetail, setQuotaErrorDetail] = useState<{
    code: string;
    message: string;
    suggestedModel: string;
  } | null>(null);

  const [hasApiKey, setHasApiKey] = useState<boolean | null>(null);

  // Check server API config status
  useEffect(() => {
    fetch("/api/gemini/status")
      .then((res) => res.json())
      .then((data) => setHasApiKey(data.hasKey))
      .catch(() => setHasApiKey(false));
  }, []);

  // Update when template is selected from recommendations or card grids
  useEffect(() => {
    if (initialTemplate) {
      let text = initialTemplate.template;
      // Replaced with initial custom values
      (initialTemplate.parameters || []).forEach((param) => {
        const val = initialValues?.[param.label] ?? param.defaultValue;
        const placeholder = param.tag || `[${param.label}]`;

        text = text.replaceAll(placeholder, val);
      });
      setPromptText(text);

      // Scroll view indicator
      setErrorText("");
    }
  }, [initialTemplate, initialValues]);

  // Handle auto optimization through server API
  const handleOptimizeType = async () => {
    if (!rawToOptimize.trim()) return;
    setIsOptimizing(true);
    setErrorText("");
    try {
      const response = await fetch("/api/gemini/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawPrompt: rawToOptimize,
          targetModel: model === "gemini-3.5-flash" ? "Gemini 1.5" : "Claude 3.5",
        }),
      });
      const data = await response.json();
      if (response.ok && data.optimized) {
        setPromptText(data.optimized);
      } else {
        setErrorText(data.error || "Gagal mengoptimalkan prompt.");
      }
    } catch (e: any) {
      setErrorText("Gagal tersambung ke server optimasi Sliced.");
    } finally {
      setIsOptimizing(false);
    }
  };

  // Run the prompt through proxy endpoint with smart quota catching
  const handleRunExecution = async () => {
    if (!promptText.trim()) return;
    setIsRunning(true);
    setErrorText("");
    setQuotaErrorDetail(null);
    setApiOutput("");
    try {
      const response = await fetch("/api/gemini/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          model: model,
        }),
      });
      const data = await response.json();
      if (response.ok && data.output) {
        setApiOutput(data.output);
        setQuotaErrorDetail(null);
      } else {
        const isQuota = 
          response.status === 429 || 
          data.code === "RESOURCE_EXHAUSTED" || 
          (data.error && (
            data.error.toLowerCase().includes("quota") || 
            data.error.toLowerCase().includes("exhausted") ||
            data.error.toLowerCase().includes("429")
          ));
        if (isQuota) {
          setQuotaErrorDetail({
            code: data.code || "RESOURCE_EXHAUSTED",
            message: data.message || "Model Pro membutuhkan saldo/kunci API berbayar atau batas kuota harian gratis Anda habis.",
            suggestedModel: data.suggestedModel || "gemini-3.5-flash"
          });
          setErrorText("");
        } else {
          setErrorText(data.error || "Gagal menjalankan prompt.");
          setQuotaErrorDetail(null);
        }
      }
    } catch (e: any) {
      setErrorText("Gagal tersambung ke API. Pastikan server dev aktif.");
      setQuotaErrorDetail(null);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSwitchToFlashAndRetry = async () => {
    setModel("gemini-3.5-flash");
    setQuotaErrorDetail(null);
    setErrorText("");
    setIsRunning(true);
    setApiOutput("");
    
    try {
      const response = await fetch("/api/gemini/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          model: "gemini-3.5-flash",
        }),
      });
      const data = await response.json();
      if (response.ok && data.output) {
        setApiOutput(data.output);
      } else {
        setErrorText(data.error || "Gagal menjalankan prompt menggunakan Gemini 3.5 Flash.");
      }
    } catch (e: any) {
      setErrorText("Gagal tersambung ke API. Pastikan server dev aktif.");
    } finally {
      setIsRunning(false);
    }
  };

  const copyPromptText = () => {
    navigator.clipboard.writeText(promptText);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const copyResponseText = () => {
    navigator.clipboard.writeText(apiOutput);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2000);
  };

  return (
    <section id="prompt-playground" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center md:text-left max-w-3xl mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 border border-indigo-150 px-3 py-1.5 rounded-full inline-block">
            SLICED PLAYGROUND
          </span>
          <h2 className="font-display text-3xl font-extrabold text-gray-900 mt-4 tracking-tight leading-tight">
            Playground &amp; Compiler Prompt
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Isikan ide kasar prompt Anda untuk diiris otomatis (slice), sesuaikan hasil draf, lalu jalankan langsung melalui model Gemini untuk melihat hasil kognitif berpresisi tinggi.
          </p>
        </div>

        {/* Dynamic Warning if API key is missing */}
        {hasApiKey === false && (
          <div className="mb-8 p-4 bg-amber-50 rounded-2xl border border-amber-200 text-sm text-amber-800 flex items-start gap-3">
            <Info className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
            <div>
              <p className="font-bold font-display">Kunci API Gemini tidak ditemukan!</p>
              <p className="text-xs text-amber-700/95 mt-1">
                Kunci API (GEMINI_API_KEY) belum terpasang di panel pengaturannya. Anda masih dapat merancang draf dan menyalin hasil prompt, namun tombol 'Uji Live' akan memunculkan error. Untuk mengaktifkannya, buka panel <strong>Settings &gt; Secrets</strong> di AI Studio Anda.
              </p>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Slicer inputs & Prompt editor */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Auto Slice Optimizer Input */}
            <div className="p-6 rounded-3xl border border-gray-200 bg-gray-50/50 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <h3 className="font-display font-bold text-sm text-gray-900">
                  Optimasi Instan Sliced Prompt
                </h3>
              </div>
              <p className="text-xs text-slate-500 leading-normal">
                Ketik gagasan dasar Anda di bawah (misal: "buat draf review makanan") lalu klik tombol optimasikan untuk mengubahnya menjadi blueprint presisi modular.
              </p>
              <div className="relative">
                <textarea
                  placeholder="Ketik target output Anda di sini untuk penataan presisi..."
                  value={rawToOptimize}
                  onChange={(e) => setRawToOptimize(e.target.value)}
                  disabled={isOptimizing}
                  rows={3}
                  className="w-full rounded-2xl border border-gray-300 p-4 font-sans text-xs focus:outline-hidden focus:ring-1 focus:ring-black focus:border-black bg-white"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleOptimizeType}
                  disabled={isOptimizing || !rawToOptimize.trim()}
                  className="flex items-center gap-2 bg-black hover:bg-gray-950 disabled:bg-gray-100 disabled:text-gray-400 text-white font-mono text-[11px] font-bold uppercase h-10 px-6 rounded-full transition-all active:scale-[0.98]"
                >
                  {isOptimizing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Sedang Mengiris...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Optimasi &amp; Slice Prompt
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Prompt Draft Workspace Editor */}
            <div className="p-6 rounded-3xl border border-gray-200 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-indigo-600" />
                  <h3 className="font-display font-bold text-sm text-gray-900">
                    Draft Workspace (Edit Manual)
                  </h3>
                </div>

                <div className="flex flex-col items-end gap-1.5 md:flex-row md:items-center">
                  <label className="text-[10px] font-mono leading-none text-gray-400 font-bold uppercase">Model Uji:</label>
                  <select
                    value={model}
                    onChange={(e) => {
                      setModel(e.target.value);
                      setQuotaErrorDetail(null);
                      setErrorText("");
                    }}
                    className="bg-gray-100 border border-gray-200 rounded-lg py-1 px-2.5 text-xs font-mono font-bold outline-hidden cursor-pointer"
                  >
                    <option value="gemini-3.5-flash">Gemini 3.5 Flash (Gratis ✨)</option>
                    <option value="gemini-3.1-pro-preview">Gemini 3.1 Pro (Heavy 🔒)</option>
                  </select>
                </div>
              </div>

              {model === "gemini-3.1-pro-preview" && (
                <div className="text-[10px] text-amber-700 bg-amber-50/70 border border-amber-150 px-3 py-1.5 rounded-xl flex items-center gap-1.5 animate-fade-in font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>Model Pro membutuhkan Kunci API berbayar. Gunakan <strong>Gemini 3.5 Flash</strong> untuk bebas kuota.</span>
                </div>
              )}

              <div className="relative">
                <textarea
                  placeholder="Draf template prompt yang sudah dioptimasi akan muncul di sini. Anda juga bisa menulis atau mengeditnya secara manual..."
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  disabled={isRunning}
                  rows={8}
                  className="w-full rounded-2xl border border-gray-300 p-4 font-mono text-xs focus:outline-hidden focus:ring-1 focus:ring-black focus:border-black bg-white leading-relaxed"
                />
              </div>

              {/* Reset & action buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setPromptText("")}
                  className="text-xs font-mono font-bold text-gray-400 hover:text-black flex items-center gap-1 uppercase"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Bersihkan Draf
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={copyPromptText}
                    className={`font-mono text-[11px] font-bold h-10 px-5 rounded-full flex items-center gap-1.5 transition-all outline-hidden active:scale-95 ${
                      copiedPrompt ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 hover:bg-gray-200 text-gray-800"
                    }`}
                  >
                    {copiedPrompt ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Salin Prompt
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleRunExecution}
                    disabled={isRunning || !promptText.trim()}
                    className="flex items-center gap-2 bg-black hover:bg-gray-900 disabled:bg-gray-100 disabled:text-gray-400 text-white font-mono text-[11px] font-bold uppercase h-10 px-6 rounded-full transition-all tracking-wider font-semibold shadow-xs active:scale-[0.98]"
                  >
                    {isRunning ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        Sedang Menguji...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400" />
                        Uji Live dengan Gemini
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Alert Box inside playground */}
              {errorText && (
                <div className="p-3 bg-red-50 text-red-700 font-mono text-xs rounded-xl border border-red-150">
                  [Sistem Gagal]: {errorText}
                </div>
              )}

              {/* Advanced Quota Exceeded Friendly Action Card */}
              {quotaErrorDetail && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs space-y-3 animate-fade-in shadow-2xs">
                  <div className="flex items-start gap-2 text-amber-800">
                    <Info className="w-4.5 h-4.5 shrink-0 text-amber-600 mt-0.5" />
                    <div className="space-y-1">
                      <p className="font-bold font-display">Batas Kuota Berbayar Terlampaui ({quotaErrorDetail.code})</p>
                      <p className="text-amber-700/90 leading-relaxed font-sans mt-0.5">
                        Anda saat ini berada pada plan free tier, atau model <strong>Gemini 3.1 Pro (Heavy)</strong> memerlukan kunci API premium karena limit akun yang habis.
                      </p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-amber-100 flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10px] text-amber-600/90 font-mono font-medium">Rekomendasi: Alihkan ke model free-tier gratis.</span>
                    <button
                      onClick={handleSwitchToFlashAndRetry}
                      className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-mono text-[10px] font-extrabold uppercase rounded-lg transition-all shadow-2xs active:scale-95"
                    >
                      ⚡ Ganti ke Gemini 3.5 Flash &amp; Coba Lagi
                    </button>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Right Column: Dynamic Live Response Outputs */}
          <div className="lg:col-span-5 h-full">
            <div className="p-6 rounded-3xl border border-gray-200 bg-slate-50/50 min-h-[480px] flex flex-col justify-between shadow-2xs h-full">
              
              <div className="space-y-4 flex-1">
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-indigo-600" />
                    <h3 className="font-display font-bold text-sm text-gray-900">
                      Uji Respons Kognitif AI
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-sm font-bold uppercase tracking-wider">
                    Output Panel
                  </span>
                </div>

                {/* Simulated Loading or output response */}
                {isRunning ? (
                  <div className="py-24 text-center space-y-3">
                    <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mx-auto" />
                    <p className="text-xs text-gray-500 font-medium">Bekerja... Menjalankan pengujian prompt modular...</p>
                  </div>
                ) : apiOutput ? (
                  <div className="space-y-3 animate-fade-in">
                    <div className="p-4 rounded-xl bg-white border border-gray-200 overflow-x-auto text-xs font-mono text-gray-800 whitespace-pre-wrap leading-relaxed max-h-[380px]">
                      {apiOutput}
                    </div>
                  </div>
                ) : (
                  <div className="py-20 text-center space-y-3 border-2 border-dashed border-gray-200 rounded-2xl bg-white px-4">
                    <HelpCircle className="w-8 h-8 text-gray-300 mx-auto" />
                    <p className="text-xs text-gray-500 font-medium max-w-xs mx-auto">
                      Belum ada eksekusi uji coba. Klik tombol "Uji Live" untuk memicu pemanggilan generator.
                    </p>
                  </div>
                )}
              </div>

              {apiOutput && (
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    onClick={copyResponseText}
                    className={`font-mono text-[10px] font-bold h-8 px-4 rounded-lg flex items-center gap-1.5 transition-all outline-hidden ${
                      copiedResponse ? "bg-emerald-100 text-emerald-800" : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    {copiedResponse ? (
                      <>
                        <Check className="w-3 h-3" />
                        Tersalin!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        Salin Hasil Keluaran
                      </>
                    )}
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

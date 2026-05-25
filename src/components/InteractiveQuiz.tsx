import { useState } from "react";
import { quizQuestions, promptTemplates } from "../data";
import { PromptTemplate } from "../types";
import { Check, Clipboard, Sparkles, Building2, GraduationCap, Code, ArrowRight, Table, FileText, Settings, HelpCircle, ArrowLeft } from "lucide-react";

interface InteractiveQuizProps {
  onRecommendationSelect: (prompt: PromptTemplate) => void;
}

export default function InteractiveQuiz({ onRecommendationSelect }: InteractiveQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [copied, setCopied] = useState<string | null>(null);

  const handleSelectOption = (questionId: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final calculation step
      setCurrentStep(quizQuestions.length);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const resetQuiz = () => {
    setAnswers({});
    setCurrentStep(0);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "business_center":
        return <Building2 className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />;
      case "school":
        return <GraduationCap className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />;
      case "code":
        return <Code className="w-6 h-6 text-black group-hover:scale-110 transition-transform" />;
      case "table_chart":
        return <Table className="w-5 h-5 text-indigo-600" />;
      case "description":
        return <FileText className="w-5 h-5 text-indigo-600" />;
      case "account_tree":
        return <Settings className="w-5 h-5 text-indigo-600" />;
      case "bolt":
        return <span className="text-xl font-bold text-amber-500">⚡</span>;
      case "auto_awesome":
        return <Sparkles className="w-5 h-5 text-emerald-500" />;
      case "google":
        return <span className="text-xl font-bold text-blue-500">G</span>;
      default:
        return <HelpCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  // Find recommendations based on selections
  const getRecommendation = (): PromptTemplate => {
    const mainCategory = answers[1]; // Bisnis, Belajar, Pengembangan
    const preferredModel = answers[3]; // Claude 3.5, ChatGPT, Gemini Pro

    // Filter by matching criteria or find closest template
    const match = promptTemplates.find(
      (tpl) => 
        tpl.category === mainCategory && 
        (tpl.model === preferredModel || tpl.model.includes(preferredModel || "invalid"))
    );

    // Default to a gorgeous fallback if no exact intersection
    return match || promptTemplates.find((tpl) => tpl.category === mainCategory) || promptTemplates[0];
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const question = quizQuestions[currentStep];
  const selectedOption = question ? answers[question.id] : null;

  return (
    <section id="interactive-quiz" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        <div className="glass-card rounded-3xl p-6 sm:p-10 max-w-4xl mx-auto border border-gray-200/60 shadow-xs relative">
          
          {currentStep < quizQuestions.length ? (
            /* Quiz Active Step */
            <div className="space-y-8">
              <div className="text-center">
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#565e74]">
                  Panduan Interaktif
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900 mt-2">
                  {question.title}
                </h2>
                <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">
                  {question.subtitle}
                </p>
              </div>

              {/* Progress Bar (Dots / Line combined) */}
              <div className="flex justify-center items-center gap-2 max-w-xs mx-auto">
                {quizQuestions.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 rounded-full transition-all duration-350 ${
                      idx === currentStep
                        ? "w-10 bg-black"
                        : idx < currentStep
                        ? "w-4 bg-indigo-200"
                        : "w-4 bg-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Grid Options */}
              <div className="grid md:grid-cols-3 gap-4 md:gap-5">
                {question.options.map((opt) => {
                  const isSelected = selectedOption === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(question.id, opt.value)}
                      className={`group p-6 rounded-2xl border-2 text-left bg-white active:scale-[0.98] transition-all relative ${
                        isSelected
                          ? "border-black bg-slate-50 ring-1 ring-black shadow-xs"
                          : "border-gray-200 hover:border-black/50 hover:bg-gray-50/40"
                      }`}
                    >
                      {/* Check icon indicating custom selected states */}
                      {isSelected && (
                        <div className="absolute top-4 right-4 w-5 h-5 bg-black rounded-full flex items-center justify-center text-white">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}

                      <div className="mb-4 bg-gray-50 group-hover:bg-indigo-50/50 w-12 h-12 rounded-xl flex items-center justify-center border border-gray-100 transition-colors">
                        {getIcon(opt.icon)}
                      </div>

                      <div className="font-bold text-gray-900 font-display text-base mb-1">
                        {opt.label}
                      </div>
                      <div className="text-xs text-gray-500 leading-relaxed font-sans mt-1">
                        {opt.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className={`text-sm font-semibold flex items-center gap-1.5 px-4 py-2 rounded-xl ${
                    currentStep === 0
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:text-black hover:bg-gray-100"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Sebelumnya
                </button>

                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className={`px-8 h-12 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all active:scale-[0.98] ${
                    selectedOption
                      ? "bg-black hover:bg-gray-900 text-white shadow-sm"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {currentStep === quizQuestions.length - 1 ? "Lihat Rekomendasi" : "Langkah Selanjutnya"}
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                </button>
              </div>
            </div>
          ) : (
            /* Results Step */
            <div className="space-y-6">
              <div className="text-center max-w-xl mx-auto">
                <div className="inline-flex w-14 h-14 bg-indigo-50 border border-indigo-100 rounded-3xl items-center justify-center text-indigo-600 mb-4 animate-bounce">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-gray-900">
                  Rekomendasi Prompt Khusus Anda!
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Berdasarkan preferensi bidang, model, dan struktur output, tim kurator kami merekomendasikan template prompt presisi ini.
                </p>
              </div>

              {/* Recommendation card */}
              {(() => {
                const tpl = getRecommendation();
                return (
                  <div className="p-6 rounded-2xl border border-indigo-100 bg-indigo-50/15 max-w-2xl mx-auto space-y-4 shadow-xs">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-800 text-[10px] font-mono leading-none font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                        {tpl.model}
                      </span>
                      <span className="bg-black text-white text-[10px] font-mono leading-none font-bold px-2.5 py-1 rounded-full">
                        {tpl.difficulty}
                      </span>
                    </div>

                    <h4 className="font-display font-extrabold text-lg text-gray-900">
                      {tpl.title}
                    </h4>

                    <p className="text-sm text-gray-600 leading-relaxed font-sans">
                      {tpl.description}
                    </p>

                    <div className="relative">
                      <pre className="p-4 rounded-xl bg-white border border-indigo-100/60 overflow-x-auto text-xs text-gray-800 font-mono whitespace-pre-wrap max-h-48 leading-relaxed">
                        {tpl.template}
                      </pre>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        onClick={() => handleCopy(tpl.template, "result-tpl")}
                        className="flex-1 bg-black text-white hover:bg-gray-900 text-xs font-semibold h-11 px-4 rounded-full flex items-center justify-center gap-2 pb-0.5"
                      >
                        {copied === "result-tpl" ? (
                          <>
                            <Check className="w-4 h-4 text-emerald-400" />
                            Prompt Tersalin!
                          </>
                        ) : (
                          <>
                            <Clipboard className="w-4 h-4" />
                            Salin Prompt Rekomendasi
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => {
                          onRecommendationSelect(tpl);
                          const element = document.getElementById("prompt-playground");
                          if (element) {
                            element.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 text-xs font-semibold h-11 px-4 rounded-full flex items-center justify-center gap-2"
                      >
                        Sesuaikan &amp; Uji Live
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })()}

              <div className="text-center pt-4 border-t border-gray-100">
                <button
                  onClick={resetQuiz}
                  className="text-xs font-semibold hover:underline text-indigo-600 font-mono uppercase tracking-wider"
                >
                  Mulai Ulang Kuis Panduan
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

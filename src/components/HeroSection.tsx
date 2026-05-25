import { useState } from "react";
import { Search, Sparkles, X, ChevronRight, Play, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearchSubmit: () => void;
}

export default function HeroSection({ searchQuery, setSearchQuery, onSearchSubmit }: HeroSectionProps) {
  const [showDemoModal, setShowDemoModal] = useState(false);

  // Suggested quick outcome-based Indonesian terms
  const searchSuggestions = [
    { label: "📄 Buat CV ATS", term: "CV" },
    { label: "📑 Ringkas Dokumen", term: "Ringkas" },
    { label: "📊 Buat Presentasi", term: "Presentasi" },
    { label: "📱 Caption Instagram", term: "Instagram" },
    { label: "💬 Balas Chat Customer", term: "Chat" },
    { label: "🏪 Deskripsi Produk", term: "Deskripsi" },
    { label: "📋 Proposal Bisnis", term: "Proposal" },
    { label: "📹 Script Video TikTok", term: "Video" }
  ];

  const handleSuggestionClick = (term: string) => {
    setSearchQuery(term);
    // Smooth scroll down to workspace
    onSearchSubmit();
  };

  return (
    <section className="hero-gradient pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden relative">
      {/* Visual background atmospheric lights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-r from-indigo-500/10 to-rose-300/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center relative z-10">
        
        {/* Banner Badge Positioning - Premium Vibe */}
        <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100/80 px-4 py-2 rounded-full shadow-xs mb-8 animate-fade-in">
          <span className="flex -space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-white text-[9px] font-bold">1</span>
            <span className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center text-white text-[9px] font-bold">A</span>
            <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-[9px] font-bold">I</span>
          </span>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-wider font-extrabold text-indigo-700 uppercase">
            #1 ASISTEN PRODUKTIVITAS BERBASIS AI DI INDONESIA
          </span>
        </div>

        {/* GUIDELINE MANDATE: Headline & Subheadline translation */}
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 max-w-4xl mx-auto mb-6 tracking-tight leading-tight">
          Apa yang ingin Anda <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-650 via-indigo-800 to-slate-900">
            kerjakan hari ini?
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed font-sans font-medium">
          Gunakan template AI siap pakai untuk membantu pekerjaan, kuliah, bisnis, dan pembuatan konten hanya dalam hitungan detik.
        </p>

        {/* OUTCOME-BASED SEARCH CARTRIDGE */}
        <div className="max-w-2xl mx-auto bg-white p-2 rounded-2xl md:rounded-full border border-gray-250 shadow-md flex flex-col md:flex-row gap-2 items-stretch md:items-center relative">
          <div className="flex-1 flex items-center gap-3 pl-3 py-1">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              type="text"
              placeholder="Ketik cth: Buat CV, Ringkas PDF, Proposal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearchSubmit();
                }
              }}
              className="w-full bg-transparent border-0 ring-0 focus:outline-hidden font-sans text-xs sm:text-sm text-gray-800 font-semibold placeholder-gray-400"
            />
          </div>

          <div className="flex gap-2 shrink-0">
            <button
              onClick={() => setShowDemoModal(true)}
              className="py-2.5 px-4 font-semibold text-xs text-gray-600 hover:text-black rounded-lg md:rounded-full transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Lihat Demo</span>
            </button>
            <button
              onClick={onSearchSubmit}
              className="bg-indigo-650 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-lg md:rounded-full shadow-sm text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Temukan Template</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CLICKABLE SUGGESTION CHIPS */}
        <div className="mt-5 max-w-3xl mx-auto flex flex-wrap justify-center items-center gap-2">
          <span className="text-[11px] font-bold text-gray-400 font-mono uppercase tracking-wider mr-1">Contoh Pencarian:</span>
          {searchSuggestions.map((sug) => (
            <button
              key={sug.label}
              onClick={() => handleSuggestionClick(sug.term)}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-205 border border-slate-200/80 rounded-full text-xs font-semibold text-gray-700 transition-colors cursor-pointer"
            >
              {sug.label}
            </button>
          ))}
        </div>

        {/* BENEFIT TRUST METRICS */}
        <div className="mt-16 sm:mt-24 grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto border-t border-gray-250/60 pt-10 font-sans">
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 tracking-tight">10K+</div>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider font-extrabold text-gray-450 uppercase mt-1">PENGGUNA INDONESIA</p>
          </div>
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 tracking-tight">100%</div>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider font-extrabold text-gray-450 uppercase mt-1">SIAP PAKAI &amp; BEBAS FORMULA</p>
          </div>
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 tracking-tight">2 Detik</div>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider font-extrabold text-gray-450 uppercase mt-1">PENGALAMAN HASIL INSTAN</p>
          </div>
          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-extrabold font-display text-gray-900 tracking-tight">Bebas</div>
            <p className="text-[10px] sm:text-xs font-mono tracking-wider font-extrabold text-gray-450 uppercase mt-1">AKSES FORMULA TANPA DAFTAR</p>
          </div>
        </div>

      </div>

      {/* Demo Video Modal Explanation */}
      {showDemoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-gray-100 shadow-2xl relative text-left animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowDemoModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 text-gray-400 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-bold text-gray-900 font-display">Bagaimana Sliced Memotong Hambatan AI?</h3>
                <p className="text-xs text-gray-500 font-mono">Banyak orang gagal memakai AI karena bingung menulis prompt. Sliced menyelesaikannya.</p>
              </div>
            </div>

            {/* Simulated interactive steps instead of a real video to make it extremely premium */}
            <div className="space-y-4 my-6 py-2 font-sans">
              <div className="p-4 rounded-xl bg-indigo-50/40 border border-indigo-100 space-y-2">
                <span className="text-[10px] font-mono bg-indigo-100 text-indigo-750 px-2.5 py-1 rounded-full font-bold">1. Input Form Sederhana</span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">Anda tidak perlu menulis: <em>"Tolong buat draf dengan formatting X dan persona Y"</em>. Cukup isi isian biasa seperti Nama, Goal, dan sapaan yang Anda inginkan.</p>
              </div>
              
              <div className="p-4 rounded-xl bg-orange-50/40 border border-orange-100 space-y-2">
                <span className="text-[10px] font-mono bg-orange-100 text-orange-850 px-2.5 py-1 rounded-full font-bold">2. Enkapsulasi Formula XML</span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">Sistem membungkus masukan Anda ke draf struktur prompt beralur XML super aman di belakang layar agar model LLM tidak salah interpretasi.</p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100 space-y-2">
                <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">3. Copy/Direct One-Click</span>
                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">Dapatkan salinan instan terstruktur dan gunakan langsung pada AI idola Anda lewat tombol shortcut instan kami.</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  setShowDemoModal(false);
                  onSearchSubmit();
                }}
                className="flex-1 bg-black text-white hover:bg-gray-900 text-xs py-3.5 rounded-xl font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-center"
              >
                Coba Template Siap Pakai Sekarang
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setShowDemoModal(false)}
                className="sm:px-6 bg-gray-105 hover:bg-gray-200 text-gray-750 text-xs py-3.5 rounded-xl font-bold transition-colors cursor-pointer"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

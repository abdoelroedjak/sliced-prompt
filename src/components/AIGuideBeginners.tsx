import { useState } from "react";
import { BookOpen, HelpCircle, AlertTriangle, Lightbulb, CheckCircle2, Copy, Search, ArrowRight, Star } from "lucide-react";

export default function AIGuideBeginners() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const tipsList = [
    {
      title: "📌 Berikan Peran Spesifik (Persona)",
      desc: "Jangan langsung menyuruh AI menulis tulisan. Katakan dulu siapa dia. Contoh: 'Bertindaklah sebagai spesialis rekrutmen HRD level Manajer senior.'",
      example: "Bertindak sebagai Copywriter iklan komersial kawakan yang mahir teknik persuasif AIDA."
    },
    {
      title: "📌 Beri Konteks Detil & Batasan",
      desc: "Katakan dengan tegas batasan tulisan Anda agar AI tidak menulis omong kosong berpanjang-panjang. Sebutkan target utama pendengar dan rentang usia.",
      example: "Format keluaran berupa 3 poin deskripsi pendek. Hindari pengulangan kata 'solusi instan' atau bahasa klise."
    },
    {
      title: "📌 Gunakan Struktur Pemotong (XML Tag)",
      desc: "Posisikan data mentah di dalam tanda kurung khusus atau tag seperti <data>...</data> agar AI paham bagian mana yang merupakan perintah dan mana yang merupakan isi isi masukan.",
      example: "Gunakan format tag: <pemberitahuan_error>{isi_error}</pemberitahuan_error> agar AI berfokus penuh."
    }
  ];

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="panduan-pemula" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0c1322] text-white overflow-hidden relative border-t border-slate-800">
      {/* Background radial soft colors */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Header Title Grid */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-8 border-b border-slate-800 text-left">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-mono bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-full uppercase tracking-wider font-extrabold leading-none">
              📘 HANDBOOK EDISI BAHASA INDONESIA (GRATIS)
            </span>
            <h2 className="font-display text-2xl sm:text-3.5xl font-extrabold tracking-tight">
              Panduan AI untuk Pemula Indonesia
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans font-medium">
              Panduan dasar praktis menguasai teknologi asisten kecerdasan buatan (Gemini, ChatGPT, Claude) secara taktis agar menghasilkan draf kerja berperingkat tinggi.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 px-4 py-2.5 rounded-2xl shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-mono font-bold text-slate-300">BAHASA INDONESIA FULL</span>
          </div>
        </div>

        {/* Dynamic Grid Sections */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          
          {/* Card 1: 3 Golden Rules of Prompt Selection */}
          <div className="bg-slate-900/45 border border-slate-800 rounded-3xl p-6 sm:p-7 text-left flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold font-display text-slate-100 uppercase tracking-wider">
                🌟 3 Aturan Emas Membuat Prompt
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                Patuhi prinsip di bawah ini setiap kali Anda mengetik manual pada antarmuka ChatGPT atau Gemini:
              </p>

              <div className="space-y-4 pt-1">
                {tipsList.map((tip, idx) => (
                  <div key={idx} className="space-y-1 bg-slate-950 p-3 rounded-xl border border-slate-800/80">
                    <h4 className="text-[11px] font-bold text-slate-200">{tip.title}</h4>
                    <p className="text-[10px] text-slate-400 leading-normal font-sans font-medium">{tip.desc}</p>
                    <div className="flex items-center justify-between text-[9px] bg-slate-900/85 p-1.5 rounded-md text-indigo-300 font-mono mt-1.5 select-none">
                      <span className="truncate mr-4 font-semibold italic">"{tip.example}"</span>
                      <button
                        onClick={() => handleCopyText(tip.example, idx)}
                        className="text-[9px] hover:text-white cursor-pointer transition-colors"
                      >
                        {copiedIndex === idx ? "Tersalin!" : "Salin"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-[10px] text-slate-500 font-mono">
              *Tips: Sliced membungkus semua formula di atas secara instan untuk Anda!
            </p>
          </div>

          {/* Card 2: Menghindari Halusinasi Jawaban AI */}
          <div className="bg-slate-900/45 border border-slate-800 rounded-3xl p-6 sm:p-7 text-left flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold font-display text-slate-100 uppercase tracking-wider">
                ⚠️ Tips Pencegahan Halusinasi AI
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                Kecerdasan buatan sering mengarang fakta fiktif. Lakukan 3 hal wajib berikut agar draf aman:
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex gap-3 items-start">
                  <span className="w-5 h-5 bg-indigo-950 border border-indigo-800/60 rounded-full flex items-center justify-center text-[10px] text-indigo-400 font-mono font-bold shrink-0 mt-0.5">1</span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-250">Instruksi "Jika Tidak Tahu, Katakan Tidak"</h4>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans font-medium">Tambahkan kalimat: <em>'Jika data pendukung tidak tersedia dalam teks acuan, katakan sejujurnya bahwa Anda tidak mengetahuinya.'</em> Hal ini memangkas kebohongan data hingga 90%.</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="w-5 h-5 bg-indigo-950 border border-indigo-800/60 rounded-full flex items-center justify-center text-[10px] text-indigo-400 font-mono font-bold shrink-0 mt-0.5">2</span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-250">Gunakan Grounding / Rujukan Teks</h4>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans font-medium">Beri asupan file draf atau salin jurnal referensi yang kredibel dan tulis: <em>'Gunakan HANYA informasi tepercaya di dalam dokumen ini sebagai sumber jawaban primer.'</em></p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <span className="w-5 h-5 bg-indigo-950 border border-indigo-800/60 rounded-full flex items-center justify-center text-[10px] text-indigo-400 font-mono font-bold shrink-0 mt-0.5">3</span>
                  <div className="space-y-0.5">
                    <h4 className="text-xs font-bold text-slate-250">Aturan Suhu Kreativitas (Temperature)</h4>
                    <p className="text-[11px] text-slate-400 leading-normal font-sans font-medium">Pada API atau setelan, pasang suhu rendah <em>(cth: Temperature 0.2 atau 0.3)</em> untuk perhitungan kaku faktual (angka, data akuntansi), dan pasang suhu tinggi <em>(cth: 0.8)</em> khusus naskah sastra atau ide fiksi saja.</p>
                  </div>
                </div>
              </div>
            </div>

            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Jaminan Mutu Akurasi Data Berorientasi Hasil
            </span>
          </div>

          {/* Card 3: Duet Aliansi AI Terbaik & Rahasianya */}
          <div className="bg-slate-900/45 border border-slate-800 rounded-3xl p-6 sm:p-7 text-left flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Lightbulb className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-extrabold font-display text-slate-100 uppercase tracking-wider">
                🤖 Panduan Memilih Model AI Yang Cocok
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                Pilih model kecerdasan buatan andalan Anda berdasarkan spesialisasi fungsional tugas:
              </p>

              <div className="space-y-3 pt-1">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="font-bold text-emerald-400">GOOGLE GEMINI 1.5</span>
                    <span className="text-slate-500">GRATIS &amp; CEPAT</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Terbaik untuk: Input Masif, Baca PDF &amp; Riset</h4>
                  <p className="text-[10px] text-slate-400 font-sans font-medium leading-relaxed">Sangat cocok untuk mencerna modul tebal ratusan halaman, rekaman suara rapat panjang, atau draf data tabel kompleks.</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono">
                    <span className="font-bold text-blue-400">CHATP_GPT (GPT-4o)</span>
                    <span className="text-slate-500">POPULER</span>
                  </div>
                  <h4 className="text-xs font-bold text-white">Terbaik untuk: Pemrograman, Email, Logika Umum</h4>
                  <p className="text-[10px] text-slate-400 font-sans font-medium leading-relaxed">Andal merumuskan outline komersial, proposal taktis, balasan keluhan pelanggan dengan nada ramah sapaan sopan.</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                document.getElementById("onboarding-pemula")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all text-center cursor-pointer font-sans"
            >
              Mulai Praktek Pakai Template
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

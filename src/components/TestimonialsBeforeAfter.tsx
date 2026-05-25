import { useState } from "react";
import { User, CheckCircle2, X, Star, ThumbsUp, ArrowRight, ShieldCheck } from "lucide-react";

export default function TestimonialsBeforeAfter() {
  const [activeTab, setActiveTab] = useState<"ats-cv" | "jualan-caption">("ats-cv");

  const comparisonData = {
    "ats-cv": {
      before: {
        prompt: "buat draf resume pemula sbg QA",
        output: "Nama saya Budi Santoso, umur 23 tahun. Saya lulusan Teknik Informatika. Saya punya pengalaman magang testing aplikasi selama 3 bulan di sebuah perusahaan di Jakarta. Saya menguasai dasar-dasar testing dan manual testing. Saya orangnya rajin dan pekerja keras...",
        resultText: "❌ Generik, miskin kata kerja aksi, tidak ada metrik pencapaian (angka), langsung dieliminasi sistem ATS HRD otomatis karena skor kata kunci rendah."
      },
      after: {
        prompt: "Sistem Formula Sliced ATS CV Builder",
        output: `### Budi Santoso, S.T. — QA Engineer
Yogyakarta, Indonesia | budi.santoso@email.com | +62-812-3456-7890

**RINGKASAN PROFESIONAL**
Spesialis penjamin mutu perangkat lunak (Quality Assurance) dengan pengalaman mengoperasikan automated testing (Selenium, Cypress) untuk 3 aplikasi web FinTech. Terbukti berhasil memangkas siklus rilis harian sebesar 25% dan menurunkan tingkat bug produksi di bawah 1%.

**PENGALAMAN KERJA UTAMA**
*Junior QA Engineer — FinTech GoLogistics* (Januari 2025 – April 2026)
- Merancang dan mengeksekusi lebih dari 150 skenario test case otomatis menggunakan JavaScript dan Cypress.
- Memimpin evaluasi sistem antrean order, menekan load-time API sebesar 18% untuk menjamin stabilitas jam makan siang konsumen.
- Berkolaborasi erat dengan 4 developer backend dalam menetapkan protokol pengujian regresi CI/CD.`,
        resultText: "✅ Skor ATS 95%+, menggunakan pola metrik STAR (Situation, Task, Action, Result), terdeteksi oleh sistem HRD secara instan."
      }
    },
    "jualan-caption": {
      before: {
        prompt: "buat caption jualan baju anak murah",
        output: "Ayo bunda beli baju anak murah berkualitas di toko kami! Modelnya lucu-lucu dan kekinian lho bun. Harganya terjangkau banget. Dijamin tidak menyesal. Langsung beli sekarang ya bunda, hubungi WA kami ya...",
        resultText: "❌ Membosankan, tidak ada kalimat hook memikat, terlalu menodong untuk membeli (hard-sell agresif), diabaikan oleh feed algoritma Instagram."
      },
      after: {
        prompt: "Sistem Formula Sliced Jualan Sosmed Copywriting",
        output: `🧸 SEBERAPA SERING BUNDA SERBBA SALAH MILIH KAIN BAJU SI KECIL YANG GAMPANG BIKIN GATAL? 😭👶

Sebagai seorang Ibu, kita sering tergoda dengan baju bayi yang gambarnya lucu-lucu, tapi pas dicuci sekali... benangnya langsung berudul dan bikin kulit mungil si kecil kemerahan karena keringat buntek.

Kenapa Serenade Comfort Set jadi andalan 1.500+ Bunda di Indonesia hari ini?
⭐️ **Organic Bamboo Cotton**: 3x lebih sejuk dibanding katun biasa. Pas diproduksi tanpa bahan kimia berbahaya, super aman untuk kulit anak sensitif.
⭐️ **Elastic Cloud Lock**: Karet celana ekstra lembut yang lentur mengikuti gerakan balita super aktif, anti bikin bekas kemerahan di pinggang.
⭐️ **Washing Machine Friendly**: Tetap lembut, tidak mengkerut walau sudah dicuci lebih dari 50 kali.

🎁 **GARANSI NYAMAN ATAU UANG KEMBALI**: Kulit si kecil iritasi? Kami kembalikan uang Bunda 100% utuh tanpa potongan!

Yuk, berikan sentuhan pelukan lembut awet seharian untuk buah hati tersayang! Dapatkan Promo Launching Diskon 15% khusus hari ini lewat Klik Link Bio kami! 📲👇`,
        resultText: "✅ Menggunakan kaidah penulisan Hook-Story-Offer (AIDA), berempati mendalam pada ketakutan konsumen, dan menyajikan Call to Action yang aman (garansi)."
      }
    }
  };

  const activeData = comparisonData[activeTab];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-150 relative">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider">
            BUKTI NYATA FORMULA SLICED
          </span>
          <h2 className="font-display text-2xl sm:text-3.5xl font-extrabold text-[#0D1527] tracking-tight">
            Sebelum vs Sesudah Menggunakan Sliced
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl mx-auto font-sans">
            Lihat perbedaan kualitas draf yang dihasilkan oleh cara input biasa vs formulasi template terenkapsulasi presisi kustom Sliced.
          </p>

          {/* Tab buttons */}
          <div className="inline-flex p-1 bg-slate-100 rounded-2xl border border-gray-200 mt-4">
            <button
              onClick={() => setActiveTab("ats-cv")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "ats-cv" ? "bg-white text-black shadow-xs" : "text-gray-500 hover:text-black"
              }`}
            >
              📄 Hasil CV ATS
            </button>
            <button
              onClick={() => setActiveTab("jualan-caption")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === "jualan-caption" ? "bg-white text-black shadow-xs" : "text-gray-500 hover:text-black"
              }`}
            >
              🛍️ Caption Jualan Sosmed
            </button>
          </div>
        </div>

        {/* Comparison grid boxes */}
        <div className="grid md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
          
          {/* Box 1: Before (Standard prompt) */}
          <div className="bg-slate-50 border border-gray-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-rose-500 text-white text-[9px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-3xl">
              CARA LAMA (ASAL KETIK)
            </div>

            <div className="space-y-4 text-left">
              <div>
                <span className="text-[10px] text-gray-400 font-mono font-bold block uppercase">PROMPT YANG DITULIS</span>
                <p className="text-xs font-mono font-bold text-gray-800 bg-white border border-gray-200 p-2.5 rounded-xl mt-1 italic">
                  "{activeData.before.prompt}"
                </p>
              </div>

              <div>
                <span className="text-[10px] text-gray-400 font-mono font-bold block uppercase">HASIL JAWABAN AI</span>
                <div className="text-xs text-gray-500 leading-relaxed font-sans bg-white border border-gray-150 p-4 rounded-xl mt-1.5 min-h-[180px] select-none whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {activeData.before.output}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-left flex items-start gap-2 text-xs font-semibold text-rose-650 bg-rose-50/20 p-3 rounded-2xl">
              <span className="text-lg leading-none select-none">⚠️</span>
              <p className="font-sans leading-relaxed">{activeData.before.resultText}</p>
            </div>
          </div>

          {/* Box 2: After (Sliced prompt template) */}
          <div className="bg-indigo-950/95 border border-indigo-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-4 relative overflow-hidden text-white">
            <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[9px] font-mono font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-3xl">
              RUMUSAN SLICED PROMPT
            </div>

            <div className="space-y-4 text-left">
              <div>
                <span className="text-[10px] text-indigo-400 font-mono font-bold block uppercase">SISTEM FORMULA KAMI</span>
                <p className="text-xs font-mono font-bold text-indigo-150 bg-indigo-900 border border-indigo-850 p-2.5 rounded-xl mt-1">
                  💡 {activeData.after.prompt} (Terstruktur Otomatis)
                </p>
              </div>

              <div>
                <span className="text-[10px] text-indigo-400 font-mono font-bold block uppercase">HASIL JAWABAN PRO</span>
                <div className="text-xs text-indigo-100 leading-relaxed font-sans bg-indigo-900/60 border border-indigo-850 p-4 rounded-xl mt-1.5 min-h-[180px] whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {activeData.after.output}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-indigo-900 text-left flex items-start gap-2 text-xs font-bold text-emerald-400 bg-emerald-950/30 p-3 rounded-2xl border border-emerald-900/40">
              <span className="text-lg leading-none select-none">⭐</span>
              <p className="font-sans leading-relaxed">{activeData.after.resultText}</p>
            </div>
          </div>

        </div>

        {/* Real User Testimonial Carousel */}
        <div className="pt-8 max-w-4xl mx-auto border-t border-gray-150/60">
          <div className="grid sm:grid-cols-3 gap-6 text-left">
            
            <div className="bg-slate-50 border border-gray-200/80 p-5 rounded-2xl relative space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[11px] text-gray-650 leading-relaxed italic font-medium font-sans">
                "Sebelumnya saya selalu pusing bikin deskripsi produk jualan di Shopee, bahasa AI-nya suka terlalu baku banget. Pakai Sliced sekali klik langsung dapet draf jualan beraura ramah dapet banget! Top."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-[10px] font-bold">R</div>
                <div>
                  <h5 className="text-[11px] font-extrabold text-gray-900">Riska Amelia</h5>
                  <p className="text-[9px] text-gray-400">Pemilik Toko Fashion Anak</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-gray-200/80 p-5 rounded-2xl relative space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[11px] text-gray-650 leading-relaxed italic font-medium font-sans">
                "Bantu banget untuk nyusun outline skripsi sosiologi. Saya dapet nilai A pas presentasi proposal karena kerangka pemetaan teorinya rapi banget pas diverifikasi dosen!"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 text-[10px] font-bold">A</div>
                <div>
                  <h5 className="text-[11px] font-extrabold text-gray-900">Aditya Pratama</h5>
                  <p className="text-[9px] text-gray-400">Mahasiswa Sosiologi UI</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 border border-gray-200/80 p-5 rounded-2xl relative space-y-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-[11px] text-gray-650 leading-relaxed italic font-medium font-sans">
                "Email pengunduran diri & izin cuti melahirkan terasa sopan sekali. Cocok banget buat kultur pekerja kantor di Indonesia yang butuh kesopanan takzim tinggi."
              </p>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 text-[10px] font-bold">D</div>
                <div>
                  <h5 className="text-[11px] font-extrabold text-gray-900">Dewi Lestari</h5>
                  <p className="text-[9px] text-gray-400">HR Admin & FinTech Officer</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

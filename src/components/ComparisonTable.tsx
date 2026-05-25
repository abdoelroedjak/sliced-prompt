import { Check, Info, X } from "lucide-react";

export default function ComparisonTable() {
  const rows = [
    {
      feature: "Kualitas Output",
      standard: "Samar, generik & repetitif",
      sliced: "Sangat tajam, spesifik & fidelitas tinggi"
    },
    {
      feature: "Tingkat Halusinasi",
      standard: "~15-20% pada tugas kompleks",
      sliced: "<1% dengan formula template tertambat"
    },
    {
      feature: "Kepatuhan Format",
      standard: "Tidak menentu, sering melenceng",
      sliced: "Skema JSON/Markdown yang sangat ketat"
    },
    {
      feature: "Waktu Persiapan",
      standard: "Berjam-jam trial & error menulis prompt",
      sliced: "Instan (Tinggal Masukkan Form & Dapatkan Hasil)"
    }
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 border-b border-gray-100" id="perbandingan">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Title */}
        <div className="text-center mb-10">
          <span className="text-[10px] font-mono font-bold text-indigo-600 bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full uppercase tracking-wider">
            ANALISIS KOMPARASI
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#191c1e] mt-4">
            Keunggulan Sliced Prompt
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl mx-auto">
            Bandingkan efisiensi hasil kerja menggunakan template adaptif dibanding cara manual konvensional.
          </p>
        </div>

        {/* Desktop View (Visible on sm and up) */}
        <div className="hidden md:block overflow-hidden border border-gray-200/60 rounded-3xl bg-white shadow-xs max-w-4xl mx-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100/75 border-b border-gray-200/60 font-display">
                <th className="p-5 font-extrabold text-sm text-[191c1e]">Fitur</th>
                <th className="p-5 font-bold text-sm text-gray-500">Pengguna Standar</th>
                <th className="p-5 font-extrabold text-sm text-indigo-950 bg-indigo-50/20">Sliced Prompt (Siap Pakai)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-150 text-sm">
              {rows.map((row) => (
                <tr key={row.feature} className="hover:bg-gray-50/55 transition-colors">
                  <td className="p-5 font-extrabold text-gray-900 w-1/4">{row.feature}</td>
                  <td className="p-5 text-gray-505 w-2/5 flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1.5 text-gray-500 font-medium">
                      <X className="w-4 h-4 text-rose-500 inline-block shrink-0" />
                      {row.standard}
                    </span>
                  </td>
                  <td className="p-5 font-bold text-black bg-indigo-50/10 w-2/5">
                    <span className="inline-flex items-center gap-1.5 text-indigo-950 font-bold">
                      <Check className="w-4.5 h-4.5 text-emerald-600 inline-block shrink-0" />
                      {row.sliced}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Layout (Strictly optimized for smaller screens, stacked view) */}
        <div className="block md:hidden space-y-4">
          {rows.map((row) => (
            <div key={row.feature} className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-4">
              <div className="border-b border-gray-100 pb-2">
                <span className="text-[11px] font-mono font-bold text-gray-400 block uppercase">FITUR PERBANDINGAN</span>
                <h4 className="text-sm font-extrabold text-gray-900 mt-0.5">{row.feature}</h4>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Standard */}
                <div className="bg-rose-50/20 border border-rose-100/60 rounded-xl p-3">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-rose-650 font-mono uppercase mb-1">
                    <X className="w-3 h-3 text-rose-500" />
                    <span>Cara Lama</span>
                  </div>
                  <p className="text-[11px] text-gray-550 leading-relaxed font-sans font-medium">{row.standard}</p>
                </div>

                {/* Sliced */}
                <div className="bg-emerald-50/25 border border-emerald-100/60 rounded-xl p-3">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 font-mono uppercase mb-1">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>Pakai Sliced</span>
                  </div>
                  <p className="text-[11px] text-indigo-950 font-bold leading-relaxed font-sans">{row.sliced}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2.5 items-center justify-center max-w-sm mx-auto mt-6 text-xs text-gray-400 font-medium px-2">
          <Info className="w-4 h-4 shrink-0 text-gray-400" />
          <p className="text-center leading-relaxed">Analisis didasarkan pada draf pengujian dengan 10+ LLM terpopuler dunia.</p>
        </div>

      </div>
    </section>
  );
}


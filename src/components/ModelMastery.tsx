import { useState } from "react";
import { modelFeatures } from "../data";
import { Sparkles, Bolt, Globe, CheckCircle2, ChevronDown, ChevronUp, MessageSquareDashed } from "lucide-react";

export default function ModelMastery() {
  const [selectedModel, setSelectedModel] = useState<string | null>(null);

  const getLucideIcon = (iconName: string, color: string) => {
    switch (iconName) {
      case "bolt":
        return <Bolt className="w-8 h-8" style={{ color }} />;
      case "auto_awesome":
        return <Sparkles className="w-8 h-8" style={{ color }} />;
      case "google":
      case "globe":
        return <Globe className="w-8 h-8" style={{ color }} />;
      default:
        return <MessageSquareDashed className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <section id="perbandingan" className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 block mb-2">
            INTEGRASI MULTI-PLATFORM
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Penguasaan Multi-Model
          </h2>
          <p className="text-md text-gray-500 mt-2 max-w-xl">
            Kami mengiris prompt khusus untuk arsitektur unik setiap engine demi memaksimalkan parameter pemicu kognitif.
          </p>
        </div>

        {/* Model Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {modelFeatures.map((m) => {
            const isExpanded = selectedModel === m.name;
            return (
              <div
                key={m.name}
                className="bg-gray-50/50 hover:bg-white border border-gray-200/60 rounded-3xl p-6 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div 
                      className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: m.bgColor }}
                    >
                      {getLucideIcon(m.icon, m.color)}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold font-mono ${m.badgeBg} ${m.badgeTextColor}`}>
                      {m.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-extrabold text-gray-900 mb-2">
                    {m.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed font-sans">
                    {m.desc}
                  </p>

                  <ul className="space-y-3.5 mb-6 text-sm text-gray-700 font-medium">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                      <span>Context Window: <strong className="font-mono text-xs text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-sm">{m.contextWindow}</strong></span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-black flex-shrink-0" />
                      <span>{m.ratingLabel}: <strong className="font-mono text-xs text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-sm">{m.ratingValue}</strong></span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => setSelectedModel(isExpanded ? null : m.name)}
                    className="w-full flex items-center justify-between text-xs font-mono tracking-wider font-bold text-gray-500 uppercase hover:text-black hover:bg-gray-100/60 py-2.5 px-3 rounded-lg transition-all"
                  >
                    <span>{isExpanded ? "Tutup Tips Pengirisan" : "Lihat Cara Pengirisan"}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-4 p-4 rounded-2xl bg-white border border-gray-200/60 space-y-3 animate-in fade-in-50 duration-200">
                      <h4 className="text-xs font-mono font-bold uppercase text-indigo-600">
                        Strategi Prompt {m.name}
                      </h4>
                      <ul className="space-y-2 text-xs text-gray-600 leading-relaxed font-sans">
                        {m.tips.map((tip, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="font-extrabold text-[#565e74]">{idx + 1}.</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

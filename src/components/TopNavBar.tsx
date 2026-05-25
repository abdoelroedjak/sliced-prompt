import { useState, useEffect } from "react";
import { Sparkles, Terminal, Menu, X, Check, Brain } from "lucide-react";

interface TopNavBarProps {
  onMenuClick: (sections: string) => void;
  activeTab: string;
}

export default function TopNavBar({ onMenuClick, activeTab }: TopNavBarProps) {
  const [hasKey, setHasKey] = useState<boolean | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetch("/api/gemini/status")
      .then((res) => res.json())
      .then((data) => setHasKey(data.hasKey))
      .catch(() => setHasKey(false));
  }, []);

  const handleNav = (section: string) => {
    onMenuClick(section);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/85 backdrop-blur-md border-b border-gray-200/50 transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleNav("landing")}
            className="flex items-center gap-2.5 text-left active:scale-95 transition-transform"
          >
            <img 
              src="https://i.ibb.co.com/zTVDjNFj/694623762-17964433824113304-3873591076749515322-n.jpg" 
              alt="Sliced Prompt Logo" 
              className="w-10 h-10 rounded-xl object-cover border border-gray-150"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block text-xl font-display font-bold text-gray-900 tracking-tight leading-none">
                Sliced Prompt
              </span>
              <span className="text-[10px] font-mono tracking-wider font-semibold text-gray-500 uppercase">
                Asisten AI Produktivitas
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNav("perpustakaan")}
              className={`text-sm font-medium transition-all relative py-1.5 ${
                activeTab === "perpustakaan" 
                  ? "text-black font-semibold border-b-2 border-black" 
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Perpustakaan
            </button>
            <button
              onClick={() => handleNav("perbandingan")}
              className={`text-sm font-medium transition-all relative py-1.5 ${
                activeTab === "perbandingan" 
                  ? "text-black font-semibold border-b-2 border-black" 
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Perbandingan AI
            </button>
            <button
              onClick={() => handleNav("playground")}
              className={`text-sm font-medium transition-all relative py-1.5 ${
                activeTab === "playground" 
                  ? "text-black font-semibold border-b-2 border-black" 
                  : "text-gray-500 hover:text-black"
              }`}
            >
              Playground &amp; Optimizer
            </button>
          </div>
        </div>

        {/* Action Button & API Badge */}
        <div className="hidden sm:flex items-center gap-4">
          {/* API Access Key Status badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 border border-gray-200">
            <div className={`w-2 h-2 rounded-full ${hasKey ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
            <span className="text-[11px] font-mono font-medium text-gray-600">
              API Status: {hasKey ? "AKTIF" : "TANPA KUNCI"}
            </span>
          </div>

          <button
            onClick={() => handleNav("playground")}
            className="flex items-center gap-2 bg-black hover:bg-gray-950 text-white font-semibold text-sm h-11 px-6 rounded-full shadow-sm hover:shadow active:scale-[0.98] transition-all"
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            Mulai Optimizer
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          {/* API indicator for mobile */}
          <div className="sm:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 border border-gray-200">
            <div className={`w-2 h-2 rounded-full ${hasKey ? "bg-emerald-500" : "bg-amber-500"}`} />
            <span className="text-[10px] font-mono text-gray-500">
              {hasKey ? "AI Active" : "No Key"}
            </span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg px-4 pt-4 pb-6 space-y-3 z-40">
          <button
            onClick={() => handleNav("perpustakaan")}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-900 font-medium"
          >
            Perpustakaan
          </button>
          <button
            onClick={() => handleNav("perbandingan")}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-900 font-medium"
          >
            Perbandingan AI
          </button>
          <button
            onClick={() => handleNav("playground")}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-1000 font-medium text-indigo-600"
          >
            Playground &amp; Optimizer
          </button>
          <hr className="border-gray-100" />
          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleNav("playground")}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3 px-4 rounded-xl font-semibold text-sm"
            >
              <Terminal className="w-4 h-4 text-indigo-400" />
              Buka Playground
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

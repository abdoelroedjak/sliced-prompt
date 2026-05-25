import { useState, useEffect } from "react";
import { Sparkles, Terminal, Menu, X, Check, Brain, Sun, Moon, BookOpen } from "lucide-react";

interface TopNavBarProps {
  onMenuClick: (sections: string) => void;
  activeTab: string;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
}

export default function TopNavBar({ onMenuClick, activeTab, isDarkMode, setIsDarkMode }: TopNavBarProps) {
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
    <nav className="fixed top-0 left-0 right-0 z-50 h-[72px] bg-white/85 dark:bg-slate-900/85 backdrop-blur-md border-b border-gray-200/50 dark:border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <button 
            onClick={() => handleNav("landing")}
            className="flex items-center gap-2.5 text-left active:scale-95 transition-transform cursor-pointer"
          >
            <img 
              src="https://i.ibb.co.com/zTVDjNFj/694623762-17964433824113304-3873591076749515322-n.jpg" 
              alt="Sliced Prompt Logo" 
              className="w-10 h-10 rounded-xl object-cover border border-gray-150 dark:border-slate-800"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="block text-xl font-display font-bold text-gray-900 dark:text-white tracking-tight leading-none">
                Sliced Prompt
              </span>
              <span className="text-[10px] font-mono tracking-wider font-semibold text-gray-500 dark:text-slate-400 uppercase">
                Asisten AI Indonesia
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => handleNav("perpustakaan")}
              className={`text-sm font-medium transition-all relative py-1.5 cursor-pointer ${
                activeTab === "perpustakaan" 
                  ? "text-black dark:text-white font-semibold border-b-2 border-black dark:border-white" 
                  : "text-gray-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Perpustakaan
            </button>
            <button
              onClick={() => handleNav("perbandingan")}
              className={`text-sm font-medium transition-all relative py-1.5 cursor-pointer ${
                activeTab === "perbandingan" 
                  ? "text-black dark:text-white font-semibold border-b-2 border-black dark:border-white" 
                  : "text-gray-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Perbandingan AI
            </button>
            <button
              onClick={() => handleNav("panduan")}
              className={`text-sm font-medium transition-all relative py-1.5 cursor-pointer flex items-center gap-1 ${
                activeTab === "panduan" 
                  ? "text-indigo-650 dark:text-indigo-400 font-semibold border-b-2 border-indigo-600" 
                  : "text-gray-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Panduan Pemula
            </button>
            <button
              onClick={() => handleNav("playground")}
              className={`text-sm font-medium transition-all relative py-1.5 cursor-pointer ${
                activeTab === "playground" 
                  ? "text-black dark:text-white font-semibold border-b-2 border-black dark:border-white" 
                  : "text-gray-500 dark:text-slate-400 hover:text-black dark:hover:text-white"
              }`}
            >
              Playground &amp; Optimizer
            </button>
          </div>
        </div>

        {/* Action Button & API Badge & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Theme Switcher Button */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2.5 rounded-full border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-755 text-gray-700 dark:text-slate-200 cursor-pointer transition-all"
            title={isDarkMode ? "Aktifkan Mode Cahaya" : "Aktifkan Mode Kegelapan"}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400 fill-amber-300" /> : <Moon className="w-4 h-4 text-indigo-505" />}
          </button>

          {/* API Access Key Status badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-800">
            <div className={`w-2 h-2 rounded-full ${hasKey ? "bg-emerald-500 animate-pulse" : "bg-amber-500"}`} />
            <span className="text-[11px] font-mono font-medium text-gray-600 dark:text-slate-300">
              API Status: {hasKey ? "AKTIF" : "NO KEY"}
            </span>
          </div>

          <button
            onClick={() => handleNav("playground")}
            className="flex items-center gap-2 bg-black dark:bg-indigo-600 dark:hover:bg-indigo-700 hover:bg-gray-950 text-white font-semibold text-sm h-11 px-6 rounded-full shadow-sm hover:shadow active:scale-[0.98] transition-all cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-indigo-400 dark:text-white" />
            Mulai Optimizer
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-2">
          
          {/* Mobile Theme Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-full border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 text-gray-750 dark:text-slate-300 cursor-pointer"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-500 dark:text-slate-400"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 bg-white dark:bg-slate-900 border-b border-gray-250 dark:border-slate-800 shadow-xl px-4 pt-4 pb-6 space-y-3 z-40">
          <button
            onClick={() => handleNav("perpustakaan")}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-55 dark:hover:bg-slate-800 text-gray-900 dark:text-white font-medium"
          >
            Perpustakaan
          </button>
          <button
            onClick={() => handleNav("perbandingan")}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-55 dark:hover:bg-slate-800 text-gray-900 dark:text-white font-medium"
          >
            Perbandingan AI
          </button>
          <button
            onClick={() => handleNav("panduan")}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-55 dark:hover:bg-slate-800 text-indigo-600 dark:text-indigo-400 font-bold"
          >
            📖 Panduan AI Pemula
          </button>
          <button
            onClick={() => handleNav("playground")}
            className="block w-full text-left py-2 px-3 rounded-lg hover:bg-gray-55 dark:hover:bg-slate-800 text-gray-900 dark:text-white font-medium"
          >
            Playground &amp; Optimizer
          </button>
          <hr className="border-gray-100 dark:border-slate-800" />
          <div className="space-y-3 pt-2">
            <button
              onClick={() => handleNav("playground")}
              className="w-full flex items-center justify-center gap-2 bg-black dark:bg-indigo-600 text-white py-3 px-4 rounded-xl font-semibold text-sm cursor-pointer"
            >
              <Terminal className="w-4 h-4 text-indigo-400 dark:text-white animate-pulse" />
              Buka Playground
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

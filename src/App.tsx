import { useState, useEffect } from "react";
import TopNavBar from "./components/TopNavBar";
import HeroSection from "./components/HeroSection";
import SaaSWorkspace from "./components/SaaSWorkspace";
import InteractiveQuiz from "./components/InteractiveQuiz";
import ModelMastery from "./components/ModelMastery";
import ComparisonTable from "./components/ComparisonTable";
import PromptPlayground from "./components/PromptPlayground";
import TestimonialsBeforeAfter from "./components/TestimonialsBeforeAfter";
import AIGuideBeginners from "./components/AIGuideBeginners";
import Footer from "./components/Footer";
import { PromptTemplate } from "./types";
import { Sparkles, ArrowRight, Activity, Cpu, Sparkle, X, FileText, ShoppingBag, Instagram } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [searchQuery, setSearchQuery] = useState("");
  
  // States of chosen prompt to feed into the playground
  const [playgroundSeed, setPlaygroundSeed] = useState<PromptTemplate | undefined>(undefined);
  const [playgroundVals, setPlaygroundVals] = useState<Record<string, string>>({});

  // 1. Onboarding first-time pop-up state
  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);

  // 2. Clear Theme Control State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("sliced_dark_mode") === "true";
    }
    return false;
  });

  useEffect(() => {
    // Check if user has first onboarded yet
    const onboarded = localStorage.getItem("sliced_onboarded_v5");
    if (onboarded !== "true") {
      // Trigger onboarding pop-up with a brief delayed micro-interaction to feel highly polished
      const timer = setTimeout(() => {
        setShowOnboardingModal(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("sliced_dark_mode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("sliced_dark_mode", "false");
    }
  }, [isDarkMode]);

  const handleMenuClick = (section: string) => {
    setActiveTab(section);
    
    // Smooth scroll to targeted UI sectors
    if (section === "perpustakaan") {
      document.getElementById("onboarding-pemula")?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "perbandingan") {
      document.getElementById("perbandingan")?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "panduan") {
      document.getElementById("panduan-pemula")?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "playground") {
      document.getElementById("prompt-playground")?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "landing") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSendToPlayground = (prompt: PromptTemplate, customValues: Record<string, string>) => {
    setPlaygroundSeed(prompt);
    setPlaygroundVals(customValues);
    setActiveTab("playground");
  };

  const scrollToPerpustakaan = () => {
    document.getElementById("onboarding-pemula")?.scrollIntoView({ behavior: "smooth" });
    setActiveTab("perpustakaan");
  };

  const scrollToPlayground = () => {
    document.getElementById("prompt-playground")?.scrollIntoView({ behavior: "smooth" });
    setActiveTab("playground");
  };

  // Actions when selecting onboarding interests
  const handleOnboardingSelection = (category: "cv" | "jualan" | "sosmed") => {
    localStorage.setItem("sliced_onboarded_v5", "true");
    setShowOnboardingModal(false);

    if (category === "cv") {
      setSearchQuery("CV");
    } else if (category === "jualan") {
      setSearchQuery("Deskripsi");
    } else if (category === "sosmed") {
      setSearchQuery("Instagram");
    }

    // Scroll effortlessly to workspace target
    setTimeout(() => {
      document.getElementById("onboarding-pemula")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const closeOnboardingModal = () => {
    localStorage.setItem("sliced_onboarded_v5", "true");
    setShowOnboardingModal(false);
  };

  return (
    <div className={`bg-[#f7f9fb] dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans min-h-screen antialiased flex flex-col justify-between selection:bg-indigo-150 selection:text-indigo-900 transition-colors duration-300`}>
      
      {/* 1. Header Navigation */}
      <TopNavBar 
        onMenuClick={handleMenuClick} 
        activeTab={activeTab} 
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* Main Container */}
      <main className="flex-1 mt-[72px]">
        
        {/* 2. Hero Section */}
        <HeroSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearchSubmit={() => {
            document.getElementById("onboarding-pemula")?.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 2.5. Personal Workspace Dashboard (Onboarding & Result-Oriented Toolkit) */}
        <SaaSWorkspace 
          searchQuery={searchQuery}
          onSendToPlayground={(prompt) => {
            setPlaygroundSeed({
              id: "custom",
              title: "Custom Compiled",
              description: "Custom compile from smart workspace",
              category: "General",
              difficulty: "🟢 Pemula",
              model: "Gemini 3.5 Flash",
              template: prompt,
              parameters: []
            });
            setActiveTab("playground");
            setTimeout(() => {
              document.getElementById("prompt-playground")?.scrollIntoView({ behavior: "smooth" });
            }, 100);
          }} 
        />

        {/* 3. Interactive Quiz Guide Prompt Matcher */}
        <InteractiveQuiz onRecommendationSelect={(tpl) => handleSendToPlayground(tpl, {})} />

        {/* 4. AI Platforms Mastery overview cards */}
        <ModelMastery />

        {/* 5. Real Comparison Before/After results & testimonials */}
        <TestimonialsBeforeAfter />

        {/* 7. Comparison table standard vs Sliced */}
        <ComparisonTable />

        {/* 7.5. Curated free AI handbook for Indonesian beginner users */}
        <AIGuideBeginners />

        {/* 8. Live Prompt Playground Workspace */}
        <PromptPlayground 
          initialTemplate={playgroundSeed} 
          initialValues={playgroundVals} 
        />

        {/* 9. Final CTA bar block */}
        <section className="bg-black text-white text-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden board-t border-slate-900">
          {/* subtle background visual blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <div className="inline-flex w-12 h-12 rounded-2xl bg-white/10 items-center justify-center text-indigo-400 mb-2">
              <Cpu className="w-6 h-6" />
            </div>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto leading-tight">
              Gunakan AI Layaknya Seorang Profesional. Tanpa Harus Belajar Prompt Engineering.
            </h2>
            
            <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
              Bergabunglah dengan ribuan pekerja, mahasiswa, dan wirausaha Indonesia yang sukses berkolaborasi dengan asisten cerdas Sliced.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button
                onClick={scrollToPlayground}
                className="w-full sm:w-auto bg-white hover:bg-neutral-100 text-black font-semibold text-sm h-12 px-8 rounded-full shadow-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                Mulai Gratis Sekarang
              </button>
              <a
                href="mailto:grassvps04@gmail.com"
                className="w-full sm:w-auto border border-white/20 hover:border-white/55 hover:bg-white/5 font-semibold text-sm h-12 px-8 rounded-full flex items-center justify-center gap-2 transition-all"
              >
                Bicara dengan Pakar
                <ArrowRight className="w-4 h-4 text-indigo-400" />
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* 10. Footer info */}
      <Footer onNavClick={handleMenuClick} />

      {/* 11. ONBOARDING FLOATING GREETINGS MODAL */}
      {showOnboardingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-gray-150 dark:border-slate-800 shadow-2xl relative text-left font-sans space-y-6 animate-in zoom-in-95 duration-200">
            
            {/* Close trigger top-right */}
            <button
              onClick={closeOnboardingModal}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-400 transition-colors cursor-pointer"
              title="Tutup &amp; Lewati"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Greetings Banner */}
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                <Sparkle className="w-6 h-6 animate-spin" style={{ animationDuration: "12s" }} />
              </div>
              <div>
                <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-bold tracking-widest uppercase block">
                  PENDAMPING PRODUKTIVITAS
                </span>
                <h3 className="text-lg font-extrabold font-display leading-tight">
                  Selamat datang di Sliced Prompt!
                </h3>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm text-gray-650 dark:text-slate-300 leading-relaxed font-medium">
                Ini adalah kumpulan <strong>resep AI siap pakai</strong> untuk pekerja, pelajar, dan pebisnis Indonesia. Mau mulai riset dari mana hari ini?
              </p>
              <span className="block text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider pt-1">
                👉 PILIH SASARAN UTAMA ANDA:
              </span>
            </div>

            {/* Quick cards list targeting requirements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <button
                onClick={() => handleOnboardingSelection("cv")}
                className="p-4 bg-indigo-50/50 dark:bg-slate-800/40 border border-indigo-100 dark:border-slate-850 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-2xl flex flex-col items-center justify-center text-center gap-2.5 transition-all cursor-pointer group hover:shadow-xs hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-650 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-gray-900 dark:text-white leading-none">CV &amp; Karir</span>
                  <span className="text-[9px] text-gray-400">Template ATS CV</span>
                </div>
              </button>

              <button
                onClick={() => handleOnboardingSelection("jualan")}
                className="p-4 bg-orange-50/40 dark:bg-slate-800/40 border border-orange-100 dark:border-slate-850 hover:border-orange-500 dark:hover:border-orange-500 rounded-2xl flex flex-col items-center justify-center text-center gap-2.5 transition-all cursor-pointer group hover:shadow-xs hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-gray-900 dark:text-white leading-none">Jualan</span>
                  <span className="text-[9px] text-gray-400">Copywriting Promo</span>
                </div>
              </button>

              <button
                onClick={() => handleOnboardingSelection("sosmed")}
                className="p-4 bg-rose-50/30 dark:bg-slate-800/40 border border-rose-100 dark:border-slate-850 hover:border-rose-500 dark:hover:border-rose-500 rounded-2xl flex flex-col items-center justify-center text-center gap-2.5 transition-all cursor-pointer group hover:shadow-xs hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <span className="block text-xs font-bold text-gray-900 dark:text-white leading-none">Sosmed</span>
                  <span className="text-[9px] text-gray-400">Ide Konten / Script</span>
                </div>
              </button>

            </div>

            {/* Bottom prompt reference notice */}
            <div className="flex items-center justify-between border-t border-gray-150 dark:border-slate-800 pt-4 text-[11px] text-gray-400 font-medium font-sans">
              <span>*Tanpa harus daftar akun</span>
              <button
                onClick={closeOnboardingModal}
                className="text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer"
              >
                Jelajahi Sendiri &rarr;
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

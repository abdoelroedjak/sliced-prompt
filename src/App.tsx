import { useState } from "react";
import TopNavBar from "./components/TopNavBar";
import HeroSection from "./components/HeroSection";
import SaaSWorkspace from "./components/SaaSWorkspace";
import InteractiveQuiz from "./components/InteractiveQuiz";
import ModelMastery from "./components/ModelMastery";
import ComparisonTable from "./components/ComparisonTable";
import PromptPlayground from "./components/PromptPlayground";
import Footer from "./components/Footer";
import { PromptTemplate } from "./types";
import { Sparkles, ArrowRight, Activity, Cpu } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("landing");
  const [searchQuery, setSearchQuery] = useState("");
  
  // States of chosen prompt to feed into the playground
  const [playgroundSeed, setPlaygroundSeed] = useState<PromptTemplate | undefined>(undefined);
  const [playgroundVals, setPlaygroundVals] = useState<Record<string, string>>({});

  const handleMenuClick = (section: string) => {
    setActiveTab(section);
    
    // Smooth scroll to targeted UI sectors
    if (section === "perpustakaan") {
      document.getElementById("onboarding-pemula")?.scrollIntoView({ behavior: "smooth" });
    } else if (section === "perbandingan") {
      document.getElementById("perbandingan")?.scrollIntoView({ behavior: "smooth" });
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

  return (
    <div className="bg-[#f7f9fb] text-gray-900 font-sans min-h-screen antialiased flex flex-col justify-between selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* 1. Header Navigation */}
      <TopNavBar onMenuClick={handleMenuClick} activeTab={activeTab} />

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
        }} />

        {/* 3. Interactive Quiz Guide Prompt Matcher */}
        <InteractiveQuiz onRecommendationSelect={(tpl) => handleSendToPlayground(tpl, {})} />

        {/* 4. AI Platforms Mastery overview cards */}
        <ModelMastery />

        {/* 7. Comparison table standard vs Sliced */}
        <ComparisonTable />

        {/* 8. Live Prompt Playground Workspace */}
        <PromptPlayground 
          initialTemplate={playgroundSeed} 
          initialValues={playgroundVals} 
        />

        {/* 9. Final CTA bar block */}
        <section className="bg-black text-white text-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
              Bergabunglah dengan ribuan orang berprestasi yang telah mengotomatiskan alur kerja serta kecemerlangan operasional bisnis mereka.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
              <button
                onClick={scrollToPlayground}
                className="w-full sm:w-auto bg-white text-black hover:bg-gray-100 font-semibold text-sm h-12 px-8 rounded-full shadow-sm active:scale-[0.98] transition-all"
              >
                Mulai Gratis Sekarang
              </button>
              <a
                href="mailto:grassvps04@gmail.com"
                className="w-full sm:w-auto border border-white/20 hover:border-white/50 hover:bg-white/5 font-semibold text-sm h-12 px-8 rounded-full flex items-center justify-center gap-2 transition-all"
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

    </div>
  );
}

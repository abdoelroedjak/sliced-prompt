export interface PromptTemplate {
  id: string;
  title: string;
  description: string;
  template: string;
  model: "ChatGPT" | "Claude 3.5" | "Gemini Pro" | "GPT-4o";
  difficulty: "PAKAR" | "MENENGAH" | "LANJUTAN";
  views: number;
  category: "Bisnis" | "Belajar" | "Pengembangan" | "Pemasar";
  parameters: {
    label: string;
    placeholder: string;
    defaultValue: string;
    tag: string;
  }[];
}

export interface ModelFeature {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  badge: string;
  badgeBg: string;
  badgeTextColor: string;
  desc: string;
  contextWindow: string;
  ratingValue: string;
  ratingLabel: string;
  tips: string[];
}

export interface QuizQuestion {
  id: number;
  title: string;
  subtitle: string;
  options: {
    value: string;
    label: string;
    desc: string;
    icon: string;
  }[];
}

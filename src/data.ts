import { PromptTemplate, ModelFeature, QuizQuestion } from "./types";

export const modelFeatures: ModelFeature[] = [
  {
    name: "ChatGPT",
    icon: "zap",
    color: "#10a37f",
    bgColor: "rgba(16, 163, 127, 0.1)",
    badge: "ELITE",
    badgeBg: "bg-emerald-100",
    badgeTextColor: "text-emerald-800",
    desc: "Terbaik untuk sintesis kreatif dan logika teristruktur. Dioptimalkan untuk GPT-4o.",
    contextWindow: "128k",
    ratingValue: "9.8/10",
    ratingLabel: "Penalaran",
    tips: [
      "Gunakan penugasan peran (role-playing) eksplisit di awal kalimat.",
      "Selalu gunakan pembatas (delimiters) seperti triple-quotes (''') untuk data input.",
      "Mintalah output terstruktur menggunakan skema Markdown atau bullet points."
    ]
  },
  {
    name: "Claude 3.5",
    icon: "sparkles",
    color: "#d97757",
    bgColor: "rgba(217, 119, 87, 0.1)",
    badge: "BERNUANSA",
    badgeBg: "bg-orange-100",
    badgeTextColor: "text-orange-800",
    desc: "Penulisan mirip manusia yang unggul dan presisi pengkodean. Mendukung Artifacts.",
    contextWindow: "200k",
    ratingValue: "10/10",
    ratingLabel: "Logika",
    tips: [
      "Gunakan tag XML seperti <context> atau <variables> untuk membungkus argumen.",
      "Claude sangat merespons baik instruksi bertahap (chain-of-thought) 'pikirkan dulu sebelum menjawab'.",
      "Sempurna untuk pembuatan dokumen ilmiah, kode pemrograman kompleks, dan analisis sastra."
    ]
  },
  {
    name: "Gemini 1.5",
    icon: "globe",
    color: "#4285f4",
    bgColor: "rgba(66, 133, 244, 0.1)",
    badge: "MULTIMODAL",
    badgeBg: "bg-blue-100",
    badgeTextColor: "text-blue-800",
    desc: "Context window masif untuk seluruh codebase dan buku.",
    contextWindow: "2Juta",
    ratingValue: "9.5/10",
    ratingLabel: "Kecepatan",
    tips: [
      "Unggah berkas kode lengkap atau buku tebal sebagai konteks langsung.",
      "Gunakan instruksi terperinci untuk ekstraksi data berfidelitas tinggi dari media audio/video.",
      "Manfaatkan structured JSON mode dengan mendefinisikan responseSchema yang ketat."
    ]
  }
];

export const promptTemplates: PromptTemplate[] = [
  {
    id: "tech-whitepaper",
    title: "Pembuat Whitepaper Teknis",
    description: "Membuat whitepaper teknis 10 halaman yang terstruktur termasuk metodologi, analisis data, dan bagian tinjauan sejawat.",
    model: "Claude 3.5",
    difficulty: "PAKAR",
    views: 2400,
    category: "Belajar",
    template: `Anda adalah pakar penulisan teknis ilmiah. Buatlah draf materi whitepaper teknis terstruktur dengan topik [Topik] setebal 10 halaman dengan struktur akademis, metodologi komparatif, visualisasi berbasis fiksi data [Data], dan tinjauan sejawat di bagian akhir secara komprehensif. Pastikan penjelasan detail, formal, serta memiliki logika komputasi yang tinggi.`,
    parameters: [
      { tag: "[Topik]", label: "Topik Whitepaper", placeholder: "e.g., Sistem Konsensus Blockchain Ramah Lingkungan", defaultValue: "Sistem Konsensus Blockchain Ramah Lingkungan" },
      { tag: "[Data]", label: "Fiksi Data", placeholder: "e.g., Efisiensi transmisi data antar node dalam milidetik", defaultValue: "Efisiensi transmisi data antar node dalam milidetik" }
    ]
  },
  {
    id: "saas-pricing",
    title: "Arsitek Harga SaaS",
    description: "Menganalisis data kompetitor untuk menyarankan tingkat harga optimal, pemicu psikologis, dan penggabungan fitur.",
    model: "GPT-4o",
    difficulty: "MENENGAH",
    views: 1800,
    category: "Bisnis",
    template: `Bertindak sebagai Arsitek Strategi Monetisasi SaaS. Analisis data kompetitor berikut: [Kompetitor] dengan target audiens [Audiens]. Susun tier harga optimal (Free, Pro, Enterprise), sertakan pemicu psikologis kehilangan peluang (FOMO), model bundling fitur cerdas, dan mitigasi churn jangka panjang.`,
    parameters: [
      { tag: "[Kompetitor]", label: "Data Kompetitor", placeholder: "e.g., Notion, Obsidian, Craft", defaultValue: "Notion, Obsidian, Craft" },
      { tag: "[Audiens]", label: "Target Audiens", placeholder: "e.g., Penulis profesional dan manajer produk", defaultValue: "Penulis profesional dan manajer produk" }
    ]
  },
  {
    id: "code-refactor",
    title: "Mesin Refactoring Kode",
    description: "Refactor seluruh repositori lama untuk performa, keamanan, dan standar arsitektur modern.",
    model: "Gemini Pro",
    difficulty: "LANJUTAN",
    views: 4100,
    category: "Pengembangan",
    template: `Analisis kode berikut: [KodeSumber] dalam bahasa [Bahasa Pemrograman]. Lakukan refactoring menyeluruh untuk meningkatkan performa algoritma (Big O), eliminasi celah keamanan (XSS, SQL Injection), dan modernisasi sesuai best practice industri. Sediakan perbandingan before/after dalam bentuk tabel.`,
    parameters: [
      { tag: "[KodeSumber]", label: "Kode Sumber", placeholder: "Paste kode Anda di sini...", defaultValue: "function process(arr) {\n  let r = [];\n  for(let i=0; i<arr.length; i++) {\n    if(r.indexOf(arr[i]) === -1) r.push(arr[i]);\n  }\n  return r;\n}" },
      { tag: "[Bahasa Pemrograman]", label: "Bahasa Pemrograman", placeholder: "e.g., JavaScript", defaultValue: "JavaScript" }
    ]
  },
  {
    id: "concept-explainer",
    title: "Penjelas Konsep Kompleks",
    description: "Menjelaskan konsep akademis rumit menggunakan analogi sederhana sehari-hari demi pemahaman maksimal.",
    model: "Claude 3.5",
    difficulty: "MENENGAH",
    views: 1250,
    category: "Belajar",
    template: `Anda adalah guru sains legendaris. Jelaskan konsep tentang [Konsep] kepada anak usia [Usia] tahun. Gunakan analogi kreatif tentang [Analogi] agar mudah sekali dipahami, sertakan kuis interaktif 3 pertanyaan di akhir penjelasan.`,
    parameters: [
      { tag: "[Konsep]", label: "Konsep Akademis", placeholder: "e.g., Mekanika Kuantum", defaultValue: "Mekanika Kuantum" },
      { tag: "[Usia]", label: "Target Usia", placeholder: "e.g., 12", defaultValue: "12" },
      { tag: "[Analogi]", label: "Tema Analogi", placeholder: "e.g., Bermain petak umpet", defaultValue: "Bermain petak umpet" }
    ]
  },
  {
    id: "ad-copywriter",
    title: "Premium Copywriting Generator",
    description: "Membuat hook iklan menarik dengan formula AIDA (Attention, Interest, Desire, Action) untuk media sosial.",
    model: "GPT-4o",
    difficulty: "MENENGAH",
    views: 3100,
    category: "Pemasar",
    template: `Susun 3 teks variasi iklan Facebook menggunakan formula AIDA untuk mempromosikan produk [Produk] dengan keunggulan [Keunggulan]. Nada suara harus [NadaSuara] dan memicu tindakan langsung dari pengguna.`,
    parameters: [
      { tag: "[Produk]", label: "Produk/Jasa", placeholder: "e.g., Sepatu lari ortopedi", defaultValue: "Sepatu lari ortopedi" },
      { tag: "[Keunggulan]", label: "Keunggulan Utama", placeholder: "e.g., Sangat empuk dan mengurangi nyeri tumit", defaultValue: "Sangat empuk dan mengurangi nyeri tumit" },
      { tag: "[NadaSuara]", label: "Nada Suara", placeholder: "e.g., Empati & Profesional", defaultValue: "Empati & Profesional" }
    ]
  },
  {
    id: "learning-plan",
    title: "Kurikulum Studi Mandiri AI",
    description: "Menyusun peta pembelajaran langkah-demi-langkah (Roadmap) dari nol hingga mahir untuk topik tertentu.",
    model: "ChatGPT",
    difficulty: "PAKAR",
    views: 1950,
    category: "Belajar",
    template: `Buatlah kurikulum belajar 30 hari intensif untuk menguasai [Topik] dari tingkat [TingkatAwal]. Sediakan alokasi belajar harian (2 jam/hari), referensi website/materi gratis, dan 1 mini-proyek menantang di setiap akhir pekan.`,
    parameters: [
      { tag: "[Topik]", label: "Topik Studi", placeholder: "e.g., Machine Learning dengan Python", defaultValue: "Machine Learning dengan Python" },
      { tag: "[TingkatAwal]", label: "Tingkat Mulai", placeholder: "e.g., Pemula murni tanpa dasar coding", defaultValue: "Pemula murni tanpa dasar coding" }
    ]
  },
  {
    id: "business-proposal",
    title: "Penulis Proposal Bisnis Persuasif",
    description: "Membantu wirausahawan menyusun dokumen penawaran pitch ke calon klien atau investor.",
    model: "Gemini Pro",
    difficulty: "LANJUTAN",
    views: 2200,
    category: "Bisnis",
    template: `Buat draft executive summary proposal bisnis untuk penawaran jasa [Layanan] yang ditargetkan untuk klien [Klien]. Soroti masalah utama klien [MasalahKlien] dan jelaskan bagaimana metodologi kami memberi ROI [ROI] kali lipat dibanding kompetitor.`,
    parameters: [
      { tag: "[Layanan]", label: "Nama Layanan/Produk", placeholder: "e.g., Dashboard Analisis Supply Chain otomatis", defaultValue: "Dashboard Analisis Supply Chain otomatis" },
      { tag: "[Klien]", label: "Calon Klien", placeholder: "e.g., Perusahaan FMCG skala menengah", defaultValue: "Perusahaan FMCG skala menengah" },
      { tag: "[MasalahKlien]", label: "Masalah Klien", placeholder: "e.g., Keterlambatan logistik karena tracking manual", defaultValue: "Keterlambatan logistik karena tracking manual" },
      { tag: "[ROI]", label: "Estimasi ROI", placeholder: "e.g., 3", defaultValue: "3" }
    ]
  },
  {
    id: "marketing-email",
    title: "Email Outreach B2B Dingin",
    description: "Membuat draf email cold-outreach dengan tingkat respons tinggi untuk pengambil keputusan (C-Level).",
    model: "Claude 3.5",
    difficulty: "PAKAR",
    views: 2800,
    category: "Pemasar",
    template: `Tulis email dingin (cold email) profesional yang menarik untuk C-Level di industri [Industri]. Gunakan judul subjek yang memicu rasa ingin tahu, perkenalkan solusi kami untuk meningkatkan metrik [MetrikKunci] sebesar [Persentase]% dalam 30 hari tanpa mengganggu alur kerja saat ini.`,
    parameters: [
      { tag: "[Industri]", label: "Industri Sasaran", placeholder: "e.g., E-commerce & Logistik", defaultValue: "E-commerce & Logistik" },
      { tag: "[MetrikKunci]", label: "Metrik Kunci", placeholder: "e.g., Kecepatan Checkout atau Retensi Pengguna", defaultValue: "Kecepatan Checkout" },
      { tag: "[Persentase]", label: "Persentase Target", placeholder: "e.g., 25", defaultValue: "25" }
    ]
  }
];

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    title: "Apa Fokus Utama Bidang Anda?",
    subtitle: "Pilih salah satu spesialisasi untuk menyaring kerangka prompt yang paling sesuai.",
    options: [
      { value: "Bisnis", label: "Bisnis", desc: "Operasional, Strategi, Manajemen, Email formal", icon: "business_center" },
      { value: "Belajar", label: "Belajar & Riset", desc: "Sains, Analisis Dokumen, Ringkasan, Kuis akademis", icon: "school" },
      { value: "Pengembangan", label: "Pengembangan", desc: "Coding, Debugging, Desain Sistem, Refactoring", icon: "code" }
    ]
  },
  {
    id: 2,
    title: "Pilih Format Hasil Output yang Anda Butuhkan",
    subtitle: "Apakah Anda memerlukan analisis bertahap, data mentah siap pakai, atau teks komprehensif?",
    options: [
      { value: "structured", label: "Skema JSON / Tabel", desc: "Sangat terstruktur, cocok untuk masukan sistem data", icon: "table_chart" },
      { value: "narrative", label: "Naskah / Dokumen Panjang", desc: "Gaya penulisan natural, deskriptif, dan mirip manusia", icon: "description" },
      { value: "step-by-step", label: "Instruksi Bertahap", desc: "Pecahan logika berpikir logis (Chain of Thought)", icon: "account_tree" }
    ]
  },
  {
    id: 3,
    title: "Pilih Model Engine Utama Preferensi Anda",
    subtitle: "Setiap kecerdasan buatan memiliki karakter logika serta arsitektur yang unik.",
    options: [
      { value: "Claude 3.5", label: "Claude 3.5 (Anthropic)", desc: "Nuansa bahasa tinggi, ideal untuk logika dan coding", icon: "bolt" },
      { value: "ChatGPT", label: "ChatGPT / GPT-4o (OpenAI)", desc: "Cepat, kreatif, multifungsi untuk draf terstruktur", icon: "auto_awesome" },
      { value: "Gemini Pro", label: "Gemini 1.5 Pro (Google)", desc: "Context window masif, cocok untuk data raksasa", icon: "google" }
    ]
  }
];

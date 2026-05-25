import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Mail, 
  FileText, 
  Instagram, 
  Building2, 
  Code, 
  ShoppingBag, 
  GraduationCap, 
  History, 
  Compass, 
  Search, 
  AlertCircle, 
  Check, 
  Copy, 
  ExternalLink, 
  Star, 
  Trash2, 
  Zap, 
  Flame, 
  ArrowRight, 
  Loader2, 
  User,
  MessageSquare,
  HelpCircle,
  Clock,
  Terminal,
  Layers,
  Palette,
  Heart,
  SearchCode
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SaaSWorkspaceProps {
  onSendToPlayground: (prompt: string) => void;
  searchQuery?: string;
}

interface SavedTemplate {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  category: string;
  templateText: string;
}

interface UsageHistoryItem {
  id: string;
  templateTitle: string;
  timestamp: string;
  previewText: string;
}

export default function SaaSWorkspace({ onSendToPlayground, searchQuery }: SaaSWorkspaceProps) {
  // Category tabs defined in the guidelines
  // 'paling-sering' | 'pelajar' | 'pekerja' | 'umkm' | 'creator' | 'designer' | 'coding'
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>("paling-sering");
  
  // Choose chosen active template inside selected category
  const [activeTemplateId, setActiveTemplateId] = useState<string>("cv-ats");
  
  // Custom inputs state for the active form
  const [formInputs, setFormInputs] = useState<Record<string, string>>({});
  
  // Dashboard view tab: 'smart-form' | 'favorites' | 'history' | 'ai-recommend'
  const [activeDashboardTab, setActiveDashboardTab] = useState<"smart-form" | "favorites" | "history" | "ai-recommend">("smart-form");

  // Premium feature states: Favorites and History saved in localStorage
  const [favorites, setFavorites] = useState<SavedTemplate[]>([]);
  const [history, setHistory] = useState<UsageHistoryItem[]>([]);

  // Search input by outcome/goal to easily find templates
  const [searchGoalQuery, setSearchGoalQuery] = useState<string>("");

  // Difficulty filter state for beginner users ("Paling Mudah / Untuk Pemula")
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "pemula">("all");

  // Synchronise parent seek query
  useEffect(() => {
    if (searchQuery !== undefined && searchQuery.trim() !== "") {
      setSearchGoalQuery(searchQuery);
      setActiveCategoryTab(""); // Reset category filter to allow global search
    } else if (searchQuery === "") {
      setSearchGoalQuery("");
      setActiveCategoryTab("paling-sering");
    }
  }, [searchQuery]);

  // AI execution states
  const [isExecutingAI, setIsExecutingAI] = useState<boolean>(false);
  const [aiOutputResult, setAiOutputResult] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Copy states
  const [copiedPromptState, setCopiedPromptState] = useState<boolean>(false);
  const [copiedResultState, setCopiedResultState] = useState<boolean>(false);
  const [showLaunchModal, setShowLaunchModal] = useState<boolean>(false);
  const [lastLaunchedBot, setLastLaunchedBot] = useState<string>("");
  const [compiledPromptResult, setCompiledPromptResult] = useState<string>("");

  // Recommendation matcher state
  const [recommendCategory, setRecommendCategory] = useState<string>("Belajar");
  const [recommendOutput, setRecommendOutput] = useState<{
    bestModel: string;
    description: string;
    reason: string;
    tips: string[];
  } | null>(null);

  // Toggle visual advanced mode in the UI
  const [advancedMode, setAdvancedMode] = useState<boolean>(false);

  // Initialize and load localStorage items
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem("sliced_favorites");
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      } else {
        // Hydrate with initial boilerplate favorite
        const initialFav: SavedTemplate = {
          id: "cv-ats",
          title: "Template CV ATS Profesional",
          description: "Struktur kurikulum vitae anti-gagal yang mudah lolos seleksi bot HRD modern.",
          difficulty: "🟢 Pemula",
          category: "Pekerja Kantoran",
          templateText: "Bertindak sebagai Ahli Rekrutmen Senior..."
        };
        setFavorites([initialFav]);
        localStorage.setItem("sliced_favorites", JSON.stringify([initialFav]));
      }

      const savedHist = localStorage.getItem("sliced_history");
      if (savedHist) {
        setHistory(JSON.parse(savedHist));
      }
    } catch (e) {
      console.warn("Storage error: ", e);
    }
  }, []);

  // Detailed categories mappings with custom icons and visual color accents
  const categories = [
    { id: "paling-sering", label: "Utama & Populer", desc: "Resep paling dicari", icon: Flame, color: "text-amber-500", bgLight: "bg-amber-50/70 border-amber-100 hover:bg-amber-100" },
    { id: "pelajar", label: "Pelajar & Mahasiswa", desc: "Tugas kuliah & sekolah", icon: GraduationCap, color: "text-blue-500", bgLight: "bg-blue-50/70 border-blue-100 hover:bg-blue-100" },
    { id: "pekerja", label: "Pekerja Kantoran", desc: "Laporan & email sopan", icon: FileText, color: "text-emerald-500", bgLight: "bg-emerald-50/70 border-emerald-100 hover:bg-emerald-100" },
    { id: "umkm", label: "UMKM & Jualan", desc: "Slogan & copywriting", icon: ShoppingBag, color: "text-orange-505", bgLight: "bg-orange-50/70 border-orange-100 hover:bg-orange-100" },
    { id: "creator", label: "Content Creator", desc: "Ide & naskah viral TikTok", icon: Instagram, color: "text-rose-500", bgLight: "bg-rose-50/70 border-rose-100 hover:bg-rose-100" },
    { id: "designer", label: "Untuk Desainer", desc: "Brief logo & brand guide", icon: Palette, color: "text-purple-500", bgLight: "bg-purple-50/70 border-purple-100 hover:bg-purple-100" },
    { id: "coding", label: "Programmer", desc: "Debug kode & refactor", icon: Code, color: "text-sky-500", bgLight: "bg-sky-50/70 border-sky-100 hover:bg-sky-100" }
  ];

  // All Outcome-to-Form Templates
  const templates = [
    // === SECTION 1: PALING SERING ===
    {
      id: "cv-ats",
      title: "📄 Buat CV ATS Kompetitif",
      outcomeGoal: "Saya ingin membuat isi CV modern yang mudah dideteksi HRD",
      icon: FileText,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-50/50 hover:bg-blue-50 border-blue-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "Gemini 1.5, Claude 3.5 & ChatGPT",
      categoryTab: "paling-sering",
      fields: [
        { key: "fullName", label: "Nama Lengkap Anda", placeholder: "e.g., Fadhil Pratama, S.T.", defaultValue: "Fadhil Pratama, S.T." },
        { key: "targetRole", label: "Posisi Pekerjaan Target", placeholder: "e.g., Lead Quality Assurance Lead", defaultValue: "Senior Quality Assurance" },
        { key: "experience", label: "Uraian Pengalaman Kerja Utama", placeholder: "e.g., 3 Tahun memimpin implementasi automated test di FinTech", defaultValue: "3 Tahun memimpin pengujian otomatis (automated testing) menggunakan Selenium & Cypress di startup logistik" },
        { key: "achievements", label: "Pencapaian Terbesar (Metric-based / Angka)", placeholder: "e.g., Mempercepat rilis sistem 35%, mendeteksi 90%+ bug kritis", defaultValue: "Memotong durasi rilis aplikasi hingga 40% dan menekan tingkat error produksi di bawah 0.5% secara konsisten" },
        { key: "education", label: "Riwayat Pendidikan", placeholder: "e.g., S1 Sistem Informasi Universitas Gadjah Mada", defaultValue: "S1 Teknik Informatika Universitas Indonesia (IPK 3.75)" }
      ],
      sampleOutput: `### PROFILE RINGKASAN PROFESIONAL
Senior Quality Assurance berdedikasi tinggi dengan pengalaman 3+ tahun memformulasikan strategi pengujian otomatis (automated testing) di industri skala besar. Teruji meningkatkan akurasi kepatuhan kode produksi serta membangun tim handal.

### PENGALAMAN PROFESIONAL UTAMA
**Senior Quality Assurance — Perusahaan Logistik Digital (2023 - Sekarang)**
- Merancang serta mengeksekusi arsitektur automated testing berbasis Cypress dan Selenium, memotong siklus testing manual hingga 40%.
- Melakukan audit berkala yang sukses mendeteksi 90%+ kecacatan sistem sebelum rilis, menyelamatkan biaya operasional tim pengembang.
- Mewujudkan efisiensi rilis harian dan berkoordinasi langsung dengan tim devops untuk meluncurkan pipeline CI/CD yang stabil.

### PENDIDIKAN
**S1 Teknik Informatika — Universitas Indonesia**
- IPK: 3.75 / 4.00, Fokus Studi: Keandalan Sistem Lunak & Integritas Basis Data`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak sebagai Ahli Rekrutmen Senior dan Perancang Resume ATS Bersertifikasi. Susunlah isi draf CV berkinerja tinggi yang ramah pemindai ATS untuk profesional bernama [${inputs.fullName || "Fadhil Pratama"}]. 

Berikut adalah parameter data profesional:
- Nama Lengkap: ${inputs.fullName || "Fadhil Pratama"}
- Posisi Target: ${inputs.targetRole || "Senior Quality Assurance"}
- Pengalaman Kerja: ${inputs.experience || "3 Tahun"}
- Pencapaian Utama: ${inputs.achievements || "Meningkatkan performa load-time 40%"}
- Pendidikan: ${inputs.education || "S1 Teknik Informatika UI"}

Tuliskan CV ini dalam format Markdown yang elegan, berstruktur rapi, menggunakan kata kerja aksi profesional (action verbs), dan pastikan kata kunci posisi krusial tersebar optimal agar memudahkan filter lolos bot HRD secara taktis.`;
      }
    },
    {
      id: "email-profesional",
      title: "📧 Email Profesional & Sopan",
      outcomeGoal: "Saya ingin menulis surat pengajuan formal kepada pimpinan atau eksternal",
      icon: Mail,
      iconColor: "text-[#10a37f]",
      bgColor: "bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "ChatGPT & Gemini",
      categoryTab: "paling-sering",
      fields: [
        { key: "sender", label: "Nama Pengirim", placeholder: "e.g., Amanda Amelia", defaultValue: "Amanda Amelia" },
        { key: "recipient", label: "Penerima Email / Jabatan", placeholder: "e.g., Bapak Budi Santoso (Direktur HR)", defaultValue: "Bapak Budi Santoso (Direktur HR GoTo)" },
        { key: "goal", label: "Tujuan Utama Mengirim Email", placeholder: "e.g., Pengajuan pengunduran diri karena lanjut kuliah", defaultValue: "Pengajuan izin cuti melahirkan selama 3 bulan" },
        { key: "points", label: "Poin Tambahan Yang Ingin Disebutkan", placeholder: "e.g., Bersedia melatih staf pengganti", defaultValue: "Periode mulai 1 Juli s/d 30 September, pekerjaan utama didelegasikan sementara kepada Riska Amelia" },
        { key: "tone", label: "Pilihan Gaya Penyampaian", placeholder: "Formal / Ramah / Sangat Sopan & Takzim", defaultValue: "Sangat Sopan, Takzim, dan Profesional" }
      ],
      sampleOutput: `Subjek: Permohonan Izin Cuti Melahirkan Resmi — Amanda Amelia (Finance Admin)

Yth. Bapak Budi Santoso,
Direktur HR GoTo

Dengan hormat,
Melalui email resmi ini, saya yang bertandatangan di bawah ini, Amanda Amelia, selaku Finance Admin, bermaksud untuk mengajukan izin cuti melahirkan selama 3 (tiga) bulan penuh, terhitung mulai tanggal 1 Juli sampai dengan 30 September 2026.

Untuk menjamin kelancaran operasional di divisi keuangan selama ketidakhadiran saya, seluruh tugas harian utama telah saya koordinasikan dan delegasikan sementara kepada rekan se-tim saya, Riska Amelia. Saya juga telah mengarsipkan seluruh panduan pelaporan terkini agar dapat diakses kapan saja.

Saya mengucapkan terima kasih yang sebesar-besarnya atas pengertian, dukungan, serta bimbingan luar biasa yang Bapak berikan selama ini. Saya berkomitmen untuk tetap melakukan transisi data pekerjaan sebaik mungkin sebelum tanggal cuti saya dimulai.

Hormat saya,
Amanda Amelia`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Tuliskan draf email korporasi profesional siap kirim dalam bahasa Indonesia yang ringkas, runtut, dan bebas kesalahan ejaan.
Pengirim: ${inputs.sender || "Amanda Amelia"}
Penerima: ${inputs.recipient || "Bapak Budi Santoso"}
Tujuan Email: ${inputs.goal || "Pengajuan cuti melahirkan"}
Poin Kunci Transisi: ${inputs.points || "Delegasi kepada Riska"}
Gaya Penulisan: ${inputs.tone || "Sangat Sopan & Takzim"}

Sediakan:
1. Pilihan baris Subjek Email yang eksplisit dan representatif.
2. Draf badan email lengkap dengan sapaan hormat pembuka serta penutup formal korporasi.`;
      }
    },
    {
      id: "ringkas-dokumen",
      title: "📑 Ringkas Dokumen Kilat",
      outcomeGoal: "Saya ingin menyerap bab materi tebal atau artikel dalam bentuk poin penting",
      icon: Layers,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50/50 hover:bg-amber-50 border-amber-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "Gemini 1.5 & Claude",
      categoryTab: "paling-sering",
      fields: [
        { key: "rawText", label: "Tempel Paragraf / Dokumen Mentah", placeholder: "Tempel teks panjang Anda di sini...", defaultValue: "Metode Pembelajaran Mesin (Machine Learning) telah berkembang menjadi pilar penting dalam arsitektur digital abad ke-21. Menggunakan algoritma beralur statistik, komputer dilatih mendeteksi tren berulang di dalam kumpulan data masif secara otomatis. Dibandingkan pemrograman konvensional di mana instruksi diketik satu-persatu secara kaku oleh insinyur, Machine Learning bergerak dinamis dengan mendefinisikan rules sendiri berdasarkan sampel. Namun, tantangan utama terletak pada melimpahnya bias interpretasi jika sampel yang diumpankan tidak netral atau berimbang." },
        { key: "focus", label: "Aspek Fokus Analisis", placeholder: "e.g., Cari inti masalah dan solusi akademis", defaultValue: "Perbedaan Machine Learning dengan Pemrograman Tradisional serta Tantangan Utamanya" }
      ],
      sampleOutput: `### 📌 RANGKUMAN EKSEKUTIF DOKUMEN

* **Konsep Dasar**: *Machine Learning* bertumpu pada algoritma statistik untuk mengidentifikasi pola berulang secara mandiri di dalam kumpulan data berukuran masif.
* **Perbedaan Utama**: 
  - **Pemrograman Konvensional**: Aturan instruksi didefinisikan secara manual satu demi satu secara statis oleh programmer.
  - **Machine Learning**: Mesin secara dinamis membuat aturannya sendiri setelah dilatih melintasi berbagai macam sampel.
* **Tantangan Utama**: Rentan memicu bias keputusan yang signifikan apabila kumpulan data latih (training data) yang dimasukkan memuat informasi yang berat sebelah (tidak netral).`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Ubah naskah mentah berikut menjadi sebuah ringkasan eksekutif beralur poin-poin penting (bulleted outlines) yang super padat dan mudah dipahami. Use language: Indonesia.

Dokumen Sumber:
"""
${inputs.rawText || ""}
"""

Fokus Analisis: ${inputs.focus || "Intisari dokumen"}

Format output:
- Tuliskan 1 kalimat rangkuman pengenalan materi.
- Sajikan poin-poin kesimpulan esensial. Bold istilah penting untuk asimilasi kilat.`;
      }
    },
    {
      id: "buat-presentasi",
      title: "📊 Kerangka Slide Presentasi",
      outcomeGoal: "Saya ingin membuat struktur draf materi presentasi per slide",
      icon: Sparkles,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50/50 hover:bg-purple-50 border-purple-100",
      difficulty: "🟡 Menengah",
      recommendedAI: "Claude 3.5 & ChatGPT",
      categoryTab: "paling-sering",
      fields: [
        { key: "topic", label: "Topik Pembahasan", placeholder: "e.g., Dampak AI terhadap UMKM Indonesia", defaultValue: "Pentingnya Strategi Green Marketing untuk Brand Kosmetik Lokal" },
        { key: "slidesNum", label: "Jumlah Slide yang Diinginkan", placeholder: "e.g., 5", defaultValue: "5" },
        { key: "audience", label: "Target Audiens Pendengar", placeholder: "e.g., Investor / Mahasiswa / Direksi", defaultValue: "Investor UMKM dan Mahasiswi Gen-Z" }
      ],
      sampleOutput: `### 📋 STRUKTUR DECK PRESENTASI: GREEN COSMETICS LOKAL

#### SLIDE 1: JUDUL & VALUE UTAMA
- **Visual**: Latar putih gading dengan logo daun minimalis berpendar keemasan.
- **Isi Teks**: "Nurturing Beauty, Preserving Nature" — Membangun Masa Depan Kosmetik Indonesia yang Sehat dan Ramah Lingkungan.
- **Catatan Pembicara**: Buka dengan perkenalan statistik pertumbuhan konsumsi produk organik di kalangan Gen-Z Indonesia yang naik 30% tahun ini.

#### SLIDE 2: PERMASALAHAN (Drowning in Plastic)
- **Visual**: Foto infografik tumpukan limbah botol kecantikan biasa di pesisir pantai.
- **Isi Teks**: 80% kemasan kosmetik berakhir merusak ekosistem air. Kosmetik konvensional kaya bahan kimia pengawet yang melukai biota laut.
- **Catatan Pembicara**: Ciptakan empati dan kesadaran emosional. Kita butuh alternatif produk yang peduli sebelum terlambat.

#### SLIDE 3: SOLUSI KAMI (The Green Revolution)
- **Visual**: Demonstrasi produk botol kaca daur ulang isi ulang dengan cairan ekstrak kelapa kelor alami.
- **Isi Teks**: Formulasi vegan 100% lokal, kemasan biodegradable bebas plastik petrokimia, dan skema isi ulang wadah kosong secara praktis.

#### SLIDE 4: POTENSI BISNIS / ROI
- **Isi Teks**: Margin laba bersih 45% dengan model penjualan berlangganan isi ulang pertama di pasar kecantikan lokal.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak sebagai Desainer Slide Deck & Pembuat Pitch Deck Senior. Susun draf kerangka outline materi presentasi sebanyak [${inputs.slidesNum || "5"}] slide dengan topik: "${inputs.topic || "Strategi Green Marketing"}".
Target Audiens: ${inputs.audience || "Umum"}

Sediakan detail di setiap halaman slide berupa:
1. Nama/Judul Halaman Slide.
2. Deskripsi singkat visual / penataan gambar rekomendasional.
3. Teks ringkas yang terpampang di layar (maksimal 3 bullet points, to the point).
4. Catatan pembawaan verbal (speaker notes) praktis bagi pembicara saat berpresentasi.`;
      }
    },
    {
      id: "instagram-caption",
      title: "📱 Caption Sosmed Penjualan",
      outcomeGoal: "Saya ingin memicu interaksi dan ketertarikan beli produk di media sosial",
      icon: Instagram,
      iconColor: "text-rose-600",
      bgColor: "bg-rose-50/50 hover:bg-rose-50 border-rose-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "Grok & ChatGPT",
      categoryTab: "paling-sering",
      fields: [
        { key: "brand", label: "Nama Bisnis / Toko", placeholder: "e.g., Sliced Bakery Jkt", defaultValue: "Martabak Sultan Premium" },
        { key: "product", label: "Nama Produk", placeholder: "e.g., Kue Sourdough Alami", defaultValue: "Martabak Keju Pandan Wijen Wisman" },
        { key: "sellingPoint", label: "Keunggulan Utama / Khasiat", placeholder: "e.g., Tanpa pengawet, lembut 3 hari", defaultValue: "Adonan mentega kuning Wisman murni melimpah, wangi daun pandan asli hasil perasan tangan tanpa essence, dan keju melimpah tebal gurih" },
        { key: "promo", label: "Promo / CTA Utama", placeholder: "e.g., Klik link di bio diskon 20%", defaultValue: "Dapatkan Garansi 100% uang kembali jika rasa tidak enak! Pesan lewat WhatsApp admin di link bio hari ini!" }
      ],
      sampleOutput: `👑 RAJA SEGALA MARTABAK: MARTABAK SULTAN WISMAN NYA REAL MEMANJAKAN LIDAH! 🤤🥞

Bayangkan gigitan pertama martabak tebal berserat empuk, berlumur wangi mentega Wisman khas Belanda yang gurih legendaris, menyatu padu dengan parutan keju tebal melimpah dan wijen sangrai wangi. Ditambah keharuman pandan asli perasan langsung... Bukan essence kimiawi buatan!

Kenapa Martabak Sultan wajib masuk daftar cemilan andalanmu hari ini?
⭐️ Adonan premium berongga sempurna yang lembutnya awet sampai besok pagi.
⭐️ Disiram mentega premium asli tanpa campuran margarin murah.
⭐️ Taburan toping berkualitas tinggi dari ujung ke ujung.

🎁 GARANSI SULTAN: Rasa mengecewakan? Kami kembalikan dana Anda 100% utuh tanpa ribet! 🤝

Yuk, manjakan dirimu dan keluarga tersayang sore ini! Pesan instan sekarang via WhatsApp admin di link bio sebelum kehabisan slot antrean baking! 📲👇

#martabakpremium #wismanmartabak #kulinerjakarta #sweetcrepe #jajananfavorit #martabaksultan`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak sebagai Instagram Copywriter Strategist papan atas. Tulis copywriting promosi bergaya interaktif, persuasif, memakai formula Hook-Story-Offer untuk postingan:
Brand: ${inputs.brand || "Martabak Sultan"}
Produk: ${inputs.product || "Martabak Keju Pandan"}
Kelebihan USP: ${inputs.sellingPoint || "Adonan premium, mentega Wisman tebal"}
Call To Action: ${inputs.promo || "Klik link WhatsApp di bio"}

Buat caption dengan jarak pemisah paragraf yang pas untuk dibaca nyaman lewat layar handphone, sisipkan emoji yang selaras secara estetik, dan akhiri dengan 6 hashtag terpopuler di Indonesia.`;
      }
    },
    {
      id: "deskripsi-produk",
      title: "🛒 Deskripsi Produk Jualan",
      outcomeGoal: "Saya ingin menyusun kata-kata jualan produk di e-commerce",
      icon: ShoppingBag,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-50/50 hover:bg-purple-50 border-purple-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "ChatGPT & Claude",
      categoryTab: "paling-sering",
      fields: [
        { key: "itemName", label: "Nama Produk", placeholder: "e.g., Sendal Kasut Kulit", defaultValue: "Hydro-Mist Tumbler Pintar 750ml" },
        { key: "features", label: "Fitur Unggulan (USP)", placeholder: "e.g., Magnetis, awet air dingin 12 jam", defaultValue: "Layar sentuh LED indikator suhu di tutup botol, bahan baja tahan karat medis SUS 316, mempertahankan dingin es batu hingga 24 jam penuh tanpa keringat, penutup anti-bocor berteknologi vakum udara" },
        { key: "audience", label: "Target Pasar Utama", placeholder: "e.g., Pekerja kantoran, atlet", defaultValue: "Pegawai kantoran urban sibuk, mahasiswa aktif, dan pecinta gaya hidup sehat ramah lingkungan" }
      ],
      sampleOutput: `### 🌿 Hydro-Mist Tumbler Pintar 750ml: Kontrol Hidrasi Cerdas dalam Genggaman Anda

**Suhu Sempurna, Terjaga Sepanjang Hari.**

Memperkenalkan Botol Termos Hidrasi Premium yang dirancang khusus untuk memenuhi dinamika produktivitas harian Anda. Menggabungkan teknologi sensor pintar, efisiensi termal kelas tinggi, dan desain visual minimalis modern yang menonjolkan profesionalitas Anda.

#### 🌟 FITUR UTAMA YANG MENGUBAH STANDARD HIDRASI:
1. **Smart Temp LED Display**: Sentuh lembut tutup botol untuk melihat temperatur akurat secara real-time. Menghindari bibir melepuh secara tidak sengaja demi kenyamanan minum maksimum.
2. **Baja Medis SUS 316 Premium**: Bagian dalam dilapisi logam kelas medis anti-korosif mutlak, ramah higienitas pangan, dan tidak menyisakan residu rasa minuman lama.
3. **Double-Wall Ultra Thermal**: Menjaga minuman Anda tetap luar biasa dingin hingga 24 jam penuh atau kehangatan kopi murni hingga 12 jam tanpa mengembun di genggaman.
4. **Vakum Anti Bocor**: Kunci silikon kedap udara mencegah tumpahan aman walau disimpan terbalik di dalam tas laptop berukuran mahal.

#### 👥 COCOK UNTUK GAYA HIDUP SEHARI-HARI:
- **Pekerja Kreatif & Komuter**: Menjamin ketersediaan kopi andalan hangat selama berjam-jam saat rapat maupun perjalanan jauh.
- **Pencinta Alam & Olahraga**: Menjaga kualitas kesegaran air es murni di bawah terik cuaca tropis Indonesia.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Tulis deskripsi jualan e-commerce (landing page copy / shopee description) yang profesional dan sarat daya tarik untuk produk: [${inputs.itemName || "Hydro-Mist Tumbler"}].
Kelebihan Fitur: ${inputs.features || "LED Indicator, SUS 316"}
Target Pasar: ${inputs.audience || "Pekerja urban"}

Gunakan format Markdown ber-subhead rapi, tunjukkan keunggulan produk secara emosional dan logika fungsional, hindari bahasa bombastis basi, dan sampaikan dalam gaya komunikatif yang seimbang.`;
      }
    },
    {
      id: "proposal-bisnis",
      title: "📋 Proposal Ringkas Bisnis",
      outcomeGoal: "Saya ingin membuat garis besar usulan strategi usaha yang meyakinkan",
      icon: Building2,
      iconColor: "text-orange-600",
      bgColor: "bg-orange-50/50 hover:bg-orange-50 border-orange-100",
      difficulty: "🟡 Menengah",
      recommendedAI: "Gemini Pro & ChatGPT",
      categoryTab: "paling-sering",
      fields: [
        { key: "bizName", label: "Nama & Jenis Usaha", placeholder: "e.g., Kopi Sowan, Cafe lesehan", defaultValue: "Kedai Kopi Sowan, Cafe Micro-Roastery" },
        { key: "targetMarket", label: "Target Pasar Utama", placeholder: "e.g., Mahasiswa remote work", defaultValue: "Mahasiswa kampus sekitar Yogyakarta dan pekerja remote WFH yang butuh tempat duduk luas bersertakan colokan" },
        { key: "uniqueValue", label: "Pembeda / Kelebihan Dibanding Pesaing", placeholder: "e.g., Roasting sendiri, WiFi cepat", defaultValue: "Kami menyangrai biji kopi premium lokal secara mandiri (direct-trade), menawarkan area lesehan modern dengan koneksi internet serat optik 150Mbps" },
        { key: "budget", label: "Anggaran Modal Operasional Awal", placeholder: "e.g., Rp. 25-50 Juta", defaultValue: "Rp. 40 - 55 Juta Rupiah" }
      ],
      sampleOutput: `### 🎯 BLUEPRINT USULAN BISNIS: KEDAI KOPI SOWAN

#### 1. SEKTOR TARGET PASAR (MARKET FIT)
Fokus tertuju penuh pada mahasiswa aktif penyusun skripsi, pekerja lepas (freelancer WFH), dan penikmat cita rasa kopi premium segar di wilayah sekitar Yogyakarta yang membutuhkan produktivitas tempat kerja berjam-jam tanpa harus diganggu batasan colokan listrik.

#### 2. VALUABLE PROPOSITION (NILAI UNIK KOMPETITIF)
Dibandingkan kedai waralaba besar yang bising dan mahal, Kopi Sowan menyatukan konsep:
- **Direct Trade Roastery**: Biji kopi diserap langsung dari petani lereng Merapi dan disangrai mandiri oleh teknisi roast-master kami demi menyajikan harga cangkir terjangkau namun rasa berfidelitas tinggi.
- **Productive Sanctuary**: Meja belajar dan bersantai lesehan luas, dilengkapi asupan colokan listrik di setiap sudut sandaran, serta dijamin akses internet serat optik handal berkecepatan 150Mbps tanpa hambatan log-in ganda.

#### 3. TAKTIK STRATEGI PEMASARAN GRILYA (Low-Cost Marketing)
- **Program "Bayar Pakai IPK"**: Diskon khusus untuk mahasiswa dengan IPK di atas 3.5 pada pekan-pekan ujian nasional.
- **Micro-Influencer Marketing**: Memberikan voucher kopi belajar gratis bagi kreator YouTube kampus terkemuka untuk unboxing review ruangan produktif kami.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak selaku Penasihat Mentor Skema Bisnis UMKM dan Tapis Investasi. Rancang usulan outline rencana proposal pertumbuhan usaha yang ringkas, strategis, dan komersial untuk:
Nama Usaha: ${inputs.bizName || "Kopi Sowan"}
Target Pelanggan: ${inputs.targetMarket || "Pekerja kreatif & mahasiswa"}
Value Proposition: ${inputs.uniqueValue || "Jaminan kopi roastery murah & wifi secepat kilat"}
Rencana Dana Modal: ${inputs.budget || "Rp 40 juta"}

Rancang draf ini dalam 3 poin utama: Target Segmentasi Detil, Keunggulan Kompetitif Strategik, dan Program Pemasaran Berbiaya Rendah (Guerilla Marketing Tactics).`;
      }
    },
    {
      id: "balas-chat",
      title: "💬 Balas Chat Customer Toko",
      outcomeGoal: "Saya ingin merespons keluhan atau pertanyaan customer dengan nada ramah sapaan sopan",
      icon: MessageSquare,
      iconColor: "text-teal-600",
      bgColor: "bg-teal-50/50 hover:bg-teal-50 border-teal-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "ChatGPT & Gemini",
      categoryTab: "paling-sering",
      fields: [
        { key: "customerMsg", label: "Salin Chat Pelanggan", placeholder: "e.g., Paket saya kok belum sampai ya? Ini gimana pelayanannya?", defaultValue: "Halo min, paket saya dengan nomor resi JNE-90823 kok belum bergeser ya dari gudang transit Jakarta? Padahal saya butuh bgt buat acara wisuda lusa!" },
        { key: "policy", label: "Tindakan Toko & Solusi", placeholder: "e.g., Cek kurir, minta tunggu, beri diskon", defaultValue: "Meminta maaf atas keterlambatan, langsung menghubungi eskalasi kurir partner, menawarkan refund ongkir jika lusa belum tiba, serta memberikan voucer potongan belanja berikutnya Rp. 10.000" },
        { key: "replyStyle", label: "Gaya Komunikasi Jawaban", placeholder: "e.g., Ramah & Solutif menggunakan emotikon", defaultValue: "Sangat Ramah, Menenangkan, Solutif, Bersahabat dengan emotikon sopan" }
      ],
      sampleOutput: `Halo Kak Amanda, selamat siang! Terima kasih banyak ya sudah menghubungi kami. 😊👋

Sebelumnya kami memohon maaf yang sebesar-besarnya atas ketidaknyamanan yang Kakak alami terkait keterlambatan pengiriman paket resi JNE-90823 tersebut. Kami sangat memahami betapa krusialnya paket ini untuk momen spesial wisuda Kakak lusa nanti. 🙏🎓

Mengenai kendala transit di gudang JNE Jakarta, tim kami baru saja berkoordinasi langsung dengan pihak eskalasi agen kurir JNE untuk mempercepat pemrosesan logistik paket Kakak agar dikirimkan menggunakan kloter kurir prioritas sore ini juga.

Sebagai komitmen tanggung jawab kami atas ketidaknyamanan ini:
1. Kami akan terus pantau resi Kakak setiap 2 jam sekali dan mengabari Kakak langsung hingga paket tiba dengan selamat.
2. Jika lusa paket belum juga tiba, kami bersedia mengembalikan (refund) ongkos kirim Kakak seluruhnya.
3. Kami juga menyelipkan voucer belanja potongan Rp 10.000 (VOUCHERSULTAN10) sebagai tanda maaf kecil dari toko kami untuk belanjaan Kakak selanjutnya. 🥰

Mohon ditunggu ya, Kak. Semoga segala persiapannya lancar hingga hari H wisuda nanti! Jika ada hal lain yang perlu dikonfirmasi, silakan hubungi kami kapan saja. 🌸`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak selaku Head of Customer Success Toko Onlinestore Berperingkat Bintang 5. Tulis balasan chat cepat, responsif, berharga empati tinggi, mendinginkan suasana, dan solutif untuk chat kendala customer di bawah ini. Language: Indonesia.

Chat Pelanggan:
"${inputs.customerMsg || "Paket telat"}"

Kebijakan Solusi Toko:
"${inputs.policy || "Hubungi logistik dan beri voucher potongan"}"

Gaya Bahasa: ${inputs.replyStyle || "Sangat Ramah & Solutif"}`;
      }
    },
    {
      id: "ide-konten",
      title: "📈 Formula Ide Konten Sosmed",
      outcomeGoal: "Saya ingin membuat daftar ide video/tulisan yang memicu interaksi",
      icon: Flame,
      iconColor: "text-[#d97757]",
      bgColor: "bg-orange-50/50 hover:bg-orange-50 border-orange-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "Grok & Claude",
      categoryTab: "paling-sering",
      fields: [
        { key: "niche", label: "Niche / Bidang Konten", placeholder: "e.g., Tips keuangan anak kos", defaultValue: "Merawat Tanaman Hias Indoor & Minimalis untuk Pemula" },
        { key: "platform", label: "Platform Sosial Media", placeholder: "e.g., TikTok / Reels", defaultValue: "Video TikTok & Instagram Reels (Durasi <60 Detik)" }
      ],
      sampleOutput: `### 📈 3 IDE KONTEN TIKTOK/REELS MINIMALIS & VIRAL

#### 1. Ide Konten "Edukasi Mitos VS Fakta"
- **📜 Hook Kalimat Pembuka**: "Berhenti menyiram tanaman indoor Anda setiap hari, ini alasan kenapa mereka layu!"
- **📝 Garis Cerita (Storyline)**: Tunjukkan montase video estetik menyiram pot lidah mertua yang busuk karena tanah terlalu basah. Tempelkan teks bahwa tanaman indoor butuh sirkulasi udara kering, bukan penyiraman air berlebih.
- **🎁 CTA Pembawa Reaksi**: "Tulis di kolom komentar, seberapa sering kamu siram tanaman hiasmu seminggu?"

#### 2. Ide Konten "Bento Hacks Murah"
- **📜 Hook Kalimat Pembuka**: "Tanaman hias layu? Segarkan kembali cuma modal sisa ampas kopi dapur!"
- **📝 Garis Cerita**: Tunjukkan menyiramkan segelas campuran ampas kopi dingin kering sebagai pupuk nitrogen alami gratis.
- **🎁 CTA**: "Follow akun kami untuk tips merawat tanaman indoor estetik low-budget lainnya!"`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Tuliskan 3 rancangan ide konsep video vertikal berenergi tinggi, penuh hook menarik, dan berpotensi memicu interaksi komentar luas (viral) di platform [${inputs.platform || "TikTok/Reels"}].
Niche Bidang: ${inputs.niche || "Merawat tanaman indoor"}

Setiap ide harus memuat:
- Kalimat Hook Pembuka 3 detik pertama (mencegah jempol scroll lewat).
- Rencana alur cerita visual / apa yang diperagakan di layar gawai.
- Struktur ajakan interaksi penutup (Call to Action).`;
      }
    },
    {
      id: "tugas-kuliah",
      title: "🎓 Asisten Tugas Kuliah",
      outcomeGoal: "Saya ingin memformulasikan kerangka outline tugas studi yang berbobot ilmiah",
      icon: GraduationCap,
      iconColor: "text-[#4285f4]",
      bgColor: "bg-indigo-50/50 hover:bg-indigo-50 border-indigo-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "Claude 3.5 & Gemini",
      categoryTab: "paling-sering",
      fields: [
        { key: "course", label: "Nama Mata Kuliah", placeholder: "e.g., Pengantar Ekonomi Makro", defaultValue: "Sosiologi Perkotaan & Modernitas" },
        { key: "topic", label: "Topik Pembahasan Tugas", placeholder: "e.g., Teori inflasi", defaultValue: "Analisis dampak gentrifikasi terhadap komunitas lokal di Jakarta Selatan" },
        { key: "instructions", label: "Deskripsi Instruksi / Masalah Soal", placeholder: "e.g., Analisis minimal 2 teori", defaultValue: "Uraikan fenomena gentrifikasi, hubungkan dengan teori sosiologi habitus Pierre Bourdieu, sertakan kesimpulan solutif bagi warga miskin kota" }
      ],
      sampleOutput: `### 📚 KERANGKA AKADEMIK USULAN TUGAS

#### 🏢 JUDUL USULAN MAKALAH
"Reproduksi Kelas dan Pergeseran Spasial: Analisis Sosiologis Habitus Pierre Bourdieu Terhadap Fenomena Gentrifikasi di Kemang, Jakarta Selatan"

#### 1. ABSTRAK INTRODUKSI FENOMENA
Gentrifikasi bukan sekadar pembaharuan fisik ruko perkotaan, melainkan migrasi kelas menengah atas urban berdaya beli tinggi ke wilayah suburban padat penduduk asli berkapital kecil. Hal ini memicu dislokasi sosial ekonomi warga lokal akibat meroketnya harga lahan dan biaya hidup primer.

#### 2. KAJIAN TEORITIS (Habitus Pierre Bourdieu)
- **Habitus & Selera**: Kafe estetik, ruang kerja bersama, dan ruko butik mewah di area gentrifikasi terbentuk sebagai manifestasi 'selera kelas' (distinction) kaum urban pendatang. Selera ini terlegitimasi sebagai habitus modis yang mendominasi nilai guna lahan lama.
- **Akumulasi Kapital**: Warga lokal terpaksa tergusur karena ketidakmampuan menandingi modal budaya, modal simbolik, dan modal sosial pendatang untuk beradaptasi di ruang hidup mereka sendiri.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak selaku Dosen Pembimbing Lapangan dan Akademisi Senior bidang ${inputs.course || "Ilmu Sosial"}. Susunlah draf materi kerangka analisis akademis berkualitas tinggi untuk membantah penjiplakan, dengan rujukan argumen yang runtun dan berfidelitas tinggi.
Topik Riset: ${inputs.topic || "Gentrifikasi"}
Instruksi Penugasan: ${inputs.instructions || "Bandingkan teori habitus Bourdieu"}

Sediakan outline akademis melingkupi: Rekomendasi judul formal yang mendalam, Ringkasan pendahuluan deskriptif fenomena terkait, Aplikasi Tinjauan Teori secara logis terarah, dan Kesimpulan kritis solutif.`;
      }
    },

    // === SECTION 2: PELAJAR & MAHASISWA ===
    {
      id: "ringkasan-materi",
      title: "📖 Ringkasan Materi Akademis",
      outcomeGoal: "Meringkas modul pelajaran dengan bahasa mudah diingat",
      icon: GraduationCap,
      iconColor: "text-[#4285f4]",
      bgColor: "bg-indigo-50/50 hover:bg-indigo-50 border-indigo-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "Claude 3.5 & ChatGPT",
      categoryTab: "pelajar",
      fields: [
        { key: "subject", label: "Mata Pelajaran / Kuliah", defaultValue: "Biologi Sel & Molekuler" },
        { key: "text", label: "Teks Materi / Salinan Modul", defaultValue: "Mitokondria merupakan organel sel ganda yang bertanggung jawab dalam sintesis Adenosin Trifosfat (ATP) melalui siklus asam sitrat dan transpor elektron. Struktur dalam mitokondria melipat-lipat membentuk krista guna memperluas area permukaan enzimatis..." }
      ],
      sampleOutput: `### 🔬 Rangkuman Cepat: Mitokondria (Pembangkit Energi Sel)

* **Organel Utama**: Mitokondria diibaratkan sebagai "pembangkit listrik" mikroskopis di dalam sel tubuh kita.
* **Tugas Pokok**: Menghasilkan **Adenosin Trifosfat (ATP)**, yaitu bahan bakar kimia siap pakai yang digunakan sel untuk bergerak dan membelah.
* **Rahasia Struktur**: Melipat-lipat membentuk permukaan bernama **Krista**. Kenapa melipat? Supaya muat menampung lebih banyak enzim pembuat energi tanpa menambah ukuran sel.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Rangkumlah teks akademis pelajaran [${inputs.subject}] berikut menjadi sebuah ringkasan komparatif yang sangat bersahabat bagi daya ingat siswa:
"${inputs.text}"
Gunakan penulisan visual kreatif Indonesia, analogikan istilah rumit dengan perumpamaan dunia nyata, serta bold bagian kunci kuis ujian.`;
      }
    },
    {
      id: "outline-skripsi",
      title: "🎓 Blueprint Proposal Skripsi",
      outcomeGoal: "Merancang outline skripsi ilmiah lengkap dengan rumus masalah",
      icon: GraduationCap,
      iconColor: "text-blue-600",
      bgColor: "bg-indigo-50/50 border-indigo-100",
      difficulty: "🔴 Sulit",
      recommendedAI: "Claude 3.5 & Gemini 1.5",
      categoryTab: "pelajar",
      fields: [
        { key: "topic", label: "Tema Besar Skripsi", defaultValue: "Dampak FinTech terhadap daya beli pekerja informal gig-economy" },
        { key: "method", label: "Metodologi Riset", defaultValue: "Kuantitatif Regresi Linier Berganda dengan survei sampel" },
        { key: "problem", label: "Fokus Masalah Utama", defaultValue: "Apakah pinjaman online meningkatkan ketidakstabilan keuangan harian ojek online" }
      ],
      sampleOutput: `### 🎓 OUTLINE SKRIPSI AKADEMIS KELAS UTAMA

#### Judul Cadangan Formulasi:
*"Analisis Pengaruh Literasi Finansial dan Penggunaan Pinjaman Online Terhadap Ketidakstabilan Keuangan Driver Ojek Online di DKI Jakarta"*

#### 1. LATAR BELAKANG & PERMASALAHAN UTAMA
Pekerja informal gig-economy memiliki ketidakpastian pendapatan yang ekstrem harian. Kemudahan akses teknologi peer-to-peer lending acapkali dimanfaatkan sebagai bantalan likuiditas instan, namun tanpa literasi keuangan mumpuni, hal tersebut menjerat mereka ke dalam belenggu utang berantai (debt trap).

#### 2. DATA INSTRUMEN & VARIABEL PENELITIAN
- **Variabel Independen (X1)**: Literasi Keuangan Rumah Tangga
- **Variabel Independen (X2)**: Frekuensi Akses FinTech Landing
- **Variabel Dependen (Y)**: Indeks Ketidakstabilan Finansial Pekerja Gig`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Rancang blueprint outline proposal penelitian skripsi akademis formal untuk:
Topik: ${inputs.topic}
Metodologi: ${inputs.method}
Fokus Masalah: ${inputs.problem}

Sertakan usulan 1 Judul Formal, Rumusan Masalah Riset deskriptif, dan Identifikasi Variabel Utama Teoretis. Language: Indonesia.`;
      }
    },
    {
      id: "belajar-inggris",
      title: "🧬 Latihan English Speaking & Writing",
      outcomeGoal: "Mempelajari percakapan dan tata bahasa dengan penjelasan seru",
      icon: GraduationCap,
      iconColor: "text-[#10a37f]",
      bgColor: "bg-indigo-50/50 border-indigo-100",
      difficulty: "🟢 Mudah",
      recommendedAI: "Gemini 1.5 & ChatGPT",
      categoryTab: "pelajar",
      fields: [
        { key: "level", label: "Tingkat Kemampuan Saat Ini", defaultValue: "Beginner (Sering gagap menyusun Present Perfect)" },
        { key: "focus", label: "Bahasan Latihan", defaultValue: "Cara mengobrol santai mengundang rekan kerja minum kopi di kafe" }
      ],
      sampleOutput: `### 🇬🇧 English Corner: Coffee Invitation Made Simple

#### 🗣️ 1. GAYA PERCAKAPAN HARI INI
- **Ekspresi Kasual**: *"Hey Rian, are you free for a quick coffee? I need to step out for a bit."*
- **Penjelasan**: Kalimat *"free for a quick coffee"* sangat ramah dan tidak memberi tekanan ke lawan bicara. Ekspresi *"step out for a bit"* bermakna beristirahat keluar ruangan sebentar.

#### ✍️ 2. POLA TATA BAHASA (Simple Hack)
Gunakan: **"Would you care to + [Infinitive]?"** jika ingin terdengar sedikit lebih sopan ke atasan.
- Cth: *"Would you care to join us for coffee, Pak?"* (Apakah bapak berkenan ikut minum kopi bersama kami?)`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak selaku Guru Bahasa Inggris Bilingual ramah anak muda Indonesia. Susunlah materi belajar percakapan praktis yang mudah diingat berdasarkan tingkat kemampuan: ${inputs.level}.
Topik Latihan: ${inputs.focus}.
Sediakan 2 pola kalimat kasual sehari-hari, penjelasan kapan itu digunakan, dan tips pelafalan (pronunciation hack) sederhana.`;
      }
    },

    // === SECTION 3: PEKERJA KANTORAN ===
    {
      id: "notulen-meeting",
      title: "📝 Notulen Rapat (MoM) Otomatis",
      outcomeGoal: "Mengubah catatan acak jalannya rapat menjadi file notulen formal",
      icon: FileText,
      iconColor: "text-indigo-650",
      bgColor: "bg-slate-50 border-slate-200",
      difficulty: "🟡 Menengah",
      recommendedAI: "Claude 3.5 & Gemini 1.5",
      categoryTab: "pekerja",
      fields: [
        { key: "agenda", label: "Judul / Agenda Utama Rapat", defaultValue: "Review Bug Sistem Pembayaran & Target Kuartal III" },
        { key: "rawNotes", label: "Catatan Acak Rapat (Scribble/Draft)", defaultValue: "Andi bilang payment gateway midtrans error pas jam makan siang. Riska minta sdm ditambah buat divisi QA biar ga bocor lagi. Target kuartal 3 pengennya semua fitur auto-retry berhasil live sebelum akhir agustus." }
      ],
      sampleOutput: `### MINUTES OF MEETING (MoM) — FORMAL

**Agenda**: Review Kegagalan Gerbang Pembayaran & Target Teknis Kuartal III
**Momen**: ${new Date().toLocaleDateString("id-ID")}

#### 📌 DETAIL DISKUSI & PERSOALAN
1. **Kebocoran Bug Payment Gateway**:
   - Ditemukan peningkatan anomali kegagalan transaksi (error log) pada integrasi Midtrans yang umumnya memuncak selama jam sibuk makan siang konsumen.
   - Pihak QA mengusulkan pentingnya penambahan kapasitas personel di lini penjaminan mutu uji otomatis sebelum rilis guna menghindari kendala berulang.

#### 🛠️ DAFTAR TINDAKAN LANJUT & PIC (Action Items)
| Tindakan Operasional | Penanggung Jawab (PIC) | Target Batas Waktu |
| :--- | :--- | :--- |
| Investigasi koneksi API load-balancing Midtrans | Andi Wijaya | 12 Juni 2026 |
| Buat proposal perekrutan QA magang/tenaga ahli tambahanan | Riska Amelia | 20 Juni 2026 |
| Uji fungsionalitas auto-retry sistem di server staging | Tim Backend | Akhir Agustus 2026 |`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Ubah draf coretan acak jalannya rapat berikut menjadi dokumen formal berita acara / minutes of meeting (MoM) kepatuhan korporasi dalam bahasa Indonesia.
Agenda: ${inputs.agenda}
Catatan Kasar: "${inputs.rawNotes}"

Sediakan:
- Tinjauan Umum Jalang Rapat yang terpisah berdasarkan area fungsional.
- Tabel "Action Items & Timeline" yang melingkupi ringkasan draf tindakan, PIC, dan estimasi tanggal target resolusi.`;
      }
    },
    {
      id: "laporan-mingguan",
      title: "📊 Laporan Kerja Mingguan (Weekly Report)",
      outcomeGoal: "Menyusun draf laporan kinerja teruji di hadapan manajemen",
      icon: FileText,
      iconColor: "text-emerald-700",
      bgColor: "bg-slate-50 border-slate-200",
      difficulty: "🟢 Mudah",
      recommendedAI: "ChatGPT & Claude",
      categoryTab: "pekerja",
      fields: [
        { key: "role", label: "Posisi Pekerjaan Anda", defaultValue: "Digital Marketing Specialist" },
        { key: "tasksDone", label: "Pekerjaan Selesai Minggu Ini", defaultValue: "Optimasi kampanye Meta Ads untuk promo gajian, memotong biaya CPA sebesar 15%, membuat riset kompetitor tren TikTok Toko Kosmetik" },
        { key: "challenges", label: "Kendala / Hambatan Pekerjaan", defaultValue: "Batas anggaran bulanan dinaikkan tapi persetujuan desain kreatif sering telat di bagian pimpinan" }
      ],
      sampleOutput: `### 📈 LAPORAN KINERJA MINGGUAN (WEEKLY PERFORMANCE REPORT)

**Divisi/Posisi**: Digital Marketing Specialist
**Periode Pelaporan**: Pekan IV — Mei 2026

#### 🏁 1. SUMMARY PEKERJAAN BERHASIL (Completed Tasks)
* **Optimasi Meta Ads Campaign**: Sukses menyetel optimasi bid kampanye musiman promo akhir bulan, memotong metrik *Cost Per Acquisition (CPA)* sebesar 15% dari baseline rata-rata harian.
* **TikTok Trend Assessment**: Menyelesaikan tinjauan analisis taktik kompetitor pada pangsa kosmetik lokal demi merancang peta jalan video kreatif.

#### ⚠️ 2. EVALUASI KENDALA & HAMBATAN (Mitigations)
* **Durasi Persetujuan Desain Kreatif**: Terjadi pelambatan rilis kampanye akibat pimpinan menunda verifikasi visual konten. 
  - *Saran Solusi*: Kami menyarankan penyusunan draf tinjauan mingguan terpusat setiap hari Kamis jam 3 sore guna memotong masa tunggu birokratis.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak sebagai Perancang Strategi Manajemen Sumber Daya Manusia. Konversikan laporan mingguan karyawan ini ke dalam draf laporan profesional berstruktur yang menonjolkan akuntabilitas dan inisiatif solusi.
Jabatan: ${inputs.role}
Tugas Selesai: ${inputs.tasksDone}
Kendala: ${inputs.challenges}

Gunakan gaya bahasa proaktif korporasi, urutkan dengan rapi, dan sertakan usulan solusi konkret sebagai perwakilan profesionalisme karyawan.`;
      }
    },

    // === SECTION 4: UMKM & BISNIS ===
    {
      id: "brand-name",
      title: "🏪 Pencari Nama & Slogan Brand",
      outcomeGoal: "Mendapatkan nama toko/brand yang unik, bermakna, dan menjual",
      icon: ShoppingBag,
      iconColor: "text-pink-650",
      bgColor: "bg-rose-50/20 border-rose-100",
      recommendedAI: "Grok & ChatGPT",
      difficulty: "🟢 Mudah",
      categoryTab: "umkm",
      fields: [
        { key: "category", label: "Sektor Industri / Kategori Bisnis", defaultValue: "Makanan Ringan (Cemilan Keripik Pisang)" },
        { key: "vibe", label: "Feel / Kesan Yang Ingin Diperlihatkan", defaultValue: "Tradisional tapi premium, renyah gurih bikin nostalgia rumah nenek" },
        { key: "format", label: "Gaya Bahasa Nama", defaultValue: "Bahasa Indonesia Sansekerta Modern" }
      ],
      sampleOutput: `### 🌟 REKOMENDASI NAMA & SLOGAN PREMIUM BRAND

#### 1. "PISANG KERSA" (Asal kata Sansekerta: Hati / Kemauan)
- **Makna Filosofi**: Rasa keripik pisang asli yang diolah dengan ketulusan hati pembuat resep tradisional.
- **Slogan Pendamping**: *"Kreasi Renyah Nusantara, Gurih Selaras Rasa"*
- **Alasan Visual**: Sangat cocok menggunakan logo piring tanah liat dengan corak keemasan bergaya premium Indonesia.

#### 2. "AKSARA PISANG LOKA" (Asal kata: Dunia)
- **Slogan Pendamping**: *"Nostalgia Renyah dalam Setiap Gigitan"*`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak sebagai Konsultan Branding & Konsultan Hak Kekayaan Intelektual (HAKI) UMKM Indonesia. Rekomendasikan 2 nama bisnis unik dengan filosofi mendalam dan slogan yang catchy untuk:
Bidang Usaha: ${inputs.category}
Vibe Citra: ${inputs.vibe}
Bahasa Nama: ${inputs.format}

Format keluaran harus mencakup: Nama Brand, Arti/Filosofi mendalam, Konsep Logo Visual teoretis, dan Slogan Tagline yang memikat pembeli.`;
      }
    },
    {
      id: "promo-ideas",
      title: "🏪 Ide Strategi Promo Penjualan",
      outcomeGoal: "Strategi diskon bulanan yang mendongkrak penjualan instan",
      icon: ShoppingBag,
      iconColor: "text-[#d97757]",
      bgColor: "bg-rose-50/20 border-rose-100",
      recommendedAI: "GPT-4o & Gemini",
      difficulty: "🟢 Mudah",
      categoryTab: "umkm",
      fields: [
        { key: "product", label: "Produk yang Dijual", defaultValue: "Hijab Pashmina Plisket & Kerudung Busana Muslim" },
        { key: "moment", label: "Momen / Event Promo", defaultValue: "Gajian Akhir Bulan dan Idul Adha" }
      ],
      sampleOutput: `### 🎯 FORMULA PROMO STRATEGI MAKSIMAL

#### 🏷️ 1. Paket Combo "Sajadah & Hijab Taat"
- **Konsep Promo**: Bundling bundling pashmina dengan ciput rajut tipis andalan. Beri hadiah cuma-cuma berupa tasbih mini kain tile satin.
- **Alasan Psikologis**: Pelanggan merasa hemat pengeluaran daripada belanja printilan satu-per-satu, sekaligus membangun kepemilikan aset lengkap menyambut lusa lebaran kurban.
- **Ajakan Kalimat Iklan**: *"Siap Tampil Rapi Tanpa Ribet Lusa Nanti. Hemat 30% Paket Berkah Akhir Bulan!"*

#### 🏷️ 2. Promo "Voucher Tebus Murah" Rp. 5.000
- **Konsep**: Belanja hijab minimal Rp. 150.000 berhak tebus bros hijab anti-karat seharga Rp 5.000 saja.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Tuliskan 2 strategi penawaran promo / potongan harga inovatif non-konvensional yang meminimalkan kerugian laba namun maksimal dalam rotasi margin barang untuk toko:
Produk: ${inputs.product}
Momen Promo: ${inputs.moment}

Sediakan: Konsep Bundling Unik, Landasan Trigger Psikologi Beli Konsumen, dan Contoh Teks Tagline Pemikat Iklan.`;
      }
    },

    // === SECTION 5: CONTENT CREATOR ===
    {
      id: "video-script",
      title: "📹 Naskah Script Video TikTok",
      outcomeGoal: "Script video kreatif 60 detik lengkap dengan panduan visual kamera",
      icon: Instagram,
      iconColor: "text-rose-600",
      bgColor: "bg-rose-50/20 border-rose-100",
      recommendedAI: "Grok & Claude",
      difficulty: "🟡 Menengah",
      categoryTab: "creator",
      fields: [
        { key: "topic", label: "Topik Pembahasan Video", defaultValue: "Cara mengelola gaji bulanan Rp. 4 Juta pas pas-an di Jakarta biar bisa nabung" },
        { key: "tone", label: "Karakter Pembawaan Kreator", defaultValue: "To the point, asyik bersahabat tanpa menggurui, bahasa kasual Jakarta" }
      ],
      sampleOutput: `### 📹 NASKAH VIDEO VERTIKAL: ATUR GAJI 4 JUTA DI JAKARTA

**Durasi Estimasi**: 45 - 60 Detik

| Waktu | Sudut Kamera & Visual | Kalimat Verbal Pengisi Suara (Voice Over) |
| :--- | :--- | :--- |
| **00:00 - 00:05** | *Close-up* wajah berekspresi kaget sambil memegang lembaran struk belanja tebal di tangan. Kerutan dahi jelas. | **"Gaji empat juta di Jakarta, lusa gajian tapi dompet rasanya udah tipis banget sisa recehan? Jangan-jangan lu salah sekat duit!"** |
| **00:05 - 00:20** | *Mid-shot* dengan transisi cepat ke arah meja. Tunjukkan tiga toples kaca yang ditempel stiker label kertas lakban berwarna. | **"Sini gua bisikin taktik sekat tiga toples. Begitu gajian turun, amankan lima puluh persen buat biaya hidup wajib dulu!"** |
| **00:20 - 00:45** | Layar memperlihatkan ponsel dengan aplikasi tabungan instan tanpa kartu. | **"Toples kedua, taruh sepuluh persen langsung buat dana darurat tanpa toleransi. Sisa tiga puluh persen baru buat nongkrong cantik kopi susu lu!"** |
| **00:45 - 00:60** | Pembicara menunjuk layar gawai mengarah ke bio akun instagram. | **"Gampang kan? No drama tabungan bocor lagi. Follow akun ini buat tips finansial anti rungkad lainnya!"** |`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Tuliskan draf script video vertikal interaktif berdampak tinggi berdurasi 60 detik dalam format tabel struktural yang menunjukkan adegan Visual / Sudut Kamera serta Audio dialog beralur santai Indonesia.
Topik: ${inputs.topic}
Tone: ${inputs.tone}

Pastikan struktur tabel berisi deteksi detik (timeline) yang padat dengan pemanfaatan properti di sekitar pembicara agar video terasa hidup.`;
      }
    },
    {
      id: "hook-viral",
      title: "📹 5 Jenis Hook Viral 3 Detik",
      outcomeGoal: "Menyusun kalimat pembicaraan awal yang menghindari skip penonton",
      icon: Flame,
      iconColor: "text-red-600",
      bgColor: "bg-rose-50/20 border-rose-100",
      recommendedAI: "Grok & ChatGPT",
      difficulty: "🟢 Mudah",
      categoryTab: "creator",
      fields: [
        { key: "theme", label: "Tema Besar Konten", defaultValue: "Rekomendasi laptop gaming harga di bawah 10 Juta" },
        { key: "target", label: "Target Penonton", defaultValue: "Mahasiswa teknik atau arsitektur yang berkantong ngepas" }
      ],
      sampleOutput: `### 💣 KOMPILASI 3 DETIK PERTAMA KANVAS VIRAL

1. **Gaya Hook "Kehilangan Kerugian (FOMO)"**:
   - *Teks & Suara*: *"Jangan pernah beli laptop gaming apa pun tahun ini kalau lu belom nonton list satu ini. Bisa nyesel abis duit tabungan lu!"*
2. **Gaya Hook "Menantang Mitos Umum"**:
   - *"Siapa bilang rendering 3D lancar harus rakit PC belasan juta? Laptop mahasiswa teknik sembilan jutaan ini aslinya udah badak banget!"*
3. **Gaya Hook "Status Sosial Emosional"**:
   - *"Rahasia anak teknik arsitektur lulus tepat waktu tanpa drama laptop lag pas revisi coret-coretan lusa lusa nanti!"*`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Tuliskan 5 strategi rancangan varian kalimat Hook pembuka video singkat berfokus pemicu psikologis emosi penasaran pemirsa dalam segmentasi pasar Indonesia:
Tema Video: ${inputs.theme}
Target Audiens: ${inputs.target}`;
      }
    },

    // === SECTION 6: DESIGNER ===
    {
      id: "brief-logo",
      title: "🎨 Brief Desain Logo Profesional",
      outcomeGoal: "Menyusun instruksi deskripsi visual arah pembentukan desain logo",
      icon: Palette,
      iconColor: "text-[#d97757]",
      bgColor: "bg-purple-50/20 border-purple-100",
      recommendedAI: "Claude 3.5 & Midjourney",
      difficulty: "🟡 Menengah",
      categoryTab: "designer",
      fields: [
        { key: "brandName", label: "Nama Brand / Toko", defaultValue: "Selasih Wellness (Klinik Pijat & Aromaterapi)" },
        { key: "colors", label: "Pilihan Nuansa Warna", defaultValue: "Olive Green (Hijau Zaitun) dan Gold (Emas Lembut)" },
        { key: "aesthetic", label: "Gaya Estetika Visual", defaultValue: "Minimalis Zen, Elegan, Tenang, Tradisional Modern" }
      ],
      sampleOutput: `### 🎨 DESIGN BRIEF: SELASIH WELLNESS LOGO

#### 1. SPIRIT & FILOSOFI CITRA
Merek Selesa Wellness berfokus pada asimilasi ketenangan mental, pemulihan kesehatan fisik, dan warisan kearifan lokal. Logo harus mampu memicu denyut rasa tenang, aman, dan memancarkan layanan premium kelas atas.

#### 2. REKOMENDASI ELEMEN GEOMETRIS (Visual Metaphor)
- **Monogram Kelopak Selasih**: Gabungan huruf "S" tipis melingkar luwes yang membentuk siluet halus kuncup daun kemangi selasih yang sedang merekah seimbang.
- **Harmonious Circle**: Lingkaran luar bergaris putus keemasan tipis sebagai lambang perlindungan zen, energi berkelanjutan, dan keseimbangan tubuh.

#### 3. SPESIFIKASI WARNA PALET
- **Olive Green (Hex: #556B2F)**: Melambangkan kesembuhan organik, keteduhan daun hutan tropis, dan kesehatan ramah lingkungan.
- **Warm Champagne Gold (Hex: #D4AF37)**: Detail halus aksen font untuk mengesankan standar kualitas hotel bintang lima orisinal.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak sebagai Creative Director Jaringan Agensi Branding Internasional. formulasikan rangkuman brief rancangan instruksi arah desain visual logo baru yang menginspirasi desainer grafis:
Brand: ${inputs.brandName}
Warna: ${inputs.colors}
Arah Estetika: ${inputs.aesthetic}

Gunakan bahasa terstruktur mencakup: Filosofi Inti, Elemen Geometris Rekomendasi, Detail Palet Hex Warna, dan 3 Aturan Batasan agar logo tidak terlihat murahan.`;
      }
    },

    // === SECTION 7: PROGRAMMER ===
    {
      id: "debug-code",
      title: "💻 Asisten Debug Kode Error",
      outcomeGoal: "Mencari celah bug dan memperbaikinya dengan cepat",
      icon: SearchCode,
      iconColor: "text-blue-600",
      bgColor: "bg-slate-50 border-slate-200",
      recommendedAI: "Claude 3.5 & DeepSeek",
      difficulty: "🔴 Sulit",
      categoryTab: "coding",
      fields: [
        { key: "language", label: "Bahasa / Framework", defaultValue: "React Native & Expo" },
        { key: "errorLog", label: "Error Message yang Muncul", defaultValue: "Error: Rendered more hooks than during the previous render." },
        { key: "codeSnippet", label: "Tempel Potongan Kode", defaultValue: "const Profile = ({ isAdmin }) => { \n  if (isAdmin) { \n    useEffect(() => { loadAdminConfig(); }, []); \n  } \n  return <Text>User Page</Text>; \n};" }
      ],
      sampleOutput: `### 💡 TEMUAN BUG: LANGGAR ATURAN UTAMA HOOKS REACT

#### ⚠️ PENYEBAB MASALAH (Root Cause)
Di dalam React, Anda dilarang keras meletakkan pemanggilan Hook (termasuk \`useEffect\`) di dalam pernyataan pengkondisian (kondisional \`if (isAdmin)\`). React bergantung pada urutan pemanggilan Hook yang konisten (stable call-order) di setiap render. Ketika properti \`isAdmin\` berubah dari \`true\` ke \`false\`, jumlah Hook yang dieksekusi berkurang, memicu error fatal pecahnya urutan rendering.

#### 🔧 REAL KODE YANG SUDAH DIPERBAIKI (Solusi Aman)
\`\`\`typescript
import React, { useEffect } from 'react';
import { Text } from 'react-native';

const Profile = ({ isAdmin }) => {
  // Solusi: Letakkan useEffect di level terluar (top-level), jalankan pengkondisian di DALAM hook!
  useEffect(() => {
    if (isAdmin) {
      loadAdminConfig();
    }
  }, [isAdmin]); // Tambahkan isAdmin sebagai dependensi pelacakan

  return <Text>User Page</Text>;
};

export default Profile;
\`\`\`

#### 🚀 TIPS INTEGRITAS PERFORMA
- Selalu patuhi standar linter *rules-of-hooks* React.
- Kurangi penyebaran in-line if-conditional yang membungkus inisialisasi state ganda.`,
      compileLogic: (inputs: Record<string, string>) => {
        return `Bertindak selaku Senior Lead Architect Programmer. Temukan letak kegagalan kesalahan logika (bug) dari kode [${inputs.language}] berikut: "
${inputs.codeSnippet}
"
Error Log yang diterima: "${inputs.errorLog}".

Berikan analisis akar penyebab secara ringkas, revisi baris kode solusi yang terstruktur bersih, dan berikan panduan praktik terbaik pencegahan di kemudian hari. Use Language: Indonesia.`;
      }
    },
    {
      id: "refactor-code",
      title: "💻 Refactor Code & Optimasi Memori",
      outcomeGoal: "Mengubah kode yang lambat dan rumit menjadi bersih dan cepat",
      icon: Code,
      iconColor: "text-sky-600",
      bgColor: "bg-slate-50 border-slate-200",
      recommendedAI: "Claude 3.5 & Gemini",
      difficulty: "🔴 Sulit",
      categoryTab: "coding",
      fields: [
        { key: "language", label: "Bahasa Pemrograman", defaultValue: "JavaScript ES6" },
        { key: "snippet", label: "Tempel Kode Lambat / Rusak", defaultValue: "function getUniqueNames(users) {\n  let results = [];\n  for(let i=0; i<users.length; i++) {\n    if(results.indexOf(users[i].name) === -1) {\n      results.push(users[i].name);\n    }\n  }\n  return results;\n}" }
      ],
      sampleOutput: `### 🚀 DRAF REFACTORING KODE MATANG

#### ⚠️ MASALAH EFISIENSI (O(N^2) Complexity)
Potongan kode lama Anda menggunakan pemanggilan nested loop beralur terselubung: memanggil \`indexOf\` di dalam loop \`for\`. Pembacaan ini bernilai waktu kuadratis $O(N^2)$ karena sistem harus memindai seluruh isi array \`results\` berulang-ulang untuk setiap data nama pengguna baru.

#### ⚡ KODE HASIL OPTIMASI (O(N) Complexity)
\`\`\`javascript
/**
 * Mengambil daftar nama unik menggunakan Set JavaScript Modern.
 * Kompleksitas Waktu: O(N) linier tercepat.
 * @param {Array<{name: string}>} users
 * @returns {Array<string>}
 */
function getUniqueNames(users) {
  if (!Array.isArray(users)) return [];
  
  // Menggunakan konstruksi objek Set yang melacak referensi unik instan hash-map
  const uniqueNamesSet = new Set(users.map(u => u.name));
  return Array.from(uniqueNamesSet);
}
\`\`\``,
      compileLogic: (inputs: Record<string, string>) => {
        return `Lakukan peninjauan kembali (code refactoring review) untuk bahasa [${inputs.language}]:
\`\`\`
${inputs.snippet}
\`\`\`
Optimalkan efisiensi performa kompleksitas waktu Big-O, tingkatkan keterbacaan (readability), sela materi modular, dan sedia perbandingan structural. Use language: Indonesia.`;
      }
    }
  ];

  // Set initial default form values when changing active template
  const activeTemplate = templates.find(t => t.id === activeTemplateId) || templates[0];

  useEffect(() => {
    const initialVals: Record<string, string> = {};
    activeTemplate.fields.forEach(f => {
      initialVals[f.key] = f.defaultValue;
    });
    setFormInputs(initialVals);
    setAiOutputResult("");
    setCompiledPromptResult("");
    setErrorMessage("");
    setSuccessMessage("");
  }, [activeTemplateId]);

  // Handle template selection from sidebar category with optional level/difficulty filter
  const activeCategoryTemplates = templates.filter(t => {
    // First apply difficulty filter if selected
    if (selectedDifficulty === "pemula") {
      const isMudah = t.difficulty.toLowerCase().includes("mudah");
      if (!isMudah) return false;
    }

    // Then apply search or category tab filter
    if (searchGoalQuery.trim() !== "") {
      return t.title.toLowerCase().includes(searchGoalQuery.toLowerCase()) || 
             t.outcomeGoal.toLowerCase().includes(searchGoalQuery.toLowerCase());
    }
    return t.categoryTab === activeCategoryTab;
  });

  // Handle input values changing inside smart form
  const handleFieldChange = (key: string, value: string) => {
    setFormInputs(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Run instant AI output generation using local endpoint (Sistem Pengalaman Berbasi Hasil)
  const handleAIExecuteNow = async () => {
    setIsExecutingAI(true);
    setErrorMessage("");
    setSuccessMessage("");
    setAiOutputResult("");

    const compiledPrompt = activeTemplate.compileLogic(formInputs);

    try {
      const response = await fetch("/api/gemini/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: compiledPrompt,
          model: "gemini-3.5-flash" // Standard free Gemini model on port 3000
        })
      });
      
      const data = await response.json();
      if (response.ok && data.output) {
        setAiOutputResult(data.output);
        setSuccessMessage("Hasil sukses dirumuskan secara instan oleh asisten kecerdasan buatan!");

        // Record use in personal usage history log
        const newItem: UsageHistoryItem = {
          id: Math.random().toString(),
          templateTitle: activeTemplate.title,
          timestamp: new Date().toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }) + " WIB",
          previewText: data.output.substring(0, 110) + "..."
        };
        const updatedHist = [newItem, ...history.slice(0, 9)];
        setHistory(updatedHist);
        localStorage.setItem("sliced_history", JSON.stringify(updatedHist));
      } else {
        setErrorMessage(data.error || "Upps! Server AI sedang sibuk merumuskan draf Anda.");
      }
    } catch (e) {
      setErrorMessage("Gagal tersambung ke API peladen. Pastikan koneksi aman.");
    } finally {
      setIsExecutingAI(false);
    }
  };

  // Compile prompt for manual utilization or advanced copying
  const handleCompilePromptOnly = () => {
    const promptText = activeTemplate.compileLogic(formInputs);
    setCompiledPromptResult(promptText);
    setSuccessMessage("Prompt premium telah disusun dengan data input Anda!");
  };

  // Copy controllers
  const copyCompiledPromptToClipboard = () => {
    const promptText = compiledPromptResult || activeTemplate.compileLogic(formInputs);
    navigator.clipboard.writeText(promptText);
    setCopiedPromptState(true);
    setTimeout(() => setCopiedPromptState(false), 2000);
  };

  const copyResultToClipboard = () => {
    navigator.clipboard.writeText(aiOutputResult || activeTemplate.sampleOutput);
    setCopiedResultState(true);
    setTimeout(() => setCopiedResultState(false), 2000);
  };

  // Favorites handling (Template Favorit)
  const toggleFavorite = () => {
    const isAlreadyFav = favorites.some(f => f.id === activeTemplate.id);
    let updated: SavedTemplate[];
    if (isAlreadyFav) {
      updated = favorites.filter(f => f.id !== activeTemplate.id);
      setSuccessMessage("Draf template dikeluarkan dari list favorit.");
    } else {
      updated = [...favorites, {
        id: activeTemplate.id,
        title: activeTemplate.title,
        description: activeTemplate.outcomeGoal,
        difficulty: activeTemplate.difficulty,
        category: activeTemplate.categoryTab,
        templateText: activeTemplate.compileLogic(formInputs)
      }];
      setSuccessMessage("Sukses ditambahkan ke panel Workspace Favorit Anda!");
    }
    setFavorites(updated);
    localStorage.setItem("sliced_favorites", JSON.stringify(updated));
  };

  // Delete individual favorite
  const removeFavoriteById = (id: string) => {
    const updated = favorites.filter(f => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("sliced_favorites", JSON.stringify(updated));
  };

  // Clear usage histories
  const clearHistoryLog = () => {
    setHistory([]);
    localStorage.removeItem("sliced_history");
  };

  // One-Click Use triggers (One Click Use launch bar with copy action)
  const triggerOneClickUse = (platform: "chatgpt" | "claude" | "gemini" | "grok" | "deepseek") => {
    const currentPrompt = compiledPromptResult || activeTemplate.compileLogic(formInputs);
    navigator.clipboard.writeText(currentPrompt);
    
    // External chatbot URLs mapping
    const urls = {
      chatgpt: "https://chatgpt.com/",
      claude: "https://claude.ai/chats",
      gemini: "https://gemini.google.com/app",
      grok: "https://grok.com/",
      deepseek: "https://chat.deepseek.com/"
    };

    setLastLaunchedBot(platform.toUpperCase());
    setShowLaunchModal(true);
    setTimeout(() => {
      window.open(urls[platform], "_blank");
    }, 1500);
  };

  // Calculate dynamic AI matchmaking (Sistem Rekomendasi AI)
  const handleRunRecommendationAI = () => {
    const matches: Record<string, { bestModel: string; description: string; reason: string; tips: string[] }> = {
      Belajar: {
        bestModel: "Claude 3.5 & Gemini 1.5",
        description: "Menggabungkan tata bahasa kontekstual tinggi Claude dengan kapasitas membaca file masif Google Gemini.",
        reason: "Claude memimpin dalam penyusunan bab teoritis argumentatif yang rumit, sedangkan Gemini 1.5 mampu meresap PDF skripsi acuan hingga ribuan halaman instan.",
        tips: [
          "Gunakan Gemini untuk mencerna draf PDF tebal atau draf jurnal acuan Anda.",
          "Salin analisis kasarnya, lalu mintalah Claude untuk memperhalus tata bahasanya (academic paraphrasing)."
        ]
      },
      Bisnis: {
        bestModel: "ChatGPT (GPT-4o) & Claude 3.5",
        description: "Terbaik untuk perumusan taktik strategi komersial, proposal eksekutif, serta email formal.",
        reason: "GPT-4o unggul dalam penulisan draf berstruktur cepat, sedangkan Claude memberi sentuhan komunikasi bersahabat yang memikat investor.",
        tips: [
          "Urutkan model tier bisnis Anda: Free, Pro, Enterprise secara transparan.",
          "Minta GPT-4o untuk memicu analisis emosi penonton."
        ]
      },
      Marketing: {
        bestModel: "Grok (xAI) & ChatGPT (GPT-4o)",
        description: "Unggul mengidentifikasi tren viral harian, click-worthy headline, serta caption yang mendatangkan penjualan.",
        reason: "Grok membaca tren media sosial secara real-time, sedangkan ChatGPT andal mengemas kata promosi dengan formula AIDA secara konsisten.",
        tips: [
          "Gunakan Grok untuk mendeteksi hashtag tren harian Indonesia.",
          "Gunakan pemisahan visual emoji agar teks caption terasa segar diketik."
        ]
      },
      Coding: {
        bestModel: "Claude 3.5 (Anthropic) & DeepSeek-V3",
        description: "Akurasi algoritma tepercaya, andal melakukan debug, serta minim error halusinasi sintaks coding.",
        reason: "Claude menduduki nilai tertinggi pada benchmark pengembangan web, sedangkan DeepSeek unggul dalam kalkulasi logika efisien.",
        tips: [
          "Buat potongan isolasi komponen terkecil saat melampirkan file buggy.",
          "Selalu tanyakan tentang efisiensi memori (Big-O) sebelum mengunggah kode ke server."
        ]
      },
      Desain: {
        bestModel: "Midjourney & ChatGPT Plus (DALL-E 3)",
        description: "Visualisasi visual memukau, interpretasi prompt teks presisi, serta penyusunan moodboard menawan.",
        reason: "DALL-E 3 unggul dalam pematuhan penulisan teks di gambar, sedangkan Midjourney melahirkan estetika foto sinematik premium.",
        tips: [
          "Sebutkan rasio aspek rasio foto di akhir kalimat prompt, cth: '--ar 16:9'.",
          "Tentukan gaya material desain (misal: Suku Nordik, Minimalis Modern, Brutalism)."
        ]
      }
    };

    setRecommendOutput(matches[recommendCategory] || matches["Belajar"]);
  };

  return (
    <section id="onboarding-pemula" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#f2f5f9] to-white relative">
      {/* Background radial effects */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-rose-100/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* SECTION HEADER & HERO POSITIONING (REPOSISI PRODUK) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-indigo-100/60 border border-indigo-200/80 rounded-full text-[10px] font-mono font-bold text-indigo-700">
            <Flame className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>PLATFORM ASISTEN PRODUKTIVITAS AI</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D1527] tracking-tight">
            TEMPLATE AI SIAP PAKAI<br />
            <span className="text-indigo-650">UNTUK KERJA, KULIAH, DAN BISNIS</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-2xl mx-auto font-sans">
            Tidak perlu belajar prompt engineering yang rumit. Cukup pilih tujuan Anda, isi formulir instan, dan biarkan sistem merumuskan hasil profesional kelas dunia dalam hitungan detik.
          </p>
        </div>

        {/* SEARCH BAR & CATEGORY BUTTONS GRID */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-3xs space-y-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-left">
              <h3 className="font-display font-extrabold text-lg text-gray-900">
                Pencarian Berdasarkan Hasil yang Diinginkan
              </h3>
              <p className="text-xs text-slate-500 font-sans">
                Contoh: ketik <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600 text-[11px] font-semibold">CV</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600 text-[11px] font-semibold">Caption</code>, <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600 text-[11px] font-semibold">Email</code>, atau <code className="bg-slate-100 px-1.5 py-0.5 rounded font-mono text-indigo-600 text-[11px] font-semibold">Debug</code> untuk menyaring instan.
              </p>
            </div>
            
            {/* Search Input Outcome-Based */}
            <div className="w-full sm:max-w-xs relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Cari cth: Buat CV, Email, Promo..." 
                value={searchGoalQuery}
                onChange={(e) => {
                  setSearchGoalQuery(e.target.value);
                  // Default to first template found if searching to prevent visual locks
                  if(e.target.value !== "") {
                    setActiveCategoryTab("");
                  } else {
                    setActiveCategoryTab("paling-sering");
                  }
                }}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-full font-sans text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 focus:outline-hidden transition-all text-gray-800 font-semibold"
              />
            </div>
          </div>

          {/* Visual Cards Grid for Categories Selector & Difficulty Filter Actions */}
          <div className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 dark:border-slate-800 pb-3">
              <span className="text-[11px] font-mono tracking-wider font-extrabold text-gray-450 dark:text-slate-400 uppercase">
                📂 SELEKSI KATEGORI ASISTENSI RESEP:
              </span>

              {/* LEVEL FILTER COMPONENT FOR BEGINNERS */}
              <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-850 border border-gray-200 dark:border-slate-800 rounded-xl w-fit">
                <button
                  onClick={() => setSelectedDifficulty("all")}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                    selectedDifficulty === "all"
                      ? "bg-white dark:bg-slate-700 text-black dark:text-white shadow-xs"
                      : "text-gray-500 hover:text-black dark:hover:text-slate-300"
                  }`}
                >
                  🌐 Semua Level
                </button>
                <button
                  onClick={() => setSelectedDifficulty("pemula")}
                  className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    selectedDifficulty === "pemula"
                      ? "bg-emerald-500 text-white shadow-xs"
                      : "text-gray-500 hover:text-black dark:hover:text-slate-300"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  🟢 Khusus Pemula (Sangat Mudah)
                </button>
              </div>
            </div>

            {/* Premium visual tray of categories with individual descriptions/icons */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {categories.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = activeCategoryTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategoryTab(cat.id);
                      setSearchGoalQuery(""); // Reset search query when navigating tabs
                      
                      // Automatically load the first template in that tab
                      const firstTpl = templates.find(t => t.categoryTab === cat.id);
                      if (firstTpl) {
                        setActiveTemplateId(firstTpl.id);
                      }
                    }}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between h-24 transition-all hover:-translate-y-0.5 cursor-pointer ${
                      isSelected 
                        ? "bg-indigo-600 border-indigo-650 text-white shadow-md ring-2 ring-indigo-550/30" 
                        : "bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-800 dark:text-slate-200 hover:border-indigo-400 hover:bg-slate-50/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                      isSelected ? "bg-white/10 text-white" : "bg-slate-50 dark:bg-slate-850 border border-gray-150/40 dark:border-slate-800"
                    }`}>
                      <IconComp className={`w-4 h-4 ${isSelected ? "text-white" : cat.color}`} />
                    </div>
                    <div>
                      <h4 className="text-[11px] font-extrabold leading-tight tracking-tight line-clamp-1">
                        {cat.label}
                      </h4>
                      <p className={`text-[9px] leading-none mt-0.5 line-clamp-1 opacity-70`}>
                        {cat.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* WORKSPACE SECTOR & INTERACTIVE GRID VIEW */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* SIDEBAR TABS: PERSISTENT COMPACT MANAGER */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-gray-200 p-6 shadow-3xs space-y-6">
            <div className="flex items-center gap-3 border-b border-gray-150 pb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-extrabold text-gray-900 font-display">Workspace Anda</h4>
                <p className="text-[10px] text-gray-400 font-mono font-semibold uppercase tracking-wider">Hasil Berorientasi Hasil</p>
              </div>
            </div>

            {/* Dashboard Workspace Options */}
            <div className="space-y-1.5 text-left">
              <button
                onClick={() => setActiveDashboardTab("smart-form")}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeDashboardTab === "smart-form"
                    ? "bg-black text-white shadow-xs"
                    : "text-gray-600 hover:bg-slate-50 hover:text-black"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
                  🔥 Template Siap Pakai
                </span>
                <span className="text-[10px] bg-indigo-500 text-white font-mono px-2 py-0.5 rounded-full leading-none font-bold">
                  {templates.length}
                </span>
              </button>

              <button
                onClick={() => setActiveDashboardTab("favorites")}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeDashboardTab === "favorites"
                    ? "bg-black text-white shadow-xs"
                    : "text-gray-600 hover:bg-slate-50 hover:text-black"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ⭐ Template Favorit Saya
                </span>
                <span className="text-[10px] bg-slate-100 text-gray-800 font-mono px-2 py-0.5 rounded-full leading-none font-bold">
                  {favorites.length}
                </span>
              </button>

              <button
                onClick={() => setActiveDashboardTab("history")}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeDashboardTab === "history"
                    ? "bg-black text-white shadow-xs"
                    : "text-gray-600 hover:bg-slate-50 hover:text-black"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <History className="w-4 h-4 text-indigo-500" />
                  ⏰ Riwayat Penggunaan
                </span>
                <span className="text-[10px] bg-slate-100 text-gray-800 font-mono px-2 py-0.5 rounded-full leading-none font-bold">
                  {history.length}
                </span>
              </button>

              <button
                onClick={() => setActiveDashboardTab("ai-recommend")}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeDashboardTab === "ai-recommend"
                    ? "bg-black text-white shadow-xs"
                    : "text-gray-600 hover:bg-slate-50 hover:text-black"
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Compass className="w-4 h-4 text-emerald-500" />
                  💡 AI Mana yang Cocok?
                </span>
                <span className="text-[9px] bg-rose-500 text-white font-mono px-1.5 py-0.5 rounded-full leading-none font-bold">BARU</span>
              </button>
            </div>

            {/* Quick Informational Notice */}
            <div className="pt-4 border-t border-gray-100 text-left text-xs text-gray-500 space-y-2 font-sans">
              <span className="font-bold text-gray-900 text-[10px] uppercase font-mono tracking-wider block">ℹ️ CARA MENGGUNAKAN INSTAN</span>
              <p className="text-[11px] leading-relaxed text-gray-500">
                Isi parameter isian di samping kanan, lalu ketuk tombol <strong className="text-gray-750">"Buat Dengan AI"</strong> untuk merumuskan draf lewat server Gemini lokal secara mulus, atau salin prompt premium untuk dibawa ke platform AI favorit Anda.
              </p>
            </div>
          </div>

          {/* RIGHT CONTAINER: DYNAMIC ACTIVE COMPONENT PANEL */}
          <div className="lg:col-span-8 space-y-6">
            
            <AnimatePresence mode="wait">
              
              {/* PANEL TAB 1: FORM TEMPLATES DISPLAY */}
              {activeDashboardTab === "smart-form" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  
                  {/* Select Template Sub-Bar Items Grid */}
                  <div className="flex items-stretch gap-3 overflow-x-auto pb-2 scrollbar-none text-left">
                    {activeCategoryTemplates.map((item) => {
                      const IconComp = item.icon;
                      const isActive = activeTemplateId === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveTemplateId(item.id)}
                          className={`flex items-start gap-3 p-4 rounded-2xl text-left transition-all min-w-[210px] border cursor-pointer shrink-0 ${
                            isActive 
                              ? "bg-[#0c1322] text-white border-black shadow-xs ring-2 ring-indigo-500/50" 
                              : "bg-white border-gray-200 hover:border-indigo-400 hover:bg-slate-50/50"
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isActive ? "bg-white/10" : "bg-indigo-50"
                          }`}>
                            <IconComp className={`w-4 h-4 ${isActive ? "text-white" : item.iconColor}`} />
                          </div>
                          <div className="space-y-0.5">
                            <h4 className={`text-xs font-bold leading-tight ${isActive ? "text-white" : "text-gray-900"}`}>
                              {item.title}
                            </h4>
                            <p className="text-[10px] leading-snug opacity-80 line-clamp-1">
                              {item.outcomeGoal}
                            </p>
                            <span className="inline-block text-[9px] font-mono opacity-60 mt-1 uppercase">
                              {item.difficulty}
                            </span>
                          </div>
                        </button>
                      );
                    })}

                    {activeCategoryTemplates.length === 0 && (
                      <div className="p-8 text-center w-full bg-slate-50 border border-dashed rounded-3xl text-xs text-gray-500 font-sans">
                        Tidak ada template hasil yang cocok dengan kata kunci pencarian Anda. Silakan ketik kata kunci lain.
                      </div>
                    )}
                  </div>

                  {/* ACTIVE CHOSEN SMART FORM CONTAINER */}
                  {activeTemplate && (
                    <div id="smart-form-target" className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-2xs text-left animate-in duration-200">
                      
                      {/* Active Header Metadatas */}
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-gray-150 pb-5">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-[10px] bg-indigo-50 border border-indigo-105 text-indigo-700 px-2.5 py-0.5 rounded-full font-mono font-bold uppercase tracking-wider leading-none">
                              Tingkat: {activeTemplate.difficulty}
                            </span>
                            <span className="text-[10px] bg-slate-50 border border-slate-150 text-slate-700 px-2.5 py-0.5 rounded-full font-mono font-bold leading-none">
                              Rekomendasi Utama: {activeTemplate.recommendedAI}
                            </span>
                          </div>
                          
                          <h3 className="font-display font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight">
                            {activeTemplate.title}
                          </h3>
                          <p className="text-xs text-gray-500 font-sans italic font-semibold">
                            🎯 Sasaran Utama: "{activeTemplate.outcomeGoal}"
                          </p>
                        </div>

                        {/* Favorite Bookmark Button */}
                        <button
                          onClick={toggleFavorite}
                          className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 hover:border-yellow-400 bg-white hover:bg-yellow-50/20 text-xs font-semibold rounded-xl text-gray-700 transition-colors cursor-pointer"
                        >
                          <Star className={`w-4 h-4 ${
                            favorites.some(f => f.id === activeTemplate.id) 
                              ? "text-yellow-400 fill-yellow-400" 
                              : "text-gray-300"
                          }`} />
                          <span>Simpan</span>
                        </button>
                      </div>

                      {/* FEEDBACK STATUS ALERTS */}
                      {successMessage && (
                        <div className="p-3 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 rounded-xl border border-emerald-200 text-xs flex items-center gap-2 animate-fade-in font-sans">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{successMessage}</span>
                        </div>
                      )}

                      {errorMessage && (
                        <div className="p-3 bg-red-50 text-red-700 rounded-xl border border-red-200 text-xs flex items-center gap-2 animate-fade-in font-sans">
                          <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* DYNAMIC FORM FIELDS */}
                      <div className="space-y-4">
                        <span className="block text-[11px] font-mono text-gray-400 font-bold uppercase tracking-wider">
                          ✍️ ISI PARAMETER HASIL (KUSTOMISASI BEBAS)
                        </span>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {activeTemplate.fields.map((fld: any) => (
                            <div key={fld.key} className="space-y-1.5 col-span-2">
                              <label className="block text-xs font-semibold text-gray-700 font-sans">
                                {fld.label}
                              </label>
                              
                              {fld.key === "rawText" || fld.key === "rawNotes" || fld.key === "snippet" || fld.key === "codeSnippet" ? (
                                <textarea
                                  rows={4}
                                  placeholder={fld.placeholder || ""}
                                  value={formInputs[fld.key] || ""}
                                  onChange={(e: any) => handleFieldChange(fld.key, e.target.value)}
                                  className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl font-sans text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all text-gray-850 font-medium"
                                />
                              ) : (
                                <input
                                  type="text"
                                  placeholder={fld.placeholder || ""}
                                  value={formInputs[fld.key] || ""}
                                  onChange={(e: any) => handleFieldChange(fld.key, e.target.value)}
                                  className="w-full px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl font-sans text-xs focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-hidden transition-all text-gray-850 font-medium"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ACTION TRIGGERS BAR */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                        {/* Instant Execute using actual API / Gemini */}
                        <button
                          onClick={handleAIExecuteNow}
                          disabled={isExecutingAI}
                          className="flex-1 bg-indigo-650 hover:bg-indigo-700 text-white font-bold h-12 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                          {isExecutingAI ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Sedang Merumuskan Draf...</span>
                            </>
                          ) : (
                            <>
                              <Zap className="w-4 h-4 text-amber-300 fill-amber-300 animate-bounce" />
                              <span>Buat Dengan AI (Instan)</span>
                            </>
                          )}
                        </button>

                        {/* Compiler manual trigger for advanced users */}
                        <button
                          onClick={() => {
                            setAdvancedMode(true);
                            handleCompilePromptOnly();
                          }}
                          className="px-5 border border-gray-200 hover:border-black bg-white hover:bg-slate-50 text-gray-700 text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors"
                        >
                          <Terminal className="w-4 h-4 text-gray-500" />
                          <span>Dapatkan Prompt Premium</span>
                        </button>
                      </div>

                      {/* INTERACTIVE SPLIT RESULTS COMPONENT */}
                      <div className="grid md:grid-cols-1 gap-6 pt-4">
                        
                        {/* Dynamic outputs or specimen previews */}
                        <div className="bg-[#f8fafc] border border-slate-200/80 rounded-2xl p-5 sm:p-6 space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-ping" />
                              <h4 className="text-xs font-mono font-bold tracking-wider text-slate-800 uppercase">
                                {aiOutputResult ? "✨ HASIL RUMUSAN AI TERBARU" : "💡 CONTOH OUTPUT ACUAN (PREVIEW HASIL)"}
                              </h4>
                            </div>
                            
                            {/* Copy Result Button */}
                            <button
                              onClick={copyResultToClipboard}
                              className="text-[10px] font-mono text-gray-500 hover:text-black flex items-center gap-1.5 px-2 py-1 bg-white border border-gray-200 rounded-md cursor-pointer transition-all"
                            >
                              {copiedResultState ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  <span>Tersalin!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Salin Teks</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Render text outcome nicely */}
                          <div className="text-xs text-gray-750 font-sans leading-relaxed whitespace-pre-line text-left bg-white p-4 rounded-xl border border-slate-150 max-h-96 overflow-y-auto font-medium">
                            {aiOutputResult || activeTemplate.sampleOutput}
                          </div>
                        </div>

                        {/* ADVANCED PROMPT COLLAPSIBLE SECTION */}
                        {advancedMode && (
                          <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-5 space-y-3 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-1 bg-indigo-500/10 text-indigo-400 text-[9px] font-mono uppercase tracking-wider rounded-bl-xl font-bold">
                              Mode Pakar
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-mono text-indigo-400 font-bold uppercase tracking-wider">
                                🔧 PROMPT XML PREMIUM YANG DIJALANKAN (DI BELAKANG LAYAR)
                              </h4>
                              <button
                                onClick={copyCompiledPromptToClipboard}
                                className="text-[10px] font-mono text-indigo-300 hover:text-white flex items-center gap-1.5 px-2 py-1 bg-slate-850 hover:bg-slate-800 rounded-md cursor-pointer transition-all border border-slate-800"
                              >
                                {copiedPromptState ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                                    <span>Tersalin!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Salin Prompt</span>
                                  </>
                                )}
                              </button>
                            </div>
                            
                            <pre className="text-[10px] font-mono text-indigo-200/90 leading-relaxed whitespace-pre-wrap bg-[#050b18] p-3.5 rounded-lg border border-slate-900 border-dashed text-left max-h-40 overflow-y-auto">
                              {compiledPromptResult || activeTemplate.compileLogic(formInputs)}
                            </pre>
                            <p className="text-[10px] text-indigo-300/60 font-sans text-left">
                              *Catatan: Sapiens pemula mencari hasil, sapiens master menggunakan prompt premium di atas untuk model internal korporat mereka.
                            </p>
                          </div>
                        )}

                        {/* ONE CLICK USE: DIRECT SHORTCUTS LAUNCHPAD */}
                        <div className="border border-indigo-150 bg-indigo-50/20 rounded-2xl p-4 sm:p-5 text-left space-y-3.5">
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-extrabold text-[#0D1527] font-display flex items-center gap-1.5">
                              <Zap className="w-4 h-4 text-indigo-600 fill-indigo-600" />
                              Gunakan Sekarang Melalui Chatbot Pilihan
                            </h4>
                            <p className="text-[11px] text-gray-500 leading-snug">
                              Tidak ingin memakai AI lokal? Klik salah satu di bawah ini untuk **Menyalin Prompt Otomatis dan Membuka Chatbot** tujuan di tab baru secara instant.
                            </p>
                          </div>

                          {/* Interactive list of launchers */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 pt-1">
                            <button
                              onClick={() => triggerOneClickUse("chatgpt")}
                              className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 rounded-xl text-xs font-bold border border-emerald-200/80 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block" />
                              ChatGPT
                            </button>

                            <button
                              onClick={() => triggerOneClickUse("claude")}
                              className="px-3 py-2 bg-orange-50 hover:bg-orange-100/80 text-orange-850 rounded-xl text-xs font-bold border border-orange-200/80 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <span className="w-2 h-2 rounded-full bg-orange-600 inline-block" />
                              Claude.ai
                            </button>

                            <button
                              onClick={() => triggerOneClickUse("gemini")}
                              className="px-3 py-2 bg-blue-50 hover:bg-blue-100/80 text-blue-800 rounded-xl text-xs font-bold border border-blue-200/80 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block animate-pulse" />
                              Gemini
                            </button>

                            <button
                              onClick={() => triggerOneClickUse("grok")}
                              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold border border-slate-350 flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                            >
                              <span className="w-2 h-2 rounded-full bg-slate-800 inline-block" />
                              Grok
                            </button>

                            <button
                              onClick={() => triggerOneClickUse("deepseek")}
                              className="px-3 py-2 bg-blue-50 hover:bg-blue-100 text-sky-800 rounded-xl text-xs font-bold border border-sky-300 flex items-center justify-center gap-1.5 transition-all cursor-pointer col-span-2 sm:col-span-1"
                            >
                              <span className="w-2 h-2 rounded-full bg-sky-600 inline-block" />
                              DeepSeek
                            </button>
                          </div>
                        </div>

                      </div>

                    </div>
                  )}

                </motion.div>
              )}

              {/* PANEL TAB 2: FAVORITES SECTION */}
              {activeDashboardTab === "favorites" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 text-left shadow-2xs"
                >
                  <div className="border-b border-gray-150 pb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-gray-900 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 animate-spin" style={{ animationDuration: '3s' }} />
                        Template Favorit Terpilih Anda
                      </h3>
                      <p className="text-xs text-gray-500">
                        Template fungsional yang paling sering Anda saring disimpan demi kecepatan operasional maksimal Anda.
                      </p>
                    </div>
                  </div>

                  {favorites.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 space-y-3">
                      <Star className="w-12 h-12 text-gray-200 mx-auto" />
                      <p className="text-xs font-medium font-sans">Belum ada template favorit tersimpan. Ketuk "Simpan" di form untuk menyimpan template di sini!</p>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {favorites.map((fav) => (
                        <div key={fav.id} className="p-4 rounded-2xl border border-gray-200 bg-slate-50 flex items-start justify-between gap-3 relative overflow-hidden group">
                          <div>
                            <span className="text-[9px] bg-indigo-50 border border-indigo-150 text-indigo-700 px-20 py-0.5 rounded-full font-mono font-bold uppercase block w-fit mb-1.5">
                              {fav.category.toUpperCase()}
                            </span>
                            <h4 className="text-xs font-bold text-gray-900 leading-tight">
                              {fav.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 leading-normal italic mt-1 font-medium">
                              "{fav.description}"
                            </p>
                            
                            <div className="mt-4 flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setActiveTemplateId(fav.id);
                                  setActiveDashboardTab("smart-form");
                                  // Scroll seamlessly to form view
                                  document.getElementById("smart-form-target")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className="px-3 py-1.5 bg-black hover:bg-slate-800 text-white font-bold rounded-xl text-[10px] transition-all cursor-pointer"
                              >
                                Gunakan Sekarang
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={() => removeFavoriteById(fav.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-650 hover:bg-white border border-transparent hover:border-gray-200 transition-colors cursor-pointer"
                            title="Hapus dari favorit"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* PANEL TAB 3: USAGE HISTORY LOGS */}
              {activeDashboardTab === "history" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 text-left shadow-2xs"
                >
                  <div className="border-b border-gray-150 pb-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-extrabold text-lg text-gray-900 flex items-center gap-2">
                        <History className="w-5 h-5 text-indigo-600" />
                        Riwayat Kerja Instan Anda
                      </h3>
                      <p className="text-xs text-gray-500 font-sans">
                        Sistem mencatat hingga 8 generasi draf terakhir Anda secara offline demi kenyamanan kontrol Anda.
                      </p>
                    </div>

                    {history.length > 0 && (
                      <button
                        onClick={clearHistoryLog}
                        className="px-3 py-1.5 border border-red-200 text-red-700 hover:bg-red-50 text-[11px] font-semibold rounded-xl flex items-center gap-1 hover:border-red-300 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus Semua</span>
                      </button>
                    )}
                  </div>

                  {history.length === 0 ? (
                    <div className="py-12 text-center text-gray-400 space-y-3">
                      <Clock className="w-12 h-12 text-gray-200 mx-auto" />
                      <p className="text-xs font-medium font-sans">Belum ada riwayat aktivitas kerja. Hasil pembuatan AI akan tampil di sini!</p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {history.map((hist) => (
                        <div key={hist.id} className="p-4 rounded-xl border border-gray-150 bg-slate-50 flex flex-col sm:flex-row justify-between sm:items-center gap-3 font-sans">
                          <div className="space-y-1">
                            <span className="text-[10px] text-indigo-600 font-bold font-mono">
                              ⏰ {hist.timestamp}
                            </span>
                            <h4 className="text-xs font-bold text-gray-850">
                              {hist.templateTitle}
                            </h4>
                            <p className="text-[11px] text-gray-500 font-medium line-clamp-1">
                              {hist.previewText}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              // Force load and set output directly
                              const associatedTemplate = templates.find(t => t.title === hist.templateTitle);
                              if (associatedTemplate) {
                                setActiveTemplateId(associatedTemplate.id);
                              }
                              setAiOutputResult(hist.previewText);
                              setActiveDashboardTab("smart-form");
                              document.getElementById("smart-form-target")?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="w-fit px-3 py-1.5 border border-gray-200 hover:border-black bg-white font-semibold rounded-xl text-[10px] text-gray-700 cursor-pointer text-center"
                          >
                            Buka Draf Ini
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* PANEL TAB 4: INTELLIGENT AI MATCHMAKER PLATFORM */}
              {activeDashboardTab === "ai-recommend" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 space-y-6 text-left shadow-2xs"
                >
                  <div className="border-b border-gray-150 pb-4">
                    <h3 className="font-display font-extrabold text-lg text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-500 animate-bounce" />
                      Sistem Rekomendasi Aliansi AI
                    </h3>
                    <p className="text-xs text-gray-500 font-sans">
                      Pilih kategori tugas Anda, dan algoritma cerdas kami akan merekomendasikan duet LLM terbaik beserta strategi rahasianya.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 items-start">
                    
                    {/* Left: Input category */}
                    <div className="space-y-4">
                      <label className="block text-xs font-bold text-gray-700 font-sans uppercase tracking-wider">
                        Pilih Kategori Permasalahan Anda:
                      </label>
                      
                      <div className="grid grid-cols-2 gap-2">
                        {["Belajar", "Bisnis", "Marketing", "Coding", "Desain"].map((item) => (
                          <button
                            key={item}
                            onClick={() => setRecommendCategory(item)}
                            className={`px-4 py-3 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${
                              recommendCategory === item
                                ? "bg-indigo-650 text-white shadow-xs"
                                : "bg-slate-100 hover:bg-slate-200 text-gray-750"
                            }`}
                          >
                            {item === "Belajar" && "🎓 Belajar & Riset"}
                            {item === "Bisnis" && "💼 Operasional Bisnis"}
                            {item === "Marketing" && "📈 Pemasaran / Sosmed"}
                            {item === "Coding" && "💻 Debug & Pemrograman"}
                            {item === "Desain" && "🎨 Desain & Moodboard"}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleRunRecommendationAI}
                        className="w-full h-11 bg-black hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
                      >
                        <span>Temukan Rekomendasi Duo AI Terbaik</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Right: Dynamic Output Advice */}
                    <div className="bg-gradient-to-b from-indigo-50/20 to-white border border-indigo-150 rounded-2xl p-5 sm:p-6 space-y-4 min-h-[220px]">
                      {recommendOutput ? (
                        <div className="space-y-4 animate-in duration-200">
                          <div>
                            <span className="text-[9px] bg-indigo-100 text-indigo-700 font-mono font-bold px-2 rounded-full leading-none">REKOMENDASI MATCH</span>
                            <h4 className="text-sm font-extrabold text-blue-900 font-display mt-1">
                              👑 {recommendOutput.bestModel}
                            </h4>
                          </div>
                          
                          <p className="text-xs text-gray-650 leading-relaxed font-sans font-medium">
                            {recommendOutput.description}
                          </p>

                          <div className="space-y-1 bg-white p-3 rounded-xl border border-indigo-100/50">
                            <span className="block text-[10px] font-mono text-gray-400 font-bold">ALASAN KEPUTUSAN</span>
                            <p className="text-[11px] text-gray-650 leading-tight italic font-sans font-medium">
                              "{recommendOutput.reason}"
                            </p>
                          </div>

                          <div className="space-y-1">
                            <span className="block text-[10px] font-mono text-indigo-600 font-bold uppercase tracking-wider">🎯 TIPS PRO FORMULA</span>
                            <ul className="list-disc pl-4 text-[10px] text-gray-500 font-sans font-semibold leading-normal space-y-1">
                              {recommendOutput.tips.map((tp, idx) => (
                                <li key={idx}>{tp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ) : (
                        <div className="h-full flex flex-col justify-center items-center text-center py-6 text-gray-400 space-y-2">
                          <HelpCircle className="w-10 h-10 text-gray-300" />
                          <p className="text-xs font-semibold font-sans">Ketahui rahasia optimasi pemilahan model terpilih dengan mengklik tombol analisis di samping.</p>
                        </div>
                      )}
                    </div>

                  </div>

                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>

      {/* ONE-CLICK REDIRECT COMPLIANCE TOAST / MODAL GADGET */}
      <AnimatePresence>
        {showLaunchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#0f172a] text-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl relative text-left text-sans space-y-5"
            >
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mx-auto">
                <Loader2 className="w-6 h-6 animate-spin" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="font-display font-extrabold text-lg text-white">
                  Menyalin Teks &amp; Mengalihkan Anda...
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-sans font-medium">
                  Sistem Sliced berhasil menyalin Prompt Premium beralur XML ke clipboard Anda. Kami sedang mengalihkan Anda ke platform resmi **{lastLaunchedBot}** di jendela baru.
                </p>
              </div>

              <div className="bg-slate-900 border border-slate-800 p-3.5 rounded-xl text-center">
                <span className="text-[10px] font-mono text-slate-500 font-bold block uppercase">
                  TIPS PASTI LOLOS 99%
                </span>
                <p className="text-[11px] text-indigo-300 font-medium italic mt-1 font-sans">
                  "Cukup tekan Ctrl+V (atau Paste) langsung di kolom masukan chatbot setelah halaman termuat sempurna!"
                </p>
              </div>

              <button
                onClick={() => setShowLaunchModal(false)}
                className="w-full py-2.5 bg-slate-800 hover:bg-slate-705 text-xs text-slate-200 font-bold rounded-xl transition-all cursor-pointer text-center"
              >
                Tutup Sementara
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

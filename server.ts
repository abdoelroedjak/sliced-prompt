import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialize Gemini SDK to avoid hard crash if API key is missing
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// 1. API: Execute customized prompt
app.post("/api/gemini/execute", async (req, res) => {
  try {
    const { prompt, model = "gemini-3.5-flash" } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    res.json({ output: response.text });
  } catch (error: any) {
    console.error("Error executing prompt through Gemini:", error);
    
    const isQuotaError = 
      error.status === 429 || 
      (error.message && (
        error.message.includes("429") || 
        error.message.includes("quota") || 
        error.message.includes("RESOURCE_EXHAUSTED") ||
        error.message.includes("Quota exceeded")
      ));

    if (isQuotaError) {
      return res.status(429).json({
        error: "Quota Exceeded (RESOURCE_EXHAUSTED)",
        code: "RESOURCE_EXHAUSTED",
        message: "Model yang Anda pilih (atau akun Anda) telah melampaui batas kuota gratis atau membutuhkan kunci API berbayar.",
        suggestedModel: "gemini-3.5-flash"
      });
    }

    res.status(500).json({
      error: error.message || "Upps, ada kesalahan pada server AI.",
    });
  }
});

// 2. API: Sliced Optimize (Takes a basic prompt and slices it into a custom blueprint)
app.post("/api/gemini/optimize", async (req, res) => {
  try {
    const { rawPrompt, targetModel = "Claude 3.5" } = req.body;
    if (!rawPrompt) {
      return res.status(400).json({ error: "Raw prompt is required." });
    }

    const systemInstruction = `Anda adalah Sliced Prompt Expert. Tugas Anda adalah mengoptimalkan dan mengiris (slice) prompt dasar pengguna menjadi prompt berkualitas tinggi, modular, berenergi tinggi, dan sangat presisi demi kepatuhan format 100%.

Sasaran format optimasi:
1. Tetapkan Peran (Assign Role) yang berfokus, relevan, dan terarah di awal kalimat.
2. Jelaskan Konteks & Sasaran (Context & Goal) secara tajam dan teruji.
3. Berikan Instruksi Bertahap (Step-by-step logic) yang jelas.
4. Tentukan Batasan yang Ketat (Guardrails / Constraints) untuk meminimalkan halusinasi (di bawah 1%).
5. Minta Struktur Output formal (misal menggunakan JSON atau Markdown tabel).

Format balasan Anda harus terbagi rapi menggunakan Markdown:
### 1. Assign Role & Context
[Isi peran dan konteks produk/studi/fitur]

### 2. Core Instructions (Step-by-Step)
[Instruksi langkah demi langkah]

### 3. Constraints & Guardrails
- [Batasan 1]
- [Batasan 2]

### 4. Output Specification
[Spesifikasi format Markdown/JSON/DLL]

Sesuaikan nuansa pengoptimalan berdasarkan model tujuan: ${targetModel}.`;

    const ai = getGenAI();
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: rawPrompt,
      config: {
        systemInstruction,
      },
    });

    res.json({ optimized: response.text });
  } catch (error: any) {
    console.error("Error optimizing prompt through Gemini:", error);
    
    const isQuotaError = 
      error.status === 429 || 
      (error.message && (
        error.message.includes("429") || 
        error.message.includes("quota") || 
        error.message.includes("RESOURCE_EXHAUSTED") ||
        error.message.includes("Quota exceeded")
      ));

    if (isQuotaError) {
      return res.status(429).json({
        error: "Quota Exceeded (RESOURCE_EXHAUSTED)",
        code: "RESOURCE_EXHAUSTED",
        message: "Layanan optimasi sedang sibuk atau melampaui batas kuota harian. Silakan coba sesaat lagi.",
        suggestedModel: "gemini-3.5-flash"
      });
    }

    res.status(500).json({
      error: error.message || "Gagal mengoptimalkan prompt.",
    });
  }
});

// Check if Gemini key is available for indicator
app.get("/api/gemini/status", (req, res) => {
  res.json({ hasKey: !!process.env.GEMINI_API_KEY });
});

// Vite integration middleware
async function setupVite() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Sliced Prompt Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();

import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type Analysis = {
  language: string;
  summary: string;
  sentiment: { label: "Positivo" | "Neutral" | "Negativo"; score: number };
  tone: string;
  keywords: string[];
};

export async function POST(req: Request) {
  let body: { text?: string; lang?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const lang = body.lang === "en" ? "en" : "es";
  const text = (body.text ?? "").toString().slice(0, 4000).trim();
  if (text.length < 10) {
    return NextResponse.json(
      { error: "Escribe o pega un texto un poco más largo." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ analysis: localAnalysis(text), source: "local" });
  }

  try {
    const client = new OpenAI({
      apiKey,
      organization: process.env.OPENAI_ORG_ID || undefined,
    });

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 400,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            lang === "en"
              ? `You analyze a text and return ONLY valid JSON with this shape:
{
  "language": "the text's language, in English, e.g.: English, Spanish",
  "summary": "a 1-2 sentence summary, in English",
  "sentiment": { "label": "Positivo" | "Neutral" | "Negativo", "score": number 0-100 of positivity },
  "tone": "1 to 3 words: tone/register, e.g.: Professional, Enthusiastic, Critical (in English)",
  "keywords": ["3 to 6 key words or phrases from the text"]
}
Keep the "label" values EXACTLY as Positivo/Neutral/Negativo. No text outside the JSON.`
              : `Analizas un texto y devuelves SOLO un JSON válido con esta forma:
{
  "language": "idioma del texto en español, ej: Español, Inglés",
  "summary": "resumen en 1 o 2 frases, en español",
  "sentiment": { "label": "Positivo" | "Neutral" | "Negativo", "score": número 0-100 de positividad },
  "tone": "1 a 3 palabras: tono/registro, ej: Profesional, Entusiasta, Crítico",
  "keywords": ["3 a 6 palabras o frases clave del texto"]
}
No agregues texto fuera del JSON.`,
        },
        { role: "user", content: text },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) return NextResponse.json({ analysis: localAnalysis(text), source: "fallback" });

    const parsed = JSON.parse(raw) as Partial<Analysis>;
    const analysis = normalize(parsed, text);
    return NextResponse.json({ analysis, source: "openai" });
  } catch (e) {
    console.error("[/api/playground] error:", e);
    return NextResponse.json({ analysis: localAnalysis(text), source: "fallback" });
  }
}

function normalize(p: Partial<Analysis>, text: string): Analysis {
  const local = localAnalysis(text);
  const label = p.sentiment?.label;
  return {
    language: typeof p.language === "string" ? p.language : local.language,
    summary: typeof p.summary === "string" && p.summary ? p.summary : local.summary,
    sentiment: {
      label:
        label === "Positivo" || label === "Neutral" || label === "Negativo"
          ? label
          : local.sentiment.label,
      score:
        typeof p.sentiment?.score === "number"
          ? Math.max(0, Math.min(100, Math.round(p.sentiment.score)))
          : local.sentiment.score,
    },
    tone: typeof p.tone === "string" && p.tone ? p.tone : local.tone,
    keywords:
      Array.isArray(p.keywords) && p.keywords.length
        ? p.keywords.map(String).slice(0, 6)
        : local.keywords,
  };
}

// Fallback local sin IA: heurística simple de sentimiento + palabras clave.
const POS = ["bueno", "excelente", "genial", "feliz", "encanta", "increíble", "gracias", "mejor", "éxito", "amor", "perfecto", "recomiendo", "fácil", "rápido", "gran"];
const NEG = ["malo", "terrible", "pésimo", "triste", "odio", "horrible", "peor", "problema", "error", "lento", "difícil", "molesto", "falla", "nunca", "queja"];
const STOP = new Set(["el","la","los","las","un","una","de","del","y","o","que","en","a","con","por","para","es","son","se","su","sus","al","lo","como","más","mas","este","esta","esto","muy","pero","ya","me","te","le","les","mi","tu","si","no","hay"]);

function localAnalysis(text: string): Analysis {
  const words = text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9\sñ]/g, " ").split(/\s+/).filter(Boolean);
  const norm = (w: string) => w.normalize("NFD").replace(/[̀-ͯ]/g, "");
  let score = 50;
  for (const w of words) {
    if (POS.some((p) => norm(w) === norm(p))) score += 6;
    if (NEG.some((n) => norm(w) === norm(n))) score -= 6;
  }
  score = Math.max(0, Math.min(100, score));
  const label = score >= 60 ? "Positivo" : score <= 40 ? "Negativo" : "Neutral";

  const freq = new Map<string, number>();
  for (const w of words) {
    if (w.length > 3 && !STOP.has(w)) freq.set(w, (freq.get(w) ?? 0) + 1);
  }
  const keywords = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5).map(([w]) => w);

  const firstSentence = text.split(/(?<=[.?!])\s+/)[0]?.slice(0, 160) || text.slice(0, 160);

  return {
    language: /\b(the|and|is|you|for)\b/i.test(text) ? "Inglés" : "Español",
    summary: firstSentence,
    sentiment: { label: label as Analysis["sentiment"]["label"], score },
    tone: "No determinado",
    keywords: keywords.length ? keywords : ["texto"],
  };
}

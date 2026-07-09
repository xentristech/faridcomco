import { NextResponse } from "next/server";
import OpenAI from "openai";
import { profile } from "@/lib/profile";
import { getPost, postPlainText } from "@/lib/blog";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  let body: { slug?: string; message?: string; history?: Msg[]; lang?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const lang = body.lang === "en" ? "en" : "es";

  const post = getPost((body.slug ?? "").toString());
  if (!post) {
    return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
  }

  const message = (body.message ?? "").toString().slice(0, 1500).trim();
  if (!message) {
    return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
  }

  const article = postPlainText(post);
  const apiKey = process.env.OPENAI_API_KEY;

  // Sin API key: recuperación local (busca el fragmento más relevante del artículo).
  if (!apiKey) {
    return NextResponse.json({ reply: localArticleAnswer(article, message), source: "local" });
  }

  try {
    const client = new OpenAI({
      apiKey,
      organization: process.env.OPENAI_ORG_ID || undefined,
    });

    const system = `Eres "Eathan", la IA de ${profile.name} (AI Engineer). Estás incrustado en un
artículo de su blog y respondes preguntas SOBRE ESE ARTÍCULO.

REGLAS:
- Responde SOLO con base en el CONTENIDO DEL ARTÍCULO de abajo. No inventes datos, cifras ni productos.
- Si la respuesta no está en el artículo, dilo con honestidad y ofrece la visión general de Farid
  o invita a escribirle (${profile.email}). No te lo inventes.
- ${lang === "en" ? "Reply ALWAYS in English" : "Español latinoamericano"}, claro y humano. Breve: 2 a 4 frases salvo que pidan detalle.
- Como esto puede leerse en voz alta, escribe natural: sin markdown, sin listas con viñetas,
  sin URLs largas, sin el guion largo (—). Usa coma, punto o paréntesis.

=== CONTENIDO DEL ARTÍCULO ("${post.title}") ===
${article}
=== FIN DEL ARTÍCULO ===`;

    const history = (body.history ?? [])
      .slice(-6)
      .filter((m) => m && m.content)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.4,
      max_tokens: 400,
      messages: [
        { role: "system", content: system },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      localArticleAnswer(article, message);

    return NextResponse.json({ reply, source: "openai" });
  } catch (err) {
    console.error("[/api/blog-ask] OpenAI error:", err);
    return NextResponse.json({ reply: localArticleAnswer(article, message), source: "fallback" });
  }
}

// Fallback local: parte el artículo en frases, puntúa por solapamiento de
// palabras con la pregunta y devuelve las 2 más relevantes.
function localArticleAnswer(article: string, question: string): string {
  const stop = new Set([
    "el", "la", "los", "las", "un", "una", "unos", "unas", "de", "del", "y", "o",
    "que", "en", "a", "con", "por", "para", "es", "son", "se", "su", "sus", "al",
    "lo", "como", "más", "mas", "qué", "cual", "cuál", "cuánto", "cuanto", "me",
    "tu", "si", "no", "hay", "este", "esta", "esto",
  ]);
  const terms = words(question).filter((w) => w.length > 2 && !stop.has(w));

  const sentences = article
    .split(/(?<=[.?!])\s+|\n+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 30);

  if (terms.length === 0 || sentences.length === 0) {
    return "Puedo responderte sobre el DGX Spark: qué es, por qué importa, su stack de software, la comparativa de hardware o la conclusión. ¿Sobre cuál te cuento?";
  }

  const scored = sentences
    .map((s) => {
      const set = new Set(words(s));
      const score = terms.reduce((acc, t) => acc + (set.has(t) ? 1 : 0), 0);
      return { s, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((x) => x.s);

  if (scored.length === 0) {
    return "Eso no lo cubre este artículo. El texto se enfoca en el DGX Spark: su chip GB10, la memoria unificada de 128 GB, el stack de software y la comparativa con RTX y cloud. ¿Quieres que te resuma alguno de esos puntos?";
  }

  return scored.join(" ");
}

function words(t: string): string[] {
  return t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Texto → voz natural con gpt-4o-mini-tts. La API key vive SOLO en el servidor.
// Si no hay key o falla, devolvemos 204 para que el cliente use la voz del navegador.
export async function POST(req: Request) {
  let body: { text?: string; lang?: string; voice?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const text = (body.text ?? "").toString().slice(0, 1200).trim();
  if (!text) return NextResponse.json({ error: "Texto vacío" }, { status: 400 });

  const lang = body.lang === "en" ? "en" : "es";
  const apiKey = process.env.OPENAI_API_KEY;

  // Sin API key: el cliente cae a la voz del navegador (speechSynthesis).
  if (!apiKey) return new NextResponse(null, { status: 204 });

  try {
    const client = new OpenAI({
      apiKey,
      organization: process.env.OPENAI_ORG_ID || undefined,
    });

    const instructions =
      lang === "en"
        ? "Warm, confident and professional male voice. Natural, measured pacing; clear articulation."
        : "Voz masculina cálida, segura y profesional, con acento latinoamericano neutro. Ritmo natural y pausado, buena dicción.";

    const speech = await client.audio.speech.create({
      model: process.env.OPENAI_TTS_MODEL || "gpt-4o-mini-tts",
      voice: (body.voice || process.env.OPENAI_TTS_VOICE || "onyx") as never,
      input: text,
      instructions,
      response_format: "mp3",
    });

    const buf = Buffer.from(await speech.arrayBuffer());
    return new NextResponse(buf, {
      status: 200,
      headers: {
        "Content-Type": "audio/mpeg",
        "Content-Length": String(buf.length),
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[/api/tts] OpenAI error:", err);
    // Falla la IA de voz → 204 para degradar a la voz del navegador sin romper la UX.
    return new NextResponse(null, { status: 204 });
  }
}

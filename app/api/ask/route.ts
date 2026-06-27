import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  SYSTEM_PROMPT,
  IDEA_PROMPT,
  localAnswer,
  localIdea,
} from "@/lib/knowledge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  let body: { mode?: "chat" | "idea"; message?: string; history?: Msg[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const mode = body.mode === "idea" ? "idea" : "chat";
  const message = (body.message ?? "").toString().slice(0, 1500).trim();
  if (!message) {
    return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  // Sin API key: respuesta local basada en el perfil (el sitio sigue funcionando).
  if (!apiKey) {
    const reply = mode === "idea" ? localIdea(message) : localAnswer(message);
    return NextResponse.json({ reply, source: "local" });
  }

  try {
    const client = new OpenAI({
      apiKey,
      organization: process.env.OPENAI_ORG_ID || undefined,
    });

    const system = mode === "idea" ? IDEA_PROMPT : SYSTEM_PROMPT;
    const history = (body.history ?? [])
      .slice(-6)
      .filter((m) => m && m.content)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1500) }));

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: mode === "idea" ? 0.7 : 0.5,
      max_tokens: 400,
      messages: [
        { role: "system", content: system },
        ...history,
        { role: "user", content: message },
      ],
    });

    const reply =
      completion.choices[0]?.message?.content?.trim() ||
      (mode === "idea" ? localIdea(message) : localAnswer(message));

    return NextResponse.json({ reply, source: "openai" });
  } catch (err) {
    console.error("[/api/ask] OpenAI error:", err);
    // Si OpenAI falla, degradamos al fallback local en vez de romper la UX.
    const reply = mode === "idea" ? localIdea(message) : localAnswer(message);
    return NextResponse.json({ reply, source: "fallback" });
  }
}

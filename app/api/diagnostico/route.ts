import { NextResponse } from "next/server";
import OpenAI from "openai";
import {
  DIAGNOSTICO_SYSTEM,
  buildUserPrompt,
  localReport,
  type Answers,
  type Report,
} from "@/lib/diagnostico";
import { query } from "@/lib/mysql";
import { withTimeout } from "@/lib/with-timeout";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  let body: {
    answers?: Answers;
    name?: string;
    email?: string;
    saveOnly?: boolean;
    titulo?: string;
    lang?: string;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const lang = body.lang === "en" ? "en" : "es";

  const answers = body.answers ?? {};
  if (!answers.sector || !answers.dolor) {
    return NextResponse.json(
      { error: "Faltan respuestas del diagnóstico." },
      { status: 400 }
    );
  }

  const email = (body.email ?? "").toString().trim();
  const name =
    (body.name ?? "").toString().trim().slice(0, 120) || "Diagnóstico web";
  const validEmail = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  // Modo "solo guardar lead" (no re-genera el informe → sin costo de tokens).
  if (body.saveOnly) {
    if (!validEmail) {
      return NextResponse.json({ error: "Email inválido." }, { status: 400 });
    }
    const summary = `[Diagnóstico IA] ${body.titulo ?? "Plan de IA"}. Sector: ${answers.sector}. Dolor: ${answers.dolor}. Meta: ${answers.meta ?? "-"}.`;
    try {
      await withTimeout(
        query(
          "INSERT INTO `leads` (`name`, `email`, `message`) VALUES (?, ?, ?)",
          [name, email.slice(0, 255), summary]
        )
      );
      return NextResponse.json({ saved: true });
    } catch {
      return NextResponse.json(
        { saved: false, error: "No se pudo guardar. Escríbele directo." },
        { status: 503 }
      );
    }
  }

  const report = await generate(answers, lang);

  // Captura de lead opcional si vino el email junto con la generación.
  let saved = false;
  if (validEmail) {
    const summary = `[Diagnóstico IA] ${report.titulo}. Sector: ${answers.sector}. Dolor: ${answers.dolor}. Meta: ${answers.meta ?? "-"}.`;
    try {
      await withTimeout(
        query(
          "INSERT INTO `leads` (`name`, `email`, `message`) VALUES (?, ?, ?)",
          [name, email.slice(0, 255), summary]
        )
      );
      saved = true;
    } catch {
      saved = false;
    }
  }

  return NextResponse.json({ report, saved });
}

async function generate(answers: Answers, lang: "es" | "en"): Promise<Report> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return localReport(answers);
  const langRule =
    lang === "en"
      ? "\n\nIMPORTANT: Write ALL JSON string values in English."
      : "\n\nIMPORTANTE: Escribe TODOS los valores del JSON en español.";

  try {
    const client = new OpenAI({
      apiKey,
      organization: process.env.OPENAI_ORG_ID || undefined,
    });

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.6,
      max_tokens: 600,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: DIAGNOSTICO_SYSTEM + langRule },
        { role: "user", content: buildUserPrompt(answers) },
      ],
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) return localReport(answers);
    const parsed = JSON.parse(raw) as Partial<Report>;

    // Valida forma mínima; si algo falta, cae al local.
    if (
      !parsed.titulo ||
      !parsed.diagnostico ||
      !Array.isArray(parsed.oportunidades) ||
      !Array.isArray(parsed.stack) ||
      !parsed.primerPaso ||
      !parsed.impacto
    ) {
      return localReport(answers);
    }
    return {
      titulo: String(parsed.titulo),
      diagnostico: String(parsed.diagnostico),
      oportunidades: parsed.oportunidades.map(String).slice(0, 4),
      stack: parsed.stack.map(String).slice(0, 5),
      primerPaso: String(parsed.primerPaso),
      impacto: String(parsed.impacto),
    };
  } catch (e) {
    console.error("[/api/diagnostico] error:", e);
    return localReport(answers);
  }
}

import { NextResponse } from "next/server";
import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export type Payload = { title: string; lines: string[] };

// Este endpoint SOLO se llama cuando el visitante pulsa "otro ejemplo".
// La página sigue siendo estática: no hay coste ni latencia por visita.

const FLAVOR: Record<string, { es: string; en: string }> = {
  client: {
    es: "una operación de negocio real (ventas, inventario, cobranza, soporte, logística)",
    en: "a real business operation (sales, inventory, collections, support, logistics)",
  },
  recruiter: {
    es: "un problema de ingeniería en producción (logs, latencia, incidentes, pipelines de datos)",
    en: "a production engineering problem (logs, latency, incidents, data pipelines)",
  },
  ally: {
    es: "un problema de producto o startup (activación, retención, cohortes, uso de features)",
    en: "a product or startup problem (activation, retention, cohorts, feature usage)",
  },
};

export async function POST(req: Request) {
  let body: { lang?: string; audience?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const lang = body.lang === "en" ? "en" : "es";
  const audience = body.audience && FLAVOR[body.audience] ? body.audience : "client";
  const flavor = FLAVOR[audience][lang];

  const apiKey = process.env.OPENAI_API_KEY;
  // Sin API key el cliente rota entre los ejemplos curados: nunca se rompe.
  if (!apiKey) return NextResponse.json({ payloads: null, source: "none" });

  const system =
    lang === "en"
      ? `You invent ONE illustrative example of a data pipeline with exactly 4 stages.
Domain: ${flavor}. Invent a scenario DIFFERENT from the example below.

Return ONLY valid JSON: { "payloads": [ {"title":"...","lines":["...","..."]}, ...x4 ] }

STAGE RULES (in this order):
1. Raw sleeping data: a file name. Raw fields only. One field is empty ("—").
2. Enriched: ONLY NEW facts pulled from other systems. NEVER repeat a line from stage 1.
3. Prediction: 2-3 lines. Use "metric_name = 0.87" style. Include one "confidence = 0.xx".
4. Decision: exactly 3 IMPERATIVE actions in plain English, max 8 words each.
   Real sentences, NOT "key: value". E.g. "Order 45 units today".

STYLE: "title" is snake_case lowercase. Stages 1-3 use "key: value" lines (3-4 each).
Numbers realistic and invented. If you use a date, use 2026. English. Nothing outside the JSON.

GOLD EXAMPLE (imitate the SHAPE, invent another domain):
{"payloads":[
 {"title":"order_4821.csv","lines":["customer: 1043","amount: 1,250,000","date: 2026-06-14","status: —"]},
 {"title":"customer_1043","lines":["purchases: 7 in 12 months","support: 3 open complaints","last contact: 41 days ago","avg ticket: high"]},
 {"title":"prediction","lines":["churn_risk = 0.87","confidence = 0.91","driver: unresolved complaints"]},
 {"title":"recommended_action","lines":["Call today before 5 p.m.","Resolve complaint #2291","Offer 15% retention discount"]}
]}`
      : `Inventas UN ejemplo ilustrativo de un pipeline de datos con exactamente 4 etapas.
Dominio: ${flavor}. Inventa un escenario DISTINTO al del ejemplo de abajo.

Devuelve SOLO JSON válido: { "payloads": [ {"title":"...","lines":["...","..."]}, ...x4 ] }

REGLAS POR ETAPA (en este orden):
1. Dato crudo dormido: nombre de archivo. Solo campos crudos. Un campo va vacío ("—").
2. Enriquecido: SOLO datos NUEVOS traídos de otros sistemas. NUNCA repitas una línea de la etapa 1.
3. Predicción: 2-3 líneas. Estilo "nombre_metrica = 0.87". Incluye una "confianza = 0.xx".
4. Decisión: exactamente 3 acciones IMPERATIVAS en español natural, máx. 8 palabras.
   Frases reales, NO "clave: valor". Ej: "Ordenar 45 unidades hoy".

ESTILO: "title" en snake_case minúsculas. Las etapas 1-3 usan líneas "clave: valor" (3-4 cada una).
Cifras realistas e inventadas. Si usas una fecha, que sea de 2026. Español. Nada fuera del JSON.

EJEMPLO DE ORO (imita la FORMA, inventa otro dominio):
{"payloads":[
 {"title":"pedido_4821.csv","lines":["cliente: 1043","monto: 1.250.000","fecha: 2026-06-14","estado: —"]},
 {"title":"cliente_1043","lines":["compras: 7 en 12 meses","soporte: 3 quejas abiertas","último contacto: hace 41 días","ticket medio: alto"]},
 {"title":"prediccion","lines":["riesgo_fuga = 0.87","confianza = 0.91","factor: quejas sin resolver"]},
 {"title":"accion_recomendada","lines":["Llamar hoy antes de las 5 p.m.","Resolver queja #2291","Ofrecer 15% de retención"]}
]}`;

  try {
    const client = new OpenAI({
      apiKey,
      organization: process.env.OPENAI_ORG_ID || undefined,
    });

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      temperature: 0.9,
      max_tokens: 400,
      response_format: { type: "json_object" },
      messages: [{ role: "system", content: system }],
    });

    const raw = completion.choices[0]?.message?.content?.trim();
    if (!raw) return NextResponse.json({ payloads: null, source: "empty" });

    const parsed = JSON.parse(raw) as { payloads?: unknown };
    const payloads = normalize(parsed.payloads);
    if (!payloads) return NextResponse.json({ payloads: null, source: "invalid" });

    return NextResponse.json({ payloads, source: "openai" });
  } catch (e) {
    console.error("[/api/data-journey] error:", e);
    return NextResponse.json({ payloads: null, source: "error" });
  }
}

// Si el modelo devuelve algo raro, preferimos null (el cliente usa un caso curado)
// antes que pintar basura en la sección.
function normalize(value: unknown): Payload[] | null {
  if (!Array.isArray(value) || value.length !== 4) return null;
  const out: Payload[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const { title, lines } = item as { title?: unknown; lines?: unknown };
    if (typeof title !== "string" || !title.trim()) return null;
    if (!Array.isArray(lines) || lines.length === 0) return null;
    out.push({
      title: title.slice(0, 60),
      lines: lines.slice(0, 4).map((l) => String(l).slice(0, 80)),
    });
  }
  return out;
}

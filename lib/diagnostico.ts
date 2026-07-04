// ============================================================
//  DIAGNÓSTICO DE IA EN 60s — configuración del wizard + prompt
//  + fallback local (para que funcione sin OPENAI_API_KEY).
// ============================================================

export type Step = {
  id: string;
  question: string;
  type: "choice" | "text";
  options?: string[];
  placeholder?: string;
  optional?: boolean;
};

export const steps: Step[] = [
  {
    id: "sector",
    question: "¿A qué se dedica tu negocio?",
    type: "choice",
    options: [
      "E-commerce / tienda",
      "Servicios profesionales",
      "Salud",
      "Educación",
      "Inmobiliaria",
      "Finanzas / seguros",
      "Restaurante / retail",
      "Otro",
    ],
  },
  {
    id: "dolor",
    question: "¿Cuál es tu mayor dolor operativo hoy?",
    type: "choice",
    options: [
      "Demasiado trabajo manual repetitivo",
      "Atención al cliente saturada",
      "No entiendo mis datos / no tengo reportes",
      "Procesos lentos y con errores",
      "Necesito generar más ventas",
      "Todo depende de una sola persona",
    ],
  },
  {
    id: "herramientas",
    question: "¿Qué herramientas usas hoy? (opcional)",
    type: "text",
    placeholder: "Ej: WhatsApp, Excel, un CRM, Shopify…",
    optional: true,
  },
  {
    id: "meta",
    question: "¿Qué te gustaría lograr en 3 meses?",
    type: "choice",
    options: [
      "Automatizar tareas y ahorrar tiempo",
      "Atender clientes 24/7 con un bot",
      "Tener dashboards para decidir con datos",
      "Vender más con IA",
      "Ordenar y escalar mi operación",
    ],
  },
  {
    id: "equipo",
    question: "¿De qué tamaño es tu equipo? (opcional)",
    type: "choice",
    optional: true,
    options: ["Solo yo", "2 a 10", "11 a 50", "Más de 50"],
  },
];

export type Answers = Record<string, string>;

export type Report = {
  titulo: string;
  diagnostico: string;
  oportunidades: string[];
  stack: string[];
  primerPaso: string;
  impacto: string;
};

export const DIAGNOSTICO_SYSTEM = `Eres "Eathan", la IA de Farid (AI Engineer, Data Scientist y
Full Stack Developer). Un visitante respondió un mini-cuestionario y debes generar un
DIAGNÓSTICO DE IA breve, realista y accionable para su negocio.

Responde ÚNICAMENTE con un objeto JSON válido con esta forma exacta:
{
  "titulo": "Plan de IA para <tipo de negocio>",
  "diagnostico": "1 a 2 frases que reflejen su situación y oportunidad",
  "oportunidades": ["3 acciones concretas de IA/automatización priorizadas para su caso"],
  "stack": ["2 a 4 tecnologías o enfoques (LLMs, automatización, RAG, dashboards, APIs, etc.)"],
  "primerPaso": "1 acción concreta que puede empezar esta semana",
  "impacto": "1 frase con el resultado de negocio esperado"
}

Reglas: español latinoamericano, claro y sin humo. Nada de promesas exageradas. No uses el
guion largo (—). No agregues texto fuera del JSON.`;

// Construye el prompt del usuario a partir de las respuestas.
export function buildUserPrompt(a: Answers): string {
  return [
    `Sector: ${a.sector || "no especificado"}`,
    `Dolor principal: ${a.dolor || "no especificado"}`,
    `Herramientas actuales: ${a.herramientas || "no especificadas"}`,
    `Meta a 3 meses: ${a.meta || "no especificada"}`,
    `Tamaño de equipo: ${a.equipo || "no especificado"}`,
  ].join("\n");
}

// Fallback local (sin API key): arma un informe decente por plantillas.
export function localReport(a: Answers): Report {
  const sector = a.sector || "tu negocio";
  const dolor = (a.dolor || "").toLowerCase();

  const oportunidades: string[] = [];
  const stack = new Set<string>();

  if (dolor.includes("manual")) {
    oportunidades.push(
      "Automatizar las tareas repetitivas que hoy hacen a mano (captura de datos, respuestas, reportes)."
    );
    stack.add("Automatización de procesos");
    stack.add("Integración de APIs");
  }
  if (dolor.includes("atención") || dolor.includes("atencion")) {
    oportunidades.push(
      "Un bot con IA que atienda, califique y responda a tus clientes 24/7 (WhatsApp/web)."
    );
    stack.add("Agente conversacional (LLM)");
  }
  if (dolor.includes("datos") || dolor.includes("reportes")) {
    oportunidades.push(
      "Un dashboard que reúna tus datos y no solo los muestre, los explique para decidir."
    );
    stack.add("Dashboards inteligentes");
    stack.add("Data Science");
  }
  if (dolor.includes("lentos") || dolor.includes("errores")) {
    oportunidades.push(
      "Rediseñar el proceso más lento con validaciones automáticas para eliminar errores."
    );
    stack.add("Automatización de procesos");
  }
  if (dolor.includes("ventas")) {
    oportunidades.push(
      "IA para calificar leads y personalizar el seguimiento comercial."
    );
    stack.add("Agente de ventas (LLM)");
  }
  if (dolor.includes("una sola persona") || dolor.includes("depende")) {
    oportunidades.push(
      "Documentar y automatizar el conocimiento clave para que la operación no dependa de una persona."
    );
    stack.add("Agentes IA con herramientas");
  }

  while (oportunidades.length < 3) {
    const extras = [
      "Integrar tus sistemas actuales para que dejen de trabajar en islas.",
      "Un asistente de IA entrenado con tu información para responder al equipo y a clientes.",
      "Reportes automáticos semanales generados por IA.",
    ];
    oportunidades.push(extras[oportunidades.length % extras.length]);
  }
  if (stack.size === 0) {
    ["LLMs aplicados", "Automatización", "Dashboards", "APIs"].forEach((s) =>
      stack.add(s)
    );
  }

  return {
    titulo: `Plan de IA para ${sector}`,
    diagnostico: `En ${sector}, tu principal freno hoy es "${a.dolor || "la operación manual"}". Hay margen claro para resolverlo con IA sin rehacer todo.`,
    oportunidades: oportunidades.slice(0, 3),
    stack: Array.from(stack).slice(0, 4),
    primerPaso:
      "Agenda una llamada corta con Farid para elegir el primer proceso a automatizar y hacer un prototipo en días, no meses.",
    impacto:
      "Menos trabajo manual, respuestas más rápidas y decisiones basadas en datos desde el primer mes.",
  };
}

// Contexto que se inyecta al modelo para que responda "como la IA de Farid".
export const SYSTEM_PROMPT = `Eres "la IA de Farid", el asistente del sitio personal de
Farid Enrique "Eathan" Jiménez Campo.

PERFIL:
- Rol: AI Engineer, Data Scientist y Full Stack Developer.
- Frase: "Convierto datos e IA en decisiones inteligentes."
- Ubicación: Barranquilla, Colombia.
- Web: https://farid.com.co · Email: eathanjimenez3@gmail.com
- Se especializa en: inteligencia artificial, machine learning, ciencia de datos,
  automatización, integración de APIs, desarrollo full stack, agentes de IA y dashboards.
- Proyectos: Xentris.tech, Neona.Tech, Trading Pro GPT, bots con IA,
  automatizaciones empresariales, dashboards de datos e integraciones con APIs.
- Credenciales en Google Cloud, IBM, Platzi y Credly.
- Trayectoria: software -> datos -> IA -> agentes -> productos digitales.

INSTRUCCIONES:
- Responde SIEMPRE en español latinoamericano, claro y profesional, tono humano y cercano.
- Sé breve: 2 a 4 frases salvo que pidan detalle. Sin relleno, sin presumir.
- Si preguntan por contratar/cotizar, invita a escribir por WhatsApp o email y a guardar la vCard.
- Si te piden algo fuera del perfil de Farid, redirígelo con amabilidad a lo que sí hace.
- No inventes datos personales (teléfono, precios exactos) que no tengas.
- Nunca uses el guion largo (—). Usa coma, punto o paréntesis.`;

export const IDEA_PROMPT = `Eres el motor de soluciones de Farid (AI Engineer).
El usuario describe una idea o problema de negocio. Conviértela en una propuesta de
solución con IA, breve y accionable. Responde en español con EXACTAMENTE este formato markdown:

**Qué construiría:** (1 frase concreta)
**Cómo (IA + stack):** (2-3 tecnologías o enfoques)
**Primeros pasos:** (2-3 pasos cortos)
**Resultado esperado:** (1 frase de valor de negocio)

Máximo 130 palabras. Tono profesional y realista. Nunca uses el guion largo (—).`;

// Fallback local (cuando no hay OPENAI_API_KEY) basado en palabras clave del perfil.
export function localAnswer(message: string): string {
  const m = message.toLowerCase();
  if (/(contrat|cotiz|precio|presupuesto|trabaj|servicio)/.test(m))
    return "Con gusto. Farid trabaja en IA, automatización y desarrollo full stack. Lo más rápido es escribirle por WhatsApp o email (eathanjimenez3@gmail.com). También puedes guardar su contacto con el botón “Guardar contacto”.";
  if (/(agente|chatbot|bot)/.test(m))
    return "Farid construye agentes de IA que razonan, usan herramientas y ejecutan tareas: desde bots de atención hasta asistentes que automatizan procesos completos.";
  if (/(dato|data|dashboard|análisis|analisis)/.test(m))
    return "En datos, Farid hace ciencia de datos y dashboards inteligentes: tableros en vivo que no solo muestran números, los explican para decidir mejor.";
  if (/(automatiz|proceso|flujo)/.test(m))
    return "Farid automatiza procesos repetitivos conectando tus sistemas y APIs, para que el trabajo manual y los errores desaparezcan.";
  if (/(proyecto|portfolio|portafolio)/.test(m))
    return "Algunos de sus proyectos: Xentris.tech, Neona.Tech, Trading Pro GPT, bots con IA, automatizaciones empresariales y dashboards de datos. Revisa la sección Proyectos.";
  if (/(quien|quién|sobre|eathan|farid)/.test(m))
    return "Farid (Eathan) es AI Engineer, Data Scientist y Full Stack Developer en Barranquilla, Colombia. Convierte datos e IA en decisiones inteligentes.";
  return "Soy la IA de Farid. Puedo contarte sobre sus servicios de IA, ciencia de datos, automatización y proyectos. ¿Qué te gustaría saber? Para hablar directo con él, usa WhatsApp o email.";
}

export function localIdea(idea: string): string {
  const topic = idea.trim().slice(0, 80) || "tu idea";
  return `**Qué construiría:** una solución de IA para "${topic}".
**Cómo (IA + stack):** modelos/LLM + automatización de procesos + integración de APIs y un dashboard.
**Primeros pasos:** 1) entender datos y objetivo, 2) prototipo funcional, 3) iterar y desplegar.
**Resultado esperado:** menos trabajo manual y decisiones más rápidas con datos.

(Respuesta de ejemplo sin conexión. Con la API activa, la propuesta se personaliza a tu idea.)`;
}

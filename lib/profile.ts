// ============================================================
//  PERFIL CENTRAL - edita aqui todos tus datos.
//  Los campos marcados con  // TODO  son placeholders:
//  reemplazalos con tus enlaces/numero reales.
// ============================================================

export const profile = {
  name: "Farid Enrique “Eathan” Jiménez Campo",
  shortName: "Farid · Eathan",
  role: "AI Engineer · Data Scientist · Full Stack Developer",
  tagline: "Convierto datos e IA en decisiones inteligentes.",
  subtagline:
    "Diseño soluciones con inteligencia artificial, automatización y desarrollo de software para resolver problemas reales.",

  web: "https://farid.com.co",
  webLabel: "farid.com.co",
  email: "info@farid.com.co",

  // Ubicacion
  city: "Barranquilla, Colombia",
  address: "Calle 54 #39-08 Casa 1",

  // WhatsApp en formato internacional, solo digitos para el enlace wa.me
  whatsapp: "573000000000", // TODO: tu numero real, ej. 573001234567
  whatsappLabel: "+57 300 000 0000", // TODO: como se muestra

  // Redes / credenciales
  linkedin: "https://www.linkedin.com/in/farideathan/",
  github: "https://github.com/xentristech",
  credly: "https://www.credly.com/users/farid-jimenez",

  // Foto del hero / vCard.
  // Placeholder de marca = /farid.svg. Para tu foto real:
  // 1) copia tu foto a /public/farid.jpg  2) cambia esta linea a "/farid.jpg"
  photo: "/farid.svg",
} as const;

export const whatsappUrl = (text?: string) =>
  `https://wa.me/${profile.whatsapp}${
    text ? `?text=${encodeURIComponent(text)}` : ""
  }`;

export const mailtoUrl = (subject?: string) =>
  `mailto:${profile.email}${
    subject ? `?subject=${encodeURIComponent(subject)}` : ""
  }`;

// ---- Lo que hago ----
export const services = [
  {
    title: "Inteligencia Artificial",
    desc: "Modelos, LLMs y copilotos integrados a tu operación real.",
    icon: "Brain",
  },
  {
    title: "Data Science",
    desc: "De datos crudos a hallazgos que cambian decisiones.",
    icon: "ChartLineUp",
  },
  {
    title: "Machine Learning",
    desc: "Modelos predictivos entrenados para tu caso de uso.",
    icon: "Graph",
  },
  {
    title: "Automatización",
    desc: "Procesos repetitivos convertidos en flujos que corren solos.",
    icon: "Gear",
  },
  {
    title: "Integración de APIs",
    desc: "Conecto sistemas, servicios y modelos que antes no se hablaban.",
    icon: "PlugsConnected",
  },
  {
    title: "Desarrollo Full Stack",
    desc: "Producto completo: del backend a la interfaz que se usa.",
    icon: "Code",
  },
  {
    title: "Agentes IA",
    desc: "Agentes que razonan, usan herramientas y ejecutan tareas.",
    icon: "Robot",
  },
  {
    title: "Dashboards inteligentes",
    desc: "Tableros que no solo muestran datos, los explican.",
    icon: "ChartBar",
  },
] as const;

// ---- AIDA ----
export const aida = [
  {
    k: "Atención",
    t: "Tus datos no deberían dormir en archivos, deberían ayudarte a decidir.",
  },
  {
    k: "Interés",
    t: "Conecto datos, APIs, modelos de IA y software para crear sistemas que automatizan procesos y generan valor.",
  },
  {
    k: "Deseo",
    t: "Desde dashboards hasta agentes inteligentes, convierto ideas complejas en productos funcionales.",
  },
  {
    k: "Acción",
    t: "¿Tienes una idea con IA? Convirtámosla en una solución real.",
  },
] as const;

// ---- Proyectos ----
// Los primeros con `url` son sitios reales en producción (prueba social + enlace
// saliente). Los demás son capacidades/servicios sin sitio propio (url: "").
export const projects = [
  {
    name: "Xentris Tech",
    tag: "Plataforma · IA",
    desc: "Agencia y producto de IA y automatización que diseño y desarrollo.",
    seed: "xentris-ai-platform-blue",
    url: "https://xentris.tech",
  },
  {
    name: "Platim.co",
    tag: "Plataforma web",
    desc: "Plataforma digital construida a la medida, en producción.",
    seed: "platim-platform-cyan",
    url: "https://platim.co",
  },
  {
    name: "Yota Montacargas",
    tag: "Sitio corporativo",
    desc: "Sitio web corporativo para empresa de montacargas y logística.",
    seed: "yota-montacargas-industrial",
    url: "https://yotamontacargas.com",
  },
  {
    name: "Neona.Tech",
    tag: "Plataforma",
    desc: "Plataforma digital con núcleo de datos e inteligencia.",
    seed: "neona-tech-neural-violet",
    url: "https://neona.tech",
  },
  {
    name: "Trading Pro GPT",
    tag: "Agente IA",
    desc: "Asistente de análisis de mercados potenciado por modelos de lenguaje.",
    seed: "trading-pro-gpt-chart-cyan",
    url: "",
  },
  {
    name: "Bots con IA",
    tag: "Automatización",
    desc: "Bots conversacionales que atienden, califican y resuelven.",
    seed: "ai-bots-conversation-blue",
    url: "",
  },
  {
    name: "Dashboards de datos",
    tag: "Analytics",
    desc: "Tableros en vivo que vuelven legibles los números del negocio.",
    seed: "data-dashboards-analytics",
    url: "",
  },
  {
    name: "Integraciones con APIs",
    tag: "Infraestructura",
    desc: "Puentes entre plataformas, pagos, CRMs y modelos de IA.",
    seed: "api-integrations-network",
    url: "",
  },
] as const;

// ---- Credenciales ----
export const credentials = [
  { name: "Google Cloud", slug: "googlecloud" },
  { name: "Coursera", slug: "coursera" },
  { name: "Platzi", slug: "platzi" },
  { name: "Credly", slug: "credly" },
  { name: "TensorFlow", slug: "tensorflow" },
] as const;

// ---- Timeline ----
export const timeline = [
  {
    k: "Código",
    t: "Desarrollo de software full stack como base de todo.",
  },
  {
    k: "Datos",
    t: "Análisis y ciencia de datos para entender la realidad del negocio.",
  },
  {
    k: "IA",
    t: "Machine learning y modelos de lenguaje aplicados a problemas reales.",
  },
  {
    k: "Agentes",
    t: "Sistemas autónomos que razonan y ejecutan tareas con herramientas.",
  },
  {
    k: "Productos digitales",
    t: "Soluciones completas, escalables y listas para usarse.",
  },
] as const;

// ---- Mapa de habilidades (galaxia) ----
export const skillMap = [
  "IA",
  "APIs",
  "Automatización",
  "Datos",
  "Software",
  "Negocios",
] as const;

// ---- Modos de audiencia ----
export const audiences = {
  recruiter: {
    label: "Reclutador",
    headline: "Ingeniería de IA lista para tu equipo.",
    sub: "Full stack + ciencia de datos + IA aplicada. Construyo, despliego y mantengo soluciones en producción.",
    cta: "Contratarme",
  },
  client: {
    label: "Cliente",
    headline: "Soluciones de IA que resuelven tu problema.",
    sub: "Automatizo procesos, integro tus sistemas y entrego productos que generan valor desde el primer mes.",
    cta: "Trabajar conmigo",
  },
  ally: {
    label: "Aliado",
    headline: "Construyamos algo inteligente juntos.",
    sub: "Colaboro con equipos y fundadores para llevar ideas con IA de la pizarra al producto real.",
    cta: "Ver soluciones IA",
  },
} as const;

export type AudienceKey = keyof typeof audiences;

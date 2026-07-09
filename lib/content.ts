// ============================================================
//  CONTENIDO BILINGÜE (es / en)
//  Todos los textos visibles del sitio viven aquí. Los componentes
//  leen el idioma activo vía <I18nProvider> (components/i18n.tsx).
//  Los campos estructurales (icon, seed, url, name, slug) se repiten
//  igual en ambos idiomas a propósito: son configuración estática.
// ============================================================

import type { Locale } from "@/lib/i18n";

const es = {
  nav: {
    links: [
      { href: "/diagnostico", label: "Diagnóstico IA" },
      { href: "/playground", label: "Playground" },
      { href: "/blog", label: "Blog" },
      { href: "/#contacto", label: "Contacto" },
    ],
    saveContact: "Guardar contacto",
    home: "inicio",
  },

  hero: {
    audienceToggle: { recruiter: "Reclutador", client: "Cliente", ally: "Aliado" },
    audienceAria: "Elige tu perfil para personalizar el mensaje",
    buttons: {
      work: "Trabajar conmigo",
      projects: "Ver proyectos",
      whatsapp: "WhatsApp",
      saveContact: "Guardar contacto",
    },
    tagline: "Convierto datos e IA en decisiones inteligentes.",
    whatsappMsg: "Hola Farid, vi tu web y quiero conversar sobre un proyecto con IA.",
    terminalHint: "compilando saludo…",
  },

  audiences: {
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
  },

  whatIDo: {
    eyebrow: "Lo que hago",
    headPre: "Capacidades que convierto en ",
    headGrad: "producto",
    headPost: ".",
    services: [
      { title: "Inteligencia Artificial", desc: "Modelos, LLMs y copilotos integrados a tu operación real.", icon: "Brain" },
      { title: "Data Science", desc: "De datos crudos a hallazgos que cambian decisiones.", icon: "ChartLineUp" },
      { title: "Machine Learning", desc: "Modelos predictivos entrenados para tu caso de uso.", icon: "Graph" },
      { title: "Automatización", desc: "Procesos repetitivos convertidos en flujos que corren solos.", icon: "Gear" },
      { title: "Integración de APIs", desc: "Conecto sistemas, servicios y modelos que antes no se hablaban.", icon: "PlugsConnected" },
      { title: "Desarrollo Full Stack", desc: "Producto completo: del backend a la interfaz que se usa.", icon: "Code" },
      { title: "Agentes IA", desc: "Agentes que razonan, usan herramientas y ejecutan tareas.", icon: "Robot" },
      { title: "Dashboards inteligentes", desc: "Tableros que no solo muestran datos, los explican.", icon: "ChartBar" },
    ],
  },

  aida: {
    headPre: "Del dato dormido a la ",
    headGrad: "decisión",
    headPost: ".",
    steps: [
      { k: "Atención", t: "Tus datos no deberían dormir en archivos, deberían ayudarte a decidir." },
      { k: "Interés", t: "Conecto datos, APIs, modelos de IA y software para crear sistemas que automatizan procesos y generan valor." },
      { k: "Deseo", t: "Desde dashboards hasta agentes inteligentes, convierto ideas complejas en productos funcionales." },
      { k: "Acción", t: "¿Tienes una idea con IA? Convirtámosla en una solución real." },
    ],
  },

  projects: {
    eyebrow: "Proyectos destacados",
    headPre: "Ideas que ya viven en ",
    headGrad: "producción",
    headPost: ".",
    viewSite: "Ver sitio",
    wideExtra: "Pagos, CRMs, modelos de IA y servicios externos conectados en un solo flujo confiable.",
    items: [
      { name: "Xentris Tech", tag: "Empresa de tecnología", desc: "Software a medida, infraestructura cloud, IA y estrategia digital para empresas.", seed: "xentris-ai-platform-blue", url: "https://xentris.tech" },
      { name: "Platim.co", tag: "Web corporativa · B2B", desc: "Dotaciones, uniformes, calzado y EPP de seguridad industrial en Colombia.", seed: "platim-platform-cyan", url: "https://platim.co" },
      { name: "Yota Montacargas", tag: "Web corporativa", desc: "Venta, alquiler, repuestos y taller de montacargas para bodegas, puertos e industria.", seed: "yota-montacargas-industrial", url: "https://yotamontacargas.com" },
      { name: "Neona.Tech", tag: "Estudio de IA", desc: "Estudio de inteligencia artificial. Muy pronto.", seed: "neona-tech-neural-violet", url: "https://neona.tech" },
      { name: "Trading Pro GPT", tag: "Agente IA", desc: "Asistente de análisis de mercados potenciado por modelos de lenguaje.", seed: "trading-pro-gpt-chart-cyan", url: "" },
      { name: "Bots con IA", tag: "Automatización", desc: "Bots conversacionales que atienden, califican y resuelven.", seed: "ai-bots-conversation-blue", url: "" },
      { name: "Dashboards de datos", tag: "Analytics", desc: "Tableros en vivo que vuelven legibles los números del negocio.", seed: "data-dashboards-analytics", url: "" },
      { name: "Integraciones con APIs", tag: "Infraestructura", desc: "Puentes entre plataformas, pagos, CRMs y modelos de IA.", seed: "api-integrations-network", url: "" },
    ],
  },

  credentials: {
    badge: "Credenciales verificadas",
    heading: "Credenciales que respaldan la práctica.",
    credlyLink: "Ver mis insignias en Credly",
  },

  trajectory: {
    galaxyHint: "Toca cada nodo: así se conectan mis disciplinas.",
    eyebrow: "Trayectoria",
    headPre: "De una línea de código a ",
    headGrad: "productos inteligentes",
    headPost: ".",
    items: [
      { k: "Código", t: "Desarrollo de software full stack como base de todo." },
      { k: "Datos", t: "Análisis y ciencia de datos para entender la realidad del negocio." },
      { k: "IA", t: "Machine learning y modelos de lenguaje aplicados a problemas reales." },
      { k: "Agentes", t: "Sistemas autónomos que razonan y ejecutan tareas con herramientas." },
      { k: "Productos digitales", t: "Soluciones completas, escalables y listas para usarse." },
    ],
    skillMap: ["IA", "APIs", "Automatización", "Datos", "Software", "Negocios"],
  },

  contact: {
    eyebrow: "Contacto",
    headPre: "Hablemos de tu próximo ",
    headGrad: "proyecto con IA",
    headPost: ".",
    locationLabel: "Ubicación",
    whatsappFast: "Respuesta rápida",
    saveVcf: "Guardar mi contacto (.vcf)",
    whatsappMsg: "Hola Farid, quiero hablar sobre un proyecto.",
    mailSubject: "Proyecto con IA",
    mapTitle: "Ubicación de Farid en Barranquilla",
    form: {
      name: "Nombre",
      email: "Email",
      message: "Mensaje",
      namePh: "Tu nombre…",
      emailPh: "tucorreo@ejemplo.com",
      messagePh: "Cuéntame sobre tu proyecto…",
      send: "Enviar mensaje",
      sending: "Enviando…",
      okTitle: "¡Gracias! Recibí tu mensaje.",
      okSub: "Te respondo lo antes posible.",
      sendAnother: "Enviar otro",
      errGeneric: "No se pudo enviar.",
      errConn: "Error de conexión. Escríbeme por WhatsApp.",
    },
  },

  finalCta: {
    headPre: "Construyamos algo inteligente, útil y ",
    headGrad: "escalable",
    headPost: ".",
    sub: "Si tienes una idea con IA, la convertimos en una solución real.",
    talk: "Hablemos",
    saveContact: "Guardar contacto",
  },

  askAI: {
    fab: "Habla con Eathan",
    title: "Eathan",
    online: "IA de Farid · En línea",
    listening: "Escuchando…",
    speaking: "Hablando…",
    voice: "Voz",
    intro: "¡Hola! Soy Eathan, la IA de Farid (su gemelo digital). Pregúntame sobre sus servicios de IA, proyectos, automatización o cómo trabajar con él. Puedes escribirme o hablarme por voz.",
    suggestions: ["¿Cómo te llamas?", "¿Qué servicios ofrece Farid?", "¿Dónde veo su trabajo?"],
    inputPh: "Escribe o habla…",
    listeningPh: "Escuchando…",
    voiceHint: "Modo voz activo: habla y Eathan te responde en voz alta.",
    listen: "Escuchar",
    stop: "Detener",
    errConn: "Hubo un problema de conexión. Escríbele directo por WhatsApp o email.",
  },

  vcard: {
    rows: { email: "Email", whatsapp: "WhatsApp", web: "Web", linkedin: "LinkedIn", github: "GitHub", credly: "Credly" },
    values: { linkedin: "Perfil profesional", github: "Repositorios", credly: "Insignias verificadas" },
    download: "Descargar contacto (.vcf)",
    qrCaption: "Escanea para guardar mi contacto al instante.",
    qrAlt: "Código QR para guardar el contacto de Farid",
    mailSubject: "Hola Farid",
  },

  ideaDemo: {
    badge: "Demo en vivo",
    headPre: "Escribe una idea y mira cómo la ",
    headGrad: "IA la convierte en solución",
    headPost: ".",
    inputPh: "Ej: quiero automatizar las cotizaciones de mi empresa…",
    inputAria: "Describe tu idea para convertirla en una solución con IA",
    thinking: "Pensando…",
    convert: "Convertir",
    examples: [
      "Quiero un bot que atienda WhatsApp de mi tienda",
      "Predecir qué clientes van a cancelar",
      "Un dashboard que resuma mis ventas cada día",
    ],
    proposal: "Propuesta generada",
    errNoResp: "No pude generar una respuesta. Intenta de nuevo.",
    errConn: "Hubo un problema de conexión. Intenta de nuevo.",
  },

  skillGalaxy: {
    groupAria: "Mis disciplinas: toca cada nodo para ver cómo se conectan",
    nodes: [
      { label: "IA", desc: "El cerebro: modelos y razonamiento." },
      { label: "APIs", desc: "El sistema nervioso: todo conectado." },
      { label: "Automatización", desc: "Los reflejos: procesos que corren solos." },
      { label: "Datos", desc: "La memoria: la base de cada decisión." },
      { label: "Software", desc: "El cuerpo: el producto que se usa." },
      { label: "Negocios", desc: "El propósito: valor real y medible." },
    ],
  },
};

// ---- Inglés (mismo shape que `es`) ----
const en: typeof es = {
  nav: {
    links: [
      { href: "/diagnostico", label: "AI Diagnosis" },
      { href: "/playground", label: "Playground" },
      { href: "/blog", label: "Blog" },
      { href: "/#contacto", label: "Contact" },
    ],
    saveContact: "Save contact",
    home: "home",
  },

  hero: {
    audienceToggle: { recruiter: "Recruiter", client: "Client", ally: "Partner" },
    audienceAria: "Choose your profile to personalize the message",
    buttons: {
      work: "Work with me",
      projects: "See projects",
      whatsapp: "WhatsApp",
      saveContact: "Save contact",
    },
    tagline: "I turn data and AI into smart decisions.",
    whatsappMsg: "Hi Farid, I saw your site and I'd like to talk about an AI project.",
    terminalHint: "compiling greeting…",
  },

  audiences: {
    recruiter: {
      label: "Recruiter",
      headline: "AI engineering ready for your team.",
      sub: "Full stack + data science + applied AI. I build, deploy and maintain production solutions.",
      cta: "Hire me",
    },
    client: {
      label: "Client",
      headline: "AI solutions that solve your problem.",
      sub: "I automate processes, integrate your systems and deliver products that create value from month one.",
      cta: "Work with me",
    },
    ally: {
      label: "Partner",
      headline: "Let's build something intelligent together.",
      sub: "I collaborate with teams and founders to take AI ideas from the whiteboard to a real product.",
      cta: "See AI solutions",
    },
  },

  whatIDo: {
    eyebrow: "What I do",
    headPre: "Capabilities I turn into ",
    headGrad: "product",
    headPost: ".",
    services: [
      { title: "Artificial Intelligence", desc: "Models, LLMs and copilots integrated into your real operations.", icon: "Brain" },
      { title: "Data Science", desc: "From raw data to findings that change decisions.", icon: "ChartLineUp" },
      { title: "Machine Learning", desc: "Predictive models trained for your use case.", icon: "Graph" },
      { title: "Automation", desc: "Repetitive processes turned into flows that run themselves.", icon: "Gear" },
      { title: "API Integration", desc: "I connect systems, services and models that couldn't talk before.", icon: "PlugsConnected" },
      { title: "Full Stack Development", desc: "The complete product: from backend to the interface people use.", icon: "Code" },
      { title: "AI Agents", desc: "Agents that reason, use tools and get tasks done.", icon: "Robot" },
      { title: "Smart Dashboards", desc: "Dashboards that don't just show data, they explain it.", icon: "ChartBar" },
    ],
  },

  aida: {
    headPre: "From sleeping data to a ",
    headGrad: "decision",
    headPost: ".",
    steps: [
      { k: "Attention", t: "Your data shouldn't sleep in files, it should help you decide." },
      { k: "Interest", t: "I connect data, APIs, AI models and software to build systems that automate processes and create value." },
      { k: "Desire", t: "From dashboards to intelligent agents, I turn complex ideas into working products." },
      { k: "Action", t: "Got an idea with AI? Let's turn it into a real solution." },
    ],
  },

  projects: {
    eyebrow: "Featured projects",
    headPre: "Ideas already living in ",
    headGrad: "production",
    headPost: ".",
    viewSite: "Visit site",
    wideExtra: "Payments, CRMs, AI models and external services connected into a single reliable flow.",
    items: [
      { name: "Xentris Tech", tag: "Technology company", desc: "Custom software, cloud infrastructure, AI and digital strategy for companies.", seed: "xentris-ai-platform-blue", url: "https://xentris.tech" },
      { name: "Platim.co", tag: "Corporate site · B2B", desc: "Workwear, uniforms, footwear and industrial safety PPE in Colombia.", seed: "platim-platform-cyan", url: "https://platim.co" },
      { name: "Yota Montacargas", tag: "Corporate site", desc: "Sales, rental, parts and service shop for forklifts — warehouses, ports and industry.", seed: "yota-montacargas-industrial", url: "https://yotamontacargas.com" },
      { name: "Neona.Tech", tag: "AI studio", desc: "Artificial intelligence studio. Coming soon.", seed: "neona-tech-neural-violet", url: "https://neona.tech" },
      { name: "Trading Pro GPT", tag: "AI agent", desc: "Market-analysis assistant powered by language models.", seed: "trading-pro-gpt-chart-cyan", url: "" },
      { name: "AI Bots", tag: "Automation", desc: "Conversational bots that assist, qualify and resolve.", seed: "ai-bots-conversation-blue", url: "" },
      { name: "Data Dashboards", tag: "Analytics", desc: "Live dashboards that make business numbers readable.", seed: "data-dashboards-analytics", url: "" },
      { name: "API Integrations", tag: "Infrastructure", desc: "Bridges between platforms, payments, CRMs and AI models.", seed: "api-integrations-network", url: "" },
    ],
  },

  credentials: {
    badge: "Verified credentials",
    heading: "Credentials that back the practice.",
    credlyLink: "See my badges on Credly",
  },

  trajectory: {
    galaxyHint: "Tap each node: this is how my disciplines connect.",
    eyebrow: "Path",
    headPre: "From a line of code to ",
    headGrad: "intelligent products",
    headPost: ".",
    items: [
      { k: "Code", t: "Full stack software development as the foundation of everything." },
      { k: "Data", t: "Data analysis and data science to understand the reality of the business." },
      { k: "AI", t: "Machine learning and language models applied to real problems." },
      { k: "Agents", t: "Autonomous systems that reason and execute tasks with tools." },
      { k: "Digital products", t: "Complete, scalable solutions, ready to use." },
    ],
    skillMap: ["AI", "APIs", "Automation", "Data", "Software", "Business"],
  },

  contact: {
    eyebrow: "Contact",
    headPre: "Let's talk about your next ",
    headGrad: "AI project",
    headPost: ".",
    locationLabel: "Location",
    whatsappFast: "Quick reply",
    saveVcf: "Save my contact (.vcf)",
    whatsappMsg: "Hi Farid, I'd like to talk about a project.",
    mailSubject: "AI project",
    mapTitle: "Farid's location in Barranquilla",
    form: {
      name: "Name",
      email: "Email",
      message: "Message",
      namePh: "Your name…",
      emailPh: "you@example.com",
      messagePh: "Tell me about your project…",
      send: "Send message",
      sending: "Sending…",
      okTitle: "Thanks! I got your message.",
      okSub: "I'll get back to you as soon as possible.",
      sendAnother: "Send another",
      errGeneric: "Couldn't send.",
      errConn: "Connection error. Message me on WhatsApp.",
    },
  },

  finalCta: {
    headPre: "Let's build something intelligent, useful and ",
    headGrad: "scalable",
    headPost: ".",
    sub: "If you have an idea with AI, we'll turn it into a real solution.",
    talk: "Let's talk",
    saveContact: "Save contact",
  },

  askAI: {
    fab: "Talk to Eathan",
    title: "Eathan",
    online: "Farid's AI · Online",
    listening: "Listening…",
    speaking: "Speaking…",
    voice: "Voice",
    intro: "Hi! I'm Eathan, Farid's AI (his digital twin). Ask me about his AI services, projects, automation or how to work with him. You can type or talk to me.",
    suggestions: ["What's your name?", "What services does Farid offer?", "Where can I see his work?"],
    inputPh: "Type or talk…",
    listeningPh: "Listening…",
    voiceHint: "Voice mode on: talk and Eathan replies out loud.",
    listen: "Listen",
    stop: "Stop",
    errConn: "There was a connection problem. Reach out directly on WhatsApp or email.",
  },

  vcard: {
    rows: { email: "Email", whatsapp: "WhatsApp", web: "Web", linkedin: "LinkedIn", github: "GitHub", credly: "Credly" },
    values: { linkedin: "Professional profile", github: "Repositories", credly: "Verified badges" },
    download: "Download contact (.vcf)",
    qrCaption: "Scan to save my contact instantly.",
    qrAlt: "QR code to save Farid's contact",
    mailSubject: "Hi Farid",
  },

  ideaDemo: {
    badge: "Live demo",
    headPre: "Type an idea and watch ",
    headGrad: "AI turn it into a solution",
    headPost: ".",
    inputPh: "E.g.: I want to automate my company's quotes…",
    inputAria: "Describe your idea to turn it into an AI solution",
    thinking: "Thinking…",
    convert: "Convert",
    examples: [
      "I want a bot to handle my store's WhatsApp",
      "Predict which customers will churn",
      "A dashboard that summarizes my sales every day",
    ],
    proposal: "Generated proposal",
    errNoResp: "I couldn't generate a response. Try again.",
    errConn: "There was a connection problem. Try again.",
  },

  skillGalaxy: {
    groupAria: "My disciplines: tap each node to see how they connect",
    nodes: [
      { label: "AI", desc: "The brain: models and reasoning." },
      { label: "APIs", desc: "The nervous system: everything connected." },
      { label: "Automation", desc: "The reflexes: processes that run themselves." },
      { label: "Data", desc: "The memory: the basis of every decision." },
      { label: "Software", desc: "The body: the product people use." },
      { label: "Business", desc: "The purpose: real, measurable value." },
    ],
  },
};

export const content = { es, en };
export type Content = typeof es;

export function getContent(locale: Locale): Content {
  return locale === "en" ? en : es;
}

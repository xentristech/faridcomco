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

  dataJourney: {
    headPre: "Del dato dormido a la ",
    headGrad: "decisión",
    headPost: ".",
    sub: "Un dato real atravesando el sistema. Esto es, literalmente, lo que hago.",
    hint: "Toca una etapa para detener el flujo.",
    footnote: "Ejemplo ilustrativo: el flujo es real, los datos son ficticios.",
    regenerate: "Otro ejemplo",
    regenerating: "Generando…",
    aiBadge: "generado por IA",
    stages: [
      { key: "raw", label: "Dato dormido", caption: "Vive en un archivo que nadie abre.", badge: "sin usar" },
      { key: "ctx", label: "Contexto", caption: "Lo cruzo con el resto de tus sistemas.", badge: "enriquecido" },
      { key: "model", label: "Modelo", caption: "Un modelo estima qué va a pasar.", badge: "predicho" },
      { key: "decision", label: "Decisión", caption: "Y termina en una acción, no en un gráfico.", badge: "decidido" },
    ],
    cases: [
      {
        id: "retencion",
        audience: "client",
        payloads: [
          { title: "pedido_4821.csv", lines: ["cliente: 1043", "monto: 1.250.000", "fecha: 2026-06-14", "estado: —"] },
          { title: "cliente_1043", lines: ["compras: 7 en 12 meses", "soporte: 3 quejas abiertas", "último contacto: hace 41 días", "ticket medio: alto"] },
          { title: "predicción", lines: ["riesgo_fuga = 0.87", "confianza = 0.91", "factor: quejas sin resolver"] },
          { title: "acción recomendada", lines: ["Llamar hoy antes de las 5 p.m.", "Resolver queja #2291", "Oferta de retención: 15%"] },
        ],
      },
      {
        id: "inventario",
        audience: "client",
        payloads: [
          { title: "inventario_junio.xlsx", lines: ["sku: TRM-88", "stock: 12 u.", "rotación: —", "proveedor: 3 semanas"] },
          { title: "sku_TRM-88", lines: ["ventas: 9 u./semana", "temporada: alta", "quiebres previos: 2", "lead time: 21 días"] },
          { title: "predicción", lines: ["quiebre_en = 9 días", "demanda_4sem = 41 u.", "confianza = 0.88"] },
          { title: "acción recomendada", lines: ["Ordenar 45 u. hoy", "Subir punto de reorden a 20", "Avisar a compras"] },
        ],
      },
      {
        id: "incidente",
        audience: "recruiter",
        payloads: [
          { title: "api_logs_0312.jsonl", lines: ["requests: 1.2 M", "errores 5xx: 0.4 %", "p95: 240 ms", "trazas: sin correlacionar"] },
          { title: "servicio_checkout", lines: ["despliegue: hace 40 min", "picos de 5xx tras el deploy", "dependencia: pasarela de pagos", "timeouts: 1.8 s"] },
          { title: "diagnóstico", lines: ["causa_probable = timeout pasarela", "impacto = 3.100 checkouts", "confianza = 0.84"] },
          { title: "acción recomendada", lines: ["Rollback del deploy 8f2c1a", "Timeout a 5 s + reintento", "Alertar si 5xx > 0.2 %"] },
        ],
      },
      {
        id: "activacion",
        audience: "ally",
        payloads: [
          { title: "eventos_app.parquet", lines: ["usuarios: 24.910", "eventos: 3.4 M", "sesiones: sin agrupar", "cohortes: —"] },
          { title: "cohorte_mayo", lines: ["activación día 1: 38 %", "usan la función clave: 21 %", "retención D30: 12 %", "fricción: onboarding"] },
          { title: "predicción", lines: ["churn_D30 = 0.71 sin activar", "lift si activan = +34 pts", "confianza = 0.89"] },
          { title: "acción recomendada", lines: ["Rehacer el paso 2 del onboarding", "Empujar la función clave el día 1", "Medir con A/B a 2 semanas"] },
        ],
      },
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
      { name: "DominioGPT", tag: "Herramienta de IA", desc: "Genera nombres de dominio con IA y verifica su disponibilidad en tiempo real.", seed: "dominiogpt-ai-domains", url: "https://dominio.neona.tech" },
      { name: "Trading Pro GPT", tag: "Agente IA", desc: "Asistente de análisis de mercados potenciado por modelos de lenguaje.", seed: "trading-pro-gpt-chart-cyan", url: "" },
      { name: "Bots con IA", tag: "Automatización", desc: "Bots conversacionales que atienden, califican y resuelven.", seed: "ai-bots-conversation-blue", url: "" },
      { name: "Dashboards de datos", tag: "Analytics", desc: "Tableros en vivo que vuelven legibles los números del negocio.", seed: "data-dashboards-analytics", url: "" },
      { name: "Integraciones con APIs", tag: "Infraestructura", desc: "Puentes entre plataformas, pagos, CRMs y modelos de IA.", seed: "api-integrations-network", url: "" },
    ],
  },

  aiStack: {
    eyebrow: "El stack",
    headPre: "Trabajo con lo mejor del ",
    headGrad: "ecosistema de IA y datos",
    headPost: ".",
    sub: "No colecciono logos: sé en qué capa vive cada herramienta y qué construyo en cada una.",
    hint: "Pasa el cursor o toca una capa.",
    note: "Marcas de sus respectivos dueños. Las uso como herramientas; no implica patrocinio.",
    layers: [
      {
        key: "orq",
        label: "Orquestación & agentes",
        blurb: "Conecto modelos, herramientas y sistemas para que ejecuten tareas solos.",
        items: [
          { name: "LangChain", slug: "langchain" },
          { name: "Make", slug: "make" },
          { name: "n8n", slug: "n8n" },
        ],
      },
      {
        key: "mod",
        label: "Modelos (LLMs)",
        blurb: "Elijo el modelo por el problema, no por la moda.",
        items: [
          { name: "Claude", slug: "claude" },
          { name: "Gemini", slug: "googlegemini" },
          { name: "Llama", slug: "meta" },
          { name: "Mistral", slug: "mistralai" },
          { name: "Hugging Face", slug: "huggingface" },
        ],
      },
      {
        key: "ml",
        label: "Frameworks & ML",
        blurb: "Entreno y afino modelos cuando un LLM no es la respuesta.",
        items: [
          { name: "PyTorch", slug: "pytorch" },
          { name: "TensorFlow", slug: "tensorflow" },
          { name: "scikit-learn", slug: "scikitlearn" },
        ],
      },
      {
        key: "data",
        label: "Datos",
        blurb: "Todo empieza aquí: sin datos limpios no hay IA que sirva.",
        items: [
          { name: "Python", slug: "python" },
          { name: "pandas", slug: "pandas" },
          { name: "NumPy", slug: "numpy" },
        ],
      },
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

  dataJourney: {
    headPre: "From sleeping data to a ",
    headGrad: "decision",
    headPost: ".",
    sub: "A real data point crossing the system. This is, literally, what I do.",
    hint: "Tap a stage to pause the flow.",
    footnote: "Illustrative example: the flow is real, the data is fictional.",
    regenerate: "Another example",
    regenerating: "Generating…",
    aiBadge: "AI-generated",
    stages: [
      { key: "raw", label: "Sleeping data", caption: "It lives in a file nobody opens.", badge: "unused" },
      { key: "ctx", label: "Context", caption: "I cross it with the rest of your systems.", badge: "enriched" },
      { key: "model", label: "Model", caption: "A model estimates what's going to happen.", badge: "predicted" },
      { key: "decision", label: "Decision", caption: "And it ends in an action, not a chart.", badge: "decided" },
    ],
    cases: [
      {
        id: "retencion",
        audience: "client",
        payloads: [
          { title: "order_4821.csv", lines: ["customer: 1043", "amount: 1,250,000", "date: 2026-06-14", "status: —"] },
          { title: "customer_1043", lines: ["purchases: 7 in 12 months", "support: 3 open complaints", "last contact: 41 days ago", "avg ticket: high"] },
          { title: "prediction", lines: ["churn_risk = 0.87", "confidence = 0.91", "driver: unresolved complaints"] },
          { title: "recommended action", lines: ["Call today before 5 p.m.", "Resolve complaint #2291", "Retention offer: 15%"] },
        ],
      },
      {
        id: "inventario",
        audience: "client",
        payloads: [
          { title: "inventory_june.xlsx", lines: ["sku: TRM-88", "stock: 12 units", "turnover: —", "supplier: 3 weeks"] },
          { title: "sku_TRM-88", lines: ["sales: 9 units/week", "season: high", "past stockouts: 2", "lead time: 21 days"] },
          { title: "prediction", lines: ["stockout_in = 9 days", "demand_4w = 41 units", "confidence = 0.88"] },
          { title: "recommended action", lines: ["Order 45 units today", "Raise reorder point to 20", "Notify purchasing"] },
        ],
      },
      {
        id: "incidente",
        audience: "recruiter",
        payloads: [
          { title: "api_logs_0312.jsonl", lines: ["requests: 1.2 M", "5xx errors: 0.4 %", "p95: 240 ms", "traces: uncorrelated"] },
          { title: "checkout_service", lines: ["deploy: 40 min ago", "5xx spikes after deploy", "dependency: payment gateway", "timeouts: 1.8 s"] },
          { title: "diagnosis", lines: ["likely_cause = gateway timeout", "impact = 3,100 checkouts", "confidence = 0.84"] },
          { title: "recommended action", lines: ["Roll back deploy 8f2c1a", "Timeout to 5 s + retry", "Alert if 5xx > 0.2 %"] },
        ],
      },
      {
        id: "activacion",
        audience: "ally",
        payloads: [
          { title: "app_events.parquet", lines: ["users: 24,910", "events: 3.4 M", "sessions: ungrouped", "cohorts: —"] },
          { title: "may_cohort", lines: ["day-1 activation: 38 %", "use the key feature: 21 %", "D30 retention: 12 %", "friction: onboarding"] },
          { title: "prediction", lines: ["churn_D30 = 0.71 if not activated", "lift if activated = +34 pts", "confidence = 0.89"] },
          { title: "recommended action", lines: ["Rebuild onboarding step 2", "Push the key feature on day 1", "Measure with a 2-week A/B"] },
        ],
      },
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
      { name: "DominioGPT", tag: "AI tool", desc: "Generates domain names with AI and checks their availability in real time.", seed: "dominiogpt-ai-domains", url: "https://dominio.neona.tech" },
      { name: "Trading Pro GPT", tag: "AI agent", desc: "Market-analysis assistant powered by language models.", seed: "trading-pro-gpt-chart-cyan", url: "" },
      { name: "AI Bots", tag: "Automation", desc: "Conversational bots that assist, qualify and resolve.", seed: "ai-bots-conversation-blue", url: "" },
      { name: "Data Dashboards", tag: "Analytics", desc: "Live dashboards that make business numbers readable.", seed: "data-dashboards-analytics", url: "" },
      { name: "API Integrations", tag: "Infrastructure", desc: "Bridges between platforms, payments, CRMs and AI models.", seed: "api-integrations-network", url: "" },
    ],
  },

  aiStack: {
    eyebrow: "The stack",
    headPre: "I work with the best of the ",
    headGrad: "AI and data ecosystem",
    headPost: ".",
    sub: "I don't collect logos: I know which layer each tool lives in and what I build at each one.",
    hint: "Hover or tap a layer.",
    note: "Trademarks belong to their respective owners. I use them as tools; this implies no endorsement.",
    layers: [
      {
        key: "orq",
        label: "Orchestration & agents",
        blurb: "I connect models, tools and systems so they get tasks done on their own.",
        items: [
          { name: "LangChain", slug: "langchain" },
          { name: "Make", slug: "make" },
          { name: "n8n", slug: "n8n" },
        ],
      },
      {
        key: "mod",
        label: "Models (LLMs)",
        blurb: "I pick the model for the problem, not for the hype.",
        items: [
          { name: "Claude", slug: "claude" },
          { name: "Gemini", slug: "googlegemini" },
          { name: "Llama", slug: "meta" },
          { name: "Mistral", slug: "mistralai" },
          { name: "Hugging Face", slug: "huggingface" },
        ],
      },
      {
        key: "ml",
        label: "Frameworks & ML",
        blurb: "I train and fine-tune models when an LLM isn't the answer.",
        items: [
          { name: "PyTorch", slug: "pytorch" },
          { name: "TensorFlow", slug: "tensorflow" },
          { name: "scikit-learn", slug: "scikitlearn" },
        ],
      },
      {
        key: "data",
        label: "Data",
        blurb: "It all starts here: without clean data there's no AI worth having.",
        items: [
          { name: "Python", slug: "python" },
          { name: "pandas", slug: "pandas" },
          { name: "NumPy", slug: "numpy" },
        ],
      },
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

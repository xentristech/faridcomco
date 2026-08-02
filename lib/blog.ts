// ============================================================
//  BLOG - contenido estructurado (una sola fuente de verdad).
//  Cada post se guarda como bloques: el mismo dato alimenta
//  el render (identidad de marca Farid/Eathan) y la IA del
//  artículo (/api/blog-ask).
//
//  BILINGÜE: cada post existe en `postsEs` y `postsEn` con el
//  MISMO `slug`, los mismos `id` de encabezado y la misma `seed`.
//  Eso mantiene emparejadas /blog/x y /en/blog/x para el hreflang
//  y hace que los anclas del índice funcionen en ambos idiomas.
//  Para agregar un post, añádelo a las DOS listas.
// ============================================================

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; variant: "info" | "warn"; label?: string; text: string }
  | { type: "quote"; text: string }
  | { type: "figure"; seed: string; caption: string; image?: string; chip?: string }
  | {
      type: "table";
      head: string[];
      rows: { cells: string[]; highlight?: boolean }[];
    };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  eyebrow: string;
  category: string;
  author: string;
  date: string; // ISO
  dateLabel: string;
  readTime: string;
  tags: string[];
  seed: string; // semilla para el gradiente de portada (respaldo si no hay foto)
  image?: string; // foto de portada opcional (ruta en /public); si falta, se usa el gradiente
  suggestions?: string[]; // preguntas sugeridas para el chat de IA del artículo
  toc: { id: string; label: string }[];
  blocks: Block[];
};

export const postsEs: Post[] = [
  {
    slug: "openjarvis-ia-personal-que-corre-en-tu-maquina",
    title: "OpenJarvis: la IA personal que corre en tu propia máquina",
    excerpt:
      "Stanford liberó un framework open source para construir agentes de IA que viven en tu equipo, no en la nube. Privacidad, costo cero por token y agentes con memoria. Esto es lo bueno.",
    eyebrow: "IA local · Open source",
    category: "IA local",
    author: "Farid · Eathan",
    date: "2026-08-02",
    dateLabel: "Agosto 2026",
    readTime: "7 min",
    tags: ["OpenJarvis", "IA local", "Agentes", "Ollama", "Stanford", "Privacidad", "Open source", "LLM"],
    seed: "openjarvis-local-first-neural",
    suggestions: [
      "¿Qué es OpenJarvis en una frase?",
      "¿Por qué correr la IA en local y no en la nube?",
      "¿Qué necesito para instalarlo?",
    ],
    toc: [
      { id: "que-es", label: "Qué es OpenJarvis" },
      { id: "por-que", label: "La idea: inteligencia por vatio" },
      { id: "componentes", label: "Los cinco componentes" },
      { id: "agentes", label: "Agentes y skills" },
      { id: "instalar", label: "Cómo se instala" },
      { id: "lo-bueno", label: "Por qué es bueno" },
      { id: "conclusion", label: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "que-es", text: "Qué es OpenJarvis" },
      {
        type: "p",
        text: "OpenJarvis es un framework **open source** (licencia Apache 2.0) para construir **agentes de IA personales que corren en tu propia máquina**, no en la nube. Su lema lo resume bien: \"Personal AI, on personal devices\". La nube deja de ser el default y pasa a ser opcional.",
      },
      {
        type: "p",
        text: "Lo desarrolló **Stanford**, entre los laboratorios Hazy Research y Scaling Intelligence Lab, y su versión 1.0 salió en 2026 con soporte nativo para **Ollama**. La apuesta es simple: invertir la ecuación actual, donde casi toda la IA \"personal\" en realidad depende de servidores ajenos.",
      },
      {
        type: "figure",
        seed: "openjarvis-local-first",
        chip: "OpenJarvis",
        caption: "Local-first: los modelos, la memoria y los agentes viven en tu equipo; la nube es opcional.",
      },

      { type: "h2", id: "por-que", text: "La idea: inteligencia por vatio" },
      {
        type: "p",
        text: "OpenJarvis nace de una investigación de Stanford llamada **Intelligence Per Watt** (inteligencia por vatio). El hallazgo clave es contundente: los modelos y aceleradores locales ya resuelven con precisión el **88.7% de las consultas de chat y razonamiento de un solo turno**, y a latencias interactivas. Además, la eficiencia de \"inteligencia\" mejoró **5.3× entre 2023 y 2025**.",
      },
      {
        type: "callout",
        variant: "info",
        label: "Lo que cambia de fondo:",
        text: "OpenJarvis trata la energía, los FLOPs, la latencia y el costo en dólares como restricciones de primera clase, al mismo nivel que la precisión. No es solo \"¿responde bien?\", sino \"¿responde bien, rápido, barato y sin salir de tu equipo?\".",
      },
      {
        type: "p",
        text: "La consecuencia práctica es directa: para la mayoría de tareas cotidianas ya no necesitas mandar tus datos a un servidor de terceros ni pagar por token. Es el complemento de software natural para el hardware de IA local del que ya hablé con el DGX Spark.",
      },

      { type: "h2", id: "componentes", text: "Los cinco componentes" },
      {
        type: "p",
        text: "El framework se arma con cinco primitivas componibles. Esa separación es lo que permite cambiar un modelo o un motor de inferencia sin reescribir tu agente.",
      },
      {
        type: "table",
        head: ["Componente", "Qué hace"],
        rows: [
          { cells: ["Intelligence", "Selección y catálogo de modelos locales."] },
          { cells: ["Engine", "Motores de inferencia (Ollama, vLLM, SGLang, llama.cpp) con autodetección de hardware."] },
          { cells: ["Agents", "Ocho tipos de agente con razonamiento multipaso y uso de herramientas."] },
          { cells: ["Tools & Memory", "Búsqueda web, ejecución de código, archivos, memoria persistente y servidores MCP."] },
          { cells: ["Learning", "Mejora automática a partir de las trazas locales de uso."] },
        ],
      },
      {
        type: "p",
        text: "Corre sobre casi cualquier acelerador (Apple Silicon, NVIDIA, AMD, NPUs o CPU) y expone una **API compatible con OpenAI**. En la práctica, cualquier app que ya hable ese formato puede apuntar a tu máquina en lugar de a la nube.",
      },

      { type: "h2", id: "agentes", text: "Agentes y skills" },
      {
        type: "p",
        text: "Trae ocho agentes listos para usar en tres modos de ejecución: **bajo demanda, programados y continuos**. Entre ellos: un digest matutino con audio, investigación profunda con citas, un monitor continuo con memoria, un orquestador que elige herramientas por su cuenta, y agentes ReAct, CodeAct y de chat simple.",
      },
      {
        type: "p",
        text: "Los **skills** son herramientas que los agentes descubren e invocan solos cuando las necesitan. Se pueden importar desde Hermes Agent (unos 150 skills), OpenClaw (alrededor de 13,700 skills de la comunidad) o cualquier repo de GitHub que siga el estándar agentskills.io.",
      },
      {
        type: "quote",
        text: "El valor no es un chatbot más: es correr agentes con memoria y herramientas en tu propio hardware, sin que tus datos salgan de casa.",
      },

      { type: "h2", id: "instalar", text: "Cómo se instala" },
      {
        type: "p",
        text: "Hay instaladores de escritorio nativos (construidos con Tauri) para **macOS** (DMG universal, Apple Silicon e Intel), **Windows 10+** (EXE) y **Linux** (DEB, RPM y AppImage).",
      },
      { type: "h3", text: "Lo que necesitas" },
      {
        type: "ul",
        items: [
          "Python 3.10 a 3.13 y Node.js 18+",
          "Ollama (o un motor de inferencia compatible)",
          "Un script quickstart que instala dependencias, Ollama y un modelo inicial en unos 3 minutos",
        ],
      },
      {
        type: "p",
        text: "Más allá del escritorio, hay una **CLI**, un **SDK de Python** (la clase `Jarvis`) y un servidor de API en el puerto 8000. También integra Google Drive, Gmail, Calendar y Tasks vía OAuth, para agentes que trabajan con tus propios datos.",
      },

      { type: "h2", id: "lo-bueno", text: "Por qué es bueno" },
      {
        type: "p",
        text: "Lo interesante de OpenJarvis no es un truco aislado, sino la suma:",
      },
      {
        type: "ul",
        items: [
          "**Privacidad real**: tus conversaciones y archivos no salen del equipo.",
          "**Costo cero por token**: la nube es opcional, no una factura mensual.",
          "**Funciona offline**: útil sin conexión o con datos sensibles.",
          "**Eficiencia medible**: energía y costo tratados como métricas, no como notas al pie.",
          "**Flexibilidad**: multi-backend y API compatible con OpenAI.",
          "**Extensible**: un ecosistema grande de skills reutilizables.",
          "**Abierto y con respaldo académico**: Apache 2.0 y ciencia de Stanford detrás.",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        label: "El límite real:",
        text: "todo depende de tu hardware. Los modelos muy grandes (100B+ de parámetros) siguen pidiendo mucha memoria, y para cargas pesadas la nube todavía gana en potencia bruta. OpenJarvis brilla como el cerebro cotidiano en local, no como reemplazo total de un clúster.",
      },

      { type: "h2", id: "conclusion", text: "Conclusión" },
      {
        type: "p",
        text: "OpenJarvis es la capa de software que le faltaba al hardware de IA local. Si el DGX Spark puso la potencia en tu escritorio, OpenJarvis pone encima los agentes, la memoria y las herramientas para aprovecharla sin depender de una API de pago.",
      },
      {
        type: "p",
        text: "Si te importa la privacidad, el costo o simplemente experimentar con agentes de verdad sin exponer tus datos, vale mucho la pena probarlo. Es, además, una señal clara de hacia dónde va la IA personal: de vuelta a tu propia máquina.",
      },
    ],
  },
  {
    slug: "nvidia-dgx-spark-supercomputadora-personal-de-ia",
    title: "NVIDIA DGX Spark: la primera supercomputadora personal de IA",
    excerpt:
      "El mismo stack de software de los centros de datos NVIDIA en un dispositivo del tamaño de una consola. Un cambio de paradigma para developers e investigadores.",
    eyebrow: "Hardware IA · NVIDIA",
    category: "Hardware IA",
    author: "Farid · Eathan",
    date: "2026-07-01",
    dateLabel: "Julio 2026",
    readTime: "8 min",
    tags: ["NVIDIA", "IA local", "Blackwell", "LLM", "Hardware", "Inferencia", "DGX", "ML"],
    seed: "dgx-spark-blackwell-neural",
    image: "/blog/dgx-spark-portada.jpg",
    suggestions: [
      "¿Qué es la memoria unificada del GB10?",
      "¿Me conviene frente a una RTX 5090?",
      "¿Cuánto cuesta y qué trae preinstalado?",
    ],
    toc: [
      { id: "que-es", label: "Qué es el DGX Spark" },
      { id: "por-que-importa", label: "Por qué importa para developers" },
      { id: "software", label: "El stack de software" },
      { id: "hardware", label: "Hardware y conectividad" },
      { id: "comparativa", label: "Comparativa con alternativas" },
      { id: "conclusion", label: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "que-es", text: "Qué es el DGX Spark" },
      {
        type: "p",
        text: "NVIDIA presentó el DGX Spark como la versión compacta de su línea DGX, la misma que alimenta los clústeres de entrenamiento de los grandes labs. La diferencia es el formato: en lugar de un rack de 8U en un data center, el Spark cabe sobre un escritorio y se conecta con un solo cable de corriente.",
      },
      {
        type: "p",
        text: "El chip en el núcleo es el **GB10 Grace Blackwell Superchip**, que integra en un solo SoC una GPU Blackwell de 128 GB de memoria unificada LPDDR5X y una CPU Grace de 20 núcleos ARM. La memoria unificada es el punto técnico más relevante: la GPU y la CPU comparten el mismo banco de memoria con un ancho de banda de 273 GB/s, eliminando el cuello de botella de transferencia PCI que limita los setups convencionales.",
      },
      {
        type: "p",
        text: "El resultado práctico es que puedes correr un modelo de **200 mil millones de parámetros en FP4** completamente en memoria, sin cuantización agresiva ni offloading a disco.",
      },

      { type: "h2", id: "por-que-importa", text: "Por qué importa para developers" },
      {
        type: "figure",
        seed: "dgx-spark-desktop-footprint",
        image: "/blog/dgx-spark-escritorio.jpg",
        caption: "El DGX Spark ocupa menos espacio que la mayoría de laptops gaming.",
      },
      {
        type: "p",
        text: "El ecosistema de NVIDIA AI Enterprise corre completo sobre el Spark. Eso incluye NIM (NVIDIA Inference Microservices), el stack de RAG con cuRVS, las librerías de aceleración RAPIDS para Python, y soporte nativo para los frameworks principales: PyTorch, JAX, TensorRT-LLM.",
      },
      {
        type: "callout",
        variant: "info",
        label: "Lo que cambia en la práctica:",
        text: "los workflows que antes requerían acceso a una instancia A100 en AWS o GCP ahora se pueden correr localmente con latencia mínima y sin costo por token. Para experimentos iterativos con LLMs o modelos de visión, eso es un cambio operativo real.",
      },
      {
        type: "p",
        text: "Para quien trabaja con modelos open-weight como Llama 3.1 405B, Mistral Large, DeepSeek R1, o Qwen 2.5 72B, el Spark ofrece suficiente memoria para correrlos sin cuantización a 8-bit. Los modelos de 7B a 70B corren con margen holgado, lo que permite hacer batch inference o mantener múltiples modelos cargados simultáneamente.",
      },
      {
        type: "quote",
        text: "Un PFLOP de potencia FP4 en un dispositivo de consumo que cabe debajo de un monitor es una declaración técnica más que una especificación de marketing.",
      },

      { type: "h2", id: "software", text: "El stack de software" },
      {
        type: "p",
        text: "La propuesta de valor no es solo el hardware. NVIDIA empaqueta el Spark con acceso completo a su catálogo de NIM microservices, que incluye modelos preempaquetados y optimizados para inferencia en arquitecturas Blackwell. El setup inicial es un asistente gráfico que configura el sistema en menos de 10 minutos.",
      },
      {
        type: "figure",
        seed: "dgx-spark-software-stack",
        image: "/blog/dgx-spark-software.jpg",
        caption: "El panel de NVIDIA para gestionar modelos, memoria y GPU corre directo en el Spark.",
      },
      { type: "h3", text: "Lo que viene preinstalado" },
      {
        type: "ul",
        items: [
          "Ubuntu 22.04 LTS con drivers CUDA 12.x",
          "NVIDIA Container Runtime para Docker",
          "NVIDIA AI Workbench, el entorno de desarrollo integrado",
          "Acceso directo al catálogo NGC (NVIDIA GPU Cloud)",
          "Soporte para Ollama y LM Studio como alternativas ligeras",
        ],
      },
      { type: "h3", text: "Interoperabilidad" },
      {
        type: "p",
        text: "El Spark incluye dos puertos NVLink-C2C que permiten conectarlo con otro Spark para escalar a 256 GB de memoria unificada compartida. También tiene conectividad directa con el **DGX Station B200** para pipelines híbridos local + servidor sin cambiar el código de la aplicación, dado que ambos comparten el mismo stack CUDA-X.",
      },

      { type: "h2", id: "hardware", text: "Hardware y conectividad" },
      {
        type: "figure",
        seed: "dgx-spark-gb10-internals",
        image: "/blog/dgx-spark-hardware.jpg",
        caption: "El Superchip GB10 Grace Blackwell y la vista despiezada del chasis del Spark.",
      },
      {
        type: "p",
        text: "El chasis es compacto y completamente pasivo en los primeros 100W de carga. Para cargas sostenidas activa un sistema de refrigeración interno de bajo ruido. Los puertos incluyen USB-C Thunderbolt 4, HDMI 2.1, Ethernet 1GbE, y los dos puertos propietarios NVLink para expansión entre nodos.",
      },

      { type: "h2", id: "comparativa", text: "Comparativa con alternativas" },
      {
        type: "table",
        head: ["Dispositivo", "Memoria GPU", "Potencia IA", "Precio aprox.", "Stack IA"],
        rows: [
          {
            highlight: true,
            cells: ["NVIDIA DGX Spark", "128 GB unificada", "1 PFLOP FP4", "~$3,000 USD", "CUDA-X completo"],
          },
          { cells: ["Mac Studio M4 Ultra", "192 GB unificada", "~400 TOPS", "~$4,000 USD", "MLX / CoreML"] },
          { cells: ["PC con RTX 5080", "16 GB GDDR7", "~836 TOPS", "~$2,000 USD", "CUDA parcial"] },
          { cells: ["PC con RTX 5090", "32 GB GDDR7", "~3,352 TOPS", "~$3,500 USD", "CUDA completo"] },
          { cells: ["AWS p4d.24xlarge / hr", "320 GB HBM2e", "2.5 PFLOPS", "~$32 USD/hr", "CUDA completo"] },
        ],
      },
      {
        type: "p",
        text: "La comparativa con cloud es donde el argumento económico del Spark se vuelve más claro. A $32/hr en AWS, el breakeven con el costo del Spark es alrededor de 100 horas de uso de GPU. Para cualquier proyecto de mediana intensidad, eso se alcanza en semanas.",
      },
      {
        type: "callout",
        variant: "warn",
        label: "Limitación real:",
        text: "el DGX Spark corre Ubuntu/Linux ARM64. Si tu workflow depende de MetaTrader 5, aplicaciones Windows nativas, o cualquier software x86, necesitas mantener una máquina Windows separada. El Spark no reemplaza una workstation de propósito general.",
      },

      { type: "h2", id: "conclusion", text: "Conclusión" },
      {
        type: "p",
        text: "El DGX Spark es un producto de nicho con un nicho muy claro: researchers, ML engineers, y equipos pequeños que necesitan capacidad de inferencia local seria sin gestionar infraestructura cloud. Para ese perfil, la propuesta es difícil de ignorar.",
      },
      {
        type: "p",
        text: "Para un developer que ya tiene una workstation Windows con RTX 5080 o 5090 y usa Ollama para inferencia local, el Spark funciona mejor como complemento que como reemplazo: agrega 128 GB de memoria unificada para modelos grandes mientras la workstation sigue siendo la máquina principal de desarrollo.",
      },
      {
        type: "p",
        text: "Lo que NVIDIA logró técnicamente con el GB10 es real. Un PFLOP de potencia FP4 a menos de 170W en un factor de forma de escritorio no tiene precedente. Si el precio baja o si tu caso de uso requiere correr modelos de 100B+ de forma recurrente, el argumento se vuelve mucho más fuerte.",
      },
    ],
  },
];

export const postsEn: Post[] = [
  {
    slug: "openjarvis-ia-personal-que-corre-en-tu-maquina",
    title: "OpenJarvis: the personal AI that runs on your own machine",
    excerpt:
      "Stanford released an open-source framework to build AI agents that live on your device, not in the cloud. Privacy, zero cost per token and agents with memory. Here's the good part.",
    eyebrow: "Local AI · Open source",
    category: "Local AI",
    author: "Farid · Eathan",
    date: "2026-08-02",
    dateLabel: "August 2026",
    readTime: "7 min",
    tags: ["OpenJarvis", "Local AI", "Agents", "Ollama", "Stanford", "Privacy", "Open source", "LLM"],
    seed: "openjarvis-local-first-neural",
    suggestions: [
      "What is OpenJarvis in one sentence?",
      "Why run AI locally instead of in the cloud?",
      "What do I need to install it?",
    ],
    toc: [
      { id: "que-es", label: "What OpenJarvis is" },
      { id: "por-que", label: "The idea: intelligence per watt" },
      { id: "componentes", label: "The five building blocks" },
      { id: "agentes", label: "Agents and skills" },
      { id: "instalar", label: "How you install it" },
      { id: "lo-bueno", label: "Why it's good" },
      { id: "conclusion", label: "Conclusion" },
    ],
    blocks: [
      { type: "h2", id: "que-es", text: "What OpenJarvis is" },
      {
        type: "p",
        text: "OpenJarvis is an **open-source** framework (Apache 2.0 license) for building **personal AI agents that run on your own machine**, not in the cloud. Its tagline says it well: \"Personal AI, on personal devices.\" The cloud stops being the default and becomes optional.",
      },
      {
        type: "p",
        text: "It was built at **Stanford**, across the Hazy Research and Scaling Intelligence labs, and its 1.0 release landed in 2026 with native support for **Ollama**. The bet is simple: flip today's equation, where most \"personal\" AI actually depends on someone else's servers.",
      },
      {
        type: "figure",
        seed: "openjarvis-local-first",
        chip: "OpenJarvis",
        caption: "Local-first: models, memory and agents live on your device; the cloud is optional.",
      },

      { type: "h2", id: "por-que", text: "The idea: intelligence per watt" },
      {
        type: "p",
        text: "OpenJarvis grows out of a Stanford study called **Intelligence Per Watt**. The key finding is blunt: local models and local accelerators already accurately handle **88.7% of single-turn chat and reasoning queries**, and at interactive latencies. On top of that, intelligence efficiency improved **5.3× between 2023 and 2025**.",
      },
      {
        type: "callout",
        variant: "info",
        label: "What really changes:",
        text: "OpenJarvis treats energy, FLOPs, latency and dollar cost as first-class constraints, on par with accuracy. It's not just \"does it answer well?\" but \"does it answer well, fast, cheap and without leaving your machine?\".",
      },
      {
        type: "p",
        text: "The practical consequence is direct: for most everyday tasks you no longer need to send your data to a third-party server or pay per token. It's the natural software companion for the local AI hardware I already covered with the DGX Spark.",
      },

      { type: "h2", id: "componentes", text: "The five building blocks" },
      {
        type: "p",
        text: "The framework is assembled from five composable primitives. That separation is what lets you swap a model or an inference engine without rewriting your agent.",
      },
      {
        type: "table",
        head: ["Component", "What it does"],
        rows: [
          { cells: ["Intelligence", "Local model selection and catalog."] },
          { cells: ["Engine", "Inference runtimes (Ollama, vLLM, SGLang, llama.cpp) with hardware auto-detection."] },
          { cells: ["Agents", "Eight agent types with multi-step reasoning and tool use."] },
          { cells: ["Tools & Memory", "Web search, code execution, files, persistent memory and MCP servers."] },
          { cells: ["Learning", "Automatic improvement from local usage traces."] },
        ],
      },
      {
        type: "p",
        text: "It runs on almost any accelerator (Apple Silicon, NVIDIA, AMD, NPUs or CPU) and exposes an **OpenAI-compatible API**. In practice, any app that already speaks that format can point at your machine instead of the cloud.",
      },

      { type: "h2", id: "agentes", text: "Agents and skills" },
      {
        type: "p",
        text: "It ships eight ready-to-use agents across three execution modes: **on-demand, scheduled and continuous**. Among them: a morning digest with audio, deep research with citations, a continuous monitor with memory, an orchestrator that picks tools on its own, and ReAct, CodeAct and simple-chat agents.",
      },
      {
        type: "p",
        text: "**Skills** are tools that agents discover and invoke on their own when needed. You can import them from Hermes Agent (around 150 skills), OpenClaw (about 13,700 community skills) or any GitHub repo that follows the agentskills.io standard.",
      },
      {
        type: "quote",
        text: "The value isn't one more chatbot: it's running agents with memory and tools on your own hardware, without your data ever leaving home.",
      },

      { type: "h2", id: "instalar", text: "How you install it" },
      {
        type: "p",
        text: "There are native desktop installers (built with Tauri) for **macOS** (universal DMG, Apple Silicon and Intel), **Windows 10+** (EXE) and **Linux** (DEB, RPM and AppImage).",
      },
      { type: "h3", text: "What you need" },
      {
        type: "ul",
        items: [
          "Python 3.10 to 3.13 and Node.js 18+",
          "Ollama (or a compatible inference engine)",
          "A quickstart script that installs dependencies, Ollama and a starter model in about 3 minutes",
        ],
      },
      {
        type: "p",
        text: "Beyond the desktop, there's a **CLI**, a **Python SDK** (the `Jarvis` class) and an API server on port 8000. It also integrates Google Drive, Gmail, Calendar and Tasks via OAuth, for agents that work with your own data.",
      },

      { type: "h2", id: "lo-bueno", text: "Why it's good" },
      {
        type: "p",
        text: "What's interesting about OpenJarvis isn't one isolated trick, but the sum of parts:",
      },
      {
        type: "ul",
        items: [
          "**Real privacy**: your conversations and files never leave the machine.",
          "**Zero cost per token**: the cloud is optional, not a monthly bill.",
          "**Works offline**: useful with no connection or with sensitive data.",
          "**Measurable efficiency**: energy and cost treated as metrics, not footnotes.",
          "**Flexibility**: multi-backend and an OpenAI-compatible API.",
          "**Extensible**: a large ecosystem of reusable skills.",
          "**Open and academically backed**: Apache 2.0 with Stanford science behind it.",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        label: "The real limit:",
        text: "everything depends on your hardware. Very large models (100B+ parameters) still demand a lot of memory, and for heavy workloads the cloud still wins on raw power. OpenJarvis shines as the everyday brain running locally, not as a full replacement for a cluster.",
      },

      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "OpenJarvis is the software layer that local AI hardware was missing. If the DGX Spark put the power on your desk, OpenJarvis puts the agents, memory and tools on top to actually use it without depending on a paid API.",
      },
      {
        type: "p",
        text: "If you care about privacy, cost, or simply want to experiment with real agents without exposing your data, it's well worth trying. It's also a clear signal of where personal AI is heading: back onto your own machine.",
      },
    ],
  },
  {
    slug: "nvidia-dgx-spark-supercomputadora-personal-de-ia",
    title: "NVIDIA DGX Spark: the first personal AI supercomputer",
    excerpt:
      "The same software stack that runs NVIDIA's data centers, in a device the size of a game console. A shift in what developers and researchers can do locally.",
    eyebrow: "AI Hardware · NVIDIA",
    category: "AI Hardware",
    author: "Farid · Eathan",
    date: "2026-07-01",
    dateLabel: "July 2026",
    readTime: "8 min",
    tags: ["NVIDIA", "Local AI", "Blackwell", "LLM", "Hardware", "Inference", "DGX", "ML"],
    seed: "dgx-spark-blackwell-neural",
    image: "/blog/dgx-spark-portada.jpg",
    suggestions: [
      "What is the GB10's unified memory?",
      "Is it worth it vs. an RTX 5090?",
      "How much does it cost and what's preinstalled?",
    ],
    toc: [
      { id: "que-es", label: "What the DGX Spark is" },
      { id: "por-que-importa", label: "Why it matters for developers" },
      { id: "software", label: "The software stack" },
      { id: "hardware", label: "Hardware and connectivity" },
      { id: "comparativa", label: "Compared to the alternatives" },
      { id: "conclusion", label: "Conclusion" },
    ],
    blocks: [
      { type: "h2", id: "que-es", text: "What the DGX Spark is" },
      {
        type: "p",
        text: "NVIDIA introduced the DGX Spark as the compact version of its DGX line, the same one powering the training clusters of the big labs. The difference is the form factor: instead of an 8U rack in a data center, the Spark sits on a desk and runs off a single power cable.",
      },
      {
        type: "p",
        text: "At its core is the **GB10 Grace Blackwell Superchip**, which packs into a single SoC a Blackwell GPU with 128 GB of unified LPDDR5X memory and a 20-core ARM Grace CPU. That unified memory is the technically interesting part: GPU and CPU share the same memory bank at 273 GB/s of bandwidth, removing the PCI transfer bottleneck that limits conventional setups.",
      },
      {
        type: "p",
        text: "In practice, that means you can run a **200-billion-parameter model in FP4** entirely in memory, with no aggressive quantization and no offloading to disk.",
      },

      { type: "h2", id: "por-que-importa", text: "Why it matters for developers" },
      {
        type: "figure",
        seed: "dgx-spark-desktop-footprint",
        image: "/blog/dgx-spark-escritorio.jpg",
        caption: "The DGX Spark takes up less desk space than most gaming laptops.",
      },
      {
        type: "p",
        text: "The full NVIDIA AI Enterprise ecosystem runs on the Spark. That includes NIM (NVIDIA Inference Microservices), the RAG stack with cuRVS, the RAPIDS acceleration libraries for Python, and native support for the main frameworks: PyTorch, JAX, TensorRT-LLM.",
      },
      {
        type: "callout",
        variant: "info",
        label: "What actually changes:",
        text: "workflows that used to require an A100 instance on AWS or GCP can now run locally, with minimal latency and no cost per token. For iterative experiments with LLMs or vision models, that is a real operational shift.",
      },
      {
        type: "p",
        text: "If you work with open-weight models like Llama 3.1 405B, Mistral Large, DeepSeek R1 or Qwen 2.5 72B, the Spark has enough memory to run them without dropping to 8-bit quantization. Models from 7B to 70B run with plenty of headroom, which lets you do batch inference or keep several models loaded at once.",
      },
      {
        type: "quote",
        text: "One PFLOP of FP4 compute in a consumer device that fits under a monitor is a technical statement, not a marketing spec.",
      },

      { type: "h2", id: "software", text: "The software stack" },
      {
        type: "p",
        text: "The value proposition isn't only the hardware. NVIDIA ships the Spark with full access to its NIM microservices catalog, which includes pre-packaged models optimized for inference on Blackwell architectures. Initial setup is a graphical wizard that configures the system in under 10 minutes.",
      },
      {
        type: "figure",
        seed: "dgx-spark-software-stack",
        image: "/blog/dgx-spark-software.jpg",
        caption: "NVIDIA's dashboard for managing models, memory and GPU runs right on the Spark.",
      },
      { type: "h3", text: "What comes preinstalled" },
      {
        type: "ul",
        items: [
          "Ubuntu 22.04 LTS with CUDA 12.x drivers",
          "NVIDIA Container Runtime for Docker",
          "NVIDIA AI Workbench, the integrated development environment",
          "Direct access to the NGC catalog (NVIDIA GPU Cloud)",
          "Support for Ollama and LM Studio as lightweight alternatives",
        ],
      },
      { type: "h3", text: "Interoperability" },
      {
        type: "p",
        text: "The Spark has two NVLink-C2C ports that let you pair it with another Spark to scale up to 256 GB of shared unified memory. It also connects directly to the **DGX Station B200** for hybrid local + server pipelines without changing your application code, since both share the same CUDA-X stack.",
      },

      { type: "h2", id: "hardware", text: "Hardware and connectivity" },
      {
        type: "figure",
        seed: "dgx-spark-gb10-internals",
        image: "/blog/dgx-spark-hardware.jpg",
        caption: "The GB10 Grace Blackwell Superchip and an exploded view of the Spark's chassis.",
      },
      {
        type: "p",
        text: "The chassis is compact and fully passive for the first 100W of load. Under sustained load it kicks in a low-noise internal cooling system. Ports include USB-C Thunderbolt 4, HDMI 2.1, 1GbE Ethernet, and the two proprietary NVLink ports for node-to-node expansion.",
      },

      { type: "h2", id: "comparativa", text: "Compared to the alternatives" },
      {
        type: "table",
        head: ["Device", "GPU memory", "AI compute", "Approx. price", "AI stack"],
        rows: [
          {
            highlight: true,
            cells: ["NVIDIA DGX Spark", "128 GB unified", "1 PFLOP FP4", "~$3,000 USD", "Full CUDA-X"],
          },
          { cells: ["Mac Studio M4 Ultra", "192 GB unified", "~400 TOPS", "~$4,000 USD", "MLX / CoreML"] },
          { cells: ["PC with RTX 5080", "16 GB GDDR7", "~836 TOPS", "~$2,000 USD", "Partial CUDA"] },
          { cells: ["PC with RTX 5090", "32 GB GDDR7", "~3,352 TOPS", "~$3,500 USD", "Full CUDA"] },
          { cells: ["AWS p4d.24xlarge / hr", "320 GB HBM2e", "2.5 PFLOPS", "~$32 USD/hr", "Full CUDA"] },
        ],
      },
      {
        type: "p",
        text: "The comparison against cloud is where the Spark's economic argument gets clearest. At $32/hr on AWS, the breakeven against the Spark's price lands around 100 hours of GPU time. For any project of moderate intensity, that's a matter of weeks.",
      },
      {
        type: "callout",
        variant: "warn",
        label: "A real limitation:",
        text: "the DGX Spark runs Ubuntu/Linux on ARM64. If your workflow depends on MetaTrader 5, native Windows applications, or any x86 software, you'll need to keep a separate Windows machine. The Spark does not replace a general-purpose workstation.",
      },

      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "The DGX Spark is a niche product with a very clear niche: researchers, ML engineers and small teams that need serious local inference capacity without managing cloud infrastructure. For that profile, the offer is hard to ignore.",
      },
      {
        type: "p",
        text: "For a developer who already has a Windows workstation with an RTX 5080 or 5090 and uses Ollama for local inference, the Spark works better as a companion than as a replacement: it adds 128 GB of unified memory for large models while the workstation stays the main development machine.",
      },
      {
        type: "p",
        text: "What NVIDIA pulled off technically with the GB10 is real. One PFLOP of FP4 compute under 170W in a desktop form factor has no precedent. If the price comes down, or if your use case means running 100B+ models regularly, the argument gets a lot stronger.",
      },
    ],
  },
];

// ---- Helpers ----
// El locale es opcional y por defecto español, para no romper a quien no lo pase
// (sitemap.ts, /api/comments) donde el idioma del contenido no importa.
const byLocale: Record<string, Post[]> = { es: postsEs, en: postsEn };

function listFor(locale?: string): Post[] {
  return byLocale[locale ?? "es"] ?? postsEs;
}

export function getAllPosts(locale?: string): Post[] {
  return [...listFor(locale)].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string, locale?: string): Post | undefined {
  return listFor(locale).find((p) => p.slug === slug);
}

export function postPlainText(post: Post): string {
  const parts: string[] = [post.title, post.excerpt];
  for (const b of post.blocks) {
    switch (b.type) {
      case "p":
      case "h2":
      case "h3":
      case "quote":
        parts.push(strip(b.text));
        break;
      case "callout":
        parts.push(`${b.label ? b.label + " " : ""}${strip(b.text)}`);
        break;
      case "figure":
        parts.push(b.caption);
        break;
      case "ul":
        parts.push(b.items.map(strip).join(". "));
        break;
      case "table":
        parts.push(b.head.join(" | "));
        for (const r of b.rows) parts.push(r.cells.join(" | "));
        break;
    }
  }
  return parts.join("\n");
}

// Quita el marcado **negrita** para el texto plano.
function strip(t: string): string {
  return t.replace(/\*\*/g, "");
}

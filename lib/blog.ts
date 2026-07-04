// ============================================================
//  BLOG - contenido estructurado (una sola fuente de verdad).
//  Cada post se guarda como bloques: el mismo dato alimenta
//  el render (identidad de marca Farid/Eathan) y la IA del
//  artículo (/api/blog-ask). Para agregar un post nuevo,
//  añade otro objeto a `posts`.
// ============================================================

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "callout"; variant: "info" | "warn"; label?: string; text: string }
  | { type: "quote"; text: string }
  | { type: "figure"; seed: string; caption: string }
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
  seed: string; // semilla para el gradiente de portada
  toc: { id: string; label: string }[];
  blocks: Block[];
};

export const posts: Post[] = [
  {
    slug: "nvidia-dgx-spark-supercomputadora-personal-de-ia",
    title:
      "NVIDIA DGX Spark: la primera supercomputadora personal de IA",
    excerpt:
      "El mismo stack de software de los centros de datos NVIDIA en un dispositivo del tamaño de una consola. Un cambio de paradigma para developers e investigadores.",
    eyebrow: "Hardware IA · NVIDIA",
    category: "Hardware IA",
    author: "Farid · Eathan",
    date: "2026-07-01",
    dateLabel: "Julio 2026",
    readTime: "8 min",
    tags: [
      "NVIDIA",
      "IA local",
      "Blackwell",
      "LLM",
      "Hardware",
      "Inferencia",
      "DGX",
      "ML",
    ],
    seed: "dgx-spark-blackwell-neural",
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

      {
        type: "h2",
        id: "por-que-importa",
        text: "Por qué importa para developers",
      },
      {
        type: "figure",
        seed: "dgx-spark-desktop-footprint",
        caption:
          "El DGX Spark ocupa menos espacio que la mayoría de laptops gaming.",
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
        type: "p",
        text: "El chasis es compacto y completamente pasivo en los primeros 100W de carga. Para cargas sostenidas activa un sistema de refrigeración interno de bajo ruido. Los puertos incluyen USB-C Thunderbolt 4, HDMI 2.1, Ethernet 1GbE, y los dos puertos propietarios NVLink para expansión entre nodos.",
      },

      { type: "h2", id: "comparativa", text: "Comparativa con alternativas" },
      {
        type: "table",
        head: [
          "Dispositivo",
          "Memoria GPU",
          "Potencia IA",
          "Precio aprox.",
          "Stack IA",
        ],
        rows: [
          {
            highlight: true,
            cells: [
              "NVIDIA DGX Spark",
              "128 GB unificada",
              "1 PFLOP FP4",
              "~$3,000 USD",
              "CUDA-X completo",
            ],
          },
          {
            cells: [
              "Mac Studio M4 Ultra",
              "192 GB unificada",
              "~400 TOPS",
              "~$4,000 USD",
              "MLX / CoreML",
            ],
          },
          {
            cells: [
              "PC con RTX 5080",
              "16 GB GDDR7",
              "~836 TOPS",
              "~$2,000 USD",
              "CUDA parcial",
            ],
          },
          {
            cells: [
              "PC con RTX 5090",
              "32 GB GDDR7",
              "~3,352 TOPS",
              "~$3,500 USD",
              "CUDA completo",
            ],
          },
          {
            cells: [
              "AWS p4d.24xlarge / hr",
              "320 GB HBM2e",
              "2.5 PFLOPS",
              "~$32 USD/hr",
              "CUDA completo",
            ],
          },
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

// ---- Helpers ----
export function getAllPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}

// Texto plano del artículo (para anclar la IA y para lectura en voz alta).
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

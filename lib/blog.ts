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

export const postsEs: Post[] = [
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

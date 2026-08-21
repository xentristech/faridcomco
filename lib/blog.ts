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
    slug: "el-windows-que-les-falta-a-los-agentes-de-ia",
    title: "El «Windows» que les falta a los agentes de IA",
    excerpt:
      "Los agentes de IA de hoy son como MS-DOS: potentes, pero solo quien lee la terminal entiende qué hacen. Les falta su «Windows» —la capa visual que deja ver el trabajo—. Por qué la observabilidad es la próxima gran capa, y el panel que construí para verlo.",
    eyebrow: "Agentes de IA · Observabilidad",
    category: "Agentes de IA",
    author: "Farid · Eathan",
    date: "2026-08-21",
    dateLabel: "Agosto 2026",
    readTime: "7 min",
    tags: ["Agentes de IA", "Observabilidad", "MCP", "Orquestación", "Mission Control", "Xentris Tech", "MS-DOS", "Windows"],
    seed: "windows-agentes-ia-observabilidad",
    image: "/blog/agentes-hero.svg",
    suggestions: [
      "¿Por qué un agente de IA se parece a MS-DOS?",
      "¿Qué es la observabilidad de agentes?",
      "¿Qué es un panel tipo Mission Control?",
    ],
    toc: [
      { id: "intro", label: "Volvió la terminal" },
      { id: "dos", label: "Un agente es como MS-DOS" },
      { id: "observabilidad", label: "El problema: observabilidad" },
      { id: "visual", label: "El «Windows» de los agentes" },
      { id: "asimov", label: "Asimov y la gobernanza" },
      { id: "farid", label: "Lo que veo desde acá" },
      { id: "conclusion", label: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "intro", text: "Volvió la terminal, y casi nadie lo notó" },
      {
        type: "p",
        text: "Un amigo me preguntó el otro día si me acordaba de **WordStar** y de **Visual Basic**. WordStar era el procesador de textos de los ochenta que se manejaba con acordes de teclas; Visual Basic, el que dejaba armar una aplicación arrastrando botones. Pura nostalgia, hasta que soltó la frase que me dejó pensando: «tú eres como eso, pero con IA; el MCP es como una API… ¿por qué no hay un sistema operativo, como cuando salió Windows?».",
      },
      {
        type: "p",
        text: "Tenía razón en algo profundo. Después de años de interfaces gráficas, el software más avanzado de 2026 —los agentes de IA— se maneja otra vez **escribiendo en una terminal**. La interfaz más vieja de la computación volvió a ser la más nueva. Y con ella volvió un problema viejo que ya habíamos resuelto una vez.",
      },
      {
        type: "callout",
        variant: "info",
        label: "La idea de fondo:",
        text: "un agente de IA hoy se parece muchísimo a una máquina con MS-DOS. Es poderosa, pero solo quien sabe leer la pantalla entiende qué está pasando. Lo que falta es el salto que ya dimos una vez: de DOS a Windows.",
      },

      { type: "h2", id: "dos", text: "Por qué un agente hoy se parece a MS-DOS" },
      {
        type: "p",
        text: "Un agente moderno ya tiene casi todo lo que define a un sistema operativo. No es una exageración: es literal.",
      },
      {
        type: "ul",
        items: [
          "**Memoria** que persiste entre sesiones.",
          "**Sistema de archivos** al que lee y escribe.",
          "**«Programas»** que amplían lo que sabe hacer (los skills).",
          "**Tareas programadas** que corren solas.",
          "**Conexión a servicios** por un estándar —el MCP—, que cumple el papel que cumplían las APIs de Windows: un enchufe común para hablar con cualquier herramienta.",
        ],
      },
      {
        type: "p",
        text: "Lo que todavía le falta para ser un sistema operativo de verdad son tres cosas concretas: **determinismo** (un OS no puede «más o menos» guardar tu archivo; un agente aún es probabilístico), **costo y latencia** (cada acción cuesta y tarda segundos, no milisegundos) y **confianza** (por eso trabajamos con permisos y entornos controlados, y con razón). Windows, al principio, tampoco hacía más que DOS. Ganó por otra cosa.",
      },
      {
        type: "figure",
        seed: "dos-a-windows-agentes-1985-2026",
        image: "/blog/agentes-dos-windows.svg",
        chip: "1985 → 2026",
        caption: "El mismo salto, cuarenta años después: en 1985, de la terminal de DOS a las ventanas de Windows; en 2026, del agente que corre en la terminal al panel que deja ver qué hace.",
      },

      { type: "h2", id: "observabilidad", text: "El problema que casi nadie nombra: observabilidad" },
      {
        type: "p",
        text: "Cuando uno coordina varios agentes a la vez —como hago casi todos los días— aparece un dolor muy concreto. Con cinco tareas corriendo, **uno mismo pierde el hilo** de cuál hace qué. Y cuando le muestras la pantalla a un cliente, ve texto técnico cayendo en verde en vez de trabajo entendible.",
      },
      {
        type: "p",
        text: "Eso tiene nombre: **observabilidad**. La buena noticia es que la información ya existe —cada agente deja registro de todo lo que hace en tiempo real—; lo que falta es una capa que la traduzca a lenguaje humano. Nadie la está mirando, pero está ahí.",
      },
      {
        type: "figure",
        seed: "observabilidad-multiples-terminales-verde",
        image: "/blog/agentes-observabilidad.svg",
        chip: "Observabilidad",
        caption: "Cuatro terminales, cuatro relatos en verde a la vez. El trabajo está hecho y bien hecho —pero nadie lo está viendo, y no sabes cuál te está esperando.",
      },

      { type: "h2", id: "visual", text: "La solución es visual: el «Windows» de los agentes" },
      {
        type: "p",
        text: "Windows no ganó porque hiciera más que DOS. Ganó porque **cualquiera podía ver qué estaba pasando**. La próxima gran capa de la IA es exactamente eso: un panel que muestra, por cada agente, qué está haciendo ahora mismo, en una frase clara. Un buen panel responde de un vistazo tres preguntas:",
      },
      {
        type: "ul",
        items: [
          "¿Qué está haciendo cada agente en este momento, dicho en lenguaje sencillo?",
          "¿Cuál terminó y está esperando una decisión mía?",
          "¿Cuál se quedó detenido o necesita un permiso?",
        ],
      },
      {
        type: "callout",
        variant: "info",
        label: "Lo llevé a la práctica:",
        text: "construí un panel local, «Mission Control», que lee esos registros y muestra una tarjeta por agente con un semáforo —trabajando, esperándote, pausado, inactivo— y una frase de qué hace. Tiene un «modo presentación» que oculta lo técnico para mostrárselo a un cliente. De hecho, ese panel me dijo que el otro agente con el que trabajaba ya había cerrado, sin tener que preguntarle a nadie.",
      },

      { type: "h2", id: "asimov", text: "Asimov, y por qué un panel es gobernanza" },
      {
        type: "p",
        text: "En 1950, Isaac Asimov publicó sus **Tres Leyes de la Robótica**. Lo interesante es que su libro no es un manual: es un catálogo de **cómo fallan** esas reglas. Tres normas simples, al pie de la letra, terminan produciendo resultados absurdos. La lección, 75 años después, sigue vigente: un puñado de reglas rígidas no alcanza para gobernar una inteligencia compleja; siempre hay huecos, y la inteligencia los encuentra.",
      },
      {
        type: "quote",
        text: "Por eso la IA responsable no se basa en tres reglas, sino en capas: buenos valores de base, permisos acotados, entornos controlados y —la última capa— supervisión humana. Un panel de observabilidad es, ni más ni menos, esa supervisión hecha visible.",
      },

      { type: "h2", id: "farid", text: "Lo que veo desde acá" },
      {
        type: "p",
        text: "Esto conecta directo con lo que ya conté sobre los **orquestadores de agentes**: si un director reparte el trabajo entre varios agentes, alguien tiene que poder ver qué hace cada uno. La capa visual no es un adorno; es lo que vuelve la orquestación supervisable, explicable al cliente y confiable. En Xentris Tech lo tratamos como buena práctica: antes de escalar una automatización con IA, aseguras que puedes **ver y contar** lo que hace.",
      },
      {
        type: "p",
        text: "Para Colombia y Latinoamérica la lección es la de siempre en este blog: no hay que ser una gran tecnológica para aplicarlo. El panel que describo lo armé en una tarde, en mi propia máquina, leyendo archivos que ya estaban ahí. La oportunidad está justo en ese hueco: los agentes que corren en la terminal ya funcionan; el «Windows» que los vuelve entendibles para cualquier humano todavía está por construir.",
      },
      {
        type: "callout",
        variant: "info",
        label: "Para leer más:",
        text: "escribí una versión de esta idea, enfocada en empresas, en el blog de [Xentris Tech](https://xentris.tech/blog/el-windows-de-los-agentes-ia). Si te interesa cómo aplicar agentes de IA con esta capa de supervisión en tu negocio, ese es el lugar.",
      },

      { type: "h2", id: "conclusion", text: "Conclusión" },
      {
        type: "p",
        text: "WordStar era memorizar acordes; Visual Basic fue arrastrar botones; y hoy volvimos a la terminal, pero conversando en español. La interfaz más vieja terminó siendo la más nueva. Estamos en un momento tipo 1985: el «DOS» de la IA —los agentes— ya existe y funciona. El «Windows» —la capa que deja ver el trabajo— está vacante. Y quien lo construya bien, aunque sea en su propia máquina un martes por la tarde, va un paso adelante.",
      },
    ],
  },
  {
    slug: "orquestadores-de-agentes-ia-un-agente-no-basta",
    title: "Un agente no basta: cómo los orquestadores reparten el trabajo entre varios agentes de IA",
    excerpt:
      "Un solo agente de IA se satura: su contexto se ensucia y empeora. El orquestador es el director que reparte el trabajo entre varios agentes —cada uno en su frente, cada resultado verificado— para resolver tareas que un solo hilo no haría bien. Los patrones reales, cuándo usarlos y cuándo NO, con Bob, Claude Code y AutoSGSST como prueba.",
    eyebrow: "Agentes de IA · Arquitectura",
    category: "Agentes de IA",
    author: "Farid · Eathan",
    date: "2026-08-19",
    dateLabel: "Agosto 2026",
    readTime: "8 min",
    tags: ["Agentes de IA", "Orquestación", "Multi-agente", "Subagentes", "Workflows", "LangGraph", "CrewAI", "Xentris Tech"],
    seed: "orquestadores-agentes-ia",
    suggestions: [
      "¿Qué es un orquestador de agentes?",
      "¿Cuándo NO conviene orquestar en paralelo?",
      "¿Qué es la verificación adversaria de hallazgos?",
    ],
    toc: [
      { id: "problema", label: "Un agente no basta" },
      { id: "que-es", label: "Qué es un orquestador" },
      { id: "patrones", label: "Los patrones que se usan" },
      { id: "dos-niveles", label: "Los dos niveles" },
      { id: "practica", label: "Cómo se ve en la práctica" },
      { id: "regla", label: "La regla que evita quemar plata" },
      { id: "farid", label: "Lo que veo desde acá" },
      { id: "conclusion", label: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "problema", text: "Un agente no basta" },
      {
        type: "p",
        text: "Un agente de IA es potente, pero tiene un límite físico: su **ventana de contexto**. Es la memoria de trabajo con la que razona. Si le pides que audite un proyecto con doscientos archivos, o que investigue diez frentes a la vez, esa memoria se satura: el modelo empieza a olvidar lo del principio, a mezclar cosas y a empeorar justo cuando la tarea se pone grande. Más contexto no es más inteligencia; muchas veces es lo contrario.",
      },
      {
        type: "p",
        text: "La solución no es un agente más grande. Es **varios agentes bien dirigidos**. Y quien los dirige es el orquestador.",
      },
      {
        type: "callout",
        variant: "info",
        label: "La idea de fondo:",
        text: "en vez de meterle todo a un solo hilo, repartes el trabajo. Cada subagente ve solo su pedazo, devuelve la conclusión —no el volcado entero— y el hilo principal se mantiene limpio, rápido y barato.",
      },

      { type: "h2", id: "que-es", text: "Qué es un orquestador de agentes" },
      {
        type: "p",
        text: "Un orquestador es el componente que **coordina a varios agentes para resolver una tarea que uno solo no haría bien**. No hace el trabajo especializado: decide quién actúa, en qué orden, en paralelo o en serie, y qué hacer con lo que cada uno devuelve. Es la diferencia entre un músico solista y un director de orquesta.",
      },
      {
        type: "quote",
        text: "El director no toca los instrumentos. Decide quién toca y cuándo. Eso, exactamente, es un orquestador de agentes.",
      },
      {
        type: "p",
        text: "El humano sigue mandando: define el objetivo, revisa y aprueba. Pero el trabajo mecánico de repartir, ejecutar y juntar resultados deja de ser suyo. El orquestador lo hace por él, y lo hace a una escala que un solo agente no alcanza.",
      },

      { type: "h2", id: "patrones", text: "Los patrones que de verdad se usan" },
      {
        type: "p",
        text: "Orquestar no es una sola técnica; es un puñado de patrones que se combinan según la tarea. Estos son los que aparecen una y otra vez:",
      },
      {
        type: "table",
        head: ["Patrón", "Qué hace"],
        rows: [
          { cells: ["Router / dispatcher", "Clasifica la petición y la manda al agente o skill correcto (¿esto es soporte, ventas o legal?)."], highlight: true },
          { cells: ["Orquestador–obrero", "Un jefe descompone la tarea y reparte a N obreros que trabajan en paralelo."] },
          { cells: ["Fan-out paralelo", "Lanza muchos agentes a la vez, cada uno en su frente (buscar en 10 directorios distintos)."] },
          { cells: ["Pipeline", "Cada ítem pasa por etapas encadenadas sin esperar a los demás."] },
          { cells: ["Verificación adversaria", "Otros agentes intentan refutar cada hallazgo; sobrevive solo lo confirmado."] },
        ],
      },
      {
        type: "p",
        text: "El último es el más subestimado. Un agente puede producir un hallazgo que suena bien pero es falso. La cura es enfrentarlo a verificadores que intenten **derribarlo**; lo que sobrevive al ataque es lo que reportas. Sin ese paso, la orquestación multiplica errores en vez de multiplicar trabajo útil.",
      },

      { type: "h2", id: "dos-niveles", text: "Los dos niveles de orquestación" },
      {
        type: "p",
        text: "Cuando hablamos de «orquestar agentes» solemos mezclar dos cosas que se complementan, y conviene separarlas:",
      },
      {
        type: "ul",
        items: [
          "**Orquestar herramientas:** saber *cuándo invocar cada capacidad*. Es un router sobre tus habilidades: arrancar un proyecto, guardar memoria, construir, desplegar —cada paso a su agente— sin dejar cabos sueltos.",
          "**Orquestar trabajo pesado:** descomponer una tarea amplia y lanzar subagentes en paralelo. El ciclo canónico es **explorar → descomponer → paralelizar → verificar → sintetizar**.",
        ],
      },
      {
        type: "p",
        text: "El primero da orden; el segundo da escala. Un buen orquestador hace ambos: es el punto de entrada que impone secuencia y, cuando la tarea lo pide, abre el abanico de agentes.",
      },

      { type: "h2", id: "practica", text: "Cómo se ve en la práctica" },
      {
        type: "p",
        text: "Esto no es teoría. Cuando IBM presentó **Bob 2.0**, su mayor salto fue justo este: dejar de ser un solo agente para coordinar *subagentes* que buscan cada uno en un directorio en paralelo y devuelven solo lo que importa. Las herramientas de desarrollo con IA ya traen las piezas: un mecanismo para lanzar un subagente y otro para definir *workflows* —procesos con pasos, estado y manejo de errores— que corren de forma determinista.",
      },
      {
        type: "figure",
        seed: "orquestador-fan-out-agentes",
        chip: "Orquestación",
        caption: "El patrón fan-out: un orquestador reparte la tarea entre varios subagentes que trabajan en paralelo, cada uno en su frente. Cada uno devuelve su conclusión y un verificador confirma antes de sintetizar el resultado final.",
      },
      {
        type: "p",
        text: "Si te preguntan por nombres, estos son los frameworks que implementan estos patrones hoy:",
      },
      {
        type: "ul",
        items: [
          "**LangGraph** — orquestación como un grafo de estados (nodos, aristas y ciclos).",
          "**CrewAI** — equipos de agentes por roles que colaboran en una misión.",
          "**AutoGen (Microsoft)** — conversación entre múltiples agentes que se coordinan por mensajes.",
          "**OpenAI Agents SDK** — agentes con *handoffs* (pases) entre especialistas.",
        ],
      },

      { type: "h2", id: "regla", text: "La regla que evita quemar plata" },
      {
        type: "p",
        text: "No todo se orquesta. Lanzar agentes en paralelo **cuesta tokens**, y muchos. Si la tarea es trivial o es una secuencia con dependencias fuertes (el paso 2 necesita el resultado del paso 1), un solo hilo es más barato, más rápido y más claro.",
      },
      {
        type: "callout",
        variant: "warn",
        label: "Cuándo SÍ vale la pena:",
        text: "cuando hay amplitud real —auditar, migrar, revisar a fondo, investigar varios frentes—. Ahí el paralelismo compensa su costo. Y siempre con verificación: ningún hallazgo se reporta sin confirmarse.",
      },

      { type: "h2", id: "farid", text: "Lo que veo desde acá" },
      {
        type: "p",
        text: "El mismo principio escala desde un proyecto local hasta un mainframe. En AutoSGSST, un agente lee una foto y redacta un informe de SST; cuando el trabajo crece, la respuesta no es un agente más grande, es repartirlo. Esa separación —un director que reparte, obreros que ejecutan, un verificador que confirma— es idéntica en un banco de IBM y en una automatización que hacemos desde Colombia. Cambia el tamaño, no la idea.",
      },
      {
        type: "p",
        text: "Por eso en Xentris Tech tratamos la orquestación como una buena práctica, no como un lujo: es lo que separa una demo que impresiona de un sistema que aguanta trabajo real sin ensuciarse ni dispararse en costo.",
      },

      { type: "h2", id: "conclusion", text: "Conclusión" },
      {
        type: "p",
        text: "Un agente no basta cuando la tarea es grande. El orquestador es el director que la reparte: divide, paraleliza, verifica y sintetiza. No es magia —son unos pocos patrones bien aplicados y una regla de oro: orquesta cuando hay amplitud real, y nunca reportes un hallazgo sin que sobreviva al ataque. Ese es el salto de «pídele a la IA que lo intente» a «un sistema que puedes correr en producción».",
      },
    ],
  },
  {
    slug: "ibm-bob-2-el-socio-de-desarrollo-agentico",
    title: "Saludar a Bob 2.0: cuando IBM cambia el autocompletado por un socio de desarrollo agéntico",
    excerpt:
      "IBM presentó Bob 2.0: no un mejor autocompletado, sino un socio de desarrollo agéntico que planea, programa, prueba y moderniza software empresarial de punta a punta —con las barandas de gobernanza y costo que una empresa exige. Esto es lo que significa el salto, y por qué confirma hacia dónde va la automatización con agentes.",
    eyebrow: "Agentes de IA · Ingeniería",
    category: "Agentes de IA",
    author: "Farid · Eathan",
    date: "2026-08-12",
    dateLabel: "Agosto 2026",
    readTime: "8 min",
    tags: ["IBM", "Bob 2.0", "Agentes de IA", "Ingeniería de software", "Modernización", "COBOL", "Automatización", "Empresa"],
    seed: "ibm-bob-2-agentic-dev-partner",
    image: "/blog/bob-hero.jpg",
    suggestions: [
      "¿Qué diferencia a Bob 2.0 de un copiloto de código?",
      "¿Qué es la arquitectura de tres capas de Bob?",
      "¿Cómo moderniza Bob código viejo como COBOL?",
    ],
    toc: [
      { id: "que-es", label: "Saludar a Bob 2.0" },
      { id: "socio", label: "De copiloto a socio de desarrollo" },
      { id: "arquitectura", label: "Cómo está armado por dentro" },
      { id: "multi-agente", label: "Muchos agentes a la vez" },
      { id: "modos", label: "Agente, Plan y Ask" },
      { id: "modernizacion", label: "Modernizar COBOL, IBM i y Java" },
      { id: "empresa", label: "Por qué es para empresas" },
      { id: "farid", label: "Lo que veo desde acá" },
      { id: "conclusion", label: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "que-es", text: "Saludar a Bob 2.0" },
      {
        type: "p",
        text: "El 12 de agosto de 2026, IBM publicó un artículo con un título casi cariñoso: *«Say hello to IBM Bob 2.0»*. Bob es el socio de desarrollo de software con IA de IBM, y la versión 2 no es un parche: reescribió la arquitectura completa. No es un mejor autocompletado. Es un agente que toma un objetivo de software y lo lleva de la planeación al código, a las pruebas, al despliegue y hasta a la modernización de sistemas heredados.",
      },
      {
        type: "p",
        text: "Lo interesante es quién lo dice. IBM es la casa del mainframe, del COBOL, del software empresarial que corre bancos y aseguradoras. Que ese jugador —el más conservador del rubro— apueste de lleno por los agentes dice mucho del momento. Bob 2.0 se probó con más de 100,000 desarrolladores de IBM antes de salir.",
      },
      {
        type: "callout",
        variant: "info",
        label: "El titular real:",
        text: "no es «otro asistente de código». Es un socio de desarrollo agéntico de punta a punta, con las barandas —gobernanza, seguridad y control de costo— que una empresa de verdad exige.",
      },

      { type: "h2", id: "socio", text: "De copiloto a socio de desarrollo" },
      {
        type: "p",
        text: "Durante años, «IA para programar» significó autocompletar: un copiloto que sugiere la siguiente línea mientras tú manejas el volante. Bob 2.0 cambia el marco de referencia. Y lo dice sin rodeos su propio líder de producto.",
      },
      {
        type: "quote",
        text: "La vara de la IA empresarial ya no es un mejor asistente de código. Es un socio de desarrollo agéntico de punta a punta. — Neel Sundaresan, GM de Automatización e IA, IBM.",
      },
      {
        type: "p",
        text: "La diferencia es de fondo. Un copiloto sugiere y tú ejecutas. Un socio recibe el objetivo, reúne por su cuenta el contexto de todo el repositorio, decide los pasos, ejecuta las herramientas que necesita y te entrega el resultado para revisar. El humano sigue mandando: decide, corrige y aprueba. Pero el trabajo mecánico deja de ser tuyo.",
      },

      { type: "h2", id: "arquitectura", text: "Cómo está armado por dentro" },
      {
        type: "p",
        text: "Bob 2.0 reescribió su arquitectura en tres capas bien separadas. No es un detalle técnico menor: es lo que permite que un solo motor de razonamiento sirva a muchas interfaces sin duplicar lógica.",
      },
      {
        type: "table",
        head: ["Capa", "Qué hace"],
        rows: [
          { cells: ["El Agente", "El bucle agéntico central: razona y genera el código."], highlight: true },
          { cells: ["El Harness", "La infraestructura compartida: autenticación, registro y telemetría."] },
          { cells: ["Los Clientes", "Las interfaces (IDE y demás), sin lógica duplicada."] },
        ],
      },
      {
        type: "p",
        text: "Sobre esa base montaron mejoras concretas: soporte para servidores MCP (Model Context Protocol) para conectar herramientas externas, un *rollback* que rastrea directamente el estado de los archivos, una interfaz más limpia que oculta las llamadas intermedias a herramientas, y multitarea en segundo plano sin bloquear la sesión mientras trabaja.",
      },

      { type: "h2", id: "multi-agente", text: "Muchos agentes a la vez" },
      {
        type: "p",
        text: "El mayor salto de la versión 2 es que Bob dejó de ser un solo agente haciendo todo en un mismo contexto. Ahora coordina **subagentes** que trabajan en contextos aislados. En lugar de saturar una sola ventana de contexto —lento y caro—, delega el trabajo complejo y mantiene el costo a raya.",
      },
      {
        type: "ul",
        items: [
          "**Llamadas a herramientas en paralelo:** el modelo puede pedir y ejecutar varias herramientas en un mismo turno, no de a una.",
          "**Subagentes en contextos aislados:** cada tarea pesada vive en su propio espacio; menos ruido, menos costo.",
          "**Workflows:** le dan «columna vertebral» a los procesos repetibles —el motor corre los pasos en orden, guarda el estado, maneja errores y todo queda auditable.",
          "**Bobalytics:** analítica integrada que muestra cuánto consume la IA, dónde y a qué costo.",
        ],
      },
      {
        type: "figure",
        seed: "ibm-bob-2-build-with-agents",
        image: "/blog/bob-agents.jpg",
        chip: "IBM Bob",
        caption: "Bob lanzando subagentes en paralelo: cada uno busca en un directorio distinto y devuelve solo lo que importa. Así mantiene el contexto limpio y el costo bajo, incluso en proyectos grandes.",
      },
      {
        type: "callout",
        variant: "info",
        label: "La idea clave:",
        text: "un workflow convierte «pídele a la IA que lo intente» en un proceso repetible con estado y manejo de errores. Eso es lo que separa una demo de algo que una empresa puede correr en producción.",
      },

      { type: "h2", id: "modos", text: "Agente, Plan y Ask" },
      {
        type: "p",
        text: "Bob 2.0 tiene tres modos para pedirle las cosas, según cuánto quieras que actúe:",
      },
      {
        type: "ul",
        items: [
          "**Ask:** pregunta y entiende el código sin tocar nada. Ideal para explorar un repositorio ajeno.",
          "**Plan:** arma un plan de los pasos antes de ejecutar. Tú lo revisas y apruebas.",
          "**Agent:** ejecuta el trabajo de punta a punta, con las herramientas que haga falta.",
        ],
      },

      { type: "h2", id: "modernizacion", text: "Modernizar COBOL, IBM i y Java" },
      {
        type: "p",
        text: "Aquí es donde se nota el ADN de IBM. Junto con Bob 2.0 lanzaron paquetes premium con workflows especializados para modernizar sistemas heredados —el trabajo más difícil y, a la vez, el más valioso del mundo empresarial.",
      },
      {
        type: "table",
        head: ["Paquete", "Para qué sirve"],
        rows: [
          { cells: ["IBM Z", "COBOL, PL/I y análisis de JCL en el mainframe."], highlight: true },
          { cells: ["IBM i", "Sistema de archivos remoto y herramientas propias de IBM i."] },
          { cells: ["Java", "Migración a Java 25 y refactorización a gran escala."] },
        ],
      },
      {
        type: "p",
        text: "Ese es el punto exacto: mover código de treinta años que corre un banco es justo la clase de tarea para la que sirve un agente bien gobernado. No es magia creativa; es criterio aplicado a gran escala, con trazabilidad de cada paso.",
      },

      { type: "h2", id: "empresa", text: "Por qué es para empresas" },
      {
        type: "p",
        text: "El diferenciador de Bob 2.0 no es solo lo que puede hacer, sino las barandas. Gobernanza, seguridad y control de costo integrados en cada paso; workflows auditables; y Bobalytics para que un equipo vea qué consume la IA. Es la respuesta a la pregunta que frena a las empresas grandes: «¿cómo dejo a un agente tocar mi código sin perder el control?».",
      },
      {
        type: "p",
        text: "Los detalles cuentan la misma historia: se probó con más de 100,000 desarrolladores internos, la configuración existente se migra sola y el único paso para actualizar es instalarlo. IBM no está haciendo un experimento; está estandarizando una forma de trabajar.",
      },

      { type: "h2", id: "farid", text: "Lo que veo desde acá" },
      {
        type: "p",
        text: "Bob 2.0 confirma algo que repito en este blog: el software pasa de **herramienta** a **agente**. Dejas de abrir una pantalla para hacer el trabajo tú; le entregas un objetivo y el agente lo ejecuta. Lo notable no es la idea —es quién la firma. Cuando IBM, el jugador más empresarial que existe, lo pone como estándar, deja de ser tendencia y pasa a ser piso.",
      },
      {
        type: "p",
        text: "Y hay un detalle que me toca de cerca: esa separación Agente / Harness / Clientes es exactamente como están construidos los agentes con los que trabajo todos los días. El mismo principio escala desde mis proyectos de automatización —AutoSGSST leyendo una foto y redactando un informe legal de SST— hasta modernizar un mainframe. Cambia el tamaño, no la idea.",
      },
      {
        type: "p",
        text: "Para Colombia y Latinoamérica la lección es liberadora: no hay que ser IBM para aplicar esto. Un agente que lee documentos, decide los pasos y entrega el resultado está al alcance de un equipo local. Esa es, exactamente, la apuesta que hacemos en Xentris Tech.",
      },

      { type: "h2", id: "conclusion", text: "Conclusión" },
      {
        type: "p",
        text: "Bob 2.0 no es noticia solo porque IBM sacó una herramienta. Es una señal: el estándar de la industria ya no es «un mejor asistente», sino «un socio agéntico». Quien empiece hoy a automatizar con agentes —lea documentos, decida pasos y entregue— está del lado correcto del cambio. Bob es la versión empresarial de una idea que ya cabe en un proyecto local.",
      },
    ],
  },
  {
    slug: "de-la-app-al-agente-ia-que-lee-documentos-y-genera-informes",
    title: "De la app al agente: la IA que lee documentos, ve imágenes y redacta tus informes",
    excerpt:
      "Durante quince años, hacer software fue meter una app en el smartphone. Ahora los agentes de IA hacen el trabajo: leen documentos, analizan fotos y entregan el informe en PDF. AutoSGSST, de Xentris Tech, lo lleva al SG-SST en Colombia.",
    eyebrow: "IA aplicada · Automatización",
    category: "IA aplicada",
    author: "Farid · Eathan",
    date: "2026-08-04",
    dateLabel: "Agosto 2026",
    readTime: "9 min",
    tags: ["Agentes de IA", "Automatización", "AutoSGSST", "Xentris Tech", "SG-SST", "Visión por computadora", "Colombia", "IA aplicada"],
    seed: "autosgsst-agentes-ia-informes",
    suggestions: [
      "¿Qué diferencia a un agente de IA de una app normal?",
      "¿Cómo genera AutoSGSST un informe legal desde una foto?",
      "¿Qué es el SG-SST y por qué es obligatorio en Colombia?",
    ],
    toc: [
      { id: "que-cambia", label: "Lo que cambió en el software" },
      { id: "agentes", label: "Qué hace distinto a un agente" },
      { id: "leer-ver", label: "Leer documentos, ver imágenes" },
      { id: "informes", label: "Del dato al PDF, sin teclear" },
      { id: "autosgsst", label: "El caso AutoSGSST" },
      { id: "xentris", label: "Cómo Xentris entró a automatizar" },
      { id: "colombia", label: "Una propuesta de valor para Colombia" },
      { id: "lo-bueno", label: "Por qué esto importa" },
      { id: "conclusion", label: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "que-cambia", text: "Lo que cambió en el software" },
      {
        type: "p",
        text: "Durante quince años, hacer software significó casi lo mismo: diseñar una aplicación, meterla en el smartphone y esperar a que la persona la abriera, tocara botones y llenara formularios. La app era el producto, pero el trabajo seguía siendo tuyo: tú capturabas los datos, tú redactabas, tú armabas el documento.",
      },
      {
        type: "p",
        text: "La inteligencia artificial cambió la ecuación. Hoy el software puede **hacer el trabajo**, no solo mostrarte dónde hacerlo. En vez de abrir una pantalla y llenar campos, le entregas evidencia (una foto, una conversación, un documento) y recibes el resultado terminado. La app deja de ser el destino y se convierte en la puerta a un **agente** que ejecuta la tarea por ti.",
      },
      {
        type: "callout",
        variant: "info",
        label: "El cambio de fondo:",
        text: "antes automatizábamos el clic (menús y formularios más rápidos). Ahora automatizamos el criterio: leer, interpretar y redactar. Eso es lo que vuelve distinto a este momento.",
      },

      { type: "h2", id: "agentes", text: "Qué hace distinto a un agente" },
      {
        type: "p",
        text: "Un agente de IA no es un chatbot que responde preguntas. Es un sistema que **recibe un objetivo, reúne el contexto que necesita, decide los pasos y produce un entregable**. Puede leer un PDF, mirar una imagen, consultar una norma, transcribir un audio y, con todo eso, escribir un informe coherente.",
      },
      {
        type: "p",
        text: "La diferencia con una app tradicional está en quién carga el trabajo pesado:",
      },
      {
        type: "ul",
        items: [
          "**App clásica:** tú entiendes el problema, tú redactas; la app solo guarda y ordena.",
          "**Agente:** tú entregas la evidencia; el agente entiende, redacta y ordena; tú revisas y apruebas.",
          "**El humano no desaparece:** decide, corrige y firma. El agente elimina el trabajo mecánico, no el juicio experto.",
        ],
      },

      { type: "h2", id: "leer-ver", text: "Leer documentos, ver imágenes" },
      {
        type: "p",
        text: "Dos capacidades hicieron posible este salto. La primera es que los modelos hoy **leen documentos** como lo haría una persona: entienden un contrato, una norma o una hoja de inspección y extraen lo que importa, sin plantillas rígidas. La segunda es la **visión por computadora**: el modelo mira una foto y reconoce qué hay en ella.",
      },
      {
        type: "p",
        text: "Junta las dos y tienes un asistente que recibe la realidad tal como es (una foto tomada con el celular, una entrevista hablada, un archivo desordenado) y la convierte en información estructurada. Ya no necesitas traducir el mundo a un formulario: el agente lo hace por ti.",
      },

      { type: "h2", id: "informes", text: "Del dato al PDF, sin teclear" },
      {
        type: "p",
        text: "El último eslabón es la salida. Un agente no termina su trabajo en una pantalla: **genera el documento**. Toma la información que interpretó y la vuelca en un informe con la estructura que exige el negocio o la ley, listo para descargar en Word, Excel, PDF o incluso audio.",
      },
      {
        type: "p",
        text: "Ese es el flujo que define a esta nueva generación de aplicaciones: **entrada libre (foto, voz, documento) → interpretación con IA → entregable formal**. La persona pasa de mecanógrafo a supervisor.",
      },
      {
        type: "figure",
        seed: "autosgsst-hero-foto-informe",
        image: "/blog/autosgsst-hero.jpg",
        chip: "AutoSGSST",
        caption: "AutoSGSST resume la idea en una frase: de la foto al informe legal de SST.",
      },

      { type: "h2", id: "autosgsst", text: "El caso AutoSGSST" },
      {
        type: "p",
        text: "**AutoSGSST** (autosgsst.vercel.app) es un ejemplo real, en producción, de todo lo anterior aplicado a un dolor muy concreto: el **SG-SST**, el Sistema de Gestión de Seguridad y Salud en el Trabajo que la ley colombiana exige a toda empresa. Documentarlo a mano es lento, repetitivo y fácil de dejar incompleto.",
      },
      {
        type: "p",
        text: "La promesa es directa: **de la foto al informe legal**. Inspeccionas con la cámara o haces una entrevista por voz, la IA analiza la evidencia y redacta el informe completo (hallazgos, causas, acciones y plan) listo para descargar en Word, PDF o audio. No es un formulario más rápido: es el documento hecho.",
      },
      {
        type: "p",
        text: "Hoy tiene 8 de 10 módulos en servicio, y cada uno es un agente especializado:",
      },
      {
        type: "table",
        head: ["Módulo", "Lo que hace el agente"],
        rows: [
          { cells: ["Plan de trabajo anual", "Arma el plan del SG-SST con objetivos, metas, indicadores y cronograma PHVA a 12 meses."] },
          { cells: ["Inducciones en SST", "Genera el temario según el cargo y el sector, con evaluación y compromisos."] },
          { cells: ["Programa de capacitación", "Programa anual con objetivos, responsables y cronograma."] },
          { cells: ["Análisis de puesto (ASPT)", "Describes la tarea y devuelve peligros, medidas, EPP y procedimiento seguro."] },
          { cells: ["Inspecciones de EPP", "Subes una foto y la visión arma el checklist: casco, guantes, gafas, botas, protector auditivo."], highlight: true },
          { cells: ["Investigación de accidentes", "Entrevista por voz; redacta hallazgos, causas y plan de acción."] },
          { cells: ["Auditoría interna", "Informe contra la Resolución 0312, con fortalezas y recomendaciones."] },
          { cells: ["Acciones correctivas", "Desde los hallazgos, genera el registro con causa, responsables, fechas y verificación."] },
        ],
      },
      {
        type: "figure",
        seed: "autosgsst-modulos-agentes",
        image: "/blog/autosgsst-modulos.jpg",
        chip: "AutoSGSST",
        caption: "Cada módulo es un agente especializado en una parte del SG-SST.",
      },
      {
        type: "callout",
        variant: "info",
        label: "Para probarlo:",
        text: "hay una prueba gratuita de 3 días con todos los módulos y sin tarjeta. Es la forma más rápida de ver el flujo completo, de la evidencia al documento.",
      },

      { type: "h2", id: "xentris", text: "Cómo Xentris entró a automatizar" },
      {
        type: "p",
        text: "Aquí está la parte que más me interesa como ingeniero. La tecnología sola no hace un buen producto de cumplimiento: hace falta saber **qué** debe decir un informe legal para que sirva ante una auditoría. Por eso AutoSGSST no nació en un vacío técnico.",
      },
      {
        type: "p",
        text: "**Xentris Tech** (xentris.tech) construyó la plataforma junto a **Rafael Soto** (rafael.xentris.tech), consultor HSEQ con más de 20 años en seguridad y salud en el trabajo en energía, petróleo y gas e industria. Es el modelo que funciona: **experiencia humana de dominio + agentes de IA**. La IA se entrenó con la legislación colombiana de SST y con el criterio de alguien que ha vivido las auditorías por dentro.",
      },
      {
        type: "quote",
        text: "No es otro software de SST. Es un sistema inteligente.",
      },
      {
        type: "p",
        text: "Esa es la diferencia entre digitalizar un formulario y automatizar el criterio. Xentris tomó el conocimiento de un consultor y lo convirtió en un agente que responde, redacta y documenta como lo haría él, disponible 24/7.",
      },

      { type: "h2", id: "colombia", text: "Una propuesta de valor para Colombia" },
      {
        type: "p",
        text: "En Colombia el SG-SST no es opcional. El **Decreto 1072 de 2015** y la **Resolución 0312 de 2019** obligan a las empresas, sin importar su tamaño, a implementar y documentar su sistema de seguridad, y a sostenerlo para auditorías, la RUC o certificaciones como ISO 45001. Para miles de pymes eso significa contratar consultoría cara o quedar expuestas a sanciones.",
      },
      {
        type: "p",
        text: "La propuesta de valor de AutoSGSST es cerrar esa brecha: poner el criterio de un consultor experto al alcance de cualquier empresa, a costo de software y no de horas de asesoría. Es tecnología pensada desde y para el contexto colombiano, no una plantilla importada.",
      },

      { type: "h2", id: "lo-bueno", text: "Por qué esto importa" },
      {
        type: "p",
        text: "Más allá del SG-SST, AutoSGSST es una muestra de hacia dónde va el software útil:",
      },
      {
        type: "ul",
        items: [
          "**El trabajo tedioso se delega.** Redactar, ordenar y dar formato deja de consumir horas humanas.",
          "**El conocimiento experto se escala.** Un solo consultor ya no atiende a diez empresas; su criterio, vuelto agente, atiende a mil.",
          "**La entrada se vuelve natural.** Una foto o una conversación reemplazan formularios interminables.",
          "**El entregable es formal.** Lo que sale es un documento legal, no una pantalla que todavía hay que pasar en limpio.",
          "**El humano sube de nivel.** Pasa de llenar campos a decidir y aprobar.",
        ],
      },
      {
        type: "p",
        text: "Ese patrón (evidencia libre, agente que interpreta, documento terminado) se puede llevar a contratos, salud, contabilidad, legal o logística. AutoSGSST es la prueba de que ya funciona en producción, con una necesidad real y regulada.",
      },

      { type: "h2", id: "conclusion", text: "Conclusión" },
      {
        type: "p",
        text: "La era de la app en el smartphone no se acabó, pero dejó de ser el techo. Lo que viene son agentes que leen, ven y redactan: software que hace el trabajo y te deja el criterio. AutoSGSST lo demuestra en un terreno donde el error se paga caro, y lo hace desde Colombia, uniendo la experiencia de un consultor con la potencia de la IA.",
      },
      {
        type: "p",
        text: "Si quieres verlo funcionando, entra a autosgsst.vercel.app y prueba el flujo completo. Y si en tu empresa hay un proceso que todavía se hace a mano (leer, interpretar, documentar), probablemente ya es automatizable. De eso se trata este momento.",
      },
    ],
  },
  {
    slug: "computacion-cuantica-ibm-interactuar-desde-tu-navegador",
    title: "Computación cuántica: IBM te deja tocar una de verdad desde el navegador",
    excerpt:
      "Desde 2016 IBM permite a cualquiera ejecutar código en una computadora cuántica real por la nube. Diez años después, con procesadores como Nighthawk y una hoja de ruta a 2029, esto es lo que puedes hacer hoy.",
    eyebrow: "Cuántica · IBM",
    category: "Computación cuántica",
    author: "Farid · Eathan",
    date: "2026-08-02",
    dateLabel: "Agosto 2026",
    readTime: "8 min",
    tags: ["Computación cuántica", "IBM Quantum", "Qubits", "Qiskit", "Nighthawk", "Ventaja cuántica", "Hardware", "Tecnología"],
    seed: "ibm-quantum-cloud-superposition",
    image: "/blog/ibmq-hero.jpg",
    suggestions: [
      "¿Qué es un qubit en palabras simples?",
      "¿Cómo pruebo una computadora cuántica gratis?",
      "¿Qué es la ventaja cuántica y qué llega en 2029?",
    ],
    toc: [
      { id: "que-es", label: "Qué es una computadora cuántica" },
      { id: "interactuar", label: "Lo que IBM creó" },
      { id: "estado", label: "Dónde está IBM hoy" },
      { id: "hoja-de-ruta", label: "La hoja de ruta a 2029" },
      { id: "probarlo", label: "Cómo puedes probarlo tú" },
      { id: "lo-bueno", label: "Por qué esto es enorme" },
      { id: "conclusion", label: "Conclusión" },
    ],
    blocks: [
      { type: "h2", id: "que-es", text: "Qué es una computadora cuántica" },
      {
        type: "p",
        text: "Una computadora normal procesa **bits**: cada uno es 0 o 1. Una computadora cuántica usa **qubits**, que gracias a la superposición pueden representar 0 y 1 al mismo tiempo, y mediante el entrelazamiento se correlacionan de formas imposibles para un bit clásico. El efecto práctico es que el espacio de cómputo crece de forma exponencial con cada qubit que agregas.",
      },
      {
        type: "p",
        text: "El problema es que los qubits son **frágiles**: pierden su estado con el mínimo ruido (decoherencia). Mantenerlos estables y corregir sus errores es el gran reto de la ingeniería cuántica, y es justo ahí donde IBM está apostando fuerte.",
      },
      {
        type: "figure",
        seed: "ibm-quantum-superposition",
        chip: "IBM Quantum",
        caption: "Un qubit no es 0 o 1: mientras calcula, es una combinación de ambos. Ahí está su poder.",
      },

      { type: "h2", id: "interactuar", text: "Lo que IBM creó: interactuar con una de verdad" },
      {
        type: "p",
        text: "Aquí está lo que probablemente tenías en mente. El **4 de mayo de 2016**, IBM puso la primera computadora cuántica en la nube: por primera vez, cualquier persona del mundo podía ejecutar programas en una máquina cuántica **real** de 5 qubits desde su navegador, sin tener una en casa. Ese servicio se llama **IBM Quantum Platform** (antes IBM Quantum Experience).",
      },
      {
        type: "p",
        text: "El acceso se maneja con **Qiskit**, el kit de desarrollo open source de IBM, en Python. Con unas pocas líneas de código escribes un circuito cuántico, lo envías a un procesador real y recibes los resultados. En 2026 ese servicio cumplió **una década** democratizando la computación cuántica.",
      },
      {
        type: "callout",
        variant: "info",
        label: "Lo importante:",
        text: "no es un simulador. Tu código corre en hardware cuántico físico, enfriado a casi el cero absoluto dentro de un centro de datos de IBM. Y hay un plan gratuito (Open Plan) pensado para aprender y experimentar.",
      },

      { type: "h2", id: "estado", text: "Dónde está IBM hoy" },
      {
        type: "p",
        text: "En 2026, **todas** las computadoras cuánticas de IBM superan los 100 qubits. El procesador **Heron r3** llega a **156 qubits** con tasas de error alrededor de 1.17×10⁻³, y IBM opera la flota más grande del mundo de máquinas de 100+ qubits (ya demostró incluso chips de hasta 1,121 qubits).",
      },
      {
        type: "p",
        text: "En noviembre de 2025, en su conferencia de desarrolladores, IBM presentó dos procesadores nuevos que marcan el siguiente salto:",
      },
      {
        type: "table",
        head: ["Procesador", "Qué aporta"],
        rows: [
          {
            highlight: true,
            cells: ["Nighthawk (120 qubits)", "218 acopladores sintonizables y circuitos ~30% más complejos; escala de 5,000 puertas hoy a 15,000 hacia 2028."],
          },
          { cells: ["Loon (~112 qubits)", "Primer chip con todas las piezas para la corrección de errores: acopladores de largo alcance, cableado 3D y reinicio rápido de qubits."] },
        ],
      },
      {
        type: "p",
        text: "También mejoró el software: Qiskit ahora ejecuta **circuitos dinámicos** con un 24% más de precisión a escala de 100+ qubits, expone una C-API para integrarse con supercómputo clásico, y abarató la mitigación de errores más de 100 veces. Además logró un decodificador de errores en tiempo real por debajo de **480 nanosegundos**, unas 10 veces más rápido que la competencia.",
      },

      { type: "h2", id: "hoja-de-ruta", text: "La hoja de ruta a 2029" },
      {
        type: "p",
        text: "Algo raro en este campo: IBM publica un plan con fechas y hardware concreto.",
      },
      {
        type: "ul",
        items: [
          "**2026**: demostrar **ventaja cuántica** verificada por la comunidad, con un Quantum Advantage Tracker abierto.",
          "**2028**: construir **Starling**, un supercomputador cuántico modular con corrección de errores.",
          "**2029**: Starling disponible y tolerante a fallos, con unos 200 qubits lógicos capaces de correr 100 millones de puertas, desde un nuevo centro de datos cuántico en Poughkeepsie, Nueva York.",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        label: "Un matiz honesto:",
        text: "\"ventaja cuántica\" no significa que reemplace tu laptop. Significa resolver problemas específicos (química, materiales, optimización) mejor que cualquier supercomputadora clásica. Para casi todo lo demás, lo clásico sigue ganando.",
      },

      { type: "h2", id: "probarlo", text: "Cómo puedes probarlo tú" },
      {
        type: "p",
        text: "Lo mejor de todo: no necesitas un doctorado ni un laboratorio para empezar.",
      },
      {
        type: "ul",
        items: [
          "Crea una cuenta gratuita en IBM Quantum Platform.",
          "Instala Qiskit (un `pip install qiskit`) o usa el editor web.",
          "Escribe un circuito de un par de qubits, envíalo a una máquina real y compáralo con el simulador.",
          "Aprende desde cero con los cursos gratuitos de IBM, como la Qiskit Global Summer School.",
        ],
      },
      {
        type: "figure",
        seed: "ibm-quantum-platform-hello-world",
        image: "/blog/ibmq-hello-world.jpg",
        chip: "IBM Quantum",
        caption: "La IBM Quantum Platform desde el navegador: instalas Qiskit (pip install qiskit), corres tu primer circuito y consigues 10 minutos gratis al mes en procesadores reales de más de 100 qubits.",
      },
      {
        type: "quote",
        text: "Programar una computadora cuántica real, hoy, cabe en unas pocas líneas de código y en una cuenta gratuita. Eso era ciencia ficción hace diez años.",
      },

      { type: "h2", id: "lo-bueno", text: "Por qué esto es enorme" },
      {
        type: "p",
        text: "Más allá del hype, esto es lo que hace especial el enfoque de IBM:",
      },
      {
        type: "ul",
        items: [
          "**Acceso real y abierto**: hardware cuántico físico para cualquiera, gratis para empezar.",
          "**Hoja de ruta entregada**: fechas y procesadores reales, no solo promesas.",
          "**Ecosistema maduro**: Qiskit, documentación, cursos y una comunidad de una década.",
          "**Transparencia**: la ventaja cuántica se verifica en comunidad, no por marketing.",
          "**Se suma a lo clásico**: computación cuántico-céntrica que trabaja con el supercómputo, no lo reemplaza.",
        ],
      },

      { type: "h2", id: "conclusion", text: "Conclusión" },
      {
        type: "p",
        text: "La computación cuántica dejó de ser ciencia ficción de laboratorio: hoy puedes tocar una computadora cuántica real desde tu navegador, gratis, en unos diez minutos. Eso es, en el fondo, lo que IBM construyó y lleva una década perfeccionando.",
      },
      {
        type: "p",
        text: "Y si 2029 llega como lo planean, con Starling tolerante a fallos, pasaremos de \"experimentar\" a \"resolver problemas que hoy son imposibles\". Vale la pena aprender a programar en cuántico ahora, mientras el campo todavía es joven y hay espacio para entender de verdad.",
      },
    ],
  },
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
    image: "/blog/openjarvis-hero.jpg",
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
        type: "figure",
        seed: "openjarvis-quickstart-ollama",
        image: "/blog/openjarvis-quickstart.jpg",
        chip: "OpenJarvis",
        caption: "Un solo script (quickstart.sh) clona el repo, levanta Ollama con un modelo local y abre el chat en tu navegador. La nube sigue siendo opcional.",
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
    slug: "el-windows-que-les-falta-a-los-agentes-de-ia",
    title: "The «Windows» that AI agents are still missing",
    excerpt:
      "Today's AI agents are like MS-DOS: powerful, but only whoever reads the terminal understands what they do. They're missing their «Windows» —the visual layer that lets you see the work—. Why observability is the next big layer, and the dashboard I built to see it.",
    eyebrow: "AI Agents · Observability",
    category: "AI Agents",
    author: "Farid · Eathan",
    date: "2026-08-21",
    dateLabel: "August 2026",
    readTime: "7 min",
    tags: ["AI Agents", "Observability", "MCP", "Orchestration", "Mission Control", "Xentris Tech", "MS-DOS", "Windows"],
    seed: "windows-agentes-ia-observabilidad",
    image: "/blog/agentes-hero.svg",
    suggestions: [
      "Why does an AI agent resemble MS-DOS?",
      "What is agent observability?",
      "What is a Mission Control-style dashboard?",
    ],
    toc: [
      { id: "intro", label: "The terminal came back" },
      { id: "dos", label: "An agent is like MS-DOS" },
      { id: "observabilidad", label: "The problem: observability" },
      { id: "visual", label: "The «Windows» of agents" },
      { id: "asimov", label: "Asimov and governance" },
      { id: "farid", label: "What I see from here" },
      { id: "conclusion", label: "Conclusion" },
    ],
    blocks: [
      { type: "h2", id: "intro", text: "The terminal came back, and almost nobody noticed" },
      {
        type: "p",
        text: "A friend asked me the other day if I remembered **WordStar** and **Visual Basic**. WordStar was the 1980s word processor you drove with key chords; Visual Basic, the one that let you build an application by dragging buttons. Pure nostalgia — until he dropped the line that stuck with me: «you're like that, but with AI; MCP is like an API… why isn't there an operating system, like when Windows came out?».",
      },
      {
        type: "p",
        text: "He was onto something deep. After years of graphical interfaces, the most advanced software of 2026 —AI agents— is once again driven by **typing into a terminal**. The oldest interface in computing became the newest again. And with it came back an old problem we had already solved once.",
      },
      {
        type: "callout",
        variant: "info",
        label: "The core idea:",
        text: "an AI agent today looks a lot like a machine running MS-DOS. It's powerful, but only whoever can read the screen understands what's happening. What's missing is the leap we already made once: from DOS to Windows.",
      },

      { type: "h2", id: "dos", text: "Why an agent today resembles MS-DOS" },
      {
        type: "p",
        text: "A modern agent already has almost everything that defines an operating system. It's not an exaggeration — it's literal.",
      },
      {
        type: "ul",
        items: [
          "**Memory** that persists across sessions.",
          "**A file system** it reads from and writes to.",
          "**«Programs»** that extend what it can do (skills).",
          "**Scheduled tasks** that run on their own.",
          "**A connection to services** through a standard —MCP—, which plays the role Windows APIs once played: a common plug to talk to any tool.",
        ],
      },
      {
        type: "p",
        text: "What it still lacks to be a true operating system is three concrete things: **determinism** (an OS can't «sort of» save your file; an agent is still probabilistic), **cost and latency** (every action costs money and takes seconds, not milliseconds) and **trust** (that's why we work with permissions and controlled environments, rightly so). At first, Windows didn't do more than DOS either. It won for another reason.",
      },
      {
        type: "figure",
        seed: "dos-a-windows-agentes-1985-2026",
        image: "/blog/agentes-dos-windows.svg",
        chip: "1985 → 2026",
        caption: "The same leap, forty years later: in 1985, from the DOS terminal to Windows; in 2026, from the agent running in the terminal to the dashboard that lets you see what it does.",
      },

      { type: "h2", id: "observabilidad", text: "The problem almost nobody names: observability" },
      {
        type: "p",
        text: "When you coordinate several agents at once —as I do almost every day— a very concrete pain shows up. With five tasks running, **you lose track** of which one is doing what. And when you show the screen to a client, they see technical text scrolling in green instead of understandable work.",
      },
      {
        type: "p",
        text: "That has a name: **observability**. The good news is the information already exists —every agent records everything it does in real time—; what's missing is a layer that translates it into human language. Nobody is watching it, but it's there.",
      },
      {
        type: "figure",
        seed: "observabilidad-multiples-terminales-verde",
        image: "/blog/agentes-observabilidad.svg",
        chip: "Observability",
        caption: "Four terminals, four green stories at once. The work is done and done well —but nobody is watching, and you don't know which one is waiting for you.",
      },

      { type: "h2", id: "visual", text: "The solution is visual: the «Windows» of agents" },
      {
        type: "p",
        text: "Windows didn't win because it did more than DOS. It won because **anyone could see what was happening**. The next big AI layer is exactly that: a dashboard that shows, for each agent, what it's doing right now, in one clear sentence. A good dashboard answers three questions at a glance:",
      },
      {
        type: "ul",
        items: [
          "What is each agent doing right now, in plain language?",
          "Which one finished and is waiting for a decision from me?",
          "Which one is stuck or needs a permission?",
        ],
      },
      {
        type: "callout",
        variant: "info",
        label: "I put it into practice:",
        text: "I built a local dashboard, «Mission Control», that reads those logs and shows one card per agent with a traffic light —working, waiting for you, paused, idle— and a sentence of what it's doing. It has a «presentation mode» that hides the technical bits to show a client. In fact, that dashboard told me the other agent I was working with had already closed, without asking anyone.",
      },

      { type: "h2", id: "asimov", text: "Asimov, and why a dashboard is governance" },
      {
        type: "p",
        text: "In 1950, Isaac Asimov published his **Three Laws of Robotics**. The interesting part is that his book isn't a manual: it's a catalog of **how those rules fail**. Three simple rules, applied literally, end up producing absurd results. The lesson, 75 years later, still holds: a handful of rigid rules isn't enough to govern a complex intelligence; there are always gaps, and intelligence finds them.",
      },
      {
        type: "quote",
        text: "That's why responsible AI isn't based on three rules, but on layers: good baseline values, scoped permissions, controlled environments and —the final layer— human supervision. An observability dashboard is, quite simply, that supervision made visible.",
      },

      { type: "h2", id: "farid", text: "What I see from here" },
      {
        type: "p",
        text: "This connects directly to what I already wrote about **agent orchestrators**: if a director splits the work among several agents, someone has to be able to see what each one is doing. The visual layer isn't decoration; it's what makes orchestration supervisable, explainable to the client and trustworthy. At Xentris Tech we treat it as a best practice: before scaling an AI automation, you make sure you can **see and tell** what it does.",
      },
      {
        type: "p",
        text: "For Colombia and Latin America the lesson is the usual one on this blog: you don't have to be a big tech company to apply it. I built the dashboard I'm describing in one afternoon, on my own machine, reading files that were already there. The opportunity is exactly in that gap: the agents that run in the terminal already work; the «Windows» that makes them understandable to any human is still to be built.",
      },
      {
        type: "callout",
        variant: "info",
        label: "Further reading:",
        text: "I wrote a business-focused version of this idea on the [Xentris Tech](https://xentris.tech/en/blog/el-windows-de-los-agentes-ia) blog. If you're interested in applying AI agents with this supervision layer in your company, that's the place.",
      },

      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "WordStar was memorizing chords; Visual Basic was dragging buttons; and today we came back to the terminal, but chatting in plain language. The oldest interface turned out to be the newest. We're in a 1985 moment: the «DOS» of AI —the agents— already exists and works. The «Windows» —the layer that lets you see the work— is vacant. And whoever builds it well, even on their own machine on a Tuesday afternoon, is a step ahead.",
      },
    ],
  },
  {
    slug: "orquestadores-de-agentes-ia-un-agente-no-basta",
    title: "One agent isn't enough: how orchestrators split work across multiple AI agents",
    excerpt:
      "A single AI agent gets overloaded: its context clutters and it gets worse. The orchestrator is the conductor that splits the work across several agents —each on its own front, each result verified— to solve tasks one thread can't handle well. The real patterns, when to use them and when NOT to, with Bob, Claude Code and AutoSGSST as proof.",
    eyebrow: "AI agents · Architecture",
    category: "AI agents",
    author: "Farid · Eathan",
    date: "2026-08-19",
    dateLabel: "August 2026",
    readTime: "8 min",
    tags: ["AI agents", "Orchestration", "Multi-agent", "Subagents", "Workflows", "LangGraph", "CrewAI", "Xentris Tech"],
    seed: "orquestadores-agentes-ia",
    suggestions: [
      "What is an agent orchestrator?",
      "When is it NOT worth orchestrating in parallel?",
      "What is adversarial verification of findings?",
    ],
    toc: [
      { id: "problema", label: "One agent isn't enough" },
      { id: "que-es", label: "What an orchestrator is" },
      { id: "patrones", label: "The patterns that are used" },
      { id: "dos-niveles", label: "The two levels" },
      { id: "practica", label: "What it looks like in practice" },
      { id: "regla", label: "The rule that saves money" },
      { id: "farid", label: "What I see from here" },
      { id: "conclusion", label: "Conclusion" },
    ],
    blocks: [
      { type: "h2", id: "problema", text: "One agent isn't enough" },
      {
        type: "p",
        text: "An AI agent is powerful, but it has a physical limit: its **context window**. That's the working memory it reasons with. If you ask it to audit a project with two hundred files, or to research ten fronts at once, that memory saturates: the model starts forgetting the beginning, mixing things up and getting worse right when the task gets big. More context isn't more intelligence; often it's the opposite.",
      },
      {
        type: "p",
        text: "The fix isn't a bigger agent. It's **several well-directed agents**. And what directs them is the orchestrator.",
      },
      {
        type: "callout",
        variant: "info",
        label: "The core idea:",
        text: "instead of stuffing everything into one thread, you split the work. Each subagent sees only its piece, returns the conclusion —not the whole dump— and the main thread stays clean, fast and cheap.",
      },

      { type: "h2", id: "que-es", text: "What an agent orchestrator is" },
      {
        type: "p",
        text: "An orchestrator is the component that **coordinates several agents to solve a task one alone couldn't handle well**. It doesn't do the specialized work: it decides who acts, in what order, in parallel or in series, and what to do with what each one returns. It's the difference between a solo musician and an orchestra conductor.",
      },
      {
        type: "quote",
        text: "The conductor doesn't play the instruments. They decide who plays and when. That, exactly, is an agent orchestrator.",
      },
      {
        type: "p",
        text: "The human is still in charge: sets the goal, reviews and approves. But the mechanical work of splitting, running and merging results stops being theirs. The orchestrator does it for them, and at a scale a single agent can't reach.",
      },

      { type: "h2", id: "patrones", text: "The patterns that are actually used" },
      {
        type: "p",
        text: "Orchestrating isn't one technique; it's a handful of patterns you combine depending on the task. These are the ones that show up again and again:",
      },
      {
        type: "table",
        head: ["Pattern", "What it does"],
        rows: [
          { cells: ["Router / dispatcher", "Classifies the request and sends it to the right agent or skill (is this support, sales or legal?)."], highlight: true },
          { cells: ["Orchestrator–worker", "A boss decomposes the task and hands it to N workers running in parallel."] },
          { cells: ["Parallel fan-out", "Launches many agents at once, each on its own front (search 10 different directories)."] },
          { cells: ["Pipeline", "Each item flows through chained stages without waiting for the others."] },
          { cells: ["Adversarial verification", "Other agents try to refute each finding; only the confirmed ones survive."] },
        ],
      },
      {
        type: "p",
        text: "The last one is the most underrated. An agent can produce a finding that sounds right but is false. The cure is to pit it against verifiers that try to **tear it down**; what survives the attack is what you report. Without that step, orchestration multiplies errors instead of multiplying useful work.",
      },

      { type: "h2", id: "dos-niveles", text: "The two levels of orchestration" },
      {
        type: "p",
        text: "When we talk about «orchestrating agents» we tend to mix two things that complement each other, and it helps to keep them apart:",
      },
      {
        type: "ul",
        items: [
          "**Orchestrating tools:** knowing *when to invoke each capability*. It's a router over your skills: start a project, save memory, build, deploy —each step to its agent— leaving no loose ends.",
          "**Orchestrating heavy work:** decomposing a broad task and launching subagents in parallel. The canonical cycle is **explore → decompose → parallelize → verify → synthesize**.",
        ],
      },
      {
        type: "p",
        text: "The first gives order; the second gives scale. A good orchestrator does both: it's the entry point that imposes sequence and, when the task calls for it, opens the fan of agents.",
      },

      { type: "h2", id: "practica", text: "What it looks like in practice" },
      {
        type: "p",
        text: "This isn't theory. When IBM unveiled **Bob 2.0**, its biggest leap was exactly this: going from a single agent to coordinating *subagents* that each search a directory in parallel and return only what matters. AI development tools already ship the pieces: a mechanism to launch a subagent and another to define *workflows* —processes with steps, state and error handling— that run deterministically.",
      },
      {
        type: "figure",
        seed: "orquestador-fan-out-agentes",
        chip: "Orchestration",
        caption: "The fan-out pattern: an orchestrator splits the task across several subagents working in parallel, each on its own front. Each returns its conclusion and a verifier confirms it before the final result is synthesized.",
      },
      {
        type: "p",
        text: "If they ask you for names, these are the frameworks implementing these patterns today:",
      },
      {
        type: "ul",
        items: [
          "**LangGraph** — orchestration as a state graph (nodes, edges and cycles).",
          "**CrewAI** — role-based agent teams collaborating on a mission.",
          "**AutoGen (Microsoft)** — a conversation among multiple agents coordinating via messages.",
          "**OpenAI Agents SDK** — agents with handoffs between specialists.",
        ],
      },

      { type: "h2", id: "regla", text: "The rule that saves money" },
      {
        type: "p",
        text: "Not everything gets orchestrated. Launching agents in parallel **costs tokens**, and plenty of them. If the task is trivial or a sequence with strong dependencies (step 2 needs step 1's result), a single thread is cheaper, faster and clearer.",
      },
      {
        type: "callout",
        variant: "warn",
        label: "When it IS worth it:",
        text: "when there's real breadth —auditing, migrating, deep review, researching several fronts—. There the parallelism pays for its cost. And always with verification: no finding is reported without being confirmed.",
      },

      { type: "h2", id: "farid", text: "What I see from here" },
      {
        type: "p",
        text: "The same principle scales from a local project to a mainframe. In AutoSGSST, an agent reads a photo and drafts an occupational-safety report; when the work grows, the answer isn't a bigger agent, it's splitting it. That separation —a conductor that splits, workers that execute, a verifier that confirms— is identical at an IBM bank and in an automation we build from Colombia. The size changes, not the idea.",
      },
      {
        type: "p",
        text: "That's why at Xentris Tech we treat orchestration as a best practice, not a luxury: it's what separates a demo that impresses from a system that holds real work without cluttering or blowing up its cost.",
      },

      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "One agent isn't enough when the task is big. The orchestrator is the conductor that splits it: divide, parallelize, verify and synthesize. It's not magic —it's a few patterns applied well and a golden rule: orchestrate when there's real breadth, and never report a finding unless it survives the attack. That's the leap from «ask the AI to give it a try» to «a system you can run in production».",
      },
    ],
  },
  {
    slug: "ibm-bob-2-el-socio-de-desarrollo-agentico",
    title: "Say hello to Bob 2.0: when IBM trades autocomplete for an agentic development partner",
    excerpt:
      "IBM unveiled Bob 2.0: not a better autocomplete, but an agentic development partner that plans, codes, tests and modernizes enterprise software end to end —with the governance and cost guardrails an enterprise demands. Here's what the leap means, and why it confirms where agent-driven automation is headed.",
    eyebrow: "AI agents · Engineering",
    category: "AI agents",
    author: "Farid · Eathan",
    date: "2026-08-12",
    dateLabel: "August 2026",
    readTime: "8 min",
    tags: ["IBM", "Bob 2.0", "AI agents", "Software engineering", "Modernization", "COBOL", "Automation", "Enterprise"],
    seed: "ibm-bob-2-agentic-dev-partner",
    image: "/blog/bob-hero-en.jpg",
    suggestions: [
      "How is Bob 2.0 different from a code copilot?",
      "What is Bob's three-tier architecture?",
      "How does Bob modernize legacy code like COBOL?",
    ],
    toc: [
      { id: "que-es", label: "Say hello to Bob 2.0" },
      { id: "socio", label: "From copilot to development partner" },
      { id: "arquitectura", label: "How it's built inside" },
      { id: "multi-agente", label: "Many agents at once" },
      { id: "modos", label: "Agent, Plan and Ask" },
      { id: "modernizacion", label: "Modernizing COBOL, IBM i and Java" },
      { id: "empresa", label: "Why it's built for enterprises" },
      { id: "farid", label: "What I see from here" },
      { id: "conclusion", label: "Conclusion" },
    ],
    blocks: [
      { type: "h2", id: "que-es", text: "Say hello to Bob 2.0" },
      {
        type: "p",
        text: "On August 12, 2026, IBM published a post with an almost affectionate title: *«Say hello to IBM Bob 2.0»*. Bob is IBM's AI software development partner, and version 2 isn't a patch: it rewrote the whole architecture. It's not a better autocomplete. It's an agent that takes a software goal and carries it from planning to code, to testing, to deployment and even to modernizing legacy systems.",
      },
      {
        type: "p",
        text: "The interesting part is who's saying it. IBM is the home of the mainframe, of COBOL, of the enterprise software that runs banks and insurers. That this player —the most conservative in the field— is going all in on agents says a lot about the moment. Bob 2.0 was tested with more than 100,000 IBM developers before release.",
      },
      {
        type: "callout",
        variant: "info",
        label: "The real headline:",
        text: "it isn't «another coding assistant». It's an end-to-end agentic development partner, with the guardrails —governance, security and cost control— a real enterprise demands.",
      },

      { type: "h2", id: "socio", text: "From copilot to development partner" },
      {
        type: "p",
        text: "For years, «AI for coding» meant autocomplete: a copilot suggesting the next line while you hold the wheel. Bob 2.0 changes the frame of reference. And its own product leader says so plainly.",
      },
      {
        type: "quote",
        text: "The bar for enterprise AI is no longer a better coding assistant. It's an end-to-end agentic development partner. — Neel Sundaresan, GM of Automation and AI, IBM.",
      },
      {
        type: "p",
        text: "The difference is fundamental. A copilot suggests and you execute. A partner takes the goal, gathers the context of the whole repository on its own, decides the steps, runs the tools it needs and hands you the result to review. The human still leads: you decide, correct and approve. But the mechanical work stops being yours.",
      },

      { type: "h2", id: "arquitectura", text: "How it's built inside" },
      {
        type: "p",
        text: "Bob 2.0 rewrote its architecture into three cleanly separated layers. That's not a minor technical detail: it's what lets a single reasoning engine serve many interfaces without duplicating logic.",
      },
      {
        type: "table",
        head: ["Layer", "What it does"],
        rows: [
          { cells: ["The Agent", "The central agentic loop: it reasons and generates the code."], highlight: true },
          { cells: ["The Harness", "The shared infrastructure: authentication, logging and telemetry."] },
          { cells: ["The Clients", "The interfaces (IDE and others), with zero duplicated logic."] },
        ],
      },
      {
        type: "p",
        text: "On that base they layered concrete improvements: support for MCP (Model Context Protocol) servers to plug in external tools, a rollback that directly tracks file state, a cleaner UI that hides intermediate tool calls, and background multitasking that doesn't lock the session while it works.",
      },

      { type: "h2", id: "multi-agente", text: "Many agents at once" },
      {
        type: "p",
        text: "The biggest leap in version 2 is that Bob stopped being a single agent doing everything in one context. It now coordinates **subagents** working in isolated contexts. Instead of bloating a single context window —slow and expensive—, it delegates the complex work and keeps cost in check.",
      },
      {
        type: "ul",
        items: [
          "**Parallel tool calling:** the model can request and run several tools in a single turn, not one at a time.",
          "**Subagents in isolated contexts:** each heavy task lives in its own space; less noise, less cost.",
          "**Workflows:** they give a «backbone» to repeatable processes —the engine runs the steps in order, holds state, handles errors and keeps it all auditable.",
          "**Bobalytics:** built-in analytics showing how much the AI consumes, where and at what cost.",
        ],
      },
      {
        type: "figure",
        seed: "ibm-bob-2-build-with-agents",
        image: "/blog/bob-agents-en.jpg",
        chip: "IBM Bob",
        caption: "Bob spawning subagents in parallel: each one searches a different directory and returns only what matters. That's how it keeps context clean and cost low, even on large projects.",
      },
      {
        type: "callout",
        variant: "info",
        label: "The key idea:",
        text: "a workflow turns «ask the AI to try» into a repeatable process with state and error handling. That's what separates a demo from something an enterprise can actually run in production.",
      },

      { type: "h2", id: "modos", text: "Agent, Plan and Ask" },
      {
        type: "p",
        text: "Bob 2.0 has three modes to ask for things, depending on how much you want it to act:",
      },
      {
        type: "ul",
        items: [
          "**Ask:** ask and understand the code without touching anything. Great for exploring someone else's repo.",
          "**Plan:** it lays out the steps before executing. You review and approve.",
          "**Agent:** it runs the work end to end, with whatever tools it needs.",
        ],
      },

      { type: "h2", id: "modernizacion", text: "Modernizing COBOL, IBM i and Java" },
      {
        type: "p",
        text: "This is where IBM's DNA shows. Alongside Bob 2.0 they shipped premium packages with specialized workflows for modernizing legacy systems —the hardest, and also the most valuable, work in the enterprise world.",
      },
      {
        type: "table",
        head: ["Package", "What it's for"],
        rows: [
          { cells: ["IBM Z", "COBOL, PL/I and JCL analysis on the mainframe."], highlight: true },
          { cells: ["IBM i", "Remote file system and IBM i-specific tooling."] },
          { cells: ["Java", "Migration to Java 25 and large-scale refactoring."] },
        ],
      },
      {
        type: "p",
        text: "That's the exact point: moving thirty-year-old code that runs a bank is precisely the kind of task a well-governed agent is for. It's not creative magic; it's judgment applied at scale, with every step traceable.",
      },

      { type: "h2", id: "empresa", text: "Why it's built for enterprises" },
      {
        type: "p",
        text: "Bob 2.0's differentiator isn't only what it can do, it's the guardrails. Governance, security and cost control embedded at every step; auditable workflows; and Bobalytics so a team sees what the AI consumes. It's the answer to the question that holds big companies back: «how do I let an agent touch my code without losing control?».",
      },
      {
        type: "p",
        text: "The details tell the same story: it was tested with over 100,000 internal developers, existing settings migrate automatically and the only step to upgrade is installing it. IBM isn't running an experiment; it's standardizing a way of working.",
      },

      { type: "h2", id: "farid", text: "What I see from here" },
      {
        type: "p",
        text: "Bob 2.0 confirms something I keep repeating on this blog: software is shifting from **tool** to **agent**. You stop opening a screen to do the work yourself; you hand over a goal and the agent executes it. What's remarkable isn't the idea —it's who's signing it. When IBM, the most enterprise player there is, sets it as the standard, it stops being a trend and becomes the floor.",
      },
      {
        type: "p",
        text: "And there's a detail that hits close to home: that Agent / Harness / Clients split is exactly how the agents I work with every day are built. The same principle scales from my automation projects —AutoSGSST reading a photo and writing a legal OSH report— all the way to modernizing a mainframe. The size changes, not the idea.",
      },
      {
        type: "p",
        text: "For Colombia and Latin America the lesson is liberating: you don't have to be IBM to apply this. An agent that reads documents, decides the steps and delivers the result is within reach of a local team. That is, exactly, the bet we're making at Xentris Tech.",
      },

      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "Bob 2.0 isn't news just because IBM shipped a tool. It's a signal: the industry standard is no longer «a better assistant», but «an agentic partner». Whoever starts automating with agents today —reading documents, deciding steps and delivering— is on the right side of the shift. Bob is the enterprise version of an idea that already fits in a local project.",
      },
    ],
  },
  {
    slug: "de-la-app-al-agente-ia-que-lee-documentos-y-genera-informes",
    title: "From app to agent: the AI that reads documents, sees images and writes your reports",
    excerpt:
      "For fifteen years, building software meant putting an app on a smartphone. Now AI agents do the work: they read documents, analyze photos and hand you the report as a PDF. AutoSGSST, by Xentris Tech, brings this to workplace-safety compliance in Colombia.",
    eyebrow: "Applied AI · Automation",
    category: "Applied AI",
    author: "Farid · Eathan",
    date: "2026-08-04",
    dateLabel: "August 2026",
    readTime: "9 min",
    tags: ["AI agents", "Automation", "AutoSGSST", "Xentris Tech", "OSH", "Computer vision", "Colombia", "Applied AI"],
    seed: "autosgsst-agentes-ia-informes",
    suggestions: [
      "How is an AI agent different from a normal app?",
      "How does AutoSGSST turn a photo into a legal report?",
      "What is SG-SST and why is it mandatory in Colombia?",
    ],
    toc: [
      { id: "que-cambia", label: "What changed in software" },
      { id: "agentes", label: "What makes an agent different" },
      { id: "leer-ver", label: "Reading documents, seeing images" },
      { id: "informes", label: "From data to PDF, no typing" },
      { id: "autosgsst", label: "The AutoSGSST case" },
      { id: "xentris", label: "How Xentris got into automation" },
      { id: "colombia", label: "A value proposition for Colombia" },
      { id: "lo-bueno", label: "Why this matters" },
      { id: "conclusion", label: "Conclusion" },
    ],
    blocks: [
      { type: "h2", id: "que-cambia", text: "What changed in software" },
      {
        type: "p",
        text: "For fifteen years, building software meant roughly the same thing: design an app, put it on a smartphone and wait for the person to open it, tap buttons and fill out forms. The app was the product, but the work was still yours: you captured the data, you wrote the text, you assembled the document.",
      },
      {
        type: "p",
        text: "Artificial intelligence changed the equation. Today software can **do the work**, not just show you where to do it. Instead of opening a screen and filling fields, you hand it evidence (a photo, a conversation, a document) and get the finished result back. The app stops being the destination and becomes the door to an **agent** that carries out the task for you.",
      },
      {
        type: "callout",
        variant: "info",
        label: "The deeper shift:",
        text: "we used to automate the click (faster menus and forms). Now we automate the judgment: reading, interpreting and writing. That is what makes this moment different.",
      },

      { type: "h2", id: "agentes", text: "What makes an agent different" },
      {
        type: "p",
        text: "An AI agent is not a chatbot that answers questions. It is a system that **takes a goal, gathers the context it needs, decides the steps and produces a deliverable**. It can read a PDF, look at an image, check a regulation, transcribe an audio clip and, with all of that, write a coherent report.",
      },
      {
        type: "p",
        text: "The difference with a traditional app is who carries the heavy lifting:",
      },
      {
        type: "ul",
        items: [
          "**Classic app:** you understand the problem, you write; the app only stores and organizes.",
          "**Agent:** you hand over the evidence; the agent understands, writes and organizes; you review and approve.",
          "**The human doesn't disappear:** they decide, correct and sign off. The agent removes the mechanical work, not the expert judgment.",
        ],
      },

      { type: "h2", id: "leer-ver", text: "Reading documents, seeing images" },
      {
        type: "p",
        text: "Two capabilities made this leap possible. The first is that models now **read documents** the way a person would: they understand a contract, a regulation or an inspection sheet and extract what matters, with no rigid templates. The second is **computer vision**: the model looks at a photo and recognizes what's in it.",
      },
      {
        type: "p",
        text: "Put the two together and you get an assistant that takes reality as it is (a photo shot on a phone, a spoken interview, a messy file) and turns it into structured information. You no longer need to translate the world into a form: the agent does it for you.",
      },

      { type: "h2", id: "informes", text: "From data to PDF, no typing" },
      {
        type: "p",
        text: "The final link is the output. An agent doesn't finish its work on a screen: it **generates the document**. It takes the information it interpreted and pours it into a report with the structure the business or the law requires, ready to download as Word, Excel, PDF or even audio.",
      },
      {
        type: "p",
        text: "That is the flow that defines this new generation of applications: **free input (photo, voice, document) → AI interpretation → formal deliverable**. The person goes from typist to supervisor.",
      },
      {
        type: "figure",
        seed: "autosgsst-hero-foto-informe",
        image: "/blog/autosgsst-hero.jpg",
        chip: "AutoSGSST",
        caption: "AutoSGSST sums up the idea in one line: from the photo to the legal safety report.",
      },

      { type: "h2", id: "autosgsst", text: "The AutoSGSST case" },
      {
        type: "p",
        text: "**AutoSGSST** (autosgsst.vercel.app) is a real, in-production example of all of the above applied to a very concrete pain: **SG-SST**, the occupational safety and health management system that Colombian law requires of every company. Documenting it by hand is slow, repetitive and easy to leave incomplete.",
      },
      {
        type: "p",
        text: "The promise is direct: **from the photo to the legal report**. You inspect with the camera or run a voice interview, the AI analyzes the evidence and writes the full report (findings, causes, actions and plan) ready to download as Word, PDF or audio. It's not a faster form: it's the finished document.",
      },
      {
        type: "p",
        text: "It currently has 8 of 10 modules in service, and each one is a specialized agent:",
      },
      {
        type: "table",
        head: ["Module", "What the agent does"],
        rows: [
          { cells: ["Annual work plan", "Builds the SG-SST plan with objectives, targets, indicators and a 12-month PDCA schedule."] },
          { cells: ["Safety inductions", "Generates the syllabus by role and sector, with assessment and commitments."] },
          { cells: ["Training program", "Annual program with objectives, owners and schedule."] },
          { cells: ["Job hazard analysis", "You describe the task and it returns hazards, controls, PPE and safe procedure."] },
          { cells: ["PPE inspections", "You upload a photo and vision builds the checklist: helmet, gloves, goggles, boots, ear protection."], highlight: true },
          { cells: ["Accident investigation", "Voice interview; it writes findings, causes and action plan."] },
          { cells: ["Internal audit", "Report against Resolution 0312, with strengths and recommendations."] },
          { cells: ["Corrective actions", "From the findings, it generates the log with cause, owners, dates and verification."] },
        ],
      },
      {
        type: "figure",
        seed: "autosgsst-modulos-agentes",
        image: "/blog/autosgsst-modulos.jpg",
        chip: "AutoSGSST",
        caption: "Each module is an agent specialized in one part of the safety system.",
      },
      {
        type: "callout",
        variant: "info",
        label: "To try it:",
        text: "there's a free 3-day trial with every module and no credit card. It's the fastest way to see the full flow, from evidence to document.",
      },

      { type: "h2", id: "xentris", text: "How Xentris got into automation" },
      {
        type: "p",
        text: "Here's the part I find most interesting as an engineer. Technology alone doesn't make a good compliance product: you need to know **what** a legal report must say for it to hold up in an audit. That's why AutoSGSST wasn't born in a technical vacuum.",
      },
      {
        type: "p",
        text: "**Xentris Tech** (xentris.tech) built the platform together with **Rafael Soto** (rafael.xentris.tech), an HSEQ consultant with 20+ years in occupational safety across energy, oil & gas and industry. It's the model that works: **human domain expertise + AI agents**. The AI was trained on Colombian safety legislation and on the judgment of someone who has lived audits from the inside.",
      },
      {
        type: "quote",
        text: "It's not just another safety software. It's an intelligent system.",
      },
      {
        type: "p",
        text: "That's the difference between digitizing a form and automating judgment. Xentris took a consultant's knowledge and turned it into an agent that answers, writes and documents the way he would, available 24/7.",
      },

      { type: "h2", id: "colombia", text: "A value proposition for Colombia" },
      {
        type: "p",
        text: "In Colombia, SG-SST isn't optional. **Decree 1072 of 2015** and **Resolution 0312 of 2019** require companies, regardless of size, to implement and document their safety system, and to sustain it for audits, the RUC or certifications like ISO 45001. For thousands of small businesses, that means hiring expensive consulting or staying exposed to penalties.",
      },
      {
        type: "p",
        text: "AutoSGSST's value proposition is to close that gap: put an expert consultant's judgment within reach of any company, at the cost of software rather than hours of advice. It's technology built from and for the Colombian context, not an imported template.",
      },

      { type: "h2", id: "lo-bueno", text: "Why this matters" },
      {
        type: "p",
        text: "Beyond SG-SST, AutoSGSST is a glimpse of where useful software is headed:",
      },
      {
        type: "ul",
        items: [
          "**Tedious work gets delegated.** Writing, organizing and formatting stop eating human hours.",
          "**Expert knowledge scales.** One consultant no longer serves ten companies; their judgment, turned into an agent, serves a thousand.",
          "**Input becomes natural.** A photo or a conversation replaces endless forms.",
          "**The deliverable is formal.** What comes out is a legal document, not a screen you still have to write up.",
          "**The human levels up.** They go from filling fields to deciding and approving.",
        ],
      },
      {
        type: "p",
        text: "That pattern (free evidence, an agent that interprets, a finished document) can be carried to contracts, health, accounting, legal or logistics. AutoSGSST is proof that it already works in production, on a real, regulated need.",
      },

      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "The era of the app on a smartphone isn't over, but it's no longer the ceiling. What comes next are agents that read, see and write: software that does the work and leaves you the judgment. AutoSGSST proves it in a field where mistakes are costly, and it does so from Colombia, pairing a consultant's experience with the power of AI.",
      },
      {
        type: "p",
        text: "If you want to see it working, go to autosgsst.vercel.app and try the full flow. And if there's a process in your company that's still done by hand (reading, interpreting, documenting), it's probably already automatable. That's what this moment is about.",
      },
    ],
  },
  {
    slug: "computacion-cuantica-ibm-interactuar-desde-tu-navegador",
    title: "Quantum computing: IBM lets you touch a real one from your browser",
    excerpt:
      "Since 2016 IBM has let anyone run code on a real quantum computer over the cloud. Ten years on, with processors like Nighthawk and a roadmap to 2029, here's what you can do today.",
    eyebrow: "Quantum · IBM",
    category: "Quantum computing",
    author: "Farid · Eathan",
    date: "2026-08-02",
    dateLabel: "August 2026",
    readTime: "8 min",
    tags: ["Quantum computing", "IBM Quantum", "Qubits", "Qiskit", "Nighthawk", "Quantum advantage", "Hardware", "Technology"],
    seed: "ibm-quantum-cloud-superposition",
    image: "/blog/ibmq-hero.jpg",
    suggestions: [
      "What is a qubit in simple terms?",
      "How do I try a quantum computer for free?",
      "What is quantum advantage and what arrives by 2029?",
    ],
    toc: [
      { id: "que-es", label: "What a quantum computer is" },
      { id: "interactuar", label: "What IBM built" },
      { id: "estado", label: "Where IBM stands today" },
      { id: "hoja-de-ruta", label: "The roadmap to 2029" },
      { id: "probarlo", label: "How you can try it yourself" },
      { id: "lo-bueno", label: "Why this is huge" },
      { id: "conclusion", label: "Conclusion" },
    ],
    blocks: [
      { type: "h2", id: "que-es", text: "What a quantum computer is" },
      {
        type: "p",
        text: "A regular computer processes **bits**: each one is a 0 or a 1. A quantum computer uses **qubits**, which thanks to superposition can represent 0 and 1 at the same time, and through entanglement correlate in ways impossible for a classical bit. The practical effect is that the computing space grows exponentially with every qubit you add.",
      },
      {
        type: "p",
        text: "The catch is that qubits are **fragile**: they lose their state at the slightest noise (decoherence). Keeping them stable and correcting their errors is the great challenge of quantum engineering, and that is exactly where IBM is betting hard.",
      },
      {
        type: "figure",
        seed: "ibm-quantum-superposition",
        chip: "IBM Quantum",
        caption: "A qubit isn't 0 or 1: while it computes, it's a blend of both. That's where its power comes from.",
      },

      { type: "h2", id: "interactuar", text: "What IBM built: interacting with a real one" },
      {
        type: "p",
        text: "Here's what you probably had in mind. On **May 4, 2016**, IBM put the first quantum computer on the cloud: for the first time, anyone in the world could run programs on a **real** 5-qubit quantum machine from their browser, without owning one. That service is called **IBM Quantum Platform** (formerly IBM Quantum Experience).",
      },
      {
        type: "p",
        text: "Access is handled with **Qiskit**, IBM's open-source development kit, in Python. In just a few lines of code you write a quantum circuit, send it to a real processor and get the results back. In 2026 that service turned **ten years old**, democratizing quantum computing.",
      },
      {
        type: "callout",
        variant: "info",
        label: "What matters:",
        text: "it's not a simulator. Your code runs on physical quantum hardware, cooled to near absolute zero inside an IBM data center. And there's a free plan (Open Plan) meant for learning and experimenting.",
      },

      { type: "h2", id: "estado", text: "Where IBM stands today" },
      {
        type: "p",
        text: "In 2026, **every** IBM quantum computer exceeds 100 qubits. The **Heron r3** processor reaches **156 qubits** with error rates around 1.17×10⁻³, and IBM runs the world's largest fleet of 100+ qubit machines (it has even demonstrated chips of up to 1,121 qubits).",
      },
      {
        type: "p",
        text: "In November 2025, at its developer conference, IBM unveiled two new processors that mark the next leap:",
      },
      {
        type: "table",
        head: ["Processor", "What it brings"],
        rows: [
          {
            highlight: true,
            cells: ["Nighthawk (120 qubits)", "218 tunable couplers and circuits ~30% more complex; scaling from 5,000 gates today to 15,000 by 2028."],
          },
          { cells: ["Loon (~112 qubits)", "First chip with every building block for error correction: long-range couplers, 3D wiring and fast qubit reset."] },
        ],
      },
      {
        type: "p",
        text: "The software improved too: Qiskit now runs **dynamic circuits** with 24% more accuracy at the 100+ qubit scale, exposes a C-API to integrate with classical supercomputing, and cut error mitigation cost by more than 100 times. It also achieved a real-time error decoder under **480 nanoseconds**, roughly 10 times faster than the competition.",
      },

      { type: "h2", id: "hoja-de-ruta", text: "The roadmap to 2029" },
      {
        type: "p",
        text: "Something rare in this field: IBM publishes a plan with dates and concrete hardware.",
      },
      {
        type: "ul",
        items: [
          "**2026**: demonstrate community-verified **quantum advantage**, with an open Quantum Advantage Tracker.",
          "**2028**: build **Starling**, a modular, error-corrected quantum supercomputer.",
          "**2029**: Starling available and fault-tolerant, with about 200 logical qubits able to run 100 million gates, from a new quantum data center in Poughkeepsie, New York.",
        ],
      },
      {
        type: "callout",
        variant: "warn",
        label: "An honest caveat:",
        text: "\"quantum advantage\" doesn't mean it replaces your laptop. It means solving specific problems (chemistry, materials, optimization) better than any classical supercomputer. For almost everything else, classical still wins.",
      },

      { type: "h2", id: "probarlo", text: "How you can try it yourself" },
      {
        type: "p",
        text: "The best part: you don't need a PhD or a lab to start.",
      },
      {
        type: "ul",
        items: [
          "Create a free account on IBM Quantum Platform.",
          "Install Qiskit (a single `pip install qiskit`) or use the web editor.",
          "Write a two-qubit circuit, send it to a real machine and compare it against the simulator.",
          "Learn from scratch with IBM's free courses, like the Qiskit Global Summer School.",
        ],
      },
      {
        type: "figure",
        seed: "ibm-quantum-platform-hello-world",
        image: "/blog/ibmq-hello-world.jpg",
        chip: "IBM Quantum",
        caption: "The IBM Quantum Platform in the browser: install Qiskit (pip install qiskit), run your first circuit and get 10 free minutes per month on real 100+ qubit processors.",
      },
      {
        type: "quote",
        text: "Programming a real quantum computer today fits in a few lines of code and a free account. That was science fiction ten years ago.",
      },

      { type: "h2", id: "lo-bueno", text: "Why this is huge" },
      {
        type: "p",
        text: "Beyond the hype, this is what makes IBM's approach special:",
      },
      {
        type: "ul",
        items: [
          "**Real, open access**: physical quantum hardware for anyone, free to start.",
          "**A delivered roadmap**: dates and real processors, not just promises.",
          "**A mature ecosystem**: Qiskit, documentation, courses and a decade-old community.",
          "**Transparency**: quantum advantage verified by the community, not by marketing.",
          "**It adds to classical**: quantum-centric computing that works with supercomputing, not against it.",
        ],
      },

      { type: "h2", id: "conclusion", text: "Conclusion" },
      {
        type: "p",
        text: "Quantum computing has stopped being lab-only science fiction: today you can touch a real quantum computer from your browser, for free, in about ten minutes. That, at its core, is what IBM built and has spent a decade refining.",
      },
      {
        type: "p",
        text: "And if 2029 lands as planned, with a fault-tolerant Starling, we'll move from \"experimenting\" to \"solving problems that are impossible today\". It's worth learning to program quantum now, while the field is still young and there's room to truly understand it.",
      },
    ],
  },
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
    image: "/blog/openjarvis-hero.jpg",
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
        type: "figure",
        seed: "openjarvis-quickstart-ollama",
        image: "/blog/openjarvis-quickstart.jpg",
        chip: "OpenJarvis",
        caption: "A single script (quickstart.sh) clones the repo, spins up Ollama with a local model and opens the chat in your browser. The cloud stays optional.",
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

# Embudo de clientes — Farid · Eathan (faridcomco)

> **Objetivo:** posicionar a Farid como **autoridad en IA / Machine Learning / automatización** en
> **Barranquilla y Colombia**, y convertir ese posicionamiento en **clientes**, con un embudo de
> **código propio** en el mismo sitio Next.js (sin SaaS de terceros).
>
> **Tipo de embudo:** *lead-magnet* → **Diagnóstico gratis de IA** que captura y **califica** al
> prospecto → nutrición → **llamada de descubrimiento** donde se cierra. Elegido porque los
> servicios son a medida y de alto valor: no se venden con un botón de "comprar", se venden en una
> conversación, y el diagnóstico gratuito demuestra la magia antes de pedir nada.

---

## 1. La oferta

- **Quién:** Farid Jiménez — IA aplicada, Data Science, **Machine Learning**, automatización, agentes IA, full stack, dashboards.
- **A quién:** pymes y empresas medianas de **Barranquilla y Colombia** con procesos manuales, datos sin explotar o ganas de usar IA sin tener equipo técnico.
- **Prueba local real:** [Sinagoga Beit Jasdó (Barranquilla)](https://sinagogabeitjasdo.com) · [AutoSGSST](https://autosgsst.vercel.app) · [Platim](https://platim.co) · [Yota Montacargas](https://yotamontacargas.com) · [DominioGPT](https://dominio.neona.tech).
- **Acción final deseada:** que el prospecto **agende una llamada** con Farid.

---

## 2. Mapa del embudo (una meta por paso)

| # | Paso / Página | Única meta | Métrica (objetivo hipótesis) |
|---|---|---|---|
| 1 | **Blog + SEO** (TOFU) | Que el lector haga clic al Diagnóstico | Visita → clic CTA · **3–6 %** |
| 2 | **Landing del Diagnóstico** `/diagnostico` | Que deje sus datos y su proceso | Visita → lead · **20–30 %** |
| 3 | **Gracias + mini-informe** | Que **agende la llamada** | Lead → llamada agendada · **10–20 %** |
| 4 | **Llamada de descubrimiento** | Convertir en cliente | Llamada → cliente · **25–40 %** |

**Nutrición (paralela):** si el lead no agenda de una, una secuencia corta de 3 correos (valor + caso + invitación) lo empuja de vuelta al paso 3.

> Regla: **una meta por página.** El blog no vende el servicio, solo lleva al diagnóstico. La landing
> no agenda la llamada, solo captura. Cada paso tiene un solo trabajo.

---

## 3. Escalera de precios

| Nivel | Qué es | Precio | Por qué |
|---|---|---|---|
| **Gancho** | Diagnóstico de IA (mini-informe) | **Gratis** | Demuestra valor, captura y **califica** el lead |
| **Entrada (opcional)** | Diagnóstico profundo / "Sprint de descubrimiento" | *Low-ticket* `[definir]` | Filtro de compromiso; convierte curiosos en compradores |
| **Principal** | Proyecto a medida (automatización, ML, agente, dashboard) | *Por cotización* | El grueso del ingreso; se cierra en la llamada |
| **Recurrente (upsell)** | Mantenimiento / soporte de agentes / dashboards vivos | *Mensual* `[definir]` | Ingreso recurrente y retención |

---

## 4. Esqueleto de copy por página

### Paso 2 — Landing del Diagnóstico (`/diagnostico`)
- **Promesa (H1):** "Descubre en qué parte de tu negocio la IA te ahorraría tiempo y plata — gratis."
- **Sub-promesa:** "Cuéntame un proceso de tu empresa y te devuelvo un mini-diagnóstico con dónde automatizar y qué esperar. Sin compromiso."
- **Prueba:** logos/enlaces de proyectos reales (Sinagoga Beit Jasdó, AutoSGSST, Platim) · `[testimonio real aquí]`.
- **Objeciones a derribar:** "¿es gratis de verdad?" (sí, es cómo trabajo) · "no tengo equipo técnico" (justo por eso) · "mis datos" (privacidad + mínimo dato necesario).
- **Formulario (mínimo dato):** nombre · correo · empresa (opcional) · **"¿Qué proceso quieres mejorar?"** (texto libre) · ciudad (para el ángulo local).
- **CTA literal del botón:** **"Quiero mi diagnóstico gratis"**

### Paso 3 — Gracias + mini-informe
- **Promesa:** "¡Listo! Tu diagnóstico está en camino a tu correo."
- **Sub:** "Mientras tanto, agenda 20 min con Farid para revisarlo juntos y ver cómo aplicarlo."
- **CTA literal:** **"Agendar mi llamada"** (link de agenda propia/embed).
- **Prueba:** 1–2 casos con resultado `[cifra real aquí]`.

### Paso 1 — CTA en el blog (al final de cada artículo)
- **Promesa:** "¿Esto le sirve a tu negocio? Pídeme un diagnóstico gratis de IA."
- **CTA literal:** **"Diagnóstico gratis"** → `/diagnostico`

> **Honestidad:** ningún testimonio ni cifra inventada. Los `[... real aquí]` los llena Farid con
> pruebas verificables.

---

## 5. Plan de contenido / SEO (la autoridad)

Estrategia de **clusters temáticos** (un artículo pilar + satélites que enlazan al pilar), cada uno
con CTA al diagnóstico. Mezcla intención **local** (Barranquilla/Colombia) + **de servicio** (ML/IA).

### Cluster A — IA y automatización para empresas en Colombia
- Pilar: "Cómo una empresa en Colombia empieza a usar IA (sin equipo técnico)"
- Satélites: automatización de procesos · IA para pymes · casos por sector (comercio, industria, salud).
- Keywords: `inteligencia artificial para empresas Colombia`, `automatización de procesos Barranquilla`, `desarrollador de IA en Barranquilla`.

### Cluster B — Machine Learning aplicado
- Pilar: "Qué es Machine Learning y qué problemas reales resuelve en un negocio"
- Satélites: predicción de fuga de clientes · pronóstico de inventario · detección de fallas (¡ya son los demos del home!).
- Keywords: `machine learning Colombia`, `modelos predictivos para negocios`, `ciencia de datos Barranquilla`.

### Cluster C — Agentes de IA y servicios de Farid
- Pilar: "Del software al agente: qué hace un agente de IA por tu empresa" (enlaza a los artículos ya publicados de Bob y orquestadores).
- Satélites: dashboards que explican datos · integración de APIs · casos (AutoSGSST, Sinagoga).

**AI-SEO / GEO:** ya hay `llms.txt`, JSON-LD `Person` y sitemap con hreflang. Añadir JSON-LD
`Service` y `LocalBusiness` (Barranquilla) para búsqueda local y para que los LLMs citen a Farid.
Apoyarse en los skills `ai-seo`, `reconocimiento-seo` y `seo-optimizer`.

---

## 6. Construcción "código propio" (sobre faridcomco, Next.js)

| Pieza | Cómo se construye | Skill/base |
|---|---|---|
| **Artículos del blog** | Motor de bloques tipados existente (`lib/blog.ts`), bilingüe | `xentris-blog-engine` |
| **Landing `/diagnostico`** | Nueva ruta App Router con los componentes del sitio | `xentris-landing-marca-ia` |
| **Captura de leads** | Form → **`/api` propia** → correo a Farid con **Resend** + guardar en **MySQL** (backend ya existe) | `xentris-formulario-resend` |
| **CTA en artículos** | Bloque/`callout` reutilizable al cierre de cada post → `/diagnostico` | edición de `article-body` |
| **Agenda de la llamada** | Enlace/embed de agenda `[Cal.com propio o link]` en la página de gracias | `[decidir]` |
| **Nutrición por correo** | Secuencia simple disparada desde la `/api` (Resend) | `xentris-formulario-resend` |
| **Medición** | Eventos propios (clic CTA, lead, agenda) en la base o analítica del sitio | `[decidir herramienta]` |

**Privacidad:** mínimo dato necesario, aviso de tratamiento de datos (Ley 1581 Colombia), correo real,
nunca endpoints de terceros no acordados.

---

## 7. Orden de construcción sugerido (una cosa a la vez)

1. **Landing `/diagnostico` + captura (Resend + MySQL)** — el destino del embudo. Sin esto, el tráfico no convierte. *(código propio)*
2. **CTA reutilizable al cierre de los artículos** → apunta a `/diagnostico`.
3. **Primer artículo pilar SEO** (Cluster A o B) — arranca la autoridad.
4. **JSON-LD `Service` + `LocalBusiness` (Barranquilla)** y ajustes AI-SEO.
5. **Página de gracias + agenda de llamada.**
6. **Satélites del cluster** (1–2 por semana) + medición y ajuste.

> **Pendiente de Farid:** definir precios de los niveles pagos, la herramienta de agenda, y aportar
> testimonios/cifras reales para reemplazar los `[... real aquí]`.

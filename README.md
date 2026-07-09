<p align="center">
  <img src="public/farid.svg" alt="Farid · Eathan" width="96" />
</p>

<h1 align="center">farid.com.co</h1>

<p align="center">
  Landing de marca personal de IA de <strong>Farid Enrique "Eathan" Jiménez Campo</strong> —
  AI Engineer · Data Scientist · Full Stack Developer.
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react" />
  <img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwindcss" />
  <img alt="MySQL" src="https://img.shields.io/badge/MySQL-mysql2-4479a1?logo=mysql&logoColor=white" />
  <img alt="i18n" src="https://img.shields.io/badge/i18n-es%20%2F%20en-7c6cff" />
</p>

---

Sitio personal premium (dark tech) que no solo cuenta lo que hace Farid, sino que lo **demuestra**:
un gemelo digital de IA ("Eathan") que responde en vivo y por voz, herramientas de IA reales que
cualquiera puede usar, y un panel para administrar proyectos, leads y comentarios.
Construido con Next.js 16 (App Router) y datos dinámicos en MySQL, con degradación elegante para que
**nunca se caiga** aunque falle la IA o la base de datos.

**Bilingüe (es/en)**: el español vive en la raíz y el inglés en `/en`, con detección automática por
idioma del navegador y `hreflang` para que Google indexe ambas versiones.

## Características

### Landing
- **Hero "esfera neuronal" `</FARID>`** con saludo contextual real (hora, idioma, origen, nº de visita).
- **Selector de audiencia** (Reclutador / Cliente / Aliado) que personaliza mensajes y ejemplos.
- **Stack en capas**: diagrama interactivo del stack de IA (orquestación → modelos → frameworks → datos).
  No es un carrusel de logos: al enfocar una capa explica qué se construye ahí.
- **El viaje de un dato**: un registro atraviesa el pipeline y se transforma de fila muerta a decisión.
  Rota entre casos curados y se adapta a la audiencia. El botón *"otro ejemplo"* llama a la IA
  **solo al hacer clic**, así la home sigue siendo estática (cero coste y cero latencia por visita).
- **Proyectos** con capturas reales de los sitios en producción (nada de fotos de stock).
- **vCard digital** con código QR y descarga `.vcf`.
- Galaxia de habilidades, trayectoria, credenciales y formulario de contacto.

### IA
- **Eathan**, chatbot con **modo voz** (dictado + lectura en voz alta, Web Speech API) y un orbe reactivo.
- **Diagnóstico de IA en 60s** (`/diagnostico`): 5 preguntas → mini-plan personalizado.
- **Playground de IA** (`/playground`): pega un texto y obtén resumen, sentimiento, tono y palabras clave.
- **Blog** (`/blog`) con chat por voz anclado al artículo ("Pregúntale a este artículo") y comentarios moderados.
- Todas las APIs de IA responden **en el idioma de la página**.

### SEO / AI-SEO
- `hreflang` (es / en / x-default), canonical y `og:locale` por idioma.
- Datos estructurados **JSON-LD (Person)**, `sitemap.xml` con alternates y `llms.txt`
  para que ChatGPT, Perplexity y demás entiendan quién es Farid.
- Accesibilidad: `h1` semántico, foco visible, patrón de tabs accesible y `prefers-reduced-motion`.

> [!TIP]
> Todo degrada con elegancia. Sin `OPENAI_API_KEY`, el chatbot y las herramientas responden con
> lógica local. Sin base de datos, los proyectos y servicios salen del respaldo en `lib/profile.ts`.

## Stack

Next.js 16.2.9 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · Motion · OpenAI · MySQL (`mysql2`).

> [!IMPORTANT]
> En este Next.js el *middleware* se llama **`proxy.ts`** (está en la raíz del repo).
> Ahí vive la detección de idioma. Lee `node_modules/next/dist/docs/` antes de asumir APIs.

## Empezar

> [!NOTE]
> Requisitos: Node.js 20+ y npm. La base de datos es opcional en local.

```bash
npm install
npm run dev        # http://localhost:3000
```

Producción:

```bash
npm run build
npm run start
```

## Variables de entorno

Crea un archivo `.env.local` (no se sube a git):

```bash
# OpenAI — solo servidor. Nunca llega al navegador.
OPENAI_API_KEY=
OPENAI_ORG_ID=            # opcional
OPENAI_MODEL=gpt-4o-mini

# Base de datos MySQL (en el servidor el host es localhost)
DB_HOST=localhost
DB_PORT=3306
DB_NAME=tu_base
DB_USER=tu_usuario
DB_PASS=tu_password       # se prefieren estas variables sobre DATABASE_URL
DATABASE_URL=mysql://usuario:password@localhost:3306/tu_base

# Clave del panel /admin (larga y secreta)
ADMIN_SECRET=
```

## Bilingüe (es / en)

| | |
|---|---|
| **Español** | Raíz sin prefijo: `/`, `/blog`, `/diagnostico` |
| **Inglés** | Bajo `/en`: `/en`, `/en/blog`, `/en/diagnostico` |

Se eligió así para **no perder el SEO** de las URLs ya indexadas. Cómo funciona:

- `proxy.ts` detecta el idioma del navegador (`Accept-Language`). Si prefiere inglés, redirige la raíz
  a `/en`; si no, reescribe internamente a `/es` manteniendo la URL limpia. Una cookie recuerda la
  elección del botón **ES/EN**.
- Todo el texto visible vive en **`lib/content.ts`** (objetos `es` y `en`, con la misma forma).
  Los componentes lo leen con `useI18n()` desde `components/i18n.tsx`.

> [!WARNING]
> **No edites los textos en `lib/profile.ts`.** Ahí solo quedan datos que no se traducen (enlaces,
> contacto) y los arrays `services`/`projects` que sirven de **respaldo de las APIs** si la DB falla.
> Cambiarlos **no** modifica lo que se ve en la web.

## Base de datos

La app usa **`mysql2`** directamente. Como en producción la DB vive en `localhost` del servidor
(Hostinger), la creación de tablas y el seed corren **desde el servidor** mediante un endpoint protegido:

```
GET /api/admin/migrate?secret=TU_ADMIN_SECRET
```

Crea las tablas `projects`, `services`, `leads` y `comments`, e inserta los datos iniciales.
Responde con un JSON confirmando los conteos.

> [!WARNING]
> Si la contraseña de `DATABASE_URL` contiene caracteres especiales (`#`, `@`, `/`…), deben ir
> codificados (`#` → `%23`). Usar las variables `DB_*` individuales evita ese problema.

## Panel de administración

`/admin` está protegido con `ADMIN_SECRET` (cookie httpOnly). Permite:

- Ver los leads del formulario y del diagnóstico, y marcarlos como atendidos.
- Activar u ocultar proyectos.
- Moderar comentarios del blog (aprobar / ocultar / borrar). Nada se publica sin aprobación.

## Estructura

```
proxy.ts                  Detección de idioma (el "middleware" de Next 16)
app/
  [lang]/
    layout.tsx            <html lang>, metadata + hreflang, JSON-LD Person
    page.tsx              Ensambla la landing
    blog/                 Índice y artículo (chat por voz + comentarios)
    diagnostico/          Herramienta: diagnóstico de IA en 60s
    playground/           Herramienta: análisis de texto con IA
    admin/                Panel: leads, proyectos y comentarios
  api/
    ask/                  Chatbot Eathan (OpenAI + fallback local)
    data-journey/         Genera un pipeline de ejemplo (solo al hacer clic)
    blog-ask/             Chat anclado al artículo
    diagnostico/          Informe de IA + captura de lead
    playground/           Análisis de texto
    comments/             Comentarios (GET aprobados, POST con anti-spam)
    contact/              Recibe y guarda leads
    admin/migrate         Crea tablas + seed (protegido)
  sitemap.ts robots.ts    SEO (sitemap con alternates por idioma)
components/
  i18n.tsx                I18nProvider + useI18n()
  lang-toggle.tsx         Botón ES/EN (recuerda con cookie)
  ai-stack.tsx            Stack de IA por capas
  data-journey.tsx        El viaje de un dato
  ...                     Resto de secciones
lib/
  i18n.ts                 Locales, detección y localizedHref()
  content.ts              TODO el texto visible, en es/en
  profile.ts              Datos que no se traducen + respaldo de las APIs
  knowledge.ts            Conocimiento/tono del chatbot
  mysql.ts                Conexión mysql2 + helper de consulta
  data.ts                 Lecturas con fallback a profile.ts
public/
  projects/               Capturas reales de los sitios del portafolio
  llms.txt                Resumen del sitio para buscadores de IA
```

## ¿Dónde edito cada cosa?

| Quiero cambiar… | Archivo |
|---|---|
| **Cualquier texto de la web (es/en)** | `lib/content.ts` |
| Enlaces, contacto, WhatsApp, foto | `lib/profile.ts` |
| Artículos del blog | `lib/blog.ts` |
| Preguntas del diagnóstico | `lib/diagnostico.ts` |
| Conocimiento/tono del chatbot | `lib/knowledge.ts` |
| Detección de idioma / rutas | `proxy.ts` + `lib/i18n.ts` |
| Colores y estilo global | `app/globals.css` |
| Capturas del portafolio | `public/projects/` + mapa `SHOTS` en `components/projects.tsx` |

## Despliegue

Alojado en **Hostinger** (plan Cloud Startup, app Node.js) con despliegue automático:
cada `git push` a `main` publica la nueva versión (~45 s). No requiere pasos manuales.

> [!CAUTION]
> **Purga el CDN después de cada deploy.** Hostinger sirve el sitio tras su CDN. La raíz `/` se
> refresca sola (el `proxy.ts` la reescribe y no se cachea), pero **`/en` y otras rutas pueden
> quedarse sirviendo el build anterior**.
>
> Para comprobar si el problema es el CDN, consulta el origen saltándotelo:
>
> ```bash
> curl -k --resolve farid.com.co:443:82.197.84.157 https://farid.com.co/en
> ```
>
> Si el origen está bien, purga la caché desde hPanel (o con el MCP de Hostinger). A veces hay que
> hacerlo dos veces y esperar ~1 minuto.

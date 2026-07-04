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
</p>

---

Sitio personal premium (dark tech) que no solo cuenta lo que hace Farid, sino que lo **demuestra**:
un gemelo digital de IA ("Eathan") que responde en vivo, una demo de idea → solución, y un panel
para administrar proyectos y leads. Construido con Next.js 16 (App Router) y datos dinámicos en MySQL,
con degradación elegante para que **nunca se caiga** aunque falle la IA o la base de datos.

## Características

- **Hero "esfera neuronal" `</FARID>`** con saludo contextual real (hora, idioma, origen, nº de visita).
- **Eathan**, chatbot con IA (OpenAI) y respuesta local de respaldo si no hay API key.
- **Demo en vivo** idea → solución con IA.
- **Formulario de contacto** que guarda los mensajes como *leads* en MySQL.
- **Panel `/admin`** protegido para revisar leads y activar/ocultar proyectos.
- **vCard digital** con código QR y descarga `.vcf`.
- Selector de audiencia (Reclutador / Cliente / Aliado), galaxia de habilidades, trayectoria,
  proyectos con efecto *glow*, credenciales y sección AIDA.
- Accesibilidad (h1 semántico, foco visible, `prefers-reduced-motion`) y SEO (`robots`, `sitemap`, metadata).

## Stack

Next.js 16.2.9 (App Router, Turbopack) · React 19 · Tailwind CSS v4 · Motion · OpenAI · MySQL (`mysql2`).

## Empezar

> [!NOTE]
> Requisitos: Node.js 20+ y npm. La base de datos es opcional en local (ver más abajo).

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
# OpenAI — solo servidor (app/api/ask). Nunca llega al navegador.
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

> [!TIP]
> Sin `OPENAI_API_KEY`, el chatbot y la demo siguen funcionando con respuestas locales.
> Sin base de datos, proyectos y servicios se muestran desde `lib/profile.ts` (fallback).

## Base de datos

La app usa **`mysql2`** directamente. Como en producción la DB vive en `localhost` del servidor
(Hostinger), la creación de tablas y el seed corren **desde el servidor** mediante un endpoint protegido:

```
GET /api/admin/migrate?secret=TU_ADMIN_SECRET
```

Crea las tablas `projects`, `services` y `leads` e inserta los datos iniciales de `lib/profile.ts`.
Responde con un JSON confirmando los conteos.

> [!WARNING]
> Si la contraseña de `DATABASE_URL` contiene caracteres especiales (`#`, `@`, `/`…), deben ir
> codificados (`#` → `%23`). Usar las variables `DB_*` individuales evita ese problema.

## Panel de administración

`/admin` está protegido con `ADMIN_SECRET` (cookie httpOnly). Permite:

- Ver los leads del formulario de contacto y marcarlos como atendidos.
- Activar u ocultar proyectos.

## Estructura

```
app/
  page.tsx              Ensambla todas las secciones
  layout.tsx            Metadata, fuentes, skip link
  api/ask/route.ts      Chatbot Eathan (OpenAI + fallback)
  api/contact/route.ts  Recibe y guarda leads
  api/projects|services Datos públicos (JSON)
  api/admin/migrate     Crea tablas + seed (protegido)
  admin/                Panel: leads y proyectos
components/             Secciones (hero, contacto, proyectos, chat, ...)
lib/
  profile.ts            Fuente de datos y textos (perfil, servicios, proyectos)
  knowledge.ts          Conocimiento/tono del chatbot
  mysql.ts              Conexión mysql2 + helper de consulta
  data.ts               Lecturas con fallback a profile.ts
```

## ¿Dónde edito cada cosa?

| Quiero cambiar… | Archivo |
|---|---|
| Datos, servicios, proyectos, textos | `lib/profile.ts` |
| Conocimiento/tono del chatbot | `lib/knowledge.ts` |
| Colores y estilo global | `app/globals.css` |
| Secciones | `components/*.tsx` |
| Endpoint del chatbot | `app/api/ask/route.ts` |

## Despliegue

Alojado en **Hostinger** con despliegue automático: cada `git push` a `main` publica la nueva versión.
No requiere pasos manuales; tras el deploy, la app se autoconfigura leyendo las variables de entorno del panel.

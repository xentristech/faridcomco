# farid.com.co — Marca personal de IA (Farid "Eathan" Jiménez)

Landing personal premium (dark tech) construida con **Next.js 16 + Tailwind v4 + Motion**.
Incluye vCard digital con QR, chatbot con IA real (OpenAI), demo "idea → solución",
modo Reclutador/Cliente/Aliado, galaxia de habilidades, timeline, mapa y SEO.

## Arrancar en local

```bash
npm install
npm run dev      # http://localhost:3000
```

Producción:

```bash
npm run build
npm run start
```

## Variables de entorno (`.env.local`)

```
OPENAI_API_KEY=...      # usado SOLO en el servidor (app/api/ask), nunca en el navegador
OPENAI_ORG_ID=...       # opcional
OPENAI_MODEL=gpt-4o-mini
```

Sin `OPENAI_API_KEY`, el chatbot y la demo siguen funcionando con respuestas locales
basadas en el perfil (modo fallback).

## ⚠️ Qué te falta completar

Edita **`lib/profile.ts`**. Busca los comentarios `// TODO`:

- `whatsapp` y `whatsappLabel` → tu número real de WhatsApp.
- `linkedin`, `github`, `credly` → tus enlaces reales.

**Tu foto:** copia tu foto a `public/farid.jpg` y cambia `photo: "/farid.svg"`
por `photo: "/farid.jpg"` en `lib/profile.ts` (ahora hay un avatar de marca de placeholder).

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| Datos, servicios, proyectos, textos | `lib/profile.ts` |
| Conocimiento/tono del chatbot | `lib/knowledge.ts` |
| Colores y estilo global | `app/globals.css` |
| Secciones | `components/*.tsx` |
| Endpoint del chatbot | `app/api/ask/route.ts` |

## Estructura

- `app/page.tsx` — ensambla todas las secciones.
- `components/particle-field.tsx` — red neuronal interactiva del hero (canvas).
- `components/ask-ai.tsx` — chatbot flotante "Pregúntale a mi IA".
- `components/idea-demo.tsx` — demo en vivo idea → solución.
- `components/vcard.tsx` + `lib/vcard.ts` — tarjeta digital, QR y descarga `.vcf`.

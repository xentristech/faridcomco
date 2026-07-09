import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TextLab } from "@/components/playground/text-lab";
import { Flask, Lightning, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { isLocale, localizedHref, type Locale } from "@/lib/i18n";

const T = {
  es: {
    metaTitle: "Playground de IA: analiza cualquier texto en vivo",
    metaDesc:
      "Pega un texto y la IA te devuelve al instante un resumen, el sentimiento, el tono y las palabras clave. Una demo gratis de IA aplicada a texto, por Farid (Eathan).",
    keywords: ["playground de IA", "análisis de sentimiento", "analizar texto con IA", "procesamiento de lenguaje natural", "demo de IA gratis", "NLP español"],
    ogDesc: "Resumen, sentimiento, tono y palabras clave de cualquier texto, al instante. Una demo de IA aplicada.",
    eyebrow: "Playground de IA",
    h1pre: "Analiza cualquier texto ",
    h1grad: "con IA, en vivo",
    sub: "Pega un comentario, una reseña o un correo y mira cómo la IA de Farid extrae el resumen, el sentimiento, el tono y las palabras clave al instante.",
    perks: ["Resultado al instante", "IA aplicada a texto", "Gratis, sin registro"],
  },
  en: {
    metaTitle: "AI Playground: analyze any text live",
    metaDesc:
      "Paste a text and AI instantly returns a summary, sentiment, tone and keywords. A free demo of AI applied to text, by Farid (Eathan).",
    keywords: ["AI playground", "sentiment analysis", "analyze text with AI", "natural language processing", "free AI demo", "NLP"],
    ogDesc: "Summary, sentiment, tone and keywords of any text, instantly. A demo of applied AI.",
    eyebrow: "AI Playground",
    h1pre: "Analyze any text ",
    h1grad: "with AI, live",
    sub: "Paste a comment, a review or an email and watch Farid's AI pull the summary, sentiment, tone and keywords instantly.",
    perks: ["Instant result", "AI applied to text", "Free, no signup"],
  },
};

export async function generateMetadata(
  props: PageProps<"/[lang]/playground">
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const t = T[locale];
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    keywords: t.keywords,
    alternates: {
      canonical: localizedHref("/playground", locale),
      languages: {
        es: localizedHref("/playground", "es"),
        en: localizedHref("/playground", "en"),
        "x-default": localizedHref("/playground", "es"),
      },
    },
    openGraph: { title: t.metaTitle, description: t.ogDesc, type: "website", url: localizedHref("/playground", locale) },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.ogDesc },
  };
}

const perkIcons = [Lightning, Flask, ShieldCheck];

export default async function PlaygroundPage(props: PageProps<"/[lang]/playground">) {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const t = T[locale];
  return (
    <>
      <Nav />
      <main id="main" className="px-4 pb-24 pt-28 sm:px-6">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            {t.h1pre}
            <span className="text-gradient">{t.h1grad}</span>
          </h1>
          <p className="mt-4 text-[var(--text-dim)]">{t.sub}</p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[var(--text-faint)]">
            {t.perks.map((label, i) => {
              const Ico = perkIcons[i];
              return (
                <span key={label} className="inline-flex items-center gap-1.5">
                  <Ico size={16} weight="fill" className="text-[var(--accent-cyan)]" />
                  {label}
                </span>
              );
            })}
          </div>
        </header>

        <TextLab />
      </main>
      <Footer />
    </>
  );
}

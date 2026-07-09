import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DiagnosticoWizard } from "@/components/diagnostico/wizard";
import { Sparkle, Clock, ShieldCheck } from "@phosphor-icons/react/dist/ssr";
import { isLocale, localizedHref, type Locale } from "@/lib/i18n";

const T = {
  es: {
    metaTitle: "Diagnóstico de IA gratis en 60 segundos",
    metaDesc:
      "Responde 5 preguntas y recibe un plan de inteligencia artificial personalizado para tu negocio: qué automatizar, qué stack usar y el primer paso. Gratis y en 60 segundos.",
    keywords: ["diagnóstico de IA", "inteligencia artificial para negocios", "automatización con IA", "consultoría de IA", "IA para empresas", "test de IA gratis"],
    ogDesc: "Un plan de IA personalizado para tu negocio en 60 segundos: qué automatizar, qué stack y el primer paso.",
    eyebrow: "Herramienta gratuita",
    h1pre: "Diagnóstico de IA para tu negocio ",
    h1grad: "en 60 segundos",
    sub: "Responde 5 preguntas y la IA de Farid te arma un mini-plan: qué automatizar, qué stack usar y el primer paso concreto para tu caso.",
    perks: ["Toma 60 segundos", "Generado con IA", "Gratis, sin registro"],
  },
  en: {
    metaTitle: "Free AI diagnosis in 60 seconds",
    metaDesc:
      "Answer 5 questions and get a personalized artificial-intelligence plan for your business: what to automate, what stack to use and the first step. Free and in 60 seconds.",
    keywords: ["AI diagnosis", "artificial intelligence for business", "AI automation", "AI consulting", "AI for companies", "free AI test"],
    ogDesc: "A personalized AI plan for your business in 60 seconds: what to automate, what stack and the first step.",
    eyebrow: "Free tool",
    h1pre: "AI diagnosis for your business ",
    h1grad: "in 60 seconds",
    sub: "Answer 5 questions and Farid's AI builds you a mini-plan: what to automate, what stack to use and the concrete first step for your case.",
    perks: ["Takes 60 seconds", "Generated with AI", "Free, no signup"],
  },
};

export async function generateMetadata(
  props: PageProps<"/[lang]/diagnostico">
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const t = T[locale];
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    keywords: t.keywords,
    alternates: {
      canonical: localizedHref("/diagnostico", locale),
      languages: {
        es: localizedHref("/diagnostico", "es"),
        en: localizedHref("/diagnostico", "en"),
        "x-default": localizedHref("/diagnostico", "es"),
      },
    },
    openGraph: { title: `${t.metaTitle} — Farid · Eathan`, description: t.ogDesc, type: "website", url: localizedHref("/diagnostico", locale) },
    twitter: { card: "summary_large_image", title: t.metaTitle, description: t.ogDesc },
  };
}

const perkIcons = [Clock, Sparkle, ShieldCheck];

export default async function DiagnosticoPage(props: PageProps<"/[lang]/diagnostico">) {
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

        <DiagnosticoWizard />
      </main>
      <Footer />
    </>
  );
}

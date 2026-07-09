import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { profile } from "@/lib/profile";
import { locales, isLocale, localizedHref, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";
import { I18nProvider } from "@/components/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Prerenderiza ambos idiomas (es / en).
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

const meta = {
  es: {
    title: `${profile.name} — AI Engineer & Data Scientist`,
    description:
      "Farid Enrique “Eathan” Jiménez Campo. AI Engineer, Data Scientist y Full Stack Developer. Convierto datos e IA en decisiones inteligentes: automatización, agentes IA, dashboards y desarrollo de software.",
    ogLocale: "es_CO",
  },
  en: {
    title: `${profile.name} — AI Engineer & Data Scientist`,
    description:
      "Farid Enrique “Eathan” Jiménez Campo. AI Engineer, Data Scientist and Full Stack Developer. I turn data and AI into smart decisions: automation, AI agents, dashboards and software development.",
    ogLocale: "en_US",
  },
} as const;

export async function generateMetadata(
  props: LayoutProps<"/[lang]">
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const m = meta[locale];

  return {
    metadataBase: new URL(profile.web),
    title: { default: m.title, template: `%s — Farid Jiménez` },
    description: m.description,
    keywords: [
      "Farid Jiménez",
      "Eathan",
      "AI Engineer",
      "Data Scientist",
      "Full Stack Developer",
      "Inteligencia Artificial",
      "Machine Learning",
      "Automatización",
      "Agentes IA",
      "Barranquilla",
      "Colombia",
    ],
    authors: [{ name: profile.name, url: profile.web }],
    creator: profile.name,
    alternates: {
      canonical: localizedHref("/", locale),
      languages: {
        es: localizedHref("/", "es"),
        en: localizedHref("/", "en"),
        "x-default": localizedHref("/", "es"),
      },
    },
    openGraph: {
      type: "profile",
      locale: m.ogLocale,
      url: localizedHref("/", locale),
      siteName: profile.name,
      title: m.title,
      description: m.description,
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
    robots: { index: true, follow: true },
    category: "technology",
  };
}

export const viewport: Viewport = {
  themeColor: "#05060c",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  // Datos estructurados (AI-SEO): Person + su sitio. Ayuda a Google y a los
  // buscadores de IA (ChatGPT, Perplexity) a entender quién es Farid.
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: "Eathan",
    url: localizedHref("/", lang) === "/" ? profile.web : `${profile.web}/en`,
    jobTitle:
      lang === "en"
        ? "AI Engineer, Data Scientist & Full Stack Developer"
        : "Ingeniero de IA, Científico de Datos y Desarrollador Full Stack",
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: "Barranquilla", addressCountry: "CO" },
    sameAs: [profile.linkedin, profile.github, profile.credly],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "LLMs",
      "AI Agents",
      "Automation",
      "Full Stack Development",
    ],
  };

  return (
    <html
      lang={lang}
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        {/* Fuentes del Hero (esfera neuronal): JetBrains Mono + Inter + Noto Sans multiescritura */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          precedence="high"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans:wght@500;600&family=Noto+Sans+JP:wght@500;700&family=Noto+Sans+SC:wght@500;700&family=Noto+Sans+KR:wght@500;700&family=Noto+Sans+Arabic:wght@500;700&family=Noto+Sans+Hebrew:wght@500&family=Noto+Sans+Devanagari:wght@500&display=swap"
        />
        <a href="#main" className="skip-link">
          {lang === "en" ? "Skip to content" : "Saltar al contenido"}
        </a>
        <div className="grain" aria-hidden />
        <I18nProvider locale={lang}>{children}</I18nProvider>
      </body>
    </html>
  );
}

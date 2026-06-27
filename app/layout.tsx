import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/lib/profile";

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

const description =
  "Farid Enrique “Eathan” Jiménez Campo. AI Engineer, Data Scientist y Full Stack Developer. Convierto datos e IA en decisiones inteligentes: automatización, agentes IA, dashboards y desarrollo de software.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.web),
  title: {
    default: `${profile.name} — AI Engineer & Data Scientist`,
    template: `%s — Farid Jiménez`,
  },
  description,
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    locale: "es_CO",
    url: profile.web,
    siteName: profile.name,
    title: `${profile.name} — AI Engineer & Data Scientist`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Engineer & Data Scientist`,
    description,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#05060c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body>
        {/* Fuentes del Hero (esfera neuronal): JetBrains Mono + Inter + Noto Sans multiescritura */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          precedence="high"
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans:wght@500;600&family=Noto+Sans+JP:wght@500;700&family=Noto+Sans+SC:wght@500;700&family=Noto+Sans+KR:wght@500;700&family=Noto+Sans+Arabic:wght@500;700&family=Noto+Sans+Hebrew:wght@500&family=Noto+Sans+Devanagari:wght@500&display=swap"
        />
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}

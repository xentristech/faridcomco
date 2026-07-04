import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { DiagnosticoWizard } from "@/components/diagnostico/wizard";
import { Sparkle, Clock, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Diagnóstico de IA gratis en 60 segundos",
  description:
    "Responde 5 preguntas y recibe un plan de inteligencia artificial personalizado para tu negocio: qué automatizar, qué stack usar y el primer paso. Gratis y en 60 segundos.",
  keywords: [
    "diagnóstico de IA",
    "inteligencia artificial para negocios",
    "automatización con IA",
    "consultoría de IA",
    "IA para empresas",
    "test de IA gratis",
  ],
  alternates: { canonical: "/diagnostico" },
  openGraph: {
    title: "Diagnóstico de IA gratis en 60 segundos — Farid · Eathan",
    description:
      "Un plan de IA personalizado para tu negocio en 60 segundos: qué automatizar, qué stack y el primer paso.",
    type: "website",
    url: "/diagnostico",
  },
  twitter: {
    card: "summary_large_image",
    title: "Diagnóstico de IA gratis en 60 segundos",
    description:
      "Un plan de IA personalizado para tu negocio en 60 segundos. Gratis.",
  },
};

const perks = [
  { icon: Clock, label: "Toma 60 segundos" },
  { icon: Sparkle, label: "Generado con IA" },
  { icon: ShieldCheck, label: "Gratis, sin registro" },
];

export default function DiagnosticoPage() {
  return (
    <>
      <Nav />
      <main id="main" className="px-4 pb-24 pt-28 sm:px-6">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow">Herramienta gratuita</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Diagnóstico de IA para tu negocio{" "}
            <span className="text-gradient">en 60 segundos</span>
          </h1>
          <p className="mt-4 text-[var(--text-dim)]">
            Responde 5 preguntas y la IA de Farid te arma un mini-plan: qué automatizar,
            qué stack usar y el primer paso concreto para tu caso.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-[var(--text-faint)]">
            {perks.map((p) => (
              <span key={p.label} className="inline-flex items-center gap-1.5">
                <p.icon size={16} weight="fill" className="text-[var(--accent-cyan)]" />
                {p.label}
              </span>
            ))}
          </div>
        </header>

        <DiagnosticoWizard />
      </main>
      <Footer />
    </>
  );
}

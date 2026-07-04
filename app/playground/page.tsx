import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { TextLab } from "@/components/playground/text-lab";
import { Flask, Lightning, ShieldCheck } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Playground de IA: analiza cualquier texto en vivo",
  description:
    "Pega un texto y la IA te devuelve al instante un resumen, el sentimiento, el tono y las palabras clave. Una demo gratis de IA aplicada a texto, por Farid (Eathan).",
  keywords: [
    "playground de IA",
    "análisis de sentimiento",
    "analizar texto con IA",
    "procesamiento de lenguaje natural",
    "demo de IA gratis",
    "NLP español",
  ],
  alternates: { canonical: "/playground" },
  openGraph: {
    title: "Playground de IA: analiza cualquier texto en vivo",
    description:
      "Resumen, sentimiento, tono y palabras clave de cualquier texto, al instante. Una demo de IA aplicada.",
    type: "website",
    url: "/playground",
  },
  twitter: {
    card: "summary_large_image",
    title: "Playground de IA: analiza cualquier texto en vivo",
    description: "Resumen, sentimiento, tono y palabras clave de cualquier texto, al instante.",
  },
};

const perks = [
  { icon: Lightning, label: "Resultado al instante" },
  { icon: Flask, label: "IA aplicada a texto" },
  { icon: ShieldCheck, label: "Gratis, sin registro" },
];

export default function PlaygroundPage() {
  return (
    <>
      <Nav />
      <main id="main" className="px-4 pb-24 pt-28 sm:px-6">
        <header className="mx-auto mb-10 max-w-2xl text-center">
          <p className="eyebrow">Playground de IA</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Analiza cualquier texto{" "}
            <span className="text-gradient">con IA, en vivo</span>
          </h1>
          <p className="mt-4 text-[var(--text-dim)]">
            Pega un comentario, una reseña o un correo y mira cómo la IA de Farid extrae el
            resumen, el sentimiento, el tono y las palabras clave al instante.
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

        <TextLab />
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkle,
  MagnifyingGlass,
  Smiley,
  SmileyMeh,
  SmileySad,
  Translate,
  Hash,
  TextAlignLeft,
} from "@phosphor-icons/react";
import type { Analysis } from "@/app/api/playground/route";
import { useI18n } from "../i18n";
import { localizedHref } from "@/lib/i18n";

const sentimentStyle = {
  Positivo: { icon: Smiley, color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  Neutral: { icon: SmileyMeh, color: "#8fb0ff", bg: "rgba(79,124,255,0.12)" },
  Negativo: { icon: SmileySad, color: "#fb7185", bg: "rgba(251,113,133,0.12)" },
} as const;

const L = {
  es: {
    examples: [
      "¡Me encantó el servicio! Todo llegó rápido y la atención fue excelente, sin duda vuelvo a comprar.",
      "El pedido llegó tarde y el producto venía dañado. Muy decepcionado, no lo recomiendo.",
      "El nuevo modelo integra memoria unificada y acelera la inferencia local para equipos pequeños.",
    ],
    exLabels: ["😍 Reseña feliz", "😠 Queja", "📄 Técnico"],
    placeholder: "Pega aquí un comentario, un correo, una reseña, un mensaje… lo que sea.",
    ariaText: "Texto para analizar",
    analyzing: "Analizando…", analyze: "Analizar con IA",
    errShort: "Escribe o pega un texto un poco más largo.",
    errNo: "No se pudo analizar. Intenta de nuevo.",
    errConn: "Hubo un problema de conexión. Intenta de nuevo.",
    summary: "Resumen", sentiment: "Sentimiento", posSuffix: "% positivo",
    tone: "Tono", language: "Idioma: ", keywords: "Palabras clave",
    ctaPre: "Esto es una muestra de lo que Farid construye: IA aplicada a texto (soporte, reseñas, encuestas, correos). ¿Lo quieres para tu negocio? ",
    ctaLink: "Hablemos",
    sentLabel: { Positivo: "Positivo", Neutral: "Neutral", Negativo: "Negativo" } as Record<string, string>,
  },
  en: {
    examples: [
      "I loved the service! Everything arrived fast and support was excellent, I'll definitely buy again.",
      "The order arrived late and the product was damaged. Very disappointed, I don't recommend it.",
      "The new model integrates unified memory and speeds up local inference for small teams.",
    ],
    exLabels: ["😍 Happy review", "😠 Complaint", "📄 Technical"],
    placeholder: "Paste a comment, an email, a review, a message… anything.",
    ariaText: "Text to analyze",
    analyzing: "Analyzing…", analyze: "Analyze with AI",
    errShort: "Type or paste a slightly longer text.",
    errNo: "Couldn't analyze. Try again.",
    errConn: "There was a connection problem. Try again.",
    summary: "Summary", sentiment: "Sentiment", posSuffix: "% positive",
    tone: "Tone", language: "Language: ", keywords: "Keywords",
    ctaPre: "This is a taste of what Farid builds: AI applied to text (support, reviews, surveys, emails). Want it for your business? ",
    ctaLink: "Let's talk",
    sentLabel: { Positivo: "Positive", Neutral: "Neutral", Negativo: "Negative" } as Record<string, string>,
  },
};

export function TextLab() {
  const { locale } = useI18n();
  const l = L[locale];
  const examples = l.examples;
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze(value: string) {
    const v = value.trim();
    if (v.length < 10 || loading) {
      if (v.length < 10) setError(l.errShort);
      return;
    }
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const res = await fetch("/api/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: v, lang: locale }),
      });
      const data = await res.json();
      if (data.analysis) setAnalysis(data.analysis);
      else setError(data.error ?? l.errNo);
    } catch {
      setError(l.errConn);
    } finally {
      setLoading(false);
    }
  }

  const s = analysis ? sentimentStyle[analysis.sentiment.label] : null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="card p-5 sm:p-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={l.placeholder}
          aria-label={l.ariaText}
          rows={5}
          maxLength={4000}
          className="w-full resize-y rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-[rgba(79,124,255,0.25)]"
        />

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            onClick={() => analyze(text)}
            disabled={loading || text.trim().length < 10}
            className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
          >
            <MagnifyingGlass size={17} weight="bold" />
            {loading ? l.analyzing : l.analyze}
          </button>
          <span className="ml-auto text-xs text-[var(--text-faint)]">
            {text.length}/4000
          </span>
        </div>

        {/* Ejemplos */}
        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => {
                setText(ex);
                analyze(ex);
              }}
              className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-dim)] transition hover:border-[rgba(124,108,255,0.5)] hover:text-[var(--text)]"
            >
              {l.exLabels[i]}
            </button>
          ))}
        </div>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}

        {/* Loading skeleton */}
        {loading && (
          <div className="mt-5 space-y-3">
            <div className="shimmer h-16 rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              <div className="shimmer h-20 rounded-xl" />
              <div className="shimmer h-20 rounded-xl" />
            </div>
          </div>
        )}

        {/* Resultado */}
        <AnimatePresence>
          {analysis && !loading && s && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-5 space-y-3"
            >
              {/* Resumen */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-4">
                <p className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[var(--accent-cyan)]">
                  <TextAlignLeft size={14} weight="fill" /> {l.summary}
                </p>
                <p className="text-sm text-[var(--text)]">{analysis.summary}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {/* Sentimiento */}
                <div
                  className="rounded-xl border border-[var(--border)] p-4"
                  style={{ background: s.bg }}
                >
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                    <s.icon size={16} weight="fill" style={{ color: s.color }} />
                    {l.sentiment}
                  </p>
                  <p className="text-lg font-semibold" style={{ color: s.color }}>
                    {l.sentLabel[analysis.sentiment.label] ?? analysis.sentiment.label}
                  </p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[var(--surface-strong)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${analysis.sentiment.score}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: s.color }}
                    />
                  </div>
                  <p className="mt-1 text-right text-[11px] text-[var(--text-faint)]">
                    {analysis.sentiment.score}{l.posSuffix}
                  </p>
                </div>

                {/* Tono + idioma */}
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                    <Sparkle size={15} weight="fill" className="text-[var(--accent-2)]" />
                    {l.tone}
                  </p>
                  <p className="text-lg font-semibold text-[var(--text)]">
                    {analysis.tone}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
                    <Translate size={14} /> {l.language}{analysis.language}
                  </p>
                </div>
              </div>

              {/* Palabras clave */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                  <Hash size={15} weight="bold" className="text-[var(--accent)]" />
                  {l.keywords}
                </p>
                <div className="flex flex-wrap gap-2">
                  {analysis.keywords.map((k) => (
                    <span
                      key={k}
                      className="rounded-full border border-[rgba(124,108,255,0.3)] bg-[var(--accent-soft)] px-3 py-1 text-xs text-[var(--text)]"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>

              <p className="pt-1 text-center text-[11px] text-[var(--text-faint)]">
                {l.ctaPre}
                <a href={`${localizedHref("/", locale)}#contacto`} className="text-[var(--accent-cyan)] hover:underline">
                  {l.ctaLink}
                </a>
                .
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

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

const examples = [
  "¡Me encantó el servicio! Todo llegó rápido y la atención fue excelente, sin duda vuelvo a comprar.",
  "El pedido llegó tarde y el producto venía dañado. Muy decepcionado, no lo recomiendo.",
  "El nuevo modelo integra memoria unificada y acelera la inferencia local para equipos pequeños.",
];

const sentimentStyle = {
  Positivo: { icon: Smiley, color: "#34d399", bg: "rgba(52,211,153,0.12)" },
  Neutral: { icon: SmileyMeh, color: "#8fb0ff", bg: "rgba(79,124,255,0.12)" },
  Negativo: { icon: SmileySad, color: "#fb7185", bg: "rgba(251,113,133,0.12)" },
} as const;

export function TextLab() {
  const [text, setText] = useState("");
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyze(value: string) {
    const v = value.trim();
    if (v.length < 10 || loading) {
      if (v.length < 10) setError("Escribe o pega un texto un poco más largo.");
      return;
    }
    setLoading(true);
    setError("");
    setAnalysis(null);
    try {
      const res = await fetch("/api/playground", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: v }),
      });
      const data = await res.json();
      if (data.analysis) setAnalysis(data.analysis);
      else setError(data.error ?? "No se pudo analizar. Intenta de nuevo.");
    } catch {
      setError("Hubo un problema de conexión. Intenta de nuevo.");
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
          placeholder="Pega aquí un comentario, un correo, una reseña, un mensaje… lo que sea."
          aria-label="Texto para analizar"
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
            {loading ? "Analizando…" : "Analizar con IA"}
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
              {["😍 Reseña feliz", "😠 Queja", "📄 Técnico"][i]}
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
                  <TextAlignLeft size={14} weight="fill" /> Resumen
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
                    Sentimiento
                  </p>
                  <p className="text-lg font-semibold" style={{ color: s.color }}>
                    {analysis.sentiment.label}
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
                    {analysis.sentiment.score}% positivo
                  </p>
                </div>

                {/* Tono + idioma */}
                <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                  <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                    <Sparkle size={15} weight="fill" className="text-[var(--accent-2)]" />
                    Tono
                  </p>
                  <p className="text-lg font-semibold text-[var(--text)]">
                    {analysis.tone}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
                    <Translate size={14} /> Idioma: {analysis.language}
                  </p>
                </div>
              </div>

              {/* Palabras clave */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <p className="mb-2 flex items-center gap-1.5 text-xs font-medium text-[var(--text-dim)]">
                  <Hash size={15} weight="bold" className="text-[var(--accent)]" />
                  Palabras clave
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
                Esto es una muestra de lo que Farid construye: IA aplicada a texto (soporte,
                reseñas, encuestas, correos). ¿Lo quieres para tu negocio?{" "}
                <a href="/#contacto" className="text-[var(--accent-cyan)] hover:underline">
                  Hablemos
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

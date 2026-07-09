"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkle, ArrowRight, Lightning } from "@phosphor-icons/react";
import { Reveal } from "./reveal";
import { useI18n } from "./i18n";

// Markdown minimo: **negritas** + saltos de linea.
function render(text: string) {
  return text.split("\n").map((line, i) => (
    <p key={i} className="mb-1.5 last:mb-0">
      {line.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={j} className="text-[var(--text)]">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={j} className="text-[var(--text-dim)]">
            {part}
          </span>
        )
      )}
    </p>
  ));
}

export function IdeaDemo() {
  const { c, locale } = useI18n();
  const t = c.ideaDemo;
  const [idea, setIdea] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function run(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "idea", message: value, lang: locale }),
      });
      const data = await res.json();
      setResult(data.reply ?? t.errNoResp);
    } catch {
      setResult(t.errConn);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(124,108,255,0.4)] bg-[rgba(79,124,255,0.12)] px-3 py-1 text-xs font-medium text-[var(--accent-cyan)]">
          <Lightning size={14} weight="fill" />
          {t.badge}
        </span>
        <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.headPre}
          <span className="text-gradient">{t.headGrad}</span>
          {t.headPost}
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="card mx-auto mt-10 max-w-2xl p-5 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && run(idea)}
              placeholder={t.inputPh}
              aria-label={t.inputAria}
              autoComplete="off"
              className="flex-1 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-[rgba(79,124,255,0.25)]"
            />
            <button
              onClick={() => run(idea)}
              disabled={loading || !idea.trim()}
              className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? t.thinking : t.convert}
              {!loading && <ArrowRight size={18} />}
            </button>
          </div>

          {/* chips de ejemplo */}
          <div className="mt-3 flex flex-wrap gap-2">
            {t.examples.map((ex) => (
              <button
                key={ex}
                onClick={() => {
                  setIdea(ex);
                  run(ex);
                }}
                className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-dim)] transition hover:border-[rgba(124,108,255,0.5)] hover:text-[var(--text)]"
              >
                {ex}
              </button>
            ))}
          </div>

          {/* salida */}
          <AnimatePresence mode="wait">
            {(loading || result) && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mt-5"
              >
                <div
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-[var(--border)] bg-[var(--bg-elev)] p-4"
                >
                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-[var(--accent-cyan)]">
                    <Sparkle size={14} weight="fill" />
                    {t.proposal}
                  </div>
                  {loading ? (
                    <div className="space-y-2">
                      <div className="shimmer h-3 w-3/4 rounded" />
                      <div className="shimmer h-3 w-full rounded" />
                      <div className="shimmer h-3 w-5/6 rounded" />
                      <div className="shimmer h-3 w-2/3 rounded" />
                    </div>
                  ) : (
                    <div className="text-sm leading-relaxed">{render(result)}</div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

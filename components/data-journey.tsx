"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Sparkle, ArrowsClockwise } from "@phosphor-icons/react";
import type { Payload } from "@/app/api/data-journey/route";
import { useI18n } from "./i18n";
import { useAudience } from "./audience-context";
import { Reveal } from "./reveal";

// "El viaje de un dato": el mismo registro atraviesa el sistema y se transforma
// de fila muerta a decisión. Avanza solo; al tocar una etapa se detiene (pin).
//
// Coste de IA: CERO por visita. La página es estática y arranca con un caso
// curado (elegido según la audiencia). Solo al pulsar "otro ejemplo" se llama
// al modelo; si falla, rotamos a otro caso curado y nadie se entera.
const TICK = 3200;

export function DataJourney() {
  const { c, locale } = useI18n();
  const t = c.dataJourney;
  const cases = t.cases;
  const stages = t.stages;
  const { audience } = useAudience();
  const reduce = useReducedMotion();

  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [paused, setPaused] = useState(false);
  const [caseIndex, setCaseIndex] = useState(0);
  const [ai, setAi] = useState<Payload[] | null>(null);
  const [loading, setLoading] = useState(false);

  // Al montar (y al cambiar de audiencia) elegimos un caso al azar entre los que
  // encajan con ese perfil: la sección se siente distinta en cada visita, gratis.
  useEffect(() => {
    const indices = cases
      .map((cs, i) => ({ cs, i }))
      .filter((x) => x.cs.audience === audience)
      .map((x) => x.i);
    const pool = indices.length ? indices : cases.map((_, i) => i);
    setCaseIndex(pool[Math.floor(Math.random() * pool.length)]);
    setAi(null);
    setActive(0);
    setPinned(false);
  }, [audience, cases]);

  useEffect(() => {
    if (reduce || pinned || paused || loading) return;
    const id = setInterval(() => setActive((i) => (i + 1) % stages.length), TICK);
    return () => clearInterval(id);
  }, [reduce, pinned, paused, loading, stages.length]);

  const nextCurated = useCallback(() => {
    setAi(null);
    setCaseIndex((i) => (i + 1) % cases.length);
    setActive(0);
  }, [cases.length]);

  async function regenerate() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch("/api/data-journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang: locale, audience }),
      });
      const data = await res.json();
      if (data.payloads) {
        setAi(data.payloads as Payload[]);
        setActive(0);
        setPinned(false);
      } else {
        nextCurated();
      }
    } catch {
      nextCurated();
    } finally {
      setLoading(false);
    }
  }

  const payloads = ai ?? cases[caseIndex].payloads;
  const p = payloads[active] ?? payloads[0];
  const stage = stages[active];
  const isLast = active === stages.length - 1;
  const progress = ((active + 1) / stages.length) * 100;

  return (
    <section className="mx-auto max-w-4xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.headPre}
          <span className="text-gradient">{t.headGrad}</span>
          {t.headPost}
        </h2>
        <p className="mt-4 leading-relaxed text-[var(--text-dim)]">{t.sub}</p>
        <p className="mt-2 text-xs text-[var(--text-faint)]">{t.hint}</p>
      </Reveal>

      <Reveal delay={0.1}>
        {/* Rieles del pipeline */}
        <div
          role="tablist"
          aria-label={t.headPre + t.headGrad}
          className="relative mt-14 grid grid-cols-2 gap-y-6 sm:grid-cols-4"
        >
          <span
            aria-hidden
            className="absolute inset-x-4 top-4 hidden h-px bg-[var(--border-strong)] sm:block"
          />
          <motion.span
            aria-hidden
            className="absolute left-4 top-4 hidden h-px bg-grad sm:block"
            initial={false}
            animate={{ width: `calc(${progress}% - 2rem)` }}
            transition={reduce ? { duration: 0 } : { duration: 0.5, ease: "easeOut" }}
          />

          {stages.map((st, i) => {
            const on = active === i;
            return (
              <button
                key={st.key}
                role="tab"
                type="button"
                id={`dj-tab-${st.key}`}
                aria-selected={on}
                aria-controls="dj-panel"
                onClick={() => {
                  setActive(i);
                  setPinned(true);
                }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => {
                  setActive(i);
                  setPaused(true);
                }}
                onBlur={() => setPaused(false)}
                className="relative z-10 flex flex-col items-center gap-2.5 px-2 text-center"
              >
                <span
                  className={`grid h-8 w-8 place-items-center rounded-full font-mono text-[11px] font-semibold ring-1 transition ${
                    on
                      ? "bg-grad text-white shadow-[0_0_22px_-4px_rgba(124,108,255,0.9)] ring-transparent"
                      : "bg-[var(--bg-elev)] text-[var(--text-dim)] ring-[var(--border-strong)]"
                  }`}
                >
                  0{i + 1}
                </span>
                <span
                  className={`text-xs font-semibold leading-tight transition-colors ${
                    on ? "text-[var(--text)]" : "text-[var(--text-faint)]"
                  }`}
                >
                  {st.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* El payload, transformándose */}
        <div id="dj-panel" role="tabpanel" aria-labelledby={`dj-tab-${stage.key}`} className="mt-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${ai ? "ai" : caseIndex}-${stage.key}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -12 }}
              transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className={`spotlight relative overflow-hidden rounded-[22px] border p-6 sm:p-7 ${
                isLast
                  ? "border-[rgba(124,108,255,0.45)] bg-[linear-gradient(120deg,rgba(79,124,255,0.14),rgba(139,92,246,0.06))]"
                  : "border-[var(--border)] bg-[var(--surface)]"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="flex min-w-0 items-center gap-2 font-mono text-sm text-[var(--accent-cyan)]">
                  {isLast && <Sparkle size={15} weight="fill" className="shrink-0" />}
                  <span className="truncate">{p.title}</span>
                </p>
                <div className="flex shrink-0 items-center gap-2">
                  {ai && (
                    <span className="rounded-full border border-[rgba(124,108,255,0.4)] bg-[var(--accent-soft)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-dim)]">
                      {t.aiBadge}
                    </span>
                  )}
                  <span className="rounded-full border border-[var(--border)] bg-[var(--bg-elev)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-faint)]">
                    {stage.badge}
                  </span>
                </div>
              </div>

              <ul className="mt-4 space-y-1.5 font-mono text-sm">
                {p.lines.map((line) => (
                  <li
                    key={line}
                    className={isLast ? "text-[var(--text)]" : "text-[var(--text-dim)]"}
                  >
                    {isLast ? "→ " : ""}
                    {line}
                  </li>
                ))}
              </ul>

              <p className="mt-5 border-t border-[var(--border)] pt-4 text-sm leading-relaxed text-[var(--text-dim)]">
                {stage.caption}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>

      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          onClick={regenerate}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-[var(--text-dim)] transition hover:border-[rgba(124,108,255,0.55)] hover:text-[var(--text)] disabled:opacity-60"
        >
          <ArrowsClockwise size={14} weight="bold" className={loading ? "animate-spin" : ""} />
          {loading ? t.regenerating : t.regenerate}
        </button>
        <p className="text-center text-[11px] text-[var(--text-faint)]">{t.footnote}</p>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useI18n } from "./i18n";
import { Reveal } from "./reveal";

// Stack de IA por capas. La idea: no es un carrusel de logos, es un diagrama
// de la arquitectura real. Al enfocar una capa, se eleva y explica qué se hace
// ahí; las demás se atenúan. Hover, foco (teclado) y toque activan igual.
export function AiStack() {
  const { c } = useI18n();
  const t = c.aiStack;
  const [active, setActive] = useState(1); // "Modelos" arranca activa
  const reduce = useReducedMotion();

  return (
    <section id="stack" className="mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-4">{t.eyebrow}</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {t.headPre}
          <span className="text-gradient">{t.headGrad}</span>
          {t.headPost}
        </h2>
        <p className="mt-4 max-w-xl leading-relaxed text-[var(--text-dim)]">{t.sub}</p>
        <p className="mt-2 text-xs text-[var(--text-faint)]">{t.hint}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative mt-12">
          {/* Línea de flujo: los datos suben hasta la orquestación. */}
          <span
            aria-hidden
            className="absolute left-[27px] bottom-8 top-8 hidden w-px bg-[linear-gradient(0deg,var(--accent-cyan),var(--accent),var(--accent-2),transparent)] sm:block"
          />

          <div className="space-y-3">
            {t.layers.map((layer, i) => {
              const on = active === i;
              return (
                <button
                  key={layer.key}
                  type="button"
                  aria-expanded={on}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`group relative block w-full rounded-[20px] border p-5 text-left transition-all duration-300 sm:pl-20 ${
                    on
                      ? "border-[rgba(124,108,255,0.5)] bg-[linear-gradient(120deg,rgba(79,124,255,0.13),rgba(139,92,246,0.05))] shadow-[0_18px_50px_-26px_rgba(124,108,255,0.9)]"
                      : "border-[var(--border)] bg-[var(--surface)] opacity-60 hover:opacity-100"
                  }`}
                  style={!reduce && on ? { transform: "translateY(-2px)" } : undefined}
                >
                  {/* Número de capa */}
                  <span
                    aria-hidden
                    className={`absolute left-3 top-5 hidden h-9 w-9 place-items-center rounded-full font-mono text-[11px] font-semibold ring-1 transition sm:grid ${
                      on
                        ? "bg-grad text-white ring-transparent"
                        : "bg-[var(--bg-elev)] text-[var(--text-dim)] ring-[var(--border-strong)]"
                    }`}
                  >
                    0{i + 1}
                  </span>

                  <p
                    className={`text-sm font-semibold tracking-tight transition-colors ${
                      on ? "text-[var(--text)]" : "text-[var(--text-dim)]"
                    }`}
                  >
                    {layer.label}
                  </p>

                  {/* Logos de la capa */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {layer.items.map((it) => (
                      <span
                        key={it.slug}
                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                          on
                            ? "border-[var(--border-strong)] bg-[var(--bg-elev)] text-[var(--text)]"
                            : "border-[var(--border)] text-[var(--text-dim)]"
                        }`}
                      >
                        <Image
                          src={`https://cdn.simpleicons.org/${it.slug}/ffffff`}
                          alt=""
                          aria-hidden
                          width={16}
                          height={16}
                          className={`h-4 w-4 transition ${
                            on ? "opacity-90" : "opacity-45 grayscale"
                          }`}
                        />
                        {it.name}
                      </span>
                    ))}
                  </div>

                  {/* Qué hace Farid en esta capa */}
                  <motion.div
                    initial={false}
                    animate={{ opacity: on ? 1 : 0, height: on ? "auto" : 0 }}
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                    }
                    className="overflow-hidden"
                  >
                    <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--text-dim)]">
                      {layer.blurb}
                    </p>
                  </motion.div>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <p className="mt-8 text-center text-[11px] text-[var(--text-faint)]">{t.note}</p>
    </section>
  );
}

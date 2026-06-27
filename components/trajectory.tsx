"use client";

import { timeline } from "@/lib/profile";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { SkillGalaxy } from "./skill-galaxy";

export function Trajectory() {
  return (
    <section
      id="trayectoria"
      className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32"
    >
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        {/* Galaxia */}
        <Reveal className="order-2 lg:order-1">
          <SkillGalaxy />
          <p className="mt-6 text-center text-sm text-[var(--text-faint)]">
            Toca cada nodo: así se conectan mis disciplinas.
          </p>
        </Reveal>

        {/* Timeline */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-4">Trayectoria</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              De una línea de código a{" "}
              <span className="text-gradient">productos inteligentes</span>.
            </h2>
          </Reveal>

          <RevealGroup className="relative mt-10">
            <span
              aria-hidden
              className="absolute left-[15px] top-2 bottom-2 w-px bg-[linear-gradient(180deg,var(--accent),var(--accent-2),transparent)]"
            />
            {timeline.map((t) => (
              <RevealItem key={t.k}>
                <div className="relative flex gap-5 pb-8 last:pb-0">
                  <span className="relative z-10 mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[var(--bg-elev)] ring-1 ring-[var(--border-strong)]">
                    <span className="h-2.5 w-2.5 rounded-full bg-grad" />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight">{t.k}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--text-dim)]">
                      {t.t}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}

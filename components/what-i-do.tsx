"use client";

import {
  Brain,
  ChartLineUp,
  Graph,
  Gear,
  PlugsConnected,
  Code,
  Robot,
  ChartBar,
  type Icon,
} from "@phosphor-icons/react";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { GlowingEffect } from "@/components/ui/glowing-effect-card";
import { useI18n } from "./i18n";

const icons: Record<string, Icon> = {
  Brain,
  ChartLineUp,
  Graph,
  Gear,
  PlugsConnected,
  Code,
  Robot,
  ChartBar,
};

export function WhatIDo() {
  const { c } = useI18n();
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-4">{c.whatIDo.eyebrow}</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {c.whatIDo.headPre}
          <span className="text-gradient">{c.whatIDo.headGrad}</span>
          {c.whatIDo.headPost}
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {c.whatIDo.services.map((s, i) => {
          const Ico = icons[s.icon] ?? Brain;
          const featured = i === 0 || i === 6;
          return (
            <RevealItem key={s.title}>
              <article
                className={`spotlight group relative h-full rounded-[20px] p-6 transition-transform duration-300 hover:-translate-y-1 ${
                  featured
                    ? "border border-[rgba(124,108,255,0.28)] bg-[linear-gradient(150deg,rgba(79,124,255,0.16),rgba(139,92,246,0.06))]"
                    : "card"
                }`}
              >
                <GlowingEffect
                  spread={40}
                  glow={false}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={1}
                />
                <span
                  className={`mb-5 inline-grid h-11 w-11 place-items-center rounded-xl ${
                    featured
                      ? "bg-grad text-white"
                      : "bg-[var(--surface-strong)] text-[var(--accent)]"
                  }`}
                >
                  <Ico size={22} weight="duotone" />
                </span>
                <h3 className="text-lg font-semibold tracking-tight">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">
                  {s.desc}
                </p>
              </article>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}

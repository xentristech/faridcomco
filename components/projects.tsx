"use client";

import type { ElementType } from "react";
import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { GlowingEffect } from "@/components/ui/glowing-effect-card";
import { seedGradient } from "@/lib/gradient";
import { useI18n } from "./i18n";

// Capturas reales de los sitios en producción (public/projects). Los proyectos
// sin sitio propio caen al gradiente de marca en vez de una foto de stock.
const SHOTS: Record<string, string> = {
  "xentris-ai-platform-blue": "/projects/xentris.jpg",
  "platim-platform-cyan": "/projects/platim.jpg",
  "yota-montacargas-industrial": "/projects/yota.jpg",
  "neona-tech-neural-violet": "/projects/neona.jpg",
  "dominiogpt-ai-domains": "/projects/dominiogpt.jpg",
};

function ProjectMedia({ seed, sizes }: { seed: string; sizes: string }) {
  const shot = SHOTS[seed];
  if (shot) {
    return (
      <>
        <Image
          src={shot}
          alt=""
          aria-hidden
          fill
          sizes={sizes}
          className="object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
        {/* Scrim sutil: legibilidad del tag sin apagar la captura. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,12,0.45),transparent_40%,rgba(5,6,12,0.35))]" />
      </>
    );
  }
  return (
    <>
      <div
        aria-hidden
        className="absolute inset-0 transition duration-500 group-hover:scale-105"
        style={{ backgroundImage: seedGradient(seed) }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,12,0.2),rgba(5,6,12,0.75))]" />
    </>
  );
}

export function Projects() {
  const { c } = useI18n();
  const projects = c.projects.items;
  const grid = projects.slice(0, -1);
  const wide = projects[projects.length - 1];

  return (
    <section id="proyectos" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-4">{c.projects.eyebrow}</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {c.projects.headPre}
          <span className="text-gradient">{c.projects.headGrad}</span>
          {c.projects.headPost}
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((p) => {
          const Card: ElementType = p.url ? "a" : "article";
          const linkProps = p.url
            ? {
                href: p.url,
                target: "_blank" as const,
                rel: "noopener",
                "aria-label": `${c.projects.viewSite}: ${p.name}`,
              }
            : {};
          return (
          <RevealItem key={p.name}>
            <Card
              {...linkProps}
              className="spotlight group relative block h-full overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] transition-transform duration-300 hover:-translate-y-1.5"
            >
              <GlowingEffect
                spread={50}
                glow={false}
                disabled={false}
                proximity={80}
                inactiveZone={0.01}
                borderWidth={1}
              />
              <div className="relative aspect-[16/10] overflow-hidden">
                <ProjectMedia
                  seed={p.seed}
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <span className="absolute left-4 top-4 rounded-full border border-[var(--border-strong)] bg-[rgba(5,6,12,0.72)] px-3 py-1 text-xs font-medium text-[var(--text)] backdrop-blur">
                  {p.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">{p.name}</h3>
                  <ArrowUpRight
                    size={18}
                    className="text-[var(--text-faint)] transition group-hover:text-[var(--accent)]"
                  />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-dim)]">
                  {p.desc}
                </p>
                {p.url && (
                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-cyan)] transition group-hover:gap-1.5">
                    {c.projects.viewSite}
                    <ArrowUpRight size={13} weight="bold" />
                  </span>
                )}
              </div>
            </Card>
          </RevealItem>
          );
        })}
      </RevealGroup>

      <Reveal delay={0.1}>
        <article className="spotlight group relative mt-4 grid grid-cols-1 overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] md:grid-cols-[1.2fr_1fr]">
          <GlowingEffect
            spread={60}
            glow={false}
            disabled={false}
            proximity={100}
            inactiveZone={0.01}
            borderWidth={1}
          />
          <div className="order-2 flex flex-col justify-center p-8 md:order-1 sm:p-10">
            <span className="eyebrow mb-3">{wide.tag}</span>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {wide.name}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-[var(--text-dim)]">
              {wide.desc} {c.projects.wideExtra}
            </p>
          </div>
          <div className="relative order-1 min-h-[220px] overflow-hidden md:order-2">
            <ProjectMedia seed={wide.seed} sizes="(max-width:768px) 100vw, 40vw" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,6,12,0.95),transparent_70%)]" />
          </div>
        </article>
      </Reveal>
    </section>
  );
}

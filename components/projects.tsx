"use client";

import Image from "next/image";
import { ArrowUpRight } from "@phosphor-icons/react";
import { projects } from "@/lib/profile";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

export function Projects() {
  const grid = projects.slice(0, 6);
  const wide = projects[6];

  return (
    <section id="proyectos" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-4">Proyectos destacados</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Ideas que ya viven en{" "}
          <span className="text-gradient">producción</span>.
        </h2>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {grid.map((p) => (
          <RevealItem key={p.name}>
            <article className="spotlight group h-full overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] transition-transform duration-300 hover:-translate-y-1.5">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${p.seed}/640/400`}
                  alt={p.name}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover opacity-60 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-80"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,6,12,0.25),rgba(5,6,12,0.92))] mix-blend-multiply" />
                <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(79,124,255,0.28),transparent_60%)]" />
                <span className="absolute left-4 top-4 rounded-full border border-[var(--border-strong)] bg-[rgba(5,6,12,0.6)] px-3 py-1 text-xs font-medium text-[var(--text-dim)] backdrop-blur">
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
              </div>
            </article>
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Proyecto a ancho completo */}
      <Reveal delay={0.1}>
        <article className="spotlight group mt-4 grid grid-cols-1 overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] md:grid-cols-[1.2fr_1fr]">
          <div className="order-2 flex flex-col justify-center p-8 md:order-1 sm:p-10">
            <span className="eyebrow mb-3">{wide.tag}</span>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {wide.name}
            </h3>
            <p className="mt-3 max-w-md leading-relaxed text-[var(--text-dim)]">
              {wide.desc} Pagos, CRMs, modelos de IA y servicios externos
              conectados en un solo flujo confiable.
            </p>
          </div>
          <div className="relative order-1 min-h-[220px] overflow-hidden md:order-2">
            <Image
              src={`https://picsum.photos/seed/${wide.seed}/900/600`}
              alt={wide.name}
              fill
              sizes="(max-width:768px) 100vw, 40vw"
              className="object-cover opacity-55 grayscale transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(5,6,12,0.95),transparent_70%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(300deg,rgba(139,92,246,0.3),transparent_60%)]" />
          </div>
        </article>
      </Reveal>
    </section>
  );
}

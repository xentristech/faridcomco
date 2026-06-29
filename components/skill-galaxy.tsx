"use client";

import { useState } from "react";

const nodes = [
  { label: "IA", desc: "El cerebro: modelos y razonamiento." },
  { label: "APIs", desc: "El sistema nervioso: todo conectado." },
  { label: "Automatización", desc: "Los reflejos: procesos que corren solos." },
  { label: "Datos", desc: "La memoria: la base de cada decisión." },
  { label: "Software", desc: "El cuerpo: el producto que se usa." },
  { label: "Negocios", desc: "El propósito: valor real y medible." },
];

export function SkillGalaxy() {
  const [active, setActive] = useState(0);
  const R = 120;

  return (
    <div
      role="group"
      aria-label="Mis disciplinas: toca cada nodo para ver cómo se conectan"
      className="relative mx-auto aspect-square w-full max-w-[420px]"
    >
      {/* anillos */}
      <div className="absolute inset-[8%] rounded-full border border-[var(--border)]" />
      <div className="absolute inset-[22%] rounded-full border border-dashed border-[var(--border)] animate-spin-slow" />
      <div
        aria-hidden
        className="absolute inset-[28%] rounded-full opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(79,124,255,0.45), transparent 70%)",
        }}
      />

      {/* nucleo */}
      <div className="absolute left-1/2 top-1/2 z-10 w-[46%] -translate-x-1/2 -translate-y-1/2 text-center">
        <div>
          <p className="bg-grad bg-clip-text text-lg font-bold text-transparent">
            {nodes[active].label}
          </p>
          <p className="mt-1 text-xs leading-snug text-[var(--text-dim)]">
            {nodes[active].desc}
          </p>
        </div>
      </div>

      {/* nodos orbitando */}
      {nodes.map((n, i) => {
        const angle = (i / nodes.length) * Math.PI * 2 - Math.PI / 2;
        const x = 50 + (R / 210) * 100 * Math.cos(angle);
        const y = 50 + (R / 210) * 100 * Math.sin(angle);
        const isActive = active === i;
        return (
          <button
            key={n.label}
            type="button"
            aria-pressed={isActive}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span
              className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur transition-all ${
                isActive
                  ? "border-[rgba(124,108,255,0.6)] bg-[rgba(79,124,255,0.18)] text-white shadow-[0_8px_24px_-8px_rgba(124,108,255,0.8)]"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isActive ? "bg-[var(--accent-cyan)]" : "bg-[var(--accent)]"
                }`}
              />
              {n.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}

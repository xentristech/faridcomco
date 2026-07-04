"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/profile";
import { downloadVCard } from "@/lib/vcard";

const links = [
  { href: "/diagnostico", label: "Diagnóstico IA" },
  { href: "/playground", label: "Playground" },
  { href: "/blog", label: "Blog" },
  { href: "/#contacto", label: "Contacto" },
];

// El logo arranca completo arriba y se colapsa a </F> al bajar.
//   = espacio duro para que no se colapse en HTML al partir el texto.
const FULL = "FARID AI ENGINEER";
const COLLAPSE_AT = 200; // px de scroll para colapsar del todo

function CodeLogo() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setProgress(Math.min(1, Math.max(0, window.scrollY / COLLAPSE_AT)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // De FULL (arriba) a solo "F" (abajo), retirando caracteres por el final.
  const visible = Math.max(1, Math.round(FULL.length * (1 - progress)));
  const text = FULL.slice(0, visible);
  const farid = text.slice(0, 5); // "FARID"
  const rest = text.slice(5); // " AI ENGINEER"

  return (
    <a
      href="/"
      aria-label={`${profile.shortName} — inicio`}
      className="inline-flex items-center whitespace-nowrap text-[15px] font-semibold tracking-tight sm:text-base"
      style={{ fontFamily: "'JetBrains Mono', var(--font-geist-mono), monospace" }}
    >
      <span style={{ color: "var(--accent-cyan)" }}>&lt;/</span>
      <span className="text-gradient">{farid}</span>
      {rest && <span style={{ color: "#c7ccef" }}>{rest}</span>}
      {/* caret tipo editor */}
      <span
        aria-hidden
        style={{
          display: "inline-block",
          width: 7,
          height: "1em",
          margin: "0 1px",
          verticalAlign: "-2px",
          borderRadius: 2,
          background: "linear-gradient(180deg,#8b7ff6,#62dbe4)",
          animation: "faridCaret 1.05s steps(1,end) infinite",
        }}
      />
      <span style={{ color: "var(--accent-cyan)" }}>&gt;</span>
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[var(--border)] bg-[rgba(5,6,12,0.72)] backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <CodeLogo />

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button onClick={downloadVCard} className="btn btn-primary !px-4 !py-2 text-sm">
          Guardar contacto
        </button>
      </nav>
    </header>
  );
}

"use client";

import { ArrowRight, DownloadSimple } from "@phosphor-icons/react";
import { downloadVCard } from "@/lib/vcard";
import { Reveal } from "./reveal";
import { useI18n } from "./i18n";

export function FinalCta() {
  const { c } = useI18n();
  return (
    <section className="mx-auto max-w-7xl px-4 pb-28 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] border border-[rgba(124,108,255,0.3)] px-6 py-16 text-center sm:px-12 sm:py-24">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(79,124,255,0.18),rgba(139,92,246,0.08),rgba(34,211,238,0.06))]"
          />
          <div
            aria-hidden
            className="absolute left-1/2 top-0 -z-10 h-64 w-[60%] -translate-x-1/2 rounded-full opacity-50 blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(124,108,255,0.6), transparent 70%)",
            }}
          />
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight sm:text-5xl">
            {c.finalCta.headPre}
            <span className="text-gradient">{c.finalCta.headGrad}</span>
            {c.finalCta.headPost}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[var(--text-dim)]">
            {c.finalCta.sub}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#contacto" className="btn btn-primary">
              {c.finalCta.talk}
              <ArrowRight size={18} />
            </a>
            <button onClick={downloadVCard} className="btn btn-ghost">
              <DownloadSimple size={18} weight="bold" />
              {c.finalCta.saveContact}
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

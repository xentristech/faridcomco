"use client";

import { Reveal, RevealGroup, RevealItem } from "./reveal";
import { useI18n } from "./i18n";

export function Aida() {
  const { c } = useI18n();
  const aida = c.aida.steps;
  return (
    <section className="relative mx-auto max-w-5xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {c.aida.headPre}
          <span className="text-gradient">{c.aida.headGrad}</span>
          {c.aida.headPost}
        </h2>
      </Reveal>

      <RevealGroup className="relative mt-14 grid gap-4">
        {/* linea vertical conectora */}
        <span
          aria-hidden
          className="absolute left-[27px] top-4 bottom-4 hidden w-px bg-[linear-gradient(180deg,transparent,var(--border-strong),transparent)] sm:block"
        />
        {aida.map((a, i) => {
          const isAction = i === aida.length - 1;
          return (
            <RevealItem key={a.k}>
              <div
                className={`relative flex items-start gap-5 rounded-[20px] p-5 sm:p-6 ${
                  isAction
                    ? "border border-[rgba(124,108,255,0.3)] bg-[linear-gradient(120deg,rgba(79,124,255,0.14),rgba(139,92,246,0.05))]"
                    : "glass rounded-[20px]"
                }`}
              >
                <span
                  className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-mono text-sm font-semibold ${
                    isAction
                      ? "bg-grad text-white"
                      : "bg-[var(--bg-elev)] text-[var(--accent)] ring-1 ring-[var(--border-strong)]"
                  }`}
                >
                  0{i + 1}
                </span>
                <div className="pt-1">
                  <p className="eyebrow mb-1.5">{a.k}</p>
                  <p
                    className={`leading-relaxed ${
                      isAction
                        ? "text-lg font-medium text-[var(--text)]"
                        : "text-[var(--text-dim)]"
                    }`}
                  >
                    {a.t}
                  </p>
                </div>
              </div>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}

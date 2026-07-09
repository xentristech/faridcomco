"use client";

import Image from "next/image";
import { SealCheck, ArrowUpRight } from "@phosphor-icons/react";
import { credentials, profile } from "@/lib/profile";
import { Reveal } from "./reveal";
import { useI18n } from "./i18n";

export function Credentials() {
  const { c } = useI18n();
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-elev)]">
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-24">
        <Reveal className="text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-dim)]">
            <SealCheck size={15} weight="fill" className="text-[var(--accent-cyan)]" />
            {c.credentials.badge}
          </span>
          <h2 className="mx-auto max-w-xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {c.credentials.heading}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-80">
            {credentials.map((c) => (
              <Image
                key={c.slug}
                src={`https://cdn.simpleicons.org/${c.slug}/ffffff`}
                alt={c.name}
                width={120}
                height={34}
                className="h-7 w-auto opacity-70 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-8"
              />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 text-center">
          <a
            href={profile.credly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-dim)] transition-colors hover:text-[var(--text)]"
          >
            {c.credentials.credlyLink}
            <ArrowUpRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

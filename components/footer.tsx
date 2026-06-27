"use client";

import {
  WhatsappLogo,
  EnvelopeSimple,
  LinkedinLogo,
  GithubLogo,
  type Icon,
} from "@phosphor-icons/react";
import { profile, whatsappUrl, mailtoUrl } from "@/lib/profile";

const socials: { icon: Icon; href: string; label: string }[] = [
  { icon: WhatsappLogo, href: whatsappUrl(), label: "WhatsApp" },
  { icon: EnvelopeSimple, href: mailtoUrl(), label: "Email" },
  { icon: LinkedinLogo, href: profile.linkedin, label: "LinkedIn" },
  { icon: GithubLogo, href: profile.github, label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-elev)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-grad text-sm font-bold text-white">
            F
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{profile.shortName}</p>
            <p className="text-xs text-[var(--text-faint)]">{profile.city}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-dim)] transition hover:border-[rgba(124,108,255,0.5)] hover:text-[var(--text)]"
            >
              <s.icon size={18} weight="duotone" />
            </a>
          ))}
        </div>

        <p className="text-xs text-[var(--text-faint)]">
          © {new Date().getFullYear()} {profile.webLabel}
        </p>
      </div>
    </footer>
  );
}

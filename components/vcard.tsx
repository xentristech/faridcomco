"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import QRCode from "qrcode";
import {
  EnvelopeSimple,
  WhatsappLogo,
  LinkedinLogo,
  GithubLogo,
  Globe,
  SealCheck,
  DownloadSimple,
  type Icon,
} from "@phosphor-icons/react";
import { profile, whatsappUrl, mailtoUrl } from "@/lib/profile";
import { buildVCard, downloadVCard } from "@/lib/vcard";
import { Reveal } from "./reveal";
import { useI18n } from "./i18n";

type Row = { icon: Icon; label: string; value: string; href: string };

export function VCard() {
  const { c } = useI18n();
  const v = c.vcard;
  const rows: Row[] = [
    { icon: EnvelopeSimple, label: v.rows.email, value: profile.email, href: mailtoUrl(v.mailSubject) },
    { icon: WhatsappLogo, label: v.rows.whatsapp, value: profile.whatsappLabel, href: whatsappUrl() },
    { icon: Globe, label: v.rows.web, value: profile.webLabel, href: profile.web },
    { icon: LinkedinLogo, label: v.rows.linkedin, value: v.values.linkedin, href: profile.linkedin },
    { icon: GithubLogo, label: v.rows.github, value: v.values.github, href: profile.github },
    { icon: SealCheck, label: v.rows.credly, value: v.values.credly, href: profile.credly },
  ];
  const [qr, setQr] = useState<string>("");

  useEffect(() => {
    QRCode.toDataURL(buildVCard(), {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 320,
      color: { dark: "#0a0c16", light: "#ffffff" },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, []);

  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
      <Reveal>
        <div className="card overflow-hidden p-0">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr]">
            {/* Lado info */}
            <div className="p-7 sm:p-9">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-[var(--border-strong)]">
                  <Image
                    src={profile.photo}
                    alt={profile.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold tracking-tight">
                    {profile.name}
                  </h2>
                  <p className="text-sm text-[var(--accent)]">{profile.role}</p>
                </div>
              </div>

              <div className="mt-7 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {rows.map((r) => (
                  <a
                    key={r.label}
                    href={r.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-3 transition hover:border-[rgba(124,108,255,0.5)] hover:bg-[rgba(255,255,255,0.05)]"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--bg-elev)] text-[var(--accent)] ring-1 ring-[var(--border)]">
                      <r.icon size={18} weight="duotone" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] uppercase tracking-wider text-[var(--text-faint)]">
                        {r.label}
                      </span>
                      <span className="block truncate text-sm text-[var(--text)]">
                        {r.value}
                      </span>
                    </span>
                  </a>
                ))}
              </div>

              <button onClick={downloadVCard} className="btn btn-primary mt-6 w-full sm:w-auto">
                <DownloadSimple size={18} weight="bold" />
                {v.download}
              </button>
            </div>

            {/* Lado QR */}
            <div className="relative flex flex-col items-center justify-center gap-4 border-t border-[var(--border)] bg-[linear-gradient(160deg,rgba(79,124,255,0.1),rgba(139,92,246,0.04))] p-8 md:border-l md:border-t-0">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -inset-3 rounded-3xl opacity-60 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(124,108,255,0.5), transparent 70%)",
                  }}
                />
                <div className="relative rounded-2xl bg-white p-3 shadow-xl">
                  {qr ? (
                    <Image
                      src={qr}
                      alt={v.qrAlt}
                      width={170}
                      height={170}
                      unoptimized
                      className="h-[170px] w-[170px]"
                    />
                  ) : (
                    <div className="shimmer h-[170px] w-[170px] rounded-lg" />
                  )}
                </div>
              </div>
              <p className="max-w-[200px] text-center text-sm text-[var(--text-dim)]">
                {v.qrCaption}
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

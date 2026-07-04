"use client";

import { useEffect, useState } from "react";
import {
  WhatsappLogo,
  TelegramLogo,
  XLogo,
  LinkedinLogo,
  FacebookLogo,
  ShareNetwork,
  LinkSimple,
  Check,
} from "@phosphor-icons/react";

// Barra para compartir el artículo en redes / apps.
// Nota: Instagram no permite compartir un enlace desde la web (no tiene "share URL"),
// por eso se ofrece el "Compartir" nativo del móvil (que sí incluye Instagram) y copiar enlace.
export function ShareBar({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function"
    );
  }, []);

  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const targets = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
      Icon: WhatsappLogo,
      color: "#25D366",
    },
    {
      label: "Telegram",
      href: `https://t.me/share/url?url=${u}&text=${t}`,
      Icon: TelegramLogo,
      color: "#29A9EB",
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${u}&text=${t}`,
      Icon: XLogo,
      color: "#e7e9f0",
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      Icon: LinkedinLogo,
      color: "#0A66C2",
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      Icon: FacebookLogo,
      color: "#1877F2",
    },
  ];

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignora: algunos navegadores bloquean el portapapeles sin https */
    }
  }

  async function nativeShare() {
    try {
      await navigator.share({ title, url });
    } catch {
      /* el usuario canceló */
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-[var(--text-dim)]">
        Compartir:
      </span>

      {targets.map(({ label, href, Icon, color }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Compartir en ${label}`}
          title={`Compartir en ${label}`}
          className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--text-dim)] transition hover:border-[rgba(124,108,255,0.5)] hover:text-[var(--text)]"
          style={{ ["--hov" as string]: color }}
        >
          <Icon size={18} weight="fill" />
        </a>
      ))}

      <button
        onClick={copy}
        aria-label="Copiar enlace"
        title="Copiar enlace"
        className={`grid h-10 w-10 place-items-center rounded-full border transition ${
          copied
            ? "border-emerald-500/50 text-emerald-400"
            : "border-[var(--border)] bg-[var(--surface)] text-[var(--text-dim)] hover:border-[rgba(124,108,255,0.5)] hover:text-[var(--text)]"
        }`}
      >
        {copied ? <Check size={18} weight="bold" /> : <LinkSimple size={18} />}
      </button>

      {canNativeShare && (
        <button
          onClick={nativeShare}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--surface-strong)] px-4 text-sm font-medium text-[var(--text)] transition hover:border-[rgba(124,108,255,0.5)]"
          title="Compartir con otras apps (incluye Instagram)"
        >
          <ShareNetwork size={17} weight="fill" />
          Más
        </button>
      )}
    </div>
  );
}

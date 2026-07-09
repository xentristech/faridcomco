"use client";

import { usePathname, useRouter } from "next/navigation";
import { useI18n } from "./i18n";
import { locales, localizedHref, type Locale } from "@/lib/i18n";

export function LangToggle() {
  const { locale } = useI18n();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target === locale) return;
    // Ruta "desnuda" sin prefijo de idioma (soporta /en y /es por si el rewrite lo expone).
    let bare = pathname || "/";
    if (bare === "/en" || bare === "/es") bare = "/";
    else if (bare.startsWith("/en/") || bare.startsWith("/es/")) bare = bare.slice(3);
    // Recuerda la elección para que el proxy la respete.
    document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=31536000; samesite=lax`;
    router.push(localizedHref(bare, target));
  }

  return (
    <div
      role="group"
      aria-label="Idioma / Language"
      className="flex items-center overflow-hidden rounded-full border border-[var(--border)] bg-[var(--surface)] text-[11px] font-semibold"
    >
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          className={`px-2.5 py-1 uppercase transition ${
            l === locale
              ? "bg-grad text-white"
              : "text-[var(--text-dim)] hover:text-[var(--text)]"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

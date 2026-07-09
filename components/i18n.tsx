"use client";

import { createContext, useContext, type ReactNode } from "react";
import { getContent, type Content } from "@/lib/content";
import { localizedHref, type Locale } from "@/lib/i18n";

type Ctx = { locale: Locale; c: Content };
const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const c = getContent(locale);
  return (
    <I18nContext.Provider value={{ locale, c }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n debe usarse dentro de I18nProvider");
  return ctx;
}

// Ayuda: href consciente del idioma (español sin prefijo, inglés con /en).
export function useHref() {
  const { locale } = useI18n();
  return (path: string) => localizedHref(path, locale);
}

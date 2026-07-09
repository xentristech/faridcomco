// Configuración i18n del sitio.
// Estrategia elegida: la RAÍZ es español (sin prefijo) y el inglés vive en /en.
// La detección usa el idioma del navegador (Accept-Language), que es gratis,
// más preciso que geo-IP y lo que Google recomienda. Nunca forzamos redirect
// duro: ambos idiomas quedan en URLs rastreables + hreflang.

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Devuelve el locale de un pathname. La raíz (sin prefijo) es español.
// Ej: "/en" o "/en/blog" -> "en";  "/" o "/blog" -> "es".
export function localeFromPathname(pathname: string): Locale {
  const seg = pathname.split("/")[1]?.toLowerCase();
  return seg === "en" ? "en" : "es";
}

// Construye un href respetando el idioma actual.
// ES (default) va sin prefijo; EN lleva /en.
export function localizedHref(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean === "/" ? "/en" : `/en${clean}`;
  return clean;
}

// Negociador mínimo de Accept-Language (sin librerías).
// Recorre los idiomas por orden de preferencia y devuelve el primero soportado.
export function matchLocale(acceptLanguage: string | null | undefined): Locale {
  if (!acceptLanguage) return defaultLocale;
  const ranked = acceptLanguage
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);

  for (const { tag } of ranked) {
    if (tag.startsWith("en")) return "en";
    if (tag.startsWith("es")) return "es";
  }
  return defaultLocale;
}

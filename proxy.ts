import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale, matchLocale } from "@/lib/i18n";

// Estrategia i18n:
// - Español = idioma por defecto, SIN prefijo (URLs actuales intactas). Internamente
//   se sirve reescribiendo a /es para que app/[lang] reciba lang="es".
// - Inglés vive en /en (se sirve tal cual).
// - En la RAÍZ ("/") detectamos el idioma del navegador (o la cookie de elección)
//   y, si prefiere inglés, redirigimos a /en. Solo en la raíz, para no romper SEO
//   ni los enlaces profundos ya compartidos (Googlebot rastrea ambos vía hreflang).

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // El español es canónico SIN prefijo: si alguien entra a /es, lo mandamos a la raíz.
  if (pathname === "/es" || pathname.startsWith("/es/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }

  // Subárbol inglés: servir tal cual (app/[lang] recibe lang="en").
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Raíz: primera impresión → detectar idioma (cookie de elección tiene prioridad).
  if (pathname === "/") {
    const cookie = request.cookies.get("NEXT_LOCALE")?.value;
    const preferred =
      cookie && isLocale(cookie)
        ? cookie
        : matchLocale(request.headers.get("accept-language"));
    if (preferred === "en") {
      const url = request.nextUrl.clone();
      url.pathname = "/en";
      return NextResponse.redirect(url);
    }
  }

  // Resto (español sin prefijo): reescribir a /es manteniendo la URL limpia.
  const url = request.nextUrl.clone();
  url.pathname = `/es${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Excluye API, estáticos, imágenes optimizadas y archivos de metadatos.
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*).*)",
  ],
};

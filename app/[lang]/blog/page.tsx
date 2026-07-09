import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getAllPosts } from "@/lib/blog";
import { seedGradient } from "@/lib/gradient";
import { isLocale, localizedHref, type Locale } from "@/lib/i18n";
import { ArrowUpRight, Clock, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 3600;

const T = {
  es: {
    metaTitle: "Blog",
    metaDesc:
      "Ideas sobre inteligencia artificial, datos e ingeniería, por Farid (Eathan). Análisis técnico sin humo.",
    eyebrow: "El blog",
    h1pre: "Ideas sobre ",
    h1grad: "IA, datos e ingeniería",
    sub: "Análisis técnico sin humo. Lo que aprendo construyendo con inteligencia artificial, contado claro.",
  },
  en: {
    metaTitle: "Blog",
    metaDesc:
      "Ideas on artificial intelligence, data and engineering, by Farid (Eathan). Technical analysis, no fluff.",
    eyebrow: "The blog",
    h1pre: "Ideas on ",
    h1grad: "AI, data & engineering",
    sub: "Technical analysis, no fluff. What I learn building with artificial intelligence, told clearly.",
  },
};

export async function generateMetadata(
  props: PageProps<"/[lang]/blog">
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const t = T[locale];
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: {
      canonical: localizedHref("/blog", locale),
      languages: {
        es: localizedHref("/blog", "es"),
        en: localizedHref("/blog", "en"),
        "x-default": localizedHref("/blog", "es"),
      },
    },
    openGraph: {
      title: `${t.metaTitle} — Farid · Eathan`,
      description: t.metaDesc,
      type: "website",
      url: localizedHref("/blog", locale),
    },
  };
}

export default async function BlogIndex(props: PageProps<"/[lang]/blog">) {
  const { lang } = await props.params;
  const locale: Locale = isLocale(lang) ? lang : "es";
  const t = T[locale];
  const posts = getAllPosts(locale);

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {t.h1pre}
            <span className="text-gradient">{t.h1grad}</span>
          </h1>
          <p className="mt-4 text-[var(--text-dim)]">{t.sub}</p>
        </header>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={localizedHref(`/blog/${post.slug}`, locale)}
              className="spotlight group flex flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--surface)] transition"
            >
              <div
                className="relative aspect-[16/9] w-full"
                style={{ backgroundImage: seedGradient(post.seed) }}
              >
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                  {post.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold leading-snug transition-colors group-hover:text-[var(--accent-cyan)]">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-[var(--text-dim)]">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center gap-4 text-xs text-[var(--text-faint)]">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarBlank size={14} /> {post.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={14} /> {post.readTime}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="ml-auto text-[var(--text-dim)] transition group-hover:text-[var(--accent-cyan)]"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

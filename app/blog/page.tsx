import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { getAllPosts } from "@/lib/blog";
import { seedGradient } from "@/lib/gradient";
import { ArrowUpRight, Clock, CalendarBlank } from "@phosphor-icons/react/dist/ssr";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Ideas sobre inteligencia artificial, datos e ingeniería, por Farid (Eathan). Análisis técnico sin humo.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Farid · Eathan",
    description:
      "Ideas sobre inteligencia artificial, datos e ingeniería. Análisis técnico sin humo.",
    type: "website",
    url: "/blog",
  },
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main id="main" className="mx-auto max-w-6xl px-4 pb-24 pt-28 sm:px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">El blog</p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Ideas sobre <span className="text-gradient">IA, datos e ingeniería</span>
          </h1>
          <p className="mt-4 text-[var(--text-dim)]">
            Análisis técnico sin humo. Lo que aprendo construyendo con inteligencia
            artificial, contado claro.
          </p>
        </header>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
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

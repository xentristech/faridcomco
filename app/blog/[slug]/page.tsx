import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ArticleBody } from "@/components/blog/article-body";
import { ArticleAI } from "@/components/blog/article-ai";
import { ListenArticle } from "@/components/blog/listen-article";
import { ReadingProgress } from "@/components/blog/reading-progress";
import { ShareBar } from "@/components/blog/share-bar";
import { Comments } from "@/components/blog/comments";
import { getAllPosts, getPost, postPlainText } from "@/lib/blog";
import { seedGradient } from "@/lib/gradient";
import { profile } from "@/lib/profile";
import {
  ArrowLeft,
  Clock,
  CalendarBlank,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: profile.name, url: profile.web }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      authors: [profile.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// Preguntas sugeridas específicas del artículo para arrancar el chat.
const SUGGESTIONS = [
  "¿Qué es la memoria unificada del GB10?",
  "¿Me conviene frente a una RTX 5090?",
  "¿Cuánto cuesta y qué trae preinstalado?",
];

export default async function BlogPostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = getPost(slug);
  if (!post) notFound();

  const plain = postPlainText(post);
  const shareUrl = `${profile.web}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "es",
    keywords: post.tags.join(", "),
    author: { "@type": "Person", name: profile.name, url: profile.web },
    publisher: { "@type": "Person", name: profile.name, url: profile.web },
    mainEntityOfPage: `${profile.web}/blog/${post.slug}`,
  };

  return (
    <>
      <ReadingProgress />
      <Nav />
      <main id="main" className="pb-24 pt-24">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Encabezado */}
        <header className="mx-auto max-w-3xl px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-[var(--text-dim)] transition hover:text-[var(--text)]"
          >
            <ArrowLeft size={16} /> Volver al blog
          </Link>

          <p className="eyebrow mt-6">{post.eyebrow}</p>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-[2.6rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-[var(--text-dim)]">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <div className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-grad text-sm font-bold text-white">
                F
              </span>
              <div className="text-sm leading-tight">
                <p className="font-semibold">{post.author}</p>
                <p className="flex items-center gap-3 text-xs text-[var(--text-faint)]">
                  <span className="inline-flex items-center gap-1">
                    <CalendarBlank size={13} /> {post.dateLabel}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={13} /> {post.readTime}
                  </span>
                </p>
              </div>
            </div>
            <div className="sm:ml-auto">
              <ListenArticle text={plain} />
            </div>
          </div>

          <div className="mt-6 border-t border-[var(--border)] pt-5">
            <ShareBar url={shareUrl} title={post.title} />
          </div>
        </header>

        {/* Portada */}
        <div className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
          <div
            className="aspect-[21/9] w-full rounded-[24px] border border-[var(--border)]"
            style={{ backgroundImage: seedGradient(post.seed) }}
            aria-hidden
          />
        </div>

        {/* Cuerpo + índice */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_220px]">
          <article className="min-w-0 max-w-3xl">
            <ArticleBody blocks={post.blocks} />

            {/* Chat de IA con voz, anclado a este artículo */}
            <ArticleAI slug={post.slug} title={post.title} suggestions={SUGGESTIONS} />

            {/* CTA */}
            <div className="not-prose mt-14 flex flex-wrap items-center justify-between gap-4 rounded-[22px] border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--text-dim)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Link href="/#contacto" className="btn btn-primary !py-2.5 text-sm">
                ¿Un proyecto con IA? Hablemos <ArrowRight size={16} weight="bold" />
              </Link>
            </div>

            {/* Compartir + comentarios */}
            <div className="not-prose mt-10">
              <ShareBar url={shareUrl} title={post.title} />
            </div>
            <Comments slug={post.slug} />
          </article>

          {/* Índice sticky (desktop) */}
          <aside className="hidden lg:block">
            <nav
              aria-label="En este artículo"
              className="sticky top-24 text-sm"
            >
              <p className="eyebrow mb-3">En este artículo</p>
              <ul className="space-y-2 border-l border-[var(--border)]">
                {post.toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="-ml-px block border-l border-transparent py-0.5 pl-3 text-[var(--text-dim)] transition hover:border-[var(--accent)] hover:text-[var(--text)]"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

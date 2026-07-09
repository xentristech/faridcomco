import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";
import { getAllPosts } from "@/lib/blog";

// Sitemap bilingüe: cada ruta aparece en español (raíz) e inglés (/en),
// ambas enlazadas con hreflang para que Google indexe las dos versiones.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const base = profile.web;

  const esUrl = (path: string) => `${base}${path}`;
  const enUrl = (path: string) => `${base}/en${path}`;

  function entry(
    path: string,
    opts: {
      lastModified?: Date;
      changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
      priority?: number;
    } = {}
  ): MetadataRoute.Sitemap {
    const languages = {
      es: esUrl(path),
      en: enUrl(path),
      "x-default": esUrl(path),
    };
    const common = {
      lastModified: opts.lastModified ?? new Date(),
      changeFrequency: opts.changeFrequency ?? ("monthly" as const),
      priority: opts.priority ?? 0.7,
      alternates: { languages },
    };
    return [
      { url: esUrl(path), ...common },
      { url: enUrl(path), ...common },
    ];
  }

  return [
    ...entry("", { changeFrequency: "monthly", priority: 1 }),
    ...entry("/blog", { changeFrequency: "weekly", priority: 0.8 }),
    ...entry("/diagnostico", { changeFrequency: "monthly", priority: 0.9 }),
    ...entry("/playground", { changeFrequency: "monthly", priority: 0.8 }),
    ...posts.flatMap((p) =>
      entry(`/blog/${p.slug}`, {
        lastModified: new Date(p.date),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    ),
  ];
}

import { NextResponse } from "next/server";
import { getPost } from "@/lib/blog";
import { getApprovedComments, createComment } from "@/lib/comments";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET /api/comments?slug=... → comentarios aprobados del post.
export async function GET(req: Request) {
  const slug = new URL(req.url).searchParams.get("slug") ?? "";
  if (!getPost(slug)) {
    return NextResponse.json({ comments: [] });
  }
  const comments = await getApprovedComments(slug);
  return NextResponse.json({ comments });
}

// POST /api/comments → crea un comentario pendiente de moderación.
export async function POST(req: Request) {
  let body: { slug?: string; name?: string; body?: string; website?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  // Honeypot: los bots rellenan campos ocultos. Fingimos éxito y descartamos.
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, pending: true });
  }

  const slug = (body.slug ?? "").toString();
  if (!getPost(slug)) {
    return NextResponse.json({ error: "Artículo no encontrado" }, { status: 404 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 120);
  const text = (body.body ?? "").toString().trim().slice(0, 2000);

  if (name.length < 2) {
    return NextResponse.json({ error: "Escribe tu nombre." }, { status: 400 });
  }
  if (text.length < 3) {
    return NextResponse.json(
      { error: "Tu comentario está muy corto." },
      { status: 400 }
    );
  }

  try {
    await createComment(slug, name, text);
    return NextResponse.json({ ok: true, pending: true });
  } catch (e) {
    console.error("[/api/comments] error:", e);
    return NextResponse.json(
      { error: "No se pudo guardar tu comentario. Intenta más tarde." },
      { status: 503 }
    );
  }
}

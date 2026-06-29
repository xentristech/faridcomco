import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureDb } from "@/lib/ensure-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const name = (body.name ?? "").toString().trim().slice(0, 120);
  const email = (body.email ?? "").toString().trim().slice(0, 160);
  const message = (body.message ?? "").toString().trim().slice(0, 2000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Completa nombre, email y mensaje." },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  try {
    await ensureDb();
    await prisma.lead.create({ data: { name, email, message } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/contact] error:", err);
    return NextResponse.json(
      { error: "No se pudo enviar. Escríbeme por WhatsApp mientras tanto." },
      { status: 500 }
    );
  }
}

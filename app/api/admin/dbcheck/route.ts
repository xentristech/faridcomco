import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Diagnóstico temporal de la DB. Protegido con ADMIN_SECRET.
//   /api/admin/dbcheck?secret=TU_ADMIN_SECRET
// NO filtra la contraseña: solo dice si la URL trae un '#' sin codificar.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.ADMIN_SECRET || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "no autorizado" }, { status: 401 });
  }

  const dbUrl = process.env.DATABASE_URL ?? "";
  const out: Record<string, unknown> = {
    hasDatabaseUrl: dbUrl.length > 0,
    urlHasRawHash: dbUrl.includes("#"), // true = '#' SIN codificar (bug)
    urlHost: dbUrl.replace(/^.*@/, "").slice(0, 60), // host/db, sin credenciales
  };

  try {
    await prisma.$queryRawUnsafe("SELECT 1 AS ok");
    out.connection = "ok";
  } catch (e) {
    out.connection = "FAILED";
    out.connectionError = String(e instanceof Error ? e.message : e).slice(0, 400);
  }

  try {
    out.tables = await prisma.$queryRawUnsafe("SHOW TABLES");
  } catch (e) {
    out.tablesError = String(e instanceof Error ? e.message : e).slice(0, 300);
  }

  return NextResponse.json(out);
}

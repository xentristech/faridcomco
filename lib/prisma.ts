import { PrismaClient } from "@prisma/client";

// Singleton + BLINDAJE: si la DATABASE_URL es inválida, `new PrismaClient()`
// puede lanzar al construir y tumbar TODO el sitio. Lo envolvemos para que,
// si falla, devuelva un proxy que lanza solo al usarse — y como cada consulta
// va dentro de try/catch, el sitio siempre cae al fallback en vez de morir.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createPrisma(): PrismaClient {
  try {
    return new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    });
  } catch (e) {
    console.error("[prisma] inicialización fallida (¿DATABASE_URL inválida?):", e);
    return new Proxy({} as PrismaClient, {
      get() {
        throw new Error(
          "PrismaClient no se pudo inicializar. Revisa DATABASE_URL."
        );
      },
    });
  }
}

export const prisma = globalForPrisma.prisma ?? createPrisma();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import { cookies } from "next/headers";

export const ADMIN_COOKIE = "admin_session";

// Compara la cookie (httpOnly) contra ADMIN_SECRET del entorno.
export async function isAdmin(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === secret;
}

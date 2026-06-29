"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isAdmin, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function toggleProject(id: number, active: boolean) {
  if (!(await isAdmin())) throw new Error("No autorizado");
  await prisma.project.update({ where: { id }, data: { active } });
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function setLeadAttended(id: number, attended: boolean) {
  if (!(await isAdmin())) throw new Error("No autorizado");
  await prisma.lead.update({ where: { id }, data: { attended } });
  revalidatePath("/admin");
}

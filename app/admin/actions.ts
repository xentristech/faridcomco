"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { query } from "@/lib/mysql";
import { isAdmin, ADMIN_COOKIE } from "@/lib/admin-auth";

export async function logout() {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}

export async function toggleProject(id: number, active: boolean) {
  if (!(await isAdmin())) throw new Error("No autorizado");
  await query("UPDATE `projects` SET `active` = ? WHERE `id` = ?", [
    active ? 1 : 0,
    id,
  ]);
  revalidatePath("/admin");
  revalidatePath("/");
}

export async function setLeadAttended(id: number, attended: boolean) {
  if (!(await isAdmin())) throw new Error("No autorizado");
  await query("UPDATE `leads` SET `attended` = ? WHERE `id` = ?", [
    attended ? 1 : 0,
    id,
  ]);
  revalidatePath("/admin");
}

export async function setCommentApproved(id: number, approved: boolean) {
  if (!(await isAdmin())) throw new Error("No autorizado");
  await query("UPDATE `comments` SET `approved` = ? WHERE `id` = ?", [
    approved ? 1 : 0,
    id,
  ]);
  revalidatePath("/admin");
}

export async function deleteComment(id: number) {
  if (!(await isAdmin())) throw new Error("No autorizado");
  await query("DELETE FROM `comments` WHERE `id` = ?", [id]);
  revalidatePath("/admin");
}

import { query } from "./mysql";
import { withTimeout } from "./with-timeout";

export type CommentDTO = {
  id: number;
  name: string;
  body: string;
  createdAt: string | Date;
};

export type AdminComment = CommentDTO & {
  slug: string;
  approved: number;
};

// Comentarios aprobados de un post (para el público). Si la DB falla → [].
export async function getApprovedComments(slug: string): Promise<CommentDTO[]> {
  try {
    return await withTimeout(
      query<CommentDTO>(
        "SELECT `id`, `name`, `body`, `created_at` AS `createdAt` FROM `comments` WHERE `slug` = ? AND `approved` = 1 ORDER BY `created_at` DESC",
        [slug]
      )
    );
  } catch {
    return [];
  }
}

// Inserta un comentario SIN aprobar (queda pendiente de moderación).
export async function createComment(
  slug: string,
  name: string,
  body: string
): Promise<void> {
  await withTimeout(
    query(
      "INSERT INTO `comments` (`slug`, `name`, `body`, `approved`) VALUES (?, ?, ?, 0)",
      [slug, name, body]
    )
  );
}

// Todos los comentarios (panel admin), pendientes primero.
export async function getAllComments(): Promise<AdminComment[]> {
  return withTimeout(
    query<AdminComment>(
      "SELECT `id`, `slug`, `name`, `body`, `approved`, `created_at` AS `createdAt` FROM `comments` ORDER BY `approved` ASC, `created_at` DESC"
    )
  );
}

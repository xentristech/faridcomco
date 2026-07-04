import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { query } from "@/lib/mysql";
import { withTimeout } from "@/lib/with-timeout";
import { getAllComments, type AdminComment } from "@/lib/comments";
import {
  toggleProject,
  setLeadAttended,
  setCommentApproved,
  deleteComment,
  logout,
} from "./actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  id: number;
  name: string;
  email: string;
  message: string;
  attended: number;
  createdAt: string | Date;
};
type Project = {
  id: number;
  name: string;
  tag: string;
  active: number;
};

const fmt = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  let leads: Lead[] = [];
  let projects: Project[] = [];
  let comments: AdminComment[] = [];
  let dbError = false;
  try {
    [leads, projects, comments] = await withTimeout(
      Promise.all([
        query<Lead>(
          "SELECT `id`, `name`, `email`, `message`, `attended`, `created_at` AS `createdAt` FROM `leads` ORDER BY `created_at` DESC"
        ),
        query<Project>(
          "SELECT `id`, `name`, `tag`, `active` FROM `projects` ORDER BY `order` ASC"
        ),
        getAllComments(),
      ])
    );
  } catch {
    dbError = true;
  }

  const pending = leads.filter((l) => !l.attended).length;
  const pendingComments = comments.filter((c) => !c.approved).length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Panel</h1>
          <p className="text-sm text-[var(--text-dim)]">
            {pending} lead{pending === 1 ? "" : "s"} sin atender ·{" "}
            {pendingComments} comentario{pendingComments === 1 ? "" : "s"} por
            aprobar
          </p>
        </div>
        <form action={logout}>
          <button type="submit" className="btn btn-ghost !px-4 !py-2 text-sm">
            Salir
          </button>
        </form>
      </header>

      {dbError && (
        <p
          role="alert"
          className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300"
        >
          No se pudo conectar a la base de datos, o las tablas no existen.
          Llama a <code>/api/admin/migrate?secret=…</code> primero.
        </p>
      )}

      {/* Leads */}
      <section className="mt-10">
        <h2 className="text-lg font-semibold tracking-tight">Leads</h2>
        {leads.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--text-faint)]">
            Aún no hay mensajes.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {leads.map((l) => (
              <li
                key={l.id}
                className={`card p-5 ${l.attended ? "opacity-60" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium">
                      {l.name}{" "}
                      <a
                        href={`mailto:${l.email}`}
                        className="text-sm font-normal text-[var(--accent)] hover:underline"
                      >
                        {l.email}
                      </a>
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-faint)]">
                      {fmt.format(new Date(l.createdAt))}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--text-dim)]">
                      {l.message}
                    </p>
                  </div>
                  <form
                    action={setLeadAttended.bind(null, l.id, !l.attended)}
                  >
                    <button
                      type="submit"
                      className="btn btn-ghost !px-3 !py-1.5 text-xs"
                    >
                      {l.attended ? "Marcar pendiente" : "Marcar atendido"}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Proyectos */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">Proyectos</h2>
        {projects.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--text-faint)]">
            No hay proyectos en la base de datos. Llama al endpoint de migración.
          </p>
        ) : (
          <ul className="mt-4 space-y-2">
            {projects.map((p) => (
              <li
                key={p.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{p.name}</p>
                  <p className="text-xs text-[var(--text-faint)]">{p.tag}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`text-xs font-medium ${
                      p.active ? "text-emerald-400" : "text-[var(--text-faint)]"
                    }`}
                  >
                    {p.active ? "Activo" : "Oculto"}
                  </span>
                  <form action={toggleProject.bind(null, p.id, !p.active)}>
                    <button
                      type="submit"
                      className="btn btn-ghost !px-3 !py-1.5 text-xs"
                    >
                      {p.active ? "Ocultar" : "Activar"}
                    </button>
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Comentarios del blog */}
      <section className="mt-12">
        <h2 className="text-lg font-semibold tracking-tight">
          Comentarios del blog
        </h2>
        {comments.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--text-faint)]">
            Aún no hay comentarios.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {comments.map((c) => (
              <li
                key={c.id}
                className={`card p-5 ${c.approved ? "opacity-60" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium">
                      {c.name}{" "}
                      {!c.approved && (
                        <span className="ml-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-normal text-amber-300">
                          Pendiente
                        </span>
                      )}
                    </p>
                    <p className="mt-1 text-xs text-[var(--text-faint)]">
                      {fmt.format(new Date(c.createdAt))} · en{" "}
                      <code className="text-[var(--text-dim)]">{c.slug}</code>
                    </p>
                    <p className="mt-2 whitespace-pre-wrap text-sm text-[var(--text-dim)]">
                      {c.body}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <form
                      action={setCommentApproved.bind(
                        null,
                        c.id,
                        !c.approved
                      )}
                    >
                      <button
                        type="submit"
                        className="btn btn-ghost !px-3 !py-1.5 text-xs"
                      >
                        {c.approved ? "Ocultar" : "Aprobar"}
                      </button>
                    </form>
                    <form action={deleteComment.bind(null, c.id)}>
                      <button
                        type="submit"
                        className="btn btn-ghost !px-3 !py-1.5 text-xs text-red-300 hover:!border-red-500/50"
                      >
                        Borrar
                      </button>
                    </form>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

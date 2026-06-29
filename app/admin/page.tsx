import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { ensureDb } from "@/lib/ensure-db";
import { withTimeout } from "@/lib/with-timeout";
import { toggleProject, setLeadAttended, logout } from "./actions";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Lead = {
  id: number;
  name: string;
  email: string;
  message: string;
  attended: boolean;
  createdAt: Date;
};
type Project = {
  id: number;
  name: string;
  tag: string;
  active: boolean;
  order: number;
};

const fmt = new Intl.DateTimeFormat("es-CO", {
  dateStyle: "medium",
  timeStyle: "short",
});

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  let leads: Lead[] = [];
  let projects: Project[] = [];
  let dbError = false;
  try {
    await withTimeout(ensureDb());
    [leads, projects] = await withTimeout(
      Promise.all([
        prisma.lead.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.project.findMany({ orderBy: { order: "asc" } }),
      ])
    );
  } catch {
    dbError = true;
  }

  const pending = leads.filter((l) => !l.attended).length;

  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <header className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Panel</h1>
          <p className="text-sm text-[var(--text-dim)]">
            {pending} lead{pending === 1 ? "" : "s"} sin atender
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
          No se pudo conectar a la base de datos. Revisa DATABASE_URL en el
          servidor.
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
                  <form action={setLeadAttended.bind(null, l.id, !l.attended)}>
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
            No hay proyectos en la base de datos. Corre el seed.
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
    </main>
  );
}

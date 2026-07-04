"use client";

import { useEffect, useState } from "react";
import { ChatText, PaperPlaneTilt } from "@phosphor-icons/react";

type Comment = {
  id: number;
  name: string;
  body: string;
  createdAt: string;
};

const fmt = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

export function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loaded, setLoaded] = useState(false);

  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [website, setWebsite] = useState(""); // honeypot anti-bots
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let alive = true;
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((d) => {
        if (alive) setComments(d.comments ?? []);
      })
      .catch(() => {})
      .finally(() => alive && setLoaded(true));
    return () => {
      alive = false;
    };
  }, [slug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (sending || name.trim().length < 2 || body.trim().length < 3) return;
    setSending(true);
    setStatus("idle");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, body, website }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("ok");
        setName("");
        setBody("");
      } else {
        setStatus("error");
        setErrorMsg(data.error ?? "No se pudo enviar.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Hubo un problema de conexión.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section aria-label="Comentarios" className="mx-auto mt-16 max-w-3xl">
      <h2 className="flex items-center gap-2 text-xl font-semibold tracking-tight">
        <ChatText size={22} weight="fill" className="text-[var(--accent-2)]" />
        Comentarios
        {comments.length > 0 && (
          <span className="text-sm font-normal text-[var(--text-faint)]">
            ({comments.length})
          </span>
        )}
      </h2>

      {/* Formulario */}
      <form
        onSubmit={submit}
        className="mt-5 rounded-[20px] border border-[var(--border)] bg-[var(--surface)] p-5"
      >
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre"
          aria-label="Tu nombre"
          maxLength={120}
          className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-2.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)]"
        />
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Comparte tu opinión sobre el artículo…"
          aria-label="Tu comentario"
          rows={3}
          maxLength={2000}
          className="mt-3 w-full resize-y rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-2.5 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)]"
        />

        {/* Honeypot: oculto para humanos, tentador para bots */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="hidden"
          aria-hidden
        />

        <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-faint)]">
            Tu comentario se publica tras una revisión rápida.
          </p>
          <button
            type="submit"
            disabled={sending || name.trim().length < 2 || body.trim().length < 3}
            className="btn btn-primary !py-2.5 text-sm disabled:opacity-40"
          >
            <PaperPlaneTilt size={15} weight="fill" />
            {sending ? "Enviando…" : "Comentar"}
          </button>
        </div>

        {status === "ok" && (
          <p
            role="status"
            className="mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300"
          >
            ¡Gracias! Tu comentario quedó pendiente de aprobación.
          </p>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
          >
            {errorMsg}
          </p>
        )}
      </form>

      {/* Lista */}
      <div className="mt-6 space-y-4">
        {loaded && comments.length === 0 && (
          <p className="text-sm text-[var(--text-faint)]">
            Sé el primero en opinar.
          </p>
        )}
        {comments.map((c) => (
          <article
            key={c.id}
            className="flex gap-3 rounded-[18px] border border-[var(--border)] bg-[var(--surface)] p-4"
          >
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-grad text-sm font-bold text-white">
              {c.name.trim().charAt(0).toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="flex items-baseline gap-2 text-sm">
                <span className="font-semibold text-[var(--text)]">{c.name}</span>
                <span className="text-xs text-[var(--text-faint)]">
                  {fmt.format(new Date(c.createdAt))}
                </span>
              </p>
              <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-[var(--text-dim)]">
                {c.body}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

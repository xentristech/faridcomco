"use client";

import { useState } from "react";
import {
  MapPin,
  WhatsappLogo,
  EnvelopeSimple,
  DownloadSimple,
  House,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";
import { profile, whatsappUrl, mailtoUrl } from "@/lib/profile";
import { downloadVCard } from "@/lib/vcard";
import { Reveal } from "./reveal";

const mapQuery = encodeURIComponent(
  `${profile.address}, Barranquilla, Colombia`
);

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [error, setError] = useState("");

  function update(field: keyof typeof form) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("ok");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? "No se pudo enviar.");
        setStatus("error");
      }
    } catch {
      setError("Error de conexión. Escríbeme por WhatsApp.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle size={40} weight="fill" className="text-emerald-400" />
        <p className="font-medium">¡Gracias! Recibí tu mensaje.</p>
        <p className="text-sm text-[var(--text-dim)]">
          Te respondo lo antes posible.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-ghost mt-1 !px-4 !py-2 text-sm"
        >
          Enviar otro
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card flex flex-col gap-4 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="c-name"
            className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--text-faint)]"
          >
            Nombre
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            placeholder="Tu nombre…"
            className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-[rgba(79,124,255,0.25)]"
          />
        </div>
        <div>
          <label
            htmlFor="c-email"
            className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--text-faint)]"
          >
            Email
          </label>
          <input
            id="c-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            value={form.email}
            onChange={update("email")}
            placeholder="tucorreo@ejemplo.com"
            className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-[rgba(79,124,255,0.25)]"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="c-message"
          className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--text-faint)]"
        >
          Mensaje
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder="Cuéntame sobre tu proyecto…"
          className="w-full resize-y rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-[rgba(79,124,255,0.25)]"
        />
      </div>

      {status === "error" && (
        <p role="alert" aria-live="polite" className="text-sm text-red-400">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Enviando…" : "Enviar mensaje"}
        {status !== "loading" && <PaperPlaneTilt size={18} weight="fill" />}
      </button>
    </form>
  );
}

export function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-4">Contacto</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Hablemos de tu próximo{" "}
          <span className="text-gradient">proyecto con IA</span>.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.1fr]">
        {/* Formulario + datos */}
        <Reveal className="flex flex-col gap-4">
          <ContactForm />

          <div className="card p-6">
            <div className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[var(--surface-strong)] text-[var(--accent)]">
                <MapPin size={22} weight="duotone" />
              </span>
              <div>
                <p className="text-sm text-[var(--text-faint)]">Ubicación</p>
                <p className="font-medium">{profile.city}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--text-dim)]">
                  <House size={15} weight="duotone" />
                  {profile.address}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <a
              href={whatsappUrl("Hola Farid, quiero hablar sobre un proyecto.")}
              target="_blank"
              rel="noopener noreferrer"
              className="spotlight card flex flex-col gap-2 p-6 transition-transform hover:-translate-y-1"
            >
              <WhatsappLogo size={26} weight="fill" className="text-[var(--accent-cyan)]" />
              <span className="font-medium">WhatsApp</span>
              <span className="text-sm text-[var(--text-dim)]">Respuesta rápida</span>
            </a>
            <a
              href={mailtoUrl("Proyecto con IA")}
              className="spotlight card flex flex-col gap-2 p-6 transition-transform hover:-translate-y-1"
            >
              <EnvelopeSimple size={26} weight="duotone" className="text-[var(--accent)]" />
              <span className="font-medium">Email</span>
              <span className="truncate text-sm text-[var(--text-dim)]">
                {profile.email}
              </span>
            </a>
          </div>

          <button onClick={downloadVCard} className="btn btn-ghost w-full">
            <DownloadSimple size={18} weight="bold" />
            Guardar mi contacto (.vcf)
          </button>
        </Reveal>

        {/* Mapa */}
        <Reveal delay={0.1} className="overflow-hidden rounded-[20px] border border-[var(--border)]">
          <iframe
            title="Ubicación de Farid en Barranquilla"
            src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full min-h-[320px] w-full grayscale-[0.3] invert-[0.92] hue-rotate-180"
          />
        </Reveal>
      </div>
    </section>
  );
}

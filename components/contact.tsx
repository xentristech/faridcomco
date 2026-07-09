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
import { useI18n } from "./i18n";

const mapQuery = encodeURIComponent(
  `${profile.address}, Barranquilla, Colombia`
);

function ContactForm() {
  const { c } = useI18n();
  const f = c.contact.form;
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
        setError(data.error ?? f.errGeneric);
        setStatus("error");
      }
    } catch {
      setError(f.errConn);
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <CheckCircle size={40} weight="fill" className="text-emerald-400" />
        <p className="font-medium">{f.okTitle}</p>
        <p className="text-sm text-[var(--text-dim)]">
          {f.okSub}
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="btn btn-ghost mt-1 !px-4 !py-2 text-sm"
        >
          {f.sendAnother}
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
            {f.name}
          </label>
          <input
            id="c-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={update("name")}
            placeholder={f.namePh}
            className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-[rgba(79,124,255,0.25)]"
          />
        </div>
        <div>
          <label
            htmlFor="c-email"
            className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--text-faint)]"
          >
            {f.email}
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
            placeholder={f.emailPh}
            className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)] focus:ring-2 focus:ring-[rgba(79,124,255,0.25)]"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="c-message"
          className="mb-1.5 block text-xs uppercase tracking-wider text-[var(--text-faint)]"
        >
          {f.message}
        </label>
        <textarea
          id="c-message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={update("message")}
          placeholder={f.messagePh}
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
        {status === "loading" ? f.sending : f.send}
        {status !== "loading" && <PaperPlaneTilt size={18} weight="fill" />}
      </button>
    </form>
  );
}

export function Contact() {
  const { c } = useI18n();
  return (
    <section id="contacto" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32">
      <Reveal>
        <p className="eyebrow mb-4">{c.contact.eyebrow}</p>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          {c.contact.headPre}
          <span className="text-gradient">{c.contact.headGrad}</span>
          {c.contact.headPost}
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
                <p className="text-sm text-[var(--text-faint)]">{c.contact.locationLabel}</p>
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
              href={whatsappUrl(c.contact.whatsappMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="spotlight card flex flex-col gap-2 p-6 transition-transform hover:-translate-y-1"
            >
              <WhatsappLogo size={26} weight="fill" className="text-[var(--accent-cyan)]" />
              <span className="font-medium">WhatsApp</span>
              <span className="text-sm text-[var(--text-dim)]">{c.contact.whatsappFast}</span>
            </a>
            <a
              href={mailtoUrl(c.contact.mailSubject)}
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
            {c.contact.saveVcf}
          </button>
        </Reveal>

        {/* Mapa */}
        <Reveal delay={0.1} className="overflow-hidden rounded-[20px] border border-[var(--border)]">
          <iframe
            title={c.contact.mapTitle}
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

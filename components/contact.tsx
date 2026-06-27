"use client";

import {
  MapPin,
  WhatsappLogo,
  EnvelopeSimple,
  DownloadSimple,
  House,
} from "@phosphor-icons/react";
import { profile, whatsappUrl, mailtoUrl } from "@/lib/profile";
import { downloadVCard } from "@/lib/vcard";
import { Reveal } from "./reveal";

const mapQuery = encodeURIComponent(
  `${profile.address}, Barranquilla, Colombia`
);

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
        {/* Datos + acciones */}
        <Reveal className="flex flex-col gap-4">
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

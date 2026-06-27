"use client";

import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { WhatsappLogo } from "@phosphor-icons/react";
import { ParticleField } from "./particle-field";
import { useAudience } from "./audience-context";
import { profile, audiences, whatsappUrl } from "@/lib/profile";
import { downloadVCard } from "@/lib/vcard";

export function Hero() {
  const { audience, setAudience } = useAudience();
  const data = audiences[audience];
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16"
    >
      {/* Fondo: red neuronal + halos de gradiente */}
      <ParticleField />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-1/3 left-1/2 h-[70vh] w-[70vh] -translate-x-1/2 rounded-full opacity-40 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(124,108,255,0.5), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-[50vh] w-[50vh] rounded-full opacity-30 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.4), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Columna texto */}
        <div>
          {/* Selector de audiencia */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex rounded-full border border-[var(--border)] bg-[var(--surface)] p-1 backdrop-blur-xl"
          >
            {(Object.keys(audiences) as (keyof typeof audiences)[]).map((k) => (
              <button
                key={k}
                onClick={() => setAudience(k)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  audience === k
                    ? "text-white"
                    : "text-[var(--text-dim)] hover:text-[var(--text)]"
                }`}
              >
                {audience === k && (
                  <motion.span
                    layoutId="aud-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-grad"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {audiences[k].label}
              </button>
            ))}
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="eyebrow mb-5"
          >
            {profile.role}
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Convierto datos e IA en{" "}
            <span className="text-gradient">decisiones inteligentes.</span>
          </motion.h1>

          <div className="mt-6 min-h-[72px] max-w-[52ch]">
            <AnimatePresence mode="wait">
              <motion.p
                key={audience}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
                className="text-lg leading-relaxed text-[var(--text-dim)]"
              >
                {data.sub}
              </motion.p>
            </AnimatePresence>
          </div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a href="#contacto" className="btn btn-primary">
              {data.cta}
            </a>
            <a href="#proyectos" className="btn btn-ghost">
              Ver proyectos
            </a>
            <a
              href={whatsappUrl("Hola Farid, vi tu web y quiero conversar sobre un proyecto con IA.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <WhatsappLogo size={18} weight="fill" />
              WhatsApp
            </a>
          </motion.div>

          <button
            onClick={downloadVCard}
            className="mt-5 text-sm text-[var(--text-faint)] underline-offset-4 transition-colors hover:text-[var(--text)] hover:underline"
          >
            o guarda mi contacto en tu teléfono (.vcf)
          </button>
        </div>

        {/* Columna foto */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto hidden aspect-square w-full max-w-[380px] place-items-center lg:grid"
        >
          {/* anillos orbitales */}
          <div className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-[var(--border-strong)]" />
          <div
            className="absolute inset-6 rounded-full border border-[rgba(124,108,255,0.25)]"
            style={{ animation: "spin-slow 55s linear infinite reverse" }}
          />
          <div
            aria-hidden
            className="absolute inset-10 rounded-full opacity-60 blur-2xl"
            style={{
              background:
                "radial-gradient(circle, rgba(79,124,255,0.5), transparent 70%)",
            }}
          />
          <div className="relative h-[64%] w-[64%] overflow-hidden rounded-full border border-[var(--border-strong)] bg-[var(--bg-elev)] shadow-2xl">
            <Image
              src={profile.photo}
              alt={profile.name}
              fill
              priority
              sizes="280px"
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

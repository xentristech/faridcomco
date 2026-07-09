"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ArrowLeft,
  Sparkle,
  CheckCircle,
  Target,
  Lightning,
  Stack,
  PaperPlaneTilt,
  WhatsappLogo,
} from "@phosphor-icons/react";
import { getSteps, type Answers, type Report } from "@/lib/diagnostico";
import { profile, whatsappUrl } from "@/lib/profile";
import { useI18n } from "../i18n";

type Phase = "quiz" | "loading" | "result";

const W = {
  es: {
    loading: "Eathan está armando tu diagnóstico de IA…",
    question: "Pregunta", of: "de", skip: "Saltar", continue: "Continuar", back: "Atrás",
    yourDx: "Tu diagnóstico", opps: "Oportunidades para ti", stack: "Stack sugerido",
    firstStep: "Primer paso", impact: "Impacto esperado: ",
    savedMsg: "¡Listo! Farid te contactará con el plan completo.",
    convert: "¿Quieres que Farid lo convierta en un plan real?",
    namePh: "Tu nombre", emailPh: "Tu email", sending: "Enviando…", send: "Enviar",
    waMsg: (t: string) => `Hola Farid, hice el diagnóstico de IA (${t}) y quiero avanzar.`,
    orWa: "O escríbele por WhatsApp", restart: "Volver a empezar",
    disclaimer: (email: string) => `Diagnóstico generado por IA con base en tus respuestas. No sustituye una asesoría formal. Escríbele a ${email} para el plan completo.`,
    fallback: {
      titulo: "Plan de IA para tu negocio",
      diagnostico: "Tuvimos un problema generando el informe, pero podemos hacerlo contigo directamente.",
      oportunidades: ["Automatizar tu proceso más manual.", "Un asistente de IA para tus clientes.", "Un dashboard para decidir con datos."],
      stack: ["LLMs", "Automatización", "Dashboards"],
      primerPaso: "Escríbele a Farid para una llamada corta.",
      impacto: "Menos trabajo manual y decisiones más rápidas.",
    },
  },
  en: {
    loading: "Eathan is putting together your AI diagnosis…",
    question: "Question", of: "of", skip: "Skip", continue: "Continue", back: "Back",
    yourDx: "Your diagnosis", opps: "Opportunities for you", stack: "Suggested stack",
    firstStep: "First step", impact: "Expected impact: ",
    savedMsg: "Done! Farid will reach out with the full plan.",
    convert: "Want Farid to turn this into a real plan?",
    namePh: "Your name", emailPh: "Your email", sending: "Sending…", send: "Send",
    waMsg: (t: string) => `Hi Farid, I did the AI diagnosis (${t}) and I'd like to move forward.`,
    orWa: "Or message him on WhatsApp", restart: "Start over",
    disclaimer: (email: string) => `AI-generated diagnosis based on your answers. It doesn't replace formal advice. Email ${email} for the full plan.`,
    fallback: {
      titulo: "AI plan for your business",
      diagnostico: "We had a problem generating the report, but we can do it with you directly.",
      oportunidades: ["Automate your most manual process.", "An AI assistant for your customers.", "A dashboard to decide with data."],
      stack: ["LLMs", "Automation", "Dashboards"],
      primerPaso: "Message Farid for a short call.",
      impacto: "Less manual work and faster decisions.",
    },
  },
};

export function DiagnosticoWizard() {
  const { locale } = useI18n();
  const w = W[locale];
  const steps = getSteps(locale);
  const [phase, setPhase] = useState<Phase>("quiz");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [text, setText] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const step = steps[index];
  const progress = (index / steps.length) * 100;

  function setAnswer(value: string) {
    const next = { ...answers, [step.id]: value };
    setAnswers(next);
    advance(next);
  }

  function advance(current: Answers) {
    setText("");
    if (index < steps.length - 1) {
      setIndex((i) => i + 1);
    } else {
      generate(current);
    }
  }

  function back() {
    if (index > 0) {
      setIndex((i) => i - 1);
      setText("");
    }
  }

  async function generate(finalAnswers: Answers) {
    setPhase("loading");
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers, lang: locale }),
      });
      const data = await res.json();
      if (data.report) {
        setReport(data.report);
        setPhase("result");
      } else {
        throw new Error("sin informe");
      }
    } catch {
      // Fallback ultra-defensivo por si la red falla del todo.
      setReport(w.fallback);
      setPhase("result");
    }
  }

  async function saveLead(e: React.FormEvent) {
    e.preventDefault();
    if (saving || !email.trim() || !report) return;
    setSaving(true);
    try {
      const res = await fetch("/api/diagnostico", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          saveOnly: true,
          answers,
          name,
          email,
          titulo: report.titulo,
        }),
      });
      const data = await res.json();
      setSaved(Boolean(data.saved));
    } catch {
      setSaved(false);
    } finally {
      setSaving(false);
    }
  }

  function restart() {
    setPhase("quiz");
    setIndex(0);
    setAnswers({});
    setReport(null);
    setSaved(false);
    setEmail("");
    setName("");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="spotlight overflow-hidden rounded-[24px] border border-[var(--border-strong)] bg-[rgba(10,12,22,0.72)] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        {/* LOADING (fuera de AnimatePresence para que siempre sea visible) */}
        {phase === "loading" && (
          <div className="flex flex-col items-center gap-4 py-14 text-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-grad text-white">
              <Sparkle size={26} weight="fill" className="animate-spin-slow" />
            </span>
            <p className="text-sm text-[var(--text-dim)]">{w.loading}</p>
          </div>
        )}

        {/* Barra de progreso */}
        {phase === "quiz" && (
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-faint)]">
              <span>
                {w.question} {index + 1} {w.of} {steps.length}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[var(--surface-strong)]">
              <div
                className="h-full rounded-full bg-grad transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* QUIZ */}
          {phase === "quiz" && (
            <motion.div
              key={`step-${index}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">
                {step.question}
              </h2>

              {step.type === "choice" ? (
                <div className="mt-5 grid gap-2.5">
                  {step.options!.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setAnswer(opt)}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left text-sm text-[var(--text)] transition hover:border-[rgba(124,108,255,0.6)] hover:bg-[var(--surface-strong)]"
                    >
                      {opt}
                      <ArrowRight
                        size={16}
                        className="shrink-0 text-[var(--text-faint)] transition group-hover:translate-x-0.5 group-hover:text-[var(--accent-cyan)]"
                      />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="mt-5">
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && text.trim() && setAnswer(text.trim())
                    }
                    placeholder={step.placeholder}
                    aria-label={step.question}
                    autoFocus
                    className="w-full rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-3 text-sm text-[var(--text)] outline-none transition placeholder:text-[var(--text-faint)] focus:border-[rgba(124,108,255,0.6)]"
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    {step.optional && (
                      <button
                        onClick={() => setAnswer("")}
                        className="btn btn-ghost !py-2.5 text-sm"
                      >
                        {w.skip}
                      </button>
                    )}
                    <button
                      onClick={() => setAnswer(text.trim())}
                      disabled={!step.optional && !text.trim()}
                      className="btn btn-primary !py-2.5 text-sm disabled:opacity-40"
                    >
                      {w.continue} <ArrowRight size={15} weight="bold" />
                    </button>
                  </div>
                </div>
              )}

              {index > 0 && (
                <button
                  onClick={back}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm text-[var(--text-dim)] transition hover:text-[var(--text)]"
                >
                  <ArrowLeft size={15} /> {w.back}
                </button>
              )}
            </motion.div>
          )}

          {/* RESULT */}
          {phase === "result" && report && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="eyebrow">{w.yourDx}</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-gradient">
                {report.titulo}
              </h2>
              <p className="mt-3 text-[var(--text-dim)]">{report.diagnostico}</p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Target size={17} weight="fill" className="text-[var(--accent)]" />
                    {w.opps}
                  </p>
                  <ul className="mt-2 space-y-2">
                    {report.oportunidades.map((o, i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-[var(--text-dim)]">
                        <CheckCircle
                          size={17}
                          weight="fill"
                          className="mt-0.5 shrink-0 text-emerald-400"
                        />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Stack size={17} weight="fill" className="text-[var(--accent-2)]" />
                    {w.stack}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {report.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--text-dim)]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[rgba(79,124,255,0.3)] bg-[rgba(79,124,255,0.08)] p-4">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <Lightning size={16} weight="fill" className="text-[var(--accent-cyan)]" />
                    {w.firstStep}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text)]">{report.primerPaso}</p>
                </div>

                <p className="text-sm text-[var(--text-dim)]">
                  <span className="font-semibold text-[var(--text)]">{w.impact}</span>
                  {report.impacto}
                </p>
              </div>

              {/* Captura de lead / CTA */}
              <div className="mt-7 border-t border-[var(--border)] pt-6">
                {saved ? (
                  <p
                    role="status"
                    className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300"
                  >
                    <CheckCircle size={18} weight="fill" />
                    {w.savedMsg}
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-semibold">{w.convert}</p>
                    <form onSubmit={saveLead} className="mt-3 grid gap-2.5 sm:grid-cols-[1fr_1fr_auto]">
                      <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={w.namePh}
                        aria-label={w.namePh}
                        className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[rgba(124,108,255,0.6)]"
                      />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={w.emailPh}
                        aria-label={w.emailPh}
                        required
                        className="rounded-xl border border-[var(--border-strong)] bg-[var(--bg-elev)] px-4 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[rgba(124,108,255,0.6)]"
                      />
                      <button
                        type="submit"
                        disabled={saving || !email.trim()}
                        className="btn btn-primary !py-2.5 text-sm disabled:opacity-40"
                      >
                        <PaperPlaneTilt size={15} weight="fill" />
                        {saving ? w.sending : w.send}
                      </button>
                    </form>
                  </>
                )}

                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <a
                    href={whatsappUrl(w.waMsg(report.titulo))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-[var(--text-dim)] transition hover:text-[var(--text)]"
                  >
                    <WhatsappLogo size={18} weight="fill" className="text-emerald-400" />
                    {w.orWa}
                  </a>
                  <button
                    onClick={restart}
                    className="ml-auto text-sm text-[var(--text-faint)] transition hover:text-[var(--text)]"
                  >
                    {w.restart}
                  </button>
                </div>
                <p className="mt-3 text-[11px] text-[var(--text-faint)]">
                  {w.disclaimer(profile.email)}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

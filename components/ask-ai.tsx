"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChatCircleDots,
  X,
  PaperPlaneTilt,
  Sparkle,
} from "@phosphor-icons/react";

type Msg = { role: "user" | "assistant"; content: string };

const intro: Msg = {
  role: "assistant",
  content:
    "¡Hola! Soy Eathan, la IA de Farid (su gemelo digital). Pregúntame sobre sus servicios de IA, proyectos, automatización o cómo trabajar con él.",
};

const suggestions = [
  "¿Cómo te llamas?",
  "¿Qué servicios ofrece Farid?",
  "¿Dónde veo su trabajo?",
];

export function AskAI() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([intro]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading, open]);

  // Cerrar el panel con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    const next = [...messages, { role: "user" as const, content: value }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "chat",
          message: value,
          history: next.slice(1, -1),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.reply ?? "Ups, no pude responder. Intenta de nuevo.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Hubo un problema de conexión. Escríbele directo por WhatsApp o email.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Boton flotante */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Habla con Eathan, la IA de Farid"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-grad px-4 py-3 font-semibold text-white shadow-[0_14px_40px_-12px_rgba(124,108,255,0.9)]"
      >
        {open ? (
          <X size={20} weight="bold" />
        ) : (
          <>
            <ChatCircleDots size={20} weight="fill" />
            <span className="hidden sm:inline">Habla con Eathan</span>
          </>
        )}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            role="dialog"
            aria-label="Chat con Eathan, la IA de Farid"
            className="fixed bottom-20 right-5 z-50 flex h-[min(560px,72vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-[22px] border border-[var(--border-strong)] bg-[rgba(10,12,22,0.92)] shadow-2xl backdrop-blur-2xl"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-[var(--border)] p-4">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-grad text-white">
                <Sparkle size={18} weight="fill" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-semibold">Eathan</p>
                <p className="flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  IA de Farid · En línea
                </p>
              </div>
            </div>

            {/* mensajes */}
            <div
              ref={scrollRef}
              role="log"
              aria-live="polite"
              aria-atomic="false"
              className="flex-1 space-y-3 overflow-y-auto overscroll-contain p-4"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${
                    m.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-br-md bg-grad text-white"
                        : "rounded-bl-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[var(--text-dim)]"
                        style={{
                          animation: "pulse-soft 1s ease-in-out infinite",
                          animationDelay: `${d * 0.18}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {messages.length === 1 && !loading && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs text-[var(--text-dim)] transition hover:border-[rgba(124,108,255,0.5)] hover:text-[var(--text)]"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <div className="border-t border-[var(--border)] p-3">
              <div className="flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elev)] py-1 pl-4 pr-1 transition focus-within:border-[rgba(124,108,255,0.6)] focus-within:ring-2 focus-within:ring-[rgba(79,124,255,0.25)]">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder="Escribe tu pregunta…"
                  aria-label="Escribe tu pregunta para Eathan"
                  autoComplete="off"
                  className="flex-1 bg-transparent py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-faint)]"
                />
                <button
                  onClick={() => send(input)}
                  disabled={!input.trim() || loading}
                  aria-label="Enviar"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-grad text-white transition disabled:opacity-40"
                >
                  <PaperPlaneTilt size={16} weight="fill" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

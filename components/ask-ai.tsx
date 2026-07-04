"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChatCircleDots,
  X,
  PaperPlaneTilt,
  Sparkle,
  Microphone,
  SpeakerHigh,
  Stop,
} from "@phosphor-icons/react";
import { useTTS } from "./use-tts";
import { useMic } from "./use-mic";

type Msg = { role: "user" | "assistant"; content: string };

const intro: Msg = {
  role: "assistant",
  content:
    "¡Hola! Soy Eathan, la IA de Farid (su gemelo digital). Pregúntame sobre sus servicios de IA, proyectos, automatización o cómo trabajar con él. Puedes escribirme o hablarme por voz.",
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
  const [voiceMode, setVoiceMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { supported: ttsSupported, speaking, speak, stop: stopTTS } = useTTS();
  const {
    supported: micSupported,
    listening,
    interim,
    start: startMic,
    stop: stopMic,
    toggle: toggleMic,
  } = useMic((text) => send(text));

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

  // Manos libres: en modo voz, cuando Eathan termina de hablar (y no está
  // cargando ni escuchando), vuelve a activar el micrófono.
  useEffect(() => {
    if (!voiceMode || !open || speaking || loading || listening) return;
    if (!micSupported) return;
    const id = setTimeout(() => startMic(), 350);
    return () => clearTimeout(id);
  }, [voiceMode, open, speaking, loading, listening, micSupported, startMic]);

  // Al apagar el modo voz o cerrar el panel, corta micrófono y lectura.
  useEffect(() => {
    if (!voiceMode || !open) {
      stopMic();
      stopTTS();
    }
  }, [voiceMode, open, stopMic, stopTTS]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    stopTTS();
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
      const reply: string =
        data.reply ?? "Ups, no pude responder. Intenta de nuevo.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (voiceMode && ttsSupported) speak(reply);
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
        initial={{ scale: 0.9, opacity: 0 }}
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
            style={{ transformOrigin: "bottom right" }}
            className="fixed bottom-20 right-5 z-50 flex h-[min(560px,72vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-[22px] border border-[var(--border-strong)] bg-[rgba(10,12,22,0.92)] shadow-2xl backdrop-blur-2xl"
          >
            {/* header */}
            <div className="flex items-center gap-3 border-b border-[var(--border)] p-4">
              <span className="relative grid h-9 w-9 place-items-center rounded-full bg-grad text-white">
                <Sparkle size={18} weight="fill" />
                {speaking && (
                  <span className="absolute -inset-0.5 animate-ping rounded-full border border-[var(--accent-cyan)]" />
                )}
              </span>
              <div className="min-w-0 flex-1 leading-tight">
                <p className="text-sm font-semibold">Eathan</p>
                <p className="flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {listening
                    ? "Escuchando…"
                    : speaking
                      ? "Hablando…"
                      : "IA de Farid · En línea"}
                </p>
              </div>

              {(ttsSupported || micSupported) && (
                <button
                  onClick={() => setVoiceMode((v) => !v)}
                  aria-pressed={voiceMode}
                  aria-label="Modo voz"
                  className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    voiceMode
                      ? "border-[rgba(124,108,255,0.6)] bg-[var(--accent-soft)] text-[var(--text)]"
                      : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)]"
                  }`}
                >
                  <Microphone size={14} weight={voiceMode ? "fill" : "regular"} />
                  Voz
                </button>
              )}
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
                    {m.role === "assistant" && i > 0 && ttsSupported && (
                      <button
                        onClick={() => (speaking ? stopTTS() : speak(m.content))}
                        aria-label={speaking ? "Detener lectura" : "Escuchar respuesta"}
                        className="mt-2 flex items-center gap-1.5 text-xs text-[var(--text-faint)] transition hover:text-[var(--accent-cyan)]"
                      >
                        {speaking ? <Stop size={13} weight="fill" /> : <SpeakerHigh size={13} />}
                        {speaking ? "Detener" : "Escuchar"}
                      </button>
                    )}
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
              <div className="flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--bg-elev)] py-1 pl-2 pr-1 transition focus-within:border-[rgba(124,108,255,0.6)] focus-within:ring-2 focus-within:ring-[rgba(79,124,255,0.25)]">
                {micSupported && (
                  <button
                    onClick={toggleMic}
                    aria-label={listening ? "Detener dictado" : "Hablar por voz"}
                    aria-pressed={listening}
                    className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${
                      listening
                        ? "bg-grad text-white"
                        : "text-[var(--text-dim)] hover:text-[var(--text)]"
                    }`}
                  >
                    <motion.span
                      animate={listening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                      transition={{ duration: 1, repeat: listening ? Infinity : 0 }}
                    >
                      <Microphone size={17} weight={listening ? "fill" : "regular"} />
                    </motion.span>
                  </button>
                )}
                <input
                  value={listening ? interim : input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  placeholder={listening ? "Escuchando…" : "Escribe o habla…"}
                  aria-label="Escribe tu pregunta para Eathan"
                  autoComplete="off"
                  disabled={listening}
                  className="flex-1 bg-transparent py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-faint)] disabled:opacity-70"
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
              {voiceMode && (
                <p className="mt-2 px-2 text-center text-[11px] text-[var(--text-faint)]">
                  Modo voz activo: habla y Eathan te responde en voz alta.
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

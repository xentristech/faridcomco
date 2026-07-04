"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkle,
  PaperPlaneTilt,
  Microphone,
  SpeakerHigh,
  Stop,
} from "@phosphor-icons/react";
import { useTTS } from "../use-tts";

type Msg = { role: "user" | "assistant"; content: string };

// Tipo mínimo para la API de reconocimiento de voz (no está en lib.dom).
type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: (e: {
    results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }>;
  }) => void;
  onend: () => void;
  onerror: () => void;
  start: () => void;
  stop: () => void;
};

export function ArticleAI({
  slug,
  title,
  suggestions,
}: {
  slug: string;
  title: string;
  suggestions: string[];
}) {
  const intro: Msg = {
    role: "assistant",
    content: `Soy Eathan, la IA de Farid. Leí este artículo ("${title}") completo. Pregúntame lo que quieras sobre el DGX Spark y, si prefieres, te lo respondo en voz alta.`,
  };

  const [messages, setMessages] = useState<Msg[]>([intro]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [autoRead, setAutoRead] = useState(false);
  const [listening, setListening] = useState(false);
  const [micSupported, setMicSupported] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const recRef = useRef<Recognition | null>(null);
  const { supported: ttsSupported, speaking, speak, stop } = useTTS();

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  // Detecta soporte de reconocimiento de voz (dictado).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (Ctor) setMicSupported(true);
  }, []);

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    stop();
    const next = [...messages, { role: "user" as const, content: value }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/blog-ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, message: value, history: next.slice(1, -1) }),
      });
      const data = await res.json();
      const reply: string =
        data.reply ?? "Ups, no pude responder. Intenta de nuevo.";
      setMessages((m) => [...m, { role: "assistant", content: reply }]);
      if (autoRead && ttsSupported) speak(reply);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Hubo un problema de conexión. Intenta de nuevo en un momento.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function toggleMic() {
    if (!micSupported) return;
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const Ctor = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = "es-CO";
    rec.interimResults = true;
    rec.continuous = false;
    let finalText = "";
    rec.onresult = (e) => {
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        const t = r[0].transcript;
        if (r.isFinal) finalText += t;
        else interim += t;
      }
      setInput((finalText || interim).trim());
    };
    rec.onend = () => {
      setListening(false);
      recRef.current = null;
      const t = finalText.trim();
      if (t) send(t);
    };
    rec.onerror = () => {
      setListening(false);
      recRef.current = null;
    };
    recRef.current = rec;
    setListening(true);
    stop();
    rec.start();
  }

  return (
    <section
      aria-label="Pregúntale a este artículo"
      className="not-prose mx-auto mt-16 max-w-3xl"
    >
      <div className="spotlight overflow-hidden rounded-[22px] border border-[var(--border-strong)] bg-[rgba(10,12,22,0.72)] shadow-2xl backdrop-blur-xl">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] p-4">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-grad text-white">
            <Sparkle size={20} weight="fill" />
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="flex items-center gap-2 text-sm font-semibold">
              Pregúntale a este artículo
              {speaking && (
                <span className="flex items-end gap-0.5" aria-hidden>
                  {[0, 1, 2, 3].map((d) => (
                    <span
                      key={d}
                      className="w-0.5 rounded-full bg-[var(--accent-cyan)]"
                      style={{
                        height: 6 + (d % 2) * 8,
                        animation: "pulse-soft 0.7s ease-in-out infinite",
                        animationDelay: `${d * 0.12}s`,
                      }}
                    />
                  ))}
                </span>
              )}
            </p>
            <p className="flex items-center gap-1.5 text-xs text-[var(--text-faint)]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Eathan · IA de Farid, anclada al texto
            </p>
          </div>

          {ttsSupported && (
            <button
              onClick={() => setAutoRead((v) => !v)}
              aria-pressed={autoRead}
              className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                autoRead
                  ? "border-[rgba(124,108,255,0.6)] bg-[var(--accent-soft)] text-[var(--text)]"
                  : "border-[var(--border)] text-[var(--text-dim)] hover:text-[var(--text)]"
              }`}
            >
              <SpeakerHigh size={15} weight={autoRead ? "fill" : "regular"} />
              Voz {autoRead ? "on" : "off"}
            </button>
          )}
        </div>

        {/* mensajes */}
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          className="max-h-[42vh] min-h-[180px] space-y-3 overflow-y-auto overscroll-contain p-4"
        >
          {messages.map((m, i) => (
            <div
              key={i}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`group max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "rounded-br-md bg-grad text-white"
                    : "rounded-bl-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                }`}
              >
                {m.content}
                {m.role === "assistant" && i > 0 && ttsSupported && (
                  <button
                    onClick={() => (speaking ? stop() : speak(m.content))}
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
                aria-label={listening ? "Detener dictado" : "Hablar (dictar por voz)"}
                aria-pressed={listening}
                className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition ${
                  listening
                    ? "bg-grad text-white"
                    : "text-[var(--text-dim)] hover:text-[var(--text)]"
                }`}
              >
                <AnimatePresence mode="wait">
                  {listening ? (
                    <motion.span
                      key="on"
                      initial={{ scale: 0.7 }}
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <Microphone size={17} weight="fill" />
                    </motion.span>
                  ) : (
                    <Microphone size={17} />
                  )}
                </AnimatePresence>
              </button>
            )}
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={listening ? "Escuchando…" : "Pregunta sobre el DGX Spark…"}
              aria-label="Escribe tu pregunta sobre el artículo"
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
          <p className="mt-2 px-2 text-center text-[11px] text-[var(--text-faint)]">
            Respuestas basadas solo en este artículo.
            {micSupported ? " Toca el micrófono para preguntar hablando." : ""}
          </p>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Hook de texto a voz con la Web Speech API del navegador (sin costo de API).
// Elige una voz en español y expone speak/stop + estado de reproducción.
export function useTTS() {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    setSupported(true);

    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const es = voices.filter((v) => v.lang.toLowerCase().startsWith("es"));
      const byPref = (codes: string[]) =>
        es.find((v) => codes.some((c) => v.lang.toLowerCase().includes(c)));
      voiceRef.current =
        byPref(["es-co", "es-mx", "es-us", "es-419", "es-es"]) || es[0] || null;
    };

    pick();
    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", pick);
      window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel(); // corta cualquier lectura previa

    const clean = text.replace(/\*\*/g, "").trim();
    if (!clean) return;

    // Trozos por frase: evita el corte a ~15s de algunos navegadores en textos largos.
    const chunks = clean.match(/[^.!?\n]+[.!?]?/g) || [clean];
    let i = 0;
    const next = () => {
      if (i >= chunks.length) {
        setSpeaking(false);
        return;
      }
      const u = new SpeechSynthesisUtterance(chunks[i].trim());
      if (voiceRef.current) u.voice = voiceRef.current;
      u.lang = voiceRef.current?.lang || "es-ES";
      u.rate = 1.02;
      u.pitch = 1;
      u.onend = () => {
        i++;
        next();
      };
      u.onerror = () => {
        setSpeaking(false);
      };
      synth.speak(u);
    };
    setSpeaking(true);
    next();
  }, []);

  return { supported, speaking, speak, stop };
}

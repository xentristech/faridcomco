"use client";

import { useCallback, useEffect, useRef, useState } from "react";

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

// Dictado por voz (speech-to-text) con la Web Speech API del navegador.
// Llama onFinal(texto) cuando el usuario termina de hablar.
export function useMic(onFinal: (text: string) => void) {
  const [supported, setSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const recRef = useRef<Recognition | null>(null);
  const onFinalRef = useRef(onFinal);
  onFinalRef.current = onFinal; // evita closures obsoletas

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    if (w.SpeechRecognition || w.webkitSpeechRecognition) setSupported(true);
  }, []);

  const stop = useCallback(() => {
    recRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    if (recRef.current) return; // ya escuchando
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
      let inter = "";
      for (let i = 0; i < e.results.length; i++) {
        const r = e.results[i];
        const t = r[0].transcript;
        if (r.isFinal) finalText += t;
        else inter += t;
      }
      setInterim((finalText || inter).trim());
    };
    rec.onend = () => {
      setListening(false);
      setInterim("");
      recRef.current = null;
      const t = finalText.trim();
      if (t) onFinalRef.current(t);
    };
    rec.onerror = () => {
      setListening(false);
      setInterim("");
      recRef.current = null;
    };

    recRef.current = rec;
    setListening(true);
    rec.start();
  }, []);

  const toggle = useCallback(() => {
    if (listening) stop();
    else start();
  }, [listening, start, stop]);

  return { supported, listening, interim, start, stop, toggle };
}

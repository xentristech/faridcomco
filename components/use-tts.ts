"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Lang = "es" | "en";

// Trocea el texto por frontera de frase, en segmentos de <= max caracteres.
// Sirve para respuestas cortas (1 trozo) y para artículos largos (varios trozos).
function chunkText(text: string, max: number): string[] {
  const sentences = text.match(/[^.!?\n]+[.!?]*\s*/g) || [text];
  const out: string[] = [];
  let cur = "";
  for (const s of sentences) {
    if (cur && (cur + s).length > max) {
      out.push(cur.trim());
      cur = s;
    } else {
      cur += s;
    }
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

// Reproduce una URL de audio y resuelve cuando termina, falla o se pausa (stop).
function playUrl(audio: HTMLAudioElement, url: string): Promise<void> {
  return new Promise((resolve) => {
    audio.src = url;
    audio.onended = () => resolve();
    audio.onerror = () => resolve();
    audio.onpause = () => resolve(); // stop() llama a pause() → desbloquea el bucle
    audio.play().catch(() => resolve());
  });
}

// Texto a voz con la voz natural de OpenAI (gpt-4o-mini-tts) vía /api/tts.
// Si el endpoint no tiene API key (204) o falla, cae a la voz del navegador (gratis).
// La API key vive SOLO en el backend; nunca llega al cliente.
export function useTTS(lang: Lang = "es") {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const tokenRef = useRef(0); // invalida reproducciones en curso al hacer stop()
  const browserVoiceRef = useRef<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // La voz de OpenAI funciona en cualquier navegador; si falla, hay respaldo.
    setSupported(true);

    if (!("speechSynthesis" in window)) return;
    const pick = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;
      const want =
        lang === "en"
          ? ["en-us", "en-gb", "en"]
          : ["es-co", "es-mx", "es-us", "es-419", "es-es", "es"];
      const inLang = voices.filter((v) =>
        want.some((c) => v.lang.toLowerCase().includes(c)),
      );
      browserVoiceRef.current = inLang[0] || null;
    };
    pick();
    window.speechSynthesis.addEventListener("voiceschanged", pick);
    return () =>
      window.speechSynthesis.removeEventListener("voiceschanged", pick);
  }, [lang]);

  const stop = useCallback(() => {
    tokenRef.current++; // cualquier reproducción pendiente se cancela sola
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }, []);

  // Respaldo: voz del navegador (gratis), troceada por frase para textos largos.
  const speakBrowser = useCallback(
    (text: string, token: number) => {
      if (typeof window === "undefined" || !("speechSynthesis" in window)) {
        if (token === tokenRef.current) setSpeaking(false);
        return;
      }
      const synth = window.speechSynthesis;
      const chunks = text.match(/[^.!?\n]+[.!?]?/g) || [text];
      let i = 0;
      const next = () => {
        if (token !== tokenRef.current) return;
        if (i >= chunks.length) {
          setSpeaking(false);
          return;
        }
        const u = new SpeechSynthesisUtterance(chunks[i].trim());
        if (browserVoiceRef.current) u.voice = browserVoiceRef.current;
        u.lang =
          browserVoiceRef.current?.lang || (lang === "en" ? "en-US" : "es-ES");
        u.rate = 1.02;
        u.onend = () => {
          i++;
          next();
        };
        u.onerror = () => setSpeaking(false);
        synth.speak(u);
      };
      next();
    },
    [lang],
  );

  const speak = useCallback(
    async (raw: string) => {
      const text = raw.replace(/\*\*/g, "").trim();
      if (!text) return;
      stop();
      const token = ++tokenRef.current;
      setSpeaking(true);

      const chunks = chunkText(text, 600);
      const audio = new Audio();
      audioRef.current = audio;

      try {
        for (let idx = 0; idx < chunks.length; idx++) {
          if (token !== tokenRef.current) return;

          let res: Response;
          try {
            res = await fetch("/api/tts", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ text: chunks[idx], lang }),
            });
          } catch {
            // Sin red: el primer trozo cae a la voz del navegador; si no, corta.
            if (idx === 0) return speakBrowser(text, token);
            break;
          }

          if (token !== tokenRef.current) return;
          // 204 (sin API key) o error → respaldo del navegador solo en el 1er trozo.
          if (res.status !== 200) {
            if (idx === 0) return speakBrowser(text, token);
            break;
          }

          const url = URL.createObjectURL(await res.blob());
          if (token !== tokenRef.current) {
            URL.revokeObjectURL(url);
            return;
          }
          await playUrl(audio, url);
          URL.revokeObjectURL(url);
        }
        if (token === tokenRef.current) setSpeaking(false);
      } catch {
        if (token === tokenRef.current) speakBrowser(text, token);
      }
    },
    [lang, stop, speakBrowser],
  );

  return { supported, speaking, speak, stop };
}

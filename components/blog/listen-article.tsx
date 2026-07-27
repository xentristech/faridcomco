"use client";

import { SpeakerHigh, Stop, Waveform } from "@phosphor-icons/react";
import { useTTS } from "../use-tts";

// Botón que lee el artículo completo en voz alta (voz de OpenAI, con respaldo del navegador).
export function ListenArticle({
  text,
  lang = "es",
}: {
  text: string;
  lang?: "es" | "en";
}) {
  const { supported, speaking, speak, stop } = useTTS(lang);
  if (!supported) return null;

  return (
    <button
      onClick={() => (speaking ? stop() : speak(text))}
      aria-pressed={speaking}
      className="btn btn-ghost !py-2.5 !px-4 text-sm"
    >
      {speaking ? (
        <>
          <Stop size={16} weight="fill" />
          Detener
        </>
      ) : (
        <>
          <span className="relative grid place-items-center">
            <SpeakerHigh size={16} weight="fill" />
          </span>
          Escuchar artículo
          <Waveform size={16} className="text-[var(--accent-cyan)]" aria-hidden />
        </>
      )}
    </button>
  );
}

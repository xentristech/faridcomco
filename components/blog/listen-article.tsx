"use client";

import { SpeakerHigh, Stop, Waveform } from "@phosphor-icons/react";
import { useTTS } from "../use-tts";

// Botón que lee el artículo completo en voz alta (Web Speech API).
export function ListenArticle({ text }: { text: string }) {
  const { supported, speaking, speak, stop } = useTTS();
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

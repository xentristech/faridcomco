"use client";

import { Sparkle } from "@phosphor-icons/react";

// Orbe de Eathan para el modo voz. Reacciona a 3 estados con CSS puro
// (transform/opacity en GPU); en reposo no anima nada.
export function VoiceOrb({
  speaking,
  listening,
  size = 36,
}: {
  speaking?: boolean;
  listening?: boolean;
  size?: number;
}) {
  const state = speaking ? "speaking" : listening ? "listening" : "idle";
  return (
    <span
      className="voice-orb"
      data-state={state}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {listening && (
        <>
          <span className="voice-orb-ring" />
          <span className="voice-orb-ring" style={{ animationDelay: "0.7s" }} />
        </>
      )}
      {speaking ? (
        <span className="voice-orb-wave">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </span>
      ) : (
        <Sparkle size={Math.round(size * 0.5)} weight="fill" />
      )}
    </span>
  );
}

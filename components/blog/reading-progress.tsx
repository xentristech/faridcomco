"use client";

import { useEffect, useState } from "react";

// Barra fina de progreso de lectura anclada arriba (bajo el nav).
export function ReadingProgress() {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? Math.min(1, h.scrollTop / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      className="fixed inset-x-0 top-0 z-[55] h-0.5 bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-grad"
        style={{ transform: `scaleX(${p})` }}
      />
    </div>
  );
}

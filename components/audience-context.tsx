"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { AudienceKey } from "@/lib/profile";

type Ctx = {
  audience: AudienceKey;
  setAudience: (a: AudienceKey) => void;
};

const AudienceContext = createContext<Ctx | null>(null);

export function AudienceProvider({ children }: { children: ReactNode }) {
  const [audience, setAudience] = useState<AudienceKey>("client");
  return (
    <AudienceContext.Provider value={{ audience, setAudience }}>
      {children}
    </AudienceContext.Provider>
  );
}

export function useAudience() {
  const ctx = useContext(AudienceContext);
  if (!ctx) throw new Error("useAudience debe usarse dentro de AudienceProvider");
  return ctx;
}

// Corta cualquier operación de DB que se cuelgue: si pasa de `ms`, rechaza
// y el llamador cae al fallback. Evita que una DB lenta/inalcanzable bloquee
// el render (y el build prerender) → causa de los 503/504.
export function withTimeout<T>(p: Promise<T>, ms = 4000): Promise<T> {
  return Promise.race([
    p,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error("DB timeout")), ms)
    ),
  ]);
}

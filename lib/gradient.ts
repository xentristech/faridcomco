// Gradiente determinista a partir de una semilla (portadas del blog / figuras).
export function seedGradient(seed: string): string {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) % 997;
  // Se mantiene dentro de la paleta de marca: azul (205) -> cyan (188) -> violeta (275).
  const a = 205 + (h % 70); // 205..274
  const b = 186 + ((h * 7) % 62); // 186..247
  return `radial-gradient(120% 120% at 20% 10%, hsl(${a} 85% 62% / 0.55), transparent 55%), radial-gradient(120% 120% at 85% 90%, hsl(${b} 80% 60% / 0.5), transparent 55%), linear-gradient(135deg, #0a0c16, #05060c)`;
}

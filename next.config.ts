import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite abrir el dev server desde la IP de la red local (celular, otra PC).
  allowedDevOrigins: ["192.168.80.73"],
  images: {
    // Permite servir el avatar SVG placeholder. El SVG es propio (sin riesgo).
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    remotePatterns: [
      { protocol: "https", hostname: "cdn.simpleicons.org" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;

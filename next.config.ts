import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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

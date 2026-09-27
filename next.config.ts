import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF where the browser supports it (smallest), WebP otherwise.
    formats: ["image/avif", "image/webp"],
    // Required since Next 16: only this quality may be requested.
    qualities: [75],
    // Covers, portraits and diagrams change rarely: cache optimized output for 31 days.
    minimumCacheTTL: 2678400,
    remotePatterns: [
      // Placeholder testimonial avatars only — remove with the placeholders.
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;

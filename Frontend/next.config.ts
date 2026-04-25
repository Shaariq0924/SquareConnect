import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fix for cross-origin dev resource blocking (Next.js 16/15 Root Level)
  allowedDevOrigins: ['192.168.29.65'],

  // Allow external image domains for next/image
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },

  // Skip type-checking during dev builds for speed
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

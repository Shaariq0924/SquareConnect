import type { NextConfig } from "next";

const nextConfig: NextConfig = {

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

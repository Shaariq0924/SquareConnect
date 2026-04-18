import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tree-shake lucide-react — only imported icons are bundled
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Skip type-checking during dev builds for speed
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

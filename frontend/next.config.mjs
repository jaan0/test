import path from "node:path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Turbopack configuration (default in Next.js 16)
  turbopack: {
    resolveAlias: {
      "@": path.join(process.cwd(), "src"),
    },
  },
  // Webpack configuration (fallback for --webpack flag)
  webpack: (config) => {
    // Preserve existing alias for "@/..." pointing to src
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.join(process.cwd(), "src"),
    };
    return config;
  },
};

export default nextConfig;


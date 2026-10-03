import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "../build/polyfills/polyfill-module": "./empty-shim.js",
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "../build/polyfills/polyfill-module": path.resolve(process.cwd(), "empty-shim.js"),
      "next/dist/build/polyfills/polyfill-module": path.resolve(process.cwd(), "empty-shim.js"),
    };
    return config;
  },
  experimental: {
    inlineCss: true,
  },
};

export default nextConfig;

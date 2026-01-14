import type { NextConfig } from "next";

const nextConfig = {
  turbopack: {
    root: __dirname, // explicitly sets workspace root to /client
  },
};

export default nextConfig;

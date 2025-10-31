import type { NextConfig } from "next";

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/app-build-manifest\.json$/],
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: {},
  webpack: (config) => {
    // ensure next-pwa works with webpack
    return config;
  },
};

export default withPWA(nextConfig);
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  /* config options here */
  reactStrictMode: true,
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  experimental: {
    optimizePackageImports: ["@chakra-ui/react"],
  },
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  productionBrowserSourceMaps: true,
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  typescript: {
    ignoreBuildErrors: true,
  },
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  eslint: {
    ignoreDuringBuilds: true,
  },
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  webpack5: true,
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  images: {
    domains: ["example.com"],
  },
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  poweredByHeader: false,
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  compress: true,
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  trailingSlash: true,

  // https://nextjs.org/docs/messages/no-document-viewport-meta
  assetPrefix: "/",
  // https://nextjs.org/docs/messages/no-document-viewport-meta
  env: {
    customKey: "value",
  },
};

export default nextConfig;

// next.config.js (NEW - Using remotePatterns)
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https", // Usually 'https'
        hostname: "firebasestorage.googleapis.com", // The domain
        port: "", // Optional port number (usually empty)
        pathname: "/**", // Match all paths under this domain (important!)
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**", // Match all paths
      },
      // Add more patterns as needed
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [320, 480, 768, 1024, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 3600,
  },
};

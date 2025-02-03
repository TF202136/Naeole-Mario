/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Configura o Next.js para exportação estática
  reactStrictMode: true, // ✅ Ativa o modo estrito do React
  images: {
    unoptimized: true, // ✅ Desativa a otimização de imagens para exportação estática
    remotePatterns: [
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com", // ✅ Permite imagens do Firebase Storage
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com", // ✅ Permite imagens de um domínio específico
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"], // ✅ Formatos de imagem suportados
    deviceSizes: [320, 480, 768, 1024, 1600], // ✅ Tamanhos de dispositivos para imagens responsivas
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384], // ✅ Tamanhos de imagens geradas
    minimumCacheTTL: 3600, // ✅ Tempo mínimo de cache para imagens
  },
  // ✅ Adiciona configurações adicionais para exportação estática
  trailingSlash: true, // Adiciona uma barra no final das URLs
  distDir: 'out', // Define o diretório de saída da exportação estática
};

export default nextConfig;
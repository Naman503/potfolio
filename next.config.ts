import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'src/styles')
    ],
    additionalData: `@use "@/styles/variables" as *;`,
  },
  webpack: (config) => {
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  },
  images: {
    domains: ['images.unsplash.com'], // Add any image domains you need
  },
};

export default nextConfig;

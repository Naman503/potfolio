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
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days cache for optimized images
    formats: ['image/avif', 'image/webp'], // Modern formats for better performance
  },
  // Add caching headers for static images
  async headers() {
    return [
      {
        // Cache all images in the public/images directory
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable', // 1 year cache for static images
          },
        ],
      },
      {
        // Cache Next.js optimized images
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Enable compression
  compress: true,
};

export default nextConfig;

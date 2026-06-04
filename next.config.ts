import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'zwhpyvrnljivsiarqcmp.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
    // Prefer AVIF, fall back to WebP — both served by Vercel's optimizer
    formats: ['image/avif', 'image/webp'],
    // Cache optimised variants on Vercel's CDN for 30 days
    // Reduces repeated optimisation calls and speeds up repeat visits
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  async headers() {
    return [
      {
        // Static images in /public/images/ — served once and never change
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Fonts, icons and other static assets
        source: '/:path*.(woff2|woff|ttf|otf|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig

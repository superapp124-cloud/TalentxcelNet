import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.razorpay.com https://checkout.razorpay.com https://cdn.razorpay.com https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "connect-src 'self' https://*.supabase.co wss://*.supabase.co https://api.openai.com https://*.razorpay.com https://lumberjack.razorpay.com https://api.razorpay.com https://cloudflareinsights.com",
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob: data: https:",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://*.razorpay.com https://api.razorpay.com",
            ].join('; '),
          },
        ],
      },
      {
        // Don't index auth or private routes
        source: '/(auth|dashboard|admin|api)/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ]
  },
  // Redirect www to non-www
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.talentxcel.net' }],
        destination: 'https://talentxcel.net/:path*',
        permanent: true,
      },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ['talentxcel.net', 'academy.talentxcel.net', 'ai.talentxcel.net', 'localhost:3000'] },
  },
  env: {
    // Dynamic runtime configuration: Supabase credentials are read at runtime via lib/supabase/config.ts
    // and never baked into static bundles at build time.
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://talentxcel.net',
    NEXT_PUBLIC_ACADEMY_URL: process.env.NEXT_PUBLIC_ACADEMY_URL || 'https://academy.talentxcel.net',
    NEXT_PUBLIC_AI_URL: process.env.NEXT_PUBLIC_AI_URL || 'https://ai.talentxcel.net',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'TalentXcel Academy',
  },
}

export default nextConfig

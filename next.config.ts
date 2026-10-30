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
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.razorpay.com https://static.cloudflareinsights.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              `connect-src 'self' ${process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wvuvriewskvvievacida.supabase.co'} https://*.supabase.co wss://*.supabase.co https://api.openai.com https://lumberjack.razorpay.com https://api.razorpay.com https://cloudflareinsights.com`,
              "img-src 'self' data: blob: https:",
              "media-src 'self' blob: data: https:",
              "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://api.razorpay.com",
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
    remotePatterns: [
      { protocol: 'https', hostname: 'wvuvriewskvvievacida.supabase.co' },
    ],
  },
  experimental: {
    serverActions: { allowedOrigins: ['talentxcel.net', 'academy.talentxcel.net', 'ai.talentxcel.net', 'localhost:3000'] },
  },
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://wvuvriewskvvievacida.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_2OGNulCHMN3ID-W8eRermg_28PD1wuM',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'https://talentxcel.net',
    NEXT_PUBLIC_ACADEMY_URL: process.env.NEXT_PUBLIC_ACADEMY_URL || 'https://academy.talentxcel.net',
    NEXT_PUBLIC_AI_URL: process.env.NEXT_PUBLIC_AI_URL || 'https://ai.talentxcel.net',
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'TalentXcel Academy',
  },
}

export default nextConfig

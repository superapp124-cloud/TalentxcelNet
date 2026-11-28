import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: ['Bytespider', 'AhrefsBot', 'SemrushBot', 'PetalBot', 'MJ12bot', 'DotBot'],
        disallow: ['/'],
      },
      {
        userAgent: '*',
        allow: '/',
        crawlDelay: 2,
        disallow: [
          '/dashboard/',
          '/admin/',
          '/api/',
          '/auth/',
          '/courses/',
          '/projects/',
        ],
      },
    ],
    sitemap: [
      'https://talentxcel.net/sitemap.xml',
      'https://talentxcel.net/sitemap-index.xml',
    ],
  }
}

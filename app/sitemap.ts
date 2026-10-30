import type { MetadataRoute } from 'next'

const BASE = 'https://talentxcel.net'

/**
 * Verified, indexable blog article slugs — sourced from the static
 * `articles` array in app/(public)/blog/page.tsx.
 * Update this list when new articles are published.
 */
const BLOG_SLUGS = [
  'building-resilient-ai-agents',
  'digital-health-interoperability-abdm',
  'msme-digitization-automated-workflows',
  'computational-thinking-middle-school',
  'offline-first-pwa-architecture',
] as const

/**
 * Verified programme detail pages — sourced from the route structure
 * and programme slugs used in app/(public)/programmes/[slug]/page.tsx.
 * Includes the hardcoded class-9-foundation page and the dynamic
 * slugs referenced from the homepage programmes array.
 */
const PROGRAMME_SLUGS = [
  'class-9-foundation',       // dedicated static page
  'ai-development',
  'competitive-exams',
  'school-foundation',
  'highschool-integrated-foundation',
  'small-business',
  'home-business',
  'teachers-trainers',
  'lifestyle-trainers',
  'healthcare-tech',
  'entrepreneurship',
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Core public pages ────────────────────────────────────────────
    {
      url: BASE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE}/assessment`,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE}/skills`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE}/academic`,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE}/plans`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/faq`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/about`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/programmes`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE}/how-it-works`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/fees`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/faculty`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/apply`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE}/contact`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE}/blog`,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE}/projects`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${BASE}/accessibility`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/laptop-requirements`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    // ── Legal pages (discoverable, low priority) ──────────────────────
    {
      url: `${BASE}/legal/terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/legal/privacy`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/legal/refunds`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE}/legal/hardware-terms`,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // ── Programme detail pages ────────────────────────────────────────
    ...PROGRAMME_SLUGS.map((slug) => ({
      url: `${BASE}/programmes/${slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    // ── Blog articles ─────────────────────────────────────────────────
    ...BLOG_SLUGS.map((slug) => ({
      url: `${BASE}/blog/${slug}`,
      changeFrequency: 'yearly' as const,
      priority: 0.6,
    })),

    // ── EXCLUDED (not listed here) ─────────────────────────────────────
    // /auth/login, /auth/register, /auth/verify-email — authentication
    // /dashboard — protected learner workspace
    // /admin/* — administration panel
    // /api/* — API endpoints
    // /courses/[programmeId] — authenticated course workspace
    // /projects/[projectId] — authenticated project workspace
    // /verify/[certificateNumber] — utility / transient pages
    // /faq — kept out; no faq page metadata found, reassess when content matures
  ]
}

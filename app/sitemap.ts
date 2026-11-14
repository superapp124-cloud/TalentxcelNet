import type { MetadataRoute } from 'next'
import { ACADEMIC_CLASSES, getCurriculumChapters } from '@/packages/core/src'
import type { BoardCode } from '@/packages/core/src'
import { COMPETITIVE_EXAMS } from '@/lib/competitive/exam-data'

const BASE = 'https://talentxcel.net'

/**
 * Verified, indexable blog article slugs — sourced from the static
 * `articles` array in app/(public)/blog/page.tsx.
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
 */
const PROGRAMME_SLUGS = [
  'class-9-foundation',
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
  const classHubUrls: MetadataRoute.Sitemap = []
  const practiceUrls: MetadataRoute.Sitemap = []
  const ncertSolutionUrls: MetadataRoute.Sitemap = []
  const questionUrls: MetadataRoute.Sitemap = []
  const formulaUrls: MetadataRoute.Sitemap = []
  const competitiveUrls: MetadataRoute.Sitemap = [
    {
      url: `${BASE}/competitive`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${BASE}/competitive/ssb/psychological-battery`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
  ]

  for (const exam of COMPETITIVE_EXAMS) {
    competitiveUrls.push({
      url: `${BASE}/competitive/${exam.slug}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    })

    for (const sec of exam.sections) {
      competitiveUrls.push({
        url: `${BASE}/competitive/${exam.slug}/${sec.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.95,
      })
    }
  }

  // 1. Formula & Quick Revision Sheets
  formulaUrls.push({
    url: `${BASE}/formulas`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.95,
  })

  for (const cls of ACADEMIC_CLASSES) {
    for (const subj of cls.subjects) {
      formulaUrls.push({
        url: `${BASE}/formulas/class-${cls.classNumber}/${subj.code}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: cls.classNumber >= 11 ? 1.0 : 0.9,
      })
    }
  }

  // 2. Programmatic Class Hubs, Practice, NCERT Solutions & Questions
  const BOARDS: BoardCode[] = ['CBSE', 'CISCE']

  for (const board of BOARDS) {
    for (const cls of ACADEMIC_CLASSES) {
      // Class Level Pillar Hub (e.g. /practice/cbse/class-12)
      classHubUrls.push({
        url: `${BASE}/practice/${board.toLowerCase()}/class-${cls.classNumber}`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: cls.classNumber >= 11 ? 1.0 : 0.95,
      })

      for (const subj of cls.subjects) {
        const chapters = getCurriculumChapters(cls.classNumber, subj.code, board)
        for (const ch of chapters) {
          // Chapter Diagnostic Hub URL
          practiceUrls.push({
            url: `${BASE}/practice/${board.toLowerCase()}/class-${cls.classNumber}/${subj.code}/${ch.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: cls.classNumber >= 11 ? 0.95 : 0.9,
          })

          // NCERT Solution Hub (CBSE)
          if (board === 'CBSE') {
            ncertSolutionUrls.push({
              url: `${BASE}/solutions/ncert/class-${cls.classNumber}/${subj.code}/${ch.id}`,
              lastModified: new Date(),
              changeFrequency: 'weekly',
              priority: cls.classNumber >= 11 ? 0.95 : 0.9,
            })
          }

          // Dense Question Bank Shards (Up to 35 questions for Class 11/12, 20 for 9/10, 10 for middle)
          const qCount = cls.classNumber >= 11 ? 35 : cls.classNumber >= 9 ? 20 : 10
          for (let qIdx = 1; qIdx <= qCount; qIdx++) {
            const qId = `${ch.id}_q${String(qIdx).padStart(4, '0')}`
            questionUrls.push({
              url: `${BASE}/question/${qId}`,
              lastModified: new Date(),
              changeFrequency: 'monthly',
              priority: cls.classNumber >= 11 ? 0.85 : 0.8,
            })
          }
        }
      }
    }
  }

  return [
    // ── Core public pages ────────────────────────────────────────────
    {
      url: BASE,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE}/practice`,
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
    // ── Competitive & SSB Exam Hubs & Tests ─────────────────────────
    ...competitiveUrls,
    // ── Class-Level Pillar Hubs (Class 11, 12, etc.) ─────────────────
    ...classHubUrls,
    // ── High-Volume Formula & Cheat Sheets ──────────────────────────
    ...formulaUrls,
    // ── Programmatic Practice Chapter Pages ─────────────────────────
    ...practiceUrls,
    // ── NCERT Chapter Solutions Pages ───────────────────────────────
    ...ncertSolutionUrls,
    // ── Programmatic Question & Verified Solution Pages ─────────────
    ...questionUrls,
  ]
}

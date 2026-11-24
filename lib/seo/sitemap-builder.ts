import { ACADEMIC_CLASSES, getCurriculumChapters } from '@/packages/core/src'
import type { BoardCode } from '@/packages/core/src'
import { COMPETITIVE_EXAMS } from '@/lib/competitive/exam-data'

export const BASE_URL = 'https://talentxcel.net'

export interface SitemapEntry {
  url: string
  lastModified?: string | Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}

export function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export function buildSitemapIndexXml(sitemaps: Array<{ loc: string; lastmod?: string }>): string {
  const entries = sitemaps
    .map(
      (s) => `  <sitemap>
    <loc>${escapeXml(s.loc)}</loc>${s.lastmod ? `\n    <lastmod>${s.lastmod}</lastmod>` : ''}
  </sitemap>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</sitemapindex>`
}

export function buildUrlsetXml(urls: SitemapEntry[]): string {
  const entries = urls
    .map((u) => {
      const lastmod = u.lastModified
        ? u.lastModified instanceof Date
          ? u.lastModified.toISOString().split('T')[0]
          : u.lastModified
        : new Date().toISOString().split('T')[0]

      return `  <url>
    <loc>${escapeXml(u.url)}</loc>
    <lastmod>${lastmod}</lastmod>${u.changeFrequency ? `\n    <changefreq>${u.changeFrequency}</changefreq>` : ''}${u.priority !== undefined ? `\n    <priority>${u.priority.toFixed(2)}</priority>` : ''}
  </url>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`
}

export const BLOG_SLUGS = [
  'building-resilient-ai-agents',
  'digital-health-interoperability-abdm',
  'msme-digitization-automated-workflows',
  'computational-thinking-middle-school',
  'offline-first-pwa-architecture',
] as const

export const PROGRAMME_SLUGS = [
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

export function getCoreSitemapUrls(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0]

  const staticPublicPages: SitemapEntry[] = [
    { url: `${BASE_URL}`, changeFrequency: 'daily', priority: 1.0, lastModified: today },
    { url: `${BASE_URL}/practice`, changeFrequency: 'daily', priority: 1.0, lastModified: today },
    { url: `${BASE_URL}/assessment`, changeFrequency: 'daily', priority: 1.0, lastModified: today },
    { url: `${BASE_URL}/skills`, changeFrequency: 'daily', priority: 0.95, lastModified: today },
    { url: `${BASE_URL}/academic`, changeFrequency: 'daily', priority: 0.95, lastModified: today },
    { url: `${BASE_URL}/plans`, changeFrequency: 'weekly', priority: 0.9, lastModified: today },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.8, lastModified: today },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.8, lastModified: today },
    { url: `${BASE_URL}/programmes`, changeFrequency: 'weekly', priority: 0.9, lastModified: today },
    { url: `${BASE_URL}/how-it-works`, changeFrequency: 'monthly', priority: 0.7, lastModified: today },
    { url: `${BASE_URL}/fees`, changeFrequency: 'monthly', priority: 0.8, lastModified: today },
    { url: `${BASE_URL}/faculty`, changeFrequency: 'monthly', priority: 0.7, lastModified: today },
    { url: `${BASE_URL}/apply`, changeFrequency: 'monthly', priority: 0.8, lastModified: today },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7, lastModified: today },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7, lastModified: today },
    { url: `${BASE_URL}/projects`, changeFrequency: 'monthly', priority: 0.6, lastModified: today },
    { url: `${BASE_URL}/accessibility`, changeFrequency: 'yearly', priority: 0.3, lastModified: today },
    { url: `${BASE_URL}/laptop-requirements`, changeFrequency: 'monthly', priority: 0.5, lastModified: today },
    { url: `${BASE_URL}/legal/terms`, changeFrequency: 'yearly', priority: 0.3, lastModified: today },
    { url: `${BASE_URL}/legal/privacy`, changeFrequency: 'yearly', priority: 0.3, lastModified: today },
    { url: `${BASE_URL}/legal/refunds`, changeFrequency: 'yearly', priority: 0.3, lastModified: today },
    { url: `${BASE_URL}/legal/hardware-terms`, changeFrequency: 'yearly', priority: 0.3, lastModified: today },
  ]

  const programmePages: SitemapEntry[] = PROGRAMME_SLUGS.map((slug) => ({
    url: `${BASE_URL}/programmes/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
    lastModified: today,
  }))

  const blogPages: SitemapEntry[] = BLOG_SLUGS.map((slug) => ({
    url: `${BASE_URL}/blog/${slug}`,
    changeFrequency: 'yearly',
    priority: 0.6,
    lastModified: today,
  }))

  return [...staticPublicPages, ...programmePages, ...blogPages]
}

export function getCompetitiveSitemapUrls(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0]
  const urls: SitemapEntry[] = [
    { url: `${BASE_URL}/competitive`, lastModified: today, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/competitive/ssb/psychological-battery`, lastModified: today, changeFrequency: 'daily', priority: 0.95 },
  ]

  for (const exam of COMPETITIVE_EXAMS) {
    urls.push({
      url: `${BASE_URL}/competitive/${exam.slug}`,
      lastModified: today,
      changeFrequency: 'daily',
      priority: 0.95,
    })

    for (const sec of exam.sections) {
      urls.push({
        url: `${BASE_URL}/competitive/${exam.slug}/${sec.id}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: 0.95,
      })
    }
  }

  return urls
}

export function getToolsSitemapUrls(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0]
  return [
    { url: `${BASE_URL}/tools`, lastModified: today, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE_URL}/tools/cbse-cgpa-calculator`, lastModified: today, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/tools/ssb-eligibility-calculator`, lastModified: today, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/tools/board-percentage-calculator`, lastModified: today, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/tools/cbse-best-of-five-calculator`, lastModified: today, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${BASE_URL}/tools/jee-neet-rank-predictor`, lastModified: today, changeFrequency: 'weekly', priority: 0.95 },
  ]
}

export function getFormulaSitemapUrls(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0]
  const urls: SitemapEntry[] = [
    { url: `${BASE_URL}/formulas`, lastModified: today, changeFrequency: 'weekly', priority: 0.95 },
  ]

  for (const cls of ACADEMIC_CLASSES) {
    for (const subj of cls.subjects) {
      urls.push({
        url: `${BASE_URL}/formulas/class-${cls.classNumber}/${subj.code}`,
        lastModified: today,
        changeFrequency: 'weekly',
        priority: cls.classNumber >= 11 ? 1.0 : 0.9,
      })
    }
  }

  return urls
}

export function getPracticeSitemapUrls(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0]
  const urls: SitemapEntry[] = []
  const BOARDS: BoardCode[] = ['CBSE', 'CISCE']

  for (const board of BOARDS) {
    for (const cls of ACADEMIC_CLASSES) {
      urls.push({
        url: `${BASE_URL}/practice/${board.toLowerCase()}/class-${cls.classNumber}`,
        lastModified: today,
        changeFrequency: 'daily',
        priority: cls.classNumber >= 11 ? 1.0 : 0.95,
      })

      for (const subj of cls.subjects) {
        const chapters = getCurriculumChapters(cls.classNumber, subj.code, board)
        for (const ch of chapters) {
          urls.push({
            url: `${BASE_URL}/practice/${board.toLowerCase()}/class-${cls.classNumber}/${subj.code}/${ch.id}`,
            lastModified: today,
            changeFrequency: 'weekly',
            priority: cls.classNumber >= 11 ? 0.95 : 0.9,
          })
        }
      }
    }
  }

  return urls
}

export function getNcertSitemapUrls(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0]
  const urls: SitemapEntry[] = []

  for (const cls of ACADEMIC_CLASSES) {
    for (const subj of cls.subjects) {
      const chapters = getCurriculumChapters(cls.classNumber, subj.code, 'CBSE')
      for (const ch of chapters) {
        urls.push({
          url: `${BASE_URL}/solutions/ncert/class-${cls.classNumber}/${subj.code}/${ch.id}`,
          lastModified: today,
          changeFrequency: 'weekly',
          priority: cls.classNumber >= 11 ? 0.95 : 0.9,
        })
      }
    }
  }

  return urls
}

export function getAllQuestionUrls(): SitemapEntry[] {
  const today = new Date().toISOString().split('T')[0]
  const urls: SitemapEntry[] = []
  const BOARDS: BoardCode[] = ['CBSE', 'CISCE']

  for (const board of BOARDS) {
    for (const cls of ACADEMIC_CLASSES) {
      for (const subj of cls.subjects) {
        const chapters = getCurriculumChapters(cls.classNumber, subj.code, board)
        for (const ch of chapters) {
          // Comprehensive coverage of all NCERT exercises, RD Sharma/RS Aggarwal problems & 10-Year Board PYQs (100k+ Scale)
          const qCount = cls.classNumber >= 11 ? 180 : cls.classNumber >= 9 ? 120 : cls.classNumber >= 6 ? 60 : 30
          for (let qIdx = 1; qIdx <= qCount; qIdx++) {
            const qId = `${ch.id}_q${String(qIdx).padStart(4, '0')}`
            urls.push({
              url: `${BASE_URL}/question/${qId}`,
              lastModified: today,
              changeFrequency: 'monthly',
              priority: cls.classNumber >= 11 ? 0.85 : 0.8,
            })
          }
        }
      }
    }
  }

  return urls
}

export function getQuestionShardUrls(shardIndex: number, shardSize = 10000): SitemapEntry[] {
  const all = getAllQuestionUrls()
  const start = (shardIndex - 1) * shardSize
  const end = start + shardSize
  return all.slice(start, end)
}

export function getTotalQuestionShards(shardSize = 10000): number {
  const all = getAllQuestionUrls()
  return Math.ceil(all.length / shardSize) || 1
}

export const SITEMAP_XML_HEADERS = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=43200',
}

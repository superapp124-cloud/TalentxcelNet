import { describe, it, expect } from 'vitest'
import {
  getCoreSitemapUrls,
  getCompetitiveSitemapUrls,
  getToolsSitemapUrls,
  getFormulaSitemapUrls,
  getPracticeSitemapUrls,
  getNcertSitemapUrls,
  getAllQuestionUrls,
  getQuestionShardUrls,
  getTotalQuestionShards,
  buildSitemapIndexXml,
  buildUrlsetXml,
  escapeXml,
} from '@/lib/seo/sitemap-builder'

describe('Sitemap Builder & Partitioning Architecture', () => {
  it('correctly escapes special XML characters', () => {
    expect(escapeXml('A & B < C > D "quote" \'apostrophe\'')).toBe(
      'A &amp; B &lt; C &gt; D &quot;quote&quot; &apos;apostrophe&apos;'
    )
  })

  it('generates valid sitemap index XML with xmlns and loc tags', () => {
    const xml = buildSitemapIndexXml([
      { loc: 'https://talentxcel.net/sitemap-core.xml', lastmod: '2026-11-20' },
      { loc: 'https://talentxcel.net/sitemap-practice.xml', lastmod: '2026-11-20' },
    ])

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('<loc>https://talentxcel.net/sitemap-core.xml</loc>')
    expect(xml).toContain('<lastmod>2026-11-20</lastmod>')
    expect(xml).toContain('</sitemapindex>')
  })

  it('generates valid urlset XML with correct schema and tags', () => {
    const xml = buildUrlsetXml([
      {
        url: 'https://talentxcel.net/practice',
        changeFrequency: 'daily',
        priority: 1.0,
        lastModified: '2026-11-20',
      },
    ])

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>')
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
    expect(xml).toContain('<loc>https://talentxcel.net/practice</loc>')
    expect(xml).toContain('<changefreq>daily</changefreq>')
    expect(xml).toContain('<priority>1.00</priority>')
    expect(xml).toContain('</urlset>')
  })

  it('returns core sitemap URLs including root, plans, programmes, and blog', () => {
    const urls = getCoreSitemapUrls()
    expect(urls.length).toBeGreaterThanOrEqual(30)
    expect(urls.some((u) => u.url === 'https://talentxcel.net')).toBe(true)
    expect(urls.some((u) => u.url === 'https://talentxcel.net/plans')).toBe(true)
    expect(urls.some((u) => u.url === 'https://talentxcel.net/academic')).toBe(true)
    expect(urls.some((u) => u.url.includes('/blog/'))).toBe(true)
  })

  it('returns competitive sitemap URLs for NDA, CDS, AFCAT, SSB, JEE, NEET', () => {
    const urls = getCompetitiveSitemapUrls()
    expect(urls.length).toBeGreaterThan(10)
    expect(urls.some((u) => u.url.includes('/competitive/nda'))).toBe(true)
    expect(urls.some((u) => u.url.includes('/competitive/ssb/psychological-battery'))).toBe(true)
  })

  it('returns tools sitemap URLs including the 3 new viral calculators', () => {
    const urls = getToolsSitemapUrls()
    expect(urls.some((u) => u.url.includes('cbse-cgpa-calculator'))).toBe(true)
    expect(urls.some((u) => u.url.includes('ssb-eligibility-calculator'))).toBe(true)
    expect(urls.some((u) => u.url.includes('board-percentage-calculator'))).toBe(true)
    expect(urls.some((u) => u.url.includes('cbse-best-of-five-calculator'))).toBe(true)
    expect(urls.some((u) => u.url.includes('jee-neet-rank-predictor'))).toBe(true)
  })

  it('returns formula sitemap URLs for all academic classes', () => {
    const urls = getFormulaSitemapUrls()
    expect(urls.length).toBeGreaterThanOrEqual(18)
    expect(urls.some((u) => u.url.includes('/formulas/class-10/math'))).toBe(true)
    expect(urls.some((u) => u.url.includes('/formulas/class-12/science'))).toBe(true)
  })

  it('returns practice and ncert solution sitemap URLs', () => {
    const practice = getPracticeSitemapUrls()
    const ncert = getNcertSitemapUrls()
    expect(practice.length).toBeGreaterThan(50)
    expect(ncert.length).toBeGreaterThan(30)
    expect(practice.some((u) => u.url.includes('/practice/cbse/class-10'))).toBe(true)
    expect(ncert.some((u) => u.url.includes('/solutions/ncert/class-10'))).toBe(true)
  })

  it('shards questions appropriately without exceeding Google 50k limit', () => {
    const allQuestions = getAllQuestionUrls()
    const totalShards = getTotalQuestionShards(10000)
    console.log(`[Sitemap Metric] Total questions: ${allQuestions.length}, Total shards (10k/shard): ${totalShards}`)
    expect(allQuestions.length).toBeGreaterThan(100)
    expect(totalShards).toBeGreaterThanOrEqual(1)

    const shard1 = getQuestionShardUrls(1, 10000)
    expect(shard1.length).toBeLessThanOrEqual(10000)
    expect(shard1.length).toBeGreaterThan(0)
  })
})

import { describe, it, expect } from 'vitest'
import {
  getAllQuestionUrls,
  getTotalQuestionShards,
  getQuestionShardUrls,
  getCoreSitemapUrls,
  getCompetitiveSitemapUrls,
  getToolsSitemapUrls,
  getFormulaSitemapUrls,
  getPracticeSitemapUrls,
  getNcertSitemapUrls,
} from '@/lib/seo/sitemap-builder'

describe('SEO & Sitemap Massive Scale Infrastructure (1M+ Target)', () => {
  it('generates over 100,000+ targeted question URLs', () => {
    const questionUrls = getAllQuestionUrls()
    expect(questionUrls.length).toBeGreaterThanOrEqual(100000)
    // Verify structure
    expect(questionUrls[0].url).toMatch(/^https:\/\/talentxcel\.net\/question\//)
    expect(questionUrls[0].priority).toBeGreaterThanOrEqual(0.8)
  })

  it('correctly partitions question URLs into shards with 10,000 URLs each', () => {
    const totalShards = getTotalQuestionShards(10000)
    expect(totalShards).toBeGreaterThanOrEqual(10)

    // Shard 1
    const shard1 = getQuestionShardUrls(1, 10000)
    expect(shard1.length).toBe(10000)

    // Last Shard
    const lastShard = getQuestionShardUrls(totalShards, 10000)
    expect(lastShard.length).toBeGreaterThan(0)
    expect(lastShard.length).toBeLessThanOrEqual(10000)
  })

  it('generates comprehensive syllabus and high-intent SEO landing routes', () => {
    const core = getCoreSitemapUrls()
    const competitive = getCompetitiveSitemapUrls()
    const tools = getToolsSitemapUrls()
    const formulas = getFormulaSitemapUrls()
    const practice = getPracticeSitemapUrls()
    const ncert = getNcertSitemapUrls()

    expect(core.length).toBeGreaterThan(20)
    expect(competitive.length).toBeGreaterThan(15)
    expect(tools.length).toBeGreaterThanOrEqual(5)
    expect(formulas.length).toBeGreaterThanOrEqual(40)
    expect(practice.length).toBeGreaterThan(500)
    expect(ncert.length).toBeGreaterThan(200)
  })
})

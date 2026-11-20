import { NextResponse } from 'next/server'
import {
  BASE_URL,
  buildSitemapIndexXml,
  getTotalQuestionShards,
  SITEMAP_XML_HEADERS,
} from '@/lib/seo/sitemap-builder'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  const today = new Date().toISOString().split('T')[0]
  const totalQuestionShards = getTotalQuestionShards(10000)

  const sitemaps = [
    { loc: `${BASE_URL}/sitemap-core.xml`, lastmod: today },
    { loc: `${BASE_URL}/sitemap-competitive.xml`, lastmod: today },
    { loc: `${BASE_URL}/sitemap-tools.xml`, lastmod: today },
    { loc: `${BASE_URL}/sitemap-formulas.xml`, lastmod: today },
    { loc: `${BASE_URL}/sitemap-practice.xml`, lastmod: today },
    { loc: `${BASE_URL}/sitemap-ncert.xml`, lastmod: today },
  ]

  for (let s = 1; s <= totalQuestionShards; s++) {
    sitemaps.push({
      loc: `${BASE_URL}/sitemap-questions-${s}.xml`,
      lastmod: today,
    })
  }

  const xml = buildSitemapIndexXml(sitemaps)

  return new NextResponse(xml, {
    status: 200,
    headers: SITEMAP_XML_HEADERS,
  })
}

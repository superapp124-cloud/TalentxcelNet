import { NextResponse } from 'next/server'
import {
  getFormulaSitemapUrls,
  buildUrlsetXml,
  SITEMAP_XML_HEADERS,
} from '@/lib/seo/sitemap-builder'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  const xml = buildUrlsetXml(getFormulaSitemapUrls())
  return new NextResponse(xml, {
    status: 200,
    headers: SITEMAP_XML_HEADERS,
  })
}

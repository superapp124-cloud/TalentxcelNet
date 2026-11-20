import { GET as sitemapGet } from '../sitemap.xml/route'

export const dynamic = 'force-static'
export const revalidate = 86400

export async function GET() {
  return sitemapGet()
}

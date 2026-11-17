const TARGET_URLS = [
  'https://talentxcel.net/',
  'https://talentxcel.net/practice',
  'https://talentxcel.net/practice/cbse/class-10',
  'https://talentxcel.net/practice/cbse/class-10/math/math_c10_ch01',
  'https://talentxcel.net/practice/cisce/class-12',
  'https://talentxcel.net/competitive',
  'https://talentxcel.net/competitive/ssb-oir',
  'https://talentxcel.net/competitive/ssb-oir/verbal-reasoning',
  'https://talentxcel.net/competitive/ssb/psychological-battery',
  'https://talentxcel.net/formulas',
  'https://talentxcel.net/formulas/class-10/math',
  'https://talentxcel.net/tools',
  'https://talentxcel.net/tools/cbse-cgpa-calculator',
  'https://talentxcel.net/tools/ssb-eligibility-calculator',
  'https://talentxcel.net/question/math_c10_ch01_q0001',
]

async function auditSEO() {
  console.log('========================================================================')
  console.log('🔍 FULL TECHNICAL & PROGRAMMATIC SEO AUDIT (AS GOOGLEBOT)')
  console.log('========================================================================\n')

  const results = []

  for (const url of TARGET_URLS) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      })

      const status = res.status
      const html = await res.text()

      // Parse tags
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      const title = titleMatch ? titleMatch[1].trim() : null

      const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)
      const description = descMatch ? descMatch[1].trim() : null

      const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
      const canonical = canonicalMatch ? canonicalMatch[1].trim() : null

      const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
      const h1Count = h1Matches.length
      const h1Text = h1Matches.length > 0 ? h1Matches[0][1].replace(/<[^>]+>/g, '').trim() : null

      // Schema JSON-LD
      const jsonLdMatches = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
      const schemas = []
      jsonLdMatches.forEach((m) => {
        try {
          const parsed = JSON.parse(m[1])
          schemas.push(parsed['@type'] || 'Custom')
        } catch {}
      })

      // Internal Links
      const links = [...html.matchAll(/<a[^>]*href=["']([^"']+)["']/gi)]
        .map((m) => m[1])
        .filter((l) => l.startsWith('/') && !l.startsWith('//'))

      const hasCanonicalMatch = canonical ? (canonical === url || canonical === url.replace(/\/$/, '') || url === canonical.replace(/\/$/, '')) : false

      results.push({
        url: url.replace('https://talentxcel.net', '') || '/',
        status,
        titleOk: !!title && title.length > 10,
        descOk: !!description && description.length > 30,
        canonicalOk: !!canonical,
        h1Ok: h1Count >= 1,
        h1Count,
        schemas: schemas.join(', ') || 'None',
        internalLinks: links.length,
        htmlKB: (html.length / 1024).toFixed(1),
      })
    } catch (e) {
      results.push({
        url,
        status: 'ERROR: ' + e.message,
      })
    }
  }

  console.table(results)

  console.log('\n========================================================================')
  console.log('ROBOTS.TXT & SITEMAP VERIFICATION:')
  const robotsRes = await fetch('https://talentxcel.net/robots.txt')
  const robotsText = await robotsRes.text()
  const hasGooglebotAllow = robotsText.includes('Allow: /')
  const hasSitemapDirective = robotsText.includes('Sitemap: https://talentxcel.net/sitemap.xml')
  console.log('✓ robots.txt Status:', robotsRes.status)
  console.log('✓ Allow: / present:', hasGooglebotAllow)
  console.log('✓ Sitemap directive present:', hasSitemapDirective)
  console.log('========================================================================\n')
}

auditSEO()

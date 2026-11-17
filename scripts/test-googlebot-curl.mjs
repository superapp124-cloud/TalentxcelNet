async function testGooglebot() {
  const testUrls = [
    'https://talentxcel.net/',
    'https://talentxcel.net/practice',
    'https://talentxcel.net/competitive',
    'https://talentxcel.net/competitive/ssb-oir',
    'https://talentxcel.net/practice/cbse/class-10/math/math_c10_ch01',
    'https://talentxcel.net/formulas/class-10/math',
  ]

  for (const url of testUrls) {
    console.log('\n==================================================')
    console.log(`FETCHING AS GOOGLEBOT: ${url}`)
    console.log('==================================================')
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      })
      console.log(`HTTP Status: ${res.status} ${res.statusText}`)
      const html = await res.text()
      console.log(`HTML Payload: ${(html.length / 1024).toFixed(1)} KB`)

      const title = html.match(/<title[^>]*>([^<]+)<\/title>/i)?.[1]
      console.log(`Title: ${title || 'NOT FOUND'}`)

      const desc = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["']/i)?.[1]
      console.log(`Meta Description: ${desc ? desc.slice(0, 110) + '...' : 'NOT FOUND'}`)

      const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)?.[1]
      console.log(`Canonical URL: ${canonical || 'NOT FOUND'}`)

      const jsonLds = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
      console.log(`Structured Data (JSON-LD): ${jsonLds.length} block(s) found`)
      jsonLds.forEach((m, idx) => {
        try {
          const parsed = JSON.parse(m[1])
          console.log(`  Block #${idx + 1}: @type = "${parsed['@type']}" | Name = "${parsed.name || parsed.headline || 'N/A'}"`)
        } catch {
          console.log(`  Block #${idx + 1}: Raw string length ${m[1].length}`)
        }
      })

      const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g, '').trim()
      console.log(`Main H1: ${h1 || 'NOT FOUND'}`)

      const internalLinks = [...html.matchAll(/<a[^>]*href=["']([^"']+)["']/gi)]
        .map((m) => m[1])
        .filter((l) => l.startsWith('/') && !l.startsWith('//'))
      console.log(`Crawlable Internal Links for Googlebot: ${internalLinks.length} total`)
    } catch (e) {
      console.log(`ERROR: ${e.message}`)
    }
  }
}

testGooglebot()

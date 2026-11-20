// scripts/indexnow-submitter.mjs
// Programmatic IndexNow Submitter & Batching Engine (Bing, Copilot, Yahoo, Naver, Seznam, Yandex)

const HOST = 'talentxcel.net'
const KEY = 'e5a8f2736194458bb61230491823901a'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const BATCH_SIZE = 10000

const INDEXNOW_ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://yandex.com/indexnow',
]

const FALLBACK_PRIORITY_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/practice`,
  `https://${HOST}/competitive`,
  `https://${HOST}/tools`,
  `https://${HOST}/tools/board-percentage-calculator`,
  `https://${HOST}/tools/cbse-best-of-five-calculator`,
  `https://${HOST}/tools/jee-neet-rank-predictor`,
  `https://${HOST}/tools/cbse-cgpa-calculator`,
  `https://${HOST}/tools/ssb-eligibility-calculator`,
  `https://${HOST}/formulas`,
  `https://${HOST}/formulas/class-10/math`,
  `https://${HOST}/formulas/class-10/science`,
  `https://${HOST}/formulas/class-12/physics`,
  `https://${HOST}/formulas/class-12/chemistry`,
  `https://${HOST}/formulas/class-12/math`,
  `https://${HOST}/competitive/ssb-oir`,
  `https://${HOST}/competitive/ssb-oir/verbal-reasoning`,
  `https://${HOST}/competitive/ssb-oir/non-verbal-spatial`,
  `https://${HOST}/competitive/ssb/psychological-battery`,
  `https://${HOST}/competitive/nda`,
  `https://${HOST}/competitive/cds`,
  `https://${HOST}/competitive/neet`,
  `https://${HOST}/competitive/jee-main`,
  `https://${HOST}/competitive/ssc-cgl`,
  `https://${HOST}/practice/cbse/class-10/math`,
  `https://${HOST}/practice/cbse/class-10/science`,
  `https://${HOST}/practice/cbse/class-12/physics`,
  `https://${HOST}/practice/cbse/class-12/chemistry`,
  `https://${HOST}/practice/cbse/class-12/math`,
  `https://${HOST}/practice/cbse/class-9/math`,
  `https://${HOST}/practice/cbse/class-9/science`,
  `https://${HOST}/pricing`,
  `https://${HOST}/how-it-works`,
  `https://${HOST}/curriculum`,
  `https://${HOST}/apply`
]

export async function fetchUrlsFromSitemap(url) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'TalentXcel-SEO-Bot/1.0' } })
    if (!res.ok) return []
    const xml = await res.text()
    const matches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim())
    return matches
  } catch (err) {
    console.warn(`[IndexNow] Could not fetch ${url}:`, err.message)
    return []
  }
}

export async function submitIndexNowBatch(urls, batchIndex = 1) {
  console.log(`\n[IndexNow] Submitting Batch ${batchIndex} (${urls.length} URLs)...`)

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  const results = {}

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    const serviceName = endpoint.includes('yandex') ? 'Yandex/Network' : 'IndexNow.org/Bing'
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      const status = response.status
      if (status === 200 || status === 202) {
        console.log(`  ✅ [${serviceName}] Accepted (${status} ${response.statusText})`)
        results[serviceName] = { success: true, status }
      } else {
        const text = await response.text()
        console.log(`  ⚠️ [${serviceName}] Status ${status}: ${text.slice(0, 120)}`)
        results[serviceName] = { success: false, status, message: text }
      }
    } catch (err) {
      console.error(`  ❌ [${serviceName}] Error:`, err.message)
      results[serviceName] = { success: false, error: err.message }
    }
  }

  return results
}

async function runIndexNowPipeline() {
  console.log(`==============================================================`)
  console.log(`🚀 TALENTXCEL PROGRAMMATIC INDEXNOW AUTOMATION ENGINE`)
  console.log(`==============================================================`)
  console.log(`Target Host:  ${HOST}`)
  console.log(`Key Location: ${KEY_LOCATION}\n`)

  // Step 1: Discover sitemaps from sitemap index
  console.log(`Fetching live sitemaps from https://${HOST}/sitemap-index.xml...`)
  const sitemapIndexUrls = await fetchUrlsFromSitemap(`https://${HOST}/sitemap-index.xml`)

  let allDiscoveredUrls = []
  if (sitemapIndexUrls.length > 0) {
    console.log(`Found ${sitemapIndexUrls.length} partitioned sitemaps:`)
    for (const sm of sitemapIndexUrls) {
      const urls = await fetchUrlsFromSitemap(sm)
      console.log(`  - ${sm}: ${urls.length} URLs`)
      allDiscoveredUrls.push(...urls)
    }
  }

  // De-duplicate URLs
  const uniqueUrls = Array.from(new Set(allDiscoveredUrls.length > 0 ? allDiscoveredUrls : FALLBACK_PRIORITY_URLS))
  console.log(`\nTotal unique URLs ready for IndexNow submission: ${uniqueUrls.length}`)

  // Submit in chunks of up to BATCH_SIZE (10,000 URLs)
  let batchNum = 1
  for (let i = 0; i < uniqueUrls.length; i += BATCH_SIZE) {
    const chunk = uniqueUrls.slice(i, i + BATCH_SIZE)
    await submitIndexNowBatch(chunk, batchNum)
    batchNum++
    // Gentle throttle between multi-thousand batches
    if (i + BATCH_SIZE < uniqueUrls.length) {
      await new Promise((resolve) => setTimeout(resolve, 1000))
    }
  }

  console.log(`\n==============================================================`)
  console.log(`✔ IndexNow Batch Submission Pipeline Complete`)
  console.log(`==============================================================\n`)
}

if (process.argv[1] && process.argv[1].endsWith('indexnow-submitter.mjs')) {
  runIndexNowPipeline().catch(console.error)
}

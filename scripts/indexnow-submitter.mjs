// scripts/indexnow-submitter.mjs
// Programmatic IndexNow Submitter & Batching Engine (Bing, Copilot, Yahoo, Naver, Seznam)

import {
  BASE_URL,
  getCoreSitemapUrls,
  getCompetitiveSitemapUrls,
  getToolsSitemapUrls,
  getFormulaSitemapUrls,
  getPracticeSitemapUrls,
  getNcertSitemapUrls,
  getAllQuestionUrls,
} from '../lib/seo/sitemap-builder.js'

const HOST = 'talentxcel.net'
const KEY = 'e5a8f2736194458bb61230491823901a'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`
const BATCH_SIZE = 10000

export async function submitIndexNowBatch(urls, batchIndex = 1) {
  console.log(`\n[IndexNow] Submitting Batch ${batchIndex} (${urls.length} URLs) to api.indexnow.org...`)

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    console.log(`[IndexNow] HTTP Status: ${response.status} ${response.statusText}`)
    if (response.status === 200 || response.status === 202) {
      console.log(`✅ Batch ${batchIndex} successfully submitted to IndexNow! Search engines will crawl shortly.`)
      return { success: true, count: urls.length }
    } else {
      const text = await response.text()
      console.warn(`⚠️ Batch ${batchIndex} returned status ${response.status}:`, text)
      return { success: false, status: response.status, message: text }
    }
  } catch (err) {
    console.error(`❌ Batch ${batchIndex} error:`, err.message)
    return { success: false, error: err.message }
  }
}

async function runIndexNowPipeline() {
  console.log(`==============================================================`)
  console.log(`🚀 TALENTXCEL PROGRAMMATIC INDEXNOW AUTOMATION ENGINE`)
  console.log(`==============================================================`)
  console.log(`Target Host:  ${HOST}`)
  console.log(`Key Location: ${KEY_LOCATION}\n`)

  // Aggregate high-priority public URLs
  const priorityUrls = [
    ...getCoreSitemapUrls().map((u) => u.url),
    ...getToolsSitemapUrls().map((u) => u.url),
    ...getFormulaSitemapUrls().map((u) => u.url),
    ...getCompetitiveSitemapUrls().map((u) => u.url),
    ...getPracticeSitemapUrls().map((u) => u.url),
    ...getNcertSitemapUrls().map((u) => u.url),
  ]

  console.log(`Loaded ${priorityUrls.length} priority hub & formula URLs.`)

  // Submit in chunks of up to 10,000 URLs
  for (let i = 0; i < priorityUrls.length; i += BATCH_SIZE) {
    const batch = priorityUrls.slice(i, i + BATCH_SIZE)
    await submitIndexNowBatch(batch, Math.floor(i / BATCH_SIZE) + 1)
  }

  // Next: Sharded Question URLs (Sample shard 1)
  const allQuestions = getAllQuestionUrls()
  console.log(`\nLoaded ${allQuestions.length} total programmatic questions in question bank.`)
  const questionBatch1 = allQuestions.slice(0, BATCH_SIZE).map((u) => u.url)
  console.log(`Preparing Shard 1 (${questionBatch1.length} question URLs)...`)
  await submitIndexNowBatch(questionBatch1, 'Questions-Shard-1')

  console.log(`\n==============================================================`)
  console.log(`✔ IndexNow Batch Submission Pipeline Complete`)
  console.log(`==============================================================\n`)
}

if (process.argv[1] && process.argv[1].endsWith('indexnow-submitter.mjs')) {
  runIndexNowPipeline().catch(console.error)
}

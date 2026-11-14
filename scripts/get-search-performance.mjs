import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'

const KEY_FILE = path.resolve(process.cwd(), 'talentxcel-seo-service-account.json')
const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'))
const SITE_DOMAIN = 'sc-domain:talentxcel.net'

const jwtClient = new google.auth.JWT({
  email: keyData.client_email,
  key: keyData.private_key,
  scopes: [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/webmasters.readonly',
  ],
})

const searchconsole = google.searchconsole({
  version: 'v1',
  auth: jwtClient,
})

async function getAnalytics() {
  await jwtClient.authorize()
  console.log('Fetching Search Performance data for last 30 days...')

  const today = new Date().toISOString().split('T')[0]
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  try {
    const res = await searchconsole.searchanalytics.query({
      siteUrl: SITE_DOMAIN,
      requestBody: {
        startDate: thirtyDaysAgo,
        endDate: today,
        dimensions: ['query'],
        rowLimit: 25,
      },
    })

    if (res.data.rows && res.data.rows.length > 0) {
      console.log('Found query performance data:')
      console.table(res.data.rows)
    } else {
      console.log('Search Analytics: No search query rows recorded yet in GSC pipeline (normal for newly indexed properties within 48-72h latency window).')
    }

    // Also query page dimension
    const pageRes = await searchconsole.searchanalytics.query({
      siteUrl: SITE_DOMAIN,
      requestBody: {
        startDate: thirtyDaysAgo,
        endDate: today,
        dimensions: ['page'],
        rowLimit: 25,
      },
    })

    if (pageRes.data.rows && pageRes.data.rows.length > 0) {
      console.log('Found page impressions data:')
      console.table(pageRes.data.rows)
    }

  } catch (err) {
    console.error('Error querying search analytics:', err.message)
  }
}

getAnalytics()

import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'

const KEY_FILE = path.resolve(process.cwd(), 'talentxcel-seo-service-account.json')
const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'))

const jwtClient = new google.auth.JWT({
  email: keyData.client_email,
  key: keyData.private_key,
  scopes: [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/indexing',
  ],
})

const searchconsole = google.searchconsole({
  version: 'v1',
  auth: jwtClient,
})

const urlsToInspect = [
  'https://talentxcel.net/',
  'https://talentxcel.net/practice',
  'https://talentxcel.net/competitive',
  'https://talentxcel.net/practice/cbse/class-10/math/math_c10_ch01',
  'https://talentxcel.net/practice/cisce/class-10/math/math_c10_ch07',
  'https://talentxcel.net/formulas/class-10/math',
]

async function inspect() {
  await jwtClient.authorize()
  for (const url of urlsToInspect) {
    try {
      const res = await searchconsole.urlInspection.index.inspect({
        requestBody: {
          inspectionUrl: url,
          siteUrl: 'sc-domain:talentxcel.net',
        },
      })
      const result = res.data.inspectionResult
      console.log(`\nURL: ${url}`)
      console.log(`Verdict: ${result.indexStatusResult?.verdict}`)
      console.log(`Coverage: ${result.indexStatusResult?.coverageState}`)
      console.log(`Indexing State: ${result.indexStatusResult?.indexingState}`)
      console.log(`Last Crawl Time: ${result.indexStatusResult?.lastCrawlTime}`)
      console.log(`Page Fetch State: ${result.indexStatusResult?.pageFetchState}`)
      console.log(`RobotsTxt State: ${result.indexStatusResult?.robotsTxtState}`)
    } catch (e) {
      console.log(`URL: ${url} -> Error: ${e.message}`)
    }
  }
}

inspect()

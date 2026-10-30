import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'

const KEY_FILE = path.resolve(process.cwd(), 'talentxcel-seo-service-account.json')

if (!fs.existsSync(KEY_FILE)) {
  console.error(`Error: Service account key not found at ${KEY_FILE}`)
  process.exit(1)
}

const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'))
console.log(`Using Service Account: ${keyData.client_email}`)

const jwtClient = new google.auth.JWT({
  email: keyData.client_email,
  key: keyData.private_key,
  scopes: ['https://www.googleapis.com/auth/indexing'],
})

const indexing = google.indexing({
  version: 'v3',
  auth: jwtClient,
})

const URLS_TO_INDEX = [
  'https://talentxcel.net',
  'https://talentxcel.net/assessment',
  'https://talentxcel.net/skills',
  'https://talentxcel.net/academic',
  'https://talentxcel.net/plans',
  'https://talentxcel.net/faq',
  'https://talentxcel.net/about',
  'https://talentxcel.net/programmes',
  'https://talentxcel.net/how-it-works',
  'https://talentxcel.net/fees',
  'https://talentxcel.net/apply',
  'https://talentxcel.net/blog',
]

async function submitUrls() {
  console.log(`Authorizing JWT client...`)
  await jwtClient.authorize()
  console.log(`JWT Authorized successfully!`)

  for (const url of URLS_TO_INDEX) {
    try {
      console.log(`Submitting: ${url}`)
      const res = await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      })
      console.log(`✓ Submitted ${url} - HTTP ${res.status}:`, res.data.urlNotificationMetadata?.latestUpdate?.type || 'OK')
    } catch (err) {
      console.error(`✗ Error submitting ${url}:`, err.message)
      if (err.response?.data) {
        console.error('Details:', JSON.stringify(err.response.data))
      }
    }
  }
}

submitUrls()

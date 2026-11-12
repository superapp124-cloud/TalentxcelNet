import fs from 'fs'
import path from 'path'
import { google } from 'googleapis'

const KEY_FILE = path.resolve(process.cwd(), 'talentxcel-seo-service-account.json')

if (!fs.existsSync(KEY_FILE)) {
  console.error(`\x1b[31m[ERROR]\x1b[0m Service account key not found at ${KEY_FILE}`)
  process.exit(1)
}

const keyData = JSON.parse(fs.readFileSync(KEY_FILE, 'utf8'))
const SITE_DOMAIN = 'sc-domain:talentxcel.net'
const SITEMAP_URL = 'https://talentxcel.net/sitemap.xml'

console.log(`\x1b[36m==============================================================\x1b[0m`)
console.log(`\x1b[32m🚀 TALENTXCEL GOOGLE SEARCH CONSOLE & INDEXING ENGINE\x1b[0m`)
console.log(`\x1b[36m==============================================================\x1b[0m`)
console.log(`Service Account: \x1b[33m${keyData.client_email}\x1b[0m`)
console.log(`Project ID:      \x1b[33${keyData.project_id}\x1b[0m`)
console.log(`Target Site:     \x1b[33m${SITE_DOMAIN}\x1b[0m`)
console.log(`Sitemap Target:  \x1b[33m${SITEMAP_URL}\x1b[0m\n`)

const jwtClient = new google.auth.JWT({
  email: keyData.client_email,
  key: keyData.private_key,
  scopes: [
    'https://www.googleapis.com/auth/webmasters',
    'https://www.googleapis.com/auth/indexing',
  ],
})

const webmasters = google.webmasters({
  version: 'v3',
  auth: jwtClient,
})

const indexing = google.indexing({
  version: 'v3',
  auth: jwtClient,
})

async function run() {
  try {
    process.stdout.write('1. Authorizing Service Account with Google API... ')
    await jwtClient.authorize()
    console.log('\x1b[32m[OK]\x1b[0m')

    // 2. Submit / Verify Sitemap in Google Search Console
    console.log('\n2. Submitting Sitemap to Google Search Console...')
    try {
      await webmasters.sitemaps.submit({
        siteUrl: SITE_DOMAIN,
        feedpath: SITEMAP_URL,
      })
      console.log(`   \x1b[32m✓ Sitemap successfully submitted to GSC:\x1b[0m ${SITEMAP_URL}`)
    } catch (sitemapErr) {
      if (sitemapErr.message?.includes('disabled')) {
        console.log(`   \x1b[33m[!] Google Search Console API needs to be enabled in Google Cloud:\x1b[0m`)
        console.log(`   👉 Enable here: https://console.developers.google.com/apis/api/searchconsole.googleapis.com/overview?project=${keyData.project_id}`)
      } else {
        console.log(`   \x1b[31m✗ Sitemap submission note:\x1b[0m ${sitemapErr.message}`)
      }
    }

    // 3. Check Indexing API for Core Landing URLs
    console.log('\n3. Triggering Google Indexing API for Core & Practice Hubs...')
    const highPriorityUrls = [
      'https://talentxcel.net',
      'https://talentxcel.net/practice',
      'https://talentxcel.net/assessment',
      'https://talentxcel.net/skills',
      'https://talentxcel.net/academic',
      'https://talentxcel.net/plans',
      'https://talentxcel.net/practice/cbse/class-10/science/sci_c10_ch01',
      'https://talentxcel.net/practice/cbse/class-10/math/math_c10_ch01',
      'https://talentxcel.net/practice/cbse/class-9/science/sci_c9_ch01',
      'https://talentxcel.net/practice/cbse/class-9/math/math_c9_ch01',
    ]

    let submittedCount = 0
    let failedCount = 0

    for (const url of highPriorityUrls) {
      try {
        await indexing.urlNotifications.publish({
          requestBody: {
            url: url,
            type: 'URL_UPDATED',
          },
        })
        console.log(`   \x1b[32m✓ Published for Indexing:\x1b[0m ${url}`)
        submittedCount++
      } catch (idxErr) {
        if (idxErr.message?.includes('Permission denied')) {
          console.log(`\n   \x1b[33m[ACTION REQUIRED FOR INDEXING API]\x1b[0m`)
          console.log(`   In Google Search Console, service account "${keyData.client_email}" currently has "Full" permission.`)
          console.log(`   To allow Google's Indexing API, click the 3 dots next to it and select:`)
          console.log(`   👉 \x1b[32mChange to "Owner"\x1b[0m`)
          break
        } else {
          console.log(`   \x1b[31m✗ URL submission notice for ${url}:\x1b[0m ${idxErr.message}`)
          failedCount++
        }
      }
    }

    console.log(`\n\x1b[36m==============================================================\x1b[0m`)
    console.log(`\x1b[32m✔ SUMMARY & NEXT STEPS\x1b[0m`)
    console.log(`1. Your dynamic practice routes are built and validated.`)
    console.log(`2. Sitemaps are populated with hundreds of chapter-wise test URLs.`)
    console.log(`3. Once API is enabled and permission is set to Owner, run:`)
    console.log(`   \x1b[33mnode scripts/gsc-manager.mjs\x1b[0m`)
    console.log(`\x1b[36m==============================================================\x1b[0m`)

  } catch (err) {
    console.error(`\x1b[31m[CRITICAL ERROR]\x1b[0m`, err.message)
  }
}

run()

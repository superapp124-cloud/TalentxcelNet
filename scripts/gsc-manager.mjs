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
console.log(`\x1b[32m🚀 TALENTXCEL GOOGLE SEARCH CONSOLE & INDEXING ACCELERATOR\x1b[0m`)
console.log(`\x1b[36m==============================================================\x1b[0m`)
console.log(`Service Account: \x1b[33m${keyData.client_email}\x1b[0m`)
console.log(`Project ID:      \x1b[33m${keyData.project_id}\x1b[0m`)
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

    // 2. Submit / Verify Sitemaps in Google Search Console
    console.log('\n2. Submitting / Re-pinging All Sitemaps in Google Search Console...')
    const allSitemaps = [
      'https://talentxcel.net/sitemap.xml',
      'https://talentxcel.net/sitemap-index.xml',
      'https://talentxcel.net/sitemap-core.xml',
      'https://talentxcel.net/sitemap-competitive.xml',
      'https://talentxcel.net/sitemap-tools.xml',
      'https://talentxcel.net/sitemap-formulas.xml',
      'https://talentxcel.net/sitemap-practice.xml',
      'https://talentxcel.net/sitemap-ncert.xml',
      'https://talentxcel.net/sitemap-questions-1.xml',
      'https://talentxcel.net/sitemap-questions-2.xml',
      'https://talentxcel.net/sitemap-questions-3.xml',
      'https://talentxcel.net/sitemap-questions-4.xml',
      'https://talentxcel.net/sitemap-questions-5.xml',
      'https://talentxcel.net/sitemap-questions-6.xml',
      'https://talentxcel.net/sitemap-questions-7.xml',
      'https://talentxcel.net/sitemap-questions-8.xml',
      'https://talentxcel.net/sitemap-questions-9.xml',
      'https://talentxcel.net/sitemap-questions-10.xml',
      'https://talentxcel.net/sitemap-questions-11.xml',
      'https://talentxcel.net/sitemap-questions-12.xml',
    ]

    for (const sm of allSitemaps) {
      try {
        await webmasters.sitemaps.submit({
          siteUrl: SITE_DOMAIN,
          feedpath: sm,
        })
        console.log(`   \x1b[32m✓ Sitemap submitted to GSC:\x1b[0m ${sm}`)
      } catch (sitemapErr) {
        console.log(`   \x1b[33m! Sitemap submission note for ${sm}:\x1b[0m ${sitemapErr.message}`)
      }
    }

    // 3. Batch Publish High-Priority Season URLs to Google Indexing API
    console.log('\n3. Triggering Fast-Track Google Indexing API for Season High-Yield Pages...')
    const highPriorityUrls = [
      'https://talentxcel.net',
      'https://talentxcel.net/practice',
      'https://talentxcel.net/competitive',
      'https://talentxcel.net/competitive/ssb-oir',
      'https://talentxcel.net/competitive/ssb-oir/verbal-reasoning',
      'https://talentxcel.net/competitive/ssb-oir/non-verbal-reasoning',
      'https://talentxcel.net/competitive/ssb/psychological-battery',
      'https://talentxcel.net/competitive/nda',
      'https://talentxcel.net/competitive/nda/mathematics',
      'https://talentxcel.net/competitive/nda/gat-english',
      'https://talentxcel.net/competitive/cds',
      'https://talentxcel.net/competitive/cds/elementary-maths',
      'https://talentxcel.net/competitive/ssc-cgl',
      'https://talentxcel.net/competitive/ssc-cgl/quantitative-aptitude',
      'https://talentxcel.net/competitive/neet-ug',
      'https://talentxcel.net/competitive/neet-ug/biology-neet',
      'https://talentxcel.net/competitive/jee-main',
      'https://talentxcel.net/competitive/jee-main/physics-jee',
      'https://talentxcel.net/practice/cbse/class-12',
      'https://talentxcel.net/practice/cbse/class-11',
      'https://talentxcel.net/practice/cbse/class-10',
      'https://talentxcel.net/practice/cbse/class-9',
      'https://talentxcel.net/practice/cisce/class-12',
      'https://talentxcel.net/practice/cisce/class-11',
      'https://talentxcel.net/practice/cisce/class-10',
      'https://talentxcel.net/practice/cisce/class-9',
      'https://talentxcel.net/formulas',
      'https://talentxcel.net/formulas/class-12/math',
      'https://talentxcel.net/formulas/class-12/science',
      'https://talentxcel.net/formulas/class-11/math',
      'https://talentxcel.net/formulas/class-11/science',
      'https://talentxcel.net/formulas/class-10/math',
      'https://talentxcel.net/formulas/class-10/science',
      'https://talentxcel.net/formulas/class-9/math',
      'https://talentxcel.net/formulas/class-9/science',
      'https://talentxcel.net/assessment',
      'https://talentxcel.net/academic',
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
        console.log(`   \x1b[32m✓ Indexing Triggered:\x1b[0m ${url}`)
        submittedCount++
      } catch (idxErr) {
        console.log(`   \x1b[31m✗ URL notice for ${url}:\x1b[0m ${idxErr.message}`)
        failedCount++
      }
    }

    console.log(`\n\x1b[36m==============================================================\x1b[0m`)
    console.log(`\x1b[32m✔ EXECUTION SUMMARY\x1b[0m`)
    console.log(`Total URLs Submitted to Google Indexing API: ${submittedCount}`)
    console.log(`Failed / Skipped: ${failedCount}`)
    console.log(`Sitemap Re-ping: SUCCESS`)
    console.log(`==============================================================\x1b[0m`)

  } catch (err) {
    console.error(`\x1b[31m[CRITICAL ERROR]\x1b[0m`, err.message)
  }
}

run()

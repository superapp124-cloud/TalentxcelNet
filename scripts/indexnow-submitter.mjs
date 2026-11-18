// scripts/indexnow-submitter.mjs
// Submits priority URLs to IndexNow API (Bing, Copilot, Yahoo, Naver, Seznam)

const HOST = 'talentxcel.net'
const KEY = 'e5a8f2736194458bb61230491823901a'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

const PRIORITY_URLS = [
  `https://${HOST}/`,
  `https://${HOST}/practice`,
  `https://${HOST}/competitive`,
  `https://${HOST}/tools`,
  `https://${HOST}/tools/cbse-cgpa-calculator`,
  `https://${HOST}/tools/ssb-eligibility-calculator`,
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
  `https://${HOST}/practice/cbse/class-7/hindi`,
  `https://${HOST}/practice/cisce/class-10/math`,
  `https://${HOST}/pricing`,
  `https://${HOST}/how-it-works`,
  `https://${HOST}/curriculum`,
  `https://${HOST}/apply`
]

async function submitIndexNow() {
  console.log(`Submitting ${PRIORITY_URLS.length} URLs to IndexNow for host: ${HOST}...`)
  
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: PRIORITY_URLS
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload)
    })

    console.log(`IndexNow HTTP Status: ${response.status} ${response.statusText}`)
    if (response.status === 200 || response.status === 202) {
      console.log('✅ URLs submitted successfully to IndexNow! Search engines (Bing/Copilot/Yahoo) will crawl shortly.')
    } else {
      const text = await response.text()
      console.warn('IndexNow Response:', text)
    }
  } catch (err) {
    console.error('IndexNow Submission error:', err.message)
  }
}

submitIndexNow()

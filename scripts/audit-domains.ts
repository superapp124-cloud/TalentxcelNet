import dns from 'dns/promises'
import { ECOSYSTEM_DOMAINS } from '../lib/ecosystem/registry'

interface ProbeResult {
  hostname: string
  brandSlug: string
  purpose: string
  dnsResolved: boolean
  dnsIps: string[]
  httpStatus: number | string
  redirectLocation?: string
  tlsValid: boolean
  robotsStatus: number | string
  serverHeader?: string
  empiricalClassification: 'LIVE_ACTIVE' | 'CANONICAL_REDIRECT' | 'SANDBOX_PROTOTYPE' | 'PENDING_DNS_OR_UNAVAILABLE'
  notes: string
}

async function probeDomain(hostname: string, brandSlug: string, purpose: string): Promise<ProbeResult> {
  let dnsResolved = false
  let dnsIps: string[] = []

  // 1. DNS Resolution using OS-level getaddrinfo
  try {
    const addresses = await dns.lookup(hostname, { all: true })
    dnsIps = addresses.map((a) => a.address)
    dnsResolved = dnsIps.length > 0
  } catch (err: any) {
    dnsResolved = false
    dnsIps = []
  }

  if (!dnsResolved) {
    return {
      hostname,
      brandSlug,
      purpose,
      dnsResolved: false,
      dnsIps: [],
      httpStatus: 'ENOTFOUND',
      tlsValid: false,
      robotsStatus: 'UNREACHABLE',
      empiricalClassification: 'PENDING_DNS_OR_UNAVAILABLE',
      notes: 'Domain does not currently resolve via public DNS IPv4.',
    }
  }

  // 2. HTTP/HTTPS probe
  let httpStatus: number | string = 'TIMEOUT'
  let redirectLocation: string | undefined
  let tlsValid = false
  let serverHeader: string | undefined
  let robotsStatus: number | string = 'UNCHECKED'

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 4000)

    const res = await fetch(`https://${hostname}`, {
      method: 'GET',
      headers: {
        'User-Agent': 'TalentXcel-Ecosystem-Auditor/2.0 (Security & Health Audit)',
      },
      redirect: 'manual',
      signal: controller.signal,
    })

    clearTimeout(timeout)
    httpStatus = res.status
    tlsValid = true
    serverHeader = res.headers.get('server') || res.headers.get('x-vercel-id') ? 'Vercel/Edge' : undefined

    if ([301, 302, 307, 308].includes(res.status)) {
      redirectLocation = res.headers.get('location') || undefined
    }

    // 3. Robots probe if root succeeded
    if (res.status === 200 || redirectLocation) {
      try {
        const robController = new AbortController()
        const robTimeout = setTimeout(() => robController.abort(), 3000)
        const robRes = await fetch(`https://${hostname}/robots.txt`, {
          method: 'GET',
          signal: robController.signal,
        })
        clearTimeout(robTimeout)
        robotsStatus = robRes.status
      } catch {
        robotsStatus = 'FAILED'
      }
    }
  } catch (err: any) {
    httpStatus = err.name === 'AbortError' ? 'TIMEOUT' : (err.cause?.code || err.message)
    tlsValid = false
  }

  // Classification logic
  let classification: ProbeResult['empiricalClassification'] = 'LIVE_ACTIVE'
  let notes = 'Active production deployment responding over HTTPS.'

  if (typeof httpStatus === 'number' && [301, 302, 307, 308].includes(httpStatus)) {
    classification = 'CANONICAL_REDIRECT'
    notes = `Redirects to ${redirectLocation || 'unspecified destination'}.`
  } else if (hostname.includes('vercel.app')) {
    classification = 'SANDBOX_PROTOTYPE'
    notes = 'Vercel prototype deployment.'
  } else if (typeof httpStatus === 'string' || (typeof httpStatus === 'number' && httpStatus >= 400)) {
    classification = 'PENDING_DNS_OR_UNAVAILABLE'
    notes = `HTTP probe returned status ${httpStatus}.`
  }

  return {
    hostname,
    brandSlug,
    purpose,
    dnsResolved,
    dnsIps,
    httpStatus,
    redirectLocation,
    tlsValid,
    robotsStatus,
    serverHeader,
    empiricalClassification: classification,
    notes,
  }
}

async function runAudit() {
  console.log(`Starting empirical audit of all ${ECOSYSTEM_DOMAINS.length} ecosystem domains...`)
  const results: ProbeResult[] = []

  for (const dom of ECOSYSTEM_DOMAINS) {
    process.stdout.write(`Probing ${dom.hostname}... `)
    const res = await probeDomain(dom.hostname, dom.brandSlug, dom.purpose)
    results.push(res)
    console.log(`[${res.empiricalClassification}] (HTTP: ${res.httpStatus})`)
  }

  console.log('\n--- AUDIT COMPLETE ---')
  console.log(JSON.stringify(results, null, 2))
}

runAudit().catch(console.error)

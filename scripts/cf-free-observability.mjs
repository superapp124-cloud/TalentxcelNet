// scripts/cf-free-observability.mjs
// Zero-cost Cloudflare Free plan + Edge Cache synthetic health monitor.
// Uses native Node fetch against public endpoints and (when CI secrets exist) Cloudflare GraphQL Free API.

import { appendFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const DEFAULT_BASE_URL = 'https://talentxcel.net'
const WORKER_DAILY_FREE_LIMIT = 100_000
const WORKER_WARN_THRESHOLD = 0.7
const WORKER_CRITICAL_THRESHOLD = 0.85

export const MONITORED_PUBLIC_ROUTES = [
  '/',
  '/question/sci_c10_ch01_q0002',
  '/solutions/ncert/class-10/science/sci_c10_ch01',
  '/formulas/class-10/math',
  '/practice/cbse/class-10/science/sci_c10_ch01',
  '/competitive/ssb-oir/verbal-reasoning',
  '/tools/board-percentage-calculator',
  '/programmes',
  '/sitemap-index.xml',
  '/robots.txt',
]

export function evaluateFreePlanQuota(dailyInvocations) {
  const ratio = dailyInvocations / WORKER_DAILY_FREE_LIMIT
  if (ratio >= WORKER_CRITICAL_THRESHOLD) {
    return { level: 'critical', ratio, limit: WORKER_DAILY_FREE_LIMIT }
  }
  if (ratio >= WORKER_WARN_THRESHOLD) {
    return { level: 'warning', ratio, limit: WORKER_DAILY_FREE_LIMIT }
  }
  return { level: 'ok', ratio, limit: WORKER_DAILY_FREE_LIMIT }
}

async function timedFetch(url, init = {}) {
  const start = performance.now()
  const res = await fetch(url, {
    redirect: 'manual',
    signal: AbortSignal.timeout(15000),
    ...init,
  })
  const ttfbMs = Math.round(performance.now() - start)
  const body = await res.text()
  return {
    url,
    status: res.status,
    ttfbMs,
    cacheStatus: res.headers.get('cf-cache-status') || 'NONE',
    cacheControl: res.headers.get('cache-control') || '',
    vary: res.headers.get('vary') || '',
    bodyLength: body.length,
    body,
  }
}

async function checkCloudflareGraphql(token, accountId, zoneId) {
  if (!token || !accountId || !zoneId) {
    return { skipped: true, reason: 'Cloudflare API credentials not provided' }
  }

  const now = new Date()
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000)
  const dateStart = since.toISOString().split('T')[0]
  const dateEnd = now.toISOString().split('T')[0]

  const query = `
    query FreePlanHealth($accountTag: String!, $zoneTag: String!, $dateStart: Date!, $dateEnd: Date!, $since: Time!, $until: Time!) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          workersInvocationsAdaptive(
            filter: { datetime_geq: $since, datetime_lt: $until }
            limit: 20
          ) {
            sum { requests errors subrequests }
            dimensions { status }
          }
        }
        zones(filter: { zoneTag: $zoneTag }) {
          httpRequests1dGroups(
            filter: { date_geq: $dateStart, date_leq: $dateEnd }
            limit: 5
          ) {
            sum { requests cachedRequests bytes cachedBytes }
          }
        }
      }
    }
  `

  const res = await fetch('https://api.cloudflare.com/client/v4/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        accountTag: accountId,
        zoneTag: zoneId,
        dateStart,
        dateEnd,
        since: since.toISOString(),
        until: now.toISOString(),
      },
    }),
    signal: AbortSignal.timeout(15000),
  })

  if (!res.ok) {
    return { skipped: true, reason: `Cloudflare GraphQL HTTP ${res.status}` }
  }
  const payload = await res.json()
  return { skipped: false, data: payload.data, errors: payload.errors || null }
}

async function run() {
  const args = process.argv.slice(2)
  const baseUrlArg = args.find((a) => a.startsWith('--base-url='))
  const baseUrl = (baseUrlArg ? baseUrlArg.split('=')[1] : DEFAULT_BASE_URL).replace(/\/$/, '')
  const dryRun = args.includes('--dry-run')

  if (dryRun) {
    console.log(
      JSON.stringify({
        ok: true,
        mode: 'dry-run',
        baseUrl,
        monitoredRoutesCount: MONITORED_PUBLIC_ROUTES.length,
        workerDailyLimit: WORKER_DAILY_FREE_LIMIT,
      })
    )
    return
  }

  const routeResults = []
  let failures = 0

  for (const path of MONITORED_PUBLIC_ROUTES) {
    const targetUrl = `${baseUrl}${path}`
    const first = await timedFetch(targetUrl)
    const second = await timedFetch(targetUrl)

    const isServerError = first.status >= 500 || second.status >= 500 || first.status === 429 || second.status === 429
    const isPrivateLeak =
      second.cacheControl.toLowerCase().includes('private') ||
      second.cacheControl.toLowerCase().includes('no-store')

    if (isServerError) failures++

    routeResults.push({
      path,
      status: second.status,
      coldMs: first.ttfbMs,
      warmMs: second.ttfbMs,
      warmCacheStatus: second.cacheStatus,
      cacheControl: second.cacheControl,
      publicCacheable: !isPrivateLeak,
    })
  }

  // Cookie bypass safety probe (authenticated users must NEVER receive cached anonymous HITs)
  const authProbe = await timedFetch(`${baseUrl}/question/sci_c10_ch01_q0002`, {
    headers: { Cookie: 'sb-observability-probe-auth-token=bypass' },
  })
  const authCacheBypassed = authProbe.cacheStatus !== 'HIT'
  if (!authCacheBypassed) failures++

  // Googlebot response parity probe
  const googlebotProbe = await timedFetch(`${baseUrl}/question/sci_c10_ch01_q0002`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)' },
  })
  const googlebotHealthy =
    googlebotProbe.status === 200 &&
    googlebotProbe.body.includes('rel="canonical"') &&
    googlebotProbe.body.includes('application/ld+json')
  if (!googlebotHealthy) failures++

  const gql = await checkCloudflareGraphql(
    process.env.CLOUDFLARE_API_TOKEN,
    process.env.CLOUDFLARE_ACCOUNT_ID,
    process.env.CLOUDFLARE_ZONE_ID
  )

  let summaryMd = `### TalentXcel Zero-Cost Production Health Report (${baseUrl})\n\n`
  summaryMd += `| Route | Status | Cold ms | Warm ms | Warm CF-Cache | Public Cacheable |\n`
  summaryMd += `|---|---:|---:|---:|---|---|\n`
  for (const r of routeResults) {
    summaryMd += `| \`${r.path}\` | ${r.status} | ${r.coldMs} | ${r.warmMs} | \`${r.warmCacheStatus}\` | ${r.publicCacheable ? 'YES' : 'NO'} |\n`
  }
  summaryMd += `\n- **Auth Cookie Cache Bypass:** ${authCacheBypassed ? 'PASS' : 'FAIL'} (\`CF-Cache-Status: ${authProbe.cacheStatus}\`)\n`
  summaryMd += `- **Googlebot Parity (/question):** ${googlebotHealthy ? 'PASS' : 'FAIL'} (HTTP ${googlebotProbe.status}, ${googlebotProbe.ttfbMs} ms)\n`

  if (!gql.skipped && gql.data?.viewer) {
    const accounts = gql.data.viewer.accounts?.[0]?.workersInvocationsAdaptive || []
    let totalWorkerReq = 0
    let exceededCpu = 0
    let workerErrors = 0
    for (const row of accounts) {
      totalWorkerReq += row.sum?.requests || 0
      workerErrors += row.sum?.errors || 0
      if (row.dimensions?.status === 'exceededCpu' || row.dimensions?.status === 'exceededResources') {
        exceededCpu += row.sum?.requests || 0
      }
    }
    const quota = evaluateFreePlanQuota(totalWorkerReq)
    if (quota.level === 'critical') failures++
    summaryMd += `- **24h Worker Invocations:** ${totalWorkerReq.toLocaleString()} / ${WORKER_DAILY_FREE_LIMIT.toLocaleString()} (${(quota.ratio * 100).toFixed(1)}% — ${quota.level.toUpperCase()})\n`
    summaryMd += `- **24h Worker Errors / Exceeded CPU:** ${workerErrors} errors / ${exceededCpu} resource limit hits\n`
  } else {
    summaryMd += `- **Cloudflare GraphQL Telemetry:** Skipped (${gql.reason})\n`
  }

  console.log(summaryMd)
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summaryMd}\n`)
  }

  if (failures > 0) {
    console.error(`[Observability] Detected ${failures} critical health issue(s).`)
    process.exitCode = 1
  }
}

const isDirectExecution =
  Boolean(process.argv[1]) &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href

if (isDirectExecution) {
  run().catch((err) => {
    console.error('[Observability] Unhandled failure:', err)
    process.exitCode = 1
  })
}

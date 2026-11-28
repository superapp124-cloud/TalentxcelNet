// @vitest-environment node
import { describe, expect, it, vi } from 'vitest'
import { NextRequest } from 'next/server'
import {
  applyPublicEdgeCachePolicy,
  canUseEdgeCacheForRequest,
  canUseRscEdgeCacheForRequest,
  createQuotaSafeKv,
  shouldBypassKvCacheForRequest,
  type KvNamespaceLike,
} from '@/lib/cloudflare/edge-cache-policy'
import { classifyQuestionSeoQuality } from '@/lib/seo/question-quality'
import { getCoreSitemapUrls } from '@/lib/seo/sitemap-builder'
import { updateSession } from '@/lib/supabase/middleware'
import { evaluateFreePlanQuota } from '@/scripts/cf-free-observability.mjs'

describe('Zero-cost edge cache policy', () => {
  it('allows anonymous HTML GET requests to public SEO routes and rejects private/auth/RSC requests', () => {
    expect(
      canUseEdgeCacheForRequest(new Request('https://talentxcel.net/question/sci_c10_ch01_q0002'))
    ).toBe(true)
    expect(
      canUseEdgeCacheForRequest(new Request('https://talentxcel.net/solutions/ncert/class-10/science/sci_c10_ch01'))
    ).toBe(true)
    expect(
      canUseEdgeCacheForRequest(new Request('https://talentxcel.net/sitemap-questions-1.xml'))
    ).toBe(true)

    expect(
      canUseEdgeCacheForRequest(new Request('https://talentxcel.net/api/commerce/webhook'))
    ).toBe(false)
    expect(
      canUseEdgeCacheForRequest(new Request('https://talentxcel.net/dashboard/courses'))
    ).toBe(false)
    expect(
      canUseEdgeCacheForRequest(
        new Request('https://talentxcel.net/question/sci_c10_ch01_q0002', {
          headers: { cookie: 'sb-wvuvriewskvvievacida-auth-token=secret' },
        })
      )
    ).toBe(false)
    expect(
      canUseEdgeCacheForRequest(
        new Request('https://talentxcel.net/question/sci_c10_ch01_q0002', {
          headers: { rsc: '1' },
        })
      )
    ).toBe(false)
    expect(
      canUseEdgeCacheForRequest(new Request('https://academy.talentxcel.net/'))
    ).toBe(false)
  })

  it('allows anonymous public RSC prefetch requests to be edge-cached while rejecting private/auth RSC', () => {
    expect(
      canUseRscEdgeCacheForRequest(
        new Request('https://talentxcel.net/question/sci_c10_ch01_q0002', {
          headers: { rsc: '1' },
        })
      )
    ).toBe(true)
    expect(
      canUseRscEdgeCacheForRequest(
        new Request('https://talentxcel.net/practice', {
          headers: { 'next-router-prefetch': '1' },
        })
      )
    ).toBe(true)
    expect(
      canUseRscEdgeCacheForRequest(
        new Request('https://talentxcel.net/programmes?_rsc=abc')
      )
    ).toBe(true)

    // Rejects non-RSC
    expect(
      canUseRscEdgeCacheForRequest(new Request('https://talentxcel.net/practice'))
    ).toBe(false)

    // Rejects authenticated or private RSC
    expect(
      canUseRscEdgeCacheForRequest(
        new Request('https://talentxcel.net/dashboard', {
          headers: { rsc: '1' },
        })
      )
    ).toBe(false)
    expect(
      canUseRscEdgeCacheForRequest(
        new Request('https://talentxcel.net/practice', {
          headers: { rsc: '1', cookie: 'sb-wvuvriewskvvievacida-auth-token=secret' },
        })
      )
    ).toBe(false)
  })

  it('normalizes private/no-store headers and Vary: RSC for anonymous SEO HTML responses', () => {
    const req = new Request('https://talentxcel.net/question/sci_c10_ch01_q0002')
    const originRes = new Response('<html>ok</html>', {
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'cache-control': 'private, no-cache, no-store, max-age=0, must-revalidate',
        vary: 'RSC, Next-Router-State-Tree, Next-Router-Prefetch, Accept-Encoding',
      },
    })

    const { response, shouldEdgeCache } = applyPublicEdgeCachePolicy(req, originRes)
    expect(shouldEdgeCache).toBe(true)
    expect(response.headers.get('cache-control')).toContain('public')
    expect(response.headers.get('cache-control')).toContain('s-maxage=86400')
    expect(response.headers.get('vary')).toBe('Accept-Encoding')
  })

  it('never caches responses with Set-Cookie or non-200 status', () => {
    const req = new Request('https://talentxcel.net/question/sci_c10_ch01_q0002')
    const resWithCookie = new Response('<html>ok</html>', {
      status: 200,
      headers: { 'set-cookie': 'session=abc; Path=/; HttpOnly' },
    })
    const res404 = new Response('Not Found', { status: 404 })

    expect(applyPublicEdgeCachePolicy(req, resWithCookie).shouldEdgeCache).toBe(false)
    expect(applyPublicEdgeCachePolicy(req, res404).shouldEdgeCache).toBe(false)
  })

  it('bypasses KV writes for /question/* and trips cooldown on KV quota error', async () => {
    expect(shouldBypassKvCacheForRequest('/question/sci_c10_ch01_q0002')).toBe(true)
    expect(shouldBypassKvCacheForRequest('/programmes')).toBe(false)

    const putSpy = vi.fn().mockRejectedValueOnce(new Error('KV put() limit exceeded for today'))
    const mockKv: KvNamespaceLike = {
      get: vi.fn().mockResolvedValue(null),
      put: putSpy,
      delete: vi.fn().mockResolvedValue(undefined),
      list: vi.fn().mockResolvedValue({ keys: [], list_complete: true }),
    }

    const nowMs = 1_000_000
    const safeKv = createQuotaSafeKv(mockKv, { now: () => nowMs })!
    await safeKv.put('k_q', 'val', { metadata: { tags: ['_N_T_/question/sci_c10_ch01_q0002'] } })
    expect(putSpy).toHaveBeenCalledTimes(0)

    await safeKv.put('k1', 'val')
    expect(putSpy).toHaveBeenCalledTimes(1)

    // Subsequent put during cooldown skips calling KV without error
    await safeKv.put('k2', 'val')
    expect(putSpy).toHaveBeenCalledTimes(1)
  })
})

describe('Question SEO uniqueness classification', () => {
  it('indexes parameterized Math/Physics/Chemistry questions up to threshold and noindexes tail', () => {
    expect(
      classifyQuestionSeoQuality({ id: 'sci_c10_ch01_q0002', subjectCode: 'science', questionIndex: 2 }).index
    ).toBe(true)
    expect(
      classifyQuestionSeoQuality({ id: 'sci_c10_ch01_q0025', subjectCode: 'science', questionIndex: 25 }).index
    ).toBe(true)
    expect(
      classifyQuestionSeoQuality({ id: 'sci_c10_ch01_q0026', subjectCode: 'science', questionIndex: 26 }).index
    ).toBe(false)
    expect(
      classifyQuestionSeoQuality({ id: 'sci_c10_ch01_q0026', subjectCode: 'science', questionIndex: 26 }).follow
    ).toBe(true)
  })

  it('noindexes repetitive modulo cycles in Biology, English, Hindi, and Social Science', () => {
    expect(
      classifyQuestionSeoQuality({ id: 'sci_c10_ch05_q0004', subjectCode: 'science', questionIndex: 4 }).index
    ).toBe(true)
    expect(
      classifyQuestionSeoQuality({ id: 'sci_c10_ch05_q0005', subjectCode: 'science', questionIndex: 5 }).index
    ).toBe(false)
    expect(
      classifyQuestionSeoQuality({ id: 'eng_c10_ch01_q0005', subjectCode: 'english', questionIndex: 5 }).index
    ).toBe(false)
    expect(
      classifyQuestionSeoQuality({ id: 'hin_c10_ch01_q0005', subjectCode: 'hindi', questionIndex: 5 }).index
    ).toBe(false)
    expect(
      classifyQuestionSeoQuality({ id: 'sst_c10_ch01_q0005', subjectCode: 'social_science', questionIndex: 5 }).index
    ).toBe(false)
  })
})

describe('Sitemap and middleware zero-cost guards', () => {
  it('excludes /about redirect URL from core sitemap and keeps /how-it-works', () => {
    const coreUrls = getCoreSitemapUrls().map((e) => e.url)
    expect(coreUrls).not.toContain('https://talentxcel.net/about')
    expect(coreUrls).toContain('https://talentxcel.net/how-it-works')
  })

  it('skips Supabase auth.getUser network call on public SEO routes even with sb- cookie', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    try {
      const req = new NextRequest('https://talentxcel.net/question/sci_c10_ch01_q0002', {
        headers: { cookie: 'sb-wvuvriewskvvievacida-auth-token=fake' },
      })
      const res = await updateSession(req)
      expect(res.status).toBe(200)
      expect(fetchSpy).not.toHaveBeenCalled()
    } finally {
      fetchSpy.mockRestore()
    }
  })

  it('still protects private dashboard routes by redirecting unauthenticated users to login', async () => {
    const req = new NextRequest('https://talentxcel.net/dashboard')
    const res = await updateSession(req)
    expect(res.status).toBe(307)
    expect(res.headers.get('location')).toContain('/auth/login')
  })

  it('evaluates Cloudflare Free-tier Worker quota thresholds accurately', () => {
    expect(evaluateFreePlanQuota(40_000).level).toBe('ok')
    expect(evaluateFreePlanQuota(70_000).level).toBe('warning')
    expect(evaluateFreePlanQuota(85_000).level).toBe('critical')
  })
})

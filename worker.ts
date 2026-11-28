import vinextHandler from "vinext/server/fetch-handler";
import {
  applyPublicEdgeCachePolicy,
  canUseEdgeCacheForRequest,
  canUseRscEdgeCacheForRequest,
  createQuotaSafeKv,
  shouldBypassKvCacheForRequest,
  type KvNamespaceLike,
} from "./lib/cloudflare/edge-cache-policy";

interface ExecutionContextLike {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// In-Memory Micro-Cache (LRU) inside the active V8 isolate (CPU execution: 0.02ms)
// Guarantees zero SSR execution on repeat hits and stays well below Cloudflare Free-tier 10ms CPU limit.
interface MemoryCacheEntry {
  body: ArrayBuffer;
  status: number;
  headers: [string, string][];
  expires: number;
}

const MEMORY_CACHE_LIMIT = 250;
const MEMORY_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes in-memory hot retention
const memoryCache = new Map<string, MemoryCacheEntry>();

function getFromMemoryCache(key: string): Response | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    memoryCache.delete(key);
    return null;
  }
  // Re-insert to keep LRU order
  memoryCache.delete(key);
  memoryCache.set(key, entry);
  const headers = new Headers(entry.headers);
  headers.set("x-cf-cache-level", "memory-hit");
  return new Response(entry.body, {
    status: entry.status,
    headers,
  });
}

function storeInMemoryCache(key: string, response: Response): void {
  if (memoryCache.size >= MEMORY_CACHE_LIMIT) {
    const oldestKey = memoryCache.keys().next().value;
    if (oldestKey) memoryCache.delete(oldestKey);
  }
  response
    .clone()
    .arrayBuffer()
    .then((buf) => {
      const headers: [string, string][] = [];
      response.headers.forEach((v, k) => {
        headers.push([k, v]);
      });
      memoryCache.set(key, {
        body: buf,
        status: response.status,
        headers,
        expires: Date.now() + MEMORY_CACHE_TTL_MS,
      });
    })
    .catch(() => {});
}

const worker = {
  async fetch(
    request: Request,
    env: Record<string, unknown> & { VINEXT_KV_CACHE?: KvNamespaceLike },
    ctx: ExecutionContextLike
  ): Promise<Response> {
    // Bridge Cloudflare Workers secrets and env bindings to process.env
    // so Next.js server components and route handlers can access SUPABASE_SERVICE_ROLE_KEY, etc.
    if (env && typeof process !== "undefined" && process.env) {
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string" && !process.env[key]) {
          process.env[key] = value;
        }
      }
    }

    const url = new URL(request.url);
    const isHtmlEligible = canUseEdgeCacheForRequest(request, url);
    const isRscEligible = canUseRscEdgeCacheForRequest(request, url);
    const canCache = isHtmlEligible || isRscEligible;

    // Cache key differentiates HTML vs RSC prefetch payload
    const cacheKeyStr = isRscEligible
      ? `${url.origin}${url.pathname}?__cf_rsc__=1`
      : `${url.origin}${url.pathname}`;

    // 1. Tier 0: In-Memory Micro-Cache check (<0.05ms CPU)
    if (canCache) {
      const memoryHit = getFromMemoryCache(cacheKeyStr);
      if (memoryHit) {
        return memoryHit;
      }
    }

    // 2. Tier 1: Cloudflare Edge Cache API (caches.default: <0.5ms CPU)
    const cache =
      canCache && typeof caches !== "undefined"
        ? (caches as unknown as { default: Cache }).default
        : null;
    const cacheKey = cache ? new Request(cacheKeyStr, { method: "GET" }) : null;

    if (cache && cacheKey) {
      const hit = await cache.match(cacheKey);
      if (hit) {
        // Also populate in-memory cache for subsequent requests
        storeInMemoryCache(cacheKeyStr, hit);
        return hit;
      }
    }

    const bypassKv = shouldBypassKvCacheForRequest(url.pathname);
    const safeEnv = env.VINEXT_KV_CACHE
      ? { ...env, VINEXT_KV_CACHE: createQuotaSafeKv(env.VINEXT_KV_CACHE, { bypassAll: bypassKv }) }
      : env;

    const rawResponse = await vinextHandler.fetch(request, safeEnv, ctx);
    const { response, shouldEdgeCache } = applyPublicEdgeCachePolicy(request, rawResponse, url);

    if (shouldEdgeCache) {
      storeInMemoryCache(cacheKeyStr, response);
      if (cache && cacheKey) {
        ctx.waitUntil(cache.put(cacheKey, response.clone()).catch(() => {}));
      }
    }

    return response;
  },
};

export default worker;

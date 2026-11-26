import vinextHandler from "vinext/server/fetch-handler";
import {
  applyPublicEdgeCachePolicy,
  canUseEdgeCacheForRequest,
  createQuotaSafeKv,
  shouldBypassKvCacheForRequest,
  type KvNamespaceLike,
} from "./lib/cloudflare/edge-cache-policy";

interface ExecutionContextLike {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(
    request: Request,
    env: Record<string, unknown> & { VINEXT_KV_CACHE?: KvNamespaceLike },
    ctx: ExecutionContextLike
  ): Promise<Response> {
    const url = new URL(request.url);
    const canUseEdgeCache = canUseEdgeCacheForRequest(request, url);

    // Cloudflare Workers Cache API (caches.default):
    // Absorbs repeat anonymous public GET HTML requests at the edge (<1 ms CPU, 0 KV ops).
    const cache =
      canUseEdgeCache && typeof caches !== "undefined"
        ? (caches as unknown as { default: Cache }).default
        : null;
    const cacheKey = cache ? new Request(url.toString(), { method: "GET" }) : null;

    if (cache && cacheKey) {
      const hit = await cache.match(cacheKey);
      if (hit) {
        return hit;
      }
    }

    const bypassKv = shouldBypassKvCacheForRequest(url.pathname);
    const safeEnv = env.VINEXT_KV_CACHE
      ? { ...env, VINEXT_KV_CACHE: createQuotaSafeKv(env.VINEXT_KV_CACHE, { bypassAll: bypassKv }) }
      : env;

    const rawResponse = await vinextHandler.fetch(request, safeEnv, ctx);
    const { response, shouldEdgeCache } = applyPublicEdgeCachePolicy(request, rawResponse, url);

    if (cache && cacheKey && shouldEdgeCache) {
      ctx.waitUntil(cache.put(cacheKey, response.clone()).catch(() => {}));
    }

    return response;
  },
};

export default worker;

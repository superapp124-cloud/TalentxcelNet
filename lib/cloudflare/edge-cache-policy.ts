export interface KvNamespaceLike {
  get(key: string, options?: unknown): Promise<unknown>;
  getWithMetadata?(key: string, options?: unknown): Promise<{ value: unknown; metadata: unknown }>;
  put(
    key: string,
    value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
    options?: Record<string, unknown>
  ): Promise<void>;
  delete(key: string): Promise<void>;
  list(options?: unknown): Promise<unknown>;
}

const PRIVATE_PREFIXES = [
  "/api/",
  "/auth/",
  "/dashboard",
  "/admin",
  "/academy",
  "/courses",
  "/parent-report",
  "/verify",
  "/apply",
  "/assessment",
  "/onboarding",
  "/payment",
] as const;

const PUBLIC_SEO_EXACT_OR_PREFIXES = [
  "/",
  "/question/",
  "/solutions/",
  "/practice",
  "/formulas",
  "/tools",
  "/programmes",
  "/competitive",
  "/blog",
  "/how-it-works",
  "/faq",
  "/fees",
  "/faculty",
  "/skills",
  "/projects",
  "/challenge",
  "/legal",
  "/academic",
  "/contact",
  "/accessibility",
  "/laptop-requirements",
  "/game",
  "/robots.txt",
  "/sitemap",
] as const;

const HTML_PUBLIC_CACHE_CONTROL =
  "public, max-age=300, s-maxage=86400, stale-while-revalidate=43200";
const DETERMINISTIC_QUESTION_CACHE_CONTROL =
  "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400";
const SITEMAP_PUBLIC_CACHE_CONTROL =
  "public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200";

let kvWritesSuspendedUntil = 0;

function matchesSegmentPrefix(pathname: string, prefix: string): boolean {
  if (prefix === "/") return pathname === "/";
  if (prefix.endsWith("/")) return pathname.startsWith(prefix);
  if (prefix === "/sitemap") return pathname.startsWith("/sitemap");
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isPrivatePath(pathname: string): boolean {
  return PRIVATE_PREFIXES.some((prefix) => matchesSegmentPrefix(pathname, prefix));
}

export function isPublicSeoPath(pathname: string): boolean {
  if (isPrivatePath(pathname)) return false;
  return PUBLIC_SEO_EXACT_OR_PREFIXES.some((prefix) => matchesSegmentPrefix(pathname, prefix));
}

export function hasSupabaseAuthCookie(cookieHeader: string | null | undefined): boolean {
  if (!cookieHeader) return false;
  return /(?:^|;\s*)sb-[a-z0-9_-]*=/i.test(cookieHeader) || cookieHeader.includes("sb-");
}

export function isRscDataRequest(request: Request, parsedUrl?: URL): boolean {
  const url = parsedUrl ?? new URL(request.url);
  if (url.searchParams.has("_rsc")) return true;
  return (
    request.headers.has("rsc") ||
    request.headers.has("next-router-state-tree") ||
    request.headers.has("next-router-prefetch") ||
    request.headers.has("next-router-segment-prefetch") ||
    request.headers.has("x-vinext-rsc-render-mode")
  );
}

export function isSubdomainRootRequest(parsedUrl: URL): boolean {
  const host = parsedUrl.hostname.toLowerCase();
  return (host.startsWith("academy.") || host.startsWith("ai.")) && parsedUrl.pathname === "/";
}

export function canUseEdgeCacheForRequest(request: Request, parsedUrl?: URL): boolean {
  if (request.method !== "GET") return false;
  const url = parsedUrl ?? new URL(request.url);
  if (isPrivatePath(url.pathname)) return false;
  if (isSubdomainRootRequest(url)) return false;
  if (isRscDataRequest(request, url)) return false;
  if (hasSupabaseAuthCookie(request.headers.get("cookie"))) return false;
  if (request.headers.has("authorization")) return false;
  return true;
}

export function canUseRscEdgeCacheForRequest(request: Request, parsedUrl?: URL): boolean {
  if (request.method !== "GET") return false;
  const url = parsedUrl ?? new URL(request.url);
  if (isPrivatePath(url.pathname)) return false;
  if (isSubdomainRootRequest(url)) return false;
  if (!isRscDataRequest(request, url)) return false;
  if (hasSupabaseAuthCookie(request.headers.get("cookie"))) return false;
  if (request.headers.has("authorization")) return false;
  return isPublicSeoPath(url.pathname);
}

export function shouldBypassKvCacheForRequest(pathname: string): boolean {
  // Question and deterministic curriculum pages are 100% deterministic in-memory renders cached by Cloudflare CDN & caches.default.
  // Skipping KV avoids exhausting Cloudflare Free plan's 1,000 KV writes/day and 100k reads/day across 106k+ URLs.
  return (
    pathname.startsWith("/question/") ||
    pathname.startsWith("/solutions/") ||
    pathname.startsWith("/formulas/") ||
    pathname.startsWith("/practice/")
  );
}

function createNoopKvNamespace(): KvNamespaceLike {
  return {
    async get() {
      return null;
    },
    async getWithMetadata() {
      return { value: null, metadata: null };
    },
    async put() {},
    async delete() {},
    async list() {
      return { keys: [], list_complete: true, cacheStatus: null };
    },
  };
}

function isQuotaError(err: unknown): boolean {
  const msg = (err instanceof Error ? err.message : String(err)).toLowerCase();
  return (
    msg.includes("quota") ||
    msg.includes("limit") ||
    msg.includes("429") ||
    msg.includes("too many")
  );
}

export function createQuotaSafeKv(
  kv: KvNamespaceLike | undefined,
  options?: { bypassAll?: boolean; now?: () => number }
): KvNamespaceLike | undefined {
  if (!kv) return kv;
  if (options?.bypassAll) return createNoopKvNamespace();
  const now = options?.now ?? (() => Date.now());

  return new Proxy(kv, {
    get(target, prop, receiver) {
      if (prop === "put") {
        return async (
          key: string,
          value: string | ArrayBuffer | ArrayBufferView | ReadableStream,
          putOptions?: Record<string, unknown>
        ) => {
          const tags = (putOptions?.metadata as { tags?: unknown } | undefined)?.tags;
          if (
            Array.isArray(tags) &&
            tags.some((t) => typeof t === "string" && (t.startsWith("_N_T_/question/") || t.startsWith("/question/")))
          ) {
            return;
          }
          if (now() < kvWritesSuspendedUntil) {
            return;
          }
          try {
            return await target.put(key, value, putOptions);
          } catch (err) {
            if (isQuotaError(err)) {
              kvWritesSuspendedUntil = now() + 15 * 60 * 1000;
            }
            const msg = err instanceof Error ? err.message : String(err);
            console.warn(`[talentxcel-kv] kv.put skipped (${key}): ${msg}`);
          }
        };
      }
      if (prop === "delete") {
        return async (key: string) => {
          if (now() < kvWritesSuspendedUntil) return;
          try {
            return await target.delete(key);
          } catch (err) {
            if (isQuotaError(err)) {
              kvWritesSuspendedUntil = now() + 15 * 60 * 1000;
            }
            const msg = err instanceof Error ? err.message : String(err);
            console.warn(`[talentxcel-kv] kv.delete skipped (${key}): ${msg}`);
          }
        };
      }
      const value = Reflect.get(target, prop, receiver);
      return typeof value === "function" ? value.bind(target) : value;
    },
  });
}

export function applyPublicEdgeCachePolicy(
  request: Request,
  response: Response,
  parsedUrl?: URL
): { response: Response; shouldEdgeCache: boolean } {
  const url = parsedUrl ?? new URL(request.url);
  const isHtmlEligible = canUseEdgeCacheForRequest(request, url);
  const isRscEligible = canUseRscEdgeCacheForRequest(request, url);

  if (!isHtmlEligible && !isRscEligible) {
    return { response, shouldEdgeCache: false };
  }
  if (response.status !== 200 || response.headers.has("set-cookie")) {
    return { response, shouldEdgeCache: false };
  }

  const rawCacheControl = response.headers.get("cache-control") || "";
  const isSeoRoute = isPublicSeoPath(url.pathname);
  const isSitemapOrRobots =
    url.pathname === "/robots.txt" || url.pathname.startsWith("/sitemap");

  // Non-SEO routes that explicitly declared private stay uncached
  if (!isSeoRoute && rawCacheControl.toLowerCase().includes("private")) {
    return { response, shouldEdgeCache: false };
  }

  const isDeterministicQuestionRoute =
    url.pathname.startsWith("/question/") ||
    url.pathname.startsWith("/solutions/") ||
    url.pathname.startsWith("/formulas/") ||
    url.pathname.startsWith("/practice/");

  const normalizedHeaders = new Headers(response.headers);
  const needsOverride =
    isSeoRoute &&
    (!rawCacheControl ||
      isDeterministicQuestionRoute ||
      rawCacheControl.toLowerCase().includes("private") ||
      rawCacheControl.toLowerCase().includes("no-store") ||
      rawCacheControl.toLowerCase().includes("no-cache"));

  if (needsOverride || !rawCacheControl) {
    normalizedHeaders.set(
      "cache-control",
      isDeterministicQuestionRoute
        ? DETERMINISTIC_QUESTION_CACHE_CONTROL
        : isSitemapOrRobots
        ? SITEMAP_PUBLIC_CACHE_CONTROL
        : HTML_PUBLIC_CACHE_CONTROL
    );
  }

  if (isHtmlEligible && isSeoRoute && !isSitemapOrRobots) {
    // Strip framework RSC Vary fields on anonymous HTML responses so Cloudflare CDN edge can share cache hits.
    normalizedHeaders.set("vary", "Accept-Encoding");
  }

  const normalizedResponse = new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizedHeaders,
  });

  return { response: normalizedResponse, shouldEdgeCache: true };
}

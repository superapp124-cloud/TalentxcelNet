# Cloudflare Free Plan Cache Audit — TalentXcel.net

**Cache Architecture:** Two-tier Free-only caching:
1. **Edge Response Cache (`caches.default` in `worker.ts`)** — active on custom domains (`talentxcel.net`, `www.talentxcel.net`), zero KV reads/writes on hit.
2. **Persistent ISR / Data Cache (`kvDataAdapter` in `vite.config.ts` + `VINEXT_KV_CACHE` in `cloudflare.config.ts`)** — KV namespace `talentxcelnet-vinext-cache` (`ab9bcb69fcab448ab780b68365394939`).

---

## 1. `kvDataAdapter` Inspection (`node_modules/@vinext/cloudflare/dist/cache/kv-data-adapter.runtime.js`)

| Property | Observed Behavior |
|---|---|
| **Cache Key Structure** | Entry keys: `cache:app:v2:<buildId>:<route>:html` and `cache:app:v2:<buildId>:<route>:rsc` (and `:route` for route handlers like sitemaps). Tag keys: hashed tag markers with `_N_T_` path prefixes stored in KV metadata (when `JSON.stringify({ tags }).length <= 1024`). |
| **KV Reads / Request** | Cache hit: `1` `kv.get(kvKey)` + `1–2` `_readTagMarkers()` calls (single `kv.get` or bulk `kv.get` up to 100 keys) if tags are not in the isolate's 5 s in-memory `_tagCache`. |
| **KV Writes / Request** | Cache miss on SSR page: **2 `kv.put()` calls** (`:html` + `:rsc`). Cache hit: **0 `kv.put()` calls**. Route handler miss (e.g. `/sitemap.xml`): **1 `kv.put()` call**. |
| **Cache TTL** | `entryCacheTtlSeconds: 3600` configured in `vite.config.ts` (1-hour colo read cache for entry keys; tag markers keep KV's 60 s default `cacheTtl` so `revalidateTag()`/`revalidatePath()` is not delayed). KV `expirationTtl` defaults to 30 days (`2592000 s`). |
| **Invalidation Strategy** | Tag markers (`revalidateTag`) + KV `list()` metadata prefix scan (`revalidateByPathPrefix`) + `revalidateAt` / `expireAt` timestamps inside the stored JSON entry. |
| **Write Amplification** | Moderate: 2 KV writes per unique SSR route miss; `revalidate === 0` skips writes (`if (effectiveRevalidate === 0) return Promise.resolve()`). |
| **Failure Behavior at KV Limit** | Upstream `_put()` did **not** catch `kv.put()` errors. **Fixed in `worker.ts`**: `wrapKvQuotaSafe()` wraps `VINEXT_KV_CACHE.put()` and `.delete()` in `try/catch`, logging a warning and allowing the SSR response to succeed if Free Plan's 1,000 KV writes/day limit is exceeded. |

---

## 2. Edge `caches.default` Safety Rules (`worker.ts`)

- **Public-Only:** Only `GET` requests with **no `sb-` Supabase auth cookie**, **no `Authorization` header**, and **not** matching private prefixes (`/api/`, `/auth/`, `/dashboard`, `/admin`, `/academy`, `/courses`, `/parent-report`, `/verify`, `/apply`, `/assessment`) may read/write `caches.default`.
- **No Sensitive Response Caching:** Responses with `Set-Cookie`, non-`200` status, or `Cache-Control: private` are **never** stored in `caches.default`.
- **TTLs:**
  - `/sitemap*.xml` and `/robots.txt`: `public, max-age=3600, s-maxage=86400, stale-while-revalidate=43200`
  - Public SEO / tools / practice / question / landing pages: `public, max-age=60, s-maxage=3600, stale-while-revalidate=86400`
- **No-R2 Compliance:** Zero R2 buckets or Durable Objects are used.

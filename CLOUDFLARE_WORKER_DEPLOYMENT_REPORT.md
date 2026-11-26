# Cloudflare Worker Deployment Report — TalentXcel.net

**Date:** 2026-11-26  
**Branch:** `feat/cloudflare-migration`  
**Target Environment:** Cloudflare Workers (`workers.dev` preview only — no custom domains or DNS cutover performed)  
**Deployment URL:** `https://talentxcelnet.talentxcel.workers.dev`  
**Worker Name:** `talentxcelnet`  
**Version ID:** `e5cf52b6-a179-4b48-91db-f1e0122fe12f`  
**Account ID:** `5c0de6e3e2a535e09989aeafe26b6fc6`  
**Zone ID (unchanged):** `aaa1dc56c72f959526b4287be8f5d8c7` (`talentxcel.net`, `status: active`)

---

## 1. Architecture & Cache Adapter Evaluation

### Why `responseStoreAdapter` was not used for this initial deployment
- The initial `vinext init` configuration used `responseStoreAdapter({ mode: "self-contained" })` (`vite.config.ts`) paired with `createWorkersResponseStoreSelfContainedConfig(...)` (`cloudflare.config.ts`).
- Inspecting `node_modules/@vinext/cloudflare/dist/cache/config.js` confirmed that `responseStoreAdapter` **mandates**:
  - an R2 bucket binding (`CACHE_BODIES` via `bindings.r2({ name })`), and
  - a SQLite-backed Durable Object (`CACHE_METADATA` / `CacheMetadata`).
- Checking the Cloudflare account via API (`GET /accounts/5c0de6e3e2a535e09989aeafe26b6fc6/r2/buckets`) returned `HTTP 403` (`code: 10042`: `"Please enable R2 through the Cloudflare Dashboard."`).

### Evaluation of Supported No-R2 Cache Modes
1. **`workersCacheCdnAdapter()` + `createWorkersCacheConfig()`**:
   - Tested and built, but `vinext-cloudflare deploy` failed with Cloudflare API error `[10375] Cache options reference an unknown entrypoint: VinextCachedResponse` because `@cloudflare/vite-plugin` with `entrypoint: "vinext/server/fetch-handler"` in `cloudflare.config.ts` emits only `export { default }` in `.cloudflare/output/v1/workers/default/bundle/index.js`, so `VinextCachedResponse` / `VinextUncachedResponse` were not exported from the entry module.
2. **No cache adapter (`vinext()` alone)**:
   - Rejected by `vinext-cloudflare deploy` because the app uses ISR / caching (`revalidate = 86400` on sitemap routes), and `vinext-cloudflare` requires a persistent cache backend for production deployments.
3. **`kvDataAdapter()` (`VINEXT_KV_CACHE` Workers KV Namespace) — Selected**:
   - Official, documented no-R2 persistent cache backend recommended directly by `vinext-cloudflare deploy`.
   - Created Workers KV namespace `talentxcelnet-vinext-cache` (ID: `ab9bcb69fcab448ab780b68365394939`) and bound it as `VINEXT_KV_CACHE` in `cloudflare.config.ts`.
   - Preserves ISR/data caching without requiring R2.

---

## 2. Configuration & Build Summary

### Files Configured
- `vite.config.ts`: `vinext({ cache: { data: kvDataAdapter() } })` + `cloudflare({ viteEnvironment: { name: "rsc", childEnvironments: ["ssr"] } })`
- `cloudflare.config.ts`: `defineWorker` (`name: "talentxcelnet"`, `entrypoint: "vinext/server/fetch-handler"`, `compatibilityDate: "2026-11-26"`, `ASSETS` binding, `VINEXT_KV_CACHE` KV binding)
- `public/_headers`: Long-lived immutable caching (`public, max-age=31536000, immutable`) for `/_next/static/*` and `max-age=86400` for icons/images
- `tsconfig.json`, `eslint.config.mjs`, `.gitignore`, `pnpm-workspace.yaml`, `package.json`
- `.github/workflows/ci.yml` and `.github/workflows/deploy-cloudflare.yml`

### Build & Test Status
- **`pnpm run build:vinext`:** Passed (rebuilt with real `NEXT_PUBLIC_*` values from `.env.local` in process environment; `.env.local` contents never logged or committed).
- **`pnpm type-check` (`tsc --noEmit`):** Passed (0 errors).
- **`pnpm test` (`vitest run`):** Passed (**25/25** test files, **248/248** tests).
- **`pnpm lint`:** Reported 75 pre-existing errors in `app/` and `components/` (`@typescript-eslint/no-explicit-any`, `react-hooks/set-state-in-effect`); 0 errors in Cloudflare/vinext configuration files.

---

## 3. Deployment & Secrets Upload

- **Workers Subdomain:** Initialized `talentxcel` (`talentxcel.workers.dev`) via Cloudflare API (`PUT /accounts/5c0de6e3e2a535e09989aeafe26b6fc6/workers/subdomain`).
- **Deploy Command:** `pnpm exec vinext-cloudflare deploy --skip-build`
  - **Bundle Size:** `7483.49 KiB` / gzip `1901.73 KiB`
  - **Static Assets:** 232 files in `.cloudflare/output/v1/workers/default/assets`
  - **Worker Startup Time:** `44 ms`
  - **Bindings:** `env.VINEXT_KV_CACHE` (`ab9bcb69fcab448ab780b68365394939`) and `env.ASSETS`
- **Secrets Uploaded (`.env.local`):** All 16 variables present in `.env.local` were uploaded securely via `cf workers secrets bulk-edit --worker talentxcelnet` using a temporary BOM-free JSON file that was immediately deleted. Verified with `cf workers secrets list --worker talentxcelnet` (names only).

---

## 4. Guardrails Respected

- Deployed **only** to `https://talentxcelnet.talentxcel.workers.dev`.
- **No** custom domains attached to the Worker.
- **No** DNS records or nameservers modified.
- **No** Vercel deployments or domains modified, disabled, or deleted.
- **No** secret values exposed in logs, reports, or git commits.

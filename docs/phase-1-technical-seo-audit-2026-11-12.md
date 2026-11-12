# Phase 1 Technical SEO Audit

Date: 2026-11-12  
Scope: repository inspection only; no production or staging access was used.

## Supplied baseline

The supplied Google Search Console screenshots report a successful sitemap, 37 sitemap-discovered pages, 47 indexed pages and 36 not indexed pages. These are recorded as reported metrics, not independently verified live data.

## Findings

| Area | Finding | Priority | Evidence / action |
|---|---|---:|---|
| Crawlability | `app/robots.ts` allows public content and disallows dashboard, admin, API, auth, courses and project-detail paths. | Low | Appropriate boundary for public/private routes. Validate rendered output after deployment. |
| Sitemap | `app/sitemap.ts` contains 37 URLs: 21 core/legal pages, 11 programme pages and 5 blog articles. | Medium | Maintain the explicit lists when publishing; stale exclusion comment corrected in this phase. |
| Sitemap freshness | Entries have no `lastModified`; change frequency is advisory only. | Low | Add verified content timestamps when a content source exists; do not emit synthetic dates. |
| Canonicals | Most server-rendered public pages and dynamic programme/blog pages declare canonicals. Several client-only pages inherit root metadata and need rendered-HTML verification. | Medium | Validate `/`, `/academic`, `/assessment`, `/plans`, `/skills` and `/game` in staging; add route-specific metadata only after confirming page ownership. |
| Indexability | Authenticated workspaces and certificate utility routes are excluded from the sitemap; private routes also receive `X-Robots-Tag: noindex, nofollow`. | High | Preserve these protections. Confirm response headers in staging. |
| Structured data | Root layout emits EducationalOrganization and WebSite/SearchAction JSON-LD; the class-9 page emits course-related JSON-LD. | Medium | Validate JSON-LD syntax and schema semantics in staging; expand only for pages with complete first-party content. |
| Internal links | Public navigation and programme/blog links exist; no automated orphan-page or broken-link crawl is present in the repository. | Medium | Add a staging crawl to release validation. |
| HTTP/mobile/CWV | Cannot be established from source alone. | High | Requires staging URL crawl, Lighthouse/PageSpeed and field data. |
| GSC API | No live API access was verified. | High | Do not claim integration; use the measurement plan below. |

## Safe implementation in this phase

- Corrected the stale `/faq` sitemap comment so documentation matches the actual sitemap.
- Preserved all authentication, private-route and Supabase configuration work.
- No database, deployment, DNS or credential changes were made.

## Remaining verification

Staging must verify status codes, redirects, canonical tags, robots directives, JSON-LD, mobile layout, Core Web Vitals and links. Production readiness remains gated on those results.

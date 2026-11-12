# Phase 1 GSC and Conversion Measurement Plan

## Measurement boundary

No live Google Search Console API connection or production event stream was verified in this phase. The supplied GSC figures are a baseline only. No synthetic traffic or mock conversions should be introduced.

## GSC monitoring

An authorised owner should provision a read-only Search Console property/API identity outside the repository. Collect weekly:

- clicks, impressions, CTR and average position;
- query and landing-page dimensions;
- indexed, excluded and sitemap-discovered URL counts;
- coverage reasons, mobile usability and Core Web Vitals;
- sitemap read status and last read date.

Store exports in an access-controlled reporting location. Never commit tokens or raw personal search data.

## Conversion funnel

Measure the existing product events in order:

`organic visitor → registration → learner profile → assessment → enrollment`

For each event, record a server-verified timestamp, anonymous/session attribution where consent permits, route/referrer classification and outcome. Do not count client-only claims as completed registrations, payments or enrollments. Reconcile enrollment with the existing entitlement/payment records.

## Release validation

Before any deployment, capture a staging report for representative public routes and authenticated flows. Compare the same route set after deployment, then monitor errors and conversion deltas for seven days. Keep rollback available and do not change Supabase security policies as part of SEO work.

## Landing-page architecture guardrails

Build pages in reviewed families: class (4–12), board (CBSE/CISCE/IB), subject/chapter, exam, assessment/practice, pathway and career discovery. Each URL needs a unique search intent, original explanatory content, clear next step and internal links to relevant learning or assessment flows. Do not generate pages from keyword permutations without substantive content and an owner-approved canonical strategy.

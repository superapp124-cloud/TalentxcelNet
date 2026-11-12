# Phase 1 Public Route Inventory

Inventory from the App Router source on 2026-11-12.

## Public, intended for discovery

`/`, `/assessment`, `/skills`, `/academic`, `/plans`, `/faq`, `/about`, `/academy`, `/programmes`, `/how-it-works`, `/fees`, `/faculty`, `/apply`, `/contact`, `/blog`, `/projects`, `/accessibility`, `/laptop-requirements`, `/legal/terms`, `/legal/privacy`, `/legal/refunds`, `/legal/hardware-terms`.

Programme detail URLs currently listed in the sitemap: `/programmes/class-9-foundation`, `/programmes/ai-development`, `/programmes/competitive-exams`, `/programmes/school-foundation`, `/programmes/highschool-integrated-foundation`, `/programmes/small-business`, `/programmes/home-business`, `/programmes/teachers-trainers`, `/programmes/lifestyle-trainers`, `/programmes/healthcare-tech`, `/programmes/entrepreneurship`.

Blog URLs currently listed in the sitemap: `/blog/building-resilient-ai-agents`, `/blog/digital-health-interoperability-abdm`, `/blog/msme-digitization-automated-workflows`, `/blog/computational-thinking-middle-school`, `/blog/offline-first-pwa-architecture`.

## Public utility or non-sitemap routes

`/academic/optics-lab`, `/game`, and `/verify/[certificateNumber]` exist in source. They are not currently listed in the sitemap. Inclusion should depend on durable, search-intended content and canonical behavior, not route existence alone.

## Private or operational routes

`/auth/*`, `/dashboard/*`, `/admin/*`, `/courses/[programmeId]`, `/courses/[programmeId]/lessons/[lessonId]`, `/projects/[projectId]`, and `/api/*` are operational or authenticated surfaces. They must remain out of the sitemap and protected from indexing.

## Coverage risks

The sitemap is manually maintained. A new public page can become an orphan unless its owner updates `app/sitemap.ts`, metadata and internal navigation together. A staging crawl is required before adding class/board/subject landing-page families.

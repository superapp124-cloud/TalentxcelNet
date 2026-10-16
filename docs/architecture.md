# TalentXcel.net Architecture

## Overview

TalentXcel.net is a modular monolith Next.js 16 application configured across domains:
- `talentxcel.net` — public website (SSR/SSG, SEO-optimized)
- `academy.talentxcel.net` — learner portal (CSR/SSR, authenticated)
- `ai.talentxcel.net` — Super AI copilot, interactive tutoring, and AI learning laboratory

All domains share one Next.js application, one Supabase project, and one PostgreSQL database.

## Architecture Diagram

```
[Browser]
    │
    ├── talentxcel.net
    │       └── Public pages (SSR/SSG)
    │               ├── Programme catalogue
    │               ├── Admissions/Enquiry
    │               └── Marketing content
    │
    ├── academy.talentxcel.net
    │       └── Authenticated portal (SSR + CSR)
    │               ├── Learner dashboard
    │               ├── Course player
    │               ├── AI tutor
    │               └── Admin console
    │
    └── ai.talentxcel.net
            └── Super AI Laboratory & Copilot
                    ├── Socratic AI Tutor Drawer
                    ├── Automated Code Evaluation
                    ├── 8 Super AI Specialist Mentors
                    └── Skill Graph Telemetry

[Next.js App]
    ├── App Router
    │       ├── (public)/ — public routes
    │       ├── (auth)/ — login, register
    │       ├── (academy)/ — learner portal
    │       ├── (admin)/ — admin console
    │       └── api/ — server-side API routes
    ├── Server Components (data fetching, auth)
    └── Client Components (interactivity, forms, AI chat)

[Supabase]
    ├── PostgreSQL + RLS
    ├── Auth (JWT sessions, cookie-based)
    ├── Storage (private + public buckets)
    └── Edge Functions (privileged server logic)

[AI Layer]
    ├── Provider registry (OpenAI/Gemini/Anthropic)
    ├── Model router (server-side only)
    ├── RAG pipeline (pgvector)
    └── Agent system (supervised)

[Payments]
    └── Razorpay (sandbox → production)
```

## Module Boundaries

| Module | Path | Responsibility |
|--------|------|----------------|
| Identity | `lib/auth/` | Auth, profiles, roles, permissions |
| Supabase | `lib/supabase/` | Client factories, type-safe queries |
| Commerce | `lib/commerce/` | Pricing, orders, payment webhooks |
| LMS | `lib/lms/` | Enrolments, progress, certificates |
| Admissions | `lib/admissions/` | Lead capture, CRM, applications |
| AI | `lib/ai/` | Model registry, routing, RAG, agents |
| Notifications | `lib/notifications/` | Email, announcements, alerts |

## Security Architecture

- All sensitive operations happen on the server (API routes or Server Components)
- Database Row Level Security enforces tenant/user isolation
- Supabase anon key only in browser; service role key only on server
- Payment webhooks verified by signature
- AI provider keys never exposed to browser
- CSP headers restrict resource loading
- Rate limiting on public form endpoints

## Data Flow: Enquiry Submission

```
Browser → POST /api/enquiry → Rate limit check
                            → Schema validation (Zod)
                            → Duplicate check (Supabase)
                            → Insert lead record
                            → Return success
                            → Email notification (future)
```

## Data Flow: Authentication

```
Browser → Supabase Auth (PKCE)
        → Email verification
        → Exchange code for session
        → Supabase trigger: create profile + assign role
        → Session cookie stored
        → Middleware validates session on every request
```

## Database Architecture

- Primary: Supabase PostgreSQL
- Schema: See `supabase/migrations/`
- RLS: Every table has policies; privileged ops via service-role
- Vectors: pgvector for knowledge chunk embeddings
- Migrations: Timestamped SQL files committed to repo

## AI Architecture

See [ai-configuration.md](ai-configuration.md)

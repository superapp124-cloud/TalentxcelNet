# TalentXcel.net — AI-First Education Platform

**Production-oriented, AI-first education and skills development platform for TalentXcel Academy.**

## Quick Start

### Prerequisites
- Node.js 22+
- pnpm 11+
- A Supabase project (https://wvuvriewskvvievacida.supabase.co)

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/superapp124-cloud/TalentxcelNet.git
   cd TalentxcelNet
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Supabase keys and other config
   ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000)

## Documentation

- [Architecture](docs/architecture.md)
- [Database Schema](docs/database-schema.md)
- [Deployment Guide](docs/deployment.md)
- [AI Configuration](docs/ai-configuration.md)
- [Security Notes](docs/security.md)
- [Testing Guide](docs/testing.md)

## Domains

| Domain | Purpose |
|--------|---------|
| `talentxcel.net` | Public website, programme catalogue, admissions |
| `academy.talentxcel.net` | Learner portal, courses, AI tutor |

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui patterns |
| Database | Supabase PostgreSQL + RLS |
| Auth | Supabase Auth |
| Forms | React Hook Form + Zod |
| State | TanStack Query + Zustand |
| AI | OpenAI-compatible (provider-agnostic) |
| Payments | Razorpay (sandbox mode) |
| Testing | Vitest + Playwright |

## Scripts

```bash
pnpm dev          # Development server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm type-check   # TypeScript check
pnpm test         # Unit/integration tests
pnpm test:e2e     # End-to-end tests
```

## Important Notes

- TalentXcel Academy issues **platform completion certificates only** — these are not regulated qualifications
- Never expose `SUPABASE_SERVICE_ROLE_KEY` or payment secrets in browser code
- Payments are in **sandbox mode** until production credentials are provided
- All AI features require API key configuration in `.env.local`
- See [Security Notes](docs/security.md) before deploying to production

## Deployment

See [docs/deployment.md](docs/deployment.md) for full instructions including Vercel setup, environment variables, and domain configuration.

## License

Proprietary. All rights reserved.

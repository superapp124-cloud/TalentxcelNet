# TalentXcel — Universal Learning, Assessment & Skills Platform
### Greenfield Architecture · Multi-Surface Hybrid · Controlled OTA · Adaptive 10-Foot TV · Day-1 Revenue

Production-oriented, AI-first universal learning and assessment platform delivering a unified experience across:
- **Television (Android TV & Google TV 10-Foot UI)** with remote D-pad navigation.
- **Laptop & Desktop** with full multi-column academic workspace.
- **Tablet** with two-column split-screen layout (questions on left, step-by-step explanations on right).
- **Mobile Phone & Installable PWA** with touch-first navigation and offline practice.

---

## 1. Quick Start

### Prerequisites
- Node.js 22+ (tested on Node v25.6.1)
- pnpm 11+ (tested on pnpm v11.16.0)

### Development Setup

1. **Install workspace dependencies**:
   ```bash
   pnpm install
   ```

2. **Build shared domain packages**:
   ```bash
   pnpm build:packages
   ```

3. **Start the Multi-Surface Learning App (Vite SPA)**:
   ```bash
   pnpm dev:app
   ```
   Open [http://localhost:5173](http://localhost:5173). Use the top Device Switcher bar to toggle between **TV Experience**, **Laptop / Desktop**, **Tablet Split-UI**, and **Mobile Phone**.

4. **Run Automated Tests**:
   ```bash
   pnpm test:core   # Unit tests for scoring, question-key isolation & ledger math
   pnpm test        # Full workspace test suite (76 tests)
   ```

5. **Build for Production**:
   ```bash
   pnpm build:app   # Production bundle in apps/app/dist/
   ```

---

## 2. Monorepo Structure

```text
talentxcel/
├── apps/
│   └── app/               # Universal React 19 + Vite SPA (TV, Desktop, Tablet, Mobile)
├── packages/
│   ├── core/              # Domain models, scoring engine, Mayoor School PT-2 seed data
│   └── ui/                # Navy & Electric Cobalt design tokens, focus indicators
├── supabase/
│   ├── migrations/
│   │   └── 0001_initial_schema.sql  # 3NF schema, strict question-solution RLS, submit RPC
│   └── seed.sql           # Grade III & IV Mayoor School PT-2 syllabus questions & products
├── docs/
│   ├── ARCHITECTURE.md    # Multi-surface design system & device adaptation
│   ├── DATABASE.md        # Schema dictionary & question-solution isolation
│   ├── SECURITY.md        # Threat model & server-authoritative scoring
│   └── TESTING.md         # Automated test plan & acceptance criteria
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── README.md
```

---

## 3. Security & Anti-Leak Design

- **Strict Question-Key Separation**: The `questions` table holds only learner-authorized fields (`question_text`, `options`, `marks`). The confidential answer keys and step-by-step solutions are stored in `question_solutions` and locked by Row Level Security (`USING (false)`), inaccessible to client queries.
- **Server-Authoritative Evaluation**: Scoring is executed via the `submit_assessment_attempt` database RPC running as `SECURITY DEFINER` with fixed `search_path = public, pg_temp`. Prevents client-side score tampering and concurrent double-submissions.
- **Append-Only Credit Ledger**: The ₹20 pass-credit reward is managed through an immutable ledger (`credit_ledger`), guaranteeing mathematical integrity via row summation.

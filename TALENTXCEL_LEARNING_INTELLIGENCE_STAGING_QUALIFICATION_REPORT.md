# TalentXcel Learning Intelligence — Staging Qualification Report

**Final Gate:** `PASS — READY FOR PRODUCTION REVIEW`  
**Date:** 2026-11-28  
**Production Impact:** None (Production project `wvuvriewskvvievacida` and all production secrets/DNS/Cloudflare/Razorpay configs remained strictly untouched; `.env.local` was not modified).

---

## 1. Environment Identity & Isolation Evidence

| Item | Observed Value | Designation |
| :--- | :--- | :--- |
| Staging Project Name | `TalentXcelNet-Staging` | **Dedicated Staging** |
| Staging Project Ref | `doysldetspdihvlapftu` | **Dedicated Staging** |
| Staging Organization | `talenxcelnet1` (Free tier, `ap-south-1`) | Isolated Org |
| Staging API URL | `https://doysldetspdihvlapftu.supabase.co` | Isolated Endpoint |
| Production Project (Excluded) | `wvuvriewskvvievacida` (`.env.local`) | **Untouched** |
| Unused Project Paused | `auoahebycplolckiambw` (`talenxcelnet1`) | Verified empty (0 tables, 0 users, 0 app traffic) before pausing |

---

## 2. Migration Execution Results (`doysldetspdihvlapftu`)

- **Baseline + `0014` + `0015` Applied to Staging:**
  - `0001_initial_schema.sql` through `0004_math_question_bank.sql`: Applied.
  - `0007_fix_google_auth_and_profiles.sql`, `0006`, `0009`–`0013`: Applied (`0009`–`0013` all `OK`).
  - Prerequisite tables (`user_roles`, `is_admin_or_above(uuid)`, `assessment_attempts`, `ai_usage_events`): Applied (`PREREQS_OK`).
  - `0014_learning_intelligence_and_visitor_analytics.sql`: **OK** (`0014_OK`).
  - `0015_learning_intelligence_remediation_rpcs.sql`: **OK** (`0015_REAPPLIED` after staging caught and fixed `learner_entitlements.user_identifier`/`created_at`/`valid_until`/`is_active` and `commercial_orders.total_payable_rupees` column parity).

---

## 3. Staging Integration, Atomicity, RLS & RPC Qualification

Executed directly against `https://doysldetspdihvlapftu.supabase.co` using real staging JWTs (`anon`, `learnerA`, `learnerB`, `academy_admin`) and `service_role`:

| Gate | Observed Result | Status |
| :--- | :--- | :--- |
| `ingest_analytics_batch` RPC | `accepted: 1`, `deduplicated: 0` (56 ms) | **PASS** |
| Duplicate `dedupe_key` rejection | `accepted: 0`, `deduplicated: 1` | **PASS** |
| Atomic `visitor_sessions` counters | `events_count: 2`, `page_views_count: 1`, `landing_path: '/pricing'`, `exit_path: '/dashboard'` | **PASS** |
| `visitor_attribution` immutability | `first_touch_source: 'google'`, `last_touch_source: 'social'` | **PASS** |
| `reconcile_anonymous_visitor` + idempotency | 1st call: `{ reconciledEvents: 2, reconciledSessions: 1 }`; 2nd call: `{ reconciledEvents: 0, reconciledSessions: 0 }` | **PASS** |
| RLS: `analytics_events` (`anon` & `learnerA` JWT) | `0` rows returned | **PASS** |
| RLS: `analytics_events` (`academy_admin` JWT) | `1` row returned | **PASS** |
| RLS: `learner_bookmarks` cross-user (`learnerB` reading `learnerA`) | `0` rows returned (`learnerA` own read: `1` row) | **PASS** |
| RPC Security (`anon` calling `ingest_analytics_batch`) | `permission denied for function ingest_analytics_batch` | **PASS** |
| RPC Security (`learnerA` calling `get_admin_intelligence_summary`) | `permission denied for function get_admin_intelligence_summary` | **PASS** |
| `get_admin_intelligence_summary` SQL RPC | `ok: true`, `err: null`, `ms: 507`, `uniqueVisitors: 1`, `sessions: 1`, `newVisitors: 1`, `engagedVisitor: 1` | **PASS** |

---

## 4. Performance Measurements (Staging `nano` Compute, `ap-south-1`)

- `ingest_analytics_batch` RPC latency: **56 ms**
- `get_admin_intelligence_summary` SQL RPC latency: **507 ms** (full SQL aggregation, zero raw-row truncation)

---

## 5. Final Release Recommendation

**Final Gate: `PASS — READY FOR PRODUCTION REVIEW`**

- **Production remains frozen** (no production migrations or deployments were performed).
- Before deploying to production, apply [0014_learning_intelligence_and_visitor_analytics.sql](file:///c:/Users/Arshid.Wani/TalentxcelNet/supabase/migrations/0014_learning_intelligence_and_visitor_analytics.sql) and [0015_learning_intelligence_remediation_rpcs.sql](file:///c:/Users/Arshid.Wani/TalentxcelNet/supabase/migrations/0015_learning_intelligence_remediation_rpcs.sql) to production Supabase, and ensure `ANALYTICS_SIGNING_SECRET` (or `SUPABASE_SERVICE_ROLE_KEY`) is bound in the Cloudflare Worker.

# TalentXcel Production Gemini Fallback — Remediation & Qualification Report

**Date:** 27 November 2026  
**Target Service:** `talentxcelnet` Cloudflare Worker (`https://talentxcel.net`)  
**Scope:** [`lib/ai/router.ts`](lib/ai/router.ts) + offline qualification suite ([`tests/unit/ai-router-gemini-qualification.test.ts`](tests/unit/ai-router-gemini-qualification.test.ts))  
**Deployment Status:** **LOCAL CHANGES VERIFIED — NOT DEPLOYED** (strictly respects no-deployment and no-secret/infra-mutation constraints)

---

## 1. Executive Verdict

Inspecting [`lib/ai/router.ts`](lib/ai/router.ts) alongside live official Google Gemini API documentation (`ai.google.dev`) on 27 November 2026 confirmed two issues with the prior fallback path:

1. **Retired Model ID:** `router.ts` targeted `gemini-1.5-flash` on `v1beta`, which is no longer listed as an active model in Google's current Gemini model catalog or deprecation lifecycle tables (even `gemini-2.5-flash` is deprecated and auto-reroutes on 1 December 2026).
2. **Gemini 3.x API Compatibility & Hardening Gaps:** Simply changing the string to `gemini-3.8-flash` would retain deprecated `temperature` in `generationConfig` (deprecated in Gemini 3.6+/3.8 with future `400` rejection), pass `GOOGLE_AI_API_KEY` inside the URL query string (`?key=`), read only `parts[0].text` (which can contain internal `{ thought: true }` reasoning blocks on thinking models), lack an upstream `AbortSignal.timeout`, and share a `1000`-token ceiling with default `MEDIUM` thinking.

**Remediation Applied (`lib/ai/router.ts`):**
- Updated default Gemini fallback model (`DEFAULT_GEMINI_MODEL`) to **`gemini-3.8-flash`** (with `GEMINI_MODEL` env override validation).
- Migrated request format to match Google's `generateContent` (`v1beta`) & Gemini 3.8 specification: removed deprecated `temperature` for Gemini 3.x+, set `thinkingConfig: { thinkingLevel: 'LOW', includeThoughts: false }`, increased default `maxOutputTokens` to `2048`, separated system turns into `systemInstruction`, guarded against trailing `model` turns, and filtered out `{ thought: true }` parts during extraction.
- Moved authentication from `?key=` query string to the `x-goog-api-key` header, added `AbortSignal.timeout(12_000)`, added real `usageMetadata` parsing, and added `redactSensitiveText()` so logs never expose API keys.
- Preserved existing conditional flow strictly: **Prompt Safety Filter → Daily Budget Check → OpenAI (`OPENAI_API_KEY` optional) → Google Gemini (`GOOGLE_AI_API_KEY`) → Deterministic Grounded RAG (`generateDeterministicFallback`)**.

---

## 2. Codebase Caller Audit (`executeAIRequest`)

All repository callers of [`executeAIRequest`](lib/ai/router.ts) were inspected:

| Caller Module | HTTP API Entrypoint | Notes |
|---|---|---|
| [`lib/ai/tutor.ts`](lib/ai/tutor.ts) | [`app/api/ai/tutor/route.ts`](app/api/ai/tutor/route.ts) | `learning_tutor`; passes `[system, user]` |
| [`lib/ai/coding-mentor.ts`](lib/ai/coding-mentor.ts) | [`app/api/ai/code-mentor/route.ts`](app/api/ai/code-mentor/route.ts) | `coding_mentor`; passes `[system, user]` |
| [`lib/ai/admissions-assistant.ts`](lib/ai/admissions-assistant.ts) | [`app/api/ai/admissions/route.ts`](app/api/ai/admissions/route.ts) | `admissions_assistant`; passes `[system, user]` |
| [`lib/ai/business-coach.ts`](lib/ai/business-coach.ts) | Library helper (`learning_tutor`) | Passes `[system, user]` |
| [`lib/ai/career-assistant.ts`](lib/ai/career-assistant.ts) | Library helper (`learning_tutor`) | Passes `[system, user]` |
| [`lib/ai/content-studio.ts`](lib/ai/content-studio.ts) | Library helper (`learning_tutor`) | Passes `[system, user]` |
| [`lib/ai/learning-planner.ts`](lib/ai/learning-planner.ts) | Library helper (`learning_tutor`) | Passes `[system, user]` |
| [`lib/ai/operations-copilot.ts`](lib/ai/operations-copilot.ts) | Library helper (`learning_tutor`) | Passes `[system, user]` |

*(Informational note: [`app/admin/ai-analytics/page.tsx`](app/admin/ai-analytics/page.tsx#L142) contains a static display string reading `Model: gemini-1.5-flash for fallback and document summarization.`, left untouched to preserve zero UI changes under strict minimal-diff scope.)*

---

## 3. Official Model Verification & Controlled Qualification Evidence

### 3.1 Official Documentation Audit (`https://ai.google.dev/gemini-api/docs`, verified 27 Nov 2026)
Direct HTTP `200` fetches against official documentation pages confirmed:

| Model ID | Status (`ai.google.dev/gemini-api/docs`) | Pricing (Free / Paid per 1M tokens) | Notes & Decision |
|---|---|---|---|
| `gemini-1.5-flash` | Retired / absent from active model catalog & deprecation tables | Unavailable | Broken fallback — must replace |
| `gemini-2.5-flash` | **Deprecated** (shutdown/auto-reroute Dec 1, 2026 → `gemini-3.5-flash-lite`) | Auto-migrating | Avoid migrating onto an expiring alias |
| **`gemini-3.8-flash`** | **Active Stable** (Released Sept 2, 2026; no shutdown date announced; `1,048,576` in / `65,536` out) | **Free Tier available (`Free of charge`)**; Paid `$0.75` in / `$3.75` out through Dec 31, 2026 (`$1.50` / `$7.50` starting Jan 1, 2027) | **SELECTED:** Best reasoning/coding quality for AI Tutor & Coding Mentor at lower cost than `gemini-4-hydrogen` (`$1.50`/`$7.50`), with active Free Tier |
| `gemini-3.5-flash-lite` | Active Stable (Released July 21, 2026; no shutdown announced) | Free Tier; Paid `$0.30` in / `$2.50` out | Viable ultra-low-cost alternative configurable anytime via `GEMINI_MODEL` env var without code edits |

### 3.2 API Parameter & Response Schema Compatibility (`v1beta` `generateContent`)
Verified directly against `https://ai.google.dev/gemini-api/docs/whats-new-gemini-3.8`, `.../whats-new-gemini-3.6#api-changes-and-parameter-updates`, and `.../api/generate-content`:
- **Authentication:** `x-goog-api-key` HTTP header supported natively, eliminating `?key=` query URL secret exposure.
- **Sampling parameters:** `temperature`, `top_p`, and `top_k` are deprecated starting Gemini 3.6+ and omitted on Gemini 3.x/4.x requests.
- **Thinking behavior:** Default `thinkingLevel` is `MEDIUM` (`minimal` unsupported on `gemini-3.8-flash`). `router.ts` explicitly sets `thinkingConfig: { thinkingLevel: 'LOW', includeThoughts: false }` (verified enum value `LOW` in `/api/generate-content`) and `maxOutputTokens: 2048` default so reasoning latency stays low within Cloudflare Worker execution time and never starves final answer tokens.
- **Turn validation:** Gemini 3.x returns `400` if `contents` ends on a `model` turn; `buildGeminiPayload()` moves `system` turns to `systemInstruction` and guarantees a `user` final turn.
- **Thought filtering:** `extractGeminiAnswerText()` filters out `part.thought === true` so internal reasoning never leaks into learner answers.

### 3.3 Read-Only Network Qualification & Limitation Boundary
- Unauthenticated read-only probes to `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash` and `.../gemini-1.5-flash` both returned `403 PERMISSION_DENIED` (`service: generativelanguage.googleapis.com`, API key required).
- **Important Honesty Note:** No `GOOGLE_AI_API_KEY` exists in local dev (`HAS_LOCAL_GEMINI_KEY=False`), and production Worker secrets were strictly neither read nor extracted. Therefore, **live authenticated generation with the bound production `GOOGLE_AI_API_KEY` (key restrictions, billing tier, RPM quota, and live latency) is NOT VERIFIED LIVE** until post-deploy verification on `talentxcel.net`.

---

## 4. Failure Modes Analyzed & Handled Without Error/Secret Leakage

| Failure Mode | Trigger | Runtime Behavior in Hardened `router.ts` |
|---|---|---|
| Invalid / retired model ID | HTTP `400` / `404` (`GEMINI_MODEL` invalid chars sanitized by regex fallback to `gemini-3.8-flash`) | Logs `HTTP <status>` only; returns `generateDeterministicFallback` (`provider: 'mock'`, `isFallback: true`) |
| API key permissions / restrictions | HTTP `401` / `403` | No key in URL/headers logged; falls back to RAG safely |
| Quota exhaustion / rate limit | HTTP `429` (`RESOURCE_EXHAUSTED`) / `503` | Falls back cleanly to RAG without HTTP 500 to caller |
| API version / payload schema mismatch | HTTP `400` / `404` | Sanitized warning; deterministic RAG returned |
| Response parsing / empty or thought-only response | Invalid JSON or empty non-thought `parts` | `extractGeminiAnswerText()` returns `''`; falls back cleanly to RAG |
| Upstream hang / timeout | Slow Gemini response > `12_000 ms` | `AbortSignal.timeout(12_000)` aborts fetch cleanly; redacts keys via `redactSensitiveText()`; falls back to RAG |
| Missing `GOOGLE_AI_API_KEY` | Key unset or whitespace | Skips outbound Gemini request completely (0 network calls); serves RAG |

---

## 5. Exact Files Changed & Verification Evidence

| File | Action | Purpose |
|---|---|---|
| [`lib/ai/router.ts`](lib/ai/router.ts) | Modified | Switch default model to `gemini-3.8-flash`, header auth, Gemini 3.x payload & thinking config, non-thought parsing, `usageMetadata`, timeouts, key redaction |
| [`tests/unit/ai-router-gemini-qualification.test.ts`](tests/unit/ai-router-gemini-qualification.test.ts) | Created | Offline qualification tests (`10` cases) covering OpenAI path, Gemini selection + header auth + schema compliance, OpenAI→Gemini fallback, 6 failure modes (`404`, `403`, `429`, thought-only, malformed JSON, timeout with secret leak check), and missing key safety |

### Local Check Results (Executed After Final Edit)
- **`pnpm type-check` (`tsc --noEmit`):** **PASSED** (`0` errors)
- **`pnpm test` (`vitest run`):** **PASSED** — **`29/29` test files, `290/290` tests** (`38.90s`), including all **`10` tests** in `tests/unit/ai-router-gemini-qualification.test.ts` (`40ms`) and existing `tests/unit/skill-graph-and-project.test.ts` (`8` tests).
- **`pnpm exec eslint "lib/ai/router.ts" "tests/unit/ai-router-gemini-qualification.test.ts"`:** **PASSED** (`0` errors, `0` warnings).
- **`git status --short`:** Only `M lib/ai/router.ts`, `?? tests/unit/ai-router-gemini-qualification.test.ts` (prior to writing this report).

---

## 6. Deployment Recommendation

1. **Ready for Release Approval:** The remediation is minimal, strictly backwards-compatible across all API routes, passes all `290` tests and TypeScript compilation cleanly, and requires **zero Cloudflare secret changes** (`GOOGLE_AI_API_KEY` is already bound on `talentxcelnet`).
2. **Post-Deploy Live Smoke Check (after release approval & `pnpm run deploy:vinext`):**
   - Trigger one controlled non-auth or authenticated `POST https://talentxcel.net/api/ai/admissions` inquiry (e.g., `{"question":"Explain Ohm law in 2 lines"}`) and verify JSON returns `"provider":"google"`, `"model":"gemini-3.8-flash"`, and `"isFallback":false` (confirming live `GOOGLE_AI_API_KEY` permissions & quota against Google AI Studio).
   - Optional future cleanup: update the static display label in `app/admin/ai-analytics/page.tsx:142` from `gemini-1.5-flash` to `gemini-3.8-flash` during a UI maintenance pass.

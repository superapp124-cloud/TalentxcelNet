# TALENTXCEL — PRODUCT RESEARCH, DESIGN SYSTEM & ARCHITECTURAL FOUNDATION

**Document Status:** Approved Architectural Reference  
**Evaluation Date:** October 2026  
**Standards:** WCAG 2.2 AA, Apple Human Interface Guidelines (HIG), India DPDP Act 2023  
**Target Domains:** `talentxcel.net` (Public & Catalogue) | `academy.talentxcel.net` (LMS & Super AI)

---

## 1. Executive Summary & Product Mission

TalentXcel is an AI-first education and skills platform engineered to bridge practical industry capabilities and career outcomes. The platform operates on four pillar tracks:
1. **AI Development & Automation** (8-month Flagship)
2. **Healthcare Technology** (Hospital Information Systems & FHIR/HL7 Interoperability)
3. **Entrepreneurship & Digitization** (Omni-channel Commerce & Payment Reconciliation)
4. **School Foundation** (Class 8 → 9 Standalone Bridge Programme)

The platform is designed to overcome standard EdTech pitfalls:
- Eliminates passive lecture bingeing in favor of active capstone software builds.
- Replaces generic ChatGPT answering with a curriculum-grounded Socratic AI Tutor that guides learners step-by-step.
- Replaces subscription lock-ins with transparent, milestone-based fees (Upfront settlement or 2-installment milestone schedules).
- Guarantees child safety, guardian oversight, and strict compliance with the **Digital Personal Data Protection (DPDP) Act 2023**.

---

## 2. Primary Target Audiences & Behavioral Constraints

| Audience Persona | Primary Motivations | Critical Barriers & Hesitations | Platform Design Response |
| :--- | :--- | :--- | :--- |
| **Aspiring Developers & Career Switchers** | Hands-on experience, verifiable portfolio, industry-standard AI tooling (pgvector, RAG, agents). | Overwhelmed by theoretical trivia; fear of obsolete tech stacks. | Socratic AI Tutor, project-based rubrics, automated code review, real CI/CD pipelines. |
| **Healthcare Professionals & Informaticians** | Modernizing clinical records, understanding FHIR/HL7 standards, HIPAA/DISHA/DPDP laws. | Non-technical background, stringent compliance concerns, busy shifts. | Modular micro-learning, compliance-first curriculum, practical case simulations. |
| **School Learners (Class 8 → 9) & Guardians** | Strong foundation in algorithmic logic, science, and math before secondary school. | Guardian safety concerns, distraction risks, screen-time abuse. | Guardian oversight dashboard, child-safety filtering, no unmoderated open LLM chats. |
| **Indian Tier 2 / Tier 3 Families** | Quality education at transparent cost; upward economic mobility. | Spotty internet connectivity, fear of hidden recurring subscriptions. | Offline PWA caching (IndexedDB), hardware minimum specs, transparent milestone payments. |
| **Instructors & Mentors** | Streamlined grading, meaningful learner engagement, structured feedback. | Grading overload, tedious administrative overhead. | Rubric-based assessment review console, automated test summaries, batch feedback. |
| **Admissions & Administration** | Cohort health, verified lead tracking, payment ledger reconciliation, AI cost control. | Cluttered CRM data, manual payment matching, unpredictable LLM API costs. | Unified Admin Console, automated webhook reconciliations, real-time AI token monitoring. |

---

## 3. Design Principles: Translating Apple HIG into TalentXcel

Apple's design philosophy is rooted in **Clarity, Deference, and Depth**. We translate this into TalentXcel's bespoke digital experience:

### A. Restraint & Contextual Surfaces (No Generic "All-Black" Templates)
- **Cinematic & Editorial Hero Surfaces**: Deep obsidian (`#000000`, `#080808`) with subtle optical radial diffusion (`rgba(0,128,255,0.18)`), showcasing flagship tracks and technological leadership.
- **Reading, Courseware & Form Surfaces**: Clean, ultra-readable high-contrast surfaces (`#FFFFFF` with `#0A0A0A` text in light mode, or `#111827` with `#F9FAFB` text in dark mode) ensuring optimal cognitive ease during study.
- **No Overused Gimmicks**: Elimination of neon gradients, gaudy drop shadows, or unconstrained rounded corners. Every visual element has a functional purpose.

### B. Typographic Scale & Hierarchy
- **Font Stack**: `Inter`, system-ui, -apple-system, sans-serif.
- **Display Scale**:
  - `Hero Display`: 48px to 64px, tracking `-0.03em`, leading `1.08`.
  - `Section Heading (H2)`: 32px to 40px, tracking `-0.025em`, leading `1.15`.
  - `Card / Module Title (H3)`: 20px to 24px, tracking `-0.015em`, font-weight `600` or `700`.
  - `Body Text`: 15px to 16px, line-height `1.6`, character line-length constrained to `65ch` max for effortless reading.
  - `Captions & Micro-labels`: 11px to 13px, tracking `0.02em`, uppercase weight `600`.

### C. Spatial Rhythm & Grid Cadence
- Adheres to an **8pt modular spacing grid** (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`).
- Generous internal padding on cards (`p-6` to `p-10`) to prevent visual crowding.
- Viewport cadence: Hero sections designed so the value proposition, headline, subhead, primary CTA, secondary CTA, and trust indicators are 100% visible above the fold on standard `1366x768` and `1920x1080` displays.

---

## 4. Official Brand Identity & Asset Governance

### A. The Approved Brand Mark
- **Emblem**: Continuous geometric track with a bottom-right aperture (`M 68 80 A 38 38 0 1 1 85 55`) paired with a dynamic `45°` angled accent bar (`(45, 50) -> (78, 83)`).
- **Primary Accent Color**: Electric Cobalt Blue (`#0080FF`).
- **Surface Adaptability**:
  - On Dark Surfaces: Ring is crisp white (`#FFFFFF`), accent bar is `#0080FF`, text is white with blue **`X`**.
  - On Light Surfaces: Ring is dark slate (`#0F172A`), accent bar is `#0080FF`, text is neutral-900 with blue **`X`**.
- **Defensive Containment**: Every instance of `<svg>` or `<Image>` enforces explicit `width`, `height`, `pixelSize`, and `shrink-0` attributes to prevent unstyled layout shifts (CLS) or viewport blowups.

---

## 5. Accessibility & Compliance (WCAG 2.2 AA)

1. **Color Contrast**:
   - All body text maintains minimum `4.8:1` contrast against background surfaces.
   - Interactive button labels achieve `7:1+` contrast (`#FFFFFF` on `#0080FF` or `#000000` on `#FFFFFF`).
2. **Keyboard Navigation & Visible Focus**:
   - Every interactive control (`<a>`, `<button>`, `<input>`, `<select>`) implements an accessible ring indicator:
     `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0080FF] focus-visible:ring-offset-2`.
3. **Screen Reader Semantic Markup**:
   - Landmark roles: `<header>`, `<nav>`, `<main id="main-content">`, `<section aria-labelledby="...">`, `<footer>`.
   - Accessible SVG attributes: `aria-hidden="true"` on decorative icons; `aria-label` or `<title>` on standalone emblems.
4. **Child Safety & DPDP Act 2023**:
   - Learner data for minors (Class 8 → 9) requires verifiable guardian consent.
   - Student telemetry and AI prompts are scrubbed of personal identifiable information (PII).
   - Zero behavioral tracking or advertising trackers.

---

## 6. Real User Journeys to Guarantee

1. **Discovery to Enquiry**: Visitor lands on `/programmes`, navigates to `/programmes/ai-development`, inspects the 8-month syllabus and hardware criteria, and submits a lead enquiry via `/contact`.
2. **Admission Application**: Candidate completes multi-step application on `/apply`, selects fee installment preference, and receives confirmation.
3. **Counsellor Review**: Admissions staff logs into `/admin/admissions`, reviews lead pipeline, updates status to `Under Review` or `Admitted`.
4. **Learning Experience**: Learner opens `/dashboard`, launches course player at `/courses/ai-development/lessons/mod1-lesson1`, reads curriculum, triggers the Socratic Super AI Tutor drawer, and runs practical code tests.
5. **Certificate Verification**: Public registry at `/verify/[certificateNumber]` verifies cryptographic SHA-256 hash against Supabase records without exposing private personal details.

# TalentXcel Architecture Documentation

## 1. System Overview

TalentXcel is a greenfield, universal learning and assessment platform built for:
- **Web & Desktop**: High-resolution multi-column dashboard with detailed analytics.
- **Tablets**: Two-column split-screen layout with live questions on the left and step-by-step explanations on the right.
- **Mobile Phones & PWAs**: Touch-first responsive interface with offline IndexedDB/SQLite caching and bottom navigation.
- **Television (10-Foot UI)**: Android TV / Google TV optimized with high-contrast spatial focus navigation and phone pairing authentication.

## 2. Multi-Surface Design System

Based on the official TalentXcel multi-device specification:
- **Palette**: Deep Space Navy (`#070B14`, `#0B132B`) with Primary Electric Cobalt (`#0080FF`) and Cyan Focus Accents (`#00D2FF`).
- **Subject Identity Tracks**:
  - Mathematics: Amber/Orange (`#F97316`)
  - Science: Emerald Green (`#22C55E`)
  - English: Cobalt Blue (`#3B82F6`)
  - Hindi: Rose Pink (`#F43F5E`)
  - Social Science: Violet Purple (`#A855F7`)

## 3. Universal Device Adaptation

```text
                        ┌──────────────────────────────┐
                        │      React 19 / Vite SPA     │
                        └──────────────┬───────────────┘
             ┌─────────────────────────┼─────────────────────────┐
             ▼                         ▼                         ▼
   ┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
   │   Desktop / Web  │      │ Tablet Split-UI  │      │  Mobile / PWA    │
   │  Full Dashboard  │      │ Question / Expl. │      │  Touch Navigation│
   └──────────────────┘      └──────────────────┘      └──────────────────┘
                                       │
                                       ▼
                             ┌──────────────────┐
                             │  Android TV App  │
                             │  10-Foot Spatial │
                             └──────────────────┘
```

## 4. Operational Boundaries

- **OTA Updates**: Web-layer updates via `@capgo/capacitor-updater` with SHA-256 bundle verification. Native permission changes always require a new native release.
- **Solo-Founder Automation**: Automated database migrations, server-authoritative scoring, and managed webhook idempotency prevent manual operational bottlenecks.

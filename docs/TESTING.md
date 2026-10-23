# TalentXcel Testing & Verification Guide

## 1. Test Suite Organization

- **Unit & Logic Tests (`tests/unit/` & `packages/core/`)**:
  - Validates the mathematical correctness of server-authoritative scoring.
  - Tests negative marking ratios (e.g. 0.0 vs 0.25).
  - Tests answer isolation (ensuring questions payload does not expose answer keys).
  - Tests immutable credit ledger balance computations.
- **Multi-Device Responsive Journeys (`apps/app/`)**:
  - Desktop multi-column layout verification.
  - Tablet split-screen verification (questions left, solutions right).
  - Mobile phone bottom-navigation verification.
  - 10-foot TV directional focus indicators.

## 2. Running Automated Tests

```bash
# Run all workspace unit tests
pnpm test

# Run type check across all packages
pnpm typecheck

# Run production build
pnpm build
```

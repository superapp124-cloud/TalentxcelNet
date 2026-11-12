# Phase 0.7A Decision Matrix

| Observed production outcome | Evidence status | Decision | Next step (no execution here) |
|---|---|---|---|
| Live trigger/function contains email-to-`super_admin` promotion | VERIFIED PRESENT | Critical/high risk; hold release | Design and review additive trigger replacement; preserve approved roles; obtain approval before SQL |
| Trigger/function contains no email promotion and only default prospect assignment | VERIFIED ABSENT | Historical risk not active in inspected path | Verify all alternate triggers/functions and retain evidence |
| Catalog/definition query denied or unavailable | UNKNOWN | Inconclusive; hold release | Obtain least-privilege metadata access or sanitized export |
| Unexpected active super-admin assignment | VERIFIED PRESENT | High risk; do not alter automatically | Verify identity/approval/audit trail; obtain separate credential/session decision |
| Privileged assignments all approved, active, non-expired | VERIFIED PRESENT | Evidence supports current inventory only | Continue RLS/audit/function review and staging validation |
| Audit history unavailable | UNKNOWN | Cannot assess suspicious promotions | Obtain sanitized audit/log export; do not declare incident |
| Migration ledger records 0005/0007 | VERIFIED PRESENT | Historical application confirmed | Compare live trigger/function definitions; do not rerun |
| Migration ledger rows absent but ledger access authoritative | VERIFIED ABSENT | Not evidenced as applied in that ledger | Check alternate migration history only; do not infer schema state |
| Migration ledger inaccessible | UNKNOWN | Application status unknown | Obtain read-only ledger access |
| RLS/grants permit unexpected client role writes | VERIFIED PRESENT | Critical/high risk | Prepare corrective policy/function design; do not execute |
| SECURITY DEFINER lacks fixed search path | VERIFIED PRESENT | High hardening risk | Prepare reviewed function replacement with fixed `search_path` |

No matrix outcome authorizes a migration, credential rotation, session invalidation, deployment, or incident declaration by itself.

# Phase 0.7A Evidence Register

Allowed statuses: `VERIFIED PRESENT`, `VERIFIED ABSENT`, `UNKNOWN`, `NOT APPLICABLE`.

## Collection metadata

- Production project reference:
- Collection date/time UTC:
- Operator role:
- Access method:
- Sanitization reviewer:

## Register

| ID | Evidence item | Query/reference | Status | Sanitized output summary | Access/permission error | Interpretation/next step |
|---|---|---|---|---|---|---|
| E-01 | Migration 0005 ledger row | SQL 1 | UNKNOWN | | | |
| E-02 | Migration 0007 ledger row | SQL 1 | UNKNOWN | | | |
| E-03 | `auth.users` non-internal triggers | SQL 2 | UNKNOWN | | | |
| E-04 | Trigger function definitions | SQL 3 | UNKNOWN | | | |
| E-05 | Privileged role assignments | SQL 4 | UNKNOWN | | | |
| E-06 | Historical identity linkage | SQL 5 | UNKNOWN | | | |
| E-07 | RLS policies | SQL 6 | UNKNOWN | | | |
| E-08 | Table grants | SQL 6 | UNKNOWN | | | |
| E-09 | Role/audit event history | SQL 7 | UNKNOWN | | | |
| E-10 | Storage buckets/policies | SQL 8 | UNKNOWN | | | |

Do not mark inaccessible objects VERIFIED ABSENT. Do not treat repository migrations as production evidence. Do not include raw rows containing secrets, hashes, tokens, or unnecessary personal data.

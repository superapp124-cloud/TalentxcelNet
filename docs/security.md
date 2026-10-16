# Security Notes

## Core Security Rules

1. **Least Privilege Data Access**: PostgreSQL Row Level Security (RLS) is enabled on all 34 database tables.
2. **Key Isolation**:
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Safe for browser client authentication.
   - `SUPABASE_SERVICE_ROLE_KEY`: Privileged server-only runtime key. Never exposed to browser or committed to repository.
   - Payment Secrets (`RAZORPAY_KEY_SECRET`, `RAZORPAY_WEBHOOK_SECRET`): Privileged server-only.
3. **Idempotent Webhooks**: All payment webhooks verify SHA256 HMAC signatures and record event IDs in `payment_webhook_events` to prevent duplicate crediting.
4. **Input Sanitization & Validation**:
   - Strict runtime parsing using Zod schemas on all API inputs and AI prompts.
   - AI prompts pass through injection guards to neutralize instruction override attempts.
5. **Data Protection Compliance (India DPDP Act 2023)**:
   - Explicit consent tracking in `consent_records`.
   - Age verification with guardian consent workflows for minor learners (e.g. Class 8->9 School Foundation).
   - Zero behavioural profiling or public directory disclosure of minors.
6. **Audit Trails**: Privileged role modifications and critical transactions emit events into `audit_events`.

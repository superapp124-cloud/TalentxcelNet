# TalentXcel Security & Privacy Policy

## 1. Threat Model & Anti-Leak Boundary

1. **Question Key Separation**:
   - Web clients during an active attempt can only query `questions`.
   - The table `question_solutions` is completely blocked from client `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.
   - Answer keys are never packaged into client-side JavaScript bundles or public static files.
2. **Defensive Database RPC**:
   - `submit_assessment_attempt` uses `SECURITY DEFINER` with an explicit `search_path = public, pg_temp` to prevent schema hijack attacks.
   - Caller identity is verified against `auth.uid()` and guardian-learner ownership records. Caller-supplied user IDs are never trusted.
3. **Payment Security**:
   - Client callbacks never mark an order as paid. Access is granted solely upon receipt and cryptographic verification of the Razorpay webhook HMAC signature against the raw payload.
4. **Append-Only Credit Ledger**:
   - Users cannot edit balances directly. Each transaction is represented by an immutable record with a unique idempotency key to prevent double-spending.
5. **Child Data Safety & Privacy**:
   - Minors cannot create self-asserted unverified accounts. Guardian relationship mapping is mandatory.
   - PII is omitted from public logs and telemetry.

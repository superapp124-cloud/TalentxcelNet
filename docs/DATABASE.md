# TalentXcel Database & Schema Documentation

## 1. Schema Design Principles

The database follows strict third-normal form (3NF) with Row Level Security (RLS) enabled across every table:
1. **Identity & Multi-Profile Access**: `profiles`, `learner_profiles`, `guardian_learner_relationships`. One guardian account can manage multiple learners across different grades.
2. **Curriculum Mapping**: `curriculum_boards`, `classes`, `subjects`, `chapters`, `topics`.
3. **Assessment Isolation**:
   - `questions`: Holds learner-authorized data (`question_text`, `options`, `marks`, `difficulty`). Does NOT contain answer keys!
   - `question_solutions`: Confidential table containing `correct_option_ids`, `solution_steps`, and `explanation`. Locked down by RLS so clients can never query it directly.
4. **Commerce & Immutable Ledger**:
   - `products`, `orders`, `payment_events`, `entitlements`.
   - `credit_ledger`: Append-only table recording every ₹20 pass-credit earned or spent, guaranteeing idempotent balances through row summation.

## 2. Server-Authoritative Evaluation RPC

The function `submit_assessment_attempt(p_attempt_id, p_answers)`:
- Executes as `SECURITY DEFINER` with fixed `SET search_path = public, pg_temp`.
- Obtains an exclusive row lock (`FOR UPDATE`) on the attempt to prevent concurrent double-scoring or replay exploits.
- Compares submitted option IDs against `question_solutions.correct_option_ids`.
- Computes positive marks and applies configurable negative marking deductions.
- Automatically awards and records the ₹20 pass credit in the `credit_ledger` if score $\ge$ passing threshold.

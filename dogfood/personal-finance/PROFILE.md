# Course Profile: Personal Finance for Working Adults

This file records the resolved intake knobs and a fully spelled-out NON-STEM
anchor profile. Every module and every static gate reads this file instead of
assuming the STEM defaults. Where I override a STEM default I say so explicitly
and cite the SKILL.md section that authorizes the override.

## Resolved intake knobs

| Knob | Resolved value | Source |
|---|---|---|
| Subject + scope | Personal finance for adults: budgeting, killing debt, building an emergency fund, sensible investing, tax-advantaged accounts, and avoiding scams. Practical, life-skill level, not a CFA prep. | user request |
| Audience / level | A working adult, late 20s to 40s, no finance background, not a college student. Has income, bills, and probably some debt. | user request |
| Size | 25 modules across 3 tracks (9 / 9 / 7). | default (kept) |
| Depth / tone | Plain-spoken and practical, intuition-first. Name the move, show the arithmetic, then let the learner do it with their own numbers. Math-light: no calculus, no derivations, just multiply/divide and percentages. | user request + override (see below) |
| Build project style | One "compute-a-number" or "make-a-tradeoff" artifact per module (a savings rate, a payoff date, a budget table), verified by `estimate` (sanity-bound) or `rubric` (criteria), never by runnable code. | anchor profile override |
| Runtime | Claude Code. | detected |
| Image provider | `svg` (deterministic engine). No image-gen MCP tool is connected in this runtime. A money course leans on clean structure (bars, stacks, curves) where vector labels stay crisp. Recorded per the intake rule. | detect, fall back to `svg` |
| Publish target | None for this dogfood run. The library default would be a private GitHub repo `personal-finance-course`. | dogfood instruction |

## Mission link

The learner's stated goal lives in [learner/mission.md](learner/mission.md) and
governs which anchors specialize and which modules get priority.

## Anchor profile (NON-STEM)

The default Anchor Profiles table in SKILL.md ("Anchor Profiles", lines ~299-331)
assumes a STEM course for a college student: a campus example, a "small numbers"
tiny case, a numeric calculator lab, a runnable-code build project, and
math-style diagrams. Personal finance is none of those. SKILL.md explicitly
says to "Declare a small anchor profile once per course ... and have every
module and gate read it instead of assuming STEM." This course declares a custom
NON-STEM profile below. It is closest to the System-design row of the table
(artifact = a doc + estimate, verification = sanity-bound check, labs =
make-a-tradeoff / see-the-consequence), borrowed and respecialized for money.

| Field | Value |
|---|---|
| Audience | A working adult with real income and real bills, no finance training, possibly carrying credit-card debt. Numerate enough for percentages and a calculator, allergic to jargon. |
| Anchor domain | Real money and life situations: a paycheck and its deductions, rent and groceries, a credit-card statement, a 401(k) match offer, a car loan, a surprise medical bill, a phishing text claiming to be the bank. NOT campus/dorm/lab life. |
| Metaphor domain | Everyday household and physical structure: a snowball rolling downhill, a leaky bucket, a thermostat, water filling a tank, a fire extinguisher kept for emergencies, weather forecasting. Mapped tightly to the formal idea, never decorative. |
| Tiny case | A small worked money scenario with round numbers: one $2,000 balance at 24% APR, a single $50/month contribution, a $3,600/year expense, one paycheck of $4,000. Small enough to check on a phone calculator in under a minute. NOT "small integers" for their own sake. |
| Artifact type + verification mode | A computed number or a filled-in plan (savings rate, debt-payoff month, emergency-fund target, asset mix), verified by **`estimate`** (the answer must land inside a stated sanity band, e.g. "a 20% savings rate on $4k take-home is about $800/month, not $80 and not $8,000") or by **`rubric`** (a budget or plan scored against named criteria). NO module claims a "runnable" check, because nothing here is code. |
| Allowed lab types | Numeric input (enter your own balance/APR/income, read interpreted output), make-a-tradeoff (avalanche vs snowball, Roth vs traditional, pay debt vs invest), and see-the-consequence (move one input, watch the payoff date or ending balance shift). |
| Diagram archetypes | `curve` (compound growth, debt payoff over time), `stack` (a budget split into categories, a paycheck into deductions), `barsToValue` (turn a spending distribution into a monthly total or a savings rate), `pipeline` (money flowing income → bills → savings → invest), `scorecard` (rate a budget or a plan against criteria), `matrix` (Roth vs traditional, avalanche vs snowball decision table). |

## Explicit overrides of the STEM defaults (with citations)

These are the places I am deliberately bending the STEM-first contract. Each
cites the rule it overrides and the SKILL.md authority for bending it.

1. **No "campus example."** SKILL.md "Curriculum Standard" hardcodes a
   `Campus example` field ("a familiar example from college life, labs, dorms,
   commuting, group projects ...") and the course-quality-contract repeats it
   ("a module lacks a `Real-World Anchor` with a campus example"). Authority to
   override: SKILL.md "Anchor Profiles" rule, "Do not force the word 'campus' or
   'small numbers' into a non-STEM course." The `data-campus` attribute is still
   present and unique per module; its prose is a money-life situation (a 401(k)
   match, a credit-card statement), not a dorm.

2. **No "runnable" success check.** module-recipe.md requires a "runnable
   success check" in `Build it yourself`, and course-quality-contract line 17
   says "a script, a measurement, a small system ... a runnable success check."
   Authority to override: SKILL.md "Anchor Profiles", "A non-code course must
   not claim a 'runnable' check"; verification mode follows the profile
   (`estimate` here). The `You have it when` line states a sanity band the
   learner checks by hand.

3. **Math-light, no derivations.** The first-principles path requires a "Now
   Write the Equation" card. For money there IS one real formula worth writing
   (compound interest, `A = P(1+r/n)^(nt)`), so modules that touch growth/payoff
   put it there honestly. Modules with no formula (e.g. "spotting a scam,"
   "choosing an account type") use that card for the closest precise rule or
   decision criterion, and FRICTION.md records every module where the card had
   to hold a rule instead of an equation.

4. **Tiny case = a money scenario, not small integers.** The contract's
   "small numbers" becomes "round-number money scenario." Authorized by the same
   Anchor Profiles line.

## Notes the gates must honor

- Do not force the literal word "campus" or the phrase "small numbers" into
  prose. The `data-campus` and `data-test` attributes are still present and
  unique per module; the copy reads as a real adult money situation.
- Verification mode is per module and is `estimate` or `rubric`, never
  `runnable`. A budgeting or scam module must not claim a value is "runnable."
- The course uses currency glyphs and percent signs ($, %, ×) and a few math
  symbols (^, ≈, ≤). Set UTF-8 and a font stack that covers them.
- The `Now Write the Equation` card may hold a decision rule or threshold when
  no formula applies; that substitution is logged in FRICTION.md, not hidden.

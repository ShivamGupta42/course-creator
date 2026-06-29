# Course Profile: Mathematics, from the ground up

This file records the resolved intake knobs and the anchor profile. Every module
and every static gate reads this file instead of assuming the STEM defaults.

## Resolved intake knobs

| Knob | Resolved value | Source |
|---|---|---|
| Subject + scope | Mathematics, from the ground up. A broad, high-level journey: arithmetic reasoning, algebra, functions, calculus intuition, proof and logic, and probability basics. | user request |
| Audience / level | High-school graduate heading into university, no university math yet. | user request |
| Size | 25 modules across 3 tracks (9 / 9 / 7). | default (kept) |
| Depth / tone | Rigorous but plain-spoken, intuition-first. State the idea, then earn it. | user request |
| Build project style | One hand-worked or runnable numeric artifact per module (the learner computes, then checks). | anchor profile |
| Runtime | Claude Code. | detected |
| Image provider | `svg` (deterministic engine). No image-gen MCP tool is connected in this runtime, and a math course leans on crisp formulas/structure where vector text beats raster. Recorded here per the intake rule. | detect, fall back to `svg` |
| Publish target | None for this dogfood run. The full library default would be a private GitHub repo `mathematics-course`. | dogfood instruction |

## Mission link

The learner's stated goal lives in [learner/mission.md](learner/mission.md) and
governs which anchors specialize and which modules get priority.

## Anchor profile

This is a STEM course, so it uses the STEM family from the Anchor Profiles table,
specialized to mathematics.

| Field | Value |
|---|---|
| Audience | Incoming university student, comfortable with high-school arithmetic and basic algebra, no calculus or proof experience. |
| Anchor domain | Campus and dorm life: splitting bills, course schedules, gym sets, commute timing, lab measurements, study-group logistics. Concrete situations a first-year recognizes. |
| Metaphor domain | Everyday physical and social structure: stacking blocks, recipes, maps and directions, sorting laundry, a thermostat reacting to a room. Mapped tightly to the formal idea, never decorative. |
| Tiny case | The smallest honest instance: two or three numbers, a 2-element set, n = 1 then n = 2, a single coin flip, a line through two points. Small enough to check by hand in under a minute. |
| Artifact type + verification mode | A hand-computed or short-script numeric result, verified `runnable`: the learner predicts a value, then checks it against an independent computation (re-derive by another route, or evaluate at a known anchor point). For proof-flavored modules the artifact is a written argument verified by `rubric` (every step justified, no gap). |
| Allowed lab types | Numeric input (enter values, read interpreted output), choice (pick the form/step), and compare-two-cases (change one quantity, read the direction of change). |
| Diagram archetypes | `curve` (functions, limits, growth), `barsToValue` (averages, expectation, summary from a distribution), `stack` (decompositions, place value, distributive law), `pipeline` (a process or algorithm step by step), `parts` (anatomy of an expression or a proof), `venn` (sets, logic, probability of combined events). |

## Profile knobs (single source of truth the gates read)

These are the knobs from SKILL.md "Anchor Profiles → Profile knobs the gates read".
Mathematics is the STEM default, so most stay at the default; the gate reads this
block, never a hardcoded STEM string.

| Knob | Value | Notes |
|---|---|---|
| `anchor_label` | `Campus example` | STEM default. The visible framing of the Real-World Anchor; the machine hook stays `data-campus`/`data-boundary` and the literal word "campus" is never required in prose. |
| `anchor_domain` | campus / college life | STEM default. Splitting bills, course schedules, gym sets, commute timing, lab measurements, study-group logistics. |
| `formal_card_heading` | `Now Write the Equation` | STEM default. Math has equations, so the formal card keeps the equation heading and a dimensional/algebraic sanity guard. The two proof/logic modules (14, 20) use the same card to state the formal rule of inference; its guard is a "no unjustified step" consistency check rather than a dimensional one. |
| `verification_mode` | `runnable` (numeric modules); `rubric` (proof/logic modules 14, 20, and the proof half of 25) | Per-module within one course. Numeric modules: the learner predicts a value, then checks it against an independent computation. Proof modules: a written argument graded by rubric (every step justified). A proof module must not claim "runnable". |
| `lab_interactions` | `[numeric, choice, compare]` | Numeric input (enter values, read interpreted output), choice (pick the form/step), and compare-two-cases (change one quantity, read direction of change). The `aria-invalid` / "valid input computes output" smoke gate applies to `numeric`; `choice`/`compare` satisfy it by producing interpreted feedback with no invalid state. |
| `module_count` / `track_split` | 25 / 9-9-7 | STEM default. The size gate reads this, it does not assert 25. |
| `canonical_tokens` | `[]` | Mathematics has no fixed cross-module alphabet that legitimately recurs (no analogue of the 12 notes); per-module prose, diagram labels, and quiz stems must all be unique. Empty is correct here. |

## Notes the gates must honor

- Do not force the literal word "campus" or the phrase "small numbers" into prose;
  the `data-campus` and `data-test` attributes still must be present and unique per
  module, but the copy reads naturally for an incoming student.
- Verification mode is per module: numeric modules claim a `runnable` check, the
  proof/logic modules claim a `rubric` check. A proof module must not claim a value
  is "runnable".
- The course uses real mathematical glyphs (Σ, √, ≤, →, ∈). Set UTF-8 and a font
  stack that covers them; do not assume a single math font.

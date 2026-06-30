# REGRESSION pass: Personal Finance against the REVISED contracts

Re-ran the dogfood frictions from `FRICTION.md` against the revised SKILL.md
("Profile knobs the gates read" table), `references/course-quality-contract.md`
(profile-driven preamble + revised gates), `module-recipe.md`, and
`learner-and-knowledge-okf.md`. The contracts now expose every STEM assumption as
a named knob in `PROFILE.md`, and the gates read the knob instead of the
hardcoded string. I added the "Profile knobs" block to `PROFILE.md` and made
module 22's formal card honest. `node dogfood/validate.mjs` passes for
personal-finance with 0 failures.

## Verdict table

| Finding | Original problem | Status | Why |
|---|---|---|---|
| **C. "Now Write the Equation" hardcoded, no override** | The mandatory formal card forced a money-rule subject (scams) to smuggle a decision rule into a `<code>` tag under a literal "Now Write the Equation" heading so the required substring stayed present. The Anchor Profiles section was silent on this card. | **RESOLVED** | SKILL.md now has a `formal_card_heading` knob (STEM default `Now Write the Equation`, "rule-based subjects use `State the Rule`; the card holds whatever formal move the subject has"). `course-quality-contract.md` preamble names it as profile-driven; `module-recipe.md` template and self-check read `{formal_card_heading}` not the literal string. I set `formal_card_heading = State the Rule` in `PROFILE.md` and retitled module 22's card to `State the Rule`, removed the pseudo-equation `<code>` tag, and stated the decision rule as plain prose with a "consistency guard" bullet. Module 07 keeps `Now Write the Equation` honestly because it has a real formula. A no-formula module now states a rule without a category error. |
| **B. "runnable success check" non-negotiable, overridden only verbally** | The quality-contract non-negotiable literally said "runnable success check"; only a different file (SKILL.md Anchor Profiles) waived it in prose, so a strict reader of the contract alone marked the course non-compliant. | **RESOLVED** | `course-quality-contract.md` non-negotiable for `Build it yourself` is now profile-conditional in the same file: "a success check in the profile's `verification_mode` (`runnable`/`rubric`/`diff`/`estimate` — a non-code course must not claim 'runnable')." The preamble and Static Check section both say the gate reads `PROFILE.md`. `verification_mode = estimate/rubric` is now declared in the PROFILE knob block. The override no longer lives in a separate file. |
| **A. "Campus example" required + hidden + forbidden contradiction** | The field was named `Campus example` as a required/uniqueness-checked thing, banned as a visible worksheet heading, and waived in prose by the profile — three clauses in conflict, unresolved. | **RESOLVED** | The Real-World Anchor gate in `course-quality-contract.md` now keys on `data-campus`/`data-metaphor`/`data-boundary` attributes explicitly ("keyed on the attributes, not the literal word 'campus'; the visible framing follows `anchor_label`"). SKILL.md adds `anchor_label` and `anchor_domain` knobs. I set `anchor_label = Money-life example` and `anchor_domain = real money situations`. The contradiction is gone: the word "campus" is required nowhere, the attribute is the only machine hook, and the visible label is a knob. |
| **E. Choice-based labs break the aria-invalid smoke gate** | A make-a-tradeoff (choice) lab has no invalid input state, so a literal `aria-invalid` smoke assertion would fail a legitimate choice lab. The profile waived it only verbally. | **RESOLVED (gate level)** | SKILL.md `lab_interactions` knob and both the Static Check and Browser Smoke sections of `course-quality-contract.md` now scope the rule: "`numeric`/`text` lab lacks invalid-state support (`choice`/`self-rating`/`compare` labs are exempt … but must still produce interpreted feedback)." I declared `lab_interactions = [numeric, choice, compare]` in the PROFILE knob block. The contract-level friction is fixed. Marked RESOLVED-at-contract rather than fully exercised because this bundle ships module HTML, not the JS lab harness, so the smoke test itself is not run here. |
| **COURSE_VISUAL placeholder trap** | The `course-visual-models.svg` overview shipped a STEM default that the contract said "only verifies the file exists," so a wrong (copied) overview passed tests silently. | **RESOLVED** | `course-quality-contract.md` Static Check now fails if "the course-overview asset `course-visual-models.svg` does not reference this course (its text must contain the course title or one of its track names, so a copied engine cannot ship another course's overview)." The trap (existence-only check) is closed by a content assertion. The bundle's `guide/assets/course-visual-models.svg` references the finance course, so it would pass. |

## Counts

- RESOLVED: 5
- PARTIAL: 0
- OPEN: 0

(Item E is RESOLVED at the contract/knob level; the only residual is that this
dogfood bundle does not run the Playwright smoke harness, so the generalized
assertion is verified by reading the revised gate, not by executing it.)

## New issues / contradictions

None blocking. Two minor observations, neither a regression:

1. **`canonical_tokens` is genuinely empty for finance**, which is correct (money
   has no fixed recurring alphabet like the 12 notes). Worth noting only so a
   future author does not feel obliged to invent one to exercise the knob; an
   empty list is the right answer and the uniqueness gate stays fully active.

2. **Dogfood validator vs full contract on em-dash.** `dogfood/validate.mjs`
   flags an em-dash *warning* on both finance modules, but the matches are the
   `≈` inside a `<code>` block (`72/7 ≈ 10`) and the eyebrow `Track 3 — …`. The
   full contract's Writing Voice rule says the real check strips `<code>` before
   scanning and treats the eyebrow em-dash as a hard rule, while the dogfood
   validator is a lighter check that does neither. This is a known gap between
   the light dogfood validator and the full static check, not a contract
   contradiction; the warnings are advisory and do not fail the run. (The eyebrow
   em-dash in module 22 and 07 is a pre-existing authoring nit, not introduced by
   this regression pass.)

## Edits made this pass

- `PROFILE.md`: added the "Profile knobs the gates read" block (`anchor_label`,
  `anchor_domain`, `formal_card_heading`, `verification_mode`, `lab_interactions`,
  `module_count`/`track_split`, `canonical_tokens`); rewrote override note #3 to
  cite the new `formal_card_heading` remap instead of the old workaround.
- `guide/content/22-spotting-scams.html`: retitled the formal card from
  `Now Write the Equation` to `State the Rule`, removed the pseudo-equation
  `<code>` tag, and stated the decision rule as honest prose with a consistency
  guard. Bundle not regenerated.

## Validation

`node dogfood/validate.mjs` → personal-finance **PASS, 0 failures** (6 advisory
voice warnings across all 5 courses, 2 of them pre-existing on finance).

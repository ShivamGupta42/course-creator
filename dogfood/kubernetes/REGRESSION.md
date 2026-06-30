# REGRESSION — course-creator on Kubernetes Operations

Re-pass after the contracts were revised to fix the dogfood findings. The central
question: are the ops frictions (runnable-check default, numeric-calculator lab
default, missing failure-state diagram, OKF overlay) now resolved by the new
profile knobs and the `branching` archetype? Verdict per original finding below.

## What the revision added (confirmed by re-reading the contracts)

- **SKILL.md** now has a "Profile knobs the gates read (single source of truth)"
  table: `anchor_label`, `anchor_domain`, `formal_card_heading`,
  `verification_mode`, `lab_interactions`, `module_count`/`track_split`,
  `canonical_tokens`. Each names its STEM default and what it remaps. The
  meta-rule "generalize the gate to the knob; do not delete it" is now backed by
  named knobs, not just prose.
- **course-quality-contract.md** opens its Non-Negotiables with "These gates are
  profile-driven … the gate asserts the profile's value, not the STEM default,"
  and rewrote the offending gates: size reads `module_count`/`track_split`;
  `Build it yourself` reads `verification_mode` (`runnable`/`rubric`/`diff`/
  `estimate`, "a non-code course must not claim runnable"); the Real-World Anchor
  gate "keys on the data attributes, not the literal word 'campus'"; the
  invalid-state gate exempts `choice`/`self-rating`/`compare` labs per
  `lab_interactions`; `canonical_tokens` are exempt from duplication gates.
- **module-recipe.md** template's formal card reads `{formal_card_heading}`, and
  both the body and the self-check now restate the four verification modes inline
  ("a non-code course must not claim runnable") instead of hardcoding "runnable."
  The recipe no longer contradicts SKILL.md.
- **diagram-engine.md** documents a new `branching` archetype, and
  `assets/diagrams.mjs` implements it (`branching(spec)`, ~line 330):
  `{states:[{id,label,col,row?,terminal?}], transitions:[{from,to,label}]}`,
  with `terminal:true` drawing a double-bordered failure/end state. The doc names
  the exact ops use case: `Pending → Running → CrashLoopBackOff / OOMKilled`.

## Verdict table

| Finding | Original problem | Status | Why |
|---|---|---|---|
| 1. Runnable success check fights ops | `course-quality-contract.md` + `module-recipe.md` hardcoded "runnable success check"; the `verification_mode` relaxation lived only in SKILL.md, so an author obeying the recipe wrote a runnable assert | **RESOLVED** | Both contract files now read `verification_mode` inline and state "a non-code course must not claim runnable." module-recipe's body and self-check restate the four modes. The relaxation now lives in the same file as the rule. PROFILE declares `verification_mode = estimate + rubric, with some runnable`. |
| 2. Numeric-calculator lab + `aria-invalid` gate assumes numeric input | Browser-smoke gate hard-asserted "invalid input shows message" and "valid input computes output"; a `make-a-tradeoff`/`see-the-consequence` lab has no invalid state and nothing numeric | **RESOLVED** | The static-check gate and Browser Smoke section now exempt `choice`/`self-rating`/`compare` labs (per `lab_interactions`), requiring "interpreted feedback" instead, and keep `aria-invalid` only for `numeric`/`text`. PROFILE declares `lab_interactions = [choice, compare, numeric]`. The opt-out rule the original friction said was missing now exists. |
| 3. "campus example" wired into gate copy | Three places enforced the literal word "Campus example" as a visible label; an ops `data-campus` incident with no college framing would fail a verbatim grep | **RESOLVED** | The anchor gate now "keys on the data attributes, not the literal word 'campus'," and `anchor_label` controls the visible framing. PROFILE sets `anchor_label = Production example`. The leaked word is scrubbed from the gate text. |
| 4. No failure-state / state-machine diagram archetype | `cycle` is a ring with no branches/terminals; `sequence` is messages not state transitions; diagramming `Pending→CrashLoopBackOff→OOMKilled` meant misusing `pipeline` or doing engine work | **RESOLVED** | The new `branching` archetype exists in `assets/diagrams.mjs` and is documented in `diagram-engine.md`, with directed labeled transitions, branches, and double-bordered `terminal` states — exactly the Pod failure-state graph. Verified: the example spec in PROFILE.md renders to a valid 4.5KB SVG carrying Pending/Running/CrashLoopBackOff/OOMKilled/ImagePullBackOff and all five transitions. |
| 5. OKF overlay edge location / `course.md` reconciliation | `teaches:`/`prerequisites:` were said to live in module frontmatter, but modules are HTML with no frontmatter; `course.md` wasn't in the architecture | **RESOLVED** | `learner-and-knowledge-okf.md` now has a "Where the module→concept edge lives" paragraph: edges live in `course.md` (not in HTML modules, which "cannot carry a teaches: field"), concept↔concept `.md` links form the DAG, and `course.md` is a `type: Course` OKF doc. The double-specification is gone. `validate.mjs` passes the overlay with 0 failures. |
| 6. Module-count: prose vs static check | `course-quality-contract.md` said "25 exactly" while SKILL.md said "not a law"; the static check couldn't read the declared size | **RESOLVED** | The size gate now reads `module_count`/`track_split` from PROFILE ("it does not assert 25"). A 20-module course would now pass both. PROFILE declares 25 / 9-9-7. |
| 7. "not X, but Y" voice rule vs contrastive ops pedagogy | The binary-contrast ban made every legitimate two-mechanism comparison feel risky | **PARTIAL** | The Writing Voice rule is unchanged and still bans "not X, but Y." SKILL.md clarifies the gate is advisory on filler words, but there is no explicit carve-out note that parallel-positive comparison of two real mechanisms ("Liveness restarts; readiness gates traffic") is allowed. Authoring around it works and arguably improves prose, so this is low-severity, but the requested carve-out note was not added. Not an ops-specific blocker. |

## Verdict counts

- **RESOLVED: 6** (findings 1, 2, 3, 4, 5, 6)
- **PARTIAL: 1** (finding 7 — voice carve-out note still absent; cosmetic, not a blocker)
- **OPEN: 0**

## Does the new `branching` archetype fit the ops failure-state need?

Yes, cleanly. It is the missing primitive the original FRICTION called out. It
gives one object several labeled, directed transitions including branches and
double-bordered terminal/failure states, which is exactly the shape of the Pod
lifecycle (`Pending → ContainerCreating → Running`, branching out to
`CrashLoopBackOff`, `OOMKilled`, `ImagePullBackOff`). It is the single most useful
picture for the debugging modules (23, 24) and previously had no home. The example
spec added to PROFILE.md is valid against the shipped engine and renders without
overlap. No override or engine work is now required to draw a failure-state graph.

## New issues / contradictions found this pass

None that block an ops build. Two minor notes:

- **`canonical_tokens` and the OKF doc are separately maintained.** The Pod-phase
  alphabet (`Pending`, `CrashLoopBackOff`, …) is declared in PROFILE's
  `canonical_tokens` so the duplication gate exempts it, but nothing links that
  list to the `branching` diagram labels or the `knowledge/debugging.md` concept.
  They will not drift in practice (both are author-maintained), but the contract
  does not state that the diagram's `terminal` labels should be drawn from
  `canonical_tokens`. Cosmetic.
- **Finding 7's carve-out** is the only requested edit the revision skipped. The
  ban is correct as a slop filter; it just lacks the one-line "parallel-positive
  comparison of two real mechanisms is allowed" note, so a naive grep for
  "not … but" could still flag a correct technical contrast. The current
  `validate.mjs` does not grep for that pattern, so no kubernetes module fails on
  it today.

## Validation

`node dogfood/validate.mjs` → kubernetes **PASS, 0 failures** (2 advisory em-dash
voice warnings on modules 11 and 19, pre-existing and unrelated to this pass). The
example `branching` spec was rendered through `assets/diagrams.mjs` out of band and
produced a valid SVG; it is documented in PROFILE.md, not added to a sample module
(modules 23/24 are not among the two shipped sample HTML files, and the task said
not to regenerate the bundle).

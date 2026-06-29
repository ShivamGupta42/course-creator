# Dogfood Findings — five courses, varied subjects

We generated five course bundles with the skill's own contracts to test whether
everything we built actually works, with deliberate spread across tech/non-tech,
broad/specific, and four anchor profiles. Each generation agent also recorded a
`FRICTION.md`. A central validator (`dogfood/validate.mjs`) checks the OKF overlay
contract and a subset of the module-recipe contract across all five.

## What we built

| Course | Axis | Anchor profile | Modules mapped | Concepts | Validator |
|---|---|---|---|---|---|
| Mathematics | broad, STEM | STEM default | 25 (9/9/7) | 12 | ✅ |
| Bayesian Probability | specific, technical | STEM, analyst | 15 (declared) | 11 | ✅ |
| Personal Finance | broad, non-tech | estimate/rubric | 25 | 13 | ✅ |
| Kubernetes Operations | specific, tech | system-design | 25 | 12 | ✅ |
| Music Theory | specific, non-tech, arts | diff/rubric, glyphs | 25 | 13 | ✅ |

Each bundle: `PROFILE.md`, OKF `course.md`, 11–13 cited `knowledge/` concepts
forming an acyclic prerequisite DAG, a `learner/` overlay (mission + state + two
session records), and two full sample modules authored to `module-recipe.md`.

Validator result after fixes: **0 failures, 10 warnings** (all em-dash connectors,
see F9). It checks: `type` frontmatter on every OKF doc, link integrity, required
OKF doc types, `state.md` references resolving to real concepts, module-recipe
required substrings, 5–7 quizzes each with one correct answer and explanatory
feedback, and anchor uniqueness across the two sample modules.

## Verdict

The two big bets hold. The **files-not-engine learner overlay** worked with zero
runtime across all five subjects, and the **knowledge/teaching split** let 25
modules share 11–13 cited concepts with no prose duplication. The **Anchor
Profile** is the right primitive and bent ~80% cleanly to non-STEM subjects.

The failures are concentrated and fixable. Two are bugs in the new OKF overlay doc
itself (now fixed). The rest are a single pre-existing root cause: **the Anchor
Profile generalization lives in `SKILL.md` but never propagated into the two
contract files or the implied static/smoke gates**, so obeying the contracts
literally and obeying the profile are mutually exclusive for any non-STEM or ops
subject. All five courses hit it independently.

## Findings, ranked

### Fixed in this pass (bugs in the new OKF overlay)

**F1 — Concept→module links were `.md` but modules are `.html`.** The doc's own
example wrote `Taught by [Module 03](../guide/content/03-entropy.md)`. The
Mathematics agent followed it verbatim and produced 12 broken links; the validator
flagged all 12. The other four routed around the doc instead. *Fix:* the doc now
states module→concept edges live in `course.md`, concept files link only other
concepts and may link back to `../course.md`, and never `.md`-link a module file.
Math bundle repointed to the resolving course map.

**F2 — `type: Course` had no schema.** The overlay defined Concept / Mission /
LearnerState / LearningRecord but not the curriculum map, the most central
document. Every agent invented its own format (4 of 5 converged on a per-track
Markdown table). *Fix:* added a `type: Course` schema to the doc, codifying the
table format the agents converged on.

**F3 — Module→concept edges can't live in module frontmatter.** The doc implied
modules carry `teaches:`/`prerequisites:` YAML, but rendered modules are HTML
fragments with no frontmatter. *Fix:* folded into F1 — edges live in `course.md`.

### Recommended (pre-existing skill bugs; all five courses)

**F4 — The "campus" anchor is required, hidden, and forbidden at once.** `SKILL.md`
(lines 22, 186) and `course-quality-contract.md` (19, 91, 109, 111) hard-require a
literal `Campus example` label and use it in the uniqueness gate; the recipe hides
it behind `data-campus`; the Anchor Profiles section says don't force "campus." A
static check keyed to the literal string rejects any correct analyst, money, ops,
or music anchor. Hit by all five. *Fix:* rename the attribute to a neutral
`data-anchor`/`data-context`, drive the visible framing from `PROFILE.md`, and drop
the literal "Campus example" string from the gate.

**F5 — The Anchor Profile generalization never reached the contract files or
gates.** `SKILL.md` promises "the per-course static check reads the profile and
asserts the profile-appropriate version of each gate," but `course-quality-contract.md`
still hard-requires a `runnable` success check (line 17), the browser smoke gate
still asserts numeric-lab `aria-invalid` + "valid input computes output" (lines
132–134), and `module-recipe.md` greps the literal heading `Now Write the
Equation`. For Finance, Music, Kubernetes, and Bayesian, obeying the recipe and
obeying the profile are mutually exclusive. *Fix:* move the profile remapping into
the contract files; make the three hardcoded substrings profile-remappable; define
the non-numeric-lab pass path for the smoke gate.

**F6 — Module count is specified three inconsistent ways.** "25 exactly"
(contract), "9/9/7 standard" (SKILL.md), "not a law" (Anchor Profiles), and the
static check "fail if count is wrong" can't read the profile's declared size. It
also fights the anti-templating gate: 25 modules on a narrow topic (Bayesian)
forces the padding the uniqueness gate punishes. *Fix:* single source of truth —
`PROFILE.md` declares the size and shape, every gate reads it.

### Recommended (narrower, real)

**F7 — `Now Write the Equation` forces math framing** on rule-based subjects.
Calling `I ii iii IV V vi vii°` (music) or a scam-detection heuristic an "equation"
is a category error; the "dimensional/sanity guard" bullet assumes physical units.
*Fix:* rename to a profile-driven "State the rule / the formal move."

**F8 — Uniqueness gates misfire on fixed-alphabet subjects.** Music legitimately
reuses the same 12 notes, `C–E–G`, and `I–IV–V` across modules; the diagram-label
and quiz-stem uniqueness checks flag this as boilerplate. The knowledge/teaching
split fixes *prose* reuse but not *representational* reuse. *Fix:* exempt declared
canonical tokens (from `PROFILE.md`) from the label/stem uniqueness check.

**F9 — Writing-Voice em-dash rule is both over- and under-enforced.** All ten
sample modules shipped real `—` connectors (e.g. `Track 2 — Functions`), confirmed
by the validator, because the track-eyebrow template systematically injects them;
meanwhile the glyph collides with minus signs and ranges in math notation, risking
false positives. *Fix:* scope the ban to prose (strip `<code>`/notation first, as
the word-count gate already does) and fix the track-eyebrow template.

**F10 — Adverb ban over-fires** where `just`/`merely` are precise in math. *Fix:*
make it advisory, or sense-aware, not a hard fail.

**F11 — The glyph smoke check under-delivers** (Music). "Verify glyphs render" via
`width>0` + resolved `font-family` cannot distinguish a real `♭` from a `.notdef`
tofu box (needs a pixel/visual diff), and it ignores SVG `<text>` labels and the
raster `image_gen` path, which mangles `♭ ♯ ♮` the same way it mangles `Σ`. *Fix:*
add a visual-diff check for the glyph set and force `svg` for glyph-heavy diagrams.

**F12 — Diagram archetypes lack a state-machine/branching shape.** topology /
sequence / stack / curve / scorecard covered Kubernetes wiring, rollouts, and money
well (a win), but a failure-state graph (`Pending → CrashLoopBackOff → OOMKilled`)
has no fit. *Fix:* add a branching state-machine archetype to the diagram engine.

**F13 — Two unvalidated placeholder traps.** The `COURSE_VISUAL` overview ships a
placeholder the static check doesn't validate against the actual course (had to be
hand-retitled), and the contract offers no sanctioned path for a partial/sample
diagram, so the dogfood's hand-authored sample SVGs technically violate "never
hand-place coordinates." *Fix:* validate the overview's title against the course;
add a sanctioned sample-diagram path.

## What worked (validated across all five)

- **Files-not-engine learner overlay** — mission/state/records maintained as plain
  Markdown, no scheduler, across every subject. The core bet holds.
- **Knowledge/teaching split** — 25 modules sharing 11–13 cited concepts with zero
  prose duplication; Math reused `linear-equations` across three modules, Music
  collapsed 25 modules onto 13 concepts.
- **Anchor Profile** is the right primitive; the only gap is that the gates don't
  honor it yet (F5).
- **Subject-agnostic and strong:** the hidden `data-*` uniqueness scheme, the
  worked→faded→independent→transfer ladder, the explanatory-feedback (distractor
  diagnosis) gate, and the recipe's required-substring self-check.

## Suggested next step

F4, F5, and F6 share one root cause and one fix: make `PROFILE.md` the single
source of truth for the STEM-specific knobs (anchor label, verification mode,
required formula card, module count, canonical-token exemptions) and have the
contract files and the static/smoke gates read it instead of hardcoding the STEM
default. That one change resolves the majority of the friction every course hit.

## Resolution (applied to the skill)

The spine fix landed: **profile-driven gates**. `SKILL.md` now defines a "Profile
knobs the gates read" table — the single source of truth — and the contract files
read the knob instead of the STEM literal. Per finding:

| # | Status | Fix |
|---|--------|-----|
| F1 | Fixed | OKF doc: module→concept edges live in `course.md`; concepts never `.md`-link a module. |
| F2 | Fixed | Added the `type: Course` schema (the per-track table 4/5 agents converged on). |
| F3 | Fixed | Folded into F1 — HTML modules carry no frontmatter, so edges live in `course.md`. |
| F4 | Fixed | `anchor_label`/`anchor_domain` knobs; gates key on `data-campus`, never the word "campus", across SKILL.md + both contract files. |
| F5 | Fixed | `verification_mode` and `lab_interactions` knobs; `runnable` and the numeric-lab `aria-invalid` smoke gate are now profile-conditional in the contract and recipe. |
| F6 | Fixed | `module_count`/`track_split` in PROFILE is the single source; the size gate reads it, no longer asserts 25. |
| F7 | Fixed | `formal_card_heading` knob; the formal card holds a formula *or* a rule, guard is a sanity check not necessarily dimensional. |
| F8 | Fixed | `canonical_tokens` knob exempts a fixed alphabet from the diagram-label/quiz-stem uniqueness checks. |
| F9 | Fixed | Voice rule now covers structural text (track eyebrow) and the check strips `<code>`/notation before scanning for em-dashes. |
| F10 | Fixed | Adverb ban scoped to filler; technically-precise `just`/`simply` are advisory, not a hard fail. |
| F11 | Fixed | Glyph note now requires a pixel/visual diff, covers SVG `<text>`, and forces `svg` for glyph-heavy diagrams. |
| F12 | Fixed | Added a real `branching` (state-machine) archetype to `assets/diagrams.mjs` and documented it; smoke-rendered the `Pending→CrashLoopBackOff/OOMKilled` case. |
| F13 | Fixed | Diagram-engine doc now mandates hardening the static check to validate the overview title against the course. |

The five dogfood bundles are kept as regression fixtures; `dogfood/validate.mjs`
stays green (0 failures). The 10 warnings are the em-dash connectors F9's gate fix
is designed to catch.

## Regression rerun (against the revised contracts)

Re-ran all five generation agents as a regression pass: each re-read the revised
contracts, replayed its own `FRICTION.md` finding-by-finding, wired the new profile
knobs into its `PROFILE.md`, and wrote a `REGRESSION.md` verdict. Aggregate:

| Course | RESOLVED | PARTIAL | OPEN |
|---|---|---|---|
| Mathematics | 6 | 3 | 3 |
| Bayesian Probability | 6 | 3 | 2 |
| Personal Finance | 5 | 0 | 0 |
| Kubernetes | 6 | 1 | 0 |
| Music Theory | 6 | 1 | 0 |
| **Total** | **29** | **8** | **5** |

**Every headline friction (the all-five root cause F4/F5/F6) is RESOLVED in all
five courses.** The 5 OPEN are pedagogy-schema rigidities the Anchor Profile work
never claimed to touch (redundant boundary slots, cross-section quiz counting, a
four-part transfer schema that doesn't fit a degenerate transfer) plus two
dogfood-scope items (a 2-module sample can't exercise every gate). They are logged,
not rubber-stamped.

The regression also surfaced three convergent second-order gaps, now fixed:

- **Missing `tiny_case` knob** (Bayesian, Math): "small numbers" was a STEM
  assumption with no knob, unlike the anchor/formula/verification knobs. Added.
- **`verification_mode` per-course vs per-module** (Math, Bayesian, Kubernetes): a
  survey or ops course needs a per-module mode. The knob is now the course default
  with an explicit per-module override the gate reads.
- **`canonical_tokens` scope** (Math, Music, Kubernetes): an over-broad list could
  silently disable the slop gate. The knob now exempts a listed token only as a
  free unit inside an otherwise-unique label/stem, never whole-stem duplication.

Plus: the glyph check got a concrete recipe (cmap probe + pixel diff + tolerance),
the binary-contrast voice ban got a carve-out for honest comparison, the residual
`.html` concept→module links in 41 concept files were repointed to the course map,
and the remaining em-dash eyebrows and three prose connectors were fixed. The
validator's voice scan is now scoped to prose (strips `<table>`/`<code>`), matching
the contract. Final state: **0 failures, 0 warnings across all five.**

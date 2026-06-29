# REGRESSION — Mathematics bundle against the revised contracts

Re-running each FRICTION.md item against the updated contracts (SKILL.md "Anchor
Profiles → Profile knobs the gates read", course-quality-contract.md,
module-recipe.md, learner-and-knowledge-okf.md, diagram-engine.md). Harsh grading:
RESOLVED only when a named knob or section actually closes the gap, PARTIAL when
the fix helps but leaves a real seam, OPEN when nothing changed.

## Verdict table

| Finding | Original problem (1 line) | Status | Why |
|---|---|---|---|
| 1 | OKF "Taught by Module NN" example links a `.md` module file that the HTML course never produces, so every concept link breaks. | RESOLVED | learner-and-knowledge-okf.md lines 86-94 now state the rule directly: modules are HTML fragments with no frontmatter, so concept files must NOT write `.md` links to modules; the module→concept edge lives in `course.md`. The broken example body was rewritten (line 83 now reads `Taught in [the course map](../course.md)`). The validator's link-integrity check passes because no concept file links a `.html`. |
| 2 | `course.md` is `type: Course` but no Course schema/format was defined anywhere. | RESOLVED | A "Course map (`course.md`, `type: Course`)" section now exists (learner-and-knowledge-okf.md lines 96-120) with frontmatter shape (`tracks`, `modules`, `profile`) and a one-table-per-track body whose rows carry the module→concept edges. The bundle's `course.md` already matches this schema and the validator counts 25 mapped module lines. |
| 3 | Module `teaches:`/`prerequisites:` frontmatter was unreconcilable with frontmatter-free HTML modules. | RESOLVED | The contract now explicitly says HTML modules "cannot carry a `teaches:` field of their own" and relocates the edge: module→concept lives in `course.md`, concept↔concept `prerequisites:` form the DAG, concept files do not link module files (lines 86-94). The earlier invented `data-teaches` attribute is no longer required by any contract; it is harmless and the bundle still carries it on the `<article>`, but it is now belt-and-suspenders, not a contract workaround. |
| 4 | Em-dash ban collided with `Track N — Title` eyebrows and `Module NN — Title` titles; a naive `grep '—'` failed stylistically fine lines. | RESOLVED | SKILL.md line 221 now scopes the rule explicitly: "This covers structural text too, not just body prose, the track eyebrow included (write `Track 2: Functions and change`, not `Track 2 — Functions and change`)." So the rule is no longer ambiguous — the eyebrow em-dash IS banned and the colon is the prescribed form. Exercised: eyebrows, `<title>`s, and `course.md` track/module headings converted to colons; the two advisory em-dash warnings the validator emitted are now gone (0 warnings). |
| 5 | Blanket ban on `just`/`simply` over-fired on technical math prose ("just grazes" = tangent). | RESOLVED | SKILL.md line 218 now carves out the technical sense explicitly: "'the limit is just the slope' or 'simply connected' use the word with a precise meaning and are fine. The gate is advisory on these words, not a hard fail." The word-ban is now sense-aware in spirit and demoted to advisory, so it cannot reject correct math. |
| 6 | Three files disagreed on whether the literal token "Campus example" must appear (quality contract demanded it, recipe hid it, anchor profile said don't force it). | RESOLVED | The `anchor_label` knob (SKILL.md line 328) is now the single source of truth: the visible framing follows `anchor_label`, the machine hook stays `data-campus`/`data-boundary`, and "the *word* 'campus' is never required in prose or asserted by a gate." course-quality-contract.md lines 25 and 98 were rewritten to key the gate on the data attributes, not the literal word. The three files now agree. |
| 7 | `data-test`, `data-boundary`, `Find Where It Breaks`, and `Common Trap` all want to say the same "where it breaks", forcing three manufactured boundary framings. | OPEN | No knob addresses this. The four slots and the per-slot uniqueness gate are unchanged in module-recipe.md and course-quality-contract.md. A single mathematical idea with one honest boundary still has to be re-framed three different ways to satisfy the uniqueness check. The Anchor Profiles work was about STEM-vs-non-STEM generalization, not about collapsing redundant boundary slots, so this friction is untouched. |
| 8 | The profile is declared "once per course" but a survey math course genuinely needs `runnable` for numeric modules and `rubric` for proof modules. | PARTIAL | The `verification_mode` knob (SKILL.md line 331) enumerates `runnable`/`rubric`/`diff`/`estimate` and the build-project gate (course-quality-contract.md line 23) now reads the knob — so the per-module rubric mode is at least legitimate. But the contract still frames the profile as one value per course ("Declare a small anchor profile once per course", SKILL.md line ~312) and gives no first-class mechanism for a per-module override. PROFILE.md still has to express it as a compound ("`runnable` numeric; `rubric` proof"). Better-specified, not structurally fixed. |
| 9 | Concept-keyed `LearnerState`/`Review when` has no stated mapping back to the numbered module the learner re-opens. | PARTIAL | Finding 1's fix (module→concept edges in `course.md`) now gives the missing hop a real home: concept → `course.md` row → module id is now walkable, and learner-and-knowledge-okf.md line 119-120 explicitly calls `course.md` rows + concept `prerequisites:` "a prerequisite graph the agent can walk when deciding what is next or what to review." So the round trip is no longer broken at every hop (item 1's broken `.md` link is gone). But the direction is concept→module via a table lookup the agent does by hand; there is still no `Review when`→module rule. Improved, not closed. |
| 10 | "5-7 quizzes" is a cross-section sum (body quizzes + Module check) the author must track manually across two distant file parts. | OPEN | module-recipe.md line 138 still reads "The file totals 5-7 `<div class="quiz">` blocks (body quizzes + Module check)" with no split rule. The validator counts the total too (`quizzes < 5 || quizzes > 7`). Nothing in the Anchor Profiles revision touched quiz accounting. Still a manual cross-section sum. |
| 11 | The four-part transfer schema ("invariant + broken assumption") doesn't fit transfer to a *simpler*/degenerate case, where nothing "breaks". | OPEN | course-quality-contract.md line 124 still requires "the original case, the changed surface case, the invariant, and the broken assumption" verbatim, and module-recipe.md still mandates a far-transfer "whose surface features change". No knob relaxes "broken assumption" for degenerate transfers. The contract still assumes transfer means a harder/adversarial case. Untouched. |
| 12 | No contract checks that `course.md` (map) and `knowledge/` concepts stay in sync; the module↔concept edge is mirrored by hand and can drift. | PARTIAL | The fix for findings 1-3 designated `course.md` as the SINGLE source of truth for the module→concept edge (learner-and-knowledge-okf.md line 94: "module→concept lookup is the `course.md` table"). Concept files no longer mirror it (they link only other concepts), so the specific drift I logged — concept file naming a different teaching module than the map — is now structurally prevented: there is only one place that edge is written. That kills the worst mirror. But the overlay validation (line 229-235) still only checks `type`, link resolution, and `state.md` concept existence; it does NOT assert that every concept linked from a `course.md` row has a file, nor that every concept file is reachable from the map. So silent drift in the *other* direction (a concept with no map row, or a map row linking a typo'd concept path) is caught only by generic link resolution, not by a map↔concept completeness check. Single-source-of-truth removed; a completeness gate was not added. |

## Counts

- RESOLVED: 6 (items 1, 2, 3, 4, 5, 6)
- PARTIAL: 3 (items 8, 9, 12)
- OPEN: 3 (items 7, 10, 11)

The originally heaviest items — the OKF/HTML `.md`-vs-`.html` self-contradiction
(1), the undefined Course schema (2), the unreconcilable module frontmatter (3),
and the "Campus example" three-way disagreement (6) — are all genuinely closed by
the new single-source-of-truth mechanism (`course.md` as the edge home; `anchor_label`
as the framing knob). The residue (7, 10, 11) is unrelated to the Anchor Profiles
revision and was never claimed to be in scope; those are pedagogy-schema rigidities,
not STEM-assumption leaks.

## New issues the fixes introduced

1. **`canonical_tokens` is a quiet correctness trap for survey subjects, not a math
   problem here.** Math correctly sets `canonical_tokens: []`. But the knob's
   description (SKILL.md line 334) exempts "diagram-label and quiz-stem duplication"
   for canonical tokens. A future revision that let math declare, say, the standard
   axis labels `x`/`y` or `f(x)` as canonical would silently disable the very
   diagram-label uniqueness gate that catches title-swapped slop. The knob is safe
   only because the right value for math is empty; the contract should warn that
   non-empty `canonical_tokens` weakens the anti-templating gate and should be the
   minimal fixed alphabet, never a convenience list.

2. **`verification_mode` per-course-vs-per-module framing is now internally
   inconsistent.** The knob table (line 331) and the build-project gate read
   `verification_mode` as if it were one value, while the prose still says the
   profile is declared "once per course". A math survey legitimately needs two
   modes, and PROFILE.md has to smuggle that as a compound string the gate can't
   cleanly parse. The fix enumerated the modes but did not decide where a per-module
   mode is declared, so a strict gate that reads a single `verification_mode` token
   would mis-grade either the numeric or the proof modules. (Logged as PARTIAL on
   item 8; flagging it here as a fresh contradiction the revision created by adding
   the knob without a per-module slot.)

3. **The lingering `data-teaches` attribute on the module `<article>` is now
   orphaned.** Finding 3's resolution moved the module→concept edge to `course.md`
   and says concept files don't link modules — but the bundle's HTML modules still
   carry `data-teaches="../../knowledge/...md"`, a convention no contract authorizes
   or checks. It is harmless (the validator ignores it) but it is dead metadata that
   a second author could mistake for the source of truth, re-introducing the exact
   dual-mirror drift finding 12 was about. Not fixed by the revision because the
   revision never mentioned it; flagged so it can be dropped or blessed.

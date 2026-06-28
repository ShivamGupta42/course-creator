# FRICTION — building "Mathematics, from the ground up" against the contracts

A harsh, specific log of every place the course-creator contracts fought back while
producing this bundle. Each item names the file and rule. Severity is my call:
**blocker** (forces a guess or a contract violation), **friction** (slows you,
invites inconsistency), **nit** (cosmetic). A short "what worked" list is at the end.

---

## 1. The OKF "Taught by Module NN" link points at a `.md` file that does not exist
**Severity: blocker (latent broken-link generator).**
`references/learner-and-knowledge-okf.md` lines 83-84 show the canonical Concept body:

> `Taught by [Module 03](../guide/content/03-entropy.md).`

But the actual rendered modules are **HTML** (`guide/content/<id>.html`), per
`module-recipe.md` (the template is a full `.html` document) and `SKILL.md` line 81
(`content/*.html`). The contract's own example links a `.md` file that the course
never produces. I followed the contract literally, so every one of my 12
`knowledge/*.md` files now contains a "Taught by [Module NN](../guide/content/NN-*.md)"
link that resolves to nothing on disk. The OKF overlay's "links resolve" validation
(line 202) would flag every concept file. This is a direct self-contradiction between
the overlay contract and the guide model, and there is no stated resolution. I had to
choose between matching the example (broken link) or inventing a `.md`-vs-`.html`
convention the contract never authorizes. I matched the example and flagged it here.

## 2. `course.md` is `type: Course`, but no Course type, frontmatter schema, or curriculum-map format is defined anywhere
**Severity: friction (pure invention required).**
The task asked for an OKF `type: Course` doc with a curriculum map. `learner-and-knowledge-okf.md`
enumerates exactly four types: `Concept`, `Mission`, `LearnerState`, `LearningRecord`
(lines 70, 95, 118, 147). There is **no** `Course` type, no example, and no rule for how
the 25-module map should be represented as OKF. So the body format (3 track headings,
one-line module entries with `Teaches [concept](...)` links) is something I designed from
scratch. A second agent picking up this bundle has no contract to validate it against.
The overlay says "ship a format, not an engine," yet the most central document of a
course, its map, has no format shipped.

## 3. The module `teaches:` / `prerequisites:` frontmatter edges are described but never reconciled with the existing HTML module files
**Severity: friction.**
The overlay (lines 86-89) says "A module frontmatter then carries
`teaches: [../knowledge/entropy.md]` and `prerequisites:` pointing at earlier modules."
But the module files are HTML authored to `module-recipe.md`, whose template has **no
YAML frontmatter at all** (it opens with `<header class="module-header">`). HTML has no
YAML frontmatter mechanism. To honor the overlay I put `data-teaches="..."` attributes
on the `<article>` in both HTML modules, which is a convention I invented; the overlay
literally says `teaches:` (a YAML key). The two contracts model the module as two
incompatible things (a YAML-fronted doc vs a frontmatter-free HTML file) and never say
which wins or how to bridge them. The `prerequisites:` edge between modules I could not
represent at all without inventing more attributes, so the "prerequisite graph the agent
can walk" (line 89) exists for `knowledge/` but is absent at the module level.

## 4. Writing Voice "no em dashes as connectors" collides with the recipe's own title/eyebrow conventions
**Severity: friction (ambiguous scope).**
`SKILL.md` line 216 and `course-quality-contract.md` line 120 ban em-dash connectors,
and the static check "fails on em-dash connectors." But:
- `module-recipe.md`'s eyebrow is `{Track N}` and every module title in a real library
  course uses the pattern "Module 05 — Solving …" (em-dash separating number from title).
- My `course.md` track headings ("Track 1 — Foundations …") and both modules' `<title>`
  and `.module-eyebrow` ("Track 1 — Foundations of number and structure") carry em
  dashes.

Are these "connectors"? They are separators in headings, not prose connectors, so I read
them as allowed and kept them. But the contract never distinguishes "em-dash connector in
a learner-facing sentence" from "em-dash separator in a title," and a naive static check
(`grep '—'`) would fail my files on 4 lines that are stylistically fine. The rule needs to
scope itself to sentence-internal connectors or the title convention needs an explicit
exemption.

## 5. "Cut adverbs and hedges" bans whole common words including `just`, which is unavoidable in math prose
**Severity: friction.**
`SKILL.md` line 212 bans `really, just, simply, actually, fundamentally, inherently,
crucially, importantly`. Mathematics prose uses "just" in a precise, non-hedging sense
constantly: "the tangent that just grazes the curve" (geometric tangency), "you cannot
just set h = 0" (meaning *merely*). I had to rewrite three sentences that were correct and
clear ("which is just an average rate," "until it just grazes," "why can you not just set
h = 0") to satisfy a blanket word-ban, and the rewrites are marginally worse. A
word-list ban with no sense-disambiguation over-fires on a subject where some banned
tokens are technical or quantitative ("just grazes" = tangent). The rule conflates the
hedging "just" with the limiting/exact "just."

## 6. The anchor profile says "do not force the word campus," but the contract's required heading and the static check both hardcode "Campus example"
**Severity: blocker-ish (two contracts disagree).**
`SKILL.md` "Anchor Profiles" line 323 says: *"Do not force the word 'campus' … into a
non-STEM course"* and the gate should read the profile. But `course-quality-contract.md`
line 19 requires every module to include a `Real-World Anchor` with **`Campus example`**,
`Useful metaphor`, and `Where it can mislead`, and the static-check list (line 91) fails a
module that "lacks a `Real-World Anchor` with a campus example." Meanwhile `module-recipe.md`
drops the visible label entirely and uses `<p data-campus>` under an `<h2>Where this shows
up</h2>` heading. So three files disagree on whether the literal token "Campus example" must
appear: the quality contract demands it, the recipe hides it behind `data-campus`, and the
anchor-profile section says don't force it. This is a STEM course so "campus" fits my
content, but the contradiction is real and would bite any non-STEM course immediately. I
followed the recipe (`data-campus`, no visible "Campus example" label) because `SKILL.md`
line 296 explicitly forbids the visible `Useful metaphor`/`Campus example` worksheet labels,
which directly contradicts the quality contract that requires them.

## 7. `data-test` ("change one condition") and `data-boundary` ("where it breaks") overlap heavily, and so do `Find Where It Breaks` and `data-boundary`
**Severity: friction (redundant, hard to keep distinct).**
The recipe requires, per module: a `data-test` (change-one-thing prompt), a `data-boundary`
(where the example stops applying), a `Find Where It Breaks` first-principles card, and a
`Common Trap`/`Where it can mislead`. For a single mathematical idea these four "where it
breaks" slots want to say the same thing. For Module 05 the honest boundary is "the moment
x stops being linear (x², roots) the method breaks," and that one fact is the natural answer
to `data-test`, `data-boundary`, AND `Find Where It Breaks`. Keeping them genuinely distinct
forced me to manufacture three *different* boundary framings (the x² late-fee for `data-test`,
the quadratic late fee again for `data-boundary`, the a=0 degenerate case for `Find Where It
Breaks`) where one would teach better. The contract's uniqueness gate (no duplicate prose)
pushes against the subject's actual structure, which often has one real boundary per idea.

## 8. The "tiny case" / "runnable" verification mode does not fit proof-flavored modules, and the profile table has no clean slot for it
**Severity: friction (the profile can't be one value).**
`SKILL.md` line 324: "A non-code course must not claim a 'runnable' check." My course spans
**both** numeric modules (linear equations, derivative: a value you can recompute and check =
`runnable`) and **proof** modules (Module 14/20 logic and proof: the artifact is a written
argument, verified by `rubric`, not a runnable value). The anchor profile is declared *once
per course* (line 305: "Declare a small anchor profile once per course"), but a from-the-
ground-up math course genuinely needs **two** verification modes depending on the module. I
had to write `PROFILE.md`'s "Artifact type + verification mode" row as a compound ("runnable
for numeric, rubric for proof"), which violates the "one profile per course" framing. The
profile model assumes a course is tonally uniform; a survey course that crosses sub-disciplines
breaks that assumption.

## 9. `LearnerState` rows reference concepts, but the contract never says how `Review when` interacts with the module-level prerequisite graph
**Severity: nit / under-specified.**
`learner-and-knowledge-okf.md` (lines 118-145) defines `Review when` as a free-text note the
agent honors ("next session", "after entropy"). My state.md has rows like "after functions
solid" for slope. But "functions" is a *concept*, while the spacing/sequencing the mission
cares about is partly *module* order (the learner is mid-Module-10). The contract gives the
agent a concept graph and a learner state keyed to concepts, but the thing the learner
actually moves through is the 25 numbered modules. There is no stated mapping for "the learner
is shaky on the *concept* functions, which module do I re-open?" beyond the concept's own
"Taught by Module NN" link, which (see item 1) is itself a broken `.md` link. The round trip
concept → module → re-teach is specified on paper but every hop has a gap.

## 10. "5-7 quiz questions per module" counts inline `<div class="quiz">`, but the recipe also embeds a "body quiz" inside the teaching section
**Severity: nit (easy to miscount).**
`module-recipe.md` line 136: "The file totals 5-7 `<div class="quiz">` blocks (body quizzes +
Module check)." The template (lines 34-36, 95-99) seeds one quiz in the teaching body and more
under Module check. It is easy to author 5 in the Module-check pack and forget the body quiz
already counts, landing at 6-8. I deliberately put 1 body quiz + 4 module-check in Module 05
(=5) and 1 + 5 in Module 18 (=6) to stay in band, but the contract makes the total a
cross-section sum that the author must track manually across two distant parts of the file.
A clearer rule would state the split.

## 11. The `data-practice="transfer"` "name the invariant and the broken assumption" rule is hard to satisfy honestly when the transfer is to a *simpler* case
**Severity: friction.**
`course-quality-contract.md` line 117 bans generic transfer prompts and requires "the original
case, the changed surface case, the invariant, and the broken assumption." For Module 18 the
natural far-transfer is a *straight line* (`V(t)=3t`), where the surface feature that changes
is that the curve stops bending. But a line has **no broken assumption** in the failure sense;
the method works *more* easily (secant = tangent for any gap). I had to reframe "broken
assumption" as "the assumption that slope varies with position," which is a stretch of the
word "broken." The rule assumes transfer always means a harder or adversarial case; transfer
to a degenerate/simpler case is pedagogically valuable but doesn't fit the required four-part
schema cleanly.

## 12. No contract covers how `course.md` (the map) and the `knowledge/` concepts stay in sync
**Severity: friction.**
`course.md` lists, per module, the concepts it teaches as Markdown links. The `knowledge/`
files list, per concept, the module that teaches it ("Taught by Module NN"). These are two
hand-maintained mirrors of the same edge. Nothing in the contracts says they must agree or
provides a check, so they can silently drift (e.g. Module 24 teaches probability + sets in
course.md; the probability concept only names Module 22 as its teacher). The OKF overlay's
optional validation (line 202) checks `state.md` references and link resolution but says
nothing about course-map ↔ concept-map consistency. For a real multi-author course this is a
guaranteed drift point.

---

## What worked well (keep it)

- **The hidden `data-*` attribute model** (`data-example/metaphor/test/campus/boundary`) is
  genuinely good: it lets the prose read like a course while staying machine-checkable, and the
  uniqueness gate is a real defense against title-swapped slop. It survived contact with a real
  subject.
- **The knowledge/teaching split** (`learner-and-knowledge-okf.md` lines 60-72) is the right
  call. Letting many modules link one cited `Concept` while keeping the *teaching* unique
  resolved cleanly: I reused `linear-equations.md` across Modules 05, 09, 13 with zero pressure
  to duplicate prose. This is the strongest idea in the overlay.
- **The worked → faded → independent → transfer ladder** maps beautifully onto math practice and
  forces exactly the scaffolding a self-learner needs. No friction; I'd keep it verbatim.
- **The `LearningRecord` + `LearnerState` pairing** is light and honest. Writing two real
  session records and updating the state table by judgment felt natural and produced a bundle a
  human can read end to end. The "ship a format, not an engine" bet holds for the *learner*
  layer specifically (it's the *course/module* layer where the overlay under-specifies).
- **The plain-label `Strength` (new/shaky/solid)** instead of a number is correct: it reads the
  same to a human and an agent and resists false precision.

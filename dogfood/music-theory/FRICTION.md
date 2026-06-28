# FRICTION — dogfooding course-creator on an arts subject (Music Theory)

Built one course bundle for **Music Theory** for a by-ear hobbyist, using the
skill's contracts as written, and recorded every place the contracts were
ambiguous, contradictory, or unworkable for a NON-STEM, arts subject that uses
the glyphs ♭ ♯ ♮. Citations are `file → rule`. Wins are noted briefly at the end.

Severity: **[BLOCK]** would fail a real build or force a contract violation;
**[BEND]** the contract technically allows it but fights the subject and needs
author judgment the contract does not give; **[GAP]** the contract is silent
where a non-STEM author needs guidance.

---

## 1. The STEM defaults are baked into MANY gates, and the Anchor Profile only relaxes SOME of them

`SKILL.md → "Anchor Profiles"` says: "Declare a small anchor profile once … and
have every module and gate read it instead of assuming STEM," and lists the rules
it changes. The problem is the list of relaxations is shorter than the list of
STEM-specific gates elsewhere in the same files. The profile relaxes
verification mode, lab interaction, "tiny case," module count, and the
campus/small-numbers wording. It does **not** mention, and therefore leaves
fighting an arts subject:

- **[BLOCK] "Campus example" is hardcoded in three places as a required, named thing.**
  `SKILL.md → "Real-World Anchor"` ("`Campus example`: a familiar example from
  college life, labs, dorms, commuting…"), `course-quality-contract.md →
  Non-Negotiables` ("dedicated `Real-World Anchor` with `Campus example`…"), and
  `course-quality-contract.md → Static Check Requirements` ("a module lacks a
  `Real-World Anchor` with a campus example"). The Anchor Profile note says
  "Do not force the word 'campus'…into a non-STEM course" and renames the
  attribute to `data-campus`. So the prose attribute is `data-campus` but the
  **literal heading/label "Campus example" is still demanded by the contract and
  the static check.** For a hobbyist musician there is no campus. I used the
  guitar/capo/campfire as the anchor and kept the machine attribute `data-campus`,
  but a static check that greps for the string "Campus example" (as the contract
  literally says it must) would FAIL my arts module, and a check that greps for
  `data-campus` would PASS prose that has nothing to do with a campus. The two
  halves of the contract disagree about whether "campus" is a word or a slot.

- **[BEND] "college-student-friendly metaphor" / "simple college-student metaphor"**
  is repeated as a hard requirement (`SKILL.md → Curriculum Standard`,
  `course-quality-contract.md → Non-Negotiables`, `Learning Design Depth`). My
  learner is an adult hobbyist, not a college student. The Anchor Profile relaxes
  "campus" and "small numbers" by name but never relaxes "college student." I
  wrote instrument-based metaphors and ignored "college," which is the right call
  for the audience but is an unwritten override of an explicit, repeated rule.

**Fix the contract should make:** the Anchor Profile should explicitly state that
"Campus example" and "college-student metaphor" are the STEM *instances* of two
generic slots ("a familiar anchor from the learner's world" and "an apt
metaphor"), and the static check must key off `data-campus`/`data-metaphor`, never
the literal strings "Campus" or "college."

---

## 2. "Now Write the Equation" forces math framing onto a subject whose rules are not equations

`module-recipe.md → HTML template` and its `Self-check before done` list both
hard-require the literal heading **`Now Write the Equation`** with an example
`<code>ΣF = ma</code>`. `course-quality-contract.md → First-Principles Pattern`
lists it too.

- **[BEND] Music has rules and formulas, but the word "Equation" is wrong and the
  STEM example misleads.** I put the major-scale pattern `W–W–H–W–W–W–H` and
  interval arithmetic (`semitones(top) − semitones(bottom)`, `4 = major 3rd`) in
  that card (modules 06 and 17). That is an honest, load-bearing *rule*. But
  calling `I ii iii IV V vi vii°` an "equation" is a category error a knowledgeable
  musician would notice immediately, and it pushes the author toward inventing
  pseudo-math to satisfy the heading. The contract gives no sanctioned non-STEM
  rename (e.g. "State the Rule" / "Write the Pattern"). I kept the literal heading
  because `module-recipe.md`'s self-check greps for the exact substring
  `Now Write the Equation`, so renaming it would fail the gate. **The gate forces a
  STEM word into an arts lesson.** Several music modules (rhythm/meter, voice
  leading, cadence) have NO formula at all; for those the card would be a forced
  substitute, exactly the "honest substitute" the task warned about.

- **[GAP] The card's bullet asks for "the dimensional/sanity guard"** (a units
  check). Music has no dimensions. I substituted a musical sanity guard ("an
  octave must total 12 semitones," "exactly one diminished chord, on vii"), which
  works, but the contract's wording assumes physical units.

**Fix:** the recipe should name this card generically ("Now State the Rule") with
STEM (`ΣF=ma`), arts (`W–W–H–W–W–W–H`), and rule-free (a decision procedure)
variants, and the self-check should accept any of the variant headings.

---

## 3. "runnable" success check vs the contract's own "You have it when"

The Anchor Profile correctly says a non-code course "must not claim a 'runnable'
check" and offers `diff`/`rubric`/`estimate`. But:

- **[BEND] `module-recipe.md` text says the project needs "a runnable success
  check ('You have it when…')"** and `course-quality-contract.md → Non-Negotiables`
  says "a runnable success check." The word "runnable" is glued to the
  "You have it when" phrase in the prose even though the Anchor Profile table
  forbids it for non-code courses. I wrote "You have it when all six recorded
  names match the table (this is the **diff** check, not running code)." That
  satisfies the *intent* but directly contradicts the *word* "runnable" in two
  files. An author who follows `module-recipe.md` literally and an author who
  follows the Anchor Profile produce contradictory artifacts. The skill never says
  which wins when they conflict; I let the Anchor Profile win by judgment.

---

## 4. The numeric-calculator lab assumption

`SKILL.md → Anchor Profiles` table default lab is "numeric calculator," and the
smoke contract (`course-quality-contract.md → Browser Smoke Requirements`) says
"valid lab input **computes output**" and "**invalid lab input shows a validation
message**" with `aria-invalid`.

- **[GAP] For pick-the-chord / compare-two-progressions / play-and-self-rate labs,
  "valid input" and "invalid input" are not well defined.** The Anchor Profile
  patches this in one sentence ("'computes output' means 'produces interpreted
  feedback' for non-numeric labs" and "keep `aria-invalid` only where input can be
  invalid"). That is the right idea but it is one clause against a whole smoke-test
  section that assumes a number field. A self-rating slider has no "invalid"
  state; a pick-the-chord choice cannot be malformed. I did not have to ship the
  guide app in this dogfood, but if I had, the static + smoke checks as written
  expect an invalid-state path that an arts lab legitimately does not have, and the
  one-sentence relaxation does not tell the test author how to make the gate pass
  without faking an error case.

---

## 5. The uniqueness / anti-templating gates WILL misfire on legitimate music content

This is the most subject-specific risk. `course-quality-contract.md → Static
Check Requirements` and `SKILL.md → Tests And Quality Gates` fail the build if,
after removing the title, two modules share a metaphor, example, quiz stem, or
**diagram label set**, and `…hardening anti-templating semantically` bans repeated
scenario lists.

- **[BLOCK-risk] Music legitimately reuses the same 12 notes, the same C–E–G
  triad, the same I–IV–V, across many modules.** A "diagram label set" uniqueness
  check by *label text* (the SVG path from `SKILL.md → Module Diagrams`: "enforce
  … by label text for SVG") would flag my module 14 (build a triad) and module 17
  (diatonic chords) as duplicates because both legitimately label `C E G`, `I`,
  `V`. The same is true of any two scale modules both labeling `C D E F G A B`.
  The notes are a fixed finite alphabet; a uniqueness gate that treats reused
  labels as boilerplate is wrong for music. I had to deliberately diverge the two
  sample diagrams (an interval *ladder* vs a chord *stack*) to dodge this, which is
  author effort spent fooling a gate rather than teaching.
- **[BEND] Quiz-stem uniqueness across 25 modules** is hard when many modules ask
  "why is this chord minor / why does this resolve." I kept stems distinct by
  anchoring each to a specific chord/interval, but the gate pushes toward
  artificial variety on a subject where the *same question form* applied to
  *different objects* is exactly the pedagogy.
- **[GAP] The contract's remedy (knowledge layer for shared concepts) only covers
  prose, not labels or quiz stems.** `learner-and-knowledge-okf.md` lets modules
  *link* a shared `knowledge/<concept>.md` instead of copying its prose, which
  genuinely helps the metaphor/example duplication. But the diagram-label and
  quiz-stem gates run on the per-module `guide/` HTML, which the knowledge overlay
  does not touch. So the overlay solves concept reuse but not representation reuse,
  and music's reuse is mostly representational.

**Fix:** the label-uniqueness gate should hash *layout/structure*, not the note
names, for music-like subjects; and the profile should be able to declare a
"shared vocabulary" (the 12 notes, the 7 numerals) that the uniqueness check
ignores.

---

## 6. Glyph / charset handling: the note carries *some* of the load, leaves real gaps

`SKILL.md → Anchor Profiles` (last bullet): "For math-free subjects that use
special glyphs (IPA, accents, non-Latin script), set a UTF-8 charset, a font stack
that covers the glyphs, and verify they render in the smoke test rather than
assuming a math font." This is the only sentence on the topic.

What it gets right (a win): naming charset + covering font stack + smoke
verification is exactly the correct shape, and it generalizes from IPA to ♭ ♯ ♮.

Gaps the one sentence leaves:

- **[GAP] "Verify they render" is not achievable as stated.** A Playwright check
  can assert the *text content* equals "♭ ♯ ♮" (catches encoding corruption) and
  that the element's `font-family` resolved and width > 0. None of that proves a
  real glyph drew instead of a **tofu/.notdef box**, which also has width > 0. True
  glyph-render verification needs a screenshot + pixel/visual diff or a font
  glyph-coverage probe, neither of which the contract mentions. I documented this
  limitation in `PROFILE.md`; the contract implies a check it cannot actually
  deliver.
- **[GAP] The glyphs live in two rendering contexts and the note only addresses
  one.** ♭ ♯ ♮ appear in **HTML body** (font stack applies) AND inside **SVG
  `<text>` diagram labels** (module 17 labels `vii°`, and ideally `F♯`). SVG text
  uses its own `font-family` and is rendered by the diagram engine
  (`diagrams.mjs`), not the page CSS. The contract's font-stack guidance is about
  the HTML font stack; it says nothing about ensuring the SVG generator emits a
  glyph-covering font, or about the `image_gen` raster path, where
  `SKILL.md → Module Diagrams` warns raster generators "mangle … complex math
  (Σ, nested subscripts)." A raster generator will equally mangle ♭ ♯ ♮. So for
  the default/preferred image provider, the glyphs in diagram labels are at risk
  and the contract gives no rule. I avoided it by using `&#9839;` / `&#176;`
  entities in SVG and forcing `svg` provider in `PROFILE.md`, but that is me
  routing around an unaddressed case.
- **[GAP] No guidance on the Writing-Voice / static-check interaction with glyphs.**
  The card-bullet word caps (`SKILL.md`: "each bullet ≤16 *prose* words, strip
  `<code>…</code>` before counting") strip `<code>` but say nothing about whether a
  `<span class="gly">♯</span>` counts as a word. A naive word-count check could
  miscount glyph spans. Minor, but unspecified.

---

## 7. Does the OKF learner/knowledge overlay compose with the rest? Mostly yes, with seams

`learner-and-knowledge-okf.md` is the cleanest part of the skill and composed
well. Seams found:

- **[GAP] Concept-count target is unstated and collides with the course shape.**
  The overlay says "one file per real concept." A 25-module course naturally has
  ~10-13 concepts (many modules teach the same concept differently). The task asked
  for 8-12; I produced **13** because every concept in the 25-module map needs a
  node and `voice-leading` + `rhythm-meter` are genuinely separate. So the natural
  concept count slightly exceeds the requested band. The overlay gives no guidance
  on the right number, and "one per real concept" can push above any fixed cap.
  (Honest deviation: 13 vs the 8-12 requested.)
- **[GAP] Module-id link convention is unpinned.** The overlay's example links
  `[Module 03](../guide/content/03-entropy.md)` (a `.md` with a slug), but
  `module-recipe.md` ships modules as `guide/content/<id>.html`. I used `NN.html`.
  The two references disagree on module filename shape (`.md` slug vs `.html`
  numeric), so the cross-links in `knowledge/*.md` point at `.html`. A validator
  that expects the overlay's `.md` example would report broken links. The overlay
  should state the canonical target is the rendered `.html`.
- **[BEND] `prerequisites:` DAG vs `course.md` track order.** The concept DAG
  (correct: `interval` → `major-scale` → `triad` → …) does not match strict module
  number order in places (rhythm-meter is module 23 but depends only on
  pitch-note). That is fine and intended, but nothing in the contract reconciles
  "teach in track order" with "prerequisite graph order," leaving the agent to
  decide. The overlay's read-decide-write loop assumes the agent resolves it by
  judgment, which I did, but it is judgment the contract offloads silently.

---

## 8. Smaller frictions

- **[GAP] `SKILL.md → Tiny Design System Standard`** lists 15 required color tokens
  and `--font-music` is not among them; an arts course needs a glyph-font token but
  the design-system contract has no slot for subject-specific fonts. I added
  `--font-music` ad hoc.
- **[BEND] `course-quality-contract.md`** "one simple real-world example" plus
  "one college metaphor" plus campus example means three concrete anchors per
  module. For abstract music ideas (e.g. enharmonic spelling) finding three
  genuinely distinct real anchors per module across 25 modules is strained; the
  contract's volume assumes a subject with abundant physical instances.
- **[GAP]** The `Common Trap` gate bans the literal placeholder "memorized
  keyword" but gives no positive template; for music I wrote a named wrong belief +
  diagnostic + repair, which is right, but the ban-list approach means an author
  learns the rule only by tripping it.

---

## Wins (brief)

- The **Anchor Profile concept is the right primitive.** Declaring audience /
  anchor domain / tiny case / verification mode / lab types / diagram archetypes
  once, and adding a music row, made the whole non-STEM adaptation coherent. It
  just under-delivers on how many downstream gates actually read it.
- **`diff` + `rubric` verification modes fit music perfectly.** "Your harmonization
  vs a reference" (diff) and "does the progression obey the rule" (rubric) are
  natural; the profile already names them.
- The **knowledge/teaching split** (`learner-and-knowledge-okf.md`) cleanly let 25
  modules share 13 cited concepts without tripping the prose-uniqueness gate. The
  DAG + `prerequisites:` + `teaches:` edges are genuinely useful and portable.
- The **learner overlay as files-not-engine** is light, human-readable, and
  composed with no runtime. The mission → state → records loop captured a real
  by-ear learner cleanly.
- The **glyph note exists at all** and points at charset + font stack + smoke
  verification, which is the correct three-part shape even if under-specified.
- The required-substring **self-check list in `module-recipe.md`** made it easy to
  mechanically confirm both sample modules were complete (all substrings present,
  7 quizzes each, one `data-correct` each, distinct data-* attributes).

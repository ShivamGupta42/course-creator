# REGRESSION — Bayesian Probability against the revised contracts

Re-ran the dogfood frictions from `FRICTION.md` against the updated SKILL.md
("Profile knobs the gates read" table), `course-quality-contract.md`,
`module-recipe.md`, `learner-and-knowledge-okf.md`, and `diagram-engine.md`.

Edits made this pass (minimal, no regeneration):
- Added a **Profile knobs** block to `PROFILE.md` declaring `anchor_label`,
  `anchor_domain` (= analyst/experiments, not campus), `formal_card_heading`,
  `verification_mode`, `lab_interactions`, `module_count`/`track_split` (15 / 6-6-3),
  and `canonical_tokens` (`[]`).
- Fixed the two module eyebrows that forced an em-dash connector
  (`Track 1 — …` / `Track 2 — …` → `Track 1: …` / `Track 2: …`), per the new
  Writing-Voice rule that the eyebrow must not use an em-dash. This cleared the
  only two validator warnings.

`node dogfood/validate.mjs` → **PASS, 0 failures, 0 warnings** for
bayesian-probability.

## Verdict table

| Finding | Original problem | Status | Why |
|---|---|---|---|
| 1. "Campus example" fights an analyst audience | Skill hardwired "campus" in 3 places, escape hatch in 1; gate could reject analyst anchors; which rule wins was undefined | **RESOLVED** | New `anchor_label` + `anchor_domain` knobs (SKILL.md "Profile knobs the gates read"; quality-contract lines 25, 98) make the gate **key on the `data-campus`/`data-boundary` attributes, not the literal word "campus"**, and the visible framing follows `anchor_label`. quality-contract line 98 now reads "keyed on the attributes, not the literal word 'campus'". `anchor_domain = analyst/experiments` is now a sanctioned setting, not an escape hatch. The analyst-anchor contradiction clears cleanly. |
| 2. "Small numbers" tiny case mis-frames a distribution-valued subject | "small numbers" nudges toward a scalar; Bayesian tiny case is a small *distribution* | **PARTIAL** | The contract no longer *hardwires* "small numbers" (line 350 lists it alongside "campus" as a word not to force; the STEM-default row owns it as a knob default). But there is **no dedicated `tiny_case` knob** in the Profile-knobs table, so the reinterpretation ("smallest case that still yields a distribution") still lives only in PROFILE prose, blessed-by-omission rather than by a named knob. Better than before, not a clean knob. |
| 3. 25-module default vs a focused topic; override buried | Three files stated the default differently, one said "exactly 25" | **RESOLVED** | `module_count`/`track_split` is now the single declared source of size in PROFILE; quality-contract line 13 and SKILL.md lines 143-147 both say "the gate reads the profile; it does not assert 25" and "a narrow topic declares a smaller size rather than padding". The "exactly" wording is gone. PROFILE declares 15 / 6-6-3 and the validator reads it (mappedModules: 15). |
| 4. OKF link target ambiguous (`.md` vs `.html` modules) | OKF doc example linked a module as `.md`, but modules ship as `.html`; literal links would break | **RESOLVED** | learner-and-knowledge-okf.md lines 86-94 now state explicitly: rendered modules are HTML fragments with no frontmatter, **do not write `.md` links to module files** (they won't resolve), and module→concept edges live in `course.md`. The ambiguity is gone. |
| 5. `teaches:`/`prerequisites:` on modules have nowhere to live | HTML fragments have no YAML; the prescribed module→concept edge had no home | **RESOLVED** | New section "Where the module→concept edge lives" + the `type: Course` schema (lines 86-117) give the edge a defined home: **`course.md`'s per-track table**, where each module row links the concept(s) it teaches. Concept files carry only concept↔concept `prerequisites:`. This course's `course.md` already implements it (15 rows, each with `Teaches [concept](knowledge/…)`). The composition gap is closed. |
| 6. Knowledge/teaching reuse split has no mechanical payoff | The "only place reuse is allowed" distinction never touched the uniqueness gate, which never saw concept prose | **PARTIAL** | Still mostly a conceptual framing, not a mechanical change to the rendered-HTML uniqueness gate. BUT the new `canonical_tokens` knob (quality-contract line 116) gives the reuse idea a *real* mechanical hook for subjects with a fixed alphabet — it exempts those tokens from diagram-label/quiz-stem duplication. Bayesian probability sets `canonical_tokens: []` (no fixed alphabet), so the payoff is real for music/chord subjects but still nil here. Honest status: the gap is narrowed for the general case, unchanged for this subject. |
| 7. `Real-World Anchor` required-section name vs recipe's `Where this shows up` heading | A contract-literal grep for the heading `Real-World Anchor`/`Campus example` would fail the module the recipe tells you to write | **RESOLVED** | quality-contract line 25/98 and SKILL.md now state the gate "keys on the data attributes, not the literal word 'campus'", and the visible framing follows `anchor_label`. The required *section* is satisfied by `class="real-world-anchor" data-real-world-anchor` + `data-campus`/`data-boundary`; the visible *heading* stays `Where this shows up`. No more cross-file heading contradiction. |
| 8. Quiz "5-7" countable two ways (Module Check vs whole file) | recipe counts blocks file-wide; curriculum standard reads like 5-7 in Module Check alone | **PARTIAL** | The denominator is now unambiguous in the *static check*: the validator counts `<div class="quiz">` blocks across the whole file (5-7 total), and module-recipe.md line 138 still says "the file totals 5-7 blocks (body quizzes + Module check)". But SKILL.md line 21 still reads "5-7 reasoning-oriented quiz questions per module" without disambiguating body-vs-check. The machine answer is settled; the prose in SKILL.md still has the ambiguous phrasing. Both sample modules ship 6 file-total and pass. |
| 9. `aria-invalid`/lab gates assume a live app the dogfood excludes | A 2-module HTML+OKF deliverable can't satisfy the smoke/lab gates by construction | **OPEN (by design)** | Still true and still fine. The revised contract scopes `lab_interactions` and exempts `choice`/`self-rating`/`compare` from `aria-invalid`, which helps a real build, but a dogfood that ships no `guide/js`, `index.html`, or Playwright tests still cannot run those gates. The dogfood `validate.mjs` correctly checks only the overlay + module-recipe substring contract, so nothing is falsely failing. Not a contract bug; recorded. |
| 10. Em-dash voice rule collides with math minus and ranges | `n − s`, `Beta(a+s, b+n−s)`, ranges "11% to 33%" sit in the em-dash glyph neighborhood; the voice gate had no `<code>` carve-out | **RESOLVED** | SKILL.md line 221 now says "The voice check strips `<code>`/notation before scanning so a minus sign or numeric range inside `<code>` is not flagged as an em-dash connector," and explicitly covers structural text incl. the track eyebrow (`Track 2: …`, not `Track 2 — …`). The math `−` lives inside `<code>` and is now exempt. The one real violation that remained was the **eyebrow em-dash**, which the rule now bans and which this pass fixed in both modules. Validator em-dash warnings: 2 → 0. |
| 11. Diagram engine assumed but not runnable; hand-wrote SVGs | "never hand-place coordinates" leaves no sanctioned path for a sample/dogfood diagram | **OPEN (by design)** | The contract still says use the engine, never raw coords (diagram-engine.md "Fallback" + quality-contract line 22). diagram-engine.md adds a raster path and a glyph-SVG path but still no "sample/partial build" exception. PROFILE records the two SVGs as stubbed dogfood artifacts. Acceptable for a dogfood, unchanged as a contract matter. |

## Counts

- **RESOLVED: 6** (findings 1, 3, 4, 5, 7, 10)
- **PARTIAL: 3** (findings 2, 6, 8)
- **OPEN: 2** (findings 9, 11 — both "by design" for a dogfood-scoped deliverable, not contract defects)

Headline: the two structural blockers cleared. The **analyst-anchor contradiction
is resolved** (`anchor_domain` is now a first-class knob and the gate keys on
`data-campus`, never the word "campus"), and the **OKF module→concept composition
gap got a defined home** (`course.md`'s `type: Course` table, which this bundle
already uses).

## New issues found this pass

- **NEW (minor): residual `.html` "Taught by" links in concept files contradict the
  new rule.** `learner-and-knowledge-okf.md` line 90-94 now says concept files
  "do not link individual module files" and module→concept edges belong only in
  `course.md`. But the existing `knowledge/*.md` here still carry
  `Taught by [Module bayes-rule](../guide/content/bayes-rule.html)` links (3 files).
  They resolve (the `.html` files exist) and the validator's `mdLinks` ignores
  `.html`, so nothing fails — but they are now *stylistically* against the revised
  contract. Left in place this pass (minimal-edit scope; the authoritative edge is
  already in `course.md`). Flagged so a full regeneration would drop the back-links
  from concept files.

- **NEW (doc nit): the Profile-knobs table has no `tiny_case` knob** even though
  "small numbers" is repeatedly cited as a STEM-default that non-STEM subjects must
  not be forced into (SKILL.md line 350, finding 2). Every other STEM-default string
  got a named knob; the tiny-case shape did not, so a distribution-valued subject
  still has to encode its reinterpretation in PROFILE prose rather than a gate-read
  knob. Not a contradiction, an asymmetry in the knob set.

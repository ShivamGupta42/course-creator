# REGRESSION — Music Theory vs the revised course-creator contracts

Re-ran the dogfood against the revised contracts (SKILL.md "Profile knobs the
gates read" table + strengthened glyph note + `canonical_tokens` rule;
course-quality-contract.md revised uniqueness gate; module-recipe.md
`formal_card_heading`; diagram-engine.md strengthened glyph handling).

Edits made this pass (minimal, no regeneration):
- Added a **Profile knobs** block to `PROFILE.md` declaring `anchor_label = Song
  example`, `anchor_domain = songs/fretboard/keyboard/jams`, `formal_card_heading
  = State the Rule`, `verification_mode = diff + rubric`, `lab_interactions =
  [choice, compare, self-rating, text]`, `module_count/track_split = 25 / 9-9-7`,
  and `canonical_tokens` listing the 12 notes, the numerals `I–vii°`, the triad
  spellings `C–E–G` etc., the `W–W–H–W–W–W–H` pattern, and the glyphs `♭ ♯ ♮`.
- Retitled the awkward formal card in `06.html` and `17.html` from
  `Now Write the Equation` → `State the Rule` via the knob.

`node dogfood/validate.mjs`: **music-theory PASS, 0 failures** (2 advisory
em-dash warnings, pre-existing in the track eyebrow / interval `−`, unrelated to
this pass).

## Verdict table

| Finding | Original problem | Status | Why |
|---|---|---|---|
| #1 "Campus example" arts contradiction | Contract demanded the literal label "Campus example" yet renamed the attribute `data-campus`; the two halves disagreed on word-vs-slot. | **RESOLVED** | New `anchor_label`/`anchor_domain` knobs. SKILL.md and contract now both key the gate on `data-campus`/`data-boundary` and state the *word* "campus" is never required/asserted; visible framing follows `anchor_label` (set to "Song example"). The contradiction is gone. |
| #2 "Now Write the Equation" forces math on `I ii iii IV V vi vii°` | Hard-required heading + `ΣF=ma` example; calling the diatonic pattern an "equation" is a category error; module-recipe self-check grepped the exact substring. | **RESOLVED** | New `formal_card_heading` knob (default `Now Write the Equation`, remap `State the Rule`). module-recipe.md template and Self-check both now read the knob ("remapped by the profile for rule-based subjects"); the guard is "a consistency check for a rule," not dimensional. Card now honestly holds `W–W–H–W–W–W–H` / the diatonic pattern. Retitled both modules. |
| #3 "runnable" glued to "You have it when" | The prose welded "runnable" to the success check in two files, contradicting the Anchor Profile table that forbids `runnable` for non-code courses. | **RESOLVED** | Both module-recipe.md and course-quality-contract.md now write the check as the profile's `verification_mode` (`runnable`/`rubric`/`diff`/`estimate`) and explicitly add "a non-code course must not claim runnable." No file still glues the word. PROFILE sets `diff`+`rubric`. |
| #4 non-numeric labs have no invalid state | Smoke section assumed a number field; `aria-invalid` + "computes output" undefined for pick-the-chord/self-rate; one clause vs a whole section. | **RESOLVED** | New `lab_interactions` knob. Both SKILL.md and the contract's static + smoke sections now say `aria-invalid` applies only to `numeric`/`text`; `choice`/`self-rating`/`compare` are exempt and satisfy the gate by "producing interpreted feedback." The relaxation is now in the gate text itself, not a stray sentence. |
| #5 uniqueness gate misfires on the fixed 12-note alphabet | Diagram-label and quiz-stem uniqueness flagged legitimate reuse of `C E G`, `I–IV–V`, the 12 notes across modules. | **RESOLVED** | New `canonical_tokens` knob. The contract's uniqueness gate now reads: "Tokens listed in the profile's `canonical_tokens` … are exempt from the diagram-label and quiz-stem duplication check … per-module prose must still be unique." PROFILE declares the full alphabet. Representational reuse is now legitimate; the C–E–G / I–V divergence hack is no longer needed. |
| #6 glyph smoke check under-delivers (width>0 can't detect tofu) | One sentence; "verify they render" not achievable; width>0/font-family can't tell a real glyph from a `.notdef` box; SVG `<text>` and raster path unaddressed. | **PARTIAL** | Strengthened materially: SKILL.md + diagram-engine.md now require a **pixel/visual diff** (not width>0), explicitly cover **SVG `<text>` labels** as well as HTML, and **force the `svg` provider** for glyph-heavy diagrams (raster mangles `♭ ♯ ♮` like `Σ`). That closes the three named gaps. Still PARTIAL, not RESOLVED: a pixel/visual diff is *named* but no reference-image baseline, tolerance, or per-glyph coverage probe is specified, so "adequate in principle, under-specified in mechanics." See honest verdict below. |
| #7 OKF `.md`-vs-`.html` module-link seam | Overlay example linked `[Module 03](../guide/content/03-entropy.md)` but modules ship as `.html`; a validator expecting `.md` would flag broken links; filename shape (slug vs numeric) unpinned. | **RESOLVED** | learner-and-knowledge-okf.md now has an explicit "Where the module→concept edge lives" paragraph: rendered modules are `.html` fragments with no frontmatter, so module→concept edges live in **`course.md`** table rows; concept files link only *other concepts*; "Do not write `.md` links to module files: they will not resolve … and the link-integrity check will flag every one." The seam is pinned. Validator confirms: 0 broken OKF links, 25 mapped module lines. |

## Verdict counts

- **RESOLVED: 6** (#1, #2, #3, #4, #5, #7)
- **PARTIAL: 1** (#6 glyph rendering verification)
- **OPEN: 0**

## New issues / contradictions found this pass

1. **Validator does not yet enforce `canonical_tokens` or `formal_card_heading`.**
   `dogfood/validate.mjs` is light by design and never had the uniqueness or
   equation-substring gates, so it passes regardless. The *contract* is now
   correct, but the shipped reference validator does not exercise the new knobs.
   A real per-course `static-check.js` would. Not a contradiction, a coverage gap
   in the dogfood harness — the knobs are honored in the bundle, not yet checked
   by code.

2. **Em-dash voice warnings persist** in the track eyebrow (`Track 1 —
   Foundations`) and the interval prose. The revised Writing Voice rule says the
   eyebrow should read `Track 1: Foundations`. Pre-existing, advisory (warning,
   not failure), and orthogonal to the arts-profile frictions, so left as-is for
   this regression pass; flagged for a content fix.

3. **`canonical_tokens` exemption has no stated scope limit.** The knob exempts
   listed tokens from diagram-label and quiz-stem duplication, but the contract
   does not say what stops an author from dumping an over-broad token list to
   silence the uniqueness gate wholesale. For music the alphabet is genuinely
   finite and fixed, so it is honest here; the contract could note "canonical
   means a fixed finite alphabet, not an escape hatch." Minor.

## Honest verdict on glyph handling

**Improved from inadequate to adequate-in-principle but still under-specified —
PARTIAL.** The revision fixed the two substantive holes the original friction
named: it now (a) demands a **pixel/visual diff** and explicitly says width>0 /
resolved font-family "cannot tell a real glyph from a `.notdef` tofu box," and
(b) covers the **SVG `<text>` path and the raster path** (force `svg`, since
`image_gen` mangles `♭ ♯ ♮` like `Σ`). Those were the real gaps and they are now
closed in words.

What keeps it at PARTIAL rather than RESOLVED: a pixel/visual diff is only as
good as its baseline, and the contract names the technique without specifying the
mechanics — no reference snapshot to diff against, no tolerance, no explicit
glyph-coverage probe (e.g. measuring a known accidental against `.notdef` metrics
or a font's `cmap`). An author following the contract will *know* width>0 is
insufficient and will reach for a screenshot diff, which is the right instinct,
but two competent authors could still ship two different and possibly weak checks.
The PROFILE.md note in this bundle still candidly records that its own width>0 +
font-family smoke assertion catches tofu "only partially." So: the contract no
longer under-delivers on *intent* and *coverage*, but it does under-specify the
*verification recipe*. Adequate guidance, not yet a turnkey check.

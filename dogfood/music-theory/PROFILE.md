# PROFILE — Music Theory (for ear players)

Resolved intake knobs and the **non-STEM, arts anchor profile** that every module
and gate must read instead of assuming STEM. Citations point at the contract
sections this rests on.

## Resolved intake knobs

Per SKILL.md "Course Request (intake)" table.

| Knob | Resolved value | Source / note |
|---|---|---|
| Subject + scope | Music theory from the ear up: notes, intervals, scales, keys, chords, progressions, rhythm, and *why* liked songs work. Promised level: a by-ear hobbyist can name what they already play and predict the next chord. | SKILL.md intake (Subject + scope = required) |
| Audience / level | Hobbyist guitar/piano player who plays **by ear** and **cannot read a score**. No notation prerequisite, no math prerequisite. | SKILL.md intake (Audience drives anchor profile) |
| Size | 25 modules, 3 tracks (kept the default shape). Split 9 / 9 / 7. | SKILL.md "Curriculum Standard"; Anchor Profiles note "25 … is the default, not a law" |
| Depth / tone | Intuition-first, ear-first. Rigorous about the rules (interval arithmetic, scale formulas) but never requires staff reading. | SKILL.md intake (Depth/tone) |
| Build project style | **Not** runnable code. Per-module artifact is a played/recorded fragment or a hand-marked chart, verified by `diff` or `rubric`. | SKILL.md "Anchor Profiles" (verification mode follows profile) |
| Runtime | Claude Code. No image-gen MCP detected in this dogfood; diagrams would fall back to `svg`. | SKILL.md "Image Provider" (detect, else `svg`) |
| Image provider | `svg` (deterministic engine). Diagrams are keyboard/fretboard layouts, the circle of fifths, and interval ladders. | SKILL.md "Image Provider" fallback |
| Publish target | **None.** Dogfood only; no repo, no push, no serve (per task instruction). | task override of SKILL.md "GitHub Publishing" |

## Profile knobs (single source of truth the gates read)

Per SKILL.md "Anchor Profiles → Profile knobs the gates read". Every STEM-specific
gate reads the knob below, never the hardcoded STEM string. Remapping a knob is the
sanctioned fix for the FRICTION findings; the gate is generalized to the knob, not
deleted.

| Knob | Value for this course | Remaps / fixes |
|---|---|---|
| `anchor_label` | `Song example` | Visible framing of the Real-World Anchor. Machine hook stays `data-campus`/`data-boundary`; the word "campus" is never required. Fixes FRICTION #1. |
| `anchor_domain` | songs the learner already knows, the fretboard/keyboard, jams, capo/transpose moments | Where `data-example` and `data-campus` draw concrete situations. No "campus life". Fixes FRICTION #1. |
| `formal_card_heading` | `State the Rule` | The "Figure it out from scratch" formal card. Replaces the STEM `Now Write the Equation`. The card holds a music rule/formula (major scale `W–W–H–W–W–W–H`, the diatonic pattern `I ii iii IV V vi vii°`, interval arithmetic in semitones); its guard bullet is a musical sanity check ("an octave totals 12 semitones", "exactly one diminished, on vii"), not a dimensional one. Fixes FRICTION #2. |
| `verification_mode` | `diff` + `rubric` (never `runnable`) | The `Build it yourself` "You have it when" check. `diff` = your harmonization vs a reference voicing/progression; `rubric` = does the progression obey the stated rule. A non-code course must not claim `runnable`. Fixes FRICTION #3. |
| `lab_interactions` | `[choice, compare, self-rating, text]` | pick-the-chord (choice), compare-two-progressions (compare), play-and-self-rate (self-rating), type-the-note-name (text). `choice`/`compare`/`self-rating` labs have no invalid state and satisfy the smoke gate by producing interpreted feedback; only `text` carries `aria-invalid`. Fixes FRICTION #4. |
| `module_count` / `track_split` | 25 / 9-9-7 | Size gate reads this; it does not assert 25. |
| `canonical_tokens` | the 12 chromatic notes `C C♯/D♭ D D♯/E♭ E F F♯/G♭ G G♯/A♭ A A♯/B♭ B`; the scale-degree numerals `I ii iii IV V vi vii°` (and borrowed `♭III ♭VI ♭VII`); the triad spellings `C–E–G`, `G–B–D`, `F–A–C`; the major-scale word pattern `W–W–H–W–W–W–H`; the accidental glyphs `♭ ♯ ♮` | The fixed musical alphabet that legitimately recurs across modules. The uniqueness / anti-templating checks **exempt these from the diagram-label and quiz-stem duplication gates** (module 14's `C E G` triad stack and module 17's diatonic `I V` labels are not boilerplate). Per-module **prose** (`data-example`/`data-metaphor`/`data-test`/`data-campus`/`data-boundary`) must still be unique. Fixes FRICTION #5. |

## Mission (one line, feeds learner/mission.md)

Be able to sit with a song, figure out its chords by ear, and explain *why*
those chords fit the key — without reading a score.

## Anchor profile (declared once, read by every module + gate)

Per SKILL.md "Anchor Profiles": "Declare a small anchor profile once per course …
and have every module and gate read it instead of assuming STEM." This course is
**NON-STEM, arts**. There is a music-theory row to add to the family table:

| Field | Value for this course |
|---|---|
| **Family** | Music theory (arts / non-STEM). Not in the shipped table; declared here. |
| **Audience** | By-ear hobbyist musician, no score-reading, no math background. |
| **Anchor domain** (where concrete examples come from) | Songs the learner already plays, the guitar fretboard, the piano keyboard, jam sessions, capo/transpose moments, singing along. **Not** "campus life." |
| **Metaphor domain** | Everyday sound and physical layout: a ruler of frets, a staircase of keys, a color wheel (for the circle of fifths), tension-and-release in speech. |
| **Tiny case** | A 2–3 note or 2–3 chord fragment (e.g. C–E–G, or G→C→G). Replaces "small numbers." |
| **Artifact + verification mode** | A played/recorded fragment or a hand-marked chord chart. Verified by **`diff`** (your harmonization vs a reference voicing/progression) and **`rubric`** (does the progression obey the stated rule). **Never `runnable`.** |
| **Allowed lab interactions** | pick-the-chord (choice), compare-two-progressions (compare-two-outputs), play-and-self-rate (self-rating), type-the-note-name (text). No numeric calculator required. |
| **Diagram archetypes** | keyboard layout, fretboard layout, circle of fifths (a `cycle`), interval ladder (a `barsToValue`/`parts` ladder), chord-stack (`stack`/`parts`). |

### What the profile relaxes (per SKILL.md "Rules this changes")

- `data-example`/`data-metaphor`/`data-test`/`data-campus`/`data-boundary` are
  **kept** and still unique-per-module, but copy uses the song/instrument anchor
  domain, **not** the word "campus" or "small numbers."
- `Build it yourself` keeps steps + "You have it when" + stretch, but the
  artifact is a recording/chart and the check is `diff`/`rubric`, **not**
  `runnable`. A non-code course must not claim a runnable check.
- A lab "computes output" = "produces interpreted feedback" (e.g. "your III chord
  should be minor in a major key; you played major → here's why it clashes").
- Module count stays 25 / 3 tracks.

## Charset / font / glyph handling (the special part)

This course renders the musical accidentals **♭ (flat, U+266D), ♯ (sharp,
U+266F), ♮ (natural, U+266E)** in body text, tables, quizzes, and diagram labels.
Per SKILL.md "Anchor Profiles": *"For math-free subjects that use special glyphs
(IPA, accents, non-Latin script), set a UTF-8 charset, a font stack that covers
the glyphs, and verify they render in the smoke test rather than assuming a math
font."*

Resolved handling:

1. **Charset.** Every `guide/content/*.html` and `guide/index.html` declares
   `<meta charset="utf-8">` as the first child of `<head>`. Source files are
   saved UTF-8 (no BOM).
2. **Font stack.** A `--font-music` token covers the accidentals. The U+266x
   musical-symbol block is **not** in every default sans stack, so the stack is
   explicit:
   `font-family: "Noto Music", "Bravura Text", "Segoe UI Symbol", "Apple Symbols", "DejaVu Sans", system-ui, sans-serif;`
   Body text uses the normal UI stack; spans wrapping accidentals get
   `class="gly"` bound to `--font-music` so a missing glyph in the body font
   still falls back to a music-covering face.
3. **Smoke-test verification.** The Playwright smoke test must assert the glyphs
   render, not just that the bytes are present. Two checks:
   - the rendered text content of a known element equals a string containing
     `♭ ♯ ♮` (catches charset/encoding corruption), and
   - the element's measured width is > 0 and the computed `font-family`
     resolves to a face in `--font-music` (catches tofu/.notdef boxes only
     partially — see FRICTION; width>0 does not prove a real glyph rendered).

> NOTE: the contract gives one sentence for this whole area. Where it is thin
> (e.g. no way to truly prove a glyph rendered vs. a tofu box, no guidance on
> accidentals inside diagram SVG `<text>` vs HTML), it is recorded in FRICTION.md.

## Verification mode summary

- Concept correctness: `diff` against a cited reference (see `knowledge/` sources).
- Performance/aural tasks: `rubric` (self-rate against observable criteria).
- No module claims `runnable`. The "Now Write the Equation" card holds a **music
  rule/formula** (e.g. major scale `W–W–H–W–W–W–H`, interval arithmetic in
  semitones), per the task and recorded honestly in FRICTION.md where the STEM
  framing strains.

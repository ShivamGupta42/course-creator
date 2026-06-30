# Module Diagrams

A lesson diagram must EXPLAIN and SIMPLIFY the idea, not act as a labeled
placeholder. There are two paths; prefer the first.

## Preferred: rich generated images (Codex `image_gen`)

Generate a real, polished infographic per module with Codex's built-in
`image_gen` tool (gpt-image, via the `imagegen` system skill). These render
legible short labels and look like textbook figures, far richer than the vector
fallback. Use them as the default for lesson diagrams.

How:
- Invoke Codex non-interactively, one image per module: `codex exec --skip-git-repo-check "Use your image_gen tool to generate ... then copy the final PNG to <guide>/assets/diagrams/<module-id>.png"`. Codex saves to `$CODEX_HOME/generated_images/...`; have it copy the chosen file into the course.
- Prompt for an EXPLANATORY diagram, not decoration: name the exact boxes, arrows, and short labels (5-9 words max each), state the flow/relationship to show, and fix the style ("calm modern flat infographic, soft palette, white background, generous spacing, landscape 3:2, legible sans-serif labels, textbook figure"). Tie every label to the module's real content.
- Keep text short and few. gpt-image renders short labels well but mangles long sentences and complex math (Σ, nested subscripts). For formula-heavy modules, put the formula in the HTML/body and keep the image conceptual, or use the vector fallback for that one diagram.
- For special glyphs (`♭ ♯ ♮`, IPA, accents, non-Latin script), raster generation mangles them the way it mangles `Σ`; force the `svg` fallback for those diagrams. In SVG, the glyphs live in `<text>` nodes, so the page's font stack must cover them and the smoke test must confirm they render with a pixel/visual diff (a width>0 / resolved font-family check cannot tell a real glyph from a `.notdef` tofu box).
- Reference it from the lesson as `assets/diagrams/<module-id>.png` (the static check accepts svg/png/jpg/jpeg/webp).

Raster test contract (since raster has no `<text>` nodes to compare):
- assert each module's `assets/diagrams/<module-id>.(png|webp|svg)` exists and is a real image (non-trivial byte size, valid header).
- enforce uniqueness by file content hash across modules (no two modules ship the same image), not by SVG label text.
- keep the desktop+mobile placement smoke test (visible, inside the section, no overlap, no horizontal overflow).

## Fallback: deterministic SVG engine

Use only when `image_gen` is unavailable, or for a diagram that is mostly a clean
formula/structure where crisp vector text matters more than richness. Hand-placed
SVG coordinates drift into overlapping text, so use the engine, never raw coords.

## Setup

Copy `assets/diagrams.mjs` (shipped with this skill) into the course as
`guide/tools/diagrams.mjs`. Create `guide/tools/diagram-specs.mjs` exporting one
spec per module. Build with `node tools/diagrams.mjs` from `guide/`. Output goes
to `guide/assets/diagrams/<module-id>.svg`.

## Archetypes

Each spec names an archetype and supplies only labels and values, never
coordinates. The engine keeps titles, captions, boxes, and connector labels in
fixed non-overlapping bands and wraps long text.

- `pipeline` — labeled boxes left to right with arrows. `{boxes:[{label,sub}], arrows:[...]}`. Use for processes and Markov chains (X→Y→Z, source→channel→decode).
- `spheres` — two circles, a distance line (label sits above the line), and an off-center point (label below it). `{left, right, distanceLabel, point, note}`. Use for distance/decoding-radius ideas.
- `barsToValue` — a distribution-bar box, an arrow, and a value/formula box, with two side notes. `{barsTitle, bars:[...], value, valueSub, notes:[...]}`. Use for "summary statistic from a distribution" (entropy, expectation, code length).
- `venn` — two overlapping circles with left-only/overlap/right-only labels. `{leftOnly, overlap, rightOnly, note}`. Use for shared information (mutual information, leakage).
- `curve` — axes with a curve and labeled points. `{xlabel, ylabel, shape:'concave'|'line'|'gauss', points:[{x,y,label}]}`. Use for trade-offs and functions (rate vs error, binary entropy).
- `stack` — one bar split into labeled segments. `{segments:[{label,frac}], totalLabel}`. Use for decompositions (chain rule, ELBO + KL).
- `matrix` — an NxM payoff/comparison grid. `{rows:[...], cols:[...], cells:[[...],...], rowTitle, colTitle}`. Use for game-theory payoff matrices and decision tables.
- `cycle` — nodes on a ring with arrows between consecutive nodes. `{nodes:[{label}]}`. Use for circular processes (cardiac cycle, Krebs cycle, feedback loops).
- `parts` — a central structure with labeled callouts around it. `{center, parts:[...]}`. Use for anatomy and biology structures (a joint, a cell, an organ) where you name the components.
- `topology` — tiered nodes with labeled connectors. `{nodes:[{id,label,col,row?}], edges:[{from,to,label?}]}`. Use for system-design architecture (client/LB/service/DB/cache/queue). `col` sets the tier left to right; nodes in the same `col` stack vertically.
- `sequence` — actor lifelines with ordered messages. `{actors:[label], messages:[{from,to,label}]}` (from/to are actor indices). Use for request flows and interaction order (cache-aside read, auth handshake, a story's escalation).
- `scorecard` — rubric rows with a filled rating bar. `{rows:[{label, score, max}]}`. Use for delivery rubrics, before/after self-assessment, and judgment scales (public speaking, grammar register).
- `branching` — a state machine: directed, labeled transitions including branches and terminal/failure states. `{states:[{id,label,col,row?,terminal?}], transitions:[{from,to,label}]}`. `col` sets the tier left to right; same-`col` states stack vertically; `terminal:true` draws the double-bordered failure/end state. Use for lifecycles and failure-state graphs (`Pending → Running → CrashLoopBackOff / OOMKilled`, order status, a retry/backoff loop).

Pick the archetype that matches the concept's shape across subjects: physics/chemistry/maths/CS lean on pipeline, curve, stack, barsToValue; game theory on matrix; anatomy and biology on parts and cycle; system-design and ops on topology, sequence, and branching.

## Course overview (do not ship another course's tracks)

The engine also writes `assets/course-visual-models.svg` from a `COURSE_VISUAL`
constant. When you copy the engine into a new course, SET `COURSE_VISUAL` to that
course's own title and three track names (read them from the manifest). Leaving
the template default produces a visible mismatch on the home page (for example a
physics course showing "Information theory in three tracks"). Harden the static
check to validate the overview's title against the course (its text must contain
the course title or a track name) so a leftover template fails the build instead
of shipping silently; do not rely on a finalize-time eyeball.

## Multiple diagrams per module

When a module needs more than one picture, add `also: [ {archetype, ...}, ... ]`
to its spec. The engine writes `<id>-2.svg`, `<id>-3.svg`, ... Embed each extra
inline in the lesson where that concept appears. Use this only when a second
concept genuinely needs its own visual, not for decoration.

## Quality bar

- Module-specific labels and values; distinct label set per module.
- Text never crosses a connector line and never leaves its box.
- Crisp SVG so formulas stay legible. Do not use raster image generation for
  diagrams that contain formulas.
- Must pass the desktop and mobile placement smoke test: visible, inside the
  lesson section, no overlap, no horizontal overflow.

## Adding an archetype

Add a function to `archetypes` in `diagrams.mjs` that composes the `box`,
`text`, `block`, `arrow`, and `wrap` helpers within the 480×300 frame. Keep new
content inside the safe band (y 60-255) so it never hits the title or caption.

---
name: course-creator
description: Create, review, improve, test, publish, and locally serve static learning courses in the established course-library format. Use when the user asks to create a course, improve a course curriculum, add a subject course, make a first-principles course, review courses as a subject expert or learning expert, create a course design system, improve course UI/UX, or create private GitHub course repos.
---

# Course Creator

Use this skill to create high-quality self-study courses like the Information Theory, college subject, and Game Theory courses in the user's course library.

The default deliverable is a static, no-backend course repo with:

- 25 modules across 3 tracks.
- A browser guide in `guide/`.
- `README.md`, `learning_guide.md`, `COURSE_REVIEW.md`, `DESIGN_SYSTEM.md`, and `UI_UX_REVIEW.md`.
- Interactive labs, glossary, quizzes, local progress, and accessible track tabs.
- Subject Matter Expert review, Learning Expert review, and first-principles sections in every module.
- Implicit concept-acquisition mechanics in every module: purpose, plain model, concrete example, recall, gap repair, and transfer.
- Learner-friendly section labels; do not expose author-facing labels such as `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`.
- A module-specific generated or image-backed diagram asset and a `Picture the Idea` visual section in every module. Do not reuse one shared diagram image across lessons.
- 5-7 reasoning-oriented quiz questions per module.
- Insight-focused labs that ask learners to compare cases, interpret direction of change, and name when the model would mislead.
- Real-world examples and simple college-student metaphors in every module, including a dedicated `Real-World Anchor` section with a campus example, useful metaphor, and boundary check.
- A tiny course design system with semantic tokens, component rules, accessibility states, and responsive behavior.
- Static checks and Playwright smoke tests.
- A private GitHub repo pushed with `gh`.
- A local static server URL for inspection when requested or useful.

This skill is split into focused modules. Read the contracts before any course
work, and delegate the two highest-volume jobs to their dedicated recipes:

- `references/course-quality-contract.md` — the non-negotiables.
- `references/course-design-system-contract.md` — the UI and design system.
- `references/module-recipe.md` — author or upgrade ONE module end to end (the per-module template, voice, anchors, quizzes). Use this for every module and for fan-out across modules.
- `references/diagram-engine.md` — generate collision-free, module-specific diagrams. Copy `assets/diagrams.mjs` into the course as `guide/tools/diagrams.mjs`.

## Course Request (intake)

Before building, take the user's request and resolve these knobs. Whatever the
user already stated, accept; for anything unspecified that changes the build,
ask once (a single `AskUserQuestion` with the open knobs grouped), then proceed
with the defaults below. Do not interrogate one question at a time, and do not
silently assume a non-default. Record the resolved answers in the course's
`PROFILE.md` so every module and gate reads them.

| Knob | Default | Notes |
|---|---|---|
| Subject + scope | (required) | What the course teaches and the promised level. |
| Audience / level | college student, no prior expertise | Drives the anchor profile (see Anchor Profiles). |
| Size | 25 modules, 3 tracks | The user may ask for fewer/more; keep the 3-track shape unless told otherwise. |
| Depth / tone | rigorous but plain-spoken | e.g. "exam-prep", "intuition-first", "practitioner". |
| Build project style | runnable artifact per module | Adjust per subject via the anchor profile's verification mode. |
| Runtime | detect | Claude Code or Codex — determines available image providers (below). |
| **Image provider** | ask, fall back to `svg` | See Module Diagrams → Image Provider. |
| Publish target | private GitHub repo `<subject>-course` | public only if the user says so. |

The defaults reproduce the existing library (Physics, Information Theory, etc.).
A request like "a 12-module intuition-first stats course for analysts, images via
DALL·E, keep it private" sets Size=12, Tone=intuition-first, Audience=analysts,
Image provider=openai, and proceeds without further questions.

## Course Architecture

Use this structure unless the user requests otherwise:

```text
<subject-course>/
  README.md
  learning_guide.md
  COURSE_REVIEW.md
  DESIGN_SYSTEM.md
  UI_UX_REVIEW.md
  guide/
    index.html
    css/styles.css
    js/app.js
    js/manifest.js
    js/labs.js
    js/quiz.js
    js/glossary.js
    content/*.html
    tests/static-check.js
    tests/smoke.spec.js
    tests/README.md
    package.json
    package-lock.json
    playwright.config.js
    .gitignore
```

For the browser app, keep the UI quiet and study-focused:

- Hero with course title, promise, and guiding question.
- Track tabs for the 3 course levels.
- Module cards with status and concepts.
- Main module reader.
- Quiz panel.
- Sidebar with progress, habits, labs, and glossary.

## Tiny Design System Standard

Every course must include a small, explicit design system. The course app should feel like a learning workbench: calm enough for long reading, dense enough for scanning, and direct about mastery work.

Required design artifacts:

- `DESIGN_SYSTEM.md`: tokens, components, interaction rules, accessibility rules, and the course-specific accent palette.
- `UI_UX_REVIEW.md`: product-designer critique, improvements made, and follow-up opportunities.
- `guide/css/styles.css`: semantic design tokens and component styles implemented in the app.
- Static and smoke tests that enforce the design-system contract.

Required semantic tokens:

- Color aliases: `--color-bg`, `--color-surface`, `--color-surface-muted`, `--color-text`, `--color-muted`, `--color-border`, `--color-brand`, `--color-brand-strong`, `--color-brand-soft`, `--color-accent`, `--color-accent-text`, `--color-focus`, `--color-success`, `--color-warning`, and `--color-danger`.
- Spacing: `--space-1` through `--space-7` using a 4, 8, 12, 16, 24, 32, 48 px scale.
- Shape and elevation: `--radius-1`, `--radius-2`, `--shadow-1`, and `--shadow-2`.
- Reading and interaction: `--measure` for readable text width and `--target-min` for minimum interactive target size.

Required components and states:

- Course header with compact brand mark and section navigation.
- Hero with course title, course promise, and guiding question.
- Track tabs with keyboard arrow navigation.
- Module cards with status, current state, and completed state.
- Progress panel with an accessible progress label.
- Reader section for module content.
- `Picture the Idea` lesson diagram with a unique module-specific visual asset, college metaphor, simple example, and changed-case test.
- `Real-World Anchor` block with a familiar college-life example, a compact metaphor, and a note on where the metaphor can mislead.
- First-principles panel and reasoning panel styled as first-class learning components.
- Lab and quiz tool cards with visible validation, feedback, insight interpretation, and comparison prompts.
- Glossary panel.
- Skip link and mobile section jump links.

Required UX behavior:

- Preserve routing, progress persistence, track tabs, labs, quizzes, glossary, and local-only static behavior.
- Every interactive element must have a visible `:focus-visible` state.
- Invalid lab input must expose `aria-invalid` and a visible error message near the output.
- Module completion buttons must update text and expose a stateful pressed state.
- Mobile layout must stack without horizontal scrolling while keeping jump links available.

## Curriculum Standard

Every course must have 3 tracks and 25 modules:

- Beginner/foundation track: 9 modules.
- Intermediate/core toolkit track: 9 modules.
- Advanced/project/research track: 7 modules.

Every module must include these sections:

1. `Picture the Idea`
2. `Figure It Out From Scratch`
3. `How to Reason About This`
4. `Core Ideas`
5. `Real-World Anchor`
6. `Try a Small Case`
7. `Common Trap`
8. `Check Your Understanding`
9. `Practice in Levels`
10. `Make It Yours`

The fast concept-learning method must be implemented implicitly, not branded to the learner. Map it into the required sections:

- Purpose: `Start With a Real Question`
- Plain model: `Say It in Plain Words` and `What It Is Made Of`
- Concrete example: `Try the Simplest Case` and `Try a Small Case`
- Recall: `Check Your Understanding` and `Explain It to a Friend`
- Gap repair: `Common Trap` and `Find Where It Breaks`
- Transfer: `Practice in Levels` and `Make It Yours`

Do not add learner-facing headings or copy such as `fast learning loop`, `learning loop`, `Concept Learning Loop`, or similar meta-method labels. Also do not expose author-facing labels such as `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`. The learner should experience the method as the natural structure of the lesson.

Every module must include a `Picture the Idea` section near the top. It must include:

- A unique generated or image-backed diagram asset, copied into the course repo as `guide/assets/diagrams/<module-id>.<ext>`.
- The diagram must be specific to that module's title, concepts, representation, and changed-case test. It may be SVG, PNG, WebP, or another browser-renderable image, but it must not be the same file reused across modules.
- A course-level overview visual may live separately, for example `guide/assets/course-visual-models.svg`, but that overview must not be used as the lesson diagram for every module.
- A module-specific sketching instruction.
- One simple real-world example.
- One college-student-friendly metaphor.
- One changed-case question that asks what still works and what breaks.

Every module must also include a `Real-World Anchor` section after the core ideas or before the first-principles path. It must include:

- `Campus example`: a familiar example from college life, labs, dorms, commuting, group projects, phones, workouts, food, schedules, or campus services.
- `Useful metaphor`: one metaphor that maps clearly to the formal idea without becoming cute or misleading.
- `Where it can mislead`: one boundary condition where the example/metaphor breaks, so the learner does not overgeneralize.

The first-principles path must include:

- Start With a Real Question
- Say It in Plain Words
- What It Is Made Of
- Now Write the Equation
- Try the Simplest Case
- Find Where It Breaks
- Explain It to a Friend

Do not make modules generic. Each subject needs its own primitives, representations, evidence checks, common misconceptions, and transfer tasks.

Module-specific means genuinely different per module, not one template sentence with the module title swapped in. The metaphor, simple example, campus example, "what to test" prompt, figcaption, first-principles paragraphs, and diagram labels must each be written from that module's own content. A course fails review if, after removing the module title, any of these is identical across two modules. In particular: do not reuse a single course-wide metaphor (e.g. one "suitcase" metaphor for all 25 modules) or a single shared example list across modules.

Quiz questions must test the module's actual subject reasoning, not generic study skills. Banned generic stems include "What shows real understanding of X", "best first check for X", "Which metaphor fits this module best", "What should you do when intuition breaks in X", and "good transfer task for X". Each `Module Check` question should ask why a specific result holds, what a computed quantity means operationally, or what changes when a named assumption changes.

## Writing Voice

Course prose must read like a person who knows the subject wrote it, not like generated filler. Apply these rules to every learner-facing sentence (lessons, anchors, quizzes, labs, captions):

- No throat-clearing openers ("Here's the thing", "It turns out", "The truth is"). State the point.
- No emphasis crutches ("Let that sink in", "This matters because", "Make no mistake").
- No business jargon (navigate, unpack, lean into, deep dive, game-changer, circle back).
- Cut adverbs and hedges: really, just, simply, actually, fundamentally, inherently, crucially, importantly.
- No binary-contrast or negative-listing structures ("Not X, but Y", "It isn't X. It's Y", "Not a X... a Z"). State the claim directly.
- No dramatic fragmentation ("Entropy. That's it.") and no rhetorical setups ("What if...?", "Think about it:").
- No em dashes as connectors; use a comma, period, or rewrite.
- Active voice; name the actor. Vary sentence length so the rhythm is not metronomic.
- Trust the reader: do not announce insight, do not explain the obvious twice.

Score drafts on directness, rhythm, trust, authenticity, and density. Revise anything that reads as a template.

## Natural Module Structure (no worksheet labels)

The lesson should read like a course, not a fill-in worksheet of labeled cards. Do not expose scaffolding kickers or card labels such as `Visual anchor`, `College metaphor`, `Simple example`, or `What to test` as visible headings. Weave the metaphor, the concrete college example, and the change-one-thing prompt into flowing prose under `Picture the idea`, and weave the campus example and boundary note into prose under the real-world section.

Keep the pedagogy machine-checkable without visible labels by tagging the prose with data attributes the learner never sees:

- `<p data-example>` — one concrete college-life example specific to this module.
- `<p data-metaphor>` — one accurate metaphor mapped to the formal idea.
- `<p data-test>` — one change-one-condition prompt.
- `<p data-campus>` and `<p data-boundary>` — the real-world example and where it stops applying.

Static checks read these attributes and enforce that each is present and module-specific (unique after removing the title). This gives natural reading for the learner and strict enforcement for the test suite.

## Module Diagrams

A lesson diagram must EXPLAIN and SIMPLIFY the idea, not be a labeled
placeholder. Prefer rich generated images; fall back to vector only when needed.
See `references/diagram-engine.md` for both paths in full.

### Image Provider (pick once per course, from the intake)

This skill runs inside **Claude Code** or **Codex**, which expose different
image tools. Resolve the provider during intake — use what the user named, else
detect what the runtime offers, else ask, else fall back to `svg` (always
available, zero dependencies). Whatever the provider, the **output contract is
the same**: one explanatory infographic per module at
`guide/assets/diagrams/<module-id>.png` (or `.svg`), unique per module, calm
flat textbook style, short labels only (formulas live in the body), passing the
placement smoke test. Record the choice in `PROFILE.md`.

| Provider | Available in | How to invoke |
|---|---|---|
| `codex-image_gen` | Codex (built-in `image_gen`, gpt-image) | Best quality. Prompt for the exact boxes/arrows/short labels from the module's real content; save the PNG to `<module-id>.png`. Used to build the current library. |
| `mcp-image` | Claude Code, if an image-gen MCP server is connected | Discover via `ToolSearch` (e.g. an `image`/`gen` tool); call it per module, write the returned bytes to `<module-id>.png`. |
| `api-cli` | either, if an API key is set | Call the chosen API from a small script: OpenAI Images (`OPENAI_API_KEY`), Google Imagen/Gemini (`GEMINI_API_KEY`), or Stability (`STABILITY_API_KEY`). One request per module → `<module-id>.png`. |
| `svg` | always | Deterministic engine (`guide/tools/diagrams.mjs` + per-module specs). Use when no generator is available, or when a crisp formula/structure matters more than richness. Never hand-place coordinates. |

- The user can name a provider in the request ("use DALL·E", "Gemini images",
  "SVG only"). Honor it. If they name a generator whose key/tool is missing in
  this runtime, say so and offer `svg` rather than failing the build.
- Keep image text short; raster generators mangle long sentences and complex
  math (Σ, nested subscripts). Put formulas in the body, keep the image
  conceptual, or use `svg` for that one diagram.
- Either way: every module's diagram is specific (no image reused across
  modules — enforce by file content hash for raster, by label text for SVG),
  fits inside the lesson section at full reader width, and passes the desktop
  and mobile placement smoke test with no overlap or horizontal overflow.

## Review Personas

Always review and improve from two lenses:

**Subject Matter Expert**

- Is the course map accurate and complete enough for the promised level?
- Are representations appropriate for the discipline?
- Are misconceptions real and important?
- Do examples and labs test actual subject reasoning?

**Learning Expert**

- Does the module force retrieval, transfer, and teach-back?
- Does the learner know what mastery looks like?
- Are quizzes reasoning-oriented rather than recognition-only?
- Does the learning guide include a weekly protocol?

Record both reviews in `COURSE_REVIEW.md`.

## First-Principles Pattern

The canonical per-module skeleton lives in `references/module-recipe.md` (the
natural template with hidden `data-*` attributes). Do not duplicate or hand-write
a second skeleton here, and never expose worksheet labels as visible headings
(`College metaphor`, `Simple example`, `What to test`, `Useful metaphor`). Weave
the metaphor, example, and change-one-thing prompt into prose tagged with
`data-metaphor` / `data-example` / `data-test` / `data-campus` / `data-boundary`.
Read `module-recipe.md` before authoring or upgrading any module.

## Anchor Profiles (serve any subject, not just STEM)

The default contracts assume a STEM course for a college student: a campus
example, a "small numbers" tiny case, a numeric calculator lab, a runnable-code
build project, and math-style diagrams. That is right for physics or chemistry
and wrong for public speaking, grammar, applied AI, or system design. Declare a
small **anchor profile** once per course (in the course manifest or `PROFILE.md`)
and have every module and gate read it instead of assuming STEM.

A profile declares: audience; anchor domain (where concrete examples come from);
metaphor domain; what a "tiny case" means; artifact type and its verification
mode; allowed lab interaction types; and the diagram archetypes that fit.

| Family | Anchor / tiny case | Artifact + check | Labs | Diagrams |
|---|---|---|---|---|
| STEM (default) | campus example, small numbers | script or measurement, runnable assert | numeric calculator | pipeline, curve, stack, barsToValue, venn, parts, cycle |
| Public speaking | a recorded talk, a 30-second clip | a recorded talk, rubric threshold | record-and-self-rate | scorecard, sequence (talk structure) |
| Spoken-English grammar | a real utterance, a minimal pair | a corrected paragraph, diff vs reference | type-a-sentence / pick-the-form | scorecard, parts (sentence anatomy) |
| Applied / generative AI | a real prompt and output, token/cost | a script or pipeline, eval (not assert) | prompt-and-compare-outputs | pipeline (with feedback), topology, sequence |
| System design | a real product's load/latency | a design doc + capacity estimate, sanity-bound check | make-a-tradeoff, see-the-consequence | topology, sequence, stack |

Rules this changes (keep the machine-checkable `data-` attributes; relax the
hardwired words and shapes):

- The lesson keeps `data-example`/`data-metaphor`/`data-test`/`data-campus`/`data-boundary` (domain-neutral, still unique-per-module), but the copy must fit the profile's anchor domain. Do not force the word "campus" or "small numbers" into a non-STEM course.
- The `Build it yourself` project keeps its steps, "You have it when" check, and stretch, but the artifact and its **verification mode** follow the profile: `runnable` (code), `rubric` (performance), `diff` (corrected vs reference), or `estimate` (a sanity bound). A non-code course must not claim a "runnable" check.
- A lab is: scenario, one **interaction** (numeric input, text input, choice, self-rating, or compare-two-outputs), interpreted result, try-next prompt, reflection, and transfer. Keep `aria-invalid` only where input can be invalid; "computes output" means "produces interpreted feedback" for non-numeric labs.
- Module count: 25 across 3 tracks is the default, not a law. A course may declare a different shape; keep 3 tracks and a sane per-track split unless the user asks otherwise.
- For math-free subjects that use special glyphs (IPA, accents, non-Latin script), set a UTF-8 charset, a font stack that covers the glyphs, and verify they render in the smoke test rather than assuming a math font.

The per-course static check reads the profile and asserts the profile-appropriate
version of each gate. Generalize the gate, do not delete it.

## Upgrading An Existing Course

Existing courses vary in architecture. Detect the shape before changing anything; do not assume one layout.

- **Read `guide/js/manifest.js` first.** Some courses expose `window.GUIDE_MANIFEST`/`GUIDE_COURSES` (plain script, often with inline `<div class="quiz">` blocks in the content HTML). Others use ESM `export const course = {...}` with quizzes in a separate `guide/js/quiz.js` (`export const quizBank`) and a `requiredSections` array in `tests/static-check.js`.
- **Read the course's own `tests/static-check.js`.** Harden that file in place to match its architecture (ESM vs `vm` + globals); do not drop in another course's static-check. Preserve the course's existing required sections (some courses also have `Core Ideas`, `Try a Small Case`, `Common Trap`, `Practice in Levels`, `Make It Yours`) and add the new gates on top.
- **Create a feature branch before editing.** Course repos may block edits on `main`/`master`.

Proven upgrade pipeline:

1. Branch. Copy the diagram engine to `guide/tools/diagrams.mjs`. Append the `.build-project` CSS. Update the smoke test's template assertions to the natural template (`Picture the idea`, `data-example`/`data-metaphor`, `Where this shows up`, `data-campus`), keeping course-specific lab assertions.
2. Harden the course's static-check with the gates below.
3. Fan out one agent per module. Each rewrites the module's wrapper to the natural template, de-slops, adds the `Build it yourself` project, preserves the teaching body and extra sections, and **returns** its diagram spec and (for external-quiz courses) its 5-7 reasoning questions as data. Returning data avoids parallel writes to the shared `quiz.js`/specs file.
4. Assemble `guide/tools/diagram-specs.mjs` and (if external) `guide/js/quiz.js` centrally from the returned data. Run `node tools/diagrams.mjs`.
5. Run `npm test`. Fix collisions (a duplicated metaphor/quiz stem the check reports, an invalid archetype name, a missing heading). Re-run until green. Clean `test-results/`, commit, push.

Implementation gotchas learned in practice: extraction regexes must tolerate inline tags inside prose (`<p data-metaphor>...<code>x</code>...`) — capture with `([\s\S]*?)` and strip tags before comparing; keep the file's total quiz count in the 5-7 band; arrow/connector labels in diagrams need room or they clip, so drop labels the layout can't fit.

## Tests And Quality Gates

Every repo must include:

- `npm test`
- Static check verifying metadata, module count, learner-friendly required sections, 5-7 questions per module, labs, glossary, and no placeholder text.
- Static check verifying `COURSE_REVIEW.md`, `DESIGN_SYSTEM.md`, design tokens, skip link, accessible progress label, lab invalid state support, and completion-button state support.
- Static check verifying every lesson has a generated/image-backed diagram asset, a college metaphor, a simple example, and changed-case transfer prompt.
- Static check verifying every module references its own `assets/diagrams/<module-id>.<ext>` file, all diagram sources are unique, every referenced file exists, and no module reuses a shared course-level image such as `generated-course-diagrams.png`.
- Static check verifying per-module content is not title-swapped boilerplate: after removing the module title, no two modules may share the same metaphor, example, campus example, change-one-thing prompt, quiz stem, or diagram label set. The check must also fail on banned generic quiz stems (study-skill meta-questions) so quizzes test real subject reasoning.
- Static check verifying no scaffolding slop is exposed: fail if a `kicker`/eyebrow like `Visual anchor` appears in a lesson, or if worksheet card labels (`College metaphor`, `Simple example`, `What to test`, `Useful metaphor`) are used as visible headings. The natural prose plus `data-example`/`data-metaphor`/`data-test`/`data-campus`/`data-boundary` attributes are required instead.
- Static check verifying the `Figure It Out From Scratch` cards are scannable, not walls of text: every grid card must use a `p.card-lead` bold lead plus a `ul.card-points` bullet list (≥6 of each per module), each `card-lead` ≤22 and each bullet ≤16 *prose* words (strip `<code>…</code>` before counting so formulas do not trip the cap). Fail on a dense 60-80 word paragraph inside a card.
- Static check verifying **explanatory quiz feedback**: every quiz item (inline `<div class="quiz">` or external `quizBank`/`GUIDE` item) carries a non-empty `explanation` / `quiz-explain`. Fail on answer-index-only quizzes.
- Static check verifying the **practice ladder**: each module carries `data-practice` items for `worked`, `faded`, `independent`, and `transfer`, and the independent/transfer items reference a model answer or rubric.
- Static check verifying **self-assessment**: every `Make It Yours` and `Build it yourself` block contains a rubric (`table.rubric`/`data-rubric`), a pass threshold, a weak-answer example, and a repair line.
- Static check **hardening anti-templating semantically** (beyond exact duplicates): fail on banned generic scenario lists (e.g. the "backpack, bike, elevator, ball, circuit kit, lab cart, cooling drink" list), on `Common Trap` text containing "memorized keyword", on transfer prompts matching "change one assumption in a problem about {title}", on lab `metaphor`/`insight`/`tryNext` repeated verbatim across labs, and on duplicate `h2` section titles within one module.
- Static check verifying Writing Voice: fail on em-dash connectors and on banned slop phrases (throat-clearing openers, "it turns out", "that said", binary-contrast "not X, but Y") in learner-facing content.
- Static check verifying every module has a `Real-World Anchor` with `Campus example`, `Useful metaphor`, and `Where it can mislead`.
- Static check verifying labs include scenario, experiment, insight interpretation, try-next comparison prompts, reflection, real-world transfer, and a simple metaphor.
- Static check verifying the implicit method is present through required lesson sections and that learner-facing content does not expose meta-method labels like `fast learning loop` or `Concept Learning Loop`, or author-facing labels like `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`.
- Playwright smoke test verifying render, module routing/loading, lab validation, quiz feedback, progress, keyboard tab navigation, skip link, progress accessibility, stateful completion, mobile jump links, and lesson diagram placement on desktop and mobile with no viewport overflow or visual overlap.

Before pushing:

```bash
cd guide
npm install
npm test
```

Remove generated `test-results/` and `playwright-report/` before commit.

## GitHub Publishing

When the user asks for a repo:

1. Check `gh auth status`.
2. Check whether the target repo exists.
3. Use a clear repo name: `<subject>-course`.
4. Create a private repo unless the user says otherwise.
5. Commit on `main`.
6. Push with `gh repo create <repo> --private --source . --remote origin --push`.
7. Verify `visibility: PRIVATE`, default branch `main`, local branch tracks `origin/main`, and the commit hash.

## Local Serving

When asked to inspect courses, start detached local servers from each `guide/` directory:

```bash
python3 -m http.server <port> --bind 127.0.0.1
```

Use unique ports and report URLs. Keep logs under `/private/tmp/course-server-logs/` when working on this machine.

## Final Response

Summarize:

- Repo URL and commit hash.
- Local server URL if started.
- Test results.
- Course shape: tracks, modules, labs, quizzes, review artifacts, and design-system artifacts.
- Any important assumptions or limitations.

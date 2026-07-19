---
name: course-creator
description: Create, review, improve, test, publish, locally serve, and run static learning courses through an adaptive conversational tutor loop in the established course-library format. Use when the user asks to create or improve a course or curriculum, add a subject course, make a first-principles or problem-first course, review courses as a subject or learning expert, run or continue a course as a tutor, adapt explanations to a learner's understanding, create a course design system, improve course UI/UX, or create private GitHub course repos.
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
- Real-world examples and simple metaphors in every module, including a dedicated `Real-World Anchor` section with an anchor example (from the profile's `anchor_domain`), a useful metaphor, and a boundary check.
- A tiny course design system with semantic tokens, component rules, accessibility states, and responsive behavior.
- Optional problem-first mode when requested: a diagnostic intake plus a problem
  ladder, default 20 problems, where each lesson starts from a real problem and
  introduces technical terms only after the problem needs them.
- Optional external resource library when requested: curated YouTube/video links, books, free courses, slide decks, docs, references, and up to 3 vetted practitioner communities, mapped to modules/concepts.
- Optional thinking-pattern playbook when requested: an explicit, drillable set
  of the discipline's reasoning moves, default 10 patterns, each with a cue, an
  expert trace, a misleads-when boundary, and mixed pick-the-move drills.
- Optional tutor loop when requested: an attempt-first live-tutoring protocol
  the loaded agent runs in conversation, where the learner explains or predicts
  before any teaching, corrections come one at a time up a hint ladder, and the
  answer is revealed only after real attempts. Requires the learner overlay.
- Static checks and Playwright smoke tests.
- A private GitHub repo pushed with `gh`.
- A local static server URL for inspection when requested or useful.

This skill is split into focused modules. Read the contracts before any course
work, and delegate the two highest-volume jobs to their dedicated recipes:

- `references/course-quality-contract.md` — the non-negotiables.
- `references/course-design-system-contract.md` — the UI and design system.
- `references/module-recipe.md` — author or upgrade ONE module end to end (the per-module template, voice, anchors, quizzes). Use this for every module and for fan-out across modules.
- `references/diagram-engine.md` — generate collision-free, module-specific diagrams. Copy `assets/diagrams.mjs` into the course as `guide/tools/diagrams.mjs`.
- `references/learner-and-knowledge-okf.md` — optional learner + knowledge overlay as OKF-style Markdown files (mission, learner state, learning records, cited concepts). Ship a format, not an engine: the loaded agent reads and maintains these files by judgment. Use when a course should adapt to an individual learner over multiple sessions.
- `references/problem-first-course.md` — optional problem-first course mode. Use
  when the user wants to learn by solving life/work problems before learning the
  subject's terms, or when a hybrid course should add a problem ladder.
- `references/resource-library.md` — optional curated external resource library (YouTube/videos, books, free courses, slide decks, docs, references). Use when the user asks for outside resources or wants a watch/read list.
- `references/thinking-patterns.md` — optional thinking-pattern playbook. Use
  when the user asks how experts think in the subject, wants the discipline's
  problem-solving moves taught explicitly, or wants drills in choosing an
  approach rather than executing one.
- `references/tutor-loop.md` — optional attempt-first tutoring protocol. Use
  when the learner asks to study a course live with the agent ("teach me",
  "study with me", "quiz me on module 7"). The rendered course is the content
  backbone; the conversation is the delivery. Requires the OKF learner overlay.

## Course Request (intake)

Before building, take the user's request and resolve these knobs. Whatever the
user already stated, accept; for anything unspecified that changes the build,
ask in one grouped `AskUserQuestion` round, then proceed with the defaults
below. When the requester is the learner, add the design interview below as a
second round — two rounds is the hard cap. Do not interrogate one question at
a time, and do not silently assume a non-default. Record the resolved answers
in the course's `PROFILE.md` so every module and gate reads them.

| Knob | Default | Notes |
|---|---|---|
| Subject + scope | (required) | What the course teaches and the promised level. |
| Audience / level | college student, no prior expertise | Drives the anchor profile (see Anchor Profiles). |
| Size | 25 modules, 3 tracks | The user may ask for fewer/more; keep the 3-track shape unless told otherwise. |
| Depth / tone | rigorous but plain-spoken | e.g. "exam-prep", "intuition-first", "practitioner". |
| Course mode | `concept_first` | `concept_first` keeps the existing module course. `problem_first` builds a problem ladder, default 20 problems. `hybrid` does both. If the user says they learn through real problems, choose `problem_first` or `hybrid`. |
| Problem-first diagnostic | required when enabled | Goal, current knowledge, math/formal comfort, domain contexts, depth, time budget, and safety boundaries. |
| Problem count | 20 when problem-first is enabled | Keep 3 tracks unless the user asks otherwise; narrow topics may declare fewer. |
| Build project style | runnable artifact per module | Adjust per subject via the anchor profile's verification mode. |
| Runtime | detect | Claude Code or Codex — determines available image providers (below). |
| **Image provider** | ask, fall back to `svg` | See Module Diagrams → Image Provider. |
| External resource library | off unless requested | If enabled, create `RESOURCE_LIBRARY.md` plus a rendered Resources page/tab. Link-first by default; YouTube embeds only when requested. |
| Thinking-pattern playbook | off unless requested | If enabled, create `THINKING_PATTERNS.md` plus a rendered Patterns page/tab, default 10 patterns and 6 selection drills. Enable when the user asks how experts in the subject think or asks to learn the subject's problem-solving style. |
| Tutor loop | off unless requested | If enabled, record `tutor_loop.enabled`, `reveal_after` (default 3), and `session_minutes` (default 25) in `PROFILE.md` and enable the OKF learner overlay. Any ask to study interactively enables it. |
| Publish target | private GitHub repo `<subject>-course` | public only if the user says so. |

### Design interview (the learner questions)

The knob table above configures the build; it does not design the learning.
When the requester is the learner, or can speak for them, run a second short
`AskUserQuestion` round (up to 4 questions) before building:

1. **Mission.** Why this subject, and what does success look like — one
   concrete thing they will do with it ("follow the information-theory
   arguments in LLM papers"), not "understand X". Push back on vagueness once;
   a specific mission decides what to emphasize and what to cut.
2. **Starting point.** What they already know, and their comfort with the
   subject's formal tools (math, notation, code, jargon). Disclosed prior
   knowledge is recorded so the course does not re-teach it, and claimed depth
   is noted, not assumed.
3. **Time.** Weekly budget and preferred session length. This sets track
   emphasis, how many modules, and how heavy each practice ladder runs.
4. **Anchors and edges.** Which world their examples should come from (their
   job, hobby, daily life — this sets `anchor_domain` to *their* domain, not
   the college-life default) and what is explicitly out of scope.

Record the answers in `PROFILE.md` under `learner_design`; when the learner
overlay is enabled, seed `learner/mission.md` from them (goal, prior-knowledge
disclosures, out-of-scope list). These four answers are the difference between
a course for "a college student, no prior expertise" and a course for this
person.

Two exceptions: skip the interview when the course is for a generic audience
or publication (the build knobs are enough), and when problem-first mode is
enabled its diagnostic subsumes the interview — never ask the same question in
both rounds. Hard cap: two `AskUserQuestion` rounds total (build knobs +
design interview), and anything the user already stated is accepted, not
re-asked.

The defaults reproduce the existing library (Physics, Information Theory, etc.).
A request like "a 12-module intuition-first stats course for analysts, images via
DALL·E, add a YouTube/resources library, keep it private" sets Size=12,
Tone=intuition-first, Audience=analysts, Image provider=openai, External resource
library=enabled, and proceeds without further questions. A request like "teach me
game theory through problems I can use in life" sets `course_mode=problem_first`
or `hybrid`, runs the diagnostic, and starts from a practical problem ladder
instead of a term list. A request like "I want to learn how mathematicians
actually think about problems" sets `thinking_patterns.enabled=true` and builds
the pattern playbook alongside the course.

## Course Architecture

Use this structure unless the user requests otherwise:

```text
<subject-course>/
  README.md
  learning_guide.md
  COURSE_REVIEW.md
  DESIGN_SYSTEM.md
  UI_UX_REVIEW.md
  PROBLEM_LADDER.md            # optional, only when problem_first/hybrid enabled
  RESOURCE_LIBRARY.md          # optional, only when requested/enabled
  THINKING_PATTERNS.md         # optional, only when thinking_patterns enabled
  guide/
    index.html
    problems.html              # optional, or a Problems route inside index.html
    resources.html             # optional, or a Resources route inside index.html
    patterns.html              # optional, or a Patterns route inside index.html
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
- Problems page/tab when `problem_first.enabled` is true.
- Resources page/tab when `resource_library.enabled` is true.
- Patterns page/tab when `thinking_patterns.enabled` is true (or track sections
  when the profile sets `display: track_sections`).

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
- `Real-World Anchor` block with a familiar example from the profile's anchor domain, a compact metaphor, and a note on where the metaphor can mislead.
- First-principles panel and reasoning panel styled as first-class learning components.
- Lab and quiz tool cards with visible validation, feedback, insight interpretation, and comparison prompts.
- Glossary panel.
- Problem ladder cards and problem-reader state when enabled: difficulty,
  learner need, prerequisite check, active prompts, artifact, and safety framing.
- Resource library cards and filters when enabled: type, level, track/module, and time.
- Pattern playbook cards and selection-drill state when enabled: cue, steps,
  expert trace, misleads-when note, contrast move, and drill feedback.
- Skip link and mobile section jump links.

Required UX behavior:

- Preserve routing, progress persistence, track tabs, labs, quizzes, glossary, and local-only static behavior.
- Every interactive element must have a visible `:focus-visible` state.
- Invalid lab input must expose `aria-invalid` and a visible error message near the output.
- Module completion buttons must update text and expose a stateful pressed state.
- Problem-first prompts, when enabled, must accept a learner answer and show
  feedback before revealing the full explanation.
- Resource links, when enabled, must be keyboard reachable, open in a new tab with `rel="noopener noreferrer"`, and keep embedded videos lazy-loaded and contained on mobile.
- Pattern selection drills, when enabled, must accept a choice and show feedback
  naming why the best move fits and where the tempting alternative stalls.
- Mobile layout must stack without horizontal scrolling while keeping jump links available.

## Problem-First Course Mode

Use `references/problem-first-course.md` when the user wants learning to start
from practical problems rather than subject vocabulary, or when a course should
ship a problem ladder in addition to the normal modules.

This mode is optional and profile-driven:

- Record `course_mode` in `PROFILE.md`: `concept_first`, `problem_first`, or
  `hybrid`.
- If `problem_first` or `hybrid`, record `problem_first.enabled`,
  `problem_first.problem_count`, and `problem_first.diagnostic` in `PROFILE.md`.
- Create `PROBLEM_LADDER.md` as the source of truth for the problem sequence.
- Default to 20 problems across 3 tracks (`problem_first.track_split: [7, 7, 6]`):
  everyday footholds, useful tools, and advanced judgment/capstones.
- Start from the learner's current goal, current knowledge, math/formal comfort,
  domain contexts, depth target, time budget, and safety boundaries.
- Each problem title must be a real question a learner might care about, not a
  technical term. Introduce terms such as "Nash equilibrium", "Bayes rule", or
  "atomic model" only after the problem makes the term useful.
- Each problem includes learner need, starting intuition, prerequisite check,
  hidden concepts, expert terms introduced, artifact, difficulty, and safety
  fields.
- Later problems must state what they extend from earlier problems and what
  breaks when an assumption changes.
- Unsafe operational tasks are redirected to safe learning goals. Do not include
  instructions for explosives, weapons, poisons, evasion, fraud, illegal access,
  or other direct harm. Teach high-level safety reasoning instead.

Problem-first mode can stand alone (`problem_first`) or sit beside the existing
concept course (`hybrid`). Do not delete the concept-first path.

## Thinking-Pattern Playbook

Use `references/thinking-patterns.md` when the user wants the subject's way of
thinking taught explicitly: the recurring reasoning moves the discipline uses,
the cues that call for each move, and drills in choosing the right move for a
new problem. Concept-first teaches what the ideas are, problem-first teaches
which problems the subject solves, and the playbook teaches how the discipline
attacks a problem. The three layers compose; the playbook never replaces the
other two.

The playbook is optional and profile-driven:

- Record `thinking_patterns.enabled`, `thinking_patterns.pattern_count` (default
  10, range 6-14), `thinking_patterns.drill_count` (default 6, minimum 4), and
  `thinking_patterns.display` in `PROFILE.md`.
- Create `THINKING_PATTERNS.md` as the source of truth and render a Patterns
  page/tab (or track sections).
- Each pattern carries a plain imperative name, the discipline's formal term, a
  cue, 3-6 steps in the subject's own objects, an expert trace that rejects at
  least one alternative move, a misleads-when boundary, a contrast move with a
  deciding cue, and at least 2 module mappings.
- Modules that use a move say so in `How to Reason About This` and tag it
  `data-move="<pattern-id>"`.
- Mixed selection drills (`data-pattern-drill`) present fresh mini-problems from
  at least two tracks and ask which move to reach for first, with feedback for
  the best and the tempting-wrong choice.
- Generic study-skill moves ("break it into parts", "draw a picture") are banned
  as patterns unless rewritten with the discipline's primitives. The playbook
  must fail the same title-swap test as module prose: a pattern that reads
  correctly with another subject's noun swapped in is not this subject's move.
- Pattern names are subject content, visible to the learner. The meta-method
  label ban covers the course's teaching machinery, not the discipline's own
  reasoning vocabulary.

## Tutor Loop (attempt-first tutoring)

Use `references/tutor-loop.md` when the learner wants to study the course as a
live conversation with the loaded agent. The mode ships a protocol, not an
engine. The learner gives a complete rough explanation or prediction first.
The agent reconstructs that mental model, marks ideas present, fragile,
missing, misconnected, or untested, and repairs the earliest blocking gap with
the lightest useful explanation form. A nearby prediction verifies the repair;
discrimination and transfer come later. The method is never announced to the
learner.

The loop is optional and profile-driven:

- Record `tutor_loop.enabled`, `tutor_loop.reveal_after` (default 3), and
  `tutor_loop.session_minutes` (default 25) in `PROFILE.md`. Enabling it
  requires the OKF learner overlay (`references/learner-and-knowledge-okf.md`).
- The loop invents no content: it poses from the module's problem, diagnoses
  against `Core Ideas` and `Common Trap`, hints with the module's tiny case,
  and exits through the quiz, transfer variant, and rubric. Tracks act as
  promotion gates via `state.md` and the prerequisite graph.
- It can start as soon as `course.md` and a module's prose exist, before
  diagrams, labs, or later tracks are built; outline-only loops are allowed and
  noted in the learning record.
- Every session ends by writing a `LearningRecord` and updating `state.md` with
  the learner's model, strongest independent evidence, current gap, and next
  probe. Confidence may guide a diagnostic follow-up; it never proves mastery.
- Format each turn for readability (see `references/tutor-loop.md` →
  "Formatting the conversation"): set the pose apart, bold the handed-back
  question as the most prominent element, put every computation in a fenced code
  block, and keep markers restrained. Markdown structure is the available
  "color"; never emit raw ANSI. Honor an optional `tutor_loop.format`
  (`plain`/`standard`/`rich`, default `standard`) in `PROFILE.md`.

## Curriculum Standard

`PROFILE.md` is the single source of truth for course size. The default is 25
modules across 3 tracks (`module_count`/`track_split` = 25 / 9-9-7); the size gate
reads the profile, it does not assert 25. Keep 3 tracks and a sane split unless the
user asks otherwise. A narrow topic should declare a smaller size rather than pad
to 25, since padding fights the anti-templating gate.

Default split:

- Beginner/foundation track: 9 modules.
- Intermediate/core toolkit track: 9 modules.
- Advanced/project/research track: 7 modules.

Every concept-first module must include these sections:

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

When problem-first mode is enabled, the merged skeleton replaces the list above (see "Section budget and merge rule" under Writing Voice). The problem-first module runs, in order, at most 10 `h2` sections:

1. `The problem` (ends with the concrete scenario the worked example will use)
2. `Your first pass` (prediction/discrimination/transfer prompts, feedback only after an answer)
3. One worked-example section (absorbs `Build the smallest model`, `Try the Simplest Case`, and `Try a Small Case`; closes by naming the expert term)
4. `Picture the idea`
5. `Core Ideas` (ends with the spoken teach-back paragraph)
6. `Where this shows up` (campus/anchor example + boundary; no second metaphor)
7. `How to reason about this` (1-2 playbook moves in prose, then the common trap as connected prose with its repair)
8. `Practice in Levels` (ladder plus the interactive lab as the final rung)
9. `Check Your Understanding`
10. `Build it yourself` (ends with the Make-It-Yours personalization and one shared rubric)

The fast concept-learning method must be implemented implicitly, not branded to the learner. Map it into the required sections (concept-first names on the left; the problem-first skeleton covers the same jobs in its merged sections):

- Purpose: `Start With a Real Question` / `The problem`
- Plain model: `Say It in Plain Words` and `What It Is Made Of` / the worked example
- Concrete example: `Try the Simplest Case` and `Try a Small Case` / the worked example
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
- One audience-appropriate metaphor (from the profile's metaphor domain).
- One changed-case question that asks what still works and what breaks.

Every module must also include a `Real-World Anchor` section after the core ideas or before the first-principles path. The section is required for every profile; its visible framing follows `anchor_domain`/`anchor_label` and the machine hook is the data attribute, never the literal word "campus". It must include:

- An anchor example (`data-campus`): a concrete situation from the profile's `anchor_domain`. STEM defaults to college life (labs, dorms, commuting, group projects, phones, workouts, food, schedules); an analyst course uses real data/experiments, a finance course uses real money situations, a music course uses songs the learner knows. Do not force the word "campus" into a non-STEM course.
- A boundary note (`data-boundary`): one condition where the example or metaphor breaks, so the learner does not overgeneralize.
- Concept-first courses may add a second `data-metaphor` here. Problem-first modules keep ONE metaphor per module (the one in `Picture the idea`); a second undeveloped metaphor is duplication, not reinforcement.

The first-principles path (concept-first courses only; problem-first modules cover these jobs in their merged sections) must include:

- Start With a Real Question
- Say It in Plain Words
- What It Is Made Of
- Now Write the Equation
- Try the Simplest Case
- Find Where It Breaks
- Explain It to a Friend (required in both modes; problem-first modules keep it as the closing paragraph of `Core Ideas`)

Do not make modules generic. Each subject needs its own primitives, representations, evidence checks, common misconceptions, and transfer tasks.

Module-specific means genuinely different per module, not one template sentence with the module title swapped in. The metaphor, simple example, campus example, "what to test" prompt, figcaption, first-principles paragraphs, and diagram labels must each be written from that module's own content. A course fails review if, after removing the module title, any of these is identical across two modules. In particular: do not reuse a single course-wide metaphor (e.g. one "suitcase" metaphor for all 25 modules) or a single shared example list across modules.

Quiz questions must test the module's actual subject reasoning, not generic study skills. Banned generic stems include "What shows real understanding of X", "best first check for X", "Which metaphor fits this module best", "What should you do when intuition breaks in X", and "good transfer task for X". Each `Module Check` question should ask why a specific result holds, what a computed quantity means operationally, or what changes when a named assumption changes.

Quiz options must not leak the answer through format. Authors (human and LLM alike) default to writing the correct option longer and more carefully qualified than the distractors, and a test-wise learner picks it without touching the subject. Write every distractor at the same grain as the correct option: a full, plausible claim a real learner would make, never a short strawman. The correct option must not be the lone hedged claim ("usually", "when the sample is small") among absolutes ("always", "never"), and must not be the only detailed one among stubs. The distractor-diagnosis rule makes this natural: an option worth diagnosing in `quiz-explain` is a claim worth writing in full.

## Writing Voice

Course prose must read like a person who knows the subject wrote it, not like generated filler. Apply these rules to every learner-facing sentence (lessons, anchors, quizzes, labs, captions):

- No throat-clearing openers ("Here's the thing", "It turns out", "The truth is"). State the point.
- No emphasis crutches ("Let that sink in", "This matters because", "Make no mistake").
- No business jargon (navigate, unpack, lean into, deep dive, game-changer, circle back).
- Cut adverbs and hedges used as filler: really, just, simply, actually, fundamentally, inherently, crucially, importantly. This targets emphasis filler, not technical precision: "the limit is just the slope" or "simply connected" use the word with a precise meaning and are fine. The gate is advisory on these words, not a hard fail, so it does not punish correct usage.
- No binary-contrast or negative-listing structures ("Not X, but Y", "It isn't X. It's Y", "Not a X... a Z"). State the claim directly. This bans the rhetorical negation flourish, not an honest side-by-side comparison of two real options ("the avalanche method saves more interest; the snowball method builds momentum" is fine, and so is "rollouts shift traffic gradually; rollbacks revert in one step").
- No dramatic fragmentation ("Entropy. That's it.") and no rhetorical setups ("What if...?", "Think about it:").
- No em dashes as connectors; use a comma, period, or rewrite. This covers structural text too, not just body prose, the track eyebrow included (write `Track 2: Functions and change`, not `Track 2 — Functions and change`). The voice check strips `<code>`/notation before scanning so a minus sign or numeric range inside `<code>` is not flagged as an em-dash connector.
- Active voice; name the actor. Vary sentence length so the rhythm is not metronomic.
- Trust the reader: do not announce insight, and do not repeat a definition verbatim. Restating an idea in a second register (concrete then formal, or formal then plain) is teaching, not repetition, and is required by the explanation-shape rules below.

The ban list above removes generated-filler tells. It cannot produce explanation on its own: a draft that violates nothing can still read as compressed aphorisms ("Aggregation creates a new object. All need provenance."). So every learner-facing draft must ALSO satisfy the positive rules:

### Explanation shape (positive rules, gated)

- **Concrete before abstract, same breath.** Every general claim gets a concrete instance (numbers, named things, a small scene) in the same paragraph, at most two sentences away. If a paragraph states a rule and no specific case appears beside it, the paragraph is unfinished.
- **Show the work, not just the verdict.** Any numeric result the prose reports must have its inputs and the one-line computation visible in the same section. "The trade average is 3.5%" is banned unless the two trades that produce 3.5% sit next to it.
- **Talk to the learner.** Address the reader as "you" doing something specific, in at least the problem, trap, and real-world sections. Mayer's personalization effect is the point: conversational style beats formal style on transfer.
- **Connective tissue is not filler.** "Because", "so", "which means", "for example", "suppose", "in other words" are cohesion words and are exempt from the adverb/filler ban. Sentences should chain known → new: begin with what the reader already has, end with the new information.
- **Unpack, do not compress.** One idea per paragraph, developed as claim → instance → consequence ("...and if you ignore this, X happens"). One idea per sentence with zero development is compression, not clarity.
- **Gloss every term of art at first use in everyday words** ("an estimand is the exact thing you are trying to measure"). After the gloss, use the term freely.
- **Verbs over noun stacks.** "The report averages trades" beats "trade-level aggregation is applied". A sentence whose subject and object are both abstractions ("Aggregation creates a new object") must be rewritten around someone doing something.
- **Read-aloud test.** If the author would not say the sentence out loud to a colleague, rewrite it. Target roughly grade 9-10 (Flesch-Kincaid) for explanatory prose; glossed technical terms are exempt from the vocabulary target, telegraph fragments are not.

Score drafts on directness, rhythm, trust, authenticity, and development (does each idea get an instance and a consequence, or is it asserted once and abandoned). Revise anything that reads as a template or as a string of verdicts.

### Section budget and merge rule

A module has at most 10 visible `h2` sections. Depth comes from developing fewer sections, never from adding more. When problem-first mode is enabled, its sections REPLACE overlapping standard sections; they never stack:

- `Build the smallest model`, the `Try the Simplest Case` card, and `Try a Small Case` merge into ONE worked example placed right after the problem, showing all inputs of every number it reports.
- `The expert name` folds into the worked example's close or into Core Ideas: name the term after the learner has computed the thing it names.
- One metaphor per module. The real-world anchor keeps the campus example and the boundary note only.
- The first-principles grid appears only in concept-first courses. In problem-first mode its six jobs (real question, plain words, primitives, formal tool, simplest case, where it breaks) are covered by the problem, worked example, Core Ideas, and boundary sections; a grid on top of those is duplication.
- Reasoning playbook: name at most 2 moves per module, in flowing prose where the module actually uses them. A full reasoning-cycle litany (ORIENT/MECHANISM/...) may appear once on a patterns page, never repeated per module.

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

## External Resource Library

Use `references/resource-library.md` when the user asks for YouTube videos,
outside readings, free courses, books, slide decks, or a resource list.

The library is optional and profile-driven:

- Record `resource_library.enabled` and `resource_library.modes` in `PROFILE.md`.
- Add `RESOURCE_LIBRARY.md` as the source of truth.
- Add a rendered Resources page/tab in `guide/` when building the browser guide.
- Map every resource to modules and concepts, with `use_when` and `why_this`.
- Keep it curated. Search current YouTube/web resources during the build, inspect
  candidates, and include only credible links that fit the learner's level.
- Prefer link cards. Use YouTube embeds only on the Resources page when requested,
  never as autoplay and never as full iframes inside every lesson.
- Include books, legally free courses, public lecture notes, slide decks,
  official docs, and references when they help the learner go deeper.
- Include up to 3 vetted practitioner communities (a moderated forum, subreddit,
  Q&A site, or local class with an official page) mapped to the capstone modules
  whose artifacts the learner should bring for critique. The course can teach
  and drill, but only real practitioners can grade taste; a community is where
  finished work gets tested. Respect an opt-out recorded in the profile.
- Do not mirror copyrighted material, scrape paywalled content, or promise free
  access/certificates unless the current source page says so.

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

### Profile knobs the gates read (single source of truth)

Every STEM-specific assumption in the contracts is a knob with a default, set once
in `PROFILE.md`. Gates read the knob, never the hardcoded STEM string. This is the
fix for the recurring problem that a literal check (for `runnable`, `Campus
example`, `Now Write the Equation`, or `25 modules`) rejects a correct non-STEM
module. Generalize the gate to the knob; do not delete it.

| Knob | STEM default | What it remaps |
|---|---|---|
| `anchor_label` | `Campus example` | The visible framing of the Real-World Anchor. The machine hook stays `data-campus`/`data-boundary`; the *word* "campus" is never required in prose or asserted by a gate. |
| `anchor_domain` | campus / college life | Where `data-example` and `data-campus` draw their concrete situations. |
| `tiny_case` | small numbers | What the "Try the Simplest Case" worked example is built from. STEM uses small numbers; a distribution-valued subject uses a small distribution (`Beta(1,1)`, a 2×2 table), music a 2-3 note fragment, finance a small money scenario. Do not force "small numbers" onto a subject whose simplest case is not numeric. |
| `formal_card_heading` | `Now Write the Equation` | The "Figure it out from scratch" formal card. Rule-based subjects use `State the Rule`; the card holds whatever formal move the subject has (a formula, a rule, a pattern), and its guard bullet is a sanity check, not necessarily a dimensional one. |
| `verification_mode` | `runnable` | The default `Build it yourself` "You have it when" check: `runnable` (code asserts), `rubric` (performance), `diff` (vs reference), or `estimate` (sanity bound). A non-code course must not claim `runnable`. This is the course default; a single module may override it (a mostly-`estimate` course can have one `runnable` module), so the gate reads the per-module mode when a module declares one and falls back to the profile default otherwise. |
| `lab_interactions` | `[numeric]` | Which lab input types exist (`numeric`, `text`, `choice`, `self-rating`, `compare`). The `aria-invalid` / "valid input computes output" smoke gate applies only to `numeric`/`text`; `choice`/`self-rating`/`compare` labs satisfy it by producing interpreted feedback, with no invalid state. |
| `module_count` / `track_split` | 25 / 9-9-7 | The size gate. PROFILE is the only place size is declared; the static check reads it instead of asserting 25. Keep 3 tracks and a sane split unless the user asks otherwise. |
| `canonical_tokens` | `[]` | A subject's fixed alphabet that legitimately recurs across modules (the 12 notes, `I–IV–V`, `C–E–G`). The uniqueness / anti-templating checks treat a listed token as a free unit *inside* an otherwise-unique label or stem; they do not disable the duplication gate. Two modules whose diagram labels or quiz stems are identical after removing only the canonical tokens still fail. Keep the list tight (the genuine fixed alphabet, not whole phrases), or it silently weakens the slop gate; an empty list is the right default for most subjects. |

A request that names a non-STEM subject sets these during intake; record the
resolved values in `PROFILE.md` so every module and gate reads them.

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
- For math-free subjects that use special glyphs (IPA, accents, non-Latin script), set a UTF-8 charset, a font stack that covers the glyphs, and verify they render. A presence check (`width>0`, resolved `font-family`) cannot tell a real glyph from a `.notdef` tofu box, so the glyph check needs a concrete recipe, not just "verify it renders": (1) probe the resolved font's `cmap` for each codepoint in the glyph set (`document.fonts.check`, or a font-coverage probe) and fail on any missing one; (2) render each glyph and pixel-compare its bounding box against the same glyph rendered in a font known to cover it (e.g. a bundled fallback), failing if the rendered box matches the `.notdef` box or differs from the reference beyond a small tolerance (≈5% of pixels). Cover SVG `<text>` labels as well as HTML, and force the `svg` diagram provider for glyph-heavy diagrams (raster `image_gen` mangles `♭ ♯ ♮` the way it mangles `Σ`).
- The formal "Figure it out from scratch" card reads `formal_card_heading`. For a subject with no equation (music cadence, scam-spotting, voice leading), the card states the formal rule or pattern and its guard is a sanity check, not a dimensional one. Calling a non-formula rule an "equation" is a category error; rename the card via the knob.
- The uniqueness and anti-templating gates exempt `canonical_tokens`. A subject with a fixed alphabet (the 12 notes, `I–IV–V`, `C–E–G`) reuses those labels and stems legitimately across modules; the knowledge/teaching split keeps prose unique, but representational reuse (diagram labels, quiz stems built on the canonical set) must not be flagged as boilerplate.

The per-course static check reads the profile and asserts the profile-appropriate
version of each gate. Generalize the gate to the knob, do not delete it, and do not
assert the STEM default string when the profile has remapped it.

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

If resource library is enabled, assemble `RESOURCE_LIBRARY.md` after the course
map is stable so every external resource can point to real module IDs and concept
IDs. Do not let resource hunting delay the core course build; cap the list using
the profile's `resource_library.max_items`.

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
- Static check verifying the `Figure It Out From Scratch` cards (concept-first courses) are scannable, not walls of text and not telegrams: every grid card must use a `p.card-lead` bold lead plus a `ul.card-points` bullet list (≥6 of each per module), each `card-lead` ≤22 and each bullet 5-16 *prose* words (strip `<code>…</code>` before counting so formulas do not trip the cap). Fail on a dense 60-80 word paragraph inside a card, and fail on 2-4 word fragments like "All need provenance": the ceiling has a floor.
- Static check verifying **explanation shape** (hard gates, all learner-facing lesson prose after stripping `<code>` and quiz options): Flesch-Kincaid grade ≤ 11 per module; ≥5 causal connectives (because / so / which means / for example / suppose / in other words) per module; ≥10 second-person references (you/your) per module; each of `data-learner-need`, `data-example`, `data-campus` is ≥40 words (a small scene, not an aphorism); any percentage or numeric result stated in a worked-example or small-case section must have at least two numeric inputs in the same section (show the work); ≤2 `data-move` tags per module; no repeated multi-step reasoning-cycle litany across modules (hash the ordered bold step labels of any `<ol>` in the reasoning section; the sequence may appear in at most one module or on a patterns page); problem-first modules must contain `data-prompt="prediction"` and hide `data-problem-feedback` until the learner answers; ≤10 `h2` per module; no inline worksheet label prefixes (`Wrong belief:`, `Why it tempts:`, `Diagnostic case:`, `Repair:`) in visible prose.
- Static check verifying **explanatory quiz feedback**: every quiz item (inline `<div class="quiz">` or external `quizBank`/`GUIDE` item) carries a non-empty `explanation` / `quiz-explain`. Fail on answer-index-only quizzes.
- Static check verifying **no answer-format cues** in quizzes: strip `<code>` and count prose words per option; fail a module where the correct option is the strictly longest option in more than half of its quizzes, or where any correct option exceeds 1.5× the word count of its longest distractor or falls under 0.5× its shortest. Advisory (flag, not fail): absolutes (`always`, `never`, `only`) appearing in distractors but in no correct option across the module — strawman distractors teach test-taking, not the subject.
- Static check verifying the **practice ladder**: each module carries `data-practice` items for `worked`, `faded`, `independent`, and `transfer`, and the independent/transfer items reference a model answer or rubric.
- Static check verifying **self-assessment**: every `Make It Yours` and `Build it yourself` block contains a rubric (`table.rubric`/`data-rubric`), a pass threshold, a weak-answer example, and a repair line.
- Static check **hardening anti-templating semantically** (beyond exact duplicates): fail on banned generic scenario lists (e.g. the "backpack, bike, elevator, ball, circuit kit, lab cart, cooling drink" list), on `Common Trap` text containing "memorized keyword", on transfer prompts matching "change one assumption in a problem about {title}", on lab `metaphor`/`insight`/`tryNext` repeated verbatim across labs, and on duplicate `h2` section titles within one module.
- Static check verifying Writing Voice: fail on em-dash connectors and on banned slop phrases (throat-clearing openers, "it turns out", "that said", binary-contrast "not X, but Y") in learner-facing content.
- Static check verifying every module has a `Real-World Anchor` with `Campus example`, `Useful metaphor`, and `Where it can mislead`.
- Static check verifying labs include scenario, experiment, insight interpretation, try-next comparison prompts, reflection, real-world transfer, and a simple metaphor.
- Static check verifying optional problem-first mode when `PROFILE.md` enables it:
  `PROBLEM_LADDER.md`, diagnostic fields, problem count, real-question titles,
  track split, prerequisites, hidden concepts, artifacts, active prompts,
  progression, and safety redirects.
- Static check verifying the optional resource library when `PROFILE.md` enables it: `RESOURCE_LIBRARY.md`, rendered Resources page/tab, required metadata, HTTPS links, module/concept mappings, safe YouTube embed settings, and no generic `why_this`/`use_when` filler.
- Static check verifying the optional thinking-pattern playbook when `PROFILE.md`
  enables it: `THINKING_PATTERNS.md`, pattern count in range and matching the
  profile, required pattern fields, valid `data-move` cross-references in both
  directions, no banned generic patterns, distinct cues, a rendered Patterns
  page/tab, and enough multi-track selection drills with two-sided feedback.
- Static check verifying the implicit method is present through required lesson sections and that learner-facing content does not expose meta-method labels like `fast learning loop` or `Concept Learning Loop`, or author-facing labels like `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`.
- Playwright smoke test verifying render, module routing/loading, lab validation,
  quiz feedback, progress, keyboard tab navigation, skip link, progress
  accessibility, stateful completion, mobile jump links, optional Problems,
  Resources, and Patterns pages/tabs, and lesson diagram placement on desktop
  and mobile with no viewport overflow or visual overlap.

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
- Problem-first shape if enabled: mode, problem count, track split, diagnostic
  assumptions, starting problem, and safety redirects.
- Resource library shape if enabled: total resources, YouTube/video count, reading/course/deck/reference count, community count (or that the learner opted out), display mode, and whether live links were manually checked.
- Playbook shape if enabled: pattern count and names, modules tagging a
  `data-move`, drill count, and whether capstones require a move choice.
- Tutor loop if enabled: the `reveal_after` setting, that the learner overlay
  is seeded, and how to start a session (open the workspace and ask to study).
- Any important assumptions or limitations.

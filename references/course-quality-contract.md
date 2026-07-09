# Course Quality Contract

Use this contract when creating or upgrading a course.

## Non-Negotiables

These gates are profile-driven. Where a rule names a STEM-specific value (`runnable`,
`Campus example`, `Now Write the Equation`, `25 modules`), it is a knob set in
`PROFILE.md`, and the gate asserts the profile's value, not the STEM default. See
SKILL.md "Anchor Profiles → Profile knobs the gates read". Generalize the gate to
the knob; never assert the STEM string when the profile has remapped it.

- Course size comes from `PROFILE.md` (`module_count`/`track_split`, default 25 across 3 tracks at 9/9/7). The gate reads the profile; it does not assert 25. A narrow topic declares a smaller size rather than padding to 25.
- 3 tracks: foundations, intermediate toolkit, advanced/projects, unless the profile declares otherwise.
- Every module must use learner-friendly sections: `Picture the Idea`, `Figure It Out From Scratch`, `How to Reason About This`, `Core Ideas`, `Real-World Anchor`, `Try a Small Case`, `Common Trap`, `Check Your Understanding`, `Practice in Levels`, and `Make It Yours`.
- The six `Figure It Out From Scratch` cards must each be scannable: a bold one-clause lead (`p.card-lead`) plus a short bullet list (`ul.card-points`), the whole card under ~25 words. Dense 60-80 word paragraphs inside these cards are a failure. The `Explain It to a Friend` teach-back stays a short prose paragraph.
- Every module must include a unique generated or image-backed lesson diagram, one simple real-world example, one audience-appropriate metaphor (the profile's metaphor domain), and one changed-case transfer check.
- Per-module wrapper content (metaphor, simple example, campus example, "what to test", first-principles paragraphs, quiz stems, diagram labels) must be genuinely module-specific. Title-swapped boilerplate is a failure: after removing the module title, none of these may be identical across two modules. Do not reuse one course-wide metaphor or one shared example list for all modules.
- Quiz questions must test the module's real subject reasoning. Generic study-skill stems ("What shows real understanding of X", "best first check for X", "Which metaphor fits this module best", "intuition breaks in X", "good transfer task for X") are banned.
- Prose must follow the Writing Voice rules: no throat-clearing openers, emphasis crutches, business jargon, adverbs/hedges, binary-contrast or negative-listing structures, dramatic fragmentation, rhetorical setups, or em-dash connectors. Active voice, varied rhythm, no announced insight.
- Modules must read like a course, not a labeled worksheet. Do not expose scaffolding kickers or card labels (`Visual anchor`, `College metaphor`, `Simple example`, `What to test`) as visible headings. Weave the metaphor, example, change-one-thing prompt, campus example, and boundary note into prose, tagged with hidden data attributes (`data-example`, `data-metaphor`, `data-test`, `data-campus`, `data-boundary`) for the test suite.
- Lesson diagrams must explain and simplify the idea, not be labeled placeholders. Prefer rich generated infographics (Codex `image_gen`, saved as `<module-id>.png`); fall back to the deterministic SVG engine when generation is unavailable or a crisp formula matters. Never hand-place coordinates. Keep generated-image text short (formulas go in the body). Diagrams must be unique per module (content hash for raster, label text for SVG) and pass the placement smoke test.
- Every module includes a hands-on `Build it yourself` project (`data-build-project`): the learner creates an artifact from this module's tool (a script, a measurement, a small system, a corrected draft, a manifest, a worked plan), with build steps, a success check in the profile's `verification_mode` (`runnable`/`rubric`/`diff`/`estimate` — a non-code course must not claim "runnable"), and a stretch. Concepts alone are not enough; each module must let the learner build something.
- Lesson diagrams must be module-specific files, normally `guide/assets/diagrams/<module-id>.<ext>`. Do not reuse one shared course poster or overview image across all modules. The diagrams must also be checked in the rendered course shell so they fit inside the lesson section on desktop and mobile without overlap or page-level horizontal overflow.
- Every module must include a dedicated `Real-World Anchor`: an anchor example (`data-campus`) from the profile's `anchor_domain`, a useful metaphor (`data-metaphor`), and a boundary note (`data-boundary`). The section is required for every profile; the gate keys on the data attributes, not the literal word "campus", and the visible framing follows `anchor_label`.
- Every module must have 5-7 quiz questions.
- **Explanatory feedback (not answer-marking).** Every quiz item must carry an `explanation` that says why the correct answer is right AND names why the most tempting wrong answer fails (a distractor diagnosis). A quiz that only stores the correct index is a failure: a solo learner who picks wrong must learn the cause, not just see "Review this one."
- **Worked → faded → independent → far-transfer practice.** Practice must scaffold: one fully worked case, one faded case (steps blanked, with a hidden worked solution), one independent near-transfer task, and one far-transfer task whose surface features change. Each independent/transfer task ships a model answer or rubric. A jump from one worked example straight to broad tasks is a failure.
- **Self-assessment with a repair path.** Every `Make It Yours` and `Build it yourself` must include a 3-5 row rubric with observable criteria, a concrete pass threshold, one weak-answer example, and an explicit "if you miss X, do Y before moving on." Completion is a mastery decision, not a button.
- **Concrete, course-correcting misconception repair.** Each `Common Trap` must name the wrong belief, why it is tempting, a diagnostic case that exposes it, and the repair move. Generic placeholders ("treating X as a memorized keyword") are a failure.
- Every course must have at least 3 interactive labs.
- Every lab must be insight-focused, not a bare calculator: scenario, experiment, simple metaphor, output interpretation, try-next comparison prompts, reflection prompts, and real-world transfer.
- Every course must have a glossary.
- Every course must include `DESIGN_SYSTEM.md` and `UI_UX_REVIEW.md`.
- Every course UI must follow the tiny design-system contract.
- If `PROFILE.md` enables problem-first mode, the course must include a
  diagnostic-backed `PROBLEM_LADDER.md` with real learner problems, prerequisite
  checks, hidden concepts, artifacts, active prompts, progression from easy to
  capstone, and safety redirects for unsafe operational requests.
- If `PROFILE.md` enables `resource_library`, the course must include a curated external resource library: `RESOURCE_LIBRARY.md` plus a rendered Resources page/tab. It must map YouTube/videos, books, free courses, slide decks, docs, and references to modules/concepts with a clear learner use case.
- Tests must enforce the course structure.
- Tests must enforce the design-system and accessibility contract.
- The course must run as static HTML/CSS/JS without a backend.

## Subject-Matter Depth

A course is not acceptable if module bodies are only template language with swapped nouns.

For each subject, define:

- primitive objects
- standard representations
- evidence checks
- common misconceptions
- transfer tasks
- suitable labs
- problem statements a real learner would care about before knowing the subject's
  vocabulary
- prerequisites needed to solve those problems safely and honestly

Examples:

- Physics: objects, interactions, conservation, units, diagrams, limiting cases.
- Chemistry: atoms, bonds, charge, matter balance, mechanisms, spectra, concentrations.
- Maths: definitions, hypotheses, proof steps, examples, counterexamples.
- Biology: scale, mechanisms, controls, variation, evolution, systems.
- Computer Science: inputs, outputs, state, invariants, resources, failure modes.
- Game Theory: players, actions, information, beliefs, payoffs, deviations.
- Information Theory: random variables, distributions, codes, channels, operational limits.

## Learning Design Depth

Every module should force:

- retrieval from memory
- one tiny case
- one misconception correction
- one transfer variant
- one teach-back explanation
- one explicit confusion-repair move, phrased as a misconception, boundary case, counterexample, diagram check, definition check, or calculation check
- one real-world simple example and one accurate metaphor appropriate for the profile's audience
- one boundary note explaining where the real-world example or metaphor stops working

Completion means the learner can explain, compute or apply, stress-test, and transfer the idea.

The learning method should be invisible to the learner as a named method. Implement it through the lesson flow:

- purpose through the opening puzzle
- simple model before formalism
- concrete example before broad practice
- recall prompts before completion
- misconception or boundary checks for gap repair
- transfer tasks that change assumptions
- problem ladders that start from familiar decisions and move toward advanced
  judgment when problem-first mode is enabled

Do not expose learner-facing labels such as `fast learning loop`, `learning loop`, or `Concept Learning Loop`. Do not expose author-facing labels such as `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`.

## Static Check Requirements

The static check reads `PROFILE.md` and asserts the profile-appropriate version of
each gate below. For optional modes, the detailed reference files are canonical
(`problem-first-course.md` and `resource-library.md`); this section summarizes the
cross-course gates so generated courses wire the checks into their local test
suite. It must fail if:

- module count or track split does not match `PROFILE.md` (`module_count`/`track_split`)
- required module file is missing
- required sections are missing
- module-specific lesson diagrams are missing, repeated across modules, not referenced from `assets/diagrams/`, or not present on disk
- a module lacks a `Real-World Anchor` with the `data-campus` anchor example, `data-metaphor` useful metaphor, and `data-boundary` boundary check (keyed on the attributes, not the literal word "campus")
- quiz coverage is missing, shallow, or outside the 5-7 question range
- lab definitions are invalid or lack insight/metaphor/try-next interpretation prompts
- glossary is too small
- `COURSE_REVIEW.md` is missing
- `DESIGN_SYSTEM.md` is missing
- `UI_UX_REVIEW.md` is missing
- required design tokens are missing
- the page lacks a skip link
- progress lacks an accessible label
- a `numeric`/`text` lab lacks invalid-state support (`choice`/`self-rating`/`compare` labs are exempt per the profile's `lab_interactions`, but must still produce interpreted feedback)
- completion-button state support is missing
- placeholder text remains
- learner-facing course content exposes meta-method labels such as `fast learning loop`, `learning loop`, or `Concept Learning Loop`
- learner-facing course content exposes author-facing labels such as `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`
- lesson-level generated/image-backed diagrams, college metaphors, simple examples, or real-world anchors are missing
- a shared image such as `generated-course-diagrams.png` is used as the lesson diagram for multiple modules
- the course-overview asset `course-visual-models.svg` does not reference this course (its text must contain the course title or one of its track names, so a copied engine cannot ship another course's overview)
- after removing the module title, two modules share an identical metaphor, simple example, anchor example, useful metaphor, quiz stem, or diagram label set (title-swapped boilerplate). Tokens listed in the profile's `canonical_tokens` (a fixed alphabet like the 12 notes, `I–IV–V`, `C–E–G`) are exempt from the diagram-label and quiz-stem duplication check, since reusing them across modules is legitimate; per-module prose must still be unique
- any quiz uses a banned generic study-skill stem instead of testing the module's actual subject reasoning
- a scaffolding `kicker`/eyebrow such as `Visual anchor` appears, or worksheet card labels (`College metaphor`, `Simple example`, `What to test`, `Useful metaphor`) are used as visible headings instead of natural prose with `data-` attributes
- a `Figure It Out From Scratch` grid card is a dense paragraph instead of a `card-lead` bold lead plus a `card-points` bullet list, or any such card exceeds ~25 words
- any quiz item lacks an `explanation` / distractor diagnosis (answer-marking only)
- practice is not a worked → faded → independent → far-transfer sequence, or independent/transfer tasks ship no model answer or rubric
- a `Make It Yours` or `Build it yourself` task has no rubric, pass threshold, weak-answer example, or repair path
- a `Common Trap` uses a generic placeholder (e.g. "memorized keyword") instead of a named wrong belief + diagnostic case + repair move
- a transfer prompt is generic ("change one assumption in a problem about {module title}") instead of naming the original case, the changed surface case, the invariant, and the broken assumption
- a module reuses a banned generic scenario list (e.g. "a backpack, bike, elevator, ball, circuit kit, lab cart, or cooling drink") or repeats a lab `metaphor`/`insight`/`tryNext` verbatim across labs
- two `h2` section titles are duplicated within one module (e.g. two `Where this shows up` blocks)
- learner-facing prose breaks the Writing Voice rules: em-dash connectors, throat-clearing openers, or binary-contrast ("not X, but Y") constructions
- `PROFILE.md` enables `problem_first.enabled` and `PROBLEM_LADDER.md` is missing
- `PROFILE.md` enables `problem_first.enabled` and the diagnostic lacks goal, current
  level, known terms, math/formal comfort, domain contexts, depth, time budget,
  or safety boundaries
- `PROFILE.md` enables `problem_first.enabled` and the problem count or
  `problem_first.track_split` does not match the profile
- a problem-first title is only a technical term instead of a real question
- a problem-first row lacks learner need, starting intuition, prerequisite check,
  hidden concepts, expert terms introduced, artifact, difficulty, or safety level
- two problem-first rows share the same learner need or starting intuition
- the problem ladder does not progress from easy to working to hard/capstone
- a later problem lacks `extends_from` and `changed_assumption`
- a problem-first lesson introduces expert terms before the problem creates the
  need for them. Mechanical proxy: learner-visible strings from
  `expert_terms_introduced` must not appear before the `expert-name` section,
  except inside machine-readable data attributes
- an unsafe operational problem is included without a safe redirect, or the
  course includes instructions for explosives, weapons, poisons, evasion, fraud,
  illegal access, or other direct harm
- a problem-first lesson lacks prediction, discrimination, and transfer prompts
- `PROFILE.md` enables `resource_library` and any resource is missing title, type, provider, creator/institution, HTTPS URL, level, cost, time, module/concept mapping, `use_when`, or `why_this`
- `PROFILE.md` enables `resource_library` and there is no rendered Resources page/tab in the guide
- a YouTube resource uses a non-YouTube URL, an autoplay embed, or an iframe missing `title` / `loading="lazy"`
- an external resource link opens in a new tab without `rel="noopener noreferrer"`
- a resource library item is a generic search result with no course-specific rationale

## Browser Smoke Requirements

The browser test must cover:

- homepage render
- first module route/load
- required learning sections visible
- lesson diagram image renders in the module
- lesson diagram placement is checked on desktop and mobile: image visible, contained inside the section, no overlap, and no viewport horizontal overflow
- real-world anchor renders in the module
- for a `numeric`/`text` lab: invalid input shows a validation message (`aria-invalid`); valid input computes output. For a `choice`/`self-rating`/`compare` lab (per the profile's `lab_interactions`): there is no invalid state, and the gate instead requires that an interaction produces interpreted feedback
- lab shows scenario, try-this steps, result interpretation, try-next prompts, reflection, and real-world transfer
- quiz answer shows feedback
- marking a module updates progress
- marking a module updates button text/state
- tabs are keyboard accessible
- skip link exists
- progress is accessible by label
- mobile section jump links remain available
- if `problem_first.enabled` is true: Problems page/tab loads first in
  `problem_first` mode, or a clear Problems-vs-Concepts choice appears first in
  `hybrid` mode; problem cards show difficulty, learner need, prerequisite check,
  and artifact; selecting a problem moves focus to the problem reader; and at
  least one active prompt accepts an answer and shows feedback
- if `resource_library.enabled` is true: Resources page/tab loads, filters work, at least one video and one reading/course resource render, links are focusable, and any video embed is lazy-loaded, titled, and contained on mobile

## Publishing Requirements

Before reporting completion:

- tests passed
- git status clean
- pushed to private GitHub repo
- remote visibility verified
- default branch verified
- commit hash reported

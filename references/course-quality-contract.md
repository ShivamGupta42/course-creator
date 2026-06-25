# Course Quality Contract

Use this contract when creating or upgrading a course.

## Non-Negotiables

- 25 modules exactly unless the user requests a different size.
- 3 tracks: foundations, intermediate toolkit, advanced/projects.
- Personalized builds must include `DOMAIN_MODEL.md`, `PERSONALIZATION.md`, and `MASTERY_EVIDENCE.md`; include `EXTERNAL_BENCHMARKS.md` when credible public checks exist.
- Personalization decisions must cite intake or diagnostic evidence. Do not use social identity as an ability proxy.
- Every course must define a domain concept universe: primitives, prerequisites, standard representations, misconceptions, boundary cases, transfer families, and benchmark mappings where available.
- Every module must use learner-friendly sections: `Picture the Idea`, `Figure It Out From Scratch`, `How to Reason About This`, `Core Ideas`, `Real-World Anchor`, `Try a Small Case`, `Common Trap`, `Check Your Understanding`, `Practice in Levels`, and `Make It Yours`.
- Every module must include competence-gate evidence: prerequisite check, analogy mapping, tiny formal case, boundary test, transfer family, confidence prompt, and repair path.
- The six `Figure It Out From Scratch` cards must each be scannable: a bold one-clause lead (`p.card-lead`) plus a short bullet list (`ul.card-points`), the whole card under ~25 words. Dense 60-80 word paragraphs inside these cards are a failure. The `Explain It to a Friend` teach-back stays a short prose paragraph.
- Every module must include a unique generated or image-backed lesson diagram, one simple real-world example, one college-student-friendly metaphor, and one changed-case transfer check.
- Per-module wrapper content (metaphor, simple example, campus example, "what to test", first-principles paragraphs, quiz stems, diagram labels) must be genuinely module-specific. Title-swapped boilerplate is a failure: after removing the module title, none of these may be identical across two modules. Do not reuse one course-wide metaphor or one shared example list for all modules.
- Quiz questions must test the module's real subject reasoning. Generic study-skill stems ("What shows real understanding of X", "best first check for X", "Which metaphor fits this module best", "intuition breaks in X", "good transfer task for X") are banned.
- Prose must follow the Writing Voice rules: no throat-clearing openers, emphasis crutches, business jargon, adverbs/hedges, binary-contrast or negative-listing structures, dramatic fragmentation, rhetorical setups, or em-dash connectors. Active voice, varied rhythm, no announced insight.
- Modules must read like a course, not a labeled worksheet. Do not expose scaffolding kickers or card labels (`Visual anchor`, `College metaphor`, `Simple example`, `What to test`) as visible headings. Weave the metaphor, example, change-one-thing prompt, campus example, and boundary note into prose, tagged with hidden data attributes (`data-example`, `data-metaphor`, `data-test`, `data-campus`, `data-boundary`) for the test suite.
- Lesson diagrams must explain and simplify the idea, not be labeled placeholders. Prefer rich generated infographics (Codex `image_gen`, saved as `<module-id>.png`); fall back to the deterministic SVG engine when generation is unavailable or a crisp formula matters. Never hand-place coordinates. Keep generated-image text short (formulas go in the body). Diagrams must be unique per module (content hash for raster, label text for SVG) and pass the placement smoke test.
- Every module includes a hands-on `Build it yourself` project (`data-build-project`): the learner creates an artifact from this module's tool (a script, a measurement, a small system), with build steps, a runnable success check, and a stretch. Concepts alone are not enough; each module must let the learner build something.
- Lesson diagrams must be module-specific files, normally `guide/assets/diagrams/<module-id>.<ext>`. Do not reuse one shared course poster or overview image across all modules. The diagrams must also be checked in the rendered course shell so they fit inside the lesson section on desktop and mobile without overlap or page-level horizontal overflow.
- Every module must include a dedicated `Real-World Anchor` with `Campus example`, `Useful metaphor`, and `Where it can mislead`.
- Every module must have 5-7 quiz questions.
- Every quiz or reasoning gate should capture confidence before feedback when the course declares confidence-calibrated mastery.
- Quiz distractors should map to real misconceptions when the quiz format supports tagging or explanations.
- **Explanatory feedback (not answer-marking).** Every quiz item must carry an `explanation` that says why the correct answer is right AND names why the most tempting wrong answer fails (a distractor diagnosis). A quiz that only stores the correct index is a failure: a solo learner who picks wrong must learn the cause, not just see "Review this one."
- **Worked → faded → independent → far-transfer practice.** Practice must scaffold: one fully worked case, one faded case (steps blanked, with a hidden worked solution), one independent near-transfer task, and one far-transfer task whose surface features change. Each independent/transfer task ships a model answer or rubric. A jump from one worked example straight to broad tasks is a failure.
- **Self-assessment with a repair path.** Every `Make It Yours` and `Build it yourself` must include a 3-5 row rubric with observable criteria, a concrete pass threshold, one weak-answer example, and an explicit "if you miss X, do Y before moving on." Completion is a mastery decision, not a button.
- **Concrete, course-correcting misconception repair.** Each `Common Trap` must name the wrong belief, why it is tempting, a diagnostic case that exposes it, and the repair move. Generic placeholders ("treating X as a memorized keyword") are a failure.
- Every course must have at least 3 interactive labs.
- Every lab must be insight-focused, not a bare calculator: scenario, experiment, simple metaphor, output interpretation, try-next comparison prompts, reflection prompts, and real-world transfer.
- Every course must have a glossary.
- Every course must include `DESIGN_SYSTEM.md` and `UI_UX_REVIEW.md`.
- Every course UI must follow the tiny design-system contract.
- Tests must enforce the course structure.
- Tests must enforce the design-system and accessibility contract.
- The course must run as static HTML/CSS/JS without a backend.

## Subject-Matter Depth

A course is not acceptable if module bodies are only template language with swapped nouns.

For each subject, define:

- primitive objects
- prerequisite graph
- concept clusters
- standard representations
- evidence checks
- common misconceptions
- boundary cases
- transfer tasks
- suitable labs
- external benchmarks where available

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
- one real-world simple example and one accurate metaphor appropriate for a college student
- one boundary note explaining where the real-world example or metaphor stops working

Completion means the learner can explain, compute or apply, stress-test, and transfer the idea.

Completion must distinguish orientation from competence. A high-level explanation is only trustworthy when the learner can connect it to primitives, assumptions, a representation, a tiny formal case, a boundary condition, and a changed transfer case.

The learning method should be invisible to the learner as a named method. Implement it through the lesson flow:

- purpose through the opening puzzle
- simple model before formalism
- concrete example before broad practice
- recall prompts before completion
- misconception or boundary checks for gap repair
- transfer tasks that change assumptions

Do not expose learner-facing labels such as `fast learning loop`, `learning loop`, or `Concept Learning Loop`. Do not expose author-facing labels such as `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`.

## Static Check Requirements

The static check must fail if:

- module count is wrong
- a personalized build is missing `DOMAIN_MODEL.md`, `PERSONALIZATION.md`, or `MASTERY_EVIDENCE.md`
- personalization claims or route decisions lack intake or diagnostic evidence
- social identity is used as a proxy for ability
- the domain model lacks primitives, prerequisites, representations, misconceptions, boundary cases, and transfer families
- required module file is missing
- required sections are missing
- module-specific lesson diagrams are missing, repeated across modules, not referenced from `assets/diagrams/`, or not present on disk
- a module lacks a `Real-World Anchor` with a campus example, useful metaphor, and boundary check
- quiz coverage is missing, shallow, or outside the 5-7 question range
- lab definitions are invalid or lack insight/metaphor/try-next interpretation prompts
- glossary is too small
- `COURSE_REVIEW.md` is missing
- `DESIGN_SYSTEM.md` is missing
- `UI_UX_REVIEW.md` is missing
- required design tokens are missing
- the page lacks a skip link
- progress lacks an accessible label
- lab invalid-state support is missing
- completion-button state support is missing
- placeholder text remains
- learner-facing course content exposes meta-method labels such as `fast learning loop`, `learning loop`, or `Concept Learning Loop`
- learner-facing course content exposes author-facing labels such as `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`
- lesson-level generated/image-backed diagrams, college metaphors, simple examples, or real-world anchors are missing
- a shared image such as `generated-course-diagrams.png` is used as the lesson diagram for multiple modules
- the course-overview asset `course-visual-models.svg` does not reference this course (its text must contain the course title or one of its track names, so a copied engine cannot ship another course's overview)
- after removing the module title, two modules share an identical College metaphor, Simple example, Campus example, Useful metaphor, quiz stem, or diagram label set (title-swapped boilerplate)
- any quiz uses a banned generic study-skill stem instead of testing the module's actual subject reasoning
- a scaffolding `kicker`/eyebrow such as `Visual anchor` appears, or worksheet card labels (`College metaphor`, `Simple example`, `What to test`, `Useful metaphor`) are used as visible headings instead of natural prose with `data-` attributes
- a `Figure It Out From Scratch` grid card is a dense paragraph instead of a `card-lead` bold lead plus a `card-points` bullet list, or any such card exceeds ~25 words
- any quiz item lacks an `explanation` / distractor diagnosis (answer-marking only)
- a quiz or declared confidence-calibrated reasoning gate lacks a confidence-before-feedback prompt
- quiz distractors are generic rather than misconception-linked where the format supports diagnosis
- a module lacks a prerequisite check, analogy map, tiny formal case, boundary test, transfer family, confidence prompt, or repair path
- a module completion gate can be satisfied by reading alone instead of mastery evidence
- a personalized analogy lacks explicit source/target mappings and a boundary
- a route skips prerequisites without diagnostic evidence
- practice is not a worked → faded → independent → far-transfer sequence, or independent/transfer tasks ship no model answer or rubric
- a `Make It Yours` or `Build it yourself` task has no rubric, pass threshold, weak-answer example, or repair path
- a `Common Trap` uses a generic placeholder (e.g. "memorized keyword") instead of a named wrong belief + diagnostic case + repair move
- a transfer prompt is generic ("change one assumption in a problem about {module title}") instead of naming the original case, the changed surface case, the invariant, and the broken assumption
- a module reuses a banned generic scenario list (e.g. "a backpack, bike, elevator, ball, circuit kit, lab cart, or cooling drink") or repeats a lab `metaphor`/`insight`/`tryNext` verbatim across labs
- two `h2` section titles are duplicated within one module (e.g. two `Where this shows up` blocks)
- learner-facing prose breaks the Writing Voice rules: em-dash connectors, throat-clearing openers, or binary-contrast ("not X, but Y") constructions

## Browser Smoke Requirements

The browser test must cover:

- homepage render
- first module route/load
- required learning sections visible
- lesson diagram image renders in the module
- lesson diagram placement is checked on desktop and mobile: image visible, contained inside the section, no overlap, and no viewport horizontal overflow
- real-world anchor renders in the module
- invalid lab input shows a validation message
- valid lab input computes output
- lab shows scenario, try-this steps, result interpretation, try-next prompts, reflection, and real-world transfer
- quiz answer shows feedback
- marking a module updates progress
- marking a module updates button text/state
- tabs are keyboard accessible
- skip link exists
- progress is accessible by label
- mobile section jump links remain available

## Publishing Requirements

Before reporting completion:

- tests passed
- git status clean
- pushed to private GitHub repo
- remote visibility verified
- default branch verified
- commit hash reported

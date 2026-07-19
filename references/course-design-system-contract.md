# Course Design System Contract

Use this contract whenever creating, reviewing, or upgrading a course UI.

## Product Principle

The course should feel like a learning workbench, not a landing page. Prioritize scanability, sustained reading, clear practice loops, accessible interaction states, and visible mastery progress.

Use mature online-course structure as the baseline: learners should quickly answer “what is in this course?”, “where am I?”, “what should I do next?”, and “how does this apply?” Default to an Educative-style course shell: persistent outline navigation on desktop, an outline drawer on mobile, and a focused reader as the primary surface. Keep visual styling calm and subordinate to navigation, reading, labs, and progress. Do not let decorative cards, oversized hero treatment, or dense side panels make the course harder to use than a simple outline-and-reader layout.

The fastest-learning method should be encoded in the course structure, not presented as a branded learner-facing method. Use the module sequence itself to create the behavior: puzzle, plain model, tiny case, active recall, misconception repair, and transfer. Do not add visible meta-method labels such as `fast learning loop`, `learning loop`, or `Concept Learning Loop`. Also avoid author-facing headings such as `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, and `Portfolio Deliverable`.

Every lesson needs its own diagram. Generate it from a deterministic layout engine (archetypes plus a per-module data spec) so text never overlaps connector lines or escapes its box, and so formulas stay crisp. The diagram must be module-specific (distinct labels and values), explanatory, and connected to the lesson. A single shared course poster is acceptable only as a course-level overview, never as the repeated lesson diagram.

Write lessons as prose, not a labeled worksheet. Do not show scaffolding kickers or card labels such as `Visual anchor`, `College metaphor`, `Simple example`, `What to test`, or stacked `Useful metaphor` cards. Weave the metaphor, the concrete college example, the change-one-thing prompt, the campus example, and the boundary note into flowing paragraphs, and tag those paragraphs with hidden data attributes (`data-example`, `data-metaphor`, `data-test`, `data-campus`, `data-boundary`) so the test suite can still enforce presence and module-specific uniqueness. Apply the Writing Voice rules from the skill: no throat-clearing, no adverbs/hedges, no binary-contrast or negative-listing structures, no em-dash connectors, active voice.

## Required Artifacts

Every course repo must include:

- `DESIGN_SYSTEM.md`
- `UI_UX_REVIEW.md`
- Design tokens in `guide/css/styles.css`
- Static checks that enforce the design-system artifact and token contract
- Smoke tests that exercise the main accessibility and responsive behaviors

## Token Contract

Use semantic aliases so future course templates can change palettes without rewriting components:

- `--color-bg`
- `--color-surface`
- `--color-surface-muted`
- `--color-text`
- `--color-muted`
- `--color-border`
- `--color-brand`
- `--color-brand-strong`
- `--color-brand-soft`
- `--color-accent`
- `--color-accent-text`
- `--color-focus`
- `--color-success`
- `--color-warning`
- `--color-danger`
- `--space-1` through `--space-7`
- `--radius-1`
- `--radius-2`
- `--shadow-1`
- `--shadow-2`
- `--measure`
- `--target-min`

Use one subject-specific primary accent and one secondary accent, but do not use weak secondary colors directly for small text. Create text-safe aliases such as `--color-accent-text`.

## Component Contract

Every course UI should implement or style these component roles:

- `CourseHeader`: sticky, compact, course identity, section navigation, and mobile outline toggle.
- `CourseOutline`: persistent desktop module outline with active, completed, collapsed, and current states.
- `MobileCourseNav`: outline drawer plus section jump links stay available on small screens.
- `Hero`: course title, promise, and guiding question only.
- `CourseMap`: compact visual diagram of the 3-track learning journey, grounded in actual modules.
- `ProblemLadder`: optional problem-first view with problem cards grouped by
  difficulty/track, showing learner need, prerequisite check, artifact, and
  status without leading with expert vocabulary.
- `VisualModels`: course-level generated/image-backed visual models that show how experts sketch primitives, evidence, and transfer checks.
- `TrackTabs`: 3 course tracks, keyboard arrow navigation, selected state.
- `ModuleCard`: status badge, title, summary, concepts, current state, completed state.
- `ProgressPanel`: labeled progress indicator, text summary, and a clear continue/resume action.
- `ReaderSection`: primary reading flow with readable measure and focus/scroll behavior after module selection.
- `LessonDiagram`: lesson-level diagram with a unique module-specific image, sketching prompt, simple example, college metaphor, and changed-case test. Prefer a distinct generated infographic per module (`guide/assets/diagrams/<module-id>.png`); fall back to the SVG engine when a crisp formula matters. Because the image is a rich teaching infographic, render it at **full reader/content width** with the example/metaphor/test prose stacked below it — do not crush it into a narrow side column (a 2-column `.lesson-diagram` grid like `1fr 0.85fr` makes the diagram unreadable). The image and its notes must stay inside the reader width on desktop and mobile, stack cleanly on small screens, and never create page-level horizontal scrolling.
- `RealWorldAnchor`: compact section with `Campus example`, `Useful metaphor`, and `Where it can mislead`.
- `LearningPanel`: first-principles and reasoning sections, without internal author-facing labels.
- `ToolCard`: labs and quizzes with validation, feedback, concrete scenario, experiment steps, insight interpretation, try-next comparison prompts, reflection prompts, simple metaphor, and real-world transfer. If a quiz question is a `<fieldset>`/`<legend>`, the legend must be a full-width block (`legend { float: left; width: 100%; }` with the following control cleared) so a long, wrapping question never straddles or overlaps the card border.
- `ProblemPrompt`: optional problem-first prompt block with staged prediction,
  discrimination, and transfer answers. The first pass asks only for a rough
  explanation or nearby prediction; later practice introduces discrimination
  and transfer. It must show feedback near the answer and keep the final
  explanation hidden until the learner has tried.
- `PatternCard`: optional playbook card showing the move's plain name, the
  discipline's formal term, cue, steps, expert trace, misleads-when note, and
  contrast move. Scannable reference layout, no nested cards.
- `PatternDrill`: optional pick-the-move drill with a fresh mini-problem, 3-4
  candidate patterns, one choice control, and feedback that names why the best
  move fits and where the tempting alternative stalls. Feedback appears near the
  choice and stays hidden until the learner picks.
- `GlossaryPanel`: compact term/definition reference.
- `StatusBadge`: open/done/reading/lab/project state labels.
- `Callout`: note, tip, warning, and misconception states.

## Accessibility Contract

The UI must include:

- A skip link to the main study area.
- Visible `:focus-visible` styles.
- Accessible labels for progress indicators.
- `aria-invalid` on invalid lab inputs.
- Error text close to the failing tool output.
- Stateful completion controls using text and `aria-pressed`.
- Keyboard-operable tabs.
- Minimum target size via `--target-min`.
- No horizontal scrolling on mobile.
- Lesson diagrams, tables, code blocks, and long labels must use shrinkable containers or local scrolling so they do not widen the page.

## Static Check Requirements

The static check must fail if:

- `DESIGN_SYSTEM.md` is missing.
- `UI_UX_REVIEW.md` is missing.
- The CSS is missing required semantic tokens.
- The page lacks a skip link.
- The page lacks a course-map diagram.
- The page lacks generated/image-backed VisualModels diagrams.
- A module lacks a unique module-specific lesson diagram, simple example, college metaphor, or changed-case visual prompt.
- Per-module wrapper content is title-swapped boilerplate: after removing the module title, two modules share an identical metaphor, simple example, campus example, quiz stem, or diagram label set.
- Multiple modules reuse the same lesson diagram source, or a lesson diagram points to a shared course overview instead of `assets/diagrams/<module-id>.<ext>`.
- A module lacks a `Real-World Anchor` with a campus example, useful metaphor, and boundary check.
- The page lacks an accessible progress label.
- App code lacks invalid-input state support.
- App code lacks completion-button state support.
- App code lacks reader focus/scroll behavior after module card selection.
- The course lacks persistent outline navigation or a mobile outline drawer.
- Lab definitions are bare calculators without scenario, experiment, reflection, and transfer context.
- `PROFILE.md` enables problem-first mode but the UI lacks a problem ladder or
  problem-reader state.
- `PROFILE.md` enables `thinking_patterns` but the UI lacks a rendered pattern
  playbook or selection-drill state.
- Learner-facing content exposes named teaching-method branding instead of using course-native first-principles language.
- Learner-facing content exposes meta-method labels such as `fast learning loop`, `learning loop`, or `Concept Learning Loop`.
- Learner-facing content exposes author-facing headings such as `Dual-Expert Review Upgrade`, `Worked Example`, `Retrieval Prompts`, `Practice Ladder`, or `Portfolio Deliverable`.
- Quizzes have fewer than 5 or more than 7 questions per module.
- Quiz options do not align cleanly as a radio/control plus readable text row.
- Labs lack insight interpretation or try-next comparison prompts.

## Browser Smoke Requirements

The browser test must cover:

- Homepage render.
- Skip link existence.
- Accessible progress indicator.
- First module load.
- Module card selection moves focus to the reader so the click visibly does something.
- Course-map diagram renders.
- Lesson diagram image renders in the first module.
- Real-world anchor renders in the first module.
- Invalid lab input sets visible feedback and invalid state.
- Valid lab input computes output.
- Lab card shows scenario, try-this steps, result interpretation, try-next prompts, reflection, and real-world transfer.
- If problem-first mode is enabled, the problem ladder renders and one active
  prompt produces visible feedback.
- If the thinking-pattern playbook is enabled, a pattern card renders with its
  cue and steps, and one selection drill accepts a choice and shows feedback.
- Generated/image-backed VisualModels diagrams render on the course home.
- Quiz answer shows feedback.
- Completion control updates text/state and progress.
- Track tabs are keyboard accessible.
- Mobile section jump links remain available.
- Lesson diagram placement is verified on desktop and mobile: the image loads, is visible, stays inside the visual section, does not overlap adjacent text/cards, and does not cause viewport horizontal overflow.

## Review Notes

`UI_UX_REVIEW.md` should document:

- Product-designer findings.
- Improvements made.
- Remaining opportunities.
- Any intentionally preserved shell differences, such as sidebar navigation versus split dashboard layout.
- How learner-facing labels were kept friendly and author-facing scaffolding labels were avoided.
- How diagrams, metaphors, examples, quizzes, and insight labs support understanding rather than decoration.
- How real-world anchors make examples and metaphors concrete while naming where they stop applying.

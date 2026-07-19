# Problem-First Course Mode

Use this contract when the learner wants to learn a subject by solving concrete
problems before learning the subject's vocabulary. This is an extension of the
standard course format, not a replacement. A course can be:

- `concept_first`: the existing module map, with problem framing inside modules.
- `problem_first`: a problem ladder, default 20 problems, where each lesson
  starts from a real problem and introduces concepts only when the problem needs
  them.
- `hybrid`: the existing module map plus a problem ladder that can be studied
  first, alongside, or after the concept modules.

## Principle

A learner with no external obligation will not start with "What is a Nash
equilibrium?" or "What are atomic models?" They start with a problem they care
about: "Why did this negotiation collapse?", "Can I trust this test result?",
"Is this food unsafe?", or "Which strategy should I pick when the other person
can react?" The course earns technical vocabulary by making it useful.

Problem-first means:

- The visible title is a useful question, not a term.
- The first screen shows why the problem matters and what decision it helps.
- The first attempt uses the learner's current intuition.
- The formal idea appears only after the problem exposes the need for it.
- The expert term is named late, after the learner has felt the gap it solves.
- Each later problem is a natural extension of earlier problems.

## Diagnostic Intake

Before building a problem-first or hybrid course, run a short diagnostic. Ask in
one grouped pass unless the user has already answered the items. Record answers
in `PROFILE.md` under `problem_first.diagnostic`.

Required diagnostic fields:

```yaml
course_mode: problem_first
problem_first:
  enabled: true
  problem_count: 20
  track_split: [7, 7, 6]
  diagnostic:
    real_goal: "what the learner wants to do better"
    current_level: novice | beginner | working | advanced
    known_terms: []
    math_comfort: none | arithmetic | algebra | calculus | proof
    domain_contexts: []
    preferred_problem_domains: []
    time_budget: ""
    depth: intuition | practitioner | rigorous | research
    safety_boundaries: []
```

`course_mode` is the source of truth. Do not add a second `problem_first.mode`
field; it creates a drift path. If `problem_first.enabled` is true,
`course_mode` must be either `problem_first` or `hybrid`.

Ask for the minimum useful signal:

- Goal: what decision, work, hobby, exam, or life situation should this help?
- Current knowledge: what terms can they already explain without notes?
- Formal comfort: arithmetic, algebra, calculus, proofs, code, lab work, or none.
- Context: home, work, money, health, negotiation, engineering, school, art, etc.
- Depth: useful intuition, practitioner skill, rigorous theory, or research level.
- Constraints: time, tools, risk, legal/ethical boundaries, accessibility needs.

Do not use a diagnostic as an excuse to stall. If the user does not answer, use
safe defaults and record the assumptions in `PROFILE.md`.

## Problem Ladder

When `problem_first.enabled` is true, create `PROBLEM_LADDER.md` as the source of
truth. The default is 20 problems across 3 tracks:

- Track 1: everyday footholds, 7 problems.
- Track 2: useful tools, 7 problems.
- Track 3: advanced judgment and capstones, 6 problems.

Narrow subjects may declare fewer problems in `PROFILE.md` by setting both
`problem_first.problem_count` and `problem_first.track_split`. Do not pad a
narrow topic with fake problems.

Each problem row must include:

```yaml
- id: 03-trust-a-medical-test
  title: "Should I trust a positive test result?"
  track: "Everyday footholds"
  difficulty: easy | working | hard | capstone
  learner_need: "Avoid overreacting to a rare-condition test."
  starting_intuition: "Positive means probably true."
  prerequisite_check: "Can compare counts out of 1000."
  hidden_concepts: [base-rate, conditional-probability, false-positive]
  expert_terms_introduced: [base rate, Bayes rule]
  artifact: "a two-row frequency table and a one-sentence decision"
  safety_level: normal
  unsafe_boundary: ""
  safe_redirect: ""
  extends_from: ""
  changed_assumption: ""
```

The ladder must progress by problem shape, not by textbook order:

- easy: one decision, familiar context, low formal load.
- working: two or three moving parts, a tradeoff, or a surprising result.
- hard: multiple actors, uncertainty, feedback loops, constraints, or failure modes.
- capstone: a messy realistic case where the learner must choose the model.

Every problem must connect forward:

- "This problem extends problem X by changing Y."
- "The old method still works because Z."
- "The old method breaks because W."

## Safety And Scope

Problem-first courses use real problems, but they must not turn into operational
harm instructions.

Reject or redirect problem statements that ask for:

- explosives, weapons, poisons, harmful chemistry, or evasion of safeguards
- illegal access, fraud, credential theft, or stealth
- medical diagnosis or treatment instructions beyond education and triage
- self-harm, abuse, or other direct physical harm

For unsafe chemistry or engineering examples, keep the learning goal and change
the task. Example redirects:

- Unsafe: "How do I make an explosive at home?"
- Safe: "Why are some household chemicals dangerous to mix?"
- Safe: "How do investigators reason about reactive materials without handling
  them?"
- Safe: "How do batteries, pressure, heat, and oxidizers create safety hazards?"

The course may explain high-level principles, risk signs, history, or safety
reasoning. It must not provide recipes, quantities, procurement steps,
optimization tips, concealment, or troubleshooting for harmful outcomes.

## Problem Lesson Shape

A problem-first lesson is still a rigorous lesson. It can use the standard
module recipe, but the visible flow starts from the problem:

1. `The Problem`
2. `Your First Guess`
3. `What Information Matters`
4. `Build the Smallest Model`
5. `Try the Small Case`
6. `Where the First Guess Breaks`
7. `The Expert Name`
8. `Use It on a New Case`
9. `Check Your Judgment`
10. `Make It Yours`

Rules:

- Do not lead with the expert term unless the user already knows it and asked for
  a technical course.
- Introduce prerequisites as tools. Example: "We need ratios out of 1000" before
  "conditional probability."
- Keep formulas local to the problem. Explain what decision the formula changes.
- Ask the learner questions before explaining the full solution.
- Each lesson includes one "wrong but tempting" answer and why it fails.
- Each lesson ends with a real artifact: decision memo, table, sketch, estimate,
  script, rubric, comparison, or plan.

Problem-first lessons still need:

- a module-specific diagram
- retrieval prompts
- explanatory quiz feedback
- a practice ladder
- self-assessment and repair path
- boundary notes for where the model misleads

## Questioning During The Course

Problem-first mode should ask the learner questions, not just present answers.
Each problem needs a staged evidence ladder:

- first pass: one rough explanation or nearby prediction before the model;
- later discrimination: which fact matters once the learner has a usable model;
- later transfer: what changes after one assumption changes.

Do not present all three as first-pass demands. When the course runs through an
agent, read `tutor-loop.md`: reconstruct the learner's answer, repair
the first bottleneck, verify nearby use, and reserve discrimination and transfer
for advanced evidence.

For adaptive courses, use the diagnosed learner model to adjust:

- starting problem difficulty
- amount of math shown
- whether to introduce formal names now or later
- whether to add a prerequisite repair problem
- depth of proof, computation, or real-world examples

Record the evidence, blocking gap, chosen repair, and next probe in
`learner/state.md` and the session `LearningRecord` when the OKF learner layer is
enabled. Confidence alone does not determine any of these choices.

## Static Check Requirements

When `PROFILE.md` sets `problem_first.enabled: true`, the static check must fail
if:

- `PROBLEM_LADDER.md` is missing.
- `PROFILE.md` lacks `problem_first.diagnostic`.
- the problem count does not match `problem_first.problem_count`.
- a problem lacks learner need, starting intuition, prerequisite check, hidden
  concepts, artifact, and safety fields.
- a problem title is only a technical term instead of a real question. Mechanical
  proxy: the title must contain `?` or start with `how`, `should`, `when`, `why`,
  `what`, `which`, `can`, `is`, `do`, or `does`.
- a problem introduces expert terms before the lesson creates the need.
  Mechanical proxy: in the rendered problem lesson, learner-visible strings from
  `expert_terms_introduced` must not appear before
  `<section class="expert-name">`, except inside machine-readable data
  attributes.
- two problems have the same learner need or the same starting intuition.
- the ladder does not progress from easy to working to hard/capstone.
- a later problem lacks `extends_from` and `changed_assumption`.
- an unsafe problem is included without a safe redirect.
- a problem-first lesson lacks prediction, discrimination, and transfer prompts.

## Browser Smoke Requirements

When problem-first mode is enabled, the smoke test should cover:

- problem ladder or problem tab renders.
- in `problem_first` mode, the Problems view is the first route/tab; in `hybrid`
  mode, the first view offers a clear Problems-vs-Concepts choice.
- problem cards show difficulty, learner need, prerequisite check, and artifact.
- selecting a problem moves focus to the problem reader.
- at least one active prompt accepts an answer and shows feedback.
- unsafe redirects, if present, render as safety framing and not instructions.

## Final Reporting

When a course ships in problem-first or hybrid mode, report:

- mode: `problem_first` or `hybrid`
- problem count and track split
- diagnostic assumptions
- starting problem chosen and why
- how many expert terms were delayed until after a problem needed them
- any safety redirects

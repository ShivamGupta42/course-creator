# Thinking-Pattern Playbook Mode

Use this contract when a course should teach, explicitly, how practitioners of
the subject think: the recurring reasoning moves a discipline uses to attack a
problem, the cues that call for each move, and the judgment of picking the right
move for a new problem. This is the third optional layer of a course:

- Concept-first modules teach what the ideas are.
- The problem-first ladder teaches which real problems the subject solves.
- The thinking-pattern playbook teaches how the discipline attacks a problem.

The playbook extends the standard course. It never replaces modules or the
problem ladder, and any combination of the three layers is valid.

## Principle

How a mathematician attacks a problem is different from how a chemist or a game
theorist attacks one. A mathematician shrinks the problem to a tiny case, hunts
for an invariant, or tries to break the claim with a counterexample. A physicist
pushes a variable to an extreme, checks units, or asks what is conserved. A game
theorist sits in the other player's chair and reasons backward from the last
move. A chemist follows the energy and the electrons. These moves are the real
content of expertise, and most courses leave them implicit inside worked
examples.

This mode makes them explicit and trainable:

- Each pattern is a named move with a cue: what in a problem tells you to reach
  for it.
- Each pattern is demonstrated with an expert trace: a short think-aloud on a
  real course problem, including one considered-and-rejected move, so the
  learner sees selection happen, not just execution.
- Each pattern states where it misleads and which sibling move it is confused
  with.
- The learner drills selection, not just execution: mixed drills present a fresh
  problem and ask "which move do you reach for first, and why?"

Pattern names are subject content, not method branding. The ban on meta-method
labels (`fast learning loop`, `Concept Learning Loop`) covers the course's own
teaching machinery; it does not cover the discipline's reasoning moves, which
the learner must see, say, and use. Keep the visible pattern name a plain
imperative phrase ("Chase the extreme case", "Sit in the other player's chair"),
and give the discipline's formal term once inside the card ("experts call this
dimensional analysis" or "backward induction") so the learner can find it in
the literature.

## Intake Knob

Record this in `PROFILE.md`:

```yaml
thinking_patterns:
  enabled: true
  pattern_count: 10
  drill_count: 6
  display: page          # page | track_sections
```

Defaults:

- `enabled: false` unless the user asks for it, asks "how do experts think about
  X", or asks to learn the subject's way of thinking or problem-solving style.
- `pattern_count: 10`. Keep the playbook memorizable: 6-14 patterns. A subject
  with 30 patterns has not chosen; a subject with 3 is a slogan list. Narrow
  topics may declare fewer in `PROFILE.md`; do not pad.
- `drill_count: 6` mixed selection drills, minimum 4.
- `display: page`. `track_sections` folds pattern groups into the track pages
  instead of a dedicated tab; the playbook file is required either way.

## File Shape

When enabled, add:

```text
<subject-course>/
  THINKING_PATTERNS.md          # source of truth for the playbook
  guide/
    patterns.html               # or a Patterns route/view inside guide/index.html
```

Reuse the existing app shell for the Patterns tab/route. Do not add a second
app shell.

## Pattern Schema

`THINKING_PATTERNS.md` is the source of truth. Each pattern must carry:

```yaml
- id: chase-the-extreme-case
  name: "Chase the extreme case"
  formal_term: "limiting-case analysis"
  cue: "A formula or claim should hold everywhere and you cannot test everywhere."
  steps:
    - "Push one quantity to zero or to something huge."
    - "Say what the answer must become there, from common sense alone."
    - "Compare what the formula does against that prediction."
    - "If they disagree, decide which one is wrong and why."
  expert_trace: >
    On the projectile-range formula: "Before trusting this, set the launch angle
    to zero. The ball should go nowhere, and sin(0) kills the formula, good. I
    reached for Check the units first, but the derivation already forces the
    units, so the extreme case is the sharper test here."
  misleads_when: "The extreme sits outside the model's stated range, e.g. v near c in a Newtonian formula."
  contrast_with: check-the-units
  how_to_tell_apart: "Units catch a wrong kind of quantity; extreme cases catch wrong behavior of a dimensionally fine formula."
  modules: [04-projectile-motion, 12-oscillations]
  problems: []                  # problem ladder ids, when problem-first is enabled
```

Required fields per pattern:

- `id`, `name` (plain imperative phrase), `formal_term` (the discipline's name
  for the move, or `""` when the discipline has none)
- `cue`: the observable feature of a problem that calls for this move
- `steps`: 3-6 concrete steps, phrased with the subject's own objects
- `expert_trace`: a first-person think-aloud on one real course problem that
  names at least one move the expert considered and rejected
- `misleads_when`: one condition where the move gives a wrong or useless answer
- `contrast_with` + `how_to_tell_apart`: the sibling pattern learners confuse it
  with, and the deciding cue (the first pattern in a contrast pair may point
  forward to a later one; every pattern needs a named contrast)
- `modules`: at least 2 module ids where the course visibly uses the move
- `problems`: ladder ids when problem-first mode is enabled and the move appears
  in a problem lesson

## Domain-Specificity

The playbook must be the subject's playbook, not a generic study-skills list.

- Banned as pattern names or cues, in any subject: "break the problem into
  smaller parts", "draw a picture", "check your work", "think step by step",
  "consider all the options", "look for patterns". Each of these becomes legal
  only when rewritten with the discipline's objects: "shrink n until you can
  enumerate every case by hand" is a mathematics move; "draw the free-body
  diagram before any equation" is a physics move.
- Steps and cues must name the subject's primitives (the ones the quality
  contract's Subject-Matter Depth section defines). A pattern whose cue and
  steps still read correctly after swapping the subject noun for another subject
  fails, the same test the anti-templating gate applies to module prose.
- Patterns must be distinct: no two patterns in one course may share the same
  cue or the same contrast pairing in both directions.

Example playbook seeds per family (starting points, not a fixed list):

- Mathematics: shrink to a tiny case; hunt the invariant; try to break the claim
  with a counterexample; reduce it to a problem you already solved; chase the
  definition; argue from the extremal object.
- Physics: push a variable to the extreme; check what is conserved; check the
  units; estimate the order of magnitude before computing; idealize first, then
  put the mess back.
- Chemistry: follow the energy; follow the electrons; balance what cannot be
  created or destroyed; ask what the equilibrium wants; read structure to
  predict behavior.
- Game theory: sit in the other player's chair; reason backward from the last
  move; hunt for the dominated option; ask who knows what, and when; check
  whether anyone wants to deviate.
- Statistics: ask what the null world would produce; hunt the base rate; ask how
  the data was sampled before reading it; simulate before deriving.
- Computer science: name the invariant the loop keeps; ask what resource runs
  out first; make the failure case first-class; trace the smallest input that
  exercises every branch.

## Teaching The Patterns

Patterns are taught in three places, and all three are required when the mode is
enabled:

1. **The playbook view.** Each pattern renders as a card: name, cue, steps,
   expert trace, where it misleads, and its contrast move. Cards group by theme
   or track. The playbook is reference material; keep it scannable.
2. **Inside modules.** When a module's reasoning uses a playbook move, the
   `How to Reason About This` section says so in prose and tags it with
   `data-move="<pattern-id>"`. The learner meets each pattern where it earns its
   keep, then finds it again in the playbook. Every pattern's `modules` list
   must match real tags: each listed module tags the pattern at least once.
3. **Selection drills.** The playbook view ends with `drill_count` mixed drills,
   tagged `data-pattern-drill`. Each drill gives a fresh mini-problem (new
   surface, familiar depth), offers 3-4 candidate patterns from this course's
   playbook, and asks which move to reach for first. Feedback must say why the
   best move fits this cue and where the most tempting alternative stalls.
   Drills must draw problems from at least two tracks so selection is practiced
   across contexts, not within one topic.

When problem-first mode is also enabled, capstone problems must require pattern
selection explicitly: the artifact includes one sentence naming which moves the
learner chose and why. Tag it `data-move-choice` in the problem lesson.

When the OKF learner layer is enabled, record pattern mastery in
`learner/state.md` rows (one row per pattern id) so later sessions can bias
drills toward weak patterns.

## Static Check Requirements

When `PROFILE.md` sets `thinking_patterns.enabled: true`, the static check must
fail if:

- `THINKING_PATTERNS.md` is missing.
- the pattern count is outside 6-14 or does not match
  `thinking_patterns.pattern_count`.
- a pattern is missing any required field (`id`, `name`, `formal_term` key,
  `cue`, `steps`, `expert_trace`, `misleads_when`, `contrast_with`,
  `how_to_tell_apart`, `modules`).
- a pattern has fewer than 3 or more than 6 steps.
- a pattern's `modules` list has fewer than 2 entries, names a module id that
  does not exist, or names a module that never tags `data-move="<pattern-id>"`.
- a `data-move` tag in any module references a pattern id not in the playbook.
- an `expert_trace` does not mention a rejected alternative (mechanical proxy:
  it must reference a second pattern id or name from the playbook).
- a pattern name or cue matches the banned generic list ("break the problem into
  smaller parts", "draw a picture", "check your work", "think step by step",
  "consider all the options", "look for patterns") without discipline-specific
  objects added.
- two patterns share the same cue, or `contrast_with` does not point to a real
  pattern id in this playbook.
- there is no rendered Patterns page/tab (or track sections when
  `display: track_sections`).
- fewer than `drill_count` (minimum 4) `data-pattern-drill` blocks exist, a
  drill offers fewer than 3 candidate patterns, a drill's candidates are not all
  real playbook ids, or a drill lacks feedback text for the best and the
  tempting-wrong choice.
- all drills draw their mini-problems from a single track.
- problem-first capstones exist but no capstone carries a `data-move-choice`
  block (only when both modes are enabled).

## Browser Smoke Requirements

When the playbook is enabled, the smoke test should cover:

- Patterns page/tab (or track sections) renders.
- a pattern card shows name, cue, steps, expert trace, and the misleads note.
- a module that tags `data-move` renders the pattern reference in its
  `How to Reason About This` section.
- one selection drill accepts a choice and shows feedback that names why the
  best move fits and where the tempting alternative stalls.
- the playbook and drills are keyboard reachable and readable on mobile without
  horizontal overflow.

## Final Reporting

When a course ships with the playbook, report:

- pattern count and the pattern names
- how many modules tag at least one `data-move`
- drill count and which tracks the drills draw from
- whether problem-first capstones require a `data-move-choice`
- whether OKF pattern-mastery rows were seeded

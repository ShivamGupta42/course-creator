# Learner State and Knowledge as OKF-Style Files

This contract adds a *learner layer* and a *knowledge layer* to a course, both as
plain Open-Knowledge-Format-style files: Markdown with YAML frontmatter, one
mandatory `type` field, and cross-links between documents. It draws the stateful,
motivation-grounded ideas from tutoring skills into the course-creator format
without adding any runtime.

## The one rule: ship a format, not an engine

The coding agent that loads this skill (Claude Code or Codex) **is** the runtime.
Do not write a scheduler, a spacing algorithm, a progress daemon, or any script
that maintains learner state. Ship the file conventions below and let the agent
read and update them by judgment, the same way it already authors modules.

> Keep the state explicit enough that a loaded agent can update cross-references
> in one pass, and validation can catch broken links or missing types.

That is the whole bet. A spacing decision is the agent reading `learner/state.md`
at the start of a session and seeing what is due, not a cron job. A mastery
update is the agent appending to a record file after a session, not a database
write. Keep it light enough that a human can read every file and a different
agent can pick it up with no tooling.

## File shape (OKF conventions)

Every document is Markdown with YAML frontmatter. The only required field is
`type`. Cross-references are ordinary Markdown links to other files, which makes
the bundle a graph. Add a `timestamp` (ISO 8601) on anything the agent updates so
staleness is visible. Keep frontmatter minimal; put prose in the body.

```yaml
---
type: <one of the types below>     # required
title: <short human title>
timestamp: 2026-06-28T14:30:00Z    # on anything the agent maintains
---
Body in Markdown. Link to other docs with [text](../knowledge/entropy.md).
```

A course gains two directories on top of the existing `guide/`:

```text
<subject>-course/
  knowledge/                 # canonical, reusable, cited — the SHARED layer
    <concept>.md             # type: Concept
  learner/                   # the learner overlay — agent-maintained
    mission.md               # type: Mission
    state.md                 # type: LearnerState
    records/
      2026-06-28-entropy.md  # type: LearningRecord (one per study session)
  guide/                     # unchanged: the rendered course the learner reads
```

The `guide/` modules stay exactly as `module-recipe.md` defines them. The two new
directories are additive; an existing course works without them and gains the
learner layer the first time someone studies it.

## The knowledge layer vs the teaching layer

A module is allowed to reuse a *concept* but never a *way of teaching it*. Split
the two so the uniqueness gate in `course-quality-contract.md` still holds:

- **Knowledge layer** (`knowledge/<concept>.md`, `type: Concept`) is canonical and
  shared. One file per real concept: a plain definition, the formal statement,
  cited sources, and links to prerequisite concepts. Many modules may link the
  same concept. This is the only place reuse is allowed.
- **Teaching layer** (`guide/` modules) stays unique per module. The metaphor,
  example, diagram, and change-one-thing prompt are still module-specific and
  still fail the static check if title-swapped. A module *links* the concept it
  teaches; it does not copy the concept's prose.

```yaml
---
type: Concept
title: Entropy
sources:                                   # trustworthy, cited — never invented
  - https://en.wikipedia.org/wiki/Entropy_(information_theory)
prerequisites: [../knowledge/surprise.md]  # builds the prerequisite graph
timestamp: 2026-06-28T14:30:00Z
---
Average surprise of a source: the expected number of bits to name its outcome.
Formally `H(X) = -Σ p(x) log p(x)`. Taught in [the course map](../course.md).
```

**Where the module→concept edge lives.** Rendered modules are HTML fragments in
`guide/content/*.html` with no YAML frontmatter, so they cannot carry a `teaches:`
field of their own. Do not write `.md` links to module files: they will not
resolve (the file is `.html`), and the link-integrity check will flag every one.
Instead the module→concept edges live in **`course.md`** (see the Course schema
below), where each module row links the concept(s) it teaches. Concept files link
*other concepts* (`prerequisites:`) and may link back to `../course.md`; they do
not link individual module files. Concept↔concept `.md` links resolve and form the
prerequisite DAG; module→concept lookup is the `course.md` table.

### Course map (`course.md`, `type: Course`)

The curriculum map is itself an OKF document. Frontmatter carries the build shape;
the body is one table per track whose rows carry the module→concept edges. This is
the source of truth for which module teaches which concept.

```yaml
---
type: Course
title: Information Theory
tracks: 3
modules: 25
profile: ./PROFILE.md
timestamp: 2026-06-28T14:30:00Z
---
## Track 1 — Foundations (9 modules)

| # | id | Title | Teaches |
|---|----|-------|---------|
| 01 | 01-surprise | What surprise measures | [surprise](knowledge/surprise.md) |
| 03 | 03-entropy  | Entropy: average surprise | [entropy](knowledge/entropy.md) |
```

Those rows, plus each concept's `prerequisites:`, turn 25 flat modules into a
prerequisite graph the agent can walk when deciding what is next or what to review.

## The learner layer

Three document types, all agent-maintained, all readable by a human.

### Mission (`learner/mission.md`, `type: Mission`)

Why *this* person is learning, in their words. Grounds every later choice: which
anchors to specialize, what counts as "done", what to cut. Written once at intake
(extend the `AskUserQuestion` already in the intake step to capture the real goal,
not just build knobs), then revised only when the goal changes.

```yaml
---
type: Mission
timestamp: 2026-06-28T14:30:00Z
---
Wants to read research papers on LLM training and follow the information-theory
arguments without stalling on the math. Cares about mutual information and KL
divergence specifically. Has three weeks. Success = can re-derive the bound in a
paper they name, unaided.
```

The agent uses this to specialize `data-campus`/`data-example` anchors to the
learner's domain instead of the dorm-life default, and to prioritize the modules
that serve the stated goal. Capture what the learner explicitly does *not* want
alongside the goal — adjacent topics ruled out, formats they dislike, community
suggestions declined. An out-of-scope line is what stops a later session from
chasing a neighboring topic the learner already rejected.

### Learner state (`learner/state.md`, `type: LearnerState`)

One small, hand-readable table of where the learner stands per concept. This is
the file the agent reads at the start of a session to decide what to teach and
what is due for review. No algorithm computes it; the agent updates the rows from
what it observed.

```yaml
---
type: LearnerState
timestamp: 2026-06-28T14:30:00Z
---
| Concept | Strength | Last seen | Review when | Note |
|---|---|---|---|---|
| [surprise](../knowledge/surprise.md) | solid | 2026-06-26 | after entropy | clean teach-back |
| [entropy](../knowledge/entropy.md) | shaky | 2026-06-28 | next session | confused base-2 vs natural log |
| [mutual-information](../knowledge/mutual-information.md) | new | — | — | not started |
```

`Strength` is a plain label (`new` / `shaky` / `solid`), not a number, because a
human and an agent both read it the same way and nothing computes against it.
`Review when` carries the spacing decision as a note, not a date math — "next
session", "after entropy", "in a week". The agent honors it by reading it.

The knowledge/skill split decides how the agent acts on a row. For *knowledge* a
learner is shaky on, reduce difficulty: re-teach with lower working-memory load.
For a *skill* a learner has only seen worked, raise difficulty: a faded then
independent retrieval, spaced from when they last saw it. Difficulty is the enemy
of knowledge and the tool of skill; the row tells the agent which mode applies.

### Learning records (`learner/records/<date>-<topic>.md`, `type: LearningRecord`)

One short file per study session. The agent appends it after teaching, then
updates the matching rows in `state.md`. This is the persistent memory that lets a
later session pick up where the last left off instead of restarting cold.

```yaml
---
type: LearningRecord
covers: [../knowledge/entropy.md]
timestamp: 2026-06-28T15:10:00Z
---
Worked Module 03. Got the definition and the two-outcome case fast. Stumbled
where log base changes the units; fixed it by re-deriving bits vs nats from the
coin example. Breakthrough: saw why uniform maximizes entropy. Open gap: hasn't
applied it to a non-uniform source unaided — leave that as the next independent
task. Did not start mutual information.
```

**A record is earned by evidence, not coverage.** "Worked Module 03" alone is a
study log; what makes the file worth keeping is what the learner *demonstrated*
(the re-derivation, the unaided transfer), what they *disclosed* ("I already
know X", with the depth claimed, so no session re-teaches it), which
*misconception was corrected*, or how the *mission shifted*. Material that was
merely presented earns no strength upgrade in `state.md` — wait for the learner
to use it before marking anything `solid`. A corrected misconception is the
highest-value line in a record: it predicts stumbles on neighboring concepts,
so carry it forward into the `Note` column of the related `state.md` rows.

**Supersede, never rewrite.** When a later session shows an earlier record was
wrong (the understanding was shallower than it looked, or a "known" concept
collapses under transfer), do not delete or edit the old file. Add
`status: superseded` and `superseded_by: <newer record>` to its frontmatter and
link back from the new record. How the learner's understanding evolved is
itself signal: a concept superseded twice is one the agent should approach
differently, not just again.

## How the agent uses these files (no code, just a routine)

This replaces a spacing engine with a read-decide-write loop the agent runs by
judgment at study time:

1. **Read** `learner/mission.md` and `learner/state.md`. If they are absent, this
   is session one: write `mission.md` from the intake answers and seed `state.md`
   with the course's concepts as `new`.
2. **Decide** what to do this session from state, not from linear order: surface
   any concept whose `Review when` is due, re-teach `shaky` knowledge at lower
   load, push `solid` skills to the next rung of the practice ladder, then
   introduce the next `new` concept the prerequisite graph unlocks.
3. **Teach** using the existing `guide/` module, specializing anchors to the
   mission.
4. **Write** a `LearningRecord` and update the touched rows in `state.md`
   (strength, last seen, the next `Review when`). Bump the `timestamp`.

Every step is the agent reading and editing Markdown. Nothing schedules, nothing
runs in the background, nothing needs installing.

## What this does and does not change

- It does **not** change the rendered course or require a new runtime. `guide/`
  remains the teaching surface. Existing static/smoke checks can stay focused on
  rendered lessons, while an optional lightweight OKF check validates the overlay.
- It does **not** introduce a runtime. No engine, no DB, no scheduler. If you find
  yourself writing one, stop — the agent maintaining files is the design.
- It **does** give the course a memory of an individual learner, a prerequisite
  and concept graph, cited canonical knowledge separate from per-module teaching,
  and a portable bundle (Markdown + YAML) another agent or tool can consume with
  no translation layer.

## Optional: validating the overlay

If a course wants a check on the learner layer, keep it as light as the format:
assert that every `learner/` and `knowledge/` file has a `type` in frontmatter,
that links resolve, and that `state.md` references only concepts that exist. Do
not assert anything about strengths, dates, or schedule — those are the agent's
judgment, not a contract.

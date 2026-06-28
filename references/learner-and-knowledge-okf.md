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

> LLMs don't get bored, don't forget to update a cross-reference, and can touch
> 15 files in one pass.

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
Formally `H(X) = -Σ p(x) log p(x)`. Taught by [Module 03](../guide/content/03-entropy.md).
```

A module frontmatter then carries `teaches: [../knowledge/entropy.md]` and
`prerequisites:` pointing at earlier modules. Those two edges turn 25 flat modules
into a prerequisite graph the agent can walk when deciding what is next or what to
review.

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
that serve the stated goal.

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

- It does **not** change the rendered course or any existing static/smoke check.
  `guide/` and `course-quality-contract.md` are untouched. The learner layer is a
  separate overlay.
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

# Course-Creator Skill: Warranted Changes

Date: 2026-06-25

Decision: yes, changes are warranted.

Reason: the current `course-creator` skill already encodes many strong learning-science moves, but it does not yet make learner modeling, concept-universe mapping, competence evidence, and external calibration first-class course artifacts.

## What The Skill Already Does Well

- forces first-principles flow
- requires concrete examples and metaphors
- requires module-specific diagrams
- requires retrieval and transfer
- requires worked -> faded -> independent -> far-transfer practice
- requires self-assessment rubrics
- requires misconception repair
- requires spaced cumulative retrieval
- requires reasoning-oriented quizzes
- rejects generic template slop

This means the needed change is not a total pedagogy rewrite.

## Core Gap

The skill currently creates a strong course, but it mostly assumes:

- one default learner model
- one default route through the concept graph
- one default level of scaffold
- course-internal mastery evidence

The research says self-learning can become faster and safer when the course also knows:

- what the learner already knows
- which primitives are missing
- which representations overload the learner
- which analogy domains help
- where high-level reasoning is not yet grounded
- whether confidence matches evidence
- whether internal mastery survives external tests

## Warranted Changes

### 1. Add a concept-universe artifact

Add:

```text
DOMAIN_MODEL.md
```

Purpose:

- define primitives
- define prerequisite graph
- define concept clusters
- define representation ladder
- define common misconceptions
- define boundary cases
- define transfer families
- define external benchmark mappings

Why:

- high-level reasoning needs a map of the domain's real objects and relations
- personalization cannot work without knowing which concept dependencies matter

### 2. Add a learner-model artifact

Add:

```text
PERSONALIZATION.md
```

Purpose:

- record learner goal
- record prior-knowledge evidence
- record familiar analogy domains
- record math/notation/reading comfort
- record support level per concept
- record route decisions
- record uncertainty about the profile

Required rule:

```text
Every personalization decision must cite intake or diagnostic evidence.
```

Why:

- prevents stereotype-based personalization
- lets a "homemaker", "college graduate", or "mathematician" route come from evidence, not identity

### 3. Add a mastery-evidence artifact

Add:

```text
MASTERY_EVIDENCE.md
```

Purpose:

- define what claims the course wants to make about the learner
- define what evidence supports each claim
- define internal tasks
- define external benchmark tasks
- define confidence-calibration checks
- define delayed review checks

Why:

- "understands entropy" is too vague
- "can name the source distribution, compute a two-outcome case, explain units, state a boundary, and transfer to compression" is checkable

### 4. Add learner diagnostics before generation

Add a default diagnostic when learner context is missing.

Diagnostic should probe:

- goal
- prerequisite primitives
- representation comfort
- common misconceptions
- explanation depth
- transfer ability
- confidence calibration

Why:

- prior knowledge is the strongest personalization hinge
- novices need more scaffold; advanced learners can skip or compress some support

### 5. Add module-level competence gates

Every module should include hidden/checkable fields:

```html
data-prereq-check
data-analogy-map
data-boundary-test
data-tiny-formal-case
data-confidence-prompt
data-repair-path
data-transfer-family
```

Why:

- the learner should not mark completion after reading alone
- high-level reasoning becomes trustworthy only after primitive, representation, tiny-case, boundary, transfer, and calibration checks

### 6. Add confidence-before-feedback

Every quiz and reasoning check should ask for confidence before showing feedback.

Why:

- detects false fluency
- helps the learner calibrate
- gives us course-quality data: high confidence + weak answer means the course may be too smooth or too shallow

### 7. Add external benchmark mapping

Each course should include:

```text
EXTERNAL_BENCHMARKS.md
```

Or include this as a section inside `MASTERY_EVIDENCE.md`.

Map:

- course concepts -> MIT OCW / university problem sets / concept inventories / public exams
- modules -> benchmark problem families
- capstones -> external final-style checks

Why:

- course-internal checks can become too easy
- external tests calibrate whether the generated course reaches real rigor

### 8. Add learning-session reflection logs

Static course app should optionally store local-only reflections:

- time spent
- confidence
- weak concept
- confusion type
- repair action
- delayed review result
- external benchmark result

Why:

- your lived learning experience across 12 courses becomes feedback to improve the skill
- the course creator can learn which module patterns create confusion

## Changes Not Warranted Yet

### Do not add a free-form AI tutor first

Reason:

- too hard to validate
- too easy to hallucinate explanations
- could hide weak course structure

Better first step:

- rule-based diagnostics
- explicit evidence gates
- static checks
- local learner model

### Do not personalize by making courses easier

Reason:

- personalization should change route and scaffold, not truth or rigor
- every route must still reach the same concept universe

### Do not replace the current module structure

Reason:

- the current structure already encodes retrieval, transfer, misconception repair, and self-assessment
- add learner-model and evidence layers on top

### Do not make Reasoning Gym the final product

Reason:

- it is a test harness
- successful patterns should move into generated courses
- weak patterns should be discarded

## Proposed Skill Patch

### `SKILL.md`

Add to default deliverables:

- `DOMAIN_MODEL.md`
- `PERSONALIZATION.md`
- `MASTERY_EVIDENCE.md`
- optional `EXTERNAL_BENCHMARKS.md`
- local learner-model and reasoning-gate UI

Add to intake knobs:

- learner goal
- prior-knowledge evidence
- familiar domains
- math/notation comfort
- reading density
- desired rigor
- time budget
- diagnostic mode
- assessment strictness
- external benchmark target

Add to workflow:

1. build domain model
2. run or design diagnostic
3. build learner model
4. choose route and scaffold level
5. generate modules
6. generate competence gates
7. map external benchmarks
8. run static checks

### `references/course-quality-contract.md`

Add required gates:

- course has `DOMAIN_MODEL.md`
- course has `PERSONALIZATION.md`
- course has `MASTERY_EVIDENCE.md`
- modules have competence gates
- quizzes capture confidence before feedback
- distractors are misconception-tagged
- external benchmarks are mapped
- route decisions cite learner evidence

### `references/module-recipe.md`

Add module requirements:

- prerequisite check
- analogy map
- boundary check
- tiny formal case
- confidence prompt
- transfer family
- repair path
- completion gate

### `references/course-design-system-contract.md`

Add UI requirements:

- open learner model panel
- concept-universe map
- module evidence checklist
- delayed review queue
- external benchmark panel
- confidence calibration display

## Evaluation Loop Across 12 Courses

Use this sequence:

1. Shivam learns one course module.
2. Reasoning Gym tests the module.
3. Export the reasoning report.
4. Attempt mapped external benchmark when available.
5. Record confusion type and time-to-understanding.
6. Update course-creator requirements based on repeated failures.

Failure patterns and likely skill fixes:

| Failure pattern | Skill change |
|---|---|
| weak primitives | add prerequisite map and stronger first module |
| weak tiny case | require more worked/faded examples |
| weak representation | require representation ladder |
| weak boundary | require sharper misconception and counterexample checks |
| weak transfer | require far-transfer families |
| high confidence, low evidence | add calibration prompts and harder feedback |
| external benchmark failure | raise rigor or add benchmark-aligned practice |

## Recommended Next Step

Do not edit the live `course-creator` skill while the parallel agent is working.

Instead:

1. give the parallel agent `research/course-creator-personalization-handoff.md`
2. give it this memo
3. ask it to patch the skill in this order:
   - `references/personalized-learning-contract.md`
   - `SKILL.md` intake/deliverables
   - `module-recipe.md` evidence gates
   - `course-quality-contract.md` static checks
   - `course-design-system-contract.md` learner-model UI

## Bottom Line

The current skill is good at producing structured courses.

The warranted improvement is to make every course produce and test a learner-specific path through a domain concept universe.

Reasoning Gym is the test harness for that change, not the final teaching system.

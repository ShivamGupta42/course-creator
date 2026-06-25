# Course-Creator Personalization Handoff

Use this as the implementation checklist for the parallel course-creator-skill agent.

Full research memo: `research/personalized-learning-research-plan.md`

Warranted-change decision memo: `research/course-creator-warranted-changes.md`

## Target Change

Extend `course-creator` so course generation starts with:

1. `DOMAIN_MODEL.md`
2. `PERSONALIZATION.md`
3. `MASTERY_EVIDENCE.md`
4. learner diagnostic protocol
5. module-level competence gates

## Patch Order

### 1. Add a new reference contract

Create:

```text
references/personalized-learning-contract.md
```

Required sections:

- learner model schema
- domain model schema
- diagnostic protocol
- analogy mapping rules
- competence ladder
- anti-bullshit tests
- personalization safety rule: no social-label ability assumptions
- static-check requirements

### 2. Update `SKILL.md` intake

Add knobs:

- learner goal
- prior knowledge evidence
- familiar domains
- math/notation comfort
- reading density
- desired rigor
- time budget
- assessment strictness
- personalization mode
- diagnostic mode

Default:

```text
single-profile course, diagnostic-first when enough learner context is missing
```

### 3. Add generated course artifacts

Make these default deliverables:

```text
DOMAIN_MODEL.md
PERSONALIZATION.md
MASTERY_EVIDENCE.md
```

`PERSONALIZATION.md` rule:

```text
Every personalization choice must cite learner evidence from intake or diagnostics.
```

### 4. Extend module recipe

Each module needs hidden/checkable evidence:

- prerequisite check
- explicit analogy map
- analogy boundary
- tiny formal case
- misconception-tagged distractors
- confidence prompt before feedback
- transfer task
- completion gate tied to mastery evidence
- repair path

Suggested hidden attributes:

```html
data-prereq-check
data-analogy-map
data-boundary-test
data-tiny-formal-case
data-confidence-prompt
data-repair-path
data-transfer-family
```

### 5. Extend static checks

Fail if:

- required personalization artifacts are missing
- learner-profile claims lack evidence
- analogy lacks mappings or boundary
- high-level explanation lacks tiny case and boundary test
- module completion can happen without a competence gate
- route skips prerequisites without diagnostic evidence
- quiz distractors are not misconception-tagged
- confidence is not captured before feedback
- social identity is used as ability proxy

### 6. Keep the existing course contract

Do not remove:

- 3-track course shape
- module-specific diagrams
- real-world anchors
- worked -> faded -> independent -> transfer practice
- spaced cumulative retrieval
- self-assessment rubrics
- writing-voice checks
- design-system checks

This extension adds learner modeling and evidence-backed mastery, not a replacement pedagogy.

## Core Decision

Start rule-based and static-checkable.

Do not ship a free-form AI tutor as the first personalization layer. Add dynamic adaptation later after the generated course contract is stable.

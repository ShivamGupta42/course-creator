# Personalized Learning Contract

Use this contract whenever a course should adapt to a real learner instead of a generic audience label.

## Purpose

Personalization means evidence-backed routing through the same rigorous concept universe. It changes examples, scaffolding, pacing, representations, and repair paths. It does not lower the truth standard.

## Required Course Artifacts

Every personalized course must include:

- `DOMAIN_MODEL.md`
- `PERSONALIZATION.md`
- `MASTERY_EVIDENCE.md`
- optional `EXTERNAL_BENCHMARKS.md` when suitable public assessments exist

`DOMAIN_MODEL.md` defines the subject:

- primitive objects
- prerequisite graph
- concept clusters
- representation ladder
- common misconceptions
- boundary cases
- transfer families
- tiny canonical cases
- external benchmark mappings

`PERSONALIZATION.md` defines the learner route:

- learner goal
- prior-knowledge evidence
- familiar analogy domains
- math, notation, reading, and tooling comfort
- support level per concept
- route decisions
- uncertainty in the profile

Every personalization decision must cite evidence from intake or diagnostics. Never use social identity as an ability proxy.

`MASTERY_EVIDENCE.md` defines what understanding means:

- mastery claims
- observable evidence for each claim
- internal reasoning tasks
- confidence-calibration checks
- delayed review checks
- benchmark tasks when available

## Learner Model Schema

Use a lightweight, explicit learner model:

```json
{
  "goal": "what the learner wants to do with the subject",
  "timeBudget": "hours per week",
  "mathComfort": "low|medium|high|unknown",
  "notationComfort": "low|medium|high|unknown",
  "readingDensity": "low|medium|high|unknown",
  "preferredDomains": ["familiar source domains for examples"],
  "masteredPrimitives": [],
  "fragilePrimitives": [],
  "missingPrimitives": [],
  "misconceptions": [],
  "confidenceCalibration": "overconfident|underconfident|calibrated|unknown",
  "supportLevel": "high|medium|low"
}
```

## Diagnostic Protocol

When learner context is missing, create a 20-30 minute diagnostic plan before writing modules.

Probe:

- learning goal
- prerequisite primitives
- representation comfort
- misconception risk
- explanation depth
- transfer ability
- confidence before feedback

Output:

```json
{
  "mastered": [],
  "fragile": [],
  "missing": [],
  "misconceptions": [],
  "confidenceCalibration": "unknown",
  "recommendedRoute": "high-scaffold|standard|compressed"
}
```

## Analogy Rules

Personalized examples must map structure, not decorate prose.

Each key analogy needs:

- source domain
- target concept
- mapped elements
- mapped relations
- what carries over
- what breaks
- changed-case test

Bad:

```text
Use cooking because the learner is a homemaker.
```

Good:

```text
The diagnostic showed strong reasoning about household scheduling. Use chore coordination to introduce players, actions, payoffs, and best responses, then show where the analogy breaks when preferences are hidden.
```

## Competence Ladder

Track understanding in six levels:

1. Orientation: learner can say what the idea is about.
2. Structure: learner can name primitives and relations.
3. Operation: learner can run a tiny formal case.
4. Boundary: learner can state assumptions and failure cases.
5. Transfer: learner can apply the structure to a changed surface case.
6. Calibration: learner can compare confidence to evidence.

Completion should require evidence beyond orientation.

## Module Evidence Gates

Every module should include hidden/checkable evidence:

- `data-prereq-check`
- `data-analogy-map`
- `data-boundary-test`
- `data-tiny-formal-case`
- `data-confidence-prompt`
- `data-repair-path`
- `data-transfer-family`

Each module should also record:

- prerequisites
- target concepts
- representations
- support level
- misconception-tagged distractors
- completion gate

## Confidence Before Feedback

Every quiz or reasoning gate should ask for confidence before feedback when practical.

Use confidence to detect:

- false fluency
- underconfidence after correct reasoning
- course sections that feel clear but fail transfer

## External Benchmarks

Map modules to public benchmarks when suitable:

- MIT OCW problem sets
- university exams
- concept inventories
- public standards or certifications
- canonical textbook exercises

Use these as calibration, not as copied course content.

## Static Check Requirements

The generated course should fail if:

- `DOMAIN_MODEL.md`, `PERSONALIZATION.md`, or `MASTERY_EVIDENCE.md` is missing for a personalized build
- learner-profile claims lack diagnostic or intake evidence
- a personalized analogy lacks mappings and a boundary
- a route skips prerequisites without diagnostic evidence
- a module lacks tiny-case, boundary, transfer, and repair evidence
- quiz distractors are not misconception-tagged where the format supports tags
- confidence is not captured before feedback where the course declares confidence-calibrated mastery
- completion can be marked without a competence gate
- social identity is used as an ability proxy

## Reasoning Gym

`experiences/reasoning-gym/` is a prototype harness for testing the evidence model across existing courses. Treat useful patterns from it as candidates for generated-course UI, not as the final course shell.

# Personalized Technical Learning Research Plan

Date: 2026-06-25

Branch/worktree: `codex/learning-research-plan` in `/Users/shivamgupta/Documents/Information theory-learning-research-plan`

## Goal

Extend the course-creator skill so it can generate highly personalized technical courses while staying aligned with how humans learn:

- faster initial understanding
- reliable long-term retention
- honest competence checks
- different paths for different prior knowledge
- high-level reasoning that can be trusted because it is tied to evidence

The core question is not "how do we simplify game theory for a homemaker?" It is:

> Given a target domain and a learner's actual prior knowledge, what representations, examples, practice sequence, and assessment evidence should the course generate so the learner builds a usable mental model without mistaking fluency for understanding?

## Short Answer

The course creator should generate two things before it writes lessons:

1. A domain model:
   - primitives
   - prerequisites
   - concept graph
   - representations
   - common misconceptions
   - boundary cases
   - transfer tasks

2. A learner model:
   - goal
   - prior knowledge
   - familiar analogy domains
   - math/reading/tool comfort
   - diagnostic performance
   - confidence calibration
   - support level needed per concept

Then each lesson should be written as a sequence of evidence-producing moves:

1. orient with a concrete purpose
2. build a relational high-level model
3. map the analogy explicitly
4. solve a tiny formal case
5. test a boundary
6. retrieve from memory
7. transfer to a changed case
8. self-grade against observable criteria

High-level reasoning is trustworthy only when the learner can connect it back to:

- primitives
- assumptions
- a tiny case
- a counterexample or boundary
- a prediction that can be checked
- a transfer case with changed surface features

Without those links, the learner has orientation, not competence.

## Research Synthesis

### 1. Prior knowledge is the personalization hinge

Experts differ from novices because they notice meaningful patterns, organize knowledge around deep structure, retrieve it flexibly, and know when it applies. This is the central reason a mathematician and a non-math adult need different support even when learning the same game-theory concept. Source: [How Experts Differ from Novices, National Academies](https://www.nationalacademies.org/read/9853/chapter/5).

The learner's identity is not the model. "Homemaker", "college graduate", and "mathematician" are weak signals. The useful evidence is what the person can already do:

- recognize the objects in the domain
- compare cases by deep structure
- use notation without overload
- explain assumptions
- make a prediction
- repair a wrong answer

### 2. Novices need more assistance; experts often need less

The expertise reversal effect is directly relevant to personalization. A 2025 meta-analysis frames it as an aptitude-treatment interaction: low prior knowledge learners tend to benefit from more instructional assistance, while high prior knowledge learners can benefit from lower assistance. Source: [Tetzlaff et al., 2025 meta-analysis](https://www.pedocs.de/volltexte/2026/34113/pdf/Learn_and_Instr_2025_Tetzlaff_u.a._A_cornerstone_of_adaptivity.pdf).

Course implication:

- novice route: concrete anchor, worked example, explicit analogy map, short steps, frequent feedback
- intermediate route: faded examples, mixed practice, more learner explanation
- expert route: compressed definitions, proof obligations, edge cases, open problems, less redundant guidance

### 3. The fastest path is not "overview only"

A high-level overview helps orientation, but it can create false confidence. The fast path for technical learning is:

- high-level relational map
- immediate tiny case
- worked example
- faded example
- independent near-transfer
- far-transfer
- spaced retrieval
- delayed self-test

This matches the current course-creator contract well. The missing piece is learner-specific routing and stronger evidence gates.

### 4. Retrieval and spacing are high-confidence learning mechanisms

The IES practice guide recommends spacing learning over time, interleaving worked examples with problem solving, combining verbal and graphic explanations, integrating concrete and abstract representations, and using quizzes for re-exposure. Source: [IES Practice Guide](https://ies.ed.gov/ncee/wwc/practiceguide/1).

Dunlosky et al. rate practice testing and distributed practice as high-utility strategies across ages, ability levels, and task types. Source: [APS summary of Dunlosky et al.](https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html).

Recent STEM evidence is more nuanced: a 2024 study across nine introductory STEM courses found spaced retrieval effects in some courses, but not uniformly across all STEM contexts. Source: [International Journal of STEM Education, 2024](https://link.springer.com/article/10.1186/s40594-024-00468-5).

Course implication:

- keep spaced retrieval as a default
- make it concept-specific and cumulative
- measure whether it works for each course, not assume equal effect everywhere

### 5. Worked examples help, but self-explanation has boundary conditions

Worked examples reduce cognitive load and help early schema construction. A 2023 mathematics meta-analysis supports worked examples but shows that design features and prior knowledge matter; self-explanation prompts can help, but their effects vary and can add redundancy. Source: [Worked examples meta-analysis](https://www.danamillercotto.com/uploads/4/7/7/2/47725475/barbieri_et_al__2023__we_meta-analysis.pdf).

Course implication:

- beginners should see complete worked cases first
- prompts should ask for one precise explanation, not a generic "explain why"
- as mastery rises, remove steps and increase problem solving

### 6. Productive failure can work, but it is not a beginner-default

Problem-solving before instruction can improve learning when implemented carefully. A meta-analysis found moderate benefits for problem-solving followed by instruction, with stronger effects when productive-failure design is high fidelity. It was less favorable for younger learners and domain-general skills. Source: [ERIC summary of Sinha and Kapur, 2021](https://eric.ed.gov/?id=EJ1308129).

Course implication:

- use "pre-invention" tasks when the learner has enough primitives to productively generate attempts
- avoid dropping true novices into unguided formal problem solving
- always consolidate after struggle

### 7. Analogy is powerful only when mappings and limits are explicit

Analogies can accelerate abstract learning by helping learners map a familiar source domain onto the target domain. Strong analogies focus attention on causal-relational structure, not surface resemblance. Source: [Gray and Holyoak, Teaching by Analogy](https://reasoninglab.psych.ucla.edu/wp-content/uploads/sites/273/2021/12/Gray_Holyoak.2021.pdf).

Course implication:

- every personalized analogy needs:
  - source domain
  - target domain
  - mapped elements
  - mapped relations
  - what carries over
  - what breaks
  - one changed-case test

Bad personalization uses familiar examples as decoration. Good personalization uses familiar domains as bridges to formal structure.

### 8. Generative learning builds transfer when it forces integration

Generative learning asks learners to actively select, organize, and integrate new information with prior knowledge. Strategies include mapping, drawing, self-testing, self-explaining, teaching, and enacting. Source: [Fiorella and Mayer, 2016](https://eric.ed.gov/?id=EJ1120458). A 2023 review emphasizes that drawing and explaining together can improve comprehension and transfer when they improve the quality of explanations. Source: [Making Sense of Generative Learning](https://link.springer.com/article/10.1007/s10648-023-09769-7).

Course implication:

- ask learners to generate diagrams, predictions, explanations, and examples
- grade the structure, not the fluency
- require the learner to revise after feedback

### 9. Competence needs evidence-centered assessment

Evidence-centered design says assessments must start from the inference we want to make, then specify the observations and tasks that would support that inference. Source: [National Academies, Assessment Design and Validation](https://www.nationalacademies.org/read/18409/chapter/5).

Course implication:

- do not ask "does the learner understand Nash equilibrium?"
- ask "what evidence would justify saying the learner can reason with Nash equilibrium?"

For a technical concept, evidence should include:

- identify primitives
- solve a tiny case
- explain the result in plain words
- choose the right representation
- reject a tempting misconception
- predict what changes when an assumption changes
- name where the concept stops applying

### 10. Concept inventories reveal misconceptions better than ordinary quizzes

Concept inventories use carefully designed items and distractors to reveal conceptual models and misconceptions. A 2024 scoping review found five common development stages: define construct, determine domain, identify misconceptions, form items and response processes, validate and refine. Source: [Frontiers scoping review on STEM concept inventories](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1442833/full).

The Force Concept Inventory is a mature example: it uses everyday language and common-sense distractors to assess basic Newtonian mechanics understanding. Source: [PhysPort Force Concept Inventory](https://www.physport.org/assessments/assessment.cfm?A=FCI).

Course implication:

- each generated course should include a lightweight concept inventory
- wrong options should correspond to real misconceptions
- diagnostics should use explanations and confidence ratings, not only correct/incorrect

### 11. Fluency can fake understanding

The illusion of explanatory depth shows that people often overestimate their ability to explain causal systems. Asking them to generate an explanation can expose gaps and reduce overconfidence. Source: [Meyers et al., 2023](https://www.cambridge.org/core/journals/judgment-and-decision-making/article/broad-effects-of-shallow-understanding-explaining-an-unrelated-phenomenon-exposes-the-illusion-of-explanatory-depth/9B9B8927C3E530EBCF0453504730E3F3).

Course implication:

- confidence must be measured separately from performance
- every self-assessment should ask for confidence before feedback
- completion should require calibration, not only a correct answer

### 12. AI tutoring is promising, but structure matters

A 2025 randomized controlled trial found that a structured AI tutor helped college students learn more in less time than in-class active learning for the studied physics lessons. The authors attribute success to active engagement, cognitive load management, scaffolding, accuracy, timely feedback, and self-pacing. Source: [Scientific Reports, 2025](https://www.nature.com/articles/s41598-025-97652-6).

But broader reviews are cautious. A 2025 systematic review of AI-driven intelligent tutoring systems found generally positive effects, with effects mitigated when compared to non-intelligent tutoring systems, and called for longer, more diverse studies. Source: [npj Science of Learning, 2025](https://www.nature.com/articles/s41539-025-00320-7).

2026 reviews of AI-supported personalized learning emphasize learner profiles, data inputs, content models, instructional models, adaptive engines, user controls, goals, evaluation, and governance. Sources: [Smart Learning Environments, 2026](https://link.springer.com/article/10.1186/s40561-026-00440-6), [Frontiers in Education, 2026](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1782626/full).

Course implication:

- use AI generation for personalization, but make structure explicit
- do not let an LLM free-form tutor without sequence, evidence gates, and source checks
- generated content must be testable by static checks and human review

## Distinguishing High-Level Reasoning From Bullshit

### The problem

A learner can say:

> "In game theory, people choose based on incentives."

That is true but weak. It might be insight, or it might be slogan-level fluency.

The course should classify this as "orientation evidence", not mastery evidence.

### The competence ladder

1. Orientation
   - learner can say what the idea is about
   - useful, but not trusted for decisions

2. Structural understanding
   - learner can name the primitives and relations
   - example: players, actions, payoffs, beliefs, information, timing

3. Operational understanding
   - learner can solve or simulate a tiny case
   - example: find best responses in a 2x2 payoff table

4. Conditional understanding
   - learner can name assumptions and boundaries
   - example: Nash equilibrium assumes no one benefits by unilateral deviation, given the other strategies

5. Transfer understanding
   - learner can apply the structure to a changed surface case
   - example: map a price war, household chore split, and traffic merge to different strategic forms

6. Calibrated understanding
   - learner can say what they know, what they guessed, and what would change their mind

### The anti-bullshit test

For any high-level explanation, require seven checks:

1. Primitive check
   - What are the objects?
   - What is allowed to vary?

2. Relation check
   - How do the objects affect each other?

3. Tiny-case check
   - Can you run the smallest nontrivial example?

4. Representation check
   - Can you draw the table, graph, timeline, tree, equation, or state machine?

5. Boundary check
   - When does this explanation fail?

6. Prediction check
   - If one input changes, what changes in the result?

7. Transfer check
   - Can you use the same structure in a new context without preserving irrelevant surface details?

If a learner passes 1 and 2 only, they have an overview.
If they pass 1 through 5, they can reason safely within guided cases.
If they pass all 7 with calibrated confidence, the course can mark the concept as mastered.

## Personalization Model

### Do not infer ability from social label

The course generator can accept a phrase like "homemaker", but it should not assume:

- no math
- no logic
- no discipline
- no technical capacity

It should ask or diagnose:

- comfort with symbolic notation
- comfort with tables and charts
- prior exposure to probability, algebra, programming, proofs
- preferred familiar domains
- goal for learning
- time constraints
- desired rigor
- tolerance for abstraction

### Learner profile dimensions

Use these instead of a single "beginner/intermediate/expert" label:

```json
{
  "goal": "reason about strategic decisions in daily life and business",
  "time_budget": "5 hours/week",
  "math_comfort": "low|medium|high",
  "notation_comfort": "low|medium|high",
  "reading_comfort": "low|medium|high",
  "preferred_domains": ["household coordination", "shopping", "family scheduling"],
  "existing_primitives": ["tradeoff", "preference", "budget", "fairness"],
  "missing_primitives": ["probability", "matrix", "expected value"],
  "confidence_style": "overconfident|underconfident|calibrated|unknown",
  "support_level": "high|medium|low"
}
```

### Example: game theory for three learners

#### Homemaker or non-math adult

Likely route if diagnostics confirm low formal math:

- start with coordination, conflict, repeated interaction, trust, and resource allocation
- use household scheduling, shopping choices, shared chores, family negotiation, neighborhood decisions
- introduce payoff tables with words first, then numbers
- keep equations late and small
- require formal bridge:
  - player
  - action
  - payoff
  - belief
  - best response
  - equilibrium
- mastery evidence:
  - fill a 2x2 table from a daily situation
  - identify each person's best response
  - predict how changing one payoff changes behavior
  - name why the analogy breaks

#### College graduate

Likely route if diagnostics show comfort with charts and basic algebra:

- use workplace negotiation, markets, group projects, platforms, pricing
- introduce normal-form games earlier
- include mixed examples with small numbers
- add probability once best-response intuition is stable
- mastery evidence:
  - solve several 2x2 games
  - compare dominant strategy vs Nash equilibrium
  - explain an inefficient equilibrium
  - transfer to a business scenario

#### Mathematician

Likely route if diagnostics show high formal comfort:

- compress concrete anchors
- start from definitions and representation choices
- move quickly to fixed points, mixed strategies, existence, information sets
- include proofs, counterexamples, theorem boundaries
- mastery evidence:
  - prove or outline existence conditions
  - produce counterexamples
  - compare solution concepts
  - formalize an informal scenario

### Same truth, different route

Personalization must not mean "less true".

Each route should reach the same target concept graph. The differences are:

- entry examples
- scaffolding density
- notation timing
- analogy domain
- practice gradient
- assessment representation
- pacing

## Proposed Course-Creator Skill Extension

### New skill file

Add:

```text
references/personalized-learning-contract.md
```

Purpose:

- define learner modeling
- define domain modeling
- define personalization routes
- define competence gates
- define assessment evidence
- define static checks

### New intake knobs

Add to the course-creator intake:

| Knob | Default | Why it matters |
|---|---|---|
| Learner goal | required | Determines transfer tasks and examples |
| Prior knowledge evidence | ask/diagnose | Prevents stereotyping |
| Familiar domains | ask | Feeds analogy and examples |
| Math/notation comfort | diagnose | Controls formalism ramp |
| Reading density | medium | Controls prose and examples |
| Desired rigor | rigorous but plain | Controls proof depth |
| Time budget | 5 hours/week | Controls spacing plan |
| Assessment strictness | mastery evidence required | Prevents false fluency |
| Personalization mode | single-profile course | Later can support multi-profile variants |

### New generated artifacts per course

Add:

```text
PERSONALIZATION.md
DOMAIN_MODEL.md
MASTERY_EVIDENCE.md
guide/js/diagnostics.js
guide/js/review-scheduler.js
guide/js/learner-model.js
```

For static-only courses, the JS can remain local and privacy-preserving.

### `DOMAIN_MODEL.md`

Should contain:

- domain primitives
- prerequisite map
- concept graph
- representation ladder
- misconception inventory
- boundary cases
- transfer families
- canonical tiny cases
- expert mental models

Example for game theory:

```text
primitive objects:
- players
- actions
- payoffs
- preferences
- information
- timing
- beliefs

representations:
- story
- payoff table
- best-response marks
- game tree
- expected payoff equation
- equilibrium set

misconceptions:
- equilibrium means fair
- equilibrium means best total outcome
- rational means selfish
- one person's best action can be judged without the other player's action
```

### `PERSONALIZATION.md`

Should contain:

- learner profile
- diagnostic results
- route decisions
- analogy domains
- scaffolding level by track
- formalism ramp
- practice schedule
- assumptions and uncertainty

Important rule:

> Every personalization choice must cite evidence from intake or diagnostics.

Bad:

```text
Because the learner is a homemaker, avoid math.
```

Good:

```text
The diagnostic showed low comfort with symbolic notation but strong reasoning about household tradeoffs. Start with payoff stories, then add 2x2 tables by module 2.
```

### `MASTERY_EVIDENCE.md`

Should define mastery claims and evidence:

```text
Claim: learner can reason with Nash equilibrium.

Evidence:
- identifies players, actions, and payoffs in a scenario
- constructs a 2x2 payoff table
- marks best responses
- identifies equilibrium cells
- explains why an equilibrium can be inefficient
- changes one payoff and predicts the new equilibrium
- states when Nash is the wrong solution concept
- confidence is within 20 percentage points of observed performance
```

### New module metadata

Each module should expose author-facing metadata:

```json
{
  "prerequisites": ["payoff", "best-response"],
  "concepts": ["nash-equilibrium"],
  "supportLevel": "high|medium|low",
  "representations": ["story", "table", "graph", "equation"],
  "analogy": {
    "sourceDomain": "household chore negotiation",
    "targetConcept": "best response",
    "mappings": [
      ["person", "player"],
      ["available chore choice", "action"],
      ["satisfaction/time saved", "payoff"]
    ],
    "breaksWhen": "preferences are hidden or change over time"
  },
  "competenceGate": {
    "claim": "can reason with best responses",
    "evidenceTasks": ["tiny-case", "boundary", "transfer", "confidence"]
  }
}
```

### New visible lesson flow

Keep learner-facing labels natural. Do not expose pedagogy labels.

Current sections are good. Add stricter hidden evidence:

- `data-prereq-check`
- `data-analogy-map`
- `data-boundary-test`
- `data-tiny-formal-case`
- `data-confidence-prompt`
- `data-repair-path`
- `data-transfer-family`

### Diagnostic design

Before course generation, create a 20 to 30 minute diagnostic:

1. goal probe
   - why the learner wants the topic

2. prerequisite probe
   - tiny items for required primitives

3. representation probe
   - story, table, graph, equation

4. misconception probe
   - distractors mapped to known misconceptions

5. explanation probe
   - "explain how this works" to expose shallow fluency

6. confidence probe
   - ask confidence before feedback

7. transfer probe
   - same structure, new surface context

Output:

```json
{
  "mastered": ["tradeoff", "preference"],
  "fragile": ["expected value"],
  "missing": ["matrix reading"],
  "misconceptions": ["equilibrium-as-fairness"],
  "confidenceCalibration": "overconfident on explanations",
  "recommendedRoute": "high-scaffold intuition-to-formal"
}
```

### Adaptive sequencing rule

For each next concept:

```text
readiness = prerequisite_mastery - misconception_risk
value = goal_relevance + graph_centrality + learner_interest
load = notation_load + intrinsic_complexity + working_memory_demand

choose concepts where:
- value is high
- readiness is adequate
- load can be reduced with examples or representations
```

Support selection:

```text
if prior knowledge low:
  worked examples, analogy map, concrete case, short steps
elif prior knowledge medium:
  faded examples, compare cases, explain choices
else:
  compact formalism, proof/counterexample, open transfer
```

### Static checks to add

The course should fail if:

- `PERSONALIZATION.md`, `DOMAIN_MODEL.md`, or `MASTERY_EVIDENCE.md` is missing
- any learner-profile claim lacks evidence from intake or diagnostic output
- any personalized analogy lacks mappings and a boundary
- any module lacks a tiny formal case
- any high-level explanation lacks a boundary check
- any module lacks a confidence prompt before feedback
- any quiz item lacks misconception-tagged distractors
- any mastery claim lacks evidence tasks
- any completion action is possible without passing the competence gate
- any route skips a declared prerequisite without a diagnostic pass
- any course uses social identity as a proxy for ability without diagnostic evidence

### Human review checklist

The reviewer should ask:

- Does the route respect the learner's goal?
- Are personalization decisions evidence-based?
- Does every analogy map structure, not surface vibe?
- Does the learner reach formal primitives eventually?
- Are high-level explanations tested with tiny cases and boundaries?
- Do wrong answers reveal misconceptions?
- Does confidence become better calibrated over time?
- Does the course avoid making the subject fake-easy?

## Implementation Plan

### Phase 1: Research-backed contract

Create `references/personalized-learning-contract.md` in the course-creator skill.

Include:

- learner model schema
- domain model schema
- diagnostic protocol
- analogy mapping rules
- competence ladder
- anti-bullshit tests
- static-check requirements

### Phase 2: Course intake extension

Update `SKILL.md` intake table:

- learner goal
- prior knowledge evidence
- familiar domains
- math/notation comfort
- time budget
- desired rigor
- personalization mode
- diagnostic mode

### Phase 3: Generator pipeline

Before writing modules:

1. generate `DOMAIN_MODEL.md`
2. generate diagnostic plan
3. generate or ingest learner profile
4. generate `PERSONALIZATION.md`
5. generate `MASTERY_EVIDENCE.md`
6. generate module route and support levels

### Phase 4: Module recipe extension

Update `references/module-recipe.md` so each module includes:

- prerequisite check
- analogy map with boundary
- tiny formal case
- misconception-tagged quiz distractors
- confidence prompt
- evidence-backed completion gate
- repair path

### Phase 5: Static checks

Update course static checks to enforce:

- artifact presence
- metadata presence
- evidence-backed personalization
- no stereotype-based decisions
- module competence gates
- analogy mappings
- confidence before feedback
- prerequisite route integrity

### Phase 6: Validation harness

For generated courses, collect:

- diagnostic score
- immediate post-test
- delayed retrieval score
- transfer score
- calibration error
- repair-loop success
- time to mastery

Use these to compare course variants.

## Recommended First Skill Patch

The smallest valuable patch to the parallel course-creator work is:

1. Add `references/personalized-learning-contract.md`.
2. Add intake knobs to `SKILL.md`.
3. Add required course artifacts:
   - `DOMAIN_MODEL.md`
   - `PERSONALIZATION.md`
   - `MASTERY_EVIDENCE.md`
4. Add static-check requirements.
5. Add module recipe requirements:
   - tiny formal case
   - analogy map
   - boundary check
   - confidence prompt
   - misconception-tagged distractors
   - completion gate

This gives the skill a research-backed skeleton without rewriting the whole generator.

## Open Research Questions

- How much diagnostic friction will learners tolerate before starting?
- Which learner-profile dimensions predict faster technical learning?
- How many personalized examples are enough before formal abstraction?
- Should each generated course create one route per learner, or several selectable routes?
- How should confidence calibration be scored for open-ended explanations?
- Can an LLM reliably generate misconception-tagged distractors without SME review?
- Should the system use a simple rule-based learner model first, then add knowledge tracing later?

## Design Position

Start rule-based, evidence-centered, and static-checkable.

Do not begin with a fully adaptive AI tutor. That adds uncertainty before the course generator can prove it produces valid learning structures.

The near-term course creator should generate:

- a strong default personalized route
- diagnostic probes
- evidence-backed mastery gates
- spaced cumulative retrieval
- repair loops
- clear formal bridges

Later, add dynamic adaptation:

- local learner model
- knowledge tracing
- AI tutor
- adaptive review scheduler
- generated remediation variants

## Source List

- [How People Learn II, National Academies, 2018](https://www.nationalacademies.org/read/24783/chapter/2)
- [How Experts Differ from Novices, National Academies](https://www.nationalacademies.org/read/9853/chapter/5)
- [IES Practice Guide: Organizing Instruction and Study to Improve Student Learning](https://ies.ed.gov/ncee/wwc/practiceguide/1)
- [Dunlosky et al., Improving Students' Learning With Effective Learning Techniques](https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html)
- [Single-paper meta-analyses of spaced retrieval in nine STEM courses, 2024](https://link.springer.com/article/10.1186/s40594-024-00468-5)
- [A cornerstone of adaptivity: meta-analysis of expertise reversal effect, 2025](https://www.pedocs.de/volltexte/2026/34113/pdf/Learn_and_Instr_2025_Tetzlaff_u.a._A_cornerstone_of_adaptivity.pdf)
- [Worked examples meta-analysis, Educational Psychology Review, 2023](https://www.danamillercotto.com/uploads/4/7/7/2/47725475/barbieri_et_al__2023__we_meta-analysis.pdf)
- [When Problem Solving Followed by Instruction Works, ERIC summary, 2021](https://eric.ed.gov/?id=EJ1308129)
- [Eight Ways to Promote Generative Learning, ERIC summary](https://eric.ed.gov/?id=EJ1120458)
- [Making Sense of Generative Learning, 2023](https://link.springer.com/article/10.1007/s10648-023-09769-7)
- [Teaching by Analogy: From Theory to Practice](https://reasoninglab.psych.ucla.edu/wp-content/uploads/sites/273/2021/12/Gray_Holyoak.2021.pdf)
- [Assessment Design and Validation, National Academies](https://www.nationalacademies.org/read/18409/chapter/5)
- [STEM concept inventory development scoping review, 2024](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2024.1442833/full)
- [Force Concept Inventory, PhysPort](https://www.physport.org/assessments/assessment.cfm?A=FCI)
- [Broad effects of shallow understanding, 2023](https://www.cambridge.org/core/journals/judgment-and-decision-making/article/broad-effects-of-shallow-understanding-explaining-an-unrelated-phenomenon-exposes-the-illusion-of-explanatory-depth/9B9B8927C3E530EBCF0453504730E3F3)
- [AI tutoring RCT, Scientific Reports, 2025](https://www.nature.com/articles/s41598-025-97652-6)
- [AI-driven intelligent tutoring systems systematic review, npj Science of Learning, 2025](https://www.nature.com/articles/s41539-025-00320-7)
- [Redefining personalized learning in the AI era, 2026](https://link.springer.com/article/10.1186/s40561-026-00440-6)
- [AI in education personalized learning trends, Frontiers, 2026](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2026.1782626/full)

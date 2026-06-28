# FRICTION — dogfooding course-creator on Kubernetes Operations

Built the bundle under `dogfood/kubernetes/` using the skill's contracts. This
records every place the contracts were ambiguous, contradictory, or unworkable
for an ops subject whose artifact is a YAML manifest and whose "result" is
observed cluster behavior. Citations are file + rule.

## 1. The "runnable success check" default actively fights an ops subject. (biggest)

`references/course-quality-contract.md` line 17 hard-codes it:

> Every module includes a hands-on `Build it yourself` project: the learner
> creates an artifact ... with build steps, a **runnable success check**, and a
> stretch.

And `references/module-recipe.md` line 91/106 repeats "a runnable success check
('You have it when…')" and line 88 bakes a calculator step into the template:
`{step 3: predict, then check against reality}` with a numeric framing.

For Kubernetes the artifact is a manifest, and the success check is an *observed
cluster state* (`kubectl get pods` shows 3/3 Ready and survives a Pod delete;
`describe` names `Reason: OOMKilled`). That is real and checkable, but it is not
"runnable" in the unit-test sense the word implies. SKILL.md's Anchor Profiles
section *does* fix this (line 324):

> A non-code course must not claim a "runnable" check ... `runnable` (code),
> `rubric` (performance), `diff`, or `estimate`.

So the override exists. **But it lives only in SKILL.md, and the two contract
files the recipe tells you to obey contradict it.** module-recipe.md line 156's
own self-check list still demands the literal substring `"You have it when"` and
describes the project as having "a runnable success check" with no mention of the
profile's verification modes. An author who follows module-recipe.md literally
(as instructed: "Read module-recipe.md before authoring any module") writes a
runnable assert and never learns the profile relaxed it. The relaxation is in a
different file than the rule. **Fix: module-recipe.md must read the profile's
verification_mode and restate the four modes inline, not assume `runnable`.**

What I did: phrased every "You have it when" as observed cluster state + an
estimate and labeled the verification mode explicitly in each project. It works,
but I had to override the recipe using authority from a third document.

## 2. The numeric-calculator lab default has no clean ops fit, and the `aria-invalid` gate assumes a numeric input.

course-quality-contract.md line 26: "Every lab must be insight-focused, not a
bare calculator: scenario, experiment, simple metaphor, output interpretation,
try-next ... reflection ... real-world transfer." SKILL.md line 325 relaxes
"computes output" to "produces interpreted feedback" for non-numeric labs and
says keep `aria-invalid` "only where input can be invalid".

Friction: the *Browser Smoke Requirements* (course-quality-contract.md lines
132-134) still hard-assert "invalid lab input shows a validation message" and
"valid lab input **computes output**". For an ops `make-a-tradeoff` lab (pick
maxUnavailable: 0 vs 1 and read the consequence) there is often no invalid input
to validate and nothing numeric to compute. The smoke contract and the anchor
profile disagree about whether `aria-invalid` is mandatory. The resolution
("generalize the gate, do not delete it", SKILL.md line 329) is a principle, not
a spec; the static-check author has to invent the ops-appropriate assertion with
no example. A capacity/bin-packing lab *can* be numeric (headroom math), so I can
satisfy the literal gate for one lab, but a pure see-the-consequence lab cannot,
and the contract never says which labs may opt out.

## 3. "campus example" is wired into the contract copy, not just the attribute name.

SKILL.md Anchor Profiles rule 1 (line 323) says do not force "campus" into a
non-STEM course and keep the attribute name. Good. But the enforcement language
elsewhere keeps saying "campus" as if it were content:

- course-quality-contract.md line 19: every module needs a `Real-World Anchor`
  with `Campus example`, `Useful metaphor`, `Where it can mislead`.
- line 91 (static check): "a module lacks a `Real-World Anchor` with a campus
  example".
- SKILL.md line 186: `Campus example`: a familiar example from college life,
  labs, dorms, commuting, group projects, phones, workouts, food...

A literal static check that greps for the word `Campus example` as a visible
label would FAIL my ops module, which uses `data-campus` on a 2am-incident
paragraph with no college framing. The profile says relax the words; three other
places enforce the words. I followed the profile (operational incident in
`data-campus`, no visible "Campus example" heading), but a check written from
course-quality-contract.md line 91 verbatim would reject a correct ops module.
**The data-attribute is the contract; the human-readable label name leaked into
the gate text and should be scrubbed.**

## 4. The diagram archetype list covers topology/sequence/stack well. (a win, with one gap)

`references/diagram-engine.md` lines 52-54 ship exactly the three archetypes the
System-design profile names: `topology` (tiered nodes + connectors — cluster /
Service / Pod / node), `sequence` (actor lifelines + ordered messages — probe
loop, rollout step order, request path), and `stack` (one bar split into
segments — a node's allocatable budget split into Pod requests; old/new
ReplicaSet split). My Module 11 diagram is a `stack` (node CPU split into request
blocks) and Module 19 is a `sequence`/snapshot of the rollout. Both map cleanly.
`curve` (line 47) covers the HPA control loop. This part of the contract is
genuinely ready for ops; no override needed.

One real gap: there is no archetype for a **state machine / phase diagram**
(`Pending → Running → CrashLoopBackOff → OOMKilled`), which is the single most
useful ops picture for the debugging modules (23, 24). `cycle` (line 50) is a
ring of equal nodes with no branching and no terminal states, so it does not fit
a failure-state graph with multiple exits. `sequence` is about messages between
actors, not state transitions of one object. To diagram failure modes I would
have to misuse `pipeline` (linear, no branches) or add an archetype
(diagram-engine.md line 83 documents how, but that is engine work, not
authoring). **For an ops course, a `states` archetype is the missing primitive.**

## 5. The OKF overlay composes cleanly, with one ambiguity about where `teaches`/`prerequisites` edges live.

`references/learner-and-knowledge-okf.md` is the best-behaved contract here. The
`knowledge/` (Concept) + `learner/` (Mission/LearnerState/LearningRecord) split
worked with zero override: I built a real prerequisite DAG (pod → deployment →
service/rollout; requests-limits → scheduler/hpa), cited kubernetes.io on every
concept, and the learner layer carried a believable two-session history that the
`state.md` rows reflect. The knowledge/teaching split (line 62-71) genuinely
resolves the uniqueness-gate tension: concepts are shared and cited, teaching
prose stays per-module and unique.

Two friction points:

- **Edge location is double-specified.** The contract says a module *frontmatter*
  carries `teaches:` and `prerequisites:` (line 86-89). But `guide/content/*.html`
  files are HTML, not Markdown-with-frontmatter, so there is nowhere natural to
  put YAML frontmatter on a module. The existing library renders modules as HTML.
  I put the edges in an HTML comment at the top of each module
  (`<!-- teaches: ... ; prerequisites: ... -->`) and the authoritative copy in
  `course.md`. The contract assumes module files can hold frontmatter; the actual
  course architecture (SKILL.md lines 80-82, `content/*.html`) makes that
  impossible without a parallel `.md` per module. Unspecified how to reconcile.
- **`course.md` is not in the architecture.** SKILL.md's Course Architecture
  (lines 66-89) lists `js/manifest.js` as the module map; the OKF overlay
  introduces a separate `type: Course` doc. Nothing says whether `manifest.js`
  and `course.md` must agree or which one wins. For a real build they would drift.

## 6. Module-count contract vs profile is fine, but the per-track split is asserted in two incompatible ways.

course-quality-contract.md line 7 says "25 modules exactly". SKILL.md line 144-148
says 9/9/7. SKILL.md Anchor Profiles line 326 says "25 across 3 tracks is the
default, not a law." Three statements, escalating in flexibility. I kept 25 and
9/9/7 because the subject genuinely fills it, so no conflict bit me, but a course
that wanted 20 modules would satisfy SKILL.md line 326 and FAIL
course-quality-contract.md line 7 ("25 modules exactly unless the user requests").
The "unless the user requests" escape exists, but the *static check*
(course-quality-contract.md line 87: "fail if module count is wrong") has no way
to read the profile's declared size, so a non-25 course passes the prose contract
and fails the test contract.

## 7. Writing Voice rules are strict and mostly good, but one rule is hard to honor in ops prose.

SKILL.md lines 207-218: no em-dash connectors, no "not X, but Y", no hedges
(`just`, `simply`). Honoring these improved the writing. The friction: the
"no binary-contrast (not X, but Y)" rule (line 214) collides with how you teach
Kubernetes distinctions, where the *entire pedagogy* is contrastive (liveness vs
readiness, request vs limit, throttle vs OOM-kill, Pending vs CrashLoopBackOff).
I could write these as parallel positive statements ("Liveness restarts; readiness
gates traffic") instead of "not liveness, but readiness", which is arguably
better prose, but the rule's phrasing made me second-guess every legitimate
two-column comparison table and every "A does X; B does Y" sentence. The rule
targets a slop *structure*, yet a naive static check grepping for "not ... but"
would also flag correct technical contrasts. Worth a carve-out note in the
contract that comparison of two real mechanisms is allowed when stated as
parallel positives.

## Wins (brief)

- Anchor Profiles section is the right escape hatch and the System-design row is
  accurate for ops (artifact = design/manifest + estimate, labs = tradeoff /
  see-the-consequence, diagrams = topology/sequence/stack). When you read it, it
  works.
- topology/sequence/stack/curve archetypes cover ops architecture and control
  loops with no invention.
- The OKF overlay (knowledge DAG + learner state/records) maps onto an ops course
  with no override and produces a genuinely useful learner memory.
- The hidden `data-*` attribute scheme (example/metaphor/test/campus/boundary)
  generalizes to ops cleanly once you ignore the leaked "campus" wording.
- The worked → faded → independent → transfer ladder fits ops perfectly: it
  becomes apply-manifest → predict-QoS → force-the-failure → reason-about-a-
  different-shape.

## One-line root cause

The skill grew a correct generalization (Anchor Profiles) in SKILL.md but did not
propagate it into the two contract files (`course-quality-contract.md`,
`module-recipe.md`) or the implied static checks, so the *rules* still say STEM
("runnable", "campus", "computes output", "25 exactly") while the *meta-rule*
says "read the profile". An author who obeys the contracts literally builds the
wrong thing; an author who obeys the profile violates the literal contracts.

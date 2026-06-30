# PROFILE — Kubernetes Operations

Resolved intake knobs and the anchor profile every module and gate reads.

## Resolved intake knobs

| Knob | Resolved value | Source |
|---|---|---|
| Subject + scope | Kubernetes Operations: pods/deployments/services, scheduling, requests/limits, config & secrets, networking & ingress, storage, autoscaling, rollouts/rollbacks, observability, failure modes & debugging. Practitioner-level. | user request |
| Audience / level | A software engineer who can build and run a single container with Docker but has never operated a cluster. Wants to deploy, scale, observe, and debug real workloads. | user request |
| Depth / tone | practitioner; rigorous but plain-spoken; "see the consequence" over recitation | user request |
| Size | 25 modules across 3 tracks (9 / 9 / 7) | SKILL.md default, kept |
| Build project style | manifest + observed/estimated result per module (NOT pure runnable-code assert; see anchor profile) | anchor profile override |
| Runtime | Claude Code | env |
| Image provider | `svg` (deterministic engine) — no image-gen MCP/API key detected in this dogfood run; diagrams referenced by path, not rendered | SKILL.md fallback |
| Publish target | none — dogfood only, write under `dogfood/kubernetes/`, no repo/push/serve | user request |

## Anchor profile (System-design family, adapted for Ops)

The default contract assumes STEM: campus example, "small numbers" tiny case,
numeric calculator lab, runnable-code build project, math diagrams. That profile
is wrong for an ops subject. This course declares the **System design** family
from SKILL.md "Anchor Profiles" and adapts it for cluster operations.

- **Audience domain**: backend/platform engineers operating staging and
  production workloads. Anchors come from running services, not dorm life.
- **Anchor domain** (where concrete examples come from): a real product's
  load/latency/restart behavior — request rate, p99 latency, replica count,
  CPU/memory headroom, restart counts, rollout windows. This replaces the
  "campus example". `data-campus` carries an operational situation (a Black
  Friday traffic spike, a node that went `NotReady`, a deploy at 2am), not a
  college-life scene. The contract's word "campus" is honored only as the
  attribute name, not the copy (SKILL.md Anchor Profiles rule 1 permits this).
- **Metaphor domain**: physical operations and logistics — a restaurant
  kitchen during a rush, a building's HVAC, a shipping yard, a hospital triage
  desk, an apartment lease. Each module gets its own metaphor; no single
  course-wide metaphor.
- **Tiny-case meaning** ("Try a Small Case"): the smallest cluster fact that
  exposes the mechanism — one Pod, one node with 2 vCPU, three replicas across
  two nodes, a single 200m CPU request against a 1000m node. Often this is a
  capacity/scheduling arithmetic ("can these three Pods fit?") rather than a
  physics calculation, but it is still a concrete small number you can check.
- **Artifact + verification mode**: the artifact is a **YAML manifest** plus an
  **observed or estimated result**. Verification mode is mostly `estimate`
  (a capacity or sanity bound: "headroom is 1400m, three 500m Pods will not
  schedule") and `rubric` (does the manifest set the fields a reviewer would
  require), with **some** `runnable` where a manifest genuinely applies and a
  command's output is checkable (`kubectl apply`, `kubectl get pods`,
  `kubectl rollout status`). A module's "You have it when" is phrased as an
  **observed cluster state** ("`kubectl get pods` shows 3/3 Ready and survives
  deleting one Pod"), not a unit-test assertion.
- **Lab interaction types**: `make-a-tradeoff` (pick a request/limit, replica
  count, probe timing and read the consequence) and `see-the-consequence`
  (change one field, predict the new cluster behavior). Numeric inputs where a
  bin-packing/headroom number is the point; choice inputs where the decision is
  the point. `aria-invalid` only on the numeric inputs.
- **Diagram archetypes**: `topology` (cluster/Service/Pod/node wiring, Ingress
  fan-out), `sequence` (probe loop, rollout step order, scheduler bind, request
  path through Service to Pod), and `stack` (a node's allocatable budget split
  into Pod requests; a rollout's old/new ReplicaSet split). `curve` appears once
  for the HPA control loop (desired replicas vs observed metric). `branching`
  (new state-machine archetype) carries the Pod-lifecycle failure-state graph
  (`Pending → ContainerCreating → Running`, branching to `CrashLoopBackOff`,
  `OOMKilled`, `ImagePullBackOff`, with `terminal` states drawn double-bordered)
  for the debugging modules (23, 24). These come straight from the System-design
  row plus `diagram-engine.md`'s topology / sequence / stack / curve / branching
  archetypes.

## Profile knobs (single source of truth the gates read)

These are the SKILL.md "Profile knobs the gates read" values for this course.
Every gate reads the knob, not the STEM default string.

| Knob | Value for this course | Notes |
|---|---|---|
| `anchor_label` | `Production example` | Visible framing of the Real-World Anchor. Machine hook stays `data-campus`/`data-boundary`; the word "campus" is never required in prose or asserted. |
| `anchor_domain` | a real product's load/latency/restart behavior (request rate, p99, replica count, CPU/memory headroom, restart counts, rollout windows) | Where `data-example`/`data-campus` draw concrete situations: a Black Friday spike, a `NotReady` node, a 2am deploy. |
| `formal_card_heading` | `Write the Manifest Rule` | The "Figure it out from scratch" formal card. Holds the manifest field rule (`requests` ≤ `limits`; `maxUnavailable + maxSurge` budget) and a sanity guard, not a dimensional check. |
| `verification_mode` | `estimate` + `rubric`, with **some** `runnable` | "You have it when" is an observed/estimated cluster state (capacity bound, manifest-field rubric), with a runnable `kubectl`-output check where a manifest genuinely applies. A non-code course must not claim pure `runnable`; this course claims it only where a command's output is checkable. |
| `lab_interactions` | `[choice, compare, numeric]` | `make-a-tradeoff` (choice/compare) and `see-the-consequence` (choice) labs satisfy the smoke gate by producing interpreted feedback with no invalid state; `numeric` bin-packing/headroom labs keep `aria-invalid`. |
| `module_count` / `track_split` | 25 / 9-9-7 | The subject fills 25; size gate reads this, does not assert 25. |
| `canonical_tokens` | `[Pending, Running, CrashLoopBackOff, OOMKilled, ImagePullBackOff, ContainerCreating, NotReady, Ready, Terminating]` | Fixed Pod-phase / status alphabet that legitimately recurs across debugging modules and `branching` diagram labels. Exempt from the diagram-label and quiz-stem duplication gates; per-module prose stays unique. |

### Example `branching` spec (Pod lifecycle, for module 23)

Demonstrates the new archetype against the ops failure-state need. Valid against
`assets/diagrams.mjs` (`states:[{id,label,col,row?,terminal?}]`,
`transitions:[{from,to,label}]`):

```js
'23-debugging': {
  archetype: 'branching',
  title: 'Pod lifecycle and its failure exits',
  states: [
    { id: 'pending', label: 'Pending', col: 0 },
    { id: 'creating', label: 'ContainerCreating', col: 1 },
    { id: 'running', label: 'Running', col: 2 },
    { id: 'imgpull', label: 'ImagePullBackOff', col: 1, terminal: true },
    { id: 'crash', label: 'CrashLoopBackOff', col: 3, terminal: true },
    { id: 'oom', label: 'OOMKilled', col: 3, terminal: true },
  ],
  transitions: [
    { from: 'pending', to: 'creating', label: 'scheduled' },
    { from: 'creating', to: 'running', label: 'started' },
    { from: 'creating', to: 'imgpull', label: 'bad image' },
    { from: 'running', to: 'crash', label: 'exits nonzero' },
    { from: 'running', to: 'oom', label: 'over memory limit' },
  ],
  caption: 'One object, several exits: where a Pod stalls or dies.',
}
```

## What this profile deliberately overrides

- "runnable code assert" default → manifest + observed/estimated result.
- "numeric calculator lab" default → make-a-tradeoff / see-the-consequence.
- "campus example" copy → operational incident copy (attribute name kept).
- "small numbers" physics tiny case → scheduling/capacity arithmetic tiny case.
- math diagrams → topology / sequence / stack.

Friction encountered applying this override is recorded in `FRICTION.md`.

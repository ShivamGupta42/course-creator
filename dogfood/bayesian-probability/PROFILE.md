# PROFILE — Bayesian Probability

Resolved intake knobs and anchor profile for this course. Every module and gate
reads this file instead of assuming the STEM/college default.

## Intake knobs (resolved)

| Knob | Resolved value | Notes |
|---|---|---|
| Subject + scope | Bayesian probability: priors, likelihood, posterior, Bayes' rule, conjugacy, Beta-Binomial, credible intervals, Bayesian vs frequentist, MCMC intuition, decision-making under uncertainty | Specific, focused technical topic. |
| Audience / level | University graduate / working data analyst. Knows basic probability (random variables, conditional probability) but has never reasoned the Bayesian way. | Not a college freshman. This breaks the STEM-default "campus example" wording (see FRICTION). |
| Size | **15 modules across 3 tracks** (6 / 6 / 3) | Non-default. Justified below. |
| Depth / tone | Intuition-first, then rigorous. Numeric tiny cases the learner can verify by hand or in a few lines of code. | |
| Build project style | Runnable numeric artifact per module (small script / hand calc the learner can re-run on real data) | Verification mode = `runnable` where there is a number to check; `estimate` (sanity bound) for the MCMC/decision modules where the check is a convergence/EV bound, not an exact assert. |
| Runtime | Claude Code | Determines image providers. |
| Image provider | `svg` (deterministic engine) | No image-gen MCP tool connected in this runtime; SVG is the always-available fallback and crisp structure (boxes/arrows, prior→posterior shift) matters more than raster richness here. Per-module specs, never hand-placed. NOTE: this is a dogfood run; diagram files are stubbed, not engine-built. |
| Publish target | none (dogfood; no repo, no push, no serve) | Explicitly out of scope for this run. |

## Anchor profile

The default contracts assume STEM-for-a-college-student: a *campus* example, a
"small numbers" tiny case, a numeric calculator lab, runnable code, math-style
diagrams. This course is STEM-numeric but the audience is a **working data
analyst**, so the anchor domain is shifted off "dorm life" to analyst/real-data
situations.

| Profile field | Value for this course |
|---|---|
| Audience | Working data analyst / recent STEM graduate; comfortable with code and basic probability, new to Bayesian reasoning. |
| Anchor domain (concrete examples) | A/B tests, conversion-rate estimation, click-through rates, churn, fraud screening, sensor/QA defect rates, survey proportions, dashboards and stakeholder questions. NOT dorms, dining halls, or commuting. |
| Metaphor domain | Updating beliefs from evidence: a detective revising a suspect list, a thermostat correcting toward a reading, betting odds shifting as a game unfolds, a Bayesian "filter" on incoming data. |
| "Tiny case" means | A 2-3 outcome numeric case the learner computes by hand: e.g. a disease test with given sensitivity/prevalence, 3 heads in 5 flips with a Beta(1,1) prior, one A/B split with small counts. Small integers and one or two decimals, checkable in under a minute. |
| Artifact + verification mode | A small runnable script or hand calc that outputs a posterior / interval / decision. Mode = `runnable` (assert the posterior matches a closed-form or a re-run) for conjugate modules; `estimate` (sanity-bound: does the chain mix? is the EV ordering right?) for MCMC and decision modules. |
| Allowed lab interaction types | numeric input (prior params, counts), choice (pick the correct posterior / decision), compare-two-outputs (prior vs posterior, Bayesian CI vs frequentist CI). Self-rating not used (this is a numeric subject). |
| Diagram archetypes | `pipeline` (data → likelihood → posterior), `curve` (prior/posterior densities over θ), `barsToValue` (discrete posterior over hypotheses), `parts` (Bayes' rule decomposed), `venn` (joint/conditional for the medical-test case). The talk/scorecard archetypes do not apply. |

### Profile knobs the gates read (single source of truth)

These are the named knobs from SKILL.md's "Profile knobs the gates read" table.
Every gate reads the value here, never a hardcoded STEM string.

| Knob | Value for this course | Why |
|---|---|---|
| `anchor_label` | `Real-data example` | The visible framing of the Real-World Anchor. The machine hook stays `data-campus`/`data-boundary`; the word "campus" is never required. The recipe ships the heading as `Where this shows up`, which this label matches. |
| `anchor_domain` | analyst / experiments / real data (A/B tests, conversion logs, fraud queues, sensor/QA defect rates, dashboards). NOT campus / dorm life. | The audience is a working data analyst; campus-life prose would damage credibility. This is the explicit `anchor_domain ≠ campus` setting the revised contract now sanctions. |
| `formal_card_heading` | `Now Write the Equation` (STEM default kept) | Bayesian probability is a genuinely formula-based subject (`P(H|D) = P(D|H)·P(H)/P(D)`), so the equation card is correct here, not a category error. The knob is recorded explicitly so the gate asserts this value rather than assuming it. |
| `verification_mode` | `runnable` for conjugate/closed-form modules; `estimate` (sanity bound) for MCMC and decision modules | A re-runnable numeric assert exists for conjugate updates; MCMC/decision modules check a convergence or expected-value bound, not an exact assert. |
| `lab_interactions` | `[numeric, choice, compare]` | numeric (prior params, counts), choice (pick the posterior/decision), compare-two-outputs (prior vs posterior, credible vs confidence interval). No self-rating (numeric subject). The `aria-invalid` smoke gate applies only to numeric inputs. |
| `module_count` / `track_split` | `15` / `6-6-3` | Non-default size, declared here so the size gate reads 15 and does not assert 25. Three tracks kept with a sane split. Justified in "Why 15 modules" below. |
| `canonical_tokens` | `[]` (none) | Bayesian probability has no fixed recurring alphabet (unlike the 12 music notes or `I–IV–V`). Symbols like `P(H|D)`, `Beta(a,b)`, `θ` recur but the prose, examples, and quiz stems built on them are written per-module and must stay unique, so nothing is exempted from the anti-templating gate. |

### Anchor-wording override (records a real friction)

The SKILL.md / quality-contract gates hardwire the words **"Campus example"**,
**"college-life"**, and **"small numbers"**. For a working-analyst audience those
words are wrong: a `data-campus` paragraph about dining-hall queues would damage
credibility with the target reader. This course follows the Anchor-Profiles
escape hatch in SKILL.md ("Do not force the word 'campus' or 'small numbers'
into a non-STEM course"): the `data-campus` attribute is **kept** (machine-checkable)
but its prose is an **analyst workplace** situation (an A/B dashboard, a fraud
queue), not a campus one. The visible heading is `Where this shows up`, never
"Campus example". See FRICTION.md for why this is under-specified and where the
two layers disagree about the literal word "campus".

## Why 15 modules, not 25

The default is 25; SKILL.md Anchor Profiles and the quality contract both say "25
is the default, not a law" and a course "may declare a different shape; keep 3
tracks and a sane per-track split." Reasons for 15 here:

1. The scope is one focused technical topic, not a whole discipline. Stretching
   priors/likelihood/posterior/conjugacy/credible-intervals/MCMC/decision over 25
   modules forces padding, and padding is exactly what the title-swap uniqueness
   gate punishes. Fewer, denser modules keep every module genuinely distinct.
2. The audience already owns the prerequisites (random variables, conditional
   probability), so the foundations track does not need 9 modules of ramp-up.
3. 15 = 6 + 6 + 3 keeps the required 3-track shape with a sane split:
   foundations (the Bayesian update itself), core toolkit (conjugacy, intervals,
   comparison to frequentist), advanced (MCMC intuition + decision theory).

### Track map (declared shape)

- **Track 1 — Foundations: the update (6):** Bayes' rule from conditional
  probability; prior; likelihood; posterior; the medical-test case; sequential
  updating.
- **Track 2 — Core toolkit (6):** conjugacy; Beta-Binomial; credible intervals;
  prior choice & sensitivity; Bayesian vs frequentist; predictive distributions.
- **Track 3 — Advanced / projects (3):** MCMC intuition; decision-making under
  uncertainty; a capstone A/B-test analysis.

For this dogfood run only TWO sample modules are authored as full HTML
(`bayes-rule` from Track 1 and `beta-binomial` from Track 2).

## Optional mode fixture

This dogfood bundle enables both optional PR modes so `dogfood/validate.mjs` can
exercise their cheap structural gates. It is still a partial dogfood bundle, not
a full browser app.

```yaml
course_mode: hybrid
problem_first:
  enabled: true
  problem_count: 3
  track_split: [1, 1, 1]
  diagnostic:
    real_goal: "Make better uncertainty decisions from small, noisy samples."
    current_level: working
    known_terms: [probability, conditional probability, random variable]
    math_comfort: algebra
    domain_contexts: [A/B tests, medical tests, product analytics]
    preferred_problem_domains: [tests, conversion rates, launch decisions]
    time_budget: "three short sessions"
    depth: practitioner
    safety_boundaries: [education only, no medical diagnosis]
resource_library:
  enabled: true
  modes: [free_courses, references]
  youtube_display: links
  max_items: 3
```

---
type: LearningRecord
title: Session 1 — Bayes' rule and the prior
covers: [../../knowledge/bayes-rule.md, ../../knowledge/conditional-probability.md, ../../knowledge/prior.md]
timestamp: 2026-06-07T21:30:00Z
---
Worked the SAMPLE module "Bayes' rule from conditional probability". Conditional
probability was already solid, so I skipped the ramp and went straight to the
flip. They re-derived `P(H|D) = P(D|H)P(H)/P(D)` from the joint after one nudge
about writing `P(H ∩ D)` two ways; clean teach-back, so bayes-rule is solid.

Ran the medical-test tiny case (1% prevalence, 90% sensitivity, 9% false
positive): they were surprised the posterior was ~0.09, which made the base-rate
point land. Anchored it to a fraud-screening queue from their own work rather
than anything campus-y, which kept them engaged.

Started the prior. They understand "belief before data" conceptually but keep
defaulting to a flat prior to avoid committing to a number. Left prior as shaky
and queued it for next session at lower load: re-teach with one concrete
informative prior (a Beta around a known 4% base conversion rate) so committing
to a number feels safe. Did not start likelihood. Updated state.md rows for
conditional-probability, bayes-rule, prior.

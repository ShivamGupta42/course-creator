---
type: Concept
title: Posterior Distribution
sources:
  - https://en.wikipedia.org/wiki/Posterior_probability
prerequisites: [../knowledge/prior.md, ../knowledge/likelihood.md]
timestamp: 2026-06-01T09:20:00Z
---
The updated distribution over the unknown after combining the prior with the
evidence. It is the full Bayesian answer: not a point estimate but a distribution
expressing remaining uncertainty.

Formally `P(θ|D) ∝ P(D|θ) · P(θ)`, the output of [Bayes' rule](../knowledge/bayes-rule.md)
combining the [prior](../knowledge/prior.md) and the [likelihood](../knowledge/likelihood.md).
Everything downstream (point estimates, intervals, decisions) is a summary of it.

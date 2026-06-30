---
type: Concept
title: Bayesian Decision Under Uncertainty
sources:
  - https://en.wikipedia.org/wiki/Bayes_estimator
  - https://en.wikipedia.org/wiki/Loss_function
prerequisites: [../knowledge/posterior.md]
timestamp: 2026-06-01T09:50:00Z
---
Choosing an action by averaging a loss (or utility) over the
[posterior](../knowledge/posterior.md) and picking the action with the best
expected value. It turns a distribution of beliefs into a single defensible
decision.

Formally, pick the action `a` minimizing posterior expected loss
`E[L(θ, a) | D] = ∫ L(θ, a) P(θ|D) dθ`. The loss function encodes the real
business cost of being wrong, which is why the same posterior can justify
different actions under different loss functions.

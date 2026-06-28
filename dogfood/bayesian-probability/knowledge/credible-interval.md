---
type: Concept
title: Credible Interval
sources:
  - https://en.wikipedia.org/wiki/Credible_interval
prerequisites: [../knowledge/posterior.md]
timestamp: 2026-06-01T09:35:00Z
---
An interval that contains the parameter with a stated posterior probability. A
95% credible interval means: given the model and data, there is a 0.95 posterior
probability the parameter lies inside it.

Formally an interval `[L, U]` with `P(L ≤ θ ≤ U | D) = 0.95` under the
[posterior](../knowledge/posterior.md), commonly the equal-tailed or
highest-density region. Its interpretation differs from a frequentist confidence
interval (see [Bayesian vs frequentist](../knowledge/bayesian-vs-frequentist.md)).

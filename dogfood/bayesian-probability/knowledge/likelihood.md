---
type: Concept
title: Likelihood
sources:
  - https://en.wikipedia.org/wiki/Likelihood_function
prerequisites: [../knowledge/conditional-probability.md]
timestamp: 2026-06-01T09:15:00Z
---
The probability of the observed data viewed as a function of the parameter, with
the data held fixed. It scores how well each candidate parameter value explains
what you actually saw.

Formally `L(θ) = P(D | θ)`, the same `P(D|H)` term that sits in the numerator of
[Bayes' rule](../knowledge/bayes-rule.md). It is not a probability distribution
over θ (it need not integrate to 1 over θ); that is a common confusion the course
repairs.

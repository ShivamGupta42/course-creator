---
type: Concept
title: Conditional Probability
sources:
  - https://en.wikipedia.org/wiki/Conditional_probability
prerequisites: []
timestamp: 2026-06-01T09:00:00Z
---
The probability of an event A given that event B has occurred, written `P(A|B)`.
It rescales the probability of A to the world where B is known to be true.

Formally `P(A|B) = P(A ∩ B) / P(B)` for `P(B) > 0`. This is the root of the whole
Bayesian machinery: every later concept is a rearrangement or repeated
application of it. Taught (assumed prerequisite) by [Module bayes-rule](../course.md).

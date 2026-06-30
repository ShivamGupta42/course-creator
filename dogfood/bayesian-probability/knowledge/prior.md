---
type: Concept
title: Prior Distribution
sources:
  - https://en.wikipedia.org/wiki/Prior_probability
prerequisites: [../knowledge/bayes-rule.md]
timestamp: 2026-06-01T09:10:00Z
---
The distribution over an unknown quantity before seeing the current data. It
encodes what you already believe or know about a parameter such as a conversion
rate θ.

Formally the `P(H)` term in [Bayes' rule](../knowledge/bayes-rule.md). A prior can
be informative (a tight Beta around a known base rate) or weak/flat (Beta(1,1),
uniform). It is a modeling choice, not a fact, which is why prior sensitivity
must be reported.

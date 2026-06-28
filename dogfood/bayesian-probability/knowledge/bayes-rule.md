---
type: Concept
title: Bayes' Rule
sources:
  - https://en.wikipedia.org/wiki/Bayes%27_theorem
  - https://seeing-theory.brown.edu/bayesian-inference/index.html
prerequisites: [../knowledge/conditional-probability.md]
timestamp: 2026-06-01T09:05:00Z
---
A rule for flipping a conditional probability: it turns `P(data|hypothesis)`,
which you can usually model, into `P(hypothesis|data)`, which is what you want.

Formally `P(H|D) = P(D|H) · P(H) / P(D)`, where `P(D) = Σ_h P(D|h) P(h)` is the
normalizing constant. It follows in one line from [conditional probability](../knowledge/conditional-probability.md)
applied both ways to the joint `P(H ∩ D)`. Taught by [Module bayes-rule](../guide/content/bayes-rule.html).

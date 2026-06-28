---
type: Concept
title: Beta-Binomial Model
sources:
  - https://en.wikipedia.org/wiki/Beta-binomial_distribution
  - https://en.wikipedia.org/wiki/Conjugate_prior
prerequisites: [../knowledge/conjugacy.md]
timestamp: 2026-06-01T09:30:00Z
---
The canonical conjugate pair for a proportion: a Beta prior on a success
probability θ, updated by Binomial (count) data, yields a Beta posterior.

Formally, prior `θ ~ Beta(a, b)` and data of `s` successes in `n` trials give
posterior `θ | data ~ Beta(a + s, b + n − s)`. It is a direct instance of
[conjugacy](../knowledge/conjugacy.md) and the workhorse for estimating
conversion or click-through rates. Taught by [Module beta-binomial](../guide/content/beta-binomial.html).

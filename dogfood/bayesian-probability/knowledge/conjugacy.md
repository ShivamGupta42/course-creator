---
type: Concept
title: Conjugate Prior
sources:
  - https://en.wikipedia.org/wiki/Conjugate_prior
prerequisites: [../knowledge/posterior.md]
timestamp: 2026-06-01T09:25:00Z
---
A prior whose family is closed under updating with a given likelihood: the
posterior lands in the same family, so the update becomes arithmetic on the
parameters instead of an integral.

Formally, a prior family F is conjugate to a likelihood if the
[posterior](../knowledge/posterior.md) stays in F for all data. Conjugacy is a
convenience, not a requirement; it gives closed-form updates that make the
Bayesian mechanics legible before [MCMC](../knowledge/mcmc.md) is needed.

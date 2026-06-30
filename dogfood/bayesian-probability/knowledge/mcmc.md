---
type: Concept
title: Markov Chain Monte Carlo
sources:
  - https://en.wikipedia.org/wiki/Markov_chain_Monte_Carlo
  - https://en.wikipedia.org/wiki/Metropolis%E2%80%93Hastings_algorithm
prerequisites: [../knowledge/posterior.md]
timestamp: 2026-06-01T09:45:00Z
---
A family of algorithms that draw samples from a [posterior](../knowledge/posterior.md)
you cannot integrate in closed form, by walking a Markov chain whose stationary
distribution is that posterior.

Intuitively a walker proposes a nearby parameter value and accepts or rejects it
so that, over many steps, the time it spends in a region is proportional to the
posterior density there. The samples then stand in for the distribution. It is
the escape hatch when [conjugacy](../knowledge/conjugacy.md) does not apply, at
the cost of convergence diagnostics rather than an exact answer.

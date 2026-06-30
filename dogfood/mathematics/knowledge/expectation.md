---
type: Concept
title: Expectation
sources:
  - https://en.wikipedia.org/wiki/Expected_value
prerequisites:
  - ../knowledge/probability.md
timestamp: 2026-06-22T09:00:00Z
---
The expectation of a numeric random quantity is its long-run average value, found by
weighting each possible value by how likely it is and summing. It is the balance
point of the distribution, the single number you would predict to be closest on
average across many repeats.

Formally, for a discrete random variable `X` taking value `xᵢ` with probability
`pᵢ`, the expectation is `E[X] = Σ xᵢ·pᵢ`. Expectation is linear:
`E[aX + bY] = a·E[X] + b·E[Y]` for any constants `a, b`.

Taught by [Module 23](../course.md).

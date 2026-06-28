---
type: Concept
title: Probability
sources:
  - https://en.wikipedia.org/wiki/Probability
  - https://en.wikipedia.org/wiki/Probability_axioms
prerequisites:
  - ../knowledge/sets-and-counting.md
timestamp: 2026-06-20T09:00:00Z
---
Probability assigns each event a number between 0 and 1 measuring how often it
happens in the long run or how strongly it is expected. For equally likely outcomes
it is the count of favorable outcomes over the count of all outcomes, which is why
counting comes first.

Formally, a probability `P` on a sample space `Ω` satisfies `P(Ω) = 1`, `P(E) ≥ 0`,
and `P(A ∪ B) = P(A) + P(B)` for disjoint `A, B`. For a uniform finite space,
`P(E) = |E| / |Ω|`.

Taught by [Module 22](../guide/content/22-probability.md).

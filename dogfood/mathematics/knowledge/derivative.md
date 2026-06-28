---
type: Concept
title: The derivative
sources:
  - https://en.wikipedia.org/wiki/Derivative
prerequisites:
  - ../knowledge/limits.md
  - ../knowledge/slope-and-rate.md
timestamp: 2026-06-14T09:00:00Z
---
The derivative is the instantaneous rate of change of a function, the slope of the
line that just grazes the graph at a point. It is built by taking the slope between
a point and a nearby point, then letting the gap shrink to zero so the average rate
becomes the rate right there.

Formally, `f'(a) = lim_{h→0} (f(a + h) − f(a))/h` when that limit exists. It is the
limit of the slope-and-rate ratio as the second point slides into the first, which is
why both limits and slope are prerequisites.

Taught by [Module 18](../guide/content/18-derivative.md).

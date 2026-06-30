---
type: Concept
title: Limits
sources:
  - https://en.wikipedia.org/wiki/Limit_(mathematics)
prerequisites:
  - ../knowledge/functions.md
timestamp: 2026-06-12T09:00:00Z
---
A limit is the value a function's output approaches as its input approaches a target,
whether or not the function is defined at the target itself. It captures "where the
output is heading" by looking at inputs arbitrarily close to the target rather than at
the target alone.

Formally, `lim_{x→a} f(x) = L` means: for every tolerance `ε > 0` there is a
closeness `δ > 0` such that `0 < |x − a| < δ` forces `|f(x) − L| < ε`. The behavior
at `x = a` itself is irrelevant to the limit.

Taught by [Module 17](../course.md).

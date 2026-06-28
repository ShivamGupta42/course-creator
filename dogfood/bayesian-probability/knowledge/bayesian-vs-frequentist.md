---
type: Concept
title: Bayesian vs Frequentist Inference
sources:
  - https://en.wikipedia.org/wiki/Frequentist_inference
  - https://en.wikipedia.org/wiki/Bayesian_inference
prerequisites: [../knowledge/credible-interval.md]
timestamp: 2026-06-01T09:40:00Z
---
Two stances on what probability describes. Frequentist inference treats the
parameter as fixed and the data as random, reporting procedures with long-run
guarantees (confidence intervals, p-values). Bayesian inference treats the
parameter as uncertain and the data as fixed, reporting a
[posterior](../knowledge/posterior.md) and [credible intervals](../knowledge/credible-interval.md).

The key contrast: a 95% confidence interval is a statement about the procedure
across hypothetical repeats, while a 95% credible interval is a statement about
this parameter given this data. Misreading one as the other is the most common
error this course targets.

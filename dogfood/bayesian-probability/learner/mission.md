---
type: Mission
title: Stop misreading uncertainty in A/B tests
timestamp: 2026-06-03T10:00:00Z
---
Works as a data analyst on a growth team. Keeps getting asked "is variant B
actually better?" and currently answers with a p-value they don't fully trust
and a confidence interval they suspect they're explaining wrong to stakeholders.
Wants to stop misreading p-values and confidence intervals and instead reason
directly about uncertainty: state a prior, read a posterior, report "there's a
92% chance B beats A" in plain language a PM can act on.

Cares specifically about the Beta-Binomial conversion-rate case (that's most of
their work), credible intervals, and the Bayesian-vs-frequentist distinction so
they can defend the switch in a review. Has roughly four weeks of evenings.

Success = can take a real A/B result (successes and trials per arm), compute the
posterior over each conversion rate, report P(B > A) and a 95% credible
interval, and explain to a non-statistician why that statement is allowed and a
confidence interval is not. MCMC and decision theory are a bonus, not required
for "done".

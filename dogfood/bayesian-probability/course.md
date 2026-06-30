---
type: Course
title: Bayesian Probability — Reasoning About Uncertainty
timestamp: 2026-06-28T14:30:00Z
audience: Working data analyst / STEM graduate, new to Bayesian reasoning
size: 15 modules, 3 tracks (6 / 6 / 3)
profile: ./PROFILE.md
---

A focused course that takes an analyst who already knows random variables and
conditional probability and teaches them to reason the Bayesian way: state a
prior, weigh it against evidence, and read a posterior as a distribution of
belief. Intuition first, then the arithmetic, then real A/B-test decisions.

Guiding question: when new data arrives, how much should I move my belief, and
how should I act on what I still don't know?

See [PROFILE.md](./PROFILE.md) for the anchor profile and the 15-module
justification. Two modules are authored as full HTML in this dogfood run
(marked SAMPLE).

## Track 1 — Foundations: the update (6)

1. **Bayes' rule from conditional probability** (SAMPLE) — flip `P(D|H)` into `P(H|D)`. Teaches [bayes-rule](knowledge/bayes-rule.md), [conditional-probability](knowledge/conditional-probability.md).
2. **The prior: belief before data** — encode what you already know as a distribution. Teaches [prior](knowledge/prior.md).
3. **The likelihood: how data scores a hypothesis** — read `P(D|θ)` as a function of θ. Teaches [likelihood](knowledge/likelihood.md).
4. **The posterior: belief after data** — combine prior and likelihood into the full answer. Teaches [posterior](knowledge/posterior.md).
5. **The medical-test case** — base rates, false positives, and why a positive test rarely means disease. Teaches [bayes-rule](knowledge/bayes-rule.md), [conditional-probability](knowledge/conditional-probability.md).
6. **Sequential updating** — yesterday's posterior is today's prior. Teaches [posterior](knowledge/posterior.md), [prior](knowledge/prior.md).

## Track 2 — Core toolkit (6)

7. **Conjugacy: when updating is arithmetic** — priors that keep the posterior in the same family. Teaches [conjugacy](knowledge/conjugacy.md).
8. **The Beta-Binomial model** (SAMPLE) — estimate a conversion rate from successes and trials. Teaches [beta-binomial](knowledge/beta-binomial.md), [conjugacy](knowledge/conjugacy.md).
9. **Credible intervals** — an interval the parameter is 95% likely to be in. Teaches [credible-interval](knowledge/credible-interval.md).
10. **Choosing and stress-testing a prior** — informative vs weak priors and sensitivity analysis. Teaches [prior](knowledge/prior.md).
11. **Bayesian vs frequentist** — credible intervals vs confidence intervals, posteriors vs p-values. Teaches [bayesian-vs-frequentist](knowledge/bayesian-vs-frequentist.md), [credible-interval](knowledge/credible-interval.md).
12. **Predictive distributions** — predict the next observation, not just the parameter. Teaches [posterior](knowledge/posterior.md), [beta-binomial](knowledge/beta-binomial.md).

## Track 3 — Advanced / projects (3)

13. **MCMC intuition** — sampling a posterior you cannot integrate. Teaches [mcmc](knowledge/mcmc.md), [posterior](knowledge/posterior.md).
14. **Decision-making under uncertainty** — turn a posterior into an action via expected loss. Teaches [decision-under-uncertainty](knowledge/decision-under-uncertainty.md).
15. **Capstone: a full Bayesian A/B test** — prior, posterior, credible interval, P(B>A), and a ship/no-ship decision. Teaches [beta-binomial](knowledge/beta-binomial.md), [decision-under-uncertainty](knowledge/decision-under-uncertainty.md), [bayesian-vs-frequentist](knowledge/bayesian-vs-frequentist.md).

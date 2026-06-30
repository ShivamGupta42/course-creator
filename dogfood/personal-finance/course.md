---
type: Course
title: Personal Finance for Working Adults
timestamp: 2026-06-28T16:00:00Z
profile: ./PROFILE.md
tracks: 3
modules: 25
anchor_profile: non-stem (money-life)
---

A practical, math-light course for a working adult who wants to budget, kill
debt, build an emergency fund, invest sensibly, use tax-advantaged accounts,
and avoid scams. 25 modules across 3 tracks (9 / 9 / 7). Every module links the
canonical concepts it teaches from [knowledge/](knowledge/); the teaching itself
(metaphor, example, diagram, change-one-thing prompt) is unique per module.

Verification is `estimate` or `rubric`, never `runnable` (see
[PROFILE.md](PROFILE.md)). Anchors come from real money situations, not campus
life.

## Track 1 — Foundations: see and steer your money (9 modules)

| # | id | Title | Teaches (knowledge/) |
|---|---|---|---|
| 01 | 01-where-money-goes | Where your money actually goes | [cash-flow](knowledge/cash-flow.md) |
| 02 | 02-net-vs-gross | Net pay vs gross pay, and the deductions in between | [cash-flow](knowledge/cash-flow.md) |
| 03 | 03-build-a-budget | Build a budget you will actually keep | [budgeting](knowledge/budgeting.md), [cash-flow](knowledge/cash-flow.md) |
| 04 | 04-savings-rate | Your savings rate, the one number that matters | [savings-rate](knowledge/savings-rate.md), [budgeting](knowledge/budgeting.md) |
| 05 | 05-emergency-fund | The emergency fund: why three to six months | [emergency-fund](knowledge/emergency-fund.md) |
| 06 | 06-good-debt-bad-debt | Reading a debt: APR, minimums, and the trap | [interest-and-apr](knowledge/interest-and-apr.md) |
| 07 | 07-compound-interest | Compound interest, working for you and against you | [compound-interest](knowledge/compound-interest.md), [interest-and-apr](knowledge/interest-and-apr.md) |
| 08 | 08-sinking-funds | Sinking funds: paying future bills in advance | [budgeting](knowledge/budgeting.md), [cash-flow](knowledge/cash-flow.md) |
| 09 | 09-track-net-worth | Net worth: the scoreboard for everything else | [net-worth](knowledge/net-worth.md) |

## Track 2 — Core toolkit: debt, accounts, and first investing (9 modules)

| # | id | Title | Teaches (knowledge/) |
|---|---|---|---|
| 10 | 10-avalanche-vs-snowball | Avalanche vs snowball: two ways to kill debt | [debt-payoff-strategies](knowledge/debt-payoff-strategies.md), [interest-and-apr](knowledge/interest-and-apr.md) |
| 11 | 11-payoff-timeline | Estimating a payoff timeline | [debt-payoff-strategies](knowledge/debt-payoff-strategies.md), [compound-interest](knowledge/compound-interest.md) |
| 12 | 12-employer-match | The 401(k) match: the closest thing to free money | [tax-advantaged-accounts](knowledge/tax-advantaged-accounts.md) |
| 13 | 13-roth-vs-traditional | Roth vs traditional: pay tax now or later | [tax-advantaged-accounts](knowledge/tax-advantaged-accounts.md) |
| 14 | 14-index-funds | Index funds: owning the whole market cheaply | [diversification](knowledge/diversification.md) |
| 15 | 15-asset-allocation | Asset allocation: stocks, bonds, and your timeline | [asset-allocation](knowledge/asset-allocation.md), [diversification](knowledge/diversification.md) |
| 16 | 16-fees-and-expense-ratios | Fees and expense ratios: the silent leak | [compound-interest](knowledge/compound-interest.md) |
| 17 | 17-dollar-cost-averaging | Dollar-cost averaging: investing on a schedule | [asset-allocation](knowledge/asset-allocation.md) |
| 18 | 18-credit-score | Your credit score: what moves it and what doesn't | [interest-and-apr](knowledge/interest-and-apr.md) |

## Track 3 — Putting it together and staying safe (7 modules)

| # | id | Title | Teaches (knowledge/) |
|---|---|---|---|
| 19 | 19-order-of-operations | The money order of operations: what to fund first | [budgeting](knowledge/budgeting.md), [emergency-fund](knowledge/emergency-fund.md), [tax-advantaged-accounts](knowledge/tax-advantaged-accounts.md) |
| 20 | 20-pay-debt-or-invest | Pay down debt or invest? Comparing the return | [debt-payoff-strategies](knowledge/debt-payoff-strategies.md), [compound-interest](knowledge/compound-interest.md) |
| 21 | 21-inflation | Inflation: why your cash quietly shrinks | [inflation](knowledge/inflation.md), [compound-interest](knowledge/compound-interest.md) |
| 22 | 22-spotting-scams | Spotting scams and phishing before they cost you | [financial-scams](knowledge/financial-scams.md) |
| 23 | 23-big-purchases | Big purchases: cars, homes, and the true cost | [interest-and-apr](knowledge/interest-and-apr.md), [net-worth](knowledge/net-worth.md) |
| 24 | 24-insurance-basics | Insurance: paying a little to avoid a catastrophe | [emergency-fund](knowledge/emergency-fund.md) |
| 25 | 25-yearly-checkup | The yearly money checkup: rebalance and review | [net-worth](knowledge/net-worth.md), [asset-allocation](knowledge/asset-allocation.md) |

## Concept prerequisite graph (DAG)

The canonical concepts in [knowledge/](knowledge/) form a directed acyclic
graph. Roots have no prerequisites; later concepts link earlier ones.

```text
cash-flow ──▶ budgeting ──▶ savings-rate
cash-flow ──▶ emergency-fund
interest-and-apr ──▶ compound-interest
interest-and-apr ──▶ debt-payoff-strategies
compound-interest ──▶ tax-advantaged-accounts
diversification ──▶ asset-allocation
compound-interest ──▶ inflation
budgeting ──▶ net-worth
(financial-scams: standalone, no money-math prerequisite)
```

## Sample modules built in this dogfood run

Two modules are authored in full under `guide/content/`, adapted to the NON-STEM
anchor profile (verification `estimate`/`rubric`, money-life anchors):

- [07-compound-interest.html](guide/content/07-compound-interest.html) — the one
  module where "Now Write the Equation" holds a genuine formula.
- [22-spotting-scams.html](guide/content/22-spotting-scams.html) — the stress
  test: a module with NO formula, where the equation card must hold a decision
  rule. Friction logged in [FRICTION.md](FRICTION.md).

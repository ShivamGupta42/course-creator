---
type: LearningRecord
title: Session 2 — Beta-Binomial conversion rates
covers: [../../knowledge/beta-binomial.md, ../../knowledge/conjugacy.md]
timestamp: 2026-06-14T21:35:00Z
---
Jumped ahead to the SAMPLE module "The Beta-Binomial model" because it is the
mission's core (conversion rates) and motivation was higher there than on the
likelihood drill. Covered conjugacy lightly as the setup, then the Beta-Binomial
update itself.

They got the headline rule `Beta(a, b) → Beta(a + s, b + n − s)` and ran the
worked card: prior Beta(1,1), data 8 successes in 40 trials, posterior
Beta(9, 33), posterior mean 9/42 ≈ 0.214. The slip: on the faded card they put
the trial count `n` into the failure slot instead of `n − s`, so they got
Beta(9, 41). Fixed it by re-labeling the two counts out loud as "successes" and
"non-successes" and re-running. Worth flagging the failure-count slot again next
time.

Left beta-binomial as shaky (one clean run, one slip), scheduled next session
faded-then-independent on a fresh dataset. Did NOT do credible intervals yet,
which the mission needs, so credible-interval is queued right after this lands.
prior is still shaky and was not revisited; pull it back in. Updated state.md
rows for beta-binomial and conjugacy.

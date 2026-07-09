# Thinking Patterns: Bayesian Probability

This dogfood playbook is deliberately small. `PROFILE.md` declares
`thinking_patterns.pattern_count: 6` so `dogfood/validate.mjs` can exercise the
optional-mode structure without turning the dogfood bundle into a full
generated course. Each expert trace names the alternative move it rejected, the
mechanical proxy for showing selection, not just execution.

```yaml
- id: write-out-both-worlds
  name: "Write out both worlds"
  formal_term: "hypothesis partitioning"
  cue: "Evidence and a claim are tangled together, like a test result and the condition it tests for."
  steps:
    - "Imagine 1000 cases before any formula."
    - "Split them into the world where the claim holds and the world where it does not."
    - "Count how often the evidence appears in each world."
    - "Read the answer as one count divided by the sum of both."
  expert_trace: "On the fraud-flag case I nearly settled for Chase the base rate on its own, but one number could not show where the false alarms come from, so I imagined 1000 messages, split them into fraud and clean, and counted flags in each pile."
  misleads_when: "The two worlds are not exhaustive or overlap, so the counts double-book cases."
  contrast_with: chase-the-base-rate
  how_to_tell_apart: "Chasing the base rate fetches the missing input; writing out both worlds is the table you put it in."
  modules: [bayes-rule, medical-test-case]
  problems: [01-trust-a-positive-test]
- id: chase-the-base-rate
  name: "Chase the base rate"
  formal_term: "prior probability"
  cue: "A vivid piece of evidence arrives and everyone reads it without asking how common the thing is."
  steps:
    - "Name the event the evidence points at."
    - "Ask how often that event holds before any evidence arrives."
    - "Hunt a real frequency for it: logs, history, published rates."
    - "Hold off on strength-of-evidence talk until that number is on the table."
  expert_trace: "Reading a 90 percent sensitivity claim, I wanted to Write out both worlds immediately, but I had no fraud rate to split the 1000 cases with, so the base rate had to come first."
  misleads_when: "The reference class is wrong, like yesterday's fraud rate applied to a new attack pattern."
  contrast_with: write-out-both-worlds
  how_to_tell_apart: "No base rate yet: chase it. Base rate in hand: build the table."
  modules: [medical-test-case, bayes-vs-frequentist]
  problems: [01-trust-a-positive-test]
- id: update-do-not-replace
  name: "Update, do not replace"
  formal_term: "Bayesian updating"
  cue: "Fresh data lands and the newest sample is about to stand in for everything seen so far."
  steps:
    - "Write down what you believed before the data, as counts or a curve."
    - "Add the new evidence to those counts instead of overwriting them."
    - "Check the posterior sits between prior and data, closer to whichever is stronger."
    - "Carry the posterior forward as the next prior."
  expert_trace: "With 12 sales from 80 visits I was tempted to report 15 percent flat; instead I kept the prior counts and added the new ones, and only then ran Stress the prior to see whether the starting belief still mattered."
  misleads_when: "The world changed mid-stream, so the old counts describe a rate that no longer exists."
  contrast_with: stress-the-prior
  how_to_tell_apart: "Updating folds data into one belief; stressing the prior asks whether different starting beliefs converge."
  modules: [beta-binomial, sequential-updating]
  problems: [02-update-a-conversion-rate]
- id: stress-the-prior
  name: "Stress the prior"
  formal_term: "prior sensitivity analysis"
  cue: "Two reasonable colleagues would start from different beliefs and the conclusion may depend on who wins."
  steps:
    - "Pick two or three defensible priors, including a skeptical one."
    - "Rerun the same update from each."
    - "Compare the decisions they imply, not the curves."
    - "Report whether the call survives the spread."
  expert_trace: "Before defending the A/B call I reran it from a flat and a skeptical prior. I considered letting Update, do not replace stand alone, but updating from one prior cannot say how much that prior drove the result."
  misleads_when: "With plenty of data all reasonable priors agree and the exercise only pads the report."
  contrast_with: update-do-not-replace
  how_to_tell_apart: "One prior updated is a belief; several priors updated is a robustness check."
  modules: [prior-sensitivity, beta-binomial]
  problems: []
- id: simulate-before-you-derive
  name: "Simulate before you derive"
  formal_term: "Monte Carlo simulation"
  cue: "The algebra is growing and there is no feel yet for whether the closed form is even plausible."
  steps:
    - "Write the generative story as a few lines of code."
    - "Draw ten thousand samples from it."
    - "Read the histogram for shape, center, and spread."
    - "Derive the closed form afterward and check it against the draws."
  expert_trace: "For the predictive distribution I drew ten thousand fake weeks first. I weighed Write out both worlds, but enumeration explodes past two hypotheses, and sampling keeps working where tables stop."
  misleads_when: "Rare tails: a one-in-a-million event needs far more draws than you ran."
  contrast_with: write-out-both-worlds
  how_to_tell_apart: "Enumerate when the worlds fit in a table; sample when they do not."
  modules: [mcmc-intuition, predictive-distributions]
  problems: []
- id: price-both-mistakes
  name: "Price both mistakes"
  formal_term: "expected loss"
  cue: "The posterior is in hand, someone still has to act, and the two ways of being wrong cost different amounts."
  steps:
    - "Name the action and both failure modes."
    - "Attach a cost to each failure in real units: money, time, trust."
    - "Weigh each cost by the posterior probability of its failure."
    - "Act on the smaller expected loss and say what threshold would flip it."
  expert_trace: "Shipping at a 60 percent posterior looked reckless until I priced it: a wrong ship costs a rollback, a wrong hold costs a quarter of growth. I thought about running Stress the prior again, but the posterior was already stable; the open question was the loss table."
  misleads_when: "The costs are guesses dressed as numbers, and confident nonsense comes out."
  contrast_with: update-do-not-replace
  how_to_tell_apart: "Updating moves the belief; pricing moves the action threshold."
  modules: [decision-under-uncertainty, ab-test-capstone]
  problems: [03-ship-a-b-test-winner]
```

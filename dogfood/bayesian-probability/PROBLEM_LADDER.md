# Problem Ladder: Bayesian Probability

This dogfood ladder is deliberately small. `PROFILE.md` declares
`problem_first.problem_count: 3` and `track_split: [1, 1, 1]` so the validator
can exercise the optional-mode structure without turning the dogfood bundle into
a full generated course.

```yaml
- id: 01-trust-a-positive-test
  title: "Should I trust a positive test result?"
  track: "Everyday footholds"
  difficulty: easy
  learner_need: "Avoid overreacting when a rare-event test returns positive."
  starting_intuition: "A positive result means the condition is likely."
  prerequisite_check: "Can compare counts out of 1000."
  hidden_concepts: [base-rate, conditional-probability, false-positive]
  expert_terms_introduced: [base rate, Bayes rule]
  artifact: "A two-row frequency table and a one-sentence decision."
  safety_level: normal
  unsafe_boundary: ""
  safe_redirect: ""
  extends_from: ""
  changed_assumption: ""
- id: 02-update-a-conversion-rate
  title: "How much should 12 sales from 80 visits change my estimate?"
  track: "Useful tools"
  difficulty: working
  learner_need: "Update an uncertain conversion-rate estimate without overfitting one small sample."
  starting_intuition: "The observed rate is the best estimate."
  prerequisite_check: "Can turn successes and trials into a proportion."
  hidden_concepts: [prior, likelihood, posterior, beta-binomial]
  expert_terms_introduced: [prior, posterior, Beta-Binomial]
  artifact: "A posterior mean and a short caution about sample size."
  safety_level: normal
  unsafe_boundary: ""
  safe_redirect: ""
  extends_from: "01-trust-a-positive-test"
  changed_assumption: "The unknown is a rate, not a yes-or-no condition."
- id: 03-ship-a-b-test-winner
  title: "Should I ship the variant that currently looks better?"
  track: "Advanced judgment"
  difficulty: capstone
  learner_need: "Turn an uncertain A/B-test posterior into a launch decision."
  starting_intuition: "Ship the variant with the higher observed conversion rate."
  prerequisite_check: "Can compare two uncertain conversion-rate estimates."
  hidden_concepts: [posterior, expected-loss, decision-under-uncertainty]
  expert_terms_introduced: [expected loss, posterior probability, decision rule]
  artifact: "A ship/no-ship memo with expected downside."
  safety_level: normal
  unsafe_boundary: ""
  safe_redirect: ""
  extends_from: "02-update-a-conversion-rate"
  changed_assumption: "There are now two uncertain rates and a cost of being wrong."
```

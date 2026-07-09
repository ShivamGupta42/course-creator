# Resource Library: Bayesian Probability

This small fixture validates the resource-library contract shape. It is not a
live-link audit.

```yaml
- id: bayes-wikipedia
  title: "Bayes theorem"
  type: reference
  provider: Wikipedia
  institution: Wikimedia Foundation
  url: https://en.wikipedia.org/wiki/Bayes%27_theorem
  level: beginner
  cost: free
  time: reference
  modules: [bayes-rule]
  concepts: [bayes-rule, conditional-probability]
  use_when: "You need a compact reference for the theorem notation after solving the frequency-table case."
  why_this: "It states the standard theorem and links the related conditional-probability definitions used in the course."
  watch_or_read_after: "Problem 01"
- id: stat110-conditional-probability
  title: "Statistics 110: Conditional Probability"
  type: free_course
  provider: Harvard Online
  institution: Harvard University
  url: https://projects.iq.harvard.edu/stat110/home
  level: intermediate
  cost: free
  time: 60 min
  modules: [bayes-rule]
  concepts: [conditional-probability, bayes-rule]
  use_when: "The denominator in Bayes rule still feels like symbol juggling."
  why_this: "The course is a public university probability sequence with full lectures and notes for conditional-probability foundations."
  watch_or_read_after: "Module 01"
- id: stan-docs-bayes-modeling
  title: "Stan User's Guide"
  type: docs
  provider: Stan
  institution: Stan Development Team
  url: https://mc-stan.org/docs/
  level: advanced
  cost: free
  time: reference
  modules: [mcmc, ab-test-capstone]
  concepts: [mcmc, posterior, decision-under-uncertainty]
  use_when: "You want to see how posterior sampling ideas become real model code."
  why_this: "It is the official documentation for a widely used Bayesian modeling system and connects MCMC ideas to practical workflows."
  watch_or_read_after: "Module 13"
```

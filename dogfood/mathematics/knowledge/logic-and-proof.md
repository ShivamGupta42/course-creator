---
type: Concept
title: Logic and proof
sources:
  - https://en.wikipedia.org/wiki/Mathematical_proof
  - https://en.wikipedia.org/wiki/Propositional_calculus
prerequisites:
  - ../knowledge/variables-and-expressions.md
timestamp: 2026-06-16T09:00:00Z
---
A proof is a chain of statements where each one follows from earlier ones or from
agreed assumptions by a valid rule of inference, ending at the claim. Logic supplies
the rules: how "and", "or", "not", "if-then", and "for all" combine truths so a
true conclusion cannot rest on true premises by accident.

Formally, a proof of `P` from axioms `Γ` is a finite sequence ending in `P` where
each line is an axiom, a premise in `Γ`, or follows from earlier lines by an
inference rule such as modus ponens: from `A` and `A → B`, conclude `B`.

Taught by [Module 14](../course.md).

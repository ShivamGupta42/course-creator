# Contributing to Course Creator

Thanks for helping out. Issues and PRs are welcome, from a one-line typo fix to a
new diagram archetype or a new subject profile.

Course Creator is a skill for Claude Code and Codex. It turns a topic into a
complete, static, self-study course, and holds every course to the same bar: a
course is done when its static check and browser test actually run and pass. The
same discipline applies to changes here.

By taking part, you agree to the [Code of Conduct](CODE_OF_CONDUCT.md).

## Ways to contribute

- **Report a bug or rough edge.** Open an issue with the course and module, what
  you expected, and what happened. A screenshot of the broken lesson, or the
  failing `npm test` output, is the most useful thing you can include.
- **Suggest a feature.** Open an issue first so we can agree on the shape. The
  quality bar lives in `references/`; most improvements are a change to a
  contract, not new scaffolding.
- **Send a PR.** Fixes, a new diagram archetype, a new subject or anchor profile,
  clearer contracts, and docs are all fair game.
- **Improve the skill.** `SKILL.md` and the files under `references/` are the
  executable guidance. If repeated friction changes how a course should be built,
  update a contract rather than hard-coding around it.

## How it is organized

```
SKILL.md                                      the workflow and the test gates
references/course-quality-contract.md         the non-negotiables (the bar)
references/course-design-system-contract.md   UI tokens, components, accessibility
references/module-recipe.md                   author or upgrade ONE module end to end
references/diagram-engine.md                   how diagrams are generated
assets/diagrams.mjs                            the deterministic SVG diagram engine
```

The two highest-volume jobs, authoring a module and drawing its diagram, each have
a focused recipe the main skill delegates to.

## Run the checks before you push

The skill produces courses, so the bar is that a course passes its own tests.

If you change the diagram engine, confirm it still parses:

```bash
node --check assets/diagrams.mjs
```

If your change affects generated courses, build or upgrade one and run its suite:

```bash
cd <course>/guide
npm install
npm test                 # static check + Playwright smoke
```

A change is done when the affected course is green.

## Conventions

- **Reuse before adding.** Prefer an existing contract, archetype, or section over
  a new subsystem.
- **Keep the course passing.** Course Creator gates "done" on executed proof, and
  contributions follow the same bar.
- **Keep the skill lean.** `SKILL.md` plus `references/` and `assets/`. Put
  guidance in the contracts, not scattered across files.
- **No exposed scaffolding.** Follow the writing-voice and anti-template rules in
  `references/course-quality-contract.md`.
- **Match the surrounding style.** Keep the diff surgical: every changed line
  should trace to the change you are making.

## Pull request process

1. Branch off `main` (e.g. `git checkout -b add-timeline-archetype`).
2. Make the change.
3. Run the checks above. A green course is the bar.
4. Open the PR with a short description: what changed and why. Link the issue it
   closes if there is one.
5. Keep PRs small and focused. Unrelated changes are easier to review as separate
   PRs.

## License

By contributing, you agree that your contributions are licensed under the
[MIT License](LICENSE).

# Course Creator

**A skill for Claude Code and Codex that builds courses a person can finish on
their own — every wrong answer explained, every project self-graded — with a test
suite that fails the build when a lesson would lose them.**

Plenty of tools spit out a course. Few survive a real read: the same metaphor in
every lesson, a quiz that says "incorrect" and stops there, a project with no way
to tell if you got it right. Course Creator fixes the part that decides whether
someone learns alone — and won't ship a course that backslides.

## What every lesson does

- **Shows before it tells.** Opens on something you can picture — a block on a ramp, a single coin flip, a crowded dining hall — before any symbol appears.
- **Explains the wrong answer.** Miss a quiz and it names the idea you confused and why the right option wins, instead of "Review this one."
- **Hands off the work in steps.** Practice runs worked example → fill in the blanks → on your own → a new setting, so the first hard problem isn't a cliff.
- **Names the trap.** States the wrong idea most learners hold and the exact case that breaks it.
- **Lets you grade yourself.** Every build-it-yourself ends with a rubric, a pass line, and "if you missed X, redo Y."
- **Personalizes from evidence.** Builds the domain model, learner route, and mastery evidence before trusting examples or pacing.
- **Calibrates understanding.** Uses confidence, tiny cases, boundaries, transfer, and external benchmarks to separate orientation from grounded reasoning.
- **Sounds like a teacher, not a template.** No metaphor reused twice, no "Visual anchor" labels, no AI throat-clearing.

A static check and a browser test enforce these gates — a course that skips one
doesn't build.

## What comes out

One folder of static HTML/CSS/JS you can open or host anywhere: 25 lessons across
3 tracks, its own diagram on every lesson, labs, quizzes, a glossary, saved
progress, and the tests. Diagrams come from whatever image model you have, or a
built-in SVG engine when you have none.

See twelve of them — physics to public speaking — at
**[shivamgupta42.github.io/course-library](https://shivamgupta42.github.io/course-library/)**.

## Use it

Drop this folder in your skills directory (`~/.agents/skills/course-creator` or
`.claude/skills/course-creator`) and ask it to build, upgrade, or review a course.

- `SKILL.md` — the steps and the test gates
- `references/` — the quality, design, and per-lesson contracts
- `references/personalized-learning-contract.md` — learner modeling, concept universes, diagnostics, and competence gates
- `research/` — research notes and implementation memos behind the personalized-learning changes
- `experiences/reasoning-gym/` — a static prototype for testing whether a learner's reasoning is grounded
- `assets/diagrams.mjs` — the SVG diagram engine

## License

MIT. See [`LICENSE`](LICENSE).

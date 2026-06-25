# Reasoning Gym

Static test experience for course-learning experiments.

## What It Tests

- learner goal
- confidence before evidence
- primitive grounding
- representation choice
- tiny formal case
- boundary condition
- transfer to a changed case
- repair note
- external benchmark plan

The app stores drafts and scores in browser `localStorage`.

## Run

From the repository root:

```bash
python3 -m http.server 8765 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:8765/experiences/reasoning-gym/
```

## Add More Courses

Append course objects to:

```text
experiences/reasoning-gym/data/courses.js
```

Required shape:

```js
{
  id: "game-theory",
  title: "Game Theory",
  externalBenchmarks: [],
  conceptUniverse: {
    primitives: [],
    representations: [],
    reasoningMoves: [],
    misconceptionFamilies: []
  },
  modules: [
    {
      id: "01-nash",
      track: "Foundations",
      title: "Nash Equilibrium",
      summary: "What the module teaches.",
      concepts: ["players", "actions", "payoffs", "best response"],
      support: "high",
      check: {
        primitives: "...",
        representation: "...",
        tinyCase: "...",
        boundary: "...",
        transfer: "...",
        external: "..."
      }
    }
  ]
}
```

## Current Seed

- Information Theory
- 25 modules
- rich checks for the core foundation modules
- generic checks for the rest

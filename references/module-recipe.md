# Module Recipe (build or upgrade one module)

The main `course-creator` skill delegates single-module authoring to this recipe.
Follow it to write or fix one module end to end. It encodes the implicit
learning flow (puzzle, plain model, tiny case, recall, misconception repair,
transfer) without exposing any method label to the learner.

## HTML template

Use this structure. Visible headings read like a course; hidden `data-`
attributes let the test suite enforce pedagogy without worksheet labels. Do not
add a `kicker`/eyebrow such as `Visual anchor`, and do not label paragraphs
`College metaphor`, `Simple example`, or `What to test`.

```html
<header class="module-header">
  <p class="module-eyebrow">{Track N}</p>
  <h1 id="main-heading">{Module title}</h1>
  <p class="module-lede">{One plain sentence: the question this module answers.}</p>
</header>

<section class="lesson-diagram" data-lesson-diagram>
  <h2>Picture the idea</h2>
  <figure class="diagram-art">
    <img src="assets/diagrams/{id}.svg" alt="{module-specific description}">
    <figcaption>{module-specific caption}</figcaption>
  </figure>
  <p data-example>{A concrete college-life example, as prose.}</p>
  <p data-metaphor>{One accurate metaphor mapped to the formal idea, as prose.}</p>
  <p data-test>{Change one condition and predict what moves, as prose.}</p>
  <!-- If a second concept needs a picture, embed <id>-2.svg inline here or in the body. -->
</section>

<!-- TEACHING BODY: the real subject content (definitions, equations, tables,
     exercises, an embedded body quiz). Keep it correct and module-specific. -->

<section class="real-world-anchor" data-real-world-anchor>
  <h2>Where this shows up</h2>
  <p data-campus>{A familiar campus situation that makes the idea concrete, as prose.}</p>
  <p data-boundary>{Where that example or metaphor stops applying.}</p>
</section>

<section class="first-principles-path">
  <h2>Figure it out from scratch</h2>
  <div class="first-principles-grid">
    <!-- Each card: a bold one-clause lead, then 1-2 short fragment bullets.
         Keep the whole card under ~25 words. No 60-word paragraphs. -->
    <div><h3>Start With a Real Question</h3>
      <p class="card-lead">{the concrete question, one clause}</p>
      <ul class="card-points"><li>{why numbers alone fail}</li><li>{what you need instead}</li></ul></div>
    <div><h3>Say It in Plain Words</h3>
      <p class="card-lead">{the model in one clause}</p>
      <ul class="card-points"><li>{key move}</li><li>{what comes last}</li></ul></div>
    <div><h3>What It Is Made Of</h3>
      <p class="card-lead">{the primitives, named}</p>
      <ul class="card-points"><li>{primitive + role}</li><li>{primitive + role}</li></ul></div>
    <div><h3>{formal_card_heading — default "Now Write the Equation"}</h3>
      <p class="card-lead">{the formal tool: a formula <code>ΣF = ma</code>, or for a rule-based subject the rule itself, e.g. major scale = <code>W W H W W W H</code>}</p>
      <ul class="card-points"><li>{what it does}</li><li>{the sanity guard — dimensional for a formula, a consistency check for a rule}</li></ul></div>
    <div><h3>Try the Simplest Case</h3>
      <p class="card-lead">{the tiny worked case in one clause}</p>
      <ul class="card-points"><li>{the numbers}</li><li>{the result}</li></ul></div>
    <div><h3>Find Where It Breaks</h3>
      <p class="card-lead">{the failing assumption, one clause}</p>
      <ul class="card-points"><li>{boundary 1}</li><li>{boundary 2}</li></ul></div>
  </div>
  <div class="teach-back"><h3>Explain It to a Friend</h3><p>{five sentences; the last says where it fails}</p></div>
</section>

Each grid card is scannable: the eye lands on the bold `card-lead`, the bullets
carry the detail. Do not write a 60-word paragraph inside a card. The
`teach-back` stays as a short prose paragraph (it is spoken, not a card).

<section class="expert-upgrade">
  <h2>How to reason about this</h2>
  <h3>Check your understanding</h3>
  <ul>{three module-specific retrieval prompts}</ul>
  <h3>Show you understand</h3>
  <p>{one make-and-stress-test task}</p>
</section>

<section class="build-project" data-build-project>
  <h2>Build it yourself</h2>
  <p class="project-goal">{one line: what the learner will create from this module}</p>
  <ol>
    <li>{step 1: gather real inputs}</li>
    <li>{step 2: apply this module's formal tool}</li>
    <li>{step 3: predict, then check against reality}</li>
    <li>{step 4: sanity-check against a known anchor}</li>
  </ol>
  <p class="project-check"><strong>You have it when</strong> {a concrete success criterion}.</p>
  <p class="project-stretch"><strong>Push further:</strong> {a stretch that extends the build}.</p>
</section>

<section class="module-check-pack">
  <h2>Module check</h2>
  <p>{one-line intro}</p>
  <!-- reasoning quizzes; see Quizzes below -->
</section>
```

The `Build it yourself` project is required, not optional. It must have the learner
**create an artifact** (a script, a measurement, a small system, a hand-worked
result), not re-read the concept. Make it specific to this module's tool, use
real inputs the learner can gather, include a success check ("You have it when…")
in the profile's `verification_mode` (`runnable` code assert, `rubric` performance,
`diff` vs a reference, or `estimate` sanity bound — a non-code course must not claim
"runnable"), and a "Push further" stretch.

For a **solo learner** the project must also be self-gradeable. Include a small
rubric (3-5 observable rows, e.g. `<table class="rubric">` or a `data-rubric`
list), a concrete pass threshold, one weak-answer example so the learner can
calibrate, and a repair path ("if you miss X, redo Y before moving on"). The
same self-assessment block is required on `Make It Yours`. Without it,
completion is a button, not a mastery decision.

Practice must scaffold, not jump: a fully **worked** case, then a **faded** case
(some steps blanked with a hidden worked solution), then an **independent**
near-transfer task, then a **far-transfer** task whose surface features change.
Tag them with `data-practice="worked|faded|independent|transfer"` and ship a
model answer or rubric for the independent and transfer tasks.

## Content rules

- Write every paragraph from this module's real content. After removing the
  module title, none of `data-example`, `data-metaphor`, `data-test`,
  `data-campus`, `data-boundary` may match another module. No course-wide single
  metaphor; no shared example list.
- Apply the Writing Voice rules (no throat-clearing, no adverbs/hedges, no
  binary-contrast or negative-listing structures, no em-dash connectors, active
  voice, varied rhythm). See the main SKILL.md "Writing Voice".
- Diagram: reference `assets/diagrams/{id}.svg`, built by the diagram engine
  (see `diagram-engine.md`), not hand-placed coordinates. Add `{id}-2.svg` only
  when a second concept genuinely needs its own picture.
- If the resource library is enabled, do not turn the lesson body into a link
  list. Put external videos/readings in `RESOURCE_LIBRARY.md` and the Resources
  page. A module may include at most 1-2 "watch/read next" links when they solve a
  specific confusion, and each must point back to the curated resource entry.

## Quizzes

- The file totals 5-7 `<div class="quiz">` blocks (body quizzes + Module check).
- Each tests reasoning about this module: why a result holds, what a computed
  quantity means, or what changes when a named assumption changes.
- Exactly one `data-correct="true"` per quiz. No generic study-skill stems.
- **Every quiz carries explanatory feedback**, not just a correct flag. Add a
  `<p class="quiz-explain">` (or, for external-quiz courses, an `explanation`
  field on the item) that says why the right answer is right and why the most
  tempting wrong option fails. A wrong pick must teach the cause, not show
  "Review this one." The app and static check both require it.

## Self-check before done

Required substrings present: `id="main-heading"`, `Picture the idea`,
`data-example`, `data-metaphor`, `data-test`, `Where this shows up`,
`data-campus`, `data-boundary`, `Figure it out from scratch`, `Start With a Real Question`,
`Say It in Plain Words`, `What It Is Made Of`, the `formal_card_heading` (default
`Now Write the Equation`, remapped by the profile for rule-based subjects),
`Try the Simplest Case`,
`Find Where It Breaks`, `Explain It to a Friend` (the six grid cards each use a
`card-lead` bold lead plus a `card-points` bullet list, whole card under ~25
words, never a 60-word paragraph), `How to reason about this`,
`Check your understanding`, `Show you understand`, `Build it yourself`
(`data-build-project`, with a build-steps `<ol>`, a "You have it when" check, and
a "Push further" stretch), `Module check`. Quiz count 5-7, one correct each.
Diagram file exists and parses.

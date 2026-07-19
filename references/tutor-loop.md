# Tutor Loop (Attempt-First Tutoring)

Use this contract when the learner wants to study a course as a live
conversation with the loaded agent (Claude Code or Codex) instead of, or in
addition to, reading the rendered guide. The mode's one move: the learner
attempts first, the agent corrects the smallest thing, the learner tries
again, and the answer is revealed only after real attempts. The rendered
course is the content backbone; the conversation is the delivery.

This document is self-contained. An agent that has read it, the course's
`course.md`, and the learner files can run a session with no other context.

## Why attempt-first works (the science, briefly)

Four well-replicated effects, stacked:

- **Generation effect / errorful generation.** Attempting an answer before
  knowing it produces better retention than being told first, even when the
  attempt is wrong. The failed retrieval primes the encoding.
- **Productive failure (Kapur).** Learners who struggle with a problem before
  instruction outperform instruction-first learners, most strongly on
  transfer. The struggle builds the slots the explanation later fills.
- **Hypercorrection (Butterfield & Metcalfe).** Errors made with high
  confidence, once corrected, are the best-remembered items of all. Surprise
  does the writing to memory. Confidence can identify a useful correction
  moment, but it never measures mastery.
- **Testing effect (Roediger & Karpicke).** Retrieval practice beats
  re-reading. Every loop turn is a retrieval attempt by construction.

The failure mode this protocol exists to prevent: an LLM's default is the
opposite of all four. Ask it about entropy and it explains, completely and
immediately, which produces the clean answer the learner forgets by morning.
The protocol below is a set of hard rules that hold the agent in the
attempt-first posture.

## Ship a protocol, not an engine

Same bet as `learner-and-knowledge-okf.md`: the loaded agent **is** the
runtime. Do not build a chat widget into the rendered course, a dialogue
script, or any tutoring code. The rendered `guide/` stays a static site. The
tutor loop is a conversational protocol the agent follows when the learner
opens the course workspace and asks to study. Everything the loop needs is
already in the course files; everything it learns goes into the learner files.

## Intake knob

Record in `PROFILE.md`:

```yaml
tutor_loop:
  enabled: true
  reveal_after: 3        # maximum supported attempts before direct explanation
  session_minutes: 25    # soft target; close the loop cleanly rather than mid-rung
```

Defaults: `enabled: false` unless the user asks to study interactively (any
phrasing like "teach me", "study with me", "quiz me on module 7", "let's do a
session" counts as asking). `reveal_after: 3`, `session_minutes: 25`.

Enabling the tutor loop requires the OKF learner overlay
(`learner/mission.md`, `learner/state.md`, `learner/records/`). The loop is
the overlay's best generator: a corrected wrong guess is exactly the
"misconception corrected" evidence that earns a learning record.

## The loop

One concept, one loop. A session usually runs 2-4 loops. Use
`Elicit -> Reconstruct -> Diagnose -> Repair -> Verify -> Point back -> Record`.

1. **Pick, then confirm.** Read `learner/state.md` and the prerequisite
   graph in `course.md`. Propose the session's target with one-line reasoning
   (due reviews first, then the next untested concept the graph unlocks) and ask
   where the learner wants to start. The learner's choice wins: if they name
   a concept whose prerequisites remain untested or carry an open gap, say so
   in one sentence and follow them anyway. The loop can drop back when the
   learner's explanation exposes that prerequisite. Never dictate the lesson.
2. **Pose.** Open with the module's real question or problem (`The problem` /
   `Start With a Real Question`), grounded in the learner's mission anchors.
   Do not explain anything yet.
3. **Elicit a complete attempt.** Ask the learner to describe the mechanism
   from input to decision or make one nearby prediction in their own words.
   Let a stream-of-consciousness answer finish before diagnosing it. If they
   say "I don't know", shrink the case until they can commit to a direction,
   a choice between two cases, or an order-of-magnitude guess.
4. **Reconstruct the learner's model.** Compress the answer into a short chain
   such as `A -> B -> C` and say "I heard..." so the learner can correct the
   reconstruction. Judge relationships, not grammar, vocabulary, confidence,
   or answer length.
5. **Diagnose and repair one bottleneck.** Compare the reconstruction against
   `Core Ideas`, `Common Trap`, prerequisites, and the module's boundaries.
   Name what is connected correctly, then repair the earliest load-bearing gap
   with the lightest explanation form that fits it. Mention at most one
   additional connected gap.
6. **Verify nearby use.** Ask for a revised explanation or one nearby
   prediction. If it fails, climb one rung on the help ladder. Reserve
   discrimination, transfer, and falsification for later evidence.
7. **Reveal and rebuild when needed.** Treat `reveal_after` as a ceiling on
   supported attempts, not a quota. Reveal sooner when the learner requests it
   or the same missing prerequisite blocks progress. Build the explanation on
   their attempt, then ask for a fresh explanation or changed-case prediction.
8. **Point back and record.** Link the exact course section that consolidates
   what the conversation covered, then update the learner files.

### Hard rules

These are the protocol. Break one and the mode silently degrades into
explaining.

- **Teach nothing the learner has not attempted first.** No preambles, no
  "before we start, recall that...". The pose comes first; context arrives
  as corrections.
- **Return agency after teaching.** A teaching turn normally ends with one
  question or task so the learner can use the repair. A session summary may
  end cleanly without manufacturing another question.
- **Repair one bottleneck per turn.** A learner attempt with four errors gets
  the most load-bearing one repaired; mention one additional gap only when it
  depends on the same prerequisite. Listing every omission recreates a lecture.
- **Cap correction length.** A correction is 1-4 sentences plus the handed-back
  question. If the correction needs a diagram or a worked table, point the
  learner at that section of the rendered module instead of pasting it.
- **Use confidence only as optional context.** Ask for it when a surprising
  correction would be pedagogically useful. Never insert a confidence question
  into every loop, and never treat confidence as evidence of understanding.
- **Do not rescue early, do not let them drown.** Floundering is productive
  for 2-3 attempts; past that it is frustration. `reveal_after` is a ceiling
  on struggle, not a quota: if the learner is visibly stuck on a missing
  prerequisite rather than the target concept, stop the loop, mark the
  prerequisite as the `Current gap` in `state.md`, then loop on it instead.
- **Evidence before advancement.** A loop is done when the learner produces
  an unaided correct explanation or solves the module's changed-case
  variant, not when they say "makes sense". Use a nearby prediction first;
  require transfer only after the nearby model is usable.
- **Never announce the method.** The learner experiences a conversation, not
  "now we do productive failure". Same rule as the rendered course's
  meta-method label ban. Mechanism names stay in this file and in
  `PROFILE.md`.
- **Kill answer autocomplete before the first pose.** Many clients (Claude Code
  included) surface auto-suggested replies or completions. A suggested answer
  the learner reads before attempting destroys the generation effect the whole
  loop is built on — it is instruction-first wearing a UI. At session start,
  once, tell the learner to turn off reply auto-suggestions / autocomplete for
  the session (in Claude Code, disable the auto-suggest/auto-reply UI), and say
  plainly why: "the point only works if your guess comes from you, not the
  suggestion box." Then the agent's own half: never place the target answer, the
  computed number, or the completed formula where a client could pre-fill or
  suggest it — pose the question and stop, so there is nothing to autocomplete
  toward. If the learner says a suggestion leaked the answer, treat that loop as
  compromised, record the reply as supported rather than independent evidence,
  and re-pose with a changed case.

### The help ladder

Start at the lightest rung that fits the diagnosed gap. On another miss, climb
one rung. Build every rung from the module's own material:

1. **Pump.** Ask what else affects the missing step.
2. **Point at the relationship or contradiction.** Show where their model
   stops connecting without supplying the answer.
3. **Give a hint or principle.** State one core idea without completing its
   application.
4. **Give a smaller or contrasting case.** Reuse the module's tiny case or put
   two cases side by side.
5. **Trace the mechanism.** Walk one example from input to outcome.
6. **Reveal.** State the formal definition or worked solution, tied directly
   to the learner's attempt.

Stop climbing as soon as the learner can continue.

## Diagnose the learner's model

Prepare a small teaching map before the pose: the decision the topic supports,
three to seven essential relationships, their prerequisites, likely wrong
models, one concrete representation, one near prediction, and one later
boundary or transfer case. Keep this map in working context rather than showing
the learner a rubric.

Classify each essential relationship independently:

- `present-connected`: accurate and linked to the right cause, consequence,
  condition, unit, clock, or decision;
- `present-fragile`: broadly right but vague, unsupported, or dependent on the
  original wording;
- `missing`: absent even after one neutral pump;
- `misconnected`: present but attached to the wrong cause, condition, unit,
  clock, or conclusion;
- `untested`: no evidence yet. Never convert this to missing or favorable
  mastery.

Do not estimate one global learner level. A learner can be experienced in the
domain and still lack one prerequisite representation. Do not confuse fluent
language with understanding, rough language with ignorance, a correct final
answer with a correct mechanism, or recognition after reading with independent
use.

## Select the explanation form

| Observed access gap | Use this form |
|---|---|
| Idea present; formal name missing | Attach the term to the learner's own words. |
| Prerequisite missing | Teach one smaller prerequisite through a familiar case. |
| Relationship misconnected | Contrast two cases or trace one arrow at a time. |
| Mechanism vague | Work one tiny example from input to outcome. |
| Boundary missing | Change one condition and ask what breaks. |
| Clock, unit, or order confused | Use a short timeline, table, or labeled flow. |
| Too many simultaneous elements | Remove variables; keep one decision and outcome. |
| Nearby model already usable | Fade help and ask for a prediction. |
| Model robust on nearby cases | Move to discrimination, transfer, or falsification. |

Prefer the learner's vocabulary and domain where they carry the right idea.
Change representation in response to an observed failure. Repeating the same
explanation more slowly is not adaptation.

## Calibrate evidence of understanding

Record the strongest task completed without the answer already visible:

1. **Explain:** describe the model in their own words.
2. **Predict:** use it on a nearby concrete case.
3. **Justify:** name the relationship that makes the prediction follow.
4. **Distinguish:** separate it from a tempting neighboring idea.
5. **Transfer:** use it after the context or an assumption changes.
6. **Falsify:** name evidence or a boundary that overturns the conclusion.

Use explanation plus a near prediction for the first pass. Treat distinguish,
transfer, and falsify as later goals. A correct answer after a worked example is
supported performance, not independent mastery.

## Shape one tutor response

After a learner explanation, keep one turn substantial enough to be useful:

- **What I heard:** reconstruct the learner's model in two or three lines.
- **What you already have:** name up to three correct relationships.
- **The blocking gap:** name one gap and why it blocks the next step.
- **Smallest repair:** use the selected explanation form in the learner's
  language.
- **Your turn:** ask one nearby prediction or revised explanation.
- **Read afterward:** link the exact course section already covered.

Do not split this into a long interrogation. Let the learner finish a complete
stream-of-consciousness model, then return a coherent diagnosis, repair, and
probe.

## Formatting the conversation (readability)

The loop is delivered as chat, so how a turn *looks* decides whether the learner
can act on it. Terminal and web clients render Markdown, and most colorize
headings, **bold**, `inline code`, fenced code blocks, and > blockquotes. That
rendered structure is the "color" available — do not emit raw ANSI escape codes,
they leak as garbage in clients that do not parse them. Use Markdown structure to
give each loop element a consistent visual role so the learner learns the shape:

- **The pose (step 2) is set apart.** Put the problem/scenario in its own short
  paragraph or a `>` blockquote, above a horizontal rule. It should read as "here
  is the thing to attack", visually distinct from the chatter around it.
- **The handed-back question is last and prominent on teaching turns.** Bold
  the single question or task so it is the element the eye lands on. Session
  summaries and pauses need no artificial question.
- **All math, formulas, and computations go in a fenced code block, never inline
  prose.** `F_muscle × 5 = 60 × 40` in a block is scannable; buried in a sentence
  it is missed. This also stops a renderer from mangling `×`, `Σ`, or subscripts.
- **Bold the one corrected idea and each term of art at first use**, then gloss
  the term in plain words in the same breath. Bold is for the load-bearing noun,
  not for emphasis-spraying — at most a few bolds per turn or it stops meaning
  "look here".
- **Give the three beats whitespace.** Confirm-what's-right, the single
  correction, and the handed-back question are three short paragraphs with blank
  lines between them, not one dense block. One idea per paragraph.
- **Use a small, fixed marker set or none at all — consistency over decoration.**
  If you mark the learner's correct part, mark it the same way every turn (a
  leading ✅ or a bold "Right:" is fine). Never rainbow the message; a turn with
  five colors and four emoji is harder to read than a plain one, and it reads as
  a UI, which breaks the "never announce the method" feel.
- **Tables only for genuine side-by-sides** (two positions, two cases), never to
  decorate a single point. A one-row table is noise.
- **Match the learner's setting.** Record a `tutor_loop.format` note in
  `PROFILE.md` if the learner asks for lighter or heavier formatting (e.g.
  `plain`, `standard`, `rich`); default `standard` (structure + bold + code
  blocks, restrained markers). Honor an explicit ask for no emoji or no color.

The test: a learner skimming the turn should find the question without reading a
word of the correction, and find the number without parsing a sentence. If the
formatting does not make those two things jump out, it is decoration, not
readability — cut it back.

## The course is the backbone

The loop invents nothing. Each module section already plays a role:

| Module section | Role in the loop |
|---|---|
| `The problem` / `Start With a Real Question` | The pose (step 2) |
| `data-prompt="prediction"` prompts | Ready-made attempt prompts |
| `Core Ideas` | The diagnosis reference and rung-2 hints |
| `Common Trap` | The misconception bank: match the learner's error against it before improvising a diagnosis |
| `Try the Simplest Case` / worked example | Rung-3 hint |
| `Real-World Anchor` + boundary note | Mission-flavored re-poses and the "where does this break" transfer question |
| `Practice in Levels` (worked → faded → independent → transfer) | The post-reveal ladder: the loop ends where independent practice begins |
| `Check Your Understanding` quiz | The exit check; quiz explanations are pre-written corrections |
| `Make It Yours` / `Build it yourself` rubric | The capstone-critique session shape |
| Tracks (foundations / intermediate / advanced) | Promotion gates: do not loop on a track-2 concept while its track-1 prerequisites remain untested or carry an open gap in `state.md` |

Calibration comes from evidence in `state.md`, not self-placement or confidence.
Open with the recorded `Next probe`. If no evidence exists, start with a broad
explanation or a small nearby prediction; the result selects the amount and form
of support.

## Starting before the course is finished

The loop needs text, not visuals. It can start as soon as `course.md` (the
outline with module→concept rows) and the target module's prose exist.
Diagrams still generating, labs unwired, smoke tests unrun: none of these
block a session. Two working states:

- **Outline + module prose exist:** run the full loop normally.
- **Outline only (module not yet written):** the agent may still run a loop
  from the `course.md` row and the concept file's definition and sources.
  Improvised poses and tiny cases are acceptable here, but note in the
  learning record that the loop ran outline-only, and prefer built modules
  when they exist: the authored trap, tiny case, and rubric are better than
  improvisation, and gated for quality besides.

This makes build time usable: the learner can start studying track 1 in
conversation while images and later tracks are still generating.

## Session shapes

- **First contact.** No learner files yet: run intake (mission, out-of-scope,
  prior-knowledge disclosures), seed `state.md` from `course.md` with
  everything `untested` and a concrete first probe, then run one small loop on
  the first foundations concept so the session ends with real evidence.
- **Study session.** The default: pick → 2-4 loops → record. Due reviews
  before new concepts.
- **Review session.** Only due rows from `state.md`. Reviews start at rung 0:
  a bare retrieval prompt with no re-teaching, and re-teach only on a miss.
- **Capstone critique.** The learner brings their `Build it yourself`
  artifact. The agent grades against the module's rubric, attempt-first
  style: the learner self-assesses against each rubric row before the agent
  scores it. Disagreements between self-score and agent score are recorded;
  they are calibration data.

## What the agent must never do

- Lecture or dump the complete module before the learner attempts the idea.
- Rescue on the first miss, or bury the learner past `reveal_after`.
- Quiz-show trivia: rapid-fire recall questions detached from the module's
  problem. Retrieval practice serves the concept, not a score.
- Praise inflation. "Right, because..." beats "Excellent!". Name *what* was
  right; the specificity is the reward.
- Advance on "makes sense", politeness, verbosity, or confidence. Require
  observed explanation or prediction evidence.
- Treat exposure or supported performance as independent mastery.
- Announce mechanisms ("this is the hypercorrection effect!") or narrate the
  protocol.

## Recording the session

Close every session by writing the learner files, per
`learner-and-knowledge-okf.md`:

- One `LearningRecord` for the session. The loop generates the record almost
  verbatim: reconstruct the learner's model, classify the relevant
  relationships, name the repair and its result, preserve the strongest
  independent evidence, and write the next probe. Confidence may remain as
  context for a surprising correction, but it is not evidence of mastery.
- Update touched `state.md` rows: `Evidence`, `Current gap`, `Next probe`,
  `Last seen`, and `Review when`. If a corrected misconception predicts
  trouble on a neighboring concept, carry that relationship into its current
  gap or next probe without claiming that the neighbor has already been tested.
- Supersede, never rewrite, when a loop shows an earlier record was too
  optimistic.

A session that taught well but recorded nothing wasted its second half: the
next session starts cold and re-teaches.

## A worked exchange (compressed)

The shape of one loop, on compound interest, learner state `untested`:

> **Agent:** You put $1,000 in an account at 10% a year and leave it alone.
> Before any math: after two years, do you have exactly $1,200, more, or
> less? What's your reasoning?
>
> **Learner:** Exactly $1,200. 10% is $100 a year, two years is $200.
>
> **Agent:** How sure are you: coin-flip, fairly sure, or certain?
>
> **Learner:** Certain.
>
> **Agent:** That's the right answer to a different account. Your $100-a-year
> is computed on the original $1,000 both times, but the second year opens
> with $1,100 in the account, and the bank pays 10% on what's there. Run just
> year two for me: 10% of $1,100 is what?
>
> **Learner:** $110. So... $1,210 total. The extra $10 is interest on
> interest?
>
> **Agent:** Yes, and that $10 is the entire concept. Now the changed case:
> same account, but the bank pays the 10% to your checking account instead of
> leaving it in. After two years, which account are you in, mine or yours?

The learner was certain and wrong, got a full correction sized to the
hypercorrection moment, computed the fix themselves, and met a changed case
before any formula appeared. The formula arrives in the next turn, after the
learner has already built it. The record for this loop says: simple interest
was misconnected to a reinvested balance; the year-two computation repaired
it; strongest independent evidence is the learner's explanation of the extra
$10; the payout variant remains the next probe. The confidence report explains
why the correction was memorable, not whether the concept is mastered.

## Validation (light, like the overlay)

The loop is conversational, so nothing renders and almost nothing is
checkable statically. Keep it to two assertions when `tutor_loop.enabled` is
true: `PROFILE.md` carries the knob with a sane `reveal_after` (2-5), and the
OKF learner layer exists. The modules' prompts, traps, tiny cases, and
rubrics that the loop depends on are already gated by the core contracts. Do
not attempt to test the conversation; the learner files are the audit trail.

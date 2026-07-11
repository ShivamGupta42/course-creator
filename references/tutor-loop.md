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
  does the writing to memory. This is why the loop asks for confidence before
  revealing.
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
  reveal_after: 3        # failed attempts before the agent may give the answer
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

One concept, one loop. A session usually runs 2-4 loops.

1. **Pick.** Read `learner/state.md` and the prerequisite graph in
   `course.md`. Surface due reviews first, then the next `new` concept the
   graph unlocks. Name the module you are working from.
2. **Pose.** Open with the module's real question or problem (`The problem` /
   `Start With a Real Question`), grounded in the learner's mission anchors.
   Do not explain anything yet.
3. **Attempt.** Ask the learner to explain the concept or predict the
   solution in their own words. If they say "I don't know", shrink the
   question until they can commit to a guess (predict a direction, pick
   between two cases, estimate an order of magnitude). "I don't know" is the
   start of the negotiation, never the end of the turn.
4. **Diagnose and correct one thing.** Compare their attempt against the
   module's `Core Ideas` and `Common Trap`. Name the part they got right,
   then correct the *single* most load-bearing error, in at most a few
   sentences, and hand the problem back. Climb the hint ladder (below) on
   each subsequent miss.
5. **Reveal and rebuild.** After `reveal_after` real attempts, or when the
   learner asks to be told, give the full explanation, built explicitly on
   the wreckage of their attempts: "your second guess broke exactly where
   the boundary note says the metaphor breaks." Then have them re-explain it
   back unaided (the module's teach-back).
6. **Record.** Close the loop by updating the learner files (see Recording).

### Hard rules

These are the protocol. Break one and the mode silently degrades into
explaining.

- **Teach nothing the learner has not attempted first.** No preambles, no
  "before we start, recall that...". The pose comes first; context arrives
  as corrections.
- **Every agent turn ends with a question or a task, never with an
  explanation.** This single rule kills the explain-everything reflex. Even
  the reveal in step 5 ends by asking for the teach-back.
- **Correct one thing per turn.** A learner attempt with four errors gets the
  most load-bearing one corrected and the rest left for later rungs. Fixing
  everything at once is a lecture wearing a costume.
- **Cap correction length.** A correction is 1-4 sentences plus the handed-back
  question. If the correction needs a diagram or a worked table, point the
  learner at that section of the rendered module instead of pasting it.
- **Ask for confidence before any reveal.** "How sure are you, roughly:
  coin-flip, fairly sure, or certain?" A high-confidence error gets the
  fullest correction of the session and a note carried into `state.md`
  (hypercorrection: these are the best learning moments; spend them well).
- **Do not rescue early, do not let them drown.** Floundering is productive
  for 2-3 attempts; past that it is frustration. `reveal_after` is a ceiling
  on struggle, not a quota: if the learner is visibly stuck on a missing
  prerequisite rather than the target concept, stop the loop, mark the
  prerequisite `shaky` in `state.md`, and loop on the prerequisite instead.
- **Evidence before advancement.** A loop is done when the learner produces
  an unaided correct explanation or solves the module's changed-case
  variant, not when they say "makes sense". "Makes sense" triggers one more
  transfer question, always.
- **Never announce the method.** The learner experiences a conversation, not
  "now we do productive failure". Same rule as the rendered course's
  meta-method label ban. Mechanism names stay in this file and in
  `PROFILE.md`.

### The hint ladder

On each miss, climb exactly one rung. Every rung is built from the module's
own material, which is why the loop needs no content of its own:

1. **Point at the contradiction.** Show where their own attempt conflicts
   with itself or with a fact they already hold. ("You said doubling the
   deposit doubles the interest, and also that interest compounds. Can both
   be true over two years?")
2. **Name the violated principle.** State the module's core idea abstractly,
   without applying it. (One sentence from `Core Ideas`.)
3. **Give a smaller case.** Hand them the module's tiny case
   (`Try the Simplest Case` / the worked example's inputs) and ask them to
   run it. The tiny case is chosen by the module author to make the
   structure visible; reuse it, do not invent a new one mid-session.
4. **Reveal** (step 5 of the loop).

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
| Tracks (foundations / intermediate / advanced) | Promotion gates: do not loop on a track-2 concept while its track-1 prerequisites sit `new` or `shaky` in `state.md` |

Calibration comes from `state.md`, not from asking the learner to self-place.
Open one notch *below* where the state table says they are: a fast correct
answer costs thirty seconds and buys a confidence start plus a strength
confirmation; an over-placed opener costs the whole session.

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
  everything `new`, then run one small loop on the first foundations concept
  so the session ends with a win and a real record.
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

- Lecture. The turn-ends-with-a-question rule is absolute.
- Rescue on the first miss, or bury the learner past `reveal_after`.
- Quiz-show trivia: rapid-fire recall questions detached from the module's
  problem. Retrieval practice serves the concept, not a score.
- Praise inflation. "Right, because..." beats "Excellent!". Name *what* was
  right; the specificity is the reward.
- Advance on "makes sense", politeness, or fatigue. Evidence or another
  transfer question.
- Mark anything `solid` from exposure. Same evidence bar as the learner
  overlay: demonstrated, unaided use.
- Announce mechanisms ("this is the hypercorrection effect!") or narrate the
  protocol.

## Recording the session

Close every session by writing the learner files, per
`learner-and-knowledge-okf.md`:

- One `LearningRecord` for the session. The loop generates the record almost
  verbatim: the attempts are the evidence, the corrected misconception is the
  high-value line, the failed transfer is the open gap. Include confidence on
  any hypercorrected error.
- Update touched `state.md` rows: strength, last seen, next `Review when`.
  Carry corrected misconceptions into the `Note` column of neighboring
  concept rows they predict trouble for.
- Supersede, never rewrite, when a loop shows an earlier record was too
  optimistic.

A session that taught well but recorded nothing wasted its second half: the
next session starts cold and re-teaches.

## A worked exchange (compressed)

The shape of one loop, on compound interest, learner state `new`:

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
hypercorrection moment, computed the fix themselves, and hit a transfer
question before any formula appeared. The formula arrives in the next turn,
after the learner has already built it. The record for this loop: certain-but-
wrong on simple-vs-compound, corrected via year-two computation, transfer
pending on the payout variant, `compound-interest: shaky → next session`.

## Validation (light, like the overlay)

The loop is conversational, so nothing renders and almost nothing is
checkable statically. Keep it to two assertions when `tutor_loop.enabled` is
true: `PROFILE.md` carries the knob with a sane `reveal_after` (2-5), and the
OKF learner layer exists. The modules' prompts, traps, tiny cases, and
rubrics that the loop depends on are already gated by the core contracts. Do
not attempt to test the conversation; the learner files are the audit trail.

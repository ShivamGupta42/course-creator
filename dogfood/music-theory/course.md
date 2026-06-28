---
type: Course
title: Music Theory From the Ear Up
timestamp: 2026-06-28T14:30:00Z
anchor_profile: ../PROFILE.md
size: { modules: 25, tracks: 3, split: [9, 9, 7] }
verification_modes: [diff, rubric]
charset: utf-8
glyphs: ["♭", "♯", "♮"]
---

# Music Theory From the Ear Up

For a by-ear guitar/piano player who cannot read a score and wants to know why
the songs they play actually work. Concepts live in `knowledge/` (OKF
`type: Concept`, cited, prerequisite DAG). Each module *links* the concept it
teaches and never copies its prose, so the uniqueness gate in
`course-quality-contract.md` still holds (see `references/learner-and-knowledge-okf.md`,
"The knowledge layer vs the teaching layer").

Accidentals render as ♭ ♯ ♮ throughout; charset and font handling are in
`PROFILE.md`.

## Track 1 — Foundations: what a note is and how notes relate (9 modules)

| ID | Module title | Teaches (knowledge/) |
|---|---|---|
| 01 | What a note actually is | [pitch-note](knowledge/pitch-note.md) |
| 02 | The 12 notes and the octave | [pitch-note](knowledge/pitch-note.md) |
| 03 | Sharps, flats, naturals: ♯ ♭ ♮ and why one key has two names | [pitch-note](knowledge/pitch-note.md) |
| 04 | The half step, the smallest move | [interval](knowledge/interval.md) |
| 05 | Counting intervals in semitones | [interval](knowledge/interval.md) |
| 06 | Naming intervals: 2nds, 3rds, 5ths, octaves | [interval](knowledge/interval.md) |
| 07 | Consonance and tension: which intervals lean home | [interval](knowledge/interval.md) |
| 08 | The major scale and its W–W–H–W–W–H pattern | [major-scale](knowledge/major-scale.md) |
| 09 | Scale degrees: numbering the notes of a key | [major-scale](knowledge/major-scale.md) |

## Track 2 — Core toolkit: keys, chords, and the circle (9 modules)

| ID | Module title | Teaches (knowledge/) |
|---|---|---|
| 10 | The natural minor scale and relative minor | [minor-scale](knowledge/minor-scale.md) |
| 11 | Harmonic and melodic minor: the raised 7th ♮ | [minor-scale](knowledge/minor-scale.md) |
| 12 | Key signatures: how many ♯ or ♭ a key carries | [key-signature](knowledge/key-signature.md) |
| 13 | The circle of fifths as a map of keys | [circle-of-fifths](knowledge/circle-of-fifths.md) |
| 14 | Building a triad by stacking thirds | [triad](knowledge/triad.md) |
| 15 | Major, minor, diminished, augmented triads | [triad](knowledge/triad.md) |
| 16 | The seventh chord: adding the 7th | [seventh-chord](knowledge/seventh-chord.md) |
| 17 | Diatonic chords: the chords a key gives you | [diatonic-chords](knowledge/diatonic-chords.md) |
| 18 | Roman numerals: I ii iii IV V vi vii° | [diatonic-chords](knowledge/diatonic-chords.md) |

## Track 3 — Why songs work: progressions, cadence, ear (7 modules)

| ID | Module title | Teaches (knowledge/) |
|---|---|---|
| 19 | Chord function: tonic, subdominant, dominant | [chord-function](knowledge/chord-function.md) |
| 20 | The cadence: how a phrase says "done" | [cadence](knowledge/cadence.md) |
| 21 | The I–IV–V and I–V–vi–IV progressions | [diatonic-chords](knowledge/diatonic-chords.md) |
| 22 | Voice leading: moving between chords smoothly | [voice-leading](knowledge/voice-leading.md) |
| 23 | Rhythm and meter: where the chords land | [rhythm-meter](knowledge/rhythm-meter.md) |
| 24 | Figuring out a song's key and chords by ear | [chord-function](knowledge/chord-function.md) |
| 25 | Borrowed chords and the ♭VII: when a song steps outside the key | [key-signature](knowledge/key-signature.md) |

## Concept dependency graph (DAG)

```
pitch-note
  └─ interval
       ├─ major-scale
       │    ├─ minor-scale
       │    ├─ key-signature ──── circle-of-fifths
       │    ├─ triad
       │    │    └─ seventh-chord
       │    │         └─ diatonic-chords
       │    │              ├─ chord-function
       │    │              │    └─ cadence
       │    │              └─ voice-leading
       │    └─ (rhythm-meter is orthogonal: depends only on pitch-note for context)
```

`rhythm-meter` is intentionally near-independent (it depends on time, not pitch);
it links `pitch-note` only so a song fragment has notes to place in the bar.

## Sample modules built in this dogfood

Two full sample modules per `references/module-recipe.md` live in
`guide/content/`: **06-naming-intervals.html** and **17-diatonic-chords.html**.
They are not title-swapped: their metaphor, example, test, campus/anchor, and
diagram labels are written from each module's own content.

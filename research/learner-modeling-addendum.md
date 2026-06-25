# Learner Modeling Addendum

Date: 2026-06-25

Purpose: turn the personalized-learning research into concrete test experiences for the course library.

## New Research Notes

### Open learner models should be visible to the learner

Recent open learner model research argues that the learner should see and use their own mastery model, not have it hidden inside an adaptive engine. A 2026 Frontiers meta-synthesis found a continuum of open learner models: inspectable, negotiable, editable, and persuasive/adaptive. Inspectable models support monitoring, negotiable models improve calibration through feedback, editable models support autonomy, and adaptive models add scaffolding when the model is pedagogically designed.

Course-creator implication:

- show the learner a concept map and evidence map
- let the learner dispute or annotate their own mastery state
- store confidence and performance separately
- treat the learner model as a reflection surface, not only a routing algorithm

Source: [Open learner models and pedagogical strategies in higher education](https://www.frontiersin.org/journals/education/articles/10.3389/feduc.2025.1760183/full)

### Personalized learning needs eight explicit parts

A 2026 systematic review of AI-supported personalized learning identifies eight core components:

1. learner profile
2. data inputs
3. content model
4. instructional model
5. adaptive engine
6. interface and user controls
7. personalization goals
8. evaluation and governance

Course-creator implication:

- a course cannot claim personalization because examples changed
- it needs a learner profile, concept graph, diagnostic evidence, route decisions, user controls, and evaluation plan

Source: [Redefining personalized learning in the AI era](https://link.springer.com/article/10.1186/s40561-026-00440-6)

### Prior-knowledge skipping is useful but risky

A 2025 experimental study on technology-enhanced personalized learning environments found that letting learners skip content based on prior knowledge can save time and focus effort on unmastered content, but learner motivation matters. Learners with strong mastery goals appreciated prior-knowledge based skipping more. Work-avoidance goals can distort the signal.

Course-creator implication:

- allow skip only after a diagnostic pass
- include a delayed retrieval check before marking a skipped concept stable
- track whether the learner skipped because they know it or because they want to avoid work

Source: [Technology-enhanced personalized learning environments based on prior knowledge](https://link.springer.com/article/10.1186/s40561-025-00407-z)

### External benchmarks should be part of the loop

MIT OCW materials provide useful objective-ish external checks:

- MIT 6.441 Information Theory has problem sets, a take-home midterm, and a take-home final.
- MIT 18.05 Probability and Statistics has problem sets, solutions, exam materials, and interactive problem checkers.
- MIT 14.12 Economic Applications of Game Theory has current lecture material, including Nash equilibrium and later game-theory concepts.

Course-creator implication:

- map each generated course to external benchmark sources
- after a course module, recommend an external problem family
- use external results to calibrate whether internal mastery checks are too easy

Sources:

- [MIT 6.441 Information Theory syllabus](https://ocw.mit.edu/courses/6-441-information-theory-spring-2016/pages/syllabus/)
- [MIT 18.05 problem sets and checkers](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/pages/problem-sets/)
- [MIT 18.05 exams with solutions](https://ocw.mit.edu/courses/18-05-introduction-to-probability-and-statistics-spring-2022/resources/exams-with-solutions/)
- [MIT 14.12 Nash equilibrium lecture](https://ocw.mit.edu/courses/14-12-economic-applications-of-game-theory-fall-2025/resources/mit14_12f25_lec05_1080p_mp4/)

## Test Experience Requirements

The first prototype should not be a full adaptive tutor. It should test whether the evidence model feels useful while Shivam learns the existing courses.

The experience should collect:

- course
- module
- learning time
- confidence before answering
- primitives named
- representation chosen
- tiny formal case
- boundary condition
- transfer case
- repair note
- external benchmark attempt

The report should show:

- high-level reasoning score
- detail-grounding score
- transfer score
- calibration gap
- weakest concept links
- next review date
- external benchmark recommendation

## Course-Creator Improvements To Validate

1. Add transparent learner model panels to generated courses.
2. Add concept-universe extraction per course.
3. Add module competence gates.
4. Add confidence-before-feedback to quizzes.
5. Add external benchmark mapping.
6. Add session reflection logs, including time-to-understanding.
7. Add delayed checks before declaring mastery.
8. Add learner-reported confusion taxonomy:
   - missing prerequisite
   - weak analogy
   - notation overload
   - too many details before structure
   - high-level map felt plausible but failed tiny case
   - could solve examples but failed transfer

## First Prototype

Create `experiences/reasoning-gym/`.

It should be static:

- `index.html`
- `styles.css`
- `app.js`
- `data/courses.js`

It should start with Information Theory because that course is readable in this worktree.

Later, run an index-builder over all 12 course paths and append them to `data/courses.js`.

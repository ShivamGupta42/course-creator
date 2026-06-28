# FRICTION — dogfooding the course-creator contracts on Bayesian Probability

Honest, specific record of every place the contracts were ambiguous,
contradictory, impossible for this subject, or under-specified. Each item cites
file + rule. "What worked" is at the end.

---

## 1. The "campus example" anchor fights an analyst audience (the biggest friction)

**Severity: high. This is a genuine contradiction inside the skill, not just a preference.**

The same skill says two opposite things about the literal word "campus":

- **Hardwired campus, in three places.** SKILL.md line 22 ("a dedicated `Real-World Anchor` section with a campus example"), line 186 ("`Campus example`: a familiar example from college life, labs, dorms, commuting, group projects, phones, workouts, food, schedules, or campus services"), and `course-quality-contract.md` line 19 / line 91 ("a campus example"). The Static Check Requirements (`course-quality-contract.md` line 109) even enforces uniqueness on a thing literally named "Campus example".
- **Escape hatch, in one place.** SKILL.md lines 322-323 (Anchor Profiles) say the opposite: "the copy must fit the profile's anchor domain. Do not force the word 'campus' or 'small numbers' into a non-STEM course."

For a working data analyst, a `data-campus` paragraph about "dorms, commuting, dining-hall queues" is actively damaging: it signals the course was written for undergraduates and would lose the reader. So I followed the Anchor-Profiles escape hatch and wrote `data-campus` as an **analyst-workplace** situation (a fraud-review dashboard, an experimentation dashboard).

**The friction:** the contract never resolves which rule wins. The visible heading the recipe actually ships is `Where this shows up` (module-recipe.md line 38), which is fine and domain-neutral, but the *prose-content gate* and the named attribute keep insisting the content be "campus". A literal static-check implementer reading `course-quality-contract.md` line 91 ("a module lacks a `Real-World Anchor` with a campus example") would reject my analyst anchors as non-compliant, even though SKILL.md line 322 explicitly blesses them. The Anchor Profiles section says "Generalize the gate, do not delete it" (line 329) but never says *how* the campus gate generalizes, so two readers of this skill will build two incompatible static checks. The attribute name `data-campus` itself is STEM-default baggage: it should be `data-realworld` or `data-anchor` for the overlay to compose cleanly.

**Subject-specific sharpening:** my mission-driven audience (analyst who wants to stop misreading p-values) makes the mismatch concrete. The single most credible anchor for this course is "your A/B dashboard lies to you about uncertainty." There is no campus-life equivalent that is not a downgrade.

## 2. STEM "small numbers" / "tiny case" wording is under-specified for a distribution-valued subject

`course-quality-contract.md` line 11 and the STEM row of the Anchor Profiles table (SKILL.md line 313) define a tiny case as "small numbers". Bayesian probability's natural tiny case is not a single small number, it is a **small distribution** (a Beta(1,1), a 2x2 confusion of sensitivity/prevalence). The contract's "small numbers" framing nudges toward a single scalar answer, which is the exact frequentist point-estimate habit this course is trying to break. I had to silently reinterpret "tiny case" as "smallest case that still produces a *distribution*", which the contract neither permits nor forbids. Recorded in PROFILE.md, but the contract gave no guidance.

## 3. The 25-module default vs "specific topic" tension is real, and the override is buried

Three files state the default differently and only one gives permission to change it:
- `course-quality-contract.md` line 7: "25 modules **exactly** unless the user requests a different size." (strongest wording: "exactly")
- SKILL.md line 50 / line 143: "25 modules" as a hard curriculum standard with a fixed 9/9/7 split.
- SKILL.md line 326 (Anchor Profiles): "25 across 3 tracks is the default, **not a law**."

For a focused topic, 25 modules forces padding, and padding directly trips the **anti-templating** gate (`course-quality-contract.md` line 12: title-swapped boilerplate is a failure). So the contracts are in mild self-conflict: they demand 25 modules *and* demand every module be genuinely distinct, which is hard for a narrow subject. I chose 15 (6/6/3) and justified it in PROFILE.md, but had to lean on the most permissive of three conflicting statements. The 9/9/7 split in SKILL.md line 145-147 is stated as a flat requirement with no formula for re-splitting at other sizes; "a sane per-track split" (line 326) is the only guidance and is purely vibes.

## 4. The OKF overlay's link target is ambiguous: `.md` modules vs `.html` modules

`learner-and-knowledge-okf.md` line 84 shows a concept linking its teaching module as `[Module 03](../guide/content/03-entropy.md)` — a **`.md`** path. But the actual rendered modules the rest of the skill ships are **`.html`** (`module-recipe.md` references `guide/content/*.html`; SKILL.md line 81). The example in the OKF doc points at files that do not exist in the architecture the same skill defines. I had to choose: I pointed `knowledge/*.md` "Taught by" links at the real `.html` files, and the module HTML links back at `../../knowledge/*.md`. That works, but the overlay doc's own example would produce broken links if followed literally. Under-specified: the doc never states whether knowledge links should target the source `.md` or the rendered `.html`.

## 5. OKF frontmatter `teaches:`/`prerequisites:` on modules has nowhere to live in the HTML modules

`learner-and-knowledge-okf.md` lines 85-89 say "A module frontmatter then carries `teaches: [...]` and `prerequisites:`". But modules are **HTML fragments** (`guide/content/bayes-rule.html` is a bare `<header>...</header>` fragment with no YAML, loaded into a reader shell). HTML has no YAML frontmatter. So the prescribed module→concept edges (`teaches`, module `prerequisites`) have **no defined home** in the actual file format. I encoded the teaches-edge in `course.md`'s curriculum map and in the knowledge files' back-links instead, and used in-body `<a href>` links inside the HTML. The overlay assumes Markdown modules; it does not compose with the skill's own HTML modules without a defined place to put module frontmatter. This is a real composition gap, not a style nit.

## 6. `data-campus` uniqueness gate vs the OKF "reuse is allowed in the knowledge layer" split

The OKF doc (line 62-71) carefully argues that concept *prose* may be reused via `knowledge/`, while teaching prose stays unique. Good. But the static-check uniqueness gate (`course-quality-contract.md` line 109) operates on the **rendered module HTML**, which does not import concept prose (it links it). In practice nothing in the overlay actually relaxes the uniqueness gate, because the gate never saw concept prose in the first place. So the much-discussed "the only place reuse is allowed" (OKF line 65) is a distinction without a mechanical consequence for the existing checks. It reads as if it solves a problem the checks don't have. Minor, but the doc oversells what the split buys.

## 7. `Real-World Anchor` heading name vs the recipe's actual heading

`course-quality-contract.md` line 19 and SKILL.md line 183 require a section called **`Real-World Anchor`** with sub-labels `Campus example` / `Useful metaphor` / `Where it can mislead`. But `module-recipe.md` line 38 ships the section with the visible heading **`Where this shows up`** and explicitly forbids exposing `Useful metaphor` as a visible heading (SKILL.md line 296, module-recipe.md line 13). So a static check that greps for the literal string `Real-World Anchor` or `Campus example` as a heading (which `course-quality-contract.md` line 367 / line 91 imply) will **fail the very module the recipe tells you to write**. I used `class="real-world-anchor" data-real-world-anchor` plus the `Where this shows up` heading per the recipe, which means a contract-literal check would flag it. The required-section name and the required-heading text contradict each other across two files.

## 8. Quiz "5-7 questions" vs the body-quiz + module-check split is countable two ways

`module-recipe.md` line 136 says "The file totals 5-7 `<div class="quiz">` blocks (body quizzes + Module check)." SKILL.md line 21 says "5-7 reasoning-oriented quiz questions per module." These agree on the number but the recipe counts *blocks across the whole file* including the optional body quiz, while the curriculum standard reads like 5-7 in the Module Check alone. I put 1 body quiz + 5 module-check quizzes = 6 total to satisfy the stricter (file-total) reading. A naive author counting only the Module Check section would ship 5-7 there plus a body quiz and **exceed** the file cap, failing the check. Ambiguous denominator.

## 9. `aria-invalid` / lab contract assumes a live app the deliverable spec excludes

The quality contract's lab and accessibility gates (`course-quality-contract.md` lines 25-26, 31, Browser Smoke Requirements) require interactive labs with `aria-invalid`, validation messages, progress persistence, and a Playwright smoke test. This dogfood run was scoped to module HTML + OKF files only (no `guide/js/app.js`, no `index.html`, no tests). So those gates are **un-satisfiable by construction** for this deliverable, which is fine for a dogfood but means the module HTML I wrote cannot actually be smoke-tested in isolation; it presumes a reader shell that the task said not to build. Not a contract bug, but worth recording that a "two sample modules" deliverable can't be validated by the contract's own test suite.

## 10. Writing Voice rule vs technical necessity: `n − s`, ratios, and em-dash-shaped math

SKILL.md line 215 bans em-dashes as connectors. Bayesian notation uses the minus sign `−` heavily (`b + n − s`), and `Beta(a + s, b + n − s)` reads close to an em-dash run to a naive regex. A Writing-Voice static check that greps for `—`/`–`/`-` between words (course-quality-contract line 120) risks false positives on `n − s` and on ranges like "11% to 33%". I avoided literal em-dashes in prose, but the gate and the math notation share a glyph neighborhood; the contract never carves out math. For a heavily-notational subject this needs a "strip `<code>` before the voice check" rule, which only exists for the *word-count* gate (SKILL.md line 361), not the *voice* gate.

## 11. Diagram engine assumed but not runnable here

SKILL.md line 256 and module-recipe.md line 131 require diagrams be built by the deterministic engine (`guide/tools/diagrams.mjs` + per-module specs), "never hand place coordinates." For this dogfood I hand-wrote two SVGs (the engine wasn't copied in, per scope). That technically violates "never hand-place coordinates" (course-quality-contract line 16). The contract offers no sanctioned path for a *sample* diagram outside the full engine, so any partial/dogfood build is forced to break this rule. Recorded in PROFILE.md.

---

## What worked well (briefly)

- **The hidden `data-*` attribute scheme is excellent.** `data-example` / `data-metaphor` / `data-test` / `data-campus` / `data-boundary` let the prose read naturally while staying machine-checkable, and the "unique after removing the title" gate is a genuinely good anti-slop mechanism. It caught zero violations here only because I wrote to it deliberately.
- **The worked → faded → independent → transfer ladder maps cleanly onto Bayesian practice.** A worked posterior, a faded fill-in-the-Beta, an independent update, and a surface-change transfer (conversion rate → die fairness) fell out naturally. This contract is subject-agnostic and strong.
- **The OKF learner overlay is conceptually right.** mission → state → records as plain Markdown with a read-decide-write loop is a clean, portable design, and the knowledge/teaching split is the correct factoring even if its mechanical payoff is overstated (item 6).
- **"Explanatory feedback, not answer-marking" (quality-contract line 21)** is the single best gate in the contract for a solo learner; writing a distractor diagnosis for each Bayesian quiz forced genuinely better questions.
- **The module-recipe self-check substring list** (module-recipe.md lines 148-157) is a precise, lintable spec and made the two modules fast to verify (all substrings present on first pass).

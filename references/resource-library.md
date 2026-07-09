# External Resource Library

Use this contract when the user asks for a YouTube/video library, reading list,
free-course list, slide-deck list, or any external learning resources alongside a
course.

## Purpose

The resource library gives the learner high-quality outside paths after the
course has taught the idea. It is a curated map, not a search-results dump.

The library should help a learner answer:

- "What should I watch if this module did not click?"
- "What should I read for more rigor?"
- "Which free course or lecture series goes deeper?"
- "Which resource matches my level and goal?"

## Intake Knob

Record this in `PROFILE.md`:

```yaml
resource_library:
  enabled: true
  modes: [youtube, books, free_courses, slide_decks, references]
  youtube_display: links
  max_items: 40
```

Defaults:

- `enabled: false` unless the user asks for it.
- `modes: [youtube, books, free_courses, references]` when enabled.
- `youtube_display: links`. Use `lite_embed` only if the user asks for inline
  video cards. Avoid full iframes inside lessons.
- `max_items: 40` for a 25-module course. Narrow courses may use fewer.

Allowed `youtube_display` values:

- `links`: default. Resource cards link to YouTube.
- `lite_embed`: the Resources page shows a thumbnail-style card with a play link.
  No autoplay, no third-party iframe loaded until the learner clicks.
- `privacy_iframe`: use only on a dedicated Resources page, never in every module.
  Use `https://www.youtube-nocookie.com/embed/<id>`, `loading="lazy"`, a real
  `title`, and no autoplay.

## File Shape

When enabled, add:

```text
<subject-course>/
  RESOURCE_LIBRARY.md
  guide/
    resources.html              # or a route/view inside guide/index.html
    js/resources.js             # optional structured data
```

If the course already has a single-page app, a Resources tab/route is fine. Do
not add a second app shell when the existing shell can render the list.

## Required Resource Fields

Each item must carry enough metadata for the learner and for a static check:

```yaml
- id: bayes-3blue1brown
  title: Bayes theorem, the geometry of changing beliefs
  type: youtube
  provider: YouTube
  creator: 3Blue1Brown
  url: https://www.youtube.com/watch?v=VIDEO_ID
  level: beginner
  cost: free
  time: 15 min
  modules: [05-medical-test-case, 08-beta-binomial]
  concepts: [bayes-rule, conditional-probability]
  use_when: "Bayes rule feels like symbol shuffling."
  why_this: "Strong visual explanation of prior, evidence, and posterior."
  watch_or_read_after: "Module 05"
```

Required fields:

- `title`
- `type`: `youtube`, `book`, `free_course`, `lecture_notes`, `slide_deck`,
  `paper`, `docs`, `practice`, or `reference`
- `provider`
- `creator` or `institution`
- `url`
- `level`: `beginner`, `intermediate`, `advanced`, or `mixed`
- `cost`: `free`, `free_audit`, `paid`, or `unknown`
- `time`: watch/read/work time, or `reference` for lookup resources
- `modules`: one or more module IDs from the course map
- `concepts`: one or more concept IDs from `knowledge/` when the OKF layer exists
- `use_when`: the learner problem this resource solves
- `why_this`: why this resource is credible and relevant

Do not include a resource because it ranks high in search. Include it because it
matches a course concept, learner level, and learning need.

## Search And Curation Routine

For a resource-enabled build, search the current web. Resource availability,
video quality, course pages, and URLs change.

Use this pass order:

1. Search official or high-signal sources first: university course pages, open
   textbooks, official docs, known lecture channels, public syllabi, reputable
   educators, and high-quality explainers.
2. Search YouTube for each track and the highest-friction concepts, not every
   module mechanically.
3. Prefer resources that teach a concept differently from the course: visual,
   worked-example-heavy, lecture-depth, or practice-heavy.
4. Open and inspect each candidate before adding it. Verify the title, creator,
   rough level, availability, and whether it still matches the URL.
5. Keep the final list small enough to choose from. A useful 25-module course
   usually needs 12-25 videos and 8-15 reading/course resources, not 200 links.

Quality filters:

- Prefer official, university, author, maintainer, or widely trusted educator
  sources.
- Prefer clear single-topic videos over long unfocused playlists unless the whole
  playlist is the resource.
- Prefer resources with worked examples, demos, proofs, or exercises.
- Reject broken links, SEO farms, pure marketing pages, low-signal summaries, and
  resources that contradict the course without a warning.
- Mark prerequisites honestly. Do not send a beginner to a graduate lecture
  without labeling it advanced.

## YouTube Rules

The YouTube library can appear in three places:

- a dedicated Resources page: preferred
- track-level sections inside the Resources page
- optional "Watch next" cards inside a module, capped at 1-2 links

Rules:

- Do not autoplay.
- Do not put full iframes inside every lesson. It slows the course and distracts
  from the active learning sequence.
- Link to the video unless the user asked for embeds.
- For embeds, use the privacy-enhanced embed host and lazy loading.
- Every video card must say why to watch it and when to watch it.
- Do not download, mirror, transcribe, or summarize long copyrighted videos.
- Quotes from external materials must stay short and attributed.

## Books, Free Courses, Slide Decks, And References

Books:

- Prefer legally free/open books, publisher pages, author PDFs, or library links.
- Mark paid books as `paid`; do not imply they are free.
- Do not upload or mirror copyrighted PDFs.

Free courses:

- Include official course pages, open courseware, public lecture series, and
  legally available audit links.
- For Coursera/edX/Udacity-style links, mark whether the content is `free_audit`,
  `paid`, or `unknown`.
- Do not promise certificates, grading, or access unless the page currently says
  so.

Slide decks and lecture notes:

- Prefer official university, instructor, or conference pages.
- Link to the source page when possible, not only a raw PDF.
- Add a note when the deck is dense and should be used after a specific module.

References and docs:

- For technical subjects, include official docs and standards where relevant.
- Label docs as references, not tutorials, if they are lookup material.

## UI Contract

The rendered Resources view must be quiet and scannable:

- Filters: type, track/module, level, and time.
- Cards: title, creator/institution, type, level, time/cost, linked modules,
  `use_when`, and primary action.
- YouTube cards: one visible action (`Watch`) and optional embed/thumbnail.
- Reading/course cards: one visible action (`Open resource`).
- No nested cards.
- No marketing hero. The first screen should show the resource controls and the
  first useful resources.
- External links open in a new tab with `rel="noopener noreferrer"`.

Accessibility:

- Embedded videos need accessible titles.
- Filters must be keyboard reachable and labeled.
- Cards must be readable without relying on thumbnail images.
- The page must work with JavaScript disabled if resources are rendered as HTML;
  if `resources.js` drives rendering, the static check must verify the data.

## Static Check Requirements

When `PROFILE.md` has `resource_library.enabled: true`, the static check must
fail if:

- `RESOURCE_LIBRARY.md` is missing.
- no rendered Resources page/tab exists.
- a resource is missing required fields.
- a URL is not `https://`.
- a YouTube item is not a `youtube.com`, `youtu.be`, or `youtube-nocookie.com`
  URL.
- an embedded YouTube iframe lacks `title`, `loading="lazy"`, or uses autoplay.
- an external link lacks `rel="noopener noreferrer"`.
- any resource has no module/concept mapping.
- any `why_this` or `use_when` field is generic filler. Mechanical proxy: fail
  values under 20 characters and values matching filler phrases such as
  `learn more`, `good resource`, `useful resource`, `high quality`, `great
  overview`, or `relevant resource`.
- the library exceeds `max_items` without an explicit profile override.

Network link checking is optional and should not be part of normal CI unless the
project accepts flaky external tests. Prefer a separate manual audit for live-link
availability.

## Browser Smoke Requirements

When the resource library is enabled, the smoke test should cover:

- Resources page or tab loads.
- filters can narrow by type and level.
- at least one YouTube resource and one reading/course resource render.
- primary links are focusable and openable.
- if embeds are enabled, the iframe is lazy-loaded, titled, and contained on
  mobile without horizontal overflow.

## Final Reporting

When a course ships with a resource library, report:

- total resources
- YouTube/video count
- reading/course/deck/reference count
- display mode: links, lite embed, or privacy iframe
- whether live links were manually checked

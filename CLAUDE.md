# CLAUDE.md — bellamym.github.io

Working context for Claude Code sessions on Marcus Bellamy's personal academic website.

---

## 0. Read this first: pushing is publishing

This repo is a **GitHub Pages user site**. A push to `main` deploys immediately to
`https://bellamym.github.io`. There is no staging environment and no build step.

Therefore:

- **Never push without asking.** Committing locally is fine. Pushing is a public act.
- Before proposing a push, state plainly what will become visible on the public web.
- The live site is the only environment. Verify in the Browser pane before committing.

---

## 1. Who this is for

Marcus A. Bellamy — Associate Professor with tenure, Operations & Technology Management,
Boston University Questrom School of Business. Operations and supply chain scholar
(supply network structure, alliance networks, environmental innovation, platform service design).

Audiences, in priority order:

1. Academic peers in operations, supply chain, and network science
2. Prospective doctoral students and collaborators
3. Practitioners and press

Tone: professional, clear, modestly opinionated. No marketing voice. No superlatives about himself.

---

## 2. Current architecture

Four hand-written static HTML pages at the repo root. No framework, no bundler, no package.json,
no back end. This is deliberate — do not propose Astro, Next, Vite, or Tailwind. A four-page
academic site updated a few times a year does not earn a node toolchain, and a build step would
break the "open the file and look at it" loop that makes this pleasant to maintain.

```
index.html      Home / landing
cv.html         CV and biography
research.html   Publications
teaching.html   Teaching and courses
README.md
.gitignore
CLAUDE.md       This file
```

### The design system

Each page carries its own inlined `<style>` block defining the same CSS custom properties:

- **Typography**: Instrument Serif (display) + Inter (body), loaded from Google Fonts
- **Color tokens**: `--bg --sur --sur2 --off --bd --dv --tx --tm --tf2 --ti --pr --ph --pl`
  Primary is teal (`--pr: #01696f` light, `#5badb4` dark)
- **Theming**: `:root,[data-theme=light]` and `[data-theme=dark]`, toggled via `data-theme`
- **Fluid type scale**: `--xs --sm --ba --lg --xl --2x`, all `clamp()`-based
- **Radii / shadows / max width**: `--r1..--r4`, `--sh1 --sh2`, `--w: 1120px`
- Class names are terse two-letter abbreviations (`.wrap .sh .nw .br .bi .tt .hg .ew .lead .acts .btn .bp`)

**Known debt:** that style block is duplicated across all four pages, so the tokens drift the
moment anyone edits one page. Extracting it to a shared `assets/css/style.css` is the single
highest-value refactor available. Do it before adding pages, not after.

---

## 3. Known broken things

- **No CV PDF and no paper PDFs are in the repo**, so there is nothing to link a download button to.
- **`index.html` publishes a phone number** (`tel:6173532287`). Confirm with Marcus that he wants
  a phone number crawlable on a public page before preserving it in any rewrite.

### Resolved (do not re-break)

- `assets/headshot.jpg` (800×892, studio) and `assets/headshot-alt.jpg` (520×520, office) are the
  two approved photos, wired to the hero swatch on `index.html`. **Both were stripped of EXIF
  before commit** — the studio original carried GPS coordinates. Any future image added to this
  repo must be EXIF-stripped the same way before it goes near a commit.
- The `assets/hs_*.jpg` variants in `~/Downloads/bellamy-academic-site/` are **placeholders**.
  Do not use them.

### Do not use `~/Downloads/bellamy-academic-site/`

That folder holds an **earlier draft** produced before the CV was supplied, and its HTML contains
fabricated content — `teaching.html` there lists OM 340, OM 542, OM 741, and OM 891, none of which
are real, and omits OM 855, which is. Its files are larger than the repo's on three of four pages,
which makes "bigger is newer" an actively wrong heuristic here. The repo is the corrected version.
Only the two photos in `actual photos i want to use instead/` were worth taking, and they are
already in `assets/`.

---

## 4. Content model

Keep content in structured form so it can be regenerated into new views. Target:

```
content/publications.json    title, authors, venue, year, doi, keywords,
                             methods, web_abstract, practitioner_takeaway
```

Paper explainer copy (web abstracts, pull quotes, practitioner takeaways, alt text) is produced
through a NotebookLM pipeline. The prompt lives in the "Personal Website Repository (media, docs,
ideas)" folder of the Interactive Project Management Course project. **All NotebookLM output is
unverified** until Marcus checks the numbers against the source PDFs — it misreads tables and has
been known to invert the sign of a coefficient. Never publish a figure from it unverified.

---

## 5. House rules

- **Never assert absence without checking.** Before writing "there is no X" or "X was never
  committed," actually search: `git log --all`, `git ls-files`, grep siblings, render images and
  look at them. This rule exists because the failure mode is confident and wrong.
- **Accessibility is not optional.** Every image needs alt text. Maintain WCAG AA contrast in
  both themes — check both, since the dark palette is a separate set of tokens.
- **No dead links.** If you reference an asset, confirm it exists on disk first.
- **Don't invent credentials, titles, dates, venues, or publication details.** Everything factual
  about Marcus comes from his CV. If the CV doesn't say it, ask.
- **Additive by default.** When modernizing a page, don't silently drop existing content — diff
  against the previous version and confirm anything removed was removed on purpose.
- Preserve the existing token names and class abbreviations. Consistency beats your preferences.

---

## 6. Model, effort, and permission mode — and when to tell Marcus to switch

Marcus does not want to manage these dials himself. **You are responsible for noticing when the
current setting is wrong and saying so out loud.** Don't switch silently; don't stay quiet either.

### Defaults

| Dial | Default | Notes |
|---|---|---|
| Model | **Sonnet 5** | Daily driver for the build loop |
| Effort | **High** | Right for real editing work |
| Permission mode | **Plan** to start a task, then **Accept Edits** once the plan is agreed | |

### Say something when these conditions appear

**Recommend switching to Opus 5** when the work stops being "fill this in" and becomes
"decide how this should be shaped":

- Extracting the duplicated design system into shared CSS
- Designing the content model / `publications.json` schema
- Any change that touches all four pages at once
- Information architecture: what pages exist, what lives where
- Debugging something that has already failed one fix attempt

Phrase it as: *"This is a structural change across all four pages — worth switching to Opus 5
before I start. Want to?"* Then wait.

**Recommend dropping back to Sonnet 5** once the structural decision is made and the remaining
work is mechanical — filling templates from JSON, copy edits, repetitive per-page application.
Staying on Opus for this burns budget for no gain.

**Recommend raising effort** when a task involves many interdependent steps, or when a first
attempt produced something shallow. **Recommend lowering it** for single-file copy tweaks.

**Recommend Plan mode** at the start of anything touching more than one file, anything that
changes what visitors see, or anything Marcus described in one sentence that will take twenty
steps. **Recommend Accept Edits** once a plan is agreed and the remaining work is execution.
**Never recommend bypassing permissions on this repo** — a push here is a public deploy.

### The reminder itself

At the start of a session, and whenever the nature of the work changes, state the current dials
and whether they fit:

> *Currently: Sonnet 5 / high effort / Accept Edits. That fits this task.*

or

> *Currently: Sonnet 5 / high effort. You're asking for a cross-page refactor — I'd switch to
> Opus 5 and Plan mode first. Say go and I'll wait while you change it.*

If Marcus starts a session by describing a big task and the dials are wrong, raise it **before**
doing any work, not halfway through.

---

## 7. Deploy checklist

1. Verify the page renders in the Browser pane — both light and dark themes
2. Confirm every referenced asset actually exists on disk
3. Check no `.DS_Store` or editor junk snuck in (`git status`)
4. Commit with a message describing the visible change, not the file touched
5. **Ask Marcus before pushing.** Push = live.

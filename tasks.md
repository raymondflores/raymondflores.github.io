# Portfolio Site — Improvement Tasks

Ranked by payoff-per-effort, grouped so related work lands together.

Verified against a `pnpm build` on Next 16.3.4 at commit `4faec78` (post-#34).
Items marked *(carried)* were open in the previous backlog and are unchanged.

## Pass 1 — Repo presentation

The portfolio links to the repo. Right now the repo undersells the site.

### 1. Write a README
- [ ] What the site is, and a link to the live URL
- [ ] Stack, `pnpm dev` / `build` / `lint` / `typecheck`, and how deploys work
- [ ] A short "where things live" section pointing at `CLAUDE.md` for the detail
- [ ] Note that content is hardcoded in components, so contributors know there is no CMS

**Why:** There has never been a README — not one commit in the repo's history has touched a
`README*` file. Anyone who clicks through from the portfolio to the GitHub repo lands on a bare
file listing. For a site whose whole job is to demonstrate craft, that is the weakest link in the
funnel.

### 2. Fix the repo's own metadata
- [ ] Homepage URL points at `https://raymondflores-github-io.vercel.app` — a Vercel deploy, not
      the GitHub Pages site this repo actually ships to
- [ ] Description is the single word "Portfolio"
- [ ] No topics set (`nextjs`, `typescript`, `tailwindcss`, `portfolio`, `github-pages`)

**Why:** The homepage link is the button GitHub renders at the top right of the repo page, and it
currently sends visitors to the wrong domain. Free to fix, and it is the first thing a recruiter
clicking the repo sees.

## Pass 2 — Correctness & staleness

### 3. Footer copyright year is frozen at build time
- [ ] `components/footer.tsx` computes `new Date().getFullYear()` in a server component, so the
      year is baked into the static export

**Why:** Verified in the build output — `out/index.html` literally contains `© 2026 Raymond
Flores`. Deploys only happen on push to master, so on 1 January the site shows the previous year
until the next unrelated commit. Same class of bug as the sitemap `lastModified` churn fixed in
#32, just in the other direction. Either render it client-side or drop the year entirely.

### 4. Reconcile the job title *(carried)*
- [x] Pick one of "Senior Software Engineer" and "Senior Full-Stack Engineer" and use it everywhere

**Why:** It splits 3-to-9. "Senior Full-Stack Engineer" appears in the hero h1
(`hero.tsx:49`), the OG card (`opengraph-image.png/route.tsx:141`), and the OG image alt
(`layout.tsx:110`). "Senior Software Engineer" appears everywhere else, including the page title,
the JSON-LD `jobTitle` (`layout.tsx:32`), the hero's own status card (`hero.tsx:135`), and every
entry in `experience.tsx`. Structured data disagreeing with the visible h1 is exactly what a search
crawler notices.

### 5. Delete the commented-out availability badge *(carried)*
- [x] Remove the dead JSX at `components/hero.tsx:36-41`, or bring it back

**Why:** Six lines of commented-out markup for an "Open to new opportunities" badge. Git remembers
it; the file does not need to. Line numbers re-verified post-#34.

### 6. Promote `react-hooks/set-state-in-effect` back to an error *(carried, was 2a)*
- [ ] Fix the 4 warnings, then raise the rule to `error` so CI fails on regressions

**Why:** `pnpm lint` reports 4 problems, 0 errors, 4 warnings — all this rule, in
`command-palette.tsx` (x2), `header.tsx`, and `theme-toggle.tsx`. They are warnings so CI passes,
which means they will quietly accumulate. This is the first code in the project ever to be linted.

## Pass 3 — Performance *(both carried)*

### 7. Cut the font payload
- [ ] Drop `JetBrains_Mono` in favor of the system mono stack already declared as a fallback in
      `globals.css`, or subset it to the glyphs actually rendered

**Why:** 13 woff2 files on disk, 2 preloaded (~88KB on the wire). Mono is used in seven incidental
places — timeline dates, tech chips, and `kbd` hints. A lot of bytes for text nobody reads as a
typeface.

### 8. Investigate the JS bundle
- [ ] Measure what is in the large chunks; confirm `lucide-react` tree-shakes
- [ ] Check whether `command-palette.tsx` can be deferred until first `⌘K`

**Why:** 188KB gzipped of JS for a static one-pager with no data fetching and no routing. CSS is
only 8KB gzipped by comparison. Scoped as an investigation — the fix depends on the measurement.

## Pass 4 — Infrastructure

### 9. Add a Dependabot config
- [ ] `.github/dependabot.yml` for the npm ecosystem, grouped minor/patch updates, monthly

**Why:** No `.github/dependabot.yml` has ever existed in this repo. PR #25 was a Dependabot
*security* update, which GitHub runs without config — but version updates need the file, so
ordinary dependency drift goes unnoticed. The Next 15 → 16 upgrade had to be done by hand.

### 10. Add a smoke test to CI
- [ ] There are zero test files in the repo
- [ ] Start narrow: build the site, then assert on the static output — `out/index.html` contains
      the h1 and the JSON-LD block, `out/404.html` is the styled page, `out/sitemap.xml` and
      `out/opengraph-image.png` exist and the PNG is 1200x630
- [ ] Optionally add an axe-core pass over the built HTML for a11y regressions

**Why:** CI now gates on lint and typecheck, but nothing verifies the site actually renders. Every
past regression in this repo — the extensionless OG image, the mobile horizontal scrollbar, the
swallowed palette jump — was a build-output or runtime problem that lint and `tsc` cannot see.

## Pass 5 — Content

### 11. Add analytics
- [ ] A privacy-respecting, cookie-free option (Plausible, Umami, GoatCounter) — no consent banner
      needed, and it stays consistent with the site's no-tracking feel

**Why:** There is no instrumentation of any kind. There is no way to know whether the OG card is
getting clicks, whether anyone downloads the resume, or whether the ⌘K palette is ever opened.
Every optimization in this backlog is currently being made blind.

### 12. Second project in the Projects section
- [ ] The section is titled "Projects" and `projects.tsx` has exactly one entry (BirdieLab)

**Why:** A plural heading over a single card reads as an unfinished section rather than a curated
one. Either add a second project or retitle it.

### 13. Add dates to Education
- [ ] `components/education.tsx` lists the degree, school, and city, but no graduation year

**Why:** Every other timeline entry on the site is dated. It is also a field the JSON-LD
`alumniOf` block could carry.

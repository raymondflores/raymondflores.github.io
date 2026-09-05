# Portfolio Site — Improvement Tasks

Ranked by payoff-per-effort, grouped so related work lands together.

Measurements below are from a `pnpm build` on Next 16.3.4 at commit `e7d2072`.

## Pass 1 — Unbreak the toolchain

### 1. Fix `pnpm lint` and finish the Next 16 migration — done
- [x] Replace `"lint": "next lint"` with `"lint": "eslint ."` and add a flat `eslint.config.mjs`
      built on `eslint-config-next/core-web-vitals` + `/typescript`, with `eslint` and
      `eslint-config-next` added as devDependencies
- [x] Commit the `tsconfig.json` and `next-env.d.ts` edits the Next 16 build makes
      (`jsx: preserve` → `react-jsx`, plus a `.next/dev/types` include)

**Why:** Next 16 removed `next lint`. On master today the script fails outright:
`Invalid project directory provided, no such directory: ./lint`. `pnpm build` is unaffected,
so this has been invisible — `node_modules` was still pinned at 15.5.25 locally.

**Left behind:** `react-hooks/set-state-in-effect` is set to `warn` rather than `error`. It flags
four deliberate hydration-safe effects — see task 2a.

### 2. Gate deploys on lint + typecheck — done
- [x] Add `pnpm lint` and `tsc --noEmit` steps to `.github/workflows/nextjs.yml`
- [ ] Consider splitting them into a `check` job that also runs on PRs, not just on push to master

**Why:** CI runs `pnpm install` and `pnpm build` only. Nothing catches a type or lint error before
it deploys. Depends on task 1 — there is no working lint command to call yet.

**Also changed:** CI was on `pnpm/action-setup@v2` pinned to pnpm 8 against a `lockfileVersion: 9.0`
lockfile. Now `packageManager: pnpm@11.25.0` in `package.json` drives `action-setup@v4`, and Node
moved 20 → 22 because pnpm 11 requires `>=22.13`. A `pnpm-workspace.yaml` approves the
`unrs-resolver` postinstall; without it pnpm 10+ exits non-zero from the deps check and every
`pnpm <script>` fails before the script runs.

### 2a. Promote `react-hooks/set-state-in-effect` back to an error
- [ ] `components/theme-toggle.tsx:34` — reads `data-theme` off `<html>` after mount
- [ ] `components/header.tsx:57` — platform sniff for the ⌘K vs Ctrl K label
- [ ] `components/command-palette.tsx:233` — resets query/index on open
- [ ] `components/command-palette.tsx:258` — resets index on every query change

**Why:** All four are correct today — setting state in an effect is what keeps the server render and
the client render identical through hydration. But `eslint-plugin-react-hooks` v7 flags the pattern,
and the idiomatic replacements (`useSyncExternalStore` for the first two, moving the reset into the
open/change handler for the last two) are cheaper to reason about. Scoped separately from task 1
because it edits hydration-sensitive UI, not the toolchain.

## Pass 2 — Performance

### 3. Cut the font payload
- [ ] Drop `JetBrains_Mono` from `next/font/google` in favor of the system mono stack already
      declared as a fallback in `globals.css:57` (`ui-monospace, SFMono-Regular, monospace`)
- [ ] Re-measure preloaded font bytes afterward

**Why:** The build emits 13 woff2 files (305KB on disk), of which 2 are preloaded — ~88KB on the
wire. Mono is used in exactly seven places, all incidental chrome: date ranges in the timeline,
tech chips on project cards, and the `kbd` hints in the header and command palette. That is a lot
of bytes for text nobody reads as a typeface. If the look is worth keeping, the fallback is to
subset it to the ~40 glyphs actually rendered rather than shipping the full latin range.

### 4. Investigate the JS bundle
- [ ] Measure what is in the three large chunks (256KB / 192KB / 128KB raw)
- [ ] Confirm `lucide-react` is tree-shaking to just the imported icons
- [ ] Check whether `command-palette.tsx` (459 lines, the largest component) can be deferred until
      first `⌘K` rather than shipped in the initial chunk

**Why:** 611KB raw / 185KB gzipped of JS for a static single-page site with no data fetching and
no routing. Some of that is unavoidable React, but the ratio is worth a look. This is scoped as an
investigation, not a fix — the fix depends on what the measurement shows.

## Pass 3 — Missing surfaces

### 5. Custom 404 page
- [ ] Add `app/not-found.tsx` matching the site's palette, with a link back to `/`

**Why:** `out/404.html` is currently Next's unstyled default. GitHub Pages serves it for every bad
path under the domain, so it is a real page a visitor can land on — and right now it looks like a
different site.

### 6. Print stylesheet
- [ ] Add an `@media print` block to `globals.css`: hide the fixed header, progress bar, command
      palette, theme toggle, and decorative glow blobs; force the light palette; expand link hrefs

**Why:** This is a resume site. Cmd+P is a thing people do to it, and the fixed header plus a dark
background makes the current output unusable. There are no print styles at all today.

### 7. Skip-to-content link
- [ ] Add a visually-hidden-until-focused skip link as the first focusable element in `layout.tsx`

**Why:** Keyboard and screen-reader users currently tab through the entire header — nav, theme
toggle, ⌘K trigger, resume button — before reaching content, on every visit. The rest of the site
is unusually careful about a11y (roles, `aria-current`, focus trapping in the palette), so this is
a conspicuous gap.

## Pass 4 — Content & polish

### 8. Metrics strip in the hero
- [ ] Surface three numbers from the Caesars bullets as stat tiles: +137% organic clicks,
      Lighthouse 65 → 99, 0ms TBT

**Why:** The strongest quantitative proof on the site is buried mid-sentence in a bullet at
`components/experience.tsx:22`. Carried over from the previous backlog — still the highest-value
change to what a visitor actually sees.

### 9. Reconcile the job title
- [ ] Pick one of "Senior Software Engineer" and "Senior Full-Stack Engineer" and use it everywhere

**Why:** The hero (`hero.tsx:48`) and the OG card alt text say "Senior Full-Stack Engineer"; the
page title, the JSON-LD `jobTitle`, and `CLAUDE.md` say "Senior Software Engineer". Structured data
disagreeing with the visible h1 is exactly what a search crawler notices.

### 10. Stop churning `sitemap.lastModified`
- [x] Replace `lastModified: new Date()` in `app/sitemap.ts` with a real content date

**Why:** Every build stamps "modified now" on the only URL in the sitemap, whether or not anything
changed. It trains crawlers to ignore the signal.

### 11. Delete the commented-out availability badge
- [ ] Remove the dead JSX block at `components/hero.tsx:36-41`, or bring it back

**Why:** Six lines of commented-out markup for an "Open to new opportunities" badge. Git remembers
it; the file does not need to.

# Portfolio Site — Improvement Tasks

Ranked by payoff-per-effort. Grouped into passes so related work lands together.

## Pass 1 — Sharing, SEO, performance, hygiene

Mechanical, no design risk.

### 1. Open Graph / Twitter card image — DONE
- [x] Add `app/opengraph-image.png/route.tsx` using `next/og` `ImageResponse`, generated at build time
- [x] Match site palette: `#0a0f1e` background, `#38bdf8` primary, name + title + availability badge + stack chips + portrait
- [x] Add `metadataBase` to `app/layout.tsx` so OG/Twitter URLs resolve absolute
- [x] Add `twitter` card metadata (`summary_large_image`)
- [x] Verify generated PNG lands in `out/opengraph-image.png` and tags render in built HTML

**Why:** `app/layout.tsx` set `openGraph` title/description but no `images`, and had no `twitter` block at all. Every link pasted into LinkedIn, Slack, or an email rendered as a bare text stub.

**Notes for future edits:**
- Uses a *route* (`app/opengraph-image.png/route.tsx`), not the `opengraph-image` file convention. The convention emits an **extensionless** file (`out/opengraph-image`), which GitHub Pages serves as `application/octet-stream` — social scrapers reject that. The route form exports to a real `.png` path.
- `export const dynamic = "force-static"` is required under `output: 'export'`.
- Fonts are read from `assets/fonts/*.ttf` at build time rather than fetched from Google, so the build has no network dependency. These are build-only and never shipped to the browser.
- The portrait is `assets/og-portrait.jpg` (460x460, ~90KB), inlined as a data URI. It is a separate build-time crop from `public/raymond.jpg`.
- Satori does **not** tile background gradients, so the site's dot-grid texture is intentionally omitted from the card — it would render as flat color. Glow blobs use `radial-gradient` because satori also ignores `filter: blur()`.

### 2. Optimize the hero photo
- [ ] Resize `public/raymond.jpg` (currently 1390x1723, 862KB) down to ~600px
- [ ] Convert to WebP/AVIF with a JPG fallback
- [ ] Add explicit `width`/`height` to the `<img>` in `components/hero.tsx` to kill layout shift
- [ ] Add `fetchPriority="high"` — it's the LCP element

**Why:** One file is ~37% of the 2.3MB build, served unoptimized (`images.unoptimized: true`) and displayed at 288px. Expect ~40-60KB after.

### 3. Structured data + crawler files
- [ ] Add JSON-LD `Person` schema to `app/layout.tsx` (jobTitle, worksFor, `sameAs` GitHub/LinkedIn, `knowsAbout` skills, address Austin TX)
- [ ] Add `app/sitemap.ts`
- [ ] Add `app/robots.ts`

**Why:** JSON-LD is how Google builds a knowledge panel for a name search. All the data is already hardcoded in the components.

### 4. Repo cleanup — DONE
- [x] `git rm -r` the pre-Next Bootstrap template leftovers: `css/`, `js/`, `fonts/`, `images/`, `scss/`, `prepros-6.config`
- [x] Remove the two obsolete resumes `assets/RaymondResume.pdf` and `assets/Resume2019.pdf` — but KEEP `assets/fonts/` and `assets/og-portrait.jpg`, which task 1 uses at build time
- [x] Remove the 12 tracked `.DS_Store` files (`.gitignore` already listed `.DS_Store`; they predated it)

**Why:** ~178 of ~190 tracked files are dead weight unreferenced by any component. Anyone clicking through to the repo from the portfolio sees a template graveyard.

**Notes for future edits:**
- 182 files removed; 29 remain tracked. Verified with `pnpm build`: same six routes, and `out/opengraph-image.png` still renders at 1200x630.
- Also dropped two now-dead `.gitignore` entries for deleted template files: `prepos-6.config` (itself a typo — the real file was `prepros-6.config`, so it was never actually ignored) and `single.html`.

## Pass 2 — Make it feel alive

### 5. Scroll-spy nav + progress bar
- [ ] `IntersectionObserver` to highlight the active section in `components/header.tsx`
- [ ] Thin scroll-progress bar under the fixed header

**Why:** Five anchors with no active state — nothing tells you where you are on a long single page.

### 6. Wire up scroll reveal
- [ ] Use the already-defined `.animate-fade-up` (`app/globals.css:74`) on section entry — it is currently defined and used nowhere
- [ ] Prefer CSS scroll-driven animations (`animation-timeline: view()`) with graceful degradation

### 7. Respect `prefers-reduced-motion`
- [ ] Guard `html { scroll-behavior: smooth }`
- [ ] Guard the two infinite `animate-pulse-dot` instances

**Why:** Currently unhandled, and it is the kind of detail another engineer notices.

## Pass 3 — Content & extras

### 8. Metrics strip in the hero
- [ ] Surface three numbers from the Caesars bullets as stat tiles (+137% organic clicks, Lighthouse 65 -> 99, 0ms TBT)

**Why:** The strongest quantitative proof on the site is buried in paragraph six of `components/experience.tsx`.

### 9. BirdieLab case-study depth
- [ ] Add screenshots or a phone-frame mockup to `components/projects.tsx`

**Why:** One project, strong writeup, zero visuals.

### 10. Command palette (Cmd+K)
- [ ] Fuzzy-jump to sections, copy email, open GitHub/LinkedIn, download resume

### 11. Light mode
- [ ] CSS variables in `globals.css` are already structured for it; add a toggle

### 12. Fix the `lint` script before Next 16 lands
- [ ] `package.json` has `"lint": "next lint"`. This still works on Next 15, but `next lint` was removed in Next 16 — on the `chore/next-16-upgrade` branch it errors with `Invalid project directory provided, no such directory: ./lint`
- [ ] Migrate to the ESLint CLI (`eslint .`) with a flat config

**Why:** Surfaced while verifying the OG build against Next 16. Not a problem on `master` today; it becomes one the moment the Next 16 upgrade merges.

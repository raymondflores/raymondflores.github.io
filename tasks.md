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
- The portrait is `assets/og-portrait.jpg` (460x460, ~90KB), inlined as a data URI. It is a separate build-time crop from the full-resolution portrait, which task 2 moved to `assets/raymond-original.jpg`.
- Satori does **not** tile background gradients, so the site's dot-grid texture is intentionally omitted from the card — it would render as flat color. Glow blobs use `radial-gradient` because satori also ignores `filter: blur()`.

### 2. Optimize the hero photo — DONE
- [x] Resize `public/raymond.jpg` (was 1390x1723, 862KB) down to 600x744
- [x] Convert to WebP/AVIF with a JPG fallback, served via `<picture>`
- [x] Add explicit `width`/`height` to the `<img>` in `components/hero.tsx` to kill layout shift
- [x] Add `fetchPriority="high"` — it's the LCP element

**Why:** One file is ~37% of the 2.3MB build, served unoptimized (`images.unoptimized: true`) and displayed at 288px. Expect ~40-60KB after.

**Result:** 862KB -> 42KB on the wire (AVIF, which is what Chrome, Firefox, and Safari 16+ actually fetch). Fallbacks: WebP 66KB, JPG 67KB.

**Notes for future edits:**
- The 1390x1723 master moved to `assets/raymond-original.jpg`. It is the source for regenerating the three `public/raymond.*` files and is **not** shipped to the browser. Task 4's repo cleanup must keep it, alongside `assets/fonts/` and `assets/og-portrait.jpg`.
- `public/raymond.jpg` keeps its original path so the URL stays stable; only its contents changed.
- Encoder settings, all off a `sharp(...).rotate().resize({ width: 600 })` base: JPG `quality: 72, mozjpeg: true, progressive: true`; WebP `quality: 72, effort: 6, smartSubsample: true`; AVIF `quality: 50, effort: 6`. Visually indistinguishable from q80 at the 288px render size.
- `sharp` is intentionally **not** a project dependency — these are pre-generated build *inputs*, not build outputs. Install it ad hoc to regenerate.
- Aspect ratio is preserved rather than pre-cropped square, so `object-[center_15%]` still controls the framing. Changing one without the other shifts the crop.
- React emits `srcSet` and `fetchPriority` into the static HTML with their camelCase spelling. That is fine — HTML attribute names are case-insensitive. Verified in Chrome that only `raymond.avif` is fetched and `fetchpriority` reads back as `high`.

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

### 5. Scroll-spy nav + progress bar — DONE
- [x] `IntersectionObserver` to highlight the active section in `components/header.tsx`
- [x] Thin scroll-progress bar under the fixed header

**Why:** Five anchors with no active state — nothing tells you where you are on a long single page.

**Notes for future edits:**
- The observer uses `rootMargin: "-80px 0px -55% 0px"` — a band starting just below the fixed header. The callback keeps a `Set` of ids currently in the band and picks the first one in `navItems` order, so overlapping sections resolve top-down.
- `education` has no `id` and no nav entry. When it fills the band nothing intersects, the callback finds no candidate, and the previous section stays highlighted — that is intentional, not a bug.
- The progress bar is JS (rAF-throttled scroll listener driving `scaleX`) rather than CSS `animation-timeline: scroll()`, so it works in browsers without scroll-driven animation support.
- Active state is exposed as `aria-current`, with the underline (desktop) and dot (mobile) as `aria-hidden` decoration.

### 6. Wire up scroll reveal
- [ ] Use the already-defined `.animate-fade-up` (`app/globals.css:74`) on section entry — it is currently defined and used nowhere
- [ ] Prefer CSS scroll-driven animations (`animation-timeline: view()`) with graceful degradation

### 7. Respect `prefers-reduced-motion` — DONE
- [x] Guard `html { scroll-behavior: smooth }`
- [x] Guard the two infinite `animate-pulse-dot` instances

**Why:** Currently unhandled, and it is the kind of detail another engineer notices.

**Notes for future edits:**
- One `@media (prefers-reduced-motion: reduce)` block in `app/globals.css`, right under the `html` rule it overrides.
- It resets `scroll-behavior` to `auto` and collapses every animation and transition to `0.01ms` with `animation-iteration-count: 1`. Near-zero rather than `none` so animations still *finish*: elements land on their final keyframe instead of being stuck at the initial one. That matters for `.animate-fade-up` (starts at `opacity: 0`), which task 6 will start using — it inherits the guard for free.
- The `!important` is required to beat Tailwind utilities like `transition-all duration-300`.
- No JS depends on `transitionend`/`animationend`, so collapsing durations cannot strand any UI. The mobile menu in `components/header.tsx` is a pure class toggle and simply snaps open.

## Pass 3 — Content & extras

### 8. Metrics strip in the hero
- [ ] Surface three numbers from the Caesars bullets as stat tiles (+137% organic clicks, Lighthouse 65 -> 99, 0ms TBT)

**Why:** The strongest quantitative proof on the site is buried in paragraph six of `components/experience.tsx`.

### 9. BirdieLab case-study depth
- [ ] Add screenshots or a phone-frame mockup to `components/projects.tsx`

**Why:** One project, strong writeup, zero visuals.

### 10. Command palette (Cmd+K)
- [ ] Fuzzy-jump to sections, copy email, open GitHub/LinkedIn, download resume

### 11. Light mode — DONE
- [x] Move the palette out of `@theme inline` into plain `:root` custom properties, with a `:root[data-theme="light"]` override
- [x] Sun/moon toggle in the header (desktop, and outside the collapsible menu on mobile)
- [x] Persist the choice in `localStorage`, restored before first paint by an inline script in `app/layout.tsx`

**Notes for future edits:**
- The `@theme inline` block no longer holds color literals — it maps `--color-*` to `var(--background)` and friends. That indirection is the whole trick: with `inline`, Tailwind emits the *value* of a theme token into each utility, so a palette declared directly in `@theme` bakes `#0a0f1e` into `.bg-background` and can never be swapped at runtime. Pointing the tokens at plain custom properties makes the utility compile to `background-color: var(--background)` instead. Verified in the built CSS.
- **Dark stays the default** for a first-time visitor regardless of their OS setting — the site is dark-first and the OG card matches. To follow `prefers-color-scheme` instead, wrap the light tokens in a `@media (prefers-color-scheme: light)` block scoped to `:root:not([data-theme="dark"])` and add a matching `:root[data-theme="dark"]` block so the toggle still wins both ways.
- Light `--primary` is sky-600 / `--accent` is cyan-600, not the dark theme's 400-weights — those wash out against a near-white background.
- The three decorative classes at the bottom of `globals.css` (`gradient-text`, `dot-grid`, `glow-primary`) paint with raw colors rather than Tailwind tokens, so each got its own variable. Any new decorative CSS that hardcodes a color needs the same treatment; the section components need none, since they were already using semantic tokens exclusively.
- `color-scheme` is set per theme so form controls, the scrollbar, and the browser's own chrome follow along. The `theme-color` meta is static in `viewport` (the dark default) and rewritten by the toggle at runtime — it cannot be expressed declaratively since the theme is not tied to a media query.
- `<html>` needs `suppressHydrationWarning`: the restore script mutates `data-theme` before React hydrates. The toggle reads the attribute back on mount rather than re-deriving it, so the icon always matches what is on screen.

### 12. Fix the `lint` script before Next 16 lands
- [ ] `package.json` has `"lint": "next lint"`. This still works on Next 15, but `next lint` was removed in Next 16 — on the `chore/next-16-upgrade` branch it errors with `Invalid project directory provided, no such directory: ./lint`
- [ ] Migrate to the ESLint CLI (`eslint .`) with a flat config

**Why:** Surfaced while verifying the OG build against Next 16. Not a problem on `master` today; it becomes one the moment the Next 16 upgrade merges.

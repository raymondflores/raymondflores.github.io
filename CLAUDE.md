# Raymond Flores — Portfolio Site

Personal portfolio and resume site for Raymond Flores, Senior Software Engineer.

## Stack

- **Framework**: Next.js 16 (App Router, static export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: lucide-react for icons, clsx + tailwind-merge for class utilities
- **Package manager**: pnpm
- **Fonts**: Inter (sans), JetBrains Mono (mono) via next/font/google

## Commands

```bash
pnpm dev        # dev server with Turbopack
pnpm build      # static export → ./out
pnpm lint       # BROKEN — see Known Issues
```

## Project Structure

```
app/
  layout.tsx                    # root layout, metadata, JSON-LD Person schema,
                                #   font setup, pre-paint theme restore script
  page.tsx                      # single page, composes all sections
  not-found.tsx                 # styled 404 → out/404.html, served by GitHub Pages
  globals.css                   # CSS variables, theme palettes, base styles
  icon.svg                      # favicon
  opengraph-image.png/route.tsx # OG card, generated at build time via next/og
  robots.ts                     # → out/robots.txt
  sitemap.ts                    # → out/sitemap.xml
components/
  header.tsx           # fixed nav, scroll-spy, progress bar, mobile menu,
                       #   resume download, ⌘K trigger
  hero.tsx             # above-the-fold intro + currently-at status card
  experience.tsx       # timeline of work history (data lives inline)
  projects.tsx         # side projects incl. BirdieLab screenshots (data inline)
  skills.tsx
  education.tsx
  contact.tsx
  footer.tsx
  theme-toggle.tsx     # sun/moon toggle, persists to localStorage
  command-palette.tsx  # ⌘K / Ctrl+K palette, hand-rolled fuzzy matcher
lib/
  utils.ts             # cn() helper (clsx + tailwind-merge)
assets/                # build-time inputs, never shipped to the browser:
                       #   image masters, and the TTFs next/og reads at build
public/                # static files served at root (resume PDF, web images)
```

## Deployment

Deploys to **GitHub Pages** on push to `master` via `.github/workflows/nextjs.yml`.
No PR preview deployments — merging to master is the deploy trigger.

The build runs `next build` which outputs a static site to `./out` (configured via `output: 'export'` in next.config).

CI runs `pnpm install` and `pnpm build` only — there is no lint or typecheck gate.

## Conventions

- Components are named exports, not default exports
- Section data (experience entries, skills, etc.) is defined inline in the component file as typed arrays — no external data layer
- `cn()` from `lib/utils.ts` for all conditional className logic
- Sections use `id` attributes for anchor nav (`#experience`, `#skills`, etc.)
- Dark and light themes, switched by `data-theme` on `<html>`; dark is the default for first-time visitors regardless of OS setting. Palettes are plain custom properties in `globals.css`, and `@theme inline` maps `--color-*` onto them. Keep that indirection — declaring colors directly in `@theme` bakes literals into the utilities and breaks runtime theme swapping.
- No state management library — useState for local UI state only

## Content Updates

All content is hardcoded in the component files:
- **Work history** → `components/experience.tsx` (`experiences` array)
- **Projects** → `components/projects.tsx` (`projects` array)
- **Skills** → `components/skills.tsx`
- **Education** → `components/education.tsx`
- **Contact links** → `components/contact.tsx`
- **Nav items** → `components/header.tsx` (`navItems` array)
- **Command palette entries** → `components/command-palette.tsx` (`buildCommands()`)
- **Metadata / SEO** → `app/layout.tsx` (metadata export + `personJsonLd`)
- **Resume PDF** → `public/Raymond_Flores_2026.pdf` (linked from header, hero, and contact)

## Known Issues

- **`pnpm lint` is broken.** The script is `next lint`, which Next 16 removed — it fails with
  `Invalid project directory provided, no such directory: ./lint`. There is no ESLint config file
  and no `eslint` binary installed, so fixing it means a flat-config migration (`eslint.config.mjs`
  + `"lint": "eslint ."`), not a one-line script change. `pnpm build` is unaffected, and CI only
  runs `pnpm build`, so deploys are green — but nothing gates lint or type errors before deploy.
- The Next 16 build rewrites `tsconfig.json` (`jsx: preserve` → `react-jsx`, adds a
  `.next/dev/types` include) and `next-env.d.ts`. Those edits are expected; commit them.

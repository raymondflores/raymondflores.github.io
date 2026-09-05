# raymondflores.github.io

The personal portfolio and resume site for Raymond Flores, Senior Software Engineer.

**Live: [raymondflores.github.io](https://raymondflores.github.io)**

A single-page site — intro, work history, projects, skills, education, contact — with a dark and
light theme and a `⌘K` command palette. It is a static export: no server, no database, no runtime
data fetching.

## Stack

- [Next.js 16](https://nextjs.org) (App Router, `output: 'export'`)
- TypeScript
- [Tailwind CSS v4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) for icons
- pnpm

## Getting started

```bash
pnpm install
pnpm dev
```

Then open [localhost:3000](http://localhost:3000).

| Command | What it does |
| --- | --- |
| `pnpm dev` | Dev server with Turbopack |
| `pnpm build` | Static export to `./out` |
| `pnpm lint` | ESLint (flat config in `eslint.config.mjs`) |
| `pnpm typecheck` | `tsc --noEmit` |

## Deployment

Pushing to `master` triggers [`.github/workflows/nextjs.yml`](.github/workflows/nextjs.yml), which
runs lint, then typecheck, then build, and publishes `./out` to GitHub Pages. Lint or type errors
fail the deploy.

There are no PR preview deploys — merging to `master` is the deploy.

## Where things live

```
app/         layout (metadata, JSON-LD, fonts), the page itself, 404,
             global CSS, and the generated robots.txt / sitemap.xml / OG image
components/  one file per section, plus the header, theme toggle, and ⌘K palette
lib/         cn() class-merge helper
public/      served at the site root (resume PDF, web-ready images)
assets/      build-time inputs only — image masters and the fonts next/og reads
```

**There is no CMS and no data layer.** Every section's content is a typed array defined inline in
its own component file — work history in `components/experience.tsx`, projects in
`components/projects.tsx`, and so on. To change what the site says, edit the component.

[`CLAUDE.md`](CLAUDE.md) is the full reference: file-by-file notes, theming conventions, where each
piece of content lives, and the known issues. This README is the front door; that file is the
detail.

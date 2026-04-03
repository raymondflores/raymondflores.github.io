# Raymond Flores — Portfolio Site

Personal portfolio and resume site for Raymond Flores, Senior Software Engineer.

## Stack

- **Framework**: Next.js 15 (App Router, static export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI**: lucide-react for icons, clsx + tailwind-merge for class utilities
- **Package manager**: pnpm
- **Fonts**: Inter (sans), JetBrains Mono (mono) via next/font/google

## Commands

```bash
pnpm dev        # dev server with Turbopack
pnpm build      # static export → ./out
pnpm lint       # ESLint
```

## Project Structure

```
app/
  layout.tsx      # root layout, metadata, font setup
  page.tsx        # single page, composes all sections
  globals.css     # CSS variables, base styles
components/
  header.tsx      # fixed nav with mobile menu + resume download
  hero.tsx        # above-the-fold intro + currently-at status card
  experience.tsx  # timeline of work history (data lives inline)
  skills.tsx
  education.tsx
  contact.tsx
  footer.tsx
lib/
  utils.ts        # cn() helper (clsx + tailwind-merge)
assets/           # PDFs (resume)
public/           # static files served at root
```

## Deployment

Deploys to **GitHub Pages** on push to `master` via `.github/workflows/nextjs.yml`.
No PR preview deployments — merging to master is the deploy trigger.

The build runs `next build` which outputs a static site to `./out` (configured via `output: 'export'` in next.config).

## Conventions

- Components are named exports, not default exports
- Section data (experience entries, skills, etc.) is defined inline in the component file as typed arrays — no external data layer
- `cn()` from `lib/utils.ts` for all conditional className logic
- Sections use `id` attributes for anchor nav (`#experience`, `#skills`, etc.)
- Dark theme — CSS variables defined in `globals.css`, no light mode toggle
- No state management library — useState for local UI state only

## Content Updates

All content is hardcoded in the component files:
- **Work history** → `components/experience.tsx` (`experiences` array)
- **Skills** → `components/skills.tsx`
- **Education** → `components/education.tsx`
- **Contact links** → `components/contact.tsx`
- **Nav items** → `components/header.tsx` (`navItems` array)
- **Metadata / SEO** → `app/layout.tsx`
- **Resume PDF** → `public/RaymondFloresResume.pdf`

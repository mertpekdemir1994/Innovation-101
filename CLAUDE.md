# CLAUDE.md

This file provides guidance to Claude Code when working with code in this repository.

## Commands

Node is managed via nvm — source it before any npm command if not already active:
```bash
export NVM_DIR="$HOME/.nvm" && [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

| Task | Command |
|---|---|
| Start dev server (HMR at localhost:3000) | `npm run dev` |
| Type-check + production build | `npm run build` |
| Lint | `npm run lint` |
| Preview production build locally | `npm run start` |

There is no test runner configured yet.

## Stack

- **Next.js 14** (App Router) + **TypeScript** + **Tailwind CSS v3**
- **Framer Motion** for animations
- **D3.js** for interactive SVG diagrams
- **next-mdx-remote** + **gray-matter** for MDX content
- **Cal.com** embed for calendar integration
- **Plausible Analytics** for privacy-friendly analytics
- Hosted on **Vercel**

Do not introduce any other dependencies without asking first.
No UI component libraries (no shadcn, MUI, Chakra, etc.) — build from scratch with Tailwind.

## Architecture

Entry chain: `src/app/layout.tsx` → `src/app/page.tsx`

```
src/
  app/           — Next.js App Router pages and layouts
  components/    — Shared React components
  lib/           — Utilities (content loader, analytics wrapper)
  types/         — TypeScript type definitions
content/         — MDX content files (all written content lives here)
  frameworks/
  processes/
  methods/
    discover/ | define/ | develop/ | deliver/
  scenarios/
  reading/
public/          — Static assets
```

## Navigation Structure

```
/                     Homepage
/explore              Processes & Frameworks combined index (tab toggle)
/process/[slug]       Individual process page
/framework/[slug]     Individual framework page
/methods              Methods index (by deployment stage, primary)
/methods/[slug]       Individual method page
/scenarios            Scenarios index
/scenarios/[slug]     Individual scenario page
/reading              Reading / book summaries index
/reading/[slug]       Individual book summary page
/about                About + Cal.com calendar embed
```

## Design System Rules

**These rules apply to every component. Never deviate without updating this file first.**

### Color tokens (CSS custom properties in `src/app/globals.css`)

| Token | Value | Usage |
|---|---|---|
| `--color-process` | `#2563EB` | Process section accent |
| `--color-framework` | `#7C3AED` | Framework section accent |
| `--color-methods` | `#059669` | Methods section accent |
| `--color-scenario` | `#D97706` | Scenario section accent |
| `--color-reading` | `#DC2626` | Reading section accent |
| `--color-neutral-900` | `#111827` | Primary text |
| `--color-neutral-600` | `#4B5563` | Secondary text |
| `--color-neutral-100` | `#F3F4F6` | Backgrounds, borders |
| `--color-background` | `#FFFFFF` | Page background |
| `--color-section` | varies | Current section color (set by SectionProvider) |

Use Tailwind utilities that map to these tokens: `text-process`, `bg-framework`, `border-methods`, `text-section`, etc.
Never use raw hex values in components — always use the token.

### Typography
- Font: **Inter** only, loaded via `next/font/google` in `src/app/layout.tsx`
- Weights: **400 (normal)** and **600 (semibold)** only
- Bold (`font-bold`, `font-700`) is reserved for inline emphasis in body copy only — never on heading elements
- Never use more than two font weights in a single component

> **Enforcement note:** The 400/600 weight rule was pre-existing in this file and was violated on all six framework pages. An ESLint rule now catches `font-bold` on heading elements in page files. A written rule without automated enforcement is not enforced.

### Spacing
- All spacing on a **base-8 scale**: `2, 4, 8, 12, 16, 24, 32, 48, 64, 96` (px)
- Max content width: `max-w-content` (1200px)
- Detail page content column: `max-w-prose` (720px)
- Related content panel: `max-w-panel` (320px)
- Mobile breakpoint: `md:` (768px)

### Animation
- Use **Framer Motion** for all animations — no CSS transitions except for simple hover states
- All Framer Motion animations must wrap in a `prefers-reduced-motion` check:
  ```tsx
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ```
  Or use the `useReducedMotion()` hook from Framer Motion
- Standard durations: zoom 400ms, slide 400ms, accordion 300ms, drawer 350ms, fade 200ms

### Interactive components
- Every diagram must be explorable, not just viewable
- Progressive disclosure: overview first, detail on demand
- No dead ends: every page links to related content
- Mobile-first: tap to expand, swipe to navigate

### Layout Primitives

Method and framework page files (`src/app/methods/*/page.tsx`, `src/app/framework/*/page.tsx`) **MUST** import layout primitives from `src/components/method/Primitives.tsx` and **MUST NOT** define them locally.

Shared primitives exported from that module:

| Export | Key props |
|---|---|
| `DarkSection` | `className?: string` |
| `LightSection` | `className?: string` |
| `WarmSection` | `className?: string` |
| `Container` | `prose?: boolean` |
| `SectionLabel` | `accent: string`, `dark?: boolean` |
| `SectionHeadingDark` | — |
| `SectionHeadingLight` | — |
| `Body` | `dark?: boolean`, `className?: string` |

An ESLint rule (see `.eslintrc.json`) enforces this: any `FunctionDeclaration` naming a shared primitive inside a page file is a lint error.

**Current exceptions:** Six pages keep local structural definitions (`DarkSection`, `LightSection`, `Container`) because they use incompatible layout models. ESLint is suppressed for those files. Treat these as structural drift to resolve in a dedicated migration. Affected pages: `business-model-canvas`, `storyboarding`, `systems-mapping`, `design-principles`, `capability-mapping`, `delivery-roadmap`.

### Content
- Do not generate any framework, method, process, scenario, or reading content
- All written content is provided by the user as MDX files in `/content`
- Use placeholder text only when building shells before content is provided

## TypeScript Notes

`tsconfig.json` is generated by Next.js. Type errors block production builds (`npm run build` runs `tsc`). No path aliases are configured — use relative imports.

## Content Data Model

See `src/types/content.ts` for all frontmatter type definitions.
See `src/lib/content.ts` for content loader functions.

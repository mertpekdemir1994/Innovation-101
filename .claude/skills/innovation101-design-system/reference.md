# Innovation 101 — Design System Reference

## Design Intent

**"Bold but not loud. Expert but not extra."**

Innovation 101 is a personal editorial platform. The visual system should feel like a well-designed book on a thoughtful person's shelf — authoritative, structured, and clear — not a startup landing page.

Color is identity, not decoration. The five section accent colors (process/framework/methods/scenario/reading) appear sparingly, primarily in overlines, active states, and section-specific accents. The default palette is warm neutral: cream whites, charcoal text, generous white space.

Type is the primary visual element. Fraunces at display scale carries editorial weight. Inter keeps everything readable and professional. JetBrains Mono signals precision and classification — it's the voice of the system talking, not a human writing.

Motion adds meaning. Every animation should either reveal hierarchy (showing where things are in a structure), confirm an action (feedback on what the user did), or draw the eye to what matters. Motion that exists purely for delight is cut.

---

## Font Role Map

| Font | When | Why |
|------|------|-----|
| **Fraunces** (display) | h1 headings at text-5xl and above, framework names in SVG viz | Editorial authority; the "voice of the document" |
| **Inter** (sans) | h2-h6, body copy, nav, labels, buttons, captions | Neutral, readable, professional — the working font |
| **JetBrains Mono** (mono) | Stage badges, framework-type overlines, step numbers, method counts, code | Signals "classification" or "system" — precision, not decoration |

---

## Color Role Map

| Token | Usage |
|-------|-------|
| `--color-process` (#2563EB) | Process section accent, step numbers in process flows |
| `--color-framework` (#7C3AED) | Framework section accent, active states on framework pages |
| `--color-methods` (#059669) | Methods section accent, stage badge backgrounds |
| `--color-scenario` (#D97706) | Scenarios section accent |
| `--color-reading` (#DC2626) | Reading section accent |
| `--color-neutral-900` (#111827) | Primary text, headings |
| `--color-neutral-600` (#4B5563) | Secondary text, captions, meta |
| `--color-neutral-400` (#9CA3AF) | Placeholder text, disabled states |
| `--color-neutral-200` (#E5E7EB) | Dividers, borders |
| `--color-neutral-100` (#F3F4F6) | Subtle backgrounds, hover states |
| `--color-warm-50` (#FAFAF7) | Editorial section backgrounds |
| `--color-warm-100` (#F5F5F0) | Hero surfaces, prominent callout panels |
| `--color-section` | Dynamic — current section accent set by SectionProvider |

---

## Spacing Cheat Sheet

The named token scale maps to these Tailwind numeric equivalents:

| Token | Value | Tailwind default |
|-------|-------|-----------------|
| `--space-4` | 1rem (16px) | `p-4` |
| `--space-6` | 1.5rem (24px) | `p-6` |
| `--space-7` | 2rem (32px) | `p-8` |
| `--space-9` | 3rem (48px) | `p-12` |
| `--space-10` | 4rem (64px) | `p-16` |
| `--space-12` | 6rem (96px) | `p-24` |

Section vertical rhythm: `py-space-9` (48px) top/bottom on main content sections. Hero sections: `py-space-12` (96px).

---

## Typography Hierarchy in Practice

```
Page hero (Fraunces)          font-display text-5xl–7xl font-bold
Section h2 (Inter)            text-4xl font-semibold
Subsection h3 (Inter)         text-2xl font-semibold
Body large (Inter)            text-lg leading-relaxed
Body default (Inter)          text-base leading-relaxed
Caption / meta (Inter)        text-sm text-neutral-600
Eyebrow/overline (Mono)       font-mono text-xs uppercase tracking-widest text-section
Stage badge (Mono)            font-mono text-2xs uppercase tracking-widest
Code (Mono)                   font-mono text-sm
```

---

## Framer Motion Usage

Import spring presets:
```ts
import { spring } from '@/lib/motion'
```

| Preset | Use |
|--------|-----|
| `spring.snappy` | Menus, accordions, toggles |
| `spring.gentle` | Cards, panels, drawers |
| `spring.reveal` | Page entrances, content reveals |
| `spring.cinematic` | Scroll-pinned Double Diamond animation |

Always check `useReducedMotion()` from framer-motion and pass `{}` as the transition/animate value when true.

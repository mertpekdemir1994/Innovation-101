# Innovation 101 — Design System Skill

**Trigger:** Use this skill whenever building or editing any UI component, page, or style in the Innovation 101 project.

**Source of truth:** `src/app/styles/tokens.css`
**Tailwind mapping:** `tailwind.config.ts`
**Reference:** `reference.md` in this directory

---

## 7 Non-Negotiable Rules

### 1. Token-only colors
Never write raw hex values or RGB literals in component code.
```tsx
// ✗ Wrong
<div style={{ color: '#7C3AED' }}>
<div className="text-[#7C3AED]">

// ✓ Correct
<div className="text-framework">
<div style={{ color: 'var(--color-framework)' }}>
```

### 2. Fraunces for display only
`font-family: var(--font-display)` / `font-display` class → h1 headings and hero text at `text-5xl` and above ONLY. Never use it for body copy, nav, buttons, labels, or anything at text-4xl or below.
```tsx
// ✗ Wrong
<h2 className="font-display text-3xl">Section title</h2>

// ✓ Correct — h2 stays in Inter
<h2 className="text-3xl font-semibold">Section title</h2>

// ✓ Correct — hero h1 uses Fraunces
<h1 className="font-display text-6xl font-bold">Framework name</h1>
```

### 3. Inter 400/600 only for body and UI
No other weights for `font-sans`. `font-normal` (400) for body; `font-semibold` (600) for headings, labels, buttons. `font-bold` (700) reserved for inline emphasis (`<strong>`) in body copy only.

### 4. JetBrains Mono for systematic/precision signals
Use `font-mono` or the `.font-mono-label` utility for: deployment stage badges, framework-type overlines, method counts, step numbers, code snippets, and any label that signals "this is a system/classification." Not for decorative text.

### 5. Spacing from named scale only
```tsx
// ✗ Wrong
<div className="p-[30px]">
<div className="mt-[17px]">

// ✓ Correct — use Tailwind's numeric scale (which maps to the token values)
<div className="p-6">       // 24px = --space-6
<div className="mt-8">     // 32px = --space-7 equivalent
// Or use named tokens:
<div className="py-space-9">  // 48px = --space-9
```
Base-8 rule: all spacing values must be divisible by 4, and preferably by 8.

### 6. All animation via Framer Motion + useReducedMotion()
```tsx
// ✗ Wrong
<div className="transition-all duration-500 hover:scale-105">

// ✓ Correct
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { spring } from '@/lib/motion'

const prefersReduced = useReducedMotion()
<motion.div
  whileHover={prefersReduced ? {} : { scale: 1.02 }}
  transition={spring.gentle}
>
```
Exception: `transition-colors` and `transition-opacity` CSS transitions are acceptable for hover color changes only.

### 7. The Bold-Not-Loud Test
Before shipping any visual element, ask: does it earn its prominence through **clarity and structure**, or does it demand attention through decoration and noise?

Bold-not-loud means:
- Color used sparingly as **signal** (section identity, state change), not as decoration
- Large type with generous white space reads as editorial confidence, not shouting
- Motion adds **meaning** (revealing hierarchy, confirming action) not animation for its own sake
- If something feels "too much," remove a layer before adding another

If an element doesn't pass this test, simplify before submitting.

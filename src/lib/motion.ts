import type { Transition } from 'framer-motion'

/*
  Framer Motion spring preset constants.
  Import these instead of defining spring configs per-component.

  Usage:
    import { spring } from '@/lib/motion'
    <motion.div transition={spring.gentle} ... />
*/

export const spring = {
  /** Menus, accordions, toggles — snappy response */
  snappy: {
    type: 'spring',
    stiffness: 500,
    damping: 30,
  } satisfies Transition,

  /** Cards, panels, tooltips — smooth but responsive */
  gentle: {
    type: 'spring',
    stiffness: 200,
    damping: 25,
  } satisfies Transition,

  /** Page entrances, hero reveals — deliberate and weighty */
  reveal: {
    type: 'spring',
    stiffness: 100,
    damping: 20,
  } satisfies Transition,

  /** Scroll-pinned cinematic animation — slow and authoritative */
  cinematic: {
    type: 'spring',
    stiffness: 60,
    damping: 18,
  } satisfies Transition,
} as const

/*
  CSS duration values for non-Framer-Motion transitions (hover color, opacity only).
  Never use these for layout-affecting transitions — use Framer Motion instead.
*/
export const duration = {
  instant:   0,
  fast:      150,
  normal:    250,
  slow:      400,
  reveal:    800,
  cinematic: 1200,
} as const

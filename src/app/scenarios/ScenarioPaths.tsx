import styles from './scenario-paths.module.css'

/*
  Decorative, aria-hidden SVG for the /scenarios placeholder.

  Three curved paths fan out from one origin to three endpoints: a
  scenario is one specific path through a space of possible situations,
  so the motif is three candidate paths with one considered at a time.
  Each path and its endpoint node share a staggered opacity cycle (0s,
  2s, 4s delay on a 6s loop), reading as a relay moving from one path to
  the next rather than all three pulsing together.

  Only opacity is animated, no stroke-width or layout-affecting property:
  animating stroke-width on multiple SVG paths measured a real, repeated
  frame-rate cost elsewhere on this site (see HeroField.tsx). Three paths
  is a small enough element count that this would likely be fine either
  way, but opacity is free on the compositor regardless of count, so
  there's no reason to reach for the more expensive property.

  Reduced motion: all three paths render at a fixed mid-brightness,
  matching ComingSoon's static-hexagon fallback.
*/
export default function ScenarioPaths({ accent }: { accent: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 200 170"
      width="180"
      height="153"
      style={{ display: 'block', margin: '0 auto 2rem' }}
    >
      <circle cx="100" cy="18" r="3" fill={accent} opacity={0.5} />

      <path className={`${styles.path} ${styles.pathA}`} d="M 100 22 C 72 68 50 100 44 150" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path className={`${styles.path} ${styles.pathB}`} d="M 100 22 C 96 68 96 108 100 150" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path className={`${styles.path} ${styles.pathC}`} d="M 100 22 C 128 68 150 100 156 150" stroke={accent} strokeWidth="1.5" strokeLinecap="round" fill="none" />

      <circle className={`${styles.node} ${styles.pathA}`} cx="44" cy="150" r="4" fill={accent} />
      <circle className={`${styles.node} ${styles.pathB}`} cx="100" cy="150" r="4" fill={accent} />
      <circle className={`${styles.node} ${styles.pathC}`} cx="156" cy="150" r="4" fill={accent} />
    </svg>
  )
}

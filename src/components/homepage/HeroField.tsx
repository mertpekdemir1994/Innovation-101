import styles from './hero-field.module.css'

const SW = '1.5'
const STROKE = 'white'

export default function HeroField() {
  return (
    <div aria-hidden="true" className={styles.field}>

      {/* Motif A: Causal Loop (top-left) */}
      <svg
        className={`${styles.motif} ${styles.driftA}`}
        style={{ left: '6%', top: '14%' }}
        width="90" height="90" viewBox="0 0 90 90" fill="none"
      >
        {/* Near-complete circle, ~300° arc, gap at top-right */}
        <circle
          cx="45" cy="45" r="30"
          stroke={STROKE} strokeWidth={SW}
          strokeDasharray="157 32"
          strokeLinecap="round"
        />
        {/* Arrowhead at ~3-o'clock end of arc */}
        <path d="M 74,42 L 76,48 M 76,48 L 70,47"
          stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="45" cy="45" r="2.5" fill={STROKE} />
      </svg>

      {/* Motif B: Branching Fork (top-right) */}
      <svg
        className={`${styles.motif} ${styles.driftB}`}
        style={{ right: '9%', top: '18%' }}
        width="75" height="80" viewBox="0 0 70 75" fill="none"
      >
        <path
          d="M 35,72 L 35,36 L 10,6 M 35,36 L 60,6"
          stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round"
        />
        <circle cx="10" cy="6" r="3" fill={STROKE} />
        <circle cx="60" cy="6" r="3" fill={STROKE} />
      </svg>

      {/* Motif C: Open Diamond (center-left) */}
      <svg
        className={`${styles.motif} ${styles.driftC}`}
        style={{ left: '2%', top: '52%' }}
        width="85" height="85" viewBox="0 0 80 80" fill="none"
      >
        {/* Four-sided open diamond: gap between last point and start */}
        <path
          d="M 40,8 L 72,40 L 40,72 L 8,40"
          stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round"
        />
      </svg>

      {/* Motif D: Frame Sequence (bottom-right) */}
      <svg
        className={`${styles.motif} ${styles.driftD}`}
        style={{ right: '6%', bottom: '20%' }}
        width="110" height="46" viewBox="0 0 108 44" fill="none"
      >
        <rect x="2" y="4" width="28" height="36" rx="2"
          stroke={STROKE} strokeWidth={SW} />
        <line x1="30" y1="22" x2="40" y2="22" stroke={STROKE} strokeWidth={SW} />
        <path d="M 37,18 L 40,22 L 37,26"
          stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
        <rect x="40" y="4" width="28" height="36" rx="2"
          stroke={STROKE} strokeWidth={SW} />
        <line x1="68" y1="22" x2="78" y2="22" stroke={STROKE} strokeWidth={SW} />
        <path d="M 75,18 L 78,22 L 75,26"
          stroke={STROKE} strokeWidth={SW} strokeLinecap="round" strokeLinejoin="round" />
        <rect x="78" y="4" width="28" height="36" rx="2"
          stroke={STROKE} strokeWidth={SW} />
      </svg>

      {/* Motif E: Nine-block Grid (bottom-center) */}
      <svg
        className={`${styles.motif} ${styles.driftE}`}
        style={{ left: '44%', bottom: '16%' }}
        width="72" height="72" viewBox="0 0 68 68" fill="none"
      >
        <line x1="4" y1="4"  x2="64" y2="4"  stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
        <line x1="4" y1="24" x2="64" y2="24" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
        <line x1="4" y1="44" x2="64" y2="44" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
        <line x1="4" y1="64" x2="64" y2="64" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
        <line x1="4"  y1="4" x2="4"  y2="64" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
        <line x1="24" y1="4" x2="24" y2="64" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
        <line x1="44" y1="4" x2="44" y2="64" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
        <line x1="64" y1="4" x2="64" y2="64" stroke={STROKE} strokeWidth={SW} strokeLinecap="round" />
      </svg>

    </div>
  )
}

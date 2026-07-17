import Link from 'next/link'
import styles from './frameworks-grid.module.css'

interface FrameworkItem {
  slug: string
  name: string
  color: string
  essence: string
  shape: React.ReactNode
}

const FRAMEWORKS: FrameworkItem[] = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    color: 'var(--fw-double-diamond)',
    essence: 'Diverge to explore, converge to decide. Twice.',
    shape: (
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" aria-hidden="true">
        <path d="M 12,1 L 23,12 L 12,23 L 1,12 Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M 36,1 L 47,12 L 36,23 L 25,12 Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    color: 'var(--fw-design-thinking)',
    essence: 'Start with the human, not the solution.',
    shape: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
        <circle cx="20" cy="20" r="16"
          stroke="currentColor" strokeWidth="1.5"
          strokeDasharray="68 12" strokeLinecap="round" />
        <circle cx="20" cy="15" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M 11,33 Q 20,27 29,33"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    color: 'var(--fw-lean-startup)',
    essence: 'Build the smallest thing that can teach you something.',
    shape: (
      <svg width="52" height="32" viewBox="0 0 52 32" fill="none" aria-hidden="true">
        <path d="M 6,16 A 18,12 0 1,1 46,16"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M 42,8 L 46,16 L 38,15"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    color: 'var(--fw-design-sprint)',
    essence: 'Five days from question to tested prototype.',
    shape: (
      <svg width="60" height="20" viewBox="0 0 60 20" fill="none" aria-hidden="true">
        {[0, 1, 2, 3, 4].map(i => (
          <g key={i}>
            <circle cx={i * 13 + 6} cy="10" r="5" stroke="currentColor" strokeWidth="1.5" />
            {i < 4 && (
              <line
                x1={i * 13 + 11} y1="10" x2={i * 13 + 18} y2="10"
                stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2"
              />
            )}
          </g>
        ))}
      </svg>
    ),
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    color: 'var(--fw-agile)',
    essence: 'Ship in increments; let evidence shape what comes next.',
    shape: (
      <svg width="56" height="36" viewBox="0 0 56 36" fill="none" aria-hidden="true">
        <path d="M 2,34 L 2,26 L 14,26 L 14,18 L 26,18 L 26,10 L 38,10 L 38,4 L 54,4"
          stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    slug: 'fde',
    name: 'Forward Deployed Engineering',
    color: 'var(--fw-fde)',
    essence: 'Build alongside the user, in their actual context.',
    shape: (
      <svg width="36" height="44" viewBox="0 0 36 44" fill="none" aria-hidden="true">
        <path d="M 18,3 A 13,13 0 0,1 31,16 C 31,26 18,42 18,42 C 18,42 5,26 5,16 A 13,13 0 0,1 18,3 Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="18" cy="16" r="5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
]

export default function FrameworksGrid() {
  return (
    <>
      <div className={styles.grid}>
        {FRAMEWORKS.map((fw, i) => (
          <Link
            key={fw.slug}
            href={`/framework/${fw.slug}`}
            className={styles.card}
            style={{ '--fw-color': fw.color } as React.CSSProperties}
            aria-label={`${fw.name} — ${fw.essence}`}
          >
            <span className={styles.cardNumber}>{String(i + 1).padStart(2, '0')}</span>
            <span className={styles.cardShape}>{fw.shape}</span>
            <span className={styles.cardName}>{fw.name}</span>
            <span className={styles.cardEssence}>{fw.essence}</span>
          </Link>
        ))}
      </div>

      <Link href="/frameworks" className={styles.cta}>
        Explore all frameworks <span aria-hidden>→</span>
      </Link>
    </>
  )
}

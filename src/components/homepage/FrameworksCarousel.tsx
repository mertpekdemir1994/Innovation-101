'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

// ─── Framework data ────────────────────────────────────────────────────────────

const FRAMEWORKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    desc: 'Separate the work of finding the right problem from the work of finding the right solution.',
    color: '#7C3AED',
    rgb: '124,58,237',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    desc: 'Replace elaborate planning with validated learning through Build-Measure-Learn loops.',
    color: '#1E40AF',
    rgb: '30,64,175',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    desc: 'Understand people deeply before generating or testing any solution.',
    color: '#0d9488',
    rgb: '13,148,136',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    desc: 'Answer critical business questions through rapid prototyping in five days.',
    color: '#b45309',
    rgb: '180,83,9',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    desc: 'Run the full innovation cycle in short, steerable sprints rather than long-horizon plans.',
    color: '#6b4d7a',
    rgb: '107,77,122',
  },
  {
    slug: 'fde',
    name: 'Forward Deployed Engineering',
    desc: 'Embed engineers directly with customers to build real solutions in the field.',
    color: '#b91c1c',
    rgb: '185,28,28',
  },
] as const

type Framework = (typeof FRAMEWORKS)[number]

// ─── Mini SVG icons: one per framework, each referencing its page visual ──────

function DoubleDiamondIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 100 50" fill="none" aria-hidden="true" style={{ width: '100%', maxWidth: 120 }}>
      {/* Left diamond: Discover phase */}
      <path d="M 25,2 L 48,25 L 25,48 L 2,25 Z" stroke={color} strokeWidth="1.5" />
      {/* Right diamond: Define/Develop/Deliver phase */}
      <path d="M 75,2 L 98,25 L 75,48 L 52,25 Z" stroke={color} strokeWidth="1.5" />
      {/* Center convergence node */}
      <circle cx="50" cy="25" r="3" fill={color} />
    </svg>
  )
}

function BMLLoopIcon({ color }: { color: string }) {
  // Triangle: Build (top), Measure (bottom-right), Learn (bottom-left)
  const B = { x: 50, y: 8 }
  const M = { x: 88, y: 74 }
  const L = { x: 12, y: 74 }
  return (
    <svg viewBox="0 0 100 86" fill="none" aria-hidden="true" style={{ width: '100%', maxWidth: 100 }}>
      {/* Outer ring suggesting circulation */}
      <circle cx="50" cy="46" r="40" stroke={color} strokeWidth="1" strokeDasharray="5 4" opacity="0.25" />
      {/* Triangle edges */}
      <path d={`M ${B.x},${B.y} L ${M.x},${M.y} L ${L.x},${L.y} Z`} stroke={color} strokeWidth="1" opacity="0.25" />
      {/* Nodes */}
      {[B, M, L].map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r="10" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.3" />
      ))}
      {/* Labels */}
      {[
        { ...B, t: 'B' },
        { ...M, t: 'M' },
        { ...L, t: 'L' },
      ].map((n) => (
        <text key={n.t} x={n.x} y={n.y} textAnchor="middle" dominantBaseline="central"
          fill={color} fontSize="9" fontFamily="ui-monospace,monospace" fontWeight="600">
          {n.t}
        </text>
      ))}
    </svg>
  )
}

function FigureEightIcon({ color }: { color: string }) {
  // Lemniscate approximated as two overlapping ellipses: mirrors DTStagesHero
  return (
    <svg viewBox="0 0 120 60" fill="none" aria-hidden="true" style={{ width: '100%', maxWidth: 130 }}>
      <ellipse cx="36" cy="30" rx="32" ry="22" stroke={color} strokeWidth="1.5" />
      <ellipse cx="84" cy="30" rx="32" ry="22" stroke={color} strokeWidth="1.5" />
      {/* Crossing / Test node */}
      <circle cx="60" cy="30" r="3" fill={color} />
    </svg>
  )
}

function SprintDaysIcon({ color }: { color: string }) {
  const days = ['M', 'T', 'W', 'T', 'F']
  const bW = 18, bH = 28, gap = 7
  const totalW = days.length * bW + (days.length - 1) * gap
  const ox = (100 - totalW) / 2
  const midY = 42
  const topY = midY - bH / 2

  return (
    <svg viewBox="0 0 100 70" fill="none" aria-hidden="true" style={{ width: '100%', maxWidth: 120 }}>
      {/* Return arc: mirrors DSDaysHero */}
      <path
        d={`M ${ox + totalW} ${topY} C ${ox + totalW} ${topY - 26}, ${ox} ${topY - 26}, ${ox} ${topY}`}
        stroke={color} strokeWidth="1" strokeDasharray="4 3" opacity="0.5"
      />
      {/* Day boxes with connector lines */}
      {days.map((d, i) => {
        const x = ox + i * (bW + gap)
        return (
          <g key={i}>
            <rect x={x} y={topY} width={bW} height={bH} rx="2"
              stroke={color} strokeWidth="1.2" fill={color} fillOpacity="0.08" />
            <text x={x + bW / 2} y={midY} textAnchor="middle" dominantBaseline="central"
              fill={color} fontSize="8" fontFamily="ui-monospace,monospace">
              {d}
            </text>
            {i < days.length - 1 && (
              <line x1={x + bW} y1={midY} x2={x + bW + gap} y2={midY}
                stroke={color} strokeWidth="1" opacity="0.4" />
            )}
          </g>
        )
      })}
    </svg>
  )
}

function AgileCycleIcon({ color }: { color: string }) {
  const cx = 50, cy = 46, r = 34
  const n = 5
  function pt(i: number) {
    const deg = (i * 360 / n) - 90
    const rad = deg * Math.PI / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }
  const pts = Array.from({ length: n }, (_, i) => pt(i))

  return (
    <svg viewBox="0 0 100 90" fill="none" aria-hidden="true" style={{ width: '100%', maxWidth: 110 }}>
      {/* Pentagon: mirrors AIHero's polygon */}
      <polygon
        points={pts.map(p => `${p.x},${p.y}`).join(' ')}
        stroke={color} strokeWidth="1" fill={color} fillOpacity="0.06"
      />
      {/* Outer dashed ring */}
      <circle cx={cx} cy={cy} r={r + 10} stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.2" />
      {/* Five stage nodes */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="7" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1.2" />
      ))}
      {/* Center */}
      <circle cx={cx} cy={cy} r="3" fill={color} opacity="0.4" />
    </svg>
  )
}

function FDEConnectionIcon({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 110 56" fill="none" aria-hidden="true" style={{ width: '100%', maxWidth: 130 }}>
      {/* Customer node */}
      <rect x="2" y="13" width="38" height="30" rx="3"
        stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.10" />
      <text x="21" y="28" textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize="7" fontFamily="ui-monospace,monospace">CUST.</text>
      {/* FDE node */}
      <rect x="70" y="13" width="38" height="30" rx="3"
        stroke={color} strokeWidth="1.3" fill={color} fillOpacity="0.10" />
      <text x="89" y="28" textAnchor="middle" dominantBaseline="central"
        fill={color} fontSize="7" fontFamily="ui-monospace,monospace">FDE</text>
      {/* Bold direct arrow: the signature of FDE */}
      <path d="M 42 27 L 68 27" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M 62 22 L 69 27 L 62 32" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Return dashed arrow */}
      <path d="M 68 30 L 42 30" stroke={color} strokeWidth="1" strokeDasharray="3 3" opacity="0.45" strokeLinecap="round" />
    </svg>
  )
}

const ICONS: Record<string, (color: string) => React.ReactNode> = {
  'double-diamond':   (c) => <DoubleDiamondIcon color={c} />,
  'lean-startup':     (c) => <BMLLoopIcon color={c} />,
  'design-thinking':  (c) => <FigureEightIcon color={c} />,
  'design-sprint':    (c) => <SprintDaysIcon color={c} />,
  'agile-innovation': (c) => <AgileCycleIcon color={c} />,
  'fde':              (c) => <FDEConnectionIcon color={c} />,
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

export default function FrameworksCarousel() {
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState(1)
  const prefersReduced = useReducedMotion()

  const go = useCallback((index: number, currentActive: number) => {
    setDir(index > currentActive ? 1 : -1)
    setActive(index)
  }, [])

  const next = useCallback(() => {
    setActive((a) => {
      setDir(1)
      return (a + 1) % FRAMEWORKS.length
    })
  }, [])

  const prev = useCallback(() => {
    setActive((a) => {
      setDir(-1)
      return (a - 1 + FRAMEWORKS.length) % FRAMEWORKS.length
    })
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }, [next, prev])

  const fw: Framework = FRAMEWORKS[active]

  // onKeyDown here catches Left/Right bubbled up from the focusable prev/next/dot
  // buttons inside; the region itself is never a keyboard-interaction target on its own.
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div role="region" aria-label="Frameworks carousel" onKeyDown={handleKeyDown}>

      {/* ── Slide ─────────────────────────────────────────────────────────── */}
      <div style={{ overflow: 'hidden', borderRadius: '8px' }}>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={active}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: prefersReduced ? 0 : d * 48, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:  (d: number) => ({ x: prefersReduced ? 0 : d * -48, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: prefersReduced ? 0 : 0.26, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link
              href={`/framework/${fw.slug}`}
              style={{ display: 'block', textDecoration: 'none' }}
            >
              <div
                className="grid grid-cols-1 md:grid-cols-[140px_1fr] gap-8 items-center"
                style={{
                  background: 'var(--color-background)',
                  border: `1.5px solid ${fw.color}`,
                  borderRadius: '8px',
                  padding: '2rem',
                }}
              >
                {/* Icon */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '1rem',
                  background: `rgba(${fw.rgb},0.07)`,
                  borderRadius: '6px',
                  minHeight: '90px',
                }}>
                  {ICONS[fw.slug](fw.color)}
                </div>

                {/* Text */}
                <div>
                  <p style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-2xs)',
                    letterSpacing: '0.10em',
                    textTransform: 'uppercase',
                    color: fw.color,
                    marginBottom: '0.5rem',
                  }}>
                    Framework · {active + 1} of {FRAMEWORKS.length}
                  </p>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.625rem)',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    color: 'var(--color-neutral-900)',
                    marginBottom: '0.625rem',
                  }}>
                    {fw.name}
                  </h3>
                  <p style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: 1.65,
                    color: 'var(--color-neutral-600)',
                    marginBottom: '1.25rem',
                    maxWidth: '52ch',
                  }}>
                    {fw.desc}
                  </p>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 600,
                    color: fw.color,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.375rem',
                  }}>
                    Explore framework <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '1.125rem',
      }}>

        <button
          onClick={prev}
          aria-label="Previous framework"
          style={{
            width: '2.25rem',
            height: '2.25rem',
            border: '1px solid var(--color-neutral-200)',
            borderRadius: '4px',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-neutral-600)',
            fontSize: 'var(--text-base)',
            flexShrink: 0,
            transition: 'border-color 150ms ease, color 150ms ease',
          }}
        >
          ←
        </button>

        {/* Dot indicators */}
        <div
          role="tablist"
          aria-label="Select framework"
          style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          {FRAMEWORKS.map((f, i) => (
            <button
              key={f.slug}
              role="tab"
              aria-selected={i === active}
              aria-label={f.name}
              onClick={() => go(i, active)}
              style={{
                width: i === active ? '1.5rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '2px',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: i === active ? fw.color : 'var(--color-neutral-200)',
                transition: 'width 220ms ease, background 220ms ease',
              }}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Next framework"
          style={{
            width: '2.25rem',
            height: '2.25rem',
            border: '1px solid var(--color-neutral-200)',
            borderRadius: '4px',
            background: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-neutral-600)',
            fontSize: 'var(--text-base)',
            flexShrink: 0,
            transition: 'border-color 150ms ease, color 150ms ease',
          }}
        >
          →
        </button>
      </div>
    </div>
  )
}

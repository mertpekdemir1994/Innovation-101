'use client'

import { useState, useCallback, useEffect } from 'react'
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

// ─── Responsive visible-card count ─────────────────────────────────────────────
// 3 cards at lg (≥1024px), 2 at sm-md (≥640px), 1 below that.

function computeVisibleCount(): number {
  const w = window.innerWidth
  if (w < 640) return 1
  if (w < 1024) return 2
  return 3
}

// Initial state always matches the server-rendered value (3) so hydration never
// mismatches; the real width is only read after mount, inside the effect.
function useVisibleCount(): number {
  const [count, setCount] = useState(3)
  useEffect(() => {
    const onResize = () => setCount(computeVisibleCount())
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return count
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m
}

// ─── Card ───────────────────────────────────────────────────────────────────

function CarouselCard({ fw }: { fw: Framework }) {
  const prefersReduced = useReducedMotion()

  return (
    <Link
      href={`/framework/${fw.slug}`}
      style={{ textDecoration: 'none', display: 'flex', flex: '1 1 0', minWidth: 0 }}
    >
      <motion.div
        className="flex flex-col flex-1 bg-white rounded-xl overflow-hidden"
        style={{
          border: '1px solid var(--color-neutral-200)',
          boxShadow: 'var(--shadow-subtle)',
        }}
        whileHover={prefersReduced ? {} : {
          y: -3,
          boxShadow: 'var(--shadow-card)',
          borderColor: fw.color,
        }}
        transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Identity accent bar */}
        <div style={{ height: 3, background: fw.color, flexShrink: 0 }} />

        <div className="flex flex-col flex-1 p-5">
          {/* Icon zone */}
          <div
            className="flex items-center justify-center shrink-0 mb-4"
            style={{ height: 72, background: `rgba(${fw.rgb},0.07)`, borderRadius: 6 }}
            aria-hidden="true"
          >
            <div style={{ width: '68%', maxWidth: 88 }}>
              {ICONS[fw.slug](fw.color)}
            </div>
          </div>

          {/* Name */}
          <h3
            className="font-display font-semibold shrink-0 mb-1.5"
            style={{ fontSize: 'var(--text-lg)', lineHeight: 1.25, color: 'var(--color-neutral-900)' }}
          >
            {fw.name}
          </h3>

          {/* Description, clamped so cards in a row stay level */}
          <p
            className="line-clamp-2 shrink-0 mb-4"
            style={{ fontSize: 'var(--text-sm)', lineHeight: 1.55, color: 'var(--color-neutral-600)' }}
          >
            {fw.desc}
          </p>

          {/* Elastic spacer: pins CTA to the bottom regardless of desc length */}
          <div className="flex-1" style={{ minHeight: 'var(--space-2)' }} />

          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            color: fw.color,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.375rem',
          }}>
            Explore <span aria-hidden="true">→</span>
          </span>
        </div>
      </motion.div>
    </Link>
  )
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

export default function FrameworksCarousel() {
  const total = FRAMEWORKS.length
  const visibleCount = useVisibleCount()
  const [start, setStart] = useState(0)
  const [dir, setDir] = useState(1)
  const prefersReduced = useReducedMotion()

  const activeStart = mod(start, total)

  const go = useCallback((index: number) => {
    const forwardDist = mod(index - activeStart, total)
    setDir(forwardDist <= total / 2 ? 1 : -1)
    setStart(index)
  }, [activeStart, total])

  const next = useCallback(() => {
    setDir(1)
    setStart((s) => s + 1)
  }, [])

  const prev = useCallback(() => {
    setDir(-1)
    setStart((s) => s - 1)
  }, [])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }, [next, prev])

  const visibleItems = Array.from({ length: visibleCount }, (_, i) => FRAMEWORKS[mod(start + i, total)])
  const visibleIndices = new Set(Array.from({ length: visibleCount }, (_, i) => mod(start + i, total)))

  // onKeyDown here catches Left/Right bubbled up from the focusable prev/next/dot
  // buttons inside; the region itself is never a keyboard-interaction target on its own.
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div role="region" aria-label="Frameworks carousel" onKeyDown={handleKeyDown}>

      {/* ── Slides ────────────────────────────────────────────────────────── */}
      <div style={{ overflow: 'hidden' }}>
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={`${activeStart}-${visibleCount}`}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: prefersReduced ? 0 : `${d * 12}%`, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit:  (d: number) => ({ x: prefersReduced ? 0 : `${d * -12}%`, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: prefersReduced ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', gap: '1.25rem', alignItems: 'stretch' }}
          >
            {visibleItems.map((fw, i) => (
              <CarouselCard key={`${fw.slug}-${i}`} fw={fw} />
            ))}
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

        {/* Dot indicators: all currently-visible frameworks are shown active */}
        <div
          role="tablist"
          aria-label="Select framework"
          style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          {FRAMEWORKS.map((f, i) => {
            const isVisible = visibleIndices.has(i)
            return (
              <button
                key={f.slug}
                role="tab"
                aria-selected={isVisible}
                aria-label={f.name}
                onClick={() => go(i)}
                style={{
                  width: isVisible ? '1.5rem' : '0.5rem',
                  height: '0.5rem',
                  borderRadius: '2px',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  background: isVisible ? f.color : 'var(--color-neutral-200)',
                  transition: 'width 220ms ease, background 220ms ease',
                }}
              />
            )
          })}
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

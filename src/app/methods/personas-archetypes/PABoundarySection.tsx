'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'

type State = 'personas' | 'avatars' | 'segments'

const STATES: { id: State; label: string; short: string }[] = [
  { id: 'personas', label: 'Personas & Archetypes', short: 'Personas' },
  { id: 'avatars',  label: 'Avatars',               short: 'Avatars'  },
  { id: 'segments', label: 'Market Segments',        short: 'Segments' },
]

const DETAIL: Record<State, { heading: string; descriptor: string; body: string; link?: string }> = {
  personas: {
    heading:    'The RANGE',
    descriptor: 'Multiple research-grounded portraits',
    body:       'A SET of portraits covering the meaningful diversity of real users — the confident and the anxious, the expert and the first-timer. Plural by design. Built from primary research. The job is to hold the range of real users in the room so you design for people who are not you.',
  },
  avatars: {
    heading:    'The BEACHHEAD',
    descriptor: 'Single specialized target market',
    body:       'ONE specific market — the narrowest viable group you commit to dominating before expanding to anyone else. Not a customer portrait: an Avatar is "boutique fitness studio owners in urban markets," not a named fictional person. It is a strategic bet on a beachhead. You use it to concentrate go-to-market resources until you own that ring, then expand outward. An Avatar and a persona answer different questions at different scales — you can have three personas within your Avatar market.',
    link: '/methods/avatars',
  },
  segments: {
    heading:    'The BUCKETS',
    descriptor: 'Demographic or statistical groupings',
    body:       'Quantitative groupings by age, income, geography, or behavior — used for market sizing and slicing, not for understanding motivation. A segment tells you a group exists and roughly how large it is; a persona tells you what someone inside it wants and why. Building personas from segments alone (demographics plus a stock photo) is the classic error this distinction prevents.',
  },
}

// ── Mini SVG illustrations for each state ────────────────────────────────────

function dome(cx: number, cy: number, w: number, h: number) {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

function PersonasSVG() {
  return (
    <svg viewBox="0 0 400 180" width="100%" style={{ overflow: 'visible' }} aria-hidden="true">
      <defs>
        <filter id="pa-bnd-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* 3 small cards in a row */}
      {[70, 200, 330].map((cx, i) => {
        const labels = ['OPTIMIZER', 'AVOIDER', 'NEWCOMER']
        return (
          <g key={cx}>
            <ellipse cx={cx} cy={90} rx={42} ry={68} fill={`${NAVY}0.10)`} />
            <rect x={cx - 42} y={12} width={84} height={140} rx={5}
              fill={`${NAVY}0.12)`} stroke="rgba(255,255,255,0.25)" strokeWidth={1.5}
              filter="url(#pa-bnd-glow)"
            />
            <circle cx={cx} cy={42} r={10}
              fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.58)" strokeWidth={1.5}
            />
            <path d={dome(cx, 55, 14, 17)}
              fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.58)" strokeWidth={1.5}
            />
            <line x1={cx - 32} y1={82} x2={cx + 32} y2={82} stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
            <text x={cx} y={96} textAnchor="middle" fontSize="6"
              fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill="rgba(255,255,255,0.55)" style={{ userSelect: 'none' }}
            >{labels[i]}</text>
          </g>
        )
      })}
      <text x={200} y={172} textAnchor="middle" fontSize="8"
        fontFamily="var(--font-mono)" letterSpacing="0.12em"
        fill="rgba(255,255,255,0.35)" style={{ userSelect: 'none' }}
      >THE RANGE — THREE PORTRAITS</text>
    </svg>
  )
}

const PLUM_B = 'rgba(107,74,119,'

function AvatarsSVG() {
  const radii = [72, 52, 33, 16]
  return (
    <svg viewBox="0 0 400 180" width="100%" style={{ overflow: 'visible' }} aria-hidden="true">
      <defs>
        <filter id="pa-bnd-av-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {/* Concentric bullseye rings — outer → inner = beachhead */}
      {radii.map((r, i) => (
        <circle key={i} cx={200} cy={88} r={r}
          fill={i === 3 ? `${PLUM_B}0.70)` : i === 2 ? `${PLUM_B}0.12)` : i === 1 ? `${PLUM_B}0.08)` : `${PLUM_B}0.05)`}
          stroke={i === 3 ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.20)'}
          strokeWidth={i === 3 ? 1.5 : 1}
          filter={i === 3 ? 'url(#pa-bnd-av-glow)' : undefined}
        />
      ))}
      <text x={200} y={91} textAnchor="middle" dominantBaseline="middle"
        fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.08em"
        fill="rgba(255,255,255,0.92)" style={{ userSelect: 'none' }}
      >AVATAR</text>
      <text x={200} y={172} textAnchor="middle" fontSize="8"
        fontFamily="var(--font-mono)" letterSpacing="0.12em"
        fill="rgba(255,255,255,0.35)" style={{ userSelect: 'none' }}
      >THE BEACHHEAD — ONE MARKET</text>
    </svg>
  )
}

function SegmentsSVG() {
  const bars = [
    { x: 52,  h: 90, label: 'AGE 18–24' },
    { x: 126, h: 130, label: 'AGE 25–34' },
    { x: 200, h: 108, label: 'AGE 35–44' },
    { x: 274, h: 72,  label: 'AGE 45–54' },
    { x: 348, h: 44,  label: 'AGE 55+' },
  ]
  const baseY = 155

  return (
    <svg viewBox="0 0 400 180" width="100%" style={{ overflow: 'visible' }} aria-hidden="true">
      {/* Baseline */}
      <line x1={30} y1={baseY} x2={370} y2={baseY} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
      {bars.map(({ x, h, label }) => (
        <g key={x}>
          <rect
            x={x - 26} y={baseY - h}
            width={52} height={h}
            rx={3}
            fill={`${NAVY}0.18)`}
            stroke="rgba(255,255,255,0.22)" strokeWidth={1}
          />
          <text x={x} y={baseY + 14} textAnchor="middle" fontSize="5.5"
            fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill="rgba(255,255,255,0.35)" style={{ userSelect: 'none' }}
          >{label}</text>
        </g>
      ))}
      <text x={200} y={172} textAnchor="middle" fontSize="8"
        fontFamily="var(--font-mono)" letterSpacing="0.12em"
        fill="rgba(255,255,255,0.35)" style={{ userSelect: 'none' }}
      >THE BUCKETS — DEMOGRAPHIC GROUPS</text>
    </svg>
  )
}

const SVG_BY_STATE: Record<State, React.ReactNode> = {
  personas: <PersonasSVG />,
  avatars:  <AvatarsSVG />,
  segments: <SegmentsSVG />,
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function PABoundarySection() {
  const [active, setActive] = useState<State>('personas')
  const prefersReduced = useReducedMotion()

  const detail = DETAIL[active]

  return (
    <div>
      {/* State switcher */}
      <div
        className="flex flex-wrap gap-2 mb-10"
        role="tablist"
        aria-label="Compare personas, avatars, and segments"
      >
        {STATES.map(({ id, label, short }) => {
          const isActive = active === id
          return (
            <button
              key={id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(id)}
              className="px-4 py-2 rounded-full font-semibold transition-colors"
              style={{
                fontSize:   'var(--text-sm)',
                background: isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.04)',
                color:      isActive ? '#FAFAFA' : 'rgba(255,255,255,0.42)',
                border:     `1px solid ${isActive ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.08)'}`,
              }}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{short}</span>
            </button>
          )
        })}
      </div>

      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        {/* ── SVG panel ── */}
        <div className="w-full md:w-[54%] shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              role="tabpanel"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-xl p-6"
              style={{ background: `${NAVY}0.08)`, border: '1px solid rgba(255,255,255,0.10)' }}
            >
              {SVG_BY_STATE[active]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Detail panel ── */}
        <div className="w-full md:flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.35)' }}>
                {STATES.find((s) => s.id === active)?.label}
              </p>
              <h3 className="font-display font-semibold mb-2" style={{ fontSize: 'var(--text-2xl)', color: '#FAFAFA', lineHeight: 1.2 }}>
                {detail.heading}
              </h3>
              <p className="font-mono mb-5" style={{ fontSize: 'var(--text-xs)', color: `${NAVY}0.65)`, letterSpacing: '0.06em' }}>
                {detail.descriptor}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.62)' }}>
                {detail.body}
              </p>

              {detail.link && (
                <Link
                  href={detail.link}
                  className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg font-semibold transition-colors"
                  style={{
                    fontSize:   'var(--text-sm)',
                    background: 'rgba(255,255,255,0.08)',
                    color:      'rgba(255,255,255,0.72)',
                    border:     '1px solid rgba(255,255,255,0.14)',
                  }}
                >
                  <span>See the Avatar method</span>
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* One-line summary */}
      <div
        className="mt-10 rounded-lg px-5 py-4"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
      >
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
          <strong style={{ color: 'rgba(255,255,255,0.75)', fontStyle: 'normal' }}>The rule:</strong>{' '}
          use segments to size and slice a market, personas to understand the range of real people in it, and an avatar when you commit to a specific beachhead market before expanding. They answer different questions at different scales. Confusing them is how persona work goes wrong.
        </p>
      </div>
    </div>
  )
}

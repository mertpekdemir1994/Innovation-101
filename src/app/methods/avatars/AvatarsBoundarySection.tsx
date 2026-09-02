'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const NAVY = 'rgba(31,58,95,'
const NAVY_TEXT = 'rgba(141,155,173,'  // brightened text-safe variant of NAVY

type State = 'avatar' | 'personas' | 'segments'

const ITEMS: { id: State; label: string; summary: string }[] = [
  {
    id:      'avatar',
    label:   'Avatar',
    summary: 'A single specialized target market: the beachhead group you commit to dominating first. One market, not one person.',
  },
  {
    id:      'personas',
    label:   'Personas & Archetypes',
    summary: 'Behavioral archetypes of the humans inside your market. You can have three personas within your Avatar market.',
  },
  {
    id:      'segments',
    label:   'Segments',
    summary: 'Quantitative filters: firmographic or demographic groupings derived from data. Segments size markets; they don\'t describe behavior.',
  },
]

const DETAIL: Record<State, { heading: string; description: string; keyDiff: string; link?: string }> = {
  avatar: {
    heading:     'Avatar = one market',
    description: 'The Avatar answers: which specific group of people will we organize our entire company around first? It is a strategic beachhead commitment, not a customer profile. Your Avatar is a market level ("boutique fitness studio owners with 2–4 instructors"), not a person named Alex who likes yoga. The commitment is to a type of business or customer cluster, before you expand to other clusters.',
    keyDiff:     'The Avatar narrows which market you serve. Personas describe who is inside that market. You need both: Avatar first, personas second.',
  },
  personas: {
    heading:     'Personas = behavioral types inside the market',
    description: 'A persona set describes the range of humans you will actually encounter within your Avatar market. The Optimizer, the Avoider, the Newcomer: these are behavioral archetypes grounded in research, not demographic filters. A single Avatar market (boutique fitness studios) can contain multiple user personas (the owner, the front-desk manager, the instructor). Personas humanize the Avatar.',
    keyDiff:     'Personas are tools for product and design. The Avatar is a strategy tool. Both should be built from real research: personas from interviews, the Avatar from a deliberate market commitment.',
    link:        '/methods/personas-archetypes',
  },
  segments: {
    heading:     'Segments = quantitative market slices',
    description: 'Segmentation is the practice of dividing a large market into groups by measurable characteristics: company size, geography, industry code, age bracket, revenue band. Segments are useful for sizing markets and planning go-to-market coverage. They do not capture behavior, urgency, or fit. The Avatar discipline often uses segment data to find the niche, then commits to a specific group within it.',
    keyDiff:     'Segments tell you the size of a group. The Avatar tells you which group you are betting on. Personas tell you how the people inside that group actually behave.',
  },
}

// ── Mini SVG visuals ─────────────────────────────────────────────────────────

function AvatarMiniSVG({ active }: { active: boolean }) {
  const fills = [
    `${PLUM}${active ? '0.72)' : '0.30)'}`,
    `${PLUM}${active ? '0.14)' : '0.07)'}`,
    `${PLUM}${active ? '0.08)' : '0.04)'}`,
    `${PLUM}${active ? '0.05)' : '0.02)'}`,
  ]
  return (
    <svg viewBox="0 0 120 120" width="100%" style={{ maxWidth: 160 }}>
      {[50, 37, 24, 11].map((r, i) => (
        <motion.circle
          key={i} cx={60} cy={60} r={r}
          fill={fills[i]}
          stroke={i === 0 ? (active ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.28)') : 'rgba(255,255,255,0.16)'}
          strokeWidth={i === 0 ? 1 : 0.8}
          animate={{ fill: fills[i] }}
          transition={{ duration: 0.3 }}
        />
      ))}
      <text x={60} y={63} textAnchor="middle" dominantBaseline="middle"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.06em"
        fill={active ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.7)'}
        style={{ userSelect: 'none' }}
      >AVATAR</text>
    </svg>
  )
}

function PersonasMiniSVG({ active }: { active: boolean }) {
  const fill   = active ? `${NAVY}0.55)` : `${NAVY}0.25)`
  const stroke = active ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.18)'
  const textF  = active ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.60)'
  const dome = (cx: number) =>
    `M ${cx - 8} 85 A 8 10 0 0 0 ${cx + 8} 85 Z`
  return (
    <svg viewBox="0 0 120 110" width="100%" style={{ maxWidth: 160 }}>
      {[26, 60, 94].map((cx) => (
        <g key={cx}>
          <rect x={cx - 13} y={30} width={26} height={60} rx={3}
            fill={fill} stroke={stroke} strokeWidth={0.8} />
          <circle cx={cx} cy={45} r={7} fill="rgba(255,255,255,0.08)" stroke={active ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.28)'} strokeWidth={1} />
          <path d={dome(cx)} fill="rgba(255,255,255,0.08)" stroke={active ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.28)'} strokeWidth={1} />
        </g>
      ))}
      <text x={60} y={104} textAnchor="middle" dominantBaseline="middle"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.02em"
        fill={textF} style={{ userSelect: 'none' }}
      >BEHAVIORAL TYPES</text>
    </svg>
  )
}

function SegmentsMiniSVG({ active }: { active: boolean }) {
  const bars = [0.85, 0.55, 0.35, 0.20]
  const barFill = active ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.12)'
  const textF   = active ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.55)'
  return (
    <svg viewBox="0 0 120 110" width="100%" style={{ maxWidth: 160 }}>
      {bars.map((w, i) => (
        <g key={i}>
          <rect x={10} y={22 + i * 18} width={100 * w} height={12} rx={2}
            fill={barFill} stroke="rgba(255,255,255,0.14)" strokeWidth={0.6} />
        </g>
      ))}
      <text x={60} y={104} textAnchor="middle" dominantBaseline="middle"
        fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.01em"
        fill={textF} style={{ userSelect: 'none' }}
      >QUANTITATIVE FILTERS</text>
    </svg>
  )
}

export default function AvatarsBoundarySection() {
  const [active, setActive] = useState<State>('avatar')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start">
      {/* ── Left: selector cards ── */}
      <div className="w-full md:w-56 shrink-0 flex flex-col gap-3">
        {ITEMS.map(({ id, label, summary }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className="text-left rounded-xl p-4 transition-colors"
            style={{
              background: active === id ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)',
              border:     `1px solid ${active === id ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.08)'}`,
            }}
            aria-pressed={active === id}
          >
            <p className="font-semibold mb-1.5"
              style={{ fontSize: 'var(--text-sm)', color: active === id ? '#FAFAFA' : 'rgba(255,255,255,0.62)' }}
            >{label}</p>
            <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.55)' }}>
              {summary}
            </p>
          </button>
        ))}
      </div>

      {/* ── Right: detail panel ── */}
      <div className="w-full md:flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.26, ease }}
          >
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Mini SVG */}
              <div className="shrink-0 w-32 sm:w-36">
                {active === 'avatar'   && <AvatarMiniSVG   active />}
                {active === 'personas' && <PersonasMiniSVG active />}
                {active === 'segments' && <SegmentsMiniSVG active />}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-semibold mb-3"
                  style={{ fontSize: 'var(--text-xl)', color: '#FAFAFA' }}
                >{DETAIL[active].heading}</h3>
                <p className="mb-5"
                  style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.62)' }}
                >{DETAIL[active].description}</p>

                {/* Key difference callout */}
                <div className="rounded-lg p-4"
                  style={{ background: `${PLUM}0.08)`, border: `1px solid ${PLUM}0.18)` }}
                >
                  <p className="font-mono uppercase tracking-widest mb-2"
                    style={{ fontSize: 'var(--text-2xs)', color: `${PLUM_TEXT}0.95)` }}
                  >Key distinction</p>
                  <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.65)' }}>
                    {DETAIL[active].keyDiff}
                  </p>
                </div>

                {/* Cross-link to Personas page */}
                {DETAIL[active].link && (
                  <div className="mt-4">
                    <Link
                      href={DETAIL[active].link!}
                      className="inline-flex items-center gap-1.5 font-mono uppercase tracking-widest"
                      style={{ fontSize: 'var(--text-2xs)', color: `${NAVY_TEXT}0.95)` }}
                    >
                      Go to Personas & Archetypes
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

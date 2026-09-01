'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const AMBER = 'rgba(217,119,6,'

const SVG_W = 700
const SVG_H = 340

const COL_X  = [22, 251, 480] as const
const COL_W  = 207
const LEVER_H   = 46
const LEVER_GAP = 8
const FIRST_LEVER_Y = 52

type Col = 0 | 1 | 2

interface LeverSpec {
  id: string
  col: Col
  i: number
  label: string
  sub: string
  overpulled?: boolean
  neglected?: boolean
}

const LEVERS: LeverSpec[] = [
  { id: 'segment',    col: 0, i: 0, label: 'TARGET SEGMENT',  sub: 'who you serve' },
  { id: 'offering',   col: 0, i: 1, label: 'OFFERING',        sub: 'product & service', overpulled: true },
  { id: 'revenue',    col: 0, i: 2, label: 'REVENUE MODEL',   sub: 'how you charge',    neglected: true },
  { id: 'bundling',   col: 0, i: 3, label: 'BUNDLING',        sub: 'how you package' },
  { id: 'valuechain', col: 1, i: 0, label: 'VALUE CHAIN',     sub: 'how you produce' },
  { id: 'cost',       col: 1, i: 1, label: 'COST MODEL',      sub: 'your cost structure', neglected: true },
  { id: 'org',        col: 1, i: 2, label: 'ORGANIZATION',    sub: 'people & resources' },
  { id: 'tech',       col: 1, i: 3, label: 'TECHNOLOGY',      sub: 'platform & infra.' },
  { id: 'channels',   col: 2, i: 0, label: 'CHANNELS',        sub: 'how you reach' },
  { id: 'crm',        col: 2, i: 1, label: 'RELATIONSHIPS',   sub: 'acquire & retain' },
  { id: 'brand',      col: 2, i: 2, label: 'BRAND',           sub: 'what you stand for' },
  { id: 'partners',   col: 2, i: 3, label: 'PARTNERSHIPS',    sub: 'partner network',    neglected: true },
]

const AREAS = [
  { label: 'VALUE PROPOSITION', sub: 'what you offer & to whom' },
  { label: 'OPERATING MODEL',   sub: 'how you create & deliver' },
  { label: 'GO-TO-MARKET',      sub: 'how you reach & keep' },
] as const

function leverY(i: number) {
  return FIRST_LEVER_Y + i * (LEVER_H + LEVER_GAP)
}

export default function TLEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const prefersReduced = useReducedMotion()

  function tr(delay = 0, dur = 0.32) {
    return prefersReduced
      ? ({ duration: 0 } as const)
      : ({ duration: dur, delay, ease: [0.22, 1, 0.36, 1] } as const)
  }

  const COL_BASE_DELAY = [0, 0.22, 0.44] as const

  function show() {
    return prefersReduced ? { opacity: 1 } : inView ? { opacity: 1 } : { opacity: 0 }
  }

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}
      aria-label="Twelve levers of business innovation arranged in three columns: Value Proposition (Target Segment, Offering, Revenue Model, Bundling), Operating Model (Value Chain, Cost Model, Organization, Technology), and Go-to-Market (Channels, Relationships, Brand, Partnerships). Offering is marked as over-pulled; Revenue Model, Cost Model, and Partnerships are marked as high-leverage and under-used."
    >
      <defs>
        <filter id="tl-est-plum-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
          <feFlood floodColor={`${PLUM}0.50)`} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <filter id="tl-est-amber-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
          <feFlood floodColor={`${AMBER}0.45)`} result="color" />
          <feComposite in="color" in2="blur" operator="in" result="glow" />
          <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Area headers */}
      {AREAS.map((area, ai) => {
        const x = COL_X[ai as Col]
        const colDelay = COL_BASE_DELAY[ai as Col]
        return (
          <motion.g key={area.label}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={show()}
            transition={tr(colDelay)}>
            <rect x={x} y={2} width={COL_W} height={46} rx={5}
              fill={`${PLUM}0.14)`} stroke={`${PLUM}0.32)`} strokeWidth={0.8} />
            <text x={x + COL_W / 2} y={21} textAnchor="middle"
              fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
              fill={`${PLUM}0.92)`} style={{ userSelect: 'none' }}>
              {area.label}
            </text>
            <text x={x + COL_W / 2} y={36} textAnchor="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={`${PLUM}0.40)`} style={{ userSelect: 'none' }}>
              {area.sub}
            </text>
          </motion.g>
        )
      })}

      {/* Levers */}
      {LEVERS.map((lev) => {
        const x = COL_X[lev.col]
        const y = leverY(lev.i)
        const colDelay = COL_BASE_DELAY[lev.col]
        const leverDelay = colDelay + 0.12 + lev.i * 0.08

        const isOP = !!lev.overpulled
        const isNG = !!lev.neglected

        const fillColor   = isOP ? `${AMBER}0.09)` : isNG ? `${PLUM}0.13)` : `${PLUM}0.05)`
        const strokeColor = isOP ? `${AMBER}0.42)` : isNG ? `${PLUM}0.58)` : `${PLUM}0.26)`
        const strokeW     = isOP ? 1.5 : isNG ? 1.5 : 0.9
        const glowFilter  = isOP ? 'url(#tl-est-amber-glow)' : isNG ? 'url(#tl-est-plum-glow)' : 'none'
        const labelColor  = isOP ? `${AMBER}0.88)` : isNG ? `${PLUM}1)` : 'rgba(255,255,255,0.62)'
        const subColor    = isOP ? `${AMBER}0.48)` : isNG ? `${PLUM}0.52)` : 'rgba(255,255,255,0.24)'

        return (
          <motion.g key={lev.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={show()}
            transition={tr(leverDelay)}>
            <rect
              x={x} y={y} width={COL_W} height={LEVER_H} rx={4}
              fill={fillColor}
              stroke={strokeColor}
              strokeWidth={strokeW}
              style={{ filter: glowFilter }}
            />
            <text x={x + COL_W / 2} y={y + 20} textAnchor="middle"
              fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
              fill={labelColor} style={{ userSelect: 'none' }}>
              {lev.label}
            </text>
            <text x={x + COL_W / 2} y={y + 35} textAnchor="middle"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={subColor} style={{ userSelect: 'none' }}>
              {lev.sub}
            </text>

            {/* Status badge top-right */}
            {isOP && (
              <motion.text x={x + COL_W - 5} y={y + 11} textAnchor="end"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${AMBER}0.68)`} style={{ userSelect: 'none' }}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                animate={show()}
                transition={tr(leverDelay + 0.28)}>
                OVER-PULLED
              </motion.text>
            )}
            {isNG && (
              <motion.text x={x + COL_W - 5} y={y + 11} textAnchor="end"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${PLUM}0.65)`} style={{ userSelect: 'none' }}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                animate={show()}
                transition={tr(leverDelay + 0.28)}>
                HIGH LEVERAGE
              </motion.text>
            )}
          </motion.g>
        )
      })}

      {/* Caption */}
      <motion.text
        x={SVG_W / 2} y={SVG_H - 8}
        textAnchor="middle"
        fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
        fill="rgba(255,255,255,0.14)"
        style={{ userSelect: 'none' }}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
        animate={show()}
        transition={tr(1.08)}>
        12 LEVERS — 3 AREAS — MOST TEAMS ONLY PULL ONE
      </motion.text>
    </svg>
  )
}

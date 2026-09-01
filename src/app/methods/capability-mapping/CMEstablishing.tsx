'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'
const BRICK_TEXT = 'rgba(183,145,135,'  // brightened text-safe variant of BRICK
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700, SVG_H = 268

// Layout: left label column (80px) + front-end (298px) + gap (18px) + back-end (298px) + margin (6px)
const FE_X = 84, BE_X = 400, CELL_W = 296
const FE_CX = FE_X + 148   // 232
const BE_CX = BE_X + 148   // 548

// Layer rows (bottom = FOUNDATIONAL, top = EPIC)
// L1 FOUNDATIONAL: y=168, h=56
// L2 OPERATIONAL:  y=96,  h=56
// L3 EPIC:         y=26,  h=56
const L = {
  1: { y: 168, h: 56, cy: 196, label: 'FOUNDATIONAL' },
  2: { y: 96,  h: 56, cy: 124, label: 'OPERATIONAL'  },
  3: { y: 26,  h: 56, cy: 54,  label: 'EPIC-LEVEL'   },
}

// Gap zones for upward arrows
// L1→L2: y=152 to y=168 (mid=160)
// L2→L3: y=82  to y=96  (mid=89)

type State = 'have' | 'partial' | 'gap'

interface Cell {
  id: string
  layer: 1 | 2 | 3
  seg: 'fe' | 'be'
  x: number; y: number; cx: number; cy: number
  label: string
  state: State
}

const CELLS: Cell[] = [
  // Layer 1 - FOUNDATIONAL (bottom)
  { id: 'fe-l1', layer: 1, seg: 'fe', x: FE_X, y: 168, cx: FE_CX, cy: 196, label: 'DATA QUALITY',        state: 'partial' },
  { id: 'be-l1', layer: 1, seg: 'be', x: BE_X, y: 168, cx: BE_CX, cy: 196, label: 'PIPELINE RELIABILITY', state: 'gap'     },
  // Layer 2 - OPERATIONAL (middle)
  { id: 'fe-l2', layer: 2, seg: 'fe', x: FE_X, y: 96,  cx: FE_CX, cy: 124, label: 'REAL-TIME SERVING',   state: 'partial' },
  { id: 'be-l2', layer: 2, seg: 'be', x: BE_X, y: 96,  cx: BE_CX, cy: 124, label: 'LIVE SYSTEM OPS',     state: 'partial' },
  // Layer 3 - EPIC (top)
  { id: 'fe-l3', layer: 3, seg: 'fe', x: FE_X, y: 26,  cx: FE_CX, cy: 54,  label: 'PERSONALISATION',     state: 'have'    },
  { id: 'be-l3', layer: 3, seg: 'be', x: BE_X, y: 26,  cx: BE_CX, cy: 54,  label: 'REAL-TIME RECS',      state: 'have'    },
]

// Cells that are unsupported because of a foundational gap
const UNSUPPORTED = new Set(['be-l2', 'be-l3'])

function stateColors(s: State, unsupported = false) {
  if (s === 'have') return {
    fill: unsupported ? `${AMBER}0.05)` : `${BRICK}0.13)`,
    stroke: unsupported ? `${AMBER}0.50)` : `${BRICK}0.72)`,
    dash: '', sw: 1.6,
    label: unsupported ? `${AMBER_TEXT}0.891)` : `${BRICK_TEXT}0.969)`,
    stateTag: 'HAVE IT',
  }
  if (s === 'partial') return {
    fill: `${AMBER}0.07)`,
    stroke: `${AMBER}0.58)`,
    dash: '6 3', sw: 1.3,
    label: `${AMBER_TEXT}0.932)`,
    stateTag: 'PARTIAL',
  }
  return {
    fill: 'rgba(10,5,4,0.72)',
    stroke: `${AMBER}0.42)`,
    dash: '4 4', sw: 1.1,
    label: `${AMBER_TEXT}0.876)`,
    stateTag: 'GAP',
  }
}

const LAYER_ORDER = [1, 2, 3] as const

export default function CMEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced
  const d = (base: number) => (prefersReduced ? 0 : base)

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: visible ? 1 : 0 },
    transition: { duration: 0.36, delay: d(delay) },
  })

  // Layer delays: L1=0.12, L2=0.48, L3=0.80
  const layerDelay: Record<number, number> = { 1: 0.12, 2: 0.48, 3: 0.80 }

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Layered capability map. Three layers from bottom to top: FOUNDATIONAL (data quality, pipeline reliability), OPERATIONAL (real-time serving, live system ops), EPIC-LEVEL (personalisation, real-time recs). Split into front-end and back-end segments. DATA QUALITY is PARTIAL; PIPELINE RELIABILITY is a GAP, a missing foundational capability. LIVE SYSTEM OPS and REAL-TIME RECS above the gap are unsupported: they depend on something that is not there."
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', display: 'block' }}
      >
        <defs>
          {/* Amber glow for GAP cells - the glowing absence */}
          <filter id="cm-est-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Brick glow for HAVE IT cells in the first layer */}
          <filter id="cm-est-brick-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${BRICK}0.28)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Upward-pointing arrowhead */}
          <marker id="cm-est-up" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,6 L3,0 L6,6 Z" fill={`${BRICK}0.42)`} />
          </marker>
          <marker id="cm-est-up-warn" markerWidth="6" markerHeight="6" refX="3" refY="5" orient="auto">
            <path d="M0,6 L3,0 L6,6 Z" fill={`${AMBER}0.48)`} />
          </marker>
        </defs>

        {/* Dark background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Segment labels */}
        <motion.g {...fade(0.05)}>
          <text x={FE_CX} y={16} textAnchor="middle" fontSize="4.5"
            fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
            fill={`rgba(183,145,135,0.899)`} style={{ userSelect: 'none' }}>
            FRONT-END
          </text>
          <text x={BE_CX} y={16} textAnchor="middle" fontSize="4.5"
            fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
            fill={`rgba(183,145,135,0.899)`} style={{ userSelect: 'none' }}>
            BACK-END
          </text>
          {/* Segment divider */}
          <line x1={392} y1={22} x2={392} y2={226} stroke={`${BRICK}0.12)`} strokeWidth={0.8} />
        </motion.g>

        {/* Layer labels (left side, rotated) */}
        {LAYER_ORDER.map(ln => (
          <motion.text key={ln}
            x={42} y={L[ln].cy}
            textAnchor="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`rgba(183,145,135,0.874)`} style={{ userSelect: 'none' }}
            transform={`rotate(-90 42 ${L[ln].cy})`}
            {...fade(layerDelay[ln])}>
            {L[ln].label}
          </motion.text>
        ))}

        {/* Upward dependency arrows (appear between layer animations) */}
        {/* L1→L2 arrows */}
        <motion.g {...fade(0.36)}>
          <line x1={FE_CX} y1={162} x2={FE_CX} y2={104}
            stroke={`${BRICK}0.30)`} strokeWidth={0.9}
            markerEnd="url(#cm-est-up)" />
          <line x1={BE_CX} y1={162} x2={BE_CX} y2={104}
            stroke={`${AMBER}0.36)`} strokeWidth={0.9}
            markerEnd="url(#cm-est-up-warn)" />
        </motion.g>
        {/* L2→L3 arrows */}
        <motion.g {...fade(0.68)}>
          <line x1={FE_CX} y1={90} x2={FE_CX} y2={34}
            stroke={`${BRICK}0.28)`} strokeWidth={0.9}
            markerEnd="url(#cm-est-up)" />
          <line x1={BE_CX} y1={90} x2={BE_CX} y2={34}
            stroke={`${AMBER}0.34)`} strokeWidth={0.9}
            markerEnd="url(#cm-est-up-warn)" />
        </motion.g>

        {/* CELLS - render bottom to top (L1 first, L3 last) */}
        {CELLS.map(c => {
          const unsupported = UNSUPPORTED.has(c.id)
          const sc = stateColors(c.state, unsupported)
          const cDelay = layerDelay[c.layer]
          const isGap = c.state === 'gap'
          return (
            <motion.g key={c.id} {...fade(cDelay)}>
              {/* Main cell rectangle */}
              <rect
                x={c.x} y={c.y} width={CELL_W} height={L[c.layer].h}
                fill={sc.fill}
                stroke={sc.stroke}
                strokeWidth={sc.sw}
                strokeDasharray={sc.dash}
                rx={3}
                filter={isGap ? 'url(#cm-est-glow)' : (c.layer === 1 && c.state === 'have' ? 'url(#cm-est-brick-glow)' : undefined)}
              />
              {/* Capability name */}
              <text
                x={c.cx} y={c.cy - 5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="6.0" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                fill={sc.label} style={{ userSelect: 'none' }}>
                {c.label}
              </text>
              {/* State tag */}
              <text
                x={c.cx} y={c.cy + 10}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill={unsupported && c.state === 'have' ? `${AMBER_TEXT}0.861)` : sc.label.replace('0.85)', '0.50)').replace('0.78)', '0.52)').replace('0.60)', '0.42)')}
                style={{ userSelect: 'none' }}>
                {unsupported && c.state === 'have' ? '⚠ UNSUPPORTED' : sc.stateTag}
              </text>
            </motion.g>
          )
        })}

        {/* "GAP" annotation below PIPELINE RELIABILITY */}
        <motion.g {...fade(1.1)}>
          <text x={BE_CX} y={230} textAnchor="middle" fontSize="3.8"
            fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`${AMBER_TEXT}0.861)`} style={{ userSelect: 'none' }}>
            ← THIS GAP IS CARRYING EVERYTHING ABOVE IT
          </text>
        </motion.g>

        {/* Caption */}
        <motion.text x={SVG_W / 2} y={SVG_H - 7} textAnchor="middle" fontSize="4.0"
          fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }}
          {...fade(1.5)}>
          Capability is a stack. A gap at the foundation holds up everything above it.
        </motion.text>
      </svg>
    </div>
  )
}

'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'
const BRICK_TEXT = 'rgba(183,145,135,'  // brightened text-safe variant of BRICK
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700, SVG_H = 268

// Bet boxes - height increases (uncertainty grows) left to right
// CY = 134 (center y for all boxes)
const CY = 134

type BetDef = { id: string; label: string; sub: string; hor: string; x: number; y: number; w: number; h: number; conf: number; dash: string; sw: number }

const BETS: BetDef[] = [
  { id: 'proof',   label: 'PROOF',   sub: 'FEASIBILITY', hor: 'NOW',   x: 14,  y: 116, w: 90,  h: 36, conf: 1.00, dash: '',    sw: 2.0 },
  { id: 'release', label: 'RELEASE', sub: 'MVP / MLP',   hor: 'NEXT',  x: 158, y: 110, w: 92,  h: 48, conf: 0.78, dash: '',    sw: 1.8 },
  { id: 'pilot',   label: 'PILOT',   sub: 'BOUNDED',     hor: 'LATER', x: 312, y: 103, w: 94,  h: 62, conf: 0.52, dash: '5 3', sw: 1.5 },
  { id: 'rollout', label: 'ROLLOUT', sub: '~STAGED',     hor: '~FAR',  x: 464, y: 94,  w: 102, h: 80, conf: 0.32, dash: '6 4', sw: 1.2 },
]
// Right edges: 104, 250, 406, 566
// Gap mids: (104+158)/2=131, (250+312)/2=281, (406+464)/2=435

// Gate vertical-line positions
const GATES = [
  { x: 131, label: 'GATE 1' },
  { x: 281, label: 'GATE 2' },
  { x: 435, label: 'GATE 3' },
]

// Learning arrows - backward bezier curves (later bet -> earlier bet)
// Arrow A: BET 4 → BET 2 (big reshape loop, peaks at y=44)
const LEARN_A = 'M 514,90 C 514,42 204,42 204,108'
// Arrow B: BET 3 → BET 1 (smaller feedback, peaks at y=64)
const LEARN_B = 'M 359,100 C 359,64 59,64 59,113'

export default function DREstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced
  const d = (base: number) => (prefersReduced ? 0 : base)

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: visible ? 1 : 0 },
    transition: { duration: 0.38, delay: d(delay) },
  })

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Confidence-gradient bet sequence. Four bet boxes sit left to right: PROOF (now, firm solid border), RELEASE (next, mostly solid), PILOT (later, dashed border), ROLLOUT (far, faded and dashed). Gate markers sit between each pair. Two learning arrows curve backwards from later bets to earlier bets, showing how what you learn reshapes what comes next."
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', display: 'block' }}
      >
        <defs>
          <filter id="dr-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${BRICK}0.30)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="dr-est-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${BRICK}0.55)`} />
          </marker>
          <marker id="dr-est-learn" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${AMBER}0.65)`} />
          </marker>
        </defs>

        {/* Background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* FIRM → LOOSE gradient indicator */}
        <motion.g {...fade(0.04)}>
          <line x1={22} y1={24} x2={564} y2={24}
            stroke={`${BRICK}0.22)`} strokeWidth={0.8} />
          <text x={22} y={18} fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`rgba(183,145,135,0.895)`} style={{ userSelect: 'none' }}>FIRM</text>
          <text x={564} y={18} textAnchor="end" fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`rgba(183,145,135,0.849)`} style={{ userSelect: 'none' }}>LOOSE</text>
          <path d="M 70,24 L 530,24" stroke={`${BRICK}0.18)`} strokeWidth={0.8}
            markerEnd="url(#dr-est-arr)" />
        </motion.g>

        {/* Gate vertical lines */}
        {GATES.map((g, i) => (
          <motion.g key={g.x} {...fade(0.18 + i * 0.22)}>
            <line x1={g.x} y1={86} x2={g.x} y2={182}
              stroke={`${BRICK}0.16)`} strokeWidth={0.9} strokeDasharray="3 3" />
            <rect x={g.x - 5} y={CY - 5} width={10} height={10}
              transform={`rotate(45 ${g.x} ${CY})`}
              fill={`${BRICK}0.08)`} stroke={`${BRICK}0.32)`} strokeWidth={0.9} />
            <text x={g.x} y={78} textAnchor="middle" fontSize="11"
              fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={`rgba(183,145,135,0.87)`} style={{ userSelect: 'none' }}>
              {g.label}
            </text>
            <text x={g.x} y={202} textAnchor="middle" fontSize="11"
              fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={`rgba(183,145,135,0.84)`} style={{ userSelect: 'none' }}>
              PROCEED · ADJUST · STOP
            </text>
          </motion.g>
        ))}

        {/* Bet boxes */}
        {BETS.map((b, i) => (
          <motion.g key={b.id} {...fade(0.12 + i * 0.24)}>
            <rect
              x={b.x} y={b.y} width={b.w} height={b.h}
              fill={`${BRICK}${b.conf * 0.12})`}
              stroke={`${BRICK}${b.conf * 0.72})`}
              strokeWidth={b.sw}
              strokeDasharray={b.dash}
              rx={3}
              filter={i === 0 ? 'url(#dr-est-glow)' : undefined}
            />
            {/* Horizon label - moved above the box; the box itself is too short
                (36 units for PROOF) to stack three lines of 11pt text */}
            <text
              x={b.x + b.w / 2} y={b.y - 10}
              textAnchor="middle" fontSize="11"
              fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill={`${BRICK_TEXT}${Math.max(b.conf * 0.65, 0.80)})`}
              style={{ userSelect: 'none' }}>
              {b.hor}
            </text>
            {/* Main label - the only label that stays inside the box */}
            <text
              x={b.x + b.w / 2} y={CY - 2}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
              fill={`${BRICK_TEXT}${Math.max(b.conf * 0.96, 0.85)})`}
              style={{ userSelect: 'none' }}>
              {b.label}
            </text>
            {/* Sublabel - moved below the box, see horizon label note */}
            <text
              x={b.x + b.w / 2} y={b.y + b.h + 14}
              textAnchor="middle" fontSize="11"
              fontFamily="var(--font-mono)" letterSpacing="0.03em"
              fill={`${BRICK_TEXT}${Math.max(b.conf * 0.60, 0.80)})`}
              style={{ userSelect: 'none' }}>
              {b.sub}
            </text>
          </motion.g>
        ))}

        {/* Learning arrow A - BET 4 -> BET 2 (larger, higher arc) */}
        <motion.path
          d={LEARN_A}
          fill="none"
          stroke={`${AMBER}0.42)`}
          strokeWidth={1.2}
          strokeDasharray="4 3"
          markerEnd="url(#dr-est-learn)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={prefersReduced ? { duration: 0 } : {
            pathLength: { duration: 1.4, delay: d(1.30), ease: 'easeInOut' },
            opacity: { duration: 0.01, delay: d(1.30) },
          }}
        />
        <motion.text x={360} y={36} textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.02em"
          fill={`${AMBER_TEXT}0.83)`} style={{ userSelect: 'none' }}
          {...fade(1.60)}>
          WHAT YOU LEARN RESHAPES WHAT COMES NEXT
        </motion.text>

        {/* Learning arrow B - BET 3 -> BET 1 (smaller arc) */}
        <motion.path
          d={LEARN_B}
          fill="none"
          stroke={`${AMBER}0.28)`}
          strokeWidth={0.9}
          strokeDasharray="3 3"
          markerEnd="url(#dr-est-learn)"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={prefersReduced ? { duration: 0 } : {
            pathLength: { duration: 1.1, delay: d(1.55), ease: 'easeInOut' },
            opacity: { duration: 0.01, delay: d(1.55) },
          }}
        />

        {/* Caption */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 7}
          textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.02em"
          fill="rgba(255,255,255,0.62)" style={{ userSelect: 'none' }}
          {...fade(2.0)}>
          Near bets are firm. Far bets are deliberately loose. The arrows are the honesty.
        </motion.text>
      </svg>
    </div>
  )
}

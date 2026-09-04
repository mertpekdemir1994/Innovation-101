'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700, SVG_H = 268

// Stage boxes: w=88, h=28, center-y=113
const S_W = 88, S_H = 28, CY = 113

const STAGES = [
  { id: 'signal', label: 'SIGNAL', x: 18,  y: 99 },
  { id: 'sense',  label: 'SENSE',  x: 172, y: 99 },
  { id: 'decide', label: 'DECIDE', x: 326, y: 99 },
  { id: 'ship',   label: 'SHIP',   x: 480, y: 99 },
]
// Stage center-x: 62, 216, 370, 524
// Stage right edges: 106, 260, 414, 568

// Connector midpoints (between stage right and next stage left)
// C1: (106→172) mid 139   C2: (260→326) mid 293   C3: (414→480) mid 447
// Return path bottom: y=196, B4 midpoint x=350

// nameY/tagY gaps widened (13 -> 18, 11 -> 16): tuned for ~4.8/3.6px text,
// too tight for 11pt stacking
const BREAKS = [
  {
    cx: 139, cy: CY, nameY: 62, tagY: 80, isTop: true,
    name: 'DATA LAKE',
    tag: 'SIGNAL · NO SENSE',
  },
  {
    cx: 293, cy: CY, nameY: 62, tagY: 80, isTop: true,
    name: 'INSIGHT DECK',
    tag: 'SENSE · NO DECISION',
  },
  {
    cx: 447, cy: CY, nameY: 62, tagY: 80, isTop: true,
    name: 'ROADMAP ITEM',
    tag: 'DECIDE · NO SHIP',
  },
  {
    cx: 350, cy: 196, nameY: 234, tagY: 218, isTop: false,
    name: 'NEVER CHECKED',
    tag: 'SHIP · NOT MEASURED',
  },
]

// Full closed-loop circuit path (rectangular loop, clockwise)
const LOOP_PATH = `M 18,${CY} L 568,${CY} L 608,${CY} C 638,${CY} 644,145 644,170 L 644,196 L 56,196 C 35,196 18,180 18,158 Z`

const CAP_Y = SVG_H - 7  // 261

export default function PFLEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced
  const d = (base: number) => prefersReduced ? 0 : base

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
        role="img"
        aria-label="The closed feedback loop. Four stages form a rectangular circuit: SIGNAL (what the live product tells you) flows right to SENSE (making meaning) flows right to DECIDE (choosing what to do) flows right to SHIP (changing the product), then a return path sweeps along the bottom back to SIGNAL (measuring whether the change worked). At each junction, a break point marks where real loops fail: between SIGNAL and SENSE, the DATA LAKE nobody reads; between SENSE and DECIDE, the INSIGHT DECK that changes nothing; between DECIDE and SHIP, the ROADMAP ITEM that never lands; on the return path between SHIP and SIGNAL, the CHANGE nobody checks."
        style={{ width: '100%', margin: '0 auto', display: 'block' }}
      >
        <defs>
          <filter id="pfl-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Right-pointing arrow (for top flow: left→right) */}
          <marker id="pfl-est-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${BRICK}0.58)`} />
          </marker>
        </defs>

        {/* Background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Loop circuit path (animates in clockwise) */}
        <motion.path
          d={LOOP_PATH}
          fill="none"
          stroke={`${BRICK}0.28)`}
          strokeWidth={1.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={visible ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={prefersReduced ? { duration: 0 } : {
            pathLength: { duration: 2.6, delay: 0.15, ease: 'easeInOut' },
            opacity: { duration: 0.01, delay: 0.15 },
          }}
        />

        {/* Stage boxes */}
        {STAGES.map((s, i) => (
          <motion.g key={s.id} {...fade(0.28 + i * 0.18)}>
            <rect x={s.x} y={s.y} width={S_W} height={S_H}
              fill={`${BRICK}0.10)`} stroke={`${BRICK}0.65)`}
              strokeWidth={1.5} rx={3}
              filter="url(#pfl-est-glow)" />
            <text x={s.x + S_W / 2} y={CY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.11em" fontWeight="600"
              fill={`rgba(183,145,135,0.983)`} style={{ userSelect: 'none' }}>
              {s.label}
            </text>
          </motion.g>
        ))}

        {/* Connecting arrows between stage boxes (top flow, left→right) */}
        {[
          { x1: 106, x2: 165, animD: 0.5 },  // SIGNAL→SENSE
          { x1: 260, x2: 319, animD: 0.68 }, // SENSE→DECIDE
          { x1: 414, x2: 473, animD: 0.86 }, // DECIDE→SHIP
        ].map(({ x1, x2, animD }, i) => (
          <motion.line key={i}
            x1={x1} y1={CY} x2={x2} y2={CY}
            stroke={`${BRICK}0.45)`} strokeWidth={1.2}
            markerEnd="url(#pfl-est-arr)"
            {...fade(animD)} />
        ))}

        {/* Return path direction arrow (flows right→left along bottom) */}
        <motion.line
          x1={480} y1={196} x2={100} y2={196}
          stroke={`${BRICK}0.42)`} strokeWidth={1.2}
          markerEnd="url(#pfl-est-arr)"
          {...fade(1.6)} />

        {/* Return path label */}
        <motion.text x={300} y={187}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
          fill={`rgba(183,145,135,0.87)`} style={{ userSelect: 'none' }}
          {...fade(1.7)}>
          ← BACK TO SIGNAL · MEASURES WHETHER THE CHANGE WORKED
        </motion.text>

        {/* Break point markers and labels */}
        {BREAKS.map((b, i) => (
          <motion.g key={b.tag} {...fade(0.6 + i * 0.35)}>
            {/* Callout line from marker to label */}
            <line
              x1={b.cx} y1={b.isTop ? b.cy - 6 : b.cy + 6}
              x2={b.cx} y2={b.isTop ? b.tagY + 8 : b.tagY - 8}
              stroke={`${AMBER}0.28)`} strokeWidth="0.8" />
            {/* Marker circle */}
            <circle cx={b.cx} cy={b.cy} r={5}
              fill={`${AMBER}0.12)`} stroke={`${AMBER}0.72)`} strokeWidth="1.4" />
            {/* Pathology name */}
            <text x={b.cx} y={b.nameY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
              fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
              {b.name}
            </text>
            {/* Break state tag */}
            <text x={b.cx} y={b.tagY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={`${AMBER_TEXT}0.839)`} style={{ userSelect: 'none' }}>
              {b.tag}
            </text>
          </motion.g>
        ))}

        {/* "LOOP CLOSES" annotation: top right corner area */}
        <motion.text x={648} y={138}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
          fill={`rgba(183,145,135,0.849)`} style={{ userSelect: 'none' }}
          transform="rotate(90 648 138)"
          {...fade(1.9)}>
          LOOP CLOSES
        </motion.text>

        {/* Caption */}
        <motion.text x={SVG_W / 2} y={CAP_Y}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.64)" style={{ userSelect: 'none' }}
          {...fade(2.4)}>
          A loop is only a loop if it closes. Every junction is a place it usually does not.
        </motion.text>
      </svg>
    </div>
  )
}

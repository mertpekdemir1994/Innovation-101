'use client'

import { motion, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(13,148,136,'

// ── Lemniscate / figure-eight geometry ───────────────────────────────────────
//
//  Left loop  = problem space:  Empathize (upper-left)  |  Define (lower-left)
//  Crossing   = Test: the hinge where the path passes through on its return
//  Right loop = solution space: Ideate   (upper-right)  |  Prototype (lower-right)
//
//  Path travels one continuous direction:
//  Empathize → (left lobe, CCW) → Define → crossing → Ideate → (right lobe, CW)
//  → Prototype → crossing (=Test) → back to Empathize  (repeat)

const CX = 380, CY = 190   // center / Test position

// ── Node x/y (t=0.5 on each lobe bezier) ────────────────────────────────────
// Computed analytically: see bezier midpoint formula in code below.
const NX_L = 235, NX_R = 525
const NY_U = 126, NY_D = 254

const NODES = [
  { id: 'empathize', label: 'Empathize', sub: 'Understand', x: NX_L, y: NY_U },
  { id: 'define',    label: 'Define',    sub: 'Frame',      x: NX_L, y: NY_D },
  { id: 'test',      label: 'Test',      sub: 'Learn',      x: CX,   y: CY   },
  { id: 'ideate',    label: 'Ideate',    sub: 'Generate',   x: NX_R, y: NY_U },
  { id: 'prototype', label: 'Prototype', sub: 'Make',       x: NX_R, y: NY_D },
]

// ── External label positions (outward from CX,CY) ───────────────────────────
// Test sits at center: its label goes below.
const LABELS = [
  { id: 'empathize', lx: 185, ly: 104, anchor: 'end'    as const },
  { id: 'define',    lx: 185, ly: 276, anchor: 'end'    as const },
  { id: 'test',      lx: CX,  ly: 238, anchor: 'middle' as const },
  { id: 'ideate',    lx: 575, ly: 104, anchor: 'start'  as const },
  { id: 'prototype', lx: 575, ly: 276, anchor: 'start'  as const },
]

// ── 5-segment infinity path starting at Empathize ───────────────────────────
// The original first bezier M(CX,CY)C(CX-42,CY-CP)(LX,CY-CP)(LX,CY) is split
// at t=0.5 so the drawn path begins AT Empathize and closes back there.
//   seg0: Empathize → left extreme
//   seg1: left extreme → center  (Define at t=0.5)
//   seg2: center → right extreme (Ideate at t=0.5)
//   seg3: right extreme → center (Prototype at t=0.5; this crossing = Test)
//   seg4: center → Empathize     (closing; arrow direction = "iterate")

type P4 = [[number,number],[number,number],[number,number],[number,number]]

const SEGS: P4[] = [
  [[235,126],[175,126],[120,148],[120,190]],   // seg0
  [[120,190],[120,275],[340,275],[380,190]],   // seg1
  [[380,190],[420,105],[640,105],[640,190]],   // seg2
  [[640,190],[640,275],[420,275],[380,190]],   // seg3
  [[380,190],[360,148],[295,126],[235,126]],   // seg4
]

const PATH_D = SEGS.map(([[x0,y0],[x1,y1],[x2,y2],[x3,y3]], i) =>
  i === 0
    ? `M ${x0} ${y0} C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`
    : `C ${x1} ${y1}, ${x2} ${y2}, ${x3} ${y3}`
).join(' ') + ' Z'

// ── Bezier helpers ───────────────────────────────────────────────────────────
function bpt([[x0,y0],[x1,y1],[x2,y2],[x3,y3]]: P4, t: number): [number,number] {
  const u = 1 - t
  return [
    u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3,
    u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3,
  ]
}
function btan([[x0,y0],[x1,y1],[x2,y2],[x3,y3]]: P4, t: number): [number,number] {
  const u = 1 - t
  const dx = 3*(u*u*(x1-x0) + 2*u*t*(x2-x1) + t*t*(x3-x2))
  const dy = 3*(u*u*(y1-y0) + 2*u*t*(y2-y1) + t*t*(y3-y2))
  const len = Math.sqrt(dx*dx + dy*dy) || 1
  return [dx/len, dy/len]
}
function arrowPts(seg: P4, t: number, sc = 8, wg = 4.5): string {
  const [x, y]   = bpt(seg, t)
  const [tx, ty] = btan(seg, t)
  const px = -ty, py = tx
  return [
    `${x + sc*tx},${y + sc*ty}`,
    `${x - sc*tx + wg*px},${y - sc*ty + wg*py}`,
    `${x - sc*tx - wg*px},${y - sc*ty - wg*py}`,
  ].join(' ')
}

// Arrowhead placements: (segIndex, t), each in the correct travel direction
// seg0 t=0.35 → LEFT-DOWN  (Empathize → left extreme)
// seg1 t=0.25 → DOWN-RIGHT (left extreme → bottom of left lobe)
// seg2 t=0.25 → RIGHT-UP   (center → Ideate)
// seg3 t=0.25 → RIGHT-DOWN (right extreme → Prototype area)  ← wait, seg3 goes right extreme → center
// seg3 t=0.75 → LEFT-UP    (Prototype → center/Test)
// seg4 t=0.50 → LEFT-UP    (Test → Empathize; the "iterate" closing arc)
const ARROWS: [number, number][] = [
  [0, 0.35],
  [1, 0.25],
  [2, 0.25],
  [3, 0.75],
]
const NODE_R = 22

export default function DTStagesHero() {
  const prefersReduced = useReducedMotion()

  // Position of the "iterate" label: midpoint of seg4 offset outward slightly
  const [ix, iy] = bpt(SEGS[4], 0.5)   // ≈ (323, 142)

  return (
    <div className="w-full flex justify-center items-center py-space-4 select-none" aria-hidden="true">
      <svg viewBox="0 0 760 380" width="100%" style={{ overflow: 'visible' }}>

        {/* ── Subtle lobe labels ── */}
        <text x={75} y={CY + 4} textAnchor="middle"
          fill={`rgba(61,169,160,0.836)`} fontSize="9" fontFamily="ui-monospace,monospace"
          letterSpacing="0.14em">
          PROBLEM
        </text>
        <text x={685} y={CY + 4} textAnchor="middle"
          fill={`rgba(61,169,160,0.836)`} fontSize="9" fontFamily="ui-monospace,monospace"
          letterSpacing="0.14em">
          SOLUTION
        </text>

        {/* ── Glow halo ── */}
        <motion.path
          d={PATH_D} fill="none"
          stroke={`${TEAL}0.09)`} strokeWidth={44} strokeLinecap="round"
          initial={prefersReduced ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.4, ease: 'easeInOut' }}
        />

        {/* ── Main band ── */}
        <motion.path
          d={PATH_D} fill="none"
          stroke={`${TEAL}0.20)`} strokeWidth={26} strokeLinecap="round"
          initial={prefersReduced ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
        />

        {/* ── Crisp edge ── */}
        <motion.path
          d={PATH_D} fill="none"
          stroke={`${TEAL}0.55)`} strokeWidth={2} strokeLinecap="round"
          initial={prefersReduced ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.1 }}
        />

        {/* ── Travel-direction arrowheads ── */}
        {ARROWS.map(([si, t], i) => (
          <motion.polygon
            key={`arr-${si}-${t}`}
            points={arrowPts(SEGS[si], t)}
            fill={`${TEAL}0.60)`}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + i * 0.45 }}
          />
        ))}

        {/* ── Iterate / return arrowhead + label (seg4: Test → Empathize) ── */}
        <motion.g
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.3 }}
        >
          <polygon points={arrowPts(SEGS[4], 0.5, 7, 4)} fill={`${TEAL}0.45)`} />
          <text
            x={ix - 8} y={iy - 14}
            textAnchor="middle" fill={`rgba(61,169,160,0.884)`}
            fontSize="9.5" fontFamily="ui-monospace,monospace" letterSpacing="0.08em"
          >
            iterate
          </text>
        </motion.g>

        {/* ── Stage nodes ── */}
        {NODES.map((node, i) => {
          const lb = LABELS[i]
          return (
            <motion.g
              key={node.id}
              initial={prefersReduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.38, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${node.x}px ${node.y}px` }}
            >
              {/* Halo */}
              <circle cx={node.x} cy={node.y} r={NODE_R + 8} fill={`${TEAL}0.07)`} />
              {/* Node */}
              <circle cx={node.x} cy={node.y} r={NODE_R}
                fill={`${TEAL}0.17)`} stroke={`${TEAL}0.65)`} strokeWidth={2} />
              {/* Short label inside */}
              <text x={node.x} y={node.y + 5} textAnchor="middle"
                fill={`rgba(61,169,160,0.98)`} fontSize="9" fontWeight="600"
                fontFamily="ui-monospace,monospace" letterSpacing="0.04em">
                {node.label.slice(0, 4).toUpperCase()}
              </text>

              {/* External: stage name */}
              <text x={lb.lx} y={lb.ly - 8} textAnchor={lb.anchor}
                fill="rgba(255,255,255,0.82)" fontSize="13" fontWeight="600"
                fontFamily="Inter,sans-serif" letterSpacing="0.01em">
                {node.label}
              </text>
              {/* External: sub-label */}
              <text x={lb.lx} y={lb.ly + 8} textAnchor={lb.anchor}
                fill="rgba(255,255,255,0.675)" fontSize="11"
                fontFamily="Inter,sans-serif">
                {node.sub}
              </text>
            </motion.g>
          )
        })}

      </svg>
    </div>
  )
}

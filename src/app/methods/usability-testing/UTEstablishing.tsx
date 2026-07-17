'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'
const AMBER = 'rgba(245,158,11,'

const SVG_W = 700, SVG_H = 268

// Interface nodes (horizontal flow at y=124)
const N_W = 78, N_H = 30, N_CY = 124

const NODES = [
  { id: 'n1', x: 20,  label: 'START'    },
  { id: 'n2', x: 148, label: 'ACCOUNT'  },
  { id: 'n3', x: 282, label: 'BILLING'  },
  { id: 'n4', x: 416, label: 'CANCEL'   },
  { id: 'n5', x: 548, label: 'DONE ✓'  },
]
const NODE_CX = NODES.map(n => n.x + N_W / 2)
// [59, 187, 321, 455, 587]

// Wrong-turn node (Plan Details — above the line)
const WN_X = 234, WN_Y = 48, WN_W = 78, WN_H = 28
const WN_CX = WN_X + WN_W / 2  // 273
const WN_CY = WN_Y + WN_H / 2  // 62

// Intended path: arrow segments between node edges
const INT_ARROWS = [
  { x1: 98+4,  x2: 148-4  },   // N1→N2: 102→144
  { x1: 226+4, x2: 282-4  },   // N2→N3: 230→278
  { x1: 360+4, x2: 416-4  },   // N3→N4: 364→412
  { x1: 494+4, x2: 548-4  },   // N4→N5: 498→544
]

// Actual path — wandering, hesitating, detouring, stopping before the goal
const ACTUAL_PATH = [
  'M 59 124',
  'C 95 124 150 128 167 128',     // wobble toward ACCOUNT
  'L 187 124',                     // arrive at ACCOUNT — HESITATION
  'C 212 108 248 82 273 62',      // curve UP to Plan Details — WRONG TURN
  'L 273 62',                      // at Plan Details (pause)
  'C 255 84 218 108 187 124',     // curve back DOWN — BACKTRACK
  'C 222 128 280 130 321 124',    // move right to BILLING
  'C 360 120 385 118 400 119',    // start toward CANCEL — stops here
].join(' ')

// Friction point positions and metadata
const FRICTION = [
  { cx: 187, cy: 124, label: 'HESITATION', lx: 187, ly: 90,  pathT: 0.22, animD: 1.3 },
  { cx: 273, cy: 62,  label: 'WRONG TURN', lx: 338, ly: 46,  pathT: 0.40, animD: 2.0 },
  { cx: 234, cy: 95,  label: 'BACKTRACK',  lx: 160, ly: 80,  pathT: 0.58, animD: 2.6 },
  { cx: 400, cy: 119, label: 'STUCK',      lx: 400, ly: 90,  pathT: 1.00, animD: 3.5 },
]

const CAP_Y = SVG_H - 7  // 261

export default function UTEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced
  const d = (base: number) => prefersReduced ? 0 : base

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: visible ? 1 : 0 },
    transition: { duration: 0.35, delay: d(delay) },
  })

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Expectation versus behavior gap. Two paths through an interface. The INTENDED PATH is a clean straight line from START through ACCOUNT, BILLING, and CANCEL to DONE. The ACTUAL PATH wanders: it hesitates at ACCOUNT, takes a wrong turn up to Plan Details, backtracks to ACCOUNT, reaches BILLING, then gets stuck before CANCEL — never reaching DONE. Four friction points are marked: HESITATION at ACCOUNT, WRONG TURN at Plan Details, BACKTRACK on the return, STUCK before CANCEL. The gap between the two paths is the finding."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="ut-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="ut-est-iarr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.50)" />
          </marker>
        </defs>

        {/* Background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Legend */}
        <motion.g {...fade(0.04)}>
          <line x1={22} y1={22} x2={46} y2={22} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
          <text x={50} y={22} dominantBaseline="middle" fontSize="4.0"
            fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill="rgba(255,255,255,0.45)" style={{ userSelect: 'none' }}>
            INTENDED PATH
          </text>
          <line x1={22} y1={34} x2={46} y2={34} stroke={`${BRICK}0.85)`} strokeWidth="1.5" />
          <text x={50} y={34} dominantBaseline="middle" fontSize="4.0"
            fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`${BRICK}0.85)`} style={{ userSelect: 'none' }}>
            ACTUAL PATH
          </text>
        </motion.g>

        {/* Main interface nodes */}
        {NODES.map((n, i) => {
          const isUnreached = i >= 3  // CANCEL and DONE never reached
          return (
            <motion.g key={n.id} {...fade(0.06 + i * 0.04)}>
              <rect x={n.x} y={N_CY - N_H / 2} width={N_W} height={N_H}
                fill={isUnreached ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'}
                stroke={isUnreached ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.28)'}
                strokeWidth="1" rx={3} />
              <text x={NODE_CX[i]} y={N_CY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={isUnreached ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.80)'}
                style={{ userSelect: 'none' }}>
                {n.label}
              </text>
            </motion.g>
          )
        })}

        {/* "NOT REACHED" label above N4/N5 */}
        <motion.text x={521} y={103}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
          fill="rgba(255,255,255,0.18)" style={{ userSelect: 'none' }}
          {...fade(0.30)}>
          NOT REACHED
        </motion.text>

        {/* Wrong-turn node (Plan Details) */}
        <motion.g {...fade(0.10)}>
          <rect x={WN_X} y={WN_Y} width={WN_W} height={WN_H}
            fill={`${AMBER}0.07)`} stroke={`${AMBER}0.40)`} strokeWidth="1" rx={3} />
          <text x={WN_CX} y={WN_CY}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
            PLAN DETAILS
          </text>
        </motion.g>

        {/* Intended path arrows (staggered, draws fast) */}
        {INT_ARROWS.map((a, i) => (
          <motion.line key={i}
            x1={a.x1} y1={N_CY} x2={a.x2} y2={N_CY}
            stroke="rgba(255,255,255,0.42)" strokeWidth="1.5"
            markerEnd="url(#ut-est-iarr)"
            {...fade(0.26 + i * 0.06)} />
        ))}

        {/* Actual path — draws SLOWLY with pauses (the halting animation is the point) */}
        <motion.path
          d={ACTUAL_PATH}
          fill="none"
          stroke={`${BRICK}0.88)`}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={visible ? {
            pathLength: prefersReduced
              ? 1
              : [0, 0.22, 0.22, 0.40, 0.40, 0.58, 0.58, 0.84, 0.84, 1.0]
          } : { pathLength: 0 }}
          transition={prefersReduced ? { duration: 0 } : {
            duration: 2.8,
            delay: 0.72,
            ease: 'linear',
            times: [0, 0.12, 0.22, 0.35, 0.45, 0.58, 0.68, 0.84, 0.91, 1.0],
          }}
        />

        {/* Friction point markers (appear as actual path reaches each one) */}
        {FRICTION.map((f) => (
          <motion.g key={f.label} {...fade(f.animD)}>
            {/* Circle marker on path */}
            <circle cx={f.cx} cy={f.cy} r={5}
              fill={f.label === 'WRONG TURN' ? `${AMBER}0.90)` : `${BRICK}0.90)`}
              stroke="rgba(10,10,18,0.80)" strokeWidth="1.5" />
            {/* Label */}
            <text x={f.lx} y={f.ly}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
              fill={f.label === 'WRONG TURN' ? `${AMBER}0.85)` : `${BRICK}0.85)`}
              style={{ userSelect: 'none' }}>
              {f.label}
            </text>
          </motion.g>
        ))}

        {/* Divergence annotation (appears mid-animation) */}
        <motion.g {...fade(2.1)}>
          <text x={510} y={72}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${BRICK}0.42)`} style={{ userSelect: 'none' }}>
            THE DIVERGENCE
          </text>
          <text x={510} y={83}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`${BRICK}0.30)`} style={{ userSelect: 'none' }}>
            IS THE FINDING
          </text>
        </motion.g>

        {/* Caption */}
        <motion.text x={SVG_W / 2} y={CAP_Y}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.28)" style={{ userSelect: 'none' }}
          {...fade(3.6)}>
          The intended path is what you assumed. The actual path is what a stranger did. The gap is the finding.
        </motion.text>
      </svg>
    </div>
  )
}

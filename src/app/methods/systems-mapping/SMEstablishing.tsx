'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700, SVG_H = 268

// Variable node centers
const PRESSURE_CX = 117, PRESSURE_CY = 58   // DELIVERY PRESSURE (top-left)
const DEBT_CX = 117,     DEBT_CY = 212       // TECHNICAL DEBT (bottom-left)
const DEFECT_CX = 464,   DEFECT_CY = 58      // DEFECT RATE (top-right, THE SYMPTOM)
const TESTING_CX = 564,  TESTING_CY = 212    // TESTING (bottom-right)

// Box dimensions
const BOX_H = 28

// Loop arc paths (REINFORCING = left oval, clockwise)
const R_LEFT_ARC  = `M 78,72 C 16,118 16,178 78,198`
const R_RIGHT_ARC = `M 206,198 C 266,178 266,118 206,72`

// Loop arc paths (BALANCING = right oval)
const B_RIGHT_ARC = `M 536,64 C 590,108 590,184 554,198`
const B_LEFT_ARC  = `M 506,198 C 490,182 486,98 484,64`

// Cross-arrow path (DELIVERY PRESSURE → DEFECT RATE, with DELAY)
const CROSS_PATH = `M 206,58 L 392,58`

export default function SMEstablishing() {
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

  const drawPath = (delay: number, dur: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: visible ? 1 : 0, opacity: visible ? 1 : 0 },
    transition: {
      pathLength: { duration: dur, delay: d(delay) },
      opacity: { duration: 0.20, delay: d(delay) },
    },
  })

  return (
    <div className="w-full">
      <svg
        ref={ref}
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Causal loop diagram showing two loops. LEFT: REINFORCING loop R1: DELIVERY PRESSURE drives TECHNICAL DEBT, which slows delivery, which increases DELIVERY PRESSURE further. A self-amplifying vicious circle. RIGHT: BALANCING loop B1: DEFECT RATE drives more TESTING, which reduces DEFECT RATE. An equilibrium-restoring loop that absorbs interventions. A CROSS-ARROW connects the two loops: DELIVERY PRESSURE causes shortcuts that produce DEFECTS, but with a long DELAY, which is why nobody connects them. The LEVERAGE POINT glows above the DELIVERY PRESSURE node, far from where the pain (DEFECT RATE) is felt."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="sm-est-teal-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${TEAL}0.60)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sm-est-amber-glow" x="-35%" y="-35%" width="170%" height="170%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="sm-est-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${TEAL}0.72)`} />
          </marker>
          <marker id="sm-est-arr-neg" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${AMBER}0.65)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* ── VARIABLE NODES (fade in first) ── */}
        <motion.g {...fade(0.05)}>
          {/* DELIVERY PRESSURE */}
          <rect x={28} y={44} width={178} height={BOX_H} rx={3}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.55)`} strokeWidth={1.4} />
          <text x={PRESSURE_CX} y={PRESSURE_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${TEAL_TEXT}0.975)`} style={{ userSelect: 'none' }}>
            DELIVERY PRESSURE
          </text>

          {/* TECHNICAL DEBT */}
          <rect x={28} y={198} width={178} height={BOX_H} rx={3}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.55)`} strokeWidth={1.4} />
          <text x={DEBT_CX} y={DEBT_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${TEAL_TEXT}0.975)`} style={{ userSelect: 'none' }}>
            TECHNICAL DEBT
          </text>

          {/* DEFECT RATE: THE SYMPTOM */}
          <rect x={390} y={44} width={148} height={BOX_H} rx={3}
            fill={`${AMBER}0.07)`} stroke={`${AMBER}0.55)`} strokeWidth={1.4} />
          <text x={DEFECT_CX} y={DEFECT_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${AMBER}0.85)`} style={{ userSelect: 'none' }}>
            DEFECT RATE
          </text>
          <text x={DEFECT_CX} y={DEFECT_CY + 14} textAnchor="middle"
            fontSize="3.4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${AMBER_TEXT}0.845)`} style={{ userSelect: 'none' }}>
            THE SYMPTOM
          </text>

          {/* TESTING */}
          <rect x={500} y={198} width={148} height={BOX_H} rx={3}
            fill={`${TEAL}0.08)`} stroke={`${TEAL}0.42)`} strokeWidth={1.2} />
          <text x={TESTING_CX} y={TESTING_CY} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.4" fontFamily="var(--font-mono)" letterSpacing="0.08em" fontWeight="600"
            fill={`${TEAL_TEXT}0.954)`} style={{ userSelect: 'none' }}>
            TESTING
          </text>
        </motion.g>

        {/* REINFORCING LOOP: left arc (PRESSURE → DEBT) */}
        <motion.path d={R_LEFT_ARC} fill="none"
          stroke={`${TEAL}0.70)`} strokeWidth={1.8}
          markerEnd="url(#sm-est-arr)"
          {...drawPath(0.20, 0.60)}
        />

        {/* REINFORCING LOOP: right arc (DEBT → PRESSURE) */}
        <motion.path d={R_RIGHT_ARC} fill="none"
          stroke={`${TEAL}0.70)`} strokeWidth={1.8}
          markerEnd="url(#sm-est-arr)"
          {...drawPath(0.42, 0.60)}
        />

        {/* R1 label */}
        <motion.g {...fade(0.62)}>
          <text x={117} y={128} textAnchor="middle"
            fontSize="7.0" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
            fill={`${TEAL_TEXT}0.905)`} style={{ userSelect: 'none' }}>
            R1
          </text>
          <text x={117} y={140} textAnchor="middle"
            fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL_TEXT}0.87)`} style={{ userSelect: 'none' }}>
            REINFORCING ↗
          </text>
          {/* "+" labels on reinforcing arrows */}
          <text x={42} y={133} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)"
            fill={`${TEAL_TEXT}0.891)`} style={{ userSelect: 'none' }}>+</text>
          <text x={194} y={133} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)"
            fill={`${TEAL_TEXT}0.891)`} style={{ userSelect: 'none' }}>+</text>
        </motion.g>

        {/* BALANCING LOOP: right arc (DEFECT RATE → TESTING) */}
        <motion.path d={B_RIGHT_ARC} fill="none"
          stroke={`${TEAL}0.55)`} strokeWidth={1.5}
          markerEnd="url(#sm-est-arr)"
          {...drawPath(0.75, 0.55)}
        />

        {/* BALANCING LOOP: left arc (TESTING → DEFECT RATE, negative) */}
        <motion.path d={B_LEFT_ARC} fill="none"
          stroke={`${AMBER}0.50)`} strokeWidth={1.5}
          strokeDasharray="5 3"
          markerEnd="url(#sm-est-arr-neg)"
          {...drawPath(0.92, 0.55)}
        />

        {/* B1 label */}
        <motion.g {...fade(1.08)}>
          <text x={516} y={122} textAnchor="middle"
            fontSize="7.0" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
            fill={`${TEAL_TEXT}0.885)`} style={{ userSelect: 'none' }}>
            B1
          </text>
          <text x={516} y={134} textAnchor="middle"
            fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL_TEXT}0.853)`} style={{ userSelect: 'none' }}>
            BALANCING ↘
          </text>
          {/* "+" and "−" on balancing arrows */}
          <text x={594} y={130} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)"
            fill={`${TEAL_TEXT}0.878)`} style={{ userSelect: 'none' }}>+</text>
          <text x={484} y={130} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)"
            fill={`${AMBER_TEXT}0.845)`} style={{ userSelect: 'none' }}>−</text>
        </motion.g>

        {/* ── CROSS-ARROW (DELIVERY PRESSURE → DEFECT RATE via shortcuts, with DELAY) ── */}
        <motion.path d={CROSS_PATH} fill="none"
          stroke={`${AMBER}0.40)`} strokeWidth={1.2}
          strokeDasharray="4 3"
          markerEnd="url(#sm-est-arr-neg)"
          {...drawPath(1.18, 0.50)}
        />

        {/* Delay marker on cross-arrow */}
        <motion.g filter="url(#sm-est-amber-glow)" {...fade(1.32)}>
          <text x={299} y={46} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.04em"
            fill={`${AMBER}0.85)`} style={{ userSelect: 'none' }}>
            ⏱
          </text>
          <text x={299} y={52} textAnchor="middle"
            fontSize="3.4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER_TEXT}0.891)`} style={{ userSelect: 'none' }}>
            DELAY: MONTHS LATER
          </text>
          <text x={299} y={65} textAnchor="middle"
            fontSize="3.2" fontFamily="var(--font-mono)" letterSpacing="0.05em"
            fill={`${AMBER_TEXT}0.82)`} style={{ userSelect: 'none' }}>
            shortcuts → defects
          </text>
        </motion.g>

        {/* ── LEVERAGE POINT (the climax, glows last) ── */}
        <motion.g filter="url(#sm-est-teal-glow)" {...fade(1.50)}>
          {/* Diamond shape */}
          <path d={`M ${PRESSURE_CX},4 L ${PRESSURE_CX + 12},14 L ${PRESSURE_CX},24 L ${PRESSURE_CX - 12},14 Z`}
            fill={`${TEAL}0.20)`} stroke={`${TEAL}0.90)`} strokeWidth={1.2} />
          <text x={PRESSURE_CX} y={38} textAnchor="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL_TEXT}0.948)`} style={{ userSelect: 'none' }}>
            LEVERAGE POINT
          </text>
          {/* Tick from diamond to PRESSURE box */}
          <line x1={PRESSURE_CX} y1={24} x2={PRESSURE_CX} y2={44}
            stroke={`${TEAL}0.35)`} strokeWidth={0.6} />
        </motion.g>

        {/* ── CAPTION ── */}
        <motion.text x={SVG_W / 2} y={SVG_H - 7} textAnchor="middle" fontSize="3.8"
          fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
          {...fade(1.78)}>
          The symptom is on the right. The leverage is on the left. Nobody had tried it there.
        </motion.text>
      </svg>
    </div>
  )
}

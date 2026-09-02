'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700, SVG_H = 276

// Fork junction
const FX = 230, FY = 134

// Taken branch end (upper-right)
const TX = 452, TY = 70

// Closed branch end (lower-right)
const CX = 452, CY = 198

// Platitude fork (right section)
const PFX = 528, PFY = 134

export default function DPEstablishing() {
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
        aria-label="A decision fork. A principle sits on the incoming path before the junction. At the fork, one branch is taken (lit and open, labelled SPEED). The other branch is closed off (an X barrier in amber, labelled CLOSED · CONFIGURABILITY). On the right, a counter-example shows a platitude (BE USER-CENTRED) where both branches remain equally open, closing nothing."
        style={{ width: '100%', maxWidth: 'var(--width-illustration)', display: 'block' }}
      >
        <defs>
          <filter id="dp-est-plum-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${PLUM}0.60)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dp-est-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Arrow marker for taken branch + platitude arms */}
          <marker id="dp-est-arr" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${PLUM}0.65)`} />
          </marker>
          <marker id="dp-est-arr-dim" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${PLUM}0.32)`} />
          </marker>
        </defs>

        {/* Dark background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* ── PRINCIPLE LABEL (appears first, on the incoming path) ──
             Widened and made taller, and the detail line split in two - at an
             11pt floor the box can no longer hold three lines (one of them 38
             characters) at its original 196x34 size. The incoming path now
             runs from the box's right edge to the fork instead of underneath it. */}
        <motion.g {...fade(0.32)}>
          <rect x={14} y={88} width={210} height={72} rx={3}
            fill={`${PLUM}0.07)`} stroke={`${PLUM}0.28)`} strokeWidth={0.8} />
          <text x={119} y={104} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`${PLUM_TEXT}0.895)`} style={{ userSelect: 'none' }}>
            PRINCIPLE
          </text>
          <text x={119} y={120} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0em" fontWeight="600"
            fill={`${PLUM_TEXT}0.958)`} style={{ userSelect: 'none' }}>
            SPEED OVER CONFIGURABILITY
          </text>
          <text x={119} y={136} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill={`${PLUM_TEXT}0.882)`} style={{ userSelect: 'none' }}>
            EVEN WHEN POWER USERS
          </text>
          <text x={119} y={152} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill={`${PLUM_TEXT}0.882)`} style={{ userSelect: 'none' }}>
            ASK FOR OPTIONS
          </text>
        </motion.g>

        {/* ── INCOMING PATH ── */}
        <motion.path
          d={`M 224,${FY} L ${FX},${FY}`}
          fill="none"
          stroke={`${PLUM}0.42)`}
          strokeWidth={1.6}
          {...drawPath(0.08, 0.70)}
        />

        {/* ── JUNCTION CIRCLE ── */}
        <motion.circle
          cx={FX} cy={FY} r={5}
          fill={`${PLUM}0.18)`}
          stroke={`${PLUM}0.60)`}
          strokeWidth={1.2}
          filter="url(#dp-est-plum-glow)"
          {...fade(0.44)}
        />

        {/* ── TAKEN BRANCH (upper-right, bright plum) ── */}
        <motion.path
          d={`M ${FX},${FY} L ${TX},${TY}`}
          fill="none"
          stroke={`${PLUM}0.82)`}
          strokeWidth={2.0}
          filter="url(#dp-est-plum-glow)"
          markerEnd="url(#dp-est-arr)"
          {...drawPath(0.60, 0.55)}
        />

        {/* ── CLOSED BRANCH (lower-right, muted) ── */}
        <motion.path
          d={`M ${FX},${FY} L ${CX},${CY}`}
          fill="none"
          stroke={`${AMBER}0.28)`}
          strokeWidth={1.2}
          strokeDasharray="5 3"
          {...drawPath(0.80, 0.55)}
        />

        {/* ── X BARRIER on closed branch (the emphatic element) ── */}
        <motion.g filter="url(#dp-est-amber-glow)" {...fade(1.08)}>
          <line x1={CX - 9} y1={CY - 9} x2={CX + 9} y2={CY + 9}
            stroke={`${AMBER}0.88)`} strokeWidth={2.4} strokeLinecap="round" />
          <line x1={CX - 9} y1={CY + 9} x2={CX + 9} y2={CY - 9}
            stroke={`${AMBER}0.88)`} strokeWidth={2.4} strokeLinecap="round" />
          <circle cx={CX} cy={CY} r={13}
            fill="none" stroke={`${AMBER}0.35)`} strokeWidth={1.0} />
        </motion.g>

        {/* ── BRANCH LABELS ──
             Both flipped from start-anchored (extending right past the branch
             tip) to end-anchored (extending left, back toward the fork).
             At 11pt the old rightward placement ran straight through the
             PLATITUDE section on the other side of the divider. */}
        <motion.g {...fade(1.18)}>
          {/* Taken label */}
          <text x={TX - 12} y={TY - 10} textAnchor="end"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fontWeight="600"
            fill={`${PLUM_TEXT}0.975)`} style={{ userSelect: 'none' }}>
            TAKEN
          </text>
          <text x={TX - 12} y={TY + 8} textAnchor="end"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill={`${PLUM_TEXT}0.899)`} style={{ userSelect: 'none' }}>
            SPEED · SIMPLICITY
          </text>

          {/* Closed label */}
          <text x={CX - 22} y={CY - 8} textAnchor="end"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em" fontWeight="600"
            fill={`${AMBER}0.82)`} style={{ userSelect: 'none' }}>
            CLOSED
          </text>
          <text x={CX - 22} y={CY + 10} textAnchor="end"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill={`${AMBER_TEXT}0.845)`} style={{ userSelect: 'none' }}>
            CONFIGURABILITY
          </text>
        </motion.g>

        {/* ── DIVIDER ── */}
        <motion.line x1={472} y1={22} x2={472} y2={248}
          stroke={`${PLUM}0.10)`} strokeWidth={0.6} strokeDasharray="3 4"
          {...fade(1.30)}
        />

        {/* ── PLATITUDE COUNTER (right section) ── */}
        <motion.g {...fade(1.38)}>
          {/* Header */}
          <text x={586} y={76} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
            fill={`${AMBER_TEXT}0.876)`} style={{ userSelect: 'none' }}>
            PLATITUDE
          </text>
          <text x={586} y={94} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
            fill="rgba(255,255,255,0.675)" style={{ userSelect: 'none' }}>
            BE USER-CENTRED
          </text>

          {/* Stub + junction */}
          <line x1={484} y1={PFY} x2={PFX - 4} y2={PFY}
            stroke={`${PLUM}0.28)`} strokeWidth={1.2} />
          <circle cx={PFX} cy={PFY} r={3.5}
            fill={`${PLUM}0.10)`} stroke={`${PLUM}0.35)`} strokeWidth={0.8} />

          {/* Upper arm - lit */}
          <line x1={PFX} y1={PFY} x2={610} y2={104}
            stroke={`${PLUM}0.40)`} strokeWidth={1.4}
            markerEnd="url(#dp-est-arr-dim)" />
          {/* Lower arm - equally lit (no closure) */}
          <line x1={PFX} y1={PFY} x2={610} y2={164}
            stroke={`${PLUM}0.40)`} strokeWidth={1.4}
            markerEnd="url(#dp-est-arr-dim)" />

          {/* "CLOSES NOTHING" */}
          <text x={586} y={182} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
            fill={`${AMBER_TEXT}0.845)`} style={{ userSelect: 'none' }}>
            CLOSES NOTHING
          </text>
          <text x={586} y={200} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>
            FORK UNDECIDED
          </text>
        </motion.g>

        {/* ── CAPTION ── */}
        <motion.text x={SVG_W / 2} y={SVG_H - 10} textAnchor="middle" fontSize="11"
          fontFamily="var(--font-mono)" letterSpacing="0.02em"
          fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
          {...fade(1.65)}>
          A principle&apos;s value is in what it closes: there must be something it closes.
        </motion.text>
      </svg>
    </div>
  )
}

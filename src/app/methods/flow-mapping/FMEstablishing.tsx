'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const AMBER = 'rgba(245,158,11,'

const SVG_W = 700
const SVG_H = 276

// ── Node geometry (shared constants) ─────────────────────────────────────────

// Entry
const EN_X=10, EN_Y=110, EN_W=76, EN_H=26
const EN_CX=EN_X+EN_W/2, EN_CY=EN_Y+EN_H/2   // 48, 123

// Fork junction (visual dot where branches diverge)
const FORK_CX=112, FORK_CY=123

// Branch A: documented top path (y~36)
const A_X=192, A_Y=22, A_W=90, A_H=26
const A_CX=A_X+A_W/2, A_CY=A_Y+A_H/2         // 237, 35
const OA_X=490, OA_Y=22, OA_W=150, OA_H=26
const OA_CX=OA_X+OA_W/2, OA_CY=OA_Y+OA_H/2   // 565, 35

// Dead end off Branch A (y~75)
const DE_X=348, DE_Y=62, DE_W=106, DE_H=26
const DE_CX=DE_X+DE_W/2, DE_CY=DE_Y+DE_H/2   // 401, 75

// Branch B: documented middle path + loop (y~123)
const B_X=192, B_Y=110, B_W=90, B_H=26
const B_CX=B_X+B_W/2, B_CY=B_Y+B_H/2         // 237, 123
const B2_X=352, B2_Y=110, B2_W=90, B2_H=26
const B2_CX=B2_X+B2_W/2, B2_CY=B2_Y+B2_H/2   // 397, 123
const OB_X=490, OB_Y=110, OB_W=150, OB_H=26
const OB_CX=OB_X+OB_W/2, OB_CY=OB_Y+OB_H/2   // 565, 123

// Branch C: unintended/accreted bottom path (y~210)
const C_X=192, C_Y=200, C_W=90, C_H=26
const C_CX=C_X+C_W/2, C_CY=C_Y+C_H/2         // 237, 213
const RD_X=352, RD_Y=200, RD_W=90
const RD_CX=RD_X+RD_W/2                       // 397

const CAP_Y = SVG_H - 7

export default function FMEstablishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  const d = (base: number) => prefersReduced ? 0 : base

  return (
    <div
      className="w-full"
      aria-label="Branching flow topology: one entry point forks into three paths. Top path: SUBMIT → VALIDATE → RESOLVED (with a DEAD END branch off VALIDATE leading nowhere). Middle path: SUBMIT → PROCESS → APPROVE → COMPLETE (with a LOOP back from APPROVE to PROCESS). Bottom path (unintended, accreted): SUBMIT → ESCALATE → MANUAL STEP → COMPLETE (a redundant route to the same outcome). Pathologies marked: DEAD END, LOOP, UNINTENDED BRANCH, REDUNDANT PATH."
    >
      <svg ref={ref} viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
        style={{ display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="fm-est-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${TEAL}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="fm-est-amber" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
            <feFlood floodColor={`${AMBER}0.40)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="fm-arrow-teal" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={`${TEAL}0.55)`} />
          </marker>
          <marker id="fm-arrow-amber" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={`${AMBER}0.60)`} />
          </marker>
          <marker id="fm-arrow-loop" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse">
            <path d="M0,0 L0,6 L6,3 Z" fill={`${AMBER}0.65)`} />
          </marker>
        </defs>

        {/* ── Background ────────────────────────────────────────────── */}
        <motion.rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8}
          fill={`${TEAL}0.03)`}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.50, delay: d(0.02) }}
        />

        {/* ── ENTRY node ────────────────────────────────────────────── */}
        <motion.g
          initial={{ opacity: 0, x: -6 }}
          animate={visible ? { opacity: 1, x: 0 } : { opacity: 0, x: -6 }}
          transition={{ duration: 0.40, delay: d(0.05) }}
        >
          <rect x={EN_X} y={EN_Y} width={EN_W} height={EN_H} rx={6}
            fill={`${TEAL}0.14)`} stroke={`${TEAL}0.60)`} strokeWidth={1.5}
            filter="url(#fm-est-glow)" />
          <text x={EN_CX} y={EN_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em" fontWeight="600"
            fill={`${TEAL}0.92)`} style={{ userSelect: 'none' }}>SUBMIT</text>
        </motion.g>

        {/* ── ENTRY → FORK junction line ────────────────────────────── */}
        <motion.line
          x1={EN_CX + EN_W/2} y1={EN_CY} x2={FORK_CX} y2={FORK_CY}
          stroke={`${TEAL}0.45)`} strokeWidth={1.2}
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(0.12) }}
        />

        {/* ── FORK junction dot ─────────────────────────────────────── */}
        <motion.circle cx={FORK_CX} cy={FORK_CY} r={3.5}
          fill={`${TEAL}0.55)`}
          initial={{ opacity: 0, scale: 0 }}
          animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.25, delay: d(0.14) }}
          style={{ transformOrigin: `${FORK_CX}px ${FORK_CY}px` }}
        />

        {/* ── BRANCH A: documented top path ────────────────────────── */}
        {/* Fork → VALIDATE line */}
        <motion.line
          x1={FORK_CX} y1={FORK_CY} x2={A_X} y2={A_CY}
          stroke={`${TEAL}0.40)`} strokeWidth={1.2}
          markerEnd="url(#fm-arrow-teal)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: d(0.18) }}
        />
        {/* VALIDATE node */}
        <motion.g
          initial={{ opacity: 0, y: -4 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.35, delay: d(0.24) }}
        >
          <rect x={A_X} y={A_Y} width={A_W} height={A_H} rx={5}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.50)`} strokeWidth={1} />
          <text x={A_CX} y={A_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.85)`} style={{ userSelect: 'none' }}>VALIDATE</text>
        </motion.g>
        {/* VALIDATE → RESOLVED line */}
        <motion.line
          x1={A_CX + A_W/2} y1={A_CY} x2={OA_X} y2={OA_CY}
          stroke={`${TEAL}0.40)`} strokeWidth={1.2}
          markerEnd="url(#fm-arrow-teal)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: d(0.32) }}
        />
        {/* RESOLVED node */}
        <motion.g
          initial={{ opacity: 0, y: -4 }}
          animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
          transition={{ duration: 0.35, delay: d(0.38) }}
        >
          <rect x={OA_X} y={OA_Y} width={OA_W} height={OA_H} rx={5}
            fill={`${TEAL}0.14)`} stroke={`${TEAL}0.55)`} strokeWidth={1.2} />
          <text x={OA_CX} y={OA_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.90)`} style={{ userSelect: 'none' }}>RESOLVED ✓</text>
        </motion.g>

        {/* ── BRANCH B: documented middle path ─────────────────────── */}
        {/* Fork → PROCESS line */}
        <motion.line
          x1={FORK_CX} y1={FORK_CY} x2={B_X} y2={B_CY}
          stroke={`${TEAL}0.40)`} strokeWidth={1.2}
          markerEnd="url(#fm-arrow-teal)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: d(0.22) }}
        />
        {/* PROCESS node */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: d(0.28) }}
        >
          <rect x={B_X} y={B_Y} width={B_W} height={B_H} rx={5}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.50)`} strokeWidth={1} />
          <text x={B_CX} y={B_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.85)`} style={{ userSelect: 'none' }}>PROCESS</text>
        </motion.g>
        {/* PROCESS → APPROVE line */}
        <motion.line
          x1={B_CX + B_W/2} y1={B_CY} x2={B2_X} y2={B2_CY}
          stroke={`${TEAL}0.40)`} strokeWidth={1.2}
          markerEnd="url(#fm-arrow-teal)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(0.34) }}
        />
        {/* APPROVE node */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: d(0.40) }}
        >
          <rect x={B2_X} y={B2_Y} width={B2_W} height={B2_H} rx={5}
            fill={`${TEAL}0.10)`} stroke={`${TEAL}0.50)`} strokeWidth={1} />
          <text x={B2_CX} y={B2_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.85)`} style={{ userSelect: 'none' }}>APPROVE</text>
        </motion.g>
        {/* APPROVE → COMPLETE line */}
        <motion.line
          x1={B2_CX + B2_W/2} y1={B2_CY} x2={OB_X} y2={OB_CY}
          stroke={`${TEAL}0.40)`} strokeWidth={1.2}
          markerEnd="url(#fm-arrow-teal)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(0.46) }}
        />
        {/* COMPLETE node */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: d(0.52) }}
        >
          <rect x={OB_X} y={OB_Y} width={OB_W} height={OB_H} rx={5}
            fill={`${TEAL}0.14)`} stroke={`${TEAL}0.55)`} strokeWidth={1.2} />
          <text x={OB_CX} y={OB_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${TEAL}0.90)`} style={{ userSelect: 'none' }}>COMPLETE ✓</text>
        </motion.g>

        {/* ── PATHOLOGIES (amber, appear after documented flow) ─────── */}

        {/* DEAD END: branch off VALIDATE downward */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.40, delay: d(0.58) }}
        >
          <line x1={A_CX} y1={A_CY + A_H/2} x2={DE_CX} y2={DE_Y}
            stroke={`${AMBER}0.45)`} strokeWidth={1} strokeDasharray="4 3"
            markerEnd="url(#fm-arrow-amber)"
          />
          {/* DEAD END node */}
          <rect x={DE_X} y={DE_Y} width={DE_W} height={DE_H} rx={5}
            fill={`${AMBER}0.07)`} stroke={`${AMBER}0.42)`} strokeWidth={1}
            filter="url(#fm-est-amber)" />
          <text x={DE_CX} y={DE_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`${AMBER}0.82)`} style={{ userSelect: 'none' }}>REVIEW QUEUE</text>
          {/* Dead end X marker */}
          <text x={DE_X + DE_W + 8} y={DE_CY + 1}
            textAnchor="start" dominantBaseline="middle"
            fontSize="6" fontFamily="var(--font-mono)"
            fill={`${AMBER}0.72)`} style={{ userSelect: 'none' }}>✕</text>
          <text x={DE_X + DE_W + 17} y={DE_CY + 1}
            textAnchor="start" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${AMBER}0.55)`} style={{ userSelect: 'none' }}>DEAD END</text>
        </motion.g>

        {/* LOOP: arc from APPROVE bottom back to PROCESS bottom */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.45, delay: d(0.66) }}
        >
          <path
            d={`M ${B2_CX},${B2_CY + B2_H/2} C ${B2_CX},${B2_CY + 58} ${B_CX},${B_CY + 58} ${B_CX},${B_CY + B_H/2}`}
            fill="none" stroke={`${AMBER}0.45)`} strokeWidth={1} strokeDasharray="4 3"
            markerEnd="url(#fm-arrow-loop)"
          />
          <text x={(B_CX + B2_CX) / 2} y={B_CY + 73}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${AMBER}0.60)`} style={{ userSelect: 'none' }}>↺ LOOP</text>
        </motion.g>

        {/* UNINTENDED BRANCH: fork → ESCALATE (accreted, bottom) */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.40, delay: d(0.74) }}
        >
          <line x1={FORK_CX} y1={FORK_CY} x2={C_X} y2={C_CY}
            stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
            markerEnd="url(#fm-arrow-amber)"
          />
          {/* Unintended branch label near the diagonal */}
          <text x={FORK_CX + 14} y={(FORK_CY + C_CY) / 2 + 2}
            textAnchor="start" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER}0.45)`} style={{ userSelect: 'none' }}>⊘ UNINTENDED</text>
          {/* ESCALATE node */}
          <rect x={C_X} y={C_Y} width={C_W} height={C_W - 64} rx={5}
            fill={`${AMBER}0.07)`} stroke={`${AMBER}0.38)`} strokeWidth={1}
            strokeDasharray="5 3" filter="url(#fm-est-amber)" />
          <text x={C_CX} y={C_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>ESCALATE</text>
        </motion.g>

        {/* REDUNDANT PATH: ESCALATE → MANUAL STEP → COMPLETE */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.40, delay: d(0.82) }}
        >
          <line x1={C_CX + C_W/2} y1={C_CY} x2={RD_X} y2={C_CY}
            stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
            markerEnd="url(#fm-arrow-amber)"
          />
          {/* MANUAL STEP node */}
          <rect x={RD_X} y={RD_Y} width={RD_W} height={RD_W - 64} rx={5}
            fill={`${AMBER}0.07)`} stroke={`${AMBER}0.38)`} strokeWidth={1}
            strokeDasharray="5 3" />
          <text x={RD_CX} y={C_CY + 1}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>MANUAL STEP</text>
          {/* MANUAL STEP → COMPLETE diagonal (redundant path) */}
          <line x1={RD_CX + RD_W/2} y1={C_CY} x2={OB_X + 20} y2={OB_CY + OB_H/2}
            stroke={`${AMBER}0.38)`} strokeWidth={1} strokeDasharray="5 3"
            markerEnd="url(#fm-arrow-amber)"
          />
          {/* Redundant label */}
          <text x={(RD_CX + RD_W/2 + OB_X + 20) / 2 + 10} y={(C_CY + OB_CY + OB_H/2) / 2}
            textAnchor="start" dominantBaseline="middle"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${AMBER}0.45)`} style={{ userSelect: 'none' }}>≡ REDUNDANT</text>
        </motion.g>

        {/* ── Caption ───────────────────────────────────────────────── */}
        <motion.text x={SVG_W / 2} y={CAP_Y}
          textAnchor="middle"
          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.14)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.30, delay: d(1.00) }}
          style={{ userSelect: 'none' }}
        >EVERY PATH TRACED · SPRAWL MADE VISIBLE · PATHOLOGIES NAMED</motion.text>
      </svg>
    </div>
  )
}

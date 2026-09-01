'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700
const SVG_H = 295

// Bar geometry
const BAR_W   = 90
const BASE_Y  = 248

// STATED bar - AMBER (warm, misleading stated interest)
const S_CX  = 195
const S_L   = 150   // S_CX - BAR_W/2
const S_H   = 160   // ~76% of illustrative max
const S_TOP = 88    // BASE_Y - S_H

// REVEALED bar - PLUM (honest commitment)
const R_CX  = 435
const R_L   = 390   // R_CX - BAR_W/2
const R_H   = 60    // ~28% of illustrative max
const R_TOP = 188   // BASE_Y - R_H

// THRESHOLD line - white (pre-set, at ~40%)
const TH_Y  = 168   // 80px from base; S_H(160)>80 ✓, R_H(60)<80 ✓

// Gap zone center
const GAP_CX = 315

export default function CTEstablishing() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (inView || prefersReduced) setShow(true)
  }, [inView, prefersReduced])

  const dur = (d: number) => prefersReduced ? 0 : d
  const del = (d: number) => prefersReduced ? 0 : d

  return (
    <div ref={ref} className="w-full">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        className="w-full"
        style={{ maxWidth: 'var(--width-illustration)', maxHeight: 310 }}
        role="img"
        aria-label="Stated-vs-revealed gap: a tall bar showing 76% stated interest, a shorter bar showing 28% revealed commitment, and a threshold line at 40% that the revealed bar fails to clear"
      >
        <defs>
          <filter id="ct-est-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ct-est-glow-sm" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Base axis */}
        <line x1={100} y1={BASE_Y} x2={580} y2={BASE_Y}
          stroke="rgba(255,255,255,0.12)" strokeWidth={1} />

        {/* ── STATED BAR (AMBER) ─────────────────────────────── */}
        {/* Bar background track */}
        <rect x={S_L} y={S_TOP} width={BAR_W} height={S_H} rx={4}
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

        {/* Animated stated bar */}
        <motion.rect
          x={S_L} width={BAR_W} rx={4}
          fill={`${AMBER}0.22)`}
          stroke={`${AMBER}0.60)`}
          strokeWidth={1.5}
          filter="url(#ct-est-glow-sm)"
          initial={{ height: 0, y: BASE_Y }}
          animate={show ? { height: S_H, y: S_TOP } : { height: 0, y: BASE_Y }}
          transition={{ duration: dur(0.68), delay: del(0.10) }}
        />

        {/* Percentage label */}
        <motion.text
          x={S_CX} y={S_TOP - 10}
          textAnchor="middle"
          fill={`${AMBER}0.85)`}
          fontSize={14} fontWeight={600} fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: dur(0.3), delay: del(0.55) }}
        >76%</motion.text>

        {/* Stated label above bar */}
        <text x={S_CX} y={38} textAnchor="middle"
          fill="rgba(255,255,255,0.65)" fontSize={8} fontWeight={600}
          letterSpacing={1.4} fontFamily="monospace">STATED</text>
        <text x={S_CX} y={52} textAnchor="middle"
          fill="rgba(255,255,255,0.64)" fontSize={6.5} fontFamily="monospace"
          letterSpacing={0.8}>What people say</text>

        {/* Below-bar label */}
        <text x={S_CX} y={BASE_Y + 14} textAnchor="middle"
          fill={`${AMBER_TEXT}0.861)`} fontSize={6.5} fontFamily="monospace"
          letterSpacing={0.6}>Stated preference</text>

        {/* ── REVEALED BAR (PLUM) ───────────────────────────── */}
        {/* Bar background track */}
        <rect x={R_L} y={S_TOP} width={BAR_W} height={S_H} rx={4}
          fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />

        {/* Animated revealed bar */}
        <motion.rect
          x={R_L} width={BAR_W} rx={4}
          fill={`${PLUM}0.35)`}
          stroke={`${PLUM}0.72)`}
          strokeWidth={1.5}
          filter="url(#ct-est-glow)"
          initial={{ height: 0, y: BASE_Y }}
          animate={show ? { height: R_H, y: R_TOP } : { height: 0, y: BASE_Y }}
          transition={{ duration: dur(0.60), delay: del(0.38) }}
        />

        {/* Percentage label */}
        <motion.text
          x={R_CX} y={R_TOP - 10}
          textAnchor="middle"
          fill={`${PLUM_TEXT}0.979)`}
          fontSize={14} fontWeight={600} fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: dur(0.3), delay: del(0.80) }}
        >28%</motion.text>

        {/* Revealed label above track */}
        <text x={R_CX} y={38} textAnchor="middle"
          fill="rgba(255,255,255,0.65)" fontSize={8} fontWeight={600}
          letterSpacing={1.4} fontFamily="monospace">REVEALED</text>
        <text x={R_CX} y={52} textAnchor="middle"
          fill="rgba(255,255,255,0.64)" fontSize={6.5} fontFamily="monospace"
          letterSpacing={0.8}>What people do</text>

        {/* Below-bar label */}
        <text x={R_CX} y={BASE_Y + 14} textAnchor="middle"
          fill={`${PLUM_TEXT}0.905)`} fontSize={6.5} fontFamily="monospace"
          letterSpacing={0.6}>Revealed commitment</text>

        {/* ── THRESHOLD LINE ────────────────────────────────── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: dur(0.40), delay: del(0.68) }}
        >
          {/* Main threshold line */}
          <line x1={105} y1={TH_Y} x2={540} y2={TH_Y}
            stroke="rgba(255,255,255,0.55)" strokeWidth={1.5}
            strokeDasharray="6 4" />

          {/* Threshold label block (right side) */}
          <text x={548} y={TH_Y - 6}
            fill="rgba(255,255,255,0.70)" fontSize={7.5} fontWeight={600}
            letterSpacing={1.2} fontFamily="monospace">SUCCESS THRESHOLD</text>
          <text x={548} y={TH_Y + 5}
            fill="rgba(255,255,255,0.675)" fontSize={6.5} fontFamily="monospace"
            letterSpacing={0.8}>SET IN ADVANCE · 40%</text>

          {/* Small tick marks at bars */}
          <line x1={S_L - 4} y1={TH_Y} x2={S_L + BAR_W + 4} y2={TH_Y}
            stroke={`${AMBER}0.40)`} strokeWidth={2} />
          <line x1={R_L - 4} y1={TH_Y} x2={R_L + BAR_W + 4} y2={TH_Y}
            stroke={`${PLUM}0.50)`} strokeWidth={2} />
        </motion.g>

        {/* ── GAP ANNOTATION ────────────────────────────────── */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: dur(0.35), delay: del(0.88) }}
        >
          {/* Gap bracket vertical line */}
          <line x1={GAP_CX} y1={S_TOP + 6} x2={GAP_CX} y2={R_TOP - 6}
            stroke="rgba(255,255,255,0.14)" strokeWidth={1} strokeDasharray="3 3" />
          {/* Top tick */}
          <line x1={GAP_CX - 6} y1={S_TOP + 6} x2={GAP_CX + 6} y2={S_TOP + 6}
            stroke="rgba(255,255,255,0.18)" strokeWidth={1} />
          {/* Bottom tick */}
          <line x1={GAP_CX - 6} y1={R_TOP - 6} x2={GAP_CX + 6} y2={R_TOP - 6}
            stroke="rgba(255,255,255,0.18)" strokeWidth={1} />

          {/* Gap label */}
          <text x={GAP_CX} y={136} textAnchor="middle"
            fill="rgba(255,255,255,0.675)" fontSize={7} fontWeight={600}
            letterSpacing={1.2} fontFamily="monospace">STATED vs</text>
          <text x={GAP_CX} y={147} textAnchor="middle"
            fill="rgba(255,255,255,0.675)" fontSize={7} fontWeight={600}
            letterSpacing={1.2} fontFamily="monospace">REVEALED GAP</text>

          {/* Verdict badge near revealed bar */}
          <rect x={R_L - 4} y={R_TOP - 26} width={BAR_W + 8} height={18} rx={3}
            fill="rgba(245,158,11,0.10)" stroke="rgba(245,158,11,0.28)" strokeWidth={1} />
          <text x={R_CX} y={R_TOP - 13} textAnchor="middle"
            fill="rgba(245,158,11,0.70)" fontSize={6.5} fontWeight={600}
            letterSpacing={1.0} fontFamily="monospace">× BELOW THRESHOLD</text>
        </motion.g>

        {/* Caption */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 6}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)" fontSize={6.5} fontFamily="monospace"
          letterSpacing={0.8}
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: dur(0.3), delay: del(1.0) }}
        >
          stated interest is almost always high · revealed commitment is where the truth lives · the threshold is drawn in advance
        </motion.text>
      </svg>
    </div>
  )
}

'use client'
import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'

const CLAY = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY

const SVG_W = 700
const SVG_H = 280

// Origin: where the two axes meet (lower-left area)
const ORG_X = 190
const ORG_Y = 200

// ANALOGS axis: horizontal, extending RIGHT (across industries)
const AX_END = 672

// PRECURSORS axis: vertical, extending UPWARD (back through time).
// Pushed down from the very top of the canvas to leave room for its
// two-line label above the arrow tip.
const PR_END_Y = 48

const ANALOG_PTS = [
  { x: 318, label: 'HOTEL',    sub: 'hospitality' },
  { x: 450, label: 'AIRPORT',  sub: 'transit flow' },
  { x: 578, label: 'PIT CREW', sub: 'fast handoff' },
] as const

const PRECUR_PTS = [
  { y: 168, label: 'EARLY VERSION', sub: '~10 YRS AGO' },
  { y: 128, label: 'PRIOR ART',     sub: '~20 YRS AGO' },
  { y: 88,  label: 'ANTECEDENT',    sub: '~35 YRS AGO' },
] as const

export default function APEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease = [0.16, 1, 0.3, 1] as const

  const fade  = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const scale = {
    hidden:  { opacity: 0, scale: 0.75 },
    visible: { opacity: 1, scale: 1 },
  }

  const container = {
    hidden: {},
    visible: {
      transition: prefersReduced ? {} : { staggerChildren: 0.07, delayChildren: 0.05 },
    },
  }

  const axT  = prefersReduced ? { duration: 0 } : { duration: 0.55, ease }
  const ptT  = prefersReduced ? { duration: 0 } : { duration: 0.40, ease }
  const lblT = prefersReduced ? { duration: 0 } : { duration: 0.35, ease }

  return (
    <motion.div
      className="w-full flex justify-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={container}
      aria-label="Two-axis search space diagram: horizontal axis extends right for Analogs (across industries), vertical axis extends upward for Precursors (back through time). Hotel, Airport, and Pit Crew on the analog axis; Early Version, Prior Art, and Antecedent on the precursor axis. Axes intersect at the Current Problem origin."
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="ap-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ap-est-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── ANALOGS AXIS (horizontal, right) ── */}
        <motion.g variants={fade} transition={axT}>
          <line
            x1={ORG_X} y1={ORG_Y} x2={AX_END} y2={ORG_Y}
            stroke={`${CLAY}0.55)`} strokeWidth={1.5}
            filter="url(#ap-est-glow-sm)"
          />
          {/* Arrowhead */}
          <path
            d={`M ${AX_END - 7} ${ORG_Y - 5} L ${AX_END + 1} ${ORG_Y} L ${AX_END - 7} ${ORG_Y + 5}`}
            stroke={`${CLAY}0.55)`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </motion.g>

        {/* Analogs axis label — below the line, right-aligned to the arrow tip
            so it never overlaps the rightmost point's label above the line */}
        <motion.g variants={fade} transition={lblT}>
          <text
            x={AX_END} y={ORG_Y + 20}
            textAnchor="end" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={`${CLAY_TEXT}0.948)`}
            style={{ userSelect: 'none' }}
          >ANALOGS →</text>
          <text
            x={AX_END} y={ORG_Y + 36}
            textAnchor="end" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
            fill={`${CLAY_TEXT}0.878)`}
            style={{ userSelect: 'none' }}
          >across industries</text>
        </motion.g>

        {/* ── PRECURSORS AXIS (vertical, up = back in time) ── */}
        <motion.g variants={fade} transition={axT}>
          <line
            x1={ORG_X} y1={ORG_Y} x2={ORG_X} y2={PR_END_Y}
            stroke="rgba(255,255,255,0.38)" strokeWidth={1.5}
            filter="url(#ap-est-glow-sm)"
          />
          {/* Arrowhead */}
          <path
            d={`M ${ORG_X - 5} ${PR_END_Y + 9} L ${ORG_X} ${PR_END_Y + 1} L ${ORG_X + 5} ${PR_END_Y + 9}`}
            stroke="rgba(255,255,255,0.38)" strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round"
          />
        </motion.g>

        {/* Precursors axis label (horizontal text above the arrow tip) */}
        <motion.g variants={fade} transition={lblT}>
          <text
            x={ORG_X} y={PR_END_Y - 26}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill="rgba(255,255,255,0.71)"
            style={{ userSelect: 'none' }}
          >PRECURSORS</text>
          <text
            x={ORG_X} y={PR_END_Y - 9}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill="rgba(255,255,255,0.62)"
            style={{ userSelect: 'none' }}
          >↑ BACK THROUGH TIME</text>
        </motion.g>

        {/* ── ORIGIN ── */}
        <motion.g
          variants={scale}
          transition={ptT}
          style={{ transformOrigin: `${ORG_X}px ${ORG_Y}px` } as React.CSSProperties}
        >
          <circle
            cx={ORG_X} cy={ORG_Y} r={7}
            fill={`${CLAY}0.18)`}
            stroke={`${CLAY}0.90)`}
            strokeWidth={2}
            filter="url(#ap-est-glow)"
          />
          <text
            x={ORG_X} y={ORG_Y + 20}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`${CLAY_TEXT}0.979)`}
            style={{ userSelect: 'none' }}
          >CURRENT PROBLEM</text>
          <text
            x={ORG_X} y={ORG_Y + 36}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)"
            fill={`${CLAY_TEXT}0.891)`}
            style={{ userSelect: 'none' }}
          >here &amp; now</text>
        </motion.g>

        {/* ── ANALOG POINTS ── */}
        {ANALOG_PTS.map((pt, i) => (
          <motion.g
            key={pt.label}
            variants={scale}
            transition={{ ...ptT, delay: prefersReduced ? 0 : 0.10 + i * 0.09 }}
            style={{ transformOrigin: `${pt.x}px ${ORG_Y}px` } as React.CSSProperties}
          >
            <circle
              cx={pt.x} cy={ORG_Y} r={5}
              fill={`${CLAY}0.12)`}
              stroke={`${CLAY}0.70)`}
              strokeWidth={1.5}
              filter="url(#ap-est-glow-sm)"
            />
            <text
              x={pt.x} y={ORG_Y - 12}
              textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={`${CLAY_TEXT}0.962)`}
              style={{ userSelect: 'none' }}
            >{pt.label}</text>
            <text
              x={pt.x} y={ORG_Y - 28}
              textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)"
              fill={`${CLAY_TEXT}0.882)`}
              style={{ userSelect: 'none' }}
            >{pt.sub}</text>
          </motion.g>
        ))}

        {/* ── PRECURSOR POINTS ── */}
        {PRECUR_PTS.map((pt, i) => (
          <motion.g
            key={pt.label}
            variants={scale}
            transition={{ ...ptT, delay: prefersReduced ? 0 : 0.18 + i * 0.09 }}
            style={{ transformOrigin: `${ORG_X}px ${pt.y}px` } as React.CSSProperties}
          >
            <circle
              cx={ORG_X} cy={pt.y} r={5}
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.50)"
              strokeWidth={1.5}
              filter="url(#ap-est-glow-sm)"
            />
            {/* Labels to the left of the circle */}
            <text
              x={ORG_X - 16} y={pt.y - 8}
              textAnchor="end" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
              fill="rgba(255,255,255,0.58)"
              style={{ userSelect: 'none' }}
            >{pt.label}</text>
            <text
              x={ORG_X - 16} y={pt.y + 8}
              textAnchor="end" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)"
              fill="rgba(255,255,255,0.64)"
              style={{ userSelect: 'none' }}
            >{pt.sub}</text>
          </motion.g>
        ))}

        {/* Caption */}
        <motion.g
          variants={fade}
          transition={{ ...lblT, delay: prefersReduced ? 0 : 0.65 }}
        >
          <text
            x={SVG_W / 2} y={SVG_H - 8}
            textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
            fill="rgba(255,255,255,0.58)"
            style={{ userSelect: 'none' }}
          >two perpendicular search directions · right for analogs · up for precursors</text>
        </motion.g>
      </svg>
    </motion.div>
  )
}

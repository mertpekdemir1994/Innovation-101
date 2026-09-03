'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM

// Grid geometry — width stretched (400→900, 2.25x) to give the hero a
// cinematic ~2.35:1 frame. This is a genuine 2D coordinate field (both
// axes run Existing→New), not a fixed shape, so the zone ellipses' cx and
// rx were scaled by the same 2.25x to preserve their relative position and
// overlap along the diagonal; cy/ry (the vertical dimension) are untouched.
const GX = 80, GY = 40, GW = 900, GH = 340
const GR = GX + GW   // 980
const GB = GY + GH   // 380
const MX = GX + GW / 2  // 530
const MY = GY + GH / 2  // 210

// Three zones along the bottom-left → top-right diagonal
const ZONES = [
  { id: 'core',             label: 'CORE',            cx: 271, cy: 308, rx: 185, ry: 64 },
  { id: 'adjacent',         label: 'ADJACENT',         cx: 530, cy: 210, rx: 230, ry: 74 },
  { id: 'transformational', label: 'TRANSFORMATIONAL', cx: 787, cy: 112, rx: 185, ry: 62 },
]

export default function AMEstablishing() {
  const prefersReduced = useReducedMotion()

  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const fade    = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const scaleIn = { hidden: { opacity: 0, scale: 0.82 }, visible: { opacity: 1, scale: 1 } }
  const container = {
    hidden:  {},
    visible: { transition: prefersReduced ? {} : { staggerChildren: 0.16, delayChildren: 0.08 } },
  }
  const zoneT = prefersReduced ? { duration: 0 } : { duration: 0.55, ease }
  const gridT = prefersReduced ? { duration: 0 } : { duration: 0.7, ease }

  return (
    <motion.div
      className="w-full flex justify-center select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1060 450" width="100%" style={{ margin: '0 auto', display: 'block', overflow: 'visible' }}>
        <defs>
          <filter id="am-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="am-est-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6B4A77" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#6B4A77" stopOpacity="0.04" />
          </linearGradient>
        </defs>

        {/* Ambient plum wash */}
        <motion.ellipse
          cx={MX} cy={MY} rx={454} ry={190}
          fill={`${PLUM}0.05)`}
          variants={fade} transition={gridT}
        />

        {/* Grid background */}
        <motion.rect
          x={GX} y={GY} width={GW} height={GH}
          fill="url(#am-est-grad)"
          stroke={`${PLUM}0.28)`} strokeWidth={1} rx={2}
          variants={fade} transition={gridT}
        />

        {/* Quadrant dividers - subtle dashed */}
        <motion.line
          x1={MX} y1={GY} x2={MX} y2={GB}
          stroke="rgba(255,255,255,0.09)" strokeWidth={1} strokeDasharray="4 5"
          variants={fade} transition={gridT}
        />
        <motion.line
          x1={GX} y1={MY} x2={GR} y2={MY}
          stroke="rgba(255,255,255,0.09)" strokeWidth={1} strokeDasharray="4 5"
          variants={fade} transition={gridT}
        />

        {/* Zone ellipses + labels */}
        {ZONES.map((z) => (
          <motion.g
            key={z.id}
            variants={scaleIn}
            transition={zoneT}
            style={{ transformOrigin: `${z.cx}px ${z.cy}px` } as React.CSSProperties}
          >
            <ellipse
              cx={z.cx} cy={z.cy} rx={z.rx} ry={z.ry}
              fill={`${PLUM}0.14)`}
              stroke={`${PLUM}0.60)`} strokeWidth={1.5}
              filter="url(#am-est-glow)"
            />
            <text
              x={z.cx} y={z.cy + 4}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="9"
              fontFamily="var(--font-mono)"
              letterSpacing="0.12em"
              fill={`${PLUM_TEXT}0.979)`}
              style={{ userSelect: 'none' }}
            >{z.label}</text>
          </motion.g>
        ))}

        {/* ── Axis labels ── */}
        {/* X axis tick labels */}
        <motion.text
          x={GX} y={GB + 22} textAnchor="start"
          fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.64)" style={{ userSelect: 'none' }}
          variants={fade} transition={gridT}
        >EXISTING</motion.text>
        <motion.text
          x={GR} y={GB + 22} textAnchor="end"
          fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.64)" style={{ userSelect: 'none' }}
          variants={fade} transition={gridT}
        >NEW</motion.text>
        {/* X-axis title */}
        <motion.text
          x={MX} y={GB + 40} textAnchor="middle"
          fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}
          variants={fade} transition={gridT}
        >MARKET / CUSTOMER →</motion.text>

        {/* Y axis tick labels */}
        <motion.text
          x={GX - 8} y={GB} textAnchor="end"
          fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.64)" style={{ userSelect: 'none' }}
          variants={fade} transition={gridT}
        >EXISTING</motion.text>
        <motion.text
          x={GX - 8} y={GY + 6} textAnchor="end"
          fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.64)" style={{ userSelect: 'none' }}
          variants={fade} transition={gridT}
        >NEW</motion.text>
        {/* Y-axis title (rotated) */}
        <motion.text
          transform={`translate(28, ${MY}) rotate(-90)`}
          textAnchor="middle"
          fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}
          variants={fade} transition={gridT}
        >↑ OFFERING / PRODUCT</motion.text>
      </svg>
    </motion.div>
  )
}

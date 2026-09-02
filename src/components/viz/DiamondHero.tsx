'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Purely decorative animated diamond for hero sections.
// No interaction — only draws itself in on mount.
export default function DiamondHero({ className = '' }: { className?: string }) {
  const prefersReduced = useReducedMotion()

  const PURPLE = 'rgba(124, 58, 237,'
  const transition = (delay: number, dur = 0.9) => ({
    duration: prefersReduced ? 0.01 : dur,
    delay: prefersReduced ? 0 : delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  })

  return (
    <svg
      viewBox="0 0 800 240"
      className={`w-full ${className}`}
      role="img"
      aria-label="Double Diamond diagram"
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Glow filter */}
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Left diamond gradient */}
        <linearGradient id="leftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.08" />
        </linearGradient>

        {/* Right diamond gradient */}
        <linearGradient id="rightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      {/* ── Vertical dividers — phase split lines ────── */}
      {[{ x: 200, delay: 0.25 }, { x: 600, delay: 0.30 }].map(({ x, delay }) => (
        <motion.line
          key={x}
          x1={x} y1="0" x2={x} y2="240"
          stroke={`${PURPLE} 0.15)`}
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={transition(delay, 0.7)}
        />
      ))}

      {/* ── Left diamond fill ────────────────────────── */}
      <motion.path
        d="M 0 120 L 200 0 L 400 120 L 200 240 Z"
        fill="url(#leftGrad)"
        stroke={`${PURPLE} 0.45)`}
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transition(0.2)}
        style={{ transformOrigin: '200px 120px' }}
        filter="url(#glow)"
      />

      {/* ── Right diamond fill ───────────────────────── */}
      <motion.path
        d="M 400 120 L 600 0 L 800 120 L 600 240 Z"
        fill="url(#rightGrad)"
        stroke={`${PURPLE} 0.45)`}
        strokeWidth="1.5"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={transition(0.35)}
        style={{ transformOrigin: '600px 120px' }}
        filter="url(#glow)"
      />

      {/* ── Phase labels ─────────────────────────────── */}
      {[
        { x: 133, y: 120, label: 'Discover', delay: 0.5 },
        { x: 267, y: 120, label: 'Define',   delay: 0.6 },
        { x: 533, y: 120, label: 'Develop',  delay: 0.7 },
        { x: 667, y: 120, label: 'Deliver',  delay: 0.8 },
      ].map(({ x, y, label, delay }) => (
        <motion.text
          key={label}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="13"
          fontFamily="var(--font-mono)"
          fontWeight="500"
          letterSpacing="0.1em"
          textDecoration="none"
          fill="rgba(255,255,255,0.55)"
          style={{ userSelect: 'none', textTransform: 'uppercase' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition(delay, 0.5)}
        >
          {label}
        </motion.text>
      ))}

      {/* ── Convergence point dots ───────────────────── */}
      {[
        { cx: 0,   delay: 0.3 },
        { cx: 400, delay: 0.4 },
        { cx: 800, delay: 0.5 },
      ].map(({ cx, delay }) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={120}
          r={cx === 400 ? 5 : 3}
          fill="#7C3AED"
          opacity={0.8}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.8 }}
          transition={transition(delay, 0.4)}
          style={{ transformOrigin: `${cx}px 120px` }}
          filter="url(#glow)"
        />
      ))}

      {/* ── Axis labels ──────────────────────────────── */}
      {[
        { x: 8,   anchor: 'start',  label: 'Problem' },
        { x: 400, anchor: 'middle', label: 'Insight' },
        { x: 792, anchor: 'end',    label: 'Solution' },
      ].map(({ x, anchor, label }) => (
        <motion.text
          key={label}
          x={x}
          y={232}
          textAnchor={anchor as 'start' | 'middle' | 'end'}
          fontSize="13"
          fontFamily="var(--font-mono)"
          letterSpacing="0.12em"
          fill="rgba(255,255,255,0.625)"
          style={{ userSelect: 'none', textTransform: 'uppercase' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={transition(0.9, 0.5)}
        >
          {label}
        </motion.text>
      ))}
    </svg>
  )
}

'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PURPLE = 'rgba(124,58,237,'
const PURPLE_TEXT = 'rgba(173,132,244,'  // brightened text-safe variant of PURPLE

const NODES = [
  { id: 'build',   label: 'Build',   angle: -90, desc: 'Ideas → Product' },
  { id: 'measure', label: 'Measure', angle: 30,  desc: 'Product → Data'  },
  { id: 'learn',   label: 'Learn',   angle: 150, desc: 'Data → Learning' },
]

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export default function LSLoopHero() {
  const prefersReduced = useReducedMotion()
  const cx = 300
  const cy = 260
  const r  = 175
  const nodeR = 32

  const nodePositions = NODES.map((n) => ({ ...n, ...polarToXY(cx, cy, r, n.angle) }))

  const forkY  = cy + r + 54
  const leftX  = cx - 76
  const rightX = cx + 76

  return (
    <div className="w-full flex justify-center items-center py-space-6 select-none" aria-hidden="true">
      <svg
        viewBox="0 0 600 560"
        width="100%"
        style={{ maxWidth: 640 }}
        className="overflow-visible"
      >
        {/* Outer glow ring */}
        <motion.circle
          cx={cx} cy={cy} r={r + 44}
          fill="none" stroke={`${PURPLE}0.06)`} strokeWidth={44}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />

        {/* Main loop ring */}
        <motion.circle
          cx={cx} cy={cy} r={r}
          fill="none" stroke={`${PURPLE}0.25)`} strokeWidth={2.5} strokeDasharray="8 5"
          initial={prefersReduced ? {} : { pathLength: 0, opacity: 0 }}
          animate={prefersReduced ? {} : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
        />

        {/* Directional arrow ticks on ring */}
        {[0, 120, 240].map((angleDeg, i) => {
          const { x, y } = polarToXY(cx, cy, r, angleDeg)
          const tangentAngle = angleDeg + 90
          const rad = (tangentAngle * Math.PI) / 180
          const tx = Math.cos(rad) * 10
          const ty = Math.sin(rad) * 10
          return (
            <motion.line key={i}
              x1={x - tx * 0.5} y1={y - ty * 0.5}
              x2={x + tx * 0.5} y2={y + ty * 0.5}
              stroke={`${PURPLE}0.35)`} strokeWidth={2.5} strokeLinecap="round"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={prefersReduced ? {} : { opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.12 }}
            />
          )
        })}

        {/* Center labels */}
        <motion.text x={cx} y={cy - 12} textAnchor="middle"
          fill={`${PURPLE}0.50)`} fontSize="15" fontFamily="ui-monospace, monospace"
          letterSpacing="0.12em" style={{ textTransform: 'uppercase' }}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          BUILD
        </motion.text>
        <motion.text x={cx} y={cy + 7} textAnchor="middle"
          fill={`${PURPLE}0.25)`} fontSize="12" fontFamily="ui-monospace, monospace"
          letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ delay: 1.05 }}
        >
          MEASURE
        </motion.text>
        <motion.text x={cx} y={cy + 26} textAnchor="middle"
          fill={`${PURPLE}0.15)`} fontSize="12" fontFamily="ui-monospace, monospace"
          letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          LEARN
        </motion.text>

        {/* Node circles */}
        {nodePositions.map((node, i) => (
          <motion.g key={node.id}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.5 }}
            animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + i * 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {/* Outer halo */}
            <circle cx={node.x} cy={node.y} r={nodeR + 10} fill={`${PURPLE}0.06)`} />
            {/* Main circle */}
            <circle cx={node.x} cy={node.y} r={nodeR}
              fill={`${PURPLE}0.12)`} stroke={`${PURPLE}0.35)`} strokeWidth={2}
            />
            {/* Label */}
            <text x={node.x} y={node.y + 1}
              textAnchor="middle" dominantBaseline="middle"
              fill={`${PURPLE_TEXT}0.981)`} fontSize="16" fontWeight="600"
              fontFamily="ui-monospace, monospace" letterSpacing="0.08em"
              style={{ textTransform: 'uppercase' }}
            >
              {node.label}
            </text>
          </motion.g>
        ))}

        {/* Pivot / Persevere fork */}
        <motion.g
          initial={prefersReduced ? {} : { opacity: 0, y: 8 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          {/* Stem */}
          <line x1={cx} y1={cy + r + 2} x2={cx} y2={forkY - 18}
            stroke={`${PURPLE}0.20)`} strokeWidth={2} strokeDasharray="4 4"
          />
          {/* Left arm */}
          <line x1={cx} y1={forkY - 18} x2={leftX} y2={forkY}
            stroke={`${PURPLE}0.20)`} strokeWidth={2}
          />
          {/* Right arm */}
          <line x1={cx} y1={forkY - 18} x2={rightX} y2={forkY}
            stroke={`${PURPLE}0.20)`} strokeWidth={2}
          />
          <text x={leftX} y={forkY + 18}
            textAnchor="middle" fill={`${PURPLE_TEXT}0.915)`} fontSize="13"
            fontFamily="ui-monospace, monospace" letterSpacing="0.1em"
            style={{ textTransform: 'uppercase' }}
          >
            Pivot
          </text>
          <text x={rightX} y={forkY + 18}
            textAnchor="middle" fill={`${PURPLE_TEXT}0.877)`} fontSize="13"
            fontFamily="ui-monospace, monospace" letterSpacing="0.1em"
            style={{ textTransform: 'uppercase' }}
          >
            Persevere
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

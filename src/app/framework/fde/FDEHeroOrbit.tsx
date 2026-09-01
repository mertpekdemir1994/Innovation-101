'use client'

import { motion, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(185,28,28,'
const BRICK_TEXT = 'rgba(216,129,129,'  // brightened text-safe variant of BRICK

const MOVEMENTS = [
  { id: 'embed',   n: '01', short: 'EMBED',   full: 'Embed',            verb: 'Live with the customer',      angle: 0   },
  { id: 'build',   n: '02', short: 'BUILD',   full: 'Build in Context', verb: 'Field is R&D, not COGS',      angle: 90  },
  { id: 'extract', n: '03', short: 'EXTRACT', full: 'Extract',          verb: 'Find the generalizable pattern', angle: 180 },
  { id: 'migrate', n: '04', short: 'MIGRATE', full: 'Migrate to Core',  verb: 'Enrich the platform',         angle: 270 },
]

const TICK_ANGLES = [45, 135, 225, 315]

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function anchor(angle: number): 'middle' | 'start' | 'end' {
  const a = ((angle % 360) + 360) % 360
  if (a < 45 || a > 315) return 'middle'
  if (a >= 135 && a <= 225) return 'middle'
  return a < 180 ? 'start' : 'end'
}

export default function FDEHeroOrbit() {
  const prefersReduced = useReducedMotion()

  const cx = 480, cy = 340
  const r  = 178, nodeR = 44, labelR = r + nodeR + 85   // 307

  return (
    <div className="w-full flex justify-center items-center py-space-4 select-none" aria-hidden="true">
      <svg viewBox="0 0 960 680" width="100%" style={{ maxWidth: 960 }} className="overflow-visible">

        {/* Outer glow */}
        <circle cx={cx} cy={cy} r={r + 48}
          fill="none" stroke={`${BRICK}0.06)`} strokeWidth={48}
        />

        {/* Dashed ring */}
        <motion.circle cx={cx} cy={cy} r={r}
          fill="none" stroke={`${BRICK}0.28)`} strokeWidth={2.5} strokeDasharray="7 5"
          initial={prefersReduced ? {} : { pathLength: 0, opacity: 0 }}
          animate={prefersReduced ? {} : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
        />

        {/* Clockwise direction ticks */}
        {TICK_ANGLES.map((angleDeg, i) => {
          const { x, y } = polarToXY(cx, cy, r, angleDeg)
          const tangentRad = ((angleDeg + 90) * Math.PI) / 180
          const tx = Math.cos(tangentRad) * 12
          const ty = Math.sin(tangentRad) * 12
          return (
            <motion.line key={i}
              x1={x - tx * 0.5} y1={y - ty * 0.5}
              x2={x + tx * 0.5} y2={y + ty * 0.5}
              stroke={`${BRICK}0.45)`} strokeWidth={3} strokeLinecap="round"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={prefersReduced ? {} : { opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            />
          )
        })}

        {/* Center labels */}
        <text x={cx} y={cy - 10} textAnchor="middle"
          fill={`${BRICK_TEXT}0.87)`} fontSize="12"
          fontFamily="ui-monospace, monospace" letterSpacing="0.14em"
          style={{ textTransform: 'uppercase' }}>
          continuous
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle"
          fill={`${BRICK_TEXT}0.84)`} fontSize="11"
          fontFamily="ui-monospace, monospace" letterSpacing="0.12em"
          style={{ textTransform: 'uppercase' }}>
          loop
        </text>

        {/* Movement nodes */}
        {MOVEMENTS.map((movement, i) => {
          const { x, y }    = polarToXY(cx, cy, r, movement.angle)
          const { x: lx, y: ly } = polarToXY(cx, cy, labelR, movement.angle)
          const anc          = anchor(movement.angle)

          return (
            <motion.g key={movement.id}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.5 }}
              animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              {/* Halo */}
              <circle cx={x} cy={y} r={nodeR + 8} fill={`${BRICK}0.08)`} />

              {/* Main circle */}
              <circle cx={x} cy={y} r={nodeR}
                fill={`${BRICK}0.16)`}
                stroke={`${BRICK}0.65)`}
                strokeWidth={2.5}
              />

              {/* Number */}
              <text x={x} y={y - 9}
                textAnchor="middle"
                fill={`${BRICK_TEXT}0.91)`}
                fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.10em">
                {movement.n}
              </text>

              {/* Short label */}
              <text x={x} y={y + 9}
                textAnchor="middle"
                fill={`${BRICK_TEXT}1.0)`}
                fontSize="15" fontWeight="700"
                fontFamily="ui-monospace, monospace" letterSpacing="0.06em"
                style={{ textTransform: 'uppercase' }}>
                {movement.short}
              </text>

              {/* External full label */}
              <text x={lx} y={ly - 8}
                textAnchor={anc}
                fill={`${BRICK_TEXT}0.96)`}
                fontSize="13" fontFamily="ui-monospace, monospace"
                letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>
                {movement.full}
              </text>

              {/* External verb */}
              <text x={lx} y={ly + 10}
                textAnchor={anc}
                fill={`${BRICK_TEXT}0.876)`}
                fontSize="11" fontFamily="ui-monospace, monospace"
                letterSpacing="0.10em" style={{ textTransform: 'uppercase' }}>
                {movement.verb}
              </text>
            </motion.g>
          )
        })}
      </svg>
    </div>
  )
}

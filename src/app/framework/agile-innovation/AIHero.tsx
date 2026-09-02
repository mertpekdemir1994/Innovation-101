'use client'

import { motion, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,77,122,'

const STAGES = [
  { id: 'discovery', n: '01', short: 'DISC.',   full: 'Discovery Sprint', verb: 'Discover',   angle: 0,   special: true  },
  { id: 'backlog',   n: '02', short: 'BACKLOG',  full: 'Backlog',          verb: 'Prioritize', angle: 72,  special: false },
  { id: 'sprint',    n: '03', short: 'SPRINT',   full: 'Sprint',           verb: 'Build',      angle: 144, special: false },
  { id: 'review',    n: '04', short: 'REVIEW',   full: 'Review',           verb: 'Demo',       angle: 216, special: false },
  { id: 'retro',     n: '05', short: 'RETRO',    full: 'Retrospective',    verb: 'Improve',    angle: 288, special: false },
]

const ARROW_ANGLES = [36, 108, 180, 252, 324]

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

function labelAnchor(angle: number): 'middle' | 'start' | 'end' {
  const a = ((angle % 360) + 360) % 360
  if (a < 30 || a > 330) return 'middle'
  if (a >= 150 && a <= 210) return 'middle'
  if (a < 180) return 'start'
  return 'end'
}

export default function AIHero() {
  const prefersReduced = useReducedMotion()
  const cx     = 450
  const cy     = 370
  const r      = 230
  const nodeR  = 42
  const labelR = r + nodeR + 52   // 324

  return (
    <div className="w-full flex justify-center items-center py-space-6 select-none" aria-hidden="true">
      <svg viewBox="0 0 1820 700" width="100%" className="overflow-visible">
      {/* Canvas widened from the original 900-wide composition (1.29:1) toward
          2.6:1 by framing it wider, not stretching the circle — the loop's
          own geometry is untouched, just recentered via this translate. */}
      <g transform="translate(460, 0)">

        {/* Outer glow ring */}
        <motion.circle cx={cx} cy={cy} r={r + 54}
          fill="none" stroke={`${PLUM}0.07)`} strokeWidth={54}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />

        {/* Main loop ring */}
        <motion.circle cx={cx} cy={cy} r={r}
          fill="none" stroke={`${PLUM}0.32)`} strokeWidth={2.5} strokeDasharray="7 5"
          initial={prefersReduced ? {} : { pathLength: 0, opacity: 0 }}
          animate={prefersReduced ? {} : { pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.1 }}
        />

        {/* Directional tick marks */}
        {ARROW_ANGLES.map((angleDeg, i) => {
          const { x, y } = polarToXY(cx, cy, r, angleDeg)
          const tangentRad = ((angleDeg + 90) * Math.PI) / 180
          const tx = Math.cos(tangentRad) * 13
          const ty = Math.sin(tangentRad) * 13
          return (
            <motion.line key={i}
              x1={x - tx * 0.5} y1={y - ty * 0.5}
              x2={x + tx * 0.5} y2={y + ty * 0.5}
              stroke={`${PLUM}0.50)`} strokeWidth={3} strokeLinecap="round"
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={prefersReduced ? {} : { opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
            />
          )
        })}

        {/* Center labels */}
        {['continuous', 'cycle'].map((word, i) => (
          <motion.text key={word}
            x={cx} y={cy - 14 + i * 34}
            textAnchor="middle"
            fill={`${PLUM}${i === 0 ? '0.45)' : '0.28)'}`}
            fontSize={i === 0 ? '28' : '22'}
            fontFamily="ui-monospace, monospace" letterSpacing="0.12em"
            style={{ textTransform: 'uppercase' }}
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={prefersReduced ? {} : { opacity: 1 }}
            transition={{ delay: 1.05 + i * 0.05 }}
          >
            {word}
          </motion.text>
        ))}

        {/* Stage nodes */}
        {STAGES.map((stage, i) => {
          const { x, y }        = polarToXY(cx, cy, r, stage.angle)
          const { x: lx, y: ly } = polarToXY(cx, cy, labelR, stage.angle)
          const anchor           = labelAnchor(stage.angle)

          return (
            <motion.g key={stage.id}
              initial={prefersReduced ? {} : { opacity: 0, scale: 0.5 }}
              animate={prefersReduced ? {} : { opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            >
              {/* Discovery Sprint: extra dashed outer ring */}
              {stage.special && (
                <circle cx={x} cy={y} r={nodeR + 16}
                  fill="none" stroke={`${PLUM}0.40)`}
                  strokeWidth={2.5} strokeDasharray="5 4"
                />
              )}

              {/* Halo */}
              <circle cx={x} cy={y} r={nodeR + 7}
                fill={`${PLUM}${stage.special ? '0.14)' : '0.07)'}`}
              />

              {/* Main circle */}
              <circle cx={x} cy={y} r={nodeR}
                fill={`${PLUM}${stage.special ? '0.30)' : '0.18)'}`}
                stroke={`${PLUM}${stage.special ? '0.90)' : '0.55)'}`}
                strokeWidth={stage.special ? 3 : 2}
              />

              {/* Number */}
              <text x={x} y={y - 10}
                textAnchor="middle"
                fill={`rgba(165,147,174,0.926)`} fontSize="14"
                fontFamily="ui-monospace, monospace" letterSpacing="0.10em"
              >
                {stage.n}
              </text>

              {/* Short label */}
              <text x={x} y={y + 11}
                textAnchor="middle"
                fill={`rgba(165,147,174,1.0)`}
                fontSize="17" fontWeight="700"
                fontFamily="ui-monospace, monospace" letterSpacing="0.02em"
                style={{ textTransform: 'uppercase' }}
              >
                {stage.short}
              </text>

              {/* External full label */}
              <text x={lx} y={ly - 10}
                textAnchor={anchor}
                fill={`${PLUM}${stage.special ? '0.85)' : '0.60)'}`}
                fontSize="24" fontFamily="ui-monospace, monospace"
                letterSpacing="0.06em" style={{ textTransform: 'uppercase' }}
              >
                {stage.full}
              </text>
              <text x={lx} y={ly + 17}
                textAnchor={anchor}
                fill={`rgba(165,147,174,0.874)`} fontSize="20"
                fontFamily="ui-monospace, monospace" letterSpacing="0.06em"
                style={{ textTransform: 'uppercase' }}
              >
                {stage.verb}
              </text>
            </motion.g>
          )
        })}
      </g>
      </svg>
    </div>
  )
}

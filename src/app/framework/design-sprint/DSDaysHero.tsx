'use client'

import { motion, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(180,83,9,'

const DAYS = [
  { id: 'monday',    label: 'Monday',    sub: 'Understand' },
  { id: 'tuesday',   label: 'Tuesday',   sub: 'Sketch'     },
  { id: 'wednesday', label: 'Wednesday', sub: 'Decide'     },
  { id: 'thursday',  label: 'Thursday',  sub: 'Prototype'  },
  { id: 'friday',    label: 'Friday',    sub: 'Test'       },
]

export default function DSDaysHero() {
  const prefersReduced = useReducedMotion()

  const nodeW = 130
  const nodeH = 72
  const gapX  = 24
  const svgW  = DAYS.length * nodeW + (DAYS.length - 1) * gapX + 80
  const svgH  = 280
  const yRow  = 170

  function nodeX(i: number)  { return 40 + i * (nodeW + gapX) }
  function nodeCX(i: number) { return nodeX(i) + nodeW / 2 }

  const returnArcHeight = 120
  const arcX1  = nodeCX(4)
  const arcX2  = nodeCX(0)
  const yBase  = yRow - nodeH / 2
  const yArc   = yBase - returnArcHeight
  const returnArcD = `M ${arcX1} ${yBase} C ${arcX1} ${yArc}, ${arcX2} ${yArc}, ${arcX2} ${yBase}`

  return (
    <div className="w-full flex justify-center items-center py-space-4 select-none" aria-hidden="true">
      <svg
        viewBox={`0 0 ${svgW} ${svgH}`}
        width="100%"
        style={{ overflow: 'visible' }}
      >
        {/* ── Forward arrows between nodes ── */}
        {DAYS.slice(0, -1).map((_, i) => {
          const x1 = nodeX(i) + nodeW
          const x2 = nodeX(i + 1)
          return (
            <motion.g key={i}
              initial={prefersReduced ? {} : { opacity: 0 }}
              animate={prefersReduced ? {} : { opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <line
                x1={x1 + 2} y1={yRow} x2={x2 - 10} y2={yRow}
                stroke={`${CLAY}0.25)`} strokeWidth={2}
              />
              <polygon
                points={`${x2 - 2},${yRow} ${x2 - 11},${yRow - 5} ${x2 - 11},${yRow + 5}`}
                fill={`${CLAY}0.25)`}
              />
            </motion.g>
          )
        })}

        {/* ── Single return arc: Friday → Monday ── */}
        <motion.g
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          <path
            d={returnArcD} fill="none"
            stroke={`${CLAY}0.22)`} strokeWidth={2} strokeDasharray="5 4"
          />
          <polygon
            points={`${arcX2},${yBase} ${arcX2 - 5},${yBase - 8} ${arcX2 + 5},${yBase - 8}`}
            fill={`${CLAY}0.22)`}
          />
        </motion.g>

        {/* ── Day nodes ── */}
        {DAYS.map((day, i) => (
          <motion.g key={day.id}
            initial={prefersReduced ? {} : { opacity: 0, y: 12 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.14, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Outer halo */}
            <rect
              x={nodeX(i) - 6} y={yRow - nodeH / 2 - 6}
              width={nodeW + 12} height={nodeH + 12} rx={12}
              fill={`${CLAY}0.06)`}
            />
            {/* Node box */}
            <rect
              x={nodeX(i)} y={yRow - nodeH / 2}
              width={nodeW} height={nodeH} rx={8}
              fill={`${CLAY}0.10)`} stroke={`${CLAY}0.35)`} strokeWidth={2}
            />
            {/* Day number */}
            <text
              x={nodeCX(i)} y={yRow - nodeH / 2 + 20}
              textAnchor="middle" fill={`${CLAY}0.50)`}
              fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="0.1em"
              style={{ textTransform: 'uppercase' }}
            >
              {String(i + 1).padStart(2, '0')}
            </text>
            {/* Day label */}
            <text
              x={nodeCX(i)} y={yRow - nodeH / 2 + 44}
              textAnchor="middle" fill={`${CLAY}0.90)`}
              fontSize="15" fontWeight="600"
              fontFamily="ui-monospace, monospace" letterSpacing="0.06em"
              style={{ textTransform: 'uppercase' }}
            >
              {day.label}
            </text>
            {/* Sub-label */}
            <text
              x={nodeCX(i)} y={yRow - nodeH / 2 + 62}
              textAnchor="middle" fill={`${CLAY}0.40)`}
              fontSize="11" fontFamily="ui-monospace, monospace" letterSpacing="0.08em"
              style={{ textTransform: 'uppercase' }}
            >
              {day.sub}
            </text>
          </motion.g>
        ))}

        {/* ── Loop-back legend ── */}
        <motion.g
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ delay: 1.3 }}
        >
          <line
            x1={svgW - 138} y1={svgH - 24}
            x2={svgW - 112} y2={svgH - 24}
            stroke={`${CLAY}0.30)`} strokeWidth={1.5} strokeDasharray="4 3"
          />
          <text
            x={svgW - 106} y={svgH - 19}
            fill={`${CLAY}0.35)`} fontSize="11"
            fontFamily="ui-monospace, monospace" letterSpacing="0.08em"
          >
            run another sprint
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

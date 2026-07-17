'use client'

import { motion, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(185,28,28,'

const LEFT_NODES = [
  { label: 'Customer',    y: 80,  special: false },
  { label: 'Sales / AM',  y: 200, special: false },
  { label: 'Product Mgr', y: 320, special: false },
  { label: 'Engineer',    y: 440, special: true  },
  { label: 'Product',     y: 560, special: false },
]

const RIGHT_NODES = [
  { label: 'Customer + FDE', y: 80,  special: true  },
  { label: 'Platform Team',  y: 320, special: false },
  { label: 'Core Product',   y: 560, special: false },
]

const CX_L   = 220
const CX_R   = 780
const NODE_W = 210
const NODE_H = 70

export default function FDEHero() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="w-full flex justify-center py-space-4 select-none" aria-hidden="true">
      <svg viewBox="0 0 1000 630" width="100%" style={{ maxWidth: 1000 }} className="overflow-visible">
        <defs>
          <marker id="arrowL" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="rgba(255,255,255,0.15)" />
          </marker>
          <marker id="arrowR" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill="rgba(255,255,255,0.15)" />
          </marker>
          <marker id="arrowBrick" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto">
            <path d="M0,0 L0,7 L7,3.5 z" fill={`${BRICK}0.45)`} />
          </marker>
        </defs>

        {/* Vertical divider */}
        <motion.line x1={500} y1={30} x2={500} y2={610}
          stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="5 6"
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Column headers */}
        {[
          { label: 'Standard Model', x: CX_L, delay: 0.1, special: false },
          { label: 'FDE Model',      x: CX_R, delay: 0.8, special: true  },
        ].map(({ label, x, delay, special }) => (
          <motion.text key={label} x={x} y={38}
            textAnchor="middle"
            fill={special ? `${BRICK}0.75)` : 'rgba(255,255,255,0.30)'}
            fontSize="13" fontFamily="ui-monospace, monospace" letterSpacing="0.14em"
            style={{ textTransform: 'uppercase' }}
            initial={prefersReduced ? {} : { opacity: 0 }}
            animate={prefersReduced ? {} : { opacity: 1 }}
            transition={{ delay }}
          >
            {label}
          </motion.text>
        ))}

        {/* Left: Standard Model nodes */}
        {LEFT_NODES.map((node, i) => {
          const nx = CX_L - NODE_W / 2
          const ny = node.y - NODE_H / 2
          return (
            <motion.g key={node.label}
              initial={prefersReduced ? {} : { opacity: 0, y: 6 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + i * 0.1, duration: 0.4 }}
            >
              {i > 0 && (
                <line
                  x1={CX_L} y1={LEFT_NODES[i - 1].y + NODE_H / 2 + 2}
                  x2={CX_L} y2={node.y - NODE_H / 2 - 6}
                  stroke="rgba(255,255,255,0.15)" strokeWidth={2}
                  markerEnd="url(#arrowL)"
                />
              )}
              <rect x={nx} y={ny} width={NODE_W} height={NODE_H} rx={8}
                fill={node.special ? `${BRICK}0.12)` : 'rgba(255,255,255,0.06)'}
                stroke={node.special ? `${BRICK}0.50)` : 'rgba(255,255,255,0.15)'}
                strokeWidth={node.special ? 2 : 1}
                strokeDasharray={node.special ? '6 4' : undefined}
              />
              <text x={CX_L} y={node.y + 6}
                textAnchor="middle"
                fill={node.special ? `${BRICK}0.90)` : 'rgba(255,255,255,0.50)'}
                fontSize={node.special ? '15' : '14'}
                fontWeight={node.special ? '600' : '400'}
                fontFamily="ui-monospace, monospace" letterSpacing="0.07em"
                style={{ textTransform: 'uppercase' }}
              >
                {node.label}
              </text>
            </motion.g>
          )
        })}

        {/* Left: annotation below Engineer node */}
        <motion.text x={CX_L} y={440 + NODE_H / 2 + 20}
          textAnchor="middle"
          fill={`${BRICK}0.55)`} fontSize="12"
          fontFamily="ui-monospace, monospace" letterSpacing="0.08em"
          style={{ textTransform: 'uppercase' }}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          4 steps from customer
        </motion.text>

        {/* Diagonal dashed line: Engineer moves to FDE position */}
        <motion.line
          x1={CX_L + NODE_W / 2 + 6} y1={440}
          x2={CX_R - NODE_W / 2 - 12} y2={80}
          stroke={`${BRICK}0.22)`} strokeWidth={2} strokeDasharray="5 6"
          markerEnd="url(#arrowBrick)"
          initial={prefersReduced ? {} : { pathLength: 0, opacity: 0 }}
          animate={prefersReduced ? {} : { pathLength: 1, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.7 }}
        />

        {/* Right: FDE Model nodes */}
        {RIGHT_NODES.map((node, i) => {
          const nx = CX_R - NODE_W / 2
          const ny = node.y - NODE_H / 2
          return (
            <motion.g key={node.label}
              initial={prefersReduced ? {} : { opacity: 0, y: -6 }}
              animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.15, duration: 0.45 }}
            >
              {i > 0 && (
                <line
                  x1={CX_R} y1={RIGHT_NODES[i - 1].y + NODE_H / 2 + 2}
                  x2={CX_R} y2={node.y - NODE_H / 2 - 6}
                  stroke="rgba(255,255,255,0.15)" strokeWidth={2}
                  markerEnd="url(#arrowR)"
                />
              )}
              {node.special && (
                <rect x={nx - 10} y={ny - 10} width={NODE_W + 20} height={NODE_H + 20} rx={14}
                  fill={`${BRICK}0.08)`}
                />
              )}
              <rect x={nx} y={ny} width={NODE_W} height={NODE_H} rx={8}
                fill={node.special ? `${BRICK}0.22)` : 'rgba(255,255,255,0.06)'}
                stroke={node.special ? `${BRICK}0.85)` : 'rgba(255,255,255,0.15)'}
                strokeWidth={node.special ? 3 : 1}
              />
              <text x={CX_R} y={node.y + 6}
                textAnchor="middle"
                fill={node.special ? `${BRICK}1.0)` : 'rgba(255,255,255,0.50)'}
                fontSize={node.special ? '15' : '14'}
                fontWeight={node.special ? '700' : '400'}
                fontFamily="ui-monospace, monospace" letterSpacing="0.07em"
                style={{ textTransform: 'uppercase' }}
              >
                {node.label}
              </text>
            </motion.g>
          )
        })}

        {/* Right: annotation below Customer+FDE node */}
        <motion.text x={CX_R} y={80 + NODE_H / 2 + 20}
          textAnchor="middle"
          fill={`${BRICK}0.60)`} fontSize="12"
          fontFamily="ui-monospace, monospace" letterSpacing="0.08em"
          style={{ textTransform: 'uppercase' }}
          initial={prefersReduced ? {} : { opacity: 0 }}
          animate={prefersReduced ? {} : { opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          0 steps from customer
        </motion.text>

      </svg>
    </div>
  )
}

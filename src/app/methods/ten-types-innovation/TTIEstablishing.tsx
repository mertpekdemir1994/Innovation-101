'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'

const SVG_W = 700
const SVG_H = 280
const TILE_W = 60
const TILE_H = 104
const TILE_R = 6
const TILE_Y = 58
const TILE_CY = TILE_Y + TILE_H / 2  // 110

const CAT_LABEL_Y = 17
const CAT_LINE_Y  = 32

const CATEGORIES = [
  { id: 'config',   label: 'CONFIGURATION', x1: 16,  x2: 268, cx: 142 },
  { id: 'offering', label: 'OFFERING',      x1: 288, x2: 412, cx: 350 },
  { id: 'exp',      label: 'EXPERIENCE',    x1: 432, x2: 684, cx: 558 },
]

// All tiles neutral — over-used distinction is a light non-color-coded text marker only
const TILES = [
  { id: 'profit-model',        cat: 'config',   x: 16,  lines: ['PROFIT', 'MODEL'] },
  { id: 'network',             cat: 'config',   x: 80,  lines: ['NETWORK'] },
  { id: 'structure',           cat: 'config',   x: 144, lines: ['STRUCTURE'] },
  { id: 'process',             cat: 'config',   x: 208, lines: ['PROCESS'] },
  { id: 'product-performance', cat: 'offering', x: 288, lines: ['PRODUCT', 'PERF.'],    noteAbove: 'over-used' },
  { id: 'product-system',      cat: 'offering', x: 352, lines: ['PRODUCT', 'SYSTEM'] },
  { id: 'service',             cat: 'exp',      x: 432, lines: ['SERVICE'] },
  { id: 'channel',             cat: 'exp',      x: 496, lines: ['CHANNEL'] },
  { id: 'brand',               cat: 'exp',      x: 560, lines: ['BRAND'] },
  { id: 'customer-engagement', cat: 'exp',      x: 624, lines: ['CUSTOMER', 'ENGAGE.'] },
]

export default function TTIEstablishing() {
  const ref    = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const [show, setShow] = useState(false)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (inView || prefersReduced) setShow(true)
  }, [inView, prefersReduced])

  const d   = (t: number) => (prefersReduced ? 0 : t)
  const del = (t: number) => (prefersReduced ? 0 : t)

  return (
    <div ref={ref} className="w-full select-none">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ overflow: 'visible' }}
        role="img"
        aria-label="The 10 Types of Innovation in three categories: Configuration (Profit Model, Network, Structure, Process), Offering (Product Performance, Product System), and Experience (Service, Channel, Brand, Customer Engagement). Product Performance is the most commonly used type; the other nine are typically under-used."
      >
        <defs>
          <filter id="tti-est-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Category backgrounds */}
        {CATEGORIES.map((cat, ci) => (
          <motion.rect
            key={cat.id}
            x={cat.x1 - 4} y={CAT_LINE_Y - 2}
            width={cat.x2 - cat.x1 + 8}
            height={TILE_Y + TILE_H - CAT_LINE_Y + 14}
            rx={8}
            fill={`${PLUM}0.08)`}
            stroke={`${PLUM}0.22)`}
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: d(0.5), delay: del(ci * 0.12) }}
          />
        ))}

        {/* Category labels */}
        {CATEGORIES.map((cat, ci) => (
          <motion.g
            key={`cat-label-${cat.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: show ? 1 : 0 }}
            transition={{ duration: d(0.45), delay: del(ci * 0.12) }}
          >
            <text
              x={cat.cx} y={CAT_LABEL_Y}
              textAnchor="middle"
              fontSize="8.5"
              fontFamily="var(--font-mono)"
              letterSpacing="0.12em"
              fill={`${PLUM}0.80)`}
              style={{ userSelect: 'none' }}
            >
              {cat.label}
            </text>
            <line
              x1={cat.x1 - 2} y1={CAT_LINE_Y}
              x2={cat.x2 + 2} y2={CAT_LINE_Y}
              stroke={`${PLUM}0.28)`}
              strokeWidth={1}
            />
          </motion.g>
        ))}

        {/* Tiles */}
        {TILES.map((tile, i) => {
          const cx = tile.x + TILE_W / 2
          return (
            <motion.g
              key={tile.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: show ? 1 : 0 }}
              transition={{ duration: d(0.42), delay: del(0.22 + i * 0.07) }}
            >
              <rect
                x={tile.x} y={TILE_Y}
                width={TILE_W} height={TILE_H}
                rx={TILE_R}
                fill={`${PLUM}0.20)`}
                stroke={`${PLUM}0.68)`}
                strokeWidth={1.2}
                filter="url(#tti-est-glow)"
              />

              {/* Subtle over-used marker (non-color-coded, text only) */}
              {tile.noteAbove && (
                <text
                  x={cx} y={TILE_Y - 6}
                  textAnchor="middle"
                  fontSize="5.5"
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.08em"
                  fill="rgba(255,255,255,0.28)"
                  style={{ userSelect: 'none' }}
                >
                  {tile.noteAbove}
                </text>
              )}

              {tile.lines.length === 1 ? (
                <text
                  x={cx} y={TILE_CY}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="8.5" fontFamily="var(--font-mono)"
                  letterSpacing="0.10em"
                  fill={`${PLUM}0.95)`}
                  style={{ userSelect: 'none' }}
                >
                  {tile.lines[0]}
                </text>
              ) : (
                <>
                  <text
                    x={cx} y={TILE_CY - 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8.5" fontFamily="var(--font-mono)"
                    letterSpacing="0.10em"
                    fill={`${PLUM}0.95)`}
                    style={{ userSelect: 'none' }}
                  >
                    {tile.lines[0]}
                  </text>
                  <text
                    x={cx} y={TILE_CY + 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8.5" fontFamily="var(--font-mono)"
                    letterSpacing="0.10em"
                    fill={`${PLUM}0.95)`}
                    style={{ userSelect: 'none' }}
                  >
                    {tile.lines[1]}
                  </text>
                </>
              )}
            </motion.g>
          )
        })}

        {/* Span annotation: internal → customer-facing */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: show ? 1 : 0 }}
          transition={{ duration: d(0.4), delay: del(0.95) }}
        >
          <line
            x1={16} y1={SVG_H - 18}
            x2={684} y2={SVG_H - 18}
            stroke="rgba(255,255,255,0.09)" strokeWidth={1}
          />
          <text
            x={16} y={SVG_H - 7}
            textAnchor="start"
            fontSize="6.5" fontFamily="var(--font-mono)"
            letterSpacing="0.10em"
            fill="rgba(255,255,255,0.22)"
            style={{ userSelect: 'none' }}
          >
            ← INTERNAL / HOW THE BUSINESS WORKS
          </text>
          <text
            x={684} y={SVG_H - 7}
            textAnchor="end"
            fontSize="6.5" fontFamily="var(--font-mono)"
            letterSpacing="0.10em"
            fill="rgba(255,255,255,0.22)"
            style={{ userSelect: 'none' }}
          >
            CUSTOMER-FACING / HOW IT FEELS →
          </text>
        </motion.g>
      </svg>
    </div>
  )
}

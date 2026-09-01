'use client'
import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY

const SVG_W = 700
const SVG_H = 268

const PANEL_W = 148
const PANEL_H = 76

const COLS = [40, 198, 356, 514]
const ROW_Y = [44, 158]
const TIMER_Y = 14
const TIMER_X1 = 40
const TIMER_X2 = 662
const WALL_Y = 139

type PanelMeta = { n: number; col: number; row: number }

const PANELS: PanelMeta[] = [
  { n: 1, col: 0, row: 0 }, { n: 2, col: 1, row: 0 },
  { n: 3, col: 2, row: 0 }, { n: 4, col: 3, row: 0 },
  { n: 5, col: 0, row: 1 }, { n: 6, col: 1, row: 1 },
  { n: 7, col: 2, row: 1 }, { n: 8, col: 3, row: 1 },
]

const EARLY_LINES = [
  { dx1: -20, dy1: -10, dx2: 18, dy2: -10 },
  { dx1: -20, dy1:  -2, dx2: 14, dy2:  -2 },
  { dx1: -20, dy1:   6, dx2: 10, dy2:   6 },
]

const LATE_LINES = [
  { dx1: -22, dy1: -10, dx2: 22, dy2: -13 },
  { dx1: -22, dy1:  -2, dx2: 18, dy2:   0 },
  { dx1: -22, dy1:   8, dx2: 20, dy2:   7 },
]

export default function C8Establishing() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const prefersReduced = useReducedMotion()
  const visible = inView || !!prefersReduced

  return (
    <div className="w-full"
      aria-label="Eight-panel Crazy 8s grid with timer. Panels 1–4 labeled OBVIOUS represent conventional first ideas. A dashed wall line marks where obvious ideas run out. Panels 5–8 labeled ORIGINAL in clay orange represent breakthrough ideas reached past the wall. Timer bar shows 1 minute per panel, 8 minutes total.">
      <svg ref={ref} viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
        preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
        <defs>
          <filter id="c8-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
            <feFlood floodColor={`${CLAY}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Timer bar */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: prefersReduced ? 0 : 0.04 }}
        >
          <line x1={TIMER_X1} y1={TIMER_Y} x2={TIMER_X2} y2={TIMER_Y}
            stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          {[0,1,2,3,4,5,6,7,8].map(i => {
            const tx = TIMER_X1 + (i / 8) * (TIMER_X2 - TIMER_X1)
            return (
              <line key={i} x1={tx} y1={TIMER_Y - 4} x2={tx} y2={TIMER_Y + 4}
                stroke={i === 0 || i === 8 ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.14)'}
                strokeWidth={0.8} />
            )
          })}
          <text x={TIMER_X1} y={TIMER_Y - 8} textAnchor="start"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>0 MIN</text>
          <text x={TIMER_X2} y={TIMER_Y - 8} textAnchor="end"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>8 MIN</text>
          <text x={(TIMER_X1 + TIMER_X2) / 2} y={TIMER_Y - 8} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${CLAY_TEXT}0.895)`} style={{ userSelect: 'none' }}>1 MIN PER PANEL</text>
        </motion.g>

        {/* Panels */}
        {PANELS.map(p => {
          const late = p.row === 1
          const x = COLS[p.col]
          const y = ROW_Y[p.row]
          const cx = x + PANEL_W / 2
          const cy = y + PANEL_H / 2
          const delay = prefersReduced ? 0 : 0.14 + (p.n - 1) * 0.08

          const fill   = late ? `${CLAY}0.07)` : 'rgba(255,255,255,0.03)'
          const stroke = late ? `${CLAY}0.48)` : 'rgba(255,255,255,0.14)'
          const numFill = late ? `${CLAY}0.60)` : 'rgba(255,255,255,0.28)'
          const lblFill = late ? `${CLAY}0.82)` : 'rgba(255,255,255,0.40)'
          const lineFill = late ? `${CLAY}0.42)` : 'rgba(255,255,255,0.16)'
          const lines = late ? LATE_LINES : EARLY_LINES

          return (
            <motion.g key={p.n}
              initial={{ opacity: 0, y: 10 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.38, delay }}
            >
              {late && (
                <rect x={x - 1} y={y - 1} width={PANEL_W + 2} height={PANEL_H + 2} rx={4}
                  fill="none" stroke={`${CLAY}0.14)`} strokeWidth={4}
                  style={{ filter: 'url(#c8-est-glow)' }} />
              )}
              <rect x={x} y={y} width={PANEL_W} height={PANEL_H} rx={3}
                fill={fill} stroke={stroke} strokeWidth={0.8} />
              <text x={x + 7} y={y + 12}
                fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill={numFill} style={{ userSelect: 'none' }}>
                {String(p.n).padStart(2, '0')}
              </text>
              {lines.map((l, i) => (
                <line key={i}
                  x1={cx + l.dx1} y1={cy + l.dy1}
                  x2={cx + l.dx2} y2={cy + l.dy2}
                  stroke={lineFill} strokeWidth={0.9} />
              ))}
              <text x={cx} y={y + PANEL_H - 9} textAnchor="middle"
                fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={lblFill} style={{ userSelect: 'none' }}>
                {late ? 'ORIGINAL' : 'OBVIOUS'}
              </text>
            </motion.g>
          )
        })}

        {/* THE WALL divider */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.35, delay: prefersReduced ? 0 : 0.52 }}
        >
          <line x1={TIMER_X1} y1={WALL_Y} x2={TIMER_X2} y2={WALL_Y}
            stroke={`${CLAY}0.32)`} strokeWidth={0.8} strokeDasharray="4 3" />
          <text x={(TIMER_X1 + TIMER_X2) / 2} y={WALL_Y - 7} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
            fill={`${CLAY_TEXT}0.92)`} style={{ userSelect: 'none' }}>← THE WALL</text>
          <text x={(TIMER_X1 + TIMER_X2) / 2} y={WALL_Y + 13} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>
            obvious ideas run out here, keep going
          </text>
        </motion.g>

        {/* Caption */}
        <motion.text x={SVG_W / 2} y={SVG_H - 6} textAnchor="middle"
          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill="rgba(255,255,255,0.58)"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: prefersReduced ? 0 : 0.90 }}
          style={{ userSelect: 'none' }}>
          THE IDEAS TEAMS SELECT COME DISPROPORTIONATELY FROM PANELS 5-8, NOT 1-4
        </motion.text>
      </svg>
    </div>
  )
}

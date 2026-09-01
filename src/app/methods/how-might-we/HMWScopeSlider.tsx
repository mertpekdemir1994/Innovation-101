'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY  = 'rgba(31,58,95,'
const AMBER = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700
const SVG_H = 284

// Panel geometry
const PROB_X = 10,  PROB_W = 238,  PROB_Y = 12, PANEL_H = 190
const SOL_X  = 456, SOL_W  = 234
const PROB_CX = PROB_X + PROB_W / 2
const SOL_CX  = SOL_X  + SOL_W  / 2

// Door geometry
const DOOR_POST1_X = 310, DOOR_POST2_X = 391, DOOR_POST_W = 5
const DOOR_OPEN_X1 = DOOR_POST1_X + DOOR_POST_W
const DOOR_OPEN_X2 = DOOR_POST2_X
const DOOR_CX      = (DOOR_OPEN_X1 + DOOR_OPEN_X2) / 2

// Scope bar geometry
const BAR_Y = 228, BAR_H = 8, BAR_X = 10, BAR_MAX_W = 680

type Scope = 'broad' | 'right' | 'narrow'

type ScopeDef = {
  label: string
  lines: string[]
  note: string
  barFrac: number
  warn: boolean
}

const SCOPE_DATA: Record<Scope, ScopeDef> = {
  broad: {
    label:   'TOO BROAD',
    lines:   ['reinvent online', 'shopping?'],
    note:    'Infinite solutions. No actionable direction. Cannot evaluate what good looks like.',
    barFrac: 0.92,
    warn:    true,
  },
  right: {
    label:   'JUST RIGHT',
    lines:   ['make checkout feel', 'effortless and', 'reassuring?'],
    note:    'Specific enough to act on. Open enough to generate creative solutions.',
    barFrac: 0.48,
    warn:    false,
  },
  narrow: {
    label:   'TOO NARROW',
    lines:   ['add a progress bar', 'to the checkout', 'page?'],
    note:    'Already a solution. Removes creative latitude. Wrong altitude for ideation.',
    barFrac: 0.12,
    warn:    true,
  },
}

const SCOPE_ORDER: Scope[] = ['broad', 'right', 'narrow']

export default function HMWScopeSlider() {
  const [scope, setScope] = useState<Scope>('right')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const data   = SCOPE_DATA[scope]
  const barW   = data.barFrac * BAR_MAX_W
  const midY   = PROB_Y + PANEL_H / 2
  const SOL_Y  = PROB_Y

  const LINE_Y0      = SOL_Y + 64
  const LINE_SPACING = 17

  return (
    <div>
      {/* Scope selector */}
      <div className="flex gap-2 mb-8 flex-wrap" role="group" aria-label="Scope level">
        {SCOPE_ORDER.map(s => {
          const d      = SCOPE_DATA[s]
          const active = scope === s
          return (
            <button
              key={s}
              onClick={() => setScope(s)}
              className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
              style={{
                background: active
                  ? (d.warn ? `${AMBER}0.80)` : `${NAVY}0.80)`)
                  : 'transparent',
                color: active ? '#fff' : 'rgba(255,255,255,0.50)',
                border: `1.5px solid ${active
                  ? (d.warn ? `${AMBER}0.65)` : 'rgba(255,255,255,0.30)')
                  : 'rgba(255,255,255,0.16)'}`,
              }}
              aria-pressed={active}
            >{d.label}</button>
          )
        })}
      </div>

      {/* Transformer SVG */}
      <div className="w-full select-none mb-6" aria-hidden="true">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="hmw-int-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={10} fill={`${NAVY}0.05)`} />

          {/* ── LEFT: Problem Space (static) ── */}
          <rect
            x={PROB_X} y={PROB_Y} width={PROB_W} height={PANEL_H} rx={8}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.14)"
            strokeDasharray="5 3"
          />
          <text
            x={PROB_CX} y={PROB_Y + 18}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.64)" style={{ userSelect: 'none' }}
          >PROBLEM SPACE</text>
          <line
            x1={PROB_X + 16} y1={PROB_Y + 29} x2={PROB_X + PROB_W - 16} y2={PROB_Y + 29}
            stroke="rgba(255,255,255,0.07)"
          />
          <text
            x={PROB_CX} y={PROB_Y + 44}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.7)" style={{ userSelect: 'none' }}
          >INSIGHT</text>
          {([
            ['Users abandon checkout',          PROB_Y + 68, '6.5', 0.74],
            ['at payment, feels',                 PROB_Y + 82, '6.5', 0.74],
            ['effortful and uncertain.',         PROB_Y + 96, '6.5', 0.74],
          ] as [string, number, string, number][]).map(([t, y, fs, op]) => (
            <text
              key={y} x={PROB_CX} y={y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={fs} fontFamily="var(--font-inter,sans-serif)"
              fill={`rgba(255,255,255,${op})`} style={{ userSelect: 'none' }}
            >{t}</text>
          ))}

          {/* Arrow left → door */}
          <line
            x1={PROB_X + PROB_W} y1={midY} x2={DOOR_POST1_X} y2={midY}
            stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="3 2"
          />

          {/* ── DOOR (static) ── */}
          <rect
            x={DOOR_POST1_X} y={PROB_Y} width={DOOR_POST_W} height={PANEL_H} rx={2}
            fill="rgba(255,255,255,0.22)"
          />
          <rect
            x={DOOR_POST2_X} y={PROB_Y} width={DOOR_POST_W} height={PANEL_H} rx={2}
            fill="rgba(255,255,255,0.22)"
          />
          <rect
            x={DOOR_POST1_X} y={PROB_Y}
            width={DOOR_POST2_X - DOOR_POST1_X + DOOR_POST_W} height={5} rx={2}
            fill="rgba(255,255,255,0.22)"
          />
          {(['HOW', 'MIGHT', 'WE'] as const).map((word, i) => (
            <text
              key={word} x={DOOR_CX} y={PROB_Y + 60 + i * 18}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill="rgba(255,255,255,0.78)" style={{ userSelect: 'none' }}
            >{word}</text>
          ))}
          <line
            x1={DOOR_OPEN_X1 + 8} y1={PROB_Y + PANEL_H - 28}
            x2={DOOR_OPEN_X2 - 6} y2={PROB_Y + PANEL_H - 28}
            stroke="rgba(255,255,255,0.36)" strokeWidth={1.5}
          />
          <polygon
            points={`${DOOR_OPEN_X2 - 6},${PROB_Y + PANEL_H - 33} ${DOOR_OPEN_X2 + 8},${PROB_Y + PANEL_H - 28} ${DOOR_OPEN_X2 - 6},${PROB_Y + PANEL_H - 23}`}
            fill="rgba(255,255,255,0.36)"
          />

          {/* Arrow door → right */}
          <line
            x1={DOOR_POST2_X + DOOR_POST_W} y1={midY} x2={SOL_X} y2={midY}
            stroke="rgba(255,255,255,0.18)" strokeWidth={1} strokeDasharray="3 2"
          />
          <polygon
            points={`${SOL_X},${midY - 4} ${SOL_X + 10},${midY} ${SOL_X},${midY + 4}`}
            fill="rgba(255,255,255,0.18)"
          />

          {/* ── RIGHT PANEL background (color-transitions with scope) ── */}
          <rect
            x={SOL_X} y={SOL_Y} width={SOL_W} height={PANEL_H} rx={8}
            fill={data.warn ? `${AMBER}0.06)` : `${NAVY}0.62)`}
            stroke={data.warn ? `${AMBER}0.32)` : 'rgba(255,255,255,0.22)'}
            strokeWidth={1.5}
            filter="url(#hmw-int-glow)"
            style={{ transition: 'fill 0.35s, stroke 0.35s' }}
          />

          {/* ── RIGHT PANEL content (fades in per scope) ── */}
          <AnimatePresence mode="wait">
            <motion.g
              key={scope}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.20 }}
            >
              <text
                x={SOL_CX} y={SOL_Y + 18}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={data.warn ? `${AMBER_TEXT}0.861)` : 'rgba(255,255,255,0.7)'}
                style={{ userSelect: 'none' }}
              >HOW MIGHT WE</text>
              <line
                x1={SOL_X + 16} y1={SOL_Y + 29} x2={SOL_X + SOL_W - 16} y2={SOL_Y + 29}
                stroke={data.warn ? `${AMBER}0.14)` : 'rgba(255,255,255,0.10)'}
              />
              {data.lines.map((line, i) => (
                <text
                  key={i} x={SOL_CX} y={LINE_Y0 + i * LINE_SPACING}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="8.5" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                  fill="rgba(255,255,255,0.90)" style={{ userSelect: 'none' }}
                >{line}</text>
              ))}
              {/* Scope quality tag */}
              <rect
                x={SOL_CX - 42} y={SOL_Y + 150} width={84} height={16} rx={3}
                fill={data.warn ? `${AMBER}0.14)` : `${NAVY}0.30)`}
                stroke={data.warn ? `${AMBER}0.28)` : 'rgba(255,255,255,0.15)'}
              />
              <text
                x={SOL_CX} y={SOL_Y + 158}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={data.warn ? `${AMBER}0.75)` : 'rgba(255,255,255,0.55)'}
                style={{ userSelect: 'none' }}
              >{data.warn ? '⚠ SCOPE PROBLEM' : '✓ CALIBRATED'}</text>
            </motion.g>
          </AnimatePresence>

          {/* ── SCOPE BAR (animated width) ── */}
          {/* Track */}
          <rect
            x={BAR_X} y={BAR_Y} width={BAR_MAX_W} height={BAR_H} rx={4}
            fill="rgba(255,255,255,0.06)"
          />
          {/* Active bar */}
          <motion.rect
            x={BAR_X} y={BAR_Y} height={BAR_H} rx={4}
            animate={{ width: barW }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.40, ease }}
            fill={data.warn ? `${AMBER}0.72)` : `${NAVY}0.80)`}
            style={{ transition: 'fill 0.35s' }}
          />
          {/* Labels */}
          <text
            x={BAR_X} y={BAR_Y - 6}
            textAnchor="start" dominantBaseline="auto"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
          >NARROW</text>
          <text
            x={BAR_X + BAR_MAX_W} y={BAR_Y - 6}
            textAnchor="end" dominantBaseline="auto"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}
          >BROAD</text>
          <text
            x={BAR_X + BAR_MAX_W / 2} y={BAR_Y - 6}
            textAnchor="middle" dominantBaseline="auto"
            fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}
          >← SCOPE BREADTH →</text>

          {/* Note below bar */}
          <AnimatePresence mode="wait">
            <motion.text
              key={scope + '-note'}
              x={SVG_W / 2} y={BAR_Y + BAR_H + 16}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="5" fontFamily="var(--font-inter,sans-serif)" fontStyle="italic"
              fill={data.warn ? `${AMBER}0.55)` : 'rgba(255,255,255,0.38)'}
              style={{ userSelect: 'none' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.20 }}
            >{data.note}</motion.text>
          </AnimatePresence>
        </svg>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(181,97,62,'

const SVG_W = 700
const SVG_H = 268

const PANEL_W = 148
const PANEL_H = 76

const COLS = [40, 198, 356, 514]
const ROW_Y = [44, 158]
const TIMER_X1 = 40
const TIMER_X2 = 662
const WALL_Y = 139

type PanelId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

type PanelDef = {
  n: PanelId
  col: number
  row: number
  type: string
  headline: string
  body: string
  note: string
}

const PANELS: PanelDef[] = [
  {
    n: 1, col: 0, row: 0,
    type: 'EARLY · OBVIOUS',
    headline: 'The standard solution.',
    body: 'The first idea that comes to mind — the one already in your head before the session started. Obvious, expected, familiar. Everyone in the room would produce the same one. Essential to get on paper, but not where the value is.',
    note: 'Panel 1 is not failure. It is emptying. The obvious ideas need to go somewhere before you can reach the others.',
  },
  {
    n: 2, col: 1, row: 0,
    type: 'EARLY · OBVIOUS',
    headline: 'A variation on the first.',
    body: 'Incremental, safe, a recognizable improvement on the obvious. The same idea dressed slightly differently. Still in panel-one territory — the search space has not opened yet.',
    note: 'Most comfortable brainstorms end here: more of the same, dressed differently, with a sense of progress that is largely illusory.',
  },
  {
    n: 3, col: 2, row: 0,
    type: 'EARLY · OBVIOUS',
    headline: 'What the whole category does.',
    body: 'The conventional response. The things your competitors are building, your organization has tried before, the solution everyone in the industry would reach for. The field\'s default answer.',
    note: 'Panel 3 is the last truly easy idea. You are emptying your head of what the field already knows. Necessary and unremarkable.',
  },
  {
    n: 4, col: 3, row: 0,
    type: 'EARLY · OBVIOUS',
    headline: 'The safest possible take.',
    body: 'Cautious, defensible, unlikely to be wrong — or right. The idea no one would object to. The last obvious idea before the well runs dry. The wall is right here.',
    note: 'Most people, unhurried, would stop with four ideas and call it a session. The time constraint refuses to allow that.',
  },
  {
    n: 5, col: 0, row: 1,
    type: 'THE WALL',
    headline: 'Nothing obvious is left.',
    body: 'The pressure rises. The obvious ideas are exhausted. For a moment, nothing comes. The pen keeps moving anyway. This is the constraint doing its job — the moment most comfortable brainstorms never reach.',
    note: 'Panel 5 is the wall. The time constraint refuses to let you stop here. That refusal is the entire mechanism of the method.',
  },
  {
    n: 6, col: 1, row: 1,
    type: 'LATE · ORIGINAL',
    headline: 'Something flipped.',
    body: 'Strange. Unexpected. An idea you would normally dismiss as too different, too playful, too far from the brief. Past the wall, judgment is quieter and the ideas start to surprise you.',
    note: 'Panel 6 is past the wall — slightly desperate, slightly weird. Starting to get interesting. The ideas are becoming yours.',
  },
  {
    n: 7, col: 2, row: 1,
    type: 'LATE · ORIGINAL ★',
    headline: 'The idea you almost didn\'t draw.',
    body: 'Forced onto the page before judgment could kill it. The one-minute constraint dragged it out before you had time to decide it was too strange. This is usually the one teams select.',
    note: 'Jake Knapp: "a forcing function for the ideas you did not know you had." Panel 7 is where they disproportionately live.',
  },
  {
    n: 8, col: 3, row: 1,
    type: 'LATE · ORIGINAL',
    headline: 'Something only you would sketch.',
    body: 'Shaped by your specific knowledge, experience, and taste. No one else in the room arrived at exactly this. The cumulative pressure of eight minutes has reached a part of your thinking that a comfortable session never would.',
    note: 'Panel 8 belongs to you. It is yours in a way that an AI list or a group brainstorm cannot produce.',
  },
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

export default function C8Interactive() {
  const [selected, setSelected] = useState<PanelId | null>(null)
  const prefersReduced = useReducedMotion()

  function toggle(id: PanelId) {
    setSelected(prev => (prev === id ? null : id))
  }

  const selectedPanel = selected !== null ? PANELS.find(p => p.n === selected) ?? null : null

  return (
    <div className="w-full space-y-6">
      <div className="w-full" role="group"
        aria-label="Interactive Crazy 8s grid. Click a panel to see what kind of idea it produces.">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ display: 'block', cursor: 'default' }}>
          <defs>
            <filter id="c8-int-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
              <feFlood floodColor={`${CLAY}0.55)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="c8-int-glow-w" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feFlood floodColor="rgba(255,255,255,0.45)" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Timer bar */}
          <line x1={TIMER_X1} y1={14} x2={TIMER_X2} y2={14}
            stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
          {[0,1,2,3,4,5,6,7,8].map(i => {
            const tx = TIMER_X1 + (i / 8) * (TIMER_X2 - TIMER_X1)
            return (
              <line key={i} x1={tx} y1={10} x2={tx} y2={18}
                stroke={i === 0 || i === 8 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.12)'}
                strokeWidth={0.8} />
            )
          })}
          <text x={(TIMER_X1 + TIMER_X2) / 2} y={6} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${CLAY}0.48)`} style={{ userSelect: 'none' }}>1 MIN PER PANEL</text>

          {/* Panels */}
          {PANELS.map(p => {
            const late = p.row === 1
            const isSelected = selected === p.n
            const isDimmed = selected !== null && !isSelected
            const x = COLS[p.col]
            const y = ROW_Y[p.row]
            const cx = x + PANEL_W / 2
            const cy = y + PANEL_H / 2
            const lines = late ? LATE_LINES : EARLY_LINES

            const fillO   = isSelected ? (late ? '0.14)' : '0.08)') : isDimmed ? '0.02)' : (late ? '0.07)' : '0.03)')
            const strokeO = isSelected ? (late ? '0.90)' : '0.60)') : isDimmed ? '0.06)' : (late ? '0.48)' : '0.14)')
            const fillStr = late
              ? `${CLAY}${fillO}`
              : `rgba(255,255,255,${fillO}`
            const strokeStr = late
              ? `${CLAY}${strokeO}`
              : `rgba(255,255,255,${strokeO}`
            const numO  = isSelected ? (late ? `${CLAY}0.80)` : 'rgba(255,255,255,0.70)') : isDimmed ? 'rgba(255,255,255,0.14)' : (late ? `${CLAY}0.60)` : 'rgba(255,255,255,0.28)')
            const lblO  = isSelected ? (late ? `${CLAY}1.00)` : 'rgba(255,255,255,0.90)') : isDimmed ? 'rgba(255,255,255,0.12)' : (late ? `${CLAY}0.82)` : 'rgba(255,255,255,0.38)')
            const lineO = isSelected ? (late ? `${CLAY}0.60)` : 'rgba(255,255,255,0.45)') : isDimmed ? 'rgba(255,255,255,0.06)' : (late ? `${CLAY}0.42)` : 'rgba(255,255,255,0.16)')

            return (
              <g key={p.n}
                onClick={() => toggle(p.n)}
                role="button"
                aria-label={`Panel ${p.n}: ${p.type}. ${p.headline}`}
                aria-pressed={isSelected}
                style={{ cursor: 'pointer' }}
              >
                {/* Glow behind selected */}
                {isSelected && late && (
                  <rect x={x - 2} y={y - 2} width={PANEL_W + 4} height={PANEL_H + 4} rx={5}
                    fill="none" stroke={`${CLAY}0.16)`} strokeWidth={5}
                    style={{ filter: 'url(#c8-int-glow)' }} />
                )}
                {isSelected && !late && (
                  <rect x={x - 2} y={y - 2} width={PANEL_W + 4} height={PANEL_H + 4} rx={5}
                    fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth={4}
                    style={{ filter: 'url(#c8-int-glow-w)' }} />
                )}
                {/* Expanded hit area */}
                <rect x={x - 4} y={y - 4} width={PANEL_W + 8} height={PANEL_H + 8}
                  rx={5} fill="transparent" />
                <rect x={x} y={y} width={PANEL_W} height={PANEL_H} rx={3}
                  fill={fillStr} stroke={strokeStr} strokeWidth={isSelected ? 1.2 : 0.8} />
                <text x={x + 7} y={y + 12}
                  fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={numO} style={{ userSelect: 'none' }}>
                  {String(p.n).padStart(2, '0')}
                </text>
                {lines.map((l, i) => (
                  <line key={i}
                    x1={cx + l.dx1} y1={cy + l.dy1}
                    x2={cx + l.dx2} y2={cy + l.dy2}
                    stroke={lineO} strokeWidth={0.9} />
                ))}
                <text x={cx} y={y + PANEL_H - 9} textAnchor="middle"
                  fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                  fill={lblO} style={{ userSelect: 'none' }}>
                  {late ? 'ORIGINAL' : 'OBVIOUS'}
                </text>
              </g>
            )
          })}

          {/* THE WALL */}
          <line x1={TIMER_X1} y1={WALL_Y} x2={TIMER_X2} y2={WALL_Y}
            stroke={`${CLAY}0.28)`} strokeWidth={0.8} strokeDasharray="4 3" />
          <text x={(TIMER_X1 + TIMER_X2) / 2} y={WALL_Y - 7} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
            fill={`${CLAY}0.55)`} style={{ userSelect: 'none' }}>← THE WALL</text>
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {selected === null ? (
          <motion.div key="idle"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 text-sm text-neutral-500"
            style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
            Click any panel to see what kind of idea it produces — and why the late panels are where the breakthroughs live.
          </motion.div>
        ) : selectedPanel !== null && (
          <motion.div key={`panel-${selected}`}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 space-y-4"
            style={{
              borderColor: selectedPanel.row === 1 ? `${CLAY}0.30)` : 'rgba(255,255,255,0.12)',
              background: selectedPanel.row === 1 ? `${CLAY}0.05)` : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: selectedPanel.row === 1 ? `${CLAY}0.90)` : 'rgba(255,255,255,0.60)' }}>
                Panel {selected}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: selectedPanel.row === 1 ? `${CLAY}0.12)` : 'rgba(255,255,255,0.08)',
                  color: selectedPanel.row === 1 ? `${CLAY}0.80)` : 'rgba(255,255,255,0.55)',
                  border: `1px solid ${selectedPanel.row === 1 ? `${CLAY}0.25)` : 'rgba(255,255,255,0.14)'}`,
                }}>
                {selectedPanel.type}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold mb-2 text-neutral-200">{selectedPanel.headline}</p>
              <p className="text-sm text-neutral-600 leading-relaxed">{selectedPanel.body}</p>
            </div>
            <div className="border-t pt-4"
              style={{ borderColor: selectedPanel.row === 1 ? `${CLAY}0.15)` : 'rgba(255,255,255,0.08)' }}>
              <p className="text-xs text-neutral-500 leading-relaxed italic">{selectedPanel.note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

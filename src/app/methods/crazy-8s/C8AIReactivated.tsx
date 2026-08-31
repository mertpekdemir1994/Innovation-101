'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 700
const SVG_H = 268

const PANEL_W = 148
const PANEL_H = 76

const COLS = [40, 198, 356, 514]
const ROW_Y = [44, 158]
const TIMER_X1 = 40
const TIMER_X2 = 662
const WALL_Y = 139

type Mode = 'human' | 'ai'

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

const PANELS = [
  { n: 1, col: 0, row: 0 }, { n: 2, col: 1, row: 0 },
  { n: 3, col: 2, row: 0 }, { n: 4, col: 3, row: 0 },
  { n: 5, col: 0, row: 1 }, { n: 6, col: 1, row: 1 },
  { n: 7, col: 2, row: 1 }, { n: 8, col: 3, row: 1 },
]

export default function C8AIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const fade = prefersReduced ? { duration: 0 } : { duration: 0.30 }

  return (
    <div className="w-full space-y-5">
      {/* Toggle */}
      <div className="flex gap-2">
        {(['human', 'ai'] as Mode[]).map(m => (
          <button key={m}
            onClick={() => setMode(m)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.10)` : `${CLAY}0.10)`
                : 'transparent',
              border: `1px solid ${mode === m
                ? (m === 'ai' ? `${INDIGO}0.35)` : `${CLAY}0.35)`)
                : 'rgba(255,255,255,0.12)'}`,
              color: mode === m
                ? m === 'ai' ? `${INDIGO}1)` : `${CLAY}1)`
                : 'rgba(255,255,255,0.40)',
            }}>
            {m === 'human' ? 'Human-led' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}
          aria-label={isAI
            ? 'AI mode: all 8 panels flooded immediately in indigo, all labeled PLAUSIBLE. No wall between panels. AI-generated ideas cluster in the obvious early zone.'
            : 'Human mode: panels 1–4 muted and labeled OBVIOUS; panels 5–8 clay-accented and labeled ORIGINAL. THE WALL dashed line separates the rows.'}>
          <defs>
            <filter id="c8-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
              <feFlood floodColor={`${CLAY}0.50)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="c8-ai-indigo-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3.5" result="blur" />
              <feFlood floodColor={`${INDIGO}0.50)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Timer bar */}
          <line x1={TIMER_X1} y1={14} x2={TIMER_X2} y2={14}
            stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
          <text x={(TIMER_X1 + TIMER_X2) / 2} y={6} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={isAI ? `${INDIGO}0.40)` : `${CLAY}0.48)`}
            style={{ userSelect: 'none' }}>
            {isAI ? 'AI: INSTANT GENERATION, NO TIMER NEEDED' : '1 MIN PER PANEL'}
          </text>

          {/* AI "instant" badge */}
          <AnimatePresence>
            {isAI && (
              <motion.g key="ai-badge"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={fade}>
                <rect x={14} y={20} width={130} height={16} rx={3}
                  fill={`${INDIGO}0.18)`} stroke={`${INDIGO}0.30)`} strokeWidth={0.7} />
                <text x={22} y={31} fontSize="5" fontFamily="var(--font-mono)"
                  letterSpacing="0.07em" fill={`${INDIGO}0.80)`}
                  style={{ userSelect: 'none' }}>100 IDEAS IN SECONDS</text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Panels */}
          <AnimatePresence mode="wait">
            <motion.g key={mode}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fade}>
              {PANELS.map(p => {
                const late = p.row === 1
                const x = COLS[p.col]
                const y = ROW_Y[p.row]
                const cx = x + PANEL_W / 2
                const cy = y + PANEL_H / 2
                const lines = late ? LATE_LINES : EARLY_LINES

                const fill   = isAI
                  ? `${INDIGO}0.08)` : late ? `${CLAY}0.07)` : 'rgba(255,255,255,0.03)'
                const stroke = isAI
                  ? `${INDIGO}0.38)` : late ? `${CLAY}0.48)` : 'rgba(255,255,255,0.14)'
                const numFill = isAI
                  ? `${INDIGO}0.55)` : late ? `${CLAY}0.60)` : 'rgba(255,255,255,0.28)'
                const lblFill = isAI
                  ? `${INDIGO}0.70)` : late ? `${CLAY}0.82)` : 'rgba(255,255,255,0.38)'
                const lineFill = isAI
                  ? `${INDIGO}0.30)` : late ? `${CLAY}0.42)` : 'rgba(255,255,255,0.16)'

                return (
                  <g key={p.n}>
                    {isAI && (
                      <rect x={x - 1} y={y - 1} width={PANEL_W + 2} height={PANEL_H + 2} rx={4}
                        fill="none" stroke={`${INDIGO}0.12)`} strokeWidth={4}
                        style={{ filter: 'url(#c8-ai-indigo-glow)' }} />
                    )}
                    {!isAI && late && (
                      <rect x={x - 1} y={y - 1} width={PANEL_W + 2} height={PANEL_H + 2} rx={4}
                        fill="none" stroke={`${CLAY}0.14)`} strokeWidth={4}
                        style={{ filter: 'url(#c8-ai-glow)' }} />
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
                      fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                      fill={lblFill} style={{ userSelect: 'none' }}>
                      {isAI ? 'AI: PLAUSIBLE' : (late ? 'ORIGINAL' : 'OBVIOUS')}
                    </text>
                  </g>
                )
              })}

              {/* Wall / no-wall divider */}
              {!isAI ? (
                <g>
                  <line x1={TIMER_X1} y1={WALL_Y} x2={TIMER_X2} y2={WALL_Y}
                    stroke={`${CLAY}0.30)`} strokeWidth={0.8} strokeDasharray="4 3" />
                  <text x={(TIMER_X1 + TIMER_X2) / 2} y={WALL_Y - 7} textAnchor="middle"
                    fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
                    fill={`${CLAY}0.58)`} style={{ userSelect: 'none' }}>← THE WALL</text>
                  <text x={(TIMER_X1 + TIMER_X2) / 2} y={WALL_Y + 13} textAnchor="middle"
                    fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                    fill="rgba(255,255,255,0.18)" style={{ userSelect: 'none' }}>
                    obvious ideas run out here, constraint forces you past it
                  </text>
                </g>
              ) : (
                <g>
                  <line x1={TIMER_X1} y1={WALL_Y} x2={TIMER_X2} y2={WALL_Y}
                    stroke={`${INDIGO}0.14)`} strokeWidth={0.8} strokeDasharray="4 3" />
                  <text x={(TIMER_X1 + TIMER_X2) / 2} y={WALL_Y - 7} textAnchor="middle"
                    fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.13em"
                    fill={`${INDIGO}0.45)`} style={{ userSelect: 'none' }}>NO WALL, AI NEVER RUNS OUT OF PLAUSIBLE IDEAS</text>
                  <text x={(TIMER_X1 + TIMER_X2) / 2} y={WALL_Y + 13} textAnchor="middle"
                    fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                    fill={`${INDIGO}0.30)`} style={{ userSelect: 'none' }}>
                    without the wall, there is no forcing function to reach the non-obvious
                  </text>
                </g>
              )}
            </motion.g>
          </AnimatePresence>

          {/* Caption */}
          <text x={SVG_W / 2} y={SVG_H - 6} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.16)" style={{ userSelect: 'none' }}>
            {isAI
              ? 'AI GENERATES PLAUSIBLE IDEAS INSTANTLY, AND REMOVES THE CONSTRAINT THAT PRODUCES ORIGINALITY'
              : 'THE CONSTRAINT IS THE METHOD, THE WALL IS WHERE ORIGINAL IDEAS BEGIN'}
          </text>
        </svg>
      </div>

      {/* Explanation cards */}
      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'THE WALL IS THE METHOD',
                body: 'The constraint refuses to let you stop at panel 4. That refusal forces the original ideas out, ideas you would never have reached in a comfortable, unhurried brainstorm that ended when the obvious ones were done.',
              },
              {
                label: 'PANELS 5–8 ARE WHERE THEY LIVE',
                body: 'The ideas teams actually select come disproportionately from the late panels, not because quality improves, but because quantity is what gets you there. You have to exhaust the obvious to reach the original.',
              },
              {
                label: 'OWNERSHIP MATTERS',
                body: 'A team that sketched its own eight panels owns those ideas. That felt authorship is what drives someone to champion a strange late-panel idea through resistance. It cannot be generated for you.',
              },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${CLAY}0.20)`, background: `${CLAY}0.04)` }}>
                <p className="text-[9px] font-mono uppercase tracking-widest"
                  style={{ color: `${CLAY}0.75)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                label: 'AI FLOODS THE OBVIOUS ZONE',
                body: 'AI generates the plausible middle at scale: the same obvious ideas the early panels produce, many times over, with no constraint to push past them. More ideas is not the same as reaching idea seven.',
              },
              {
                label: 'NO WALL, NO FORCING FUNCTION',
                body: 'Without the constraint, the obvious ideas are never exhausted. The non-obvious ideas at panels 6–8 are exactly what a plausibility-seeking model is least likely to surface and most likely to miss entirely.',
              },
              {
                label: 'NO OWNERSHIP',
                body: 'No one owns an idea a machine handed them off a list. The felt authorship that makes a team champion a strange idea comes from having sketched it under pressure. That cannot be generated.',
              },
            ].map(item => (
              <div key={item.label} className="rounded-lg border p-4 space-y-2"
                style={{ borderColor: `${INDIGO}0.20)`, background: `${INDIGO}0.04)` }}>
                <p className="text-[9px] font-mono uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.75)` }}>{item.label}</p>
                <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
                  {item.body}
                </p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

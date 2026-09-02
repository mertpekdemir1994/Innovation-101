'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700
const SVG_H = 280
const AXIS_Y = 200
const AXIS_X0 = 54
const AXIS_X1 = 642
const CW = 86
const CH = 70

type Mode = 'human' | 'ai'

type CardDef = {
  id: number
  x: number
  day: string
  time: string
  context: string
  location: string
  emotion: string
  pattern: boolean
  cardY: number
  aiTag: string
}

const CARDS: CardDef[] = [
  { id: 0, x: 92,  day: 'DAY 1',  time: '7:30 AM',  context: 'ROUTINE',   location: 'Home',       emotion: 'NEUTRAL',    pattern: false, cardY: 116, aiTag: 'BASELINE'   },
  { id: 1, x: 186, day: 'DAY 3',  time: '1:15 PM',  context: 'WORK DESK', location: 'Work',       emotion: 'FRUSTRATED', pattern: true,  cardY: 72,  aiTag: 'FRICTION'   },
  { id: 2, x: 280, day: 'DAY 5',  time: '9:00 PM',  context: 'EVENING',   location: 'Home',       emotion: 'SATISFIED',  pattern: false, cardY: 103, aiTag: 'BASELINE'   },
  { id: 3, x: 378, day: 'DAY 7',  time: '7:45 PM',  context: 'OUT',       location: 'Restaurant', emotion: 'AVOIDANT',   pattern: true,  cardY: 76,  aiTag: 'AVOIDANCE'  },
  { id: 4, x: 472, day: 'DAY 10', time: '8:20 AM',  context: 'TRANSIT',   location: 'Train',      emotion: 'FRUSTRATED', pattern: true,  cardY: 110, aiTag: 'FRICTION'   },
  { id: 5, x: 570, day: 'DAY 13', time: '11:00 AM', context: 'WEEKEND',   location: 'Home',       emotion: 'RESIGNED',   pattern: true,  cardY: 84,  aiTag: 'DROPOUT'    },
]

export default function DSAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  return (
    <div className="w-full">
      {/* Mode toggle */}
      <div className="flex justify-center gap-3 mb-6">
        {(['human', 'ai'] as Mode[]).map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.12)` : `${SAGE}0.12)`
                : 'rgba(255,255,255,0.05)',
              border: `1px solid ${mode === m
                ? m === 'ai' ? `${INDIGO}0.38)` : `${SAGE}0.38)`
                : 'rgba(255,255,255,0.12)'}`,
              color: mode === m
                ? m === 'ai' ? `${INDIGO_TEXT}1)` : `${SAGE_TEXT}1)`
                : 'rgba(255,255,255,0.55)',
            }}
          >
            {m === 'human' ? 'Human-led' : 'AI-enhanced'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="w-full" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}>
          <defs>
            <filter id="ds-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feFlood floodColor={`${SAGE}0.50)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="ds-ai-indigo-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feFlood floodColor={`${INDIGO}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Axis */}
          <line x1={AXIS_X0} y1={AXIS_Y} x2={AXIS_X1} y2={AXIS_Y}
            stroke="rgba(255,255,255,0.16)" strokeWidth={1} />
          <polygon
            points={`${AXIS_X1},${AXIS_Y} ${AXIS_X1 - 7},${AXIS_Y - 3.5} ${AXIS_X1 - 7},${AXIS_Y + 3.5}`}
            fill="rgba(255,255,255,0.18)" />
          <text x={AXIS_X0} y={AXIS_Y - 6}
            fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.06em"
            fill="rgba(255,255,255,0.625)" style={{ userSelect: 'none' }}>TIME →</text>
          <text x={AXIS_X1 + 6} y={AXIS_Y + 4}
            fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.03em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>14 DAYS</text>

          {/* Cards + overlays */}
          <AnimatePresence mode="wait">
            <motion.g
              key={mode}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              {CARDS.map(e => {
                const cx = e.x
                const cy = e.cardY
                const cardL = cx - CW / 2
                const tickBottom = cy + CH
                const activeColor = isAI ? INDIGO : SAGE
                const isPatternInHuman = !isAI && e.pattern
                const isPatternInAI = isAI && e.pattern

                return (
                  <g key={e.id}>
                    {/* Tick */}
                    <line x1={cx} y1={tickBottom} x2={cx} y2={AXIS_Y}
                      stroke={e.pattern ? `${activeColor}0.22)` : 'rgba(255,255,255,0.10)'}
                      strokeWidth={0.8} strokeDasharray="3 2" />
                    <line x1={cx} y1={AXIS_Y - 4} x2={cx} y2={AXIS_Y + 4}
                      stroke={e.pattern ? `${activeColor}0.50)` : 'rgba(255,255,255,0.22)'}
                      strokeWidth={e.pattern ? 1.2 : 0.8} />
                    <text x={cx} y={AXIS_Y + 15} textAnchor="middle"
                      fontSize="11" fontFamily="system-ui, sans-serif"
                      fill={e.pattern ? `${activeColor === INDIGO ? INDIGO_TEXT : SAGE_TEXT}0.85)` : 'rgba(255,255,255,0.63)'}
                      style={{ userSelect: 'none' }}>{e.day}</text>

                    {/* Glow */}
                    {(isPatternInHuman || isPatternInAI) && (
                      <rect x={cardL - 1} y={cy - 1} width={CW + 2} height={CH + 2} rx={4}
                        fill="none" stroke={`${activeColor}0.18)`} strokeWidth={4}
                        style={{ filter: isAI ? 'url(#ds-ai-indigo-glow)' : 'url(#ds-ai-glow)' }} />
                    )}

                    {/* Card body */}
                    <rect x={cardL} y={cy} width={CW} height={CH} rx={3}
                      fill={e.pattern ? `${activeColor}0.07)` : 'rgba(255,255,255,0.03)'}
                      stroke={e.pattern ? `${activeColor}0.32)` : 'rgba(255,255,255,0.10)'}
                      strokeWidth={0.8} />

                    {/* AI tag badge (AI mode only) - widened, "AVOIDANCE" at
                        11pt doesn't fit the original 42-wide badge */}
                    {isAI && e.pattern && (
                      <>
                        <rect x={cardL + 3} y={cy + 4} width={76} height={18} rx={2}
                          fill={`${INDIGO}0.22)`} />
                        <text x={cardL + 9} y={cy + 16} fontSize="11"
                          fontFamily="system-ui, sans-serif" letterSpacing="0.02em"
                          fill={`${INDIGO_TEXT}0.969)`} style={{ userSelect: 'none' }}>{e.aiTag}</text>
                      </>
                    )}

                    {/* Context label */}
                    <text x={cx} y={cy + (isAI && e.pattern ? 38 : 16)} textAnchor="middle"
                      fontSize="11" fontFamily="system-ui, sans-serif"
                      fontWeight="600" letterSpacing="0.04em"
                      fill={e.pattern ? `${activeColor === INDIGO ? INDIGO_TEXT : SAGE_TEXT}0.90)` : 'rgba(255,255,255,0.74)'}
                      style={{ userSelect: 'none' }}>{e.context}</text>

                    {/* Emotion */}
                    <text x={cx} y={cy + (isAI && e.pattern ? 58 : 34)} textAnchor="middle"
                      fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.03em"
                      fill={e.pattern ? `${activeColor === INDIGO ? INDIGO_TEXT : SAGE_TEXT}0.85)` : 'rgba(255,255,255,0.725)'}
                      style={{ userSelect: 'none' }}>{e.emotion}</text>
                  </g>
                )
              })}

              {/* Human mode: SAGE pattern arc */}
              {!isAI && (
                <>
                  <path d={`M186,${AXIS_Y + 18} Q378,${AXIS_Y + 34} 570,${AXIS_Y + 18}`}
                    stroke={`${SAGE}0.50)`} fill="none" strokeWidth={1.2} strokeDasharray="4 3" />
                  <text x={378} y={AXIS_Y + 40} textAnchor="middle"
                    fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.02em"
                    fill={`${SAGE_TEXT}0.926)`} style={{ userSelect: 'none' }}>
                    RESEARCHER IDENTIFIES: CONTEXT FRICTION PATTERN
                  </text>
                </>
              )}

              {/* AI mode: INDIGO cluster arc + badge */}
              {isAI && (
                <>
                  <path d={`M186,${AXIS_Y + 18} Q378,${AXIS_Y + 34} 570,${AXIS_Y + 18}`}
                    stroke={`${INDIGO}0.55)`} fill="none" strokeWidth={1.2} strokeDasharray="4 3" />
                  <text x={378} y={AXIS_Y + 40} textAnchor="middle"
                    fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.01em"
                    fill={`${INDIGO_TEXT}0.926)`} style={{ userSelect: 'none' }}>
                    AI: FRICTION/AVOIDANCE CLUSTER: 4 / 6 ENTRIES, CONTEXT VARIABLE
                  </text>
                  {/* AI speed badge - widened, the text no longer fits a
                      108-wide badge at 11pt */}
                  <rect x={14} y={14} width={180} height={22} rx={3}
                    fill={`${INDIGO}0.18)`} stroke={`${INDIGO}0.30)`} strokeWidth={0.7} />
                  <text x={22} y={29} fontSize="11" fontFamily="system-ui, sans-serif"
                    letterSpacing="0.02em" fill={`${INDIGO_TEXT}0.958)`}
                    style={{ userSelect: 'none' }}>AI: ANALYZED 6 ENTRIES</text>
                </>
              )}
            </motion.g>
          </AnimatePresence>

          {/* Caption - the AI-mode sentence (102 characters) is split across
              two lines; at 11pt it no longer fits one line within SVG_W */}
          {isAI ? (
            <>
              <text x={SVG_W / 2} y={SVG_H - 24} textAnchor="middle"
                fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.02em"
                fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
                AI CAN CLUSTER AND TAG REAL ENTRIES AT SCALE,
              </text>
              <text x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle"
                fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.02em"
                fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
                BUT THE REAL ENTRIES MUST COME FROM REAL PARTICIPANTS
              </text>
            </>
          ) : (
            <text x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle"
              fontSize="11" fontFamily="system-ui, sans-serif" letterSpacing="0.02em"
              fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
              HUMAN RESEARCHER READS ACROSS THE ACCUMULATION TO SURFACE THE LONGITUDINAL PATTERN
            </text>
          )}
        </svg>
      </div>

      {/* Explanation cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <AnimatePresence mode="wait">
          {!isAI ? (
            <motion.div key="human-cards" className="contents"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}>
              {[
                {
                  label: 'IN THE MOMENT',
                  body: 'Each entry was captured by the participant at the time of the experience, not reconstructed later. That real-time, in-context record is what makes the emotion and the dropout legible: the researcher can read exactly when and why the pattern emerged.',
                },
                {
                  label: 'ACCUMULATED OVER TIME',
                  body: 'No single entry reveals the pattern. It is invisible until enough entries pile up across different days and contexts. The longitudinal accumulation is the method\'s core mechanism, and it requires real calendar time with real participants.',
                },
                {
                  label: 'THE PATTERN SURFACES',
                  body: 'After reading across the entries, the researcher identifies the recurring context-friction-dropout cycle that no interview or single observation could have revealed. The insight is in the pattern, not in any individual moment.',
                },
              ].map(item => (
                <div key={item.label} className="rounded-lg border p-4"
                  style={{ borderColor: `${SAGE}0.20)`, background: `${SAGE}0.05)` }}>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-2"
                    style={{ color: `${SAGE_TEXT}0.90)` }}>{item.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>{item.body}</p>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="ai-cards" className="contents"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}>
              {[
                {
                  label: 'AI SCALES ANALYSIS',
                  body: 'With a real corpus of diary entries (from 10 participants across 2 weeks) AI can cluster entries, tag recurring contexts and emotions, and surface the longitudinal pattern faster than a team reading manually. This is genuinely valuable once the real entries exist.',
                },
                {
                  label: 'AI SUPPORTS LOGGING',
                  body: 'AI can help sustain participation: sending smart in-the-moment reminders, prompting follow-up questions when a log is terse ("You said you were frustrated, what happened?"), and reducing the friction that causes participation to collapse. This directly attacks the method\'s main failure mode.',
                },
                {
                  label: 'AI CANNOT BE THE PARTICIPANT',
                  body: 'A "synthetic diary" (AI generating plausible entries) is fiction. It produces the confident average of what a participant might log, with no lived experience behind it. The whole point of the method is the real, in-the-moment record from real people living real days. That cannot be generated.',
                },
              ].map(item => (
                <div key={item.label} className="rounded-lg border p-4"
                  style={{ borderColor: `${INDIGO}0.20)`, background: `${INDIGO}0.05)` }}>
                  <p className="text-[10px] font-mono uppercase tracking-widest mb-2"
                    style={{ color: `${INDIGO_TEXT}0.90)` }}>{item.label}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.60)' }}>{item.body}</p>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

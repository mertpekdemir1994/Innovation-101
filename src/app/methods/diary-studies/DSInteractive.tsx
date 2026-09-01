'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE

const SVG_W = 700
const SVG_H = 268
const AXIS_Y = 200
const AXIS_X0 = 54
const AXIS_X1 = 642
const CW = 86
const CH = 54

type EntryFull = {
  id: number
  x: number
  day: string
  time: string
  context: string
  location: string
  emotion: string
  pattern: boolean
  cardY: number
  detail: string
  quote: string
}

const ENTRIES: EntryFull[] = [
  {
    id: 0, x: 92, day: 'DAY 1', time: '7:30 AM',
    context: 'ROUTINE', location: 'Home', emotion: 'NEUTRAL', pattern: false, cardY: 116,
    detail: 'Opened the app first thing. Daily setup done in under a minute. Simple flow, everything where expected. No friction, no confusion. Just did what it was supposed to do.',
    quote: '"Just doing what it says. No thoughts about it."',
  },
  {
    id: 1, x: 186, day: 'DAY 3', time: '1:15 PM',
    context: 'WORK DESK', location: 'Work', emotion: 'FRUSTRATED', pattern: true, cardY: 72,
    detail: 'Tried to log something complex mid-task. Too many screens, too many fields. Got interrupted twice. Gave up and made a mental note to do it later. Never did.',
    quote: '"I\'ll just log it properly this evening. Except I didn\'t."',
  },
  {
    id: 2, x: 280, day: 'DAY 5', time: '9:00 PM',
    context: 'EVENING', location: 'Home', emotion: 'SATISFIED', pattern: false, cardY: 103,
    detail: 'Caught up on two missed days at once, sitting on the sofa with time to spare. Slow going but manageable. The streak felt good. Only works when I have a quiet evening.',
    quote: '"I actually did it. Feels strange to need this much time just to update an app."',
  },
  {
    id: 3, x: 378, day: 'DAY 7', time: '7:45 PM',
    context: 'OUT', location: 'Restaurant', emotion: 'AVOIDANT', pattern: true, cardY: 76,
    detail: 'Should have logged in the moment. Didn\'t want to be on my phone at dinner. Planned to catch up when I got home. Forgot.',
    quote: '"Being present felt more important than the app. It just didn\'t fit the moment."',
  },
  {
    id: 4, x: 472, day: 'DAY 10', time: '8:20 AM',
    context: 'TRANSIT', location: 'Train', emotion: 'FRUSTRATED', pattern: true, cardY: 110,
    detail: 'Something happened on the commute worth logging. Tried on the train. App too slow to load, interface too small. Gave up before the first screen fully loaded. The moment passed.',
    quote: '"By the time it loaded I\'d already moved on."',
  },
  {
    id: 5, x: 570, day: 'DAY 13', time: '11:00 AM',
    context: 'WEEKEND', location: 'Home', emotion: 'RESIGNED', pattern: true, cardY: 84,
    detail: 'Back to simple things only. Stopped trying to capture complicated or in-context moments, they never make it into the app anyway. Just logging easy things from home now.',
    quote: '"It\'s fine for simple stuff. The complex moments I\'ve just given up on."',
  },
]

const PATTERN_TEXT = 'Across 4 of 6 entries (DAY 3, DAY 7, DAY 10, DAY 13) the same thing happened: a moment worth capturing occurred in a context that didn\'t allow it. Busy, social, in transit, or time-pressured. The two entries that worked (DAY 1 and DAY 5) happened at home with uninterrupted time. The pattern isn\'t about general dissatisfaction. It\'s about CONTEXT. The experience breaks down precisely when the moment and the logging can\'t coexist.'

export default function DSInteractive() {
  const [revealedCount, setRevealedCount] = useState(1)
  const [selectedId, setSelectedId] = useState<number | null>(0)
  const [patternVisible, setPatternVisible] = useState(false)
  const prefersReduced = useReducedMotion()

  const canRevealMore = revealedCount < ENTRIES.length
  const canRevealPattern = revealedCount >= 4 && !patternVisible
  const selectedEntry = selectedId !== null ? ENTRIES.find(e => e.id === selectedId) : null

  function advance() {
    if (!canRevealMore) return
    const nextIdx = revealedCount
    setRevealedCount(c => c + 1)
    setSelectedId(nextIdx)
    setPatternVisible(false)
  }

  function revealPattern() {
    setPatternVisible(true)
    setSelectedId(null)
  }

  function handleCardClick(id: number) {
    setSelectedId(prev => prev === id ? null : id)
    setPatternVisible(false)
  }

  return (
    <div className="w-full">
      {/* SVG timeline */}
      <div className="w-full" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}>
          <defs>
            <filter id="ds-int-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feFlood floodColor={`${SAGE}0.50)`} result="color" />
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
            fontSize="5" fontFamily="system-ui, sans-serif" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.625)" style={{ userSelect: 'none' }}>TIME →</text>
          <text x={AXIS_X1 + 6} y={AXIS_Y + 4}
            fontSize="4.5" fontFamily="system-ui, sans-serif" letterSpacing="0.06em"
            fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>14 DAYS</text>

          {/* Entries (appear one by one) */}
          <AnimatePresence>
            {ENTRIES.filter((_, i) => i < revealedCount).map(e => {
              const cx = e.x
              const cy = e.cardY
              const cardL = cx - CW / 2
              const tickBottom = cy + CH
              const isSelected = selectedId === e.id

              return (
                <motion.g key={e.id}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.38 }}
                  onClick={() => handleCardClick(e.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Tick */}
                  <line x1={cx} y1={tickBottom} x2={cx} y2={AXIS_Y}
                    stroke={e.pattern ? `${SAGE}0.22)` : 'rgba(255,255,255,0.10)'}
                    strokeWidth={0.8} strokeDasharray="3 2" />
                  <line x1={cx} y1={AXIS_Y - 4} x2={cx} y2={AXIS_Y + 4}
                    stroke={e.pattern ? `${SAGE}0.50)` : 'rgba(255,255,255,0.22)'}
                    strokeWidth={e.pattern ? 1.2 : 0.8} />
                  <text x={cx} y={AXIS_Y + 11} textAnchor="middle"
                    fontSize="4.5" fontFamily="system-ui, sans-serif"
                    fill={e.pattern ? `${SAGE_TEXT}0.905)` : 'rgba(255,255,255,0.63)'}
                    style={{ userSelect: 'none' }}>{e.day}</text>

                  {/* Glow */}
                  {(e.pattern || isSelected) && (
                    <rect x={cardL - 1} y={cy - 1} width={CW + 2} height={CH + 2} rx={4}
                      fill="none"
                      stroke={isSelected ? `${SAGE}0.35)` : `${SAGE}0.18)`}
                      strokeWidth={isSelected ? 5 : 4}
                      style={{ filter: 'url(#ds-int-glow)' }} />
                  )}

                  {/* Card */}
                  <rect x={cardL} y={cy} width={CW} height={CH} rx={3}
                    fill={isSelected ? `${SAGE}0.12)` : e.pattern ? `${SAGE}0.07)` : 'rgba(255,255,255,0.03)'}
                    stroke={isSelected ? `${SAGE}0.45)` : e.pattern ? `${SAGE}0.32)` : 'rgba(255,255,255,0.10)'}
                    strokeWidth={0.8} />

                  <text x={cx} y={cy + 14} textAnchor="middle"
                    fontSize="6.5" fontFamily="system-ui, sans-serif"
                    fontWeight="600" letterSpacing="0.08em"
                    fill={e.pattern ? `${SAGE_TEXT}0.983)` : 'rgba(255,255,255,0.74)'}
                    style={{ userSelect: 'none' }}>{e.context}</text>
                  <text x={cx} y={cy + 25} textAnchor="middle"
                    fontSize="4.5" fontFamily="system-ui, sans-serif"
                    fill="rgba(255,255,255,0.65)"
                    style={{ userSelect: 'none' }}>{`${e.time} · ${e.location}`}</text>
                  <line x1={cardL + 8} y1={cy + 32} x2={cardL + CW - 8} y2={cy + 32}
                    stroke="rgba(255,255,255,0.08)" strokeWidth={0.7} />
                  <text x={cx} y={cy + 44} textAnchor="middle"
                    fontSize="5" fontFamily="system-ui, sans-serif" letterSpacing="0.07em"
                    fill={e.pattern ? `${SAGE_TEXT}0.958)` : 'rgba(255,255,255,0.725)'}
                    style={{ userSelect: 'none' }}>{e.emotion}</text>
                </motion.g>
              )
            })}
          </AnimatePresence>

          {/* Pattern arc */}
          <AnimatePresence>
            {patternVisible && (
              <motion.g
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <path d={`M186,${AXIS_Y + 18} Q378,${AXIS_Y + 34} 570,${AXIS_Y + 18}`}
                  stroke={`${SAGE}0.55)`} fill="none" strokeWidth={1.4} strokeDasharray="4 3" />
                <text x={378} y={AXIS_Y + 50} textAnchor="middle"
                  fontSize="4.8" fontFamily="system-ui, sans-serif" letterSpacing="0.09em"
                  fill={`${SAGE_TEXT}0.937)`} style={{ userSelect: 'none' }}>
                  CONTEXT FRICTION PATTERN: DAY 3 / 7 / 10 / 13
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mt-4 mb-5">
        <span className="font-mono text-[9px] uppercase tracking-widest"
          style={{ color: 'rgba(255,255,255,0.30)' }}>
          ENTRY {revealedCount} OF {ENTRIES.length}
        </span>

        {canRevealMore && (
          <button
            onClick={advance}
            className="px-4 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-widest transition-colors"
            style={{
              background: `${SAGE}0.14)`,
              border: `1px solid ${SAGE}0.38)`,
              color: `${SAGE}1)`,
            }}
          >
            NEXT ENTRY →
          </button>
        )}

        {canRevealPattern && (
          <button
            onClick={revealPattern}
            className="px-4 py-1.5 rounded-full text-[9px] font-semibold uppercase tracking-widest transition-colors"
            style={{
              background: `${SAGE}0.10)`,
              border: `1px solid ${SAGE}0.28)`,
              color: `${SAGE}0.85)`,
            }}
          >
            REVEAL PATTERN
          </button>
        )}

        {patternVisible && (
          <span className="text-[9px] font-mono uppercase tracking-widest"
            style={{ color: `${SAGE}0.65)` }}>PATTERN VISIBLE ↓</span>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {patternVisible ? (
          <motion.div
            key="pattern"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="rounded-lg p-5 border"
            style={{ background: `${SAGE}0.08)`, borderColor: `${SAGE}0.30)` }}
          >
            <p className="text-[9px] font-mono uppercase tracking-widest mb-3"
              style={{ color: `${SAGE}0.70)` }}>THE LONGITUDINAL PATTERN</p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
              {PATTERN_TEXT}
            </p>
            <p className="mt-3 text-[9px] font-mono uppercase tracking-widest"
              style={{ color: `${SAGE}0.55)` }}>
              ↑ INVISIBLE IN ANY SINGLE ENTRY, ONLY VISIBLE ACROSS THE ACCUMULATION
            </p>
          </motion.div>
        ) : selectedEntry ? (
          <motion.div
            key={selectedEntry.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22 }}
            className="rounded-lg p-5 border"
            style={{
              background: selectedEntry.pattern ? `${SAGE}0.08)` : 'rgba(255,255,255,0.04)',
              borderColor: selectedEntry.pattern ? `${SAGE}0.28)` : 'rgba(255,255,255,0.10)',
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="text-[9px] font-mono uppercase tracking-widest mb-0.5"
                  style={{ color: `${SAGE}0.60)` }}>SELF-LOGGED ENTRY</p>
                <p className="font-mono text-xs font-semibold uppercase tracking-widest"
                  style={{ color: selectedEntry.pattern ? `${SAGE}1)` : 'rgba(255,255,255,0.85)' }}>
                  {selectedEntry.context}: {selectedEntry.day}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-[8px] font-mono uppercase tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.30)' }}>{selectedEntry.time}</p>
                <p className="text-[8px] font-mono uppercase tracking-wide"
                  style={{ color: 'rgba(255,255,255,0.30)' }}>{selectedEntry.location}</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {selectedEntry.detail}
            </p>
            <p className="text-xs italic" style={{ color: `${SAGE}0.65)` }}>
              {selectedEntry.quote}
            </p>
            {selectedEntry.pattern && (
              <div className="mt-3 pt-3 border-t" style={{ borderColor: `${SAGE}0.18)` }}>
                <p className="text-[9px] font-mono uppercase tracking-widest"
                  style={{ color: `${SAGE}0.55)` }}>
                  ★ PART OF THE RECURRING PATTERN: {revealedCount >= 4 ? 'REVEAL PATTERN WHEN READY' : 'CONTINUE TO SEE MORE'}
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg p-4 border text-center"
            style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
          >
            <p className="text-[9px] font-mono uppercase tracking-widest"
              style={{ color: 'rgba(255,255,255,0.25)' }}>
              {canRevealMore
                ? 'CLICK AN ENTRY TO SEE WHAT THE PARTICIPANT LOGGED, OR ADVANCE TO THE NEXT DAY'
                : 'ALL ENTRIES VISIBLE, CLICK ANY ENTRY TO EXPLORE IT, OR REVEAL THE LONGITUDINAL PATTERN'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

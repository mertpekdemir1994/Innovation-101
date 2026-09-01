'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'

const CLAY  = 'rgba(181,97,62,'
const AMBER = 'rgba(245,158,11,'

const SVG_W  = 680
const SVG_H  = 160
const FW     = 110
const FH     = 110
const FY     = 16
const GAP_PX = 12

type FrameId = 0 | 1 | 2 | 3 | 4

const FRAME_X: number[] = (() => {
  const totalW = 5 * FW + 4 * GAP_PX
  const startX = Math.round((SVG_W - totalW) / 2)
  return Array.from({ length: 5 }, (_, i) => startX + i * (FW + GAP_PX))
})()

const LABEL_Y = FY + FH + 11

const FRAME_TITLES = [
  '1: BEFORE',
  '2: OPENS APP',
  '3: SEES SUGGESTION',
  '?: THE GAP',
  '5: OUTCOME',
]

type FrameDetail = {
  shows: string
  assumes: string
  assumptionRisk: 'safe' | 'warn' | 'gap'
}

const FRAME_DETAILS: Record<FrameId, FrameDetail> = {
  0: {
    shows: 'A parent opens the fridge. There is food but no obvious meal.',
    assumes: 'The user has a problem worth solving: decision fatigue or wasted food. This is a safe assumption. Everyone has opened a fridge and not known what to make.',
    assumptionRisk: 'safe',
  },
  1: {
    shows: 'Parent unlocks their phone and opens the meal-planning app.',
    assumes: 'They think of this specific app when they open the fridge, not Google, not a recipe site, not texting a partner. That habit is the product. It does not exist yet.',
    assumptionRisk: 'warn',
  },
  2: {
    shows: 'The app displays "Tacos: 4 ingredients, 20 min." The parent reads it.',
    assumes: 'The app knows what ingredients they actually have. It does not. You have not drawn how. The suggestion is plausible. The mechanism is missing.',
    assumptionRisk: 'warn',
  },
  3: {
    shows: '',
    assumes: '',
    assumptionRisk: 'gap',
  },
  4: {
    shows: 'Parent cooks the suggested meal. Family eats. Frame is satisfied.',
    assumes: 'Everything in frames 1–3 worked, including the gap. This outcome is only reachable once you have crossed it.',
    assumptionRisk: 'warn',
  },
}

const GAP_ATTEMPT_TEXTS = [
  'The parent types in every ingredient each time.',
  'The app connects to a smart fridge.',
  'They photograph the fridge contents.',
  'Someone set up a pantry list weeks ago.',
]

function SketchInSVG({ id, x, y }: { id: FrameId; x: number; y: number }) {
  const cx = x + FW / 2
  const s  = 'rgba(255,255,255,0.32)'
  const cl = `${CLAY}0.48)`
  if (id === 0) {
    const px = x + 26, py = y + 22, fx = x + 62, fy = y + 16
    return (
      <g fill="none" stroke={s} strokeWidth="0.9" strokeLinecap="round">
        <circle cx={px} cy={py} r={6} />
        <line x1={px} y1={py + 6} x2={px} y2={py + 34} />
        <line x1={px - 9} y1={py + 17} x2={px + 9} y2={py + 17} />
        <line x1={px} y1={py + 34} x2={px - 8} y2={py + 50} />
        <line x1={px} y1={py + 34} x2={px + 8} y2={py + 50} />
        <rect x={fx} y={fy} width={28} height={42} rx={1} />
        <line x1={fx} y1={fy + 18} x2={fx + 28} y2={fy + 18} />
        <line x1={fx + 4} y1={fy + 7} x2={fx + 22} y2={fy + 7} />
        <line x1={fx + 4} y1={fy + 28} x2={fx + 22} y2={fy + 28} />
      </g>
    )
  }
  if (id === 1) {
    const px = x + 32, py = y + 22, phX = x + 62, phY = y + 36
    return (
      <g fill="none" stroke={s} strokeWidth="0.9" strokeLinecap="round">
        <circle cx={px} cy={py} r={6} />
        <line x1={px} y1={py + 6} x2={px} y2={py + 36} />
        <line x1={px} y1={py + 36} x2={px - 8} y2={py + 52} />
        <line x1={px} y1={py + 36} x2={px + 8} y2={py + 52} />
        <line x1={px} y1={py + 16} x2={phX} y2={py + 20} />
        <rect x={phX} y={phY} width={20} height={32} rx={2} />
        <line x1={phX + 3} y1={phY + 3} x2={phX + 17} y2={phY + 3} />
      </g>
    )
  }
  if (id === 2) {
    const px = x + 28, py = y + 22, phX = x + 60, phY = y + 28
    return (
      <g fill="none" strokeLinecap="round">
        <g stroke={s} strokeWidth="0.9">
          <circle cx={px} cy={py} r={6} />
          <line x1={px} y1={py + 6} x2={px} y2={py + 36} />
          <line x1={px} y1={py + 36} x2={px - 8} y2={py + 52} />
          <line x1={px} y1={py + 36} x2={px + 8} y2={py + 52} />
          <line x1={px} y1={py + 16} x2={phX} y2={py + 20} />
          <rect x={phX} y={phY} width={22} height={36} rx={2} />
          <line x1={phX + 3} y1={phY + 3} x2={phX + 19} y2={phY + 3} />
        </g>
        <g stroke={cl} strokeWidth="1.0">
          <line x1={phX + 3} y1={phY + 12} x2={phX + 19} y2={phY + 12} />
          <line x1={phX + 3} y1={phY + 18} x2={phX + 15} y2={phY + 18} />
          <line x1={phX + 3} y1={phY + 24} x2={phX + 17} y2={phY + 24} />
        </g>
      </g>
    )
  }
  if (id === 4) {
    const px = x + 32, py = y + 24
    return (
      <g fill="none" strokeLinecap="round">
        <g stroke="rgba(255,255,255,0.22)" strokeWidth="0.9">
          <circle cx={px} cy={py} r={6} />
          <line x1={px} y1={py + 6} x2={px} y2={py + 34} />
          <line x1={px - 9} y1={py + 17} x2={px + 9} y2={py + 17} />
          <line x1={px} y1={py + 34} x2={px - 8} y2={py + 50} />
          <line x1={px} y1={py + 34} x2={px + 8} y2={py + 50} />
        </g>
        <polyline
          points={`${cx + 8},${py + 34} ${cx + 14},${py + 42} ${cx + 28},${py + 22}`}
          stroke={`${CLAY}0.32)`} strokeWidth="1.2" fill="none" />
      </g>
    )
  }
  return null
}

export default function SBInteractive() {
  const ref             = useRef<HTMLDivElement>(null)
  const inView          = useInView(ref, { once: true, amount: 0.20 })
  const prefersReduced  = useReducedMotion()
  const visible         = inView || !!prefersReduced

  const [selected, setSelected]         = useState<FrameId | null>(null)
  const [gapAttemptIdx, setGapAttemptIdx] = useState<number | null>(null)
  const [gapRevealed, setGapRevealed]   = useState(false)

  function handleFrameClick(id: FrameId) {
    if (id === 3) {
      setSelected(3)
      setGapAttemptIdx(null)
      setGapRevealed(false)
      return
    }
    setSelected(prev => (prev === id ? null : id))
  }

  function handleGapAttempt(idx: number) {
    setGapAttemptIdx(idx)
    setGapRevealed(true)
  }

  const detail = selected !== null && selected !== 3 ? FRAME_DETAILS[selected] : null

  const tr = prefersReduced ? { duration: 0 } : { duration: 0.26 }

  return (
    <div ref={ref} className="w-full">
      {/* ── FRAME SVG ── */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Interactive storyboard. Click any frame to reveal what it shows and what it assumes."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="sb-int-clay-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feFlood floodColor={`${CLAY}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="sb-int-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.60)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.97)" rx={6} />

        {/* Frames 0–2 and 4 */}
        {([0, 1, 2, 4] as FrameId[]).map(i => {
          const fx  = FRAME_X[i]
          const sel = selected === i
          const dim = i === 4 && selected !== 4
          return (
            <motion.g
              key={i}
              onClick={() => handleFrameClick(i)}
              style={{ cursor: 'pointer', opacity: dim ? (visible ? 0.38 : 0) : undefined }}
              animate={{ opacity: dim ? 0.38 : visible ? 1 : 0 }}
              transition={tr}
            >
              <rect
                x={fx} y={FY} width={FW} height={FH} rx={3}
                fill={sel ? `${CLAY}0.12)` : `${CLAY}0.05)`}
                stroke={sel ? `${CLAY}0.75)` : `${CLAY}0.28)`}
                strokeWidth={sel ? 1.3 : 0.8}
                style={sel ? { filter: 'url(#sb-int-clay-glow)' } : undefined}
              />
              <SketchInSVG id={i} x={fx} y={FY} />
              <text x={fx + FW / 2} y={LABEL_Y}
                textAnchor="middle" fontSize="4.4"
                fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={sel ? `${CLAY}0.85)` : `${CLAY}0.50)`}
                style={{ userSelect: 'none' }}>
                {FRAME_TITLES[i]}
              </text>
            </motion.g>
          )
        })}

        {/* Frame 3: THE GAP */}
        {(() => {
          const fx  = FRAME_X[3]
          const sel = selected === 3
          return (
            <motion.g
              onClick={() => handleFrameClick(3)}
              style={{ cursor: 'pointer' }}
              animate={{ opacity: visible ? 1 : 0 }}
              transition={tr}
            >
              <rect x={fx - 2} y={FY - 2} width={FW + 4} height={FH + 4} rx={4}
                fill="none" stroke={`${AMBER}0.18)`} strokeWidth={5}
                style={{ filter: 'url(#sb-int-amber-glow)' }} />
              <rect x={fx} y={FY} width={FW} height={FH} rx={3}
                fill={sel ? `${AMBER}0.08)` : `${AMBER}0.04)`}
                stroke={`${AMBER}0.62)`} strokeWidth={sel ? 1.6 : 1.2}
                strokeDasharray="6 4"
                style={sel ? { filter: 'url(#sb-int-amber-glow)' } : undefined}
              />
              <text x={fx + FW / 2} y={FY + 52}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="32" fontFamily="var(--font-mono)" fontWeight="600"
                fill={`${AMBER}0.62)`} style={{ userSelect: 'none' }}
                filter="url(#sb-int-amber-glow)">
                ?
              </text>
              <text x={fx + FW / 2} y={LABEL_Y}
                textAnchor="middle" fontSize="4.4"
                fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
                fill={`${AMBER}0.82)`} style={{ userSelect: 'none' }}>
                {FRAME_TITLES[3]}
              </text>
            </motion.g>
          )
        })()}
      </svg>

      {/* ── DETAIL PANEL ── */}
      <AnimatePresence mode="wait">
        {detail && (
          <motion.div
            key={`detail-${selected}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={tr}
            className="mt-5 rounded-sm border"
            style={{
              borderColor: `${CLAY}0.22)`,
              background: 'rgba(10,10,18,0.92)',
              padding: '20px 24px',
            }}
          >
            <p className="text-xs font-mono tracking-widest mb-3"
              style={{ color: `${CLAY}0.55)` }}>
              FRAME {(selected as number) + 1}: WHAT IT SHOWS
            </p>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.78)' }}>
              {detail.shows}
            </p>
            <div className="rounded-sm p-4" style={{
              background: detail.assumptionRisk === 'safe'
                ? 'rgba(22,163,74,0.06)'
                : `${AMBER}0.05)`,
              borderLeft: `2px solid ${detail.assumptionRisk === 'safe'
                ? 'rgba(22,163,74,0.50)'
                : `${AMBER}0.55)`}`,
            }}>
              <p className="text-xs font-mono tracking-widest mb-2" style={{
                color: detail.assumptionRisk === 'safe'
                  ? 'rgba(22,163,74,0.70)'
                  : `${AMBER}0.72)`,
              }}>
                {detail.assumptionRisk === 'safe' ? 'ASSUMPTION: PROBABLY SAFE' : 'ASSUMPTION: UNTESTED'}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.70)' }}>
                {detail.assumes}
              </p>
            </div>
          </motion.div>
        )}

        {/* THE GAP PANEL */}
        {selected === 3 && (
          <motion.div
            key="gap-panel"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={tr}
            className="mt-5 rounded-sm border"
            style={{
              borderColor: `${AMBER}0.28)`,
              background: 'rgba(10,10,18,0.92)',
              padding: '20px 24px',
            }}
          >
            <p className="text-xs font-mono tracking-widest mb-3"
              style={{ color: `${AMBER}0.72)` }}>
              THE GAP: TRY TO FILL THIS FRAME
            </p>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.72)' }}>
              How does the app know what ingredients the user has? Choose one attempt:
            </p>
            <div className="flex flex-col gap-2">
              {GAP_ATTEMPT_TEXTS.map((text, idx) => (
                <button
                  key={idx}
                  onClick={() => handleGapAttempt(idx)}
                  className="text-left rounded-sm px-4 py-3 text-sm font-mono tracking-wide transition-colors"
                  style={{
                    background: gapAttemptIdx === idx ? `${AMBER}0.10)` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${gapAttemptIdx === idx ? `${AMBER}0.45)` : 'rgba(255,255,255,0.10)'}`,
                    color: gapAttemptIdx === idx ? `${AMBER}0.90)` : 'rgba(255,255,255,0.55)',
                  }}
                >
                  {text}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {gapRevealed && gapAttemptIdx !== null && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={tr}
                  className="mt-5 overflow-hidden"
                >
                  <div className="rounded-sm p-4" style={{
                    background: `${AMBER}0.06)`,
                    borderLeft: `2px solid ${AMBER}0.60)`,
                  }}>
                    <p className="text-xs font-mono tracking-widest mb-2"
                      style={{ color: `${AMBER}0.75)` }}>
                      THAT IS NOT A FILLED FRAME, THAT IS A NEW ASSUMPTION
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)' }}>
                      {gapAttemptIdx === 0 && 'Every session. So the first question becomes: do they actually do that? And do they do it accurately? Now you have two more untested frames before the suggestion can appear.'}
                      {gapAttemptIdx === 1 && 'Which costs several hundred pounds, requires installation, and is owned by about 2% of households. Your user has just become a much smaller, wealthier, more technical person. Is that still your user?'}
                      {gapAttemptIdx === 2 && 'Computer vision on fridge contents is a technically hard, unproven interaction at consumer scale. Draw the frame. Show the person standing with the fridge open, pointing their phone at each shelf. Is that a behaviour you believe in?'}
                      {gapAttemptIdx === 3 && 'Who set it up? When? How accurate is it after two weeks of cooking? A stale pantry list generates confidently wrong suggestions. You now need a frame showing maintenance, and that is harder than the app.'}
                    </p>
                    <p className="text-sm leading-relaxed mt-3 font-semibold"
                      style={{ color: `${AMBER}0.85)` }}>
                      The gap did not close. It named itself. That is the storyboard doing its job.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-4 text-xs font-mono tracking-wide" style={{ color: 'rgba(255,255,255,0.25)' }}>
        Click any frame to reveal what it shows and what it assumes.
      </p>
    </div>
  )
}

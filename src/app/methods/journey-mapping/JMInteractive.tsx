'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(42,111,122,'

const SVG_W = 700
const STAGE_W = 140
const SCX = [70, 210, 350, 490, 630] as const

const HDR_TOP = 8, HDR_H = 36
const DIV_Y = HDR_TOP + HDR_H + 4
const LANE_A_Y = DIV_Y + 2
const LANE_A_H = 38
const LANE_T_Y = LANE_A_Y + LANE_A_H + 2
const LANE_T_H = 38
const LANE_E_Y = LANE_T_Y + LANE_T_H + 2
const LANE_E_H = 80
const SVG_H = LANE_E_Y + LANE_E_H

const EY = { discover: 178, consider: 152, gap: 205, start: 182, use: 142, reflect: 165 }

const EMOTION_PATH =
  `M 70,${EY.discover} ` +
  `C 118,${EY.discover - 8} 162,${EY.consider + 4} 210,${EY.consider} ` +
  `C 235,${EY.consider + 5} 258,${EY.gap - 4} 280,${EY.gap} ` +
  `C 300,${EY.gap + 2} 330,${EY.start + 6} 350,${EY.start} ` +
  `C 390,${EY.start - 12} 440,${EY.use + 3} 490,${EY.use} ` +
  `C 534,${EY.use + 2} 582,${EY.reflect - 4} 630,${EY.reflect}`

type StageId = 'discover' | 'consider' | 'start' | 'use' | 'reflect'

const STAGES: {
  id: StageId
  label: string
  emotionY: number
  emotionLabel: string
  actions: string
  thoughts: string
  emotion: string
  painPoints: string
  gapNote?: string
}[] = [
  {
    id: 'discover',
    label: 'DISCOVER',
    emotionY: EY.discover,
    emotionLabel: 'Curious',
    actions: 'Becomes aware of a need or problem. Searches broadly: reviews, word of mouth, search results.',
    thoughts: '"There must be something better than what I\'m doing now."',
    emotion: 'Cautious optimism. Open to possibilities, but not yet hopeful. The cost of searching feels low.',
    painPoints: 'Too many options with no clear signal of quality. Unclear how to compare meaningfully across sources.',
  },
  {
    id: 'consider',
    label: 'CONSIDER',
    emotionY: EY.consider,
    emotionLabel: 'Hopeful',
    actions: 'Shortlists two or three options. Reads reviews, asks peers, compares features.',
    thoughts: '"This one seems like it could actually work."',
    emotion: 'Optimism rising. A genuine sense that a solution exists. Energy is highest here.',
    painPoints: 'Information is scattered and inconsistent across sources. Hard to find honest comparisons.',
    gapNote: 'The emotion line\'s true low happens AFTER this stage, in the silent gap before contact begins. Not at START itself, but in the wait between.',
  },
  {
    id: 'start',
    label: 'START',
    emotionY: EY.start,
    emotionLabel: 'Frustrated',
    actions: 'Signs up. Attempts onboarding. Tries to complete the first real use.',
    thoughts: '"Why is this so complicated? Did I make the right choice?"',
    emotion: 'Friction and doubt. The optimism of CONSIDER has dropped. This is harder than anticipated.',
    painPoints: 'Onboarding is opaque. Unclear what to do first. No acknowledgment of progress. The team sees a clean signup flow; the person experiences confusion.',
  },
  {
    id: 'use',
    label: 'USE',
    emotionY: EY.use,
    emotionLabel: 'Satisfied',
    actions: 'Using the core product or service regularly. The learning curve is past. Getting genuine value.',
    thoughts: '"Okay. This is actually solving the problem."',
    emotion: 'Satisfaction. The promised value has arrived. The earlier friction feels worth it in retrospect.',
    painPoints: 'Support is slow when edge cases arise. Minor UX rough spots that didn\'t matter at first now accumulate.',
  },
  {
    id: 'reflect',
    label: 'REFLECT',
    emotionY: EY.reflect,
    emotionLabel: 'Content',
    actions: 'Reviews overall experience. Considers renewal, upgrade, or recommendation to others.',
    thoughts: '"Worth it overall, though that start was genuinely rough."',
    emotion: 'Overall positive. Would recommend, with caveats about the early friction.',
    painPoints: 'No proactive check-in from the service. Renewal process adds friction. Hard to get help for edge cases.',
  },
]

function stageState(id: StageId, active: StageId | null, hovered: StageId | null) {
  if (active === null) return hovered === id ? 'hovered' : 'default'
  if (id === active)   return 'active'
  return 'dim'
}

function headerFill(st: string) {
  return st === 'active'  ? `${TEAL}0.25)`
       : st === 'hovered' ? `${TEAL}0.15)`
       : st === 'dim'     ? `${TEAL}0.04)`
       :                    `${TEAL}0.10)`
}
function headerStroke(st: string) {
  return st === 'active'  ? `${TEAL}0.85)`
       : st === 'hovered' ? `${TEAL}0.55)`
       : st === 'dim'     ? `${TEAL}0.12)`
       :                    `${TEAL}0.35)`
}
function labelFill(st: string) {
  return st === 'active'  ? `${TEAL}0.98)`
       : st === 'hovered' ? `${TEAL}0.82)`
       : st === 'dim'     ? `${TEAL}0.22)`
       :                    `${TEAL}0.78)`
}
function contentFill(st: string) {
  return st === 'dim' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.65)'
}
function dotFill(st: string) {
  return st === 'active'  ? `${TEAL}1.0)`
       : st === 'dim'     ? `${TEAL}0.22)`
       :                    `${TEAL}0.80)`
}
function dotR(st: string) {
  return st === 'active' ? 5 : 3.5
}

export default function JMInteractive() {
  const [activeStage,  setActiveStage]  = useState<StageId | null>(null)
  const [hoveredStage, setHoveredStage] = useState<StageId | null>(null)
  const prefersReduced = useReducedMotion()

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-12 items-start">
      {/* ── Journey map SVG ── */}
      <div className="w-full md:w-[58%] shrink-0">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
          role="group"
          aria-label="Journey map, click a stage to explore it"
        >
          <defs>
            <filter id="jm-int-glow" x="-30%" y="-60%" width="160%" height="220%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Ambient background */}
          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8} fill={`${TEAL}0.04)`} />

          {/* Column dividers */}
          {[1, 2, 3, 4].map((i) => (
            <line key={i}
              x1={i * STAGE_W} y1={DIV_Y}
              x2={i * STAGE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.05)" strokeWidth={1}
            />
          ))}

          {/* Lane dividers */}
          <line x1={0} y1={DIV_Y}        x2={SVG_W} y2={DIV_Y}        stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <line x1={0} y1={LANE_T_Y - 2} x2={SVG_W} y2={LANE_T_Y - 2} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <line x1={0} y1={LANE_E_Y - 2} x2={SVG_W} y2={LANE_E_Y - 2} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />

          {/* Lane labels */}
          {[
            { label: 'ACTIONS',  y: LANE_A_Y + LANE_A_H / 2 },
            { label: 'THOUGHTS', y: LANE_T_Y + LANE_T_H / 2 },
            { label: 'EMOTIONS', y: LANE_E_Y + LANE_E_H / 2 },
          ].map(({ label, y }) => (
            <text key={label} x={4} y={y} textAnchor="start" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill="rgba(255,255,255,0.18)" style={{ userSelect: 'none', pointerEvents: 'none' }}
            >{label}</text>
          ))}

          {/* Emotion area fill */}
          <path
            d={`${EMOTION_PATH} L 630,${LANE_E_Y + LANE_E_H} L 70,${LANE_E_Y + LANE_E_H} Z`}
            fill={`${TEAL}0.05)`}
          />

          {/* Emotion line */}
          <path
            d={EMOTION_PATH}
            stroke={`${TEAL}${activeStage ? '0.45)' : '0.85)'}`}
            strokeWidth={2}
            strokeLinecap="round"
            fill="none"
            filter="url(#jm-int-glow)"
            style={{ transition: 'stroke 0.22s' }}
          />

          {/* Gap annotation: most visible when nothing selected */}
          <g style={{ opacity: activeStage ? 0.25 : 0.80, transition: 'opacity 0.22s' }}>
            <circle cx={280} cy={EY.gap} r={3} fill="rgba(251,146,60,0.80)" />
            <text x={285} y={EY.gap - 7} textAnchor="start" dominantBaseline="middle"
              fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill="rgba(251,146,60,0.70)" style={{ userSelect: 'none', pointerEvents: 'none' }}
            >THE GAP</text>
          </g>

          {/* ── Clickable stage columns ── */}
          {STAGES.map(({ id, label, emotionY }, i) => {
            const st = stageState(id, activeStage, hoveredStage)
            return (
              <g
                key={id}
                style={{ cursor: 'pointer', outline: 'none' }}
                onClick={() => setActiveStage(activeStage === id ? null : id)}
                onMouseEnter={() => setHoveredStage(id)}
                onMouseLeave={() => setHoveredStage(null)}
                role="button"
                tabIndex={0}
                aria-label={`Explore ${label} stage`}
                aria-pressed={activeStage === id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveStage(activeStage === id ? null : id)
                  }
                }}
              >
                {/* Invisible click target for the full column */}
                <rect
                  x={i * STAGE_W} y={0} width={STAGE_W} height={SVG_H}
                  fill="transparent"
                />

                {/* Stage header box */}
                <motion.rect
                  x={i * STAGE_W + 1} y={HDR_TOP}
                  width={STAGE_W - 2} height={HDR_H}
                  rx={4}
                  animate={{ fill: headerFill(st), stroke: headerStroke(st) }}
                  strokeWidth={st === 'active' ? 1.5 : 1}
                  transition={{ duration: 0.18 }}
                />
                <motion.text
                  x={SCX[i]} y={HDR_TOP + HDR_H / 2 + 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: labelFill(st) }}
                  transition={{ duration: 0.18 }}
                >{label}</motion.text>

                {/* Abbreviated content */}
                <motion.text
                  x={SCX[i]} y={LANE_A_Y + LANE_A_H / 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="6" fontFamily="var(--font-body, Inter, sans-serif)"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: contentFill(st) }}
                  transition={{ duration: 0.18 }}
                >{STAGES[i].emotionLabel}</motion.text>

                {/* Emotion dot at this stage */}
                <motion.circle
                  cx={SCX[i]} cy={emotionY}
                  animate={{ r: dotR(st), fill: dotFill(st) }}
                  stroke="rgba(255,255,255,0.70)" strokeWidth={1}
                  filter={st === 'active' ? 'url(#jm-int-glow)' : undefined}
                  transition={{ duration: 0.18 }}
                />

                {/* Active stage: column highlight overlay */}
                {st === 'active' && (
                  <rect
                    x={i * STAGE_W + 1} y={DIV_Y}
                    width={STAGE_W - 2} height={SVG_H - DIV_Y}
                    fill={`${TEAL}0.06)`} rx={2}
                    style={{ pointerEvents: 'none' }}
                  />
                )}
              </g>
            )
          })}
        </svg>

        {!activeStage && (
          <p className="text-center mt-4"
            style={{
              fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.10em', textTransform: 'uppercase', color: `${TEAL}0.50)`,
            }}
          >Click a stage to explore</p>
        )}
      </div>

      {/* ── Detail panel ── */}
      <div className="w-full md:flex-1 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeStage ? (() => {
            const s = STAGES.find(s => s.id === activeStage)!
            return (
              <motion.div
                key={activeStage}
                initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.65)` }}
                >Journey stage</p>
                <h3 className="font-semibold mb-1"
                  style={{ fontSize: 'var(--text-2xl)', color: '#FAFAFA', lineHeight: 1.2 }}
                >{s.label}</h3>
                <p className="font-mono mb-6"
                  style={{ fontSize: 'var(--text-xs)', color: `${TEAL}0.72)`, letterSpacing: '0.06em' }}
                >{s.emotionLabel}</p>

                <div className="flex flex-col gap-4">
                  {[
                    { label: 'ACTIONS',     body: s.actions     },
                    { label: 'THOUGHTS',    body: s.thoughts    },
                    { label: 'EMOTION',     body: s.emotion     },
                    { label: 'PAIN POINTS', body: s.painPoints  },
                  ].map(({ label, body }) => (
                    <div key={label}>
                      <p className="font-mono uppercase tracking-widest mb-1"
                        style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.35)' }}
                      >{label}</p>
                      <p style={{
                        fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)',
                        color: label === 'THOUGHTS' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.68)',
                        fontStyle: label === 'THOUGHTS' ? 'italic' : 'normal',
                      }}>{body}</p>
                    </div>
                  ))}
                </div>

                {/* Gap note for CONSIDER stage */}
                {s.gapNote && (
                  <div className="mt-5 rounded-lg p-4"
                    style={{ background: 'rgba(251,146,60,0.06)', border: '1px solid rgba(251,146,60,0.22)' }}
                  >
                    <p className="font-mono uppercase tracking-widest mb-2"
                      style={{ fontSize: 'var(--text-2xs)', color: 'rgba(251,146,60,0.75)' }}
                    >Key insight</p>
                    <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.62)' }}>
                      {s.gapNote}
                    </p>
                  </div>
                )}
              </motion.div>
            )
          })() : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-full"
              style={{ minHeight: 200 }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                Select a stage to read its description.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

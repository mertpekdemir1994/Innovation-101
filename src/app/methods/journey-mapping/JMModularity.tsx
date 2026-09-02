'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL

const SVG_W = 700
// GRID_X0 reserves a left gutter for the lane labels. "OPPORTUNITIES" (the
// longest of the 6 possible lane labels here) needs a wider gutter than the
// other Journey Mapping files' 75 — 115 — so the 5 stage columns are
// narrower here too (140 -> 117) to make room, not wider — SVG_W never
// changes. (Mirrors JMEstablishing/JMInteractive/JMAIReactivated.)
const GRID_X0 = 115
const STAGE_W = 117
const SCX = [173.5, 290.5, 407.5, 524.5, 641.5] as const

const HDR_TOP = 8
const HDR_H = 36
const HDR_BOTTOM = HDR_TOP + HDR_H + 4  // 48

const EY_BASE = { discover: 28, consider: 14, gap: 55, start: 38, use: 8, reflect: 22 }
// These are relative to the EMOTIONS lane top (will be offset by computed lane Y)

// Recomputed for the new (narrower) stage spacing: control points sit 1/3
// of each segment's x-gap in from either anchor, at the anchor's own y.
const EMOTION_PATH = (laneY: number) =>
  `M 173.5,${laneY + EY_BASE.discover} ` +
  `C 212.5,${laneY + EY_BASE.discover} 251.5,${laneY + EY_BASE.consider} 290.5,${laneY + EY_BASE.consider} ` +
  `C 310,${laneY + EY_BASE.consider} 329.5,${laneY + EY_BASE.gap} 349,${laneY + EY_BASE.gap} ` +
  `C 368.5,${laneY + EY_BASE.gap} 388,${laneY + EY_BASE.start} 407.5,${laneY + EY_BASE.start} ` +
  `C 446.5,${laneY + EY_BASE.start} 485.5,${laneY + EY_BASE.use} 524.5,${laneY + EY_BASE.use} ` +
  `C 563.5,${laneY + EY_BASE.use} 602.5,${laneY + EY_BASE.reflect} 641.5,${laneY + EY_BASE.reflect}`

type LaneId = 'actions' | 'thoughts' | 'emotions' | 'touchpoints' | 'pain-points' | 'opportunities'

const ALL_LANES: { id: LaneId; label: string; height: number }[] = [
  { id: 'actions',       label: 'ACTIONS',       height: 38 },
  { id: 'thoughts',      label: 'THOUGHTS',      height: 38 },
  { id: 'emotions',      label: 'EMOTIONS',      height: 70 },
  { id: 'touchpoints',   label: 'TOUCHPOINTS',   height: 38 },
  { id: 'pain-points',   label: 'PAIN POINTS',   height: 38 },
  { id: 'opportunities', label: 'OPPORTUNITIES', height: 38 },
]

const STAGE_NAMES = ['DISCOVER', 'CONSIDER', 'START', 'USE', 'REFLECT'] as const

const LANE_CONTENT: Record<LaneId, string[]> = {
  actions:       ['Searches broadly', 'Compares options', 'Signs up',         'Uses regularly', 'Reviews & refers'],
  thoughts:      ['"Better option?"', '"Looks right"', '"Why so hard?"', '"Works!"',       '"Worth it"'],
  emotions:      [],  // rendered as the emotion line, not text
  touchpoints:   ['Search / Ads',    'Reviews / Peers', 'Email / UI',      'App / Support',  'Email / Renewal'],
  'pain-points': ['Too many options', 'Scattered info',  'Opaque onboard',  'Slow support',   'No check-in'],
  opportunities: ['Clear value prop', 'Honest comparison', 'Better onboard', 'Proactive help', 'Milestone reward'],
}

const DEFAULT_ACTIVE: Set<LaneId> = new Set<LaneId>(['actions', 'thoughts', 'emotions'])

function computeLaneLayout(activeLanes: Set<LaneId>) {
  let y = HDR_BOTTOM + 2
  const positions: Partial<Record<LaneId, number>> = {}
  for (const lane of ALL_LANES) {
    if (activeLanes.has(lane.id)) {
      positions[lane.id] = y
      y += lane.height + 2
    }
  }
  return { positions, totalHeight: y }
}

export default function JMModularity() {
  const [activeLanes, setActiveLanes] = useState<Set<LaneId>>(DEFAULT_ACTIVE)
  const prefersReduced = useReducedMotion()

  function toggleLane(id: LaneId) {
    setActiveLanes((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        if (next.size > 1) next.delete(id)  // always keep at least one lane
      } else {
        next.add(id)
      }
      return next
    })
  }

  const { positions, totalHeight } = computeLaneLayout(activeLanes)
  const svgH = totalHeight

  return (
    <div>
      {/* ── Lane toggle buttons ── */}
      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Toggle journey map lanes">
        {ALL_LANES.map(({ id, label }) => {
          const isActive = activeLanes.has(id)
          return (
            <button
              key={id}
              onClick={() => toggleLane(id)}
              className="px-4 py-1.5 rounded-full font-mono text-xs transition-colors"
              style={{
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: isActive ? `${TEAL}0.20)` : 'rgba(255,255,255,0.04)',
                color:       isActive ? `${TEAL_TEXT}0.99)` : 'rgba(255,255,255,0.675)',
                border:      `1px solid ${isActive ? `${TEAL}0.50)` : 'rgba(255,255,255,0.10)'}`,
              }}
              aria-pressed={isActive}
            >{label}</button>
          )
        })}
      </div>

      {/* ── Journey map SVG (viewBox updates as lanes toggle) ── */}
      <div aria-hidden="true">
        <svg
          viewBox={`0 0 ${SVG_W} ${svgH}`}
          width="100%"
          style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="jm-mod-glow" x="-10%" y="-60%" width="120%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={SVG_W} height={svgH} rx={8} fill={`${TEAL}0.04)`} />

          {/* Stage headers */}
          {STAGE_NAMES.map((name, i) => (
            <g key={name}>
              <rect
                x={GRID_X0 + i * STAGE_W + 1} y={HDR_TOP}
                width={STAGE_W - 2} height={HDR_H}
                rx={4}
                fill={`${TEAL}0.10)`}
                stroke={`${TEAL}0.35)`}
                strokeWidth={1}
              />
              <text
                x={SCX[i]} y={HDR_TOP + HDR_H / 2 + 2}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={`${TEAL_TEXT}0.969)`} style={{ userSelect: 'none' }}
              >{name}</text>
            </g>
          ))}

          {/* Header bottom divider */}
          <line x1={0} y1={HDR_BOTTOM} x2={SVG_W} y2={HDR_BOTTOM} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />

          {/* Column dividers (incl. the label-gutter boundary at i=0) */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i}
              x1={GRID_X0 + i * STAGE_W} y1={HDR_BOTTOM}
              x2={GRID_X0 + i * STAGE_W} y2={svgH}
              stroke="rgba(255,255,255,0.05)" strokeWidth={1}
            />
          ))}

          {/* ── Active lanes ── */}
          <AnimatePresence>
            {ALL_LANES.map(({ id, label, height }) => {
              if (!activeLanes.has(id)) return null
              const laneY = positions[id]!
              const isEmotions = id === 'emotions'

              return (
                <motion.g
                  key={id}
                  initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Top border of this lane */}
                  <line x1={0} y1={laneY - 1} x2={SVG_W} y2={laneY - 1}
                    stroke="rgba(255,255,255,0.05)" strokeWidth={1}
                  />

                  {/* Lane label at left */}
                  <text x={4} y={laneY + height / 2} textAnchor="start" dominantBaseline="middle"
                    fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                    fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}
                  >{label}</text>

                  {isEmotions ? (
                    // Emotions lane: render the emotion line
                    <>
                      <path
                        d={EMOTION_PATH(laneY + 8)}
                        fill={`${TEAL}0.06)`}
                        stroke="none"
                      />
                      <path
                        d={`${EMOTION_PATH(laneY + 8)} L 641.5,${laneY + height} L 173.5,${laneY + height} Z`}
                        fill={`${TEAL}0.04)`}
                        stroke="none"
                      />
                      <path
                        d={EMOTION_PATH(laneY + 8)}
                        stroke={`${TEAL}0.85)`}
                        strokeWidth={2.5}
                        strokeLinecap="round"
                        fill="none"
                        filter="url(#jm-mod-glow)"
                      />
                      {/* Dots */}
                      {[EY_BASE.discover, EY_BASE.consider, EY_BASE.start, EY_BASE.use, EY_BASE.reflect].map((ey, i) => (
                        <circle key={i} cx={SCX[i]} cy={laneY + 8 + ey} r={3}
                          fill={`${TEAL}0.90)`} stroke="rgba(255,255,255,0.65)" strokeWidth={1}
                        />
                      ))}
                      {/* Gap marker */}
                      <circle cx={349} cy={laneY + 8 + EY_BASE.gap} r={2.5}
                        fill="rgba(251,146,60,0.80)"
                      />
                    </>
                  ) : (
                    // Text content lanes
                    LANE_CONTENT[id].map((text, i) => (
                      <text key={i}
                        x={SCX[i]} y={laneY + height / 2}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="11" fontFamily="var(--font-body, Inter, sans-serif)"
                        fill={id === 'thoughts' ? 'rgba(255,255,255,0.50)' : id === 'opportunities' ? `${TEAL_TEXT}0.941)` : 'rgba(255,255,255,0.62)'}
                        fontStyle={id === 'thoughts' ? 'italic' : 'normal'}
                        style={{ userSelect: 'none' }}
                      >{text}</text>
                    ))
                  )}
                </motion.g>
              )
            })}
          </AnimatePresence>
        </svg>
      </div>

      {/* Version descriptions below the map */}
      <div className="mt-12 grid md:grid-cols-3 gap-5">
        {[
          {
            name:  'Customer / user journey map',
            body:  'The standard form. Maps a specific user\'s experience with a product or service. Best for diagnosing where the experience breaks and where the opportunities are.',
          },
          {
            name:  'Experience map',
            body:  'Broader and product-agnostic. Maps a person\'s whole experience around a goal or situation, useful before you have a product, to understand the human context you are designing into.',
          },
          {
            name:  'Emotion map',
            body:  'Strips back to the feeling curve itself, foregrounding the emotional journey to find the highs and lows that matter most. Used when the emotional experience is the design target.',
          },
        ].map(({ name, body }) => (
          <div key={name} className="rounded-xl p-5"
            style={{ background: `${TEAL}0.06)`, border: `1px solid ${TEAL}0.18)` }}
          >
            <p className="font-semibold mb-2"
              style={{ fontSize: 'var(--text-sm)', color: '#FAFAFA' }}
            >{name}</p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)' }}>
              {body}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

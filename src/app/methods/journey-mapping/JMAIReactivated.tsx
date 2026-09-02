'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const AI_C = 'rgba(99,102,241,'

const SVG_W = 700
// GRID_X0 reserves a left gutter for the ACTIONS/THOUGHTS/EMOTIONS lane
// labels: at 11pt "THOUGHTS" no longer fits in the sliver of margin the old
// smaller font used, so the 5 stage columns are narrower (140 -> 125) to
// make room, not wider — SVG_W itself never changes. (Mirrors JMEstablishing.)
const GRID_X0 = 75
const STAGE_W = 125
const SCX = [137.5, 262.5, 387.5, 512.5, 637.5] as const

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

// Recomputed for the new (narrower) stage spacing: control points sit 1/3
// of each segment's x-gap in from either anchor, at the anchor's own y.
const EMOTION_PATH =
  `M 137.5,${EY.discover} ` +
  `C 179.2,${EY.discover} 220.8,${EY.consider} 262.5,${EY.consider} ` +
  `C 283.3,${EY.consider} 304.2,${EY.gap} 325,${EY.gap} ` +
  `C 345.8,${EY.gap} 366.7,${EY.start} 387.5,${EY.start} ` +
  `C 429.2,${EY.start} 470.8,${EY.use} 512.5,${EY.use} ` +
  `C 554.2,${EY.use} 595.8,${EY.reflect} 637.5,${EY.reflect}`

// AI version: flattened emotion line (AI reads expressed text, doesn't catch the true gap dip)
// The gap dip barely registers; the line is smoother and misses the lowest point.
// Same re-anchoring approach as EMOTION_PATH above, applied to the AI-flattened y's.
const AI_EMOTION_PATH =
  `M 137.5,${EY.discover} ` +
  `C 179.2,${EY.discover} 220.8,${EY.consider + 8} 262.5,${EY.consider + 8} ` +
  `C 283.3,${EY.consider + 8} 304.2,${EY.start - 4} 325,${EY.start - 4} ` +   // gap barely dips vs. true gap at EY.gap
  `C 345.8,${EY.start - 4} 366.7,${EY.start + 2} 387.5,${EY.start + 2} ` +
  `C 429.2,${EY.start + 2} 470.8,${EY.use + 5} 512.5,${EY.use + 5} ` +
  `C 554.2,${EY.use + 5} 595.8,${EY.reflect + 2} 637.5,${EY.reflect + 2}`

const STAGES = ['DISCOVER', 'CONSIDER', 'START', 'USE', 'REFLECT'] as const

export default function JMAIReactivated() {
  const [aiMode, setAiMode] = useState(false)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div>
      {/* ── Global toggle ── */}
      <div className="flex justify-center mb-10">
        <div className="flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.08)' }} role="group" aria-label="Mode toggle">
          {(['Human Research', 'With AI'] as const).map((label) => {
            const isActive = label === 'With AI' ? aiMode : !aiMode
            return (
              <button
                key={label}
                onClick={() => setAiMode(label === 'With AI')}
                className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  background: isActive ? (label === 'With AI' ? `${AI_C}0.75)` : 'rgba(255,255,255,0.90)') : 'transparent',
                  color:      isActive ? (label === 'With AI' ? '#fff' : '#111') : 'rgba(255,255,255,0.45)',
                }}
                aria-pressed={isActive}
              >{label}</button>
            )
          })}
        </div>
      </div>

      {/* ── Journey map SVG ── */}
      <div className="w-full flex justify-center mb-10 select-none" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxWidth: 'var(--width-illustration)', display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="jm-ai-glow" x="-10%" y="-60%" width="120%" height="220%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8} fill={`${TEAL}0.04)`} />

          {/* AI mode: "AI ASSEMBLES" overlay on the structure area */}
          <AnimatePresence>
            {aiMode && (
              <motion.rect
                key="ai-assemble-bg"
                x={1} y={DIV_Y} width={SVG_W - 2} height={LANE_T_H + LANE_A_H + 4}
                rx={4}
                fill={`${AI_C}0.04)`}
                stroke={`${AI_C}0.18)`}
                strokeWidth={1}
                strokeDasharray="4 3"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            )}
          </AnimatePresence>

          {/* Stage headers */}
          {STAGES.map((name, i) => (
            <g key={name}>
              <rect
                x={GRID_X0 + i * STAGE_W + 1} y={HDR_TOP}
                width={STAGE_W - 2} height={HDR_H}
                rx={4}
                fill={aiMode ? `${AI_C}0.06)` : `${TEAL}0.10)`}
                stroke={aiMode ? `${AI_C}0.30)` : `${TEAL}0.35)`}
                strokeWidth={1}
                style={{ transition: 'fill 0.35s, stroke 0.35s' }}
              />
              <text
                x={SCX[i]} y={HDR_TOP + HDR_H / 2 + 2}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={aiMode ? `rgba(141,143,245,0.958)` : `${TEAL_TEXT}0.969)`}
                style={{ userSelect: 'none', transition: 'fill 0.35s' }}
              >{name}</text>
            </g>
          ))}

          {/* Lane structure lines */}
          <line x1={0} y1={DIV_Y}        x2={SVG_W} y2={DIV_Y}        stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <line x1={0} y1={LANE_T_Y - 2} x2={SVG_W} y2={LANE_T_Y - 2} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <line x1={0} y1={LANE_E_Y - 2} x2={SVG_W} y2={LANE_E_Y - 2} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1={GRID_X0 + i * STAGE_W} y1={DIV_Y} x2={GRID_X0 + i * STAGE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.05)" strokeWidth={1}
            />
          ))}

          {/* Lane labels */}
          {[
            { label: 'ACTIONS',  y: LANE_A_Y + LANE_A_H / 2 },
            { label: 'THOUGHTS', y: LANE_T_Y + LANE_T_H / 2 },
            { label: 'EMOTIONS', y: LANE_E_Y + LANE_E_H / 2 },
          ].map(({ label, y }) => (
            <text key={label} x={4} y={y} textAnchor="start" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}
            >{label}</text>
          ))}

          {/* Emotion area fill */}
          <motion.path
            d={`${aiMode ? AI_EMOTION_PATH : EMOTION_PATH} L 637.5,${LANE_E_Y + LANE_E_H} L 137.5,${LANE_E_Y + LANE_E_H} Z`}
            fill={aiMode ? `${AI_C}0.04)` : `${TEAL}0.05)`}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          {/* Emotion line: morphs between human and AI versions */}
          <motion.path
            key={aiMode ? 'ai-line' : 'human-line'}
            d={aiMode ? AI_EMOTION_PATH : EMOTION_PATH}
            stroke={aiMode ? `${AI_C}0.82)` : `${TEAL}0.88)`}
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            filter="url(#jm-ai-glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Emotion dots */}
          {[EY.discover, EY.consider, EY.start, EY.use, EY.reflect].map((ey, i) => (
            <circle key={i} cx={SCX[i]} cy={ey}
              r={3} fill={aiMode ? `${AI_C}0.85)` : `${TEAL}0.90)`}
              stroke="rgba(255,255,255,0.65)" strokeWidth={1}
              style={{ transition: 'fill 0.35s' }}
            />
          ))}

          {/* True gap dip marker (human mode: visible; AI mode: faint = AI misses it) */}
          <motion.g animate={{ opacity: aiMode ? 0.18 : 0.90 }} transition={{ duration: 0.4 }}>
            <circle cx={325} cy={EY.gap} r={3} fill="rgba(251,146,60,0.85)" />
            <text x={329} y={EY.gap - 7} textAnchor="start" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill="rgba(251,146,60,0.85)" style={{ userSelect: 'none' }}
            >THE GAP</text>
          </motion.g>

          {/* AI mode annotations */}
          <AnimatePresence>
            {aiMode && (
              <>
                <motion.text
                  key="ai-assembles"
                  x={350} y={LANE_A_Y + LANE_A_H / 2}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`rgba(141,143,245,0.926)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >AI ASSEMBLES FROM DATA</motion.text>

                {/* y moved 186 -> 145 (0.7 fraction -> near the lane top): at
                    11pt this now overlaps "AI MISSES THIS" near the gap unless
                    the two are separated vertically */}
                <motion.text
                  key="ai-emotion"
                  x={350} y={LANE_E_Y + 15}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`rgba(141,143,245,0.916)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >AI READS EXPRESSED EMOTION</motion.text>

                {/* x moved 283 -> 329 (matches the gap circle's new x=325),
                    y moved gap-20 -> gap-30 for clearance from the label above */}
                <motion.text
                  key="ai-misses"
                  x={329} y={EY.gap - 30}
                  textAnchor="start" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill="rgba(251,146,60,0.874)" style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >AI MISSES THIS</motion.text>
              </>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* ── Info boxes in AI mode ── */}
      <AnimatePresence>
        {aiMode && (
          <motion.div
            className="grid md:grid-cols-2 gap-5 mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.32, ease }}
          >
            <div className="rounded-xl p-5"
              style={{ background: `${AI_C}0.06)`, border: `1px solid ${AI_C}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(141,143,245,0.90)' }}
              >What AI does well</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI can synthesize a draft journey map from large volumes of existing data (support transcripts, reviews, survey responses, analytics) in minutes rather than days. It is also genuinely useful for keeping maps continuously current from live data, rather than letting them go stale after a single project.
              </p>
            </div>
            <div className="rounded-xl p-5"
              style={{ background: 'rgba(251,146,60,0.04)', border: '1px solid rgba(251,146,60,0.20)' }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(251,146,60,0.75)' }}
              >What it misses</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI sentiment analysis reads emotion that was expressed in text, not the emotion felt and never written. The gap between stages, where the deepest lows often live, leaves almost no data trail. The real low is found by following a human into the silence, not by reading what they typed.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Honest synthesis: always visible */}
      <div className="rounded-xl p-6"
        style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.20)` }}
      >
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${TEAL_TEXT}0.90)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI makes journey mapping faster, broader, and continuously current: real gains. But the deepest insight a journey map produces, the surprising emotional low, usually in a gap, that reframes the whole problem, tends to come from a human following a real person through the experience and noticing what the data never recorded. AI assembles the map; human research finds the silence. The strongest practice uses AI for scale and currency, and human research to catch the un-expressed truth that does not appear in any dataset.
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY   = 'rgba(31,58,95,'
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700
const SVG_H = 500
const CL_W  = 280
const CL_H  = 190
const STRIP_H = 64

type ClusterId = 'progress' | 'social' | 'firstweek' | 'identity'

type ClusterDef = {
  id: ClusterId
  insightLines: [string, string]
  aiCategory: string
  cards: [string, string, string, string]
  tlx: number
  tly: number
}

const CLUSTERS: ClusterDef[] = [
  {
    id: 'progress',
    insightLines: ['People quit when', 'progress feels invisible'],
    aiCategory: 'Progress Tracking',
    cards: ['skipped, felt meaningless', 'no sense of improving', 'same as 6 months ago', "can't tell if working"],
    tlx: 40, tly: 40,
  },
  {
    id: 'social',
    insightLines: ['Accountability only', 'works when mutual'],
    aiCategory: 'Social Features',
    cards: ['shows up when expected', 'solo goals feel optional', 'group chat kept me going', "dies when I'm alone"],
    tlx: 380, tly: 40,
  },
  {
    id: 'firstweek',
    insightLines: ['The first session', 'sets the ceiling'],
    aiCategory: 'Onboarding',
    cards: ["didn't know the rules", 'felt judged the first time', 'figured out by watching', '3 sessions to feel normal'],
    tlx: 40, tly: 255,
  },
  {
    id: 'identity',
    insightLines: ['People exercise for', 'who they want to become'],
    aiCategory: 'User Motivation',
    cards: ['doing it for future me', 'current pain, future reward', 'want to be that person', 'identity, not fitness'],
    tlx: 380, tly: 255,
  },
]

// Cards stacked single-column so each has room for its full text
const CARD_OFF = [
  { dx: 10, dy: 74 },
  { dx: 10, dy: 100 },
  { dx: 10, dy: 126 },
  { dx: 10, dy: 152 },
] as const

type Mode = 'human' | 'ai'

export default function AMAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const isAI = mode === 'ai'
  const stripFill  = isAI ? `${INDIGO}0.45)` : `${NAVY}0.42)`
  const bodyFill   = isAI ? `${INDIGO}0.08)` : `${NAVY}0.10)`
  const borderColor= isAI ? `${INDIGO}0.36)` : `${NAVY}0.40)`

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-2 mb-8 flex-wrap" role="group" aria-label="Affinity map mode">
        {([
          { id: 'human' as Mode, label: 'Human Research' },
          { id: 'ai'    as Mode, label: 'With AI'        },
        ]).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            style={{
              background: mode === id
                ? (id === 'ai' ? `${INDIGO}0.80)` : `${NAVY}0.80)`)
                : 'transparent',
              color: mode === id ? '#fff' : 'rgba(255,255,255,0.50)',
              border: `1.5px solid ${mode === id
                ? (id === 'ai' ? `${INDIGO}0.60)` : 'rgba(255,255,255,0.30)')
                : 'rgba(255,255,255,0.16)'}`,
            }}
            aria-pressed={mode === id}
          >{label}</button>
        ))}
      </div>

      <div className="w-full select-none mb-6" aria-hidden="true">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ maxWidth: 'var(--width-illustration)', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="am-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {CLUSTERS.map(cl => (
              <clipPath key={`clip-${cl.id}`} id={`am-ai-clip-${cl.id}`}>
                <rect x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H} rx={8} />
              </clipPath>
            ))}
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={10} fill={`${NAVY}0.05)`} />

          {/* AI mode annotation */}
          <AnimatePresence>
            {isAI && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.25 }}
              >
                <rect
                  x={SVG_W / 2 - 240} y={SVG_H - 40}
                  width={480} height={26} rx={4}
                  fill={`${INDIGO}0.12)`}
                  stroke={`${INDIGO}0.28)`}
                  strokeWidth={0.8}
                />
                <text
                  x={SVG_W / 2} y={SVG_H - 27}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
                  fill={`${INDIGO_TEXT}0.937)`}
                  style={{ userSelect: 'none' }}
                >AI GROUPS BY SURFACE SIMILARITY: LABELS AS CATEGORIES</text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Clusters */}
          {CLUSTERS.map(cl => (
            <g key={cl.id}>
              {/* Body (clipped) */}
              <g clipPath={`url(#am-ai-clip-${cl.id})`}>
                <rect
                  x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H}
                  fill={bodyFill}
                  style={{ transition: 'fill 0.35s' }}
                />
                <rect
                  x={cl.tlx} y={cl.tly} width={CL_W} height={STRIP_H}
                  fill={stripFill}
                  style={{ transition: 'fill 0.35s' }}
                />
              </g>

              {/* Border */}
              <rect
                x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H} rx={8}
                fill="none"
                stroke={borderColor}
                strokeWidth={1}
                filter="url(#am-ai-glow)"
                style={{ transition: 'stroke 0.35s' }}
              />

              {/* Divider */}
              <line
                x1={cl.tlx + 12} y1={cl.tly + STRIP_H}
                x2={cl.tlx + CL_W - 12} y2={cl.tly + STRIP_H}
                stroke={isAI ? `${INDIGO}0.22)` : `${NAVY}0.28)`}
                style={{ transition: 'stroke 0.35s' }}
              />

              {/* Label type indicator */}
              <AnimatePresence mode="wait">
                <motion.g
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.22 }}
                >
                  {/* Micro label */}
                  <text
                    x={cl.tlx + CL_W / 2} y={cl.tly + 16}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                    fill={isAI ? `${INDIGO_TEXT}0.905)` : 'rgba(255,255,255,0.85)'}
                    style={{ userSelect: 'none' }}
                  >{isAI ? 'CATEGORY' : 'INSIGHT'}</text>

                  {isAI ? (
                    /* AI mode: category label - single centered line */
                    <text
                      x={cl.tlx + CL_W / 2} y={cl.tly + 40}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="11" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                      fill={`${INDIGO_TEXT}0.979)`}
                      style={{ userSelect: 'none' }}
                    >{cl.aiCategory}</text>
                  ) : (
                    /* Human mode: two-line insight */
                    cl.insightLines.map((line, i) => (
                      <text
                        key={i}
                        x={cl.tlx + CL_W / 2} y={cl.tly + 34 + i * 18}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="11" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                        fill="rgba(255,255,255,0.92)"
                        style={{ userSelect: 'none' }}
                      >{line}</text>
                    ))
                  )}
                </motion.g>
              </AnimatePresence>

              {/* Cards — one per row, full cluster width */}
              {cl.cards.map((cardText, i) => {
                const off = CARD_OFF[i]
                return (
                  <g key={i}>
                    <rect
                      x={cl.tlx + off.dx} y={cl.tly + off.dy}
                      width={CL_W - 20} height={22} rx={3}
                      fill="rgba(255,255,255,0.07)"
                      stroke={isAI ? `${INDIGO}0.22)` : 'rgba(255,255,255,0.20)'}
                      strokeWidth={0.8}
                      style={{ transition: 'stroke 0.35s' }}
                    />
                    <text
                      x={cl.tlx + off.dx + 8} y={cl.tly + off.dy + 12}
                      textAnchor="start" dominantBaseline="middle"
                      fontSize="11" fontFamily="var(--font-inter,sans-serif)"
                      fill={isAI ? `${INDIGO_TEXT}0.92)` : 'rgba(255,255,255,0.72)'}
                      style={{ userSelect: 'none', transition: 'fill 0.35s' }}
                    >{cardText}</text>
                  </g>
                )
              })}
            </g>
          ))}
        </svg>
      </div>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {isAI ? (
          <motion.div
            key="ai-info"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
            className="grid md:grid-cols-2 gap-4 mb-4"
          >
            <div
              className="rounded-xl p-5"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.18)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}
              >Where AI is useful</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)' }}>
                AI clusters observations quickly and consistently at scale. With 200 cards instead of 16, it saves hours of physical sorting and spots keyword co-occurrence patterns that humans might miss in the first pass. It is an effective first-pass organizer.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.20)' }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.75)' }}
              >Where AI falls short</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)' }}>
                AI groups by surface similarity, matching words and topics, not by meaning. It labels &ldquo;Progress Tracking&rdquo; and &ldquo;User Motivation&rdquo; instead of &ldquo;People quit when progress feels invisible&rdquo; and &ldquo;People exercise for who they want to become.&rdquo; The category describes what the data is about. The insight describes what the data means.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="human-info"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
          />
        )}
      </AnimatePresence>

      {/* Synthesis card - always visible */}
      <div
        className="rounded-xl p-5"
        style={{ background: `${NAVY}0.10)`, border: `1px solid ${NAVY}0.25)` }}
      >
        <p
          className="font-mono uppercase tracking-widest mb-2"
          style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.60)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
          AI can cluster. Only the people who did the interviews can name what the cluster means. Use AI to organize the volume; sit with the clusters yourself to find the insight that makes the naming true.
        </p>
      </div>
    </div>
  )
}

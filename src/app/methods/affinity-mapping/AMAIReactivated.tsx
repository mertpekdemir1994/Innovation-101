'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY   = 'rgba(31,58,95,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 700
const SVG_H = 350
const CL_W  = 200
const CL_H  = 116
const STRIP_H = 42

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
    cards: ['skipped — felt meaningless', 'no sense of improving', 'same as 6 months ago', "can't tell if working"],
    tlx: 75, tly: 58,
  },
  {
    id: 'social',
    insightLines: ['Accountability only', 'works when mutual'],
    aiCategory: 'Social Features',
    cards: ['shows up when expected', 'solo goals feel optional', 'group chat kept me going', "dies when I'm alone"],
    tlx: 425, tly: 58,
  },
  {
    id: 'firstweek',
    insightLines: ['The first session', 'sets the ceiling'],
    aiCategory: 'Onboarding',
    cards: ["didn't know the rules", 'felt judged the first time', 'figured out by watching', '3 sessions to feel normal'],
    tlx: 75, tly: 212,
  },
  {
    id: 'identity',
    insightLines: ['People exercise for', 'who they want to become'],
    aiCategory: 'User Motivation',
    cards: ['doing it for future me', 'current pain, future reward', 'want to be that person', 'identity, not fitness'],
    tlx: 425, tly: 212,
  },
]

const CARD_OFF = [
  { dx: 10,  dy: 46 },
  { dx: 106, dy: 46 },
  { dx: 10,  dy: 70 },
  { dx: 106, dy: 70 },
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
          style={{ display: 'block', overflow: 'visible' }}
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
                  x={SVG_W / 2 - 130} y={SVG_H - 28}
                  width={260} height={18} rx={4}
                  fill={`${INDIGO}0.12)`}
                  stroke={`${INDIGO}0.28)`}
                  strokeWidth={0.8}
                />
                <text
                  x={SVG_W / 2} y={SVG_H - 19}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${INDIGO}0.70)`}
                  style={{ userSelect: 'none' }}
                >AI GROUPS BY SURFACE SIMILARITY — LABELS AS CATEGORIES</text>
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
                    x={cl.tlx + CL_W / 2} y={cl.tly + 11}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.14em"
                    fill={isAI ? `${INDIGO}0.55)` : 'rgba(255,255,255,0.40)'}
                    style={{ userSelect: 'none' }}
                  >{isAI ? 'CATEGORY' : 'INSIGHT'}</text>

                  {isAI ? (
                    /* AI mode: category label — single centered line */
                    <text
                      x={cl.tlx + CL_W / 2} y={cl.tly + 29}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="6" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                      fill={`${INDIGO}0.90)`}
                      style={{ userSelect: 'none' }}
                    >{cl.aiCategory}</text>
                  ) : (
                    /* Human mode: two-line insight */
                    cl.insightLines.map((line, i) => (
                      <text
                        key={i}
                        x={cl.tlx + CL_W / 2} y={cl.tly + 22 + i * 13}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize="5.5" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                        fill="rgba(255,255,255,0.88)"
                        style={{ userSelect: 'none' }}
                      >{line}</text>
                    ))
                  )}
                </motion.g>
              </AnimatePresence>

              {/* Cards */}
              {cl.cards.map((cardText, i) => {
                const off = CARD_OFF[i]
                return (
                  <g key={i}>
                    <rect
                      x={cl.tlx + off.dx} y={cl.tly + off.dy}
                      width={84} height={18} rx={3}
                      fill="rgba(255,255,255,0.07)"
                      stroke={isAI ? `${INDIGO}0.22)` : 'rgba(255,255,255,0.20)'}
                      strokeWidth={0.8}
                      style={{ transition: 'stroke 0.35s' }}
                    />
                    <text
                      x={cl.tlx + off.dx + 5} y={cl.tly + off.dy + 9}
                      textAnchor="start" dominantBaseline="middle"
                      fontSize="4.5" fontFamily="var(--font-inter,sans-serif)"
                      fill={isAI ? `${INDIGO}0.62)` : 'rgba(255,255,255,0.58)'}
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
                AI groups by surface similarity — matching words and topics — not by meaning. It labels &ldquo;Progress Tracking&rdquo; and &ldquo;User Motivation&rdquo; instead of &ldquo;People quit when progress feels invisible&rdquo; and &ldquo;People exercise for who they want to become.&rdquo; The category describes what the data is about. The insight describes what the data means.
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

      {/* Synthesis card — always visible */}
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

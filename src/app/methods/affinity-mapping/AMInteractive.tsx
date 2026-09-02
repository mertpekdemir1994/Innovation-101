'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'

const SVG_W = 700
const SVG_H = 500
const CL_W  = 280
const CL_H  = 190
const STRIP_H = 64

type ClusterId = 'progress' | 'social' | 'firstweek' | 'identity'

type ClusterDef = {
  id: ClusterId
  insightLines: [string, string]
  cards: [string, string, string, string]
  tlx: number
  tly: number
}

const CLUSTERS: ClusterDef[] = [
  {
    id: 'progress',
    insightLines: ['People quit when', 'progress feels invisible'],
    cards: ['skipped, felt meaningless', 'no sense of improving', 'same as 6 months ago', "can't tell if working"],
    tlx: 40, tly: 40,
  },
  {
    id: 'social',
    insightLines: ['Accountability only', 'works when mutual'],
    cards: ['shows up when expected', 'solo goals feel optional', 'group chat kept me going', "dies when I'm alone"],
    tlx: 380, tly: 40,
  },
  {
    id: 'firstweek',
    insightLines: ['The first session', 'sets the ceiling'],
    cards: ["didn't know the rules", 'felt judged the first time', 'figured out by watching', '3 sessions to feel normal'],
    tlx: 40, tly: 255,
  },
  {
    id: 'identity',
    insightLines: ['People exercise for', 'who they want to become'],
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

type ClusterDetail = {
  insight: string
  observations: string[]
  whyItMatters: string
}

const DETAIL: Record<ClusterId, ClusterDetail> = {
  progress: {
    insight: 'People quit when progress feels invisible',
    observations: [
      'Skipped three sessions in a row and felt it made no difference: no visible consequence in the app.',
      'No sense of getting better despite consistency; the numbers appear but carry no meaning.',
      '"It looks the same as it did six months ago": data is present, trajectory is absent.',
      "Can't tell whether the plan is working; the feedback lag is too long to feel connected to effort.",
    ],
    whyItMatters: "The retention problem isn't quitting. It's that improvement is real but invisible. The design task is making progress legible before it can be felt.",
  },
  social: {
    insight: 'Accountability only works when it feels mutual',
    observations: [
      'Reliably shows up only when a specific friend is expecting her: obligation, not motivation.',
      "Solo goal-setting produces the goal but not the behavior. Goals feel optional without a witness.",
      '"The group chat is the only thing that has actually stuck": social threads outlast every other feature.',
      "Motivation drops sharply when exercising alone, even with the app's engagement features running.",
    ],
    whyItMatters: "Social features designed as broadcasting (likes, leaderboards) don't create accountability. Mutual commitment does. The design difference is obligation versus visibility.",
  },
  firstweek: {
    insight: 'The first session sets the ceiling on every session after',
    observations: [
      '"Didn\'t know the rules": basic gym etiquette unknown; paralyzed by fear of doing something wrong.',
      'Felt visibly judged from the first minute and spent the session trying not to be noticed.',
      'Figured it out eventually by watching others, but the shame of not knowing stuck for weeks.',
      '"It took three sessions to feel normal": most people do not make it to three sessions.',
    ],
    whyItMatters: "First-session experience predicts long-term retention better than overall product quality. The design problem isn't what to offer. It's making the first experience survivable for a newcomer.",
  },
  identity: {
    insight: 'People exercise for who they want to become, not how they feel today',
    observations: [
      '"I do it for future me, not current me": the beneficiary of the effort is an imagined, future person.',
      'Current discomfort is the price; the reward is inhabiting a version of themselves they want to become.',
      '"I want to be the kind of person who does this": the goal is identity, not a fitness outcome.',
      '"Identity, not fitness": the actual reason has nothing to do with health metrics or performance data.',
    ],
    whyItMatters: "Features optimized for today's experience (comfort, ease, fewer steps) fight the actual motivator (identity investment). The most effective designs make the future self tangible rather than optimizing for present-moment convenience.",
  },
}

export default function AMInteractive() {
  const [active, setActive] = useState<ClusterId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const handleCluster = (id: ClusterId) => setActive(prev => prev === id ? null : id)

  return (
    <div>
      <div className="w-full select-none mb-6" aria-label="Affinity map, click a cluster to explore it">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="am-int-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="am-int-glow-active" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="7" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {CLUSTERS.map(cl => (
              <clipPath key={`clip-${cl.id}`} id={`am-int-clip-${cl.id}`}>
                <rect x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H} rx={8} />
              </clipPath>
            ))}
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={10} fill={`${NAVY}0.05)`} />

          {/* Hint text when nothing selected */}
          {active === null && (
            <text
              x={SVG_W / 2} y={SVG_H - 14}
              textAnchor="middle" dominantBaseline="auto"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
              fill="rgba(255,255,255,0.59)"
              style={{ userSelect: 'none' }}
            >tap a cluster to reveal its observations and insight</text>
          )}

          {CLUSTERS.map(cl => {
            const isActive  = active === cl.id
            const isDimmed  = active !== null && !isActive
            const opacity   = isDimmed ? 0.14 : 1

            return (
              <motion.g
                key={cl.id}
                animate={{ opacity }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.20 }}
                onClick={() => handleCluster(cl.id)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-pressed={isActive}
                aria-label={`${cl.insightLines.join(' ')}, click to explore`}
              >
                {/* Hit area */}
                <rect
                  x={cl.tlx - 4} y={cl.tly - 4}
                  width={CL_W + 8} height={CL_H + 8}
                  fill="transparent"
                />

                {/* Body (clipped) */}
                <g clipPath={`url(#am-int-clip-${cl.id})`}>
                  <rect
                    x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H}
                    fill={isActive ? `${NAVY}0.18)` : `${NAVY}0.10)`}
                    style={{ transition: 'fill 0.20s' }}
                  />
                  <rect
                    x={cl.tlx} y={cl.tly} width={CL_W} height={STRIP_H}
                    fill={isActive ? `${NAVY}0.60)` : `${NAVY}0.42)`}
                    style={{ transition: 'fill 0.20s' }}
                  />
                </g>

                {/* Border */}
                <rect
                  x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H} rx={8}
                  fill="none"
                  stroke={isActive ? `${NAVY}0.75)` : `${NAVY}0.40)`}
                  strokeWidth={isActive ? 1.5 : 1}
                  filter={isActive ? 'url(#am-int-glow-active)' : 'url(#am-int-glow)'}
                  style={{ transition: 'stroke 0.20s' }}
                />

                {/* Active ring */}
                {isActive && (
                  <rect
                    x={cl.tlx - 3} y={cl.tly - 3}
                    width={CL_W + 6} height={CL_H + 6} rx={10}
                    fill="none"
                    stroke={`${NAVY}0.35)`}
                    strokeWidth={1.5}
                    strokeDasharray="4 3"
                  />
                )}

                {/* Divider */}
                <line
                  x1={cl.tlx + 12} y1={cl.tly + STRIP_H}
                  x2={cl.tlx + CL_W - 12} y2={cl.tly + STRIP_H}
                  stroke={`${NAVY}0.28)`}
                />

                {/* "INSIGHT" micro label */}
                <text
                  x={cl.tlx + CL_W / 2} y={cl.tly + 16}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  fill="rgba(255,255,255,0.85)"
                  style={{ userSelect: 'none' }}
                >INSIGHT</text>

                {/* Insight lines */}
                {cl.insightLines.map((line, i) => (
                  <text
                    key={i}
                    x={cl.tlx + CL_W / 2} y={cl.tly + 34 + i * 18}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="11" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                    fill="rgba(255,255,255,0.92)"
                    style={{ userSelect: 'none' }}
                  >{line}</text>
                ))}

                {/* Cards — one per row, full cluster width */}
                {cl.cards.map((cardText, i) => {
                  const off = CARD_OFF[i]
                  return (
                    <g key={i}>
                      <rect
                        x={cl.tlx + off.dx} y={cl.tly + off.dy}
                        width={CL_W - 20} height={22} rx={3}
                        fill={isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.07)'}
                        stroke={isActive ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.20)'}
                        strokeWidth={0.8}
                        style={{ transition: 'fill 0.20s, stroke 0.20s' }}
                      />
                      <text
                        x={cl.tlx + off.dx + 8} y={cl.tly + off.dy + 12}
                        textAnchor="start" dominantBaseline="middle"
                        fontSize="11" fontFamily="var(--font-inter,sans-serif)"
                        fill={isActive ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.72)'}
                        style={{ userSelect: 'none', transition: 'fill 0.20s' }}
                      >{cardText}</text>
                    </g>
                  )
                })}
              </motion.g>
            )
          })}
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && (() => {
          const detail = DETAIL[active]
          const cluster = CLUSTERS.find(c => c.id === active)!
          return (
            <motion.div
              key={active}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease }}
            >
              {/* Insight header */}
              <div
                className="rounded-xl p-6 mb-4"
                style={{
                  background: `${NAVY}0.08)`,
                  border: `1px solid ${NAVY}0.22)`,
                }}
              >
                <p
                  className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
                >Cluster insight</p>
                <p
                  className="font-semibold"
                  style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)', lineHeight: 1.3 }}
                >{detail.insight}</p>
              </div>

              {/* Observations */}
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {detail.observations.map((obs, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-4"
                    style={{
                      background: 'var(--color-neutral-50)',
                      border: '1px solid var(--color-neutral-100)',
                    }}
                  >
                    <p
                      className="font-mono uppercase tracking-widest mb-1.5"
                      style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.50)` }}
                    >Observation {i + 1}</p>
                    <p
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-neutral-700)',
                        lineHeight: 'var(--leading-relaxed)',
                      }}
                    >{obs}</p>
                  </div>
                ))}
              </div>

              {/* Why it matters */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: `${NAVY}0.05)`,
                  border: `1px solid ${NAVY}0.16)`,
                  borderLeft: `3px solid ${NAVY}0.50)`,
                }}
              >
                <p
                  className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.60)` }}
                >Why it matters</p>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--color-neutral-700)',
                    lineHeight: 'var(--leading-relaxed)',
                  }}
                >{detail.whyItMatters}</p>
              </div>

              {/* Dismiss hint */}
              <p
                className="text-center mt-4"
                style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}
              >
                Tap <strong style={{ color: `${NAVY}0.60)` }}>{cluster.insightLines.join(' ')}</strong> again to close
              </p>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}

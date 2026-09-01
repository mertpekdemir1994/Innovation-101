'use client'

import { motion, useReducedMotion } from 'framer-motion'

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

// Card offsets relative to cluster TL — stacked single-column so each card
// has room for its full text at a legible font size
const CARD_OFF = [
  { dx: 10, dy: 74 },
  { dx: 10, dy: 100 },
  { dx: 10, dy: 126 },
  { dx: 10, dy: 152 },
] as const

export default function AMEstablishing() {
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const container = {
    hidden: {},
    visible: {
      transition: prefersReduced
        ? {}
        : { staggerChildren: 0.22, delayChildren: 0.08 },
    },
  }
  const clusterIn = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
  }
  const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1 } }
  const T = prefersReduced ? { duration: 0 } : { duration: 0.55, ease }

  return (
    <motion.div
      className="w-full select-none"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={container}
      aria-hidden="true"
    >
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="am-est-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {CLUSTERS.map(cl => (
            <clipPath key={`clip-${cl.id}`} id={`am-est-clip-${cl.id}`}>
              <rect x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H} rx={8} />
            </clipPath>
          ))}
        </defs>

        {/* Canvas background */}
        <motion.rect
          x={0} y={0} width={SVG_W} height={SVG_H} rx={10}
          fill={`${NAVY}0.05)`}
          variants={fadeIn}
          transition={T}
        />

        {/* Clusters */}
        {CLUSTERS.map(cl => (
          <motion.g
            key={cl.id}
            variants={clusterIn}
            transition={T}
          >
            {/* Cluster body - clipped to rounded rect */}
            <g clipPath={`url(#am-est-clip-${cl.id})`}>
              {/* Main background */}
              <rect
                x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H}
                fill={`${NAVY}0.10)`}
              />
              {/* Insight strip */}
              <rect
                x={cl.tlx} y={cl.tly} width={CL_W} height={STRIP_H}
                fill={`${NAVY}0.42)`}
              />
            </g>

            {/* Border stroke (outside clip so corners show cleanly) */}
            <rect
              x={cl.tlx} y={cl.tly} width={CL_W} height={CL_H} rx={8}
              fill="none"
              stroke={`${NAVY}0.40)`}
              strokeWidth={1}
              filter="url(#am-est-glow)"
            />

            {/* Divider line at bottom of strip */}
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
                    fill="rgba(255,255,255,0.07)"
                    stroke="rgba(255,255,255,0.20)"
                    strokeWidth={0.8}
                  />
                  <text
                    x={cl.tlx + off.dx + 8} y={cl.tly + off.dy + 12}
                    textAnchor="start" dominantBaseline="middle"
                    fontSize="11" fontFamily="var(--font-inter,sans-serif)"
                    fill="rgba(255,255,255,0.72)"
                    style={{ userSelect: 'none' }}
                  >{cardText}</text>
                </g>
              )
            })}
          </motion.g>
        ))}

        {/* Bottom caption */}
        <motion.text
          x={SVG_W / 2} y={SVG_H - 14}
          textAnchor="middle" dominantBaseline="auto"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.05em"
          fill="rgba(255,255,255,0.59)"
          style={{ userSelect: 'none' }}
          variants={fadeIn}
          transition={{ ...(prefersReduced ? { duration: 0 } : { duration: 0.40, ease }), delay: prefersReduced ? 0 : 1.0 }}
        >4 clusters, 16 observations, each cluster named as an insight, not a category</motion.text>
      </svg>
    </motion.div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM

type RingId = 'whole-market' | 'segment' | 'niche' | 'beachhead'

const CX = 210, CY = 210

const RINGS: { id: RingId; r: number; label: string; labelY: number }[] = [
  { id: 'whole-market', r: 155, label: 'WHOLE MARKET',   labelY:  65 },
  { id: 'segment',      r: 110, label: 'BROAD SEGMENT',  labelY: 115 },
  { id: 'niche',        r:  70, label: 'SPECIFIC NICHE', labelY: 152 },
  { id: 'beachhead',    r:  34, label: 'THE AVATAR',     labelY: 207 },
]

const RING_DETAIL: Record<RingId, { heading: string; focus: string; body: string }> = {
  'whole-market': {
    heading: 'The Whole Market',
    focus:   'Too broad to win',
    body:    'Everyone who could conceivably use what you offer. Defined by a product category or a broad behavior: "people who budget" or "small business owners." So large and heterogeneous that committing here means committing to no one in particular. This is where companies go when they want the biggest possible addressable market slide for their pitch deck.',
  },
  segment: {
    heading: 'A Broad Segment',
    focus:   'Large, and still too diffuse',
    body:    'A large slice of the market with some shared characteristics: an industry, a life stage, a geography, a size band. Segmentation is real progress: something is shared. But a broad segment still contains wildly different needs, budgets, and urgency levels. Marketing to a segment means compromise messaging and average solutions that don\'t fully satisfy anyone.',
  },
  niche: {
    heading: 'A Specific Niche',
    focus:   'Winning is now conceivable',
    body:    'A tightly-defined group with a shared, urgent need and enough homogeneity that a single well-designed product genuinely solves it. Referrals happen naturally here because the fit is tight and the word travels within the group. You can\'t easily afford niche margins at scale, but you can build an unassailable reputation before anyone notices you exist.',
  },
  beachhead: {
    heading: 'The Avatar',
    focus:   'Commit everything here first',
    body:    'The single specialized target you choose to own completely before expanding. Not the customer you want to have. The beachhead from which you take the rest of the market. The classic test: if 100 people of this exact type used your product, would you have a real business? The Avatar discipline is refusing to generalize until you\'ve dominated this one.',
  },
}

function ringState(id: RingId, active: RingId | null, hovered: RingId | null): string {
  if (active === null)  return hovered === id ? 'hovered' : 'default'
  if (id === active)    return 'active'
  return 'dim'
}

function ringFill(id: RingId, st: string): string {
  if (id === 'beachhead') {
    return st === 'active'  ? `${PLUM}0.72)`
         : st === 'hovered' ? `${PLUM}0.52)`
         : st === 'dim'     ? `${PLUM}0.06)`
         :                    `${PLUM}0.30)`
  }
  return st === 'active'  ? `${PLUM}0.42)`
       : st === 'hovered' ? `${PLUM}0.22)`
       : st === 'dim'     ? `${PLUM}0.04)`
       :                    `${PLUM}0.09)`
}

function ringStroke(id: RingId, st: string): string {
  if (id === 'beachhead') {
    return st === 'active'  ? 'rgba(255,255,255,0.90)'
         : st === 'hovered' ? 'rgba(255,255,255,0.65)'
         : st === 'dim'     ? 'rgba(255,255,255,0.15)'
         :                    'rgba(255,255,255,0.58)'
  }
  return st === 'active'  ? `${PLUM}0.90)`
       : st === 'hovered' ? `${PLUM}0.60)`
       : st === 'dim'     ? `${PLUM}0.14)`
       :                    `${PLUM}0.40)`
}

function labelColor(id: RingId, st: string): string {
  if (id === 'beachhead') {
    return st === 'dim' ? 'rgba(255,255,255,0.60)' : 'rgba(255,255,255,0.90)'
  }
  return st === 'active'  ? `${PLUM_TEXT}0.99)`
       : st === 'hovered' ? `${PLUM_TEXT}0.958)`
       : st === 'dim'     ? `${PLUM_TEXT}0.828)`
       :                    `${PLUM_TEXT}0.906)`
}

export default function AvatarsInteractive() {
  const [activeRing,  setActiveRing]  = useState<RingId | null>(null)
  const [hoveredRing, setHoveredRing] = useState<RingId | null>(null)
  const prefersReduced = useReducedMotion()

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
      {/* ── SVG bullseye ── */}
      <div className="w-full md:w-illustration shrink-0">
        <svg
          viewBox="0 0 420 420"
          width="100%"
          style={{ overflow: 'visible' }}
          role="group"
          aria-label="Bullseye diagram, click a ring to learn about each market level"
        >
          <defs>
            <filter id="av-int-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Render outer rings first so inner rings sit on top and receive clicks */}
          {[...RINGS].reverse().map(({ id, r, label, labelY }) => {
            const st = ringState(id, activeRing, hoveredRing)
            const isBeachhead = id === 'beachhead'

            return (
              <g
                key={id}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveRing(activeRing === id ? null : id)}
                onMouseEnter={() => setHoveredRing(id)}
                onMouseLeave={() => setHoveredRing(null)}
                role="button"
                tabIndex={0}
                aria-label={`Learn about ${RING_DETAIL[id].heading}`}
                aria-pressed={activeRing === id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveRing(activeRing === id ? null : id)
                  }
                }}
              >
                <motion.circle
                  cx={CX} cy={CY} r={r}
                  strokeWidth={isBeachhead ? 2 : 1.5}
                  filter={isBeachhead && st === 'active' ? 'url(#av-int-glow)' : undefined}
                  animate={{ fill: ringFill(id, st), stroke: ringStroke(id, st) }}
                  transition={{ duration: 0.22 }}
                />

                {/* Label at top of each ring band */}
                <motion.text
                  x={CX} y={labelY}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={isBeachhead ? '7' : '7.5'}
                  fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: labelColor(id, st) }}
                  transition={{ duration: 0.22 }}
                >{label}</motion.text>
              </g>
            )
          })}
        </svg>

        {!activeRing && (
          <p className="text-center mt-4"
            style={{
              fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.10em', textTransform: 'uppercase', color: `${PLUM_TEXT}0.905)`,
            }}
          >Click a ring to explore</p>
        )}
      </div>

      {/* ── Detail panel ── */}
      <div className="w-full md:flex-1 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeRing ? (
            <motion.div
              key={activeRing}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM_TEXT}0.926)` }}
              >Market level</p>
              <h3 className="font-semibold mb-1"
                style={{ fontSize: 'var(--text-2xl)', color: '#FAFAFA', lineHeight: 1.2 }}
              >{RING_DETAIL[activeRing].heading}</h3>
              <p className="font-mono mb-6"
                style={{ fontSize: 'var(--text-xs)', color: `${PLUM_TEXT}0.941)`, letterSpacing: '0.06em' }}
              >{RING_DETAIL[activeRing].focus}</p>
              <p style={{
                fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)',
                color: 'rgba(255,255,255,0.65)',
              }}>{RING_DETAIL[activeRing].body}</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-full"
              style={{ minHeight: 200 }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.625)', fontStyle: 'italic' }}>
                Select a ring to read its description.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

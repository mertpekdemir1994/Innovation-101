'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'
const AMBER = 'rgba(245,158,11,'

const SVG_W = 700, SVG_H = 268
const N_W = 78, N_H = 30, N_CY = 124

const NODES = [
  { id: 'n1', x: 20,  label: 'START'   },
  { id: 'n2', x: 148, label: 'ACCOUNT' },
  { id: 'n3', x: 282, label: 'BILLING' },
  { id: 'n4', x: 416, label: 'CANCEL'  },
  { id: 'n5', x: 548, label: 'DONE ✓' },
]
const NODE_CX = NODES.map(n => n.x + N_W / 2)

const WN_X = 234, WN_Y = 48, WN_W = 78, WN_H = 28
const WN_CX = WN_X + WN_W / 2
const WN_CY = WN_Y + WN_H / 2

const INT_ARROWS = [
  { x1: 102, x2: 144 },
  { x1: 230, x2: 278 },
  { x1: 364, x2: 412 },
  { x1: 498, x2: 544 },
]

const ACTUAL_PATH = [
  'M 59 124',
  'C 95 124 150 128 167 128',
  'L 187 124',
  'C 212 108 248 82 273 62',
  'L 273 62',
  'C 255 84 218 108 187 124',
  'C 222 128 280 130 321 124',
  'C 360 120 385 118 400 119',
].join(' ')

type ZoneId = 'intended' | 'hesitation' | 'wrongTurn' | 'backtrack' | 'stuck'

interface ZoneInfo {
  tag: string
  headline: string
  body: string
  isWrong?: boolean
}

const ZONES: Record<ZoneId, ZoneInfo> = {
  intended: {
    tag: 'THE INTENDED PATH: THE DESIGNER\'S ASSUMPTION',
    headline: 'The clean line is what you assumed. It is the route only someone who built the thing can see.',
    body: 'The intended path is the team\'s mental model of the product: what you assumed a user would do, in what sequence, to reach their goal. It is clean, direct, and obvious, to everyone who designed it. The problem is that this knowledge is invisible to a stranger. They arrive with their own mental model, their own vocabulary, their own sense of what a word like "Plan" means in this context. The intended path exists in your head. The actual path is what happens when another mind meets your interface.',
  },
  hesitation: {
    tag: 'FRICTION POINT: HESITATION',
    headline: 'They paused here. They did not know what to do next.',
    body: 'Hesitation is quiet and easy to miss live, but it is one of the most reliable signals the method produces. When a person pauses, the interface has not communicated what the designer assumed it communicated. The path that seemed obvious has, for this person, become ambiguous. Hesitation often precedes a wrong turn: the person scans for the nearest word that connects to their goal, and the result depends on their vocabulary, not yours.',
  },
  wrongTurn: {
    tag: 'FRICTION POINT: WRONG TURN (THE MOST INSTRUCTIVE FAILURE)',
    headline: 'They clicked "Plan details", not tentatively but CONFIDENTLY. They were certain they were right.',
    body: 'The confident wrong turn is the most instructive finding a usability test produces. The person was not guessing; they were sure. This means the interface told them something the team never intended to say: that "Plan" was the word connecting to their goal, and this path was the right one. They were wrong, but the interface was responsible. This fact did not exist as a piece of knowledge until a human enacted it. No heuristic principle predicts which specific word a specific person will latch onto; that emerges from their particular mental model meeting your particular label.',
    isWrong: true,
  },
  backtrack: {
    tag: 'FRICTION POINT: BACKTRACK',
    headline: 'They realised "Plan details" was not the right place and came back.',
    body: 'A backtrack costs more than the visible time. Each wrong turn and return erodes the person\'s confidence in the product. By the time they have backtracked twice, they are no longer simply looking for a button; they are beginning to believe the product is confusing. That belief makes every subsequent action more hesitant. The person starts doubting themselves. They will often say, in post-test questioning, that they probably just missed something obvious, taking the blame that belongs to the design.',
  },
  stuck: {
    tag: 'FRICTION POINT: STUCK (HARD STOP)',
    headline: 'They could not proceed. In a live product, this is where they close the tab.',
    body: 'The hard stop is the terminal failure. The person has exhausted their strategies without finding the path forward, and they have not arrived at their goal. In a live product with real stakes, trying to cancel a subscription they are being charged for, this is where they abandon, or call support in frustration. They will not tell you the interface was confusing; most people blame themselves. They will leave. The usability test shows you the exact sequence of events that led to this moment, so you can close the path to it.',
  },
}

const ZONE_BUTTONS: { id: ZoneId; label: string }[] = [
  { id: 'intended',   label: 'INTENDED PATH'  },
  { id: 'hesitation', label: 'HESITATION'      },
  { id: 'wrongTurn',  label: 'WRONG TURN'      },
  { id: 'backtrack',  label: 'BACKTRACK'       },
  { id: 'stuck',      label: 'STUCK'           },
]

// Friction point positions (cx, cy, hit radius)
const FRICTION_POS: Record<Exclude<ZoneId, 'intended'>, { cx: number; cy: number }> = {
  hesitation: { cx: 187, cy: 124 },
  wrongTurn:  { cx: 273, cy: 62  },
  backtrack:  { cx: 234, cy: 95  },
  stuck:      { cx: 400, cy: 119 },
}

export default function UTInteractive() {
  const [active, setActive] = useState<ZoneId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const isActive = (z: ZoneId) => active === z

  const info = active ? ZONES[active] : null

  // Opacity helpers
  const actualOpacity = active === 'intended' ? 0.15 : 1
  const intendedOpacity = active && active !== 'intended' ? 0.22 : 1
  const frictionCircleOpacity = (z: Exclude<ZoneId, 'intended'>) =>
    active ? (isActive(z) ? 1 : 0.18) : 1

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Interactive intended-versus-actual path diagram. Click a friction point to explore it."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block', cursor: 'default' }}
      >
        <defs>
          <filter id="ut-int-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="ut-int-iarr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="rgba(255,255,255,0.50)" />
          </marker>
        </defs>

        {/* Background */}
        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Legend */}
        <g>
          <line x1={22} y1={22} x2={46} y2={22} stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
          <text x={50} y={22} dominantBaseline="middle" fontSize="4.0"
            fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill="rgba(255,255,255,0.45)" style={{ userSelect: 'none' }}>
            INTENDED PATH
          </text>
          <line x1={22} y1={34} x2={46} y2={34} stroke={`${BRICK}0.85)`} strokeWidth="1.5" />
          <text x={50} y={34} dominantBaseline="middle" fontSize="4.0"
            fontFamily="var(--font-mono)" letterSpacing="0.09em"
            fill={`${BRICK}0.85)`} style={{ userSelect: 'none' }}>
            ACTUAL PATH
          </text>
        </g>

        {/* Main nodes */}
        {NODES.map((n, i) => {
          const isUnreached = i >= 3
          return (
            <g key={n.id}>
              <rect x={n.x} y={N_CY - N_H / 2} width={N_W} height={N_H}
                fill={isUnreached ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.06)'}
                stroke={isUnreached ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.28)'}
                strokeWidth="1" rx={3} />
              <text x={NODE_CX[i]} y={N_CY}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={isUnreached ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.80)'}
                style={{ userSelect: 'none' }}>
                {n.label}
              </text>
            </g>
          )
        })}

        {/* NOT REACHED label */}
        <text x={521} y={103} textAnchor="middle" dominantBaseline="middle"
          fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
          fill="rgba(255,255,255,0.18)" style={{ userSelect: 'none' }}>
          NOT REACHED
        </text>

        {/* Wrong-turn node */}
        <rect x={WN_X} y={WN_Y} width={WN_W} height={WN_H}
          fill={`${AMBER}0.07)`}
          stroke={isActive('wrongTurn') ? `${AMBER}0.65)` : `${AMBER}0.35)`}
          strokeWidth="1" rx={3} />
        <text x={WN_CX} y={WN_CY}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
          fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
          PLAN DETAILS
        </text>

        {/* Intended path arrows */}
        <motion.g
          animate={{ opacity: intendedOpacity }}
          transition={{ duration: 0.22 }}>
          {INT_ARROWS.map((a, i) => (
            <line key={i}
              x1={a.x1} y1={N_CY} x2={a.x2} y2={N_CY}
              stroke="rgba(255,255,255,0.42)" strokeWidth="1.5"
              markerEnd="url(#ut-int-iarr)" />
          ))}
        </motion.g>

        {/* Intended path hit area */}
        <rect x={20} y={105} width={530} height={38} fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={() => setActive(active === 'intended' ? null : 'intended')}
          role="button" aria-pressed={active === 'intended'}
          aria-label="Click to explore the intended path" />

        {/* Actual path */}
        <motion.path
          d={ACTUAL_PATH}
          fill="none"
          stroke={`${BRICK}0.88)`}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ opacity: actualOpacity }}
          transition={{ duration: 0.22 }} />

        {/* Friction point markers + hit areas */}
        {(Object.keys(FRICTION_POS) as Exclude<ZoneId, 'intended'>[]).map((z) => {
          const pos = FRICTION_POS[z]
          const isWrong = z === 'wrongTurn'
          const markerColor = isWrong ? `${AMBER}0.90)` : `${BRICK}0.90)`
          const labelColor = isWrong ? `${AMBER}0.85)` : `${BRICK}0.85)`
          const labelMap: Record<string, string> = {
            hesitation: 'HESITATION',
            wrongTurn: 'WRONG TURN',
            backtrack: 'BACKTRACK',
            stuck: 'STUCK',
          }
          const labelPosMap: Record<string, { lx: number; ly: number }> = {
            hesitation: { lx: 187, ly: 90  },
            wrongTurn:  { lx: 338, ly: 46  },
            backtrack:  { lx: 160, ly: 78  },
            stuck:      { lx: 400, ly: 90  },
          }
          const lp = labelPosMap[z]
          return (
            <motion.g key={z}
              animate={{ opacity: frictionCircleOpacity(z) }}
              transition={{ duration: 0.20 }}>
              {/* Circle */}
              <circle cx={pos.cx} cy={pos.cy} r={isActive(z) ? 7 : 5}
                fill={markerColor}
                stroke="rgba(10,10,18,0.80)" strokeWidth="1.5"
                style={{ cursor: 'pointer' }}
                onClick={() => setActive(active === z ? null : z)} />
              {/* Label */}
              <text x={lp.lx} y={lp.ly}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
                fill={labelColor} style={{ userSelect: 'none', cursor: 'pointer' }}
                onClick={() => setActive(active === z ? null : z)}>
                {labelMap[z]}
              </text>
              {/* Larger transparent hit area */}
              <circle cx={pos.cx} cy={pos.cy} r={20} fill="transparent"
                style={{ cursor: 'pointer' }}
                onClick={() => setActive(active === z ? null : z)}
                role="button" aria-pressed={active === z}
                aria-label={`Click to explore ${labelMap[z]}`} />
            </motion.g>
          )
        })}

        {/* Divergence annotation */}
        <motion.g animate={{ opacity: active ? 0.20 : 1 }} transition={{ duration: 0.22 }}>
          <text x={510} y={72} textAnchor="middle" dominantBaseline="middle"
            fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={`${BRICK}0.42)`} style={{ userSelect: 'none' }}>
            THE DIVERGENCE
          </text>
          <text x={510} y={83} textAnchor="middle" dominantBaseline="middle"
            fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`${BRICK}0.30)`} style={{ userSelect: 'none' }}>
            IS THE FINDING
          </text>
        </motion.g>
      </svg>

      {/* Zone legend buttons */}
      <div className="flex flex-wrap gap-2 mt-4 mb-6">
        {ZONE_BUTTONS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActive(active === id ? null : id)}
            aria-pressed={active === id}
            className="rounded-full px-3 py-1 text-xs font-mono tracking-widest transition-all"
            style={{
              background: active === id
                ? id === 'wrongTurn' ? `${AMBER}0.15)` : `${BRICK}0.15)`
                : 'transparent',
              color: active === id
                ? id === 'wrongTurn' ? `${AMBER}0.90)` : `${BRICK}0.90)`
                : id === 'wrongTurn' ? `${AMBER}0.45)` : `${BRICK}0.45)`,
              border: `1px solid ${active === id
                ? id === 'wrongTurn' ? `${AMBER}0.50)` : `${BRICK}0.50)`
                : id === 'wrongTurn' ? `${AMBER}0.22)` : `${BRICK}0.22)`}`,
            }}
          >
            {label}
          </button>
        ))}
        {active && (
          <button
            onClick={() => setActive(null)}
            className="rounded-full px-3 py-1 text-xs font-mono tracking-widest"
            style={{ background: 'transparent', color: 'rgba(255,255,255,0.30)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            CLEAR
          </button>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {info && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.20, ease }}
            className="rounded-lg p-5"
            style={{
              background: info.isWrong ? `${AMBER}0.05)` : `${BRICK}0.05)`,
              border: `1px solid ${info.isWrong ? `${AMBER}0.22)` : `${BRICK}0.20)`}`,
            }}
          >
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: info.isWrong ? `${AMBER}0.75)` : `${BRICK}0.70)` }}>
              {info.tag}
            </p>
            <p className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-base)', color: '#FAFAFA', lineHeight: 1.35 }}>
              {info.headline}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)' }}>
              {info.body}
            </p>
            {info.isWrong && (
              <div className="mt-3 rounded px-3 py-2"
                style={{ background: `${AMBER}0.06)`, borderLeft: `2px solid ${AMBER}0.40)` }}>
                <p className="font-mono" style={{ fontSize: 'var(--text-xs)', color: `${AMBER}0.75)` }}>
                  This is why you cannot predict the finding in advance: it requires a real mind meeting your interface to exist at all.
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!active && (
        <p className="font-mono text-center"
          style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.22)', letterSpacing: '0.09em' }}>
          CLICK THE INTENDED PATH OR ANY FRICTION POINT TO EXPLORE
        </p>
      )}
    </div>
  )
}

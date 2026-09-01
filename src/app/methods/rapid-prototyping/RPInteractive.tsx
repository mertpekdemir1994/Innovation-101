'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(181,97,62,'
const CLAY_TEXT = 'rgba(201,139,113,'  // brightened text-safe variant of CLAY

const SVG_W = 700
const SVG_H = 262

const AXIS_Y   = 118
const AXIS_X1  = 54
const AXIS_X2  = 660

const NAME_Y  = 76
const SUB_Y   = 92

type RungId = 'paper' | 'quick' | 'click' | 'polished'

type RungDef = {
  id: RungId
  x: number
  low: boolean
  name: string
  sub: string
  cost: string
  feedback: string
  headline: string
  body: string
  note: string
}

const RUNGS: RungDef[] = [
  {
    id: 'paper', x: 103, low: true,
    name: 'PAPER SKETCH', sub: 'hand-drawn · minutes · free',
    cost: 'MINUTES / FREE', feedback: 'raw concept & structure',
    headline: 'The fastest thing you can build, and often the most honest.',
    body: 'Hand-drawn, made in minutes, nearly free. Show someone a rough paper sketch and they comment on the concept, the flow, whether the idea solves their problem, because it is obviously unfinished, so they engage with the idea rather than the surface. No one wastes a word on colors or fonts. For most early-stage concept questions, this is the highest-learning-per-effort option available.',
    note: 'Default to paper for any question of the form "does this concept make sense?". Start here before climbing up the ladder.',
  },
  {
    id: 'quick', x: 248, low: true,
    name: 'CONCEPTUAL VISUAL', sub: 'fast drawn or digital',
    cost: 'UNDER AN HOUR', feedback: 'concept feedback (slightly richer)',
    headline: 'A step up in legibility, still clearly rough.',
    body: 'A fast digital or drawn representation that communicates the concept more concretely than paper: richer, slightly more grounded, still clearly unfinished. Good for sharing an idea more legibly or preparing for a slightly broader audience than a paper sketch would serve. Still in concept territory. The feedback is still concept-level; the fidelity is still low.',
    note: 'Watch for feedback beginning to drift toward the surface as it starts looking more finished. The moment users comment on layout or color, you have climbed past concept territory.',
  },
  {
    id: 'click', x: 393, low: false,
    name: 'CLICKABLE MOCKUP', sub: 'e.g. Figma · interactive',
    cost: 'HOURS', feedback: 'flow & interaction feedback',
    headline: 'The digital workhorse, once the concept is settled.',
    body: 'An interactive mock the user can click through. More effort, and more real. Warranted specifically when the learning question is about flow or interaction: "does this navigation make sense? is this sequence right?" For digital products, this is the workhorse fidelity once the concept has been validated at a lower level. As it starts looking finished, feedback begins drifting toward the surface: color, copy, layout.',
    note: 'Earn the clickable mock. It is warranted when the question is specifically about flow and interaction, not before. A polished-looking clickable mock before the concept is settled pulls feedback toward polish too early.',
  },
  {
    id: 'polished', x: 558, low: false,
    name: 'POLISHED PROTOTYPE', sub: 'near-real · expensive',
    cost: 'DAYS', feedback: 'polish & surface feedback ⚠',
    headline: 'Expensive, slow, and for early learning often counterproductive.',
    body: 'Looks almost like the real product. Useful for late-stage refinement questions, but for early concept learning, often counterproductive: users react to it as finished, commenting on visual polish and wording rather than whether the concept works. It can over-commit a team to a direction before it is validated, and it makes the prototype too precious to discard.',
    note: 'Save high fidelity for late-stage questions about refinement. Spending days on a polished prototype before the concept is validated is one of the most common, and most costly, prototyping mistakes.',
  },
]

const ZONE_X1  = RUNGS[0].x - 22
const ZONE_X2  = RUNGS[1].x + 22
const ZONE_MID = (ZONE_X1 + ZONE_X2) / 2

export default function RPInteractive() {
  const [selected, setSelected] = useState<RungId | null>(null)
  const prefersReduced = useReducedMotion()

  function toggle(id: RungId) {
    setSelected(prev => (prev === id ? null : id))
  }

  const sel = selected !== null ? RUNGS.find(r => r.id === selected) ?? null : null

  return (
    <div className="w-full space-y-6">
      <div
        className="w-full"
        role="group"
        aria-label="Interactive fidelity spectrum. Click a fidelity level to see what it costs, what feedback it invites, and when to use it."
      >
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ maxWidth: 'var(--width-illustration)', display: 'block', cursor: 'default' }}>
          <defs>
            <filter id="rp-int-clay-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
              <feFlood floodColor={`${CLAY}0.55)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="rp-int-white-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feFlood floodColor="rgba(255,255,255,0.45)" result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ── Axis ── */}
          <line x1={AXIS_X1} y1={AXIS_Y} x2={AXIS_X2} y2={AXIS_Y}
            stroke="rgba(255,255,255,0.12)" strokeWidth={1} />
          <path d={`M ${AXIS_X2-6} ${AXIS_Y-4} L ${AXIS_X2+2} ${AXIS_Y} L ${AXIS_X2-6} ${AXIS_Y+4}`}
            stroke="rgba(255,255,255,0.18)" strokeWidth={1} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <text x={AXIS_X1+2} y={AXIS_Y+10} textAnchor="start"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
            ROUGH · FAST
          </text>
          <text x={AXIS_X2+4} y={AXIS_Y+10} textAnchor="start"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
            HIGH FIDELITY →
          </text>

          {/* ── Rungs ── */}
          {RUNGS.map(r => {
            const isSelected = selected === r.id
            const isDimmed   = selected !== null && !isSelected
            const strokeO  = isSelected ? (r.low ? '1.0)' : '0.80)') : isDimmed ? '0.12)' : (r.low ? '0.80)' : '0.32)')
            const fillO    = isSelected ? (r.low ? '0.20)' : '0.12)') : isDimmed ? '0.03)' : (r.low ? '0.12)' : '0.05)')
            const nameO    = isSelected ? (r.low ? '1.00)' : '0.90)') : isDimmed ? '0.14)' : (r.low ? '0.88)' : '0.58)')
            const subO     = isSelected ? (r.low ? '0.60)' : '0.45)') : isDimmed ? '0.08)' : (r.low ? '0.44)' : '0.26)')
            const circleStroke = r.low ? `${CLAY}${strokeO}` : `rgba(255,255,255,${strokeO}`
            const circleFill   = r.low ? `${CLAY}${fillO}`   : `rgba(255,255,255,${fillO}`
            const nameColor    = r.low ? `${CLAY}${nameO}`   : `rgba(255,255,255,${nameO}`
            const subColor     = r.low ? `${CLAY}${subO}`    : `rgba(255,255,255,${subO}`

            return (
              <g key={r.id}
                onClick={() => toggle(r.id)}
                role="button"
                aria-label={`${r.name}: ${r.feedback}`}
                aria-pressed={isSelected}
                style={{ cursor: 'pointer' }}
              >
                {/* Expanded hit area */}
                <rect x={r.x - 50} y={AXIS_Y - 45} width={100} height={90} fill="transparent" />
                {/* Tick */}
                <line x1={r.x} y1={AXIS_Y - 6} x2={r.x} y2={AXIS_Y + 6}
                  stroke={r.low ? `${CLAY}${isSelected ? '0.90)' : isDimmed ? '0.14)' : '0.55)'}` : `rgba(255,255,255,${isSelected ? '0.60)' : isDimmed ? '0.08)' : '0.22)'}`}
                  strokeWidth={isSelected ? 1.8 : 1} />
                {/* Glow behind selected */}
                {isSelected && (
                  <circle cx={r.x} cy={AXIS_Y} r={10}
                    fill="none"
                    stroke={r.low ? `${CLAY}0.14)` : 'rgba(255,255,255,0.08)'}
                    strokeWidth={8}
                    style={{ filter: r.low ? 'url(#rp-int-clay-glow)' : 'url(#rp-int-white-glow)' }} />
                )}
                {/* Circle */}
                <circle cx={r.x} cy={AXIS_Y} r={isSelected ? 7 : 5}
                  fill={circleFill} stroke={circleStroke} strokeWidth={isSelected ? 2 : 1.2} />
                {/* Connector */}
                <line x1={r.x} y1={AXIS_Y - (isSelected ? 8 : 6)} x2={r.x} y2={SUB_Y}
                  stroke={r.low ? `${CLAY}${isSelected ? '0.22)' : isDimmed ? '0.05)' : '0.14)'}` : `rgba(255,255,255,${isSelected ? '0.15)' : isDimmed ? '0.03)' : '0.08)'}`}
                  strokeWidth={0.8} strokeDasharray="2 2" />
                {/* Name */}
                <text x={r.x} y={NAME_Y} textAnchor="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.11em"
                  fill={nameColor} style={{ userSelect: 'none' }}>{r.name}</text>
                {/* Sub */}
                <text x={r.x} y={SUB_Y} textAnchor="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={subColor} style={{ userSelect: 'none' }}>{r.sub}</text>
                {/* Feedback type below axis (only when selected) */}
                {isSelected && (
                  <text x={r.x} y={AXIS_Y + 22} textAnchor="middle"
                    fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                    fill={r.low ? `${CLAY_TEXT}0.948)` : 'rgba(255,255,255,0.71)'}
                    style={{ userSelect: 'none' }}>
                    → {r.feedback}
                  </text>
                )}
              </g>
            )
          })}

          {/* ── JUST ENOUGH TO LEARN marker (always visible) ── */}
          <line x1={ZONE_X1} y1={162} x2={ZONE_X2} y2={162}
            stroke={`${CLAY}0.32)`} strokeWidth={0.8} />
          <line x1={ZONE_X1} y1={154} x2={ZONE_X1} y2={170}
            stroke={`${CLAY}0.32)`} strokeWidth={0.8} />
          <line x1={ZONE_X2} y1={154} x2={ZONE_X2} y2={170}
            stroke={`${CLAY}0.32)`} strokeWidth={0.8} />
          <text x={ZONE_MID} y={182} textAnchor="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${CLAY_TEXT}0.941)`} style={{ userSelect: 'none' }}>
            JUST ENOUGH TO LEARN
          </text>

          {/* ── Caption ── */}
          <text x={SVG_W / 2} y={SVG_H - 6} textAnchor="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.565)" style={{ userSelect: 'none' }}>
            THE FEEDBACK A PROTOTYPE INVITES DEPENDS ON HOW FINISHED IT LOOKS, ROUGHNESS IS A FEATURE
          </text>
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {sel === null ? (
          <motion.div key="idle"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 text-sm"
            style={{ borderColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}>
            Click a fidelity level to see what it costs, what feedback it invites, and when to use it.
          </motion.div>
        ) : (
          <motion.div key={`rung-${selected}`}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="rounded-lg border p-5 space-y-4"
            style={{
              borderColor: sel.low ? `${CLAY}0.28)` : 'rgba(255,255,255,0.12)',
              background:  sel.low ? `${CLAY}0.05)` : 'rgba(255,255,255,0.02)',
            }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: sel.low ? `${CLAY}0.90)` : 'rgba(255,255,255,0.60)' }}>
                {sel.name}
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: sel.low ? `${CLAY}0.10)` : 'rgba(255,255,255,0.07)',
                  color:      sel.low ? `${CLAY}0.80)` : 'rgba(255,255,255,0.50)',
                  border:     `1px solid ${sel.low ? `${CLAY}0.22)` : 'rgba(255,255,255,0.12)'}`,
                }}>
                {sel.cost}
              </span>
              {sel.id === 'click' && (
                <span className="text-[9px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{ background: `${CLAY}0.14)`, color: `${CLAY}0.90)`, border: `1px solid ${CLAY}0.30)` }}>
                  ★ digital workhorse
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-semibold mb-2"
                style={{ color: sel.low ? '#FAFAFA' : '#FAFAFA' }}>{sel.headline}</p>
              <p className="text-sm leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.55)' }}>{sel.body}</p>
            </div>
            <div className="border-t pt-4"
              style={{ borderColor: sel.low ? `${CLAY}0.14)` : 'rgba(255,255,255,0.08)' }}>
              <p className="text-[9px] font-semibold uppercase tracking-widest mb-1"
                style={{ color: sel.low ? `${CLAY}0.60)` : 'rgba(255,255,255,0.35)' }}>
                Feedback invited
              </p>
              <p className="text-sm italic"
                style={{ color: 'rgba(255,255,255,0.42)' }}>{sel.feedback}</p>
            </div>
            <div className="pt-0">
              <p className="text-xs leading-relaxed italic"
                style={{ color: 'rgba(255,255,255,0.30)' }}>{sel.note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

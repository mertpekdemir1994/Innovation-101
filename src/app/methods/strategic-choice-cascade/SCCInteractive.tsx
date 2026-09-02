'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM

const SVG_W = 700
const SVG_H = 536

const BOX_W = 290
const BOX_H = 50
const CX = 350
const BOX_LEFT  = CX - BOX_W / 2
const BOX_RIGHT = CX + BOX_W / 2

type ChoiceId = 'aspiration' | 'where' | 'how' | 'capabilities' | 'systems'

const CHOICES: {
  id: ChoiceId
  cy: number
  label: string
  sub: string
  heart: boolean
  headline: string
  body: string
  links: string
  keyQuestion: string
}[] = [
  {
    id: 'aspiration',
    cy: 66,
    label: 'WINNING ASPIRATION',
    sub: 'what does winning look like?',
    heart: false,
    headline: 'The purpose and definition of success that frames every choice below it.',
    body: 'Not a vague mission or a list of values. A winning aspiration states concretely what winning actually looks like: for the organisation, for the people it serves, and in the competitive context it operates in. It frames the where-to-play and how-to-win by defining what "winning" means. Without a concrete aspiration, there is no way to evaluate whether a given where-to-play or how-to-win actually serves it.',
    links: 'Every other choice should be assessed against the aspiration. Where-to-play must serve it; how-to-win must realise it; capabilities and systems must sustain it. If any choice contradicts the aspiration, the cascade breaks from the top.',
    keyQuestion: 'What does winning actually look like, for customers, for the organisation, in the competitive landscape?',
  },
  {
    id: 'where',
    cy: 170,
    label: 'WHERE TO PLAY',
    sub: 'which markets, segments, channels?',
    heart: true,
    headline: 'The defining act of choice: which arenas, and critically, which NOT.',
    body: 'Where-to-play is the cascade\'s hardest choice, and its most important. It names the specific markets, segments, geographies, channels, and product categories in which the organisation will compete, and is just as explicit about where it will not. Playing everywhere is not a choice; it is the absence of strategy. The exclusions are where the strategic value lives.',
    links: 'Where-to-play is one half of the strategy\'s heart. It must serve the winning aspiration, and it must fit tightly with how-to-win: the two choices must reinforce each other. A where-to-play choice changes what capabilities are required and what management systems are needed. Changing where-to-play ripples through every choice below it.',
    keyQuestion: 'In which specific arenas will we compete, and which arenas are we explicitly choosing to leave?',
  },
  {
    id: 'how',
    cy: 274,
    label: 'HOW TO WIN',
    sub: 'how do we create unique value there?',
    heart: true,
    headline: 'The source of advantage: how you create unique, hard-to-copy value in the chosen arenas.',
    body: 'How-to-win answers the question: within the chosen where-to-play, what do we do that creates unique value and sustainable advantage? It must be genuinely distinctive, not something any well-managed competitor could also do. The source of advantage might be product superiority, cost leadership, customer relationships, network effects, proprietary assets, or some combination, but it must be real and defensible in the specific arenas chosen.',
    links: 'How-to-win is the second half of the strategy\'s heart. It must fit the where-to-play: a how-to-win that would work in every arena is not a strategy. It drives the capabilities choices directly: the required activities and assets follow from the chosen way of winning. If the capabilities cannot support the how-to-win, the how-to-win is a wish, not a strategy.',
    keyQuestion: 'In our chosen arenas, what do we do that creates unique, hard-to-copy value, and why would customers choose us over alternatives?',
  },
  {
    id: 'capabilities',
    cy: 378,
    label: 'CAPABILITIES',
    sub: 'what must we be able to do?',
    heart: false,
    headline: 'The set of activities the organisation must be distinctively good at to win the chosen way.',
    body: 'Capabilities are the reinforcing activities and assets the organisation must have to deliver the how-to-win in the chosen where-to-play. They are not generic operational competence; they are the specific things the organisation must be distinctively able to do to win the way it has chosen. If a capability is not linked to the how-to-win, it may be valuable but it is not strategic.',
    links: 'Capabilities flow directly from how-to-win: the chosen way of winning determines what the organisation must be able to do. Absent or weak capabilities make the how-to-win hollow. Identifying capability gaps turns those gaps into priorities: either the organisation builds the capability (which may feed into Delivery & Validation work), or it must change the how-to-win to match its real capabilities. The management systems below must build and sustain these capabilities.',
    keyQuestion: 'What must we be distinctively able to do, better than competitors and consistently enough to sustain our how-to-win?',
  },
  {
    id: 'systems',
    cy: 482,
    label: 'MANAGEMENT SYSTEMS',
    sub: 'what systems and measures sustain it?',
    heart: false,
    headline: 'What turns a strategy on paper into one that holds in practice.',
    body: 'Management systems are the structures, processes, and measures that build the required capabilities and sustain the strategic choices over time. They include performance measurement systems, talent and development processes, governance structures, and the cadences and reviews that catch drift from the strategic direction. Without them, the strategy lives only in the document; the organisation reverts to its old patterns.',
    links: 'Management systems must build the capabilities that support the how-to-win. They close the loop: the cascade flows top to bottom, but systems and measures provide the feedback that keeps the whole cascade coherent over time. If systems are not designed to reinforce the specific capabilities and choices above them, the cascade degrades as the market and organisation evolve.',
    keyQuestion: 'What systems, structures, and measures do we need to build the required capabilities and keep the strategic choices holding in practice?',
  },
]

export default function SCCInteractive() {
  const [active, setActive] = useState<ChoiceId | null>(null)
  const prefersReduced = useReducedMotion()

  const activeChoice = CHOICES.find(c => c.id === active) ?? null
  const fade = prefersReduced ? { duration: 0 } : { duration: 0.20 }

  function boxOpacity(choice: typeof CHOICES[0]): number {
    if (!active) return 1
    if (active === choice.id) return 1
    // Adjacent choices to active are slightly dimmed, others more dimmed
    const activeIdx = CHOICES.findIndex(c => c.id === active)
    const thisIdx = CHOICES.findIndex(c => c.id === choice.id)
    const dist = Math.abs(activeIdx - thisIdx)
    return dist === 1 ? 0.55 : 0.28
  }

  return (
    <div className="w-full space-y-6">
      <p className="font-mono uppercase tracking-widest"
        style={{ fontSize: 'var(--text-2xs)', color: `${PLUM_TEXT}0.85)` }}>
        Click any choice to reveal it and its connections, Where to Play and How to Win are the heart
      </p>

      <div className="w-full">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet"
          style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', cursor: 'pointer' }}
          aria-label="Interactive Strategic Choice Cascade, click a choice to learn what it means and how it connects to the others"
          role="img">

          <defs>
            <filter id="scc-int-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
              <feFlood floodColor={`${PLUM}0.55)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="scc-int-heart-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="9" result="blur" />
              <feFlood floodColor={`${PLUM}0.70)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Choice boxes */}
          {CHOICES.map((c) => {
            const isActive = active === c.id
            const opacity = boxOpacity(c)
            return (
              <motion.g key={c.id}
                animate={{ opacity }}
                transition={fade}
                onClick={() => setActive(prev => prev === c.id ? null : c.id)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-label={`${c.label}: ${c.keyQuestion}`}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActive(prev => prev === c.id ? null : c.id)
                  }
                }}>
                <rect
                  x={BOX_LEFT} y={c.cy - BOX_H / 2} width={BOX_W} height={BOX_H} rx={5}
                  fill={isActive ? `${PLUM}0.18)` : c.heart ? `${PLUM}0.12)` : `${PLUM}0.06)`}
                  stroke={isActive ? `${PLUM}0.85)` : c.heart ? `${PLUM}0.65)` : `${PLUM}0.35)`}
                  strokeWidth={isActive ? 1.8 : c.heart ? 1.5 : 1.1}
                  style={{ filter: (isActive || c.heart) ? 'url(#scc-int-glow)' : 'none', transition: 'all 0.18s' }}
                />
                <text x={CX} y={c.cy - 8} textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.13em" fontWeight="600"
                  fill={isActive ? `${PLUM_TEXT}1.0)` : c.heart ? `${PLUM_TEXT}0.979)` : 'rgba(255,255,255,0.72)'}
                  style={{ userSelect: 'none' }}>
                  {c.label}
                </text>
                <text x={CX} y={c.cy + 10} textAnchor="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={isActive ? `${PLUM_TEXT}0.926)` : c.heart ? `${PLUM_TEXT}0.885)` : 'rgba(255,255,255,0.63)'}
                  style={{ userSelect: 'none' }}>
                  {c.sub}
                </text>
                {c.heart && (
                  <text x={BOX_RIGHT + 9} y={c.cy + 3} textAnchor="start"
                    fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                    fill={isActive ? `${PLUM_TEXT}0.937)` : `${PLUM_TEXT}0.885)`}
                    style={{ userSelect: 'none' }}>
                    ★ the heart
                  </text>
                )}
              </motion.g>
            )
          })}

          {/* Down-cascade connectors */}
          {CHOICES.slice(0, -1).map((c, i) => {
            const next = CHOICES[i + 1]
            const y1 = c.cy + BOX_H / 2 + 4
            const y2 = next.cy - BOX_H / 2 - 10
            const isHighlit = active === c.id || active === next.id
            return (
              <motion.g key={`conn-${i}`}
                animate={{ opacity: active ? (isHighlit ? 1 : 0.22) : 0.50 }}
                transition={fade}>
                <line x1={CX} y1={y1} x2={CX} y2={y2}
                  stroke={isHighlit ? `${PLUM}0.60)` : `${PLUM}0.40)`}
                  strokeWidth={isHighlit ? 1.4 : 1.0} />
                <polygon
                  points={`${CX - 5},${y2} ${CX + 5},${y2} ${CX},${y2 + 9}`}
                  fill={isHighlit ? `${PLUM}0.60)` : `${PLUM}0.40)`} />
              </motion.g>
            )
          })}

          {/* Right-side coherence arc: shows when WHERE or HOW active */}
          <motion.g animate={{ opacity: (active === 'where' || active === 'how' || active === 'capabilities' || active === 'systems') ? 0.45 : active ? 0.10 : 0.22 }} transition={fade}>
            <path
              d={`M ${BOX_RIGHT},${482} C 616,${482} 616,${66} ${BOX_RIGHT},${66}`}
              fill="none" stroke={`${PLUM}1)`} strokeWidth={1.0} strokeDasharray="4 3"
            />
            <polygon
              points={`${BOX_RIGHT + 1},${66} ${BOX_RIGHT + 11},${60} ${BOX_RIGHT + 11},${72}`}
              fill={`${PLUM}1)`} />
            <text x={632} y={295} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={`${PLUM_TEXT}1.0)`} style={{ userSelect: 'none' }}>
              ↑ MUST COHERE ↓
            </text>
          </motion.g>

          {/* WHERE↔HOW heart arc: highlights when WHERE or HOW active */}
          <motion.g animate={{ opacity: (active === 'where' || active === 'how') ? 1 : active ? 0.12 : 0.40 }} transition={fade}>
            <path
              d={`M ${BOX_LEFT},${170} C 148,${170} 148,${274} ${BOX_LEFT},${274}`}
              fill="none" stroke={`${PLUM}1)`} strokeWidth={1.4}
            />
            <polygon
              points={`${BOX_LEFT - 1},${274} ${BOX_LEFT - 11},${268} ${BOX_LEFT - 11},${280}`}
              fill={`${PLUM}1)`} />
            <text x={118} y={226} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill={`${PLUM_TEXT}1.0)`} style={{ userSelect: 'none' }}>
              MUST FIT
            </text>
          </motion.g>

          {/* AMBER coherence-break warning: shows in idle state as hint */}
          {!active && (
            <text x={CX} y={SVG_H - 6} textAnchor="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill={`rgba(221,132,30,0.86)`} style={{ userSelect: 'none' }}>
              CHANGING ONE CHOICE RIPPLES THROUGH THE OTHERS, A CONTRADICTION BREAKS THE CASCADE
            </text>
          )}
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeChoice ? (
          <motion.div key={activeChoice.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.20 }}
            className="rounded-xl border p-5 space-y-4"
            style={{
              borderColor: activeChoice.heart ? `${PLUM}0.40)` : `${PLUM}0.22)`,
              background: activeChoice.heart ? `${PLUM}0.08)` : `${PLUM}0.04)`,
              borderLeft: `3px solid ${activeChoice.heart ? `${PLUM}0.75)` : `${PLUM}0.40)`}`,
            }}>
            <div className="flex items-baseline gap-3 flex-wrap">
              <p className="font-mono uppercase tracking-widest font-semibold"
                style={{ fontSize: 'var(--text-xs)', color: `${PLUM_TEXT}1)` }}>
                {activeChoice.label}
              </p>
              {activeChoice.heart && (
                <span className="font-mono uppercase tracking-widest rounded-full px-2 py-0.5"
                  style={{ fontSize: 'var(--text-2xs)', color: `${PLUM_TEXT}0.85)`, background: `${PLUM}0.12)`, border: `1px solid ${PLUM}0.28)` }}>
                  ★ The Heart of the Strategy
                </span>
              )}
            </div>

            <p className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'var(--text-2xs)', color: `${PLUM_TEXT}0.85)` }}>
              {activeChoice.keyQuestion}
            </p>

            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.72)', lineHeight: 'var(--leading-relaxed)' }}>
              {activeChoice.headline}
            </p>

            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
              {activeChoice.body}
            </p>

            <div className="rounded-lg p-3"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${PLUM_TEXT}0.85)` }}>
                How it connects
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
                {activeChoice.links}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="idle"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="rounded-xl p-5 text-center"
            style={{ border: '1px dashed rgba(255,255,255,0.10)' }}>
            <p className="font-mono uppercase tracking-widest"
              style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.50)' }}>
              Select any choice above, Where to Play and How to Win are the heart
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

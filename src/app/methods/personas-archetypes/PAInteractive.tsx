'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY = 'rgba(31,58,95,'

type Persona = 'optimizer' | 'avoider' | 'newcomer'

const CARDS: {
  id: Persona
  name: string
  sub: string
  cx: number
}[] = [
  { id: 'optimizer', name: 'The Optimizer', sub: 'The power user',  cx: 120 },
  { id: 'avoider',   name: 'The Avoider',   sub: 'The anxious one', cx: 360 },
  { id: 'newcomer',  name: 'The Newcomer',  sub: 'The first-timer', cx: 600 },
]

const PERSONA_DETAIL: Record<Persona, {
  heading: string
  tag: string
  goal: string
  behavior: string
  frustration: string
  research: string
}> = {
  optimizer: {
    heading:     'The Optimizer',
    tag:         'The power user',
    goal:        'See exactly where every pound goes. Control, categorize, and export everything.',
    behavior:    'Checks their budget daily. Manually corrects auto-categorized transactions and exports data to spreadsheets for further analysis.',
    frustration: '"Most apps either over-simplify or miss edge cases. I end up exporting to a spreadsheet anyway."',
    research:    'Appeared in 4 of 15 interviews. Often the engineer, accountant, or analyst archetype. The user the founding team assumed was everyone.',
  },
  avoider: {
    heading:     'The Avoider',
    tag:         'The anxious one',
    goal:        'Feel okay about money without having to confront the numbers directly.',
    behavior:    "Avoids checking their balance when they suspect they've overspent. Manages by feel, not tracking. Opens budgeting apps rarely, and closes them quickly when they do.",
    frustration: '"The moment I open a budgeting app I feel judged. The red charts make everything worse."',
    research:    'The most common type in the research: 6 of 15 interviews. Almost never anticipated. The persona that completely reframed the product direction.',
  },
  newcomer: {
    heading:     'The Newcomer',
    tag:         'The first-timer',
    goal:        'Learn the basics of budgeting without feeling lost or stupid.',
    behavior:    'Googles basic financial terms before doing anything. Asks friends for recommendations instead of researching independently. Intimidated by anything that looks "advanced."',
    frustration: '"Every article assumes I already know what an ISA is. It\'s all jargon from the first line."',
    research:    'Appeared in 3 of 15 interviews. Predominantly younger users starting their first job. Underserved by products that assume prior financial literacy.',
  },
}

const CW = 62
const CT = 22
const CH = 193

function dome(cx: number, cy: number, w: number, h: number) {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

function cardState(id: Persona, active: Persona | null, hovered: Persona | null) {
  if (active === null) return hovered === id ? 'hovered' : 'default'
  if (id === active)   return 'active'
  return 'dim'
}

// Card fill: visible navy surface; dim down for non-selected, lift for selected
function cardFill(st: string) {
  return st === 'active'  ? `${NAVY}0.68)`
       : st === 'hovered' ? `${NAVY}0.55)`
       : st === 'dim'     ? `${NAVY}0.18)`
       :                    `${NAVY}0.45)`
}
function cardStroke(st: string) {
  return st === 'active'  ? 'rgba(255,255,255,0.85)'
       : st === 'hovered' ? 'rgba(255,255,255,0.52)'
       : st === 'dim'     ? 'rgba(255,255,255,0.12)'
       :                    'rgba(255,255,255,0.28)'
}

// Avatar: white line art on the navy card
function avatarFill(st: string) {
  return st === 'active'  ? 'rgba(255,255,255,0.20)'
       : st === 'hovered' ? 'rgba(255,255,255,0.16)'
       : st === 'dim'     ? 'rgba(255,255,255,0.05)'
       :                    'rgba(255,255,255,0.12)'
}
function avatarStroke(st: string) {
  return st === 'active'  ? 'rgba(255,255,255,0.95)'
       : st === 'hovered' ? 'rgba(255,255,255,0.92)'
       : st === 'dim'     ? 'rgba(255,255,255,0.28)'
       :                    'rgba(255,255,255,0.88)'
}

export default function PAInteractive() {
  const [activeCard,  setActiveCard]  = useState<Persona | null>(null)
  const [hoveredCard, setHoveredCard] = useState<Persona | null>(null)
  const prefersReduced = useReducedMotion()

  return (
    <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
      {/* ── SVG illustration ── */}
      <div className="w-full md:w-[54%] shrink-0">
        <svg
          viewBox="0 0 720 258"
          width="100%"
          style={{ overflow: 'visible' }}
          role="group"
          aria-label="Persona set, click a card to learn about that persona"
        >
          <defs>
            <filter id="pa-int-glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {CARDS.map(({ id, name, sub, cx }) => {
            const st     = cardState(id, activeCard, hoveredCard)
            const headCy = CT + 36
            const bodyCy = headCy + 12 + 3
            const bodyH  = 20

            return (
              <g
                key={id}
                style={{ cursor: 'pointer', outline: 'none' }}
                onClick={() => setActiveCard(activeCard === id ? null : id)}
                onMouseEnter={() => setHoveredCard(id)}
                onMouseLeave={() => setHoveredCard(null)}
                role="button"
                tabIndex={0}
                aria-label={`Read about ${name}`}
                aria-pressed={activeCard === id}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setActiveCard(activeCard === id ? null : id)
                  }
                }}
              >
                {/* Card frame: visible navy surface */}
                <motion.rect
                  x={cx - CW} y={CT}
                  width={CW * 2} height={CH}
                  rx={6}
                  strokeWidth={st === 'active' ? 1.5 : 1}
                  filter={st === 'active' ? 'url(#pa-int-glow)' : undefined}
                  animate={{ fill: cardFill(st), stroke: cardStroke(st) }}
                  transition={{ duration: 0.22 }}
                />

                {/* Avatar: head (white line art on navy card) */}
                <motion.circle
                  cx={cx} cy={headCy} r={12}
                  strokeWidth={1.5}
                  animate={{ fill: avatarFill(st), stroke: avatarStroke(st) }}
                  transition={{ duration: 0.22 }}
                />
                {/* Avatar: shoulders dome (no divider line colliding with figure) */}
                <motion.path
                  d={dome(cx, bodyCy, 17, bodyH)}
                  strokeWidth={1.5}
                  animate={{ fill: avatarFill(st), stroke: avatarStroke(st) }}
                  transition={{ duration: 0.22 }}
                />

                {/* Caption below the card */}
                <motion.text
                  x={cx} y={228}
                  textAnchor="middle" fontSize="13" fontWeight="600"
                  fontFamily="var(--font-body, Inter, sans-serif)"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: st === 'dim' ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.82)' }}
                  transition={{ duration: 0.22 }}
                >{name}</motion.text>
                <motion.text
                  x={cx} y={244}
                  textAnchor="middle" fontSize="10"
                  fontFamily="var(--font-mono)" letterSpacing="0.04em"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: st === 'dim' ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.35)' }}
                  transition={{ duration: 0.22 }}
                >{sub}</motion.text>
              </g>
            )
          })}
        </svg>

        {!activeCard && (
          <p
            className="text-center mt-4"
            style={{
              fontSize:      'var(--text-xs)',
              fontFamily:    'var(--font-mono)',
              letterSpacing: '0.10em',
              textTransform: 'uppercase',
              color:         `${NAVY}0.55)`,
            }}
          >
            Click a card to explore
          </p>
        )}
      </div>

      {/* ── Detail panel ── */}
      <div className="w-full md:flex-1 min-h-[200px]">
        <AnimatePresence mode="wait">
          {activeCard ? (
            <motion.div
              key={activeCard}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}>
                Persona
              </p>
              <h3 className="font-display font-semibold mb-1" style={{ fontSize: 'var(--text-2xl)', color: '#FAFAFA', lineHeight: 1.2 }}>
                {PERSONA_DETAIL[activeCard].heading}
              </h3>
              <p className="font-mono mb-5" style={{ fontSize: 'var(--text-xs)', color: `${NAVY}0.70)`, letterSpacing: '0.06em' }}>
                {PERSONA_DETAIL[activeCard].tag}
              </p>

              <div className="flex flex-col gap-4">
                {[
                  { label: 'GOAL',        body: PERSONA_DETAIL[activeCard].goal },
                  { label: 'BEHAVIOR',    body: PERSONA_DETAIL[activeCard].behavior },
                  { label: 'FRUSTRATION', body: PERSONA_DETAIL[activeCard].frustration },
                  { label: 'GROUNDED IN', body: PERSONA_DETAIL[activeCard].research },
                ].map(({ label, body }) => (
                  <div key={label}>
                    <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.35)' }}>
                      {label}
                    </p>
                    <p style={{
                      fontSize:   'var(--text-sm)',
                      lineHeight: 'var(--leading-relaxed)',
                      color:      label === 'FRUSTRATION' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.62)',
                      fontStyle:  label === 'FRUSTRATION' ? 'italic' : 'normal',
                    }}>
                      {body}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center h-full"
              style={{ minHeight: 200 }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.25)', fontStyle: 'italic' }}>
                Select a persona to read its description.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

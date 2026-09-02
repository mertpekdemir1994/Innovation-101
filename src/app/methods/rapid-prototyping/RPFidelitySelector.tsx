'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(181,97,62,'
// darker clay for text on this light background — plain CLAY can't
// reach 4.5:1 on white even at full opacity
const CLAY_DARK = 'rgba(140,74,47,'

// ── Chip → rung mapping ────────────────────────────────────────────────────────

type ChipId = 'concept' | 'flow' | 'physical' | 'service' | 'usage'
type RungId = 'paper' | 'quick' | 'click' | 'polished' | null

const CHIPS: { id: ChipId; label: string; rung: RungId }[] = [
  { id: 'concept',   label: 'Does this concept make sense?',       rung: 'paper'    },
  { id: 'flow',      label: 'Does the flow / interaction work?',   rung: 'click'    },
  { id: 'physical',  label: 'How does this physical thing feel?',  rung: null       },
  { id: 'service',   label: 'How does this service play out?',     rung: null       },
  { id: 'usage',     label: 'Will people actually use it?',        rung: null       },
]

// ── Mini-spectrum rungs for the highlight bar ──────────────────────────────────

type MiniRung = { id: RungId; label: string }
const MINI_RUNGS: MiniRung[] = [
  { id: 'paper',    label: 'Paper sketch'      },
  { id: 'quick',   label: 'Concept visual'    },
  { id: 'click',   label: 'Clickable mockup'  },
  { id: 'polished', label: 'Polished prototype' },
]

// ── Table rows ─────────────────────────────────────────────────────────────────

type TableRow = {
  rung: RungId
  approach: string
  fidelity: string
  best: string
  watch: string
  featured?: boolean
}

const TABLE_ROWS: TableRow[] = [
  {
    rung: 'paper',
    approach: 'Paper sketch (hand-drawn)',
    fidelity: 'Lowest: minutes, nearly free',
    best: '"Does this concept make sense? Is the basic idea and structure right?" The fastest way to get pure concept feedback, because it is obviously unfinished.',
    watch: 'Too abstract for questions about real interaction or timing; some users struggle to imagine the finished thing from a sketch.',
  },
  {
    rung: 'quick',
    approach: 'Quick conceptual visual',
    fidelity: 'Low: under an hour',
    best: '"Can I communicate this concept a little more concretely?" A fast digital or drawn representation, richer than paper, still clearly rough.',
    watch: 'Starting to look more done; watch for feedback beginning to drift toward the surface.',
  },
  {
    rung: 'click',
    approach: 'Clickable mockup (e.g. Figma)',
    fidelity: 'Medium: hours',
    best: '"Does the FLOW work? Is the interaction and navigation understandable?" The right tool when the learning question is specifically about how a user moves through the experience.',
    watch: 'Looks finished, so feedback drifts to polish (color, copy, layout); easy to over-invest and grow attached before validating.',
    featured: true,
  },
  {
    rung: null,
    approach: 'Physical model / mockup',
    fidelity: 'Varies',
    best: '"How does this physical thing feel, fit, or work in the hand or the space?" For products, hardware, or environments where physical form is the question.',
    watch: 'Can be costly to raise fidelity; match roughness (foam, cardboard) to the question.',
  },
  {
    rung: null,
    approach: 'Roleplay / bodystorming',
    fidelity: 'Low: time not materials',
    best: '"How does this SERVICE or human interaction actually play out?" For services and experiences, acting it out surfaces what a static artifact cannot.',
    watch: 'Needs willing participants and a little courage; can feel unnatural to some teams.',
  },
  {
    rung: null,
    approach: 'Wizard-of-Oz facade',
    fidelity: 'Low-medium: effort in the illusion',
    best: '"Will people actually USE or act on this?" when the real system does not exist yet. Humans manually simulate what the software will eventually do.',
    watch: 'Labor-intensive to run live; tests behavior, not the real system\'s feasibility.',
  },
]

export default function RPFidelitySelector() {
  const [chip, setChip]   = useState<ChipId | null>(null)
  const prefersReduced    = useReducedMotion()
  const activeRung: RungId = chip ? (CHIPS.find(c => c.id === chip)?.rung ?? null) : null
  const isOffLadder = chip !== null && activeRung === null

  function fade(d = 0.18) {
    return prefersReduced ? { duration: 0 } : { duration: d }
  }

  return (
    <div className="flex flex-col gap-8">
      {/* ── Chip selector ── */}
      <div>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${CLAY_DARK}0.90)` }}>
          Start from your learning question
        </p>
        <div className="flex flex-wrap gap-2">
          {CHIPS.map(c => {
            const isActive = chip === c.id
            return (
              <button
                key={c.id}
                onClick={() => setChip(prev => prev === c.id ? null : c.id)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all text-left"
                style={{
                  background: isActive ? `${CLAY}0.10)` : 'var(--color-neutral-50)',
                  border: `1px solid ${isActive ? `${CLAY}0.35)` : 'var(--color-neutral-200)'}`,
                  color: isActive ? `${CLAY_DARK}0.90)` : 'var(--color-neutral-600)',
                }}>
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Mini-spectrum highlight bar ── */}
      <div>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
          Fidelity spectrum
        </p>

        {isOffLadder ? (
          <div className="rounded-lg border p-4"
            style={{ background: 'var(--color-neutral-50)', borderColor: 'var(--color-neutral-200)' }}>
            <p className="text-sm" style={{ color: 'var(--color-neutral-600)' }}>
              This approach is not on the standard paper-to-polished fidelity ladder; see the table below.
            </p>
          </div>
        ) : (
          <div className="relative">
            {/* Axis line */}
            <div className="flex items-center gap-0 relative my-6">
              <div className="absolute left-0 right-0 h-px" style={{ background: 'var(--color-neutral-200)' }} />
              <div className="flex justify-between w-full relative">
                {MINI_RUNGS.map(r => {
                  const isHighlit = activeRung === r.id
                  const isFeatured = r.id === 'click'
                  return (
                    <div key={r.id as string} className="flex flex-col items-center gap-1">
                      {/* Label above */}
                      <span
                        className="font-mono uppercase tracking-widest text-center"
                        style={{
                          fontSize: 'var(--text-2xs)',
                          color: isHighlit ? `${CLAY_DARK}0.90)` : 'var(--color-neutral-500)',
                          fontWeight: isHighlit || isFeatured ? 600 : 400,
                          whiteSpace: 'nowrap',
                        }}>
                        {r.label}
                        {isFeatured && !isHighlit && (
                          <span style={{ color: `${CLAY_DARK}0.90)`, marginLeft: 4 }}>★</span>
                        )}
                      </span>
                      {/* Dot */}
                      <motion.div
                        className="rounded-full z-10"
                        style={{ width: 10, height: 10 }}
                        animate={{
                          background: isHighlit ? `${CLAY}1)` : 'var(--color-neutral-200)',
                          scale: isHighlit ? 1.4 : 1,
                          boxShadow: isHighlit ? `0 0 10px ${CLAY}0.40)` : 'none',
                        }}
                        transition={fade(0.22)}
                      />
                    </div>
                  )
                })}
              </div>
            </div>
            {/* JUST ENOUGH label */}
            <AnimatePresence>
              {activeRung && (activeRung === 'paper' || activeRung === 'quick') && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={fade()}
                  className="font-mono uppercase tracking-widest text-center"
                  style={{ fontSize: 'var(--text-2xs)', color: `${CLAY_DARK}0.90)` }}>
                  ← low on the ladder · concept questions live here
                </motion.p>
              )}
              {activeRung === 'click' && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={fade()}
                  className="font-mono uppercase tracking-widest text-center"
                  style={{ fontSize: 'var(--text-2xs)', color: `${CLAY_DARK}0.90)` }}>
                  ★ the digital workhorse, earn it once the concept is settled
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* ── Scenario-to-approach table ── */}
      <div>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
          Full scenario-to-approach mapping
        </p>
        <div className="flex flex-col gap-2">
          {TABLE_ROWS.map(row => {
            const isHighlit  = chip !== null && activeRung === row.rung && row.rung !== null
            const isSelected = chip !== null && row.rung === null && isOffLadder && (() => {
              if (chip === 'physical' && row.approach.startsWith('Physical')) return true
              if (chip === 'service'  && row.approach.startsWith('Roleplay')) return true
              if (chip === 'usage'    && row.approach.startsWith('Wizard'))   return true
              return false
            })()
            const highlighted = isHighlit || isSelected
            return (
              <div
                key={row.approach}
                className="rounded-lg p-4 transition-all"
                style={{
                  background:  highlighted ? `${CLAY}0.06)` : row.featured ? 'var(--color-neutral-50)' : 'var(--color-background)',
                  border:      `1px solid ${highlighted ? `${CLAY}0.28)` : row.featured ? `${CLAY}0.18)` : 'var(--color-neutral-100)'}`,
                  borderLeft:  `3px solid ${highlighted ? `${CLAY}0.70)` : row.featured ? `${CLAY}0.35)` : 'transparent'}`,
                }}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4">
                  <div className="shrink-0" style={{ minWidth: 200 }}>
                    <p className="font-semibold"
                      style={{ fontSize: 'var(--text-sm)', color: highlighted ? `${CLAY_DARK}0.90)` : 'var(--color-neutral-900)' }}>
                      {row.approach}
                      {row.featured && (
                        <span className="ml-2 text-2xs font-semibold uppercase tracking-widest px-1.5 py-0.5 rounded-full"
                          style={{ background: `${CLAY}0.12)`, color: `${CLAY_DARK}0.90)`, border: `1px solid ${CLAY}0.22)` }}>
                          workhorse
                        </span>
                      )}
                    </p>
                    <p className="font-mono uppercase tracking-widest mt-0.5"
                      style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                      {row.fidelity}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <AnimatePresence>
                      {(chip === null || highlighted) && (
                        <motion.div
                          initial={chip === null ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={fade()}>
                          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                            <span className="font-semibold" style={{ color: 'var(--color-neutral-500)' }}>Best when: </span>
                            {row.best}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                      <span className="font-semibold">Watch: </span>{row.watch}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

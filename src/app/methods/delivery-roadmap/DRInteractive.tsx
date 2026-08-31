'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'
const AMBER = 'rgba(245,158,11,'

const SVG_W = 700, SVG_H = 268, CY = 134

type BetId = 'proof' | 'release' | 'pilot' | 'rollout'
type GateId = 'gate1' | 'gate2' | 'gate3'
type ActiveId = BetId | GateId | null
type View = 'risk' | 'convenience'

const BETS: { id: BetId; label: string; sub: string; hor: string; x: number; y: number; w: number; h: number; conf: number; dash: string; sw: number }[] = [
  { id: 'proof',   label: 'PROOF',   sub: 'FEASIBILITY', hor: 'NOW',   x: 14,  y: 116, w: 90,  h: 36, conf: 1.00, dash: '',    sw: 2.0 },
  { id: 'release', label: 'RELEASE', sub: 'MVP / MLP',   hor: 'NEXT',  x: 158, y: 110, w: 92,  h: 48, conf: 0.78, dash: '',    sw: 1.8 },
  { id: 'pilot',   label: 'PILOT',   sub: 'BOUNDED',     hor: 'LATER', x: 312, y: 103, w: 94,  h: 62, conf: 0.52, dash: '5 3', sw: 1.5 },
  { id: 'rollout', label: 'ROLLOUT', sub: '~STAGED',     hor: '~FAR',  x: 464, y: 94,  w: 102, h: 80, conf: 0.32, dash: '6 4', sw: 1.2 },
]

const GATES: { id: GateId; x: number; label: string }[] = [
  { id: 'gate1', x: 131, label: 'GATE 1' },
  { id: 'gate2', x: 281, label: 'GATE 2' },
  { id: 'gate3', x: 435, label: 'GATE 3' },
]

const LEARN_A = 'M 514,90 C 514,42 204,42 204,108'
const LEARN_B = 'M 359,100 C 359,64 59,64 59,113'

type InfoEntry = { tag: string; headline: string; body: string }

const INFO: Record<BetId | GateId, InfoEntry> = {
  proof: {
    tag: 'BET 1: PROOF OF CONCEPT',
    headline: 'Test the riskiest technical assumption, early and cheaply.',
    body: 'The first bet proves whether the hard thing can actually be done: not a feature, not a demo, but the specific technical or feasibility question that would kill the idea if wrong. It goes FIRST because finding this problem in week three is cheap; finding it in month nine is catastrophic. Nothing in the rest of the roadmap can proceed until this answer exists.',
  },
  release: {
    tag: 'BET 2: SMALLEST REAL RELEASE',
    headline: 'Ship the minimum real thing to real users.',
    body: 'The second bet puts something real in front of real users: not a prototype, not a proof: a product. It tests whether the thing actually works for people, not just in theory. Dependencies: the PoC question must be answered first. You cannot build a real product on an unproven foundation. Near-term and reasonably specified, but its exact shape will shift based on what the PoC taught you.',
  },
  pilot: {
    tag: 'BET 3: CONTAINED PILOT',
    headline: 'Run the full solution in a bounded slice of the real world.',
    body: 'The third bet applies the full solution to a controlled segment: real customers, real operations, real economics, but deliberately bounded. It tests whether the delivery model scales, not just the product concept. Drawn looser because its exact shape depends on what the Release bet revealed. If Release went badly, this bet may not look like this at all.',
  },
  rollout: {
    tag: 'BET 4: STAGED ROLLOUT',
    headline: 'Scale the proven delivery model, wave by wave.',
    body: 'The fourth bet expands from the pilot into broader scale. Drawn LOOSEST because it depends most on previous bets. The pilot may have revealed operational constraints that change what rollout means entirely. An honest roadmap shows this uncertainty. A traditional roadmap hides it behind the same uniform box style as week two. The far end is loose because it genuinely is.',
  },
  gate1: {
    tag: 'GATE 1: PROOF TO RELEASE',
    headline: 'Can the hard thing actually be built at the required scale?',
    body: 'Gate 1 carries the pre-committed criteria from the PoC. GO means the technical approach works: proceed to building the real product. NO-GO means you have learned something fundamental that changes the plan: maybe the approach changes, maybe the product concept changes. A gate you would never actually stop at is not a gate.',
  },
  gate2: {
    tag: 'GATE 2: RELEASE TO PILOT',
    headline: 'Does the real thing actually work for real people?',
    body: 'Gate 2 carries what usability testing, early metrics, and user feedback produced from the Release bet. GO means you have a real product that creates value: proceed to the pilot to test operational scale. NO-GO means the product needs more work before you run a pilot of it. This gate is what prevents the organisation from piloting a broken product.',
  },
  gate3: {
    tag: 'GATE 3: PILOT TO ROLLOUT',
    headline: 'Can the delivery model operate at scale with real economics?',
    body: 'Gate 3 carries the pre-committed operational and customer criteria from the Pilot. GO means the delivery model works: economics viable, operations scalable, support manageable. NO-GO means fix the operational model before expanding. That fix is what makes the gate meaningful rather than a ceremony stacked on top of known failure.',
  },
}

export default function DRInteractive() {
  const [active, setActive] = useState<ActiveId>(null)
  const [view, setView] = useState<View>('risk')
  const [severed, setSevered] = useState(false)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const toggle = (id: ActiveId) => setActive(prev => prev === id ? null : id)

  const betConf = (conf: number) => severed ? 1.0 : conf
  const betDash = (dash: string) => severed ? '' : dash
  const betSW   = (sw: number)   => severed ? 2.0 : sw

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-2 mb-2">
        <button
          onClick={() => setView(v => v === 'risk' ? 'convenience' : 'risk')}
          aria-pressed={view === 'convenience'}
          className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
          style={{
            background: view === 'convenience' ? `${AMBER}0.18)` : 'transparent',
            color: view === 'convenience' ? `${AMBER}0.90)` : `${BRICK}0.65)`,
            border: `1.5px solid ${view === 'convenience' ? `${AMBER}0.55)` : `${BRICK}0.28)`}`,
          }}>
          {view === 'risk' ? 'SEQUENCE: BY RISK' : '⚠ SEQUENCE: BY CONVENIENCE'}
        </button>
        <button
          onClick={() => setSevered(s => !s)}
          aria-pressed={severed}
          className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
          style={{
            background: severed ? `${AMBER}0.18)` : 'transparent',
            color: severed ? `${AMBER}0.90)` : `${BRICK}0.65)`,
            border: `1.5px solid ${severed ? `${AMBER}0.55)` : `${BRICK}0.28)`}`,
          }}>
          {severed ? '⚠ LEARNING: SEVERED' : 'LEARNING: CONNECTED'}
        </button>
        {(active !== null || view === 'convenience' || severed) && (
          <button
            onClick={() => { setActive(null); setView('risk'); setSevered(false) }}
            className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all"
            style={{ color: `${BRICK}0.45)`, border: `1.5px solid ${BRICK}0.18)` }}>
            CLEAR
          </button>
        )}
      </div>

      {/* SVG */}
      <div role="status" aria-live="polite" className="sr-only">
        {severed ? 'Learning arrows severed. The roadmap has become a schedule, all bets appear equally confident.' : ''}
        {view === 'convenience' ? 'Convenience ordering: riskiest assumption scheduled last.' : ''}
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Interactive delivery roadmap. Click any bet or gate to explore it. Toggle sequence order and learning arrows."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="dr-int-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${BRICK}0.35)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="dr-int-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${AMBER}0.40)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <marker id="dr-int-arr" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${BRICK}0.55)`} />
          </marker>
          <marker id="dr-int-learn" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={`${AMBER}0.65)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Severed warning overlay */}
        {severed && (
          <text x={SVG_W / 2} y={22} textAnchor="middle" fontSize="5"
            fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
            fill={`${AMBER}0.80)`} style={{ userSelect: 'none' }}>
            ⚠ ROADMAP → SCHEDULE: ALL BETS APPEAR EQUALLY CONFIDENT
          </text>
        )}

        {/* Gate vertical lines */}
        {GATES.map(g => (
          <g key={g.id}>
            <line x1={g.x} y1={86} x2={g.x} y2={182}
              stroke={active === g.id ? `${BRICK}0.45)` : `${BRICK}0.16)`}
              strokeWidth={active === g.id ? 1.4 : 0.9} strokeDasharray="3 3" />
            <rect x={g.x - 5} y={CY - 5} width={10} height={10}
              transform={`rotate(45 ${g.x} ${CY})`}
              fill={active === g.id ? `${BRICK}0.22)` : `${BRICK}0.08)`}
              stroke={active === g.id ? `${BRICK}0.65)` : `${BRICK}0.32)`}
              strokeWidth={active === g.id ? 1.5 : 0.9}
              filter={active === g.id ? 'url(#dr-int-glow)' : undefined} />
            <text x={g.x} y={78} textAnchor="middle" fontSize="3.8"
              fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill={active === g.id ? `${BRICK}0.70)` : `${BRICK}0.35)`}
              style={{ userSelect: 'none' }}>
              {g.label}
            </text>
            {/* Click hitbox */}
            <rect x={g.x - 16} y={80} width={32} height={110}
              fill="transparent" style={{ cursor: 'pointer' }}
              onClick={() => toggle(g.id)} />
          </g>
        ))}

        {/* Bet boxes */}
        {BETS.map(b => {
          const isActive = active === b.id
          const conf = betConf(b.conf)
          const dash = betDash(b.dash)
          const sw = betSW(b.sw)
          const isConvRisk = view === 'convenience' && (b.id === 'proof' || b.id === 'rollout')
          return (
            <g key={b.id} style={{ cursor: 'pointer' }} onClick={() => toggle(b.id)}>
              <rect
                x={b.x} y={b.y} width={b.w} height={b.h}
                fill={isActive ? `${BRICK}${conf * 0.22})` : `${BRICK}${conf * 0.12})`}
                stroke={isConvRisk ? `${AMBER}0.75)` : `${BRICK}${conf * (isActive ? 0.95 : 0.72)})`}
                strokeWidth={isActive ? sw + 0.6 : sw}
                strokeDasharray={dash}
                rx={3}
                filter={isActive ? 'url(#dr-int-glow)' : undefined}
              />
              <text x={b.x + b.w / 2} y={b.y + 9} textAnchor="middle" fontSize="3.4"
                fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill={`${BRICK}${conf * 0.52})`} style={{ userSelect: 'none' }}>
                {severed ? '' : b.hor}
              </text>
              <text x={b.x + b.w / 2} y={CY - 2} textAnchor="middle" dominantBaseline="middle"
                fontSize="5.6" fontFamily="var(--font-mono)" letterSpacing="0.11em" fontWeight="600"
                fill={isConvRisk ? `${AMBER}0.90)` : `${BRICK}${conf * 0.96})`}
                style={{ userSelect: 'none' }}>
                {b.label}
              </text>
              <text x={b.x + b.w / 2} y={b.y + b.h - 9} textAnchor="middle" fontSize="3.6"
                fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${BRICK}${conf * 0.45})`} style={{ userSelect: 'none' }}>
                {b.sub}
              </text>
              {/* Convenience mode annotations */}
              {view === 'convenience' && b.id === 'proof' && (
                <text x={b.x + b.w / 2} y={b.y - 6} textAnchor="middle" fontSize="3.5"
                  fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${AMBER}0.70)`} style={{ userSelect: 'none' }}>
                  EXISTENTIAL RISK, SCHEDULED LAST
                </text>
              )}
              {view === 'convenience' && b.id === 'release' && (
                <text x={b.x + b.w / 2} y={b.y - 6} textAnchor="middle" fontSize="3.5"
                  fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${BRICK}0.50)`} style={{ userSelect: 'none' }}>
                  COMFORTABLE, FIRST
                </text>
              )}
              {view === 'convenience' && b.id === 'rollout' && (
                <text x={b.x + b.w / 2} y={b.y - 6} textAnchor="middle" fontSize="3.5"
                  fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${AMBER}0.75)`} style={{ userSelect: 'none' }}>
                  ⚠ FATAL PROBLEM: MONTH NINE
                </text>
              )}
            </g>
          )
        })}

        {/* Learning arrow A */}
        <path
          d={LEARN_A}
          fill="none"
          stroke={severed ? `${AMBER}0.06)` : `${AMBER}0.42)`}
          strokeWidth={severed ? 0.8 : 1.2}
          strokeDasharray={severed ? '2 4' : '4 3'}
          markerEnd={severed ? undefined : 'url(#dr-int-learn)'}
        />
        {/* Sever X marker on arrow A */}
        {severed && (
          <>
            <line x1={354} y1={38} x2={366} y2={50} stroke={`${AMBER}0.55)`} strokeWidth={1.5} />
            <line x1={366} y1={38} x2={354} y2={50} stroke={`${AMBER}0.55)`} strokeWidth={1.5} />
          </>
        )}

        {/* Learning arrow B */}
        <path
          d={LEARN_B}
          fill="none"
          stroke={severed ? `${AMBER}0.04)` : `${AMBER}0.28)`}
          strokeWidth={severed ? 0.8 : 0.9}
          strokeDasharray={severed ? '2 4' : '3 3'}
          markerEnd={severed ? undefined : 'url(#dr-int-learn)'}
        />

        {/* Label when connected */}
        {!severed && (
          <text x={360} y={36} textAnchor="middle" fontSize="3.4"
            fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill={`${AMBER}0.38)`} style={{ userSelect: 'none' }}>
            WHAT YOU LEARN RESHAPES WHAT COMES NEXT
          </text>
        )}

        {/* Caption */}
        <text x={SVG_W / 2} y={SVG_H - 7} textAnchor="middle" fontSize="4.0"
          fontFamily="var(--font-mono)" letterSpacing="0.06em"
          fill="rgba(255,255,255,0.20)" style={{ userSelect: 'none' }}>
          {severed
            ? 'The gradient is gone. Every box looks equally confident. That is the lie.'
            : 'Click any bet or gate. Toggle sequence order or sever the learning arrows.'}
        </text>
      </svg>

      {/* Button row */}
      <div className="flex flex-wrap gap-2">
        {BETS.map(b => (
          <button key={b.id}
            onClick={() => toggle(b.id)}
            aria-pressed={active === b.id}
            className="rounded px-3 py-1.5 text-xs font-semibold font-mono tracking-widest transition-all"
            style={{
              background: active === b.id ? `${BRICK}0.18)` : 'transparent',
              color: active === b.id ? `${BRICK}0.90)` : `${BRICK}0.50)`,
              border: `1.5px solid ${active === b.id ? `${BRICK}0.55)` : `${BRICK}0.22)`}`,
            }}>
            {b.label}
          </button>
        ))}
        {GATES.map(g => (
          <button key={g.id}
            onClick={() => toggle(g.id)}
            aria-pressed={active === g.id}
            className="rounded px-3 py-1.5 text-xs font-semibold font-mono tracking-widest transition-all"
            style={{
              background: active === g.id ? `${BRICK}0.12)` : 'transparent',
              color: active === g.id ? `${BRICK}0.75)` : `${BRICK}0.38)`,
              border: `1.5px dashed ${active === g.id ? `${BRICK}0.45)` : `${BRICK}0.18)`}`,
            }}>
            {g.label}
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active && INFO[active] && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="rounded-lg p-5 mt-2"
            style={{ background: `${BRICK}0.07)`, border: `1px solid ${BRICK}0.22)` }}
          >
            <p className="font-mono uppercase tracking-widest mb-1"
              style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.62)` }}>
              {INFO[active].tag}
            </p>
            <p className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-base)', color: `${BRICK}0.82)` }}>
              {INFO[active].headline}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              {INFO[active].body}
            </p>
          </motion.div>
        )}
        {!active && severed && (
          <motion.div
            key="severed-panel"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="rounded-lg p-5 mt-2"
            style={{ background: `${AMBER}0.06)`, border: `1px solid ${AMBER}0.28)` }}
          >
            <p className="font-mono uppercase tracking-widest mb-1"
              style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.70)` }}>
              LEARNING SEVERED: THE ROADMAP IS NOW A SCHEDULE
            </p>
            <p className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-base)', color: `${AMBER}0.85)` }}>
              Every bet looks equally confident. The gradient is gone.
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              Without learning arrows feeding back to reshape earlier bets, there is no reason for the far
              end to stay loose. The plan can be fully specified all the way out, and it will be, because
              the organisation needs certainty and the roadmap is now a commitment device rather than a
              sequenced series of bets. The far end looks just as solid as week two, which is the lie that
              traditional roadmaps tell. The confidence gradient WAS the honesty. Without it, you have a
              Gantt chart with better labels.
            </p>
          </motion.div>
        )}
        {!active && view === 'convenience' && !severed && (
          <motion.div
            key="convenience-panel"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="rounded-lg p-5 mt-2"
            style={{ background: `${AMBER}0.06)`, border: `1px solid ${AMBER}0.28)` }}
          >
            <p className="font-mono uppercase tracking-widest mb-1"
              style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.70)` }}>
              ⚠ SEQUENCE BY CONVENIENCE: THE CLASSIC MISTAKE
            </p>
            <p className="font-semibold mb-3"
              style={{ fontSize: 'var(--text-base)', color: `${AMBER}0.85)` }}>
              Easy work first, existential question last.
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              In a convenience-ordered roadmap, the team starts with what is familiar and demo-able
              (user interface work, integrations, comfortable features) and defers the riskiest assumption
              to the end. The result: nine months of invested delivery before the team discovers whether
              the hard thing is even possible. The PoC question that would have killed the project in week
              three becomes a fatal finding in month nine. Ordering by convenience is not laziness. It
              feels responsible. The team is shipping. The stakeholders are seeing progress. The problem
              is that the &ldquo;progress&rdquo; is building on an unproven foundation.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

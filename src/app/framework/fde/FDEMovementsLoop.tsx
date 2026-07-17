'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(185,28,28,'

type MovementId = 'embed' | 'build' | 'extract' | 'migrate'

type Movement = {
  id: MovementId
  n: string
  label: string
  shortLabel: string
  verb: string
  tagline: string
  objective: string
  description: string[]
  activities: Array<{ title: string; detail: string }>
  keyQuestion: string
}

const MOVEMENTS: Movement[] = [
  {
    id: 'embed',
    n: '01',
    label: 'Embed',
    shortLabel: 'EMBED',
    verb: 'Live with the customer',
    tagline: 'An FDE does not visit customers. They live with them.',
    objective:
      'The Embed movement is the foundation everything else rests on. An FDE establishes a deep, ongoing presence at a specific customer site, learning the actual workflows, organizational politics, informal decision-making processes, and the problems that never make it into a formal requirements document. Every other part of the FDE model depends on this depth. An FDE who builds in the field without genuine embeddedness builds solutions to the problems they can see, not the problems that actually matter.',
    description: [
      'Embeddedness is not a soft relationship-building activity. It is the research methodology. The goal is to develop knowledge the customer themselves could not have articulated in a requirements document — the gap between what users say they need and what they actually do, the informal workarounds that have been in place so long that no one mentions them, the organizational constraints that shape every decision.',
      'At Palantir, FDEs were often assigned to a single customer for a year or more. The depth of institutional knowledge built over a year of close collaboration with a government agency or financial institution produced insights that no amount of sales calls, requirements gathering, or user research would have surfaced.',
    ],
    activities: [
      {
        title: 'On-site presence (regular, not occasional)',
        detail:
          "Regular presence at the customer site is not the same as frequent visits. The distinction is in depth and continuity: an FDE who visits twice a month for a year can still be on the outside looking in. An FDE who is present for weeks at a time develops a mental model of the customer's work that cannot be built from the outside.",
      },
      {
        title: 'Observation of real workflows',
        detail:
          'The most important research happens by watching people work, not by interviewing them about their work. Users often cannot accurately describe their own workflows, partly because many workarounds and informal processes are invisible to them — they are just "how things are done." Direct observation surfaces these invisible practices.',
      },
      {
        title: 'Understanding organizational politics and informal power',
        detail:
          'In complex organizations, formal org charts do not describe how decisions are actually made. The most important relationships for an FDE are often not with the named stakeholders but with the people who know where the bodies are buried — who actually controls what, who has tried to fix this before and failed, and why.',
      },
    ],
    keyQuestion:
      'For your most important customer or user group: what do you know about their work that did not come from a formal research session, a requirements document, or a support ticket? If your answer is "not much," you are informed about your customer, not embedded with them.',
  },
  {
    id: 'build',
    n: '02',
    label: 'Build in Context',
    shortLabel: 'BUILD',
    verb: 'Field is R&D, not COGS',
    tagline: 'The customer deployment is the experiment. The cost is research, not delivery.',
    objective:
      "The FDE builds solutions directly in the customer's environment — custom code, custom configurations, custom integrations — to solve specific, immediate problems. Speed matters more than elegance. The solution does not need to be generalizable. It needs to work for this customer, now. But the organizational framing of this work is critical: it is not contract delivery at a defined margin. It is R&D that happens to be valuable to the customer.",
    description: [
      "Barry McCardel's key insight is that customer deployments are R&D, not COGS. The cost of the field work is justified not by the margin on that specific customer but by the product learning it produces. Organizations that evaluate FDE deployments on individual customer margin have already misunderstood the model.",
      "This framing changes everything about how the work is structured. The FDE is not trying to complete a scoped contract. They are trying to understand a problem deeply enough to build something that works, and then to understand whether what they built reveals a pattern worth generalizing. The customer is the proving ground, not the end destination.",
    ],
    activities: [
      {
        title: "Rapid custom builds in the customer's environment",
        detail:
          "Building in the customer's actual environment — their data, their systems, their organizational constraints — produces learning that no amount of internal prototyping replicates. A solution that works in the controlled environment of a product team's office is untested. A solution that works in the customer's environment is proven.",
      },
      {
        title: 'Speed over elegance',
        detail:
          'Field-built solutions prioritize working quickly over engineering cleanly. Technical debt is acceptable and expected. The goal is to validate whether a solution to this class of problem is possible and valuable, not to produce production-quality code. The platform team handles generalization and quality later.',
      },
      {
        title: 'Treating each deployment as a learning investment',
        detail:
          'Tracking the learning produced by each deployment alongside its revenue and cost. What did we discover about this category of problem? What assumptions did the field work challenge? What patterns emerged that we had not seen before? These are the questions that make the investment in FDE economically rational.',
      },
    ],
    keyQuestion:
      'What are the three things your customers most frequently ask you to customize or extend beyond your standard offering? Are any of these patterns broad enough to be a product feature that many customers would value, rather than a one-off custom build?',
  },
  {
    id: 'extract',
    n: '03',
    label: 'Extract',
    shortLabel: 'EXTRACT',
    verb: 'Find the generalizable pattern',
    tagline: 'Most field innovations are specific. A few are universal. The judgment is the hard part.',
    objective:
      "Not everything built in the field should become a platform feature. Most field innovations are specific to a single customer's context — the particular shape of their data infrastructure, the particular constraints of their regulatory environment, the particular quirks of their organizational politics. The Extract movement is the judgment process of identifying which field innovations have cross-customer applicability and are therefore candidates for productization.",
    description: [
      "The extraction judgment is hard because FDE teams are emotionally invested in their field work. The platform team must sometimes make the extraction call against the FDE team's preferences, which requires a clear governance relationship between field and core that most organizations have not established.",
      'Criteria for extraction typically include: Has this pattern been built for more than one customer independently? Does it appear across customer contexts in different industries? Would the core platform be structurally stronger with this as a native capability? Can it be generalized without losing the property that made it valuable in the field?',
    ],
    activities: [
      {
        title: 'Cross-deployment pattern recognition',
        detail:
          'Someone in the organization needs visibility across all field deployments to notice when the same type of solution is being built independently by multiple FDE teams. This is an organizational function, not just a technical one: it requires a person or team whose job includes watching what is being built across the field.',
      },
      {
        title: 'Extraction judgment (with clear criteria)',
        detail:
          'The decision to extract a field innovation for productization should be based on evidence, not advocacy. The strongest signal is independent replication: if three FDE teams working in different industries have each built a version of the same solution, the pattern is real. One customer, no matter how enthusiastically they endorse the solution, is not sufficient evidence.',
      },
      {
        title: 'Governance between field and core',
        detail:
          'The extraction decision requires a governance structure that gives the platform team authority over what enters the core product, even when FDE teams disagree. Without this structure, every FDE team will believe their field innovation is the most important thing to productize next, and the platform roadmap will be driven by internal politics rather than cross-customer evidence.',
      },
    ],
    keyQuestion:
      'Look at the custom work your team has done across customers in the past year. Has the same kind of solution been built more than once, independently, for different customers? That repetition — not a single enthusiastic customer, but a repeated pattern — is the strongest signal of a real product opportunity.',
  },
  {
    id: 'migrate',
    n: '04',
    label: 'Migrate to Core',
    shortLabel: 'MIGRATE',
    verb: 'Enrich the platform continuously',
    tagline: 'The platform is not a roadmap. It is the accumulated product of field discovery.',
    objective:
      'Field-built innovations that pass the extraction judgment are taken over by the platform engineering team, generalized to work across customer contexts, and absorbed into the core product. The FDE team that built the field version transitions to the next frontier problem. Done well, this cycle continuously enriches the platform with capabilities shaped by the actual hardest problems in the customer\'s world — producing depth and specificity that competitors using traditional product processes struggle to match.',
    description: [
      'The migration process carries two tensions. First, FDEs who built a field innovation often want to own the productization of it. Platform engineers who take over often change it in ways that frustrate the FDE who built the original. Managing this requires clear organizational agreements about who has authority over the migrated feature.',
      'Second, platform engineers generalizing a field innovation may optimize away the specific property that made it valuable in the field. The thing that makes a field-built solution work for a specific customer is often the very thing that gets stripped out in the name of generality. A clean handoff of the field team\'s hard-won context is as important as the technical migration itself.',
    ],
    activities: [
      {
        title: 'Handoff of field context (not just code)',
        detail:
          "The most important thing that migrates from field to core is not the code — it is the understanding of why the solution was built the way it was. Why was this specific data structure chosen? What organizational constraint shaped this API design? What did the field team learn that made them choose this approach over the obvious alternative? This knowledge must be transferred explicitly or it disappears.",
      },
      {
        title: 'Generalization without losing core value',
        detail:
          'The risk of productization is that in making a solution work for all customers, you remove the specific property that made it work for the customers in the field. The platform team must understand what the essential insight of the field innovation is — not just what it does, but why it works — and preserve that insight as the feature is generalized.',
      },
      {
        title: 'FDE team transition to the next frontier',
        detail:
          "The FDE team should move to new frontier problems as their field innovations migrate to core. If FDE teams stay attached to productized features, they are no longer doing FDE — they are doing product work. The field team's value is in its embeddedness and autonomy at the frontier, not in maintaining what it already built.",
      },
    ],
    keyQuestion:
      "When your team's best field or custom work gets absorbed into the standard product, what is typically lost in translation? What would a genuinely clean handoff — one that transferred the insight, not just the code — actually look like? What is the organizational structure that makes it possible?",
  },
]

// Clockwise from top
const ANGLES: Record<MovementId, number> = {
  embed:   0,
  build:   90,
  extract: 180,
  migrate: 270,
}

const TICK_ANGLES = [45, 135, 225, 315]

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

export default function FDEMovementsLoop() {
  const [active, setActive]             = useState<MovementId>('embed')
  const [openActivity, setOpenActivity] = useState<number | null>(null)
  const prefersReduced                  = useReducedMotion()

  const mv        = MOVEMENTS.find((m) => m.id === active)!
  const activeIdx = MOVEMENTS.findIndex((m) => m.id === active)

  // Large orbit for the dark hero
  const cx = 260, cy = 260, r = 175, nodeR = 46

  function handleSelect(id: MovementId) {
    setActive(id)
    setOpenActivity(null)
  }

  return (
    <div className="grid md:grid-cols-[460px_1fr] gap-space-10 items-start">

      {/* ── Left: orbit + stepper ─────────────────────────────────────────── */}
      <div className="md:sticky md:top-28">
        <svg
          viewBox="0 0 520 520"
          width="100%"
          className="overflow-visible select-none"
          aria-hidden="true"
        >
          {/* Outer glow */}
          <circle cx={cx} cy={cy} r={r + 36}
            fill="none" stroke={`${BRICK}0.06)`} strokeWidth={36}
          />

          {/* Dashed ring */}
          <motion.circle cx={cx} cy={cy} r={r}
            fill="none" stroke={`${BRICK}0.28)`} strokeWidth={2.5} strokeDasharray="7 5"
            initial={prefersReduced ? {} : { pathLength: 0, opacity: 0 }}
            animate={prefersReduced ? {} : { pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.3, ease: 'easeOut', delay: 0.1 }}
          />

          {/* Clockwise direction ticks */}
          {TICK_ANGLES.map((angleDeg, i) => {
            const { x, y } = polarToXY(cx, cy, r, angleDeg)
            const tangentRad = ((angleDeg + 90) * Math.PI) / 180
            const tx = Math.cos(tangentRad) * 11
            const ty = Math.sin(tangentRad) * 11
            return (
              <motion.line key={i}
                x1={x - tx * 0.5} y1={y - ty * 0.5}
                x2={x + tx * 0.5} y2={y + ty * 0.5}
                stroke={`${BRICK}0.45)`} strokeWidth={3} strokeLinecap="round"
                initial={prefersReduced ? {} : { opacity: 0 }}
                animate={prefersReduced ? {} : { opacity: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              />
            )
          })}

          {/* Center labels */}
          <text x={cx} y={cy - 10} textAnchor="middle"
            fill={`${BRICK}0.35)`} fontSize="11"
            fontFamily="ui-monospace, monospace" letterSpacing="0.14em"
            style={{ textTransform: 'uppercase' }}
          >
            continuous
          </text>
          <text x={cx} y={cy + 10} textAnchor="middle"
            fill={`${BRICK}0.20)`} fontSize="10"
            fontFamily="ui-monospace, monospace" letterSpacing="0.12em"
            style={{ textTransform: 'uppercase' }}
          >
            loop
          </text>

          {/* Movement nodes */}
          {MOVEMENTS.map((movement, i) => {
            const { x, y } = polarToXY(cx, cy, r, ANGLES[movement.id])
            const isActive  = movement.id === active

            return (
              <motion.g
                key={movement.id}
                initial={prefersReduced ? {} : { opacity: 0, scale: 0.5 }}
                animate={prefersReduced ? {} : { opacity: 1 }}
                transition={{ delay: 0.4 + i * 0.16, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleSelect(movement.id)}
                style={{ cursor: 'pointer' }}
                role="button"
                aria-label={`Go to ${movement.label}`}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSelect(movement.id)}
              >
                <motion.g
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  {isActive && (
                    <circle cx={x} cy={y} r={nodeR + 16} fill={`${BRICK}0.10)`} />
                  )}
                  <circle cx={x} cy={y} r={nodeR + 6}
                    fill={`${BRICK}${isActive ? '0.10)' : '0.04)'}`}
                  />
                  <circle cx={x} cy={y} r={nodeR}
                    fill={`${BRICK}${isActive ? '0.24)' : '0.09)'}`}
                    stroke={`${BRICK}${isActive ? '0.90)' : '0.28)'}`}
                    strokeWidth={isActive ? 3 : 2}
                  />
                </motion.g>

                {/* Number */}
                <text x={x} y={y - 10}
                  textAnchor="middle"
                  fill={`${BRICK}${isActive ? '0.70)' : '0.38)'}`}
                  fontSize="10" fontFamily="ui-monospace, monospace" letterSpacing="0.10em"
                  style={{ pointerEvents: 'none' }}
                >
                  {movement.n}
                </text>

                {/* Short label */}
                <text x={x} y={y + 8}
                  textAnchor="middle"
                  fill={`${BRICK}${isActive ? '1.0)' : '0.55)'}`}
                  fontSize={isActive ? '14' : '13'}
                  fontWeight={isActive ? '700' : '500'}
                  fontFamily="ui-monospace, monospace" letterSpacing="0.06em"
                  style={{ textTransform: 'uppercase', pointerEvents: 'none' }}
                >
                  {movement.shortLabel}
                </text>
              </motion.g>
            )
          })}
        </svg>

        {/* Progress stepper */}
        <div
          className="flex items-center justify-center gap-space-1 mt-space-2"
          role="tablist"
          aria-label="FDE movements"
        >
          {MOVEMENTS.map((movement) => {
            const isActive = active === movement.id
            return (
              <button
                key={movement.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleSelect(movement.id)}
                className="flex items-center gap-space-2 px-space-3 py-space-2 rounded-lg transition-all duration-200"
                style={{ background: isActive ? `${BRICK}0.07)` : 'transparent' }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full transition-all duration-200"
                  style={{ background: isActive ? `${BRICK}0.80)` : `${BRICK}0.18)` }}
                />
                <span
                  className="font-mono text-2xs uppercase tracking-widest"
                  style={{ color: isActive ? `${BRICK}0.72)` : 'var(--color-neutral-400)' }}
                >
                  {movement.n}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Right: detail panel (light) ───────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={prefersReduced ? {} : { opacity: 0, x: 12 }}
          animate={prefersReduced ? {} : { opacity: 1, x: 0 }}
          exit={prefersReduced ? {} : { opacity: 0, x: -12 }}
          transition={{ duration: 0.22 }}
        >
          {/* Movement header */}
          <div className="flex items-center gap-space-3 mb-space-5">
            <span
              className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full"
              style={{
                color: `${BRICK}0.80)`,
                background: `${BRICK}0.08)`,
                border: `1px solid ${BRICK}0.15)`,
              }}
            >
              {mv.n}
            </span>
            <span
              className="font-mono text-2xs uppercase tracking-widest"
              style={{ color: `${BRICK}0.55)` }}
            >
              {mv.verb}
            </span>
          </div>

          {/* Tagline */}
          <h3
            className="font-display font-semibold mb-space-5"
            style={{
              fontSize: 'clamp(1.35rem, 2.5vw, 1.85rem)',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              color: 'var(--color-neutral-900)',
            }}
          >
            {mv.tagline}
          </h3>

          {/* Objective box */}
          <div
            className="rounded-xl px-space-6 py-space-5 mb-space-5"
            style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.10)` }}
          >
            <p
              className="font-mono text-2xs uppercase tracking-widest mb-space-2"
              style={{ color: `${BRICK}0.60)` }}
            >
              Objective
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {mv.objective}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-space-3 mb-space-6">
            {mv.description.map((para, j) => (
              <p key={j} className="text-sm text-neutral-600 leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Key activities */}
          <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-3">
            Key activities
          </p>
          <div className="space-y-space-2 mb-space-6">
            {mv.activities.map((act, j) => {
              const key    = activeIdx * 10 + j
              const isOpen = openActivity === key
              return (
                <div
                  key={j}
                  className="rounded-lg overflow-hidden"
                  style={{ border: '1px solid var(--color-neutral-200)' }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenActivity(isOpen ? null : key)}
                    className="w-full text-left flex items-center justify-between px-space-5 py-space-4 transition-colors duration-200"
                    style={{ background: isOpen ? `${BRICK}0.04)` : '#FFFFFF' }}
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-sm text-neutral-900">
                      {act.title}
                    </span>
                    <span
                      className="shrink-0 ml-space-3 text-base"
                      style={{
                        color: `${BRICK}0.60)`,
                        transform: isOpen ? 'rotate(45deg)' : 'none',
                        display: 'inline-block',
                        transition: 'transform 0.2s',
                      }}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={prefersReduced ? {} : { height: 0, opacity: 0 }}
                        animate={prefersReduced ? {} : { height: 'auto', opacity: 1 }}
                        exit={prefersReduced ? {} : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p className="px-space-5 pb-space-4 text-sm text-neutral-600 leading-relaxed">
                          {act.detail}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

          {/* Key question */}
          <div
            className="rounded-xl px-space-6 py-space-5"
            style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.12)` }}
          >
            <p
              className="font-mono text-2xs uppercase tracking-widest mb-space-3"
              style={{ color: `${BRICK}0.65)` }}
            >
              The key question
            </p>
            <p className="text-sm text-neutral-700 leading-relaxed italic">
              {mv.keyQuestion}
            </p>
          </div>

          {/* Prev / next nav */}
          <div className="flex items-center justify-between mt-space-8">
            {activeIdx > 0 ? (
              <button
                type="button"
                onClick={() => handleSelect(MOVEMENTS[activeIdx - 1].id)}
                className="text-sm font-semibold hover:opacity-70 transition-opacity flex items-center gap-space-2"
                style={{ color: 'var(--color-neutral-500)' }}
              >
                ← {MOVEMENTS[activeIdx - 1].label}
              </button>
            ) : <div />}
            {activeIdx < MOVEMENTS.length - 1 && (
              <button
                type="button"
                onClick={() => handleSelect(MOVEMENTS[activeIdx + 1].id)}
                className="text-sm font-semibold hover:opacity-70 transition-opacity flex items-center gap-space-2"
                style={{ color: `${BRICK}0.85)` }}
              >
                {MOVEMENTS[activeIdx + 1].label} →
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

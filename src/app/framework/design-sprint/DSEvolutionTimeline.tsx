'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY = 'rgba(180,83,9,'

const VERSIONS = [
  {
    year: '2010–2016',
    name: 'The Original Google Ventures Sprint',
    org: 'Jake Knapp, John Zeratsky, Braden Kowitz at Google Ventures',
    badge: 'Foundation',
    summary:
      'The original Design Sprint was developed and refined at Google Ventures between 2010 and 2016, tested across more than 150 startups and enterprises. It ran Monday through Friday across five distinct days (Understand, Sketch, Decide, Prototype, Test) and was designed for startups and technology companies with dedicated sprint rooms, full-week calendar blocks, and small co-located cross-functional teams. The five-day structure was considered non-negotiable; the pace and continuity were core to the sprint\'s results.',
    changes: [
      { tag: 'Introduced', text: 'Five-day structure: Understand, Sketch, Decide, Prototype, Test, one day each, non-negotiable' },
      { tag: 'Introduced', text: 'The Decider role: one person with final authority over every sprint decision, explicitly named and mandatory' },
      { tag: 'Introduced', text: 'Five-user Friday testing: five representative users, one at a time, in 60-minute interviews; the team observes from a separate room' },
    ],
    limitation:
      'The five-day, in-room format was difficult for large organisations to commit to. Recruiting five representative users for Friday testing on short notice was consistently the hardest logistical challenge. The format assumed co-location, a significant constraint as distributed teams became standard.',
  },
  {
    year: '2018',
    name: 'Design Sprint 2.0',
    org: 'AJ&Smart (Jonathan Courtney and Dee Lanier) in collaboration with Jake Knapp',
    badge: 'Adaptation',
    summary:
      'Developed based on hundreds of sprint facilitations with large organisations across retail, healthcare, financial services, and government: contexts where the original startup-oriented format felt ill-fitting. Design Sprint 2.0 compresses five days into four by merging Monday and Tuesday through facilitation efficiencies: tighter time-boxing, simplified voting, and more structured ideation formats produce the same output in less time. Described as the most up-to-date semi-official version as of 2018.',
    changes: [
      { tag: 'Changed', text: 'Four days instead of five: Monday and Tuesday merged into a single day through tighter facilitation, without compromising output quality' },
      { tag: 'Changed', text: 'Simplified voting and more structured ideation formats, reducing facilitation overhead in large-organisation contexts' },
      { tag: 'Unchanged', text: 'The fundamental sequence, the Decider role, the Supervote, and the five-user Friday testing format all remain intact' },
    ],
    limitation:
      'The compression of Monday and Tuesday requires an experienced facilitator to make work. In less experienced hands, merging the two days risks shortcutting the problem-mapping and expert-talk work that Monday exists to do, producing a sprint that moves quickly toward the wrong target.',
  },
  {
    year: '2018',
    name: 'The Lightning Decision Jam',
    org: 'AJ&Smart',
    badge: 'Variant',
    summary:
      'Not a compressed sprint but a different tool built on the same principles. The Lightning Decision Jam (LDJ) is optimised for a two to four hour session to make faster decisions on any subject. It runs silent individual ideation, dot voting, How Might We reframing, solution generation, prioritisation on an effort/impact matrix, and commitment to action steps, all without open discussion or debate. Where the Design Sprint answers a complex, prototype-testable question in a week, the LDJ answers a defined decision in an afternoon.',
    changes: [
      { tag: 'Introduced', text: 'Two to four hour format: completes a structured decision cycle in a single session, with no prototype or user testing' },
      { tag: 'Introduced', text: 'Effort/impact matrix: prioritises solutions by ease of execution versus expected impact, producing a clear action list at the end' },
      { tag: 'Adapted', text: 'Same core principles as the sprint (silent work, dot voting, structured decision) applied to the smaller, faster problem of team alignment and priority-setting' },
    ],
    limitation:
      'The LDJ is the right tool for decisions and priorities; it is not a substitute for a full sprint when the question requires prototype validation. Teams that run LDJs instead of sprints because sprints are logistically hard are solving the wrong problem.',
  },
  {
    year: '2020+',
    name: 'The Remote Sprint',
    org: 'Practitioner community',
    badge: 'Remote',
    summary:
      'The global shift to remote work forced adaptation of a format designed entirely around in-person collaboration. The Remote Sprint uses digital facilitation tools (Miro, Mural, FigJam) replacing physical materials, asynchronous phases between synchronous sessions, and remote user testing via Lookback, UserTesting, or Zoom. The structure and sequence remain identical; the medium changes. Remote sprints work well but require stronger facilitation to maintain engagement and produce the concentrated focus that physical co-location creates naturally.',
    changes: [
      { tag: 'Changed', text: 'Physical materials replaced by digital facilitation tools: Miro or Mural for the board, FigJam for ideation, Lookback or Zoom for user testing' },
      { tag: 'Added', text: 'Asynchronous phases between synchronous sessions: some activities run as homework between video calls to reduce screen-time fatigue' },
      { tag: 'Lost', text: 'The energy and spontaneous momentum of a co-located sprint room, between-session conversation, and the collective focus that physical presence creates; harder to replicate remotely' },
    ],
    limitation:
      'Remote sprints introduce significant facilitation overhead: maintaining attention, preventing multitasking, and replicating the social energy that drives a co-located sprint\'s intensity all require deliberate intervention. The results are comparable; the experience is harder.',
  },
  {
    year: 'Ongoing',
    name: 'The IDEO HCD Sprint Variant',
    org: 'IDEO practitioners',
    badge: 'Extension',
    summary:
      'The IDEO variant front-loads the sprint with a one to two day empathy phase: brief user interviews and observation sessions before the mapping work on Monday. This is a compressed discovery phase placed at the sprint\'s front. The original GV format assumes the team enters Monday with enough user understanding to map the challenge accurately; the IDEO variant catches the sprint when that understanding is weak, making it better when the team has limited prior knowledge of the user\'s real experience.',
    changes: [
      { tag: 'Added', text: 'One to two day pre-sprint empathy phase: brief user interviews and observation sessions before Monday\'s mapping work begins' },
      { tag: 'Rationale', text: 'The GV sprint assumes prior user knowledge; the IDEO variant builds that knowledge into the sprint itself for teams entering without a strong research base' },
      { tag: 'Duration', text: 'Six to seven days total, longer than the original but more self-contained for teams that cannot point to existing user research' },
    ],
    limitation:
      'Adding discovery at the sprint\'s front creates a longer commitment. For teams with existing user research, the IDEO variant front-loads work that is already done. The original format is more efficient when the team already knows the user well.',
  },
]

export default function DSEvolutionTimeline() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()

  const v = VERSIONS[active]

  return (
    <div>
      {/* Timeline row */}
      <div className="relative mb-space-10">
        <div
          className="absolute top-4 left-0 right-0 h-px hidden md:block"
          style={{ background: `${CLAY}0.12)` }}
        />
        <div className="flex md:grid md:grid-cols-5 gap-space-2 overflow-x-auto pb-space-2 relative">
          {VERSIONS.map((ver, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className="flex flex-col items-center gap-space-2 min-w-[68px] flex-1"
            >
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold relative z-10 transition-all duration-200"
                style={{
                  background: active === i ? `${CLAY}1)` : `${CLAY}0.08)`,
                  border: `1px solid ${active === i ? 'transparent' : `${CLAY}0.20)`}`,
                  color: active === i ? '#fff' : `${CLAY}0.70)`,
                }}
              >
                {i + 1}
              </div>
              <p
                className="font-mono text-2xs uppercase tracking-widest text-center leading-tight transition-colors duration-200"
                style={{ color: active === i ? `${CLAY}0.85)` : 'var(--color-neutral-500)' }}
              >
                {ver.year}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Active version detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
          animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
          exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="grid md:grid-cols-2 gap-space-8"
        >
          {/* Left: summary + limitation */}
          <div>
            <div className="flex items-center gap-space-3 mb-space-5">
              <span
                className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full"
                style={{ color: `${CLAY}0.80)`, background: `${CLAY}0.08)`, border: `1px solid ${CLAY}0.15)` }}
              >
                {v.badge}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-space-2">{v.name}</h3>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-5">{v.org}</p>
            <p className="text-base text-neutral-600 leading-relaxed">{v.summary}</p>

            {v.limitation && (
              <div
                className="mt-space-6 rounded-lg px-space-5 py-space-4"
                style={{ background: 'rgba(17,24,39,0.03)', border: '1px solid rgba(17,24,39,0.08)' }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-2">
                  Acknowledged limitation
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">{v.limitation}</p>
              </div>
            )}
          </div>

          {/* Right: changes */}
          <div>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-4">
              {active === 0 ? 'What it introduced' : 'What changed'}
            </p>
            <div className="space-y-space-3">
              {v.changes.map((change, j) => (
                <div
                  key={j}
                  className="flex gap-space-4 rounded-lg p-space-4"
                  style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-100)' }}
                >
                  <span
                    className="font-mono text-xs px-space-2 py-space-1 rounded shrink-0 self-start"
                    style={{ background: `${CLAY}0.08)`, color: `${CLAY}0.80)`, whiteSpace: 'nowrap' }}
                  >
                    {change.tag}
                  </span>
                  <p className="text-sm text-neutral-700 leading-relaxed">{change.text}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between mt-space-8">
              {active > 0 ? (
                <button
                  type="button"
                  onClick={() => setActive(active - 1)}
                  className="text-sm font-semibold transition-opacity hover:opacity-70 flex items-center gap-space-2"
                  style={{ color: 'var(--color-neutral-600)' }}
                >
                  ← {VERSIONS[active - 1].year}
                </button>
              ) : (
                <div />
              )}
              {active < VERSIONS.length - 1 && (
                <button
                  type="button"
                  onClick={() => setActive(active + 1)}
                  className="text-sm font-semibold transition-opacity hover:opacity-70 flex items-center gap-space-2"
                  style={{ color: `${CLAY}0.85)` }}
                >
                  {VERSIONS[active + 1].year} →
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

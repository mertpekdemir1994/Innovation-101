'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,77,122,'

const VERSIONS = [
  {
    year: '2001',
    name: 'The Agile Manifesto',
    org: 'Beck, Beedle, van Bennekum, and 14 others at Snowbird, Utah',
    badge: 'Foundation',
    summary:
      'The Agile Manifesto is not a framework; it is four values and twelve principles. It emerged from a gathering of software practitioners who were frustrated with heavyweight, documentation-driven processes and wanted to articulate an alternative philosophy. The four values: individuals and interactions over processes and tools, working software over comprehensive documentation, customer collaboration over contract negotiation, and responding to change over following a plan. What the Manifesto is not: a prescription for how to organize teams, run sprints, or structure governance. Every framework in this section is one interpretation of those four values, and they differ significantly from each other.',
    changes: [
      { tag: 'Introduced', text: 'Four values: individuals and interactions, working software, customer collaboration, responding to change, over process, documentation, contracts, and plans' },
      { tag: 'Introduced', text: 'Twelve principles including: welcome changing requirements, deliver working software frequently, build motivated individuals and trust them, sustainable pace, continuous attention to technical excellence' },
      { tag: 'Not included', text: 'Any prescription for roles, ceremonies, sprint structure, or governance; those interpretations came later, from Scrum and others' },
    ],
    limitation:
      'The Manifesto is a philosophy, not an implementation guide. It tells you what to value but not how to organize a team, run a planning session, or coordinate ten teams working on the same product. The practitioner community filled that gap in different ways, producing the family of frameworks below.',
  },
  {
    year: '1995 / 2001',
    name: 'Scrum',
    org: 'Jeff Sutherland and Ken Schwaber',
    badge: 'Core Framework',
    summary:
      'Scrum is the most widely adopted Agile framework and the one most people mean when they say "Agile" in a business context. It introduced sprints (two-week delivery cycles), the Scrum team (Product Owner, Scrum Master, developers), the sprint backlog, the daily standup, the sprint review, and the retrospective: the basic rhythms that define most Agile teams today. Scrum was designed for software delivery, not for innovation discovery. Teams that use Scrum for innovation without modification risk running efficient delivery cycles that produce the wrong product efficiently. The Discovery Sprint and hypothesis-driven backlog are the additions that make Scrum applicable to innovation contexts.',
    changes: [
      { tag: 'Introduced', text: 'The Sprint: a two-week time-boxed delivery cycle with a fixed goal and a commitment made at the start' },
      { tag: 'Introduced', text: 'Scrum roles: Product Owner (backlog priority), Scrum Master (process), development team (delivery): clear accountability, minimal hierarchy' },
      { tag: 'Introduced', text: 'The four ceremonies: Sprint Planning, Daily Standup, Sprint Review, Retrospective: the basic rhythm Agile Innovation extends' },
    ],
    limitation:
      'Scrum\'s discovery layer is weak by design; it was built for software delivery, not problem-finding. Teams that apply Scrum to ambiguous innovation challenges without adding a Discovery Sprint or hypothesis-driven backlog often find themselves efficiently building the wrong thing.',
  },
  {
    year: '2012–2014',
    name: 'The Spotify Model',
    org: 'Henrik Kniberg and Anders Ivarsson, documenting Spotify\'s approach',
    badge: 'Autonomy Variant',
    summary:
      'Not an official framework but a description of how Spotify organized its product and engineering teams at a specific point in its growth. Published as two whitepapers in 2012 and 2014. Spotify has since moved on from this model, which makes its widespread adoption by other organizations somewhat ironic. The core contribution: an organizational structure for scaling Agile through autonomy and alignment rather than heavy process. Squads (small, cross-functional, autonomous teams with a clear mission), Tribes (collections of squads working in the same domain), Chapters (functional communities across squads), and Guilds (interest communities across the organization). Many organizations that have adopted it wholesale have created the structural forms without the cultural conditions that made them work at Spotify, resulting in new org chart labels on top of old ways of working.',
    changes: [
      { tag: 'Introduced', text: 'Squad model: small, cross-functional, autonomous teams with a clear mission: the unit of delivery is a Squad, not a function' },
      { tag: 'Introduced', text: 'Tribes, Chapters, Guilds: lightweight coordination structures to prevent fragmentation without creating bureaucracy' },
      { tag: 'Key insight', text: 'Align on mission and principles, trust autonomous teams to figure out execution: scaling through culture, not process' },
    ],
    limitation:
      'Spotify itself has said it no longer uses this model exactly as described. It was never intended as a prescriptive framework. The structural forms (squads, tribes, chapters) without the cultural conditions that made them work at Spotify produce new org chart labels on top of old ways of working, a common failure mode.',
  },
  {
    year: '2011–ongoing',
    name: 'SAFe: Scaled Agile Framework',
    org: 'Dean Leffingwell',
    badge: 'Enterprise Scale',
    summary:
      'SAFe is the most prescriptive framework for scaling Agile across large enterprises. It defines roles, responsibilities, ceremonies, and processes at team, program, portfolio, and enterprise levels. It combines Agile, Lean, and DevOps practices into a comprehensive system designed for organizations with hundreds of teams. The SAFe tradeoff: strong top-down alignment and governance structures that satisfy enterprise compliance and planning requirements, at the cost of the speed and team autonomy that the original Agile Manifesto prioritized. Best for large regulated enterprises with many interdependent teams. Can slow innovation through governance overhead in organizations that do not need that level of coordination.',
    changes: [
      { tag: 'Introduced', text: 'Program Increment (PI) Planning: large-scale coordinated planning session aligning multiple teams to a shared quarterly roadmap' },
      { tag: 'Introduced', text: 'Four-level hierarchy: Team, Program, Portfolio, Enterprise, each with defined roles, ceremonies, and governance gates' },
      { tag: 'Tradeoff', text: 'Strong alignment across many teams; can reduce the speed and team autonomy that Agile Innovation requires; best evaluated against the organization\'s actual coordination needs' },
    ],
    limitation:
      'SAFe\'s comprehensive prescriptiveness can introduce exactly the governance overhead that Agile was designed to escape. Organizations that adopt SAFe without needing enterprise-level coordination often find themselves with more process and less innovation speed than before.',
  },
  {
    year: '2019',
    name: 'Team Topologies',
    org: 'Matthew Skelton and Manuel Pais',
    badge: 'Org Design',
    summary:
      'Team Topologies is not an Agile framework; it is an approach to organizational design that complements Agile. Its core insight is drawn from Conway\'s Law: organizations will produce systems that mirror their communication structures. If you want modular, fast-moving software and innovation delivery, you need modular, fast-moving teams. Team Topologies defines four fundamental team types: Stream-aligned teams (delivering value directly to users), Platform teams (building internal tools and infrastructure), Enabling teams (helping stream-aligned teams acquire new capabilities), and Complicated subsystem teams (handling components requiring deep specialist knowledge). Many organizations that have hit the limits of both SAFe and the Spotify Model have found Team Topologies a more principled and adaptable foundation.',
    changes: [
      { tag: 'Introduced', text: 'Four team types: Stream-aligned, Platform, Enabling, and Complicated subsystem, matched to the nature and cognitive load of the work, not org hierarchy' },
      { tag: 'Introduced', text: 'Team interaction modes: Collaboration, X-as-a-Service, and Facilitating: explicit, designed, and time-bounded rather than implicit' },
      { tag: 'Key insight', text: 'Cognitive load determines team size and scope. Explicitly constraining cognitive load per team is the prerequisite for fast, independent delivery' },
    ],
    limitation:
      'Team Topologies is a design principle rather than a process framework. It tells you how to structure teams for fast flow but not how to run sprints, coordinate planning, or manage backlogs. It works best as a foundation for whichever process framework a team runs on top.',
  },
  {
    year: '2019',
    name: 'Shape Up',
    org: 'Ryan Singer at Basecamp (now 37signals)',
    badge: 'Focus Variant',
    summary:
      'Shape Up is a direct challenge to Scrum\'s two-week sprint cadence, arguing that two weeks is too short to produce meaningful work and too long to maintain urgency. Basecamp\'s alternative: six-week cycles with two-week cooldowns between them. Key innovations: "Shaping" work before it enters a cycle: taking raw ideas and shaping them into well-defined problems with appetite (how much time is it worth) and rough solution concepts, before a team commits to building. "Betting" on shaped work rather than maintaining a backlog, with leadership selecting which shaped pitches to bet on each cycle, and unselected work not automatically rolling over. "No backlogs," because if work is important enough, it will be pitched again next cycle.',
    changes: [
      { tag: 'Replaced', text: 'Two-week sprints with six-week cycles: long enough to produce meaningful work, with two-week cooldowns for fixing, shipping, and exploration between cycles' },
      { tag: 'Introduced', text: 'Shaping: a pre-cycle process where leadership takes raw ideas and shapes them into well-defined problems with appetite and rough solution concepts before betting on them' },
      { tag: 'Replaced', text: 'The backlog with betting: leadership selects which shaped pitches to build each cycle; nothing automatically rolls over; if it matters, it gets re-pitched' },
    ],
    limitation:
      'Shape Up requires a level of organizational trust and maturity that many teams do not yet have. Eliminating backlogs and committing leadership time to shaping are significant cultural changes. Teams that adopt the six-week cycle without the shaping and betting processes often just get a longer sprint with the same problems as before.',
  },
]

export default function AIEvolutionTimeline() {
  const [active, setActive] = useState(0)
  const prefersReduced = useReducedMotion()

  const v = VERSIONS[active]

  return (
    <div>
      {/* Timeline row */}
      <div className="relative mb-space-10">
        <div
          className="absolute top-4 left-0 right-0 h-px hidden md:block"
          style={{ background: `${PLUM}0.12)` }}
        />
        <div className="flex md:grid md:grid-cols-6 gap-space-2 overflow-x-auto pb-space-2 relative">
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
                  background: active === i ? `${PLUM}1)` : `${PLUM}0.08)`,
                  border: `1px solid ${active === i ? 'transparent' : `${PLUM}0.20)`}`,
                  color: active === i ? '#fff' : `${PLUM}0.90)`,
                }}
              >
                {i + 1}
              </div>
              <p
                className="font-mono text-2xs uppercase tracking-widest text-center leading-tight transition-colors duration-200"
                style={{ color: active === i ? `${PLUM}0.85)` : 'var(--color-neutral-500)' }}
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
                style={{ color: `${PLUM}0.90)`, background: `${PLUM}0.08)`, border: `1px solid ${PLUM}0.15)` }}
              >
                {v.badge}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-neutral-900 mb-space-2">{v.name}</h3>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-5">{v.org}</p>
            <p className="text-base text-neutral-600 leading-relaxed">{v.summary}</p>

            {v.limitation && (
              <div
                className="mt-space-6 rounded-lg px-space-5 py-space-4"
                style={{ background: 'rgba(17,24,39,0.03)', border: '1px solid rgba(17,24,39,0.08)' }}
              >
                <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-2">
                  Acknowledged limitation
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed">{v.limitation}</p>
              </div>
            )}
          </div>

          {/* Right: changes */}
          <div>
            <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-4">
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
                    style={{ background: `${PLUM}0.08)`, color: `${PLUM}0.90)`, whiteSpace: 'nowrap' }}
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
                  style={{ color: `${PLUM}0.85)` }}
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

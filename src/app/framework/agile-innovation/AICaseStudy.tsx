'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,77,122,'

type StageKey = 'discovery' | 'backlog' | 'sprint' | 'review' | 'retro'

const STAGE_DEFS: { key: StageKey; label: string; sub: string; mode: string }[] = [
  { key: 'discovery', label: 'Discovery Sprint',     sub: 'Stage 01', mode: 'Discover'  },
  { key: 'backlog',   label: 'Backlog Management',   sub: 'Stage 02', mode: 'Prioritize'},
  { key: 'sprint',    label: 'Sprint Execution',     sub: 'Stage 03', mode: 'Build'     },
  { key: 'review',    label: 'Sprint Review',        sub: 'Stage 04', mode: 'Demo'      },
  { key: 'retro',     label: 'Retrospective',        sub: 'Stage 05', mode: 'Improve'   },
]

type ArtifactType = 'quote' | 'finding' | 'decision'
type Artifact = { type: ArtifactType; label: string; lines: string[] }
type StageData = { intro: string; work: string; artifact: Artifact; insight: string }

const STAGES: Record<StageKey, StageData> = {
  discovery: {
    intro:
      'Instead of a planning phase, the squad began with discovery. The first two weeks were entirely research: no backlog refinement, no sprint planning, no development.',
    work: 'Fifteen interviews with small-business owners about how they buy and manage insurance, plus assumption mapping of the original initiative concept. The squad entered the research with confidence in their central idea: a self-service portal for policy management.',
    artifact: {
      type: 'quote',
      label: 'The assumption that broke: small-business owner, interview week one',
      lines: [
        'The original initiative assumed small-business owners wanted a self-service portal to manage their own policies. The interviews said something completely different.',
        '"I don\'t want to log in and manage anything. I want to know I\'m covered and never think about it again. The last thing I need is another portal with another password."',
        'The core assumption behind the entire initiative, that self-service was the value, was not just unsupported. It was inverted. The product\'s value was reassurance and absence of effort, not self-service control.',
      ],
    },
    insight:
      'Three insights reshaped the backlog before a line of code was written. The central one: the product\'s value was reassurance and absence of effort, not self-service control. Without the Discovery Sprint, the squad would have spent the next six months building a portal nobody wanted.',
  },
  backlog: {
    intro:
      'With discovery complete, the squad rebuilt the backlog from scratch, not as a feature list but as a prioritized hypothesis list. Every item was tagged: validated, testing, or exploring.',
    work: 'Rewriting each proposed initiative feature as a hypothesis with a stated success metric and risk level. The three-tier structure (validated, testing, exploring) made the backlog\'s risk profile visible instead of hiding uncertainty inside confident-sounding feature names.',
    artifact: {
      type: 'decision',
      label: 'A backlog item rewritten: before and after',
      lines: [
        'Before: "Build policy-management dashboard." A confident-sounding feature with no stated hypothesis and no metric.',
        'After: "TESTING. Hypothesis: small-business owners will value a single plain-language \'you\'re covered\' summary over a management dashboard. Success metric: in testing, a majority prefer the summary and can correctly state what they are covered for. Risk: high, this inverts our original concept."',
        'The backlog now made the team\'s uncertainty visible. Every item had a hypothesis, a metric, and a risk level. The team knew, for the first time, exactly how much of the backlog was settled versus assumed.',
      ],
    },
    insight:
      'A hypothesis-driven backlog makes the team honest about what it knows versus what it is assuming. The Brightwater squad discovered that most of the original initiative\'s backlog was assumption, not validated requirement. Seeing that clearly was uncomfortable, and necessary.',
  },
  sprint: {
    intro:
      'Rather than build the inverted concept at full scale, the squad built the smallest real version: a working one-page, plain-language coverage summary for a single insurance product.',
    work: 'A working (not mocked) coverage summary generated from real policy data, finished within the two-week sprint. The discipline that made this possible was the cross-functional squad: design, engineering, and research were all inside the team, so nothing waited on another department.',
    artifact: {
      type: 'finding',
      label: 'Sprint output: working coverage summary (not a prototype, not a plan)',
      lines: [
        'One-page, plain-language coverage summary for a single insurance product type',
        'Generated from real policy data, not a design mock or a clickable prototype',
        'Readable by someone with no insurance background in under 60 seconds',
        'Built, reviewed, and ready for user testing in 11 working days',
        'The cross-functional squad structure was why this was possible: no handoffs, no waiting, no inter-department scheduling',
      ],
    },
    insight:
      'The squad shipped something real in two weeks because all the capabilities needed to deliver (design, engineering, product) were in the same team. Brightwater\'s previous initiatives had these capabilities in separate departments. That structural difference, not work ethic or talent, was what had made tight cycles impossible before.',
  },
  review: {
    intro:
      'The squad demoed the working coverage summary directly to four small-business owners, not just to internal stakeholders. The Sprint Review was a live demonstration, not a slide presentation.',
    work: 'Four 45-minute sessions with real small-business owners, watching them interact with the working coverage summary and capturing their questions, reactions, and requests. The observation room tracked reactions against the squad\'s open hypotheses.',
    artifact: {
      type: 'finding',
      label: 'Patterns across four users: Sprint Review synthesis',
      lines: [
        'All four immediately understood the summary and reacted positively, confirming the discovery sprint\'s reassurance-over-control insight',
        'Three of the four asked, unprompted, some version of "is this all I have to do?", the squad read this as strong confirmation',
        '"I\'d pay more for this than for what we have now." (Owner 2, unprompted, comparing to their current policy management experience)',
        'One surfaced a new need the squad had not anticipated: a simple way to share proof of coverage with a client or landlord on demand',
        'That feedback became the highest-priority new item on the backlog for the next cycle, added within 24 hours of the review',
      ],
    },
    insight:
      'The proof-of-coverage sharing need was surfaced by real users in a Sprint Review, not by an internal product manager. That is precisely the point: the Sprint Review with real users produces evidence, not approval. Internal stakeholders produce approval. The squad now had a high-confidence new backlog item grounded in direct user behavior.',
  },
  retro: {
    intro:
      'The squad reflected on how the first cycle went, not on the product, but on the process. The single most consequential change they made did not come from a restructuring. It came from a retrospective.',
    work: 'Three questions, 90 minutes: What went well? What did not go well? What will we try differently next sprint? Each process change had a named owner and a specific definition of what "changed" would look like in the next sprint.',
    artifact: {
      type: 'decision',
      label: 'The owned action that removed the most persistent bottleneck',
      lines: [
        'The team noted that legal review had nearly blocked the Sprint Review at the last minute. Compliance was not involved until the end: a gate rather than a partner.',
        'The owned action: invite a compliance partner into the Discovery Sprint and backlog refinement from the next cycle onward. Owner: Product Owner. Definition: compliance is in the discovery kickoff by next cycle\'s week one.',
        'This single process change, made in a retrospective, removed the bottleneck that had quietly killed Brightwater\'s previous initiatives late in the process, not through a reorganization, but through a habit formed in a 90-minute meeting.',
      ],
    },
    insight:
      'The compliance bottleneck had killed three of Brightwater\'s previous eleven initiatives when they reached the legal review gate at the end of a long development cycle. Moving that gate to the beginning cost nothing and eliminated the risk. The retrospective made this visible and actionable in less time than it would have taken to schedule a steering committee meeting about it.',
  },
}

const LESSONS = [
  {
    n: '01',
    title: 'The Discovery Sprint inverted the core concept before money was spent.',
    detail:
      'The opening discovery work revealed that the founding assumption, owners want self-service, was backwards. Without the discovery layer, the squad would have efficiently built a self-service portal nobody wanted, which is precisely how the previous eleven initiatives failed: efficient delivery toward the wrong destination.',
  },
  {
    n: '02',
    title: 'Cross-functional squads are not optional.',
    detail:
      'The initiative succeeded because design, engineering, research, and product sat in one team with shared accountability. Brightwater\'s previous initiatives had these capabilities in separate departments, making tight cycles structurally impossible no matter how motivated the people were.',
  },
  {
    n: '03',
    title: 'The ability to stop is as valuable as the ability to ship.',
    detail:
      'One of Brightwater\'s other two squads, after a Discovery Sprint, found that the market assumption beneath its initiative was false and deliberately stopped. That stop, made on evidence after weeks rather than 18 months, was cited by the CIO as the clearest proof the new way of working was succeeding.',
  },
  {
    n: '04',
    title: 'Retrospectives removed the bottleneck that planning never could.',
    detail:
      'The process change to bring compliance into discovery rather than treating it as a final gate came from a retrospective, not a reorganization. The framework\'s habit of improving how the team works, every cycle, dislodged the structural problem that had quietly killed earlier initiatives.',
  },
]

function ArtifactBlock({ artifact }: { artifact: Artifact }) {
  if (artifact.type === 'quote') {
    return (
      <div
        className="rounded-xl p-space-6"
        style={{ background: `${PLUM}0.04)`, border: `1px solid ${PLUM}0.10)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-4" style={{ color: `${PLUM}0.65)` }}>
          {artifact.label}
        </p>
        <div className="space-y-space-3">
          {artifact.lines.map((line, i) =>
            i === artifact.lines.length - 1 ? (
              <p
                key={i}
                className="text-base text-neutral-800 leading-relaxed italic pl-space-4"
                style={{ borderLeft: `3px solid ${PLUM}0.40)` }}
              >
                {line}
              </p>
            ) : (
              <p key={i} className="text-sm text-neutral-600 leading-relaxed">{line}</p>
            )
          )}
        </div>
      </div>
    )
  }

  if (artifact.type === 'decision') {
    return (
      <blockquote
        className="rounded-xl p-space-6"
        style={{ background: `${PLUM}0.04)`, borderLeft: `4px solid ${PLUM}0.50)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${PLUM}0.70)` }}>
          {artifact.label}
        </p>
        {artifact.lines.map((line, i) => (
          <p key={i} className={`text-base text-neutral-800 leading-relaxed${i > 0 ? ' mt-space-3' : ''}`}>
            {line}
          </p>
        ))}
      </blockquote>
    )
  }

  return (
    <div
      className="rounded-xl p-space-6"
      style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}
    >
      <p className="font-mono text-2xs uppercase tracking-widest mb-space-4 text-neutral-500">
        {artifact.label}
      </p>
      <div className="space-y-space-2">
        {artifact.lines.map((line, i) => (
          <p key={i} className="text-sm text-neutral-700 leading-relaxed">{line}</p>
        ))}
      </div>
    </div>
  )
}

function StageContent({ stageKey }: { stageKey: StageKey }) {
  const stage = STAGES[stageKey]
  return (
    <div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-space-5">{stage.intro}</p>
      <div className="mb-space-5">
        <p className="text-2xs font-semibold uppercase tracking-widest text-neutral-500 mb-space-2">The work</p>
        <p className="text-sm text-neutral-700 leading-relaxed">{stage.work}</p>
      </div>
      <div className="mb-space-5">
        <p className="text-2xs font-semibold uppercase tracking-widest text-neutral-500 mb-space-2">Sample output</p>
        <ArtifactBlock artifact={stage.artifact} />
      </div>
      <div
        className="rounded-lg px-space-5 py-space-4"
        style={{ background: `${PLUM}0.05)`, borderLeft: `3px solid ${PLUM}0.40)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: `${PLUM}0.70)` }}>
          What it meant
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed italic">{stage.insight}</p>
      </div>
    </div>
  )
}

export default function AICaseStudy() {
  const [activeStage, setActiveStage] = useState<StageKey>('discovery')
  const prefersReduced = useReducedMotion()

  return (
    <div className="mt-space-8">
      {/* Mock scenario disclaimer */}
      <div
        className="rounded-xl px-space-6 py-space-4 mb-space-8 flex gap-space-4 items-start"
        style={{ background: 'rgba(17,24,39,0.04)', border: '1px solid rgba(17,24,39,0.08)' }}
      >
        <span
          className="font-mono text-2xs uppercase tracking-widest px-space-2 py-space-1 rounded shrink-0 mt-0.5"
          style={{ background: 'rgba(17,24,39,0.08)', color: 'rgba(17,24,39,0.45)' }}
        >
          Mock scenario
        </span>
        <p className="text-sm text-neutral-600 leading-relaxed">
          Brightwater Mutual is an invented company and this transformation is illustrative. It is written to show,
          concretely, what the work and outputs of the Agile Innovation rhythm look like over several cycles.
          The methods, artifacts, and decision logic are realistic; the company and its results are fictional.
        </p>
      </div>

      {/* Company context card */}
      <div
        className="rounded-2xl overflow-hidden mb-space-8"
        style={{ border: '1px solid var(--color-neutral-200)' }}
      >
        <div
          className="px-space-6 md:px-space-8 py-space-5 border-b flex flex-wrap gap-space-6"
          style={{ background: 'var(--color-warm-50)', borderColor: 'var(--color-neutral-100)' }}
        >
          {[
            ['Company', 'Brightwater Mutual (fictional)'],
            ['Sector', 'Insurance, 15,000 employees'],
            ['Duration', '18 months, three squads'],
            ['Team', 'Cross-functional squad per initiative'],
            ['Framework', 'Agile Innovation rhythm'],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-1">{label}</p>
              <p className="text-sm font-semibold text-neutral-900">{val}</p>
            </div>
          ))}
        </div>
        <div className="px-space-6 md:px-space-8 py-space-7">
          <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${PLUM}0.65)` }}>
            The problem
          </p>
          <p
            className="font-display font-semibold text-balance"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)', lineHeight: 1.2, color: 'var(--color-neutral-900)', letterSpacing: '-0.01em' }}
          >
            Eleven innovation initiatives over three years. None reached the market. The same pattern every time: a long planning phase, a long development phase, and by the time anything was ready, the market or regulatory environment had shifted.
          </p>
          <p className="text-sm text-neutral-500 mt-space-3">
            The new Chief Innovation Officer stopped adding initiatives and changed how the work was done.
          </p>
        </div>
      </div>

      {/* Stage navigator */}
      <div className="flex flex-wrap gap-space-2 mb-space-6">
        {STAGE_DEFS.map(({ key, label, sub, mode }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveStage(key)}
            className="flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-colors duration-200 flex-1 min-w-[90px]"
            style={{
              background: activeStage === key ? `${PLUM}0.08)` : '#FFFFFF',
              border: `1px solid ${activeStage === key ? `${PLUM}0.25)` : 'var(--color-neutral-200)'}`,
            }}
          >
            <span
              className="font-mono text-2xs uppercase tracking-widest mb-space-1"
              style={{ color: activeStage === key ? `${PLUM}0.65)` : 'var(--color-neutral-500)' }}
            >
              {mode}
            </span>
            <span
              className="font-semibold text-sm leading-snug"
              style={{ color: activeStage === key ? `${PLUM}0.90)` : 'var(--color-neutral-700)' }}
            >
              {label}
            </span>
            <span
              className="text-xs"
              style={{ color: activeStage === key ? `${PLUM}0.55)` : 'var(--color-neutral-500)' }}
            >
              {sub}
            </span>
          </button>
        ))}
      </div>

      {/* Stage content panel */}
      <div
        className="rounded-2xl p-space-6 md:p-space-8 mb-space-10"
        style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage}
            initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <StageContent stageKey={activeStage} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Key lessons */}
      <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-4">Key lessons</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-space-4">
        {LESSONS.map(({ n, title, detail }) => (
          <div
            key={n}
            className="rounded-xl p-space-6"
            style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
          >
            <span
              className="font-mono text-3xl font-semibold block mb-space-4"
              style={{ color: `${PLUM}0.12)`, lineHeight: 1 }}
            >
              {n}
            </span>
            <p className="font-semibold text-sm text-neutral-900 mb-space-2 leading-snug">{title}</p>
            <p className="text-xs text-neutral-500 leading-relaxed">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

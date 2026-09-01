'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL = 'rgba(13,148,136,'

type StageKey = 'empathize' | 'define' | 'ideate' | 'prototype' | 'test'

const STAGE_DEFS: { key: StageKey; label: string; sub: string; mode: string }[] = [
  { key: 'empathize', label: 'Empathize', sub: 'Weeks 1–5', mode: 'Understand' },
  { key: 'define', label: 'Define', sub: 'Weeks 6–7', mode: 'Frame' },
  { key: 'ideate', label: 'Ideate', sub: 'Weeks 8–9', mode: 'Generate' },
  { key: 'prototype', label: 'Prototype', sub: 'Weeks 10–11', mode: 'Make' },
  { key: 'test', label: 'Test', sub: 'Weeks 12–14', mode: 'Learn' },
]

type ArtifactType = 'quote' | 'finding' | 'pov'
type Artifact = { type: ArtifactType; label: string; lines: string[] }

type StageData = {
  intro: string
  work: string
  artifact: Artifact
  insight: string
}

const STAGES: Record<StageKey, StageData> = {
  empathize: {
    intro:
      'The team resisted the urge to survey teenagers about library features and instead got close to their actual lives.',
    work: '"Shadowing" sessions with 18 teenagers across different neighbourhoods, spending unstructured time with them after school. Open-ended conversations, not about the library, but about their days, their pressures, and where they went. Observation in the branches at the hours teens were present.',
    artifact: {
      type: 'quote',
      label: 'Raw observation: Teen T-09, age 15',
      lines: [
        'Participant T-09 comes to the central branch almost every day after school but never checks out a book and never uses a computer. She sits at a corner table doing homework.',
        '"It\'s quiet, it\'s free, and nobody\'s asking me anything. My house is loud and my little brothers are everywhere." She had no idea the library ran any teen programs.',
      ],
    },
    insight:
      'The teenagers who still came were not coming for books, technology, or programs. They were coming for something the library had almost by accident and was not consciously providing: a safe, calm, free, unsupervised-but-protected third place between school and home. The board\'s assumption, that teens wanted more technology, was contradicted by nearly every observation.',
  },
  define: {
    intro:
      'The team synthesised the empathy work and confronted the gap between what they had assumed and what they had seen.',
    work: 'Clustering observations, mapping the tensions, and writing a point-of-view statement. The synthesis required naming what the empathy work had actually revealed, not what the board had assumed.',
    artifact: {
      type: 'pov',
      label: 'The reframed point of view',
      lines: [
        'A teenager under pressure from school and a crowded home needs a place that feels like it is genuinely theirs (calm, free, and free of demands) because what they are missing is not entertainment or technology, but a third place where they can simply be.',
        'The library already is this for a few; it just does not know it, name it, or offer it on purpose.',
      ],
    },
    insight:
      'The reframe killed the gaming-lab-and-makerspace plan, which would have made the space louder and more demanding, the opposite of the need. It opened a completely different design direction centred on belonging and calm, not features. A good problem statement did not point at a solution; it opened a space the team had not been looking at.',
  },
  ideate: {
    intro:
      'With the need sharply framed, the team generated a wide range of ideas before judging any of them.',
    work: '"How might we make teenagers feel the library is genuinely theirs?" Several ideation sessions, deferring judgment, going for quantity, including deliberately wild ideas. Roughly 90 ideas generated, then clustered and narrowed.',
    artifact: {
      type: 'finding',
      label: 'Sample of the range: 90 ideas generated',
      lines: [
        'Teen-only room with teens setting the rules',
        '"No-questions" quiet zones signposted explicitly',
        'Teen advisory board with a real budget and real say',
        'Later evening hours on weekdays',
        'Ambient lighting and soft seating chosen by teens',
        'Programs designed and run by teens rather than for them',
        'Graffiti-able wall in the teen section',
      ],
    },
    insight:
      'The strongest ideas shared a theme: give teenagers genuine ownership and a calm space, rather than give them more stuff. The team selected a small bundle to prototype: a teen-governed room, teen-set rules, and a teen advisory board with real input. The convergence came from asking which ideas best expressed the reframed point of view, not which were easiest to build.',
  },
  prototype: {
    intro:
      'Rather than renovate anything, the team built the roughest possible version of the idea in one branch.',
    work: 'They cordoned off an underused area of the central branch with temporary furniture (beanbags, soft lighting, and a hand-lettered sign saying the space was the teens\' to shape). They convened a volunteer teen group and let them set the rules and rearrange the space. Total cost: almost nothing.',
    artifact: {
      type: 'finding',
      label: 'Prototype specification',
      lines: [
        'Temporary cordoned area in one branch, underused corner',
        'Beanbag chairs, soft lighting, moveable furniture',
        'Hand-lettered sign: "This space is yours to shape"',
        'Volunteer teen group invited to set rules and rearrange',
        'Total cost: near zero',
        'Question it answered: if we give teens a calm space that is genuinely theirs, will they come and make it their own?',
      ],
    },
    insight:
      'The prototype was a question made physical: does genuine ownership and calm change how teenagers experience the library? The cheapest possible version was also the most honest; it removed all assumptions about what "the right furniture" or "the right rules" should be and let real teenagers decide.',
  },
  test: {
    intro:
      'The team observed how teenagers used the pop-up space over two weeks, then talked with the teens who used it.',
    work: 'Watching what teens did rather than only asking what they thought. Daily visit counts tracked. Teens interviewed after using the space. The team watched and listened for the things nobody would think to say.',
    artifact: {
      type: 'finding',
      label: 'What testing revealed',
      lines: [
        'Daily teen visits rose sharply over two weeks, mostly by word of mouth',
        'Teens immediately rewrote the adult-drafted "quiet at all times" rule',
        'Teen-set replacement: "quiet corner / talking corner" split, an insight staff would never have designed',
        'Tension surfaced: teens wanted a totally adult-free space, which the library could not fully allow for safeguarding reasons',
        'Result: the test validated the core direction and sent the team back to Define the safeguarding sub-problem',
      ],
    },
    insight:
      'The test validated the core direction and reshaped the details. The teen-governed quiet/talking split was an insight no amount of internal planning would have produced. The safeguarding tension, surfaced early and cheaply, was flagged for its own focused design work. The Test stage looped the team back rather than confirming the plan, which is exactly what good testing does.',
  },
}

const LESSONS = [
  {
    n: '01',
    title: 'The Empathize stage overturned the core assumption, cheaply.',
    detail:
      'The board was ready to spend a large capital budget on technology. Five weeks of genuine empathy work revealed that technology was not the need at all. Skipping Empathize would have meant spending the budget on the wrong thing with confidence.',
  },
  {
    n: '02',
    title: 'The reframe in Define was the actual breakthrough.',
    detail:
      'Nothing clever in Ideate produced the solution; the solution became obvious once the problem was reframed from "teens want more features" to "teens need a place that is genuinely theirs." The leverage was in framing the right problem, not in generating ideas.',
  },
  {
    n: '03',
    title: 'The rough prototype taught what no plan could.',
    detail:
      'Real teenagers reshaping a near-free pop-up space surfaced the quiet/talking-corner insight staff would never have designed, and exposed the safeguarding tension early. The cheapest possible prototype produced the most useful learning.',
  },
]

function ArtifactBlock({ artifact }: { artifact: Artifact }) {
  if (artifact.type === 'quote') {
    return (
      <div
        className="rounded-xl p-space-6"
        style={{ background: `${TEAL}0.04)`, border: `1px solid ${TEAL}0.10)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-4" style={{ color: `${TEAL}0.65)` }}>
          {artifact.label}
        </p>
        <div className="space-y-space-3">
          {artifact.lines.map((line, i) =>
            i === artifact.lines.length - 1 ? (
              <p
                key={i}
                className="text-base text-neutral-800 leading-relaxed italic pl-space-4"
                style={{ borderLeft: `3px solid ${TEAL}0.40)` }}
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

  if (artifact.type === 'pov') {
    return (
      <blockquote
        className="rounded-xl p-space-6"
        style={{ background: `${TEAL}0.04)`, borderLeft: `4px solid ${TEAL}0.50)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${TEAL}0.70)` }}>
          {artifact.label}
        </p>
        {artifact.lines.map((line, i) => (
          <p key={i} className={`text-base text-neutral-800 leading-relaxed italic${i > 0 ? ' mt-space-3' : ''}`}>
            &ldquo;{line}&rdquo;
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
        style={{ background: `${TEAL}0.05)`, borderLeft: `3px solid ${TEAL}0.40)` }}
      >
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: `${TEAL}0.70)` }}>
          Pattern that emerged
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed italic">{stage.insight}</p>
      </div>
    </div>
  )
}

export default function DTCaseStudy() {
  const [activeStage, setActiveStage] = useState<StageKey>('empathize')
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
          Meridian Library System is an invented organisation and this engagement is illustrative. It
          is written to show, concretely, what the work and outputs of each Design Thinking stage
          look like in practice. The methods, artifacts, and decision logic are realistic;
          the organisation and its results are fictional.
        </p>
      </div>

      {/* Organisation context card */}
      <div
        className="rounded-2xl overflow-hidden mb-space-8"
        style={{ border: '1px solid var(--color-neutral-200)' }}
      >
        <div
          className="px-space-6 md:px-space-8 py-space-5 border-b flex flex-wrap gap-space-6"
          style={{ background: 'var(--color-warm-50)', borderColor: 'var(--color-neutral-100)' }}
        >
          {[
            ['Organisation', 'Meridian Library System (fictional)'],
            ['Scale', '12 branches, 600,000 people served'],
            ['Duration', '14 weeks'],
            ['Team', '6 people, cross-functional'],
            ['Framework', 'Stanford d.school 5-stage'],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-500 mb-space-1">{label}</p>
              <p className="text-sm font-semibold text-neutral-900">{val}</p>
            </div>
          ))}
        </div>
        <div className="px-space-6 md:px-space-8 py-space-7">
          <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${TEAL}0.65)` }}>
            The problem
          </p>
          <p
            className="font-display font-semibold text-balance"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)', lineHeight: 1.2, color: 'var(--color-neutral-900)', letterSpacing: '-0.01em' }}
          >
            Library use by teenagers has fallen by 40% in five years. Before spending a capital
            budget on an assumption, understand the teenagers first.
          </p>
          <p className="text-sm text-neutral-500 mt-space-3">
            Board assumption: teenagers want more technology. What do teenagers actually need?
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
            className="flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-colors duration-200 flex-1 min-w-[100px]"
            style={{
              background: activeStage === key ? `${TEAL}0.08)` : '#FFFFFF',
              border: `1px solid ${activeStage === key ? `${TEAL}0.25)` : 'var(--color-neutral-200)'}`,
            }}
          >
            <span
              className="font-mono text-2xs uppercase tracking-widest mb-space-1"
              style={{ color: activeStage === key ? `${TEAL}0.65)` : 'var(--color-neutral-500)' }}
            >
              {mode}
            </span>
            <span
              className="font-semibold text-sm"
              style={{ color: activeStage === key ? `${TEAL}0.90)` : 'var(--color-neutral-700)' }}
            >
              {label}
            </span>
            <span
              className="text-xs"
              style={{ color: activeStage === key ? `${TEAL}0.55)` : 'var(--color-neutral-500)' }}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
        {LESSONS.map(({ n, title, detail }) => (
          <div
            key={n}
            className="rounded-xl p-space-6"
            style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}
          >
            <span
              className="font-mono text-3xl font-semibold block mb-space-4"
              style={{ color: `${TEAL}0.12)`, lineHeight: 1 }}
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

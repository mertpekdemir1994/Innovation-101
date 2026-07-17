'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(185,28,28,'

type MovementKey = 'embed' | 'build' | 'extract' | 'migrate'

const MOVEMENT_DEFS: { key: MovementKey; label: string; sub: string; verb: string }[] = [
  { key: 'embed',   label: 'Embed',              sub: 'Movement 01', verb: 'Presence' },
  { key: 'build',   label: 'Build in Context',   sub: 'Movement 02', verb: 'R&D'      },
  { key: 'extract', label: 'Extract',            sub: 'Movement 03', verb: 'Pattern'  },
  { key: 'migrate', label: 'Migrate to Core',    sub: 'Movement 04', verb: 'Platform' },
]

type ArtifactType = 'quote' | 'finding' | 'decision'
type Artifact = { type: ArtifactType; label: string; lines: string[] }
type MovementData = { intro: string; work: string; artifact: Artifact; insight: string }

const MOVEMENTS: Record<MovementKey, MovementData> = {
  embed: {
    intro:
      'Palantir was founded in 2003 to help intelligence agencies analyze complex data. No two agencies had the same data infrastructure, workflows, or definition of "analysis." Building a one-size-fits-all product was impossible. The only way to solve their problems was to be present in their context.',
    work: 'FDE teams were assigned to individual government agencies and financial institutions for periods of a year or more. The goal was not account management but genuine institutional knowledge — understanding actual workflows, organizational politics, informal decision-making processes, and problems that never made it into any formal requirements document.',
    artifact: {
      type: 'finding',
      label: 'What embeddedness produced — insights no requirements document contained',
      lines: [
        'Intelligence analysts had developed extensive informal workarounds to compensate for inadequate tooling — workarounds invisible to anyone not present in the environment',
        'The most consequential problems were not the ones analysts articulated in requirements sessions; they were the ones they had stopped trying to solve because they assumed no software could address them',
        'Data from different agencies was not merely in different formats; it reflected fundamentally different ontologies — how entities and relationships were conceptualized varied by agency and by team',
        'FDE teams embedded for 12+ months developed institutional knowledge that external consultants or remote product teams could not have accumulated in any amount of time',
      ],
    },
    insight:
      'The FDE culture at Palantir was not a deliberate strategy at the outset; it emerged as a response to reality. If every customer\'s context was genuinely different, embeddedness was not a nice-to-have relationship-building activity — it was the only viable research methodology.',
  },
  build: {
    intro:
      'FDE teams built custom solutions directly in the customer\'s environment — custom code, custom configurations, custom integrations — to solve specific, immediate problems. The organizational framing was critical: these deployments were R&D, not delivery. The cost was justified by the learning it produced, not the margin on that specific customer.',
    work: 'In 2008, a Palantir FDE team embedded with a financial services client began building tools for detecting fraud patterns in transaction data. The approach they developed — a visual graph analysis tool that made relationships between entities visible and navigable — was not in any product roadmap. It was built because the analysts needed it and the field team had the autonomy to build it.',
    artifact: {
      type: 'finding',
      label: 'Two field innovations that became core platform capabilities',
      lines: [
        'Graph analysis: a visual tool making relationships between entities navigable, built for fraud pattern detection at a financial services client (2008) — no product roadmap, pure field response to analyst need',
        'Data transformation: a layer allowing analysts to reshape data from multiple incompatible sources into a consistent format, built for a different financial client who needed it to make the engagement work',
        'Neither was in any central roadmap. Both were built because the field team had the autonomy to build what the customer needed.',
        'Cost framing: the expense of field builds was justified as R&D, not evaluated against the margin of the individual customer deployment',
      ],
    },
    insight:
      'McCardel describes Palantir\'s product strategy at this stage as "strong opinions, weakly held — building things in the field and seeing what stuck." The chaos and the waste were not a bug in the process. They were the cost of a product discovery method that let the hardest real problems in the customer\'s world, rather than a planning committee, decide what got built.',
  },
  extract: {
    intro:
      'Not all field innovations had cross-customer applicability. Many were specific to a single customer\'s context — the particular shape of their data infrastructure, the constraints of their regulatory environment. The extraction judgment was the process of identifying which field innovations had broader applicability and were therefore candidates for productization.',
    work: 'Palantir\'s platform team maintained visibility across all active deployments to notice when similar types of solutions were being built independently by different FDE teams. The strongest signal for extraction was independent replication: if multiple FDE teams working in different industries had each built a version of the same solution, the pattern was real.',
    artifact: {
      type: 'decision',
      label: 'The extraction judgment — cross-context evidence, not single-customer enthusiasm',
      lines: [
        'Graph analysis (built for financial fraud detection) turned out to solve a structurally identical problem in intelligence — making relationships between entities visible — despite completely different domains.',
        'Data transformation (built to make incompatible financial data work together) turned out to address a universal problem: almost every enterprise has critical data in incompatible formats from legacy systems.',
        'The extraction criterion was not one enthusiastic customer advocating for productization. It was the same pattern emerging independently in multiple deployment contexts, often across different industries.',
        'Palantir\'s Gotham (government/intelligence) and Foundry (commercial enterprise) evolved largely through this cross-pollination — innovations built for intelligence that turned out to solve structurally identical problems in pharmaceutical research and financial risk.',
      ],
    },
    insight:
      'The most valuable extraction judgments at Palantir were cross-industry recognitions: a solution built for government intelligence that also solved the core structural problem in pharmaceutical research or financial risk management. These recognitions were only possible because FDE teams had embedded deeply enough to understand the structural problem rather than just the surface-level request.',
  },
  migrate: {
    intro:
      'Field-built innovations that passed the extraction judgment were taken over by the platform engineering team, generalized to work across customer contexts, and absorbed into the core product. The FDE team that built the field version transitioned to the next frontier problem. Over time, this cycle produced a platform shaped by the actual hardest problems in the customer\'s world.',
    work: 'Graph analysis and data transformation capabilities — built in the field in 2008 — were extracted, generalized, and became foundational capabilities of what would eventually become Palantir Foundry. The productization process required the platform team to generalize without losing the essential property that made each innovation work in the field.',
    artifact: {
      type: 'finding',
      label: 'The Foundry origin — field innovations become core platform',
      lines: [
        'Graph analysis → Foundry\'s knowledge graph capabilities, used across dozens of Fortune 500 companies in manufacturing, finance, and healthcare',
        'Data transformation → Foundry\'s pipeline infrastructure, designed to handle the reality that enterprise data is almost always in incompatible formats from multiple legacy systems',
        'Data integration patterns (built for government intelligence agencies with incompatible data formats) → Foundry\'s ontology layer, now a core commercial differentiator',
        'None of these capabilities came from a central product roadmap. Every one was a field innovation that proved its value across multiple customer contexts before the platform team productized it.',
      ],
    },
    insight:
      'Foundry is not a product that was conceived and then built. It is the accumulated product of years of field discovery — the Embed-Build-Extract-Migrate cycle run continuously across dozens of customer deployments. The resulting platform has depth and specificity of capability that competitors building from central roadmaps struggle to match, because it was shaped by the actual hardest problems in the customer\'s world rather than by a planning committee\'s best guess.',
  },
}

const LESSONS = [
  {
    n: '01',
    title: 'Product-market fit can be discovered bottoms-up.',
    detail:
      'The conventional model assumes a visionary product team defines the product and then finds customers for it. Palantir\'s experience suggests an alternative: let customers define the product through their real problems, then extract and generalize what works. Foundry was not conceived and then built. It was built in the field and then extracted.',
  },
  {
    n: '02',
    title: 'The waste is the point.',
    detail:
      'Palantir burned significant capital on failed field deployments. Those failures were not inefficiency — they were the research cost of building a platform shaped by real problems. Organizations that optimize for zero waste in innovation also optimize for never building anything genuinely new.',
  },
  {
    n: '03',
    title: 'McCardel\'s conditions are not aspirational — they are structural prerequisites.',
    detail:
      'The model worked at Palantir because premium enterprise pricing, genuinely complex problems, and real field autonomy were all simultaneously true. Remove any one and the model fails. This is not a model that can be partially adopted.',
  },
]

function ArtifactBlock({ artifact }: { artifact: Artifact }) {
  if (artifact.type === 'quote') {
    return (
      <div className="rounded-xl p-space-6" style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.10)` }}>
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-4" style={{ color: `${BRICK}0.65)` }}>{artifact.label}</p>
        <div className="space-y-space-3">
          {artifact.lines.map((line, i) =>
            i === artifact.lines.length - 1 ? (
              <p key={i} className="text-base text-neutral-800 leading-relaxed italic pl-space-4" style={{ borderLeft: `3px solid ${BRICK}0.40)` }}>{line}</p>
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
      <blockquote className="rounded-xl p-space-6" style={{ background: `${BRICK}0.04)`, borderLeft: `4px solid ${BRICK}0.50)` }}>
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${BRICK}0.70)` }}>{artifact.label}</p>
        {artifact.lines.map((line, i) => (
          <p key={i} className={`text-base text-neutral-800 leading-relaxed${i > 0 ? ' mt-space-3' : ''}`}>{line}</p>
        ))}
      </blockquote>
    )
  }
  return (
    <div className="rounded-xl p-space-6" style={{ background: 'var(--color-warm-50)', border: '1px solid var(--color-neutral-200)' }}>
      <p className="font-mono text-2xs uppercase tracking-widest mb-space-4 text-neutral-400">{artifact.label}</p>
      <div className="space-y-space-2">
        {artifact.lines.map((line, i) => (
          <p key={i} className="text-sm text-neutral-700 leading-relaxed">{line}</p>
        ))}
      </div>
    </div>
  )
}

function MovementContent({ movementKey }: { movementKey: MovementKey }) {
  const mv = MOVEMENTS[movementKey]
  return (
    <div>
      <p className="text-sm text-neutral-600 leading-relaxed mb-space-5">{mv.intro}</p>
      <div className="mb-space-5">
        <p className="text-2xs font-semibold uppercase tracking-widest text-neutral-400 mb-space-2">The work</p>
        <p className="text-sm text-neutral-700 leading-relaxed">{mv.work}</p>
      </div>
      <div className="mb-space-5">
        <p className="text-2xs font-semibold uppercase tracking-widest text-neutral-400 mb-space-2">Sample output</p>
        <ArtifactBlock artifact={mv.artifact} />
      </div>
      <div className="rounded-lg px-space-5 py-space-4" style={{ background: `${BRICK}0.05)`, borderLeft: `3px solid ${BRICK}0.40)` }}>
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: `${BRICK}0.70)` }}>What it meant</p>
        <p className="text-sm text-neutral-700 leading-relaxed italic">{mv.insight}</p>
      </div>
    </div>
  )
}

export default function FDECaseStudy() {
  const [activeMovement, setActiveMovement] = useState<MovementKey>('embed')
  const prefersReduced = useReducedMotion()

  return (
    <div className="mt-space-8">
      {/* Real case callout */}
      <div
        className="rounded-xl px-space-6 py-space-4 mb-space-8 flex gap-space-4 items-start"
        style={{ background: `${BRICK}0.05)`, border: `1px solid ${BRICK}0.15)` }}
      >
        <span
          className="font-mono text-2xs uppercase tracking-widest px-space-2 py-space-1 rounded shrink-0 mt-0.5"
          style={{ background: `${BRICK}0.12)`, color: `${BRICK}0.80)` }}
        >
          Real case
        </span>
        <p className="text-sm text-neutral-700 leading-relaxed">
          Unlike the other frameworks in this library, FDE&rsquo;s case study is the real Palantir Foundry
          story, drawn on public, candid accounts from former practitioners including Barry McCardel.
          It is presented as real and sourced — not invented. No &ldquo;mock scenario&rdquo; disclaimer applies here.
        </p>
      </div>

      {/* Company context card */}
      <div className="rounded-2xl overflow-hidden mb-space-8" style={{ border: '1px solid var(--color-neutral-200)' }}>
        <div
          className="px-space-6 md:px-space-8 py-space-5 border-b flex flex-wrap gap-space-6"
          style={{ background: 'var(--color-warm-50)', borderColor: 'var(--color-neutral-100)' }}
        >
          {[
            ['Company', 'Palantir Technologies (real)'],
            ['Founded', '2003'],
            ['Model', 'Full FDE, Palantir original'],
            ['Output', 'Palantir Foundry'],
            ['Sources', 'McCardel, Qureshi (public)'],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-1">{label}</p>
              <p className="text-sm font-semibold text-neutral-900">{val}</p>
            </div>
          ))}
        </div>
        <div className="px-space-6 md:px-space-8 py-space-7">
          <p className="font-mono text-2xs uppercase tracking-widest mb-space-3" style={{ color: `${BRICK}0.65)` }}>
            The situation
          </p>
          <p
            className="font-display font-semibold text-balance"
            style={{ fontSize: 'clamp(1.25rem, 3vw, 1.875rem)', lineHeight: 1.2, color: 'var(--color-neutral-900)', letterSpacing: '-0.01em' }}
          >
            No two intelligence agencies had the same data infrastructure, workflows, or definition of
            &ldquo;analysis.&rdquo; Building a one-size-fits-all product was structurally impossible.
          </p>
          <p className="text-sm text-neutral-500 mt-space-3">
            The FDE culture was not a deliberate strategic choice at the outset. It emerged as a response to reality.
          </p>
        </div>
      </div>

      {/* Movement navigator */}
      <div className="flex flex-wrap gap-space-2 mb-space-6">
        {MOVEMENT_DEFS.map(({ key, label, sub, verb }) => (
          <button
            key={key}
            type="button"
            onClick={() => setActiveMovement(key)}
            className="flex flex-col items-start rounded-lg px-space-4 py-space-3 transition-colors duration-200 flex-1 min-w-[90px]"
            style={{
              background: activeMovement === key ? `${BRICK}0.08)` : '#FFFFFF',
              border: `1px solid ${activeMovement === key ? `${BRICK}0.25)` : 'var(--color-neutral-200)'}`,
            }}
          >
            <span className="font-mono text-2xs uppercase tracking-widest mb-space-1" style={{ color: activeMovement === key ? `${BRICK}0.65)` : 'var(--color-neutral-400)' }}>
              {verb}
            </span>
            <span className="font-semibold text-sm leading-snug" style={{ color: activeMovement === key ? `${BRICK}0.90)` : 'var(--color-neutral-700)' }}>
              {label}
            </span>
            <span className="text-xs" style={{ color: activeMovement === key ? `${BRICK}0.55)` : 'var(--color-neutral-400)' }}>
              {sub}
            </span>
          </button>
        ))}
      </div>

      {/* Movement content panel */}
      <div className="rounded-2xl p-space-6 md:p-space-8 mb-space-10" style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMovement}
            initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <MovementContent movementKey={activeMovement} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Key lessons */}
      <p className="font-mono text-2xs uppercase tracking-widest text-neutral-400 mb-space-4">Key lessons</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-4">
        {LESSONS.map(({ n, title, detail }) => (
          <div key={n} className="rounded-xl p-space-6" style={{ background: '#FFFFFF', border: '1px solid var(--color-neutral-200)' }}>
            <span className="font-mono text-3xl font-semibold block mb-space-4" style={{ color: `${BRICK}0.12)`, lineHeight: 1 }}>{n}</span>
            <p className="font-semibold text-sm text-neutral-900 mb-space-2 leading-snug">{title}</p>
            <p className="text-xs text-neutral-500 leading-relaxed">{detail}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

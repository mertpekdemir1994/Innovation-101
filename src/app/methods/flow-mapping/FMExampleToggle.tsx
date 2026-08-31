'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL   = 'rgba(42,111,122,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'An insurance company\'s claims process has grown complicated over fifteen years. Customers complain it is confusing, staff have their own ways of getting things done, and nobody in the organization can describe end to end how a claim actually moves through the system. Before redesigning it, the team maps the current-state flow.'

export default function FMExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.85)` : `${TEAL}0.85)`
                : 'transparent',
              color: tab === t ? '#fff' : t === 'ai' ? `${INDIGO}0.70)` : `${TEAL}0.70)`,
              border: `1.5px solid ${tab === t
                ? (t === 'ai' ? `${INDIGO}0.70)` : `${TEAL}0.70)`)
                : (t === 'ai' ? `${INDIGO}0.30)` : `${TEAL}0.30)`)}`,
            }}
          >
            {t === 'traditional' ? 'Traditional Approach' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Shared scenario */}
      <div className="rounded-lg px-4 py-3 mb-6"
        style={{ background: `${TEAL}0.06)`, border: `1px solid ${TEAL}0.18)` }}
      >
        <p className="font-mono uppercase tracking-widest mb-1"
          style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.60)` }}>Shared scenario</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          {SCENARIO}
        </p>
        <p className="mt-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
          Both versions map the same process. Only the method differs.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="space-y-4"
          >
            {/* Step 1: Bounding the flow */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${TEAL}0.20)`, background: `${TEAL}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}>
                First: bound the flow and commit to tracing all of it
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team defined the boundaries (from claim submitted to claim resolved) and made the
                critical commitment: trace EVERY path, not just the one in the process documentation.
                The documented flow had a handful of steps and two decision points. What they found when
                they followed real claims through the real system was something else entirely.
              </p>
            </div>

            {/* Finding 1: Undocumented branches */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${TEAL}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.60)` }}>
                Found: multiple undocumented branches
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                By sitting with claims handlers and watching them work, the team found branches added for
                edge cases years earlier and never removed. Each had been a reasonable response to a
                specific situation. Together, they had turned a simple process into a tangle with far more
                paths than anyone knew existed. None appeared in any documentation because they had grown
                informally, step by step, each accreting quietly onto the existing structure.
              </p>
            </div>

            {/* Finding 2: Workaround */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${TEAL}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.60)` }}>
                Found: a workaround in daily use that bypassed an official step
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Handlers had invented a workaround years earlier because one official step did not work
                reliably for a certain claim type. The workaround spread by word of mouth and was now used
                constantly, by handlers who did not even know there was an official step for that case,
                only that &ldquo;this is how you do it.&rdquo; It appeared on no documentation anywhere, because a
                workaround that bypasses an official process is, almost by definition, not in the official
                process document.
              </p>
            </div>

            {/* Finding 3: Loop */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${TEAL}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.60)` }}>
                Found: a loop, certain claims circling between two teams
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Certain claim types circled between two teams indefinitely, each team believing ownership
                lay with the other. Claims in the loop were not rejected and not resolved; they were
                pending, bouncing, consuming handling time from both teams, and generating a category of
                customer complaints nobody had been able to trace to a specific cause. The loop was the
                cause. It was not in any documentation; it had emerged from an ambiguity in the handover
                rules.
              </p>
            </div>

            {/* Finding 4: Dead end */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${TEAL}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.60)` }}>
                Found: a dead end, a claim type that could enter and stall
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                One claim type could enter a branch from which there was no forward route: no next step,
                no owner, no way to make progress. Claims that entered it stalled. This explained a
                category of customer complaints about claims that had stopped moving, complaints
                that support staff could not resolve because they did not know the branch existed, only that
                the claim appeared to be &ldquo;stuck.&rdquo; The dead end was invisible until traced.
              </p>
            </div>

            {/* What the shape revealed */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${TEAL}0.28)`, background: `${TEAL}0.06)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}>
                The shape itself was the finding
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                Drawn out whole, the map was startling: what the organization believed was a clean
                five-step process was in fact a tangle with multiple paths, branches, a loop, a dead end,
                and a widely-used workaround. The team could count the sprawl, point at the specific dead
                end causing the stalled-claim complaints, name the loop, and show the redundant routes.
                None of that could be argued with, because it was what was there.
              </p>
              <p className="font-semibold" style={{ fontSize: 'var(--text-sm)', color: `${TEAL}0.80)` }}>
                Crucially, they resisted fixing it while mapping. The diagnosis came first, honestly and
                completely. The redesign was separate work, and far better informed for having an accurate
                picture of what actually existed, workarounds and all.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="space-y-4"
          >
            {/* Hypothetical framing */}
            <div className="rounded-lg px-4 py-3"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The traditional approach above was run by a team who watched claims handlers work. This tab
                imagines the same team had asked an AI to map the claims flow from the process documentation
                instead: to show where that genuinely helps, and what it structurally cannot see.
              </p>
            </div>

            {/* Genuine uplift */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>Where AI genuinely helped</p>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Real drafting uplift
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The AI turned fifteen years of process documentation into a clean, structured flow diagram
                in seconds. The documented flow (the handful of steps and two decision points the
                organization believed it had) was rendered professionally and legibly, with branches,
                labels, and structure. Getting a first-pass diagram out of a pile of documentation is
                genuinely tedious work, and AI did it fast. As a drafting aid and a starting scaffold for
                the mapping session, this was real value.
              </p>
            </div>

            {/* The structural limit */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.80)' }}>
                What the diagram could not show, and the danger of that
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                The diagram the AI produced was the DOCUMENTED flow. It did not show the workaround handlers
                used constantly, because the workaround bypasses an official step and is therefore not in
                the official documentation. It did not show the loop between teams, because the handover
                ambiguity was never written down; it was the kind of thing everyone knew but nobody had
                formalised. It did not show the dead end, because nobody had documented the branch that
                led to it, only the starting conditions that sent claims there.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                None of it could appear, because none of it was written down anywhere. That is not an
                AI limitation specific to this tool or this version; it is structural. The undocumented
                reality is not in the documentation, and it is not in the training data either.
              </p>
              <div className="rounded p-3"
                style={{ background: 'rgba(245,158,11,0.06)', borderLeft: '2px solid rgba(245,158,11,0.35)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  And the diagram&rsquo;s danger was precisely that it looked complete. Tidy, professional, and
                  plausible, it handed the organization its own story back, with the accreted mess,
                  the entire object of the exercise, invisible. A team that trusted it would have redesigned
                  a process that does not exist, leaving every real pathology exactly where it was.
                </p>
              </div>
            </div>

            {/* The honest readout */}
            <div className="rounded-lg p-5"
              style={{ background: `${TEAL}0.04)`, border: `1px solid ${TEAL}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.65)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The strongest version uses AI to draft the official flow fast and then treats that draft as
                a hypothesis to be broken: go watch real claims handlers work, find the workarounds, add
                the branches AI could never have known about. The gap between the AI&rsquo;s diagram and the real
                flow is, literally, the finding. The fifteen years of accreted complexity that explains
                the complaints and the stalled claims and the team ambiguities, that lives entirely in the
                gap between the tidy diagram and what people actually do.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

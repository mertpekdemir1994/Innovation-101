'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL   = 'rgba(42,111,122,'
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'An engineering organization has a quality problem that will not go away. Defects escape to customers; the team responds by adding review steps and pushing harder on testing. Quality improves for a quarter, then slides back. This has now happened three times over two years, with three different, competent leaders. Nobody can explain it. They map the system. Both versions map the same organization; only the method differs.'

export default function SMExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div className="w-full">
      <div className="flex gap-2 mb-6 flex-wrap">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.85)` : `${TEAL}0.85)`
                : 'transparent',
              color: tab === t ? '#fff'
                : t === 'ai' ? `${INDIGO}0.70)` : `${TEAL}0.70)`,
              border: `1.5px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.70)` : `${TEAL}0.70)`
                : t === 'ai' ? `${INDIGO}0.30)` : `${TEAL}0.30)`}`,
            }}>
            {t === 'traditional' ? 'Traditional approach' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      <div className="rounded-lg px-4 py-3 mb-6"
        style={{ background: `${TEAL}0.05)`, border: `1px solid ${TEAL}0.16)` }}>
        <p className="font-mono uppercase tracking-widest mb-1"
          style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.55)` }}>Shared scenario</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          {SCENARIO}
        </p>
        <p className="mt-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
          Both tabs map the same organization. Only the method differs.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="space-y-4">

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${TEAL}0.20)`, background: `${TEAL}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.65)` }}>
                Start from the recurring behavior, not the latest incident
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team started from the pattern — quality improves, then slides back, three times — and
                built the map with the engineers inside the system, which is where the argument, and the
                answer, came from. Variables: defect rate, delivery pressure, time spent testing, technical
                debt. The causal arrows were where the disagreement lived, and the disagreement was the work.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${TEAL}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.55)` }}>
                The obvious loop everyone already knew
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The first loop was the obvious one — a BALANCING loop: defects rise, the organization
                adds review and testing, defects fall. Everyone already knew this loop. It is why every
                intervention worked, briefly. It is the organization&rsquo;s entire theory of itself on the
                quality problem.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${TEAL}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.55)` }}>
                The loop nobody had articulated
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The second was a REINFORCING loop, and it explained everything. Delivery pressure caused
                engineers to take shortcuts, which increased technical debt, which made the codebase
                harder to change safely, which slowed delivery, which increased delivery pressure further.
                Round and round, accelerating. And it operated with a long DELAY: the shortcuts taken
                this quarter produced defects two or three quarters later. By then nobody connected them,
                and the organization confidently attributed the defects to insufficient testing — the thing
                it could see — while the actual cause went unexamined.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${TEAL}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.55)` }}>
                Feeding the problem by fighting it
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                So each new leader had pushed on the symptom — more testing, more review — and the
                balancing loop had duly restored quality for a quarter, while the reinforcing loop
                underneath kept accelerating. The harder they pushed on testing, the more delivery time
                it consumed, the more pressure built, the more shortcuts were taken. They were feeding
                the problem by fighting it. Policy resistance, exactly as described.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${TEAL}0.28)`, background: `${TEAL}0.05)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}>
                The leverage point nobody had tried
              </p>
              <p className="font-semibold"
                style={{ fontSize: 'var(--text-sm)', color: `${TEAL}0.85)` }}>
                The leverage point was nowhere near the pain. It was not in testing at all. It was in how
                work was committed to — reducing the pressure that generated the shortcuts. Unglamorous,
                politically awkward, and it looked, to anyone watching, like doing nothing about quality.
                Which is precisely why nobody had tried it for two years.
              </p>
            </div>
          </motion.div>

        ) : (
          <motion.div key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease }}
            className="space-y-4">

            <div className="rounded-lg px-4 py-3"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The traditional approach above is what the team actually did. This tab imagines the same
                team had leaned on AI to build the causal model — to show where it genuinely helps and
                what it structurally cannot do.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.04)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.80)` }}>
                  The good — and it is real
                </p>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.12)`, color: `${INDIGO}0.75)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Blank-page problem
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI proposed variables, suggested causal relationships, closed loops properly, and produced
                a clean readable causal loop diagram in minutes. It also asked good questions — what else
                might drive defect rate? — and proposed a loop the team had not considered. As a way to
                get past the blank page and widen the hypotheses under consideration, it was genuinely
                valuable, and the team should have used it for this.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${AMBER}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                But it rendered the failed theory
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The model it produced, drawing on the situation as described to it, rendered the
                organization&rsquo;s existing theory: defects rise → testing rises → defects fall. That
                balancing loop was the story the organization had been telling itself for two years,
                and it was the story that had produced three failed interventions. The AI drew it
                beautifully, and in doing so lent it the authority of a professional diagram.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${AMBER}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                The loop that mattered was not in the description
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The reinforcing loop — delivery pressure driving shortcuts driving technical debt driving
                more pressure — was not in the description, because nobody in the organization had
                articulated it. It was undocumented. And it was politically uncomfortable: it implicated
                how leadership committed to work rather than how engineers tested. It surfaced only when
                engineers inside the system were asked what actually happened, and argued about it, in a
                room.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${AMBER}0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.75)` }}>
                The real danger: a fourth failed intervention with more authority
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Had the team accepted the AI&rsquo;s elegant map, they would have had a confident, coherent,
                professional-looking model pointing exactly where they were already pointing — at testing.
                It would have justified a fourth round of the same failed intervention, with more
                institutional authority than the previous three. A confident diagram of the wrong loops
                is not merely unhelpful. It is worse than no diagram.
              </p>
            </div>

            <div className="rounded-lg p-5"
              style={{ background: `${TEAL}0.04)`, border: `1px solid ${TEAL}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.62)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Use AI to draft the model and widen the hypotheses — that is real value, and it solves
                the blank-page problem. But what it draws is your own theory, tidied. The loops that
                explain a problem you have failed to solve are, by definition, the ones you have not
                articulated, and those live with the people inside the system — not in the documentation.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

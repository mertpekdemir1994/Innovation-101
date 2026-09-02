'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'
// darker indigo for text on this light background — plain INDIGO can't
// reach 4.5:1 on white even at full opacity
const INDIGO_DARK = 'rgba(79,70,229,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A software company\'s product has been live for two years. Support tickets arrive by the thousand, reviews accumulate, analytics dashboards proliferate, and yet the product does not seem to get better. Everyone feels they are listening; nothing changes. The team sets out to fix the loop. Both versions face the same problem; only the approach differs.'

export default function PFLExampleToggle() {
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
                ? t === 'ai' ? `${INDIGO}0.85)` : `${BRICK}0.85)`
                : 'transparent',
              color: tab === t ? '#fff'
                : t === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`,
              border: `1.5px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.70)` : `${BRICK}0.70)`
                : t === 'ai' ? `${INDIGO}0.30)` : `${BRICK}0.30)`}`,
            }}
          >
            {t === 'traditional' ? 'Traditional Approach' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Shared scenario */}
      <div className="rounded-lg px-4 py-3 mb-6"
        style={{ background: `${BRICK}0.06)`, border: `1px solid ${BRICK}0.18)` }}>
        <p className="font-mono uppercase tracking-widest mb-1"
          style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>Shared scenario</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          {SCENARIO}
        </p>
        <p className="mt-2" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
          Both versions face the same broken loop. Only the method differs.
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
            {/* Resist the reflex */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.20)`, background: `${BRICK}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                Resist the reflex: do not add more signal
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team&rsquo;s first instinct was the usual one: add more signal. Another survey, a new dashboard,
                better analytics. They resisted it, and instead asked a different question: where, exactly,
                does our loop actually break? Not &ldquo;how do we get more data?&rdquo; but &ldquo;which junction is the
                weak one?&rdquo;
              </p>
            </div>

            {/* Diagnosing the break */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                The diagnosis: SENSE but no DECISION
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Signal was abundant: thousands of tickets, plenty of behavioural data. Sense-making happened:
                a researcher produced a quarterly insight deck, and it was good. The deck was presented,
                everyone agreed, and then nothing happened. That was the break: SENSE but no DECISION.
                There was no forum with the authority to turn insight into a roadmap change, so every quarter
                produced agreement and no action. The organisation felt like it was listening. The product never
                improved. The loop was breaking at the second junction, not the first, and adding more
                instruments to the first junction would have changed nothing.
              </p>
            </div>

            {/* Fixing the right junction */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                Fix that junction, and close the rest of the loop
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                They fixed that junction specifically. A real decision forum, on a rhythm, with the authority
                to change the roadmap and a rule that each cycle&rsquo;s findings must produce an explicit outcome:
                fix, defer, or accept. Then they closed the rest of the circle. Decisions became shipped changes,
                and, crucially, each shipped change was measured afterwards to find out whether it actually worked.
                They did not add a single new instrument. They repaired the junction that was broken.
              </p>
            </div>

            {/* The first full turn */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                What the first full turn of the closed loop produced
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The first complete loop was revealing. A ticket theme became a decision. The decision became a
                shipped change. The measurement showed the change helped less than expected, which itself
                became new signal and fed a better second attempt. That is the loop working: not more data,
                but a circle that completes. The second attempt worked. And along the way, the researcher&rsquo;s
                habit of reading a handful of raw tickets herself, not just the aggregate, surfaced one
                strange, articulate complaint that turned out to describe a genuine defect affecting a small
                but important segment. In the aggregate, it was noise. Read directly, it was a finding.
              </p>
            </div>

            {/* What the fix was for */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.28)`, background: `${BRICK}0.06)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                What this taught
              </p>
              <p className="font-semibold"
                style={{ fontSize: 'var(--text-sm)', color: `${BRICK}0.90)` }}>
                The reflex, &ldquo;we need more data&rdquo;, is almost always wrong. The correct diagnostic question
                is: which junction in our specific loop is weakest? Fix that junction, then close the rest
                of the circle. More signal will not repair a loop that breaks at decision.
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
                <span className="font-semibold" style={{ color: `${INDIGO_DARK}0.90)` }}>Hypothetical:</span>{' '}
                The traditional approach above was what the team actually did. This tab imagines the same
                team had brought AI into the loop, to show where AI genuinely helps and what it
                structurally cannot do.
              </p>
            </div>

            {/* Genuine uplift at SENSE */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO_DARK}0.90)` }}>
                  Where AI genuinely helped, and the help was large
                </p>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.12)`, color: `${INDIGO_DARK}0.90)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Real uplift
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                At the SENSE stage, AI was transformative. It read and synthesised thousands of support tickets
                and reviews across channels, clustered them into coherent themes, and surfaced cross-cutting
                patterns in minutes, work that had previously been done quarterly, partially, by one
                overloaded researcher. This is genuinely the biggest practical win AI offers across these
                methods: the signal-to-sense junction had historically broken because the volume made the work
                impossible, and AI made it possible. The team should absolutely use it, continuously rather
                than quarterly.
              </p>
            </div>

            {/* The unchanged break point */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(180,83,9,1)' }}>
                What it did not change: the actual break point
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                Faster, better synthesis arriving every week produced more insight, more often, into an
                organisation that still had no forum with the authority to act on it. The result was not a
                closed loop; it was a faster conveyor belt into the same dead end. AI had dramatically improved
                the junction that was not the team&rsquo;s actual problem. The loop still broke at SENSE but no
                DECISION, and that break remained exactly as it was before.
              </p>
              <div className="rounded p-3"
                style={{ background: 'rgba(245,158,11,0.06)', borderLeft: '2px solid rgba(245,158,11,0.35)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  Diagnosing the real break point remained the essential move, and AI does not do that for you.
                  The question &ldquo;where, exactly, does our specific loop break?&rdquo; requires someone to look at the
                  organisation honestly, not at the data. That is a human judgment about an organisational
                  failure, not a synthesis problem.
                </p>
              </div>
            </div>

            {/* The outlier averaged away */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(180,83,9,1)' }}>
                The outlier averaged away: the specific complaint that mattered
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The strange, articulate complaint that described a genuine defect affecting a small but
                important segment (the one the researcher found by reading raw tickets herself) was clustered
                by the AI into a theme and averaged into noise. The synthesis reported accurately what most
                people said. It could not tell the team that one person had said the thing that mattered most.
                Post-launch signal is full of such needles, and synthesis at scale optimises for the haystack&rsquo;s
                shape, not the needles inside it. Humans must still read raw signal themselves.
              </p>
            </div>

            {/* The honest readout */}
            <div className="rounded-lg p-5"
              style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Use AI at sense; it genuinely repairs the junction volume used to break, and it is the
                largest practical improvement in this toolkit. But run it alongside the diagnostic question,
                not instead of it. Read the outliers yourself. And remember that the loop closes at DECIDE
                and SHIP, which are exactly as human, and exactly as fragile, as they were before AI arrived.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

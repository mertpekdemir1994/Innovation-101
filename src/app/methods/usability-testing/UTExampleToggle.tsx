'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK  = 'rgba(138,75,60,'
const INDIGO = 'rgba(99,102,241,'
// Darker/higher-opacity variants for text on this light background: plain
// INDIGO and AMBER fail 4.5:1 on white even at full opacity, and BRICK
// needs a much higher floor than it uses elsewhere as text.
const INDIGO_DARK = 'rgba(79,70,229,'
const AMBER_DARK  = 'rgba(180,83,9,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A team has built a subscription management screen. Internally, everyone agrees it is clear and simple. But support tickets keep arriving from customers who cannot work out how to cancel, and some are churning in frustration rather than downgrading. The team needs to know why. Both versions investigate the same screen, only the method differs.'

export default function UTExampleToggle() {
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
                : t === 'ai' ? `${INDIGO_DARK}0.90)` : `${BRICK}0.90)`,
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
          Both versions investigate the same screen. Only the method differs.
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
            {/* Setup */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.20)`, background: `${BRICK}0.04)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                Five participants, one goal, one instruction to the facilitator: say nothing
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The team recruited five participants who resembled real customers and had never seen the product.
                Each was given a goal, not a route: &ldquo;You want to cancel your subscription. Do that.&rdquo; Then the
                facilitator said nothing. No hints, no clarifications, no rescues. The instinct to help is
                overwhelming, and the team had briefed hard against it, because every intervention replaces
                the data with a demonstration of the facilitator&rsquo;s product knowledge.
              </p>
            </div>

            {/* The finding */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                What happened: the confident wrong turn
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Watching was uncomfortable and enormously productive. The first participant paused for a long
                moment on the account screen, scanning, then clicked &ldquo;Plan details&rdquo; (the wrong place)
                confidently, because the word &ldquo;Plan&rdquo; was the closest thing to what she was looking for. She
                backtracked. Tried &ldquo;Billing.&rdquo; Backtracked again. Eventually she stopped, and said she supposed
                she would email support. The team, watching, could see the cancel option the entire time: it
                sat under a heading everyone internally called obvious.
              </p>
            </div>

            {/* Repetition */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                Four of the five did substantially the same thing
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The pattern repeated across four of five participants. That was the finding, and it was undeniable.
                Nobody could argue that the label was clear when five strangers in a row failed to find it.
                And, crucially, nobody on the team could have predicted the specific wrong turn, because they
                all knew where the button was. Their knowledge of the product was precisely what made them blind
                to the confusion. The confident wrong turn was the most instructive part: participants were not
                hesitantly guessing; they were certain, which meant the interface was actively telling them
                something the team never intended to say.
              </p>
            </div>

            {/* Fix and retest */}
            <div className="rounded-lg p-5" style={{ border: `1px solid ${BRICK}0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                Fix, and retest
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                They changed the label and the placement, and retested with five new participants. The new
                version worked. It also surfaced a smaller, different issue further down the cancel flow, which
                they fixed. Two cheap rounds, a real fix, and a class of support tickets that stopped arriving.
                The second round cost four hours; the fix it produced resolved a retention problem the team
                had attributed to pricing.
              </p>
            </div>

            {/* What the test was for */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${BRICK}0.28)`, background: `${BRICK}0.06)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>
                What the test was actually for
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                The team had assumed the design was clear. That assumption was the problem, and it was shared
                by every person who had worked on the product, including the most experienced designer on the
                team, who had missed the confusion entirely. The test did not require that anyone be blamed.
                It showed, with five people and four hours, that the assumption was wrong.
              </p>
              <p className="font-semibold"
                style={{ fontSize: 'var(--text-sm)', color: `${BRICK}0.90)` }}>
                You cannot think your way to this finding. The gap between &ldquo;obvious to me&rdquo; and &ldquo;obvious to
                a stranger&rdquo; is invisible from the inside. It only becomes visible when you watch a stranger try.
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
                The traditional approach above was run by the team directly. This tab imagines the same team
                had asked an AI to review the screen instead, to show where AI genuinely helps, and what it
                structurally cannot do.
              </p>
            </div>

            {/* Genuine uplift */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid ${INDIGO}0.22)`, background: `${INDIGO}0.05)` }}>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <p className="font-mono uppercase tracking-widest"
                  style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO_DARK}0.90)` }}>
                  Where AI genuinely helped
                </p>
                <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.12)`, color: `${INDIGO_DARK}0.90)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Real uplift
                </span>
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The AI did something genuinely useful. Reviewing the interface against established usability
                principles, it flagged several real issues in seconds: an ambiguous navigation label, a lack
                of clear system feedback after an action, an inconsistency with the pattern used elsewhere in
                the product. These were legitimate findings, and fixing them would have improved the screen.
                As an early, cheap heuristic pass (run before spending any participant time) this was real
                value that raises the floor. The team should absolutely have used it.
              </p>
            </div>

            {/* The structural limit */}
            <div className="rounded-lg p-5"
              style={{ border: `1px solid rgba(245,158,11,0.22)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: `${AMBER_DARK}1)` }}>
                What it could not produce: the actual finding
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                The AI could not tell the team that five real people in a row would confidently click &ldquo;Plan
                details&rdquo; because &ldquo;Plan&rdquo; was the nearest word to their goal in their heads, and would then
                abandon the task and email support. That behavior was not derivable from any principle. It
                emerged from the specific mental models of specific humans encountering this specific wording
                in this specific context. It did not exist as a fact anywhere until a person did it.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                This is not a limitation of the particular AI tool or version. It is structural. Usability
                testing exists to surface the particular, unpredictable ways real people fail: the specific
                misreading of a label that no principle predicts, the confident wrong turn nobody anticipated,
                the pause at a moment the team was certain was obvious. A system reasoning from documented
                principles cannot generate findings that only exist when a human enacts them.
              </p>
              <div className="rounded p-3"
                style={{ background: 'rgba(245,158,11,0.06)', borderLeft: '2px solid rgba(245,158,11,0.35)' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  And if the team had asked the AI to simulate a user walkthrough, it would have produced a
                  plausible narrative that sounded reasonable and was, in effect, a restatement of what the
                  team already assumed. The gap between the team&rsquo;s assumption and reality IS the product of a
                  usability test. That gap cannot be generated by a system whose knowledge is itself a body
                  of assumptions.
                </p>
              </div>
            </div>

            {/* The honest readout */}
            <div className="rounded-lg p-5"
              style={{ background: `${BRICK}0.04)`, border: `1px solid ${BRICK}0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${BRICK}0.90)` }}>The honest readout</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Use AI for the heuristic review; it catches the obvious violations fast, saves participant
                time, and raises the floor. Then run the five-person test anyway. The finding that mattered
                (the specific, confident, unpredictable wrong turn that five strangers made)
                required watching real humans struggle. Let AI clear the obvious. Spend your participants
                on what only reality can reveal.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A mid-sized company is spread thin, competing in many segments at once and winning decisively in none. Leadership wants a real strategy. They use the Strategic Choice Cascade. Both versions address the same situation; only the method differs.'

export default function SCCExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${PLUM}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.35)` : `${PLUM}0.35)`
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${PLUM}1)`
                : 'var(--color-neutral-600)',
            }}>
            {t === 'traditional' ? 'Working the cascade together' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Scenario */}
      <div className="rounded-lg px-4 py-3 mb-6" style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mr-2">Shared scenario</span>
        <span className="text-sm text-neutral-600">{SCENARIO}</span>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* The hard part: making real choices */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${PLUM}1)` }}>The hard part was the choosing</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The leadership team worked the cascade together. Their winning aspiration was clear
                enough — to be the most trusted partner for clients in their core categories, not
                simply a broad-based provider. That framing turned out to matter.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                But where-to-play forced the decision the company had been avoiding. Rather than
                continuing to compete across every segment, they chose to concentrate on the specific
                segments where they had a genuine right to win — where their relationships, reputation,
                and operational strengths gave them a defensible edge — and explicitly decided to exit
                or de-prioritise the others. Naming what they would give up was uncomfortable. It was
                also exactly the strategic act.
              </p>
            </div>

            {/* The cascade working */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${PLUM}1)` }}>The choices locked together</p>
              <div className="space-y-3">
                {[
                  {
                    choice: 'WHERE TO PLAY → HOW TO WIN',
                    body: 'How-to-win was made to fit that narrowed where-to-play: a source of advantage — deep client relationships, high-touch service at a level generalist competitors could not economically match — that was real in the chosen segments, even though it would not have worked across all the segments they were abandoning. The heart of the strategy clicked into place when these two choices fit each other.',
                    heart: true,
                  },
                  {
                    choice: 'CAPABILITIES',
                    body: 'They audited capabilities honestly against that how-to-win and found gaps — specifically in their account management depth and their sector-specialist knowledge base in the chosen segments. Building those became explicit priorities rather than background noise.',
                    heart: false,
                  },
                  {
                    choice: 'MANAGEMENT SYSTEMS',
                    body: 'They defined the systems and measures to sustain the focused choices: client satisfaction metrics that reflected the high-touch service model; segment-specific performance tracking; a governance cadence to catch drift back into the abandoned segments.',
                    heart: false,
                  },
                  {
                    choice: 'COHERENCE TEST',
                    body: 'They tested the whole cascade: aspiration, where-to-play, how-to-win, capabilities, and systems all reinforced one another. No choice contradicted another. They had a strategy.',
                    heart: false,
                  },
                ].map(item => (
                  <div key={item.choice} className="rounded p-4"
                    style={{
                      background: item.heart ? `${PLUM}0.06)` : `${PLUM}0.03)`,
                      borderLeft: `2px solid ${item.heart ? `${PLUM}0.55)` : `${PLUM}0.20)`}`,
                    }}>
                    <p className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
                      style={{ color: item.heart ? `${PLUM}0.90)` : `${PLUM}0.60)` }}>
                      {item.choice}
                      {item.heart && <span className="ml-2 normal-case" style={{ color: `${PLUM}0.55)` }}>★ the heart</span>}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${PLUM}1)` }}>What they got — and why it worked</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The result was a real strategy, not because any single choice was brilliant, but
                because the choices were genuine (they gave things up) and coherent (they fit together).
                Concentrating where they could win, and refusing to play where they could not, turned a
                company spread thin into a focused competitor.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The value came entirely from the hard, reinforcing choices — above all the choice of
                where NOT to play. Without naming the exclusions, the cascade would have been a
                well-intentioned vision statement, and the company would have remained spread thin.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* Hypothetical framing */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical.</span>{' '}
                This tab imagines what might happen if leadership had asked an AI to build the strategy
                using the cascade, since the real case was human-led. It illustrates a specific failure
                mode — AI&apos;s inclusive, plausibility-seeking default — not a claim about what any
                particular tool would produce.
              </p>
            </div>

            {/* What the AI produced */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>The AI cascade: thorough, articulate — and the tell</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The AI produced a thorough, articulate, well-structured cascade, and that was the tell.
                Its winning aspiration was inspiring: to be the most valued partner for clients across
                the full range of their needs. Broad, but compelling.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Its where-to-play, rather than making the hard cut, helpfully affirmed the appeal of
                essentially all the segments the company was already in — with thoughtful reasons each
                was attractive. Its how-to-win offered several plausible ways to compete, each with
                merit. The document read like a strategy: five boxes, confidently filled, comprehensive
                and balanced.
              </p>
              <div className="rounded-lg p-4" style={{ background: `${INDIGO}0.05)`, border: `1px solid ${INDIGO}0.15)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-2" style={{ color: `${INDIGO}0.70)` }}>
                  The problem
                </p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  It had performed the opposite of strategy. The everywhere-to-play where-to-play was
                  precisely the company&apos;s actual problem, and the AI had validated it rather than
                  resolved it. The single most important act — deciding which segments to exit so the
                  company could win in the rest — was exactly what the AI&apos;s inclusive,
                  plausibility-seeking default would not do. Choosing to exit attractive-looking arenas
                  is a bet AI has no basis or accountability to make.
                </p>
              </div>
            </div>

            {/* The specific traps */}
            <div className="border rounded-lg p-5" style={{ borderColor: 'rgba(245,158,11,0.25)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4 text-amber-700">
                What the inclusive default produces
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: 'Everywhere to play — the exact non-choice that was the problem',
                    detail: 'AI\'s where-to-play covered all the segments with reasons each was attractive. This was not a failure of knowledge — it was a feature of how AI works. A plausibility-maximising model covering all bases is doing exactly what it\'s designed to do. Strategy requires the opposite: choosing which attractive-looking arenas to abandon. That exclusion AI will not make.',
                  },
                  {
                    label: 'Several ways to win — commitment-free',
                    detail: 'The how-to-win offered multiple plausible approaches, each defensible. But a strategy requires one way to win in the chosen arenas, not a menu of options. AI\'s instinct to present options with pros and cons, rather than committing, is the inverse of strategy.',
                  },
                  {
                    label: 'A complete-looking document that lent false confidence',
                    detail: 'Because the output had all five boxes confidently filled and read like a real strategy, it risked giving leadership the feeling that the strategic work was done. Had they adopted it, they would have kept competing across every segment and winning nowhere — dressed up in strategic language. The appearance of strategy is sometimes more dangerous than no strategy at all.',
                  },
                ].map(item => (
                  <div key={item.label} className="rounded p-3"
                    style={{ background: 'rgba(245,158,11,0.05)', borderLeft: '2px solid rgba(245,158,11,0.22)' }}>
                    <p className="text-[9px] font-semibold uppercase tracking-widest mb-1 text-amber-700">{item.label}</p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Honest synthesis */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>How AI could have been used well</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Used well, AI could have helped: enumerating the segments and their competitive
                dynamics, sketching how-to-win options for consideration, checking whether the
                stated capabilities supported the chosen how-to-win. As a sparring partner for
                articulating and stress-testing choices already made by the leadership team, it
                adds real value. As the maker of those choices, it produces plausible non-strategies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4" style={{ borderColor: `${INDIGO}0.18)` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: `${INDIGO}0.80)` }}>Where AI genuinely helps</p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Enumerating and analysing the segments. Drafting and sharpening a winning aspiration.
                    Listing the capabilities a given how-to-win would require. Checking coherence between
                    stated choices. Pressure-testing the logic of the cascade once choices are made.
                  </p>
                </div>
                <div className="rounded-lg border p-4 border-amber-200 bg-amber-50">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-2">
                    What must stay human
                  </p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Deciding which segments to exit. Committing to one way to win and giving others up.
                    Making the bet on a particular where-and-how and owning the consequences. The courage
                    to exclude — which is the whole point of strategy and the one thing AI&apos;s inclusive
                    default consistently avoids.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

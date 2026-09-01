'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A team wants to enter the eyewear industry, long dominated by a model everyone in it accepts: prescription glasses are expensive, sold through optical shops, and you cannot really buy them without an in-person fitting. They use an orthodoxies exercise to find an opening: the same terrain the direct-to-consumer eyewear disruptors famously exploited.'

export default function OrthodoxiesExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${SAGE}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? (t === 'ai' ? `${INDIGO}0.35)` : `${SAGE}0.35)`)
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${SAGE}1)`
                : 'var(--color-neutral-600)',
            }}
          >
            {t === 'traditional' ? 'Traditional Orthodoxies Session' : 'With AI (hypothetical)'}
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
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* Setup */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>How the session worked</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The team deliberately included people from outside the eyewear industry, outsiders who had not yet
                absorbed the category&rsquo;s unwritten rules. They kept asking a simple question: &ldquo;why does it have to be that way?&rdquo;
                That question, which insiders could not hear because the rules felt like facts, was what surfaced the orthodoxies.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Each orthodoxy was stated as an assumption, not a description. Writing down &ldquo;we assume glasses are an
                expensive, considered purchase&rdquo; changed its status: from fact about the world to belief the team could examine.
              </p>
            </div>

            {/* The orthodoxies and their flips */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>The orthodoxies surfaced, and their flips</p>
              <div className="space-y-4">
                {[
                  {
                    ortho: 'Glasses are an expensive, considered purchase',
                    flip: 'What if they were cheap enough to own several pairs, like accessories?',
                    opp: 'An affordable, style-first model: own three pairs for the price one pair used to cost. Repeat purchase becomes natural.',
                  },
                  {
                    ortho: 'You must be fitted in person by an optician',
                    flip: 'What if you could try them at home, or map a face digitally?',
                    opp: 'Home try-on removes the single biggest barrier to buying glasses online, the fit question, and turns a two-week commitment into a five-day trial.',
                  },
                  {
                    ortho: 'Eyewear is sold through optical retail, not direct',
                    flip: 'What if you sold directly online and cut the enormous retail markup?',
                    opp: 'DTC eliminates the retail margin, enables a direct customer relationship, and makes the economics entirely different: what cost $400 through a retailer can cost $95 direct.',
                  },
                  {
                    ortho: 'You buy one pair and keep it for years',
                    flip: 'What if glasses were a fashion category, like shoes, with new styles each season?',
                    opp: 'A repeat-purchase category where style, not just prescription, drives buying, and where the brand, not the retailer, owns the customer relationship.',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded p-4"
                    style={{ background: `${SAGE}0.05)`, borderLeft: `2px solid ${SAGE}0.40)` }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: `${SAGE}0.65)` }}>Orthodoxy</p>
                    <p className="text-xs text-neutral-700 italic mb-2">&ldquo;{item.ortho}&rdquo;</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: `${SAGE}0.80)` }}>The flip</p>
                    <p className="text-xs text-neutral-700 mb-2">{item.flip}</p>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: `${SAGE}0.55)` }}>Opportunity beyond</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.opp}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What followed */}
            <div className="border rounded-lg p-5"
              style={{ borderColor: `${SAGE}0.28)`, background: `${SAGE}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: `${SAGE}1)` }}>What the flips revealed together</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Taken together, those four flips described a completely different eyewear business: affordable,
                direct-to-consumer, home try-on, glasses as a fashion accessory you own several of.
                None of it required new technology. It required recognizing that a set of universally-held
                industry &ldquo;truths&rdquo; were merely assumptions, and doing the opposite.
              </p>
              <p className="text-sm font-semibold" style={{ color: `${SAGE}0.88)` }}>
                The breakthrough came entirely from the human act of seeing the water the whole industry was swimming in, and choosing to step out of it.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* Hypothetical framing notice */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The real disruption came from human insight, not AI. This tab imagines the same team had instead
                started by asking an AI to describe the eyewear industry, to show what that approach reveals,
                and what it misses.
              </p>
            </div>

            {/* What AI produced */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>What AI produced</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Consensus recited as fact
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The AI produced a fluent, accurate account of the eyewear industry, and that was the problem.
                Trained on everything written about eyewear, it described the industry&rsquo;s consensus with authority.
              </p>
              <div className="space-y-3">
                {[
                  {
                    tag: 'On pricing',
                    ai: '"Prescription eyewear is a considered, medical-adjacent purchase. Consumers prioritize quality and trust, which commands a premium price point. Value-based competition is limited."',
                    note: 'The orthodoxy (expensive = credible) restated as market fact.',
                  },
                  {
                    tag: 'On distribution',
                    ai: '"Optical retail provides the necessary professional consultation and fitting services. The channel is structurally important to the category and enables the trust consumers require."',
                    note: 'The orthodoxy (must go through retail) confirmed as structural requirement.',
                  },
                  {
                    tag: 'On fitting',
                    ai: '"In-person fitting by a licensed optician is essential for ensuring correct prescription delivery and physical comfort. Remote alternatives present quality and liability risks."',
                    note: 'The orthodoxy (must be in person) presented as safety imperative, not assumption.',
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded p-3"
                    style={{ background: `${INDIGO}0.05)`, borderLeft: `2px solid ${INDIGO}0.28)` }}>
                    <p className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: `${INDIGO}0.65)` }}>{item.tag}</p>
                    <p className="text-xs text-neutral-700 italic mb-1.5">{item.ai}</p>
                    <p className="text-[10px] text-neutral-500 leading-relaxed">↑ {item.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What changed when re-aimed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${INDIGO}0.80)` }}>When re-aimed: more useful</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  When the team changed the question to &ldquo;what does the eyewear industry take for granted, and for each assumption, imagine the opposite,&rdquo; AI became genuinely useful: it laid out candidate orthodoxies and generated inversions to explore. Used this way, it accelerated the surfacing and the flipping.
                </p>
              </div>
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
                  The judgment stayed human
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Even re-aimed, the crucial act, deciding that &ldquo;you must be fitted in person&rdquo; was a breakable assumption rather than a fact, still had to come from a human willing to distrust the consensus the AI had just so convincingly recited.
                </p>
              </div>
            </div>

            {/* Honest readout */}
            <div className="rounded-lg p-5 border"
              style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO}0.80)` }}>The honest readout</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Used naively, AI entrenched the industry&rsquo;s orthodoxies, presenting every assumption as fact,
                thickening the walls rather than naming them. Aimed deliberately at articulating assumptions and generating
                inversions, it became a useful divergence accelerator. But the act of defying the obvious, of saying
                &ldquo;this consensus belief is a choice we can reverse&rdquo;, was human. That is the method&rsquo;s engine,
                and it runs directly against the grain of a model trained to reproduce the consensus fluently.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

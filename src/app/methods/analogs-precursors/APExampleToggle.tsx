'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'Cleveland Clinic, one of the largest hospital systems in the US, wanted to improve the patient experience, not clinical outcomes, which were already strong, but the felt quality of being cared for. Their eventual insight came from looking at an analog. But look at how differently the search played out depending on where they started.'

export default function APExampleToggle() {
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
            type="button"
            aria-pressed={tab === t}
            onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${CLAY}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? (t === 'ai' ? `${INDIGO}0.35)` : `${CLAY}0.35)`)
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${CLAY}1)`
                : 'var(--color-neutral-600)',
            }}
          >
            {t === 'traditional' ? 'Human-led session' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Scenario */}
      <div className="rounded-lg px-4 py-3 mb-6" style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-500 mr-2">Shared scenario</span>
        <span className="text-sm text-neutral-600">{SCENARIO}</span>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* The analog search */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>The analog search</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The team was explicit about starting far from healthcare. They did not ask &ldquo;what do other hospitals do?&rdquo;
                That would have surfaced near analogs: similar settings with similar constraints, confirming what was already known.
                Instead, they asked: &ldquo;who has already solved the problem of making people feel cared for across many staff,
                many touchpoints, and a complex choreography they do not control?&rdquo;
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                That question pointed to luxury hotels. Not because hospitals are like hotels in any surface sense,
                but because the structural problem was identical: consistent, dignity-centred service across a large,
                distributed team where the guest or patient is always at the mercy of the next handoff.
              </p>
            </div>

            {/* The abstracted principle */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>What they abstracted, and what they refused to borrow</p>
              <div className="space-y-3">
                <div className="rounded p-4"
                  style={{ background: `${CLAY}0.06)`, borderLeft: `2px solid ${CLAY}0.40)` }}>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                    style={{ color: `${CLAY}0.65)` }}>What they noticed in hotels</p>
                  <p className="text-xs text-neutral-700 mb-2">
                    Every person in the building (not just the concierge, not just the room service team)
                    was trained to see themselves as part of the guest experience. A hotel housekeeper who passed
                    a guest in the hallway greeted them by name. A bellman who overheard a complaint addressed it.
                    The experience was choreographed across the entire staff, not delegated to a guest relations department.
                  </p>
                </div>
                <div className="rounded p-4"
                  style={{ background: `${CLAY}0.04)`, borderLeft: `2px solid ${CLAY}0.25)` }}>
                  <p className="text-[9px] font-semibold uppercase tracking-wider mb-1"
                    style={{ color: `${CLAY}0.55)` }}>The abstracted principle</p>
                  <p className="text-xs text-neutral-800 font-semibold mb-2">
                    Patient experience is the sum of every handoff (from orderly to nurse, from receptionist to physician)
                    not a single moment. Every person in the building is responsible for it. Dignity-centred care cannot be
                    delegated to a department; it must be the standard for the entire organisation.
                  </p>
                </div>
                <div className="rounded p-4 bg-amber-50 border border-amber-200">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-amber-700 mb-1">
                    What they refused to borrow
                  </p>
                  <p className="text-xs text-neutral-700">
                    The surface details: chocolates on pillows, turndown service, concierge desks.
                    Those are implementation details, not the principle. Importing hotel aesthetics into a hospital
                    would have been imitation. Importing the organisational model for consistent service across all staff
                    was the analog that mattered.
                  </p>
                </div>
              </div>
            </div>

            {/* The precursor check */}
            <div className="border rounded-lg p-5"
              style={{ borderColor: `${CLAY}0.20)`, background: `${CLAY}0.03)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: `${CLAY}1)` }}>The precursor check</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team also looked backward. Had hospitals tried to redesign patient experience before? Yes,
                hotel-inspired &ldquo;patient amenity&rdquo; programmes from the 1990s had largely failed,
                and the team diagnosed why: they had borrowed the surface (aesthetics, amenities) rather than the structure
                (organisation-wide service training). The earlier attempts were not premature. They were misdirected.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                That precursor diagnosis sharpened the approach: the principle to borrow was organisational, not cosmetic.
                The team created the first Chief Patient Experience Officer role in a major hospital system,
                a structural change modelled on the hotel&rsquo;s Director of Guest Services, not its interior design.
              </p>
            </div>

            {/* Outcome */}
            <div className="border rounded-lg p-5"
              style={{ borderColor: `${CLAY}0.28)`, background: `${CLAY}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${CLAY}1)` }}>What the search produced</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The combination of one far analog (luxury hotels) and one precursor diagnosis (earlier patient amenity
                programmes had borrowed the wrong thing) gave the team a sharp, actionable principle.
                Cleveland Clinic went from the bottom quartile of patient experience scores in their peer group
                to the top. The insight, that experience is an organisational model, not a service layer,
                came entirely from looking sideways and backward, not from studying what other hospitals were doing.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4"
          >
            {/* Hypothetical framing */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The real search was human-led. This tab imagines the team had instead asked an AI to find analogs
                and precursors, to make the contrast visible.
              </p>
            </div>

            {/* AI on analogs */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>AI on the analogs axis</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  near-biased
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Asked &ldquo;find analogs for improving hospital patient experience,&rdquo; AI returned a near list:
                other hospitals known for patient experience, then hotel chains mentioned in healthcare articles,
                then generic &ldquo;service excellence&rdquo; frameworks from consulting reports.
              </p>
              <div className="space-y-2">
                {[
                  { near: true,  item: 'Mayo Clinic: ranked highly for patient experience' },
                  { near: true,  item: 'Marriott and Ritz-Carlton: frequently cited in healthcare service articles' },
                  { near: false, item: 'Racing pit crews: AI did not surface this; the structural match requires a conceptual leap the default prompt did not elicit' },
                  { near: false, item: 'Disney theme parks: reached only after explicit reprompting toward "extreme emotional choreography"' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 rounded p-2"
                    style={{
                      background: item.near ? `${INDIGO}0.06)` : 'var(--color-neutral-50)',
                      borderLeft: `2px solid ${item.near ? `${INDIGO}0.30)` : 'var(--color-neutral-200)'}`,
                    }}>
                    <span className="text-[9px] font-semibold mt-0.5 shrink-0"
                      style={{ color: item.near ? `${INDIGO}0.65)` : 'var(--color-neutral-500)' }}>
                      {item.near ? 'NEAR' : 'MISSED'}
                    </span>
                    <p className="text-xs text-neutral-600 leading-relaxed">{item.item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI on precursors */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.80)` }}>AI on the precursors axis</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Asked to find past attempts at hospital patient experience redesign, AI produced a useful list:
                the 1990s patient amenity movement, various &ldquo;hospital hotel&rdquo; concepts from the 2000s,
                specific hospital systems that had tried and struggled. Rich research, readily available.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                What it could not do was diagnose: it could not reliably distinguish &ldquo;this failed because it was
                premature&rdquo; from &ldquo;this failed because it borrowed the wrong thing.&rdquo;
                That distinction, which is the entire point of looking at precursors, required a human to read the
                history and ask &ldquo;what was actually missing, and is it missing now?&rdquo;
              </p>
              <div className="rounded p-3"
                style={{ background: `${INDIGO}0.05)`, borderLeft: `2px solid ${INDIGO}0.22)` }}>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  <span className="font-semibold" style={{ color: `${INDIGO}0.70)` }}>The gap: </span>
                  Without the diagnosis, the precursor list is archaeology, not strategy.
                  &ldquo;Others tried and failed&rdquo; is a caution, not a direction.
                  &ldquo;Others tried and failed because they borrowed the surface rather than the structure,
                  and we will borrow the structure&rdquo; is a hypothesis the team can test.
                </p>
              </div>
            </div>

            {/* Honest readout */}
            <div className="rounded-lg p-5 border"
              style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO}0.80)` }}>The honest readout</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI accelerated both searches when aimed explicitly: telling it to push toward &ldquo;far, non-obvious
                analogs&rdquo; eventually surfaced racing crews and theme parks. For precursors, asking it to speculate
                on each failure&rsquo;s cause produced useful hypotheses to investigate.
                But the far jump and the timing diagnosis (both of which were the actual insight in this case)
                required human direction to reach, and human judgment to confirm.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

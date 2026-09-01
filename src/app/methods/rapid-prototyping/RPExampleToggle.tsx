'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A team has a promising idea for a new app feature (selected from a Crazy 8s session) and needs to learn whether users understand the concept and whether the core flow makes sense, before investing in building it. Both versions prototype the same idea; only the approach differs.'

export default function RPExampleToggle() {
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
                ? t === 'ai' ? `${INDIGO}0.10)` : `${CLAY}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.35)` : `${CLAY}0.35)`
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${CLAY}1)`
                : 'var(--color-neutral-600)',
            }}>
            {t === 'traditional' ? 'Human-led (low fidelity)' : 'With AI'}
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

            {/* Learning question */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>Starting from the learning question</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team named the question before building anything: do users understand this concept,
                and does the main flow make sense? Because that question was about concept and flow
                (not polish) they kept fidelity deliberately low.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                They sketched the key screens on paper first, then built a rough clickable mockup,
                just enough to click through the flow, obviously unfinished, made in an
                afternoon. Paper for the concept question; clickable mock only when the question
                shifted to flow.
              </p>
            </div>

            {/* What the testing taught */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>What the rough prototype made possible</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                They put the rough mockup in front of real users. Because the prototype was so clearly
                unfinished, users engaged with the concept rather than the surface: they talked about
                whether the feature made sense, where the flow confused them, what they expected to
                happen next. No one wasted a word on colors or fonts; there was nothing polished
                to react to.
              </p>
              <div className="space-y-3">
                {[
                  {
                    label: 'One consistent confusion surfaced immediately',
                    detail: 'A specific step in the flow was consistently misread. Because the prototype was rough and cheap to change, the team iterated on that step and retested the same afternoon. The finding cost an afternoon, not a sprint.',
                  },
                  {
                    label: 'The artifacts were thrown away without a second thought',
                    detail: 'Several paper and rough-mock versions were discarded happily. That was the point. Low fidelity kept the team from over-committing to the idea before it was validated: the prototypes were disposable because they were deliberately rough.',
                  },
                  {
                    label: 'Three jobs at once',
                    detail: 'The low fidelity did three jobs simultaneously: it was fast and cheap to build; it kept every comment on the concept; and it kept the team from falling in love with an artifact they had not yet validated. The learning was the deliverable. The artifacts were not.',
                  },
                ].map(item => (
                  <div key={item.label} className="rounded p-4"
                    style={{ background: `${CLAY}0.05)`, borderLeft: `2px solid ${CLAY}0.28)` }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: `${CLAY}0.88)` }}>
                      {item.label}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* Context: both tabs are real approaches */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Both approaches are real.</span>{' '}
                This tab shows what actually happened when the team used AI, including both the genuine
                upside and the trap it created. It is not a hypothetical warning; it is what
                playing with the economics of fidelity produces in practice.
              </p>
            </div>

            {/* The power */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>The power: near-real in minutes</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Facing the same question, the team described the feature to an AI and, in minutes,
                had a refined, styled, clickable prototype that looked and felt almost like a real
                product. They could generate several polished variations nearly instantly.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                For speed and reach, it was a genuine leap. A prototype that would have taken an
                afternoon in traditional tools took fifteen minutes. And if their question had truly
                been about how a polished flow felt, rather than whether the concept itself
                worked, the speed would have been an unambiguous win.
              </p>
            </div>

            {/* The trap */}
            <div className="border rounded-lg p-5" style={{ borderColor: 'rgba(245,158,11,0.25)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4 text-amber-700">
                The trap: the feedback shifted to polish
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    label: 'Users reacted to what they saw, not the concept',
                    detail: 'Because the AI prototype looked finished, users reacted to it as finished: they commented on the color scheme, the button styles, the wording, and engaged far less with the underlying concept and flow. The feedback that low fidelity had always produced for free, "does this concept work?", now required effort to extract, because the prototype kept pulling attention to the surface.',
                  },
                  {
                    label: 'The team grew attached before validating',
                    detail: 'Looking at something that already felt like a real product, the team started treating the direction as settled and grew attached to it before they had validated the concept. The beautiful AI mock made discarding it feel like a loss, which is the opposite of the throwaway mindset rapid prototyping requires.',
                  },
                  {
                    label: 'The cheap test was skipped',
                    detail: 'Because a polished mock was one prompt away, the team skipped the paper sketch that, in the traditional run, exposed the flow confusion instantly and for free. The AI shortcut bypassed the cheapest, fastest learning opportunity: a sketch that would have killed the bad flow before anyone invested in it.',
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

            {/* Synthesis */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>What the strongest practice looked like</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The teams that used AI well kept asking the old questions: what do we need to learn,
                and what is the least that answers it? Sometimes they still started with a rough
                sketch, even though AI could have built the polished version, precisely
                because the rough version got better concept feedback. AI changed the economics; the
                discipline of learning-first had to stay human.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4" style={{ borderColor: `${INDIGO}0.18)` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: `${INDIGO}0.80)` }}>Where AI genuinely helped</p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Fast iteration once the concept was validated. Quickly testing flow variations.
                    Generating multiple polished directions to compare. Speed when fidelity was
                    what the question actually needed.
                  </p>
                </div>
                <div className="rounded-lg border p-4 border-amber-200 bg-amber-50">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-2">
                    What had to stay human
                  </p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    Naming the learning question before building. Choosing the right fidelity for that
                    question. Staying willing to throw the beautiful AI mock away. The discipline
                    that made it a learning exercise, not a building exercise.
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

'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A health system wants to redesign a chronic-care programme that patients and frontline nurses both find frustrating. The team could design a fix and ask for feedback — or it could design WITH the patients and nurses who live the experience. Both approaches address the same problem. Toggle between them.'

export default function CCWExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
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
            {t === 'traditional' ? 'Traditional Approach' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* Shared scenario */}
      <div className="rounded-lg px-4 py-3 mb-6" style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-[10px] font-semibold uppercase tracking-widest text-neutral-400 mr-2">
          Shared scenario
        </span>
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
            {/* Setup */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>How the workshop ran</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team ran a genuine co-creation workshop — inviting real patients and frontline
                nurses, the people who live the programme, as active contributors. Crucially, the session
                was structured for making, not reacting. Participants were not shown a finished redesign to
                approve; they were given tangible materials — journey templates, cards, sketching supplies,
                rough concepts to modify — and built and reshaped the experience alongside the team.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The session began with a short orientation: enough context for participants to contribute as
                makers, not enough finished thinking to anchor them to the team&rsquo;s assumptions. Then the
                building started — from both sides of the table at once.
              </p>
            </div>

            {/* What participants contributed */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>What the workshop produced that the team alone couldn&rsquo;t have</p>
              <div className="space-y-3">
                {[
                  {
                    contributor: 'PATIENTS',
                    insight: 'The waiting-room check-in — which the team considered a trivial administrative step — was the most stressful moment in the entire patient journey.',
                    note: 'The team had designed around clinical outcomes. Patients reframed a "minor" administrative step as the emotional crux. It showed up in their exact language: "that moment is when I feel most like a number."',
                    clay: true,
                  },
                  {
                    contributor: 'NURSES',
                    insight: 'A scheduling adjustment the team had designed as a workaround would have created three new handoff failures that the clinical team knew about but couldn\'t surface from the outside.',
                    note: 'Nurses contributed specific operational knowledge the designers would never have known to ask about. The workable fix came from them: a change the team\'s design had overlooked entirely.',
                    clay: true,
                  },
                  {
                    contributor: 'BOTH',
                    insight: 'The language the eventual solution used to communicate with patients came directly from how patients described the programme in their own words during the session.',
                    note: "The grounded texture — specific, surprising, in people's own words — is exactly what a feedback session could not have produced. It came from participants building with the team, not reacting to the team's framing.",
                    clay: false,
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded p-3 flex gap-4"
                    style={{
                      background: item.clay ? `${CLAY}0.05)` : 'var(--color-neutral-50)',
                      borderLeft: `2px solid ${item.clay ? `${CLAY}0.50)` : 'var(--color-neutral-200)'}`,
                    }}>
                    <div className="shrink-0 w-24">
                      <span className="text-[9px] font-semibold uppercase tracking-wider block"
                        style={{ color: item.clay ? `${CLAY}1)` : 'var(--color-neutral-400)' }}>
                        {item.contributor}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-800 mb-1">{item.insight}</p>
                      <p className="text-xs text-neutral-600 leading-relaxed">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome and ownership */}
            <div className="border rounded-lg p-5"
              style={{ borderColor: `${CLAY}0.30)`, background: `${CLAY}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                style={{ color: `${CLAY}1)` }}>The outcome — and the ownership that came with it</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The redesigned programme was grounded in ways a team-led design followed by a feedback
                session could not have produced: specific to these patients&rsquo; actual priorities, shaped by
                nurses&rsquo; operational knowledge, and expressed in the language the served people actually use.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                And something else happened that mattered as much as the concept: the patients and nurses
                who co-created it became its advocates. Having helped build the redesign, they were invested
                in it and understood it from the inside. When it came to rollout — the hardest part of any
                change — the people affected were already champions rather than skeptics.
              </p>
              <p className="text-sm font-semibold" style={{ color: `${CLAY}0.88)` }}>
                Designing WITH the served people produced both a better-grounded solution and the ownership that carried it into practice. Those two things came together, and neither was available the other way.
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
            {/* Hypothetical notice */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Hypothetical:</span>{' '}
                The real chronic-care case was human-led. This tab imagines the team had instead leaned on
                AI in place of the workshop — to show where it genuinely helps, and where it hits the
                method&rsquo;s core limit.
              </p>
            </div>

            {/* Where AI helped */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>Where AI genuinely helped</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO}0.80)`, border: `1px solid ${INDIGO}0.25)` }}>
                  Support around the workshop
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Used as a preparation aid, AI genuinely helped. It drafted a workshop agenda with
                well-structured generative activities, produced stimulus concepts — rough chronic-care
                journey sketches for participants to build on and modify — and identified analogous
                programmes from other healthcare contexts as provocations. After a workshop, it could
                help synthesize the many contributions by clustering themes across participant responses.
              </p>
            </div>

            {/* Where AI fell short */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.90)` }}>Where it hit the core limit</p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(217,119,6,0.10)', color: 'rgba(217,119,6,0.85)', border: '1px solid rgba(217,119,6,0.25)' }}>
                  Cannot be the participants
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Asked to stand in for the patients and nurses, AI hit the method&rsquo;s limit immediately.
                Its &ldquo;patient perspective&rdquo; on chronic care was a generic average of what has been written
                about the experience — articulate, plausible, and about a different set of patients than
                these. The specific, surprising insights that made the real co-created solution work came
                from these actual people, with these specific experiences.
              </p>
              <div className="space-y-3">
                {[
                  {
                    tag: "AI's patient perspective",
                    ai: '"Patients in chronic-care programmes typically report frustration with long wait times, communication gaps with clinical staff, and difficulty navigating appointment systems."',
                    note: "A reasonable, generic summary of chronic-care research. The insight that a specific check-in moment was the emotional crux — the most important finding — would not appear in what has been written. It was specific to these patients and their experience of this programme.",
                  },
                  {
                    tag: "AI on operational redesign",
                    ai: '"Scheduling optimization and reduced handoff points are well-established levers for improving chronic-care programme efficiency. A unified scheduling system would address the main friction points."',
                    note: "Generic best practice — the nurses' specific knowledge that the team's proposed adjustment would create three new handoff failures was not in any published source. It came from the people who run the programme, and it could only come from them.",
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

            {/* 2-col: missed insight / judgment stayed human */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.18)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${INDIGO}0.80)` }}>The insights AI couldn&rsquo;t surface</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The check-in reframe (patients&rsquo; most stressful moment, invisible to the team) and the
                  nurse operational knowledge (the fix that would have created new failures) were not in
                  any published source. They came from specific people with specific experience, and the
                  only way to get them was to have those people in the room, building.
                </p>
              </div>
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-3">
                  The ownership AI cannot build
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Even if the AI&rsquo;s redesign had been excellent, it would have arrived with none of the
                  ownership. No patient or nurse had helped build it; no one was invested. At rollout,
                  the affected people would meet it as something done to them — and adoption would face
                  exactly the resistance co-creation exists to dissolve.
                </p>
              </div>
            </div>

            {/* Honest readout */}
            <div className="rounded-lg p-5 border"
              style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO}0.80)` }}>The honest readout</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI could have prepared and synthesized around the workshop. But it could not be the
                patients and nurses, and it could not manufacture their ownership — and those are the
                method&rsquo;s entire value. The strongest version kept real patients and nurses at the center
                of the making. AI, at most, supported the room. It could not replace the people in it.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

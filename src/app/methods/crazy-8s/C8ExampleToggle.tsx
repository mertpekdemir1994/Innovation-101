'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY   = 'rgba(181,97,62,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A robotics company needs a differentiating direction for a new product. The team needs to generate candidate directions to explore. Both versions pursue the same goal; only the method differs.'

export default function C8ExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button key={t}
            type="button"
            aria-pressed={tab === t}
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
            {t === 'traditional' ? 'Human-led Crazy 8s' : 'With AI'}
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
          <motion.div key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* The session */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>The session: eight panels, eight minutes</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The team ran Crazy 8s against a well-scoped prompt. Each person folded a sheet into eight
                panels and sketched one direction per minute for eight minutes. No polish, no judgment in the
                moment, one distinct idea per panel.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The early panels went as they always do. The obvious robotics directions came fast and easily,
                sensible, functional, the things the whole category was already building. Reliable to
                sketch, unremarkable to select.
              </p>
            </div>

            {/* The wall */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>The wall: around panel five</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                Around panel five, the obvious directions ran out. It got hard. For a moment, nothing came.
                In a comfortable, unhurried session, this is where most people stop, satisfied with their
                first four, never reaching what they did not know was in there.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The one-minute constraint refused to let the team stop. The pen kept moving. Panel five
                produced something slightly desperate; panel six something strange. And in one
                participant&rsquo;s late panels, something unexpected appeared.
              </p>
            </div>

            {/* The late-panel idea */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${CLAY}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${CLAY}1)` }}>The late-panel idea: panel seven</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Forced past the conventional robotics directions, a participant sketched a
                personality-forward design direction, a playful, character-driven take that they
                had almost not bothered to draw. &ldquo;Too playful for a serious robotics product.&rdquo;
                The one-minute constraint forced it onto the page before judgment could kill it.
              </p>
              <div className="space-y-3">
                {[
                  {
                    finding: 'The share-and-select step: that sketch stood out',
                    detail: 'When the team shared their eight panels, the personality-forward sketch stood out immediately. It was the only direction in the room that was genuinely differentiating, not because it was more polished or more logical, but because it was the only one that had not come from the obvious zone. It went on to become the product\'s defining, differentiating characteristic.',
                  },
                  {
                    finding: 'The forcing function and the ownership',
                    detail: 'The direction was a late-panel idea that a comfortable brainstorm would never have surfaced, and that the participant themselves would have discarded if given the chance to judge it first. The time constraint dragged out an idea the team did not know it had. And because a team member had sketched it themselves, they understood it, believed in it, and championed it.',
                  },
                ].map(item => (
                  <div key={item.finding} className="rounded p-4"
                    style={{ background: `${CLAY}0.05)`, borderLeft: `2px solid ${CLAY}0.28)` }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: `${CLAY}0.88)` }}>
                      {item.finding}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="rounded p-4 mt-3"
                style={{ background: `${CLAY}0.08)`, borderLeft: `2px solid ${CLAY}0.40)` }}>
                <p className="text-xs font-semibold mb-1" style={{ color: `${CLAY}0.85)` }}>
                  Jake Knapp: a forcing function for the ideas you did not know you had
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The panel-seven sketch was the right idea. It was also exactly the idea that would have
                  been self-censored out of any comfortable brainstorm. The eight-minute constraint was
                  the only mechanism that could have produced it.
                </p>
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

            {/* Hypothetical notice */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Two paths:</span>{' '}
                The real robotics case was human-led. This tab considers two ways AI might enter
                this scenario: one unsound (framed as a hypothetical), one genuinely useful.
              </p>
            </div>

            {/* Unsound path */}
            <div className="border rounded-lg p-5" style={{ borderColor: 'rgba(245,158,11,0.25)' }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700">
                  The unsound path: ask AI to generate the directions instead
                </p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full text-amber-600 bg-amber-50 border border-amber-200">
                  hypothetical
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Imagine the team had skipped Crazy 8s and asked an AI to generate design directions for
                the robotics product. The AI produced a long, fast, well-organized list, dozens of
                directions in seconds.
              </p>
              <div className="space-y-2 mb-4">
                {[
                  {
                    label: 'What the AI produced',
                    body: 'A comprehensive list of plausible robotics product directions. Sensible, conventional, the things the whole category is already building. The same obvious ideas the early panels always produce, generated many ways at scale. As breadth, impressive. As differentiation, none.',
                  },
                  {
                    label: 'What was missing',
                    body: 'The wall. Without the constraint that exhausts the obvious and forces you to keep going, the plausible middle is all there is. The personality-forward direction (playful, character-driven, the idea that differentiates) is exactly the kind of idea a plausibility-seeking model is least likely to surface and elevate. The non-obvious idea was not on the list.',
                  },
                  {
                    label: 'Why it would have misled',
                    body: 'A team working from the AI\'s list would have selected from the obvious zone, the same directions everyone in robotics already has. The differentiating idea comes from a human pushed past the wall, sketching a direction they almost dismissed. AI generated many plausible directions fast, but it regressed to the obvious, offered no forcing function to reach the non-obvious, and produced nothing the team owned.',
                  },
                ].map(item => (
                  <div key={item.label} className="rounded p-3"
                    style={{ background: 'rgba(245,158,11,0.05)', borderLeft: '2px solid rgba(245,158,11,0.22)' }}>
                    <p className="text-[9px] font-semibold uppercase tracking-widest mb-1 text-amber-700">{item.label}</p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs font-semibold text-amber-700">
                Even if the personality-forward direction had appeared somewhere in the AI&rsquo;s list, no one on
                the team would have owned it. One line among dozens, handed over by a machine, with none of the
                felt authorship that made the human team champion their late-panel sketch.
              </p>
            </div>

            {/* Sound path */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>The sound path: run the real session, use AI around the edges</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The eight minutes of Crazy 8s runs with the real team. AI enters in genuinely useful roles:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    role: 'Sharpen the prompt before the session',
                    detail: 'AI can help scope a precise, well-framed prompt to sketch against. A sharp How Might We question focuses the eight minutes of divergence; a vague one scatters it. AI can draft prompt variations for the team to select from before the clock starts. This is AI improving the setup, not replacing the session.',
                  },
                  {
                    role: 'Provoke after the team has diverged',
                    detail: 'After the team has done their own eight panels, AI can add an additional "participant" whose list is used as extra provocation: surface directions the team may not have reached, prompt reactions, extend the selection pool. Used this way, it augments rather than replaces the human divergence. The team\'s own panels come first, always.',
                  },
                  {
                    role: 'Help cluster and theme at the share-and-select step',
                    detail: 'With many participants and many sketches, AI can help identify clusters and themes across the panels, surfacing structural similarities between ideas from different people. This supports the selection step without replacing the human judgment about which ideas are worth pursuing.',
                  },
                ].map(item => (
                  <div key={item.role} className="rounded p-4"
                    style={{ background: `${INDIGO}0.06)`, borderLeft: `2px solid ${INDIGO}0.28)` }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: `${INDIGO}0.85)` }}>
                      {item.role}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg border p-4" style={{ borderColor: `${INDIGO}0.18)` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                    style={{ color: `${INDIGO}0.80)` }}>Where AI helped</p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    A sharper prompt. Extra provocation after the team diverged. Faster clustering at
                    the selection step. All genuine improvements to a session built on human divergence.
                  </p>
                </div>
                <div className="rounded-lg border p-4 border-amber-200 bg-amber-50">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-2">
                    What stayed human
                  </p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    The eight minutes. The wall. The panel-seven idea forced out before judgment could
                    kill it. The ownership of having sketched it. AI shaped the session and supported
                    the selection. It did not replace the constraint.
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

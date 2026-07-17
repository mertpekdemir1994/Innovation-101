'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const CLAY  = 'rgba(181,97,62,'
const AMBER = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const TRADITIONAL_PANELS = [
  {
    step: '01',
    heading: 'The team draws the sequence',
    body: 'Meal-planning app. Five frames: parent opens fridge, opens app, sees suggestions, adds ingredients to list, plans the week. The first three frames draw quickly. Everyone agrees on what the user sees.',
  },
  {
    step: '02',
    heading: 'Frame four stops the room',
    body: 'How does the app know which ingredients the user has? Someone suggests typing them in. Someone else says: do we actually think people do that? A third person says: we\'ve been assuming they do. Nobody draws the frame. There is silence.',
  },
  {
    step: '03',
    heading: 'The gap reveals the concept',
    body: 'The real product question is now visible: the entire value proposition rests on knowing what the user has at home. The storyboard did not fail. It worked. Three mechanisms are proposed: manual entry, receipt scanning, pantry photo. Each is a different product.',
  },
  {
    step: '04',
    heading: 'The concept changes before anything is built',
    body: 'The team agrees on receipt scanning as the lowest-friction option. They draw a new frame four. The storyboard now has six frames, not five, and the gap is crossed with a specific behaviour. Sprint one builds that behaviour.',
  },
]

const AI_PANELS = [
  {
    step: '01',
    heading: 'AI generates the storyboard',
    body: 'Prompt: "Storyboard a meal-planning app that suggests recipes based on what the user has at home." Five frames appear in forty seconds. They are clear, consistent, and confident. The team reads them and agrees they look right.',
  },
  {
    step: '02',
    heading: 'Frame four is a label',
    body: '"The app intelligently suggests a recipe using available ingredients." No drawing. No mechanism. Just a sentence. The team does not notice, because the frame looks like every other frame. It reads like it was drawn by someone who knew the answer.',
  },
  {
    step: '03',
    heading: 'The team is more confident and less correct',
    body: 'Three months later, sprint four: the engineering team asks how the app knows what ingredients the user has. The answer turns out to be: we never decided. The AI had written a label where the team needed a question. The gap survived, invisible, for a quarter.',
  },
  {
    step: '04',
    heading: 'What should have happened',
    body: 'Before accepting any AI-generated storyboard: ask it to identify every frame that describes a mechanism with a word like "intelligently," "automatically," or "seamlessly." Each of those words is a hidden gap. That question is the adversarial prompt that does the job storyboarding was built to do.',
  },
]

export default function SBExampleToggle() {
  const [tab, setTab]     = useState<Tab>('traditional')
  const prefersReduced    = useReducedMotion()
  const tr = prefersReduced ? { duration: 0 } : { duration: 0.22 }

  const panels = tab === 'traditional' ? TRADITIONAL_PANELS : AI_PANELS

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {(['traditional', 'ai'] as Tab[]).map(t => {
          const active  = tab === t
          const accent  = t === 'traditional' ? CLAY : INDIGO
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="px-4 py-2 text-xs font-mono tracking-widest rounded-sm transition-colors"
              style={{
                background: active ? `${accent}0.12)` : 'rgba(255,255,255,0.04)',
                border: `1px solid ${active ? `${accent}0.48)` : 'rgba(255,255,255,0.12)'}`,
                color: active ? `${accent}1)` : 'rgba(255,255,255,0.45)',
              }}
            >
              {t === 'traditional' ? 'TRADITIONAL' : 'WITH AI (HYPOTHETICAL)'}
            </button>
          )
        })}
      </div>

      {/* Context card */}
      <div className="mb-6 rounded-sm px-5 py-4" style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        <p className="text-xs font-mono tracking-widest mb-1"
          style={{ color: 'rgba(255,255,255,0.30)' }}>
          SCENARIO
        </p>
        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.60)' }}>
          A team is storyboarding a meal-planning app that suggests recipes based on what ingredients the user has at home.
        </p>
      </div>

      {/* Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={tr}
          className="grid gap-4"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}
        >
          {panels.map((panel, i) => {
            const isGapPanel = tab === 'traditional' && i === 1
            const isAIGap    = tab === 'ai' && i === 1
            const accent     = tab === 'traditional' ? CLAY : INDIGO
            const borderLeft = isGapPanel || isAIGap
              ? `3px solid ${AMBER}0.70)`
              : `3px solid ${accent}0.40)`

            return (
              <div key={i} className="rounded-sm p-5" style={{
                background: isGapPanel || isAIGap ? `${AMBER}0.04)` : `${accent}0.04)`,
                border: `1px solid ${isGapPanel || isAIGap ? `${AMBER}0.18)` : `${accent}0.14)`}`,
                borderLeft,
              }}>
                <p className="text-xs font-mono tracking-widest mb-1"
                  style={{
                    color: isGapPanel || isAIGap ? `${AMBER}0.65)` : `${accent}0.55)`,
                  }}>
                  {panel.step}
                </p>
                <p className="text-sm font-semibold mb-3" style={{ color: 'rgba(255,255,255,0.85)' }}>
                  {panel.heading}
                </p>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
                  {panel.body}
                </p>
              </div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Bottom note */}
      <div className="mt-6 rounded-sm p-4" style={{
        background: tab === 'traditional' ? `${CLAY}0.06)` : `${INDIGO}0.06)`,
        border: `1px solid ${tab === 'traditional' ? `${CLAY}0.18)` : `${INDIGO}0.18)`}`,
      }}>
        <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
          {tab === 'traditional'
            ? 'The storyboard worked because the team could not draw frame four. In two hours they discovered a product decision that would have cost months to find in a build. The gap was the method doing its job.'
            : 'The AI storyboard looked finished because the gap was written, not drawn. "Intelligently surfaces" is not a frame — it is a wish. The method only works if you cannot pass a gap by labelling it.'}
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(185,28,28,'
// This dark, saturated red fails 4.5:1 against the near-black section
// background at any opacity — brightened text-safe variant of BRICK.
const BRICK_TEXT = 'rgba(216,129,129,'

type Group = {
  label: string
  description: string
  questions: { q: string; hint: string }[]
}

const GROUPS: Group[] = [
  {
    label: 'Market',
    description: 'The market conditions that make FDE economically viable',
    questions: [
      {
        q: 'Are your target customers large enough (Fortune 500 or government) to pay prices that justify the FDE cost structure?',
        hint: 'True FDE requires premium pricing. If your per-customer revenue cannot support a full-time engineer for months or years, the economics do not work.',
      },
      {
        q: 'Are their problems complex enough that a standardized product cannot serve them?',
        hint: 'If customers with comparable needs can all use the same product with minor configuration, FDE is overkill. The model is for genuine non-standardizability.',
      },
      {
        q: 'Is each customer relationship long enough (multi-year) to justify deep embeddedness?',
        hint: 'An FDE who is embedded for six months builds a fundamentally different kind of institutional knowledge than one managing a quarterly engagement. The ROI is in depth over time.',
      },
    ],
  },
  {
    label: 'Organizational',
    description: 'The organizational structures that make FDE operationally possible',
    questions: [
      {
        q: 'Can you hire engineers who combine top-tier technical skill with customer-facing capability and independent product judgment?',
        hint: 'This profile is exceptionally rare. An FDE who is world-class at building but cannot manage a complex customer relationship (or vice versa) cannot do true FDE.',
      },
      {
        q: 'Can your leadership genuinely subordinate the product roadmap to field team discoveries?',
        hint: 'The moment leadership reasserts central control over what field teams build, FDE is over. Not "mostly." Completely. Most organizations cannot do this, which is fine.',
      },
      {
        q: 'Can your investors tolerate a cost structure where many customer deployments will have negative individual margins?',
        hint: 'If your investors evaluate each deployment on standalone margin, the pressure will destroy field autonomy before it produces learning. The economics require patient capital.',
      },
    ],
  },
  {
    label: 'Cultural',
    description: 'The cultural conditions that make FDE sustainable over time',
    questions: [
      {
        q: 'Is your organization capable of Auftragstaktik: setting a high-level mission and leaving all other decisions to people in the field?',
        hint: 'Most organizations say they want field autonomy and then, the first time a field team builds something off-roadmap, reassert central control. Genuine Auftragstaktik is rare.',
      },
      {
        q: 'Can you look at overlapping, duplicating field efforts with gratitude for the learning rather than frustration at the waste?',
        hint: 'Multiple teams will build versions of the same solution simultaneously. Many will fail. This is the research cost of field-driven product discovery. If it looks like waste, the model will be shut down.',
      },
      {
        q: 'Are you building a platform designed for extensibility, with a clear architecture separating field-built extensions from the core?',
        hint: 'FDE only works if field innovations can migrate to the core cleanly. Without an extensible platform architecture, field builds are dead ends rather than product discoveries.',
      },
    ],
  },
]

function scoredRecommendation(yesCount: number): { label: string; tier: 'high' | 'medium' | 'low'; text: string; action: string } {
  if (yesCount >= 7) return {
    label: `${yesCount}/9: FDE may be worth exploring seriously`,
    tier: 'high',
    text: 'The structural conditions for FDE appear to be in place. Study the Palantir model deeply, talk to practitioners who have run it, and consider piloting with one customer before committing. Be honest about the engineer profile you need.',
    action: 'Read McCardel\'s original writing on FDE (barry.ooo), then map your actual hiring pipeline against the engineer profile he describes.',
  }
  if (yesCount >= 4) return {
    label: `${yesCount}/9: FDE principles are partially applicable`,
    tier: 'medium',
    text: 'True FDE is probably not the right model for your context, but FDE-inspired practices can meaningfully improve your product development. The Commitment Engineering and Embedded Product Team variants (Level 1) deliver much of FDE\'s core benefit without the full cost structure.',
    action: 'Identify which of the three FDE-inspired practices (deeper embedding, treating some deployments as R&D, or more field autonomy) would have the highest impact on your current innovation model.',
  }
  return {
    label: `${yesCount}/9: FDE is not the right model for your context`,
    tier: 'low',
    text: 'This is the most common and entirely respectable result. FDE is designed for a narrow set of contexts and is wrong for most organizations. But your current model\'s limitations may still draw on FDE-inspired practices, just at a much lower commitment level.',
    action: 'Start with Commitment Engineering: identify three high-trust customers who would share unfiltered feedback in exchange for early access to your product thinking. That alone is more proximity than most product teams have.',
  }
}

type Answers = (boolean | null)[][]

export default function FDEDiagnostic() {
  const [answers, setAnswers] = useState<Answers>(
    GROUPS.map((g) => Array(g.questions.length).fill(null))
  )
  const prefersReduced = useReducedMotion()

  const totalAnswered = answers.flat().filter((a) => a !== null).length
  const totalYes = answers.flat().filter((a) => a === true).length
  const allAnswered = totalAnswered === 9
  const result = allAnswered ? scoredRecommendation(totalYes) : null

  function toggle(groupIdx: number, qIdx: number, val: boolean) {
    setAnswers((prev) => {
      const next = prev.map((g) => [...g])
      next[groupIdx][qIdx] = prev[groupIdx][qIdx] === val ? null : val
      return next
    })
  }

  return (
    <div>
      {/* Intro */}
      <p className="text-base mb-space-8 max-w-prose mx-auto px-6 md:px-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
        Answer nine questions across three groups to find out whether any version of FDE applies to your
        context. Be honest. The diagnostic is a decision tool, not a compatibility test.
      </p>

      {/* Question groups */}
      <div className="space-y-space-8">
        {GROUPS.map((group, gi) => {
          const groupAnswered = answers[gi].filter((a) => a !== null).length
          const groupYes = answers[gi].filter((a) => a === true).length
          return (
            <div key={group.label}>
              <div className="flex items-center gap-space-4 mb-space-5">
                <span
                  className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full"
                  style={{ color: `${BRICK_TEXT}0.85)`, background: `${BRICK}0.10)`, border: `1px solid ${BRICK}0.20)` }}
                >
                  {group.label}
                </span>
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>{group.description}</p>
                {groupAnswered > 0 && (
                  <span className="font-mono text-xs ml-auto" style={{ color: `${BRICK_TEXT}0.85)` }}>
                    {groupYes}/{group.questions.length}
                  </span>
                )}
              </div>

              <div className="space-y-space-3">
                {group.questions.map((item, qi) => {
                  const ans = answers[gi][qi]
                  return (
                    <div
                      key={qi}
                      className="rounded-lg p-space-4"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <p className="text-sm font-semibold mb-space-1" style={{ color: ans !== null ? '#fff' : 'rgba(255,255,255,0.75)' }}>
                        {item.q}
                      </p>
                      <p className="text-xs mb-space-3" style={{ color: 'rgba(255,255,255,0.30)' }}>{item.hint}</p>
                      <div className="flex gap-space-2">
                        {[true, false].map((val) => (
                          <button
                            key={String(val)}
                            type="button"
                            onClick={() => toggle(gi, qi, val)}
                            className="px-space-4 py-space-2 rounded text-xs font-semibold transition-all duration-200"
                            style={{
                              background: ans === val
                                ? val ? `${BRICK}0.35)` : 'rgba(255,255,255,0.10)'
                                : 'rgba(255,255,255,0.05)',
                              border: `1px solid ${ans === val
                                ? val ? `${BRICK}0.60)` : 'rgba(255,255,255,0.25)'
                                : 'rgba(255,255,255,0.08)'}`,
                              color: ans === val ? '#fff' : 'rgba(255,255,255,0.40)',
                            }}
                          >
                            {val ? 'Yes' : 'No'}
                          </button>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress */}
      {!allAnswered && totalAnswered > 0 && (
        <p className="mt-space-6 text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>
          {9 - totalAnswered} question{9 - totalAnswered !== 1 ? 's' : ''} remaining
        </p>
      )}

      {/* Result */}
      <AnimatePresence>
        {allAnswered && result && (
          <motion.div
            initial={prefersReduced ? {} : { opacity: 0, y: 10 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-space-8 rounded-2xl p-space-7"
            style={{
              background: result.tier === 'high' ? `${BRICK}0.15)` : 'rgba(255,255,255,0.05)',
              border: `1px solid ${result.tier === 'high' ? `${BRICK}0.40)` : 'rgba(255,255,255,0.12)'}`,
            }}
          >
            <div className="flex items-center gap-space-3 mb-space-4">
              <span
                className="font-mono text-2xs uppercase tracking-widest px-space-3 py-space-1 rounded-full font-semibold"
                style={{
                  background: result.tier === 'high' ? `${BRICK}0.25)` : 'rgba(255,255,255,0.08)',
                  color: result.tier === 'high' ? '#fff' : 'rgba(255,255,255,0.50)',
                }}
              >
                {result.label}
              </span>
            </div>
            <p className="text-base leading-relaxed mb-space-5" style={{ color: '#FAFAFA' }}>
              {result.text}
            </p>
            <div
              className="rounded-lg px-space-5 py-space-4"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-mono text-2xs uppercase tracking-widest mb-space-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                Where to start
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {result.action}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FDE-inspired practices for everyone */}
      <div className="mt-space-10">
        <p className="font-mono text-2xs uppercase tracking-widest mb-space-6" style={{ color: 'rgba(255,255,255,0.35)' }}>
          What FDE teaches every innovation team
        </p>
        <div className="grid md:grid-cols-3 gap-space-4">
          {[
            {
              title: 'Embed more deeply',
              body: 'Whatever your current level of customer proximity, it is probably not enough. Quarterly business reviews and annual user research are not substitutes for genuine embeddedness. Even a few days per quarter of engineers working side by side with customers in their actual environment produces dramatically better product instincts.',
            },
            {
              title: 'Treat some deployments as R&D',
              body: 'The pressure to make every customer interaction margin-positive prevents organizations from learning what a more generously structured field engagement would teach them. Some customer deployments should be structured as learning investments, not revenue events.',
            },
            {
              title: 'Give field teams more autonomy',
              body: 'The organizational instinct to centralize product decisions is understandable and often counterproductive. Teams closest to the customer problem are often better positioned to make the right product decision than teams working from a distance with a filtered, translated version of the problem.',
            },
          ].map(({ title, body }) => (
            <div
              key={title}
              className="rounded-xl p-space-6"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-semibold text-sm mb-space-3" style={{ color: '#FAFAFA' }}>{title}</p>
              <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

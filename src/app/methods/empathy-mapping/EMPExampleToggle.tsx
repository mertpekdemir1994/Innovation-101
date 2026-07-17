'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY   = 'rgba(31,58,95,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional Empathy Mapping' },
  { id: 'ai',          label: 'With AI Assistance' },
]

export default function EMPExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            style={{
              background: tab === t.id ? `${NAVY}0.85)` : 'transparent',
              color: tab === t.id ? '#fff' : `${NAVY}0.70)`,
              border: `1.5px solid ${tab === t.id ? `${NAVY}0.70)` : `${NAVY}0.30)`}`,
            }}
            aria-pressed={tab === t.id}
          >{t.label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'traditional' ? (
          <motion.div
            key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
          >
            {/* Scenario */}
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.18)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >Scenario</p>
              <p
                className="font-semibold mb-2"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
              >Designing a retirement-planning tool for people in their early thirties</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                A financial-services team has run depth interviews with their target user: a 32-year-old professional who uses the product intermittently and has never seriously engaged with retirement planning. The team builds an empathy map from the interview evidence. The goal is a shared understanding of this person before ideation begins.
              </p>
            </div>

            {/* The four quadrants — what the team found */}
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  label: 'SAYS',
                  isObservable: true,
                  entries: [
                    '"I know I should be saving more for retirement."',
                    '"I\'m pretty responsible with my money day-to-day."',
                    '"I\'ll properly sort out my pension contributions next year."',
                  ],
                  note: 'Direct quotes from the interview. Stated with confidence and no apparent discomfort.',
                },
                {
                  label: 'THINKS',
                  isObservable: false,
                  entries: [
                    '"Retirement is so far away I can\'t really picture it."',
                    '"I don\'t really understand how the pension numbers work."',
                    '"Other things — rent, travel, saving for a house — feel more real."',
                  ],
                  note: 'Inferred from the texture of the conversation — what the person circled around without stating directly.',
                },
                {
                  label: 'DOES',
                  isObservable: true,
                  entries: [
                    'Avoids opening retirement account statements when they arrive.',
                    'Has not increased contributions in three years despite two pay rises.',
                    'Opens the planning tool occasionally, looks at the dashboard, closes it without acting.',
                  ],
                  note: 'Observed behavior from behavioral data and self-reported behavior confirmed by interview detail.',
                },
                {
                  label: 'FEELS',
                  isObservable: false,
                  entries: [
                    'Quiet shame whenever retirement comes up — a feeling of already being behind.',
                    'Genuine anxiety when confronted with pension numbers she doesn\'t understand.',
                    'A background sense of failure that she rarely names, and doesn\'t mention in the interview.',
                  ],
                  note: 'Carefully inferred from tone, hesitation, what was avoided, and the emotional register of the conversation.',
                },
              ].map(({ label, isObservable, entries, note }) => (
                <div
                  key={label}
                  className="rounded-lg p-4"
                  style={{
                    background: label === 'FEELS' ? `${NAVY}0.06)` : 'var(--color-neutral-50)',
                    border: label === 'FEELS'
                      ? `1px solid ${NAVY}0.20)`
                      : '1px solid var(--color-neutral-100)',
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <p
                      className="font-mono uppercase tracking-widest"
                      style={{
                        fontSize: 'var(--text-2xs)',
                        color: label === 'FEELS' ? `${NAVY}0.70)` : 'var(--color-neutral-400)',
                        fontWeight: label === 'FEELS' ? 600 : 400,
                      }}
                    >{label}</p>
                    <span
                      className="font-mono uppercase tracking-widest"
                      style={{
                        fontSize: 'var(--text-2xs)',
                        color: isObservable ? 'var(--color-neutral-400)' : `${NAVY}0.55)`,
                      }}
                    >{isObservable ? 'OBSERVED' : 'INFERRED'}</span>
                  </div>
                  <ul className="flex flex-col gap-1.5 mb-3">
                    {entries.map((e, i) => (
                      <li key={i} className="flex gap-2">
                        <span style={{ color: label === 'FEELS' ? `${NAVY}0.55)` : 'var(--color-neutral-400)', flexShrink: 0, marginTop: 1 }}>—</span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                          {e}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p
                    className="italic"
                    style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}
                  >{note}</p>
                </div>
              ))}
            </div>

            {/* The insight */}
            <div
              className="rounded-xl p-6 mb-4"
              style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.22)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >The Says-vs-Does gap — and what it revealed</p>
              <p
                className="font-semibold mb-3"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', lineHeight: 1.35 }}
              >
                SAYS: &ldquo;I know I should save more.&rdquo; DOES: avoids everything to do with it. FEELS: quiet shame that makes every interaction feel like a reminder of failure.
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The contradiction between SAYS and DOES was stark — but it was FEELS that explained it. The user was not failing to save because she lacked information. She already knew what she should do. She was failing to save because every interaction with retirement planning made her feel like she was confronting evidence of her own inadequacy — and she avoided it the way one avoids anything painful. The insight reframed the product entirely: the problem was not a lack of information; it was a shame loop that made engagement feel worse than avoidance. The design pivoted from providing more data to making progress feel achievable and non-threatening. The opening screen changed from a projected retirement balance (the number that felt like an accusation) to a small, completable step that felt like winning rather than losing.
              </p>
            </div>

            <div
              className="rounded-lg p-5"
              style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
              >What made this possible</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The insight came from reading across the quadrants, not from any single one. SAYS and DOES in isolation looked like a simple consistency problem. FEELS, carefully filled from the emotional register of the interview rather than from the words the person used, explained the contradiction. The team spent twice as long on FEELS as on the other three quadrants combined — and that time produced the reframing insight the design pivoted on.
              </p>
            </div>
          </motion.div>

        ) : (
          <motion.div
            key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
          >
            {/* AI scenario */}
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}
              >Same scenario — AI assistance applied</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The same interview transcripts are fed to AI. The AI is asked to complete an empathy map for the user described in the research. The output arrives in seconds.
              </p>
            </div>

            {/* AI-generated quadrants */}
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {[
                {
                  label: 'SAYS',
                  quality: 'ACCURATE',
                  entries: [
                    '"I know I should be saving more for retirement."',
                    '"I\'m pretty responsible with my money."',
                    '"I\'ll sort out my pension contributions next year."',
                  ],
                  verdict: 'AI accurately extracted the direct quotes from the transcript. Fast, correct, no meaningful loss.',
                },
                {
                  label: 'THINKS',
                  quality: 'SURFACE-LEVEL',
                  entries: [
                    'Perceives retirement as a distant, non-urgent concern.',
                    'Expresses limited understanding of pension mechanisms.',
                    'Prioritizes present-day financial goals over long-term planning.',
                  ],
                  verdict: "AI paraphrased the user's stated beliefs accurately. Correct but not deeper than what the person said aloud — the tacit assumptions that didn't surface verbally are absent.",
                },
                {
                  label: 'DOES',
                  quality: 'ACCURATE',
                  entries: [
                    'Does not regularly engage with retirement account communications.',
                    'Has maintained static pension contributions over multiple years.',
                    'Opens the planning tool periodically but does not take action.',
                  ],
                  verdict: "AI accurately captured the behavioral description from the transcript. Correct and reliable — these were explicitly stated behaviors.",
                },
                {
                  label: 'FEELS',
                  quality: 'FLATTENED',
                  entries: [
                    'Feels frustrated when thinking about retirement planning.',
                    '"Expressed uncertainty" about financial decisions.',
                    'Seems concerned about long-term financial security.',
                  ],
                  verdict: 'AI extracted the emotion words the person used ("frustrated," "unsure") and inferred "concern" from context. It missed the deeper, un-stated emotional truth — the quiet shame and sense of failure — because those emotions were never named outright.',
                },
              ].map(({ label, quality, entries, verdict }) => (
                <div
                  key={label}
                  className="rounded-lg overflow-hidden"
                  style={{ border: `1px solid ${INDIGO}0.16)` }}
                >
                  <div
                    className="px-4 py-3 flex items-center justify-between gap-3"
                    style={{ background: `${INDIGO}0.08)`, borderBottom: `1px solid ${INDIGO}0.10)` }}
                  >
                    <p
                      className="font-mono uppercase tracking-widest"
                      style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-900)' }}
                    >{label}</p>
                    <span
                      className="font-mono uppercase tracking-widest"
                      style={{
                        fontSize: 'var(--text-2xs)',
                        color: quality === 'ACCURATE'
                          ? `${INDIGO}0.65)`
                          : quality === 'SURFACE-LEVEL'
                          ? 'rgba(245,158,11,0.65)'
                          : 'rgba(239,68,68,0.65)',
                      }}
                    >{quality}</span>
                  </div>
                  <div className="p-4">
                    <ul className="flex flex-col gap-1.5 mb-3">
                      {entries.map((e, i) => (
                        <li key={i} className="flex gap-2">
                          <span style={{ color: `${INDIGO}0.50)`, flexShrink: 0, marginTop: 1 }}>—</span>
                          <span
                            style={{
                              fontSize: 'var(--text-xs)',
                              color: 'var(--color-neutral-600)',
                              lineHeight: 'var(--leading-relaxed)',
                              opacity: label === 'FEELS' ? 0.85 : 1,
                            }}
                          >{e}</span>
                        </li>
                      ))}
                    </ul>
                    <p
                      className="italic"
                      style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}
                    >{verdict}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* What the AI missed */}
            <div
              className="rounded-xl p-6 mb-4"
              style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.18)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >The insight the AI map could not produce</p>
              <p
                className="font-semibold mb-2"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', lineHeight: 1.35 }}
              >
                The AI map showed SAYS and DOES as neutral data points sitting side by side. It did not make the interpretive leap: that the contradiction between them, explained by shame, was the entire insight.
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                A team working from the AI map would have seen a user who was &ldquo;frustrated and uncertain&rdquo; about retirement. They would very likely have built a tool with better information, clearer charts, simpler explanations — exactly the wrong solution. The FEELS quadrant said &ldquo;frustrated,&rdquo; which points to communication design. The real FEELS entry — quiet shame and a sense of failure — points to emotional experience design. The difference between those two design directions is the difference between a tool the user will open and one she will continue to avoid.
              </p>
            </div>

            {/* Synthesis */}
            <div
              className="rounded-xl p-5"
              style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.22)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >What this tells you about AI + empathy mapping</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI assembled SAYS and DOES quickly and correctly — genuinely useful for handling a large transcript corpus. But the method&rsquo;s value lives in FEELS and in the human interpretation of the gap between SAYS and DOES. Both of those require a reading of the emotional register that AI can not do: the inference of what someone did not say, from how they said everything else. The strongest practice uses AI for the observable quadrants and reserves the inferred ones for human judgment.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

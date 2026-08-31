'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const AMBER = 'rgba(245,158,11,'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional 5Es Workshop' },
  { id: 'ai',          label: 'With AI Assistance' },
]

export default function FiveEsExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div>
      {/* Tab buttons */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {TABS.map(t => (
          <button key={t.id}
            onClick={() => setTab(t.id)}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            style={{
              background: tab === t.id ? `${TEAL}0.85)` : 'transparent',
              color: tab === t.id ? '#fff' : `${TEAL}0.70)`,
              border: `1.5px solid ${tab === t.id ? `${TEAL}0.70)` : `${TEAL}0.30)`}`,
            }}
            aria-pressed={tab === t.id}
          >{t.label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'traditional' ? (
          <motion.div key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
          >
            <div className="rounded-xl p-6 mb-6"
              style={{ background: `${TEAL}0.06)`, border: `1px solid ${TEAL}0.18)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.65)` }}
              >Scenario</p>
              <p className="font-semibold mb-2"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
              >Altitude Fitness: boutique cycling studio, three locations</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The studio has excellent retention among riders who make it past their first three classes. The problem is that fewer than 40% of first-time visitors come back for a second class. Management has focused its energy on instructor quality and class programming: the Engage phase. The 5Es workshop is commissioned to find out what is actually driving the drop-off.
              </p>
            </div>

            {/* Phase-by-phase findings */}
            <div className="space-y-4">
              {[
                {
                  phase: 'ENTICE',
                  bookend: true,
                  finding: 'The studio&rsquo;s Instagram is aspirational: serious athletes mid-sprint. First-timers see it and assume the classes are too advanced for them. The promise attracts experienced riders and deters everyone else. Three people in the workshop were almost put off by the feed before they ever booked.',
                  status: 'PROBLEM FOUND',
                },
                {
                  phase: 'ENTER',
                  bookend: false,
                  finding: 'The check-in area is unmanned for the first five minutes of arrival. First-timers stand at the door, unsure whether to walk in, where to leave their bag, or whether their bike is set up correctly. Two workshop participants describe feeling embarrassed to ask, so they guessed. One set up her bike wrong and spent the first fifteen minutes in discomfort.',
                  status: 'PROBLEM FOUND',
                },
                {
                  phase: 'ENGAGE',
                  bookend: false,
                  finding: 'Instructors are excellent. Energy is high. The class itself scores consistently well in post-visit surveys. This is where the studio&rsquo;s investment has gone, and it shows. No significant problems found here.',
                  status: 'WELL DESIGNED',
                },
                {
                  phase: 'EXIT',
                  bookend: true,
                  finding: 'When the class ends, the instructor immediately leaves to set up the next session. First-timers are left on their bikes with no closing moment: no cool-down ritual, no acknowledgement that they finished. Three participants said the experience &ldquo;just stopped.&rdquo; The last impression is awkward and uncelebrated.',
                  status: 'PROBLEM FOUND',
                },
                {
                  phase: 'EXTEND',
                  bookend: true,
                  finding: 'After the first visit, nothing happens. No welcome message. No sequence that acknowledges the difficulty of the first class. No community touchpoint between classes. The studio has a strong community for regulars, but first-timers are invisible to it. This is the most neglected phase. It has never been designed.',
                  status: 'NOT DESIGNED',
                },
              ].map(item => (
                <div key={item.phase}
                  className="rounded-lg p-5"
                  style={{
                    background: item.bookend ? `${AMBER}0.04)` : `${TEAL}0.04)`,
                    border: `1px solid ${item.bookend ? `${AMBER}0.15)` : `${TEAL}0.12)`}`,
                  }}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <p className="font-mono uppercase tracking-widest"
                      style={{
                        fontSize: 'var(--text-2xs)',
                        color: item.bookend ? `${AMBER}0.80)` : `${TEAL}0.75)`,
                      }}
                    >{item.phase}</p>
                    <span className="font-mono uppercase tracking-widest shrink-0"
                      style={{
                        fontSize: 'var(--text-2xs)',
                        color: item.status === 'WELL DESIGNED'
                          ? `${TEAL}0.65)`
                          : item.status === 'NOT DESIGNED'
                          ? 'var(--color-neutral-400)'
                          : `${AMBER}0.70)`,
                      }}
                    >{item.status}</span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                    dangerouslySetInnerHTML={{ __html: item.finding }}
                  />
                </div>
              ))}
            </div>

            <div className="rounded-xl p-6 mt-6"
              style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.22)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}
              >What the workshop found</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The drop-off problem is not in the class. It is in everything surrounding it. Four of the five phases had been neglected because the team had never formally looked at them. The workshop identified specific interventions for Enter, Exit, and Extend that cost almost nothing to implement: a greeter for the first five minutes, a 30-second closing acknowledgement by the instructor, and a three-email welcome sequence for first-timers. None of these required new programming or facilities investment.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease }}
          >
            <div className="rounded-xl p-6 mb-6"
              style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.20)' }}
            >
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(99,102,241,0.70)' }}
              >Same scenario: AI assistance applied</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                Before the workshop, the team feeds AI the studio&rsquo;s post-visit survey data, class attendance logs, Google reviews, and booking flow analytics. They ask for a 5Es analysis.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {[
                {
                  phase: 'ENTICE',
                  bookend: true,
                  aiRead: 'AI notes that Google reviews mention &ldquo;great for all levels&rdquo; and &ldquo;welcoming to beginners,&rdquo; suggesting the Entice phase is functioning well. It flags a mild keyword inconsistency between landing page copy and review language, but rates Entice as low risk.',
                  actualRead: 'The workshop finds the opposite: the Instagram channel (not tracked in any system) is the primary acquisition touchpoint and it actively deters beginners. AI had no access to the visual identity.',
                  confidence: 'LOW',
                },
                {
                  phase: 'ENTER',
                  bookend: false,
                  aiRead: 'AI has no data on the Enter phase. The booking system confirms arrival, but no event fires until the class starts. AI leaves a note: &ldquo;insufficient data for this phase, recommend observation.&rdquo; A correct but unhelpful response.',
                  actualRead: 'The unmanned check-in area and bike setup confusion are the most emotionally costly problems found in the workshop. AI pointed to the gap but could not fill it.',
                  confidence: 'NONE',
                },
                {
                  phase: 'ENGAGE',
                  bookend: false,
                  aiRead: 'AI produces a thorough analysis: NPS = 78 (benchmark: 65), instructor ratings 4.8/5, class completion rate 96%, low mid-session dropout. It identifies two class types with slightly lower completion and flags them for review. Genuinely useful output.',
                  actualRead: 'AI and the workshop agree: Engage is the strongest phase. AI got here faster and with more statistical precision.',
                  confidence: 'HIGH',
                },
                {
                  phase: 'EXIT',
                  bookend: true,
                  aiRead: 'Post-class survey response rate is 34%. AI analyzes responses and finds nothing notable: ratings are slightly lower than mid-class ratings but within normal range. It concludes the Exit phase needs no attention.',
                  actualRead: 'The 66% who do not complete the post-class survey are the first-timers who felt the class &ldquo;just stopped.&rdquo; AI is reading the signal from people who stayed; it has no signal from people who left awkwardly.',
                  confidence: 'LOW',
                },
                {
                  phase: 'EXTEND',
                  bookend: true,
                  aiRead: 'AI analyzes email open rates and finds a 15% open rate on the single post-visit email, below category benchmark. It recommends A/B testing subject lines. No other Extend analysis offered because there is no other Extend data.',
                  actualRead: 'The entire Extend phase is undesigned. AI&rsquo;s recommendation is to optimize a single email rather than design the phase. The workshop creates three new Extend touchpoints; the email is the least important of them.',
                  confidence: 'LOW',
                },
              ].map(item => (
                <div key={item.phase}
                  className="rounded-lg overflow-hidden"
                  style={{ border: `1px solid rgba(99,102,241,0.16)` }}
                >
                  <div className="px-5 py-3"
                    style={{ background: 'rgba(99,102,241,0.08)', borderBottom: '1px solid rgba(99,102,241,0.10)' }}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-mono uppercase tracking-widest"
                        style={{
                          fontSize: 'var(--text-2xs)',
                          color: item.bookend ? `${AMBER}0.70)` : `${TEAL}0.70)`,
                        }}
                      >{item.phase}</p>
                      <span className="font-mono uppercase tracking-widest"
                        style={{
                          fontSize: 'var(--text-2xs)',
                          color: item.confidence === 'HIGH'
                            ? 'rgba(99,102,241,0.72)'
                            : item.confidence === 'NONE'
                            ? 'var(--color-neutral-400)'
                            : `${AMBER}0.70)`,
                        }}
                      >AI confidence: {item.confidence}</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                    <div className="p-4">
                      <p className="font-semibold mb-1.5" style={{ fontSize: 'var(--text-xs)', color: 'rgba(99,102,241,0.70)' }}>
                        What AI reported
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                        dangerouslySetInnerHTML={{ __html: item.aiRead }}
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-semibold mb-1.5" style={{ fontSize: 'var(--text-xs)', color: `${TEAL}0.65)` }}>
                        What the workshop found
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                        dangerouslySetInnerHTML={{ __html: item.actualRead }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl p-6"
              style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.22)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}
              >What this tells you about AI + the 5Es</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI did genuinely useful work on Engage: fast, precise, better than a manual data pull. Its mistake was not in what it found; it was in what it failed to flag as unknown. The bookend phases came back with confident-sounding analysis built on thin or missing signals. That false confidence is the hazard. Use AI to cover Engage thoroughly, and treat any AI output on the bookends as a placeholder that tells you where to look, not what you will find.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

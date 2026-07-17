'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const INDIGO = 'rgba(99,102,241,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'Spotify wants to understand how people actually use music throughout their day. Retrospective interviews keep producing the same generic answers: "I listen when I work out, I listen in the car, I listen while I cook." The team needs the real, in-the-moment, over-time picture. Both versions pursue the same understanding; only the method differs.'

export default function DSExampleToggle() {
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
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${SAGE}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t
                ? t === 'ai' ? `${INDIGO}0.35)` : `${SAGE}0.35)`
                : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO}1)` : `${SAGE}1)`
                : 'var(--color-neutral-600)',
            }}
          >
            {t === 'traditional' ? 'Human-led diary study' : 'With AI'}
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
            {/* The study */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>The study: two weeks of in-the-moment logging</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The team ran a two-week diary study. Participants logged what they listened to, when, where, and
                &mdash; crucially &mdash; how they felt and what they were doing at that precise moment. Not a daily
                summary. Not a weekly reflection. The moment, captured in the moment, as their real days unfolded.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The logging was deliberately low-friction: a quick message, a voice note, a photo of the
                context. The goal was to catch the instant before it passed and before the participant had a
                chance to edit their memory of it.
              </p>
            </div>

            {/* What the entries revealed */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>What the accumulated entries revealed</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The entries told a story no interview had. Retrospective interviews produced flat, genre-based
                answers because people summarized their listening by category and occasion. But the in-the-moment
                entries, piling up across two weeks, showed something different.
              </p>
              <div className="space-y-3">
                {[
                  {
                    finding: 'Music consumption was driven by context and mood, not genre',
                    detail: 'The same person wanted completely different music for focusing, for commuting, for cooking, for winding down. The entries showed this clearly, moment by moment. It was not that they liked different genres — it was that different contexts required different emotional states, and the music was doing emotional work, not aesthetic work.',
                  },
                  {
                    finding: 'Recurring friction: the moment of choosing',
                    detail: 'Across many entries, the same pattern surfaced. Whenever a context changed — finishing the commute and sitting down to work, or moving from cooking to eating — there was friction. The participant had to stop and choose. Entries logged this as a felt interruption: "had to switch, spent 4 minutes looking," "couldn\'t find what I wanted, just put on something." That friction appeared in interview data as nothing at all.',
                  },
                  {
                    finding: 'The pattern was invisible in any single entry',
                    detail: 'No individual entry said "the problem is context transitions." But across fifty entries over two weeks, the pattern was unmistakable: the context-mood coupling was tight, the friction of choosing at transition points was real and recurring, and the genre library was the wrong unit entirely.',
                  },
                ].map(item => (
                  <div key={item.finding} className="rounded p-4"
                    style={{ background: `${SAGE}0.05)`, borderLeft: `2px solid ${SAGE}0.28)` }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: `${SAGE}0.88)` }}>
                      {item.finding}
                    </p>
                    <p className="text-xs text-neutral-700 leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* The insight and its consequence */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${SAGE}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${SAGE}1)` }}>What it changed</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-3">
                The diary study reframed Spotify from a library you search into a companion that knows what
                you need right now. Context-based and mood-based playlists, and the daily mixes that became
                central to the product, were directly informed by the longitudinal insight that music serves
                context and emotional need, not genre preference.
              </p>
              <div className="rounded p-4" style={{ background: `${SAGE}0.08)`, borderLeft: `2px solid ${SAGE}0.40)` }}>
                <p className="text-xs font-semibold mb-1" style={{ color: `${SAGE}0.85)` }}>
                  The insight lived in the accumulation
                </p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Every part of the insight &mdash; the context-mood coupling, the choosing-friction, the wrong
                  unit of genre &mdash; came from real people logging their actual listening, in the moment, over
                  time. None of it appeared in retrospective interviews. None of it could be reconstructed. It was
                  only visible once the entries accumulated and the pattern across them emerged.
                </p>
              </div>
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
            {/* Hypothetical notice */}
            <div className="rounded-lg px-4 py-3 border"
              style={{ background: `${INDIGO}0.05)`, borderColor: `${INDIGO}0.20)` }}>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <span className="font-semibold" style={{ color: `${INDIGO}0.80)` }}>Two paths:</span>{' '}
                The real Spotify research was human-led. This tab considers two ways AI might enter
                this scenario &mdash; one unsound (framed as a hypothetical), one genuinely useful.
              </p>
            </div>

            {/* Unsound path */}
            <div className="border rounded-lg p-5" style={{ borderColor: `rgba(245,158,11,0.25)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700">
                  The unsound path: skip the study and ask AI to simulate it
                </p>
                <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full text-amber-600 bg-amber-50 border border-amber-200">
                  hypothetical
                </span>
              </div>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                Imagine the team had skipped the real study and asked an AI to generate plausible diary entries
                from a synthetic Spotify participant &mdash; to simulate what a real study might find.
              </p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The output would have been fluent and reasonable. And hollow.
              </p>
              <div className="space-y-2 mb-4">
                {[
                  {
                    label: 'What the synthetic diary produced',
                    body: '"DAY 1: Listened to upbeat playlist during morning workout. DAY 3: Put on background music at work. DAY 5: Streamed a playlist on the commute." Genre-based, occasion-based, structured. The same categories the interviews gave. Because a model with no lived two weeks can only generate the plausible average.',
                  },
                  {
                    label: 'What was missing',
                    body: 'The context-mood friction that happened in real moments when the listening switched. The "spent 4 minutes looking for something that fit" that appeared 8 times across the real study. The repeated in-the-moment failure that no survey and no interview and no synthetic output ever shows — because it is precisely the kind of moment that disappears in retrospect.',
                  },
                  {
                    label: 'Why it would have misled',
                    body: 'A team working from synthetic diary entries would have confirmed their existing understanding: people listen by occasion, genre preference matters, the library needs more content. They would have built a better music library. Not Daily Mixes. Not Discover Weekly. The breakthrough insight — context and mood, not genre — was not in the average; it was in the real accumulated in-the-moment record.',
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
                A synthetic diary is fiction. It produces the plausible average with no lived experience behind it &mdash;
                exactly the confident, groundless output that defeats the purpose.
              </p>
            </div>

            {/* Sound path */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${INDIGO}0.90)` }}>The sound path: run the real study, use AI to strengthen it</p>
              <p className="text-sm text-neutral-700 leading-relaxed mb-4">
                The real two-week diary study runs with real participants. AI enters in two genuinely useful roles:
              </p>
              <div className="space-y-3 mb-4">
                {[
                  {
                    role: 'Supporting participation throughout',
                    detail: 'AI sends smart in-the-moment reminders timed to likely listening moments. When a participant logs something terse ("was commuting, music was fine"), AI follows up: "What were you listening to? How did it feel when you first sat down?" This lifts the quality and richness of entries &mdash; directly attacking the method\'s main failure mode of thin, dwindling participation. The entries remain real; AI helps them be fuller.',
                  },
                  {
                    role: 'Analyzing the accumulated real entries at scale',
                    detail: 'Across 12 participants logging for 2 weeks, the team might have 800–1,200 entries. AI clusters them by context, tags recurring emotional markers, and surfaces the longitudinal pattern &mdash; "context-friction-dropout appears in 61% of transition-moment entries" &mdash; faster than a team reading manually. This is pattern detection at a scale that human analysis would take days to achieve. It works because the entries are real.',
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
                    Richer, more sustained logging from real participants. Faster pattern detection across a
                    large real corpus. Both are genuine improvements to a study built on real lived experience.
                  </p>
                </div>
                <div className="rounded-lg border p-4 border-amber-200 bg-amber-50">
                  <p className="text-[10px] font-semibold uppercase tracking-widest text-amber-700 mb-2">
                    What stayed human
                  </p>
                  <p className="text-xs text-neutral-700 leading-relaxed">
                    The entries. The lived two weeks. The in-the-moment emotional record no one else could
                    produce. The insight still came entirely from real people living their real listening.
                    AI analyzed and supported &mdash; it did not substitute.
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

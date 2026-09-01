'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY  = 'rgba(31,58,95,'
const AMBER = 'rgba(245,158,11,'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional HMW Session' },
  { id: 'ai',          label: 'With AI Assistance' },
]

export default function HMWExampleToggle() {
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
              background: tab === t.id ? `${NAVY}0.88)` : 'transparent',
              color:      tab === t.id ? '#fff' : `${NAVY}0.70)`,
              border:     `1.5px solid ${tab === t.id ? `${NAVY}0.70)` : `${NAVY}0.28)`}`,
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
            {/* Scenario card */}
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.18)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >Scenario: UK Government &ldquo;Tell Us Once&rdquo;</p>
              <p
                className="font-semibold mb-2"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
              >
                Redesigning the process for notifying government after a death, 2012
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                When someone dies in the UK, the next of kin is required to separately notify a dozen or more government
                departments: HMRC, DWP, the Passport Office, DVLA, the local council, and more. Each notification is its
                own form, its own process, its own moment of administering bureaucracy while in grief. A government digital
                service team is commissioned to redesign it. The HMW session follows a round of in-depth interviews with
                bereaved people and with bereavement registrars.
              </p>
            </div>

            {/* Research findings */}
            <div className="mb-6">
              <p
                className="font-mono uppercase tracking-widest mb-4"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >What the research surfaced</p>

              <div className="space-y-3">
                {[
                  {
                    finding: 'The process asks people to navigate a bureaucratic labyrinth at the worst moment of their lives.',
                    who: 'Bereaved families',
                  },
                  {
                    finding: 'The feeling is not &ldquo;this is complicated.&rdquo; It is &ldquo;the system doesn&rsquo;t know I&rsquo;m a person.&rdquo;',
                    who: 'Bereaved families',
                  },
                  {
                    finding: 'Every separate notification resets the clock. You explain the death again. You re-enter the name, the date. You relive it with each new department.',
                    who: 'Bereaved families + registrars',
                  },
                  {
                    finding: 'Registrars describe their role as &ldquo;the one person the family trusts in the process&rdquo;, not an administrative function.',
                    who: 'Bereavement registrars',
                  },
                ].map(({ finding, who }, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-5"
                    style={{ background: `${NAVY}0.04)`, border: `1px solid ${NAVY}0.12)` }}
                  >
                    <p
                      className="font-mono uppercase tracking-widest mb-2"
                      style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.55)` }}
                    >{who}</p>
                    <p
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}
                      dangerouslySetInnerHTML={{ __html: finding }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* HMW questions generated */}
            <div className="mb-6">
              <p
                className="font-mono uppercase tracking-widest mb-4"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.65)` }}
              >HMW questions from the session</p>

              <div className="space-y-3">
                {[
                  {
                    question: 'How might we help bereaved people navigate their entitlements without having to understand the system?',
                    scope: 'good',
                    note: 'Correctly scoped. Specific to the problem. Opens many possible solutions.',
                  },
                  {
                    question: 'How might we reduce the number of separate government contacts a bereaved person has to make to zero?',
                    scope: 'good',
                    note: 'Ambitious but specific. Defines success clearly without mandating the solution.',
                  },
                  {
                    question: 'How might we make the government&rsquo;s response to a death feel like care rather than administration?',
                    scope: 'brave',
                    note: 'The brave reframe. Redefines what the service is for: not reducing steps, but communicating care. This became the guiding question for the &ldquo;Tell Us Once&rdquo; design work.',
                  },
                  {
                    question: 'How might we design a better form for notification?',
                    scope: 'narrow',
                    note: 'Too narrow. Already implies a form-based solution. Eliminated in the scope-calibration step.',
                  },
                ].map(({ question, scope, note }, i) => (
                  <div
                    key={i}
                    className="rounded-lg p-5"
                    style={{
                      background: scope === 'brave'
                        ? `${NAVY}0.08)`
                        : scope === 'narrow'
                          ? 'rgba(0,0,0,0.02)'
                          : `${NAVY}0.04)`,
                      border: `1px solid ${
                        scope === 'brave'
                          ? `${NAVY}0.22)`
                          : scope === 'narrow'
                            ? 'rgba(0,0,0,0.08)'
                            : `${NAVY}0.12)`
                      }`,
                    }}
                  >
                    <div className="flex items-start gap-3 mb-2 flex-wrap">
                      <p
                        className="font-semibold"
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: scope === 'brave'
                            ? `${NAVY}0.95)`
                            : scope === 'narrow'
                              ? 'var(--color-neutral-500)'
                              : 'var(--color-neutral-800)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                        dangerouslySetInnerHTML={{ __html: `&ldquo;${question}&rdquo;` }}
                      />
                      {scope === 'brave' && (
                        <span
                          className="font-mono uppercase tracking-widest shrink-0 px-2 py-0.5 rounded"
                          style={{
                            fontSize: 'var(--text-2xs)',
                            color: `${NAVY}0.80)`,
                            background: `${NAVY}0.12)`,
                          }}
                        >CHOSEN</span>
                      )}
                      {scope === 'narrow' && (
                        <span
                          className="font-mono uppercase tracking-widest shrink-0"
                          style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
                        >ELIMINATED</span>
                      )}
                    </div>
                    <p
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}
                      dangerouslySetInnerHTML={{ __html: note }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Outcome */}
            <div
              className="rounded-xl p-6"
              style={{ background: `${NAVY}0.08)`, border: `1px solid ${NAVY}0.22)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.70)` }}
              >What the HMW produced</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The chosen question (&ldquo;how might we make the government&rsquo;s response to a death feel like care
                rather than administration?&rdquo;) reframed the design challenge from reducing bureaucratic steps
                (a technical problem) to communicating care during grief (a human problem). Every design decision that
                followed (the language of letters, the tone of interactions, the single notification as a service
                rather than a form) was anchored to that reframe. The Tell Us Once service reduced notifications
                from twelve or more to one; the HMW ensured the team was designing for the bereaved person, not for
                administrative efficiency.
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
            {/* AI scenario card */}
            <div
              className="rounded-xl p-6 mb-6"
              style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.20)' }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(99,102,241,0.70)' }}
              >Same scenario: AI assistance applied</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The team gives AI the domain: a UK government service for notifying departments after a death.
                They ask it to generate How Might We questions. AI returns 20 questions in seconds.
              </p>
            </div>

            {/* AI-generated questions */}
            <div className="mb-6">
              <p
                className="font-mono uppercase tracking-widest mb-4"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(99,102,241,0.65)' }}
              >What AI generated</p>

              <div className="space-y-2 mb-6">
                {[
                  { q: 'How might we create a centralized notification portal?',             mark: 'EFFICIENCY' },
                  { q: 'How might we automate cross-department data synchronization?',        mark: 'EFFICIENCY' },
                  { q: 'How might we design a single online form for all departments?',       mark: 'EFFICIENCY' },
                  { q: 'How might we reduce the number of required form fields?',             mark: 'EFFICIENCY' },
                  { q: 'How might we provide real-time status updates on notifications?',     mark: 'EFFICIENCY' },
                  { q: 'How might we make the registration process mobile-friendly?',         mark: 'EFFICIENCY' },
                  { q: 'How might we integrate with existing government databases?',          mark: 'EFFICIENCY' },
                  { q: 'How might we offer multilingual support throughout?',                 mark: 'EFFICIENCY' },
                  { q: 'How might we automate document verification?',                        mark: 'EFFICIENCY' },
                  { q: 'How might we provide a checklist of required notifications?',         mark: 'EFFICIENCY' },
                ].map(({ q, mark }, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg px-4 py-3"
                    style={{ background: 'rgba(99,102,241,0.04)', border: '1px solid rgba(99,102,241,0.10)' }}
                  >
                    <span
                      className="font-mono uppercase tracking-widest shrink-0 mt-0.5"
                      style={{ fontSize: 'var(--text-2xs)', color: 'rgba(99,102,241,0.45)' }}
                    >{mark}</span>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>{q}</p>
                  </div>
                ))}
                <p
                  className="text-center"
                  style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}
                >+ 10 more questions, all efficiency-framed</p>
              </div>
            </div>

            {/* The gap: breakdown by dimension */}
            <div className="space-y-4 mb-6">
              {[
                {
                  dimension: 'What AI did well',
                  color: 'rgba(99,102,241,0.70)',
                  bg: 'rgba(99,102,241,0.06)',
                  border: 'rgba(99,102,241,0.16)',
                  body: 'AI quickly mapped the domain&rsquo;s surface: government departments, notification steps, form fields, portal design, automation. All valid. All coherent. It produced a useful starting set for the problem as the system defines it: administrative efficiency.',
                },
                {
                  dimension: 'What AI could not reach',
                  color: `${AMBER}0.80)`,
                  bg: `${AMBER}0.04)`,
                  border: `${AMBER}0.18)`,
                  body: 'Not one question reached: &ldquo;how might we make the government&rsquo;s response feel like care rather than administration?&rdquo; That reframe requires understanding that the person completing the process is in grief, that bureaucracy at that moment feels like being unknown, and that the design challenge is not &ldquo;reduce steps&rdquo; but &ldquo;communicate that you see the person.&rdquo; This knowledge lived in the interviews, not in any description of the domain.',
                },
                {
                  dimension: 'Why it matters',
                  color: 'var(--color-neutral-500)',
                  bg: 'var(--color-neutral-50)',
                  border: 'var(--color-neutral-100)',
                  body: 'The efficiency-framed questions would produce an efficient system. The care-framed question produced a different kind of service, one that begins with an acknowledgment of what the person is going through. The difference between the two is not a matter of domain knowledge. It is a matter of human insight into what the experience actually feels like from the inside, at the worst moment. AI cannot access that from a brief.',
                },
              ].map(({ dimension, color, bg, border, body }) => (
                <div
                  key={dimension}
                  className="rounded-lg p-5"
                  style={{ background: bg, border: `1px solid ${border}` }}
                >
                  <p
                    className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-sm)', color }}
                  >{dimension}</p>
                  <p
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                    dangerouslySetInnerHTML={{ __html: body }}
                  />
                </div>
              ))}
            </div>

            {/* AI synthesis */}
            <div
              className="rounded-xl p-6"
              style={{ background: `${NAVY}0.06)`, border: `1px solid ${NAVY}0.18)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.70)` }}
              >What this tells you about AI + HMW</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI is a fast starting set generator. Use it to get the obvious questions on the table quickly,
                freeing the team to go further. What AI cannot provide is the brave reframe: the question
                that changes what success means, not just how it is achieved. That reframe requires the emotional
                knowledge from the research: what the experience feels like, what the person actually needs versus
                what the system assumes they need. The best HMWs emerge from that gap. AI, reasoning from
                domain descriptions, is well-positioned to supply the obvious questions and poorly positioned to
                supply the reframing ones. Know the difference, and use each accordingly.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

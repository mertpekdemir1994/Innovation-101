'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const AMBER = 'rgba(245,158,11,'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional Ecosystem Mapping' },
  { id: 'ai',          label: 'With AI Assistance' },
]

export default function EMExampleToggle() {
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
              >A fast-growing short-term rental marketplace — mapping the ecosystem to find growth levers and head off threats</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The team&rsquo;s instinctive framing is a two-sided market: hosts on the supply side, guests on the demand side. The ecosystem mapping session is run to find out if the real system is more complicated than that — and where the leverage is.
              </p>
            </div>

            {/* Actors found */}
            <div className="mb-6">
              <p className="font-mono uppercase tracking-widest mb-4"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.65)` }}
              >The actors the map revealed</p>

              <div className="space-y-3">
                {[
                  {
                    actor: 'Hosts',
                    obvious: true,
                    finding: 'Primary supply-side actors. Listing quality is highly variable — and it becomes clear in the session that what separates high-booking hosts from low-booking hosts is not the properties themselves.',
                  },
                  {
                    actor: 'Guests',
                    obvious: true,
                    finding: 'Primary demand-side actors. Booking behavior and reviews are the visible output, but the map surfaces that what guests actually book on is a specific quality signal — one that leads directly to the photographer finding.',
                  },
                  {
                    actor: 'Payment Providers',
                    obvious: true,
                    finding: 'Standard infrastructure. Mapped and noted. Low insight here, as expected — but worth having explicit in case of a payment-related regulatory action.',
                  },
                  {
                    actor: 'Professional Photographers',
                    obvious: false,
                    finding: 'The breakthrough actor. Cross-referencing the map with actual booking data, the team found that listings with professional photography booked dramatically more than those without — a difference the two-sided framing had never surfaced. Photographers were a hidden value-creating actor whose service directly determined host success. This insight led directly to the platform offering professional photography as a service.',
                  },
                  {
                    actor: 'Cleaning Services & Co-host Managers',
                    obvious: false,
                    finding: 'An entire supporting operational economy had emerged around the platform. Cleaning services and co-host managers were the operational infrastructure that allowed hosts to scale — and the platform&rsquo;s supply side could only grow as fast as this layer could. It had never appeared in any product or growth conversation.',
                  },
                  {
                    actor: 'Local Regulators & Housing Authorities',
                    obvious: false,
                    finding: 'Peripheral on the map but existential in leverage. A local regulator who decided to restrict short-term rentals could effectively close a market. The mapping session forced an explicit conversation about regulatory relationships that had been treated as a legal department problem, not a strategic one.',
                  },
                  {
                    actor: 'Neighbors & Residential Communities',
                    obvious: false,
                    finding: 'The most surprising actor: the informal relationship between neighbors, community goodwill, and regulatory behavior. Neighbor hostility → organized community pressure → regulatory action was the causal chain. The trust-based, informal dynamic between neighbors and regulators was the invisible path from a property-level nuisance to a market-level shutdown. A neighbor strategy and a community relations program both followed directly from this finding.',
                  },
                ].map(item => (
                  <div key={item.actor}
                    className="rounded-lg p-5"
                    style={{
                      background: item.obvious ? `${TEAL}0.04)` : `${AMBER}0.04)`,
                      border: `1px solid ${item.obvious ? `${TEAL}0.12)` : `${AMBER}0.14)`}`,
                    }}
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <p className="font-semibold"
                        style={{ fontSize: 'var(--text-xs)', color: item.obvious ? `${TEAL}0.85)` : `${AMBER}0.85)` }}
                      >{item.actor}</p>
                      {!item.obvious && (
                        <span className="font-mono uppercase tracking-widest shrink-0"
                          style={{ fontSize: 'var(--text-2xs)', color: `${AMBER}0.60)` }}
                        >NON-OBVIOUS</span>
                      )}
                    </div>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                      {item.finding}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl p-6"
              style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.22)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}
              >What the ecosystem map produced</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The map turned &ldquo;we match hosts and guests&rdquo; into an understanding of the actual system the business depended on. Three strategic moves came directly from the hidden actors: a professional photography service (from the photographer actor), a co-host and cleaning ecosystem partnership program (from the service layer actor), and a neighbor and community relations strategy (from the neighbor-to-regulator causal chain). None of these would have emerged from the two-sided-market framing.
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
              >Same scenario — AI assistance applied</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                The same team gives the AI the domain — a short-term rental marketplace — and asks for an ecosystem map. The AI generates a draft quickly.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {[
                {
                  actor: 'Hosts, Guests, Platform, Payment Providers',
                  obvious: true,
                  aiRead: 'AI produces this layer cleanly and fast — the standard two-sided marketplace structure with payment infrastructure. Accurate, well-labeled, and a solid scaffold for the obvious actors and their primary flows.',
                  gap: 'This is the starting point, not the finding. The obvious actors were not where the strategic insight lived.',
                  confidence: 'HIGH',
                },
                {
                  actor: 'Professional Photographers',
                  obvious: false,
                  aiRead: 'Not surfaced as a significant actor. In the generic description of a rental marketplace, professional photographers are not a headline player. AI mentions photography as a listing quality factor, but does not identify photographers as a distinct, value-creating actor in the system.',
                  gap: 'This was the breakthrough insight in the traditional run — and it was specific to this business&rsquo;s real booking data, not the generic domain description. AI cannot surface a finding that lives in proprietary data rather than in common knowledge.',
                  confidence: 'MISSED',
                },
                {
                  actor: 'Cleaning Services & Co-host Managers',
                  obvious: false,
                  aiRead: 'Mentioned in passing as "operational service providers" without being identified as a systemic actor whose capacity constrains supply-side growth. Not positioned as a strategic factor in the map.',
                  gap: 'The supporting economy around the platform was invisible in the AI map — present in the real system but absent from the documented description of how such marketplaces work.',
                  confidence: 'LOW',
                },
                {
                  actor: 'Local Regulators',
                  obvious: false,
                  aiRead: 'Included but treated as background regulatory context rather than an existential actor with the power to close markets. Listed but not analyzed for leverage.',
                  gap: 'The regulatory actor was positioned correctly but its leverage — and the causal path from neighbors through community pressure to regulatory action — was not mapped.',
                  confidence: 'PARTIAL',
                },
                {
                  actor: 'Neighbors & Community',
                  obvious: false,
                  aiRead: 'Not included as an actor. The informal, trust-based relationship between neighbors and local regulatory behavior is not part of the documented structure of a rental marketplace. It appears in no dataset and in no standard description of the domain.',
                  gap: 'This was the invisible causal path that explained the platform&rsquo;s regulatory risk. AI cannot map a dynamic that is informal, trust-based, and rarely documented — which is exactly the description of the most consequential flows in most real ecosystems.',
                  confidence: 'MISSED',
                },
              ].map(item => (
                <div key={item.actor}
                  className="rounded-lg overflow-hidden"
                  style={{ border: `1px solid rgba(99,102,241,0.16)` }}
                >
                  <div className="px-5 py-3"
                    style={{ background: 'rgba(99,102,241,0.08)', borderBottom: '1px solid rgba(99,102,241,0.10)' }}
                  >
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <p className="font-semibold"
                        style={{
                          fontSize: 'var(--text-xs)',
                          color: item.obvious ? 'rgba(99,102,241,0.80)' : `${AMBER}0.75)`,
                        }}
                      >{item.actor}</p>
                      <span className="font-mono uppercase tracking-widest shrink-0"
                        style={{
                          fontSize: 'var(--text-2xs)',
                          color: item.confidence === 'HIGH'
                            ? 'rgba(99,102,241,0.72)'
                            : item.confidence === 'PARTIAL'
                            ? `${TEAL}0.65)`
                            : item.confidence === 'LOW'
                            ? `${AMBER}0.60)`
                            : 'var(--color-neutral-400)',
                        }}
                      >AI: {item.confidence}</span>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                    <div className="p-4">
                      <p className="font-semibold mb-1.5"
                        style={{ fontSize: 'var(--text-xs)', color: 'rgba(99,102,241,0.70)' }}
                      >What AI mapped</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item.aiRead}
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="font-semibold mb-1.5"
                        style={{ fontSize: 'var(--text-xs)', color: `${TEAL}0.65)` }}
                      >What the gap was</p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item.gap}
                      </p>
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
              >What this tells you about AI + ecosystem mapping</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                AI produced the visible ecosystem fast and gave a solid scaffold for the obvious structure. The distinctive value — the hidden photographer actor whose effect on bookings was specific to real data, and the informal neighbor dynamic that mapped the platform&rsquo;s regulatory risk — came from human system-knowledge and the deliberate search for what the common description omits. The strongest approach uses AI to assemble the visible actors quickly, then applies human inquiry specifically to find the non-obvious ones. Use AI as the scaffold; use the session to hunt what it cannot see.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

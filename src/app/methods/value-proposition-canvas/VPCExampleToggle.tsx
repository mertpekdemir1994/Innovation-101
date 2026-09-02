'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const INDIGO = 'rgba(99,102,241,'
// darker indigo for text on this light background — plain INDIGO can't
// reach 4.5:1 on white even at full opacity
const INDIGO_DARK = 'rgba(79,70,229,'

type Tab = 'traditional' | 'ai'

const SCENARIO = 'A ten-person startup with a feature-heavy project-management tool pitching to small creative agencies.'

export default function VPCExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const isAI = tab === 'ai'

  return (
    <div className="w-full">
      {/* Tab toggle */}
      <div className="flex gap-2 mb-6">
        {(['traditional', 'ai'] as Tab[]).map(t => (
          <button key={t} type="button" aria-pressed={tab === t} onClick={() => setTab(t)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tab === t
                ? t === 'ai' ? `${INDIGO}0.10)` : `${PLUM}0.10)`
                : 'transparent',
              border: `1px solid ${tab === t ? (t === 'ai' ? `${INDIGO}0.35)` : `${PLUM}0.35)`) : 'var(--color-neutral-100)'}`,
              color: tab === t
                ? t === 'ai' ? `${INDIGO_DARK}1)` : `${PLUM}1)`
                : 'var(--color-neutral-600)',
            }}
          >{t === 'traditional' ? 'Traditional Research' : 'With AI'}</button>
        ))}
      </div>

      {/* Scenario label */}
      <div className="rounded-lg px-4 py-3 mb-5"
        style={{ background: 'var(--color-neutral-100)' }}>
        <span className="text-2xs font-semibold uppercase tracking-widest text-neutral-500 mr-2">Scenario</span>
        <span className="text-sm text-neutral-600">{SCENARIO}</span>
      </div>

      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="traditional"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* Research findings */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.22)` }}>
              <p className="text-2xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: `${PLUM}1)` }}>What Research Surfaced</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { label: 'CUSTOMER JOBS', items: ['win and retain agency clients', 'keep projects moving without constant check-ins'] },
                  { label: 'EXTREME PAINS', items: ['email chains for client approvals eat billable hours', 'clients have no visibility without scheduling a call'] },
                  { label: 'DESIRED GAINS', items: ['clients see project status without needing a meeting', 'approvals in minutes, not days'] },
                ].map((col, i) => (
                  <div key={i} className="rounded p-3" style={{ background: `${PLUM}0.04)` }}>
                    <p className="text-2xs font-semibold uppercase tracking-wider mb-2 text-neutral-500">{col.label}</p>
                    {col.items.map((item, j) => (
                      <p key={j} className="text-xs text-neutral-700 leading-snug mb-1">&bull; {item}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas results: what fit, what didn't */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Fit connections */}
              <div className="border rounded-lg p-5" style={{ borderColor: `${PLUM}0.20)` }}>
                <p className="text-2xs font-semibold uppercase tracking-widest mb-3"
                  style={{ color: `${PLUM}1)` }}>Genuine Fit Found</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-semibold shrink-0 mt-0.5"
                      style={{ color: `${PLUM}0.90)` }}>✓</span>
                    <div>
                      <p className="text-xs font-semibold text-neutral-800">Custom report builder → client visibility</p>
                      <p className="text-xs text-neutral-500 mt-0.5">Agencies could share live status links, the only connection that held up to research.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gaps exposed */}
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-2xs font-semibold uppercase tracking-widest text-amber-700 mb-3">Gaps Exposed</p>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xs font-semibold uppercase tracking-wider text-amber-700 mb-1">Wasted features</p>
                    <p className="text-xs text-neutral-600">&bull; Multi-level permissions, no agency pain about permissions</p>
                    <p className="text-xs text-neutral-600">&bull; Granular audit logs, agencies do not care about audit trails</p>
                  </div>
                  <div>
                    <p className="text-2xs font-semibold uppercase tracking-wider text-amber-700 mb-1">Unmet extreme pain</p>
                    <p className="text-xs text-neutral-600">&bull; Email approval chains, nothing in the product addressed this at all</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Strategic outcome */}
            <div className="rounded-lg p-5 border"
              style={{ background: `${PLUM}0.06)`, borderColor: `${PLUM}0.18)` }}>
              <p className="text-2xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${PLUM}1)` }}>What Changed</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The team built a one-click client approval portal, the single feature that addressed the extreme pain. They dropped audit-log messaging from the agency pitch entirely. Within two quarters, agency conversion rate doubled. The gaps, not the fits, drove the strategy.
              </p>
            </div>
          </motion.div>

        ) : (
          <motion.div key="ai"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
            className="space-y-4">

            {/* AI-generated canvas */}
            <div className="border rounded-lg p-5" style={{ borderColor: `${INDIGO}0.22)` }}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xs font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO_DARK}0.90)` }}>AI-Generated Canvas</p>
                <span className="text-2xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ background: `${INDIGO}0.10)`, color: `${INDIGO_DARK}0.90)`, border: `1px solid ${INDIGO}0.25)` }}>
                  100% fit shown
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="rounded p-3" style={{ background: `${INDIGO}0.04)` }}>
                  <p className="text-2xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: `${INDIGO_DARK}0.90)` }}>AI Customer Profile (generated)</p>
                  {[
                    ['Jobs', 'manage projects efficiently, collaborate with teams'],
                    ['Pains', 'software complexity, collaboration challenges, onboarding friction'],
                    ['Gains', 'better team coordination, reporting visibility, time savings'],
                  ].map(([label, val], i) => (
                    <p key={i} className="text-xs text-neutral-600 mb-1">
                      <span className="font-semibold text-neutral-700">{label}: </span>{val}
                    </p>
                  ))}
                </div>
                <div className="rounded p-3" style={{ background: `${INDIGO}0.04)` }}>
                  <p className="text-2xs font-semibold uppercase tracking-wider mb-2"
                    style={{ color: `${INDIGO_DARK}0.90)` }}>AI-Drawn Connections</p>
                  {[
                    ['permissions', 'team coordination ✓ (AI)'],
                    ['audit logs', 'compliance tracking ✓ (AI)'],
                    ['custom reports', 'reporting visibility ✓'],
                  ].map(([f, t], i) => (
                    <p key={i} className="text-xs text-neutral-600 mb-1">{f} → {t}</p>
                  ))}
                  <p className="text-2xs mt-2 text-neutral-500">Zero gaps shown</p>
                </div>
              </div>
            </div>

            {/* What AI got right vs wrong */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-5 border-green-200 bg-green-50">
                <p className="text-2xs font-semibold uppercase tracking-widest text-green-700 mb-3">What AI Got Right</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  Custom reports connecting to reporting visibility was a real match. AI pattern-matched correctly here because it is a common SaaS association.
                </p>
              </div>
              <div className="border rounded-lg p-5 border-amber-200 bg-amber-50">
                <p className="text-2xs font-semibold uppercase tracking-widest text-amber-700 mb-3">What AI Missed</p>
                <p className="text-xs text-neutral-700 leading-relaxed">
                  The extreme pain (email approval chains consuming billable hours) never appeared. AI drew on generic SaaS vocabulary (&ldquo;software complexity&rdquo;, &ldquo;collaboration challenges&rdquo;) instead of the specific, researchable pain that agencies actually articulate.
                </p>
              </div>
            </div>

            {/* Why */}
            <div className="rounded-lg p-4 border" style={{ background: `${INDIGO}0.04)`, borderColor: `${INDIGO}0.18)` }}>
              <p className="text-2xs font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO_DARK}0.90)` }}>Why This Matters</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                The AI canvas looked cleaner and more complete. The research canvas looked messier and had obvious gaps. The messy one was the useful one. The gap (email approvals) became the product&rsquo;s most successful feature. AI had no way to surface it because it was not in pattern-matched SaaS training data.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'

type Tab = 'traditional' | 'ai'

const TABS: { id: Tab; label: string }[] = [
  { id: 'traditional', label: 'Traditional' },
  { id: 'ai',          label: 'With AI' },
]

const SCENARIO_HEADER = (
  <div
    className="rounded-xl p-5 mb-8"
    style={{ background: 'var(--color-warm-100)', border: '1px solid var(--color-neutral-200)' }}
  >
    <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
      Shared scenario
    </p>
    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      A mid-sized consumer electronics company has eleven active innovation initiatives and a leadership team that feels busy but somehow not bold. Growth is flat. The CEO suspects the portfolio is over-weighted toward safe incremental work but cannot prove it. Both versions below tackle the same portfolio; only the analysis method differs.
    </p>
  </div>
)

const CONTENT: Record<Tab, React.ReactNode> = {
  traditional: (
    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      <p className="mb-5">
        Leadership convened a half-day session. Before placing anything on the matrix, they agreed on concrete criteria for the two axes: what counted as an &ldquo;existing&rdquo; versus a &ldquo;new&rdquo; market, and an &ldquo;existing&rdquo; versus a &ldquo;new&rdquo; offering. Then they plotted all eleven initiatives, and crucially mapped the actual budget and headcount behind each, not just the project names.
      </p>
      <p className="mb-5">
        The picture was stark. Nine of the eleven initiatives, and roughly 88 percent of the innovation budget, sat in the core: faster chargers, a slightly thinner model, a cost-reduced variant. One initiative was adjacent. One was nominally transformational, but it had two people and almost no funding: a &ldquo;moonshot&rdquo; in name that was being quietly starved.
      </p>
      <p className="mb-5">
        Seeing 88 percent of the budget clustered in the bottom-left corner did what months of strategy discussion had not. The room could no longer tell itself it was an innovative company; the picture said otherwise. Leadership made two concrete decisions in that session: redirect a meaningful slice of the core budget to properly fund the starved transformational bet, and kill two redundant core projects that were improving the same product in overlapping ways.
      </p>
      <div className="rounded-lg p-5 mt-6" style={{ background: `${PLUM}0.06)`, borderLeft: `3px solid ${PLUM}0.40)` }}>
        <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.68)` }}>
          The insight
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--color-neutral-800)' }}>
          The matrix turned a vague unease into a specific, defensible reallocation. The CEO had suspected the portfolio was imbalanced; the matrix made the imbalance impossible to ignore and gave the team a shared picture to argue from rather than an opinion to argue about.
        </p>
      </div>
    </div>
  ),
  ai: (
    <div style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
      <p className="mb-5">
        The same company ran the same exercise with AI assistance layered onto the analysis. AI-assisted analytics modeled the expected returns of the nine core initiatives quickly and rigorously, work that would have taken the strategy team weeks. For the adjacent bet, AI-assisted market sizing generated useful scenario estimates that sharpened the opportunity picture.
      </p>
      <p className="mb-5">
        The AI analysis strengthened the core picture enormously: it could forecast the incremental returns of the charger and thin-model projects with real precision, and it confirmed that several core bets had genuinely strong, quantifiable near-term returns. For a skeptical board, the depth and speed of that analysis was genuinely convincing.
      </p>
      <p className="mb-5">
        But the tradeoff surfaced exactly where the matrix matters most. The AI could attach confident numbers to the core, modest-but-reasoned estimates to the adjacent bet, and almost nothing defensible to the transformational one, because no data exists for a market that does not yet exist. Read naively, the AI output made the safe core look even more attractive (precise, high-confidence returns) and the transformational bet look even less justifiable (no numbers, all uncertainty). A leadership team anchored on the AI&rsquo;s confidence could easily have concluded &ldquo;the data says fund the core,&rdquo; which is the precise trap the Ambition Matrix exists to prevent.
      </p>
      <div className="rounded-lg p-5 mt-6" style={{ background: 'rgba(99,102,241,0.04)', borderLeft: '3px solid rgba(99,102,241,0.38)' }}>
        <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(99,102,241,0.70)' }}>
          The honest readout
        </p>
        <p style={{ fontStyle: 'italic', color: 'var(--color-neutral-800)' }}>
          AI made the core and adjacent analysis faster and far more rigorous: genuine value. But the transformational decision, whether to protect a bet that data cannot yet justify, was exactly where AI offered least and where human conviction had to lead. The strongest version of this exercise used AI to sharpen assessment across every zone, then deliberately set aside AI&rsquo;s data-driven tilt toward the core to make the strategic call the data could not make: protect the bold bet anyway.
        </p>
      </div>
    </div>
  ),
}

export default function AMExampleToggle() {
  const [activeTab, setActiveTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()

  return (
    <div>
      {SCENARIO_HEADER}

      {/* Tab bar */}
      <div className="flex gap-2 mb-8" role="tablist" aria-label="Portfolio analysis approach">
        {TABS.map(({ id, label }) => {
          const active = activeTab === id
          return (
            <button
              key={id}
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(id)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-colors"
              style={{
                background: active ? 'var(--stage-strategy)' : 'var(--color-neutral-100)',
                color:      active ? '#fff' : 'var(--color-neutral-600)',
              }}
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          role="tabpanel"
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {CONTENT[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'
const AI_C = 'rgba(99,102,241,'

type Zone = 'core' | 'adjacent' | 'transformational'

// Grid geometry (matches AMEstablishing / AMInteractive)
const GX = 80, GY = 40, GW = 400, GH = 340
const GR = GX + GW, GB = GY + GH
const MX = GX + GW / 2, MY = GY + GH / 2

const ZONES: { id: Zone; label: string; cx: number; cy: number; rx: number; ry: number }[] = [
  { id: 'core',             label: 'CORE',            cx: 165, cy: 308, rx: 82, ry: 64 },
  { id: 'adjacent',         label: 'ADJACENT',         cx: 280, cy: 210, rx: 102, ry: 74 },
  { id: 'transformational', label: 'TRANSFORMATIONAL', cx: 394, cy: 112, rx: 82, ry: 62 },
]

const AI_NOTES: Record<Zone, { well: string; risks: string }> = {
  core: {
    well:  'AI-assisted analytics can model the expected return of incremental improvements, simulate pricing and efficiency changes, and surface optimization opportunities across a known business at a speed no analyst team could match. Where history is a good guide, AI is a strong guide.',
    risks: "AI's confidence is highest exactly where the upside is lowest. This can pull even more attention toward the safe core, reinforcing precisely the over-investment the Ambition Matrix exists to correct. Treat AI core analysis as a tool for rigour, not a reason to fund even more core.",
  },
  adjacent: {
    well:  'AI-assisted market sizing and scenario analysis help estimate the opportunity in a new-but-related market, model how a proven capability might transfer, and stress-test assumptions about an adjacent segment. Synthesizes analogous market data far faster than manual research.',
    risks: "Adjacency involves genuine novelty, so AI's estimates rest on analogies that may not hold. The scenarios feel data-grounded but need human judgment to sanity-check against what actually makes a market work, not just what made a similar market work.",
  },
  transformational: {
    well:  'AI can help explore possibility space, generate scenarios, and surface weak signals from adjacent domains, broadening the search for what a transformational bet could be before conviction is committed.',
    risks: "AI cannot forecast a market that has no precedent. A market that doesn't yet exist has no training data. The confident numbers AI generates for core bets are absent here. Whether to protect a bet that data cannot justify remains a matter of human conviction: the one thing the Ambition Matrix is built around.",
  },
}

// Default state: note-taker AI on, matching IDI pattern of pre-selecting the clearest value
const DEFAULT_AI: Record<Zone, boolean> = { core: false, adjacent: true, transformational: false }

export default function AMAIReactivated() {
  const [aiZones, setAiZones] = useState<Record<Zone, boolean>>(DEFAULT_AI)
  const prefersReduced = useReducedMotion()

  function toggle(zone: Zone) {
    setAiZones((prev) => ({ ...prev, [zone]: !prev[zone] }))
  }

  function zoneFill(id: Zone)   { return aiZones[id] ? `${AI_C}0.14)` : `${PLUM}0.12)` }
  function zoneStroke(id: Zone) { return aiZones[id] ? `${AI_C}0.80)` : `${PLUM}0.55)` }
  function labelFill(id: Zone)  { return aiZones[id] ? `${AI_C}0.88)` : `${PLUM}0.82)` }

  return (
    <div>
      {/* SVG illustration - zone fills animate on toggle */}
      <div className="w-full flex justify-center mb-12 select-none" aria-hidden="true">
        <svg viewBox="0 0 560 450" width="100%" style={{ maxWidth: 640, overflow: 'visible' }}>
          <defs>
            <filter id="am-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="am-ai-grad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6B4A77" stopOpacity="0.10" />
              <stop offset="100%" stopColor="#6B4A77" stopOpacity="0.03" />
            </linearGradient>
          </defs>

          {/* Grid */}
          <rect x={GX} y={GY} width={GW} height={GH} fill="url(#am-ai-grad)" stroke={`${PLUM}0.22)`} strokeWidth={1} rx={2} />
          <line x1={MX} y1={GY} x2={MX} y2={GB} stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="4 5" />
          <line x1={GX} y1={MY} x2={GR} y2={MY} stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="4 5" />

          {/* Axis labels */}
          <text x={GX} y={GB + 22} textAnchor="start" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em" fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>EXISTING</text>
          <text x={GR} y={GB + 22} textAnchor="end"   fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em" fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>NEW</text>
          <text x={MX} y={GB + 40} textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill="rgba(255,255,255,0.57)" style={{ userSelect: 'none' }}>MARKET / CUSTOMER →</text>
          <text x={GX - 8} y={GB}      textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em" fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>EXISTING</text>
          <text x={GX - 8} y={GY + 6} textAnchor="end" fontSize="8" fontFamily="var(--font-mono)" letterSpacing="0.10em" fill="rgba(255,255,255,0.6)" style={{ userSelect: 'none' }}>NEW</text>
          <text transform={`translate(28, ${MY}) rotate(-90)`} textAnchor="middle" fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em" fill="rgba(255,255,255,0.57)" style={{ userSelect: 'none' }}>↑ OFFERING / PRODUCT</text>

          {/* Zone ellipses - fill/stroke animate with AI state */}
          {ZONES.map(({ id, label, cx, cy, rx, ry }) => {
            const isAI = aiZones[id]
            return (
              <g key={id}>
                <motion.ellipse
                  cx={cx} cy={cy} rx={rx} ry={ry}
                  strokeWidth={1.5}
                  strokeDasharray={isAI ? '6 3' : undefined}
                  filter="url(#am-ai-glow)"
                  animate={{ fill: zoneFill(id), stroke: zoneStroke(id) }}
                  transition={{ duration: 0.3 }}
                />
                <motion.text
                  x={cx} y={cy + 4}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize={id === 'transformational' ? '6.5' : '8'}
                  fontFamily="var(--font-mono)"
                  letterSpacing="0.12em"
                  style={{ userSelect: 'none' }}
                  animate={{ fill: labelFill(id) }}
                  transition={{ duration: 0.3 }}
                >{label}</motion.text>
                {/* AI badge inside zone when active */}
                <AnimatePresence>
                  {isAI && (
                    <motion.text
                      key="ai-badge"
                      x={cx} y={cy + 18}
                      textAnchor="middle"
                      fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                      fill={`${AI_C}0.70)`}
                      style={{ userSelect: 'none' }}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >AI</motion.text>
                  )}
                </AnimatePresence>
              </g>
            )
          })}
        </svg>
      </div>

      {/* ── Per-zone toggle cards ── */}
      <div className="grid md:grid-cols-3 gap-5">
        {ZONES.map(({ id, label }) => {
          const isAI = aiZones[id]
          return (
            <div
              key={id}
              className="rounded-xl p-5"
              style={{
                background: isAI ? `${AI_C}0.06)` : `${PLUM}0.06)`,
                border: `1px solid ${isAI ? `${AI_C}0.20)` : `${PLUM}0.20)`}`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold" style={{ fontSize: 'var(--text-sm)', color: '#FAFAFA' }}>
                  {label.charAt(0) + label.slice(1).toLowerCase()}
                </h3>
                <div
                  className="flex rounded-full p-0.5"
                  style={{ background: 'rgba(255,255,255,0.08)' }}
                  role="group"
                  aria-label={`${label} analysis mode`}
                >
                  <button
                    onClick={() => isAI && toggle(id)}
                    className="rounded-full px-3 py-1 text-xs font-semibold transition-colors"
                    style={{
                      background: !isAI ? 'rgba(255,255,255,0.90)' : 'transparent',
                      color:      !isAI ? '#111' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-pressed={!isAI}
                  >Human</button>
                  <button
                    onClick={() => !isAI && toggle(id)}
                    className="rounded-full px-3 py-1 text-xs font-semibold transition-colors"
                    style={{
                      background: isAI ? `${AI_C}0.75)` : 'transparent',
                      color:      isAI ? '#fff' : 'rgba(255,255,255,0.45)',
                    }}
                    aria-pressed={isAI}
                  >With AI</button>
                </div>
              </div>

              <AnimatePresence initial={false}>
                {isAI ? (
                  <motion.div
                    key="ai-detail"
                    initial={prefersReduced ? { opacity: 1 } : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="pt-2">
                      <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: `${AI_C}0.70)` }}>
                        What AI does well
                      </p>
                      <p className="mb-4" style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                        {AI_NOTES[id].well}
                      </p>
                      <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(251,146,60,0.75)' }}>
                        What it risks
                      </p>
                      <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
                        {AI_NOTES[id].risks}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p
                    key="idle"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.35)', fontStyle: 'italic' }}
                  >Toggle to AI to see how analysis changes.</motion.p>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Honest synthesis */}
      <div className="mt-10 rounded-xl p-6" style={{ background: `${PLUM}0.06)`, border: `1px solid ${PLUM}0.18)` }}>
        <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.72)` }}>
          The honest synthesis
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI sharpens the assessment of innovation bets, especially in the data-rich core and, with care, the adjacent zone. But it tilts naturally toward where data already exists, which is precisely the safe core the Ambition Matrix exists to stop you over-funding. Used well, AI makes each zone&rsquo;s analysis faster and better grounded. Used carelessly, it adds a veneer of quantitative confidence to the core and makes the transformational bets look even less justifiable by comparison. The judgment the matrix demands (deliberately protecting the bold bets that data cannot yet justify) is exactly the judgment AI cannot make for you.
        </p>
      </div>
    </div>
  )
}

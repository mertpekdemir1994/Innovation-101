'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const PLUM_TEXT = 'rgba(166,147,174,'  // brightened text-safe variant of PLUM
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO
const AMBER  = 'rgba(245,158,11,'
const AMBER_TEXT = 'rgba(245,158,11,'  // brightened text-safe variant of AMBER

const SVG_W = 700
const SVG_H = 300

const VM_X  = 14, VM_Y = 30, VM_W = 252, VM_H = 240
const VM_RE = VM_X + VM_W
const VM_DY = VM_Y + 80
const VM_DX = VM_X + 126

const CP_CX = 540, CP_CY = 155, CP_R = 104
const CP_LE = CP_CX - CP_R

const D30_X  = Math.round(CP_CX + CP_R * Math.cos(30  * Math.PI / 180))
const D30_Y  = Math.round(CP_CY + CP_R * Math.sin(30  * Math.PI / 180))
const D90_Y  = Math.round(CP_CY + CP_R)
const D150_X = Math.round(CP_CX + CP_R * Math.cos(150 * Math.PI / 180))
const D150_Y = D30_Y

type Mode = 'human' | 'ai'

const AI_CARDS = [
  { heading: 'Pattern matching, not your customer', body: 'AI infers connections from language similarity and datasets of analogous products, not from the people you are actually trying to serve.' },
  { heading: 'Gaps disappear, not by design', body: 'Because AI optimises for completeness, it fills unmet needs with plausible relievers and wasted features with invented gains. The canvas looks tidy; the evidence does not exist.' },
  { heading: 'Use AI to stress-test, not to conclude', body: 'Ask AI to argue against each connection you drew from research. That adversarial role surfaces weak evidence without generating false positives.' },
]

export default function VPCAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'
  const C = isAI ? INDIGO : PLUM

  return (
    <div className="w-full">
      {/* Mode toggle */}
      <div className="flex justify-center mb-5">
        <div className="flex rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.07)' }}>
          {(['human', 'ai'] as Mode[]).map(m => (
            <button key={m} onClick={() => setMode(m)}
              className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: mode === m
                  ? m === 'ai' ? `${INDIGO}0.25)` : `${PLUM}0.25)`
                  : 'transparent',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.38)',
                border: `1px solid ${mode === m ? (m === 'ai' ? `${INDIGO}0.55)` : `${PLUM}0.55)`) : 'transparent'}`,
              }}
            >{m === 'human' ? 'Human Research' : 'With AI'}</button>
          ))}
        </div>
      </div>

      {/* SVG */}
      <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxWidth: 'var(--width-illustration)', maxHeight: 310 }}
        aria-hidden="true">
        <defs>
          <filter id="vpc-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="vpc-ai-arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L0,6 L6,3 Z" fill={`${C}0.70)`} />
          </marker>
        </defs>

        {/* Value Map */}
        <rect x={VM_X} y={VM_Y} width={VM_W} height={VM_H} rx={5}
          fill={`${C}0.12)`}
          stroke={`${C}0.45)`} strokeWidth={1.5}
          style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
        <line x1={VM_X} y1={VM_DY} x2={VM_RE} y2={VM_DY}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
        <line x1={VM_DX} y1={VM_DY} x2={VM_DX} y2={VM_Y + VM_H}
          stroke="rgba(255,255,255,0.10)" strokeWidth={1} />

        {/* VM labels */}
        <text x={VM_DX} y={VM_Y + 16} textAnchor="middle"
          fill="rgba(255,255,255,0.625)" fontSize={6.5} fontWeight={600}
          letterSpacing={1.2} fontFamily="monospace">PRODUCTS &amp; SERVICES</text>
        <text x={77} y={VM_DY + 14} textAnchor="middle"
          fill="rgba(255,255,255,0.625)" fontSize={6.5} fontWeight={600}
          letterSpacing={1.1} fontFamily="monospace">GAIN CREATORS</text>
        <text x={203} y={VM_DY + 14} textAnchor="middle"
          fill="rgba(255,255,255,0.625)" fontSize={6.5} fontWeight={600}
          letterSpacing={1.1} fontFamily="monospace">PAIN RELIEVERS</text>

        {/* VM items */}
        {([
          [22,  72, 90, 10],
          [120, 72, 112, 10],
          [22,  86, 68, 10],
          [22,  138, 95, 10],
          [22,  152, 76, 10],
          [150, 138, 90, 10],
          [150, 152, 76, 10],
        ] as [number,number,number,number][]).map(([ix,iy,iw,ih], i) => (
          <rect key={i} x={ix} y={iy} width={iw} height={ih} rx={2}
            fill={`${C}0.07)`} stroke={`${C}0.18)`} strokeWidth={0.75}
            style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
        ))}

        {/* Customer Profile */}
        {/* Sector highlights (for consistency, no sector fills in this component) */}
        <circle cx={CP_CX} cy={CP_CY} r={CP_R}
          fill={`${C}0.10)`}
          stroke={`${C}0.45)`} strokeWidth={1.5}
          filter="url(#vpc-ai-glow)"
          style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
        <line x1={CP_CX} y1={CP_CY} x2={D150_X} y2={D150_Y}
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line x1={CP_CX} y1={CP_CY} x2={D30_X} y2={D30_Y}
          stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <line x1={CP_CX} y1={CP_CY} x2={CP_CX} y2={D90_Y}
          stroke="rgba(255,255,255,0.06)" strokeWidth={0.8} />

        {/* CP labels */}
        <text x={CP_CX} y={CP_CY - 62} textAnchor="middle"
          fill="rgba(255,255,255,0.625)" fontSize={6.5} fontWeight={600}
          letterSpacing={1.1} fontFamily="monospace">CUSTOMER JOBS</text>
        <text x={CP_CX - 50} y={CP_CY + 56} textAnchor="middle"
          fill="rgba(255,255,255,0.625)" fontSize={6.5} fontWeight={600}
          letterSpacing={1.1} fontFamily="monospace">GAINS</text>
        <text x={CP_CX + 50} y={CP_CY + 56} textAnchor="middle"
          fill="rgba(255,255,255,0.625)" fontSize={6.5} fontWeight={600}
          letterSpacing={1.1} fontFamily="monospace">PAINS</text>

        {/* CP dots */}
        {([
          [514,100],[550,114],
          [488,192],[472,208],
          [576,189],[596,207],[578,225],
        ] as [number,number][]).map(([dx,dy], i) => (
          <circle key={i} cx={dx} cy={dy} r={3}
            fill={`${C}0.09)`} stroke={`${C}0.20)`} strokeWidth={0.8}
            style={{ transition: 'fill 0.35s, stroke 0.35s' }} />
        ))}

        {/* ── CONNECTIONS (mode-dependent) ──────────────────────────── */}
        <AnimatePresence mode="wait">
          {isAI ? (
            /* AI mode: everything connected, INDIGO, no gaps */
            <motion.g key="ai-connections"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.30 }}>
              {/* All 4 items connected */}
              {([
                [VM_RE, 145, CP_LE, 186],
                [VM_RE, 158, CP_LE, 196],
                [VM_RE, 165, CP_LE, 193],
                [VM_RE, 175, CP_LE, 207],
              ] as [number,number,number,number][]).map(([x1,y1,x2,y2], i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                  stroke={`${INDIGO}${i < 2 ? '0.65)' : '0.45)'}`}
                  strokeWidth={1.4}
                  markerEnd="url(#vpc-ai-arrow)" />
              ))}
              <text x={349} y={168} textAnchor="middle"
                fill={`${INDIGO_TEXT}0.975)`} fontSize={7.5} fontWeight={600}
                letterSpacing={1.0} fontFamily="monospace">COMPLETE FIT ✓</text>
              <text x={349} y={180} textAnchor="middle"
                fill={`${INDIGO_TEXT}0.899)`} fontSize={6} fontFamily="monospace">AI sees no gaps</text>
            </motion.g>
          ) : (
            /* Human mode: honest, 2 FIT, 2 WASTED, 1 UNMET */
            <motion.g key="human-connections"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.30 }}>
              <line x1={VM_RE} y1={152} x2={CP_LE} y2={189}
                stroke={`${PLUM}0.70)`} strokeWidth={1.5}
                markerEnd="url(#vpc-ai-arrow)" />
              <line x1={VM_RE} y1={166} x2={CP_LE} y2={193}
                stroke={`${PLUM}0.55)`} strokeWidth={1.5}
                markerEnd="url(#vpc-ai-arrow)" />
              <text x={349} y={165} textAnchor="middle"
                fill={`${PLUM_TEXT}0.975)`} fontSize={7.5} fontWeight={600}
                letterSpacing={1.0} fontFamily="monospace">FIT ✓</text>
              {/* Wasted */}
              <line x1={VM_RE} y1={140} x2={325} y2={140}
                stroke={`${AMBER}0.58)`} strokeWidth={1.2} strokeDasharray="4 3" />
              <text x={327} y={137} textAnchor="start"
                fill={`${AMBER}0.68)`} fontSize={6.5} fontWeight={600}
                letterSpacing={1.1} fontFamily="monospace">WASTED ×</text>
              <line x1={VM_RE} y1={178} x2={325} y2={178}
                stroke={`${AMBER}0.52)`} strokeWidth={1.2} strokeDasharray="4 3" />
              <text x={327} y={175} textAnchor="start"
                fill={`${AMBER_TEXT}0.882)`} fontSize={6.5} fontWeight={600}
                letterSpacing={1.1} fontFamily="monospace">WASTED ×</text>
              {/* Unmet */}
              <line x1={CP_LE} y1={212} x2={378} y2={212}
                stroke={`${AMBER}0.50)`} strokeWidth={1.2} strokeDasharray="4 3" />
              <text x={376} y={209} textAnchor="end"
                fill={`${AMBER_TEXT}0.876)`} fontSize={6.5} fontWeight={600}
                letterSpacing={1.1} fontFamily="monospace">UNMET NEED !</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* AI annotation */}
        <AnimatePresence>
          {isAI && (
            <motion.text
              key="ai-label"
              x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle"
              fill={`${INDIGO_TEXT}0.885)`} fontSize={6.5} fontFamily="monospace" letterSpacing={0.8}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >AI filled every gap, inspect each connection against your research before acting
            </motion.text>
          )}
        </AnimatePresence>
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {isAI ? (
          <motion.div key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {AI_CARDS.map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${INDIGO}0.06)`, borderColor: `${INDIGO}0.20)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${INDIGO}0.75)` }}>{card.heading}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.body}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { h: 'Gaps are the most valuable output', b: 'A wasted feature or unmet need is not a failure; it is a strategic signal telling you where to redirect effort or what to stop building.' },
              { h: 'FIT requires customer evidence', b: 'Every connection line should point to a specific research finding. If you cannot cite the evidence, the connection is a hypothesis, not a fit.' },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${PLUM}0.10)`, borderColor: `${PLUM}0.28)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${PLUM}0.80)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis card (always visible) */}
      <div className="mt-3 rounded-lg p-4 border border-white/8"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/30 mb-1">Synthesis</p>
        <p className="text-xs text-white/45 leading-relaxed">
          FIT is earned through research and honest gap analysis, not assumed through pattern completion. Test every connection against customer evidence before it drives prioritisation decisions.
        </p>
      </div>
    </div>
  )
}

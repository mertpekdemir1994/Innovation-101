'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

// ── Shared geometry ────────────────────────────────────────────────────────────
const SVG_W = 700, SVG_H = 258
const SX = 152, SY = 74, SW = 268, SH = 116
const SCX = SX + SW / 2
const SCY = SY + SH / 2
const WE = 20
const TY = SY, BY = SY + SH
const TX1 = SX - WE, TX2 = SX + SW + WE
const LX = SX, LY1 = SY - WE, LY2 = SY + SH + WE
const RX = SX + SW
const BRK_Y1 = SCY - 22
const BRK_Y2 = SCY + 22
const OPP_CX = Math.round((RX + SVG_W - 14) / 2)

type Mode = 'human' | 'ai'

export default function OrthodoxiesAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  const wallStroke = isAI ? `${INDIGO}0.80)` : 'rgba(255,255,255,0.62)'
  const wallW = isAI ? 3 : 2

  return (
    <div className="w-full">
      {/* Mode toggle */}
      <div className="flex justify-center mb-6">
        <div className="flex rounded-full p-0.5" style={{ background: 'rgba(255,255,255,0.06)' }}>
          {(['human', 'ai'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className="px-5 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{
                background: mode === m
                  ? m === 'ai' ? `${INDIGO}0.25)` : `${SAGE}0.25)`
                  : 'transparent',
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.50)',
                border: `1px solid ${mode === m
                  ? (m === 'ai' ? `${INDIGO}0.55)` : `${SAGE}0.55)`)
                  : 'transparent'}`,
              }}
            >
              {m === 'human' ? 'Human Challenger' : 'With AI (default)'}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', overflow: 'visible' }}
        aria-label={
          isAI
            ? 'AI mode: walls are thick indigo, the break in the right wall is closed. AI reinforces every orthodoxy as fact rather than naming it as a breakable assumption.'
            : 'Human mode: normal constraint space with sage walls and a break in the right wall opening into opportunity territory.'
        }
      >
        <defs>
          <filter id="ortho-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="ortho-ai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <radialGradient id="ortho-ai-opp-grad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={`${SAGE}0.20)`} />
            <stop offset="100%" stopColor={`${SAGE}0.0)`} />
          </radialGradient>
        </defs>

        {/* Central space */}
        <rect x={SX} y={SY} width={SW} height={SH}
          rx={2}
          fill={isAI ? `${INDIGO}0.05)` : 'rgba(255,255,255,0.025)'}
          stroke="none"
          style={{ transition: 'fill 0.4s' }}
        />

        {/* Center label */}
        <text x={SCX} y={SCY + 3} textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.20em"
          fill={isAI ? `${INDIGO_TEXT}0.836)` : 'rgba(255,255,255,0.54)'}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>
          {isAI ? 'CONSENSUS AS FACT' : 'IDEA SPACE'}
        </text>

        {/* Idea markers (fade in AI mode: ideas disappear as consensus locks in) */}
        {([
          [SCX - 62, SCY - 24],
          [SCX + 44, SCY - 18],
          [SCX - 18, SCY + 28],
          [SCX + 68, SCY + 18],
          [SCX - 72, SCY + 12],
        ] as [number, number][]).map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={3.5}
            fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" strokeWidth={1}
            style={{ opacity: isAI ? 0.18 : 1, transition: 'opacity 0.5s' }} />
        ))}

        {/* ── WALLS ── */}
        <line x1={TX1} y1={TY} x2={TX2} y2={TY}
          stroke={wallStroke} strokeWidth={wallW}
          filter={isAI ? 'url(#ortho-ai-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} />

        <line x1={TX1} y1={BY} x2={TX2} y2={BY}
          stroke={wallStroke} strokeWidth={wallW}
          filter={isAI ? 'url(#ortho-ai-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} />

        <line x1={LX} y1={LY1} x2={LX} y2={LY2}
          stroke={wallStroke} strokeWidth={wallW}
          filter={isAI ? 'url(#ortho-ai-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} />

        {/* RIGHT wall: break open in human mode, CLOSED in AI mode */}
        <line x1={RX} y1={LY1} x2={RX} y2={BRK_Y1}
          stroke={wallStroke} strokeWidth={wallW}
          filter={isAI ? 'url(#ortho-ai-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} />
        {/* Break connector: visible only in AI mode (seals the gap) */}
        <line x1={RX} y1={BRK_Y1} x2={RX} y2={BRK_Y2}
          stroke={`${INDIGO}0.80)`} strokeWidth={wallW + 1}
          filter="url(#ortho-ai-glow-sm)"
          style={{ opacity: isAI ? 1 : 0, transition: 'opacity 0.4s, stroke-width 0.4s' }} />
        <line x1={RX} y1={BRK_Y2} x2={RX} y2={LY2}
          stroke={wallStroke} strokeWidth={wallW}
          filter={isAI ? 'url(#ortho-ai-glow-sm)' : undefined}
          style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }} />

        {/* ── WALL LABELS ── */}
        <text x={SCX} y={TY - 14} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill={isAI ? `${INDIGO_TEXT}0.916)` : 'rgba(255,255,255,0.48)'}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>
          {isAI ? 'AI: "this is simply how it works"' : 'CUSTOMERS MUST OWN THE PRODUCT'}
        </text>

        <text x={SCX} y={BY + 16} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill={isAI ? `${INDIGO_TEXT}0.916)` : 'rgba(255,255,255,0.48)'}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>
          {isAI ? 'AI: "standard industry practice"' : 'IN-PERSON DELIVERY REQUIRED'}
        </text>

        <text
          transform={`rotate(-90, ${LX - 28}, ${SCY})`}
          x={LX - 28} y={SCY}
          textAnchor="middle" dominantBaseline="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill={isAI ? `${INDIGO_TEXT}0.916)` : 'rgba(255,255,255,0.48)'}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>
          {isAI ? 'AI: "obvious market reality"' : 'PREMIUM PRICING = CREDIBILITY'}
        </text>

        <text x={RX} y={LY1 - 10} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
          fill={isAI ? `${INDIGO_TEXT}0.916)` : `${SAGE_TEXT}0.926)`}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>
          {isAI ? 'AI: "required distribution model"' : 'SOLD THROUGH DEALERS ONLY'}
        </text>

        {/* ── BREAK DETAILS (human mode only) ── */}
        <g style={{ opacity: isAI ? 0 : 1, transition: 'opacity 0.4s' }}>
          <path d={`M ${RX - 5} ${BRK_Y1} L ${RX + 5} ${BRK_Y1 + 4} L ${RX - 5} ${BRK_Y1 + 8}`}
            stroke={`${SAGE}0.80)`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <path d={`M ${RX - 5} ${BRK_Y2 - 8} L ${RX + 5} ${BRK_Y2 - 4} L ${RX - 5} ${BRK_Y2}`}
            stroke={`${SAGE}0.80)`} strokeWidth={1.5} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <g filter="url(#ortho-ai-glow)">
            <line x1={RX - 6} y1={SCY} x2={RX + 22} y2={SCY}
              stroke={`${SAGE}0.85)`} strokeWidth={2} strokeLinecap="round" />
            <path d={`M ${RX + 14} ${SCY - 5} L ${RX + 22} ${SCY} L ${RX + 14} ${SCY + 5}`}
              stroke={`${SAGE}0.85)`} strokeWidth={2} fill="none"
              strokeLinecap="round" strokeLinejoin="round" />
          </g>
        </g>

        {/* AI "SEALED" badge on the break zone */}
        <AnimatePresence>
          {isAI && (
            <motion.g
              key="sealed"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.35 }}
            >
              {/* Widened 48 -> 90: "CONFIRMED" doesn't fit the old badge
                  width at 11pt */}
              <rect x={RX + 6} y={SCY - 12} width={90} height={24} rx={3}
                fill={`${INDIGO}0.18)`} stroke={`${INDIGO}0.45)`} strokeWidth={1} />
              <text x={RX + 51} y={SCY} textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={`${INDIGO_TEXT}0.969)`} style={{ userSelect: 'none' }}>CONFIRMED</text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Opportunity territory (human mode) */}
        <ellipse cx={OPP_CX} cy={SCY} rx={110} ry={56}
          fill="url(#ortho-ai-opp-grad)"
          style={{ opacity: isAI ? 0.08 : 0.80, transition: 'opacity 0.5s' }} />
        <g style={{ opacity: isAI ? 0.12 : 0.70, transition: 'opacity 0.5s' }}
          filter="url(#ortho-ai-glow-sm)">
          <text x={OPP_CX} y={SCY - 9} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={`${SAGE_TEXT}0.958)`} style={{ userSelect: 'none' }}>OPPORTUNITY</text>
          <text x={OPP_CX} y={SCY + 9} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.18em"
            fill={`${SAGE_TEXT}0.958)`} style={{ userSelect: 'none' }}>SPACE</text>
        </g>
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {isAI ? (
          <motion.div
            key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                h: 'AI is made of orthodoxies',
                b: 'A language model learns from the vast body of what has been written about a field, which means it learns, and fluently reproduces, the industry\'s consensus. Ask it "how does this industry work?" and it confidently articulates the very assumptions the method exists to surface and break, presenting them as simple description.',
              },
              {
                h: 'When aimed correctly, it can help',
                b: 'Change the question from "how does this work?" to "what does this industry take for granted?" and AI can lay out candidate orthodoxies to examine. Once you have named one, AI can rapidly generate inversions and explore the opportunity space: a fast divergence aid for the flip.',
              },
              {
                h: 'The judgment stays human',
                b: 'Recognizing that a universally-held belief is a mere assumption and worth defying remains human. AI, by construction, treats the consensus as ground truth. The ability to distrust the consensus precisely because it is the consensus is the method\'s engine, and the one thing AI cannot supply.',
              },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${INDIGO}0.07)`, borderColor: `${INDIGO}0.22)` }}>
                <p className="text-2xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${INDIGO_TEXT}0.90)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              {
                h: 'The walls are invisible until named',
                b: 'Orthodoxies do not feel like assumptions; they feel like facts. The method\'s first move is to make the invisible visible: write each "of course" statement down as an assumption, not a description. That act alone begins to loosen its grip.',
              },
              {
                h: 'The flip opens the space',
                b: 'Every named orthodoxy is a locked door. Flipping it, "what if the opposite were true?", is how the door opens. Not every inversion leads somewhere viable, but the discipline of flipping all of them is how the non-obvious opportunity gets found.',
              },
            ].map((card, i) => (
              <div key={i} className="rounded-lg p-4 border"
                style={{ background: `${SAGE}0.08)`, borderColor: `${SAGE}0.22)` }}>
                <p className="text-2xs font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${SAGE_TEXT}1)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis */}
      <div className="mt-4 rounded-lg p-4 border border-white/8"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-2xs font-semibold uppercase tracking-wider text-white/50 mb-1">Synthesis</p>
        <p className="text-xs text-white/50 leading-relaxed">
          AI is a double-edged tool for this method. Asked to describe an industry, it reinforces the walls as fact. Asked to articulate an industry&rsquo;s assumptions and then flip a named one, it can genuinely help surface candidates and explore inversions. But keep the act of distrusting the obvious yours; that is the one thing a model trained to reproduce the consensus cannot supply.
        </p>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY   = 'rgba(31,58,95,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 700
const SVG_H = 244

// Panel geometry
const PROB_X = 10,  PROB_W = 238,  PROB_Y = 12, PANEL_H = 194
const SOL_X  = 456, SOL_W  = 234
const PROB_CX = PROB_X + PROB_W / 2
const SOL_CX  = SOL_X  + SOL_W  / 2

// Door geometry
const DOOR_POST1_X = 310, DOOR_POST2_X = 391, DOOR_POST_W = 5
const DOOR_OPEN_X1 = DOOR_POST1_X + DOOR_POST_W
const DOOR_OPEN_X2 = DOOR_POST2_X
const DOOR_CX      = (DOOR_OPEN_X1 + DOOR_OPEN_X2) / 2

const AI_QUESTIONS = [
  'How might we streamline checkout?',
  'How might we speed up payment?',
  'How might we auto-fill card details?',
  'How might we show a progress bar?',
  'How might we add a guest checkout?',
  'How might we display security badges?',
  'How might we offer buy-now-pay-later?',
  'How might we reduce form fields?',
  'How might we support more payment types?',
  'How might we send cart reminders?',
  'How might we show order total upfront?',
  'How might we gamify the checkout flow?',
  'How might we save payment methods?',
  'How might we add live chat support?',
  'How might we improve page load time?',
  'How might we offer price guarantees?',
  'How might we simplify address entry?',
  'How might we use social proof signals?',
  'How might we show free shipping threshold?',
  'How might we improve the CTA button?',
]

export default function HMWAIReactivated() {
  const [aiMode, setAiMode] = useState(false)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const T    = prefersReduced ? { duration: 0 } : { duration: 0.38, ease }

  const midY = PROB_Y + PANEL_H / 2

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div
          className="flex rounded-full p-1"
          style={{ background: 'rgba(255,255,255,0.08)' }}
          role="group"
          aria-label="Mode toggle"
        >
          {(['Human Research', 'With AI'] as const).map(label => {
            const isAI    = label === 'With AI'
            const isActive = isAI ? aiMode : !aiMode
            return (
              <button
                key={label}
                onClick={() => setAiMode(isAI)}
                className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  background: isActive
                    ? (isAI ? `${INDIGO}0.78)` : 'rgba(255,255,255,0.90)')
                    : 'transparent',
                  color: isActive ? (isAI ? '#fff' : '#111') : 'rgba(255,255,255,0.45)',
                }}
                aria-pressed={isActive}
              >{label}</button>
            )
          })}
        </div>
      </div>

      {/* Transformer SVG */}
      <div className="w-full select-none mb-10" aria-hidden="true">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="hmw-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect
            x={0} y={0} width={SVG_W} height={SVG_H} rx={10}
            fill={aiMode ? `${INDIGO}0.04)` : `${NAVY}0.06)`}
            style={{ transition: 'fill 0.35s' }}
          />

          {/* ── LEFT: Problem Space (static) ── */}
          <rect
            x={PROB_X} y={PROB_Y} width={PROB_W} height={PANEL_H} rx={8}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.14)"
            strokeDasharray="5 3"
          />
          <text
            x={PROB_CX} y={PROB_Y + 18}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.28)" style={{ userSelect: 'none' }}
          >PROBLEM SPACE</text>
          <line
            x1={PROB_X + 16} y1={PROB_Y + 29} x2={PROB_X + PROB_W - 16} y2={PROB_Y + 29}
            stroke="rgba(255,255,255,0.07)"
          />
          <text
            x={PROB_CX} y={PROB_Y + 44}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill="rgba(255,255,255,0.40)" style={{ userSelect: 'none' }}
          >INSIGHT</text>
          {([
            ['Users abandon checkout',          PROB_Y + 68, '6.5', 0.74],
            ['at payment — feels',               PROB_Y + 82, '6.5', 0.74],
            ['effortful and uncertain.',         PROB_Y + 96, '6.5', 0.74],
          ] as [string, number, string, number][]).map(([t, y, fs, op]) => (
            <text
              key={y} x={PROB_CX} y={y}
              textAnchor="middle" dominantBaseline="middle"
              fontSize={fs} fontFamily="var(--font-inter,sans-serif)"
              fill={`rgba(255,255,255,${op})`} style={{ userSelect: 'none' }}
            >{t}</text>
          ))}

          {/* Arrow left → door */}
          <line
            x1={PROB_X + PROB_W} y1={midY} x2={DOOR_POST1_X} y2={midY}
            stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="3 2"
          />

          {/* ── DOOR ── */}
          <rect
            x={DOOR_POST1_X} y={PROB_Y} width={DOOR_POST_W} height={PANEL_H} rx={2}
            fill={aiMode ? `${INDIGO}0.40)` : 'rgba(255,255,255,0.22)'}
            style={{ transition: 'fill 0.35s' }}
          />
          <rect
            x={DOOR_POST2_X} y={PROB_Y} width={DOOR_POST_W} height={PANEL_H} rx={2}
            fill={aiMode ? `${INDIGO}0.40)` : 'rgba(255,255,255,0.22)'}
            style={{ transition: 'fill 0.35s' }}
          />
          <rect
            x={DOOR_POST1_X} y={PROB_Y}
            width={DOOR_POST2_X - DOOR_POST1_X + DOOR_POST_W} height={5} rx={2}
            fill={aiMode ? `${INDIGO}0.40)` : 'rgba(255,255,255,0.22)'}
            style={{ transition: 'fill 0.35s' }}
          />
          {(['HOW', 'MIGHT', 'WE'] as const).map((word, i) => (
            <text
              key={word} x={DOOR_CX} y={PROB_Y + 60 + i * 18}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={aiMode ? `${INDIGO}0.75)` : 'rgba(255,255,255,0.78)'}
              style={{ userSelect: 'none', transition: 'fill 0.35s' }}
            >{word}</text>
          ))}
          <line
            x1={DOOR_OPEN_X1 + 8} y1={PROB_Y + PANEL_H - 28}
            x2={DOOR_OPEN_X2 - 6} y2={PROB_Y + PANEL_H - 28}
            stroke={aiMode ? `${INDIGO}0.50)` : 'rgba(255,255,255,0.36)'} strokeWidth={1.5}
            style={{ transition: 'stroke 0.35s' }}
          />
          <polygon
            points={`${DOOR_OPEN_X2 - 6},${PROB_Y + PANEL_H - 33} ${DOOR_OPEN_X2 + 8},${PROB_Y + PANEL_H - 28} ${DOOR_OPEN_X2 - 6},${PROB_Y + PANEL_H - 23}`}
            fill={aiMode ? `${INDIGO}0.50)` : 'rgba(255,255,255,0.36)'}
            style={{ transition: 'fill 0.35s' }}
          />

          {/* Arrow door → right */}
          <line
            x1={DOOR_POST2_X + DOOR_POST_W} y1={midY} x2={SOL_X} y2={midY}
            stroke={aiMode ? `${INDIGO}0.30)` : 'rgba(255,255,255,0.18)'} strokeWidth={1} strokeDasharray="3 2"
            style={{ transition: 'stroke 0.35s' }}
          />
          <polygon
            points={`${SOL_X},${midY - 4} ${SOL_X + 10},${midY} ${SOL_X},${midY + 4}`}
            fill={aiMode ? `${INDIGO}0.30)` : 'rgba(255,255,255,0.18)'}
            style={{ transition: 'fill 0.35s' }}
          />

          {/* ── RIGHT PANEL background ── */}
          <rect
            x={SOL_X} y={PROB_Y} width={SOL_W} height={PANEL_H} rx={8}
            fill={aiMode ? `${INDIGO}0.08)` : `${NAVY}0.62)`}
            stroke={aiMode ? `${INDIGO}0.30)` : 'rgba(255,255,255,0.22)'}
            strokeWidth={1.5}
            filter="url(#hmw-ai-glow)"
            style={{ transition: 'fill 0.35s, stroke 0.35s' }}
          />

          {/* ── HUMAN MODE: one well-formed question ── */}
          <motion.g
            animate={{ opacity: aiMode ? 0 : 1 }}
            transition={T}
          >
            <text
              x={SOL_CX} y={PROB_Y + 18}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill="rgba(255,255,255,0.40)" style={{ userSelect: 'none' }}
            >HOW MIGHT WE</text>
            <line
              x1={SOL_X + 16} y1={PROB_Y + 29} x2={SOL_X + SOL_W - 16} y2={PROB_Y + 29}
              stroke="rgba(255,255,255,0.10)"
            />
            {([
              ['make checkout feel',   PROB_Y + 68, '8.5'],
              ['effortless and',       PROB_Y + 84, '8.5'],
              ['reassuring?',          PROB_Y + 100, '8.5'],
            ] as [string, number, string][]).map(([t, y, fs]) => (
              <text
                key={y} x={SOL_CX} y={y}
                textAnchor="middle" dominantBaseline="middle"
                fontSize={fs} fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                fill="rgba(255,255,255,0.90)" style={{ userSelect: 'none' }}
              >{t}</text>
            ))}
            <text
              x={SOL_CX} y={PROB_Y + 148}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
              fill="rgba(255,255,255,0.30)" style={{ userSelect: 'none' }}
            >1 QUESTION — CALIBRATED SCOPE</text>
          </motion.g>

          {/* ── AI MODE: flood of questions ── */}
          <motion.g
            animate={{ opacity: aiMode ? 1 : 0 }}
            transition={T}
          >
            <text
              x={SOL_CX} y={PROB_Y + 14}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${INDIGO}0.60)`} style={{ userSelect: 'none' }}
            >20 QUESTIONS — 4 SECONDS — NO SCOPE</text>
            <line
              x1={SOL_X + 10} y1={PROB_Y + 22} x2={SOL_X + SOL_W - 10} y2={PROB_Y + 22}
              stroke={`${INDIGO}0.14)`}
            />
            {AI_QUESTIONS.map((q, i) => (
              <text
                key={i}
                x={SOL_X + 11}
                y={PROB_Y + 30 + i * 8.2}
                textAnchor="start"
                dominantBaseline="hanging"
                fontSize="4.2"
                fontFamily="var(--font-inter,sans-serif)"
                fill={`${INDIGO}${i % 4 === 0 ? '0.72)' : i % 4 === 1 ? '0.55)' : i % 4 === 2 ? '0.62)' : '0.48)'}`}
                style={{ userSelect: 'none' }}
              >{q}</text>
            ))}
          </motion.g>

          {/* AI mode annotation — appears over center gap */}
          <AnimatePresence>
            {aiMode && (
              <motion.text
                key="ai-annotation"
                x={350} y={SVG_H - 8}
                textAnchor="middle" dominantBaseline="auto"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill={`${INDIGO}0.45)`} style={{ userSelect: 'none' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >HMW IS A REFRAMING. NOT A QUESTION GENERATOR.</motion.text>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Info cards */}
      <AnimatePresence>
        {aiMode && (
          <motion.div
            className="grid md:grid-cols-2 gap-5 mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease }}
          >
            <div
              className="rounded-xl p-5"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}
              >Where AI is useful</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI generates large volumes of HMW questions from a brief quickly — useful for exploring scope variants,
                seeding a workshop, or prompting a team that is stuck. The mechanical conversion from problem statement
                to HMW question format is something AI does well and fast. Use it to populate a raw starting set.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.20)' }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.75)' }}
              >Where AI goes faint</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                HMW is a reframing tool, not a question generator. The valuable move is identifying one question at the
                right scope that converts an insight into a design challenge by shifting what success means. AI produces
                volume; it cannot do the brave reframe — the one that requires understanding what the insight actually
                means for the person experiencing the problem, not just for the system producing it.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis — always visible */}
      <div
        className="rounded-xl p-6"
        style={{ background: `${NAVY}0.10)`, border: `1px solid ${NAVY}0.25)` }}
      >
        <p
          className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.80)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI accelerates the generation of HMW questions from a brief — genuinely useful when you need a large starting
          set or when a team is stuck. Where it cannot substitute is in the reframing step: the move from
          &ldquo;how might we fix the checkout form&rdquo; to &ldquo;how might we make payment feel like the least
          important moment of the purchase.&rdquo; That reframe requires understanding what the insight means
          emotionally — knowledge that lives in the interviews and observations, not in the domain description.
          Use AI to generate quantity; use the team to select and reframe.
        </p>
      </div>
    </div>
  )
}

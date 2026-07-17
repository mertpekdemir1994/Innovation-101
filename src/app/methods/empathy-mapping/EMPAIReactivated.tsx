'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY   = 'rgba(31,58,95,'
const INDIGO = 'rgba(99,102,241,'
const AMBER  = 'rgba(245,158,11,'

const SVG_W = 700
const SVG_H = 440

const TL = { x: 10,  y: 10,  w: 328, h: 188 }
const TR = { x: 362, y: 10,  w: 328, h: 188 }
const BL = { x: 10,  y: 242, w: 328, h: 188 }
const BR = { x: 362, y: 242, w: 328, h: 188 }

const CX = 350, CY = 220, CRO = 36, CRI = 26
const HEAD_CY = 209, HEAD_R = 10

type Mode = 'human' | 'ai'

const HUMAN_FEELS = ['quiet shame whenever it comes up', 'anxious when confronted with numbers', 'a sense of failure, rarely spoken']
const AI_FEELS    = ['"expressed concern" about savings', '"frustrated" with the topic generally', '"unsure" what steps to take']

const HUMAN_THINKS = ['retirement feels impossibly far away', 'doesn\'t really understand how it works', 'other things feel more urgent']
const AI_THINKS    = ['long time horizon reduces urgency', 'insufficient knowledge of mechanisms', 'competing financial priorities exist']

type QuadrantBlock = {
  id: string
  rect: typeof TL
  label: string
  humanEntries: string[]
  aiEntries?: string[]
  aiOpacity?: number
  isObservable: boolean
}

const QUADS: QuadrantBlock[] = [
  {
    id: 'says',
    rect: TL,
    label: 'SAYS',
    humanEntries: ['"I know I should save more"', '"I\'m pretty responsible with money"', '"I\'ll sort it out next year"'],
    isObservable: true,
  },
  {
    id: 'thinks',
    rect: TR,
    label: 'THINKS',
    humanEntries: HUMAN_THINKS,
    aiEntries: AI_THINKS,
    aiOpacity: 0.38,
    isObservable: false,
  },
  {
    id: 'does',
    rect: BL,
    label: 'DOES',
    humanEntries: ['avoids opening account statements', 'hasn\'t changed contributions in years', 'closes app without taking action'],
    isObservable: true,
  },
  {
    id: 'feels',
    rect: BR,
    label: 'FEELS',
    humanEntries: HUMAN_FEELS,
    aiEntries: AI_FEELS,
    aiOpacity: 0.20,
    isObservable: false,
  },
]

export default function EMPAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const isAI = mode === 'ai'

  return (
    <div>
      {/* Toggle */}
      <div className="flex gap-2 mb-8 flex-wrap" role="group" aria-label="Empathy map mode">
        {([
          { id: 'human' as Mode, label: 'Human Research' },
          { id: 'ai'    as Mode, label: 'With AI'         },
        ]).map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className="rounded-full px-5 py-2 text-sm font-semibold transition-colors"
            style={{
              background: mode === id
                ? (id === 'ai' ? `${INDIGO}0.80)` : `${NAVY}0.80)`)
                : 'transparent',
              color: mode === id ? '#fff' : 'rgba(255,255,255,0.50)',
              border: `1.5px solid ${mode === id
                ? (id === 'ai' ? `${INDIGO}0.60)` : 'rgba(255,255,255,0.30)')
                : 'rgba(255,255,255,0.16)'}`,
            }}
            aria-pressed={mode === id}
          >{label}</button>
        ))}
      </div>

      <div className="w-full select-none mb-6" aria-hidden="true">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="emp-ai-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="emp-ai-feels-glow" x="-25%" y="-25%" width="150%" height="150%">
              <feGaussianBlur stdDeviation="6" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={10} fill={`${NAVY}0.05)`} />

          {/* Quadrants */}
          {QUADS.map(q => {
            const isFeeels   = q.id === 'feels'
            const entryOpacity = isAI && !q.isObservable
              ? (isFeeels ? 0.22 : 0.42)
              : 1
            const quadOpacity  = isAI && !q.isObservable
              ? (isFeeels ? 0.35 : 0.55)
              : 1
            const entries    = (isAI && q.aiEntries) ? q.aiEntries : q.humanEntries
            const cx         = q.rect.x + q.rect.w / 2

            return (
              <motion.g
                key={q.id}
                animate={{ opacity: quadOpacity }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.35 }}
              >
                {/* Quadrant rect */}
                <rect
                  x={q.rect.x} y={q.rect.y} width={q.rect.w} height={q.rect.h} rx={8}
                  fill={isFeeels ? `${NAVY}0.14)` : `${NAVY}0.08)`}
                  stroke={
                    isAI && q.isObservable
                      ? `${INDIGO}0.42)`
                      : isFeeels ? `${NAVY}0.55)` : `${NAVY}0.35)`
                  }
                  strokeWidth={isFeeels ? 1.5 : 1}
                  filter={isFeeels ? 'url(#emp-ai-feels-glow)' : 'url(#emp-ai-glow)'}
                  style={{ transition: 'stroke 0.35s' }}
                />

                {/* Observable badge in AI mode */}
                {isAI && q.isObservable && (
                  <g>
                    <rect
                      x={cx - 42} y={q.rect.y + q.rect.h - 24}
                      width={84} height={14} rx={3}
                      fill={`${INDIGO}0.12)`}
                      stroke={`${INDIGO}0.25)`}
                      strokeWidth={0.7}
                    />
                    <text
                      x={cx} y={q.rect.y + q.rect.h - 17}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                      fill={`${INDIGO}0.70)`}
                      style={{ userSelect: 'none' }}
                    >AI RELIABLE ✓</text>
                  </g>
                )}

                {/* Inferred badge in AI mode */}
                {isAI && !q.isObservable && (
                  <g>
                    <rect
                      x={cx - 50} y={q.rect.y + q.rect.h - 24}
                      width={100} height={14} rx={3}
                      fill={`${AMBER}0.08)`}
                      stroke={`${AMBER}0.22)`}
                      strokeWidth={0.7}
                    />
                    <text
                      x={cx} y={q.rect.y + q.rect.h - 17}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                      fill={`${AMBER}0.60)`}
                      style={{ userSelect: 'none' }}
                    >{isFeeels ? 'SURFACE WORDS ONLY ⚠' : 'AI INFERS FROM SURFACE ⚠'}</text>
                  </g>
                )}

                {/* Label */}
                <text
                  x={cx} y={q.rect.y + 18}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.14em"
                  fill={isFeeels ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.72)'}
                  fontWeight="600"
                  style={{ userSelect: 'none' }}
                >{q.label}</text>

                <line
                  x1={q.rect.x + 16} y1={q.rect.y + 28}
                  x2={q.rect.x + q.rect.w - 16} y2={q.rect.y + 28}
                  stroke={isFeeels ? `${NAVY}0.45)` : 'rgba(255,255,255,0.08)'}
                />

                {/* Entries with fade/swap in AI mode */}
                <AnimatePresence mode="wait">
                  <motion.g
                    key={`${q.id}-${isAI ? 'ai' : 'human'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: entryOpacity }}
                    exit={{ opacity: 0 }}
                    transition={prefersReduced ? { duration: 0 } : { duration: 0.30 }}
                  >
                    {entries.map((entry, i) => (
                      <g key={i}>
                        <rect
                          x={q.rect.x + 16} y={q.rect.y + 34 + i * 22}
                          width={q.rect.w - 32} height={16} rx={3}
                          fill="rgba(255,255,255,0.06)"
                          stroke={
                            isAI && q.isObservable
                              ? `${INDIGO}0.18)`
                              : 'rgba(255,255,255,0.14)'
                          }
                          strokeWidth={0.7}
                          style={{ transition: 'stroke 0.35s' }}
                        />
                        <text
                          x={q.rect.x + 24} y={q.rect.y + 34 + i * 22 + 8}
                          textAnchor="start" dominantBaseline="middle"
                          fontSize="5" fontFamily="var(--font-inter,sans-serif)"
                          fill={
                            isAI && q.isObservable
                              ? `${INDIGO}0.70)`
                              : (isFeeels ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.60)')
                          }
                          style={{ userSelect: 'none', transition: 'fill 0.35s' }}
                        >{entry}</text>
                      </g>
                    ))}
                  </motion.g>
                </AnimatePresence>

                {/* FEELS heart + THINKS note */}
                {isFeeels && (
                  <>
                    <line
                      x1={q.rect.x + 20} y1={q.rect.y + 142}
                      x2={q.rect.x + q.rect.w - 20} y2={q.rect.y + 142}
                      stroke={`${NAVY}0.38)`}
                    />
                    <text
                      x={cx} y={q.rect.y + 154}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                      fill="rgba(255,255,255,0.30)"
                      style={{ userSelect: 'none' }}
                    >♥ INTERPRETIVE HEART</text>
                  </>
                )}
              </motion.g>
            )
          })}

          {/* AI mode: SAY-vs-DOES connection as "neutral data" */}
          <AnimatePresence>
            {isAI && (
              <motion.g
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={prefersReduced ? { duration: 0 } : { duration: 0.35 }}
              >
                <line
                  x1={172} y1={200} x2={172} y2={240}
                  stroke={`${INDIGO}0.40)`} strokeDasharray="3 2" strokeWidth={1}
                />
                <rect
                  x={100} y={209} width={144} height={22} rx={4}
                  fill={`${INDIGO}0.08)`}
                  stroke={`${INDIGO}0.22)`}
                  strokeWidth={0.7}
                />
                <text
                  x={172} y={218}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill={`${INDIGO}0.65)`}
                  style={{ userSelect: 'none' }}
                >CONTRADICTION IN DATA</text>
                <text
                  x={172} y={228}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="3.5" fontFamily="var(--font-mono)"
                  fill={`${INDIGO}0.45)`}
                  style={{ userSelect: 'none' }}
                >meaning: left to humans</text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Central figure */}
          <g style={{ pointerEvents: 'none' }}>
            <circle cx={CX} cy={CY} r={CRO} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 2" strokeWidth={0.8} />
            <circle cx={CX} cy={CY} r={CRI} fill={`${NAVY}0.30)`} stroke="rgba(255,255,255,0.50)" strokeWidth={1} />
            <circle cx={CX} cy={HEAD_CY} r={HEAD_R} fill={`${NAVY}0.22)`} stroke="rgba(255,255,255,0.38)" strokeWidth={0.8} />
            <path
              d={`M ${CX - 17} ${CY + 18} Q ${CX} ${CY + 7} ${CX + 17} ${CY + 18}`}
              fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth={0.8}
            />
          </g>
        </svg>
      </div>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {isAI ? (
          <motion.div
            key="ai-info"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
            className="grid md:grid-cols-2 gap-4 mb-4"
          >
            <div
              className="rounded-xl p-5"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.18)` }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}
              >Where AI is reliable</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)' }}>
                Given interview transcripts and behavioral data, AI populates SAYS and DOES quickly and accurately — these are observable and stated, so extraction is a task AI does well. This is genuinely useful for assembling the observable half of the map from a large corpus of research.
              </p>
            </div>
            <div
              className="rounded-xl p-5"
              style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.20)' }}
            >
              <p
                className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.72)' }}
              >Where AI flattens the truth</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)' }}>
                THINKS and especially FEELS are inferred, not stated. AI fills them from surface signals — the words the person used, the sentiment of the transcript. It misses the un-stated emotional truth: the quiet shame, the avoidance, the sense of failure that saturates the tone without ever being named outright. Exactly the emotion the Feels quadrant exists to hold.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="human-info"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25, ease }}
          />
        )}
      </AnimatePresence>

      {/* Synthesis card — always visible */}
      <div
        className="rounded-xl p-5"
        style={{ background: `${NAVY}0.10)`, border: `1px solid ${NAVY}0.25)` }}
      >
        <p
          className="font-mono uppercase tracking-widest mb-2"
          style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.60)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
          Use AI for SAYS and DOES — fast, accurate, handles volume well. Use human judgment for THINKS, FEELS, and the interpretation of the gap. The method&rsquo;s value lives in the inferred half, and that is exactly where AI&rsquo;s surface-level inference is most confidently wrong.
        </p>
      </div>
    </div>
  )
}

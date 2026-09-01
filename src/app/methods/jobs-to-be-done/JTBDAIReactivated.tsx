'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const NAVY   = 'rgba(31,58,95,'
const INDIGO = 'rgba(99,102,241,'

type Mode = 'human' | 'ai'

const SVG_W  = 700
const SVG_H  = 228
const SLOT_Y = 12
const SLOT_H = 128
const MID_Y  = SLOT_Y + SLOT_H / 2  // 76

const S1 = { x: 10,  w: 185 }
const S2 = { x: 222, w: 210 }
const S3 = { x: 459, w: 231 }

const S1_CX = S1.x + S1.w / 2
const S2_CX = S2.x + S2.w / 2
const S3_CX = S3.x + S3.w / 2

const SLOT_GEOM = [
  { s: S1, cx: S1_CX, label: 'WHEN',      sublabel: 'SITUATION'  },
  { s: S2, cx: S2_CX, label: 'I WANT TO', sublabel: 'MOTIVATION' },
  { s: S3, cx: S3_CX, label: 'SO I CAN',  sublabel: 'OUTCOME'    },
]

const SLOT_LINES: Record<Mode, string[][]> = {
  human: [
    ['commuting alone,', 'bored and', 'hungry'],
    ['stay engaged', 'and satisfied,', 'one-handed'],
    ['arrive at work', 'ready,', 'not depleted'],
  ],
  ai: [
    ['I want', 'a sweet treat'],
    ['enjoy something', 'rich + satisfying'],
    ['treat myself', 'to indulgence'],
  ],
}

const ROW_Y = 150, ROW_H = 56, ITEM_H = 20
const ITEM_START = 162

const COMPETITION: Record<Mode, { label: string; sublabel: string; items: string[]; itemW: number }> = {
  human: { label: 'TRUE COMPETITION', sublabel: '(non-obvious)',     items: ['banana', 'bagel', 'donut', 'boredom'],            itemW: 90 },
  ai:    { label: 'AI COMPETITION',   sublabel: '(within category)', items: ['other shakes', 'smoothies', 'frozen desserts'],   itemW: 106 },
}

export default function JTBDAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const isAI = mode === 'ai'
  const lines = SLOT_LINES[mode]
  const comp  = COMPETITION[mode]

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
            const isAIBtn  = label === 'With AI'
            const isActive = isAIBtn ? isAI : !isAI
            return (
              <button
                key={label}
                onClick={() => setMode(isAIBtn ? 'ai' : 'human')}
                className="rounded-full px-5 py-1.5 text-sm font-semibold transition-colors"
                style={{
                  background: isActive
                    ? (isAIBtn ? `${INDIGO}0.78)` : 'rgba(255,255,255,0.90)')
                    : 'transparent',
                  color: isActive ? (isAIBtn ? '#fff' : '#111') : 'rgba(255,255,255,0.45)',
                }}
                aria-pressed={isActive}
              >{label}</button>
            )
          })}
        </div>
      </div>

      {/* SVG */}
      <div className="w-full select-none mb-10" aria-hidden="true">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="jtbd-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect
            x={0} y={0} width={SVG_W} height={SVG_H} rx={10}
            fill={isAI ? `${INDIGO}0.04)` : `${NAVY}0.06)`}
            style={{ transition: 'fill 0.35s' }}
          />

          {/* Three slots */}
          {SLOT_GEOM.map(({ s, cx, label, sublabel }, si) => (
            <g key={si}>
              {/* Slot rect: color transitions with mode */}
              <rect
                x={s.x} y={SLOT_Y} width={s.w} height={SLOT_H} rx={8}
                fill={isAI ? `${INDIGO}0.08)` : `${NAVY}0.62)`}
                stroke={isAI ? `${INDIGO}0.28)` : 'rgba(255,255,255,0.22)'}
                strokeWidth={1.5}
                filter="url(#jtbd-ai-glow)"
                style={{ transition: 'fill 0.35s, stroke 0.35s' }}
              />
              {/* Slot label (static) */}
              <text
                x={cx} y={SLOT_Y + 14}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
                fill={isAI ? `${INDIGO}0.58)` : 'rgba(255,255,255,0.40)'}
                style={{ userSelect: 'none', transition: 'fill 0.35s' }}
              >{label}</text>
              <line
                x1={s.x + 12} y1={SLOT_Y + 23}
                x2={s.x + s.w - 12} y2={SLOT_Y + 23}
                stroke={isAI ? `${INDIGO}0.14)` : 'rgba(255,255,255,0.08)'}
                style={{ transition: 'stroke 0.35s' }}
              />
              {/* Content lines: swap with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.g
                  key={`s${si}-${mode}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={prefersReduced ? { duration: 0 } : { duration: 0.22 }}
                >
                  {lines[si].map((ln, li) => (
                    <text
                      key={li} x={cx} y={SLOT_Y + 48 + li * 16}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="7.5" fontWeight="600" fontFamily="var(--font-inter,sans-serif)"
                      fill="rgba(255,255,255,0.88)" style={{ userSelect: 'none' }}
                    >{ln}</text>
                  ))}
                  <text
                    x={cx} y={SLOT_Y + 108}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="4" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                    fill={isAI ? `${INDIGO}0.45)` : 'rgba(255,255,255,0.25)'}
                    style={{ userSelect: 'none' }}
                  >{sublabel}</text>
                </motion.g>
              </AnimatePresence>
            </g>
          ))}

          {/* Arrows */}
          {([[S1.x + S1.w, S2.x], [S2.x + S2.w, S3.x]] as [number, number][]).map(([x1, x2], ai) => (
            <g key={ai}>
              <line
                x1={x1} y1={MID_Y} x2={x2} y2={MID_Y}
                stroke={isAI ? `${INDIGO}0.22)` : 'rgba(255,255,255,0.20)'}
                strokeWidth={1.2} strokeDasharray="3 2"
                style={{ transition: 'stroke 0.35s' }}
              />
              <polygon
                points={`${x2},${MID_Y - 4} ${x2 + 8},${MID_Y} ${x2},${MID_Y + 4}`}
                fill={isAI ? `${INDIGO}0.22)` : 'rgba(255,255,255,0.20)'}
                style={{ transition: 'fill 0.35s' }}
              />
            </g>
          ))}

          {/* Competition row */}
          <rect
            x={10} y={ROW_Y} width={680} height={ROW_H} rx={6}
            fill={isAI ? `${INDIGO}0.06)` : `${NAVY}0.10)`}
            stroke={isAI ? `${INDIGO}0.18)` : `${NAVY}0.22)`}
            style={{ transition: 'fill 0.35s, stroke 0.35s' }}
          />
          <line x1={148} y1={ROW_Y + 6} x2={148} y2={ROW_Y + ROW_H - 6} stroke="rgba(255,255,255,0.07)" />

          {/* Competition label (transitions fill) */}
          <text
            x={78} y={ROW_Y + ROW_H / 2 - 6}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={isAI ? `${INDIGO}0.62)` : 'rgba(255,255,255,0.42)'}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}
          >{comp.label}</text>
          <text
            x={78} y={ROW_Y + ROW_H / 2 + 8}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill={isAI ? `${INDIGO}0.38)` : 'rgba(255,255,255,0.28)'}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}
          >{comp.sublabel}</text>

          {/* Competition items */}
          <AnimatePresence mode="wait">
            <motion.g
              key={`comp-${mode}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.22 }}
            >
              {comp.items.map((item, ii) => {
                const ix  = ITEM_START + ii * (comp.itemW + 8)
                const iy  = ROW_Y + (ROW_H - ITEM_H) / 2
                const icx = ix + comp.itemW / 2
                return (
                  <g key={item}>
                    <rect
                      x={ix} y={iy} width={comp.itemW} height={ITEM_H} rx={4}
                      fill={isAI ? `${INDIGO}0.16)` : `${NAVY}0.32)`}
                      stroke={isAI ? `${INDIGO}0.28)` : 'rgba(255,255,255,0.16)'}
                    />
                    <text
                      x={icx} y={iy + ITEM_H / 2}
                      textAnchor="middle" dominantBaseline="middle"
                      fontSize="5" fontFamily="var(--font-inter,sans-serif)"
                      fill={isAI ? `${INDIGO}0.80)` : 'rgba(255,255,255,0.78)'}
                      style={{ userSelect: 'none' }}
                    >{item}</text>
                  </g>
                )
              })}
            </motion.g>
          </AnimatePresence>

          {/* AI annotation */}
          <AnimatePresence>
            {isAI && (
              <motion.text
                key="ai-annotation"
                x={350} y={SVG_H - 6}
                textAnchor="middle" dominantBaseline="auto"
                fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                fill={`${INDIGO}0.45)`} style={{ userSelect: 'none' }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.28 }}
              >AI PRODUCES THE OBVIOUS JOB, THE COUNTERINTUITIVE JOB IS NOT IN THE CATEGORY</motion.text>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Info cards (AI mode) */}
      <AnimatePresence>
        {isAI && (
          <motion.div
            className="grid md:grid-cols-2 gap-5 mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.28, ease }}
          >
            <div className="rounded-xl p-5" style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}>
              <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}>
                Where AI is useful
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI nails the format immediately and produces the obvious functional job fast. For breaking a team out of
                feature-language, generating a set of candidate statements to react to, or quickly drafting a starting
                point before the team sharpens it with real research, AI genuinely helps. It is accurate about the
                product&rsquo;s stated purpose and useful for getting teams to think in job terms.
              </p>
            </div>
            <div className="rounded-xl p-5" style={{ background: 'rgba(245,158,11,0.04)', border: '1px solid rgba(245,158,11,0.20)' }}>
              <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.75)' }}>
                Where AI misses the point
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                The method&rsquo;s value is the counterintuitive job: the one no product description implies. AI,
                anchored to the category, produces the obvious one. It also stays within the category for competition
                (other milkshakes, not bananas and boredom), misses the emotional and social dimensions of the job,
                and cannot surface the switching moment, all of which require real investigation of real circumstances.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis */}
      <div className="rounded-xl p-6" style={{ background: `${NAVY}0.10)`, border: `1px solid ${NAVY}0.25)` }}>
        <p className="font-mono uppercase tracking-widest mb-3" style={{ fontSize: 'var(--text-2xs)', color: `${NAVY}0.80)` }}>
          The honest synthesis
        </p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI is genuinely useful as a drafting tool: correct format, obvious functional job, fast. For getting
          teams out of feature-language and into job-language, it works. But the method&rsquo;s whole payoff is the
          counterintuitive real job, its emotional and social dimensions, and the non-obvious cross-category
          competition, all of which come from investigating real switching moments in real circumstances. AI,
          reasoning from a product description, returns the job anyone would guess. The job worth finding is
          the one nobody would have guessed. Use AI to draft and react; use research to find the job that
          actually drives behavior.
        </p>
      </div>
    </div>
  )
}

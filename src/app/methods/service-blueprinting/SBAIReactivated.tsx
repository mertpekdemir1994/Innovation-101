'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const SLATE = 'rgba(100,116,139,'
const SLATE_TEXT = 'rgba(143,154,171,'  // brightened text-safe variant of SLATE
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

const SVG_W = 700
const STAGE_W = 140
const SCX = [70, 210, 350, 490, 630] as const

const HDR_TOP = 8, HDR_H = 36
const DIV_Y   = 48
const CA_Y = 50,  CA_H = 42
const FS_Y = 94,  FS_H = 42
const LOV_LINE_Y = 143
const BS_Y = 150, BS_H = 42
const SP_Y = 194, SP_H = 42
const SVG_H = 244

const STAGE_NAMES = ['DISCOVER', 'CONSIDER', 'START', 'USE', 'RESOLVE'] as const

// The undocumented workaround: an unowned handoff between START and USE in the backstage
// It is visible in human mode (orange) and nearly invisible in AI mode
const WORKAROUND_X = 350 + STAGE_W / 2  // = 420, between START and USE stages
const WORKAROUND_Y = BS_Y + BS_H / 2

export default function SBAIReactivated() {
  const [aiMode, setAiMode] = useState(false)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  return (
    <div>
      {/* Toggle */}
      <div className="flex justify-center mb-10">
        <div className="flex rounded-full p-1" style={{ background: 'rgba(255,255,255,0.08)' }}
          role="group" aria-label="Mode toggle"
        >
          {(['Human Research', 'With AI'] as const).map(label => {
            const isAI = label === 'With AI'
            const isActive = isAI ? aiMode : !aiMode
            return (
              <button key={label}
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

      {/* Blueprint SVG */}
      <div className="w-full select-none mb-10" aria-hidden="true">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="sb-ai-glow" x="-20%" y="-200%" width="140%" height="500%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8} fill={`${TEAL}0.04)`} />

          {/* Stage headers: indigo tint in AI mode */}
          {STAGE_NAMES.map((name, i) => (
            <g key={name}>
              <rect x={i * STAGE_W + 1} y={HDR_TOP} width={STAGE_W - 2} height={HDR_H}
                rx={4}
                fill={aiMode ? `${INDIGO}0.10)` : `${TEAL}0.12)`}
                stroke={aiMode ? `${INDIGO}0.35)` : `${TEAL}0.40)`}
                strokeWidth={1}
                style={{ transition: 'fill 0.35s, stroke 0.35s' }}
              />
              <text x={SCX[i]} y={HDR_TOP + HDR_H / 2 + 2}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={aiMode ? `${INDIGO_TEXT}0.962)` : `${TEAL_TEXT}0.979)`}
                style={{ userSelect: 'none', transition: 'fill 0.35s' }}
              >{name}</text>
            </g>
          ))}

          <line x1={0} y1={DIV_Y} x2={SVG_W} y2={DIV_Y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          {[1, 2, 3, 4].map(i => (
            <line key={i} x1={i * STAGE_W} y1={DIV_Y} x2={i * STAGE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.05)" strokeWidth={1}
            />
          ))}

          {/* Customer Actions: AI maps this layer well */}
          <rect x={0} y={CA_Y} width={SVG_W} height={CA_H}
            fill={aiMode ? `${INDIGO}0.05)` : `${TEAL}0.07)`}
            style={{ transition: 'fill 0.35s' }}
          />
          <line x1={0} y1={CA_Y + CA_H} x2={SVG_W} y2={CA_Y + CA_H} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
          <text x={4} y={CA_Y + 7} textAnchor="start" dominantBaseline="hanging"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={aiMode ? `${INDIGO_TEXT}0.895)` : `${TEAL_TEXT}0.905)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}
          >CUSTOMER ACTIONS</text>

          {/* Frontstage: AI maps this layer well */}
          <rect x={0} y={FS_Y} width={SVG_W} height={FS_H}
            fill={aiMode ? `${INDIGO}0.04)` : `${TEAL}0.04)`}
            style={{ transition: 'fill 0.35s' }}
          />
          <line x1={0} y1={FS_Y + FS_H} x2={SVG_W} y2={FS_Y + FS_H} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
          <text x={4} y={FS_Y + 7} textAnchor="start" dominantBaseline="hanging"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={aiMode ? `${INDIGO_TEXT}0.878)` : `${TEAL_TEXT}0.885)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}
          >FRONTSTAGE</text>

          {/* Line of Visibility */}
          <line
            x1={0} y1={LOV_LINE_Y} x2={SVG_W} y2={LOV_LINE_Y}
            stroke="rgba(255,255,255,0.62)" strokeWidth={1.5} strokeDasharray="9 5"
            filter="url(#sb-ai-glow)"
          />
          <text x={SVG_W - 6} y={LOV_LINE_Y - 7}
            textAnchor="end" dominantBaseline="auto"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill="rgba(255,255,255,0.58)" style={{ userSelect: 'none' }}
          >LINE OF VISIBILITY</text>

          {/* Backstage: AI maps documented process; misses the real workaround */}
          <rect x={0} y={BS_Y} width={SVG_W} height={BS_H}
            fill={aiMode ? `${INDIGO}0.05)` : `${SLATE}0.05)`}
            style={{ transition: 'fill 0.35s' }}
          />
          <line x1={0} y1={BS_Y + BS_H} x2={SVG_W} y2={BS_Y + BS_H} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
          <text x={4} y={BS_Y + 7} textAnchor="start" dominantBaseline="hanging"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={aiMode ? `${INDIGO_TEXT}0.882)` : `${SLATE_TEXT}0.912)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}
          >BACKSTAGE</text>

          {/* Support Processes */}
          <rect x={0} y={SP_Y} width={SVG_W} height={SP_H}
            fill={aiMode ? `${INDIGO}0.04)` : `${SLATE}0.08)`}
            style={{ transition: 'fill 0.35s' }}
          />
          <text x={4} y={SP_Y + 7} textAnchor="start" dominantBaseline="hanging"
            fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
            fill={aiMode ? `${INDIGO_TEXT}0.87)` : `${SLATE_TEXT}0.891)`}
            style={{ userSelect: 'none', transition: 'fill 0.35s' }}
          >SUPPORT PROCESSES / SYSTEMS</text>

          {/* Undocumented workaround marker:
              visible (amber/orange) in human mode; "AI MISSES THIS" in AI mode */}
          <motion.g animate={{ opacity: aiMode ? 0.18 : 1 }} transition={{ duration: 0.40 }}>
            <circle cx={WORKAROUND_X} cy={WORKAROUND_Y} r={4}
              fill="rgba(251,146,60,0.85)" filter="url(#sb-ai-glow)"
            />
            <text x={WORKAROUND_X + 7} y={WORKAROUND_Y}
              textAnchor="start" dominantBaseline="middle"
              fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
              fill="rgba(251,146,60,0.72)" style={{ userSelect: 'none' }}
            >UNOWNED HANDOFF</text>
          </motion.g>

          {/* AI mode overlay: "AI MAPS FROM DOCS" */}
          <AnimatePresence>
            {aiMode && (
              <>
                <motion.text key="ai-maps"
                  x={350} y={CA_Y + CA_H / 2 + 5}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`${INDIGO_TEXT}0.92)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30 }}
                >AI ASSEMBLES FROM DATA</motion.text>

                <motion.text key="ai-fs"
                  x={350} y={FS_Y + FS_H / 2 + 5}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill={`${INDIGO_TEXT}0.905)`} style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30 }}
                >AI MAPS DOCUMENTED PROCESS</motion.text>

                <motion.text key="ai-misses"
                  x={WORKAROUND_X + 7} y={WORKAROUND_Y - 14}
                  textAnchor="start" dominantBaseline="middle"
                  fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                  fill="rgba(251,146,60,0.874)" style={{ userSelect: 'none' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.30 }}
                >AI MISSES THIS</motion.text>
              </>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Info cards in AI mode */}
      <AnimatePresence>
        {aiMode && (
          <motion.div
            className="grid md:grid-cols-2 gap-5 mb-8"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.30, ease }}
          >
            <div className="rounded-xl p-5"
              style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.20)` }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: `${INDIGO}0.70)` }}
              >What AI does well</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI can assemble a draft blueprint from process documentation, system logs, org charts, and ticket data in a fraction of the time it takes to workshop one. Genuinely useful for reconstructing the documented frontstage, backstage, and systems layers, and for spotting where logged failures correlate with process handoffs.
              </p>
            </div>
            <div className="rounded-xl p-5"
              style={{ background: 'rgba(251,146,60,0.04)', border: '1px solid rgba(251,146,60,0.20)' }}
            >
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(251,146,60,0.75)' }}
              >What it misses</p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.65)', lineHeight: 'var(--leading-relaxed)' }}>
                AI maps the process as it is written down, and services almost never run the way they are written down. The undocumented workaround a frontline employee invented to cover a broken system, the informal fix between two teams: these keep the service running but appear in no document, so AI omits exactly the parts that matter most.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis: always visible */}
      <div className="rounded-xl p-6" style={{ background: `${TEAL}0.08)`, border: `1px solid ${TEAL}0.20)` }}>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${TEAL}0.70)` }}
        >The honest synthesis</p>
        <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.68)', lineHeight: 'var(--leading-relaxed)' }}>
          AI accelerates the documented layers of a blueprint: real value for the frontstage, the recorded backstage, and the systems. It can quantify where breaks show up in logged data. But a blueprint&rsquo;s deepest insight is usually the undocumented reality below the line of visibility: the human workaround holding a broken process together, the unowned gap no ticket ever captures. That reality lives in the frontline staff&rsquo;s heads, not in any dataset. AI drafts the blueprint from what is written; humans correct it with what is true.
        </p>
      </div>
    </div>
  )
}

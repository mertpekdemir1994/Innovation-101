'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE   = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE
const AMBER  = 'rgba(245,158,11,'
const INDIGO = 'rgba(99,102,241,'
const INDIGO_TEXT = 'rgba(141,143,245,'  // brightened text-safe variant of INDIGO

function dome(cx: number, cy: number, w: number, h: number): string {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 0 ${cx + w} ${cy + h} Z`
}

type Mode = 'human' | 'ai'

// Camera frame captures only the screen area
const FRAME_X = 150, FRAME_Y = 92, FRAME_W = 122, FRAME_H = 90

export default function COAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  function outsideOpacity() {
    return isAI ? 0.14 : 1
  }

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
                color: mode === m ? '#fff' : 'rgba(255,255,255,0.38)',
                border: `1px solid ${mode === m
                  ? (m === 'ai' ? `${INDIGO}0.55)` : `${SAGE}0.55)`)
                  : 'transparent'}`,
              }}
            >
              {m === 'human' ? 'Human Observer' : 'With AI'}
            </button>
          ))}
        </div>
      </div>

      <svg
        viewBox="0 0 700 248"
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', overflow: 'visible' }}
        aria-label={
          isAI
            ? 'AI mode: camera frame highlights only the computer screen, while sticky notes, papers, and shoebox outside the frame are dimmed'
            : 'Human mode: full observation scene visible, person at desk with computer, sticky notes, papers, and shoebox'
        }
      >
        <defs>
          <filter id="co-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="co-ai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Room */}
        <rect x={14} y={14} width={672} height={220}
          rx={8}
          fill={`${SAGE}0.04)`}
          stroke={`${SAGE}0.12)`}
          strokeWidth={1}
        />

        {/* Ambient wash */}
        <ellipse cx={465} cy={155} rx={160} ry={40}
          fill={`${SAGE}0.04)`}
          style={{ opacity: isAI ? 0 : 1, transition: 'opacity 0.5s' }}
        />

        {/* Desk */}
        <rect x={115} y={168} width={470} height={14}
          rx={3}
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1}
        />

        {/* ── SCREEN ── always visible at full opacity */}
        <rect x={168} y={102} width={90} height={68} rx={5}
          fill="rgba(255,255,255,0.04)"
          stroke={isAI ? `${INDIGO}0.55)` : `${AMBER}0.45)`}
          strokeWidth={1.5}
          filter="url(#co-ai-glow-sm)"
          style={{ transition: 'stroke 0.4s' }}
        />
        <rect x={176} y={109} width={74} height={52} rx={2}
          fill="rgba(255,255,255,0.03)"
        />
        <line x1={182} y1={119} x2={244} y2={119} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
        <line x1={182} y1={128} x2={238} y2={128} stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
        <line x1={182} y1={137} x2={226} y2={137} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
        <rect x={182} y={146} width={42} height={8} rx={2}
          fill={`${AMBER}0.06)`} stroke={`${AMBER}0.14)`} strokeWidth={1} />
        <rect x={206} y={170} width={14} height={4} rx={1}
          fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.14)" strokeWidth={1} />

        {/* ── PERSON ── */}
        <g style={{ opacity: isAI ? 0.30 : 1, transition: 'opacity 0.5s' }}>
          <circle cx={285} cy={118} r={17}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.5}
            filter="url(#co-ai-glow)"
          />
          <path d={dome(285, 135, 21, 30)}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.48)"
            strokeWidth={1.5}
            filter="url(#co-ai-glow)"
          />
          <line x1={264} y1={164} x2={224} y2={168}
            stroke="rgba(255,255,255,0.28)" strokeWidth={2} strokeLinecap="round" />
          <line x1={306} y1={164} x2={348} y2={168}
            stroke="rgba(255,255,255,0.28)" strokeWidth={2} strokeLinecap="round" />
        </g>

        {/* ── STICKY NOTE ── dims in AI mode */}
        <g style={{ opacity: outsideOpacity(), transition: 'opacity 0.5s' }}>
          <rect x={370} y={143} width={44} height={28} rx={3}
            fill={`${SAGE}0.20)`}
            stroke={`${SAGE}0.65)`}
            strokeWidth={1.5}
            filter="url(#co-ai-glow)"
          />
          <text x={392} y={154} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.05em"
            fill={`${SAGE_TEXT}0.975)`} style={{ userSelect: 'none' }}>CAN I</text>
          <text x={392} y={164} textAnchor="middle" dominantBaseline="middle"
            fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.05em"
            fill={`${SAGE_TEXT}0.975)`} style={{ userSelect: 'none' }}>MAKE PAYROLL?</text>
        </g>

        {/* ── PAPER PILE ── dims in AI mode */}
        <g style={{ opacity: outsideOpacity(), transition: 'opacity 0.5s' }}>
          <rect x={426} y={152} width={48} height={8} rx={2}
            fill="rgba(255,255,255,0.02)"
            stroke={`${SAGE}0.22)`} strokeWidth={1}
          />
          <rect x={422} y={158} width={58} height={12} rx={2}
            fill="rgba(255,255,255,0.02)"
            stroke={`${SAGE}0.28)`} strokeWidth={1}
          />
          <text x={451} y={165} textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)"
            fill={`${SAGE_TEXT}0.891)`} style={{ userSelect: 'none' }}>INVOICES</text>
        </g>

        {/* ── SHOEBOX ── dims in AI mode */}
        <g style={{ opacity: outsideOpacity(), transition: 'opacity 0.5s' }}>
          <rect x={492} y={160} width={72} height={12} rx={2}
            fill={`${SAGE}0.09)`}
            stroke={`${SAGE}0.36)`} strokeWidth={1}
          />
          <text x={528} y={166} textAnchor="middle" dominantBaseline="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill={`${SAGE_TEXT}0.916)`} style={{ userSelect: 'none' }}>RECEIPTS</text>
        </g>

        {/* ── OBSERVER ── dims in AI mode */}
        <g style={{ opacity: isAI ? 0.10 : 1, transition: 'opacity 0.5s' }}>
          <circle cx={644} cy={142} r={11}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.34)"
            strokeWidth={1.5}
            filter="url(#co-ai-glow-sm)"
          />
          <path d={dome(644, 153, 14, 22)}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.30)"
            strokeWidth={1.5}
          />
          <line x1={630} y1={148} x2={582} y2={154}
            stroke="rgba(255,255,255,0.07)" strokeWidth={1} strokeDasharray="3 3" />
          <text x={644} y={178} textAnchor="middle"
            fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.12em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>OBSERVER</text>
        </g>

        {/* ── ANNOTATIONS ── */}
        <text x={213} y={90} textAnchor="middle"
          fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.16em"
          fill={`${AMBER}${isAI ? '0.60)' : '0.72)'}`}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>STATED</text>
        <line x1={168} y1={95} x2={258} y2={95}
          stroke={`${AMBER}0.22)`} strokeWidth={1} strokeDasharray="4 3" />

        <text x={468} y={90} textAnchor="middle"
          fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.16em"
          fill={`${SAGE}${isAI ? '0.22)' : '0.80)'}`}
          style={{ userSelect: 'none', transition: 'fill 0.4s' }}>REAL</text>
        <line x1={370} y1={95} x2={570} y2={95}
          stroke={`${SAGE}${isAI ? '0.10)' : '0.26)'}`}
          strokeWidth={1} strokeDasharray="4 3"
          style={{ transition: 'stroke 0.4s' }} />

        <line x1={326} y1={82} x2={326} y2={165}
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={1} strokeDasharray="5 4" />
        <text x={326} y={74} textAnchor="middle"
          fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
          fill="rgba(255,255,255,0.575)" style={{ userSelect: 'none' }}>THE GAP</text>

        {/* ── CAMERA FRAME (AI mode only) ── */}
        <AnimatePresence>
          {isAI && (
            <motion.g
              key="camera-frame"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.40 }}
            >
              {/* Camera frame rect */}
              <rect
                x={FRAME_X} y={FRAME_Y} width={FRAME_W} height={FRAME_H}
                rx={4}
                fill="none"
                stroke={`${INDIGO}0.75)`}
                strokeWidth={1.5}
                strokeDasharray="6 4"
              />
              {/* Corner brackets */}
              {([
                { x: FRAME_X,            y: FRAME_Y,            d: 'M 0 10 L 0 0 L 10 0' },
                { x: FRAME_X + FRAME_W,  y: FRAME_Y,            d: 'M 0 0 L -10 0 M 0 0 L 0 10' },
                { x: FRAME_X,            y: FRAME_Y + FRAME_H,  d: 'M 0 -10 L 0 0 L 10 0' },
                { x: FRAME_X + FRAME_W,  y: FRAME_Y + FRAME_H,  d: 'M 0 -10 L 0 0 L -10 0' },
              ] as { x: number; y: number; d: string }[]).map((b, i) => (
                <path
                  key={i}
                  d={`M ${b.x} ${b.y} ${b.d}`}
                  stroke={`${INDIGO}1)`}
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="square"
                />
              ))}
              {/* IN FRAME label */}
              <rect
                x={FRAME_X + 6} y={FRAME_Y + 6} width={58} height={14} rx={3}
                fill={`${INDIGO}0.15)`}
                stroke={`${INDIGO}0.35)`}
                strokeWidth={1}
              />
              <text
                x={FRAME_X + 35} y={FRAME_Y + 13}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={`${INDIGO_TEXT}0.979)`}
                style={{ userSelect: 'none' }}
              >AI ANALYSES</text>

              {/* OUT OF FRAME arrow + label */}
              <line
                x1={FRAME_X + FRAME_W + 14} y1={FRAME_Y + FRAME_H / 2}
                x2={480} y2={164}
                stroke={`${INDIGO}0.28)`}
                strokeWidth={1}
                strokeDasharray="3 3"
              />
              <text
                x={FRAME_X + FRAME_W + 18} y={FRAME_Y + FRAME_H / 2 - 6}
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={`${INDIGO_TEXT}0.878)`}
                style={{ userSelect: 'none' }}
              >OUT OF FRAME</text>
              <text
                x={FRAME_X + FRAME_W + 18} y={FRAME_Y + FRAME_H / 2 + 6}
                fontSize="5" fontFamily="var(--font-mono)"
                fill={`${INDIGO_TEXT}0.853)`}
                style={{ userSelect: 'none' }}
              >the real insight</text>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {/* Info cards */}
      <AnimatePresence mode="wait">
        {isAI ? (
          <motion.div
            key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {[
              {
                h: 'What AI captures',
                b: 'The screen recording, the click log, the usage data. Everything that happened inside the application: where users hesitated, what they skipped, how long each step took. Precise and comprehensive for what was on-screen.',
              },
              {
                h: 'What stays out of frame',
                b: 'The sticky note on the side of the screen asking "Can I make payroll?" The shoebox of receipts on the desk. The notebook open to a hand-drawn cash-flow calendar. The workarounds that reveal why the tool is not enough. None of these appear in any log.',
              },
              {
                h: 'The insight that was missed',
                b: 'The real discovery, that users\' most urgent question is not "how do I enter a transaction" but "can I make payroll this week," only became visible when a researcher sat in the same room and saw the whole desk, not just the screen.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-lg p-4 border"
                style={{ background: `${INDIGO}0.07)`, borderColor: `${INDIGO}0.22)` }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${INDIGO}0.80)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              {
                h: 'The whole environment is the data',
                b: 'A human observer sees the sticky note, the shoebox, the confused look, the moment someone switches to a spreadsheet instead of the official tool. The environment itself is the research instrument, not just what is on the screen.',
              },
              {
                h: 'Say-vs-do is visible in person',
                b: 'When participants say "I use this software for everything" but then reach for a paper notebook to check a number, the human observer sees the gap in real time. That contradiction is the source of the deepest product insights.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-lg p-4 border"
                style={{ background: `${SAGE}0.08)`, borderColor: `${SAGE}0.22)` }}
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider mb-2"
                  style={{ color: `${SAGE}1)` }}>{card.h}</p>
                <p className="text-xs text-white/55 leading-relaxed">{card.b}</p>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Synthesis */}
      <div className="mt-4 rounded-lg p-4 border border-white/8" style={{ background: 'rgba(255,255,255,0.04)' }}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/28 mb-1">Synthesis</p>
        <p className="text-xs text-white/42 leading-relaxed">
          AI excels at analysing what happens inside the system it can see: clicks, hesitations, paths, drop-off rates. What it cannot see is the environment around the system: the workarounds, the parallel tools, the questions users are actually trying to answer. Contextual observation is irreplaceable precisely because the most important research data is not on the screen.
        </p>
      </div>
    </div>
  )
}

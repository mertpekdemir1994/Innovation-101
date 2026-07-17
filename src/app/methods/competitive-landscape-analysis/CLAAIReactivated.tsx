'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import React from 'react'

const SAGE   = 'rgba(61,107,90,'
const INDIGO = 'rgba(99,102,241,'

const SVG_W = 720
const SVG_H = 338

const FX = 78
const FY = 26
const FW = 580
const FH = 278
const F_R = FX + FW
const F_B = FY + FH

type Mode = 'human' | 'ai'

// Competitors on CONVENTIONAL axes only (AI shows the conventional map confidently)
// Positions scaled from original (FX 66→78, FY 20→26, FW 556→580, FH 208→278)
const COMPS = [
  { id: 'a', cx: 529, cy: 66  },
  { id: 'b', cx: 580, cy: 90  },
  { id: 'c', cx: 484, cy: 77  },
  { id: 'd', cx: 554, cy: 125 },
  { id: 'e', cx: 612, cy: 53  },
  { id: 'f', cx: 426, cy: 152 },
  { id: 'g', cx: 312, cy: 202 },
  { id: 'h', cx: 253, cy: 173 },
] as const

// Crowded zone on conventional axes (scaled; ry clamped so label stays inside field)
const CROWD = { cx: 512, cy: 108, rx: 142, ry: 86 }

// Conventional cluster upper-right → white space is lower-left.
// Mirrors CLAInteractive.computeWS(conventional): right = min(cx)−30, top = FY+FH*0.5
const WS_CONV = { x: FX + 6, y: FY + FH * 0.50, w: 223 - (FX + 6), h: F_B - (FY + FH * 0.50) - 6 }

// On the CONVENTIONAL map the lower-right area is also empty (no dot has cx>342 AND cy>182).
// This is used as a hint overlay: "the reframed axes would reveal white space here."
// Verified: g(312,202) is left of wsX; f(426,152) is above wsY; all others cy<182.
const WS_REFRAMED = { x: 342, y: 182, w: F_R - 342 - 6, h: F_B - 182 - 6 }

export default function CLAAIReactivated() {
  const [mode, setMode] = useState<Mode>('human')
  const prefersReduced = useReducedMotion()
  const isAI = mode === 'ai'

  const fade = prefersReduced ? { duration: 0 } : { duration: 0.30 }

  return (
    <div className="w-full space-y-5">
      {/* Toggle */}
      <div className="flex gap-2">
        {(['human', 'ai'] as Mode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className="px-4 py-2 rounded-full text-xs font-semibold transition-all"
            style={{
              background: mode === m
                ? m === 'ai' ? `${INDIGO}0.10)` : `${SAGE}0.10)`
                : 'transparent',
              border: `1px solid ${mode === m
                ? (m === 'ai' ? `${INDIGO}0.35)` : `${SAGE}0.35)`)
                : 'rgba(255,255,255,0.18)'}`,
              color: mode === m
                ? m === 'ai' ? `${INDIGO}1)` : `${SAGE}1)`
                : 'rgba(255,255,255,0.60)',
            }}
          >
            {m === 'human' ? 'Human-led analysis' : 'With AI (hypothetical)'}
          </button>
        ))}
      </div>

      {/* SVG */}
      <div className="w-full flex justify-center select-none">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          width="100%"
          style={{ overflow: 'visible' }}
          aria-label={isAI
            ? 'AI mode: conventional axes with all competitors confidently plotted. The reframed axis and the real white space on the right side remain dim — the human strategic move.'
            : 'Human mode: the analyst sees both the conventional map and knows to reframe the axes to find the actual white space.'}
        >
          <defs>
            <filter id="cla-ai-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="cla-ai-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="cla-ai-ws-glow" x="-15%" y="-20%" width="130%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <radialGradient id="cla-ai-crowd-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={isAI ? `${INDIGO}0.18)` : `${SAGE}0.15)`} />
              <stop offset="100%" stopColor="rgba(0,0,0,0)" />
            </radialGradient>
            <radialGradient id="cla-ai-ws-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor={`${SAGE}0.22)`} />
              <stop offset="100%" stopColor={`${SAGE}0.06)`} />
            </radialGradient>
          </defs>

          {/* Grid */}
          {[0.25, 0.50, 0.75].map((t) => (
            <React.Fragment key={t}>
              <line x1={FX + t * FW} y1={FY} x2={FX + t * FW} y2={F_B}
                stroke="rgba(255,255,255,0.06)" strokeWidth={0.7} />
              <line x1={FX} y1={FY + (1 - t) * FH} x2={F_R} y2={FY + (1 - t) * FH}
                stroke="rgba(255,255,255,0.06)" strokeWidth={0.7} />
            </React.Fragment>
          ))}

          {/* Axes */}
          <line x1={FX} y1={F_B} x2={F_R} y2={F_B}
            stroke="rgba(255,255,255,0.48)" strokeWidth={2} />
          <path d={`M ${F_R - 7} ${F_B - 4} L ${F_R + 2} ${F_B} L ${F_R - 7} ${F_B + 4}`}
            stroke="rgba(255,255,255,0.48)" strokeWidth={2} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />
          <line x1={FX} y1={F_B} x2={FX} y2={FY}
            stroke="rgba(255,255,255,0.48)" strokeWidth={2} />
          <path d={`M ${FX - 4} ${FY + 8} L ${FX} ${FY} L ${FX + 4} ${FY + 8}`}
            stroke="rgba(255,255,255,0.48)" strokeWidth={2} fill="none"
            strokeLinecap="round" strokeLinejoin="round" />

          {/* Axis labels — always CONVENTIONAL in AI mode */}
          <text x={FX + 6} y={F_B + 15} fontSize="8" fontFamily="var(--font-mono)"
            letterSpacing="0.10em" fill="rgba(255,255,255,0.38)"
            style={{ userSelect: 'none' }}>LOW</text>
          <text x={F_R - 6} y={F_B + 15} fontSize="8" fontFamily="var(--font-mono)"
            letterSpacing="0.10em" fill="rgba(255,255,255,0.38)" textAnchor="end"
            style={{ userSelect: 'none' }}>HIGH</text>
          <text x={(FX + F_R) / 2} y={F_B + 25} fontSize="8.5" fontFamily="var(--font-mono)"
            letterSpacing="0.14em" fill={`rgba(255,255,255,${isAI ? '0.50' : '0.42'})`} textAnchor="middle"
            style={{ userSelect: 'none' }}>PRICE →</text>

          <text
            transform={`rotate(-90, ${FX - 28}, ${(FY + F_B) / 2})`}
            x={FX - 28} y={(FY + F_B) / 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill={`rgba(255,255,255,${isAI ? '0.50' : '0.42'})`}
            style={{ userSelect: 'none' }}>↑ PRESTIGE LEVEL</text>

          {/* AI "conventional only" badge */}
          <AnimatePresence>
            {isAI && (
              <motion.g
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={fade}
              >
                <rect x={(FX + F_R) / 2 - 84} y={F_B + 32}
                  width={168} height={16} rx={4}
                  fill={`${INDIGO}0.10)`} stroke={`${INDIGO}0.30)`} strokeWidth={0.8} />
                <text x={(FX + F_R) / 2} y={F_B + 42} textAnchor="middle"
                  fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  fill={`${INDIGO}0.75)`} style={{ userSelect: 'none' }}>
                  AI: CONVENTIONAL AXES / DEFAULT FRAMING
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Crowded zone */}
          <ellipse
            cx={CROWD.cx} cy={CROWD.cy} rx={CROWD.rx} ry={CROWD.ry}
            fill="url(#cla-ai-crowd-grad)"
            stroke={isAI ? `${INDIGO}0.35)` : `${SAGE}0.25)`}
            strokeWidth={isAI ? 1.5 : 1} strokeDasharray="4 3"
          />
          <text x={CROWD.cx} y={Math.max(FY + 14, CROWD.cy - CROWD.ry + 22)} textAnchor="middle"
            fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill={isAI ? `${INDIGO}0.70)` : `${SAGE}0.65)`}
            style={{ userSelect: 'none' }}>
            {isAI ? 'AI: "MARKET IS CROWDED"' : 'CROWDED ZONE'}
          </text>

          {/* Competitors — 10px radius for legibility */}
          {COMPS.map((c) => (
            <circle key={c.id}
              cx={c.cx} cy={c.cy} r={10}
              fill={isAI ? `${INDIGO}0.18)` : `${SAGE}0.16)`}
              stroke={isAI ? `${INDIGO}0.78)` : `${SAGE}0.80)`}
              strokeWidth={2}
              filter="url(#cla-ai-glow-sm)"
            />
          ))}

          {/* White space — CONVENTIONAL (faint in AI mode because AI sees it but doesn't act on it) */}
          <motion.rect
            x={WS_CONV.x} y={WS_CONV.y} width={WS_CONV.w} height={WS_CONV.h}
            rx={6}
            fill="url(#cla-ai-ws-grad)"
            stroke={`${SAGE}${isAI ? '0.28' : '0.52'})`}
            strokeWidth={isAI ? 0.8 : 1.2}
            strokeDasharray="5 3"
            filter="url(#cla-ai-ws-glow)"
            animate={{ opacity: isAI ? 0.45 : 1.0 }}
            transition={fade}
          />
          <motion.text x={WS_CONV.x + WS_CONV.w / 2} y={WS_CONV.y + WS_CONV.h / 2}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill={`${SAGE}${isAI ? '0.40' : '0.90'})`}
            animate={{ opacity: isAI ? 0.5 : 1.0 }}
            transition={fade}
            style={{ userSelect: 'none' }}>
            {isAI ? 'white space' : 'WHITE SPACE'}
          </motion.text>

          {/* Reframed white space (human knows about this; AI doesn't surface it) */}
          <AnimatePresence>
            {!isAI && (
              <motion.g
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={fade}
              >
                <rect
                  x={WS_REFRAMED.x} y={WS_REFRAMED.y}
                  width={WS_REFRAMED.w} height={WS_REFRAMED.h}
                  rx={6}
                  fill="rgba(61,107,90,0.08)"
                  stroke={`${SAGE}0.38)`} strokeWidth={1}
                  strokeDasharray="3 4"
                />
                <text x={WS_REFRAMED.x + WS_REFRAMED.w / 2}
                  y={WS_REFRAMED.y + WS_REFRAMED.h / 2 - 8}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                  fill={`${SAGE}0.62)`}
                  style={{ userSelect: 'none' }}>
                  REFRAMED WHITE SPACE
                </text>
                <text x={WS_REFRAMED.x + WS_REFRAMED.w / 2}
                  y={WS_REFRAMED.y + WS_REFRAMED.h / 2 + 10}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7.5" fontFamily="var(--font-mono)"
                  fill={`${SAGE}0.40)`}
                  style={{ userSelect: 'none' }}>
                  visible on new axes
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* AI mode: "reframe" ghost button — dim, labelled as out of reach */}
          <AnimatePresence>
            {isAI && (
              <motion.g
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={fade}
              >
                <rect x={WS_REFRAMED.x} y={WS_REFRAMED.y}
                  width={WS_REFRAMED.w} height={WS_REFRAMED.h}
                  rx={6}
                  fill="rgba(255,255,255,0.02)"
                  stroke="rgba(255,255,255,0.10)" strokeWidth={0.8}
                  strokeDasharray="3 5"
                />
                <text x={WS_REFRAMED.x + WS_REFRAMED.w / 2}
                  y={WS_REFRAMED.y + WS_REFRAMED.h / 2 - 8}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="9" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  fill="rgba(255,255,255,0.22)"
                  style={{ userSelect: 'none' }}>
                  HUMAN REFRAME REQUIRED
                </text>
                <text x={WS_REFRAMED.x + WS_REFRAMED.w / 2}
                  y={WS_REFRAMED.y + WS_REFRAMED.h / 2 + 10}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="7.5" fontFamily="var(--font-mono)"
                  fill="rgba(255,255,255,0.13)"
                  style={{ userSelect: 'none' }}>
                  axis not in training data
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </div>

      {/* Cards */}
      <AnimatePresence mode="wait">
        {!isAI ? (
          <motion.div key="human-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="rounded-lg border p-5 space-y-2"
              style={{ borderColor: `${SAGE}0.22)`, background: `${SAGE}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: `${SAGE}0.85)` }}>Human advantage: the reframe</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                A human analyst looks at the conventional map (price × prestige, everyone in the crowded zone)
                and thinks to ask: &ldquo;what axis is the industry NOT competing on?&rdquo; That question, and the axis
                it reveals, is the move that surfaces white space invisible on the default framing.
              </p>
            </div>
            <div className="rounded-lg border p-5 space-y-2"
              style={{ borderColor: `${SAGE}0.18)`, background: `${SAGE}0.03)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest"
                style={{ color: `${SAGE}0.75)` }}>Human advantage: judging the gap</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                Once the white space appears, telling an un-served opportunity from an unviable void requires
                customer understanding — not just a gap on the map. That judgment combines the positioning
                map with interviews, observation, and concept testing: all human work.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ai-cards"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-lg border p-5 space-y-2"
                style={{ borderColor: `${INDIGO}0.22)`, background: `${INDIGO}0.04)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.80)` }}>AI accelerates: gathering and mapping</p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  AI gathers competitive information fast and produces a solid first-pass map — who is playing,
                  how they describe themselves, where they cluster. On the conventional axes the industry uses,
                  AI assembles the documented landscape quickly and accurately. Genuine time savings.
                </p>
              </div>
              <div className="rounded-lg border p-5 space-y-2"
                style={{ borderColor: `${INDIGO}0.18)`, background: `${INDIGO}0.03)` }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest"
                  style={{ color: `${INDIGO}0.70)` }}>AI limitation: the framing trap</p>
                <p className="text-sm text-neutral-700 leading-relaxed">
                  AI maps the field on the axes the industry is already using — because those are the axes
                  the existing literature uses. It cannot propose the fresh axis that reveals a gap the
                  industry is not measuring, because that axis appears nowhere in its training data by design.
                  The method&rsquo;s most valuable move is invisible to the default prompt.
                </p>
              </div>
            </div>
            <div className="rounded-lg border p-5"
              style={{ borderColor: `${INDIGO}0.20)`, background: `${INDIGO}0.04)` }}>
              <p className="text-[10px] font-semibold uppercase tracking-widest mb-2"
                style={{ color: `${INDIGO}0.80)` }}>Where AI helps most</p>
              <p className="text-sm text-neutral-700 leading-relaxed">
                AI is strongest at the legwork: cataloging players, summarizing stated positioning, and populating
                the map on axes you specify. The research that normally takes days can be compressed to hours.
                The gap is the reframe: when you tell AI specifically &ldquo;map this market on unconventional axes
                the industry is not using,&rdquo; it can explore alternatives — but the choice of which reframe is
                strategic and which gap is a real opportunity stays with the human who understands customer need.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

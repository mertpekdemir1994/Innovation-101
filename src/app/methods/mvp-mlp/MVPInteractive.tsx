'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const BRICK = 'rgba(138,75,60,'

const SVG_W = 700
const SVG_H = 280

// Geometry (identical to MVPEstablishing)
const CORE_X = 206, CORE_Y = 20, CORE_W = 288, CORE_H = 110
const CORE_CX = CORE_X + CORE_W / 2
const CORE_CY = CORE_Y + CORE_H / 2

// MVP/MLP badge height grown 80 -> 100: at 11pt the bottom caption line no
// longer fits on one line, so it splits into two.
const MVP_X = 22, MVP_Y = 36, MVP_W = 158, MVP_H = 100
const MVP_CX = MVP_X + MVP_W / 2

const MLP_X = 520, MLP_Y = 36, MLP_W = 158, MLP_H = 100
const MLP_CX = MLP_X + MLP_W / 2

// CORE ACTION and CORE FEATURE widened (80->90, 90->98): at 11pt their labels
// no longer fit the old tile width. Neighbors repositioned to keep the gaps.
const FTILES = [
  { x: 218, y: 38, w: 82,  h: 26, label: 'CORE VALUE'   },
  { x: 306, y: 38, w: 90,  h: 26, label: 'CORE ACTION'  },
  { x: 402, y: 38, w: 86,  h: 26, label: 'CORE DATA'    },
  { x: 246, y: 74, w: 98,  h: 26, label: 'CORE FEATURE' },
  { x: 354, y: 74, w: 86,  h: 26, label: 'CORE FLOW'    },
]

const CUT_X = 206, CUT_Y = 164, CUT_W = 288, CUT_H = 72
const CUT_CX = CORE_CX

const CITEMS = [
  { x: 218, y: 180, w: 80, h: 22, label: 'NON-CORE'    },
  { x: 308, y: 180, w: 76, h: 22, label: 'NOT YET'     },
  { x: 394, y: 180, w: 90, h: 22, label: 'FUTURE V2'   },
  { x: 258, y: 212, w: 88, h: 22, label: 'EXTRA FEAT.' },
  { x: 356, y: 212, w: 80, h: 22, label: 'LATER...'    },
]

type ActiveItem = 'mvp' | 'mlp' | 'core' | 'cuts'

interface InfoCard {
  tag: string
  headline: string
  body: string
  risk?: string
  riskLabel?: string
}

const CARDS: Record<ActiveItem, InfoCard> = {
  core: {
    tag: 'SAME SCOPE',
    headline: 'The scope is identical. An MLP is not bigger than an MVP.',
    body: 'Both products build only this core: the small set of features that actually delivers the central value. Toggling between MVP and MLP does not change what you build; it changes what you optimize the build for. If your MLP has more features than your MVP would have, you have not built an MLP; you have built a bigger product and given it a nicer name. The prioritization work is the same. The ruthless cutting is the same. Only the optimization differs.',
  },
  cuts: {
    tag: 'BOTH CUT THESE',
    headline: 'Both products discarded these. Neither is the full product.',
    body: 'The same hard prioritization work applies whether you are building an MVP or an MLP. Everything not in the core is cut for both. This is not a later consideration: deciding what to cut is the hardest and most valuable part of the work. An MLP does not get a pass on cutting. It holds the same hard line on scope as the MVP. Everything in this pile belongs to later, or possibly never.',
  },
  mvp: {
    tag: 'MVP OPTIMIZATION',
    headline: 'Tuned for validated learning at minimum cost.',
    body: 'The core is executed to generate the cheapest honest signal from the market. Fast, low-cost, built to answer whether people will adopt this at all. Speed and cost are the virtues here: get a real signal from real users before investing further. In a novel category with low expectations, a bare MVP can teach you a great deal: people will tolerate rough edges for something that solves a real problem no one else solves.',
    riskLabel: 'RISK: THE FALSE NEGATIVE',
    risk: 'A joyless product in a market with any expectations can be rejected for its execution rather than its idea. The team reads that rejection as a verdict on the concept and kills something that could have worked. That is the false negative, and it is how good ideas get killed by bad tests.',
  },
  mlp: {
    tag: 'MLP OPTIMIZATION',
    headline: 'Tuned for genuine love, same scope, different execution quality.',
    body: 'The core is executed with enough craft, care, and emotional resonance that early users become advocates rather than reluctant testers. Same ruthless scope, but the build effort goes into the quality of the core rather than the quantity of features. The signal this produces is about the IDEA as people would actually experience it, not about your indifference. In a crowded, high-expectation market, lovable is often part of viable at all.',
    riskLabel: 'RISK: OVER-BUILDING',
    risk: '"We need it to be lovable" is an infinitely elastic excuse for not shipping. Endless polishing in the name of love means never learning. Lovable still means MINIMUM. If you are using "MLP" to justify keeping features or delaying the release, you have inverted the method.',
  },
}

export default function MVPInteractive() {
  const [active, setActive] = useState<ActiveItem>('mvp')
  const prefersReduced = useReducedMotion()

  const card = CARDS[active]
  const mvpIsActive = active === 'mvp'
  const mlpIsActive = active === 'mlp'
  const coreIsActive = active === 'core'
  const cutsIsActive = active === 'cuts'

  const mvpOp  = mlpIsActive || cutsIsActive ? 0.30 : 1.0
  const mlpOp  = mvpIsActive || cutsIsActive ? 0.30 : 1.0
  const coreHi = coreIsActive
  const cutsHi = cutsIsActive

  return (
    <div className="w-full">
      <div role="group"
 aria-label="Interactive MVP and MLP comparison. Toggle between MVP and MLP optimization to see what each buys and risks. Click the Shared Core or Shared Cut Pile for more about the identical scope.">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%"
          preserveAspectRatio="xMidYMid meet" style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block' }}>
          <defs>
            <filter id="mvpi-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feFlood floodColor={`${BRICK}0.40)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="mvpi-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur" />
              <feFlood floodColor={`${BRICK}0.45)`} result="color" />
              <feComposite in="color" in2="blur" operator="in" result="glow" />
              <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Shared core */}
          <rect x={CORE_X - 4} y={CORE_Y - 4} width={CORE_W + 8} height={CORE_H + 8} rx={12}
            fill="none" stroke={`${BRICK}0.08)`} strokeWidth={8}
            style={{ filter: 'url(#mvpi-glow)' }} />
          <rect x={CORE_X} y={CORE_Y} width={CORE_W} height={CORE_H} rx={8}
            fill={coreHi ? `${BRICK}0.12)` : `${BRICK}0.05)`}
            stroke={coreHi ? `${BRICK}0.58)` : `${BRICK}0.32)`}
            strokeWidth={1.3}
            style={{ transition: 'fill 0.22s, stroke 0.22s', cursor: 'pointer' }} />
          {/* "· IDENTICAL IN BOTH PRODUCTS" dropped: at 11pt the full line
              overflowed the core box, and the MVP/MLP badges either side of
              a single shared core already make the point */}
          <text x={CORE_CX} y={CORE_Y + 11}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.14em"
            fill={coreHi ? `rgba(183,145,135,0.958)` : `rgba(183,145,135,0.899)`}
            style={{ userSelect: 'none', transition: 'fill 0.22s' }}>
            SHARED CORE
          </text>

          {/* Feature tiles: IDENTICAL count and labels regardless of mvp/mlp toggle */}
          {FTILES.map((t, i) => (
            <g key={i}>
              <rect x={t.x} y={t.y} width={t.w} height={t.h} rx={3}
                fill={`${BRICK}0.10)`} stroke={`${BRICK}0.48)`} strokeWidth={0.9}
                style={{ filter: 'url(#mvpi-glow-sm)' }} />
              <text x={t.x + t.w / 2} y={t.y + t.h / 2 + 1}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.09em"
                fill={`rgba(183,145,135,0.958)`} style={{ userSelect: 'none' }}>
                {t.label}
              </text>
            </g>
          ))}

          {/* Connectors */}
          <line x1={CORE_X} y1={CORE_CY} x2={MVP_X + MVP_W} y2={MVP_Y + MVP_H / 2}
            stroke={`${BRICK}0.22)`} strokeWidth={0.9} strokeDasharray="4 3"
            style={{ opacity: mvpOp, transition: 'opacity 0.25s' }} />
          <line x1={CORE_X + CORE_W} y1={CORE_CY} x2={MLP_X} y2={MLP_Y + MLP_H / 2}
            stroke={`${BRICK}0.22)`} strokeWidth={0.9} strokeDasharray="4 3"
            style={{ opacity: mlpOp, transition: 'opacity 0.25s' }} />
          <line x1={CORE_CX} y1={CORE_Y + CORE_H} x2={CUT_CX} y2={CUT_Y - 2}
            stroke={`${BRICK}0.18)`} strokeWidth={0.9} strokeDasharray="3 3" />

          {/* MVP badge */}
          <g style={{ opacity: mvpOp, transition: 'opacity 0.25s', cursor: 'pointer' }}
            role="button" aria-pressed={mvpIsActive} aria-label="Toggle MVP optimization"
            tabIndex={0}
            onClick={() => setActive('mvp')}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setActive('mvp')}>
            <rect x={MVP_X} y={MVP_Y} width={MVP_W} height={MVP_H} rx={6}
              fill={mvpIsActive ? `${BRICK}0.12)` : `${BRICK}0.06)`}
              stroke={mvpIsActive ? `${BRICK}0.58)` : `${BRICK}0.32)`}
              strokeWidth={1.1}
              style={{ transition: 'fill 0.22s, stroke 0.22s' }} />
            <text x={MVP_CX} y={MVP_Y + 16} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
              fill={`${BRICK}${mvpIsActive ? '0.65)' : '0.40)'}`}
              style={{ userSelect: 'none', transition: 'fill 0.22s' }}>MVP</text>
            <text x={MVP_CX} y={MVP_Y + 32} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`rgba(183,145,135,0.857)`} style={{ userSelect: 'none' }}>TUNED FOR</text>
            <text x={MVP_CX} y={MVP_Y + 52} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
              fill={`${BRICK}${mvpIsActive ? '0.95)' : '0.65)'}`}
              style={{ userSelect: 'none', transition: 'fill 0.22s' }}>LEARNING</text>
            {/* Split across two lines: "FAST · CHEAP · HONEST SIGNAL" no
                longer fits the 158-wide badge on one line at 11pt */}
            <text x={MVP_CX} y={MVP_Y + 72} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
              fill={`rgba(183,145,135,0.885)`} style={{ userSelect: 'none' }}>FAST · CHEAP</text>
            <text x={MVP_CX} y={MVP_Y + 88} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
              fill={`rgba(183,145,135,0.885)`} style={{ userSelect: 'none' }}>HONEST SIGNAL</text>
          </g>

          {/* MLP badge */}
          <g style={{ opacity: mlpOp, transition: 'opacity 0.25s', cursor: 'pointer' }}
            role="button" aria-pressed={mlpIsActive} aria-label="Toggle MLP optimization"
            tabIndex={0}
            onClick={() => setActive('mlp')}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setActive('mlp')}>
            <rect x={MLP_X} y={MLP_Y} width={MLP_W} height={MLP_H} rx={6}
              fill={mlpIsActive ? `${BRICK}0.12)` : `${BRICK}0.06)`}
              stroke={mlpIsActive ? `${BRICK}0.58)` : `${BRICK}0.32)`}
              strokeWidth={1.1}
              style={{ transition: 'fill 0.22s, stroke 0.22s' }} />
            <text x={MLP_CX} y={MLP_Y + 16} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.14em" fontWeight="600"
              fill={`${BRICK}${mlpIsActive ? '0.65)' : '0.40)'}`}
              style={{ userSelect: 'none', transition: 'fill 0.22s' }}>MLP</text>
            <text x={MLP_CX} y={MLP_Y + 32} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`rgba(183,145,135,0.857)`} style={{ userSelect: 'none' }}>TUNED FOR</text>
            <text x={MLP_CX} y={MLP_Y + 52} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
              fill={`${BRICK}${mlpIsActive ? '0.95)' : '0.65)'}`}
              style={{ userSelect: 'none', transition: 'fill 0.22s' }}>LOVE</text>
            {/* Split across two lines: "CRAFT · RESONANCE · ADVOCATES" no
                longer fits the 158-wide badge on one line at 11pt */}
            <text x={MLP_CX} y={MLP_Y + 72} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
              fill={`rgba(183,145,135,0.885)`} style={{ userSelect: 'none' }}>CRAFT · RESONANCE</text>
            <text x={MLP_CX} y={MLP_Y + 88} textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
              fill={`rgba(183,145,135,0.885)`} style={{ userSelect: 'none' }}>ADVOCATES</text>
          </g>

          {/* Cut pile */}
          <g style={{ cursor: 'pointer' }}
            role="button" aria-pressed={cutsIsActive} aria-label="Explore: shared cut pile"
            tabIndex={0}
            onClick={() => setActive(cutsIsActive ? 'mvp' : 'cuts')}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setActive(cutsIsActive ? 'mvp' : 'cuts')}>
            {/* "· BOTH DISCARDED THESE" dropped: at 11pt it overflowed the
                cut box, and the dashed styling + item labels already say it */}
            <text x={CUT_CX} y={CUT_Y - 8}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={cutsHi ? `rgba(183,145,135,0.905)` : 'rgba(255,255,255,0.58)'}
              style={{ userSelect: 'none', transition: 'fill 0.22s' }}>
              SHARED CUT PILE
            </text>
            <rect x={CUT_X} y={CUT_Y} width={CUT_W} height={CUT_H} rx={6}
              fill={cutsHi ? `${BRICK}0.07)` : 'none'}
              stroke={cutsHi ? `${BRICK}0.30)` : 'rgba(255,255,255,0.10)'}
              strokeWidth={0.9} strokeDasharray="5 4"
              style={{ transition: 'fill 0.22s, stroke 0.22s' }} />
            {CITEMS.map((c, i) => (
              <g key={i}>
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx={3}
                  fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth={0.7}
                  strokeDasharray="3 3" />
                <text x={c.x + c.w / 2} y={c.y + c.h / 2 + 1}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.08em"
                  fill="rgba(255,255,255,0.59)" style={{ userSelect: 'none' }}>
                  {c.label}
                </text>
              </g>
            ))}
          </g>

          {/* Invisible hit area for CORE */}
          <rect x={CORE_X} y={CORE_Y} width={CORE_W} height={CORE_H} rx={8}
            fill="transparent" style={{ cursor: 'pointer' }}
            role="button" aria-pressed={coreIsActive} aria-label="Explore: shared core"
            tabIndex={0}
            onClick={() => setActive(coreIsActive ? 'mvp' : 'core')}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setActive(coreIsActive ? 'mvp' : 'core')}
          />
        </svg>
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22 }}
          className="mt-4 rounded-xl p-6 border"
          style={{ background: `${BRICK}0.05)`, borderColor: `${BRICK}0.22)` }}>
          <p className="text-2xs font-mono font-semibold uppercase tracking-widest mb-2"
            style={{ color: `${BRICK}0.85)` }}>
            {card.tag}
          </p>
          <h3 className="font-semibold mb-3"
            style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
            {card.headline}
          </h3>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            {card.body}
          </p>
          {card.risk && (
            <div className="mt-4 rounded-lg p-4"
              style={{ background: 'rgba(217,119,6,0.05)', borderLeft: '2px solid rgba(217,119,6,0.35)' }}>
              <p className="text-2xs font-mono font-semibold uppercase tracking-widest mb-1"
                style={{ color: 'rgba(217,119,6,0.95)' }}>
                {card.riskLabel}
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                {card.risk}
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Market condition note: visible when toggling between optimizations */}
      {(mvpIsActive || mlpIsActive) && (
        <div className="mt-4 rounded-lg p-4"
          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.10)' }}>
          <p className="text-2xs font-mono font-semibold uppercase tracking-widest mb-1"
            style={{ color: 'rgba(255,255,255,0.50)' }}>
            THE MARKET CONDITION THAT TIPS THE CHOICE
          </p>
          <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.55)', lineHeight: 'var(--leading-relaxed)' }}>
            Novel category, low expectations → a bare MVP can teach a lot. Crowded, high-expectation market → an unlovable MVP teaches almost nothing, because users leave for alternatives. The more competitive and expectation-laden the market, the more &ldquo;lovable&rdquo; is part of &ldquo;viable&rdquo; at all.
          </p>
        </div>
      )}

      {/* Zone legend buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        {([
          { id: 'mvp',  label: 'MVP OPTIMIZATION' },
          { id: 'mlp',  label: 'MLP OPTIMIZATION' },
          { id: 'core', label: 'SHARED CORE'       },
          { id: 'cuts', label: 'SHARED CUT PILE'   },
        ] as { id: ActiveItem; label: string }[]).map(btn => (
          <button key={btn.id}
            onClick={() => setActive(btn.id)}
            aria-pressed={active === btn.id}
            className="px-3 py-1 rounded-full text-2xs font-mono font-semibold uppercase tracking-widest transition-all"
            style={{
              background: active === btn.id ? `${BRICK}0.10)` : 'transparent',
              border: `1px solid ${active === btn.id ? `${BRICK}0.38)` : 'rgba(255,255,255,0.12)'}`,
              color: active === btn.id ? `${BRICK}1)` : 'rgba(255,255,255,0.50)',
            }}>
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

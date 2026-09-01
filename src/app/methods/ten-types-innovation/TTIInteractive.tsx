'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM = 'rgba(107,74,119,'

const SVG_W = 700
const TILE_W = 60
const TILE_H = 104
const TILE_R = 6
const TILE_Y = 58
const TILE_CY = TILE_Y + TILE_H / 2  // 110

const CAT_LABEL_Y = 17
const CAT_LINE_Y  = 32

const CATEGORIES = [
  { id: 'config',   label: 'CONFIGURATION', x1: 16,  x2: 268, cx: 142 },
  { id: 'offering', label: 'OFFERING',      x1: 288, x2: 412, cx: 350 },
  { id: 'exp',      label: 'EXPERIENCE',    x1: 432, x2: 684, cx: 558 },
]

type TypeId =
  | 'profit-model' | 'network' | 'structure' | 'process'
  | 'product-performance' | 'product-system'
  | 'service' | 'channel' | 'brand' | 'customer-engagement'

const TILES: { id: TypeId; cat: string; x: number; lines: string[] }[] = [
  { id: 'profit-model',        cat: 'config',   x: 16,  lines: ['PROFIT', 'MODEL'] },
  { id: 'network',             cat: 'config',   x: 80,  lines: ['NETWORK'] },
  { id: 'structure',           cat: 'config',   x: 144, lines: ['STRUCTURE'] },
  { id: 'process',             cat: 'config',   x: 208, lines: ['PROCESS'] },
  { id: 'product-performance', cat: 'offering', x: 288, lines: ['PRODUCT', 'PERF.'] },
  { id: 'product-system',      cat: 'offering', x: 352, lines: ['PRODUCT', 'SYSTEM'] },
  { id: 'service',             cat: 'exp',      x: 432, lines: ['SERVICE'] },
  { id: 'channel',             cat: 'exp',      x: 496, lines: ['CHANNEL'] },
  { id: 'brand',               cat: 'exp',      x: 560, lines: ['BRAND'] },
  { id: 'customer-engagement', cat: 'exp',      x: 624, lines: ['CUSTOMER', 'ENGAGE.'] },
]

interface Detail {
  heading: string
  body: string
  example: string
}

const TYPE_DETAILS: Record<TypeId, Detail> = {
  'profit-model': {
    heading: 'Profit Model',
    body: 'How the business makes money: the pricing and revenue logic that turns value into profit. Innovating here means finding a fundamentally different way to charge than the industry norm. It is often the most overlooked and most effective lever, precisely because competitors are fixated on the product. A novel profit model can make an ordinary product extraordinary, and is far harder for competitors to replicate than any feature improvement because it requires rebuilding the financial logic of the whole business.',
    example: 'The razor-and-blades model (inexpensive device, recurring high-margin refills), or shifting from one-time purchase to subscription billing that creates predictable recurring revenue.',
  },
  'network': {
    heading: 'Network',
    body: 'How a business connects with other companies, partners, and platforms to create value it could not produce alone. A distinctive network creates access, reach, or capability that rivals struggle to replicate, because a set of relationships takes time to build and is impossible to copy quickly. Network innovations are often invisible to the outside but compound over time.',
    example: 'A platform that turns suppliers and complementors into a value-creating ecosystem around your offering: each new partner makes the whole network more valuable.',
  },
  'structure': {
    heading: 'Structure',
    body: 'How a business organizes and aligns its talent, assets, and capabilities. Structural innovations (unique talent models, novel organizational forms, distinctive ways of working) create performance advantages that are hard to see from the outside and therefore hard for competitors to replicate directly. What a competitor cannot observe, they cannot copy.',
    example: 'A distinctive internal structure that concentrates rare expertise where it compounds, building a capability that cannot simply be acquired by hiring from the outside.',
  },
  'process': {
    heading: 'Process',
    body: 'The distinctive methods and approaches a business uses to get work done. Process innovations (proprietary methods, novel manufacturing techniques, distinctive operating procedures) are often deeply sustainable advantages because they cannot be bought or licensed. Competitors have to develop them independently, which takes years of practice and failure that cannot be skipped.',
    example: 'A proprietary production process that yields a cost or quality no rival can match quickly, because they cannot see it in action and cannot replicate it without building from scratch.',
  },
  'product-performance': {
    heading: 'Product Performance',
    body: 'The features, quality, and functionality of the product or service itself, what most people think of first when they hear "innovation." It matters and is necessary, but it is usually the hardest place to hold an advantage. A better feature can be observed, benchmarked, and matched, often within a single season. Innovation concentrated entirely here (which describes most organizations) is fragile, because any competitor with the same development budget can copy it.',
    example: 'A standout feature, an improved quality tier, expanded functionality. Valuable in the short term; quickly matched by any competitor paying attention to the product roadmap.',
  },
  'product-system': {
    heading: 'Product System',
    body: 'How individual products connect into a larger platform, suite, or ecosystem, so the whole is worth more than the parts. Innovating here means designing complementary products and integrations that lock in value and raise switching costs. A competitor has to replicate not just the best individual product but the entire system, which is a much harder target.',
    example: 'A family of devices and services that work seamlessly together but are far less useful apart, making each new addition increase the switching cost and deepen the lock-in.',
  },
  'service': {
    heading: 'Service',
    body: 'The support, guarantees, and enhancements that surround the core offering and make it easier, safer, or more delightful to use. Strong service innovation can turn an ordinary product into a preferred one. Great service is a cultural and operational capability, not a feature you can ship, which is what makes it difficult to reverse-engineer and relatively durable.',
    example: 'A level of support or a guarantee that removes the risk and friction rivals leave in place, turning a transaction into an ongoing relationship customers value beyond the product itself.',
  },
  'channel': {
    heading: 'Channel',
    body: 'How you deliver your offering to customers: where and how they find, buy, and receive it. A novel channel can reach customers rivals cannot, or reach them in a fundamentally better way. A distinctive channel creates reach and control that competitors cannot quickly replicate, and can lock out alternatives independent of the product itself.',
    example: 'Going direct-to-consumer in a category that traditionally sold only through intermediaries, reaching customers more directly, understanding them better, and capturing margin previously shared with the channel.',
  },
  'brand': {
    heading: 'Brand',
    body: 'How you represent your offering and how you are recognized, trusted, and chosen. Brand innovation builds meaning and loyalty that competitors cannot copy by matching features. A strong brand tolerates pricing power, creates loyalty, and attracts both customers and talent that products alone cannot. It operates on customers\' sense of identity and belonging, which is what makes it durable.',
    example: 'A brand that comes to stand for something customers identify with, commanding preference and price premium even when a technically comparable alternative exists.',
  },
  'customer-engagement': {
    heading: 'Customer Engagement',
    body: 'The interactions, rituals, and ongoing relationship that build loyalty and keep customers coming back. Innovating here means designing distinctive engagement that keeps customers close well beyond the transaction. The strongest engagement innovations turn customers into advocates and make switching feel like losing something valuable beyond the product itself.',
    example: 'A community, ritual, or membership that makes customers feel part of something, creating belonging and habits that are sticky in ways no product feature can replicate.',
  },
}

export default function TTIInteractive() {
  const [active, setActive] = useState<TypeId | null>(null)
  const [hovered, setHovered] = useState<TypeId | null>(null)
  const prefersReduced = useReducedMotion()

  function handleClick(id: TypeId) {
    setActive(prev => prev === id ? null : id)
  }

  function handleKey(e: React.KeyboardEvent, id: TypeId) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleClick(id) }
  }

  const SVG_H = 170

  function tileFill(id: TypeId) {
    if (id === active)   return `${PLUM}0.30)`
    if (id === hovered)  return `${PLUM}0.18)`
    if (active !== null) return `${PLUM}0.04)`
    return `${PLUM}0.18)`
  }

  function tileStroke(id: TypeId) {
    if (id === active)   return `${PLUM}0.92)`
    if (id === hovered)  return `${PLUM}0.62)`
    if (active !== null) return `${PLUM}0.16)`
    return `${PLUM}0.65)`
  }

  function tileTextFill(id: TypeId) {
    if (id === active)   return `${PLUM}1.0)`
    if (id === hovered)  return `${PLUM}0.90)`
    if (active !== null) return `${PLUM}0.24)`
    return `${PLUM}0.92)`
  }

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        style={{ overflow: 'visible' }}
        role="group"
        aria-label="10 Types of Innovation, click any tile to read about that type in depth"
      >
        <defs>
          <filter id="tti-int-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Category backgrounds */}
        {CATEGORIES.map((cat) => (
          <rect
            key={cat.id}
            x={cat.x1 - 4} y={CAT_LINE_Y - 2}
            width={cat.x2 - cat.x1 + 8}
            height={TILE_Y + TILE_H - CAT_LINE_Y + 14}
            rx={8}
            fill={`${PLUM}0.06)`}
            stroke={active && TILES.find(t => t.id === active)?.cat === cat.id ? `${PLUM}0.32)` : `${PLUM}0.16)`}
            strokeWidth={1}
            style={{ transition: 'stroke 0.22s' }}
          />
        ))}

        {/* Category labels */}
        {CATEGORIES.map((cat) => (
          <g key={`lbl-${cat.id}`}>
            <text
              x={cat.cx} y={CAT_LABEL_Y}
              textAnchor="middle"
              fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.12em"
              fill={active && TILES.find(t => t.id === active)?.cat === cat.id ? `${PLUM}0.85)` : `${PLUM}0.55)`}
              style={{ userSelect: 'none', transition: 'fill 0.22s' }}
            >
              {cat.label}
            </text>
            <line
              x1={cat.x1 - 2} y1={CAT_LINE_Y} x2={cat.x2 + 2} y2={CAT_LINE_Y}
              stroke={`${PLUM}0.22)`} strokeWidth={1}
            />
          </g>
        ))}

        {/* Tiles */}
        {TILES.map((tile) => {
          const cx = tile.x + TILE_W / 2
          const isActive = tile.id === active

          return (
            <g
              key={tile.id}
              style={{ cursor: 'pointer' }}
              onClick={() => handleClick(tile.id)}
              onMouseEnter={() => setHovered(tile.id)}
              onMouseLeave={() => setHovered(null)}
              role="button"
              tabIndex={0}
              aria-label={`${tile.lines.join(' ')}, ${isActive ? 'active, click to deselect' : 'click to read about this type'}`}
              aria-pressed={isActive}
              onKeyDown={(e) => handleKey(e, tile.id)}
            >
              <motion.rect
                x={tile.x} y={TILE_Y}
                width={TILE_W} height={TILE_H}
                rx={TILE_R}
                strokeWidth={isActive ? 2 : 1.2}
                filter={isActive ? 'url(#tti-int-glow)' : undefined}
                animate={{ fill: tileFill(tile.id), stroke: tileStroke(tile.id) }}
                transition={{ duration: prefersReduced ? 0 : 0.22 }}
              />

              {tile.lines.length === 1 ? (
                <motion.text
                  x={cx} y={TILE_CY}
                  textAnchor="middle" dominantBaseline="middle"
                  fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                  style={{ userSelect: 'none', pointerEvents: 'none' }}
                  animate={{ fill: tileTextFill(tile.id) }}
                  transition={{ duration: prefersReduced ? 0 : 0.22 }}
                >
                  {tile.lines[0]}
                </motion.text>
              ) : (
                <>
                  <motion.text
                    x={cx} y={TILE_CY - 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                    animate={{ fill: tileTextFill(tile.id) }}
                    transition={{ duration: prefersReduced ? 0 : 0.22 }}
                  >
                    {tile.lines[0]}
                  </motion.text>
                  <motion.text
                    x={cx} y={TILE_CY + 8}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize="8.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                    style={{ userSelect: 'none', pointerEvents: 'none' }}
                    animate={{ fill: tileTextFill(tile.id) }}
                    transition={{ duration: prefersReduced ? 0 : 0.22 }}
                  >
                    {tile.lines[1]}
                  </motion.text>
                </>
              )}
            </g>
          )
        })}

        {/* Idle hint */}
        {!active && (
          <text
            x={SVG_W / 2} y={SVG_H - 4}
            textAnchor="middle"
            fontSize="6" fontFamily="var(--font-mono)" letterSpacing="0.08em"
            fill="rgba(255,255,255,0.22)"
            style={{ userSelect: 'none' }}
          >
            CLICK ANY TILE TO READ ABOUT THAT TYPE IN DEPTH
          </text>
        )}
      </svg>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{ duration: prefersReduced ? 0 : 0.22 }}
            className="mt-6 rounded-lg p-5 border"
            style={{ background: `${PLUM}0.09)`, borderColor: `${PLUM}0.28)` }}
          >
            <p
              className="font-mono uppercase tracking-widest mb-3"
              style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.85)` }}
            >
              {TYPE_DETAILS[active].heading}
            </p>
            <p className="mb-4"
              style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.72)', lineHeight: 'var(--leading-relaxed)' }}>
              {TYPE_DETAILS[active].body}
            </p>
            <div
              className="rounded px-4 py-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderLeft: `2px solid ${PLUM}0.42)`,
              }}
            >
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: '8px', letterSpacing: '0.12em', color: `${PLUM}0.55)` }}>
                EXAMPLE
              </p>
              <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.58)', lineHeight: 'var(--leading-relaxed)' }}>
                {TYPE_DETAILS[active].example}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.15 }}
            className="mt-5 text-center"
            style={{ fontSize: 'var(--text-xs)', color: 'rgba(255,255,255,0.22)', fontStyle: 'italic' }}
          >
            Select a tile to read what that type means and a concrete example.
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

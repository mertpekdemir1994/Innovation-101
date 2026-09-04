'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const AMBER = 'rgba(217,119,6,'

const SVG_W = 700
const COL_X  = [22, 251, 480] as const
const COL_W  = 207
const LEVER_H   = 46
const LEVER_GAP = 8
const FIRST_LEVER_Y = 52

type LeverId =
  | 'segment' | 'offering' | 'revenue' | 'bundling'
  | 'valuechain' | 'cost' | 'org' | 'tech'
  | 'channels' | 'crm' | 'brand' | 'partners'

type Col = 0 | 1 | 2

interface LeverSpec {
  id: LeverId
  col: Col
  i: number
  label: string
  sub: string
  overpulled?: boolean
  neglected?: boolean
}

const LEVERS: LeverSpec[] = [
  { id: 'segment',    col: 0, i: 0, label: 'TARGET SEGMENT',  sub: 'who you serve' },
  { id: 'offering',   col: 0, i: 1, label: 'OFFERING',        sub: 'product & service', overpulled: true },
  { id: 'revenue',    col: 0, i: 2, label: 'REVENUE MODEL',   sub: 'how you charge',    neglected: true },
  { id: 'bundling',   col: 0, i: 3, label: 'BUNDLING',        sub: 'how you package' },
  { id: 'valuechain', col: 1, i: 0, label: 'VALUE CHAIN',     sub: 'how you produce' },
  { id: 'cost',       col: 1, i: 1, label: 'COST MODEL',      sub: 'your cost structure', neglected: true },
  { id: 'org',        col: 1, i: 2, label: 'ORGANIZATION',    sub: 'people & resources' },
  { id: 'tech',       col: 1, i: 3, label: 'TECHNOLOGY',      sub: 'platform & infra.' },
  { id: 'channels',   col: 2, i: 0, label: 'CHANNELS',        sub: 'how you reach' },
  { id: 'crm',        col: 2, i: 1, label: 'RELATIONSHIPS',   sub: 'acquire & retain' },
  { id: 'brand',      col: 2, i: 2, label: 'BRAND',           sub: 'what you stand for' },
  { id: 'partners',   col: 2, i: 3, label: 'PARTNERSHIPS',    sub: 'partner network',    neglected: true },
]

interface Detail {
  headline: string
  body: string
  example: string
}

const DETAILS: Record<LeverId, Detail> = {
  segment: {
    headline: 'Who you choose to serve — and who you deliberately do not.',
    body: 'Target segment defines which customers you prioritize, which needs you build for, and which you ignore. Innovating here means identifying an underserved or overlooked group, or radically reconsidering who you are really for. A new target segment often unlocks a different business model because the needs, economics, and channels for a new customer differ from incumbent assumptions.',
    example: 'Serving small businesses rather than enterprise, or choosing the 80% priced out of an existing market rather than the premium 20%.',
  },
  offering: {
    headline: 'The product or service — the most-pulled lever, the hardest to sustain.',
    body: 'The offering lever is where nearly every company invests its innovation energy: better features, higher quality, broader range. It is the default, the instinct, and the crowded space. Product improvements are the easiest form of innovation for competitors to copy — a better feature can be matched in a season. Pulling this lever is necessary but rarely sufficient for sustainable advantage.',
    example: 'A faster product, a higher-quality service, a broader feature set. Valuable but quickly matched by any competitor with the same development budget.',
  },
  revenue: {
    headline: 'How you charge and make money — often the most powerful and most neglected lever.',
    body: 'Revenue model innovation determines how the business captures value, not just creates it. Moving from unit sales to subscription, usage-based pricing, outcomes-based billing, or freemium can fundamentally change the customer relationship, the unit economics, and the competitive dynamics. Revenue model innovation is among the most powerful levers because matching it requires competitors to restructure their entire business.',
    example: 'Shifting from selling machines to selling access to outcomes (razor-and-blades in a new category), or replacing one-time purchase with subscription recurring revenue.',
  },
  bundling: {
    headline: 'How you configure and package what you offer — the architecture of your value.',
    body: 'Bundling defines what you include, what you price separately, and how you tier the offer. Innovating here means rethinking how you package value — bundling complementary services competitors sell separately, unbundling a complex offering to serve different willingness-to-pay segments, or creating a new tier structure that addresses a need the existing packaging misses.',
    example: 'Bundling software and support into a single price (removing the "support tax"), or unbundling a premium offering to serve budget customers who only need part of the value.',
  },
  valuechain: {
    headline: 'How you produce and deliver — distinctive processes competitors cannot easily copy.',
    body: 'Value chain innovation means fundamentally changing how you create and deliver your offering — rethinking the supply chain, production process, or delivery model in ways that create a cost or quality advantage. The best value-chain innovations are proprietary and process-embedded, which makes them significantly harder to replicate than product features.',
    example: 'A vertically integrated delivery model that eliminates the middleman and improves margins, or a just-in-time supply chain that reduces inventory costs while improving responsiveness.',
  },
  cost: {
    headline: 'The structure of your costs — a reinvented cost model can redefine a market.',
    body: 'Cost model innovation means fundamentally changing what costs you carry and how, not just reducing existing ones. An asset-light model, a platform that turns fixed costs into variable, or eliminating a cost category incumbents treat as fixed — these create a structural cost advantage that redefines what the category can profitably offer. Cost model innovation is among the most defensible because it requires competitors to restructure their operations, not just copy a feature.',
    example: 'Moving to an asset-light model that removes the capital cost incumbents carry, or building a platform structure that converts fixed operational costs into variable ones.',
  },
  org: {
    headline: 'How you organize people and assets — the structure that enables everything else.',
    body: 'Organizational innovation means redesigning how you structure talent, allocate resources, and govern the work in ways that create a distinctive capability. Organizing around customer outcomes rather than product lines, building a talent model that attracts people who cannot work elsewhere, or designing a governance structure that enables faster decisions — these create advantages competitors cannot acquire overnight.',
    example: 'A cross-functional team structure organized around customer journeys rather than product silos, or a talent model that taps freelance specialists rather than building everything in-house.',
  },
  tech: {
    headline: 'The technology platform that enables your model — build vs. buy, and what you make proprietary.',
    body: 'Technology platform innovation means making deliberate choices about the technology foundation that enables your business model. A proprietary technology platform can create switching costs and capabilities incumbents cannot quickly match. Choosing the wrong platform can constrain what the business can become. AI infrastructure is rapidly becoming a new technology-lever battleground.',
    example: 'Building a proprietary data platform that turns customer interactions into a self-improving asset, or committing to an AI-native operating model that changes the economics of delivery.',
  },
  channels: {
    headline: 'How you reach and deliver to customers — a novel route to market changes the economics.',
    body: 'Channel innovation means finding a new, better, or unexpected way to reach customers — going direct when the category sold through distribution, partnering with a platform that aggregates your target customers, or creating a channel that did not exist before. Channel innovations are often underestimated because they seem operational, but they can dramatically change economics and access.',
    example: 'Going direct-to-consumer in a category that historically sold through retail, or selling through a platform marketplace providing access to millions of customers without a traditional sales force.',
  },
  crm: {
    headline: 'How you acquire, retain, and deepen relationships — the nature of the bond with customers.',
    body: 'Customer relationship innovation means changing the nature and depth of how you connect with customers — moving from transactional to membership, adding a community layer that increases switching costs, or creating rituals and experiences that deepen loyalty beyond the product. Strong relationship innovations turn customers into advocates and create a moat product improvements cannot replicate.',
    example: 'Building a loyalty program that turns purchase frequency into a community identity, or creating a customer success model that makes customers dependent on your expertise, not just your product.',
  },
  brand: {
    headline: 'What you stand for and how you are recognized — the perception that belongs to you.',
    body: 'Brand innovation means redefining or sharpening the perception you own in customers\' minds — repositioning from commodity to premium, claiming a distinct set of values, or building an identity that creates loyalty beyond the rational. Brand is an underestimated lever because it operates on customers\' sense of identity and belonging, not just their evaluation of features.',
    example: 'Repositioning a functional product as a lifestyle identity, or building a brand around a distinct set of values (transparency, sustainability) that attracts customers who would pay a premium to align with those values.',
  },
  partners: {
    headline: 'The network of partners that lets you create value you could not alone — a multiplier.',
    body: 'Partnership innovation means building a strategic network that gives you capabilities, reach, or assets you could not build yourself. The strongest partnership models create network effects — each partner makes the network more valuable to all others — or enable you to serve customers in ways that no individual organization could. Partnerships are often neglected because they require trust, but they can be a powerful barrier to replication.',
    example: 'Building a partner ecosystem that multiplies reach without proportional headcount growth, or a strategic alliance that gives you a proprietary input (data, distribution, manufacturing) competitors cannot access.',
  },
}

function leverY(i: number) {
  return FIRST_LEVER_Y + i * (LEVER_H + LEVER_GAP)
}

export default function TLInteractive() {
  const [active, setActive] = useState<LeverId | null>(null)
  const prefersReduced = useReducedMotion()

  const SVG_H = 296

  function handleKey(e: React.KeyboardEvent, id: LeverId) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setActive(prev => prev === id ? null : id)
    }
  }

  function leverOpacity(lev: LeverSpec) {
    if (!active) return 1
    return lev.id === active ? 1 : 0.28
  }

  function leverFill(lev: LeverSpec, isActive: boolean) {
    if (isActive) return `${PLUM}0.22)`
    if (lev.overpulled) return `${AMBER}0.09)`
    if (lev.neglected) return `${PLUM}0.13)`
    return `${PLUM}0.05)`
  }

  function leverStroke(lev: LeverSpec, isActive: boolean) {
    if (isActive) return `${PLUM}0.90)`
    if (lev.overpulled) return `${AMBER}0.42)`
    if (lev.neglected) return `${PLUM}0.58)`
    return `${PLUM}0.26)`
  }

  const detail = active ? DETAILS[active] : null
  const activeLev = active ? LEVERS.find(l => l.id === active) : null

  return (
    <div>
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{ maxWidth: 'var(--width-illustration)', display: 'block' }}
        role="group"
        aria-label="Interactive twelve-lever panel. Click any lever to explore its innovation potential."
      >
        <defs>
          <filter id="tl-int-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${PLUM}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="tl-int-amber-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
            <feFlood floodColor={`${AMBER}0.45)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Area headers */}
        {([0, 1, 2] as Col[]).map(ai => {
          const x = COL_X[ai]
          const area = [
            { label: 'VALUE PROPOSITION', sub: 'what you offer & to whom' },
            { label: 'OPERATING MODEL',   sub: 'how you create & deliver' },
            { label: 'GO-TO-MARKET',      sub: 'how you reach & keep' },
          ][ai]
          return (
            <g key={ai}>
              <rect x={x} y={2} width={COL_W} height={46} rx={5}
                fill={`${PLUM}0.10)`} stroke={`${PLUM}0.26)`} strokeWidth={0.8} />
              <text x={x + COL_W / 2} y={21} textAnchor="middle"
                fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                fill={`${PLUM}0.80)`} style={{ userSelect: 'none' }}>
                {area.label}
              </text>
              <text x={x + COL_W / 2} y={36} textAnchor="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={`${PLUM}0.35)`} style={{ userSelect: 'none' }}>
                {area.sub}
              </text>
            </g>
          )
        })}

        {/* Levers */}
        {LEVERS.map(lev => {
          const x = COL_X[lev.col]
          const y = leverY(lev.i)
          const isActive = lev.id === active
          const opacity = leverOpacity(lev)
          const fill = leverFill(lev, isActive)
          const stroke = leverStroke(lev, isActive)
          const strokeW = isActive ? 1.8 : lev.overpulled ? 1.4 : lev.neglected ? 1.4 : 0.9
          const glowFilter = isActive ? 'url(#tl-int-glow)' : lev.overpulled ? 'url(#tl-int-amber-glow)' : lev.neglected ? 'url(#tl-int-glow)' : 'none'
          const labelColor = isActive ? `${PLUM}1)` : lev.overpulled ? `${AMBER}0.88)` : lev.neglected ? `${PLUM}0.95)` : 'rgba(255,255,255,0.62)'
          const subColor = isActive ? `${PLUM}0.60)` : lev.overpulled ? `${AMBER}0.48)` : lev.neglected ? `${PLUM}0.52)` : 'rgba(255,255,255,0.24)'

          return (
            <motion.g
              key={lev.id}
              animate={{ opacity }}
              transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
              onClick={() => setActive(prev => prev === lev.id ? null : lev.id)}
              onKeyDown={(e) => handleKey(e, lev.id)}
              tabIndex={0}
              role="button"
              aria-pressed={isActive}
              aria-label={`${lev.label} lever — ${lev.sub}${lev.overpulled ? ' (over-pulled)' : ''}${lev.neglected ? ' (high leverage)' : ''}`}
              style={{ cursor: 'pointer', outline: 'none' }}
            >
              <rect
                x={x} y={y} width={COL_W} height={LEVER_H} rx={4}
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeW}
                style={{ filter: glowFilter }}
              />
              <text x={x + COL_W / 2} y={y + 20} textAnchor="middle"
                fontSize="7.5" fontFamily="var(--font-mono)" letterSpacing="0.10em" fontWeight="600"
                fill={labelColor} style={{ userSelect: 'none' }}>
                {lev.label}
              </text>
              <text x={x + COL_W / 2} y={y + 35} textAnchor="middle"
                fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                fill={subColor} style={{ userSelect: 'none' }}>
                {lev.sub}
              </text>

              {lev.overpulled && (
                <text x={x + COL_W - 5} y={y + 11} textAnchor="end"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${AMBER}0.68)`} style={{ userSelect: 'none' }}>
                  OVER-PULLED
                </text>
              )}
              {lev.neglected && !isActive && (
                <text x={x + COL_W - 5} y={y + 11} textAnchor="end"
                  fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${PLUM}0.65)`} style={{ userSelect: 'none' }}>
                  HIGH LEVERAGE
                </text>
              )}
            </motion.g>
          )
        })}

        {/* Idle hint */}
        {!active && (
          <text x={SVG_W / 2} y={SVG_H - 8} textAnchor="middle"
            fontSize="5" fontFamily="var(--font-mono)" letterSpacing="0.07em"
            fill="rgba(255,255,255,0.22)" style={{ userSelect: 'none' }}>
            CLICK ANY LEVER TO EXPLORE ITS INNOVATION POTENTIAL
          </text>
        )}
      </svg>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {detail && activeLev && (
          <motion.div
            key={active}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
            transition={prefersReduced ? { duration: 0 } : { duration: 0.2 }}
            style={{
              marginTop: '24px',
              padding: '24px',
              background: activeLev.overpulled ? `${AMBER}0.06)` : `${PLUM}0.08)`,
              border: `1px solid ${activeLev.overpulled ? `${AMBER}0.28)` : `${PLUM}0.30)`}`,
              borderRadius: '8px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '9px',
                letterSpacing: '0.14em',
                fontWeight: 600,
                color: activeLev.overpulled ? `${AMBER}0.90)` : `${PLUM}0.90)`,
              }}>
                {activeLev.label}
              </span>
              {activeLev.overpulled && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.10em',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: `${AMBER}0.12)`,
                  border: `1px solid ${AMBER}0.35)`,
                  color: `${AMBER}0.85)`,
                }}>
                  OVER-PULLED
                </span>
              )}
              {activeLev.neglected && (
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '8px',
                  letterSpacing: '0.10em',
                  padding: '2px 8px',
                  borderRadius: '20px',
                  background: `${PLUM}0.12)`,
                  border: `1px solid ${PLUM}0.35)`,
                  color: `${PLUM}0.85)`,
                }}>
                  HIGH LEVERAGE
                </span>
              )}
            </div>
            <p style={{
              color: 'rgba(255,255,255,0.88)',
              fontSize: '14px',
              fontWeight: 600,
              lineHeight: 1.5,
              marginBottom: '12px',
            }}>
              {detail.headline}
            </p>
            <p style={{
              color: 'rgba(255,255,255,0.58)',
              fontSize: '13px',
              lineHeight: 1.7,
              marginBottom: '16px',
            }}>
              {detail.body}
            </p>
            <div style={{
              padding: '12px 16px',
              background: 'rgba(255,255,255,0.04)',
              borderLeft: `2px solid ${activeLev.overpulled ? `${AMBER}0.40)` : `${PLUM}0.40)`}`,
              borderRadius: '0 4px 4px 0',
            }}>
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '8px',
                letterSpacing: '0.12em',
                color: activeLev.overpulled ? `${AMBER}0.55)` : `${PLUM}0.55)`,
                display: 'block',
                marginBottom: '6px',
              }}>
                EXAMPLE
              </span>
              <p style={{ color: 'rgba(255,255,255,0.70)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                {detail.example}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

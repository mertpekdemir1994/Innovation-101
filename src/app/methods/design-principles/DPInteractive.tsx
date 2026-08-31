'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const AMBER = 'rgba(245,158,11,'

type PrincipleId = 'speed' | 'firsttime' | 'usercentred' | 'delight' | 'bold'
type PrincipleType = 'real' | 'platitude'

interface Principle {
  id: PrincipleId
  type: PrincipleType
  text: string
  closed?: string
  taken?: string
  arguable: boolean
  arguableNote: string
}

const PRINCIPLES: Principle[] = [
  {
    id: 'speed',
    type: 'real',
    text: 'We favour speed over configurability, even when power users ask for options',
    closed: 'CONFIGURABILITY',
    taken: 'SPEED · SIMPLICITY',
    arguable: true,
    arguableNote: 'Many of the most successful products (professional software, IDEs, B2B tools, developer environments) deliberately choose configurability over speed. The opposite is a completely defensible position.',
  },
  {
    id: 'firsttime',
    type: 'real',
    text: 'Optimize for the first-time user, even at the expense of the expert',
    closed: 'EXPERT EFFICIENCY',
    taken: 'NEW USER EXPERIENCE',
    arguable: true,
    arguableNote: 'Excel, Vim, Bloomberg Terminal, Photoshop: many of the world&rsquo;s most successful products deliberately sacrifice the first-time user for expert power. The opposite is a completely defensible position.',
  },
  {
    id: 'usercentred',
    type: 'platitude',
    text: 'Be user-centred',
    arguable: false,
    arguableNote: 'Nobody advocates user-hostility. No reasonable person can defend the opposite, which means this principle constrains nothing and decides nothing.',
  },
  {
    id: 'delight',
    type: 'platitude',
    text: 'Delight our customers',
    arguable: false,
    arguableNote: 'No reasonable person advocates disappointing customers. Any decision can claim to honour this principle. It rules nothing out.',
  },
  {
    id: 'bold',
    type: 'platitude',
    text: 'Be bold but thoughtful',
    arguable: false,
    arguableNote: 'Both "bold" and "thoughtful" are desirable. This principle protects both simultaneously, which means it constrains neither. Any decision can claim to honour it.',
  },
]

// SVG constants
const SVG_W = 700, SVG_H = 240
const FX = 230, FY = 120
const TX = 452, TY = 54
const CX = 452, CY = 186

export default function DPInteractive() {
  const [active, setActive] = useState<PrincipleId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  const selected = PRINCIPLES.find(p => p.id === active) ?? null
  const isReal = selected?.type === 'real'
  const isPlatitude = selected?.type === 'platitude'

  // Branch visual states
  const takenOpacity = selected === null ? 0.48 : isReal ? 0.90 : 0.52
  const closedOpacity = selected === null ? 0.48 : isReal ? 0.18 : 0.52
  const showX = isReal
  const showUndecided = isPlatitude

  return (
    <div className="w-full space-y-6">

      {/* Candidate principle buttons */}
      <div>
        <p className="font-mono uppercase tracking-widest mb-3"
          style={{ fontSize: 'var(--text-2xs)', color: `${PLUM}0.55)` }}>
          Select a candidate principle: bring it to the fork
        </p>
        <div className="flex flex-wrap gap-2">
          {PRINCIPLES.map(p => (
            <button
              key={p.id}
              onClick={() => setActive(active === p.id ? null : p.id)}
              aria-pressed={active === p.id}
              className="rounded-full px-4 py-2 text-sm transition-all"
              style={{
                background: active === p.id
                  ? p.type === 'real' ? `${PLUM}0.80)` : `${AMBER}0.18)`
                  : 'transparent',
                color: active === p.id
                  ? p.type === 'real' ? '#fff' : `${AMBER}0.90)`
                  : p.type === 'real' ? `${PLUM}0.70)` : `${AMBER}0.55)`,
                border: `1.5px solid ${active === p.id
                  ? p.type === 'real' ? `${PLUM}0.70)` : `${AMBER}0.45)`
                  : p.type === 'real' ? `${PLUM}0.28)` : `${AMBER}0.25)`}`,
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
              }}>
              {p.text}
            </button>
          ))}
          {active !== null && (
            <button
              onClick={() => setActive(null)}
              className="rounded-full px-4 py-2 text-sm"
              style={{
                background: 'transparent',
                color: 'rgba(255,255,255,0.28)',
                border: '1.5px solid rgba(255,255,255,0.12)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 600,
              }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* SVG fork */}
      <svg
        viewBox={`0 0 ${SVG_W} ${SVG_H}`}
        aria-label="Decision fork. Select a principle above to see whether it closes a branch."
        style={{ width: '100%', maxWidth: SVG_W, display: 'block' }}
      >
        <defs>
          <filter id="dp-int-plum-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${PLUM}0.55)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="dp-int-amber-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feFlood floodColor={`${AMBER}0.50)`} result="color" />
            <feComposite in="color" in2="blur" operator="in" result="glow" />
            <feMerge><feMergeNode in="glow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <marker id="dp-int-arr-plum" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${PLUM}0.70)`} />
          </marker>
          <marker id="dp-int-arr-dim" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 L2,3.5 Z" fill={`${PLUM}0.25)`} />
          </marker>
        </defs>

        <rect x={0} y={0} width={SVG_W} height={SVG_H} fill="rgba(10,10,18,0.96)" rx={6} />

        {/* Principle label / badge */}
        <AnimatePresence mode="wait">
          {selected === null ? (
            <motion.g key="empty"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.20 }}>
              <rect x={26} y={100} width={196} height={24} rx={3}
                fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.10)" strokeWidth={0.7} strokeDasharray="4 3" />
              <text x={124} y={112} textAnchor="middle" dominantBaseline="middle"
                fontSize="4.0" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill="rgba(255,255,255,0.22)" style={{ userSelect: 'none' }}>
                PRINCIPLE NOT YET SELECTED
              </text>
            </motion.g>
          ) : (
            <motion.g key={selected.id}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22, ease }}>
              <rect x={26} y={97} width={196} height={30} rx={3}
                fill={isReal ? `${PLUM}0.08)` : `${AMBER}0.06)`}
                stroke={isReal ? `${PLUM}0.35)` : `${AMBER}0.30)`}
                strokeWidth={0.8} />
              <text x={124} y={107} textAnchor="middle"
                fontSize="3.6" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={isReal ? `${PLUM}0.52)` : `${AMBER}0.52)`} style={{ userSelect: 'none' }}>
                {isReal ? 'PRINCIPLE: SEE BUTTON ABOVE' : 'PLATITUDE: SEE BUTTON ABOVE'}
              </text>
              <text x={124} y={120} textAnchor="middle"
                fontSize="4.8" fontFamily="var(--font-mono)" letterSpacing="0.06em" fontWeight="600"
                fill={isReal ? `${PLUM}0.82)` : `${AMBER}0.72)`} style={{ userSelect: 'none' }}>
                {isReal
                  ? (selected.taken ?? 'REAL PRINCIPLE')
                  : 'CLOSES NOTHING'}
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* Incoming path */}
        <line x1={24} y1={FY} x2={FX} y2={FY}
          stroke={`${PLUM}0.35)`} strokeWidth={1.4} />

        {/* Junction circle */}
        <circle cx={FX} cy={FY} r={5}
          fill={`${PLUM}0.12)`}
          stroke={selected ? `${PLUM}0.55)` : `${PLUM}0.35)`}
          strokeWidth={1.2}
          filter={selected ? 'url(#dp-int-plum-glow)' : undefined}
        />

        {/* UNDECIDED warning at junction */}
        <AnimatePresence>
          {showUndecided && (
            <motion.g key="undecided"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}>
              <text x={FX} y={FY - 10} textAnchor="middle"
                fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.10em"
                fill={`${AMBER}0.75)`} style={{ userSelect: 'none' }}>
                ⚠ UNDECIDED
              </text>
            </motion.g>
          )}
        </AnimatePresence>

        {/* TAKEN BRANCH */}
        <motion.line
          x1={FX} y1={FY} x2={TX} y2={TY}
          stroke={`${PLUM}${takenOpacity})`}
          strokeWidth={isReal ? 2.2 : 1.4}
          markerEnd={isReal ? 'url(#dp-int-arr-plum)' : 'url(#dp-int-arr-dim)'}
          filter={isReal ? 'url(#dp-int-plum-glow)' : undefined}
          animate={{ opacity: takenOpacity > 0.5 ? 1 : 0.5 }}
          transition={{ duration: prefersReduced ? 0 : 0.30 }}
        />

        {/* Taken label */}
        <AnimatePresence mode="wait">
          {selected !== null && (
            <motion.g key={`taken-${selected.id}`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}>
              <text x={TX + 8} y={TY - 4} textAnchor="start"
                fontSize="5.0" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
                fill={isReal ? `${PLUM}0.88)` : `${PLUM}0.45)`} style={{ userSelect: 'none' }}>
                {isReal ? 'TAKEN' : 'OPEN'}
              </text>
              {isReal && selected.taken && (
                <text x={TX + 8} y={TY + 8} textAnchor="start"
                  fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${PLUM}0.52)`} style={{ userSelect: 'none' }}>
                  {selected.taken}
                </text>
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* CLOSED BRANCH */}
        <motion.line
          x1={FX} y1={FY} x2={CX} y2={CY}
          stroke={isReal ? `${AMBER}0.25)` : `${PLUM}${closedOpacity})`}
          strokeWidth={isReal ? 1.2 : 1.4}
          strokeDasharray={isReal ? '5 3' : ''}
          markerEnd={!isReal ? 'url(#dp-int-arr-dim)' : undefined}
          animate={{ opacity: 1 }}
          transition={{ duration: prefersReduced ? 0 : 0.30 }}
        />

        {/* X BARRIER on closed branch */}
        <AnimatePresence>
          {showX && (
            <motion.g key="x-barrier"
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.28, ease }}
              style={{ originX: `${CX}px`, originY: `${CY}px` }}
              filter="url(#dp-int-amber-glow)">
              <line x1={CX - 10} y1={CY - 10} x2={CX + 10} y2={CY + 10}
                stroke={`${AMBER}0.90)`} strokeWidth={2.6} strokeLinecap="round" />
              <line x1={CX - 10} y1={CY + 10} x2={CX + 10} y2={CY - 10}
                stroke={`${AMBER}0.90)`} strokeWidth={2.6} strokeLinecap="round" />
              <circle cx={CX} cy={CY} r={14}
                fill="none" stroke={`${AMBER}0.35)`} strokeWidth={1.0} />
            </motion.g>
          )}
        </AnimatePresence>

        {/* Closed label */}
        <AnimatePresence mode="wait">
          {selected !== null && (
            <motion.g key={`closed-${selected.id}`}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}>
              <text x={CX + 8} y={CY - 2} textAnchor="start"
                fontSize="5.0" fontFamily="var(--font-mono)" letterSpacing="0.09em" fontWeight="600"
                fill={isReal ? `${AMBER}0.85)` : `${PLUM}0.45)`} style={{ userSelect: 'none' }}>
                {isReal ? 'CLOSED' : 'OPEN'}
              </text>
              {isReal && selected.closed && (
                <text x={CX + 8} y={CY + 10} textAnchor="start"
                  fontSize="3.8" fontFamily="var(--font-mono)" letterSpacing="0.07em"
                  fill={`${AMBER}0.50)`} style={{ userSelect: 'none' }}>
                  {selected.closed}
                </text>
              )}
            </motion.g>
          )}
        </AnimatePresence>

        {/* Default branch labels (when no principle selected) */}
        {selected === null && (
          <>
            <text x={TX + 8} y={TY + 2} textAnchor="start"
              fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill="rgba(255,255,255,0.16)" style={{ userSelect: 'none' }}>
              BRANCH A
            </text>
            <text x={CX + 8} y={CY + 2} textAnchor="start"
              fontSize="4.2" fontFamily="var(--font-mono)" letterSpacing="0.07em"
              fill="rgba(255,255,255,0.16)" style={{ userSelect: 'none' }}>
              BRANCH B
            </text>
          </>
        )}
      </svg>

      {/* Result panel */}
      <AnimatePresence mode="wait">
        {selected !== null && (
          <motion.div key={selected.id}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease }}
            className="rounded-lg p-5 space-y-3"
            style={{
              background: isReal ? `${PLUM}0.06)` : `${AMBER}0.05)`,
              border: `1px solid ${isReal ? `${PLUM}0.22)` : `${AMBER}0.20)`}`,
            }}>

            <div className="flex items-start justify-between gap-4 flex-wrap">
              <p className="font-mono uppercase tracking-widest"
                style={{ fontSize: 'var(--text-2xs)', color: isReal ? `${PLUM}0.70)` : `${AMBER}0.70)` }}>
                {isReal ? 'Result: closes a branch' : 'Result: closes no branch'}
              </p>
              <span className="font-mono text-xs px-2 py-0.5 rounded-full"
                style={{
                  background: isReal ? `${PLUM}0.12)` : `${AMBER}0.10)`,
                  color: isReal ? `${PLUM}0.80)` : `${AMBER}0.80)`,
                  border: `1px solid ${isReal ? `${PLUM}0.25)` : `${AMBER}0.25)`}`,
                }}>
                {isReal ? 'PRINCIPLE' : 'PLATITUDE'}
              </span>
            </div>

            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              {isReal
                ? `This closes the "${selected.closed}" branch. Any team that adopts this principle has, in advance, agreed to say no to power-user configurability requests, regardless of how compelling they sound in the moment.`
                : `This principle remains open to every direction. There is no branch it closes. Under pressure, it provides no guidance because any choice can claim to honour it.`}
            </p>

            <div className="rounded p-3"
              style={{
                background: isReal ? `${PLUM}0.06)` : `${AMBER}0.06)`,
                borderLeft: `2px solid ${isReal ? `${PLUM}0.35)` : `${AMBER}0.35)`}`,
              }}>
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: isReal ? `${PLUM}0.60)` : `${AMBER}0.60)` }}>
                Arguability test: can a reasonable person argue the opposite?
              </p>
              <p className="font-semibold"
                style={{ fontSize: 'var(--text-sm)', color: isReal ? `${PLUM}0.85)` : `${AMBER}0.78)` }}>
                {isReal ? 'YES: this is a principle.' : 'NO: this is a platitude.'}
              </p>
              <p className="mt-1"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                dangerouslySetInnerHTML={{ __html: selected.arguableNote }} />
            </div>
          </motion.div>
        )}

        {selected === null && (
          <motion.div key="empty-panel"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.20 }}
            className="rounded-lg p-5"
            style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
              Select a candidate principle above to bring it to the fork. Real principles close one branch. Platitudes close none.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

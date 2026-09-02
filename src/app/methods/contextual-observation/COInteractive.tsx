'use client'
import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const SAGE  = 'rgba(61,107,90,'
const SAGE_TEXT = 'rgba(130,160,149,'  // brightened text-safe variant of SAGE
const AMBER = 'rgba(245,158,11,'

function dome(cx: number, cy: number, w: number, h: number): string {
  return `M ${cx - w} ${cy + h} A ${w} ${h} 0 0 1 ${cx + w} ${cy + h} Z`
}

type El = 'stated' | 'workaround' | 'friction' | 'env-detail' | 'say-do-gap' | null

const ELEMENT_DATA: Record<NonNullable<El>, { label: string; headline: string; body: string; color: string }> = {
  stated: {
    label: 'STATED TOOL',
    headline: 'What they say they use',
    body: 'The screen, the software, the official system. In the interview, participants described using this: it is the tool they know they should use and the one they will mention when asked. Observation shows whether it is actually central to their real workflow.',
    color: `${AMBER}1)`,
  },
  workaround: {
    label: 'WORKAROUND',
    headline: 'The real question behind the sticky note',
    body: '"Can I make payroll?" is not an accounting question. It is a cash-flow anxiety question. The sticky note exists because the accounting software does not answer that question quickly enough. Workarounds are always a symptom of a gap between what the tool does and what the person actually needs.',
    color: `${SAGE_TEXT}1)`,
  },
  friction: {
    label: 'FRICTION POINT',
    headline: 'Where the real effort goes',
    body: 'This pile of papers and invoices is not disorganisation. It is an improvised system. The person is expending effort here that an ideal tool would eliminate. Friction points reveal the real job the user is doing, which is almost never the job the software was designed for.',
    color: `${SAGE_TEXT}1)`,
  },
  'env-detail': {
    label: 'ENVIRONMENTAL DETAIL',
    headline: 'The shoebox is the real filing system',
    body: 'Every receipt in this box is data the official software has never seen. Environmental details like this reveal parallel systems: the shoebox, the sticky note on the screen, the folder on the desktop. Together they show the gap between the designed system and the lived system.',
    color: `${SAGE_TEXT}1)`,
  },
  'say-do-gap': {
    label: 'SAY-vs-DO GAP',
    headline: 'The space between what they say and what they actually do',
    body: 'Everything to the left of this line is what the user would describe in an interview. Everything to the right is what contextual observation reveals. The gap is not dishonesty. It is the difference between self-perception and behaviour. This is the core of what makes observation irreplaceable.',
    color: 'rgba(255,255,255,0.75)',
  },
}

const SVG_W = 700

export default function COInteractive() {
  const [active, setActive] = useState<El>(null)
  const prefersReduced = useReducedMotion()

  function toggle(el: El) {
    setActive(prev => (prev === el ? null : el))
  }

  function isHit(el: El) {
    return active === el
  }

  function sceneOpacity(el: El): number {
    if (active === null) return 1
    return active === el ? 1 : 0.35
  }

  const gageOpacity  = sceneOpacity('stated')
  const stickOpacity = sceneOpacity('workaround')
  const papOpacity   = sceneOpacity('friction')
  const boxOpacity   = sceneOpacity('env-detail')
  const personOpacity = active === null ? 1 : 0.5

  const gapStroke = isHit('say-do-gap')
    ? 'rgba(255,255,255,0.55)'
    : 'rgba(255,255,255,0.10)'

  return (
    <div className="w-full">
      <p className="text-xs text-white/55 mb-4 font-mono tracking-widest uppercase">
        Click any scene element to reveal the observation insight
      </p>

      <svg
        viewBox={`0 0 ${SVG_W} 248`}
        width="100%"
        style={{ maxWidth: 'var(--width-illustration)', margin: '0 auto', display: 'block', overflow: 'visible', cursor: 'default' }}
        role="img"
        aria-label="Interactive contextual observation scene with clickable zones"
      >
        <defs>
          <filter id="co-int-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="co-int-glow-sm" x="-20%" y="-20%" width="140%" height="140%">
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
          style={{ transition: 'opacity 0.3s' }}
          opacity={active === null || ['workaround','friction','env-detail'].includes(active ?? '') ? 1 : 0.2}
        />

        {/* Desk */}
        <rect x={115} y={168} width={470} height={14}
          rx={3}
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth={1}
        />

        {/* ── SCREEN ── */}
        <g style={{ opacity: gageOpacity, transition: 'opacity 0.3s' }}>
          <rect x={168} y={102} width={90} height={68} rx={5}
            fill="rgba(255,255,255,0.03)"
            stroke={isHit('stated') ? `${AMBER}0.85)` : `${AMBER}0.40)`}
            strokeWidth={isHit('stated') ? 2 : 1.5}
            filter="url(#co-int-glow-sm)"
            style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
          />
          <rect x={176} y={109} width={74} height={52} rx={2}
            fill="rgba(255,255,255,0.02)"
          />
          <line x1={182} y1={119} x2={244} y2={119} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
          <line x1={182} y1={128} x2={238} y2={128} stroke="rgba(255,255,255,0.10)" strokeWidth={1} />
          <line x1={182} y1={137} x2={226} y2={137} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          <rect x={182} y={146} width={42} height={8} rx={2}
            fill={`${AMBER}0.07)`} stroke={`${AMBER}0.16)`} strokeWidth={1} />
          <rect x={206} y={170} width={14} height={4} rx={1}
            fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.15)" strokeWidth={1} />
        </g>

        {/* ── PERSON ── */}
        <g style={{ opacity: personOpacity, transition: 'opacity 0.3s' }}>
          <circle cx={285} cy={118} r={17}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth={1.5}
            filter="url(#co-int-glow)"
          />
          <path d={dome(285, 135, 21, 30)}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.48)"
            strokeWidth={1.5}
            filter="url(#co-int-glow)"
          />
          <line x1={264} y1={164} x2={224} y2={168}
            stroke="rgba(255,255,255,0.28)" strokeWidth={2} strokeLinecap="round" />
          <line x1={306} y1={164} x2={348} y2={168}
            stroke="rgba(255,255,255,0.28)" strokeWidth={2} strokeLinecap="round" />
        </g>

        {/* ── STICKY NOTE ── (widened; sticky, paper pile, and shoebox all
             shifted right of their original spots to make room, same as
             COEstablishing) */}
        <g style={{ opacity: stickOpacity, transition: 'opacity 0.3s' }}>
          <rect x={358} y={138} width={108} height={42} rx={3}
            fill={isHit('workaround') ? `${SAGE}0.32)` : `${SAGE}0.20)`}
            stroke={isHit('workaround') ? `${SAGE}0.90)` : `${SAGE}0.65)`}
            strokeWidth={isHit('workaround') ? 2 : 1.5}
            filter="url(#co-int-glow)"
            style={{ transition: 'fill 0.25s, stroke 0.25s' }}
          />
          <text x={412} y={155} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.03em"
            fill={`${SAGE_TEXT}0.979)`} style={{ userSelect: 'none' }}>CAN I</text>
          <text x={412} y={173} textAnchor="middle" dominantBaseline="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.02em"
            fill={`${SAGE_TEXT}0.979)`} style={{ userSelect: 'none' }}>MAKE PAYROLL?</text>
        </g>

        {/* ── PAPER PILE ── (label moved below the shape, matching OBSERVER) */}
        <g style={{ opacity: papOpacity, transition: 'opacity 0.3s' }}>
          <rect x={480} y={152} width={48} height={8} rx={2}
            fill="rgba(255,255,255,0.02)"
            stroke={isHit('friction') ? `${SAGE}0.70)` : `${SAGE}0.24)`}
            strokeWidth={isHit('friction') ? 1.5 : 1}
            style={{ transition: 'stroke 0.25s' }}
          />
          <rect x={476} y={158} width={58} height={12} rx={2}
            fill="rgba(255,255,255,0.02)"
            stroke={isHit('friction') ? `${SAGE}0.70)` : `${SAGE}0.30)`}
            strokeWidth={isHit('friction') ? 1.5 : 1}
            style={{ transition: 'stroke 0.25s' }}
          />
          <text x={505} y={185} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)"
            fill={`${SAGE_TEXT}0.895)`} style={{ userSelect: 'none' }}>INVOICES</text>
        </g>

        {/* ── SHOEBOX ── (label moved below the shape) */}
        <g style={{ opacity: boxOpacity, transition: 'opacity 0.3s' }}>
          <rect x={546} y={160} width={72} height={12} rx={2}
            fill={isHit('env-detail') ? `${SAGE}0.18)` : `${SAGE}0.09)`}
            stroke={isHit('env-detail') ? `${SAGE}0.75)` : `${SAGE}0.38)`}
            strokeWidth={isHit('env-detail') ? 1.5 : 1}
            style={{ transition: 'fill 0.25s, stroke 0.25s' }}
          />
          <text x={582} y={186} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill={`${SAGE_TEXT}0.926)`} style={{ userSelect: 'none' }}>RECEIPTS</text>
        </g>

        {/* ── OBSERVER ── */}
        <g style={{ opacity: active === null ? 1 : 0.3, transition: 'opacity 0.3s' }}>
          <circle cx={644} cy={142} r={11}
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth={1.5}
            filter="url(#co-int-glow-sm)"
          />
          <path d={dome(644, 153, 14, 22)}
            fill="rgba(255,255,255,0.03)"
            stroke="rgba(255,255,255,0.33)"
            strokeWidth={1.5}
          />
          <line x1={630} y1={148} x2={582} y2={154}
            stroke="rgba(255,255,255,0.07)"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <text x={644} y={185} textAnchor="middle"
            fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.06em"
            fill="rgba(255,255,255,0.61)" style={{ userSelect: 'none' }}>OBSERVER</text>
        </g>

        {/* ── ANNOTATIONS ── */}
        <text x={213} y={90} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
          fill={`${AMBER}${active === 'stated' ? '0.90)' : '0.38)'}`}
          style={{ userSelect: 'none', transition: 'fill 0.3s' }}>STATED</text>
        <line x1={168} y1={95} x2={258} y2={95}
          stroke={`${AMBER}${active === 'stated' ? '0.50)' : '0.18)'}`}
          strokeWidth={1} strokeDasharray="4 3"
          style={{ transition: 'stroke 0.3s' }}
        />

        <text x={488} y={90} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.10em"
          fill={`${SAGE}${['workaround','friction','env-detail'].includes(active ?? '') ? '0.92)' : '0.40)'}`}
          style={{ userSelect: 'none', transition: 'fill 0.3s' }}>REAL</text>
        <line x1={350} y1={95} x2={630} y2={95}
          stroke={`${SAGE}${['workaround','friction','env-detail'].includes(active ?? '') ? '0.44)' : '0.18)'}`}
          strokeWidth={1} strokeDasharray="4 3"
          style={{ transition: 'stroke 0.3s' }}
        />

        {/* Gap line */}
        <line x1={326} y1={82} x2={326} y2={165}
          stroke={gapStroke}
          strokeWidth={isHit('say-do-gap') ? 1.5 : 1}
          strokeDasharray="5 4"
          style={{ transition: 'stroke 0.25s, stroke-width 0.25s' }}
        />
        <text x={326} y={74} textAnchor="middle"
          fontSize="11" fontFamily="var(--font-mono)" letterSpacing="0.04em"
          fill={isHit('say-do-gap') ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.59)'}
          style={{ userSelect: 'none', transition: 'fill 0.25s' }}>THE GAP</text>

        {/* ── HIT AREAS (transparent, clickable) ── */}
        {/* STATED - screen area */}
        <rect
          x={152} y={95} width={120} height={82}
          fill="transparent"
          stroke={isHit('stated') ? `${AMBER}0.35)` : 'transparent'}
          strokeWidth={1.5}
          rx={5}
          style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
          onClick={() => toggle('stated')}
          onKeyDown={(e) => e.key === 'Enter' && toggle('stated')}
          tabIndex={0}
          role="button"
          aria-pressed={isHit('stated')}
          aria-label="Click to reveal insight: Stated tool (the computer screen)"
        />
        {/* WORKAROUND - sticky note */}
        <rect
          x={350} y={132} width={124} height={54}
          fill="transparent"
          stroke={isHit('workaround') ? `${SAGE}0.45)` : 'transparent'}
          strokeWidth={1.5}
          rx={4}
          style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
          onClick={() => toggle('workaround')}
          onKeyDown={(e) => e.key === 'Enter' && toggle('workaround')}
          tabIndex={0}
          role="button"
          aria-pressed={isHit('workaround')}
          aria-label="Click to reveal insight: Workaround (sticky note)"
        />
        {/* FRICTION - paper pile */}
        <rect
          x={470} y={146} width={70} height={48}
          fill="transparent"
          stroke={isHit('friction') ? `${SAGE}0.40)` : 'transparent'}
          strokeWidth={1.5}
          rx={4}
          style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
          onClick={() => toggle('friction')}
          onKeyDown={(e) => e.key === 'Enter' && toggle('friction')}
          tabIndex={0}
          role="button"
          aria-pressed={isHit('friction')}
          aria-label="Click to reveal insight: Friction point (paper pile)"
        />
        {/* ENVIRONMENTAL DETAIL - shoebox */}
        <rect
          x={540} y={154} width={84} height={42}
          fill="transparent"
          stroke={isHit('env-detail') ? `${SAGE}0.45)` : 'transparent'}
          strokeWidth={1.5}
          rx={4}
          style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
          onClick={() => toggle('env-detail')}
          onKeyDown={(e) => e.key === 'Enter' && toggle('env-detail')}
          tabIndex={0}
          role="button"
          aria-pressed={isHit('env-detail')}
          aria-label="Click to reveal insight: Environmental detail (shoebox of receipts)"
        />
        {/* SAY-vs-DO GAP - gap zone (kept clear of the sticky-note hit area, which
            now extends to x=350 after the sticky note was widened) */}
        <rect
          x={274} y={72} width={71} height={98}
          fill="transparent"
          stroke={isHit('say-do-gap') ? 'rgba(255,255,255,0.22)' : 'transparent'}
          strokeWidth={1.5}
          rx={6}
          style={{ cursor: 'pointer', transition: 'stroke 0.2s' }}
          onClick={() => toggle('say-do-gap')}
          onKeyDown={(e) => e.key === 'Enter' && toggle('say-do-gap')}
          tabIndex={0}
          role="button"
          aria-pressed={isHit('say-do-gap')}
          aria-label="Click to reveal insight: Say-vs-do gap"
        />
      </svg>

      {/* Detail panel */}
      <div className="mt-4" style={{ minHeight: 120 }}>
        <AnimatePresence mode="wait">
          {active === null ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.18 }}
              className="flex items-center justify-center h-24 rounded-lg border border-dashed"
              style={{ borderColor: `${SAGE}0.18)` }}
            >
              <p className="text-xs text-white/55 font-mono tracking-widest uppercase">
                Select an element above
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={active}
              initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: prefersReduced ? 0 : 0.22 }}
              className="rounded-lg border p-5"
              style={{
                borderColor: `${SAGE}0.22)`,
                background: `${SAGE}0.07)`,
              }}
            >
              <p
                className="text-[10px] font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: ELEMENT_DATA[active].color }}
              >
                {ELEMENT_DATA[active].label}
              </p>
              <p className="text-sm font-semibold text-white/80 mb-2">
                {ELEMENT_DATA[active].headline}
              </p>
              <p className="text-sm text-white/52 leading-relaxed">
                {ELEMENT_DATA[active].body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

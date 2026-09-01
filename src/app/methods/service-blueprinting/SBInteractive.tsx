'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const TEAL  = 'rgba(42,111,122,'
const TEAL_TEXT = 'rgba(116,161,168,'  // brightened text-safe variant of TEAL
const SLATE = 'rgba(100,116,139,'
const SLATE_TEXT = 'rgba(143,154,171,'  // brightened text-safe variant of SLATE

const SVG_W = 700
const STAGE_W = 140
const SCX = [70, 210, 350, 490, 630] as const

const HDR_TOP = 8, HDR_H = 36
const DIV_Y   = 48

const CA_Y = 50,  CA_H = 42
const FS_Y = 94,  FS_H = 42
const LOV_TOP      = FS_Y + FS_H  // 136
const LOV_LINE_Y   = 143
const LOV_BOTTOM   = 150
const BS_Y = 150, BS_H = 42
const SP_Y = 194, SP_H = 42
const SVG_H = 244

const STAGE_NAMES = ['DISCOVER', 'CONSIDER', 'START', 'USE', 'RESOLVE'] as const

const CA_ITEMS = ['Searches online',    'Compares plans',  'Signs up',        'Uses the service', 'Reports an issue'] as const
const FS_ITEMS = ['Ads / Landing page', 'Pricing / Sales', 'Onboarding flow', 'App / Dashboard',  'Support chat'] as const
const BS_ITEMS = ['Lead enrichment',    'CRM operations',  'Account setup',   'Usage tracking',   'Ticket routing'] as const
const SP_ITEMS = ['Analytics CRM',      'Billing system',  'Auth service',    'Usage database',   'Helpdesk platform'] as const

type LayerId = 'customer-actions' | 'frontstage' | 'line-of-visibility' | 'backstage' | 'support-processes'

const LAYER_DETAIL: Record<LayerId, { heading: string; tagline: string; body: string; belowLine: boolean }> = {
  'customer-actions': {
    heading: 'Customer Actions',
    tagline: 'The visible journey: what the customer does',
    belowLine: false,
    body: 'What the customer does at each stage of their experience. This is the journey map\'s top layer: searching, comparing, signing up, using, and resolving. The blueprint keeps this spine but extends everything downward through the layers that make it possible.',
  },
  'frontstage': {
    heading: 'Frontstage',
    tagline: 'Above the line: seen by the customer',
    belowLine: false,
    body: 'The employee actions, interfaces, and touchpoints the customer directly encounters. The person they speak to, the form they complete, the app they open. The frontstage is the visible surface of service delivery: the last layer the customer can see before the line of visibility cuts off their view.',
  },
  'line-of-visibility': {
    heading: 'The Line of Visibility',
    tagline: 'The defining boundary of this method',
    belowLine: false,
    body: 'The explicit divider between what the customer sees and what they do not. Everything above it is experienced by the customer. Everything below it makes the experience possible but stays invisible. The line is the whole point of a service blueprint, and the one thing a journey map deliberately omits. Crossing it is how you trace a customer-facing problem to its operational root.',
  },
  'backstage': {
    heading: 'Backstage',
    tagline: 'Below the line: invisible to the customer',
    belowLine: true,
    body: 'The employee actions the customer never sees. The team processing the request after the call ends, the approval that runs behind the confirmation screen, the preparation that precedes the visible interaction. Invisible but decisive: this is where many customer-facing problems are actually born, in the gap between what the customer experiences and the work happening out of sight.',
  },
  'support-processes': {
    heading: 'Support Processes / Systems',
    tagline: 'The deepest layer: the infrastructure beneath it all',
    belowLine: true,
    body: 'The systems, databases, platforms, and third-party services that enable the backstage and frontstage. The customer never sees this layer, but failures here surface directly as problems the customer feels. Tracing a complaint down to its source often ends here: a slow system, a disconnected database, an unintegrated platform that no one department owns.',
  },
}

function layerOpacity(id: LayerId, active: LayerId | null): number {
  if (!active) return 1
  if (active === id) return 1
  if (id === 'line-of-visibility') return 0.35
  return 0.20
}

function lovStroke(active: LayerId | null): string {
  return active === 'line-of-visibility' ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.62)'
}

function lovStrokeWidth(active: LayerId | null): number {
  return active === 'line-of-visibility' ? 2 : 1.5
}

export default function SBInteractive() {
  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null)
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]

  function toggle(id: LayerId) {
    setActiveLayer(prev => prev === id ? null : id)
  }

  function onKey(e: React.KeyboardEvent, id: LayerId) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(id) }
  }

  const isBelow = (id: LayerId) => id === 'backstage' || id === 'support-processes'
  const accentFor = (id: LayerId) => isBelow(id) ? SLATE : TEAL

  return (
    <div>
      {/* Blueprint SVG */}
      <div className="w-full select-none mb-8" aria-label="Service blueprint, click a layer to explore it" role="group">
        <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ maxWidth: 'var(--width-illustration)', display: 'block', overflow: 'visible' }}>
          <defs>
            <filter id="sb-int-glow" x="-20%" y="-200%" width="140%" height="500%">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* Background */}
          <rect x={0} y={0} width={SVG_W} height={SVG_H} rx={8} fill={`${TEAL}0.04)`} />

          {/* Stage headers */}
          {STAGE_NAMES.map((name, i) => (
            <g key={name}>
              <rect x={i * STAGE_W + 1} y={HDR_TOP} width={STAGE_W - 2} height={HDR_H}
                rx={4} fill={`${TEAL}0.12)`} stroke={`${TEAL}0.40)`} strokeWidth={1}
              />
              <text x={SCX[i]} y={HDR_TOP + HDR_H / 2 + 2}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="7" fontFamily="var(--font-mono)" letterSpacing="0.12em"
                fill={`${TEAL_TEXT}0.979)`} style={{ userSelect: 'none', pointerEvents: 'none' }}
              >{name}</text>
            </g>
          ))}

          <line x1={0} y1={DIV_Y} x2={SVG_W} y2={DIV_Y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />
          {[1, 2, 3, 4].map(i => (
            <line key={i} x1={i * STAGE_W} y1={DIV_Y} x2={i * STAGE_W} y2={SVG_H}
              stroke="rgba(255,255,255,0.05)" strokeWidth={1}
            />
          ))}

          {/* ── Customer Actions ── */}
          <motion.g
            animate={{ opacity: layerOpacity('customer-actions', activeLayer) }}
            transition={{ duration: 0.20 }}
            onClick={() => toggle('customer-actions')}
            onKeyDown={e => onKey(e, 'customer-actions')}
            role="button" tabIndex={0} aria-pressed={activeLayer === 'customer-actions'}
            aria-label="Customer Actions layer"
            style={{ cursor: 'pointer' }}
          >
            <rect x={0} y={CA_Y} width={SVG_W} height={CA_H}
              fill={activeLayer === 'customer-actions' ? `${TEAL}0.22)` : `${TEAL}0.07)`}
              style={{ transition: 'fill 0.20s' }}
            />
            <line x1={0} y1={CA_Y + CA_H} x2={SVG_W} y2={CA_Y + CA_H} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
            <text x={4} y={CA_Y + 7} textAnchor="start" dominantBaseline="hanging"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${TEAL_TEXT}0.905)`} style={{ userSelect: 'none', pointerEvents: 'none' }}
            >CUSTOMER ACTIONS</text>
            {CA_ITEMS.map((text, i) => (
              <text key={i} x={SCX[i]} y={CA_Y + CA_H / 2 + 5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="6.5" fontFamily="var(--font-body, Inter, sans-serif)"
                fill="rgba(255,255,255,0.70)" style={{ userSelect: 'none', pointerEvents: 'none' }}
              >{text}</text>
            ))}
          </motion.g>

          {/* ── Frontstage ── */}
          <motion.g
            animate={{ opacity: layerOpacity('frontstage', activeLayer) }}
            transition={{ duration: 0.20 }}
            onClick={() => toggle('frontstage')}
            onKeyDown={e => onKey(e, 'frontstage')}
            role="button" tabIndex={0} aria-pressed={activeLayer === 'frontstage'}
            aria-label="Frontstage layer"
            style={{ cursor: 'pointer' }}
          >
            <rect x={0} y={FS_Y} width={SVG_W} height={FS_H}
              fill={activeLayer === 'frontstage' ? `${TEAL}0.16)` : `${TEAL}0.04)`}
              style={{ transition: 'fill 0.20s' }}
            />
            <line x1={0} y1={FS_Y + FS_H} x2={SVG_W} y2={FS_Y + FS_H} stroke="rgba(255,255,255,0.06)" strokeWidth={1} />
            <text x={4} y={FS_Y + 7} textAnchor="start" dominantBaseline="hanging"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${TEAL_TEXT}0.885)`} style={{ userSelect: 'none', pointerEvents: 'none' }}
            >FRONTSTAGE</text>
            {FS_ITEMS.map((text, i) => (
              <text key={i} x={SCX[i]} y={FS_Y + FS_H / 2 + 5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="6.5" fontFamily="var(--font-body, Inter, sans-serif)"
                fill="rgba(255,255,255,0.58)" style={{ userSelect: 'none', pointerEvents: 'none' }}
              >{text}</text>
            ))}
          </motion.g>

          {/* ── LINE OF VISIBILITY (clickable) ── */}
          <motion.g
            animate={{ opacity: layerOpacity('line-of-visibility', activeLayer) }}
            transition={{ duration: 0.20 }}
            onClick={() => toggle('line-of-visibility')}
            onKeyDown={e => onKey(e, 'line-of-visibility')}
            role="button" tabIndex={0} aria-pressed={activeLayer === 'line-of-visibility'}
            aria-label="Line of visibility"
            style={{ cursor: 'pointer' }}
          >
            {/* Hit area */}
            <rect x={0} y={LOV_TOP} width={SVG_W} height={LOV_BOTTOM - LOV_TOP} fill="transparent" />
            {activeLayer === 'line-of-visibility' && (
              <rect x={0} y={LOV_TOP} width={SVG_W} height={LOV_BOTTOM - LOV_TOP}
                fill="rgba(255,255,255,0.04)" style={{ pointerEvents: 'none' }}
              />
            )}
            <line
              x1={0} y1={LOV_LINE_Y} x2={SVG_W} y2={LOV_LINE_Y}
              stroke={lovStroke(activeLayer)}
              strokeWidth={lovStrokeWidth(activeLayer)}
              strokeDasharray="9 5"
              filter="url(#sb-int-glow)"
              style={{ transition: 'stroke 0.20s, stroke-width 0.20s', pointerEvents: 'none' }}
            />
            <text x={SVG_W - 6} y={LOV_LINE_Y - 7}
              textAnchor="end" dominantBaseline="auto"
              fontSize="5.5" fontFamily="var(--font-mono)" letterSpacing="0.14em"
              fill={activeLayer === 'line-of-visibility' ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.58)'}
              style={{ userSelect: 'none', pointerEvents: 'none', transition: 'fill 0.20s' }}
            >LINE OF VISIBILITY</text>
          </motion.g>

          {/* ── Backstage ── */}
          <motion.g
            animate={{ opacity: layerOpacity('backstage', activeLayer) }}
            transition={{ duration: 0.20 }}
            onClick={() => toggle('backstage')}
            onKeyDown={e => onKey(e, 'backstage')}
            role="button" tabIndex={0} aria-pressed={activeLayer === 'backstage'}
            aria-label="Backstage layer"
            style={{ cursor: 'pointer' }}
          >
            <rect x={0} y={BS_Y} width={SVG_W} height={BS_H}
              fill={activeLayer === 'backstage' ? `${SLATE}0.18)` : `${SLATE}0.05)`}
              style={{ transition: 'fill 0.20s' }}
            />
            <line x1={0} y1={BS_Y + BS_H} x2={SVG_W} y2={BS_Y + BS_H} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            <text x={4} y={BS_Y + 7} textAnchor="start" dominantBaseline="hanging"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${SLATE_TEXT}0.912)`} style={{ userSelect: 'none', pointerEvents: 'none' }}
            >BACKSTAGE</text>
            {BS_ITEMS.map((text, i) => (
              <text key={i} x={SCX[i]} y={BS_Y + BS_H / 2 + 5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="6.5" fontFamily="var(--font-body, Inter, sans-serif)"
                fill={`${SLATE_TEXT}0.941)`} style={{ userSelect: 'none', pointerEvents: 'none' }}
              >{text}</text>
            ))}
          </motion.g>

          {/* ── Support Processes ── */}
          <motion.g
            animate={{ opacity: layerOpacity('support-processes', activeLayer) }}
            transition={{ duration: 0.20 }}
            onClick={() => toggle('support-processes')}
            onKeyDown={e => onKey(e, 'support-processes')}
            role="button" tabIndex={0} aria-pressed={activeLayer === 'support-processes'}
            aria-label="Support Processes / Systems layer"
            style={{ cursor: 'pointer' }}
          >
            <rect x={0} y={SP_Y} width={SVG_W} height={SP_H}
              fill={activeLayer === 'support-processes' ? `${SLATE}0.22)` : `${SLATE}0.08)`}
              style={{ transition: 'fill 0.20s' }}
            />
            <text x={4} y={SP_Y + 7} textAnchor="start" dominantBaseline="hanging"
              fontSize="4.5" fontFamily="var(--font-mono)" letterSpacing="0.10em"
              fill={`${SLATE_TEXT}0.891)`} style={{ userSelect: 'none', pointerEvents: 'none' }}
            >SUPPORT PROCESSES / SYSTEMS</text>
            {SP_ITEMS.map((text, i) => (
              <text key={i} x={SCX[i]} y={SP_Y + SP_H / 2 + 5}
                textAnchor="middle" dominantBaseline="middle"
                fontSize="6.5" fontFamily="var(--font-body, Inter, sans-serif)"
                fill={`${SLATE_TEXT}0.92)`} style={{ userSelect: 'none', pointerEvents: 'none' }}
              >{text}</text>
            ))}
          </motion.g>
        </svg>

        {!activeLayer && (
          <p className="text-center mt-4" style={{
            fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)',
            letterSpacing: '0.10em', textTransform: 'uppercase', color: `${TEAL}0.50)`,
          }}>
            Click any layer to see what lives there
          </p>
        )}
      </div>

      {/* Detail panel */}
      <AnimatePresence mode="wait">
        {activeLayer ? (
          <motion.div
            key={activeLayer}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease }}
            className="rounded-xl p-6"
            style={{
              background: `${accentFor(activeLayer)}0.06)`,
              border: `1px solid ${accentFor(activeLayer)}0.22)`,
            }}
          >
            <p className="font-mono uppercase tracking-widest mb-1"
              style={{ fontSize: 'var(--text-2xs)', color: `${accentFor(activeLayer)}0.68)` }}
            >{LAYER_DETAIL[activeLayer].tagline}</p>
            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-xl)', color: '#FAFAFA' }}
            >{LAYER_DETAIL[activeLayer].heading}</h3>
            <p style={{ fontSize: 'var(--text-sm)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.68)' }}>
              {LAYER_DETAIL[activeLayer].body}
            </p>
            {activeLayer === 'line-of-visibility' && (
              <div className="mt-5 rounded-lg p-4"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.20)' }}
              >
                <p className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: 'rgba(255,255,255,0.40)' }}
                >The key distinction</p>
                <p style={{ fontSize: 'var(--text-xs)', lineHeight: 'var(--leading-relaxed)', color: 'rgba(255,255,255,0.58)' }}>
                  A journey map lives entirely above this line. A service blueprint keeps the top spine and then crosses it. The crossing is what this method exists for.
                </p>
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="flex items-center justify-center"
            style={{ minHeight: 100 }}
          >
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.22)', fontStyle: 'italic' }}>
              Select a layer to read its description.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

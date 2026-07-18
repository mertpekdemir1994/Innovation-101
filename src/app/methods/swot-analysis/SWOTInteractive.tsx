'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM_RGB = 'rgba(107,74,119,'

type Selection = 'none' | 's' | 'w' | 'o' | 't' | 'so' | 'wt' | 'st' | 'wo' | 'internal' | 'external' | 'helpful' | 'harmful'

const QUADRANT_INFO = {
  s: {
    label: 'STRENGTHS',
    axis: 'Internal · Helpful',
    items: ['Loyal customer base', 'Dense local store footprint', '30 years of supplier relationships'],
    note: 'These are real. But a list of strengths, alone, points to no action. Strengths only become strategy when you cross them with something.',
    color: PLUM_RGB,
  },
  w: {
    label: 'WEAKNESSES',
    axis: 'Internal · Harmful',
    items: ['No functioning delivery logistics', 'App with a one-star rating', 'Thin margins under price pressure'],
    note: 'The most honest quadrant — and the one teams most often soften. If this list is diplomatic, the two most important crossings (W×T and W×O) become impossible.',
    color: 'rgba(220,38,38,',
  },
  o: {
    label: 'OPPORTUNITIES',
    axis: 'External · Helpful',
    items: ['"Shop local" sentiment rising', 'Convenience delivery demand', 'National player not yet in our markets'],
    note: 'External, meaning outside your control. A common mistake: filing an aspiration here. An opportunity is something in the world, not something you want to do.',
    color: 'rgba(59,130,246,',
  },
  t: {
    label: 'THREATS',
    axis: 'External · Harmful',
    items: ['National online grocery entrant arriving', 'Changing consumer price sensitivity', 'Regulatory cost increases'],
    note: 'A trivial threat and an existential one look identical in this box. Before acting on the crossings, weight by magnitude and probability.',
    color: 'rgba(245,158,11,',
  },
}

const CROSSING_INFO = {
  so: {
    label: 'S × O — PRESS',
    color: PLUM_RGB,
    description: 'Match a real advantage to a real opening. Your dense local footprint × "shop local" sentiment and convenience demand → same-day pickup from existing stores, using proximity a national player cannot match for years. These are your most aggressive, highest-confidence moves.',
    instruction: 'Ask: where can we do more of what we are good at, because the world is opening for it?',
  },
  wt: {
    label: 'W × T — DEFEND',
    color: 'rgba(220,38,38,',
    description: 'Where a vulnerability meets an external danger. No delivery logistics × national online entrant arriving → the entrant\'s first advantage is the one you cannot counter. Fix this before anything else. These moves usually deserve attention before the exciting S×O press moves.',
    instruction: 'Ask: where are we exposed in a way that could sink us, and what must we address first?',
  },
  st: {
    label: 'S × T — COUNTER',
    color: 'rgba(245,158,11,',
    description: 'Use something you have to blunt something coming. Your supplier relationships × the threat of national-player price leverage → build a local-sourcing story the national player structurally cannot tell. Turn your asset against their advantage.',
    instruction: 'Ask: what do we have that directly blunts what is coming at us?',
  },
  wo: {
    label: 'W × O — BUILD',
    color: 'rgba(59,130,246,',
    description: 'An opening you cannot yet reach because of a gap in yourself. No delivery logistics × the convenience-delivery opportunity → you cannot access this opportunity in your current state. The move is to build the missing capability — or honestly decide to let the opportunity go.',
    instruction: 'Ask: what would we need to build or fix in order to reach for this?',
  },
}

const AXIS_INFO = {
  internal: 'INTERNAL means about you — within your control. Strengths and Weaknesses are always internal. The most common error: filing an external market trend as a "Strength." It is not yours; you do not control it.',
  external: 'EXTERNAL means about the world — outside your control. You can prepare for it, respond to it, exploit it, or defend against it, but you cannot change it. Opportunities and Threats are always external.',
  helpful:  'HELPFUL to your position — not morally, just directionally. Strengths and Opportunities are helpful in the sense that, if used well, they work for you.',
  harmful:  'HARMFUL to your position. Weaknesses and Threats work against you. The W×T crossing — where two harmful factors meet — is often the most important and the most avoided.',
}

export default function SWOTInteractive() {
  const [selected, setSelected] = useState<Selection>('none')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const tr = prefersReduced ? { duration: 0 } : { duration: 0.22, ease }

  const toggle = (id: Selection) => setSelected(prev => prev === id ? 'none' : id)

  const qInfo = (selected === 's' || selected === 'w' || selected === 'o' || selected === 't')
    ? QUADRANT_INFO[selected] : null
  const cInfo = (selected === 'so' || selected === 'wt' || selected === 'st' || selected === 'wo')
    ? CROSSING_INFO[selected] : null
  const aInfo = (selected === 'internal' || selected === 'external' || selected === 'helpful' || selected === 'harmful')
    ? AXIS_INFO[selected] : null

  const btnStyle = (id: Selection, color: string): React.CSSProperties => ({
    background: selected === id ? `${color}0.14)` : 'rgba(255,255,255,0.04)',
    border: `1px solid ${selected === id ? `${color}0.40)` : 'rgba(255,255,255,0.12)'}`,
    color: selected === id ? `${color}0.90)` : 'rgba(255,255,255,0.50)',
    fontFamily: 'var(--font-mono)',
    fontSize: '10px',
    letterSpacing: '0.10em',
    padding: '8px 14px',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'all 0.15s ease',
    fontWeight: selected === id ? 600 : 400,
  })

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>

      {/* ── Axis buttons ── */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.30)', marginBottom: '10px' }}>
          THE TWO AXES — click to understand what they mean
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {(['internal', 'external', 'helpful', 'harmful'] as const).map(id => (
            <button key={id} onClick={() => toggle(id)} style={btnStyle(id, 'rgba(255,255,255,')}>
              {id.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Quadrant buttons ── */}
      <div style={{ marginBottom: '24px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.30)', marginBottom: '10px' }}>
          THE FOUR QUADRANTS — each holds a list; the list alone points to nothing
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {(['s', 'w', 'o', 't'] as const).map(id => {
            const q = QUADRANT_INFO[id]
            return (
              <button key={id} onClick={() => toggle(id)} style={btnStyle(id, q.color)}>
                {q.label}
                <span style={{ display: 'block', fontSize: '8px', opacity: 0.65, marginTop: '2px' }}>{q.axis}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Crossing buttons ── */}
      <div style={{ marginBottom: '28px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.30)', marginBottom: '10px' }}>
          THE FOUR CROSSINGS — this is where strategy appears
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {(['so', 'wt', 'st', 'wo'] as const).map(id => {
            const c = CROSSING_INFO[id]
            return (
              <button key={id} onClick={() => toggle(id)} style={btnStyle(id, c.color)}>
                {c.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Detail panel ── */}
      <AnimatePresence mode="wait">
        {selected !== 'none' && (
          <motion.div
            key={selected}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={tr}
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '8px',
              padding: '20px 24px',
            }}
          >
            {qInfo && (
              <>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: `${qInfo.color}0.70)`, marginBottom: '12px' }}>
                  {qInfo.label} — {qInfo.axis}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {qInfo.items.map((item, i) => (
                    <li key={i} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                      · {item}
                    </li>
                  ))}
                </ul>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                  {qInfo.note}
                </p>
              </>
            )}
            {cInfo && (
              <>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', letterSpacing: '0.12em', color: `${cInfo.color}0.80)`, marginBottom: '12px', fontWeight: 600 }}>
                  {cInfo.label}
                </p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, marginBottom: '14px' }}>
                  {cInfo.description}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.42)', lineHeight: 1.6, fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px' }}>
                  {cInfo.instruction}
                </p>
              </>
            )}
            {aInfo && (
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>
                {aInfo}
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {selected === 'none' && (
        <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.28)', lineHeight: 1.6, fontStyle: 'italic' }}>
          Select an axis, a quadrant, or a crossing above. The quadrants are setup; the crossings are the strategy.
        </p>
      )}
    </div>
  )
}

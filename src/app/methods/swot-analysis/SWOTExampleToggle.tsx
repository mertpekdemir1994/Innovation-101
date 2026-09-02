'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM   = 'rgba(107,74,119,'
const RED    = 'rgba(220,38,38,'
const GREEN  = 'rgba(5,150,105,'
const AMBER  = 'rgba(245,158,11,'
const BLUE   = 'rgba(59,130,246,'
const INDIGO = 'rgba(99,102,241,'
// Darker variants for text on this light background: RED, GREEN, AMBER,
// BLUE, and INDIGO all fail 4.5:1 on white even at full opacity —
// `color` stays as-is for backgrounds/borders (3:1 is enough there).
const RED_DARK    = 'rgba(185,28,28,'
const GREEN_DARK  = 'rgba(6,95,70,'
const AMBER_DARK  = 'rgba(180,83,9,'
const BLUE_DARK   = 'rgba(29,78,216,'
const INDIGO_DARK = 'rgba(79,70,229,'

type Tab = 'traditional' | 'ai'

export default function SWOTExampleToggle() {
  const [tab, setTab] = useState<Tab>('traditional')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const tr = prefersReduced ? { duration: 0 } : { duration: 0.22, ease }

  return (
    <div>
      {/* Tab buttons */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
        {([
          { id: 'traditional' as Tab, label: 'TRADITIONAL' },
          { id: 'ai' as Tab,          label: 'WITH AI (HYPOTHETICAL)' },
        ] as const).map(({ id, label }) => (
          <button
            key={id}
            type="button"
            aria-pressed={tab === id}
            onClick={() => setTab(id)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.12em',
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1px solid ${tab === id ? `${PLUM}0.55)` : 'var(--color-neutral-200)'}`,
              background: tab === id ? `${PLUM}0.10)` : 'transparent',
              color: tab === id ? `${PLUM}0.90)` : 'var(--color-neutral-500)',
              cursor: 'pointer',
            }}
          >{label}</button>
        ))}
      </div>

      {/* Scenario context */}
      <div style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)', borderRadius: '6px', padding: '16px 20px', marginBottom: '24px' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--color-neutral-500)', marginBottom: '6px' }}>SCENARIO</p>
        <p style={{ fontSize: '14px', color: 'var(--color-neutral-700)', lineHeight: 1.65 }}>
          A regional grocery chain, facing the arrival of a national online grocery player in its markets, runs a SWOT to decide how to respond. Both tabs analyze the same situation; only the method differs.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {tab === 'traditional' ? (
          <motion.div key="trad" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>

            {/* Specificity pass */}
            <div style={{ background: `${PLUM}0.05)`, border: `1px solid ${PLUM}0.18)`, borderRadius: '6px', padding: '16px 20px', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: `${PLUM}0.90)`, marginBottom: '12px', fontWeight: 600 }}>STEP 1: THE SPECIFICITY PASS</p>
              <div style={{ display: 'grid', gap: '10px' }}>
                {[
                  { before: '"Strong local presence"', after: '"Stores within a 10-minute drive of 80% of customers, and 30 years of local supplier relationships"' },
                  { before: '"Weak digital"', after: '"No functioning delivery logistics and an app with a one-star rating"' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--color-neutral-500)', marginBottom: '4px' }}>BEFORE</p>
                      <p style={{ fontSize: '13px', color: 'var(--color-neutral-500)', fontStyle: 'italic' }}>{item.before}</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: `${PLUM}0.90)`, marginBottom: '4px' }}>AFTER</p>
                      <p style={{ fontSize: '13px', color: 'var(--color-neutral-800)', lineHeight: 1.5 }}>{item.after}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-neutral-600)', marginTop: '12px', fontStyle: 'italic', borderTop: '1px solid var(--color-neutral-200)', paddingTop: '10px' }}>
                Vague comfort became something you could actually build a move on.
              </p>
            </div>

            {/* The crossings */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { type: 'S × T: COUNTER', color: AMBER, textColor: AMBER_DARK, move: 'Dense local footprint × national entrant\'s threat → same-day pickup from existing stores using proximity the national player cannot match for years.' },
                { type: 'W × T: DEFEND',  color: RED,   textColor: RED_DARK,   move: 'Broken delivery logistics × same threat → this must be fixed first. It moved to the top of the plan before the counter-move could be executed.' },
                { type: 'S × O: PRESS',   color: PLUM,  textColor: PLUM,       move: 'Local supplier relationships × "shop local" sentiment → a local-sourcing story the national player structurally cannot tell.' },
                { type: 'W × O: BUILD',   color: BLUE,  textColor: BLUE_DARK,  move: 'To reach the convenience-delivery opportunity at all: build the delivery capability. The honest precondition for everything else.' },
              ].map((item, i) => (
                <div key={i} style={{ background: `${item.color}0.05)`, border: `1px solid ${item.color}0.18)`, borderLeft: `3px solid ${item.color}0.60)`, borderRadius: '0 6px 6px 0', padding: '14px 16px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: `${item.textColor}1)`, marginBottom: '8px', fontWeight: 600 }}>{item.type}</p>
                  <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', lineHeight: 1.6 }}>{item.move}</p>
                </div>
              ))}
            </div>

            {/* Sequence note */}
            <div style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)', borderRadius: '6px', padding: '14px 18px', marginTop: '16px' }}>
              <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', lineHeight: 1.6 }}>
                Clear sequence: <strong>defend first</strong> (fix logistics), then <strong>counter and press</strong> (same-day from stores, local-sourcing story). The four lists had been inert. The crossings were the strategy, and the specificity pass was what made them sharp.
              </p>
            </div>

          </motion.div>
        ) : (
          <motion.div key="ai" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>

            {/* Hypothetical note */}
            <div style={{ background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.25)`, borderRadius: '6px', padding: '12px 16px', marginBottom: '20px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.10em', color: `${INDIGO_DARK}0.90)`, flexShrink: 0 }}>HYPOTHETICAL</span>
              <p style={{ fontSize: '12px', color: 'var(--color-neutral-600)', lineHeight: 1.6, margin: 0 }}>
                The same team asks AI to run the SWOT. This tab shows how that plays out: fast, professional, and specifically wrong in the ways that matter.
              </p>
            </div>

            {/* AI output = platitudes */}
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: 'var(--color-neutral-500)', marginBottom: '12px' }}>WHAT AI PRODUCED: INSTANTLY</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                {[
                  { label: 'STRENGTHS',     color: PLUM,  textColor: PLUM,       items: ['Strong local presence', 'Loyal customers', 'Established brand'] },
                  { label: 'WEAKNESSES',    color: RED,   textColor: RED_DARK,   items: ['Limited digital capabilities', 'Smaller scale'] },
                  { label: 'OPPORTUNITIES', color: GREEN, textColor: GREEN_DARK, items: ['Growing online demand', 'Local sourcing trends'] },
                  { label: 'THREATS',       color: AMBER, textColor: AMBER_DARK, items: ['National competitors', 'Changing consumer habits'] },
                ].map(box => (
                  <div key={box.label} style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)', borderRadius: '6px', padding: '12px 14px' }}>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.10em', color: `${box.textColor}1)`, marginBottom: '8px' }}>{box.label}</p>
                    {box.items.map((item, i) => (
                      <p key={i} style={{ fontSize: '12px', color: 'var(--color-neutral-600)', lineHeight: 1.4, marginBottom: '3px' }}>· {item}</p>
                    ))}
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: 'var(--color-neutral-500)', fontStyle: 'italic', lineHeight: 1.6 }}>
                Every entry is true, generic, and unfalsifiable: it describes not this grocery chain but every regional grocery chain ever. Polished artifact; no strategy.
              </p>
            </div>

            {/* But - two good uses */}
            <div style={{ background: `${GREEN}0.04)`, border: `1px solid ${GREEN}0.18)`, borderRadius: '6px', padding: '16px 18px', marginBottom: '12px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: `${GREEN_DARK}0.90)`, marginBottom: '10px', fontWeight: 600 }}>USED AS A SPECIFICITY ADVERSARY: VALUABLE</p>
              <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', lineHeight: 1.6 }}>
                Pointed at each entry and asked to demand specificity, it pushed hard: what does &ldquo;strong local presence&rdquo; mean in drive-times and supplier years? That challenge produced the sharp entries the human version reached by discipline.
              </p>
            </div>

            <div style={{ background: `${GREEN}0.04)`, border: `1px solid ${GREEN}0.18)`, borderRadius: '6px', padding: '16px 18px', marginBottom: '16px' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: `${GREEN_DARK}0.90)`, marginBottom: '10px', fontWeight: 600 }}>USED AS A CROSSING GENERATOR: VALUABLE</p>
              <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', lineHeight: 1.6 }}>
                Asked to generate crossings from the sharpened quadrants, it proposed several (including the store-as-fulfilment-node counter-move) quickly, as candidates. The judgment that the proximity counter-move was the real one, that logistics had to be fixed first, that &ldquo;loyal customers&rdquo; was more comfort than fact, remained entirely human. AI treats asserted strengths and real ones identically.
              </p>
            </div>

            {/* Closing */}
            <div style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)', borderRadius: '6px', padding: '14px 18px' }}>
              <p style={{ fontSize: '13px', color: 'var(--color-neutral-700)', lineHeight: 1.6 }}>
                The boxes were never the work. The crossings were, and choosing among them still is. Never ask AI to write the SWOT. Ask it to sharpen the entries and generate the crossings for you to judge.
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

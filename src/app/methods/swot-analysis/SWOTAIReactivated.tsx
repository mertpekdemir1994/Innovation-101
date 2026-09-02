'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const PLUM  = 'rgba(107,74,119,'
const INDIGO = 'rgba(99,102,241,'
const RED   = 'rgba(220,38,38,'
const GREEN = 'rgba(5,150,105,'
const AMBER = 'rgba(245,158,11,'
// Brightened text-safe variants: PLUM, RED, GREEN, and INDIGO all fail
// 4.5:1 on this dark background at the opacities used below (INDIGO and
// GREEN fail even at full opacity) — `color` stays vivid for
// backgrounds/borders (3:1 is enough there), these are for text.
const PLUM_TEXT   = 'rgba(166,147,174,'
const RED_TEXT    = 'rgba(248,113,113,'
const GREEN_TEXT  = 'rgba(52,211,153,'
const INDIGO_TEXT = 'rgba(141,143,245,'

type State = 'ai-fills' | 'specificity' | 'crossings'

export default function SWOTAIReactivated() {
  const [state, setState] = useState<State>('ai-fills')
  const prefersReduced = useReducedMotion()
  const ease = [0.16, 1, 0.3, 1] as [number, number, number, number]
  const tr = prefersReduced ? { duration: 0 } : { duration: 0.28, ease }

  const AI_BOXES = [
    { label: 'STRENGTHS',     color: PLUM,  textColor: PLUM_TEXT,  items: ['Strong brand', 'Talented team', 'Loyal customers', 'Market presence'] },
    { label: 'WEAKNESSES',    color: RED,   textColor: RED_TEXT,   items: ['Limited digital capabilities', 'Smaller scale', 'Cost structure', 'Aging infrastructure'] },
    { label: 'OPPORTUNITIES', color: GREEN, textColor: GREEN_TEXT, items: ['Growing online demand', 'Local sourcing trends', 'New market segments', 'Technology adoption'] },
    { label: 'THREATS',       color: AMBER, textColor: AMBER,      items: ['National competitors', 'Changing consumer habits', 'Regulatory environment', 'Economic uncertainty'] },
  ]

  const SPECIFICITY = [
    {
      before: 'Strong brand',
      after: 'Brand commands a 12% price premium with customers over 40 in our core markets, confirmed by recent pricing analysis',
      challenge: 'Is this falsifiable? What would make it specific enough to act on?',
    },
    {
      before: 'Growing online demand',
      after: 'Online grocery penetration in our top 3 markets grew from 8% to 19% in 24 months, with same-day delivery the primary driver',
      challenge: 'Is this about the world, not your aspirations? How would you know it was no longer true?',
    },
    {
      before: 'National competitors',
      after: 'A national player with $2B in logistics investment has announced entry to all 3 of our core markets in Q4',
      challenge: 'What is the magnitude and timeline? A vague threat and an existential one look identical in the box.',
    },
  ]

  const CROSSINGS_GENERATED = [
    { crossing: 'S × O: PRESS', move: 'Use the price premium brand trust × the growing same-day convenience demand → launch a premium same-day grocery tier at a 15% markup, positioned as the trusted local alternative.', color: PLUM, textColor: PLUM_TEXT },
    { crossing: 'W × T: DEFEND', move: 'No delivery infrastructure × national entrant\'s Q4 arrival → build or acquire last-mile capability in the next 6 months, or cede the delivery channel entirely. This is the defend move that determines whether the S×O press is even possible.', color: RED, textColor: RED_TEXT },
    { crossing: 'S × T: COUNTER', move: 'Supplier relationships × the entrant\'s generic, national brand → build a hyper-local assortment story (named local farms, exclusive regional products) that a national player structurally cannot replicate.', color: AMBER, textColor: AMBER },
  ]

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>

      {/* State tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {[
          { id: 'ai-fills' as State,    label: 'AI FILLS THE BOXES',          color: RED,    textColor: RED_TEXT    },
          { id: 'specificity' as State, label: 'AI AS SPECIFICITY ADVERSARY',  color: GREEN,  textColor: GREEN_TEXT  },
          { id: 'crossings' as State,   label: 'AI AS CROSSING GENERATOR',     color: INDIGO, textColor: INDIGO_TEXT },
        ].map(({ id, label, color, textColor }) => (
          <button
            key={id}
            onClick={() => setState(id)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.10em',
              padding: '8px 14px',
              borderRadius: '4px',
              border: `1px solid ${state === id ? `${color}0.50)` : 'rgba(255,255,255,0.12)'}`,
              background: state === id ? `${color}0.12)` : 'transparent',
              color: state === id ? `${textColor}0.90)` : 'rgba(255,255,255,0.50)',
              cursor: 'pointer',
            }}
          >{label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {state === 'ai-fills' && (
          <motion.div key="fills" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>
            {/* Danger callout */}
            <div style={{ background: `${RED}0.08)`, border: `1px solid ${RED}0.28)`, borderRadius: '6px', padding: '14px 18px', marginBottom: '20px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.10em', color: `${RED_TEXT}0.90)`, flexShrink: 0, paddingTop: '2px' }}>DANGER</span>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.6, margin: 0 }}>
                AI fills four boxes in seconds. These look like analysis and are the method&rsquo;s worst failure mass-produced. Every entry below could describe any company in any industry.
              </p>
            </div>
            {/* Four boxes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {AI_BOXES.map(box => (
                <div key={box.label} style={{ background: `${box.color}0.05)`, border: `1px solid ${box.color}0.18)`, borderRadius: '6px', padding: '14px 16px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: `${box.textColor}0.85)`, marginBottom: '10px', fontWeight: 600 }}>{box.label}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    {box.items.map((item, i) => (
                      <li key={i} style={{ fontSize: '12px', color: 'rgba(255,255,255,0.60)', lineHeight: 1.5 }}>· {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, marginTop: '16px', fontStyle: 'italic' }}>
              These entries are true, generic, and unfalsifiable: they describe not your company but every company. A team that stops here, feeling finished, has a polished artifact and no strategy.
            </p>
          </motion.div>
        )}

        {state === 'specificity' && (
          <motion.div key="spec" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: '20px' }}>
              Point AI at each vague entry and have it demand specificity: is this falsifiable? What would make it concrete enough to act on? What would tell you it was no longer true? Used as an adversary against vagueness, it is fast and effective.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {SPECIFICITY.map((item, i) => (
                <div key={i} style={{ background: `${GREEN}0.05)`, border: `1px solid ${GREEN}0.18)`, borderRadius: '6px', padding: '16px 18px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '10px' }}>
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.10em', color: `${RED_TEXT}0.85)`, marginBottom: '6px' }}>BEFORE (VAGUE)</p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.50)', fontStyle: 'italic' }}>&ldquo;{item.before}&rdquo;</p>
                    </div>
                    <div>
                      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.10em', color: `${GREEN_TEXT}0.85)`, marginBottom: '6px' }}>AFTER (SPECIFIC)</p>
                      <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.80)', lineHeight: 1.5 }}>{item.after}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.50)', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                    AI challenge: &ldquo;{item.challenge}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {state === 'crossings' && (
          <motion.div key="cross" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={tr}>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.65)', lineHeight: 1.65, marginBottom: '20px' }}>
              Give AI your sharpened, specific quadrants and ask it to generate candidate crossings. It produces many quickly. Useful. The judgment of which crossings are real, which strengths are actually assets versus comfortable stories, and which threats deserve priority stays entirely human.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CROSSINGS_GENERATED.map((item, i) => (
                <div key={i} style={{ background: `${item.color}0.05)`, border: `1px solid ${item.color}0.20)`, borderLeft: `3px solid ${item.color}0.60)`, borderRadius: '0 6px 6px 0', padding: '16px 18px' }}>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', letterSpacing: '0.12em', color: `${item.textColor}0.90)`, marginBottom: '10px', fontWeight: 600 }}>{item.crossing}</p>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.70)', lineHeight: 1.6 }}>{item.move}</p>
                </div>
              ))}
            </div>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.50)', lineHeight: 1.6, marginTop: '16px', fontStyle: 'italic' }}>
              AI generated these candidates quickly. Choosing among them (which is the right first move, which strengths are real versus asserted, which threats are existential) remains the human work.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

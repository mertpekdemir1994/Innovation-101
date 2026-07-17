'use client'
import { useState } from 'react'

const PLUM   = 'rgba(107,74,119,'
const INDIGO = 'rgba(99,102,241,'
const AMBER  = 'rgba(217,119,6,'
const GREEN  = 'rgba(5,150,105,'

type Tab = 'A' | 'B'

export default function TLExampleToggle() {
  const [tab, setTab] = useState<Tab>('A')

  return (
    <div>
      {/* Tab bar */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        <TabBtn active={tab === 'A'} onClick={() => setTab('A')} accent={PLUM}>
          A — 12-LEVER AUDIT
        </TabBtn>
        <TabBtn active={tab === 'B'} onClick={() => setTab('B')} accent={INDIGO}>
          B — AI FAST SCAN (HYPOTHETICAL)
        </TabBtn>
      </div>

      {tab === 'A' ? <TabA /> : <TabB />}
    </div>
  )
}

function TabBtn({
  active, onClick, accent, children,
}: {
  active: boolean
  onClick: () => void
  accent: string
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '9px',
        letterSpacing: '0.12em',
        padding: '6px 16px',
        borderRadius: '20px',
        border: `1px solid ${active ? `${accent}0.55)` : 'var(--color-neutral-200)'}`,
        background: active ? `${accent}0.10)` : 'transparent',
        color: active ? `${accent}0.90)` : 'var(--color-neutral-500)',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  )
}

function Chip({ text, accent }: { text: string; accent: string }) {
  return (
    <span style={{
      fontFamily: 'var(--font-mono)',
      fontSize: '8px',
      letterSpacing: '0.10em',
      padding: '3px 10px',
      borderRadius: '20px',
      background: `${accent}0.10)`,
      border: `1px solid ${accent}0.30)`,
      color: `${accent}0.82)`,
      display: 'inline-block',
      whiteSpace: 'nowrap',
    }}>
      {text}
    </span>
  )
}

function Block({
  label, accent, children,
}: {
  label: string
  accent: string
  children: React.ReactNode
}) {
  return (
    <div style={{
      padding: '20px',
      background: `${accent}0.05)`,
      border: `1px solid ${accent}0.22)`,
      borderRadius: '6px',
    }}>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '8px',
        letterSpacing: '0.14em',
        color: `${accent}0.75)`,
        marginBottom: '12px',
        fontWeight: 600,
      }}>
        {label}
      </p>
      {children}
    </div>
  )
}

function TabA() {
  return (
    <div>
      {/* Scenario */}
      <div style={{ marginBottom: '24px', padding: '16px 20px', background: 'var(--color-neutral-50)', borderRadius: '6px', borderLeft: `3px solid ${PLUM}0.45)` }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.12em', color: `${PLUM}0.60)`, marginBottom: '6px' }}>SCENARIO</p>
        <p style={{ color: 'var(--color-neutral-700)', fontSize: '14px', lineHeight: 1.65 }}>
          A mid-sized manufacturer of specialty industrial components is facing commoditization. The product is technically solid, pricing pressure is intense, and margins are eroding year over year. The leadership team suspects the only path forward is &ldquo;a better product&rdquo; &mdash; but they commission a 12-lever audit.
        </p>
      </div>

      {/* Audit results */}
      <div style={{ display: 'grid', gap: '12px' }}>
        <Block label="STEP 1 — THE AUDIT REVEALS THE DEFAULT" accent={AMBER}>
          <p style={{ color: 'var(--color-neutral-700)', fontSize: '13px', lineHeight: 1.65, marginBottom: '12px' }}>
            The team maps what they have invested in across all twelve levers over the last three years. The pattern is stark: 85% of innovation effort has gone to the Offering lever — better specs, tighter tolerances, expanded SKU range. Almost nothing has been invested in Revenue Model, Cost Model, or Partnerships.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip text="OFFERING: 85% OF EFFORT" accent={AMBER} />
            <Chip text="REVENUE MODEL: UNTOUCHED" accent={PLUM} />
            <Chip text="PARTNERSHIPS: UNTOUCHED" accent={PLUM} />
          </div>
        </Block>

        <Block label="STEP 2 — THREE LEVERS SURFACE AS CANDIDATES" accent={PLUM}>
          <p style={{ color: 'var(--color-neutral-700)', fontSize: '13px', lineHeight: 1.65, marginBottom: '16px' }}>
            With the full lever map visible, three levers look genuinely promising — and none of them require a better product:
          </p>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              {
                lever: 'REVENUE MODEL',
                idea: 'Shift select customers from unit purchase to an availability contract (pay per uptime rather than per unit). Locks in recurring revenue and creates a performance incentive for the manufacturer.',
                accent: PLUM,
              },
              {
                lever: 'COST MODEL',
                idea: 'Partner with two regional distributors currently serving adjacent component categories to share warehousing and logistics. Reduces fixed logistics cost by an estimated 18% without operational disruption.',
                accent: PLUM,
              },
              {
                lever: 'PARTNERSHIPS',
                idea: 'Integrate with the two dominant industrial IoT platforms used by the target customer segment. Sensors already embedded in components; the partnership makes real-time performance data available to customers — a capability no competitor currently offers.',
                accent: PLUM,
              },
            ].map(({ lever, idea, accent }) => (
              <div key={lever} style={{ padding: '12px 14px', background: `${accent}0.06)`, borderLeft: `2px solid ${accent}0.38)`, borderRadius: '0 4px 4px 0' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.10em', color: `${accent}0.72)`, display: 'block', marginBottom: '6px' }}>
                  {lever}
                </span>
                <p style={{ color: 'var(--color-neutral-700)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{idea}</p>
              </div>
            ))}
          </div>
        </Block>

        <Block label="STEP 3 — COMBINATION CHOSEN, FEASIBILITY CHECKED" accent={GREEN}>
          <p style={{ color: 'var(--color-neutral-700)', fontSize: '13px', lineHeight: 1.65, marginBottom: '12px' }}>
            The team selects Revenue Model + Partnerships as a combined bet (Cost Model deferred to Year 2 — requires distributor negotiation that will take longer than the strategic window). They run feasibility checks: legal confirms availability contracts are enforceable in their key markets; the IoT platform integration is assessed at 6-month lead time.
          </p>
          <p style={{ color: 'var(--color-neutral-700)', fontSize: '13px', lineHeight: 1.65, marginBottom: '16px' }}>
            Result: a differentiated position built on Revenue Model + Partnerships that does not require a better product to launch — and that competitors selling identical components cannot easily replicate, because they lack the existing sensor infrastructure and the customer relationships needed to make availability contracts credible.
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <Chip text="REVENUE MODEL CHOSEN" accent={GREEN} />
            <Chip text="PARTNERSHIPS CHOSEN" accent={GREEN} />
            <Chip text="FEASIBILITY CONFIRMED" accent={GREEN} />
            <Chip text="NOT: A BETTER PRODUCT" accent={AMBER} />
          </div>
        </Block>
      </div>
    </div>
  )
}

function TabB() {
  return (
    <div>
      {/* Hypothetical warning */}
      <div style={{
        padding: '12px 16px',
        background: `${INDIGO}0.08)`,
        border: `1px solid ${INDIGO}0.30)`,
        borderRadius: '6px',
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '10px',
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.10em', color: `${INDIGO}0.75)`, paddingTop: '2px', flexShrink: 0 }}>HYPOTHETICAL</span>
        <p style={{ color: 'var(--color-neutral-500)', fontSize: '12px', lineHeight: 1.6, margin: 0 }}>
          This tab shows how an AI-first 12-lever scan would likely play out — fast, comprehensive, and systematically incomplete in the ways that matter. The scenario is the same manufacturer.
        </p>
      </div>

      {/* Same scenario but AI-led */}
      <Block label="AI FAST SCAN — WHAT IT PRODUCES" accent={INDIGO}>
        <p style={{ color: 'var(--color-neutral-700)', fontSize: '13px', lineHeight: 1.65, marginBottom: '16px' }}>
          The team asks an AI assistant to &ldquo;generate the top innovation idea for each of the 12 levers for an industrial components manufacturer.&rdquo; Within minutes, they have 12 ideas &mdash; one per lever, neatly listed:
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
          {[
            ['TARGET SEGMENT', 'Expand into aerospace aftermarket'],
            ['OFFERING', 'Add a higher-tolerance SKU tier'],
            ['REVENUE MODEL', 'Offer a subscription maintenance plan'],
            ['BUNDLING', 'Bundle components with installation service'],
            ['VALUE CHAIN', 'Shift to lean manufacturing'],
            ['COST MODEL', 'Consolidate suppliers for bulk discounts'],
            ['ORGANIZATION', 'Create a dedicated innovation team'],
            ['TECHNOLOGY', 'Implement predictive maintenance AI'],
            ['CHANNELS', 'Launch direct e-commerce channel'],
            ['RELATIONSHIPS', 'Add a customer loyalty program'],
            ['BRAND', 'Reposition as a premium precision brand'],
            ['PARTNERSHIPS', 'Partner with an IoT platform provider'],
          ].map(([lever, idea]) => (
            <div key={lever} style={{ padding: '10px 12px', background: `${INDIGO}0.06)`, borderLeft: `2px solid ${INDIGO}0.26)`, borderRadius: '0 4px 4px 0' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '7px', letterSpacing: '0.10em', color: `${INDIGO}0.60)`, display: 'block', marginBottom: '4px' }}>{lever}</span>
              <p style={{ color: 'var(--color-neutral-600)', fontSize: '12px', lineHeight: 1.5, margin: 0 }}>{idea}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Chip text="SPEED: 3 MINUTES" accent={INDIGO} />
          <Chip text="COVERAGE: ALL 12 LEVERS" accent={INDIGO} />
        </div>
      </Block>

      <div style={{ margin: '16px 0' }}>
        <Block label="WHAT THE FAST SCAN DOES NOT PRODUCE" accent={AMBER}>
          <div style={{ display: 'grid', gap: '10px' }}>
            {[
              {
                problem: 'No combination reasoning',
                detail: 'The 12 ideas are one per lever, in isolation. AI did not attempt to evaluate which levers reinforce each other, which combination would be defensible, or which is most material for this specific company\'s situation.',
              },
              {
                problem: 'No feasibility assessment',
                detail: 'Each idea is plausible for a generic manufacturer. AI does not know whether this manufacturer has the sensor infrastructure to make the IoT partnership idea work, or whether its customer relationships can sustain an availability contract. "Subscription maintenance plan" sounds reasonable — but can these customers actually shift their procurement model?',
              },
              {
                problem: 'The Offering lever is still in the list',
                detail: 'The fast scan generated an Offering idea (higher-tolerance SKU tier) that is indistinguishable in weight from the Revenue Model and Partnership ideas. The audit\'s key insight — that the Offering lever is over-pulled and the other two are the real opportunity — is absent. The bias is invisible.',
              },
            ].map(({ problem, detail }) => (
              <div key={problem} style={{ padding: '12px 14px', background: `${AMBER}0.05)`, borderLeft: `2px solid ${AMBER}0.30)`, borderRadius: '0 4px 4px 0' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.10em', color: `${AMBER}0.70)`, display: 'block', marginBottom: '6px' }}>{problem}</span>
                <p style={{ color: 'var(--color-neutral-600)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{detail}</p>
              </div>
            ))}
          </div>
        </Block>
      </div>

      {/* Synthesis */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{ padding: '16px', background: `${INDIGO}0.06)`, border: `1px solid ${INDIGO}0.22)`, borderRadius: '6px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.12em', color: `${INDIGO}0.75)`, marginBottom: '8px' }}>WHERE AI HELPS</p>
          <p style={{ color: 'var(--color-neutral-600)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
            AI is genuinely useful for ensuring no lever is overlooked and generating initial idea fodder quickly. Use it to populate the audit canvas before the workshop, not to replace the strategic thinking that happens inside it.
          </p>
        </div>
        <div style={{ padding: '16px', background: `${PLUM}0.06)`, border: `1px solid ${PLUM}0.22)`, borderRadius: '6px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '8px', letterSpacing: '0.12em', color: `${PLUM}0.75)`, marginBottom: '8px' }}>WHAT STAYS HUMAN</p>
          <p style={{ color: 'var(--color-neutral-600)', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
            The choice of which lever or combination to pull, whether that choice is organizationally feasible, and which levers are over-used in your specific context — these require judgment about your real situation that no AI can substitute.
          </p>
        </div>
      </div>
    </div>
  )
}

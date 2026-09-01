import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import PLExampleToggle from './PLExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Pilot Launches — Methods — Innovation 101',
}

const PLEstablishing  = dynamic(() => import('./PLEstablishing'),  { ssr: false })
const PLInteractive   = dynamic(() => import('./PLInteractive'),   { ssr: false })
const PLAIReactivated = dynamic(() => import('./PLAIReactivated'), { ssr: false })

const BRICK = '#8A4B3C'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Deliver',
    note: 'The Deliver phase of Double Diamond is where a validated concept becomes a real solution at real scale. The pilot launch is the controlled entry point to that transition: before you commit the full operational investment of a broad launch, the pilot tests whether the delivery model actually works under real conditions: with real customers, real operations, and real economics.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Measure',
    note: 'After the Build phase produces the full solution, the pilot is the Measure phase at operational scale. The difference from an MVP measurement cycle is that the pilot is measuring the delivery model (can we actually fulfil this, at what unit economics, with what operational load?) not the product hypothesis. The pre-committed metrics and the gate are the mechanism by which the measurement produces a decision.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Release',
    note: 'The Release phase is not a full launch; it is the bounded delivery of working software or a working solution to real users for the first time. The pilot is the operational counterpart to a Release: it tests whether the full solution can actually be delivered at scale, catching operational and economic failures before the broad release commits the full organisation.',
  },
  {
    slug: 'fde',
    name: 'Front-End of Innovation',
    phase: 'Launch',
    note: 'The Launch stage of the FDE moves a concept from internal development into the market. The pilot is a disciplined, bounded version of that launch: enough real market contact to generate valid operational and customer data, without the full capital exposure of a complete rollout. The pilot output, the gate verdict, is the input to the full Launch decision.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'mvp-mlp',
    name: 'MVP & MLP',
    rel: 'The most important distinction in the Delivery & Validation group. An MVP minimises the PRODUCT; it tests the product hypothesis with the minimum viable feature set. A pilot launch runs the FULL, REAL product with a bounded EXPOSURE. When you run a pilot, the product question is settled; the operational question is what remains. The two methods address different uncertainties and belong at different stages: MVP first, pilot when the product is ready to scale.',
  },
  {
    slug: 'proof-of-concept',
    name: 'Proof of Concept',
    rel: 'The PoC answers a technical or feasibility question (can this be built, can this work) using the minimum apparatus necessary to test that specific question. The pilot answers an operational and market question (can this be delivered at scale, with real economics, to real customers) using the full, real solution. PoC comes first, in development. Pilot comes last, before scale. They sit at opposite ends of the validation chain.',
  },
  {
    slug: null,
    name: 'Post-Launch Feedback Loops',
    rel: 'The pilot is a bounded, instrumented launch; post-launch feedback loops are the ongoing instrumentation of the full-scale launch that follows. The pilot generates the go/no-go data; the feedback loops generate the continuous improvement data after scale. The pilot ends on a date. The feedback loops begin when scale starts and run indefinitely.',
  },
  {
    slug: null,
    name: 'Delivery Roadmap',
    rel: 'The delivery roadmap sets the sequencing plan for bringing a solution to scale: what ships when, in what order, to whom. The pilot is a specific event on that roadmap: the bounded, real-conditions test before the full rollout begins. The roadmap frames where the pilot sits in the broader delivery sequence, and the pilot gate verdict feeds back into roadmap decisions about timing and staged expansion.',
  },
  {
    slug: null,
    name: 'Capability Building',
    rel: 'Pilots often reveal operational capability gaps that must be closed before scale: packing efficiency, support capacity, supplier reliability. Capability building is the systematic work of closing those gaps. The pilot diagnosis tells you what to build; the capability building work does the building before the second pilot or the full launch.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PilotLaunchesPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          S1 - Header / Identity   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize:   'var(--text-2xs)',
                color:       BRICK,
                background: 'rgba(138,75,60,0.10)',
                border:     '1px solid rgba(138,75,60,0.22)',
              }}
            >
              Delivery &amp; Validation
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Pilot Launches
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Running your full, real solution with a bounded exposure: a defined segment, a defined geography, a fixed time window, to learn from real operational conditions before committing to scale.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The solution is not minimal. The exposure is.
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S2 - Establishing visual   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="pb-20">
            <PLEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>What it is</SectionLabel>
            <SectionHeadingLight>A bounded, real-conditions test of the full delivery model, before the scale decision is made.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                A pilot launch runs the complete, real solution (all features, real operations, real customers,
                real money) but contains the exposure to a defined slice of the market: a specific segment,
                a specific geography, a fixed time window with a hard end date. It is not a beta, a soft launch,
                or a friends-and-family test. It is the full product operating under real commercial conditions,
                deliberately bounded so that the risk stays manageable while the learning is real.
              </Body>
              <Body>
                The key distinction from MVP and MLP is the unit of uncertainty being tested. An MVP tests
                whether the product concept works: does anyone want this, does the core value proposition land?
                A pilot tests whether the delivery model works: can this actually be fulfilled at scale, at
                what unit economics, with what operational load, to what service standard? When you run a
                pilot, the product question is settled. The operational question is what remains, and it is
                a different question entirely, one that only real conditions can answer.
              </Body>
              <Body>
                What a pilot finds is almost always operationally specific: a supplier who cannot meet the
                delivery SLA at real volume, a support load that exceeds the model, a packing process that
                takes twice as long when real people run it for the first time, a unit economics profile that
                only becomes visible when real orders move through real systems. None of this is predictable
                from pre-launch analysis. It only appears when the thing actually runs. The pilot creates the
                conditions for it to run: controlled, instrumented, reversible.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Interactive signature visual   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>The contained pilot zone</SectionLabel>
            <SectionHeadingDark>A full, real solution. A bounded, defined exposure.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click any element to explore it. The three boundary dimensions define who sees the pilot,
              where, and for how long. The solution inside is complete. The metrics read out to a
              pre-committed gate. The rest of the world, the un-launched markets, waits.
            </p>
            <PLInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>When to deploy it</SectionLabel>
            <SectionHeadingLight>When the product is ready but the delivery model is unproven at scale.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                  Use Pilot Launches when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The product concept is validated (MVP or MLP learning is in hand) and the next question is operational: can this be delivered?',
                    'The operational complexity of a full launch is high enough that failure at scale would be costly to recover from.',
                    'Unit economics, support load, or fulfilment performance are genuinely uncertain until you run the thing at real volume.',
                    'A specific geography, segment, or channel can be isolated cleanly enough to generate valid, representative learning.',
                    'The organisation needs concrete operational data, not a model, not a projection, before committing the full delivery investment.',
                    'A regulatory, partnership, or capacity constraint requires staged rollout before full availability.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 rounded-full w-1.5 h-1.5"
                        style={{ background: BRICK }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Do NOT use Pilot Launches when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The product concept itself is still uncertain; this is MVP territory, not pilot territory. Settle the product question first.',
                    'The operational model is standard and well-understood; a pilot adds delay without adding learning.',
                    'The market moves fast enough that a 6–12 week pilot window gives a competitor time to establish.',
                    'No real boundary can be drawn: if the pilot segment cannot be isolated from the rest of the business, the learning will be muddied.',
                    'The team lacks the operational capacity to run the full solution within the pilot boundary; a scaled-down operation is not a pilot.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 rounded-full w-1.5 h-1.5"
                        style={{ background: 'var(--color-neutral-300)' }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S6 - How it works   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>How it works</SectionLabel>
            <SectionHeadingLight>Four stages, in sequence. The discipline is in the order.</SectionHeadingLight>

            <div className="flex flex-col gap-6 mt-2">
              {[
                {
                  n: '01',
                  title: 'Define the three boundaries',
                  body: 'Before anything launches, set the three boundary dimensions explicitly: SEGMENT (who is in the pilot: what type of customer, what cohort, what use case), GEOGRAPHY (where the pilot runs: which locations, which channels, which organisational units), and TIMEFRAME (how long it runs, with a hard, pre-committed end date that is not negotiable). The boundaries must be tight enough to be manageable but representative enough to generate valid learning. A segment of one is not a pilot. A segment of everyone is not a pilot either.',
                },
                {
                  n: '02',
                  title: 'Pre-commit to metrics and success criteria',
                  body: 'Before the pilot launches, agree on what success looks like: specific metrics with specific thresholds. Both categories matter. Customer metrics: acquisition cost, retention at 30/60/90 days, NPS, engagement. Operational metrics: fulfilment performance, support load per customer, unit economics at pilot scale, process throughput. Write the criteria down. Get sign-off. Seal them. The discipline of pre-commitment is that the criteria cannot be changed after the results come in, which is exactly when the temptation to change them is highest.',
                },
                {
                  n: '03',
                  title: 'Run the pilot with the full operational stack',
                  body: 'Launch to the defined segment and geography with the complete, real solution: all product features, the full operational apparatus, real customer onboarding, real support, real money. Do not cut corners on the operational model: a stripped-down operation does not test the delivery model; it tests a different, easier version of it. Instrument everything from day one. Capture operational and customer data continuously, not just at the gate. Treat anomalies as findings: the courier that misses its SLA in week two is a finding, not a nuisance.',
                },
                {
                  n: '04',
                  title: 'Call the gate on the committed date',
                  body: 'On the pre-committed end date, assemble the results against the pre-committed criteria. Measure each metric against its threshold. Count how many were met. Apply the criteria honestly. The gate has two outputs: GO (proceed to scale or to the next staged expansion) or NO-GO (stop, redesign the delivery model, address the specific operational failures the pilot identified, and re-pilot if warranted). A NO-GO is not a failure; it is the pilot doing its job. A NO-GO with specific, actionable findings is more valuable than a GO with murky data.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <div className="shrink-0 font-mono font-semibold pt-0.5"
                    style={{ fontSize: 'var(--text-sm)', color: BRICK, width: '2rem' }}>
                    {n}
                  </div>
                  <div>
                    <p className="font-semibold mb-2"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {title}
                    </p>
                    <Body>{body}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S7 - From pilot to full launch [ADDED]   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>From pilot to full launch</SectionLabel>
            <SectionHeadingLight>Staged rollout or go wide? The gate verdict should drive the answer.</SectionHeadingLight>

            <div className="flex flex-col gap-5 mb-10">
              <Body>
                A GO verdict at the gate opens a choice: move to full launch immediately, or expand in
                stages: a second pilot with a broader boundary, then a regional rollout, then national,
                then international. Neither path is automatically right. The choice depends on how much
                operational confidence the pilot actually generated, how much the learning generalises beyond
                the pilot boundary, and how much risk the organisation can absorb if the next stage surfaces
                new operational failures.
              </Body>
              <Body>
                Staged rollout is the right path when: the pilot segment was tight enough that representativeness
                is uncertain, operational capacity needs to be built incrementally before the full load arrives,
                regional or channel-level variation is large enough that one pilot cannot generalise safely,
                or the unit economics depend on scale effects that the pilot could not yet reach. In these cases,
                each stage is its own mini-pilot: bounded, instrumented, gate-d.
              </Body>
              <Body>
                Going wide immediately is the right path when: the pilot segment was representative, the
                operational model is proven and the capacity exists to scale it quickly, the market window
                is closing, or the competitive risk of staged expansion outweighs the operational risk of
                going broad. Going wide is a legitimate choice, but it should be made deliberately rather than
                by default.
              </Body>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-lg p-5"
                style={{ border: `1px solid ${BRICK}22`, background: `${BRICK}08` }}
              >
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                  Staged rollout
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Pilot segment was not fully representative',
                    'Operational capacity must be built incrementally',
                    'Regional or channel variation is high',
                    'Economics depend on scale effects not yet reached',
                    'Each stage has its own boundary, metrics, and gate',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 shrink-0 rounded-full w-1.5 h-1.5"
                        style={{ background: BRICK }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg p-5"
                style={{ border: '1px solid var(--color-neutral-200)' }}>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Go wide immediately
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'Pilot segment was clearly representative',
                    'Operational model proven, capacity ready',
                    'Market window is closing or competitive pressure is high',
                    'Operational risk of going broad is lower than competitive risk of delay',
                    'Unit economics are confirmed at pilot scale',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 shrink-0 rounded-full w-1.5 h-1.5"
                        style={{ background: 'var(--color-neutral-300)' }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-lg px-5 py-4"
              style={{ background: 'var(--color-neutral-100)', borderLeft: `3px solid ${BRICK}` }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                <span className="font-semibold" style={{ color: BRICK }}>On NO-GO verdicts:</span>{' '}
                A NO-GO verdict does not end the pilot sequence. It starts it. The gate should produce specific,
                actionable findings about which operational criteria were missed and why. The team closes those
                gaps (supplier, process, support capacity, unit economics) and runs a second pilot with
                the same boundaries and the same criteria. The second pilot tests whether the fixes worked.
                The gate closes again. This iteration continues until the gate clears.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S8 - Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Best practices</SectionLabel>
            <SectionHeadingLight>What separates a pilot that teaches from one that drifts.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              {[
                {
                  title: 'Seal the success criteria before launch',
                  body: 'Pre-committed criteria are only pre-committed if they cannot be changed after the results come in. Write them down, get stakeholder sign-off, and treat them as a contract. The temptation to adjust a threshold after seeing results that almost pass is exactly the failure mode the pre-commitment is designed to prevent.',
                },
                {
                  title: 'The end date is not a target; it is a constraint',
                  body: 'A pilot without a hard end date is not a pilot. It is a permanent soft launch waiting for someone to feel confident enough to call it. Set the end date before the pilot launches and treat it as immovable. The gate review happens on that date. The decision comes out of that review.',
                },
                {
                  title: 'Run the full operational stack, not a simplified version',
                  body: 'The operational model being tested must be the same model that would run at scale, not a temporary workaround that will be replaced before full launch. Piloting a simplified version does not test the delivery model; it tests something easier. The point is to surface what breaks under real conditions. A simplified operation has different failure modes than the real one.',
                },
                {
                  title: 'Treat the pilot segment as a real customer cohort, not a test group',
                  body: 'Pilot customers are real customers. They get the same product, the same support, the same experience as any future customer would. A pilot that treats participants as a test group (with different SLAs, reduced expectations, or explicit acknowledgment that they are in a test) does not generate valid operational data. It generates data about a different, easier situation.',
                },
                {
                  title: 'Monitor operational metrics from day one',
                  body: 'Do not wait until the gate review to look at the data. Operational failures surface early and tend to compound if left unaddressed. Support load spikes in week two are a signal. Delivery failures in the first month are a finding. The continuous view is what allows the team to investigate causes during the pilot, not just count failures at the end.',
                },
                {
                  title: 'A NO-GO verdict should be specific, not general',
                  body: 'A gate verdict of "we did not meet criteria" is the beginning of the analysis, not the end of it. Which criteria were missed? By how much? What were the operational causes? A specific NO-GO verdict points directly at what to fix before the next pilot. A vague NO-GO verdict leads to vague remediation that may not address the actual failure.',
                },
              ].map(({ title, body }, i) => (
                <div key={i} className="rounded-lg p-5"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <p className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                    {title}
                  </p>
                  <Body>{body}</Body>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S9 - Logistics   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Logistics</SectionLabel>
            <SectionHeadingLight>What running a pilot actually requires.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  label: 'Time required',
                  items: [
                    'Pilot design and boundary-setting: 1–2 weeks',
                    'Pilot window: 4–12 weeks (category-dependent)',
                    'Gate analysis and decision: 1–2 weeks',
                    'Total elapsed time: 6–16 weeks before the scale decision',
                  ],
                },
                {
                  label: 'Team',
                  items: [
                    'Core team: 4–8 people spanning product, operations, and commercial',
                    'Operational capacity to run the full solution in the pilot boundary',
                    'Data or analytics lead to instrument and monitor metrics',
                    'Stakeholder sponsor who can call the gate and act on the verdict',
                  ],
                },
                {
                  label: 'What you need',
                  items: [
                    'A real customer segment: actual buyers, not advocates',
                    'A bounded geography or channel with operational reach',
                    'The complete product and operational stack, no shortcuts',
                    'Instrumentation to capture metrics from launch day',
                  ],
                },
                {
                  label: 'Common failure modes',
                  items: [
                    'Piloting a simplified operation instead of the real one',
                    'Selecting an unrepresentative segment for convenience',
                    'Moving the success criteria after seeing the results',
                    'Extending the timeline instead of calling the gate',
                    'Treating early positive customer signals as permission to ignore operational failures',
                  ],
                },
              ].map(({ label, items }) => (
                <div key={label}>
                  <p className="font-mono uppercase tracking-widest mb-3"
                    style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                    {label}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 shrink-0 rounded-full w-1.5 h-1.5"
                          style={{ background: BRICK }} />
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - AI evolving   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>AI &amp; this method</SectionLabel>
            <SectionHeadingDark>AI changes the design and analysis work around pilots. It does not change what a pilot is.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI genuinely helps and where the human judgments remain.
            </p>
            <PLAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>In-depth example</SectionLabel>
            <SectionHeadingLight>A D2C subscription company with a validated product and an unproven delivery model.</SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              Two versions of the same pilot. In the traditional approach, the team runs the pilot directly.
              In the hypothetical AI version, they use AI assistance throughout. The pilot is the same.
              What changes is the supporting work.
            </p>
            <PLExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Frameworks that use this method</SectionLabel>
            <SectionHeadingLight>Where Pilot Launches sits in the broader innovation frameworks.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-2">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <div key={slug} className="rounded-lg p-5"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <Link href={`/framework/${slug}`}
                      className="font-semibold hover:opacity-70 transition-opacity"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {name}
                    </Link>
                    <span className="font-mono rounded-full px-2.5 py-0.5 shrink-0"
                      style={{
                        fontSize: 'var(--text-2xs)',
                        color: BRICK,
                        background: 'rgba(138,75,60,0.08)',
                        border: '1px solid rgba(138,75,60,0.20)',
                      }}>
                      {phase}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S13 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Related methods</SectionLabel>
            <SectionHeadingLight>The methods that sit before, alongside, and after a pilot launch.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-2">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <div key={name} className="rounded-lg p-5"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="mb-2">
                    {slug ? (
                      <Link href={`/methods/${slug}`}
                        className="font-semibold hover:opacity-70 transition-opacity"
                        style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                        {name}
                      </Link>
                    ) : (
                      <span className="font-semibold"
                        style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-500)' }}>
                        {name}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S14 - Sources   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>Where the thinking behind this method comes from.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {[
                'Ries, E. (2011). The Lean Startup. Crown Business. The foundational text on the Build-Measure-Learn loop; the pilot as a Measure vehicle for the full product is a natural extension of the lean methodology.',
                'Cooper, R. G. (2019). The Lean and Agile Stage-Gate Process. Industrial Marketing Management. The gate mechanism and pre-committed success criteria at each stage gate; pilots are a specific implementation of a stage-gate Measure event.',
                'Blank, S. & Dorf, B. (2012). The Startup Owner\'s Manual. K&S Ranch. Customer validation and the progression from problem to solution to operational readiness; pilots as the operational validation stage.',
                'Maurya, A. (2012). Running Lean. O\'Reilly. Lean Canvas and the transition from validated learning to scalable model; the pilot is the transition point between validated learning and operational commitment.',
                'Kelley, T. & Kelley, D. (2013). Creative Confidence. Crown Business. On the mindset of learning from real conditions rather than projections; the pilot as a confidence-building instrument before scale.',
              ].map((src, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono font-semibold shrink-0 mt-0.5"
                    style={{ fontSize: 'var(--text-xs)', color: BRICK }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {src}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>
    </>
  )
}

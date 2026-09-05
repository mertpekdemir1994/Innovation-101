import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import DRExampleToggle from './DRExampleToggle'
import { SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Delivery Roadmap · Methods',
}

const DREstablishing   = dynamic(() => import('./DREstablishing'),   { ssr: false })
const DRInteractive    = dynamic(() => import('./DRInteractive'),    { ssr: false })
const DRAIReactivated  = dynamic(() => import('./DRAIReactivated'),  { ssr: false })

const BRICK = '#8A4B3C'

// ─── Layout primitives ───────────────────────────────────────────────────────

function DarkSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`w-full bg-neutral-950 ${className}`} style={{ '--color-focus-ring': 'var(--color-dark-text)' } as React.CSSProperties}>
      {children}
    </section>
  )
}
function LightSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`w-full bg-white ${className}`}>
      {children}
    </section>
  )
}
function Container({ children, className = '' }: { children: React.ReactNode; prose?: boolean; className?: string }) {
  // No outer band-providing wrapper on this page's DarkSection/LightSection
  // (unlike the other exception pages), so Container itself must always
  // supply the margin.
  return (
    <div className={`mx-auto px-6 md:px-8 py-16 max-w-content${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}
// ─── Data ────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Backlog / Planning',
    note: 'Agile explicitly argues against long fixed roadmaps. The delivery roadmap gives Agile teams a risk-ordered bet sequence to work from rather than a feature backlog that implies equal priority.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Deliver',
    note: 'The second diamond is where the delivery sequence lives. The roadmap structures the Deliver phase into ordered bets rather than a single build-and-launch effort.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'Lean Startup&rsquo;s core logic (riskiest assumptions first, cheapest test possible) is the sequencing principle for the delivery roadmap. The roadmap operationalises Build-Measure-Learn across multiple bets.',
  },
  {
    slug: 'fde',
    name: 'Front-End of Innovation',
    phase: 'Development Planning',
    note: 'Pointed tension: FDE requires that central roadmaps subordinate themselves to discoveries from field work and experiments. The delivery roadmap must be structured so that field findings can reshape near-term bets, not just annotate a fixed plan.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'assumption-mapping',
    name: 'Assumption Mapping',
    rel: 'The leap-of-faith assumption that surfaces from mapping goes to the front of the roadmap. Do not sequence until you know which assumption is existential.',
  },
  {
    slug: 'proof-of-concept',
    name: 'Proof of Concept',
    rel: 'When technical or feasibility risk is the existential question, the PoC is the roadmap&rsquo;s first rung. This method specifies what that first bet looks like.',
  },
  {
    slug: 'pilot-launches',
    name: 'Pilot Launches',
    rel: 'The roadmap carries the staged rollout: the pilot is the third bet, and the gate criteria for moving from pilot to wave-based rollout live here.',
  },
  {
    slug: 'post-launch-feedback-loops',
    name: 'Post-Launch Feedback Loops',
    rel: 'The DECIDE-to-SHIP junction in the feedback loop lives in the roadmap. What the loop produces at DECIDE becomes a roadmap change: a new bet, a reshaped bet, a gate that fires.',
  },
  {
    slug: null,
    name: 'Capability Building',
    rel: 'If the delivery sequence requires capability that does not yet exist, building it is itself a roadmap bet, not a prerequisite that lives outside the plan.',
  },
  {
    slug: 'mvp-mlp',
    name: 'MVP & MLP',
    rel: 'The smallest real release is the second rung: the bet that tests whether the product concept works for people, after the PoC has answered whether the hard thing is buildable.',
  },
  {
    slug: null,
    name: 'Ambition Matrix',
    rel: 'Companion for the ambition axis. The matrix places bets by ambition across a portfolio; the delivery roadmap sequences ambition over time within one delivery effort. The two tools work at different scopes but share the same underlying logic.',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function DeliveryRoadmapPage() {
  return (
    <>
      {/* S1 - Header */}
      <DarkSection>
        <Container prose>
          <SectionLabel accent="rgba(138,75,60,0.55)">Method · Delivery &amp; Validation</SectionLabel>
          <h1 className="font-display font-semibold text-balance mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}>
            Delivery Roadmap
          </h1>
          <p className="font-semibold mb-8"
            style={{ fontSize: 'var(--text-xl)', color: `rgba(138,75,60,0.85)`, lineHeight: 'var(--leading-tight)' }}>
            A sequence of bets ordered by uncertainty and dependency, firm in the near term and
            deliberately loose further out, that shapes what you build and learn in what order.
          </p>
          <Body dark className="">
            A roadmap full of features promised on dates is not a plan. It is a commitment device
            wearing a plan&rsquo;s clothes, and it cannot absorb a single thing you learn.
          </Body>
        </Container>
      </DarkSection>

      {/* S2 - Establishing visual */}
      <DarkSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.55)">The signature visual</SectionLabel>
          <SectionHeadingDark>The confidence-gradient bet sequence</SectionHeadingDark>
          <Body dark className="">
            Near bets are firm: solid borders, precise scope, pre-committed gate criteria.
            Far bets are deliberately loose: dashed borders, intent rather than features, provisionally
            shaped. The learning arrows that curve backwards from later bets to earlier ones are not
            decoration. They are the mechanism by which the roadmap stays honest as evidence arrives.
          </Body>
          <div className="mt-10">
            <DREstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* S3 - What it is */}
      <LightSection>
        <Container prose>
          <SectionLabel accent="rgba(138,75,60,0.65)">What it is</SectionLabel>
          <SectionHeadingLight>A sequence of bets, not a list of commitments</SectionHeadingLight>
          <div className="space-y-4">
            <Body className="">
              A delivery roadmap is a time-ordered sequence of bets (decisions to invest in
              a specific thing with a specific expectation of what it will prove or produce) where
              each bet&rsquo;s scope and specification is calibrated to how much you currently know.
              Near bets are fully specified. Far bets are deliberately loose. The gradient is the
              honest acknowledgment that you cannot fully specify what you have not yet started learning.
            </Body>
            <Body className="">
              The sequence is ordered first by uncertainty and dependency, not by commercial visibility
              or convenience. The riskiest assumption (the one that, if wrong, invalidates everything
              that follows) goes first, specified cheaply. Only after that question is answered do
              you commit resources to the next rung.
            </Body>
            <Body className="">
              Gates separate bets. Each gate carries pre-committed criteria (set before the bet starts,
              not after the evidence arrives) that determine whether to proceed, adjust, or stop.
              A gate you would never actually stop at is not a gate; it is a ceremony. A real gate
              shapes what you build next.
            </Body>
            <Body className="">
              The learning arrows are the structural difference between a delivery roadmap and a
              Gantt chart. They run backwards: from later bets to earlier ones, reshaping the near
              term as evidence accumulates. When those arrows fire, the roadmap changes. That
              changeability is not a sign of poor planning. It is the point.
            </Body>
          </div>
        </Container>
      </LightSection>

      {/* S4 - Interactive */}
      <DarkSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.55)">Explore the interactions</SectionLabel>
          <SectionHeadingDark>Click in. Resequence. Sever.</SectionHeadingDark>
          <Body dark className="">
            Click any bet to see what it tests and what depends on it. Toggle sequence order to
            see what happens when risk is reordered for convenience. Sever the learning arrows and
            watch the roadmap degrade into a rigid schedule: the gradient disappears, every bet
            looks equally confident, and the honesty is gone.
          </Body>
          <div className="mt-10">
            <DRInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* S5 - When to deploy */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">When to deploy</SectionLabel>
          <SectionHeadingLight>When you have multiple bets that need ordering</SectionHeadingLight>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                head: 'The right moment',
                items: [
                  'After assumption mapping has identified the riskiest question',
                  'When you have more than one candidate next step and need to choose an order',
                  'When stakeholders are asking for a plan and you need a disciplined structure to offer',
                  'When an existing roadmap is being used as a commitment device rather than a learning sequence',
                ],
              },
              {
                head: 'Not yet ready when',
                items: [
                  'The riskiest assumption has not yet been named, sequence before mapping is premature',
                  'There is only one viable next step with no sequencing decision to make',
                  'The organisation will not accept gates that can actually stop work, a roadmap without real gates is a schedule',
                  'You are planning across portfolios rather than sequencing within one delivery effort (use the Ambition Matrix instead)',
                ],
              },
            ].map(col => (
              <div key={col.head} className="rounded-lg p-6"
                style={{ border: `1px solid rgba(138,75,60,0.16)` }}>
                <p className="font-semibold mb-4"
                  style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                  {col.head}
                </p>
                <ul className="space-y-3">
                  {col.items.map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
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
        </Container>
      </LightSection>

      {/* S6 - How it works */}
      <LightSection>
        <Container prose>
          <SectionLabel accent="rgba(138,75,60,0.65)">How it works</SectionLabel>
          <SectionHeadingLight>Six disciplines</SectionHeadingLight>
          <div className="space-y-8">
            {[
              {
                n: '01',
                head: 'Map assumptions before you sequence',
                body: 'Run Assumption Mapping first. The leap-of-faith assumption (the riskiest one, the one whose failure invalidates everything) goes to the front of the roadmap regardless of its commercial visibility. You cannot sequence responsibly without knowing which assumption is existential.',
              },
              {
                n: '02',
                head: 'Order by uncertainty and dependency, not convenience',
                body: 'The riskiest bet goes first because it is cheapest to fail at the beginning. Ordering by convenience (building what is familiar and demo-able, deferring the existential question) is the most common sequencing error. When you catch yourself doing it, stop and ask: what happens if the hard thing turns out not to work?',
              },
              {
                n: '03',
                head: 'Specify near bets precisely; keep far bets deliberately loose',
                body: 'Near bets should have precise scope, clear deliverables, and pre-committed gate criteria. Far bets should describe intent, not features. They are provisionally shaped because they depend on what the near bets will teach you. The gradient is honesty. Collapsing it to uniform specification is the lie that turns a roadmap into a Gantt chart.',
              },
              {
                n: '04',
                head: 'Design gate criteria before the bet starts',
                body: 'Pre-commit the criteria for each gate before the bet begins, not after the data arrives. The threshold (what &ldquo;go&rdquo; means, what &ldquo;no-go&rdquo; means, and critically, what a &ldquo;no-go&rdquo; would change) must be agreed when the organisation is not yet invested in a particular outcome. A gate that nobody would actually stop at is a ceremony, not a decision point.',
              },
              {
                n: '05',
                head: 'Let the learning arrows fire',
                body: 'When a bet produces a finding, let that finding reshape earlier bets before the resources for the next phase are committed. This is the learning arrow firing. A roadmap that cannot be reshaped by its own evidence is not a roadmap; it is a project plan that has been scheduled rather than sequenced.',
              },
              {
                n: '06',
                head: 'Revisit on a cadence, not just at gates',
                body: 'Gates are decision points, but the roadmap should be reviewed on a regular cadence between them. New market signals, changed dependencies, or updated team capacity may warrant reshaping a bet before its gate arrives. The cadence review is what keeps the far end from calcifying into false precision over time.',
              },
            ].map(d => (
              <div key={d.n} className="flex gap-6">
                <span className="font-mono shrink-0 mt-0.5"
                  style={{ fontSize: 'var(--text-sm)', color: `rgba(138,75,60,0.45)` }}>
                  {d.n}
                </span>
                <div>
                  <p className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                    {d.head}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}
                    dangerouslySetInnerHTML={{ __html: d.body }} />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S7 - Crawl / walk / run (ADDED SECTION) */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Sequencing ambition</SectionLabel>
          <SectionHeadingLight>The family of crawl-walk-run progressions</SectionHeadingLight>
          <div className="mb-8">
            <Body className="">
              The confidence-gradient sequence structures HOW you deliver. But the roadmap also
              carries a second dimension: HOW MUCH you attempt at each rung. Ambition must be earned
              through gate performance. The most common sequencing failure is not wrong risk ordering
              but starting at full ambition before the foundation has been proven.
            </Body>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {[
              {
                name: 'Crawl → walk → run',
                desc: 'The most explicit form. Start with constrained scope, expand ambition as each stage proves the model. The delivery staircase in this method is a crawl-walk-run: PoC (crawl) → smallest release (walk) → pilot → rollout (run).',
              },
              {
                name: 'Step then leap',
                desc: 'A controlled beachhead followed by a larger expansion once the model is proven. Common in market-entry contexts where the initial step is deliberately sub-scale to test the model cheaply.',
              },
              {
                name: 'Beachhead then expansion',
                desc: 'Concentrate fully on one segment, geography, or channel until it is deeply won, then expand. The beachhead proves the value model and delivery model before resources are committed to adjacent territory.',
              },
              {
                name: 'Thin slice then thicken',
                desc: 'Deliver an end-to-end thin slice (every capability, but in minimal form) then deepen each dimension as evidence warrants. Useful when proving integration is the main risk.',
              },
              {
                name: 'Horizon 1 / 2 / 3',
                desc: 'Core, extend, and explore bets run in parallel with different gate structures and investment levels. The roadmap manages transitions between horizons as one horizon matures and another requires more resource.',
              },
            ].map(p => (
              <div key={p.name} className="rounded-lg p-5"
                style={{ border: `1px solid rgba(138,75,60,0.14)`, background: `rgba(138,75,60,0.03)` }}>
                <p className="font-semibold mb-2"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                  {p.name}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="rounded-lg p-5"
            style={{ background: `rgba(138,75,60,0.06)`, border: `1.5px solid rgba(138,75,60,0.22)` }}>
            <p className="font-semibold mb-1"
              style={{ fontSize: 'var(--text-sm)', color: BRICK }}>
              Core rule: ambition must be earned.
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              The anti-pattern, running first, appears as organisational confidence, not recklessness.
              The team knows the problem well. The leadership wants to show speed. The stakeholders
              want full-scope delivery. The result is a commitment to full ambition before the
              foundation has been proven. When the foundation fails, the scale of the failure is
              proportional to the ambition that was front-loaded into it.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* S8 - Best practices */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Best practices</SectionLabel>
          <SectionHeadingLight>What good looks like, and the mistakes</SectionHeadingLight>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <p className="font-semibold mb-4"
                style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                What a healthy roadmap looks like
              </p>
              <ul className="space-y-3">
                {[
                  'Gate criteria are pre-committed before the bet begins, not after the evidence arrives',
                  'Far-end items describe intent and outcome, not features and dates',
                  'Learning arrows actively reshape near-term bets when evidence warrants',
                  'Stakeholders understand and accept that the far end is loose by design',
                  'The roadmap is reviewed on a cadence, not only at gates',
                  'Riskiest assumption is positioned first regardless of commercial visibility',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full"
                      style={{ background: BRICK }} />
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-4"
                style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                Mistakes and pathologies
              </p>
              <ul className="space-y-3">
                {[
                  'Convenience ordering: familiar and demo-able work first, existential question scheduled last',
                  'Uniform specification: far-end bets are as precisely defined as near-end ones, hidden uncertainty',
                  'Sham gates: criteria that no reasonable outcome would fail, ceremonies, not decisions',
                  'Sham looseness: the roadmap is described as Agile, but commitments and dates are fixed',
                  'Severed learning: findings from bets are noted but do not actually reshape subsequent bets',
                  'Feature accumulation: new ideas are added to the far end without displacing anything',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 shrink-0 font-mono" style={{ fontSize: 'var(--text-xs)', color: 'rgba(245,158,11,0.70)' }}>
                      ⚠
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S9 - Logistics */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Logistics</SectionLabel>
          <SectionHeadingLight>What running this requires</SectionHeadingLight>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Time required', value: 'Ongoing: initial sequence in 1–2 weeks; revisited on a cadence as evidence arrives' },
              { label: 'Group size', value: 'Team lead(s) plus stakeholders for gate decisions; one or two people maintain the living document' },
              { label: 'Format', value: 'Works remotely and in person; the bet sequence should be a shared, visible artefact, not a slide deck filed away' },
              { label: 'Prerequisites', value: 'Assumption mapping completed; riskiest assumption named; team has authority to actually stop at a gate' },
              { label: 'Outputs', value: 'Sequenced bet list with horizon labels; gate criteria for each transition; learning arrow definitions' },
              { label: 'Revisit cadence', value: 'Weekly or fortnightly between gates; mandatory review at each gate; triggered review when a major finding fires a learning arrow' },
            ].map(item => (
              <div key={item.label} className="rounded-lg p-5"
                style={{ border: `1px solid rgba(138,75,60,0.14)` }}>
                <p className="font-mono uppercase tracking-widest mb-2"
                  style={{ fontSize: 'var(--text-2xs)', color: 'rgba(138,75,60,0.58)' }}>
                  {item.label}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S10 - AI Reactivated */}
      <DarkSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.55)">AI-reactivated</SectionLabel>
          <SectionHeadingDark>AI and the delivery roadmap</SectionHeadingDark>
          <Body dark className="">
            AI is genuinely excellent at roadmap mechanics: dependency detection, capacity modelling,
            sequencing option generation, and maintenance. The danger is that it also produces uniformly
            confident plans, losing the gradient that is the roadmap&rsquo;s honesty. The toggle below
            shows what is gained and what is lost.
          </Body>
          <div className="mt-10">
            <DRAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* S11 - Example toggle */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Worked example</SectionLabel>
          <SectionHeadingLight>A logistics platform sequences its bets</SectionHeadingLight>
          <Body className="">
            A team building a real-time driver-matching platform faces two genuine risks: whether the
            routing algorithm holds at scale (technical and existential) and whether operations teams
            will adopt a new workflow (commercial and manageable). The sequencing decision, and what
            happens when AI builds the roadmap instead, illustrates the method&rsquo;s core logic.
          </Body>
          <div className="mt-10">
            <DRExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* S12 - Framework connections */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Framework connections</SectionLabel>
          <SectionHeadingLight>Where this sits in the larger frameworks</SectionHeadingLight>
          <div className="space-y-4">
            {FRAMEWORK_LINKS.map(f => (
              <a key={f.slug}
                href={`/framework/${f.slug}`}
                className="block rounded-lg p-5 transition-all group"
                style={{ border: `1px solid rgba(138,75,60,0.14)`, textDecoration: 'none' }}>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 rounded px-2 py-1"
                    style={{ background: `rgba(138,75,60,0.08)`, border: `1px solid rgba(138,75,60,0.18)` }}>
                    <span className="font-mono uppercase tracking-widest"
                      style={{ fontSize: 'var(--text-2xs)', color: `rgba(138,75,60,0.72)` }}>
                      {f.phase}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 group-hover:underline"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {f.name}
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                      dangerouslySetInnerHTML={{ __html: f.note }} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S13 - Related methods */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Related methods</SectionLabel>
          <SectionHeadingLight>The methods that connect here</SectionHeadingLight>
          <p className="mb-6"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
            The delivery roadmap is connective tissue: it sequences and orders the other Delivery &amp;
            Validation methods, carries the gate criteria between them, and provides the structure into
            which their outputs feed. These connections are not incidental. The methods listed below
            each have a specific place in the bet sequence.
          </p>
          <div className="space-y-3">
            {RELATED_METHODS.map(m => (
              <div key={m.name}
                className={`rounded-lg p-4 flex gap-4 ${m.slug ? 'cursor-pointer' : ''}`}
                style={{ border: `1px solid rgba(138,75,60,0.12)` }}>
                {m.slug ? (
                  <a href={`/methods/${m.slug}`}
                    className="font-semibold shrink-0 hover:underline"
                    style={{ fontSize: 'var(--text-sm)', color: BRICK, minWidth: 160 }}>
                    {m.name}
                  </a>
                ) : (
                  <span className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'rgba(138,75,60,0.55)', minWidth: 160 }}>
                    {m.name}
                  </span>
                )}
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                  dangerouslySetInnerHTML={{ __html: m.rel }} />
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S14 - Sources */}
      <LightSection>
        <Container prose>
          <SectionLabel accent="rgba(138,75,60,0.65)">Sources and further reading</SectionLabel>
          <SectionHeadingLight>What this draws on</SectionHeadingLight>
          <div className="space-y-3">
            {[
              {
                author: 'Eric Ries',
                title: 'The Lean Startup',
                note: 'The foundational case for riskiest-assumption-first sequencing and Build-Measure-Learn as the structural logic of delivery planning.',
              },
              {
                author: 'Ryan Singer',
                title: 'Shape Up (Basecamp)',
                note: 'Betting as the unit of planning; appetite-based scoping rather than estimate-based commitment; shaping before sequencing.',
              },
              {
                author: 'Richard Rumelt',
                title: 'Good Strategy / Bad Strategy',
                note: 'The distinction between a real plan (a coherent sequence of choices) and a list of goals dressed as strategy: directly applicable to the roadmap-vs-commitment-device problem.',
              },
              {
                author: 'Clayton Christensen',
                title: 'The Innovator&rsquo;s Dilemma',
                note: 'The logic of starting small, in a contained space, and expanding only as the delivery model proves itself, the progression logic behind crawl-walk-run.',
              },
              {
                author: 'Roger Martin',
                title: 'Playing to Win',
                note: 'Strategy as a cascade of bets across time horizons; the idea that choices about where to play and how to win must be sequenced, not listed in parallel.',
              },
            ].map(s => (
              <div key={s.title} className="rounded p-4"
                style={{ border: `1px solid rgba(138,75,60,0.10)` }}>
                <p className="font-semibold"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                  <span dangerouslySetInnerHTML={{ __html: s.title }} />
                  <span className="font-normal ml-2"
                    style={{ color: 'var(--color-neutral-500)' }}>
                    - {s.author}
                  </span>
                </p>
                <p className="mt-1"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                  dangerouslySetInnerHTML={{ __html: s.note }} />
              </div>
            ))}
          </div>
        </Container>
      </LightSection>
    </>
  )
}

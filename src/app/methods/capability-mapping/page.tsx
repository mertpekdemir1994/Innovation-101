import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import CMExampleToggle from './CMExampleToggle'
import { SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Capability Mapping · Methods',
}

const CMEstablishing   = dynamic(() => import('./CMEstablishing'),   { ssr: false })
const CMInteractive    = dynamic(() => import('./CMInteractive'),    { ssr: false })
const CMAIReactivated  = dynamic(() => import('./CMAIReactivated'),  { ssr: false })

const BRICK = '#8A4B3C'

// ─── Layout primitives ───────────────────────────────────────────────────────

function DarkSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`w-full bg-neutral-950 ${className}`} style={{ '--color-focus-ring': 'var(--color-dark-text)' } as React.CSSProperties}>{children}</section>
}
function LightSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`w-full bg-white ${className}`}>{children}</section>
}
function Container({ children, prose = false, className = '' }: { children: React.ReactNode; prose?: boolean; className?: string }) {
  // No outer band-providing wrapper on this page's DarkSection/LightSection
  // (unlike the other exception pages), so Container itself must always
  // supply the margin — mx-auto stays unconditional for both branches.
  return (
    <div className={`mx-auto px-6 md:px-8 py-16 ${prose ? 'max-w-prose' : 'max-w-content'}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}
// ─── Data ────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Deliver',
    note: 'Checking, before committing to the Deliver phase, whether the organisation can actually build and run the solution it has designed. Capability mapping belongs here: before build, not during it.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Planning',
    note: 'Sequencing work against the capability that genuinely exists, not the capability the plan assumes. Agile planning without a capability map is velocity against an unknown floor.',
  },
  {
    slug: 'fde',
    name: 'Front-End of Innovation',
    phase: 'Feasibility / Development Planning',
    note: 'Organisational feasibility, distinct from technical feasibility: not just whether the technology can work, but whether this organisation can build, run, and sustain it. These are independent questions with independent answers.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'Whether this organisation can actually build and operate what it intends to test. The Build phase assumes a build capability that may not exist at the required layer or scale.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'delivery-roadmap',
    name: 'Delivery Roadmap',
    rel: 'The closest relationship. The roadmap sequences work on the assumption the work can be done; the capability map checks whether that is true. A capability gap is not a scheduling problem to absorb. It goes on the roadmap as an item in its own right (build, hire, partner, or buy) with an honest timeline.',
  },
  {
    slug: 'pilot-launches',
    name: 'Pilot Launches',
    rel: 'The pilot exposes capability gaps too, but late and expensively: a pilot routinely reveals that the operation cannot absorb real volume. Capability mapping surfaces the same constraint early, on purpose, before you have put it in front of customers.',
  },
  {
    slug: 'proof-of-concept',
    name: 'Proof of Concept',
    rel: 'A useful pairing: a PoC proves the THING can work; a capability map asks whether the ORGANISATION can build, run, and sustain it. Both can be true, and both can be false, independently.',
  },
  {
    slug: 'post-launch-feedback-loops',
    name: 'Post-Launch Feedback Loops',
    rel: 'A loop that dies at SHIP is often a capability problem, not a decision problem: the organisation decided, and simply could not execute. The map tells you which.',
  },
  {
    slug: 'flow-mapping',
    name: 'Flow Mapping',
    rel: 'A shared blind spot worth naming: like the real flow of a process, an organisation’s real capability is tacit and undocumented. Both methods find the truth by asking and watching the people who do the work, not by reading what is written down.',
  },
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function CapabilityMappingPage() {
  return (
    <>
      {/* S1 - Header */}
      <DarkSection>
        <Container prose>
          <SectionLabel accent="rgba(138,75,60,0.55)">Method · Delivery &amp; Validation</SectionLabel>
          <h1 className="font-display font-semibold text-balance mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}>
            Capability Mapping
          </h1>
          <p className="font-semibold mb-8"
            style={{ fontSize: 'var(--text-xl)', color: 'rgba(138,75,60,0.85)', lineHeight: 'var(--leading-tight)' }}>
            Laying the capabilities a delivery requires against the capabilities you actually have,
            layer by layer, so the gaps that will stop you shipping are visible before they stop you.
          </p>
          <Body dark className="">
            Every plan assumes the organisation can execute it. This is the method that checks.
            The gap is the finding, and a gap at the foundation is quietly holding up everything above it.
          </Body>
        </Container>
      </DarkSection>

      {/* S2 - Establishing visual */}
      <DarkSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.55)">The signature visual</SectionLabel>
          <SectionHeadingDark>The layered capability map</SectionHeadingDark>
          <Body dark className="">
            Capabilities arranged in layers (foundational at the base, EPIC-level at the top)
            with dependencies flowing upward: the top visibly rests on the bottom. Each capability
            scored in one of three states: HAVE IT, PARTIAL, or GAP. The glowing absence at
            PIPELINE RELIABILITY is carrying everything above it.
          </Body>
          <div className="mt-10">
            <CMEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* S3 - What it is */}
      <LightSection>
        <Container prose className="mx-auto">
          <SectionLabel accent="rgba(138,75,60,0.65)">What it is</SectionLabel>
          <SectionHeadingLight>A diagnostic, not a training programme</SectionHeadingLight>
          <div className="space-y-4">
            <Body className="">
              Capability mapping lays the capabilities a delivery REQUIRES against the capabilities the
              organisation ACTUALLY HAS, and makes the difference between them visible. Those differences
              are the delivery gaps: the specific missing skills, processes, assets, and ways of working
              that will stop you shipping the thing you have decided to do. The map is a diagnostic, and
              the gap is the finding.
            </Body>
            <Body className="">
              It matters because every other method in this group quietly assumes the organisation can
              execute. A roadmap sequences work on the assumption the work can be done. A pilot tests
              whether the solution holds up, taking for granted that there is an operation to hold it up.
              A feedback loop assumes that when a decision is made, someone can actually ship the change.
              Capability mapping is the method that asks whether any of that is true, and it is the only
              one that will tell you, early and in the open, that the plan you have written requires an
              organisation you do not have.
            </Body>
            <Body className="">
              The structure of the map is what makes it useful. Capabilities are emphatically not a
              flat list. They are LAYERED: foundational capabilities at the base (the underlying data,
              infrastructure, skills, processes, and habits everything else depends on) rising to
              EPIC-level capabilities at the top (the big, visible, ambitious things the strategy
              actually promises). Dependencies flow upward: the top rests on the bottom. They are also
              SEGMENTED, cut across those layers by whatever divisions are real in your organisation.
              And the map holds two states at once: what exists TODAY, and the GAPS to be addressed.
            </Body>
            <Body className="">
              From that structure comes the method&rsquo;s sharpest teaching: <strong>you cannot build an
              EPIC-level capability on a foundational gap.</strong> Organisations do this constantly.
              They staff the exciting top-layer capability, the one the strategy is named after, and
              cannot understand why it never quite lands, because the foundational capability it
              silently depends on was never there, and nobody mapped the dependency. A gap at the top
              is visible and embarrassing. A gap at the bottom is invisible and fatal, and it is holding
              up everything above it.
            </Body>
          </div>
        </Container>
      </LightSection>

      {/* S4 - Interactive */}
      <DarkSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.55)">Explore the map</SectionLabel>
          <SectionHeadingDark>Toggle today against target. Find the hole, and see what stands on it.</SectionHeadingDark>
          <Body dark className="">
            Toggle between TARGET (what delivery requires) and TODAY (what you actually have). The gaps
            are what appear in the difference. Click any capability to see its state and what depends on it.
            Click a foundational gap and watch the instability propagate upward through everything
            resting on it, including the EPIC-level capability the strategy is named after.
          </Body>
          <div className="mt-10">
            <CMInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* S5 - When to deploy */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">When to deploy</SectionLabel>
          <SectionHeadingLight>When you need to check whether the plan is deliverable</SectionHeadingLight>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                head: 'The right moment',
                items: [
                  'You have a plan or a roadmap and need an honest answer to whether this organisation can actually execute it',
                  'An ambitious EPIC-level initiative keeps failing to land, and nobody can say why',
                  'A pilot or rollout has exposed operational strain, and you need to know whether the constraint is local or structural',
                  'You are about to commit to a delivery whose requirements you have never checked against your actual capacity',
                ],
              },
              {
                head: 'Not yet ready when',
                items: [
                  'The strategy itself is not settled: mapping capabilities against a direction nobody has committed to produces a map of nothing in particular',
                  'The organisation is not willing to hear the answer: a map produced for an audience that has decided it is ready will be softened until it agrees',
                  'You would treat it as a scoring exercise: the point is finding the gaps that will stop delivery, especially the foundational ones',
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
                      <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: BRICK }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="max-w-prose mx-auto mt-6 rounded-lg p-5"
            style={{ background: 'rgba(138,75,60,0.04)', border: `1px solid rgba(138,75,60,0.16)` }}>
            <p className="font-semibold mb-2"
              style={{ fontSize: 'var(--text-sm)', color: BRICK }}>
              The honest limit
            </p>
            <Body className="">
              A capability map tells you where the gaps ARE; it does not close them. Closing a gap
              (building, hiring, partnering, or buying the capability) is a programme of work that plays
              out over months. The map&rsquo;s most sobering property is that it exposes just how slow
              capability is to change. You can rewrite a strategy in a meeting and a roadmap in an
              afternoon; you cannot change what your people can actually do in under a year.
            </Body>
          </div>
        </Container>
      </LightSection>

      {/* S6 - How it works */}
      <LightSection>
        <Container prose className="mx-auto">
          <SectionLabel accent="rgba(138,75,60,0.65)">How it works</SectionLabel>
          <SectionHeadingLight>Six disciplines</SectionHeadingLight>
          <div className="space-y-8">
            {[
              {
                n: '01',
                head: 'Derive the required capabilities from the actual delivery',
                body: 'Start from what you have committed to ship, and work backwards to what the organisation must genuinely be able to DO in order to ship it. Be concrete: a capability is a thing you can do repeatedly and reliably, not an aspiration. "Data-driven" is not a capability. "Serve a real-time personalised recommendation in under 200ms" is.',
              },
              {
                n: '02',
                head: 'Structure them in layers, foundational to EPIC',
                body: 'Sort the capabilities into a stack: foundational at the base (data, infrastructure, core skills, processes, ways of working), rising to the EPIC-level capabilities the strategy actually promises. Then make the DEPENDENCIES explicit: what does each upper capability rest on? This is the step that most flat capability lists skip, and it is where the method&rsquo;s value comes from.',
              },
              {
                n: '03',
                head: 'Segment across the layers',
                body: 'Cut the map by the divisions that are real in your organisation (front-end and back-end most commonly, but whatever cuts reflect actual operational reality). This reveals that gaps cluster: an organisation can be strong down one column and hollow down another, and a flat list would never show that.',
              },
              {
                n: '04',
                head: 'Assess today honestly: HAVE IT, PARTIAL, or GAP',
                body: 'Score each capability against reality, not intention. Be especially rigorous about PARTIAL: a capability that half-exists is routinely recorded as present, and it is more dangerous than an outright gap precisely because everyone assumes it is there. The check is not &ldquo;could we do this?&rdquo; but &ldquo;what actually happens when we try?&rdquo;',
              },
              {
                n: '05',
                head: 'Toggle to target, and let the gaps appear',
                body: 'Lay the required state against today&rsquo;s state. The difference IS the delivery gap, and seeing it whole (all at once, in a structure that shows what depends on what) is what the exercise is for. A flat list of gaps is still a list. A layered map of gaps is a diagnostic.',
              },
              {
                n: '06',
                head: 'Find the foundational gaps first, and sequence from the bottom',
                body: 'Look underneath. A gap at the base is carrying everything above it, and it must be closed before anything that depends on it can be built, however unglamorous that is. Closing gaps from the top down is how organisations spend a year staffing an EPIC-level capability that never had a floor. Hand each gap to the roadmap as work: BUILD (slowest, deepest), HIRE (faster, needs somewhere to land), PARTNER (fastest, does not accrue), or BUY (expensive, integration risk).',
              },
            ].map(d => (
              <div key={d.n} className="flex gap-6">
                <span className="font-mono shrink-0 mt-0.5"
                  style={{ fontSize: 'var(--text-sm)', color: 'rgba(138,75,60,0.45)' }}>
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

      {/* S7 - Best practices */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Best practices</SectionLabel>
          <SectionHeadingLight>What good looks like, and the mistakes</SectionHeadingLight>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <p className="font-semibold mb-4"
                style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                When it goes well
              </p>
              <ul className="space-y-3">
                {[
                  'Required capabilities are derived from the actual delivery, concretely, not listed as aspirations',
                  'The map is layered with explicit upward dependencies, so a foundational gap is visibly carrying what sits on it',
                  'Today\'s state is assessed honestly, PARTIAL especially, which is the state most often mis-recorded as present',
                  'Foundational gaps are found and sequenced first, however unglamorous the work to close them is',
                  'Gaps are handed to the roadmap as real work (build, hire, partner, buy) with honest timelines, not absorbed as scheduling optimism',
                  'The people doing the actual work assess the state, not the leadership deck',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: BRICK }} />
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
                The mistakes
              </p>
              <ul className="space-y-3">
                {[
                  'Mapping capabilities as a flat list: without layers and dependencies, every gap looks equally important, and the foundational one disappears into the middle of a spreadsheet',
                  'Building top-down: staffing the exciting EPIC-level capability while the foundation it depends on is missing. It will not land, and the organisation will conclude the people were wrong when the floor was',
                  'Scoring PARTIAL as present: a half-capability recorded as a tick, and everyone proceeds as though it is there. Partial is more dangerous than absent',
                  'Assessing intention instead of reality: capability is what you can do repeatedly and reliably, not what you could do if the right person had time',
                  'Softening the map for its audience: a capability map exists to say uncomfortable things. One negotiated into agreement has been made worse than useless',
                  'Treating a gap as a scheduling problem: "we will figure it out" is how a gap becomes a mid-rollout crisis',
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 shrink-0 font-mono"
                      style={{ fontSize: 'var(--text-xs)', color: 'rgba(245,158,11,0.70)' }}>⚠</span>
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

      {/* S8 - Logistics */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Logistics</SectionLabel>
          <SectionHeadingLight>What running this requires</SectionHeadingLight>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { label: 'Time required', value: '1–2 facilitated sessions to build the initial map; revisited when delivery plans or team capabilities change' },
              { label: 'Who to involve', value: 'Practitioners who actually do the work, not just leadership. Real capability is known to the people doing it, not the people describing it upward' },
              { label: 'Format', value: 'Works remotely and in person; the map should be a shared, visible artefact: a living document, not a slide filed away after the session' },
              { label: 'State to be rigorous about', value: 'PARTIAL. Create the middle category and use it honestly. The instinct to round PARTIAL up to HAVE IT is what puts a hole under an EPIC-level bet' },
              { label: 'Output', value: 'Layered, segmented map with today\'s states and the target states; gap list with closure route (build / hire / partner / buy) and honest timeline for each' },
              { label: 'What to attach to', value: 'Gaps go straight onto the delivery roadmap as work items, not absorbed as scheduling assumptions, not filed as "things to address later"' },
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

      {/* S9 - AI Reactivated */}
      <DarkSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.55)">AI-reactivated</SectionLabel>
          <SectionHeadingDark>
            AI genuinely closes some capability gaps. It also produces a convincing imitation of the ones it has not closed.
          </SectionHeadingDark>
          <Body dark className="">
            The distinguishing test (can we judge this work?) is what separates a capability you
            have from an output you can merely obtain. A gap that looks closed on the surface but has
            no human judgment underneath it is the most dangerous cell on the map: solid on the
            surface, hollow underneath, and most devastating at the foundational layer where it
            silently carries everything above it.
          </Body>
          <div className="mt-10">
            <CMAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* S10 - Example toggle */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Worked example</SectionLabel>
          <SectionHeadingLight>Eighteen months and no answer</SectionHeadingLight>
          <Body className="">
            A company committed to real-time personalised recommendations, the centrepiece of the
            strategy. Two teams, eighteen months, and it had not landed. Nobody could say why.
            The map produced the answer in one session. The two approaches below differ in method,
            not in scenario.
          </Body>
          <div className="mt-10">
            <CMExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* S11 - Framework connections */}
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
                    style={{ background: 'rgba(138,75,60,0.08)', border: '1px solid rgba(138,75,60,0.18)' }}>
                    <span className="font-mono uppercase tracking-widest"
                      style={{ fontSize: 'var(--text-2xs)', color: 'rgba(138,75,60,0.72)' }}>
                      {f.phase}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1 group-hover:underline"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {f.name}
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                      {f.note}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S12 - Related methods */}
      <LightSection>
        <Container>
          <SectionLabel accent="rgba(138,75,60,0.65)">Related methods</SectionLabel>
          <SectionHeadingLight>The methods that connect here</SectionHeadingLight>
          <p className="mb-6 max-w-prose mx-auto px-6 md:px-8"
            style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
            Capability mapping sits underneath the other Delivery &amp; Validation methods: it asks the
            question they all assume is already answered. Its closest partner is the Delivery Roadmap,
            where every gap it finds becomes a piece of real work.
          </p>
          <div className="space-y-3">
            {RELATED_METHODS.map(m => (
              <div key={m.name}
                className="rounded-lg p-4 flex gap-4"
                style={{ border: `1px solid rgba(138,75,60,0.12)` }}>
                {m.slug ? (
                  <a href={`/methods/${m.slug}`}
                    className="font-semibold shrink-0 hover:underline"
                    style={{ fontSize: 'var(--text-sm)', color: BRICK, minWidth: 180 }}>
                    {m.name}
                  </a>
                ) : (
                  <span className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'rgba(138,75,60,0.55)', minWidth: 180 }}>
                    {m.name}
                  </span>
                )}
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  {m.rel}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S13 - Sources */}
      <LightSection>
        <Container prose className="mx-auto">
          <SectionLabel accent="rgba(138,75,60,0.65)">Sources and further reading</SectionLabel>
          <SectionHeadingLight>What this draws on</SectionHeadingLight>
          <div className="space-y-3">
            {[
              {
                author: 'Gary Hamel and C.K. Prahalad',
                title: 'Competing for the Future',
                year: '1994',
                note: 'The foundational work on core competencies and building the capabilities a strategy requires. The argument that capability is the real constraint on strategy, and that competing for the future means competing to build the capabilities that the future will require.',
              },
              {
                author: 'Clayton Christensen',
                title: 'The Innovator’s Dilemma',
                year: '1997',
                note: 'On why capable organisations fail at new things, and how capability itself becomes the constraint. The resources, processes, and values framework maps closely to the foundational-to-EPIC layering: what an organisation can do is determined by its processes (foundational), not just its resources.',
              },
              {
                author: 'Nicole Forsgren, Jez Humble, and Gene Kim',
                title: 'Accelerate',
                year: '2018',
                note: 'On the foundational engineering and organisational capabilities that actually predict delivery performance. One of the few empirical works on what capabilities belong at the foundational layer and which ones actually determine whether the EPIC-level ambitions land.',
              },
            ].map(s => (
              <div key={s.title} className="rounded p-4"
                style={{ border: `1px solid rgba(138,75,60,0.10)` }}>
                <p className="font-semibold"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                  {s.title}
                  <span className="font-normal ml-2"
                    style={{ color: 'var(--color-neutral-500)' }}>
                    : {s.author} ({s.year})
                  </span>
                </p>
                <p className="mt-1"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  {s.note}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>
    </>
  )
}

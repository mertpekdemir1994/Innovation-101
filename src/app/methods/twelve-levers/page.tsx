import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import TLExampleToggle from './TLExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: '12 Levers of Business Innovation — Methods — Innovation 101',
}

const TLEstablishing  = dynamic(() => import('./TLEstablishing'),  { ssr: false })
const TLInteractive   = dynamic(() => import('./TLInteractive'),   { ssr: false })
const TLAIReactivated = dynamic(() => import('./TLAIReactivated'), { ssr: false })

const PLUM = '#6B4A77'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'In the Double Diamond, the 12 Levers audit sits within the Develop phase: once a direction is converged from the Define stage, the audit forces the team to think about how the full business model around it should be designed, not just the product at its centre. It is particularly useful at the transition into Deliver, when the model must be specific enough to actually build and launch rather than still conceptual.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build framing',
    note: 'The 12 Levers audit is most useful at the framing stage of a Lean Startup cycle — before the Build phase begins — to ensure the team is not defaulting to building the most obvious thing (a better product) when a different lever combination might produce a more defensible result. It can also be used at the end of a Build-Measure-Learn loop to check whether the learning from the last experiment suggests pivoting to a different lever rather than improving the existing one.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Backlog',
    note: 'In Agile Innovation, the 12 Levers audit shapes backlog prioritisation: is the team building features (Offering lever) when the roadmap should also include initiatives that pull Revenue Model, Channel, or Partnership levers? The audit provides a structured argument for including non-product items on the innovation backlog — the levers that require coordination across teams rather than execution within a single product team.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'business-model-canvas',
    name: 'Business Model Canvas',
    rel: 'The reciprocal pair, and the distinction matters. The canvas describes the business model: what it is, and whether its nine blocks cohere with each other. The 12 Levers are an intervention menu: which of the twelve levers you could pull to innovate it. Canvas = the picture; Levers = the menu of changes. Draw the canvas to see what your model IS and whether it holds together; reach for the levers when you know it must change and need the full range of options rather than reflexively pulling on product.',
  },
  {
    slug: 'ten-types-innovation',
    name: '10 Types of Innovation',
    rel: 'The close sibling, worth distinguishing clearly. Both say "innovate beyond the product" — but they use different structures. The 10 Types framework organises innovation by type across three zones (Configuration, Offering, Experience) with named types in each. The 12 Levers audit organises it by lever — areas of the business model a team can deliberately pull. Use the 10 Types when exploring the taxonomy of innovation moves; use the 12 Levers when auditing which parts of your specific business model are and are not being innovated.',
  },
  {
    slug: 'value-proposition-canvas',
    name: 'Value Proposition Canvas',
    rel: 'Provides depth within the Value Proposition area of the lever map. Where the 12 Levers audit identifies that the Target Segment and Offering levers need attention, the Value Proposition Canvas gives the structured method for exploring what customer jobs, pains, and gains those levers should address. The two are complementary: the Levers audit identifies where to focus, the Canvas provides the detail of what to build.',
  },
  {
    slug: 'strategic-choice-cascade',
    name: 'Strategic Choice Cascade',
    rel: 'The levers audit identifies where innovation is possible; the Choice Cascade forces the team to commit to where they will actually focus. Pulling all twelve levers simultaneously is not a strategy — it is spread. The Strategic Choice Cascade provides the framework for choosing which levers to prioritise and making that choice coherent across the rest of the business model.',
  },
  {
    slug: 'balanced-breakthrough',
    name: 'Balanced Breakthrough',
    rel: 'Once the levers audit has identified which lever or combination to pull, Balanced Breakthrough is the framework for evaluating whether the resulting idea is genuinely desirable, feasible, and viable. A Revenue Model innovation that is operationally infeasible, or a Partnership structure no customer actually wants, will fail the DFV check. The two frameworks work sequentially: levers audit to identify the candidate innovation, then DFV to evaluate whether it is worth building.',
  },
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'Once a lever combination is chosen, Concept Testing validates whether the resulting proposition is desirable to real customers before committing to build. This is especially important for levers that affect customer-facing elements — Revenue Model, Bundling, Channels, and Relationships — where the innovation changes what customers experience or pay, and where assumptions about their response are especially easy to get wrong.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TLPage() {
  notFound()
  return (
    <>
      {/* S1 — Header DARK */}
      <DarkSection>
        <Container>
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize:   'var(--text-2xs)',
                color:       PLUM,
                background: 'rgba(107,74,119,0.12)',
                border:     '1px solid rgba(107,74,119,0.28)',
              }}
            >
              Strategy &amp; Prioritization
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              12 Levers of Business Innovation
            </h1>

            <p
              className="mb-3 max-w-[640px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A structured audit of the twelve levers a business can pull to innovate its model &mdash;
              not just its product &mdash; so no lever gets ignored and the most defensible moves
              surface first.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Most teams innovate instinctively on the Offering lever. It is the default, the instinct,
              and the crowded space. The levers worth pulling are often the ones nobody is pulling.
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* S2 — Establishing visual DARK */}
      <DarkSection>
        <Container>
          <div className="pb-20">
            <TLEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* S3 — What it is LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>A full-model audit, not a product audit. It forces the question: which of the twelve levers are we actually pulling — and which are we leaving untouched?</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                The 12 Levers framework starts from a simple observation: most companies innovate
                on their product or service — the Offering lever — and treat the rest of their
                business model as fixed. Yet the business model has twelve levers a company can
                pull, spanning what it offers and to whom, how it creates and delivers it, and how
                it reaches and keeps customers. Pulling a lever means deliberately innovating on
                that dimension of the model. Ignoring a lever means conceding it to competitors.
              </Body>
              <Body>
                The twelve levers are grouped into three areas: Value Proposition (Target Segment,
                Offering, Revenue Model, Bundling), Operating Model (Value Chain, Cost Model,
                Organization, Technology Platform), and Go-to-Market (Channels, Customer
                Relationships, Brand, Partnerships). The grouping matters because levers within an
                area tend to reinforce each other — a Revenue Model innovation often requires a
                corresponding change in Channel and Customer Relationship. But the most powerful
                innovations frequently combine levers across areas.
              </Body>
              <Body>
                The audit works by making the lever map explicit and honest. It asks: for each of
                the twelve levers, what have you invested in over the last three years? What are you
                planning to invest in over the next three? Which levers have never been seriously
                considered? The answers nearly always reveal a strong bias toward the Offering lever
                and systematic neglect of Revenue Model, Cost Model, and Partnership levers &mdash;
                the levers that are hardest to pull, slowest to produce results, and most difficult
                for competitors to copy.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S4 — Interactive DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Explore all twelve levers. Pull one to see what innovation on that dimension looks like.</SectionLabel>
            <SectionHeadingDark>Every lever is a choice. Not pulling it is also a choice — usually an unconscious one.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click any lever to see what innovation on that dimension means, what it looks like in
              practice, and why some levers are systematically under-used despite offering the most
              defensible advantages.
            </p>
            <TLInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* S5 — When to deploy LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>When to deploy it</SectionLabel>
            <SectionHeadingLight>When competitive pressure is intensifying, margins are eroding, or the product is good enough but not different enough to sustain.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The business is facing commoditization — the product is technically solid but pricing pressure is intense, and "a better product" is not generating differentiation.',
                    'You are entering a strategic planning cycle and want to ensure the resulting roadmap innovates on more than one lever.',
                    'A competitor has done something unexpected — not a better product, but a different pricing model, channel, or partnership structure — and you need to understand the full lever landscape before responding.',
                    'Cross-functional leadership (product, finance, sales, partnerships) is in the room, and you want a structured way to surface innovation ideas from all domains rather than defaulting to the product team\'s roadmap.',
                    'The team is stuck in a pattern of incremental product improvements and needs a structure to break the habit and see the full option space.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: PLUM, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                  Do not lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You are in early-stage discovery and the product itself is not yet validated. Fix the Offering first; optimize levers when you have a working model to optimize from.',
                    'The goal is idea generation rather than model diagnosis — this is an audit of what you are doing, not a brainstorm of what you could do. It works best as a diagnostic before a creative session.',
                    'Only the product team is present. The levers audit requires cross-functional perspectives: finance to evaluate Revenue Model, operations to assess Value Chain and Cost Model, BD to explore Partnerships.',
                    'You need an immediate answer. This is a half-day investment at minimum and requires honest internal data about where innovation resources have actually been allocated.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: 'var(--color-neutral-400)', flexShrink: 0, marginTop: 2 }}>×</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
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

      {/* S6 — How it works LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>How it works</SectionLabel>
            <SectionHeadingLight>Five steps from blank canvas to a lever choice you can commit to.</SectionHeadingLight>

            <div className="flex flex-col gap-6 mt-8">
              {[
                {
                  n: '01',
                  title: 'Map current investment across all twelve levers',
                  body: 'Before generating ideas, make the current state explicit. For each of the twelve levers, estimate what proportion of innovation effort and investment has been allocated over the last three years. Include product roadmap, pricing experiments, channel pilots, partnership discussions, and operational improvement programmes. This step always reveals the same finding: most investment is concentrated on one or two levers, usually Offering.',
                },
                {
                  n: '02',
                  title: 'Identify the neglected levers — and ask why',
                  body: 'Highlight the levers that have received little or no attention. For each, ask: is this lever neglected because it is genuinely not the right place to innovate for our business, or because it is hard and unfamiliar? Revenue Model and Cost Model levers are often neglected because they require finance and operations leadership rather than product teams. Partnerships are neglected because they take longer and require trust. Neglected is not the same as strategically deprioritised.',
                },
                {
                  n: '03',
                  title: 'Generate ideas per lever, prioritise by potential',
                  body: 'For each neglected or under-invested lever, generate at least one concrete idea for what innovation on that lever would look like in your specific context. This is not a brainstorm of everything possible — it is a targeted exploration of the levers you have systematically avoided. Then score each idea by its differentiation potential (how hard is this for a competitor to match?) and its materiality (how significant is the economic or competitive impact?).',
                },
                {
                  n: '04',
                  title: 'Choose a lever combination and stress-test coherence',
                  body: 'Innovation on multiple levers simultaneously is usually more powerful than a single-lever move — and more defensible, because competitors must match all of them at once. Choose the combination of one to three levers that offers the strongest differentiation and the most coherent fit with the rest of your business model. A Revenue Model innovation and a Channel innovation that are inconsistent with each other will create operational conflict. Test the chosen combination for internal coherence before proceeding.',
                },
                {
                  n: '05',
                  title: 'Check feasibility and confirm a pilot scope',
                  body: 'Generating an idea for a lever does not mean the organisation can execute it. For each lever in the chosen combination, confirm: what capability or permission is required, and does the organisation currently have it? A Partnerships innovation requires prospective partners who will say yes. A Revenue Model innovation may require new billing infrastructure and updated contracts. Confirm feasibility before committing — then define the smallest pilot that would validate the lever works in your specific market.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-6">
                  <div className="flex-shrink-0 w-8 pt-1">
                    <span className="font-mono" style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                      {n}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {title}
                    </h3>
                    <Body>{body}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S7 — Best practices LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Best practices</SectionLabel>
            <SectionHeadingLight>The audit is only as honest as the room.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {[
                {
                  title: 'Be ruthlessly honest about current allocation',
                  body: 'Teams consistently overestimate how much they innovate on non-product levers because they remember the conversations about it rather than the investments that actually happened. Map actual resource allocation, not aspirational intent. This requires finance data, not just product team memory.',
                },
                {
                  title: 'Include the levers that feel off-limits',
                  body: 'Some levers feel structurally unavailable: "We can\'t change our pricing model because it\'s contractually locked" or "We don\'t do partnerships at that level." Include them in the audit anyway. Treating a constraint as permanent is often the first thing a new entrant ignores — and they are usually right to.',
                },
                {
                  title: 'Pull combinations, not single levers',
                  body: 'The most defensible competitive positions combine multiple levers in ways that reinforce each other. A Revenue Model innovation combined with a Partnerships innovation that enables delivery of the new model creates a position that requires competitors to simultaneously restructure their pricing AND rebuild a partner network to match. Single-lever moves are easier to copy.',
                },
                {
                  title: 'Distinguish what is possible from what is feasible now',
                  body: 'The audit surfaces what is theoretically possible for your category. Feasibility narrows that to what your specific organisation can do given its current capabilities, partnerships, and constraints. Generate from the full option space, then apply the feasibility filter — never apply the feasibility filter before you generate. You will miss the lever that looks impossible until someone actually checks.',
                },
                {
                  title: 'Commit to one or two levers, not twelve',
                  body: 'The purpose of the audit is not to innovate on everything simultaneously — it is to identify where you are systematically absent and make a deliberate choice. An organisation that tries to pull all twelve levers at once is pulling none of them strategically. The audit surfaces the field; leadership chooses the focus.',
                },
              ].map(({ title, body }) => (
                <div key={title}
                  className="p-5 rounded-lg"
                  style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-200)' }}>
                  <h3 className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S8 — Logistics LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20 border-t" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={PLUM}>Logistics</SectionLabel>
            <SectionHeadingLight>Who, how long, and what you need in the room.</SectionHeadingLight>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Time
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  Half a day for a full audit and lever selection. A shorter 90-minute version can map current investment and surface candidates; commit an additional session to evaluate combinations and confirm feasibility.
                </p>
              </div>
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Participants
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  Cross-functional team of 4–10. Must include people with authority over product, finance, operations, sales, and partnerships. If only product people attend, the audit will surface only product lever ideas — which defeats the purpose.
                </p>
              </div>
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Materials
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  The 12-lever canvas (a grid with the twelve levers labelled). Resource allocation data for the last 2–3 years. Competitive intelligence — specifically, any signals that competitors or new entrants are innovating on non-product levers.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S9 — AI Reactivated DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>AI and the 12 Levers</SectionLabel>
            <SectionHeadingDark>AI can populate all twelve levers in minutes. It cannot choose which one to pull — or tell you whether pulling it is feasible for your organization.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what changes when AI generates the lever audit — and what
              the fast scan structurally cannot produce. Speed and coverage are different things.
            </p>
            <TLAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* S10 — Example LIGHT */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>In practice</SectionLabel>
            <SectionHeadingLight>An industrial manufacturer facing commoditization. The audit surfaces three neglected levers — and a lever combination that doesn&rsquo;t require a better product.</SectionHeadingLight>
            <p
              className="mb-10 max-w-[600px]"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
            >
              Tab A shows the structured audit: map allocation, surface neglected levers,
              choose a combination, confirm feasibility. Tab B shows what an AI fast scan produces —
              useful for coverage, incomplete in the ways that matter.
            </p>
            <TLExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* S11 — Frameworks LIGHT */}
      <LightSection>
        <Container>
          <div className="py-20 border-t" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={PLUM}>Where it fits in the frameworks</SectionLabel>
            <SectionHeadingLight>This method appears in three frameworks — at the moment each one needs a structured business model lens.</SectionHeadingLight>

            <div className="flex flex-col gap-6 mt-8">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <div key={slug}
                  className="p-6 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Link href={`/framework/${slug}`}
                      className="font-semibold hover:opacity-70 transition-opacity"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {name}
                    </Link>
                    <span style={{ color: 'var(--color-neutral-300)' }}>·</span>
                    <span className="font-mono uppercase tracking-widest"
                      style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
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

      {/* S12 — Related methods LIGHT */}
      <LightSection>
        <Container>
          <div className="py-20 border-t" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={PLUM}>Related methods</SectionLabel>
            <SectionHeadingLight>Methods that work alongside, before, or after the 12 Levers audit.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-8">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <div key={name}
                  className="p-5 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="mb-2">
                    {slug ? (
                      <Link href={`/methods/${slug}`}
                        className="font-semibold hover:opacity-70 transition-opacity"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                        {name}
                      </Link>
                    ) : (
                      <span className="font-semibold"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
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

      {/* S13 — Sources LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20 border-t" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={PLUM}>Sources and further reading</SectionLabel>
            <SectionHeadingLight>The intellectual lineage of the framework.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-8">
              {[
                {
                  citation: 'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation. Wiley.',
                  note: 'The canonical text on business model thinking. The Business Model Canvas maps nine building blocks that largely correspond to the levers; the 12 Levers framework is an application of canvas thinking specifically oriented toward innovation investment decisions rather than model documentation.',
                },
                {
                  citation: 'Keeley, L., Walters, H., Pikkel, R., & Quinn, B. (2013). Ten Types of Innovation: The Discipline of Building Breakthroughs. Wiley.',
                  note: 'Provides a complementary taxonomy of innovation types organised differently from the lever map. The empirical finding — that the most successful innovations typically combine multiple types, and that product innovation alone rarely sustains advantage — is the same insight that motivates the 12 Levers framework.',
                },
                {
                  citation: 'Lafley, A.G., & Martin, R. (2013). Playing to Win: How Strategy Really Works. Harvard Business Review Press.',
                  note: 'The Strategic Choice Cascade provides the decision framework for choosing which levers to prioritise after the audit surfaces the options. The two frameworks are complementary: lever audit to map the landscape, choice cascade to commit to a direction within it.',
                },
                {
                  citation: 'BCG. Various publications on business model innovation. Boston Consulting Group.',
                  note: 'The BCG research on business model innovation is the primary empirical source for the finding that innovations combining multiple business model dimensions significantly outperform single-dimension product innovations in both revenue impact and defensibility.',
                },
              ].map(({ citation, note }) => (
                <div key={citation}
                  className="p-5 rounded-lg"
                  style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-200)' }}>
                  <p className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {citation}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
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

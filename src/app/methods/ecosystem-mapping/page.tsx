import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import EMExampleToggle from './EMExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Ecosystem Mapping — Methods — Innovation 101',
}

const EMEstablishing  = dynamic(() => import('./EMEstablishing'),  { ssr: false })
const EMInteractive   = dynamic(() => import('./EMInteractive'),   { ssr: false })
const EMAIReactivated = dynamic(() => import('./EMAIReactivated'), { ssr: false })

const TEAL = '#2A6F7A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  { slug: 'double-diamond',   name: 'Double Diamond',   phase: 'Discover',        note: 'Mapping the full system a problem lives in before defining it: identifying the actors, the flows, and the leverage points that should shape the design challenge.' },
  { slug: 'fde',              name: 'FDE',               phase: 'Embed',           note: 'Mapping the customer\'s wider organizational and system context while embedded on-site, to understand how the problem is embedded in the customer\'s web of actors and relationships before solving it.' },
  { slug: 'agile-innovation', name: 'Agile Innovation', phase: 'Discovery Sprint', note: 'Understanding the system around the users the backlog serves: who else is affected, what flows between actors, and where the non-obvious constraints and opportunities in the wider ecosystem lie.' },
  { slug: 'design-sprint',    name: 'Design Sprint',    phase: 'Monday',          note: 'Mapping the system context before focusing the sprint: understanding which actors are affected by the problem, what flows between them, and what the sprint\'s solution would ripple through in the wider system.' },
]

const RELATED_METHODS = [
  { slug: 'systems-mapping',        name: 'Systems Mapping',         rel: 'The reciprocal pair, and the distinction matters. An ecosystem map shows STRUCTURE: the actors and the value flowing between them, a picture of how the system is CONNECTED. A systems map models BEHAVIOR OVER TIME: the feedback loops, delays, and leverage points that explain why the system keeps producing the outcome it produces. Ecosystem mapping is the cast and the wiring; systems mapping is the physics. An ecosystem map can show you a bottleneck; only a systems map can tell you the bottleneck regenerates because a balancing loop restores it every time you clear it.' },
  { slug: null,                    name: 'Stakeholder Mapping',     rel: 'The close, lighter cousin. Stakeholder mapping identifies who has a stake and how much power or interest; ecosystem mapping shows how the whole system is connected and what value actually flows between its parts. Stakeholder mapping asks who matters; ecosystem mapping asks how the system is CONNECTED.' },
  { slug: 'journey-mapping',       name: 'Journey Mapping',         rel: 'The zoom-in counterpart. Ecosystem mapping shows the whole system of actors; journey mapping follows one actor\'s felt experience through it. Use both when you need to understand the system before going deep on one person\'s experience within it.' },
  { slug: 'service-blueprinting',  name: 'Service Blueprinting',    rel: 'Zooms into the operational machine of one service within the ecosystem. Ecosystem mapping shows the wider web the service sits inside; service blueprinting maps the backstage and systems that deliver it. Use ecosystem mapping first to find which service relationship is most important, then blueprint it.' },
  { slug: '5es-framework',         name: 'The 5Es Framework',       rel: 'Evaluates one experience within the system across five fixed phases. Ecosystem mapping maps the system around that experience. Use the 5Es to assess a specific experience, then ecosystem mapping to understand the wider actor context that shapes it.' },
  { slug: 'in-depth-interviews',   name: 'In-Depth Interviews',     rel: 'With actors across the system, the primary way the non-obvious players and real flows are discovered. The ecosystem map identifies who to talk to; the interviews surface what actually flows between them and which actors are being missed.' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EcosystemMappingPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          S1 - Header / Identity + Establishing visual   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <Container className="relative z-10 w-full flex flex-col justify-center flex-1">
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize:   'var(--text-2xs)',
                color:       '#5CF4FF',  /* TEAL, brightened for text contrast */
                background: 'rgba(42,111,122,0.10)',
                border:     '1px solid rgba(42,111,122,0.22)',
              }}
            >
              Experience &amp; Systems Mapping
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Ecosystem Mapping
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A map of all the actors in a system and the value that flows between them, used to understand the wider web a problem actually lives in.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}
            >
              Some problems cannot be solved by serving one user, because the problem is not in the user. It is in the web of relationships around them.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <EMEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>What it is</SectionLabel>
            <SectionHeadingLight>A map of the whole web, not just the user inside it.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                An ecosystem map (sometimes called a value network map or actor map) visualizes all the players in a system (the people, organizations, platforms, and institutions) and the relationships and exchanges of value, information, money, or service between them. Where the other Experience &amp; Systems Mapping methods examine a single experience up close, ecosystem mapping pulls back to show the whole web that experience sits inside.
              </Body>
              <Body>
                Its power is that it reveals the system, not just the user. Many problems cannot be solved by serving one person in isolation because the problem is embedded in a web of relationships: a marketplace, a platform, a healthcare system, a supply chain, a public service. An ecosystem map exposes where value is created and captured, where the bottlenecks and broken connections are, and where a new entrant could intervene, along with the second-order effects that intervention would trigger across the system.
              </Body>
              <Body>
                It is often confused with stakeholder mapping, but the two do different jobs: a stakeholder map identifies who has a stake and how much power or interest they hold; an ecosystem map shows how the whole system is connected and what actually flows between its parts. Stakeholder mapping asks who matters; ecosystem mapping asks how the system is CONNECTED.
              </Body>
              <Body>
                One further boundary is worth drawing. An ecosystem map shows STRUCTURE: who is in the system, and what flows between them. It is a picture of an arrangement. It does not explain why the system BEHAVES the way it does over time: why a problem keeps returning after you fix it, why an obvious intervention gets absorbed and produces nothing, or why cause and symptom are separated by months. Those are questions of causality and feedback, and they belong to Systems Mapping, which models loops, delays, and leverage points. Ecosystem mapping asks how the system is connected; systems mapping asks why it keeps doing what it does.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Interactive   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>The actor network</SectionLabel>
            <SectionHeadingDark>See the whole web. Click any actor.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              The obvious actors appear in teal. The amber-ringed actors are the non-obvious ones, the players a two-sided-market framing misses. Click any node to see who they are, what flows to and from them, and where their leverage lies.
            </p>
            <EMInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A systems tool for problems that resist single-user solutions.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: TEAL }}
                >Use Ecosystem Mapping when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The challenge involves multiple interdependent actors: a marketplace, a platform business, a healthcare system, a supply chain, a public service.',
                    'You need to understand where value is created and captured across a system, and where a new entrant could intervene.',
                    'A problem resists being solved by serving one user, because it is embedded in a web of relationships, not just a user experience.',
                    'You need to anticipate the second-order effects of an intervention across a system before you make it.',
                    'You want to find the non-obvious actors (the quiet intermediary, the informal power broker, the emerging complementor) that a simple user framing would miss.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: TEAL, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
                >Do not lean on it when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The problem is a simple, self-contained product with a single user and a single transaction. There is no meaningful ecosystem to map.',
                    'You only need to know who has a stake and how much power or interest they hold. Use stakeholder mapping, a lighter, faster tool.',
                    'You need the felt experience of one user (Journey Mapping), the operational delivery of one service (Service Blueprinting), or a phase-by-phase evaluation of one experience (the 5Es). Ecosystem mapping is the zoom-out companion to all three, not a replacement.',
                    'You need primary evidence rather than a structured analysis. The ecosystem map organizes what you know; it does not replace going and finding out.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: 'var(--color-neutral-500)', flexShrink: 0, marginTop: 2 }}>×</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="max-w-prose mx-auto rounded-lg p-5 mt-10"
              style={{ background: 'var(--color-warm-100)', borderLeft: '3px solid var(--color-neutral-300)' }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: ecosystems are dynamic and an ecosystem map is a snapshot. Treated as static and complete, it can mislead, because the web shifts, new actors enter, and flows change. It is a tool for understanding a living system at a moment, to be revisited as the system moves.
              </p>
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
            <SectionLabel accent={TEAL}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from the obvious actors to the hidden leverage.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Identify all the actors, including the non-obvious ones.',
                  body: 'List the players in the system, and push deliberately past the obvious two or three. The regulators, intermediaries, complementors, competitors, and quiet system-shapers are usually where the insight is. Ask: who regulates this? Who profits without being visible? Who could block it? Who quietly makes it work?',
                },
                {
                  n: '02',
                  title: 'Place them as a network, not a hierarchy.',
                  body: 'Position the actors as nodes, with the focal actor or actors at the center and the wider web around them. Resist arranging them in a simple hierarchy or org-chart structure. Ecosystems are webs. The spatial arrangement should show adjacency and connection, not reporting lines.',
                },
                {
                  n: '03',
                  title: 'Draw and label the flows.',
                  body: 'Connect the actors and, critically, label what flows along each connection: money, data, goods, services, attention, trust. An unlabeled connection is nearly useless. The value that flows along it is the whole point. Label each connection as you draw it; the discipline of naming forces clarity and exposes connections that are actually empty.',
                },
                {
                  n: '04',
                  title: 'Look for imbalances and leverage points.',
                  body: 'Read the web for bottlenecks, broken or missing connections, lopsided value capture, and points of leverage where a small intervention could shift the whole system. The actors with the most connections (or the flows that multiple actors depend on) are usually the leverage points.',
                },
                {
                  n: '05',
                  title: 'Trace second-order effects.',
                  body: 'For any potential intervention, follow the ripples: change one flow and see what it does downstream to other actors. The map\'s real value is anticipating the consequences a single-user view would miss. An intervention that solves a guest problem may trigger a regulatory response via the neighbor-community-regulator chain, the kind of second-order effect that only a systems view reveals.',
                },
                {
                  n: '06',
                  title: 'Treat it as living.',
                  body: 'Revisit the map as the ecosystem shifts. Actors enter and leave, flows change, and a map that was accurate a year ago may now mislead. The most useful ecosystem maps are maintained as the system evolves and tested against real changes, not filed as a deliverable and forgotten.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(42,111,122,0.12)', lineHeight: 1.1, width: 40 }}
                  >{n}</span>
                  <div>
                    <h3 className="font-semibold mb-2"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}
                    >{title}</h3>
                    <Body>{body}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S7 - Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and what prevents it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}
            >When it goes well</h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The map includes the non-obvious actors (regulators, intermediaries, complementors, competitors) not just the direct users. The hidden system-shapers are where the insight almost always is.',
                'Every connection is labeled with what actually flows along it, so the map shows value movement rather than just who-knows-whom.',
                'It surfaces genuine leverage points and reveals the second-order effects an intervention would trigger before the team commits to it.',
                'It is treated as a living snapshot, revisited as the ecosystem shifts, rather than a one-time deliverable.',
                'It changes a decision: it redirects a solution toward a leverage point, or surfaces a threat the two-sided framing had missed entirely.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: TEAL, flexShrink: 0, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}
            >The mistakes, and how to avoid them</h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: 'Mapping only the direct actors.',
                  fix: 'Stopping at the obvious players (the "two-sided market" framing) misses the system-shapers, regulators, complementors, and incumbents where the real threats and opportunities live. Build in a specific prompt to hunt for the hidden actors before the session ends.',
                },
                {
                  mistake: 'Unlabeled connections.',
                  fix: 'Drawing lines between actors without naming what flows along them produces a diagram that looks like insight but is not. Always label the flow. An unlabeled connection is a placeholder, not a finding.',
                },
                {
                  mistake: 'Treating the map as static.',
                  fix: 'Ecosystems move. A map frozen in time quietly goes wrong as actors and flows change. Set a cadence to revisit it: at minimum, when a significant market event happens or when a new entrant appears.',
                },
                {
                  mistake: 'Confusing it with a stakeholder map.',
                  fix: 'Listing who has a stake is not the same as showing how the system is connected and where value flows. Ecosystem mapping is about the system\'s mechanics: what actually flows, not just who is affected.',
                },
                {
                  mistake: 'Mapping for its own sake.',
                  fix: 'A beautiful, complex web that never informs a decision is decoration. Every ecosystem mapping session should end with a specific implication: a leverage point to pursue, a threat to monitor, or a second-order effect to design around.',
                },
              ].map(({ mistake, fix }) => (
                <div key={mistake} className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
                >
                  <p className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                  >{mistake}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {fix}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S8 - Logistics   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Logistics</SectionLabel>
            <SectionHeadingLight>Assembling the knowledge the map depends on.</SectionHeadingLight>
            <Body>
              No single person usually knows the whole ecosystem. The value of the workshop depends on assembling people with genuinely different vantage points: someone who knows the regulatory landscape, someone who knows the supply side, someone who knows the customer, someone who has operated in the domain. The non-obvious actors surface when the room contains people whose knowledge spans the full system.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Start from a focal question',
                  body: 'An ecosystem can be mapped at almost any scope, so anchor it before you begin: whose ecosystem, around what problem? "The ecosystem around a patient\'s diabetes management" is mappable; "the healthcare ecosystem" is boundless. A clear focal actor and focal question keep the map useful rather than encyclopedic.',
                },
                {
                  label: 'Push deliberately for the non-obvious actors',
                  body: 'The natural tendency is to map the obvious players and stop. Build in an explicit hunt: after the first round of actors is on the map, ask the group to find the hidden system-shapers. Who regulates this? Who profits without being visible? Who could block a new entrant? Who quietly makes the system work? These prompts are the mechanism that surfaces the insight.',
                },
                {
                  label: 'Label flows as you draw them',
                  body: 'Do not draw the whole web first and label later. Label each connection as you place it, because the discipline of naming what flows exposes connections that seem important but are actually empty, and forces precision about what is actually exchanged.',
                },
                {
                  label: 'Keep it legible',
                  body: 'A map with a hundred nodes and no hierarchy of importance is unreadable. Focus on the actors and flows that matter to the focal question. Common tools are whiteboards and digital canvases: Miro, Mural, and Kumu (for network-specific mapping) are examples, not endorsements. The tool is irrelevant; the labeling discipline is everything.',
                },
                {
                  label: 'End with specific implications',
                  body: 'Every ecosystem mapping session should end with named implications: a leverage point to pursue, a threat to monitor, a second-order effect to design around, a non-obvious actor to research further. "We need to understand the ecosystem better" is not an output. A named actor and a named next step are.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(42,111,122,0.28)', marginTop: 4 }}
                  />
                  <div>
                    <p className="font-semibold mb-1"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                    >{label}</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S9 - How AI is evolving this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI draws the visible web fast. The actors that move a system are often the invisible ones.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI contributes to building the ecosystem map, and where its mapping goes faint at exactly the actors that most need attention.
            </p>
            <EMAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same marketplace, mapped two ways.</SectionHeadingLight>
            <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A fast-growing short-term rental marketplace wants to understand its world well enough to find growth levers and head off threats. The instinctive framing is a simple two-sided market: hosts and guests. The ecosystem mapping session is commissioned to see if the real system is more complicated than that. The same business is mapped twice: once by a team with diverse domain knowledge running a structured session, once with AI providing the draft map.
            </p>
            <EMExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Ecosystem Mapping shows up.</SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Ecosystem mapping is a systems-level discovery method. It maps to frameworks at the points where understanding the wider context matters, where the question is &ldquo;what system is this problem embedded in&rdquo; before the team narrows to a user or a solution. It is intentionally blank in frameworks that work exclusively at the single-user or single-feature level.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link key={slug} href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <span className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}
                  >{name}</span>
                  <span className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-2xs)', color: TEAL, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >{phase}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with Ecosystem Mapping.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <div key={name}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4"
                  style={{ border: '1px solid var(--color-neutral-100)' }}
                >
                  <div className="shrink-0" style={{ minWidth: 200 }}>
                    {slug ? (
                      <Link href={`/methods/${slug}`}
                        className="font-semibold hover:underline"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                      >{name}</Link>
                    ) : (
                      <span className="font-semibold"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                      >{name}</span>
                    )}
                  </div>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S13 - Sources & further reading   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Thinking in Systems',
                  author: 'Donella Meadows',
                  year:   '2008',
                  note:   'The foundational text on seeing and working with systems. Introduces the mental models (stocks, flows, feedback loops, leverage points) that underlie ecosystem mapping. Essential background for anyone who wants to move from drawing actor maps to actually understanding what the map is showing.',
                },
                {
                  title:  'This Is Service Design Doing',
                  author: 'Marc Stickdorn, Markus Hormess, Adam Lawrence, and Jakob Schneider',
                  year:   '2018',
                  note:   'The comprehensive service design toolkit, including system and actor mapping in practice. Covers how ecosystem mapping connects to the methods that surround it (journey mapping, service blueprinting, and stakeholder analysis) and how to run mapping sessions effectively.',
                },
                {
                  title:  'Value Proposition Design',
                  author: 'Alexander Osterwalder, Yves Pigneur, Greg Bernarda, and Alan Smith',
                  year:   '2014',
                  note:   'For value-flow thinking across a system: understanding what is actually exchanged between actors, not just who the actors are. Useful as a companion to ecosystem mapping when the goal is to design new value flows rather than simply understand existing ones.',
                },
              ].map(({ title, author, year, note }) => (
                <div key={title} className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(42,111,122,0.30)' }}
                  />
                  <div>
                    <p className="font-semibold"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                    ><em>{title}</em></p>
                    <p className="mb-1"
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}
                    >{author} ({year})</p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                      {note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>
    </>
  )
}

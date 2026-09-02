import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SBExampleToggle from './SBExampleToggle'
import SBBoundarySection from './SBBoundarySection'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Service Blueprinting — Methods — Innovation 101',
}

const SBEstablishing  = dynamic(() => import('./SBEstablishing'),  { ssr: false })
const SBInteractive   = dynamic(() => import('./SBInteractive'),   { ssr: false })
const SBAIReactivated = dynamic(() => import('./SBAIReactivated'), { ssr: false })

const TEAL = '#2A6F7A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  { slug: 'double-diamond',   name: 'Double Diamond',   phase: 'Deliver',   note: 'Blueprinting the operational reality that delivers the chosen solution: aligning the frontstage experience with the backstage operations that produce it.' },
  { slug: 'fde',              name: 'FDE',               phase: 'Extract',   note: 'Mapping how a solution actually operates in the customer\'s environment before generalizing it into a scalable product.' },
  { slug: 'agile-innovation', name: 'Agile Innovation', phase: 'Sprint',    note: 'Designing and refining service operations iteratively as the team delivers each sprint of functionality.' },
  { slug: 'design-sprint',    name: 'Design Sprint',    phase: 'Thursday',  note: 'Blueprinting the service behind a prototype when the concept is a service rather than a self-contained product.' },
]

const RELATED_METHODS = [
  { slug: 'journey-mapping',        name: 'Journey Mapping',         rel: 'The counterpart above the line of visibility. The customer journey is the top spine of the blueprint; the blueprint extends it into the operational machine. See the boundary section above.' },
  { slug: 'in-depth-interviews',    name: 'In-Depth Interviews',     rel: 'With frontline staff, the primary source for understanding how the backstage actually works versus how it is documented. The blueprint is built from research, not from org charts.' },
  { slug: 'contextual-observation', name: 'Contextual Observation',  rel: 'Observing the actual backstage work is how the truest blueprints, and their hidden workarounds, are built. Following real staff through the real process reveals what documentation never captures.' },
  { slug: 'ecosystem-mapping',      name: 'Ecosystem Mapping',       rel: 'Zooms out from one service\'s operations to the wider system of actors and relationships around it. Use when the support-processes layer of the blueprint connects to a complex external ecosystem.' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServiceBlueprintingPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          S1 - Header / Identity   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <Container className="relative z-10 flex flex-col justify-center flex-1">
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize:   'var(--text-2xs)',
                color:       TEAL,
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
              Service Blueprinting
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A map of the whole machine behind an experience: not just what the customer sees, but the frontstage, backstage, and systems that produce it.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              A journey map shows what the customer feels. A service blueprint shows everything working, and sometimes failing, beneath the surface to make that feeling happen.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <SBEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>What it is</SectionLabel>
            <SectionHeadingLight>The whole machine behind the experience, above and below the line of visibility.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                A service blueprint maps the entire system that delivers an experience: not just the parts the customer sees, but the frontstage, the backstage, and the support systems that make it all possible. It takes the customer&rsquo;s journey across the top and extends it downward through a series of layers separated by the line of visibility. Everything above the line is experienced by the customer. Everything below it is invisible to them but makes the experience possible.
              </Body>
              <Body>
                Its power is that it connects the felt experience to the machinery that produces it. A journey map can tell you that customers feel abandoned at a certain moment; a service blueprint tells you why, by exposing the backstage handoff, the missing system, or the broken process beneath that moment. It is the tool for diagnosing and designing the operational reality of a service, not just its surface. When a customer-facing problem actually lives three layers down in a support system or an unowned gap between two teams, the blueprint is what makes that visible.
              </Body>
              <Body>
                The single element that defines a service blueprint, and distinguishes it from a journey map, is the line of visibility: the explicit boundary between what the customer experiences and the operational machine that produces that experience. Everything Service Blueprinting adds beyond a journey map lives below that line.
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
            <SectionLabel accent={TEAL}>The blueprint</SectionLabel>
            <SectionHeadingDark>Cross the line of visibility. Click any layer.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Each layer reveals a different part of the service. Moving from top to bottom, you cross from what the customer sees into the machine that produces it. The line of visibility is the pivot.
            </p>
            <SBInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A tool for finding the operational root of a felt experience problem.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: TEAL }}
                >Use Service Blueprinting when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'A customer-facing problem seems to originate behind the scenes, and you need to find where in the operational chain it actually breaks.',
                    'You are designing or redesigning a service and need to align the frontstage experience with the backstage operations that deliver it.',
                    'Multiple teams and systems touch one experience, and the failures live in the handoffs between them rather than in any one team\'s part.',
                    'You have a journey map showing what the customer feels and now need to understand why, in the operational layers beneath.',
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
                    'You only need the customer\'s felt experience and emotional arc. Use Journey Mapping, which stays above the line of visibility.',
                    'You need a fixed experience-phase evaluation lens applied consistently. Use the 5Es Framework.',
                    'The experience has no real backstage: a simple self-contained product with no service delivery behind it. The blueprint\'s lower layers would be empty.',
                    'You have not researched how the work actually happens. A blueprint built from an org chart maps the fiction, not the service.',
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

            <div className="rounded-lg p-5 mt-10"
              style={{ background: 'var(--color-warm-100)', borderLeft: '3px solid var(--color-neutral-300)' }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: a blueprint is only as accurate as the reality it is built from. Blueprinted from an idealized process document rather than from how the work actually happens, it maps the fiction, and hides the very workarounds and breakdowns it should expose.
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
            <SectionHeadingLight>Six moves, from the customer journey down into the machine.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Start from the customer journey.',
                  body: 'Lay out the stages of the customer\'s experience across the top, the same spine as a journey map. If you have an existing journey map, start from it. The blueprint grows downward from this foundation.',
                },
                {
                  n: '02',
                  title: 'Add the frontstage.',
                  body: 'For each stage, map the employee actions and touchpoints the customer directly interacts with: the person they speak to, the form they submit, the interface they navigate. These are still seen by the customer.',
                },
                {
                  n: '03',
                  title: 'Draw the line of visibility.',
                  body: 'Place the explicit boundary between what the customer sees and what they do not. This line is the organizing device of the entire blueprint. Everything above it is experienced; everything below it is invisible but essential.',
                },
                {
                  n: '04',
                  title: 'Map the backstage.',
                  body: 'Below the line, capture the employee actions the customer never sees: the preparation, the processing, the work that happens out of sight. This layer is where many customer-facing problems actually originate.',
                },
                {
                  n: '05',
                  title: 'Map the support processes and systems.',
                  body: 'At the bottom, the infrastructure: systems, databases, third-party services, and internal platforms the backstage depends on. Often the deepest root cause of surface problems, and the hardest layer to get right from documentation alone.',
                },
                {
                  n: '06',
                  title: 'Trace the vertical dependencies.',
                  body: 'Read the blueprint vertically at each stage: a customer moment depends on a frontstage action, which depends on backstage work, which depends on a system. Find where those vertical chains break (an unowned handoff, a missing system, a manual workaround) because that is where customer-facing problems are born.',
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
                'The blueprint is built from how the work actually happens, observed and verified with frontline staff, not from an org chart or process document.',
                'The line of visibility is drawn honestly, making it unmistakable which parts the customer sees and which they do not.',
                'The vertical dependencies are traced, so a customer-facing symptom can be followed down to its operational root cause.',
                'It exposes the unowned handoffs and gaps between teams: the places where "not my job" lives, which are where services most often break.',
                'The people who run the backstage help build it, so it reflects reality and they trust the result.',
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
                  mistake: 'Blueprinting the idealized process.',
                  fix: 'Mapping how the service is supposed to run instead of how it actually runs hides the workarounds and breakdowns that are the whole point. Build from observed reality.',
                },
                {
                  mistake: 'Skipping the line of visibility.',
                  fix: 'Without a clear seen/unseen boundary, a blueprint collapses into a generic process diagram. The line is the defining element.',
                },
                {
                  mistake: 'Stopping at the frontstage.',
                  fix: 'Mapping only what the customer sees plus the staff they talk to, and never going deeper, misses the backstage and systems where problems originate. Go all the way down.',
                },
                {
                  mistake: 'Ignoring the support-systems layer.',
                  fix: 'Many customer-facing failures are really system or third-party failures. Omitting the bottom layer hides the true root cause.',
                },
                {
                  mistake: 'Building it without frontline staff.',
                  fix: 'A blueprint drawn only by managers reflects the official story, not the real one. Involve the people who actually do the backstage work.',
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
            <SectionHeadingLight>Getting the right people and the right inputs.</SectionHeadingLight>
            <Body>
              A blueprint&rsquo;s value is proportional to the accuracy of its backstage and systems layers, which are the hardest to get right and the easiest to fictionalize from documentation. Plan the fieldwork before the workshop: observe actual backstage work, interview frontline staff, and verify system dependencies against reality rather than assumption.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Get the frontline in the room',
                  body: 'The single most important practical decision. A blueprint built only by managers or from process documents captures the official version of the service; the real service, with its workarounds and undocumented fixes, lives in the heads of the people who deliver it.',
                },
                {
                  label: 'Start from a journey map if you have one',
                  body: 'Because the blueprint\'s top spine is the customer journey, an existing journey map is the natural foundation. Build the blueprint downward from it, adding the frontstage, the line of visibility, the backstage, and the systems.',
                },
                {
                  label: 'Scope it deliberately',
                  body: 'A full service can be enormous. Blueprint one specific journey or one problem area at a time (for example, the onboarding of a new customer, or the moment a complaint is resolved) rather than trying to map the entire service at once.',
                },
                {
                  label: 'Verify the backstage against reality',
                  body: 'The lower layers are the hardest to get right. Validate the backstage and support-system layers by observing the actual work and talking to the people who do it, not by asking what the process document says.',
                },
                {
                  label: 'Keep it as a living tool',
                  body: 'Services change, systems get replaced, teams reorganize. A blueprint frozen at one moment goes stale. The most valuable blueprints are maintained as the service evolves and used to test the operational impact of proposed changes before they ship.',
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
            <SectionHeadingDark>AI can map every documented process. The service actually runs on the undocumented ones.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI contributes across the blueprint layers: what it maps well, what it misses, and where the undocumented reality it cannot see is exactly the thing that matters most.
            </p>
            <SBAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same service, blueprinted two ways.</SectionHeadingLight>
            <p className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A bank is trying to fix its small-business loan application, which customers experience as slow and frustrating. The customer-facing team already knows customers feel abandoned during the wait. Now they need to understand why, in the operations beneath the line of visibility. The same team, the same service: once with traditional blueprinting grounded in frontline research, once with AI drafting the blueprint from existing documentation.
            </p>
            <SBExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Where it ends: neighboring methods   DARK   [ADDED]
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Where it ends</SectionLabel>
            <SectionHeadingDark>Where the blueprint meets its neighbors.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              A service blueprint is useful precisely because it goes below the line of visibility, but that also defines its edges. The two neighboring methods add territory the blueprint deliberately leaves out.
            </p>
            <SBBoundarySection />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Used in these frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Service Blueprinting shows up.</SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Service Blueprinting is an operational design method, so it maps to frameworks where a service is being delivered or scaled. It does not appear meaningfully in pure discovery phases; its home is in design, delivery, and iteration of the operational machine.
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
          S13 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with Service Blueprinting.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <Link key={slug} href={`/methods/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)' }}
                >
                  <span className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}
                  >{name}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S14 - Sources & further reading   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'This Is Service Design Doing',
                  author: 'Marc Stickdorn, Markus Hormess, Adam Lawrence, and Jakob Schneider',
                  year:   '2018',
                  note:   'The definitive practical guide to service blueprinting and service design. Covers the method in full depth, including how to run blueprint workshops, how to validate the backstage layers, and how blueprinting connects to the broader service design practice.',
                },
                {
                  title:  'This Is Service Design Thinking',
                  author: 'Marc Stickdorn and Jakob Schneider',
                  year:   '2011',
                  note:   'The foundational text that popularized service blueprinting outside the academic literature. Established the vocabulary and framing used in the method today.',
                },
                {
                  title:  'Service Design: From Insight to Implementation',
                  author: 'Andy Polaine, Lavrans Lovlie, and Ben Reason',
                  year:   '2013',
                  note:   'For blueprinting within end-to-end service design practice, including how to integrate blueprints with research, prototyping, and delivery across complex organizations.',
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

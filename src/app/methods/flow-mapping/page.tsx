import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import FMExampleToggle from './FMExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Flow Mapping — Methods — Innovation 101',
}

const FMEstablishing  = dynamic(() => import('./FMEstablishing'),  { ssr: false })
const FMInteractive   = dynamic(() => import('./FMInteractive'),   { ssr: false })
const FMAIReactivated = dynamic(() => import('./FMAIReactivated'), { ssr: false })

const TEAL = '#2A6F7A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Discover / Define',
    note: 'Mapping the actual structure of the current experience or process before reframing it: understanding how something really works today, including the parts that accreted by accident, is the diagnostic precondition for defining the right problem to solve.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Empathize / Define',
    note: 'Understanding how the thing really works for the people using it, not just how the spec says it works. The real flow, with its workarounds, dead ends, and undocumented branches, is part of what empathizing with users actually means. The Define phase cannot set a precise problem statement without knowing what the current structure actually contains.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery',
    note: 'Mapping the existing system before changing it. Teams trying to improve a product or process without understanding its actual branching structure, including the undocumented paths, will write backlog items against a system that does not exist. Discovery is where the real topology is established.',
  },
  {
    slug: 'fde',
    name: 'Front-End of Innovation',
    phase: 'Opportunity Identification',
    note: 'Structural complexity in the current state is often where opportunity hides. A flow map that exposes a twelve-step path that should be three, or a dead end that explains a category of customer complaints, is not just a diagnostic: it is an opportunity specification. The complexity itself is the target.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'journey-mapping',
    name: 'Journey Mapping',
    rel: 'The closest sibling in this group, and the distinction between them is the point. A journey map is a LINEAR NARRATIVE of the customer\'s EXPERIENCE over time: what happens, how it feels, where the emotion rises and falls, where the pain is. A flow map is the BRANCHING STRUCTURE underneath: every path, fork, dead end, and loop. Journey = the story and the emotion; flow = the topology and the mechanics. A journey map cannot show you seventeen paths. A flow map cannot tell you how any of them feel. They are most useful together: the flow map exposes the structural pathologies; the journey map explains what those pathologies mean for the person experiencing them.',
  },
  {
    slug: 'service-blueprinting',
    name: 'Service Blueprinting',
    rel: 'A closely related but distinct lens. A blueprint shows the LAYERS of a service (frontstage customer actions, backstage staff actions, support processes) and how they connect vertically across those layers. A flow map shows the BRANCHING PATHS through the service horizontally: how many routes there are, where they fork, where they lead. Blueprint = the depth (what is behind each step); flow = the breadth (how many routes, where they go, what pathologies have accreted). The two are complementary: blueprint a service to understand how it is delivered; flow-map it to understand how many ways there are to traverse it.',
  },
  {
    slug: 'ecosystem-mapping',
    name: 'Ecosystem Mapping',
    rel: 'A different unit of analysis entirely. Ecosystem mapping maps ACTORS and the value that flows between them: the web of players and relationships a problem sits inside. Flow mapping maps PATHS through a specific product or process: the topology of how something works mechanically. Ecosystem mapping zooms out to the system; flow mapping zooms in to the structure of one piece of it.',
  },
  {
    slug: 'contextual-observation',
    name: 'Contextual Observation',
    rel: 'The natural companion for finding the undocumented reality. The workarounds people actually use, the shortcuts, the paths that appear on no documentation: these are found by watching people work in their actual context, not by reading documentation or asking them to describe their process. People routinely describe the official process while doing something different, often without realizing it. Contextual observation closes the same official-version-versus-reality gap that makes flow mapping necessary.',
  },
  {
    slug: null,
    name: 'Downstream redesign and delivery planning',
    rel: 'The sprawl a flow map exposes is the diagnostic input to the design work that follows. Flow mapping describes what exists, including everything that accreted by accident. Designing the ideal future structure (simplifying the tangle, eliminating dead ends, closing loops, consolidating redundant paths) is the separate work that comes after. Flow mapping is the precondition for that redesign, not the redesign itself. Note: flow mapping is deliberately a CURRENT-STATE diagnostic. It maps what exists, with all its unintended complexity. Designing the ideal future structure is the design work that follows, and it is not this method.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FlowMappingPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          S1 - Header / Identity + Establishing visual   DARK
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
              Flow Mapping
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Mapping the actual branching structure of how a product or process works today: every path, fork, dead end, and loop, so you can see the complexity that has quietly accumulated.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Nobody designed the seventeen paths through your product. They accumulated. A flow map is how you finally see them.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <FMEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>What it is</SectionLabel>
            <SectionHeadingLight>A diagnostic of the current-state topology: every path, every fork, every place the thing has quietly become more complicated than anyone intended.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Flow mapping exposes the actual branching structure of how a product or process works
                right now. You trace every path a person can take: each step, each decision point, each
                fork, and you follow every branch through to where it ends. The output is a map of the
                topology, the shape of the thing, showing not a story about the experience but the
                mechanical structure underneath it: how many ways in, how many paths through, where they
                split, where they rejoin, where they stop.
              </Body>
              <Body>
                What it reveals is almost always complexity nobody intended. Products and processes are
                not designed once and left alone; they accrete. A branch is added for an edge case, a
                workaround becomes a permanent path, a special flow is built for one segment and never
                removed. Over years, this accumulation produces a structure nobody has ever seen whole,
                and which nobody would have designed on purpose: a twelve-step path that should be three,
                a branch that leads nowhere, a loop that quietly traps people, seven different ways to
                accomplish the same thing. The flow map is how that sprawl becomes visible, because you
                cannot fix a tangle you have never actually looked at.
              </Body>
              <Body>
                This is a diagnostic of the CURRENT state, and that scope matters. Flow mapping is not
                about designing the ideal future structure; that is the design work that comes after,
                and it is a different activity. It is about seeing, honestly and completely, what exists
                today, including the parts that exist only because of history and accident. And crucially,
                the real flow is almost never the documented flow: the map must capture the workarounds
                people actually use, the undocumented branches, the paths that were never written down.
                The documented version is a story the organization tells itself. The real flow is what
                people do.
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
            <SectionLabel accent={TEAL}>The branching topology</SectionLabel>
            <SectionHeadingDark>Trace the paths. The tangle is the finding.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click any node, any pathology, or any loop to see what it is and why it matters. The
              paths in teal are the documented flow. The amber elements are what the documentation
              does not show: the dead end, the loop, the unintended branch, the redundant route.
            </p>
            <FMInteractive />
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
            <SectionHeadingLight>When you need to see the structure honestly, before changing it.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: TEAL }}>
                  Use Flow Mapping when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'A product or process has grown complicated over time and nobody can actually describe how it works end to end.',
                    'You suspect complexity has accreted (many paths, special cases, workarounds) but cannot yet point to where.',
                    'You are about to redesign or simplify something and need an honest picture of what exists before you change it.',
                    'People are getting stuck, abandoning, or complaining that something is confusing, and you need to find the structural cause.',
                    'You are onboarding into an unfamiliar system and need to understand its actual shape.',
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
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Do not lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You want to understand how the experience FEELS over time: that is journey mapping. A flow map shows structure, not emotion.',
                    'You want to understand the operational layers behind a service (frontstage, backstage, support): that is service blueprinting.',
                    'The thing is genuinely simple; mapping a three-step linear process produces a three-step linear diagram and no insight.',
                    'You intend to map only the documented flow. A flow map of the official version mostly reproduces the organization\'s own story back to it, missing exactly the accreted mess you were looking for.',
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
              style={{ background: 'var(--color-warm-100)', borderLeft: '3px solid var(--color-neutral-300)' }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: a flow map shows you the structure, not why it got that way, and not
                what to do about it. It is a diagnostic, but the sprawl it exposes
                still has to be understood (each branch usually had a reason) and then redesigned, which
                is separate work. Its most common failure is mapping the flow as documented rather than
                as lived, which produces a tidy diagram that hides exactly the accreted mess you were
                looking for.
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
            <SectionHeadingLight>Six moves, from bounding the flow to reading its shape as a whole.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Define the boundaries of the flow.',
                  body: 'Decide what you are mapping and where it starts and ends: a specific product flow, a process from trigger to outcome. An unbounded flow map sprawls without producing insight. Choose a defined flow with a clear start and end, and then trace it exhaustively, including every branch. A narrow flow mapped completely is far more valuable than a broad one mapped superficially.',
                },
                {
                  n: '02',
                  title: 'Trace every path, not just the happy path.',
                  body: 'Start at the entry point and follow each route through, taking every fork. The happy path is the one everyone already knows; the value is in the branches, the edge cases, the exceptions, and the alternate routes. The sprawl hides in the things that were not supposed to be there but are.',
                },
                {
                  n: '03',
                  title: 'Find the undocumented reality.',
                  body: 'This is the crucial step and the one that separates a real flow map from a diagram. Talk to the people who actually use or operate the thing, and where possible watch them do it, to find the workarounds, the shortcuts, the paths that appear on no documentation. The real flow is what people do, not what the spec says. People routinely describe the official process while doing something different, often without noticing.',
                },
                {
                  n: '04',
                  title: 'Mark every decision point and fork.',
                  body: 'Where does the path split, and on what condition? Decision points are where complexity multiplies, and mapping them precisely is what turns a vague sense of "it\'s complicated" into a specific, countable structure. Naming the condition at each fork is as important as drawing the fork.',
                },
                {
                  n: '05',
                  title: 'Flag the pathologies explicitly.',
                  body: 'Identify the dead ends, the loops, the redundant paths to the same outcome, and the branches that exist only for historical reasons. Naming them explicitly (DEAD END, LOOP, UNINTENDED BRANCH, REDUNDANT PATH) is what makes the map actionable. A tangle that has been named is undeniable in a way that a vague sense of complexity is not.',
                },
                {
                  n: '06',
                  title: 'Read the shape, then hand off to redesign.',
                  body: 'Step back and read the topology as a whole: how many paths, how deep, how tangled, where the sprawl clusters. Count the decision points, count the paths to each outcome, count the steps on the longest route. This diagnosis is the deliverable. Designing the simpler future structure is the next, separate piece of work, informed by, but not the same as, this map.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(42,111,122,0.12)', lineHeight: 1.1, width: 40 }}>
                    {n}
                  </span>
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

      {/* ─────────────────────────────────────────────────────────
          S7 - Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the mistakes that quietly undermine it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'Every path is traced, not just the happy path. The branches and edge cases are where the finding lives.',
                'The map captures the UNDOCUMENTED reality, the workarounds, shortcuts, and paths people actually take, not just the official version.',
                'Decision points and forks are marked precisely, turning "it feels complicated" into a specific, countable structure.',
                'The pathologies (dead ends, loops, redundant paths, accreted branches) are explicitly flagged, which makes the map actionable rather than merely descriptive.',
                'The map is read as a whole: the SHAPE of the thing is itself the diagnosis.',
                'The team resists fixing it while mapping. The diagnostic comes first, honestly; the redesign is separate work.',
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
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              The mistakes, and how to avoid them
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: 'Mapping the documented flow instead of the real one.',
                  fix: 'The most common and most damaging failure: you produce a tidy diagram of the official version and miss exactly the accreted mess you were looking for. The documented flow is a starting hypothesis, not the map. Go find the workarounds.',
                },
                {
                  mistake: 'Only mapping the happy path.',
                  fix: 'The happy path is the part everyone already understands. The sprawl hides in the branches, the exceptions, and the alternate routes. If your map has one path through the flow, you have mapped the spec, not the system.',
                },
                {
                  mistake: 'Drifting into redesign while mapping.',
                  fix: 'The temptation to fix the flow as you draw it corrupts the diagnostic. Map what IS, honestly and completely; design the future structure afterwards, as separate work. Conflating the two produces a map of what you wish existed rather than what does.',
                },
                {
                  mistake: 'Mapping something already simple.',
                  fix: 'A flow map of a genuinely linear three-step process produces a three-step diagram and no insight. Reserve it for things suspected of tangled complexity: products or processes that have grown over time, that people complain about as confusing, or that nobody can fully describe.',
                },
                {
                  mistake: 'Treating the map as the answer.',
                  fix: 'The map is a diagnosis, not a prescription. Each branch usually had a reason; understanding why the sprawl accreted is part of deciding what to do about it. The map exposes the tangle. Understanding and redesigning it is the work that follows.',
                },
              ].map(({ mistake, fix }) => (
                <div key={mistake} className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
                  <p className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {mistake}
                  </p>
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
            <SectionHeadingLight>Get the people who actually use and operate the thing. Watch them. Make the map big enough to be seen whole.</SectionHeadingLight>

            <div className="flex flex-col gap-7">
              {[
                {
                  label: 'Get the people who actually use and operate the thing',
                  body: 'The undocumented reality lives with the people doing the work: the frontline staff who invented the workaround, the users who found the shortcut, the support team who knows where people get stuck. Their knowledge is the difference between a real flow map and a pretty diagram. No single documentation source contains the full real flow.',
                },
                {
                  label: 'Watch, do not just ask',
                  body: 'People routinely describe the official process while actually doing something different, often without realizing it. Where you can, observe the flow being used rather than relying on descriptions. This is the same official-version-versus-reality gap that contextual observation exists to close, and it applies here with particular force.',
                },
                {
                  label: 'Bound it, then go deep',
                  body: 'Choose a defined flow with a clear start and end, and then trace it exhaustively: every branch, every fork. A narrow flow mapped completely is far more valuable than a broad one mapped superficially. Resist the temptation to expand the scope; resist equally the temptation to stop at the documented paths.',
                },
                {
                  label: 'Make the map big and visible',
                  body: 'Flow maps get large, and their value comes from being seen whole. Give the map room, on a wall or a large digital canvas, so the shape (which is the finding) is legible at a glance. Common formats include whiteboards and digital canvases such as Miro, Mural, Figma, or Lucidchart, named as common examples, not endorsements. The tool is irrelevant; the completeness is everything.',
                },
                {
                  label: 'Count things',
                  body: 'Quantify the sprawl: how many paths, how many decision points, how many steps on the longest route, how many distinct ways to reach the same outcome. Numbers make an accreted mess undeniable in a way that a drawing alone sometimes does not. "Seven different ways to complete this task" is harder to dismiss than a diagram showing seven lines.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(42,111,122,0.28)', marginTop: 4 }}
                  />
                  <div>
                    <p className="font-semibold mb-1"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                      {label}
                    </p>
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
            <SectionLabel accent={TEAL}>How AI is evolving this method</SectionLabel>
            <SectionHeadingDark>AI will draw your flow diagram in seconds. It will draw the flow you described, which is exactly the one that is not real.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI contributes real drafting speed, and where it is structurally blind at exactly the moment this method most needs sight.
            </p>
            <FMAIReactivated />
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
            <SectionHeadingLight>A fifteen-year-old insurance claims process, mapped two ways.</SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              The same process, with the same documentation available in both cases. The difference is
              whether the team traced the REAL flow, by watching claims handlers work and following
              actual claims through the system, or generated a diagram from the documentation alone.
            </p>
            <FMExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Used in these frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Used in these frameworks</SectionLabel>
            <SectionHeadingLight>Where Flow Mapping shows up: at the understand-and-define moments where the current state must be seen honestly.</SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              Flow mapping is a current-state diagnostic, so it maps to the discover-and-define moments
              in each framework: the points where understanding the actual structure of something
              today is the precondition for changing it well.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link key={slug} href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <span className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}>
                    {name}
                  </span>
                  <span className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-2xs)', color: TEAL, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {phase}
                  </span>
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
            <SectionHeadingLight>Flow Mapping in context, and the distinctions that make each method irreplaceable.</SectionHeadingLight>

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
                  title:  'Mapping Experiences',
                  author: 'James Kalbach',
                  year:   '2016',
                  note:   'The definitive guide to the diagrams that map experiences, journeys, and flows, and how to choose between them. Covers journey maps, service blueprints, experience maps, and process diagrams with particular clarity on what each reveals and what each misses: essential background for understanding when to reach for a flow map versus any of the adjacent methods.',
                },
                {
                  title:  'This Is Service Design Doing',
                  author: 'Marc Stickdorn, Markus Hormess, Adam Lawrence, and Jakob Schneider',
                  year:   '2018',
                  note:   'For mapping how services actually operate in practice, including the process-mapping and service-blueprinting methods that complement and intersect with flow mapping. The sections on research in context, watching people work, are directly relevant to the method\'s most important discipline: finding the undocumented reality.',
                },
                {
                  title:  'Learning to See',
                  author: 'Mike Rother and John Shook',
                  year:   '1999',
                  note:   'The lean classic on mapping the current-state flow of a process before improving it. The central argument, that you must see what is actually there, including every step, every wait, and every path, before you can design the future state, is the same discipline flow mapping applies to products and service processes. The current-state / future-state framing is directly portable.',
                },
              ].map(({ title, author, year, note }) => (
                <div key={title} className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}>
                  <div className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(42,111,122,0.30)' }}
                  />
                  <div>
                    <p className="font-semibold"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                      <em>{title}</em>
                    </p>
                    <p className="mb-1"
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                      {author} ({year})
                    </p>
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

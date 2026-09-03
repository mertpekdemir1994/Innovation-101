import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import JMExampleToggle from './JMExampleToggle'
import JMBoundarySection from './JMBoundarySection'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Journey Mapping — Methods — Innovation 101',
}

const JMEstablishing  = dynamic(() => import('./JMEstablishing'),  { ssr: false })
const JMInteractive   = dynamic(() => import('./JMInteractive'),   { ssr: false })
const JMModularity    = dynamic(() => import('./JMModularity'),    { ssr: false })
const JMAIReactivated = dynamic(() => import('./JMAIReactivated'), { ssr: false })

const TEAL = '#2A6F7A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  { slug: 'double-diamond',   name: 'Double Diamond',   phase: 'Define',           note: 'Journey Mapping synthesizes research into the experience to be improved: the primary Define artifact.' },
  { slug: 'lean-startup',     name: 'Lean Startup',     phase: 'Learn',            note: 'Journey maps surface the experience behind the metrics, giving texture to quantitative signals.' },
  { slug: 'agile-innovation', name: 'Agile Innovation', phase: 'Discovery Sprint', note: 'Grounds the backlog in the real experience arc, not just individual feature requests.' },
  { slug: 'fde',              name: 'FDE',               phase: 'Extract',          note: 'Maps the customer\'s end-to-end experience to identify which problems generalize to a product.' },
  { slug: 'design-thinking',  name: 'Design Thinking',  phase: 'Empathize',        note: 'Journey Mapping is a primary Empathize artifact, turning research into a full experience picture.' },
]

const RELATED_METHODS = [
  { slug: 'the-5es',              name: 'The 5Es Framework',     rel: 'The fixed-phase evaluation counterpart. Journey Mapping uses flexible stages; the 5Es applies a standard five-phase lens. See "Where it ends" above.' },
  { slug: 'service-blueprinting', name: 'Service Blueprinting',  rel: 'Extends the journey into backstage operations below the line of visibility. Start with the journey map; add a blueprint when you need to redesign the operations behind it.' },
  { slug: 'in-depth-interviews',  name: 'In-Depth Interviews',   rel: 'The primary research source a journey map is built from. The map is the synthesis; interviews are the evidence.' },
  { slug: 'contextual-observation', name: 'Contextual Observation', rel: 'Following real people through the actual experience is how the truest journey maps, and their hidden gaps, are found.' },
  { slug: 'empathy-mapping',      name: 'Empathy Mapping',        rel: 'A companion synthesis tool. Empathy maps deepen the understanding of the person at a single moment; journey maps show the arc over time.' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JourneyMappingPage() {
  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          S1 - Header / Identity   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <Container className="relative z-10 w-full flex flex-col justify-center flex-1">
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
              Journey Mapping
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A visual, end-to-end map of a person&rsquo;s experience over time, revealing the highs, lows, and gaps that no single moment shows.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The whole experience on one picture, including the silent gaps between touchpoints where the real problems usually hide.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <JMEstablishing />
        </div>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>What it is</SectionLabel>
            <SectionHeadingLight>The whole experience on one picture, including the silent gaps.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                A journey map visualizes the complete experience a person has with a product, service, or organization, laid out as a sequence of stages over time, with what they do, think, and feel at each stage. Its power is that it makes the whole experience visible at once. Individual teams each own their slice of an experience and each can make their slice look fine; the journey map is what reveals the friction, the emotional lows, and above all the gaps between touchpoints that no single-moment analysis would ever catch. It turns a fragmented set of interactions into a single, shared, navigable picture an entire organization can stand around and point at.
              </Body>
              <Body>
                The signature of a journey map is the emotional line, the rising and falling curve of how the person feels as they move through the experience. More than any other element, that curve is where the insight lives, because the lowest point on it is almost never where a team expects, and it is usually somewhere the team does not own: in the gaps, the handoffs, the silence between one department&rsquo;s touchpoint and the next.
              </Body>
              <Body>
                Crucially, Journey Mapping is not one rigid artifact. It is a modular, flexible method that flexes to the question you are asking. The next sections make that concrete.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S4 - Interactive signature visual   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>The journey</SectionLabel>
            <SectionHeadingDark>Walk the experience. Click any stage.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              As you click across the stages, the emotion line tells its story. Pay attention to where it dips, and look for the orange gap marker, which sits between stages, not at one.
            </p>
            <JMInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A synthesis tool for multi-step, multi-touchpoint experiences.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: TEAL }}>
                  Use Journey Mapping when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'An experience spans multiple steps, channels, or touchpoints and you need to see the whole arc, not just a single interaction.',
                    'You suspect the problem lives in the handoffs and gaps between touchpoints rather than in any one of them.',
                    'You need a shared picture an entire cross-functional team can align around, especially when each team currently only sees their own slice.',
                    'You are designing a future-state experience and need to see the current-state lows you must fix before you can build the ideal.',
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
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Do not lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The experience is a single screen or one-moment interaction: there is no journey to map.',
                    'You need the operational, behind-the-scenes view of how a service is delivered. That is Service Blueprinting (see "Where it ends" below).',
                    'You need a fixed phase-by-phase evaluation lens applied consistently across experiences. That is the 5Es Framework (see "Where it ends" below).',
                    'You have not done research. A journey map built from assumption is a confident diagram of the team\'s wishful thinking, worse than no map, because it looks authoritative.',
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

            <div
              className="max-w-prose mx-auto rounded-lg p-5 mt-10"
              style={{ background: 'var(--color-warm-100)', borderLeft: '3px solid var(--color-neutral-300)' }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: a journey map is only as true as the research behind it. Built from assumption rather than from real people&rsquo;s experience, it becomes a tidy diagram of what the team wishes happened, which is worse than no map at all because it looks authoritative.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S6 - How it works   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, in order.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Set the scope and the subject.',
                  body: 'Decide whose journey, over what span, in what state. These choices are the method\'s modularity, covered in the next section. The decision matters before you draw a single lane: a customer journey map, an experience map, and an emotion map each answer a different question even though they look similar on the surface.',
                },
                {
                  n: '02',
                  title: 'Lay out the stages in sequence.',
                  body: 'From before the person engages, through the core experience, to after. Crucially, include the before and after: experiences do not begin at first contact or end at purchase. The bookend stages are where some of the highest-value opportunities live.',
                },
                {
                  n: '03',
                  title: 'Populate the lanes.',
                  body: 'For each stage, capture what the person does, thinks, and feels, grounded in real research. Add only the lanes the question needs. More lanes is not more insight; an overloaded map is unreadable and gets ignored.',
                },
                {
                  n: '04',
                  title: 'Draw the emotion line.',
                  body: 'Trace the rising and falling curve of how the person feels across the stages. This is the single most important step; the curve is where the insight is. Do not skip it or treat it as decoration.',
                },
                {
                  n: '05',
                  title: 'Find the lows and the gaps.',
                  body: 'Identify the deepest emotional dip and, critically, the gaps between stages. The lowest point is often not at a stage at all, but in the silence between departments, between touchpoints, between one team handing off and the next picking up. These gaps are where the highest-value design opportunities hide.',
                },
                {
                  n: '06',
                  title: 'Decide current or future.',
                  body: 'A current-state map diagnoses what is. A future-state map designs what should be. Often you build both, the second as the explicit answer to the first. Keeping them as two distinct artifacts makes the gap between the current and the desired experience visible and actionable.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(42,111,122,0.12)', lineHeight: 1.1, width: 40 }}
                  >
                    {n}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
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

      {/* ────────────────────────────────────────────────────────────
          S7 - Versions & Modularity   DARK   [ADDED]
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Versions &amp; modularity</SectionLabel>
            <SectionHeadingDark>One method, dialed many ways. Toggle the swimlanes.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Journey Mapping is not a fixed artifact. Toggle lanes on and off to feel the flexibility directly: a quick three-lane sketch and a deep six-lane analysis are the same method, dialed differently.
            </p>
            <JMModularity />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S8 - Best practices   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and what prevents it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The emotion line reveals a low the team had genuinely underestimated, often somewhere they were not looking, and usually in a gap rather than at a stage.',
                'The map exposes handoffs and silences that the individual teams owning each touchpoint could not see on their own.',
                'It is built from real research: interviews, observation, and real users followed through the actual system, not from the team\'s assumptions about what happens.',
                'The before and after stages are included, because the experience does not begin at first contact or end at the transaction.',
                'The map becomes a shared reference the whole organization points at, not a document one team files away after the project ends.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: TEAL, flexShrink: 0, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              The mistakes, and how to avoid them
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: 'Mapping the idealized process, not the real one.',
                  fix: 'Teams map how the experience is supposed to go. The value is in mapping how it actually goes, with all its friction, waiting, and silence. If the map looks perfect, it is probably not real.',
                },
                {
                  mistake: 'Leaving out the emotion line.',
                  fix: 'A journey map without the emotion line is just a process flow. The feeling curve is where the design opportunities live. Without it, the map describes what happens but not whether it matters.',
                },
                {
                  mistake: 'Omitting the gaps between stages.',
                  fix: 'The lowest point is often between stages, in the silence and the handoffs. A map that only shows what happens at each stage misses exactly where the problem usually is.',
                },
                {
                  mistake: 'Building from assumption.',
                  fix: 'An unresearched map is a confident diagram of the team\'s wishful thinking. Ground every lane in evidence: interviews, observation, real users followed through the system.',
                },
                {
                  mistake: 'Adding every lane by default.',
                  fix: 'More lanes is not more insight. Add only the lanes the question needs. An overloaded map is unreadable, and an unreadable map does not get used.',
                },
              ].map(({ mistake, fix }) => (
                <div
                  key={mistake}
                  className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
                >
                  <p className="font-semibold mb-1" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
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

      {/* ────────────────────────────────────────────────────────────
          S9 - Logistics   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Logistics</SectionLabel>
            <SectionHeadingLight>Getting the inputs right, then using them well.</SectionHeadingLight>
            <Body>
              A good journey map is downstream of good research. The richest maps are built from in-depth interviews and from following real people through the actual experience. Plan the research before the mapping session; the map is a synthesis artifact, not a substitute for talking to people.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Getting the inputs',
                  body: 'In-depth interviews and contextual observation are the usual primary sources. Aim to follow real people through the complete experience end to end, not just interview them about it afterward, memory flattens the gaps and the silences that matter most.',
                },
                {
                  label: 'Running the mapping session',
                  body: 'Journey mapping is usually a collaborative workshop. Get the cross-functional team in one room, or one shared digital canvas, so the people who each own a slice of the experience see the whole thing together, often for the first time. The shared "oh, that is what happens after we hand them off" moment is half the value.',
                },
                {
                  label: 'Current then future',
                  body: 'A common sequence is to build the current-state map first (diagnose), then build a future-state map (design) as the answer. Keep them as two distinct artifacts so the gap between the current experience and the desired one is visible and stays explicit.',
                },
                {
                  label: 'Tools',
                  body: 'Journey maps are built on whiteboards and sticky notes in person, or on digital collaboration canvases for distributed teams. The tool matters less than the conversation: what matters is that the map is built together, by the people who will use it.',
                },
                {
                  label: 'Keeping it alive',
                  body: 'A journey map dating from a single project quietly goes stale as the experience changes. The most useful maps are revisited and updated, treated as a living reference rather than a one-time deliverable.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-0.5 shrink-0 rounded-full" style={{ background: 'rgba(42,111,122,0.28)', marginTop: 4 }} />
                  <div>
                    <p className="font-semibold mb-1" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
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

      {/* ────────────────────────────────────────────────────────────
          S10 - How AI is evolving this method   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI can assemble the map in minutes. It still cannot feel the low point for you.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI contributes across the journey map: what it accelerates, and what it flattens. Notice what happens to the emotion line.
            </p>
            <JMAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S11 - In-depth example   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same scenario, mapped two ways.</SectionHeadingLight>
            <p className="mb-10" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              A hospital redesigns its cancer care pathway. The same team, the same experience: once with traditional journey mapping grounded in human research, once using AI to synthesize the map from existing data. The contrast reveals what the two approaches catch and what they miss.
            </p>
            <JMExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S12 - Where it ends: neighboring methods   DARK   [ADDED]
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Where it ends</SectionLabel>
            <SectionHeadingDark>Journey Mapping stops here, and what to use instead.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              A good journey map knows its own edges. Two neighboring methods add territory Journey Mapping deliberately leaves out. Understanding where to stop is what lets you use all three well, together.
            </p>
            <JMBoundarySection />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S13 - Used in these frameworks   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Journey Mapping shows up.</SectionHeadingLight>
            <p className="mb-8" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              Journey Mapping is one of the most widely used synthesis methods; it appears wherever a framework turns raw research into a picture of the full experience arc.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link
                  key={slug}
                  href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <span className="font-semibold shrink-0" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}>
                    {name}
                  </span>
                  <span className="font-mono shrink-0" style={{ fontSize: 'var(--text-2xs)', color: TEAL, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {phase}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-6" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontStyle: 'italic' }}>
              Note: The Design Sprint typically imports an existing journey map or persona rather than building one fresh in five days, and FDE uses embedded observation rather than workshop-based mapping. These reflect real differences in how the method is used within each framework.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S14 - Related methods   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with Journey Mapping.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <Link
                  key={slug}
                  href={`/methods/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)' }}
                >
                  <span className="font-semibold shrink-0" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}>
                    {name}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S15 - Sources & further reading   LIGHT
          ──────────────────────────────────────────────────────────── */}
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
                  note:   'The definitive reference on journey mapping, experience mapping, and alignment mapping. The best single source on the method\'s modularity, its different forms (customer journey, experience map, mental model diagram), and how to choose between them.',
                },
                {
                  title:  'This Is Service Design Doing',
                  author: 'Marc Stickdorn, Markus Hormess, Adam Lawrence, and Jakob Schneider',
                  year:   '2018',
                  note:   'Journey mapping within service design practice, including the relationship between journey maps and service blueprints, and the role of both in designing service experiences.',
                },
                {
                  title:  'This Is Service Design Thinking',
                  author: 'Marc Stickdorn and Jakob Schneider',
                  year:   '2011',
                  note:   'The foundational treatment of journey mapping as a service design tool, with the original framing that established much of the method\'s current vocabulary.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(42,111,122,0.30)' }} />
                  <div>
                    <p className="font-semibold" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                      <em>{title}</em>
                    </p>
                    <p className="mb-1" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
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

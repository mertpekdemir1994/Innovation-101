import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import FiveEsExampleToggle from './FiveEsExampleToggle'
import FiveEsBoundarySection from './FiveEsBoundarySection'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'The 5Es Framework · Methods',
}

const FiveEsEstablishing  = dynamic(() => import('./FiveEsEstablishing'),  { ssr: false })
const FiveEsInteractive   = dynamic(() => import('./FiveEsInteractive'),   { ssr: false })
const FiveEsAIReactivated = dynamic(() => import('./FiveEsAIReactivated'), { ssr: false })

const TEAL = '#2A6F7A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  { slug: 'double-diamond',   name: 'Double Diamond',   phase: 'Define',           note: 'Evaluating the current or proposed experience through all five phases during the Define stage, particularly to surface which bookends are structurally neglected before the develop phase begins.' },
  { slug: 'design-thinking',  name: 'Design Thinking',  phase: 'Define',           note: 'The 5Es structures the definition of an experience problem by surfacing which phases are under-designed and which are being over-invested at the expense of the bookends.' },
  { slug: 'agile-innovation', name: 'Agile Innovation', phase: 'Discovery Sprint', note: 'Applied during discovery sprints to quickly evaluate an experience for bookend gaps before prioritizing which phase to invest in.' },
  { slug: 'design-sprint',    name: 'Design Sprint',    phase: 'Monday',           note: 'Used on Monday to map the existing experience and identify where the bookend failure is before committing the sprint to a design direction.' },
]

const RELATED_METHODS = [
  { slug: 'journey-mapping',        name: 'Journey Mapping',         rel: 'The natural complement. Use the 5Es to identify which bookend phase is most neglected, then use Journey Mapping to go deep on that zone: flexible stages, emotion line, full narrative of the specific moment. See the boundary section above.' },
  { slug: 'service-blueprinting',   name: 'Service Blueprinting',    rel: 'When a bookend problem turns out to be an operational problem (the Exit is bad because a backstage handoff fails), a Service Blueprint maps the machine behind the experience that is producing the symptom. See the boundary section above.' },
  { slug: 'in-depth-interviews',    name: 'In-Depth Interviews',     rel: 'The primary research method for populating the bookend phases with real evidence. Especially valuable for Entice (what motivated the person to begin), Exit (what they remember and feel afterward), and Extend (what brings them back).' },
  { slug: 'contextual-observation', name: 'Contextual Observation',  rel: 'Observing the Enter and Exit moments in context (arriving, beginning, leaving) often reveals what surveys cannot. The anxiety of entering and the abruptness of exiting are visible in real behavior but rarely reported in self-administered research.' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FiveEsFrameworkPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          S1 - Header / Identity   DARK
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
              The 5Es Framework
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A fixed five-phase lens (Entice, Enter, Engage, Exit, Extend) for evaluating an experience and making sure the neglected bookends get designed, not just the core.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}
            >
              Most teams pour everything into the middle of an experience and neglect how it begins and ends. The 5Es exists to stop that.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <FiveEsEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>What it is</SectionLabel>
            <SectionHeadingLight>A fixed evaluation lens that forces attention onto the phases teams routinely skip.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                The 5Es Framework applies five fixed phases to any experience: Entice, Enter, Engage, Exit, and Extend. The phases are always the same; what changes is what you find inside each one. The framework exists to solve a specific and near-universal problem: teams over-invest in the middle of an experience and under-invest in the bookends that begin and end it. The 5Es makes those bookends impossible to skip.
              </Body>
              <Body>
                Its design is deliberately structural. Unlike a journey map, which shapes its stages to fit the specific experience being mapped, the 5Es applies the same five lenses every time. That consistency is the point: it prevents the team from creating a map that confirms where they already spend their time. Engage will almost always look strong. Entice, Exit, and Extend will almost always reveal neglected territory, and the framework forces you to look at them regardless.
              </Body>
              <Body>
                The method was developed in the context of retail experience design and has since been applied across services, digital products, events, hospitality, and member-based organizations. It is not a narrative tool: it does not capture the emotional arc of a single person&rsquo;s journey. It is an evaluation tool, a structured lens for assessing an experience phase by phase and identifying which phases have been designed and which have been assumed.
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
            <SectionLabel accent={TEAL}>The five phases</SectionLabel>
            <SectionHeadingDark>Click a phase to see what to evaluate in it.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              The bar chart shows where teams typically invest their design attention. The phases with amber markers are the bookends teams most often skip. The core is where almost all the attention goes.
            </p>
            <FiveEsInteractive />
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
            <SectionHeadingLight>A diagnostic tool for experiences where the middle works and the edges do not.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: TEAL }}
                >Use the 5Es when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The core experience scores well but retention, return visits, or word-of-mouth are weak: the classic bookend-neglect pattern.',
                    'You want a fast, structured evaluation of an experience before deciding where to invest design effort.',
                    'You need a consistent lens that the whole team will apply the same way, regardless of where their instincts lead.',
                    'You suspect the team is pouring resources into Engage while Entice, Exit, and Extend have never been formally designed at all.',
                    'You need to evaluate multiple experiences or locations with a consistent benchmark rather than a bespoke journey map each time.',
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
                    'You need a deep narrative of a specific person\'s emotional journey through a specific experience. Use Journey Mapping, which shapes its stages to the experience and adds an emotion line.',
                    'You need to diagnose an operational or backstage failure: why the service breaks rather than what the customer experiences. Use Service Blueprinting.',
                    'The experience genuinely has no bookend phases, for instance a single discrete transaction with no before or after. The 5Es will produce thin or empty phases.',
                    'You need primary evidence rather than a structured evaluation. The 5Es organizes what you know; it does not replace going and finding out.',
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
                The honest limit: the 5Es tells you which phases are neglected, not why they are. Identifying that Exit is undesigned is a finding; understanding what to do about it requires research. Use the framework to direct attention, then follow that attention with real fieldwork.
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
            <SectionHeadingLight>Five moves, in order, with the bookends first.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Scope the experience.',
                  body: 'Agree on what counts as the full experience you are evaluating. Where does it start: from the first moment of awareness, or from the moment of arrival? Where does it end: when the person leaves, or months later when they decide whether to return? Defining the edges before you begin prevents the team from unconsciously scoping out the bookends.',
                },
                {
                  n: '02',
                  title: 'Evaluate Entice.',
                  body: 'How do people become aware of and motivated to begin the experience? Is the promise clear and honest? Does it set the right expectation for what follows? Does it attract the right people? Teams often have little evidence here because pre-arrival awareness leaves few measurable signals. Treat that absence of evidence as information.',
                },
                {
                  n: '03',
                  title: 'Evaluate Enter.',
                  body: 'What are the first moments like, from the instant of arrival through the beginning of full engagement? Does the opening reduce or increase anxiety? Is the transition smooth and welcoming, or confusing and intimidating? First impressions here color everything that follows, including the perception of Engage, regardless of how good Engage actually is.',
                },
                {
                  n: '04',
                  title: 'Evaluate Engage.',
                  body: 'How well is the core value being delivered? This is the phase teams know best and have already invested in most heavily. Evaluate it honestly, but spend proportionally less time here than on the bookends. The 5Es framework asks you to resist the gravitational pull toward the thing you already understand.',
                },
                {
                  n: '05',
                  title: 'Evaluate Exit.',
                  body: 'How does the experience conclude and the person leave? Is the ending graceful and intentional, or abrupt and forgotten? The ending disproportionately shapes what people remember: the peak-end effect. An undesigned exit is one of the most reliable causes of good experiences being remembered as mediocre ones.',
                },
                {
                  n: '06',
                  title: 'Evaluate Extend.',
                  body: 'What happens after the person leaves to sustain the relationship and earn a return? Is there anything, or does the relationship go dark? This is the most commonly neglected phase of all. Most teams have never designed it; they have only assumed it. The absence of an Extend phase is not a neutral state: it is the experience of abandonment.',
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
                'The bookend phases are populated with real evidence (interviews, observation, or logged data) rather than team assumption. The framework only reveals what you have actually looked at.',
                'The Engage phase is covered quickly and allocated proportionally less workshop time than the bookends, because the team already knows it best.',
                'The evaluation starts from scoped boundaries that include the earliest pre-arrival moment (Entice) and the latest post-departure moment (Extend).',
                'Each phase produces a clear verdict: designed deliberately, addressed but not designed, or never touched. The goal is to find the never-touched phases.',
                'The session produces specific interventions for the weakest bookend phases (concrete things to design or research), not just a finding that the bookends are weak.',
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
                  mistake: 'Spending most of the session on Engage.',
                  fix: 'The pull toward the familiar is nearly gravitational. Set an explicit time budget per phase before the session begins, and enforce proportionally more time on the bookends. Engage can usually be covered in a fraction of the time because it is already well understood.',
                },
                {
                  mistake: 'Scoping out the bookends at the start.',
                  fix: 'Teams often define the experience as starting at the front door and ending when the person leaves, accidentally removing Entice and Extend from scope before the evaluation begins. Scope the experience before the session and include the full bookend territory.',
                },
                {
                  mistake: 'Running the 5Es without evidence for the bookends.',
                  fix: 'A 5Es session built from team knowledge will confirm what the team already believes, which is always that Engage is fine and the bookends are someone else\'s problem. Populate the bookends with primary evidence first: interviews, observation, or anything that brings the person\'s actual experience into the room.',
                },
                {
                  mistake: 'Treating &ldquo;we do not know&rdquo; as a null finding.',
                  fix: 'A phase the team has no information about is not a blank. It is evidence of neglect. Mark it clearly. An Extend phase no one can describe is the most important finding of the session, not an absence of finding.',
                },
                {
                  mistake: 'Stopping at the finding.',
                  fix: 'The 5Es produces a diagnostic. The diagnostic is not the output: specific design or research actions for each neglected phase are. End every session with named next steps for the bookends, not just a summary of which ones are weak.',
                },
              ].map(({ mistake, fix }) => (
                <div key={mistake} className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
                >
                  <p className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                  >{mistake}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                    dangerouslySetInnerHTML={{ __html: fix }}
                  />
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
            <SectionHeadingLight>Setting up a session that finds the neglected phases.</SectionHeadingLight>
            <Body>
              A 5Es session is a half-day workshop. Its value is proportional to the quality of the evidence that enters the room. Evidence-free 5Es sessions reliably confirm what the team already believes, which is that the bookends are fine. Gather real evidence for the bookend phases before the session begins.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Do the bookend research first',
                  body: 'Before the workshop, gather evidence specifically for Entice, Exit, and Extend: talk to people who chose not to come back, observe the arrival and departure moments, or analyze what happens in the days after an experience ends. This evidence is almost never already in the building.',
                },
                {
                  label: 'Bring a cross-functional group',
                  body: 'Marketing owns Entice. Operations owns Enter and Exit. Customer success owns Extend. None of them typically see the full picture together. Getting them in the same session is half the value: the evaluation surfaces the gaps between teams, not just the gaps in the experience.',
                },
                {
                  label: 'Set time budgets per phase before you start',
                  body: 'Announce and enforce phase time limits at the start: for example, 20 minutes each on Entice, Enter, Engage, Exit, and Extend. The team will overspend on Engage without explicit time pressure. A timer is not pedantic. It is the mechanism.',
                },
                {
                  label: 'Treat silence as a finding',
                  body: 'If the team has nothing to say about Exit or Extend (no evidence, no practices, no one responsible), write that down explicitly. &ldquo;No one owns this phase and we have no evidence for it&rdquo; is the most important finding of the session. It means the phase has never been designed.',
                },
                {
                  label: 'End with specific actions, not summaries',
                  body: 'Each bookend phase with a weak or absent verdict needs a named person and a named next step: who will research it, what they will do, and by when. A session that ends with &ldquo;we need to work on Exit&rdquo; has not finished. A session that ends with &ldquo;[name] will observe three exit moments and interview two customers by [date]&rdquo; has.',
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
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                      dangerouslySetInnerHTML={{ __html: body }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S9 - AI and this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={TEAL}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI reinforces the bias the 5Es is designed to correct.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what AI contributes to each phase, and where its confidence fails at exactly the phases that most need attention.
            </p>
            <FiveEsAIReactivated />
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
            <SectionHeadingLight>The same studio, evaluated two ways.</SectionHeadingLight>
            <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Altitude Fitness, a boutique cycling studio with three locations, has excellent class quality and strong retention among regulars, but fewer than 40% of first-time visitors return for a second class. Management has focused on instructors and programming: the Engage phase. The 5Es workshop is commissioned to find out what else is going on. The same studio, evaluated once with a traditional 5Es workshop grounded in primary research, and once with AI providing the analysis.
            </p>
            <FiveEsExampleToggle />
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
            <SectionHeadingDark>Where the 5Es hands off to its neighbors.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              The 5Es evaluates an experience through five fixed phases. Two neighboring methods extend it in different directions: one into a person&rsquo;s emotional narrative, one into the operational machine behind the experience.
            </p>
            <FiveEsBoundarySection />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={TEAL}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where the 5Es shows up.</SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              The 5Es is primarily a definition and discovery tool: it evaluates and diagnoses before the team invests in a design direction. It maps most naturally to the early stages of frameworks where the question is &ldquo;which problem are we solving&rdquo; rather than &ldquo;how do we solve it.&rdquo;
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
            <SectionHeadingLight>What to combine with the 5Es.</SectionHeadingLight>

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
                  title:  'The Experience Economy',
                  author: 'B. Joseph Pine II and James H. Gilmore',
                  year:   '1999',
                  note:   'The foundational argument that designed experiences, not goods or services, are the primary economic offering. The 5Es emerged from this tradition of treating experiences as designable, stageable entities with deliberate structure rather than accidental outcomes.',
                },
                {
                  title:  'Outside In: The Power of Putting Customers at the Center of Your Business',
                  author: 'Harley Manning and Kerry Bodine',
                  year:   '2012',
                  note:   'A rigorous treatment of customer experience as a designed system, with extensive evidence for why experiences are remembered by their peaks and endings rather than their averages. The peak-end effect underlies the 5Es\' emphasis on Exit as disproportionately important to what people remember.',
                },
                {
                  title:  'This Is Service Design Doing',
                  author: 'Marc Stickdorn, Markus Hormess, Adam Lawrence, and Jakob Schneider',
                  year:   '2018',
                  note:   'The comprehensive service design toolkit, including the methods that complement the 5Es: journey mapping, service blueprinting, and research approaches for each phase of an experience. The methods in this book and the 5Es are designed to be used together.',
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

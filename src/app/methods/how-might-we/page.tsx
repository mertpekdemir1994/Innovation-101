import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import HMWExampleToggle from './HMWExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'How Might We · Methods',
}

const HMWEstablishing  = dynamic(() => import('./HMWEstablishing'),  { ssr: false })
const HMWScopeSlider   = dynamic(() => import('./HMWScopeSlider'),   { ssr: false })
const HMWAIReactivated = dynamic(() => import('./HMWAIReactivated'), { ssr: false })

const NAVY = '#1F3A5F'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Define',
    note: 'HMW is the primary tool for converting Discover findings into a well-aimed design challenge. The Define phase produces a problem statement; HMW converts that statement into an open, possibility-framing question that is the brief for Develop.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Define',
    note: 'HMW was developed within the design thinking tradition. At the Define stage, it converts empathy-stage insights into design challenges that are specific enough to act on and open enough to generate creative solutions.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'Converting research themes from Discovery Sprint interviews into scoped design challenges that can anchor ideation in subsequent sprints. HMW ensures the backlog is built on reframed human needs, not just feature requests.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Tuesday',
    note: 'After Monday\'s lightning talks establish the long-term goal and map the critical path, Tuesday\'s HMW exercise converts the team\'s problem-framing observations into design challenges. The output feeds directly into concept sketching.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'The primary source of the insights HMW converts into design challenges. A HMW question without evidence is guessing; with evidence it is reframing. In-depth interviews produce the observed, specific insights that make the conversion meaningful.',
  },
  {
    slug: 'personas-archetypes',
    name: 'Personas & Archetypes',
    rel: 'HMW is often scoped to a specific persona: the question becomes sharper when anchored to a named person with a named need. A persona gives the HMW a subject: not "how might we improve checkout" but "how might we help Sarah, in the first ten seconds of payment, feel safe enough to complete the purchase."',
  },
  {
    slug: 'journey-mapping',
    name: 'Journey Mapping',
    rel: 'Journey map moments, particularly the pain points and emotional valleys, are a rich source of HMW raw material. The journey identifies where the experience fails; HMW converts those failures into design opportunities.',
  },
  {
    slug: 'ambition-matrix',
    name: 'Ambition Matrix',
    rel: 'After a HMW session produces several well-formed design challenges, the ambition matrix helps the team decide which to pursue, plotting each challenge against feasibility and potential impact to choose where to focus ideation.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function HowMightWePage() {
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
                color:       '#4480D1',  /* NAVY, brightened for text contrast */
                background: 'rgba(31,58,95,0.12)',
                border:     '1px solid rgba(31,58,95,0.28)',
              }}
            >
              Synthesis &amp; Framing
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              How Might We
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A reframing question that converts a research insight into an open design challenge: the hinge between what you learned and what you build.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}
            >
              Some problems, stated as problems, cannot be solved, only endured. The question is not what to fix. It is how to stand in front of the same situation and ask something different.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <HMWEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>What it is</SectionLabel>
            <SectionHeadingLight>A reframing, not a question. A hinge, not a brainstorm prompt.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                How Might We (HMW) is a structured reframing question that converts a problem statement or
                research insight into an open design challenge. The format was developed at IDEO and is standard
                practice in design thinking. Its phrasing is precise: &ldquo;How&rdquo; asserts that a solution
                exists; &ldquo;might&rdquo; holds it as a possibility rather than a demand; &ldquo;we&rdquo;
                makes it collaborative. Three words that together create an invitation.
              </Body>
              <Body>
                Its power is in the conversion. A problem stated in its own terms (&ldquo;users abandon checkout
                because it feels effortful and uncertain&rdquo;) is locked in the problem&rsquo;s framing. A
                HMW question (&ldquo;how might we make checkout feel effortless and reassuring?&rdquo;) holds the
                same reality but opens it into possibility. The insight is preserved; the stance changes from
                diagnosis to design. This conversion is the mechanism that bridges research and ideation.
              </Body>
              <Body>
                HMW is not a brainstorm prompt and not a volume exercise. One well-formed HMW question is worth
                more than twenty poorly scoped ones. The craft is in the calibration: the question must be specific
                enough to give creative direction and open enough to allow genuinely different solutions. Too broad
                (&ldquo;how might we reinvent online shopping?&rdquo;) and it gives no direction. Too narrow
                (&ldquo;how might we add a progress bar to the checkout page?&rdquo;) and it has already answered
                itself. Just right is a question that could be answered in more than one way, none of them obvious.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Scope Slider   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Scope calibration</SectionLabel>
            <SectionHeadingDark>The same problem. Three altitudes.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              The scope of a HMW question determines what solutions are possible. Too broad and there is no
              direction. Too narrow and the question has already answered itself. Toggle between the three to
              see why scope calibration is the skill, not the phrasing.
            </p>
            <HMWScopeSlider />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A synthesis tool for converting insight into design challenge.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: NAVY }}
                >Use How Might We when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Research has produced specific, observed insights that need converting into design challenges before ideation begins.',
                    'The team is stuck in problem mode, diagnosing, analyzing, or reporting the problem rather than opening it into possibility.',
                    'After affinity mapping has produced insight clusters that need converting into a brief for ideation.',
                    'At the Define phase of a double diamond or design sprint, where the task is converting Discover findings into a design challenge.',
                    'When you need a single, shared design challenge that a cross-functional team can align on before ideation.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: NAVY, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
                >Do not lean on it when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Research hasn\'t happened yet. HMW without evidence becomes guessing framed as a design method. The quality of the HMW is a direct function of the quality of the insight behind it.',
                    'You already have a solution in mind. Skipping to "how do we build X" wastes the method; HMW exists to open the solution space, not to dress up a decision already made.',
                    'The problem is genuinely vague. A HMW question converts a specific insight; without a specific insight there is nothing to convert. Do the research first.',
                    'You need prioritization, not reframing. If the team already has good design challenges and needs to decide which to pursue, use a prioritization tool like the ambition matrix.',
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
                The honest limit: a HMW question is only as good as the insight behind it. A weak insight produces
                a weak HMW: one that accurately reframes the wrong thing. The method is a conversion mechanism;
                the quality of the input determines the quality of the output.
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
            <SectionLabel accent={NAVY}>How it works</SectionLabel>
            <SectionHeadingLight>Five moves, from raw insight to open design challenge.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Start with a specific, observed insight.',
                  body: 'HMW converts evidence into possibility. The evidence must be specific: not "users find checkout hard" but "users abandon checkout at the payment step because it feels effortful and uncertain, observed in 11 of 14 interviews." The more specific the insight, the more directional the HMW.',
                },
                {
                  n: '02',
                  title: 'State the problem in its own terms first.',
                  body: 'Before reframing, write the problem exactly as observed. Do not edit or improve it. This is the raw material: the observed failure, the real emotional response, the actual gap. Writing it preserves what the research found rather than what the team wants to hear.',
                },
                {
                  n: '03',
                  title: 'Convert to a HMW question.',
                  body: 'Apply the format: "How might we [convert the problem into an opportunity]?" Stay close to the insight; the first HMW is usually the most direct reframing. Don\'t over-engineer it. "How might we make checkout feel effortless and reassuring?" holds the same insight as the problem statement, reframed for possibility.',
                },
                {
                  n: '04',
                  title: 'Calibrate the scope.',
                  body: 'Test the question against the three scope levels: too broad (could mean anything, no direction), too narrow (already implies a solution), just right (specific enough to act, open enough to explore). If the question is too broad, narrow it. If it\'s too narrow, back up one level. The calibration step is where the skill lives.',
                },
                {
                  n: '05',
                  title: 'Select and commit to one or two.',
                  body: 'A HMW session should produce one or two well-calibrated design challenges, not twenty. More than two is usually a sign that the scope calibration step was skipped. The selected HMW questions become the brief for ideation: specific enough to give direction, open enough to generate genuinely different solutions.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(31,58,95,0.10)', lineHeight: 1.1, width: 40 }}
                  >{n}</span>
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

      {/* ─────────────────────────────────────────────────────────
          S7 - Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and what prevents it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The question is anchored to a specific, observed insight: it converts evidence, not opinion.',
                'The scope is calibrated: specific enough to give direction, open enough to generate genuinely different solutions.',
                'The question preserves the emotional truth of the insight without losing it in polished language.',
                'The team can argue about whether the scope is right, that debate is a sign the question is working.',
                'It changes the conversation: the team shifts from diagnosing the problem to generating possibilities.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: NAVY, flexShrink: 0, marginTop: 3 }}>✓</span>
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
                  mistake: 'Treating volume as output.',
                  fix: 'Generating twenty HMW questions is not the goal. The goal is one or two well-calibrated, insight-anchored design challenges. Volume without scope calibration produces a long list of possibilities that cannot prioritize anything.',
                },
                {
                  mistake: 'Losing the emotional truth in the reframe.',
                  fix: '"How might we optimize the payment flow" and "how might we make checkout feel effortless and reassuring" address the same problem, but the second preserves the emotional observation and opens a different solution space. Abstracting away the human truth is the most common way a HMW goes flat.',
                },
                {
                  mistake: 'Skipping scope calibration.',
                  fix: 'A HMW at the wrong scope produces either paralysis (too broad) or a dressed-up specification (too narrow). The calibration step, testing the question against three altitudes, is not optional. It is the step where the method actually does its work.',
                },
                {
                  mistake: 'Running HMW without a specific insight.',
                  fix: 'HMW converts insight into design challenge. Without a specific, observed insight, the method has nothing to convert. Running HMW from a vague problem summary produces vague design challenges. Do the research first; run HMW from what the research found.',
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

      {/* ─────────────────────────────────────────────────────────
          S8 - Logistics   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Logistics</SectionLabel>
            <SectionHeadingLight>Running the session from insight to design challenge.</SectionHeadingLight>
            <Body>
              HMW works well individually but is most effective in a cross-functional group with access to the raw
              research. The group should include people who were in the interviews, people who will be in the
              ideation sessions, and at least one person who can push back on scope. The writing of the question
              is the key step; it is where the reframing happens.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Start from a specific insight, not a general theme',
                  body: 'One HMW question per insight cluster. Don\'t try to reframe twenty insights into one question. A good HMW session converts three to five specific insights into three to five design challenges, a volume the team can work with in ideation.',
                },
                {
                  label: 'Write, don\'t discuss',
                  body: 'The first step is writing, not talking. Each person writes their own HMW question for the insight. Writing forces specificity and avoids the gravitational pull toward the group\'s existing framing. Compare and calibrate after everyone has written.',
                },
                {
                  label: 'Run scope calibration explicitly',
                  body: 'After writing, place each HMW at a scope level: too broad, just right, too narrow. This step is often skipped, and skipping it is the most common cause of a HMW session that produces nothing useful. Make the calibration conversation visible and explicit.',
                },
                {
                  label: 'Aim for one chosen question per insight',
                  body: 'After calibration, converge. The group selects the best-scoped HMW for each insight, the one that gives the most direction while leaving the solution space genuinely open. The output of the session is a set of design challenges, not a list of questions.',
                },
                {
                  label: 'Remote: works well',
                  body: 'HMW is well-suited to remote sessions. A shared digital whiteboard where each participant writes their questions, followed by a structured scope calibration discussion, works reliably. The writing step keeps people from talking each other out of a brave reframe before they\'ve committed it to paper.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(31,58,95,0.28)', marginTop: 4 }}
                  />
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

      {/* ─────────────────────────────────────────────────────────
          S9 - AI and this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI generates questions. The brave reframe requires something else.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI contributes to HMW, and where the distinctive reframe
              requires the emotional knowledge that only the research can supply.
            </p>
            <HMWAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same problem, reframed two ways.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A UK government digital team is redesigning the process for notifying government departments
              after a death. The research is complete. The team runs a HMW session to convert insights into
              design challenges. The same scenario is run twice: once with a cross-functional team working
              from their interview notes, once with AI given a domain description.
            </p>
            <HMWExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where How Might We shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              HMW is a Define-phase tool. It maps to frameworks at the points where the task is converting
              research findings into a design challenge: the hinge between what was learned in Discover
              and what gets built in Develop.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link
                  key={slug}
                  href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <span
                    className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}
                  >{name}</span>
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-2xs)', color: NAVY, textTransform: 'uppercase', letterSpacing: '0.08em' }}
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
            <SectionLabel accent={NAVY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with How Might We.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <div
                  key={name}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4"
                  style={{ border: '1px solid var(--color-neutral-100)' }}
                >
                  <div className="shrink-0" style={{ minWidth: 200 }}>
                    <Link
                      href={`/methods/${slug}`}
                      className="font-semibold hover:underline"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                    >{name}</Link>
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
            <SectionLabel accent={NAVY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'The Art of Innovation',
                  author: 'Tom Kelley and Jonathan Littman',
                  year:   '2001',
                  note:   'The book that brought IDEO\'s methods into public view, including the HMW format as a structured reframing tool. Describes how "How Might We" shifts a team\'s posture from problem analysis to creative possibility, the shift the phrasing is designed to produce.',
                },
                {
                  title:  'Change by Design',
                  author: 'Tim Brown',
                  year:   '2009',
                  note:   'The HMW method in its broader design thinking context. Brown\'s framing of design thinking as a human-centered approach to problem-solving situates HMW as the translation layer between empathy and ideation, converting what was learned into a question worth answering.',
                },
                {
                  title:  'Sprint',
                  author: 'Jake Knapp, John Zeratsky, and Braden Kowitz',
                  year:   '2016',
                  note:   'The Design Sprint book codifies HMW as Tuesday\'s core exercise, positioning it as the mechanism for converting Monday\'s problem framing into generative design challenges. Practical guidance on running HMW at speed, with scope calibration built into the process.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div
                    className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(31,58,95,0.30)' }}
                  />
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

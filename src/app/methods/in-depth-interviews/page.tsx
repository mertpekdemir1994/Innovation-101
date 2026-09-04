import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import IDIExampleToggle from './IDIExampleToggle'
import { DarkSection, LightSection, WarmSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'In-Depth Interviews — Methods — Innovation 101',
}

// Client components: dynamic import avoids SSR/hydration issues with animations
const IDIEstablishing  = dynamic(() => import('./IDIEstablishing'),  { ssr: false })
const IDIInteractive   = dynamic(() => import('./IDIInteractive'),   { ssr: false })
const IDIAIReactivated = dynamic(() => import('./IDIAIReactivated'), { ssr: false })

const SAGE = '#3D6B5A'


// ── Framework cross-links ─────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  { slug: 'double-diamond',    name: 'Double Diamond',              phase: 'Discover',         note: 'The primary research method for understanding the problem space.' },
  { slug: 'design-thinking',   name: 'Design Thinking',             phase: 'Empathize',        note: 'A core method of the empathy stage.' },
  { slug: 'lean-startup',      name: 'Lean Startup',                phase: 'Build',            note: 'Informs the hypothesis, interviews shape what to build and test first.' },
  { slug: 'agile-innovation',  name: 'Agile Innovation',            phase: 'Discovery Sprint', note: 'The core research activity that keeps the backlog grounded in real needs.' },
  { slug: 'fde',               name: 'Forward Deployed Engineering', phase: 'Embed',            note: 'Continuous, deep interviewing is part of living with the customer.' },
]

const RELATED_METHODS = [
  { slug: 'contextual-observation', name: 'Contextual Observation', rel: 'The essential companion: interviews capture what people say and feel; observation captures what they actually do.' },
  { slug: 'empathy-mapping',        name: 'Empathy Mapping',        rel: 'Organises what interviews surface into Says / Thinks / Does / Feels.' },
  { slug: 'affinity-mapping',       name: 'Affinity Mapping',       rel: 'The primary method for clustering raw interview data into themes and insights.' },
  { slug: 'journey-mapping',        name: 'Journey Mapping',        rel: 'Often built from interview data, sequencing the experience interviews reveal.' },
  { slug: 'jobs-to-be-done',        name: 'Jobs To Be Done',        rel: 'A lens for framing what interviews should dig into: the progress the person is trying to make.' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function InDepthInterviewsPage() {
  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          S1 - Header / Identity   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <Container className="relative z-10 w-full flex flex-col justify-center flex-1">
          <div className="py-20 md:py-28">
            {/* Stage badge */}
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize: 'var(--text-2xs)',
                color: '#86EBC6',  /* SAGE, brightened for text contrast */
                background: 'rgba(61,107,90,0.10)',
                border: '1px solid rgba(61,107,90,0.22)',
              }}
            >
              Discovery &amp; Research
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#FAFAFA',
              }}
            >
              In-Depth Interviews
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Structured one-on-one conversations designed to understand not just what people do, but why they do it.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}
            >
              The most foundational research method in innovation, and the one teams most often do badly.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <IDIEstablishing />
        </div>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>What it is</SectionLabel>
            <SectionHeadingLight>One person&rsquo;s real story is worth a thousand survey responses.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                An in-depth interview is a guided but open conversation with a single participant, designed to surface motivations, frustrations, workarounds, and unarticulated needs. Unlike a survey, which captures what people say at scale, or a focus group, which captures group dynamics and the loudest voice, the in-depth interview captures the texture of one person&rsquo;s actual experience, including the things they would never think to put on a form.
              </Body>
              <Body>
                Its power comes from a simple truth: people are not reliable narrators of their own behavior, but they are excellent storytellers about specific moments. A good interview moves a person away from opinions and generalizations (&ldquo;I usually try to eat healthy&rdquo;) and toward concrete, recent stories (&ldquo;last night I ordered takeout at 9pm because I was exhausted&rdquo;), because the specifics are where the real, un-rationalized behavior lives.
              </Body>
              <Body>
                It is the single most widely used research method in innovation and the foundation that most other discovery and synthesis methods build on. It is also the one teams most often do badly: talking too much, asking leading questions, accepting the first surface answer, and hearing what they hoped to hear. Done well, it is the closest thing innovation has to a superpower. Done badly, it quietly produces false confidence.
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
            <SectionLabel accent={SAGE}>The roles</SectionLabel>
            <SectionHeadingDark>Three roles in the room.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              A well-run interview has exactly three people. Click each role to understand what it demands.
            </p>
            <IDIInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={SAGE}>When to deploy it</SectionLabel>
            <SectionHeadingLight>Right tool, right moment.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {/* Use it when */}
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: SAGE }}
                >
                  Use in-depth interviews when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You are at the start of an innovation challenge and do not yet fully understand the people you are designing for.',
                    'You need to understand the emotional and contextual reality of a problem, the why beneath the what, not just its surface symptoms.',
                    'You need rich, specific stories rather than statistics.',
                    'You suspect there is a gap between what people say they do and what they actually do, and you want to hear them describe real, recent behavior.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: SAGE, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Do not rely on when */}
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
                >
                  Do not rely on them when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You need quantitative validation or statistical significance (use surveys or analytics instead).',
                    'You are testing a finished solution for usability (use concept or usability testing).',
                    'You need to observe behavior in context rather than hear it described; pair with or substitute contextual observation.',
                    'The behavior you care about is too private, rare, or sensitive to be discussed candidly.',
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
                The honest limit of interviews: people report what they remember and are willing to share, filtered through how they would like to be seen. Interviews are unmatched for understanding motivation and meaning, but for understanding actual behavior they are best paired with observation, which catches what people do but never think to mention.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S6 - How it works   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>How it works</SectionLabel>
            <SectionHeadingLight>A shape, not a script.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Prepare a guide, then be ready to abandon it.',
                  body: 'Write a short set of open-ended questions and topics, but treat it as a safety net, not a track. The best interviews follow the participant, not the document.',
                },
                {
                  n: '02',
                  title: 'Open with context, not your agenda.',
                  body: 'Begin with easy, grounding questions that get the person talking about their actual life ("walk me through a typical day"). This builds comfort and surfaces the real terrain before you steer toward your topic.',
                },
                {
                  n: '03',
                  title: 'Ask for stories and recent specifics.',
                  body: '"Tell me about the last time you..." beats "How do you usually...". People rationalize generalizations but report specifics accurately. Anchor every important topic to a concrete, recent example.',
                },
                {
                  n: '04',
                  title: 'Follow the threads that feel alive.',
                  body: 'When the participant says something surprising, emotional, or contradictory, drop your next planned question and pull on that thread. The unplanned detours are usually where the insight is.',
                },
                {
                  n: '05',
                  title: 'Probe beneath the first answer.',
                  body: 'The first answer is almost always the surface, presentable one. "Tell me more," "what did that feel like," and a comfortable silence that invites them to keep going get you beneath it.',
                },
                {
                  n: '06',
                  title: 'Reach saturation, then stop.',
                  body: 'Conduct enough interviews (usually 12 to 15 for a given population) that you stop hearing genuinely new things. That point of diminishing returns, saturation, is your signal that you have learned what this round can teach.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(61,107,90,0.10)', lineHeight: 1.1, width: 40 }}
                  >
                    {n}
                  </span>
                  <div>
                    <h3
                      className="font-semibold mb-2"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}
                    >
                      {title}
                    </h3>
                    <Body>{body}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </WarmSection>

      {/* ────────────────────────────────────────────────────────────
          S7 - Best practices   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the mistakes that prevent it.</SectionHeadingLight>

            {/* The craft */}
            <h3
              className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}
            >
              The craft, when it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The interviewer talks less than 20 percent of the time. Silence is a tool, not a failure; people fill it with their most honest material.',
                'The participant tells stories about specific, recent moments rather than offering general opinions.',
                'The conversation surfaces at least one thing that genuinely surprises the team. If nothing surprised you, you probably confirmed your assumptions rather than challenging them.',
                'Questions are open and non-leading. "What was that experience like?", not "That was frustrating, right?"',
                'Exact quotes are captured verbatim, because the participant\'s own words carry meaning a paraphrase loses.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: SAGE, flexShrink: 0, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            {/* The mistakes */}
            <h3
              className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}
            >
              The mistakes, and how to avoid them
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: 'Leading the witness.',
                  fix: 'Telegraphing the answer you want ("So the slow checkout was annoying?") gets you agreement, not truth. Ask neutrally and let them characterize it.',
                },
                {
                  mistake: 'Talking too much.',
                  fix: 'Filling silence, explaining your product, or sharing your own views all steal the participant\'s airtime and bias their answers. Ask, then be quiet.',
                },
                {
                  mistake: 'Accepting the surface answer.',
                  fix: 'Stopping at the first, polite response leaves the real insight buried. Always probe at least one layer deeper.',
                },
                {
                  mistake: 'Interviewing to validate.',
                  fix: 'Going in hoping to confirm a belief turns the interview into theater. Go in genuinely trying to learn you are wrong; that is where the value is.',
                },
                {
                  mistake: 'Recruiting the convenient rather than the right people.',
                  fix: 'Talking to whoever is easy to reach (often people like you) produces comfortable, useless data. Interview the people who actually have the experience.',
                },
                {
                  mistake: 'Asking about the future or the hypothetical.',
                  fix: '"Would you use this?" and "Would you pay for this?" produce polite, unreliable answers. Ask about real past behavior, which is the only honest predictor.',
                },
              ].map(({ mistake, fix }) => (
                <div
                  key={mistake}
                  className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
                >
                  <p
                    className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                  >
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
          S8 - Logistics   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Logistics</SectionLabel>
            <SectionHeadingLight>Recruiting and running the session.</SectionHeadingLight>
            <Body>
              Knowing how to interview is only half the method. The other half is the operational reality: finding the right people to talk to, and choosing how to actually run the sessions. These choices shape the quality of everything the interview produces.
            </Body>

            {/* Recruiting */}
            <h3
              className="font-semibold mt-10 mb-5"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}
            >
              Recruiting: who you talk to determines what you learn
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  label: 'Friends, family, and your own network',
                  body: 'The fastest and cheapest option, and the most dangerous. People close to you are easy to reach but rarely representative, and they tell you what you want to hear. Acceptable for a quick practice round or when your network genuinely contains your target users; risky as the basis for a real decision.',
                },
                {
                  label: 'Specialized recruiting firms',
                  body: 'When you need specific, hard-to-reach, or professional participants, recruiting firms find and screen them for you. Examples in this space include Respondent.io (self-serve participant marketplace), and expert networks like GLG and Sago for professional and expert participants. They cost money and add lead time, but solve the representativeness problem that sinks network-based recruiting.',
                },
                {
                  label: 'Customer and user lists',
                  body: 'If you already have users, recruiting from your own base gives you people with genuine relevant experience. The caveat: your existing users are the ones who did not churn, so they can over-represent the satisfied and under-represent the people who left, often the most informative to talk to.',
                },
                {
                  label: 'AI-assisted recruiting',
                  body: 'An emerging option: AI tools that source, screen, and schedule participants, reducing the lead time recruiting usually adds. Useful for speed; still requires human judgment about whether the resulting sample is actually representative or just fast to assemble.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(61,107,90,0.28)', marginTop: 4 }}
                  />
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                    >
                      {label}
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                      {body}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Session format */}
            <h3
              className="font-semibold mt-10 mb-5"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}
            >
              Session format: where and how the conversation happens
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  label: 'In person',
                  body: 'The richest format. You see full body language, build trust more easily, and can observe the participant\'s environment. Costliest in time and logistics, and geographically limited. Best for high-stakes, sensitive, or context-dependent topics.',
                },
                {
                  label: 'Virtual calls',
                  body: 'The modern default. Video calls capture most of what matters (face, tone, much of the body language) at a fraction of the cost and with no geographic limit, which also makes a more diverse sample reachable. You lose some rapport and environmental context, but for most studies the tradeoff is worth it.',
                },
                {
                  label: 'AI-moderated and AI-assisted sessions',
                  body: 'A rapidly developing option in which AI conducts or supports the interview itself, asking questions, following up, and capturing responses at scale. Tools such as Outset.io run AI-moderated qualitative interviews with many participants in parallel. This makes possible a scale of research that was previously impossible, but introduces a real tradeoff explored in the next section: what is gained in scale and speed, and what is quietly lost.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(61,107,90,0.28)', marginTop: 4 }}
                  />
                  <div>
                    <p
                      className="font-semibold mb-1"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                    >
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
      </WarmSection>

      {/* ────────────────────────────────────────────────────────────
          S9 - How AI is evolving this method   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={SAGE}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI can now take any seat at the table. The question is what you lose when it does.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle each role to see what changes when AI takes it: what it gains, and what it risks. The illustration above updates to reflect the state.
            </p>
            <IDIAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same study, run two ways.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Below is the same research question answered by a traditional interview study and by an AI-assisted one. The contrast is the teaching.
            </p>
            <IDIExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S11 - Used in these frameworks   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where in-depth interviews show up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              In-depth interviews feed the discovery work of nearly every framework on this site.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link
                  key={slug}
                  href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{
                    border: '1px solid var(--color-neutral-100)',
                    background: 'var(--color-background)',
                  }}
                >
                  <span
                    className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}
                  >
                    {name}
                  </span>
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-2xs)', color: SAGE, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >
                    {phase}
                  </span>
                  <span
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}
                  >
                    {note}
                  </span>
                </Link>
              ))}
            </div>

            <p
              className="mt-6"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontStyle: 'italic' }}
            >
              Note: the Design Sprint deliberately does not run full in-depth interviews inside the five days; it imports their outputs. This blank is intentional.
            </p>
          </div>
        </Container>
      </WarmSection>

      {/* ────────────────────────────────────────────────────────────
          S12 - Related methods   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with interviews.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <Link
                  key={slug}
                  href={`/methods/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{
                    border: '1px solid var(--color-neutral-100)',
                  }}
                >
                  <span
                    className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}
                  >
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
          S13 - Sources   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The books behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Interviewing Users',
                  author: 'Steve Portigal',
                  year:   '2013',
                  note:   'The definitive practical guide to in-depth interviewing.',
                },
                {
                  title:  'The Mom Test',
                  author: 'Rob Fitzpatrick',
                  year:   '2013',
                  note:   'Essential on how to ask questions that produce honest answers rather than polite encouragement.',
                },
                {
                  title:  'Universal Methods of Design',
                  author: 'Bella Martin and Bruce Hanington',
                  year:   '2012',
                  note:   'Interviewing among a catalog of research methods.',
                },
                {
                  title:  'Convivial Toolbox',
                  author: 'Liz Sanders and Pieter Jan Stappers',
                  year:   '2012',
                  note:   'Generative research that interviews feed into.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div
                    className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(61,107,90,0.30)' }}
                  />
                  <div>
                    <p
                      className="font-semibold"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                    >
                      <em>{title}</em>
                    </p>
                    <p
                      className="mb-1"
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}
                    >
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
      </WarmSection>
    </>
  )
}

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import COExampleToggle from './COExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Contextual Observation (Ethnography) — Methods — Innovation 101',
}

const COEstablishing  = dynamic(() => import('./COEstablishing'),  { ssr: false })
const COInteractive   = dynamic(() => import('./COInteractive'),   { ssr: false })
const COAIReactivated = dynamic(() => import('./COAIReactivated'), { ssr: false })

const SAGE = '#3D6B5A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Discover',
    note: 'Generating the deep behavioral insight that the Discover phase needs before any frame or solution is defined. Contextual observation is the research instrument that sees past self-reported data to real behavior in real environments, exactly what is required to make the Discover phase generative rather than confirmatory.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Empathize',
    note: 'Building genuine empathy with users in their own context. The Empathize phase asks teams to understand people at a human level, not just a functional one. Contextual observation is the method that makes that possible by getting researchers into the environment where the problem actually lives.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Monday',
    note: 'Surfacing real user behavior before the sprint&#39;s framing decisions are locked. Monday&#39;s expert interviews and problem mapping benefit from prior contextual observation: teams that have watched users in their environments bring a richer picture to the sprint than teams relying on secondhand reports.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'Understanding the real problem before building begins. The Discovery Sprint is the moment to validate that the team is solving a real problem in a real context. Contextual observation is the most rigorous tool for that validation, revealing workarounds and unarticulated needs that backlog sessions cannot surface.',
  },
  {
    slug: 'fde',
    name: 'Full-Duplex Enterprise',
    phase: 'Embed',
    note: 'Understanding how a deployed system is actually used within an organisation, not how it was intended to be used. The Embed phase is when real-world behavior diverges most from designed behavior, and contextual observation is the method that makes those gaps visible.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'The essential companion and deliberate contrast: interviews surface what people say and believe about their behavior; contextual observation surfaces what they actually do. The two methods are strongest when sequenced together: observation first to ground the problem in real behavior, interviews to add the participant&#39;s own interpretation and meaning.',
  },
  {
    slug: null,
    name: 'Diary Studies',
    rel: 'Where contextual observation provides a single snapshot in a real environment, diary studies capture behavior over time, in all the environments where it occurs. Together they cover different temporal and geographic scales of the same behavioral question. Diary studies are especially useful when the behavior happens infrequently or privately.',
  },
  {
    slug: 'journey-mapping',
    name: 'Journey Mapping',
    rel: 'Contextual observation is one of the primary sources for the behavioral detail that makes a journey map specific and credible. Observations of real pain points, workarounds, and moments of friction translate directly into the stages and touchpoints that a journey map traces, moving the map from a schematic of how the journey was designed to a record of how it is lived.',
  },
  {
    slug: 'empathy-mapping',
    name: 'Empathy Mapping',
    rel: 'Empathy maps are most effective when built from direct observational data rather than assumed behavior. Contextual observation provides the raw material for the says, thinks, does, and feels quadrants, especially the does quadrant, which is nearly impossible to fill accurately from interviews alone.',
  },
  {
    slug: 'affinity-mapping',
    name: 'Affinity Mapping',
    rel: 'Contextual observation generates large volumes of raw behavioral data (notes, photographs, video, artifacts collected in the field). Affinity mapping is the synthesis tool that organizes this data into clusters of meaning, turning field observations into actionable insight. The combination of observation and affinity mapping is the standard synthesis workflow in ethnographic research.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ContextualObservationPage() {
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
                color:       SAGE,
                background: 'rgba(61,107,90,0.12)',
                border:     '1px solid rgba(61,107,90,0.28)',
              }}
            >
              Discovery &amp; Research
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Contextual Observation
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Watching people in their natural environment to see what they actually do, not what they say they do, and not what they think they do.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The insight is never in the interview. It is in the shoebox on the desk and the sticky note on the side of the screen.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <COEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>What it is</SectionLabel>
            <SectionHeadingLight>Behavior in its natural setting. Not behavior as remembered or described.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Contextual observation (also called ethnographic research, contextual inquiry, or field research) involves
                a researcher being physically present in the environment where a person works, lives, shops, or navigates a
                service, watching and documenting what actually happens. The researcher is a guest in the participant&rsquo;s
                own space, not an interrogator in a controlled setting. The environment itself is the research instrument.
              </Body>
              <Body>
                Its central insight is that behavior in context and behavior as self-reported are systematically different.
                When people are interviewed about what they do, they describe a cleaned-up version: the way they think they
                behave, the way they are supposed to behave, or the way that sounds competent and coherent when narrated.
                When they are observed at home, at their desk, or in the shop, a different picture emerges: the workarounds,
                the improvised systems, the moments of friction, the questions they are actually trying to answer. These are
                not things people hide; they are things people have stopped seeing, because they are too normal.
              </Body>
              <Body>
                Contextual observation is used when the design or product question depends on understanding real behavior,
                not reported behavior. It is especially valuable when the gap between the two is large, which it reliably
                is, whenever the behavior is habitual, effortful, or emotionally loaded. It is the foundational method of
                design research precisely because so many important design problems are rooted in things people would never
                think to mention in an interview.
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
            <SectionLabel accent={SAGE}>What observation reveals</SectionLabel>
            <SectionHeadingDark>Five things visible in the room that would never appear in an interview.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click each element of the scene to see what a trained observer notices, and why it matters as research data.
            </p>
            <COInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>When to deploy it</SectionLabel>
            <SectionHeadingLight>When the behavior is the question, observation is the answer.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: SAGE }}>
                  Use contextual observation when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You suspect the problem is not what users say it is: that their self-reported workflow is a simplified version of what actually happens.',
                    'You need to understand the real environment: what tools, workarounds, and improvised systems people have built around an official product or process.',
                    'The behavior is habitual, emotional, or so embedded in daily life that people have stopped consciously noticing it.',
                    'You are in early discovery and need to understand the problem before any framing or solution is defined.',
                    'You want to see the say-vs-do gap directly, without relying on participants to describe it.',
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

              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Do not lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The behavior is private or sensitive in ways that make observation ethically inappropriate, regardless of consent. Some contexts call for a diary study or interview instead.',
                    'You need large quantitative data: contextual observation generates deep qualitative insight from a small number of sessions, not statistically representative rates.',
                    'The question is about attitudes, opinions, or preferences that people can accurately self-report. For these, an interview or survey is faster and sufficient.',
                    'Time and access are severely constrained: observation requires gaining entry to real environments, scheduling time in context, and longer session preparation than a remote interview.',
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
              className="rounded-lg p-5 mt-10"
              style={{ background: 'var(--color-warm-100)', borderLeft: '3px solid var(--color-neutral-300)' }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: contextual observation is slow, logistically demanding, and requires trained researchers
                who know how to be present without altering behavior. Done well, it produces irreplaceable insight. Done
                poorly (rushing through sessions, leading participants, not documenting the environment, failing to debrief
                immediately) it produces impressions, not data.
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
            <SectionLabel accent={SAGE}>How it works</SectionLabel>
            <SectionHeadingLight>Five moves, from gaining access to generating insight.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Define the behaviors you need to see.',
                  body: 'Before going into the field, be specific about what you are trying to observe. Not "how people use our app" but "how people manage money at home" or "how small business owners understand their financial position on a given day." The more specific the behavioral question, the more productive the session. Vague observation generates descriptive anecdotes, not design insight.',
                },
                {
                  n: '02',
                  title: 'Recruit for context, not just demographics.',
                  body: 'Recruit participants who will be doing the target behavior in a real environment during your session, not just people who fit a demographic profile. The environment is part of the research. Five to eight participants across the key behavioral contexts is usually sufficient to identify the most important patterns in qualitative research.',
                },
                {
                  n: '03',
                  title: 'Be present without taking over.',
                  body: 'Arrive as a learner, not an expert. Explain that you are there to watch and understand, not to evaluate the participant. Sit or stand where you can observe without being in the way. Resist the urge to help when someone struggles. That friction is often the data. Ask questions that invite continuation: "Can you tell me more about that?" or "What were you trying to do just then?"',
                },
                {
                  n: '04',
                  title: 'Document everything in the environment.',
                  body: 'Note what the participant has around them: the tools, the workarounds, the paper systems, the Post-its, the notebooks, the things they have built alongside the official tool. These artifacts are often more revealing than anything the participant does on-screen. Photograph the environment with permission. The shoebox, not the software, may be the most important thing in the room.',
                },
                {
                  n: '05',
                  title: 'Debrief immediately and look for the gap.',
                  body: 'Within an hour of leaving, write up notes while the session is still vivid. Note not just what happened but what surprised you: the places where behavior diverged from expectation, the workarounds that should not have to exist, the questions participants were actually trying to answer. The say-vs-do gap, where what they said before the session differed from what you observed, is often where the product insight lives.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(61,107,90,0.12)', lineHeight: 1.1, width: 40 }}
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
            <SectionLabel accent={SAGE}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the mistakes that prevent it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The researcher enters the environment without an agenda, genuinely open to being surprised by what is there.',
                'The physical space, tools, workarounds, and artifacts are documented as carefully as the participant\'s actions.',
                'The researcher asks questions that invite participants to continue and explain, not questions that suggest the answer.',
                'The debrief happens immediately: field notes written within the hour, while the observation is still vivid.',
                'The synthesis identifies the say-vs-do gaps specifically: the places where observed behavior diverged from what participants said or believed about themselves.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: SAGE, flexShrink: 0, marginTop: 3 }}>✓</span>
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
                  mistake: 'Turning the observation into an interview.',
                  fix: 'The instinct, once in the room, is to start asking questions. Watch first. Let behavior happen. Speak only to prompt continuation or clarify what you just saw. Observation loses its value the moment the researcher starts leading.',
                },
                {
                  mistake: 'Seeing only the screen.',
                  fix: 'Digital behavior is a small fraction of what contextual observation reveals. Note the physical environment: the papers, the improvised tools, the spatial arrangement of objects, what is sticky-noted to what. These artifacts often contain more information than anything that happens on-screen.',
                },
                {
                  mistake: 'Helping when participants struggle.',
                  fix: 'Researcher instinct is to be helpful. Resist it. When a participant struggles, cannot find something, or gives up on a step, that moment of friction is likely the most valuable data in the session. Note it exactly: what they tried, what failed, how they recovered or did not.',
                },
                {
                  mistake: 'Delaying the debrief.',
                  fix: 'Field notes written the next day lose 60 to 70 percent of the texture. Write immediately after leaving the participant. Note not just what happened but what surprised you. The unexpected observations are usually where the insight is.',
                },
                {
                  mistake: 'Conflating observation with interviewing users about their behavior.',
                  fix: 'An interview where you ask people to describe their workflow is not observation, even if it is called that. The power of contextual observation comes from watching the behavior happen, in real time, in the real environment. Descriptions of behavior are not a substitute.',
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
            <SectionLabel accent={SAGE}>Logistics</SectionLabel>
            <SectionHeadingLight>Getting into the field and getting useful data out.</SectionHeadingLight>
            <Body>
              Contextual observation is the most logistically demanding of the core research methods. It requires
              physical presence in participants&rsquo; spaces, which means planning access, travel, time, and the
              interpersonal skill to be a productive guest in someone else&rsquo;s environment.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Plan for 1 to 3 hours per session, in context',
                  body: 'Shorter sessions miss the rhythms and moments of transition that reveal the most. Longer sessions are harder to sustain productively for both researcher and participant. For complex workflows (financial management, medical, logistics) budget toward the longer end and observe across a natural work cycle.',
                },
                {
                  label: 'Use a pair: observer and note-taker',
                  body: 'A two-person team divides attention productively: one watches and engages with the participant, the other documents continuously. This produces richer data than a single researcher trying to do both, and the debrief between the two surfaces different things noticed. It also allows one researcher to photograph the environment while the other maintains conversation.',
                },
                {
                  label: 'Get consent for photographs and recording',
                  body: 'Photograph the physical environment: the desk, the tools, the wall, the filing system, the space. These images are often the most useful synthesis material. Always confirm consent before recording anything, and be explicit about what will be done with the data. Participants should know exactly who will see it.',
                },
                {
                  label: 'Prepare a loose observation guide, not a script',
                  body: 'Unlike an interview guide, an observation guide is a list of behaviors and environmental details to look for, not a set of questions to ask. It keeps the researcher alert to the things that matter most, without turning the session into a structured walk-through. Leave space for the unexpected: the most important observations are almost always the ones not on the list.',
                },
                {
                  label: 'Run sessions until patterns repeat',
                  body: 'Five to eight sessions across the key contexts usually saturates the most important patterns in qualitative research. When the third session starts producing the same surprises as the second, the method is doing its job. Run a brief synthesis after every two or three sessions to track which patterns are emerging and which questions remain open.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(61,107,90,0.28)', marginTop: 4 }}
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
          S9 - How AI is evolving this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={SAGE}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI can see everything on the screen. The insight is on the desk.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what AI can analyse in a digital context, and what the camera frame
              misses when the most important research data is not on the screen.
            </p>
            <COAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same scenario. Two approaches, one finds the shoebox, one optimises the software.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Intuit needed to understand how small business owners actually managed their money before deciding what to build next.
              Toggle between the contextual observation approach and a hypothetical AI-analysis approach to see what each reveals,
              and what each misses.
            </p>
            <COExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Used in these frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where contextual observation shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              As a foundational discovery method, contextual observation maps to the early phases of every major
              framework: the moments when a team is trying to understand the problem before solving it.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link
                  key={slug}
                  href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <span className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}>
                    {name}
                  </span>
                  <span className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-2xs)', color: SAGE, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {phase}
                  </span>
                  <span
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}
                    dangerouslySetInnerHTML={{ __html: note }}
                  />
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
            <SectionLabel accent={SAGE}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with contextual observation.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <div
                  key={name}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4"
                  style={{ border: '1px solid var(--color-neutral-100)' }}
                >
                  <div className="shrink-0" style={{ minWidth: 200 }}>
                    {slug ? (
                      <Link
                        href={`/methods/${slug}`}
                        className="font-semibold hover:underline"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                      >{name}</Link>
                    ) : (
                      <span className="font-semibold"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                        {name}
                      </span>
                    )}
                  </div>
                  <span
                    style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}
                    dangerouslySetInnerHTML={{ __html: rel }}
                  />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S13 - Sources   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Convivial Toolbox: Generative Research for the Front End of Design',
                  author: 'Liz Sanders and Pieter Jan Stappers',
                  year:   '2012',
                  note:   'The definitive contemporary treatment of design research methods, including contextual and ethnographic approaches. Sanders and Stappers articulate the distinction between what people say, do, and make, and why all three are necessary for understanding experience. The book grounds contextual observation in a framework of generative research that connects field methods to design outcomes.',
                },
                {
                  title:  'Universal Methods of Design',
                  author: 'Bruce Hanington and Bella Martin',
                  year:   '2012',
                  note:   'A comprehensive reference of 100 design research methods, with clear descriptions of contextual inquiry, ethnographic research, and behavioral observation. Hanington and Martin provide practical guidance on when to use each method, what it produces, and how to handle the ethical and logistical challenges of field research.',
                },
                {
                  title:  'Interviewing Users: How to Uncover Compelling Insights',
                  author: 'Steve Portigal',
                  year:   '2013',
                  note:   'Though framed around interviewing, Portigal\'s book is the best practical treatment of the relationship between what people say and what they do: the foundational tension that contextual observation exists to resolve. His chapters on listening, following up on surprises, and reading artifacts in context apply directly to field observation work.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(61,107,90,0.30)' }} />
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

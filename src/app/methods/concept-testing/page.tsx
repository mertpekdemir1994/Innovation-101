import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import CTExampleToggle from './CTExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Concept Testing — Methods — Innovation 101',
}

const CTEstablishing  = dynamic(() => import('./CTEstablishing'),  { ssr: false })
const CTInteractive   = dynamic(() => import('./CTInteractive'),   { ssr: false })
const CTAIReactivated = dynamic(() => import('./CTAIReactivated'), { ssr: false })

const PLUM = '#6B4A77'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Deliver',
    note: 'Concept testing is the primary validation act of the Deliver phase: the concept or prototype produced in Develop meets real users before commitment to build. The stated-vs-revealed discipline and the pre-set threshold translate into a go/no-go decision that the phase requires before resources are committed.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Measure',
    note: "The Lean Startup's Build-Measure-Learn loop makes concept testing explicit in the Measure step. The concept is the MVP; the test measures real response to it against a pre-defined metric. The discipline of measuring revealed demand, not stated interest, is what keeps the loop honest and prevents the team from learning what it wanted to believe.",
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Friday',
    note: "Friday in a Design Sprint is a five-user test of the week's prototype. The concept testing discipline (real target users, a structured commitment or reaction ask, and an honest reading of behavior) is exactly what Friday requires. Without it, Friday becomes a show-and-tell rather than a test.",
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Sprint Review',
    note: 'The Sprint Review in Agile Innovation tests the increment against real user response. Concept testing brings the discipline of pre-set success criteria and revealed-preference measurement to the review, preventing the common failure mode where the team accepts polite stakeholder enthusiasm as validation of product-market fit.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'value-proposition-canvas',
    name: 'Value Proposition Canvas',
    rel: 'The natural upstream method. The canvas produces a value-proposition hypothesis: a map of claimed fit between what the product offers and what the customer needs. Concept testing is how that hypothesis meets real customers before the team commits to building it. The connections drawn in the canvas become the claims the test is designed to validate or disprove.',
  },
  {
    slug: null,
    name: 'Rapid Prototyping',
    rel: 'Makes the concept tangible enough for real people to react to honestly. Concept testing depends on fidelity that is high enough to get genuine reactions; rapid prototyping is how that fidelity is achieved efficiently. The prototype is the stimulus; the concept test is the disciplined learning from reactions to it.',
  },
  {
    slug: null,
    name: 'Assumption Mapping',
    rel: 'Surfaces the riskiest assumptions a concept rests on, ranked by uncertainty and importance. Concept testing is how the desirability assumptions (the ones about whether people actually want this) get tested. Assumption mapping tells you what to test first; concept testing provides the evidence that replaces assumption with data.',
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'The technique for probing the reactions behind the numbers. When the revealed commitment rate falls below the threshold, or when the gap between stated and revealed preference is surprisingly large, in-depth interviews are how the team understands why. They turn the quantitative result of a concept test into the qualitative insight that drives the next iteration.',
  },
  {
    slug: null,
    name: 'Pilot Launches',
    rel: 'The larger-scale, later-stage validation that a small concept test precedes. Both measure real behavior, but at different scales and costs: a concept test is fast and cheap, run before commitment to build; a pilot launch is larger and more expensive, run after the concept has cleared an initial test. The concept test is the gate that makes the pilot launch worth running.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ConceptTestingPage() {
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
              Concept Testing
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Putting a concept in front of real target users to gather structured evidence on whether they would actually use or buy it, before committing to build.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Everyone says your idea sounds great. The only question that matters is what they do when you ask them to commit, and whether you decided in advance what &ldquo;yes&rdquo; looks like.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <CTEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>Stated interest is almost always high. Only revealed commitment tells the truth.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Concept testing is the structured evaluation of a proposed solution with real members of the target audience,
                to learn whether it resonates, whether it solves a real problem, and whether people would actually use or buy
                it, before significant resources are committed to building it. Its purpose is to replace internal opinion
                and debate with external evidence from the people who actually matter.
              </Body>
              <Body>
                Its entire value rests on one hard distinction: stated preference versus revealed preference. Ask people whether
                they would be interested in a concept and they will, overwhelmingly, say yes: warmly and meaninglessly,
                because agreeing is free, agreeable, and costs nothing. Ask them to actually do something (sign up, provide
                payment, commit, use it) and the warm agreement collapses into the far smaller number who genuinely want it.
                That gap between what people say and what they do is where the truth of a concept lives, and surfacing it
                honestly is what concept testing exists to do.
              </Body>
              <Body>
                The discipline that makes the test honest is defining success <em>in advance</em>. Before testing, you set the
                criterion: the specific level of real commitment the concept must reach to proceed. Without that pre-set threshold,
                warm verbal interest can always be read as validation after the fact, and the test becomes theater that confirms
                whatever the team already wanted. With it, the concept faces a verdict it cannot spin.
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
            <SectionLabel accent={PLUM}>The gap and the line</SectionLabel>
            <SectionHeadingDark>What they say, what they do, and the line you drew first.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click each element to explore what it measures and why it matters. Toggle the scenario
              to see what it looks like when revealed commitment clears the threshold and when it does not.
            </p>
            <CTInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A validation tool, not a substitute for prototyping or for a launch.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}
                >Use it when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have a concept concrete enough for real people to react to honestly, and you are before the point of committing to full-scale development or launch.',
                    'You need to resolve genuine uncertainty about desirability (whether people actually want this) not just whether it functions.',
                    'You need to choose between competing concepts based on real external response rather than internal preference or executive conviction.',
                    "You want to replace internal debate with evidence from real target users who have something on the line.",
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
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
                >Do not lean on it when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "The concept is too vague to react to honestly. Make it tangible first (prototype it) then test. Reactions to vague descriptions are worthless.",
                    "The decision has already been made and the test would be theater to justify it. A test whose result cannot change the decision is not a test; it is a confirmation exercise.",
                    "You are unwilling to define and honor a success threshold in advance. Without it, the test has no power: any warm outcome can be spun as success.",
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
                The honest limit: concept testing measures desirability at a moment, with the fidelity and audience you put in
                front of it. Tested with the wrong audience, at misleading fidelity, or with leading questions that fish for
                approval, it produces confident but false signal. Its rigor comes entirely from real target users, an honest
                commitment ask, and a pre-set bar. Remove any of those and it becomes reassurance, not evidence.
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
            <SectionLabel accent={PLUM}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from pre-set criterion to honest verdict.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Define what you need to learn, and set the success criteria in advance.',
                  body: "State the specific question and the threshold for a go decision: the level of real commitment the concept must reach. Deciding this beforehand is what makes the result interpretable rather than a vibe to be spun. Commit it to paper and share it with the stakeholders who will act on it before the test runs. A threshold that lives only in someone's head, decided after the results are seen, is no threshold at all.",
                },
                {
                  n: '02',
                  title: 'Recruit real target users.',
                  body: "Test with actual members of the target audience, not colleagues, friends, or convenient stand-ins. The reactions of the wrong audience are worse than no data, because they carry false confidence. Screen recruits against the actual target profile; getting the right people is often the hardest logistical part and the most important.",
                },
                {
                  n: '03',
                  title: 'Present the concept at appropriate fidelity.',
                  body: "Make it concrete enough for honest reactions, without overbuilding. The point is a real reaction, not a finished product. Match the fidelity to what you need to learn: rough for early desirability questions, higher when the reaction depends on details. Overbuilding wastes the cost advantage of testing before commitment; underbuilding produces reactions to something too vague to judge.",
                },
                {
                  n: '04',
                  title: "Ask for commitment, not opinion.",
                  body: "Do not ask 'would you be interested?', which harvests warm, meaningless agreement. Ask people to actually do something that reveals preference: sign up, provide payment details, place a pre-order, try to use it. A landing-page test with a real sign-up, a fake-door test with a click-through, or a prototype session asking the participant to attempt a real task all produce revealed preference that a survey cannot.",
                },
                {
                  n: '05',
                  title: 'Read revealed demand, not politeness.',
                  body: 'Watch for genuine signals: do they lean in, ask when they can have it, try to use it, commit or pay? Treat mild verbal approval as noise, not signal. The gap between warm words and actual behavior is the truth the method exists to surface. Probe the gap: ask why someone said yes but hesitated to commit. The explanation is often the finding that drives the next iteration.',
                },
                {
                  n: '06',
                  title: 'Synthesize across sessions and decide honestly.',
                  body: 'Find the pattern across several tests, compare the revealed result to the pre-set threshold, and make the clear call the criterion demands: proceed, refine, or stop, even when the verdict is unwelcome. The hardest part of a concept test is honoring a negative result against executive pressure or team attachment to the concept. The threshold is there precisely for that moment.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(107,74,119,0.12)', lineHeight: 1.1, width: 40 }}
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
            <SectionLabel accent={PLUM}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and what to avoid.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'Success criteria are defined before testing, so the result drives a real decision rather than confirming what the team already wanted.',
                'Real target users (not internal stand-ins) provide the reactions. The commitment ask is something real: sign-up, payment, attempt to use.',
                'The team reads behavior and genuine demand signals rather than polite approval. Mild verbal interest is noted but not weighted as evidence.',
                'The team honors the verdict, including an unwelcome one, and stops or repositions when the evidence says to.',
                'The test is designed for the right question at the right fidelity, not overbuilt to the point of defeating the cost advantage of testing first.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: PLUM, flexShrink: 0, marginTop: 3 }}>✓</span>
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
                  mistake: 'Testing with the wrong audience.',
                  fix: 'Colleagues, friends, and convenient stand-ins give warm, useless reactions. They want you to succeed, they are not your customer, and they cannot reveal what a real target user would do when their own money or time is on the line. Recruit carefully; screen against the actual target profile.',
                },
                {
                  mistake: 'Asking leading questions that fish for validation.',
                  fix: '"You\'d love this, right?" or "This would solve your problem, wouldn\'t it?" harvest the answer you want. Ask for commitment and observe behavior instead. If someone says yes but hesitates to commit, the hesitation is the finding.',
                },
                {
                  mistake: 'Defining success after seeing the results.',
                  fix: 'The cardinal sin. With no pre-set threshold, any warm outcome can be spun as a win. The discipline of setting the criterion before the test, and sharing it publicly, is what makes the result a verdict rather than a Rorschach test the team reads the way it wants.',
                },
                {
                  mistake: 'Measuring stated interest and calling it validation.',
                  fix: 'A high "would you be interested?" number feels like proof and means almost nothing. It is the baseline. Warm verbal interest is what you get before any test. Only revealed commitment (what people do when they have to actually do something) counts as signal.',
                },
                {
                  mistake: 'Running a test whose result cannot change the decision.',
                  fix: 'If the launch is already locked and the test is being run to produce the slide that says "validated," it is theater. Only test when the answer can genuinely move the outcome. Otherwise you are spending time and money building false confidence.',
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
            <SectionLabel accent={PLUM}>Logistics</SectionLabel>
            <SectionHeadingLight>Designing the test from commitment ask to honest verdict.</SectionHeadingLight>
            <Body>
              A structured concept test runs from a few days to a couple of weeks, depending on how long
              it takes to recruit real target users and run enough sessions to see a pattern. The most
              important logistical act, setting the success threshold in writing before anything
              else, takes minutes and determines whether the result is a verdict or a vibe.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Write the success threshold down before you start',
                  body: "Commit the go/no-go criterion to paper before designing the test, and share it with the stakeholders who will act on it. A threshold that lives only in someone's head after the fact is no threshold at all. Pre-committing it publicly is what protects the test from being rationalized when the warm stated interest comes in higher than the revealed commitment.",
                },
                {
                  label: 'Design a real commitment ask',
                  body: "The heart of a good concept test is the mechanism that converts stated interest into revealed preference: a sign-up with payment details, a pre-order, a deposit, a fake-door click-through to a 'coming soon' page, an actual attempt to use the concept. This ask is where the truth is measured. Design it deliberately for the concept and the question you need to answer.",
                },
                {
                  label: 'Recruit carefully and screen for the real target',
                  body: 'Getting genuine target users is often the hardest logistical part and the most important. Screen recruits against the actual target profile, not just demographics, but the behavioral and situational criteria that define who the product is actually for. A test run on the wrong people produces confident, false results.',
                },
                {
                  label: 'Choose fidelity to fit the question',
                  body: 'Match the concept fidelity to what you need to learn. A rough description or simple landing page suffices for early desirability questions; higher fidelity is needed when the reaction depends on details of the experience. Overbuilding wastes the cost advantage of testing before commitment; underbuilding produces reactions to something too vague to generate honest signal.',
                },
                {
                  label: 'Run enough sessions to see a pattern',
                  body: 'A handful of sessions (five to eight users is common for qualitative signal; larger samples for a quantitative commitment rate) lets you see past individual quirks. Throughout, structure the test around behavior and commitment rather than verbal approval. The participant\'s desire to be encouraging is the single biggest threat to honest signal. Design around it by asking for commitment, not opinion.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(107,74,119,0.28)', marginTop: 4 }}
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
            <SectionLabel accent={PLUM}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI can simulate a customer who says yes. It can never simulate a customer who actually commits.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI genuinely helps a concept test, and the one thing
              it fundamentally cannot do, which happens to be the whole point.
            </p>
            <CTAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same concept. Two approaches. One finds the truth; one cannot.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A consumer goods company has a promising concept for a premium subscription product and confident executives
              under pressure to launch fast. Before committing, the team wants to know whether real demand exists.
              Toggle between the traditional test and a hypothetical AI-run version to see why only one of them
              can surface the gap.
            </p>
            <CTExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where concept testing shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Concept testing maps to the validation moment in nearly every framework: the point where
              a concept meets real external evidence before the team commits to build.
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
                    style={{ fontSize: 'var(--text-2xs)', color: PLUM, textTransform: 'uppercase', letterSpacing: '0.08em' }}
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
            <SectionLabel accent={PLUM}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with concept testing.</SectionHeadingLight>

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
                      <span
                        className="font-semibold"
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
            <SectionLabel accent={PLUM}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Testing Business Ideas',
                  author: 'David Bland and Alexander Osterwalder',
                  year:   '2019',
                  note:   "The definitive guide to structured concept and assumption testing. Bland and Osterwalder provide a library of experiment types (from landing-page tests to fake-door studies to pre-order campaigns) each mapped to the type of assumption being tested and the risk profile of the concept. The emphasis on pre-set success criteria and revealed-preference measurement is the core discipline the book teaches and that makes the whole method trustworthy.",
                },
                {
                  title:  'The Mom Test',
                  author: 'Rob Fitzpatrick',
                  year:   '2013',
                  note:   "On getting honest signal rather than polite encouragement: essential for reading past stated interest. Fitzpatrick's central insight is that people will say anything to avoid being unkind, which means almost all concept feedback is warm, misleading, and useless until you ask for commitment or watch actual behavior. The book teaches how to design questions and interactions that surface the truth people are too polite to volunteer.",
                },
                {
                  title:  'Sprint',
                  author: 'Jake Knapp, John Zeratsky, and Braden Kowitz',
                  year:   '2016',
                  note:   "For the five-user test format used at the end of a Design Sprint, the most widely practiced form of rapid concept testing. Knapp and team are explicit about what Friday is: a test of genuine user response to a prototype, not a show-and-tell. Their discipline around interviewing for honest reactions rather than fishing for approval reflects the same stated-vs-revealed insight that makes concept testing work as a method.",
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div
                    className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(107,74,119,0.30)' }}
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

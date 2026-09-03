import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import POCExampleToggle from './POCExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'
import FrameworkHoverCard from '../../../components/method/FrameworkHoverCard'

export const metadata: Metadata = {
  title: 'Proof of Concept — Methods — Innovation 101',
}

const POCEstablishing  = dynamic(() => import('./POCEstablishing'),  { ssr: false })
const POCInteractive   = dynamic(() => import('./POCInteractive'),   { ssr: false })
const POCAIReactivated = dynamic(() => import('./POCAIReactivated'), { ssr: false })

const BRICK = '#8A4B3C'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop / Deliver',
    note: 'A PoC typically belongs at the boundary of the Double Diamond\'s second diamond, at the end of Develop, when a concept is being tested for feasibility before committing to delivery. It can also appear early in Deliver: before building begins in earnest, a PoC de-risks the hardest technical assumption. The Double Diamond\'s diverge-converge rhythm makes explicit where the PoC sits: just before convergence on what to build.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'In the Lean Startup\'s Build-Measure-Learn loop, a PoC occupies the earliest, smallest possible Build: build only what tests the riskiest assumption. It is the instrument that generates the data point for the Measure stage. The Lean Startup\'s discipline, build the smallest thing that tests the most critical uncertain assumption, is the PoC\'s exact logic applied to the BML loop.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Sprint (Technical Spike)',
    note: 'In Agile Innovation, a PoC maps directly to the concept of a technical spike: a short, focused piece of work designed to resolve a specific technical uncertainty before it is baked into a sprint commitment. A spike is a team-sanctioned PoC. The key Agile discipline applies: the spike is time-boxed, discarded after answering its question, and its findings feed the backlog, not a living codebase.',
  },
  {
    slug: 'front-end-of-innovation',
    name: 'Front-End of Innovation',
    phase: 'Feasibility Assessment',
    note: 'The Front-End of Innovation\'s feasibility assessment asks: can this work technically? A PoC is one of the primary instruments for answering that question. Where the FEI framework defines the questions to answer (Is it technically feasible? Is it economically viable?), the PoC defines how to answer the technical one: build a bare, focused experiment that proves or disproves the critical technical assumption.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    rel: 'The next step up the staircase of increasing realness. A PoC asks: can this work internally? A prototype asks: does this concept work for people? The prototype is rougher and more visible than a finished product, but it is designed to be used by people, unlike the PoC, which is internal and deliberately bare. The PoC de-risks the hardest technical bet; the prototype de-risks the concept with users. They sit in sequence, not competition.',
  },
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'Where the PoC tests technical feasibility (can this work?), concept testing tests desirability (do people want this?). They address different risks and should not be confused. A team that runs a successful PoC has proven the technical hard part is possible; they still need concept testing to validate that what is possible is also wanted. Both are de-risking instruments aimed at different bets.',
  },
  {
    slug: 'how-might-we',
    name: 'How Might We',
    rel: 'A well-formed How Might We question can help crystallise the PoC question: HMW reframes problems into opportunity statements; the PoC then identifies which technical assumption underpins the most promising answer. The HMW discipline of scoping a single well-bounded question maps naturally onto the PoC discipline of naming one critical uncertain thing. Use HMW to clarify direction; use the PoC to prove it is technically reachable.',
  },
  {
    slug: 'assumption-mapping',
    name: 'Assumption Mapping',
    rel: 'Assumption Mapping helps identify which bets to prove first: it maps assumptions by importance and certainty, surfacing the ones that are both critical and genuinely in doubt. The output of an Assumption Mapping session can directly feed the PoC question: the most important, least certain technical assumption is the right candidate for a PoC. Use mapping to choose the question; use the PoC to answer it.',
  },
  {
    slug: null,
    name: 'The Staircase of Increasing Realness',
    rel: 'The PoC, prototype, MVP, and pilot form a staircase of increasing realness and commitment. PoC: can it work? (internal, discarded). Prototype: does the concept work for people? (rough, with real users). MVP: will people adopt the smallest real product? (smallest shippable thing). Pilot: does it work at limited real-world scale? Holding these distinct is one of the most valuable disciplines a delivery team can maintain. Conflating them means spending prototype money on PoC questions, or MVP effort before the concept is validated.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ProofOfConceptPage() {
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
                color:       BRICK,
                background: 'rgba(138,75,60,0.12)',
                border:     '1px solid rgba(138,75,60,0.28)',
              }}
            >
              Delivery &amp; Validation
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Proof of Concept
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A deliberately bare, internal experiment built to answer the one critical question
              a concept depends on, before committing to build it.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The PoC is not a product. It is not a prototype. It is a proving rig. It answers
              one question, then it is discarded. The knowledge it produced is what carries forward.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <POCEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>What it is</SectionLabel>
            <SectionHeadingLight>A proving rig, not a product. Built to answer one question. Typically discarded after.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                A Proof of Concept is a deliberately minimal, internal experiment built to answer
                the one technical question a concept depends on before committing to build it. It is
                not a product, not a prototype, and not the beginning of the production system. It is
                a proving rig: bare enough to answer its question, rough enough to be built fast, and
                typically discarded the moment it has served its purpose. The proof was the point. The
                artifact was not.
              </Body>
              <Body>
                The PoC&rsquo;s defining discipline is scope. It contains only what is needed to answer the
                one critical, genuinely uncertain question: the technical bet the concept stands or falls
                on. Every component in the rig exists only because it is necessary to generate the
                verdict. A component that does not serve the question does not belong. This is not
                minimalism for its own sake; it is minimalism as a proof of seriousness about what is
                actually being tested.
              </Body>
              <Body>
                The output of a PoC is a verdict, not a deliverable. It works. It does not work. Or:
                it works under specific, named conditions that you must now carry forward. That qualified
                verdict, especially its conditions, is often more valuable than a clean pass, because
                it tells you exactly where the signal breaks down and what assumptions you must not import
                into what you build next. The rig is discarded. The knowledge carries forward: to a
                prototype, to an MVP, or to a decision to stop before spending more.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Interactive proving rig   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>The proving rig: explore what it includes, excludes, and produces.</SectionLabel>
            <SectionHeadingDark>Click the parts of the rig to understand the discipline behind each choice.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Each element of a PoC is a deliberate decision: what is included, what is absent, and
              what the verdict means. Explore the rig to see the discipline behind each one,
              including the anti-pattern that quietly turns a PoC into something else.
            </p>
            <POCInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>When to deploy it</SectionLabel>
            <SectionHeadingLight>When you have a specific, technically uncertain question that a concept stands or falls on, and building first would be the expensive way to find out.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'There is a specific technical question the concept depends on that is genuinely uncertain and that a bad answer would make the rest of the build wasteful.',
                    'The cost of getting that question wrong is high relative to the cost of building a bare rig to answer it now.',
                    'You can name a precise, answerable question and a pass/fail threshold before the test runs.',
                    'You are early enough that the answer could reshape what you build, or lead to stopping altogether.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: BRICK, flexShrink: 0, marginTop: 2 }}>→</span>
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
                    'The technical question is not genuinely uncertain; if you already know it is possible, you do not need a PoC, you need to build.',
                    'You are using "PoC" as a label to avoid committing to production quality, while building something you intend to ship. That is not a PoC; it is a product with technical debt baked in.',
                    'The question cannot be answered by internal experiment alone; some questions (market adoption, user desirability) require real users and belong to a prototype or pilot instead.',
                    'There is no clear pass/fail threshold. If you cannot define what "it works" means before you start, you will rationalise whatever result you get.',
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
                The honest limit: the PoC answers the question you point it at. If the question is wrong
                (too vague, not the most critical bet, or tested under conditions unlike reality) the
                verdict is misleading even if technically accurate. The discipline is in the question, the
                threshold, and the integrity of the conditions. Get those right before you build the rig.
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
            <SectionLabel accent={BRICK}>How it works</SectionLabel>
            <SectionHeadingLight>Five moves, from naming the question to discarding the rig and carrying the knowledge forward.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Name the one critical question precisely.',
                  body: 'A PoC starts with a specific, answerable question, not a general hope. "Can this work?" is not a question a PoC can answer; "Can we predict delivery delays with accuracy above 75% using existing data?" is. The precision matters because it determines what gets built and what counts as a verdict. A vague question produces a verdict you will rationalise rather than use.',
                },
                {
                  n: '02',
                  title: 'Name the pass/fail threshold before you start.',
                  body: 'Set the criterion for a verdict before the rig runs, not after seeing the results. This is the discipline that prevents motivated reasoning from turning an ambiguous result into a "pass" because the team wanted it to work. If you cannot name a specific threshold in advance, you do not yet have a testable question.',
                },
                {
                  n: '03',
                  title: 'Build only what answers the question.',
                  body: 'Assemble only the components necessary to generate the verdict. No interface, no extra features, no production engineering, no completeness. Every addition that does not directly serve the critical question is scope drift; it costs time without buying more certainty about the one thing being proved. This discipline is harder than it sounds: there is always a temptation to make the rig slightly more useful, or slightly more complete.',
                },
                {
                  n: '04',
                  title: 'Test under conditions close enough to reality to matter.',
                  body: 'Use real data, real infrastructure, and real conditions wherever possible, or be explicit about what you idealised and why. A PoC that proves the question only in a clean sandbox environment has answered a slightly different question than the one you have in production. The proof conditions must be named as part of the verdict.',
                },
                {
                  n: '05',
                  title: 'Deliver the verdict with its conditions. Discard the rig.',
                  body: 'Communicate the result precisely: what was proven, under what conditions, and what remains uncertain. Name the conditions of a qualified verdict explicitly: they are not a failure of the PoC, they are its most valuable output, because they tell you what to build and what to avoid. Then discard the rig. The knowledge it produced carries forward; the artifact does not.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(138,75,60,0.12)', lineHeight: 1.1, width: 40 }}
                  >{n}</span>
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
            <SectionLabel accent={BRICK}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the failure modes that quietly turn a PoC into something else.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The question is specific and the pass/fail threshold is set before the rig runs, not after seeing the results.',
                'The rig contains only what is needed to answer the question, and nothing else.',
                'Real data and real conditions are used, or the idealisation is named explicitly as a limit of the verdict.',
                'A qualified verdict (it works under these conditions, degrades under those) is treated as valuable, not as a partial failure.',
                'The rig is discarded after the verdict, and the knowledge carries forward into what is built next.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: BRICK, flexShrink: 0, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              The failure modes
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: 'Growing the PoC into the production system.',
                  fix: 'The most common and costly failure. The rig was built to prove, with shortcuts that are deliberate and appropriate for an experiment. Those shortcuts are not appropriate in production code. Growing the PoC into the product carries all of them into something that must be maintained, scaled, and supported. Discard the rig. Build the product properly from the knowledge the rig produced.',
                },
                {
                  mistake: 'Scope drift: adding things that don\'t serve the critical question.',
                  fix: 'The moment the PoC acquires an interface, an extra feature, or some polish, it has become a half-built, unvalidated product. Each addition feels cheap at the time. They accumulate. The discipline: if this component does not directly help answer the one question, it does not belong. Every addition that doesn\'t serve the question is time that didn\'t buy certainty.',
                },
                {
                  mistake: 'Not naming the threshold before running the test.',
                  fix: 'Without a pre-committed threshold, a motivated team will rationalise whatever result they get. "78% accuracy, that\'s promising enough" and "78% accuracy, we set 80% as the target, and this tells us why" are entirely different verdicts. Set the threshold before the rig runs. The discipline is in the commitment, not just the number.',
                },
                {
                  mistake: 'Using "PoC" as a label for something you intend to ship.',
                  fix: 'If the intent is to ship it, it is a product. Calling it a PoC to avoid production-quality expectations just means the shortcuts will find their way into production. The PoC label implies a clear decision: this artifact will be discarded. If that decision has not been made, the work is not a PoC.',
                },
                {
                  mistake: 'Testing in too-clean conditions and importing that as reality.',
                  fix: 'A PoC proved on curated, clean data in an ideal environment has proven a slightly different thing than what will run in production. Name the proof conditions precisely. A qualified verdict that works under named conditions is more useful than an unqualified "pass" that obscures where the signal degrades.',
                },
              ].map(({ mistake, fix }) => (
                <div
                  key={mistake}
                  className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
                >
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
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Logistics</SectionLabel>
            <SectionHeadingLight>Small team, short timeframe, real data, and a pre-committed verdict criterion.</SectionHeadingLight>
            <Body>
              A PoC typically involves a small team: one to four people, usually technically
              skilled in the domain being tested. Timescales range from a day for a narrow technical
              question to a few weeks for a more complex proof, but always bounded. If the PoC is
              taking months, the scope has drifted or the question was not precise enough.
            </Body>
            <div className="mt-8 grid md:grid-cols-3 gap-5">
              {[
                { label: 'Team size', value: '1–4 people', note: 'Small, technically skilled in the domain of the question' },
                { label: 'Timeframe', value: 'Days to weeks', note: 'Bounded strictly; months means scope has drifted' },
                { label: 'Audience', value: 'Internal only', note: 'No external users; the rig is not a product experience' },
              ].map(item => (
                <div key={item.label} className="rounded-lg p-5"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
                  <p className="font-mono uppercase tracking-widest mb-1"
                    style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                    {item.label}
                  </p>
                  <p className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                    {item.value}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item.note}
                  </p>
                </div>
              ))}
            </div>

            <div className="max-w-prose mx-auto mt-8 rounded-lg p-5"
              style={{ background: `rgba(138,75,60,0.04)`, border: `1px solid rgba(138,75,60,0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                Remote vs in-person
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The proving rig itself is typically built and run entirely remotely; there is no
                in-person element to the experiment. The human-judgment moments (naming the question,
                interpreting the verdict, deciding what to build next) benefit from close collaboration
                but do not require physical co-location. PoCs work well across distributed teams.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S9 - AI Reactivated   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>AI &amp; Proof of Concept</SectionLabel>
            <SectionHeadingDark>AI can build the rig dramatically faster. The judgment calls (which question, which conditions, what the verdict means) stay human.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              The PoC is one of the places where AI gives genuinely substantial time leverage: the
              rig is tightly scoped, outcome-focused, and internal, precisely the conditions where
              AI coding assistance compounds speed most. Toggle to see where that leverage is real
              and where the human role remains load-bearing.
            </p>
            <POCAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - Example toggle   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>In practice</SectionLabel>
            <SectionHeadingLight>A logistics team asks: can the data predict delays? See what a well-run PoC produces, and what AI changes about the time it takes.</SectionHeadingLight>
            <p className="max-w-prose mx-auto px-6 md:px-8 mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              A well-formed PoC question, a threshold set in advance, real messy data, and a
              qualified verdict that reshaped what to build. See the traditional approach first,
              then compare what AI changes, and what it does not.
            </p>
            <POCExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Framework connections   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Framework connections</SectionLabel>
            <SectionHeadingDark>Where the PoC sits inside the frameworks that shape delivery.</SectionHeadingDark>

            <FrameworkHoverCard links={FRAMEWORK_LINKS} variant="dark" />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Related methods</SectionLabel>
            <SectionHeadingLight>The PoC in context, and the staircase it belongs to.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-2">
              {RELATED_METHODS.map(m => (
                <div key={m.name}
                  className="rounded-xl p-6"
                  style={{
                    background: 'var(--color-neutral-50)',
                    border: '1px solid var(--color-neutral-100)',
                  }}>
                  <div className="flex items-start gap-4 flex-wrap">
                    <div className="min-w-0 flex-1">
                      {m.slug ? (
                        <Link href={`/methods/${m.slug}`}
                          className="font-semibold hover:underline"
                          style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                          {m.name}
                        </Link>
                      ) : (
                        <p className="font-semibold"
                          style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                          {m.name}
                        </p>
                      )}
                      <p className="mt-1"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                        {m.rel}
                      </p>
                    </div>
                  </div>
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
          <div className="py-20 border-t" style={{ borderColor: 'var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Sources</SectionLabel>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: 'The Lean Startup',
                  author: 'Eric Ries',
                  year: '2011',
                  note: 'Foundational treatment of build-measure-learn and the importance of the smallest experiment that tests the riskiest assumption. The PoC is the Lean Startup\'s Build step in its most minimal form.',
                },
                {
                  title: 'Testing Business Ideas',
                  author: 'David Bland &amp; Alexander Osterwalder',
                  year: '2019',
                  note: 'A comprehensive playbook for de-risking assumptions with appropriately-sized experiments. Provides specific experiment types and evidence strength ratings; the PoC sits at the technical end of its experiment spectrum.',
                },
                {
                  title: 'Escaping the Build Trap',
                  author: 'Melissa Perri',
                  year: '2018',
                  note: 'Clear analysis of what happens when organisations build without adequately de-risking first, and the structural and cultural conditions that lead to it. The PoC is one of the primary instruments for avoiding the build trap at the technical level.',
                },
              ].map(s => (
                <div key={s.title}
                  className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
                  <p className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    <span dangerouslySetInnerHTML={{ __html: s.title }} />: <span dangerouslySetInnerHTML={{ __html: s.author }} />{' '}
                    <span style={{ fontWeight: 400, color: 'var(--color-neutral-500)' }}>({s.year})</span>
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {s.note}
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

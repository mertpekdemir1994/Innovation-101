import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import MVPExampleToggle from './MVPExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'
import FrameworkHoverCard from '../../../components/method/FrameworkHoverCard'

export const metadata: Metadata = {
  title: 'MVP & MLP — Methods — Innovation 101',
}

const MVPEstablishing  = dynamic(() => import('./MVPEstablishing'),  { ssr: false })
const MVPInteractive   = dynamic(() => import('./MVPInteractive'),   { ssr: false })
const MVPAIReactivated = dynamic(() => import('./MVPAIReactivated'), { ssr: false })

const BRICK = '#8A4B3C'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'The MVP is the central artifact of the Lean Startup\'s Build-Measure-Learn loop: the smallest thing built that produces a real market signal. The BML loop is designed around the MVP: build the minimum that tests the riskiest assumption, measure what real users do, learn from that signal, and repeat. The Lean Startup\'s core insight, that validated learning is the progress metric, not features shipped, is what the MVP exists to serve.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Deliver',
    note: 'The MVP or MLP appears at the start of the Double Diamond\'s Deliver phase: the moment the most promising concept is built and released to real users, replacing the prototype. The first diamond (Discover and Define) identified the right problem; the second (Develop and Deliver) builds the right solution. The MVP/MLP is the minimum real product that tests whether the defined solution actually works in the market.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Release / Increment',
    note: 'In Agile Innovation, the MVP or MLP maps to the incremental release: the minimum increment that delivers real value to real users and generates real feedback. Agile\'s sprint-based rhythm is designed for exactly this: ship the smallest viable increment, learn from it, and incorporate the learning into the next sprint. The MVP/MLP disciplines (what is genuinely core? what does the signal tell you?) apply to every increment decision.',
  },
  {
    slug: 'front-end-of-innovation',
    name: 'Front-End of Innovation',
    phase: 'Launch',
    note: 'In the Front-End of Innovation framework, the MVP or MLP is the first real market launch: the moment the concept transitions from internal development to the real market. The FEI process (idea generation, concept development, feasibility assessment) culminates here, when the validated concept is released to real users to test whether adoption follows. The MVP/MLP is the lightest possible version of that launch.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'proof-of-concept',
    name: 'Proof of Concept',
    rel: 'Upstream, and a crucial distinction. A PoC is an INTERNAL experiment that proves the thing CAN work, never released to a market. An MVP or MLP is the smallest REAL product released to REAL users to learn whether they will actually adopt it. A PoC answers "can it work?"; an MVP or MLP answers "will people use it?" The PoC comes first, when technical feasibility is genuinely uncertain. The MVP/MLP comes after, when you need a market signal.',
  },
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    rel: 'Upstream, and a crucial distinction. A prototype is built to LEARN and then be DISCARDED: rough, often shown to a handful of users, never actually shipped. An MVP or MLP is a real product, really released. Same spirit of minimum, different stakes and permanence. Prototypes cost less and carry no production responsibility; MVPs and MLPs ship to real users and carry whatever brand, support, and maintenance commitment a real product carries.',
  },
  {
    slug: null,
    name: 'Pilot Launches',
    rel: 'The close neighbour at greater scale-realism. An MVP or MLP tests whether people adopt the smallest REAL product; a pilot tests whether the full thing works operationally in the real world at limited but real scale: real staff, real processes, real operational load. The MVP/MLP question is adoption; the pilot question is real-world operation. They sit in sequence when the operational model is complex.',
  },
  {
    slug: null,
    name: 'Concept Testing',
    rel: 'Upstream: concept testing checks whether the idea resonates BEFORE you build and ship anything. A concept test is far cheaper than a market release, and it can prevent you from shipping the wrong thing. The sequence is concept test → MVP/MLP, not the reverse. If the concept has not been tested at all, an MVP is an expensive way to discover the idea does not resonate.',
  },
  {
    slug: null,
    name: 'Post-Launch Feedback Loops',
    rel: 'The natural downstream: once the MVP or MLP is live, feedback loops are how you keep learning from real user behavior continuously, rather than treating the launch as the end of the learning process. The MVP/MLP is a question posed to the market; feedback loops are how you keep listening to the answer as it evolves.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function MVPMLPPage() {
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
              MVP &amp; MLP
            </h1>

            <p
              className="mb-2 max-w-[560px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Minimum Viable and Minimum Lovable Product.
            </p>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}
            >
              The smallest real product you put in front of real users: built either to learn as cheaply
              as possible (viable) or to be genuinely loved rather than merely tolerated (lovable).
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Both are minimum. Both ship only the core. The question is not how much you build,
              it is what you build the core to do: teach you something, or make someone love it.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <MVPEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>What it is</SectionLabel>
            <SectionHeadingLight>The smallest real product, released to real users, to answer whether people will actually adopt it.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                An MVP or MLP is the smallest REAL product you put in front of REAL users. This is what
                separates both from everything upstream of them: a proof of concept is an internal experiment
                that proves the thing can work, and a prototype is a rough artifact built to learn whether
                the concept lands. An MVP or MLP actually ships, to actual users, in the actual market. The
                question it answers is not &ldquo;can we build it?&rdquo; or &ldquo;does the concept make sense?&rdquo; but &ldquo;will
                people actually adopt and use this?&rdquo;
              </Body>
              <Body>
                The Minimum Viable Product is the smallest version that works and delivers the core value,
                released in order to learn. Its purpose is validated learning at the lowest possible cost:
                it is a question posed to the market, and the answer, whether people adopt it, is the
                deliverable. The MVP is one of the most misunderstood ideas in innovation. It is not a beta
                and not a low-quality version of the eventual product. It is the minimum artifact needed to
                test a specific assumption. Sometimes that is a landing page. Sometimes a video (Dropbox
                validated enormous demand with a three-minute explainer, no product at all). Sometimes a
                manual, human-powered service simulating what software will eventually do.
              </Body>
              <Body>
                The Minimum Lovable Product is the same tight scope, but built so that people genuinely
                LOVE it rather than merely tolerate it. Same ruthless cutting, same small core, but the
                core is executed with enough craft, care, and emotional resonance that early users become
                advocates rather than reluctant testers. The MLP exists because in many markets a
                merely-functional minimum teaches you nothing useful: if people churn from a joyless
                product, you have not learned that they do not want the idea, only that they did not want
                THAT. The MLP insists that the minimum still has to be good enough to love.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Viable vs Lovable: the same core, optimized differently   LIGHT   [ADDED]
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Viable vs Lovable: the same core, optimized differently</SectionLabel>
            <SectionHeadingLight>An MLP is not an MVP plus features. The scope is identical; only the optimization differs.</SectionHeadingLight>

            <div className="flex flex-col gap-5 mb-10">
              <Body>
                The most common misunderstanding is that an MLP is an MVP with more stuff: a bigger build,
                extra features, a coat of polish on top. It is not, and getting this right is the whole
                point of the distinction.
              </Body>
              <Body>
                <span className="font-semibold">What they share (and it is most of it):</span> Both are
                MINIMUM. Both ship only the CORE (the small set of features that actually deliver the
                central value) and both ruthlessly cut everything else. The prioritization work is the
                same; deciding what to cut is the hardest and most valuable part, and it is identical
                for both. An MLP is not permission to build more. It holds the same hard line on scope.
                If your &ldquo;MLP&rdquo; has more features than your MVP would have, you have not built an MLP;
                you have built a bigger product and given it a nicer name.
              </Body>
              <Body>
                <span className="font-semibold">What differs: what the core is optimized for.</span> This is
                the entire distinction. The MVP optimizes the core for LEARNING at minimum cost: get a real
                signal from the market as fast and cheaply as possible. The MLP optimizes the same core
                for LOVE: execute it with enough craft and emotional resonance that people genuinely want
                it, not merely accept it. Same scope. Different objective function.
              </Body>
            </div>

            {/* Comparison table */}
            <div className="overflow-x-auto mb-10">
              <table className="w-full text-sm" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th className="text-left py-3 pr-4" style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-neutral-500)', borderBottom: '1px solid var(--color-neutral-100)', fontWeight: 400 }}></th>
                    <th className="text-left py-3 px-4" style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: BRICK, borderBottom: '1px solid var(--color-neutral-100)', fontWeight: 600 }}>Minimum Viable Product</th>
                    <th className="text-left py-3 pl-4" style={{ fontSize: 'var(--text-2xs)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.12em', color: BRICK, borderBottom: '1px solid var(--color-neutral-100)', fontWeight: 600 }}>Minimum Lovable Product</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      row: 'Scope',
                      mvp: 'Core features only, everything else cut',
                      mlp: 'Core features only, everything else cut (the SAME cut)',
                    },
                    {
                      row: 'Optimized for',
                      mvp: 'Validated learning at minimum cost',
                      mlp: 'Genuine love, users become advocates',
                    },
                    {
                      row: 'The question it asks',
                      mvp: '"Will people adopt this at all?"',
                      mlp: '"Will people love this enough to champion it?"',
                    },
                    {
                      row: 'What "minimum" means',
                      mvp: 'The least you can build and still learn',
                      mlp: 'The least you can build and still be loved',
                    },
                    {
                      row: 'Strength',
                      mvp: 'Fast, cheap, honest signal from the market',
                      mlp: 'A signal about the idea as people would actually experience it',
                    },
                    {
                      row: 'Failure mode',
                      mvp: 'FALSE NEGATIVE: people reject the joyless execution, you conclude the idea is bad',
                      mlp: 'OVER-BUILDING: "lovable" becomes an excuse to keep polishing and never ship',
                    },
                  ].map((r, i) => (
                    <tr key={i}>
                      <td className="py-3 pr-4 align-top font-semibold"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)', borderBottom: '1px solid var(--color-neutral-50)' }}>
                        {r.row}
                      </td>
                      <td className="py-3 px-4 align-top"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', borderBottom: '1px solid var(--color-neutral-50)' }}>
                        {r.mvp}
                      </td>
                      <td className="py-3 pl-4 align-top"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', borderBottom: '1px solid var(--color-neutral-50)' }}>
                        {r.mlp}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-4">
              <div className="rounded-lg p-5"
                style={{ background: 'rgba(217,119,6,0.04)', borderLeft: '3px solid rgba(217,119,6,0.30)' }}>
                <p className="font-semibold mb-2"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                  Each guards against the other&rsquo;s failure.
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  The MVP&rsquo;s danger is the false negative: a joyless product rejected for its execution, read
                  as a verdict on the concept. That is how good ideas get killed by bad tests. The MLP&rsquo;s
                  danger is the opposite: &ldquo;we need it to be lovable&rdquo; is an infinitely elastic excuse for
                  not shipping, and a team can polish its way out of ever learning anything. Holding both in
                  mind is the discipline: ship something real and cheap enough to learn from, but good enough
                  that what you learn is about the idea and not about your indifference.
                </p>
              </div>

              <div className="rounded-lg p-5"
                style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
                <p className="font-semibold mb-2"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                  Which to lean toward depends on the market.
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  In a genuinely novel category, where nothing like this exists and expectations are unformed,
                  a bare MVP can teach you a great deal: people will tolerate rough edges for something that
                  solves a real problem no one else solves. In a crowded, mature category with high
                  expectations, an unlovable MVP tells you almost nothing: users have alternatives and will
                  churn from a joyless product regardless of whether the underlying idea is good. The more
                  competitive and expectation-laden the market, the more &ldquo;lovable&rdquo; is part of &ldquo;viable&rdquo; at all.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - Interactive signature visual   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Same core. Same cuts. Toggle what you optimize it for.</SectionLabel>
            <SectionHeadingDark>Click the shared core and the shared cut pile. Toggle between the two optimizations. Notice that nothing changes about the scope.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              The scope stays identical when you toggle between MVP and MLP. The feature tiles in the
              core do not change. That is the entire point. What changes is only what that core is
              optimized for, and what each optimization buys you, and what each risks.
            </p>
            <MVPInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S6 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>When to deploy it</SectionLabel>
            <SectionHeadingLight>When the real remaining uncertainty is market behavior, and you are ready to act on whatever the answer is.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have established that the thing can work (via a PoC if feasibility was uncertain) and the concept resonates (via prototyping or concept testing), and now need to know whether people will actually ADOPT it.',
                    'The real remaining uncertainty is market behavior: will people use it, pay for it, stick with it? Only a real release to real users can answer that.',
                    'You want validated learning from the market at the lowest cost that still produces a trustworthy signal.',
                    'You are prepared to act on the answer (improve, pivot, or stop) rather than treat the release as theater.',
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
                    'Feasibility is still genuinely uncertain: prove it can work first (proof of concept). Shipping to real users to discover it cannot be built is an expensive way to learn that.',
                    'You have not tested the concept at all: a rough prototype or concept test is far cheaper than a market release for learning whether the idea lands.',
                    'You are not prepared to act on the answer; releasing an MVP and ignoring the adoption signal is expensive theater.',
                    'There is no clear success criterion: without defining what "adoption" would mean in advance, you will rationalise whatever result you get.',
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
                The honest limit: an MVP or MLP gives you a real market signal, but only about what you
                actually shipped, under the conditions you shipped it. The interpretive burden is heavy:
                when adoption is weak, you must judge whether the market rejected the IDEA or rejected your
                EXECUTION of it, and those call for opposite responses (pivot vs improve). That judgment is
                the hardest and most consequential part of the method, and no metric hands it to you.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S7 - How it works   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>How it works</SectionLabel>
            <SectionHeadingLight>Seven moves, from naming the assumption to interpreting the signal honestly.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Name the assumption the release will test.',
                  body: 'Be specific about what you are trying to learn: will this segment adopt? Will they pay? Will they return? An MVP built to "get feedback" produces generalized noise; one built to answer a specific question produces a usable answer. The specificity of the assumption determines the usefulness of the signal.',
                },
                {
                  n: '02',
                  title: 'Identify the true core, and cut everything else.',
                  body: 'Determine the smallest set of features that actually delivers the central value. Everything outside that core is cut, for both MVP and MLP. This prioritization is shared and is the hardest, most valuable work. The ruthless cutting is not a later step; it is where most of the judgment lives.',
                },
                {
                  n: '03',
                  title: 'Choose what to optimize the core for: viable or lovable.',
                  body: 'Decide deliberately, and with the market in mind, whether you are optimizing for cheapest honest learning (MVP) or for genuine love and early advocacy (MLP). In a crowded, high-expectation market, lovable is often part of viable. In a novel, low-expectation category, bare may be enough to teach you what you need.',
                },
                {
                  n: '04',
                  title: 'Build the least that can carry that objective.',
                  body: 'For an MVP: the cheapest artifact that produces a real market signal: a landing page, a video, a manual concierge service, a small real product. For an MLP: the same core, executed with the craft that makes it genuinely good to use, without expanding scope. The artifact is not the point; the signal it produces is.',
                },
                {
                  n: '05',
                  title: 'Define the success threshold before you release.',
                  body: 'Agree what adoption level would count as validation, and what would count as a negative signal, before you release. Without this, teams rationalise whatever result they get, and the release teaches nothing. Set the threshold. Commit to it.',
                },
                {
                  n: '06',
                  title: 'Release to real users and measure real behavior.',
                  body: 'Put it in front of actual users in the actual market and measure what matters against the assumption you named. Real behavior (use, return, pay, recommend) is the point. Stated intent, survey results, and expressed enthusiasm are poor predictors of what people will actually do.',
                },
                {
                  n: '07',
                  title: 'Interpret honestly: idea or execution?',
                  body: 'When the signal is weak, do the hard interpretive work: did the market reject the IDEA, or reject this EXECUTION of it? Weak adoption of a joyless MVP in a competitive market may be a false negative. Conflating the two leads teams to pivot away from good ideas or to keep polishing bad ones. This is the judgment the method turns on.',
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
          S8 - Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the failure modes that quietly undermine either approach.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The release tests a specific, named assumption and produces a clear answer to it.',
                'The core is genuinely minimal, and the same ruthless cutting applies whether the goal is viable or lovable.',
                'The choice of viable vs lovable is made deliberately, based on the market\'s expectations, not by default or as an excuse to build more or less.',
                'The success threshold is set before release, not rationalized after seeing the results.',
                'The team interprets weak signals honestly, distinguishing rejection of the idea from rejection of the execution.',
                'The learning actually changes what happens next (improve, pivot, or stop).',
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
                  mistake: 'Treating the MVP as a beta or a low-quality version of the final product.',
                  fix: 'An MVP is not a smaller, worse version of what you want to build; it is the minimum artifact that tests a specific assumption. Build the test, not a stunted product. A stunted product generates vague feedback about the product; the MVP generates a specific answer to the assumption.',
                },
                {
                  mistake: 'Thinking the MLP is the MVP plus features.',
                  fix: 'The MLP has the same scope; it differs in what the core is optimized for. If your MLP is bigger than your MVP would have been, it is not an MLP. The hard prioritization work is the same. The craft investment is in the quality of what remains, not the quantity.',
                },
                {
                  mistake: 'The false negative: shipping something joyless in a crowded market.',
                  fix: 'In a market with high expectations, an unlovable product can be rejected for its execution, and that rejection reads as a verdict on the idea. That is the false negative, and it is how good ideas get killed by bad tests. In such markets, lovable is not a luxury; it is what makes the test honest.',
                },
                {
                  mistake: 'Using "lovable" as an excuse not to ship.',
                  fix: 'Endless polishing in the name of love means never learning. Lovable still means MINIMUM. The MLP discipline is the same as the MVP discipline (ship the smallest thing) with a different optimization for the core. If you are using MLP to justify more features or a later release date, you have inverted the method.',
                },
                {
                  mistake: 'Building a minimum feature set instead of a hypothesis test.',
                  fix: 'A generic "smallest product" takes real development time and yields vague feedback. A hypothesis-driven release answers a specific question, and is often far cheaper (a landing page, a video, a manual concierge service). Ask what is the cheapest artifact that yields a real signal, not what is the smallest product you could build.',
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
          S9 - Logistics   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Logistics</SectionLabel>
            <SectionHeadingLight>Define success before you ship, instrument for real behavior, and plan the interpretation in advance.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Decide the success and failure threshold before you ship. Define what adoption level would
                count as validation, and what would count as a negative signal, in advance. Without this,
                teams rationalise whatever result they get, and the release teaches nothing.
              </Body>
              <Body>
                Instrument for real behavior, not opinions. Measure what people actually do: use, return,
                pay, recommend. Stated intent is a poor predictor. Design the measurement alongside the
                release, not after it, and measure against the assumption you named, not against the
                metrics that happen to be easy to collect.
              </Body>
              <Body>
                Manage the brand and expectation risk, especially in established companies. Shipping
                something deliberately minimal under an established brand carries real risk, and the
                practical floor for &ldquo;minimum viable&rdquo; is genuinely higher in a corporate context than in a
                startup. Consider limited releases, separate brands, or specific segments. The corporate
                floor is higher: be honest that this often makes the MLP the more practical choice in
                large-organisation contexts.
              </Body>
              <Body>
                Do not confuse the artifact with the product. Some of the most effective MVPs are not
                products at all: a landing page with a signup, a video, a manual concierge service
                simulating automation. Ask what is the cheapest artifact that yields a real signal, not
                what is the smallest product you could build.
              </Body>
              <Body>
                Plan the interpretation and the next move in advance. Agree beforehand how you will
                distinguish &ldquo;the idea is wrong&rdquo; from &ldquo;our execution was weak,&rdquo; and what each result
                would lead you to do. This is the judgment the method turns on, and deciding it under
                the pressure of a disappointing launch is how teams fool themselves.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - How AI is evolving this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>How AI is evolving this method</SectionLabel>
            <SectionHeadingDark>AI collapsed the cost of &ldquo;lovable.&rdquo; That weakens the old excuse for shipping something unloved, but it does not tell you what people will love.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Historically, choosing lovable meant paying a meaningful premium in time and money. AI
              substantially changed that. Toggle to see how it shifts the viable/lovable tradeoff,
              and what human judgment remains load-bearing.
            </p>
            <MVPAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - In-depth example (toggle)   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>In practice</SectionLabel>
            <SectionHeadingLight>A team launches a personal finance tool in a crowded market. Why they chose the MLP, and what changes with AI.</SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              The judgment that drives the choice between MVP and MLP is about the market and its
              expectations, not about the size of the budget. See it in practice, then compare what
              AI changes, and what it does not.
            </p>
            <MVPExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Framework connections   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Used in these frameworks</SectionLabel>
            <SectionHeadingLight>Where the MVP and MLP sit inside the frameworks that shape delivery.</SectionHeadingLight>

            <FrameworkHoverCard links={FRAMEWORK_LINKS} variant="light" />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S13 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>Related methods</SectionLabel>
            <SectionHeadingLight>The MVP and MLP in context, and the staircase they belong to.</SectionHeadingLight>

            {/* Staircase note */}
            <div className="rounded-xl p-6 mb-8"
              style={{ background: `rgba(138,75,60,0.04)`, border: `1px solid rgba(138,75,60,0.15)` }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                The staircase of increasing realness
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)', marginBottom: 12 }}>
                PoC, prototype, MVP/MLP, and pilot form a staircase of increasing realness and commitment:
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {[
                  { label: 'PoC', note: 'Can it work? Internal. Discarded.' },
                  { label: '→' },
                  { label: 'Prototype', note: 'Does the concept work for people? Rough. Shown to users.' },
                  { label: '→' },
                  { label: 'MVP / MLP', note: 'Will people adopt the smallest real product? Really shipped.', active: true },
                  { label: '→' },
                  { label: 'Pilot', note: 'Does it work at limited real-world scale?' },
                ].map((item, i) => (
                  item.label === '→' ? (
                    <span key={i} style={{ color: 'var(--color-neutral-300)', fontSize: 'var(--text-sm)', alignSelf: 'center' }}>→</span>
                  ) : (
                    <div key={i} className="rounded px-3 py-2"
                      style={{
                        background: item.active ? `rgba(138,75,60,0.08)` : 'var(--color-neutral-100)',
                        border: `1px solid ${item.active ? 'rgba(138,75,60,0.22)' : 'var(--color-neutral-200)'}`,
                      }}>
                      <p className="font-semibold" style={{ fontSize: 'var(--text-xs)', color: item.active ? BRICK : 'var(--color-neutral-600)' }}>
                        {item.label}
                      </p>
                      {item.note && (
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 1.4, marginTop: 2 }}>
                          {item.note}
                        </p>
                      )}
                    </div>
                  )
                ))}
              </div>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                <strong>This page is the rung where the thing becomes real.</strong> The PoC proved it could
                work internally. The prototype tested whether the concept landed with users. The MVP or MLP
                is the first real product, really released, to learn whether people will actually adopt it.
                Holding these distinctions is one of the most valuable things a delivery team can maintain.
              </p>
            </div>

            <div className="flex flex-col gap-4">
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
          S14 - Sources   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20 border-t" style={{ borderColor: 'var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Sources &amp; further reading</SectionLabel>
            <div className="flex flex-col gap-3">
              {[
                {
                  title: 'The Lean Startup',
                  author: 'Eric Ries',
                  year: '2011',
                  note: 'The definitive source for the MVP and validated learning. Ries\'s core argument, that building the smallest thing that tests the riskiest assumption is the only honest way to learn, is the foundation the entire method rests on.',
                },
                {
                  title: 'Escaping the Build Trap',
                  author: 'Melissa Perri',
                  year: '2018',
                  note: 'A precise diagnosis of what goes wrong when organisations build without adequately validating first, and the structural conditions that produce it. Essential context for understanding why MVPs and MLPs fail in large organisations.',
                },
                {
                  title: 'Inspired',
                  author: 'Marty Cagan',
                  year: '2017',
                  note: 'On building products people genuinely love, and why merely functional is often not enough. Makes the case for the MLP end of the spectrum: that the execution of the core, not just its existence, is what determines whether a product earns adoption.',
                },
              ].map(s => (
                <div key={s.title}
                  className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
                  <p className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {s.title}: {s.author}{' '}
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

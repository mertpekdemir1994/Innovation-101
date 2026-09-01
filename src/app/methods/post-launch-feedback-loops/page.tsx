import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import PFLExampleToggle from './PFLExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Post-Launch Feedback Loops — Methods — Innovation 101',
}

const PFLEstablishing  = dynamic(() => import('./PFLEstablishing'),  { ssr: false })
const PFLInteractive   = dynamic(() => import('./PFLInteractive'),   { ssr: false })
const PFLAIReactivated = dynamic(() => import('./PFLAIReactivated'), { ssr: false })

const BRICK = '#8A4B3C'


// ── Data ───────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Measure / Learn',
    note: 'The Build-Measure-Learn loop is the foundational expression of the feedback loop idea. Post-launch feedback loops are the operationalisation of the Measure and Learn stages for a live product with real traffic, not a pilot or an MVP, but a product in production that is continuously generating signal and continuously being improved based on it.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Retrospective / Backlog',
    note: 'The retrospective is the structured sense-making moment: what did we learn from the last sprint? The backlog is where decisions land as shipped changes. Post-launch feedback loops formalise this into a continuous discipline: signal in from the live product, sense made in the retrospective, decisions into the backlog, changes shipped in the next sprint, measurement returned to signal.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Deliver: and the iteration arrows back',
    note: 'The 2019 revision of the Double Diamond added explicit iteration loops after Deliver: the recognition that delivery is not the end of the work. Post-launch feedback loops are what those iteration arrows represent in practice: the mechanism by which a delivered product continues to improve rather than drifting once the project team has moved on.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Test: continuing after launch',
    note: 'The Test stage in Design Thinking is typically described pre-launch. Post-launch feedback loops extend that testing discipline into the live product: the same commitment to learning from real interaction with real people, but now at continuous scale with real customers, not prototypes with sample participants.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'pilot-launches',
    name: 'Pilot Launches',
    rel: 'The upstream handoff, and a clean distinction. A pilot is TIME-BOUNDED and GATED: a contained launch with an end date and a go/no-go decision. Post-launch feedback loops are CONTINUOUS: once you have rolled out, learning never stops and there is no gate, only the loop. The pilot asks "should we go wide?"; the loop asks "what is it telling us now?", forever. The pilot ends on a date. The loop begins when scale starts.',
  },
  {
    slug: 'mvp-mlp',
    name: 'MVP & MLP',
    rel: 'The other upstream handoff: an MVP or MLP is a real release built to learn. The feedback loop is how that learning continues after the initial verdict, rather than treating the launch as the end of the question. The MVP tests whether the product concept works; the feedback loop asks whether it keeps working, and how to improve it.',
  },
  {
    slug: 'usability-testing',
    name: 'Usability Testing',
    rel: 'The natural partner when signal points at confusion. Behavioral data (drop-off, abandonment, usage) tells you WHERE people fall over; a usability test shows you WHY, by watching a real person hit the problem. Numbers locate the wound; watching diagnoses it. When your feedback loop surfaces a usage drop-off you cannot explain from the data alone, usability testing is the next step.',
  },
  {
    slug: null,
    name: 'Delivery Roadmap',
    rel: 'Where decisions become shipped changes: the DECIDE-to-SHIP junction runs through the roadmap, and a loop that dies in the backlog is a roadmap problem, not a research problem. If your feedback loop produces good sense-making and clear decisions that never land in the product, the fix is in how decisions enter and move through the roadmap, not in how you collect signal.',
  },
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'The scope boundary worth naming: a feedback loop improves the product you HAVE, optimising what exists, and will rarely tell you it is the wrong product. Concept testing addresses whether the product or feature should exist at all. A well-run feedback loop can make a product that nobody should have built incrementally better every quarter; the strategic question of whether to build it belongs elsewhere.',
  },
]

// ── Page ───────────────────────────────────────────────────────────────────────

export default function PostLaunchFeedbackLoopsPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          S1 - Header / Identity   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize:   'var(--text-2xs)',
                color:       BRICK,
                background: 'rgba(138,75,60,0.10)',
                border:     '1px solid rgba(138,75,60,0.22)',
              }}
            >
              Delivery &amp; Validation
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Post-Launch Feedback Loops
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Building a system that listens to a live product and actually acts on what it hears, closing
              the loop from signal to sense to decision to shipped change, and back again.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Most organisations are not short of data. They are short of loops that close.
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S2 - Establishing visual   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="pb-20">
            <PFLEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>What it is</SectionLabel>
            <SectionHeadingLight>The method is the loop. A loop is only a loop if it closes.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Launch is not the end of the work; it is the beginning of a different kind of learning. A live
                product is continuously telling you things: through what people do in it, what they abandon,
                what they complain about, what they ask support for, what they say in reviews, and what the
                numbers show. Post-launch feedback loops is the method of building a system that actually
                listens to all of that and acts on it, turning a live product into a source of continuous
                improvement rather than a thing you shipped and stopped thinking about.
              </Body>
              <Body>
                The method is the loop, and a loop is only a loop if it closes. Signal comes in. Sense is made
                of it. A decision is taken about what matters and what to do. A change is shipped. And then,
                crucially, you return to signal to find out whether the change actually worked, which starts
                the cycle again. Every one of those steps is required. A system that gathers signal but never
                decides is not a feedback loop; it is a data collection habit. A system that decides but
                never ships is not a feedback loop; it is a meeting.
              </Body>
              <Body>
                This is why the characteristic failure of this method is not a lack of data. Most organisations
                are drowning in data: dashboards nobody looks at, survey results nobody reads, support tickets
                nobody aggregates, session recordings nobody watches. The failure is loops that do not close:
                signal collected and never sensed, insight produced and never decided upon, decisions made
                and never shipped, changes shipped and never measured. Each of those is a break at a specific
                junction, and naming which junction is broken is the most useful diagnostic this method offers.
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
            <SectionLabel accent={BRICK}>The closed loop: interactive</SectionLabel>
            <SectionHeadingDark>Walk the loop. Then break it, and see what a broken loop produces.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click a stage to explore it. Click a break point to sever the loop at that junction and see the
              pathology it produces. The diagnostic insight: a feedback loop fails at whichever junction is
              weakest, and fixing the wrong junction changes nothing.
            </p>
            <PFLInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>When to deploy it</SectionLabel>
            <SectionHeadingLight>When the product is live and the learning should not stop.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                  Use Post-Launch Feedback Loops when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The product is live and you want it to keep getting better rather than drifting.',
                    'You have signal arriving (tickets, analytics, reviews, drop-off) and suspect nobody is closing the loop on it.',
                    'You are past the pilot: the time-bounded, gated learning of a pilot is over, and you need continuous learning in its place.',
                    'You want to catch the problems that only appear at scale, over time, with real users: the ones no pre-launch test could have surfaced.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 rounded-full w-1.5 h-1.5"
                        style={{ background: BRICK }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                  Do NOT lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Nothing is live yet. Before launch, the right methods are concept testing, usability testing, prototyping, and pilots. You cannot run a post-launch loop pre-launch.',
                    'You are not willing to ship changes: a loop that cannot result in a shipped change is not a loop, and building elaborate listening machinery that feeds nothing is worse than not listening.',
                    'You are looking for validation rather than problems. A loop run to confirm the product is fine will find that the product is fine.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 rounded-full w-1.5 h-1.5"
                        style={{ background: 'var(--color-neutral-300)' }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-lg px-5 py-4"
              style={{ background: 'var(--color-neutral-100)', borderLeft: `3px solid ${BRICK}` }}>
              <p className="font-semibold mb-1"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)' }}>
                The honest limit
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                A feedback loop tells you about the product you HAVE, and the users you HAVE. It is superb at
                incremental improvement and structurally blind to the bigger question of whether this is the right
                product at all. And it is biased toward the users who stayed: the people who left, whose signal
                matters most, are precisely the ones no longer generating any.
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
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>How it works</SectionLabel>
            <SectionHeadingLight>Six disciplines. The rarest is diagnosing where your specific loop breaks.</SectionHeadingLight>

            <div className="flex flex-col gap-6 mt-2">
              {[
                {
                  n: '01',
                  title: 'Instrument for signal, deliberately',
                  body: 'Decide what you need to hear and wire it up: behavioural analytics (what people do, where they abandon), direct channels (support tickets, reviews, in-product feedback), and deliberate experiments on live traffic (A/B tests, which belong here, on a real product with real traffic, not before you have built anything). Signal is abundant; the discipline is choosing what to attend to.',
                },
                {
                  n: '02',
                  title: 'Build the SENSE step as a real, owned activity',
                  body: 'Aggregating and interpreting signal is work, and if nobody owns it, it does not happen. Someone must be responsible for turning raw signal into meaning, on a rhythm, and for surfacing the specific and surprising rather than only the average. Sense-making that happens in irregular bursts, when someone has time, is not sense-making; it is triage.',
                },
                {
                  n: '03',
                  title: 'Make DECISION a real forum with real authority',
                  body: 'Insight must meet a decision. Establish who decides, how often, and with what authority to change the roadmap. The output of each forum must be explicit: fix, defer, or accept. Without this, sense-making produces decks and nothing else: the most common and most demoralising break in the loop.',
                },
                {
                  n: '04',
                  title: 'Ship the change',
                  body: 'Ensure that decisions land in the actual product. A decision without a shipped change has closed nothing, and a backlog full of agreed-but-unbuilt improvements is where most feedback loops go to die. If the loop breaks here, the fix is in how decisions move through the roadmap, not in how you collect signal.',
                },
                {
                  n: '05',
                  title: 'Return to signal: measure whether it worked',
                  body: 'Close the circle. Check whether the change produced the effect you expected. This is the step teams skip most, and skipping it means you never learn whether your decisions are any good, only that you made them. Without this return, the loop is an arc, not a circle.',
                },
                {
                  n: '06',
                  title: 'Diagnose where YOUR loop breaks',
                  body: 'Rather than adding more signal (the default reflex), find which junction is weakest in your organisation and fix that. More data will not repair a loop that breaks at decision. More research will not repair a loop that breaks at ship. The diagnostic question, which junction?, is more valuable than any instrument.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <div className="shrink-0 font-mono font-semibold pt-0.5"
                    style={{ fontSize: 'var(--text-sm)', color: BRICK, width: '2rem' }}>
                    {n}
                  </div>
                  <div>
                    <p className="font-semibold mb-2"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {title}
                    </p>
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
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Best practices</SectionLabel>
            <SectionHeadingLight>What separates a loop that teaches from one that performs listening.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              <div className="rounded-lg p-5"
                style={{ background: 'rgba(138,75,60,0.04)', border: '1px solid rgba(138,75,60,0.14)' }}>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                  When it goes well
                </p>
                <ul className="flex flex-col gap-2">
                  {[
                    'The loop actually CLOSES: signal leads to sense, sense to a decision, the decision to a shipped change, and the change back to measurement.',
                    'Someone OWNS the sense-making step, on a rhythm, so signal reliably becomes meaning.',
                    'There is a real decision forum with real authority to change the roadmap, producing explicit outcomes.',
                    'Changes are measured after shipping, so the organisation learns whether its decisions were any good.',
                    'The team diagnoses WHERE its own loop breaks, rather than reflexively adding more signal.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1 shrink-0 rounded-full w-1.5 h-1.5"
                        style={{ background: BRICK }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {[
                {
                  title: 'Collecting signal nobody senses',
                  body: 'The data lake, the unread dashboard, the unaggregated tickets. Listening machinery that feeds nothing is worse than none, because it looks like responsiveness. Fix the sense step, not the instrumentation.',
                },
                {
                  title: 'Producing insight that changes nothing',
                  body: 'The well-received deck that everyone agrees with and nobody acts on. Insight must meet a decision forum with authority, or it is entertainment. If your loop produces great research that the organisation consistently ignores, that is an organisational problem, not a research quality problem.',
                },
                {
                  title: 'Deciding without shipping',
                  body: 'Agreed priorities that never land. If your loop dies in the backlog, that is your break point, and more research will not fix it. The intervention is in how decisions move through the roadmap.',
                },
                {
                  title: 'Shipping without measuring',
                  body: 'You changed the thing and never checked whether it worked. You have acted without learning, and you will guess again next time. This is the step teams skip most, because the team has moved on to the next decision.',
                },
                {
                  title: 'Averaging away the specific',
                  body: 'The single strange complaint that reveals a genuine design failure gets smoothed into noise by aggregate reporting. Attend deliberately to the outlier that is trying to tell you something. Read raw signal alongside aggregates.',
                },
                {
                  title: 'Mistaking more data for a better loop',
                  body: 'The reflex to add signal when the loop breaks downstream is nearly universal and nearly always wrong. Diagnose the junction. Fix the junction.',
                },
              ].map(({ title, body }, i) => (
                <div key={i} className="rounded-lg p-5"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <p className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                    {title}
                  </p>
                  <Body>{body}</Body>
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
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Logistics</SectionLabel>
            <SectionHeadingLight>What running a feedback loop actually requires.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  label: 'Give the loop a rhythm and an owner',
                  items: [
                    'Sense-making cadence: weekly or fortnightly, name the person responsible',
                    'Decision forum: monthly, the standing meeting with authority to change the roadmap',
                    'Measurement check: tied to each shipped change, who checks whether it worked?',
                    'A feedback loop that runs "when someone gets around to it" does not run',
                  ],
                },
                {
                  label: 'Mix behavioral and direct signal',
                  items: [
                    'Behavioral data (drop-off, usage, abandonment) shows WHAT is happening at scale but not why',
                    'Direct feedback (tickets, reviews, interviews) shows WHY but from a self-selected few',
                    'Each is weak where the other is strong, use both',
                    'When signal points at a problem, watch real people hit it (see Usability Testing)',
                  ],
                },
                {
                  label: 'Remember the people who left',
                  items: [
                    'Signal comes from users who stayed, churners are silent',
                    'Deliberately seek the departed: exit surveys, churn interviews',
                    'Otherwise the loop optimises happily for the survivors',
                    'Aggregate analytics will not tell you what drove people away',
                  ],
                },
                {
                  label: 'Instruments named in passing, not the method',
                  items: [
                    'A/B tests: experiments on live traffic belong HERE, not in Concept Testing (pre-build)',
                    'Analytics, cohort analysis, session recordings, NPS: techniques inside the loop',
                    'Support-ticket mining, survey analysis: sense-making tools',
                    'The METHOD is the loop discipline; instruments are merely how you feed it',
                  ],
                },
              ].map(({ label, items }) => (
                <div key={label}>
                  <p className="font-mono uppercase tracking-widest mb-3"
                    style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                    {label}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {items.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="mt-1.5 shrink-0 rounded-full w-1.5 h-1.5"
                          style={{ background: BRICK }} />
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S9 - AI evolving   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>AI &amp; this method</SectionLabel>
            <SectionHeadingDark>
              Sense-making is where AI is most transformative in this whole toolkit. It still cannot decide,
              and a loop only closes when someone decides.
            </SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI genuinely repairs the loop and where the human
              junctions remain exactly as fragile as before.
            </p>
            <PFLAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>In-depth example</SectionLabel>
            <SectionHeadingLight>
              A product live for two years. Signal abundant. Nothing improving. The team fixes the loop.
            </SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              Two versions of the same situation. In the traditional approach, the team diagnoses and fixes
              the broken junction. In the hypothetical AI version, they bring AI into the sense stage. The
              signal is the same. What differs is where the work gets done.
            </p>
            <PFLExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Frameworks that use this method</SectionLabel>
            <SectionHeadingLight>Where Post-Launch Feedback Loops sits in the broader innovation frameworks.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-2">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <div key={slug} className="rounded-lg p-5"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                    <Link href={`/framework/${slug}`}
                      className="font-semibold hover:opacity-70 transition-opacity"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {name}
                    </Link>
                    <span className="font-mono rounded-full px-2.5 py-0.5 shrink-0"
                      style={{
                        fontSize: 'var(--text-2xs)',
                        color: BRICK,
                        background: 'rgba(138,75,60,0.08)',
                        border: '1px solid rgba(138,75,60,0.20)',
                      }}>
                      {phase}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </p>
                </div>
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
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Related methods</SectionLabel>
            <SectionHeadingLight>The methods that feed into, sit alongside, and follow from a feedback loop.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-2">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <div key={name} className="rounded-lg p-5"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="mb-2">
                    {slug ? (
                      <Link href={`/methods/${slug}`}
                        className="font-semibold hover:opacity-70 transition-opacity"
                        style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                        {name}
                      </Link>
                    ) : (
                      <span className="font-semibold"
                        style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-500)' }}>
                        {name}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </p>
                </div>
              ))}
            </div>

            {/* Scope note: methods not tactics */}
            <div className="mt-6 rounded-lg px-5 py-4"
              style={{ background: 'var(--color-neutral-100)', borderLeft: `3px solid ${BRICK}` }}>
              <p className="font-semibold mb-1"
                style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-800)' }}>
                Note on scope: the method is the loop, not the instruments
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                The techniques used to gather signal (analytics, A/B tests on live traffic, cohort analysis,
                session recordings, surveys, support-ticket mining) are named in passing as instruments INSIDE
                this method, not methods in themselves. A/B testing in particular belongs here, on a live product
                with real traffic, and explicitly NOT in Concept Testing, which happens before anything is built.
                The method is the LOOP DISCIPLINE; the instruments are merely how you feed it.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S13 - Sources   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>Where the thinking behind this method comes from.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {[
                'Ries, E. (2011). The Lean Startup. Crown Business. The foundational text on the Build-Measure-Learn loop and the discipline of learning from a live product.',
                'Perri, M. (2018). Escaping the Build Trap. O\'Reilly. On why shipping features is not the same as learning, and on organisations that measure output rather than outcome.',
                'Cagan, M. (2017). Inspired. Wiley. On continuous discovery and building the organisational habits that turn signal into shipped change.',
              ].map((src, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono font-semibold shrink-0 mt-0.5"
                    style={{ fontSize: 'var(--text-xs)', color: BRICK }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {src}
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

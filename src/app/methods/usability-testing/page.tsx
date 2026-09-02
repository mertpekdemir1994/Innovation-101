import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import UTExampleToggle from './UTExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Usability Testing — Methods — Innovation 101',
}

const UTEstablishing  = dynamic(() => import('./UTEstablishing'),  { ssr: false })
const UTInteractive   = dynamic(() => import('./UTInteractive'),   { ssr: false })
const UTAIReactivated = dynamic(() => import('./UTAIReactivated'), { ssr: false })

const BRICK = '#8A4B3C'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Friday: Five-User Test',
    note: 'The entire validation step of a Design Sprint is a usability test: five participants, one prototype, one Friday. The five-user insight, that five participants surface the large majority of usability issues, is the direct rationale for the Design Sprint\'s test format. Usability testing and the Design Sprint are structurally intertwined: the sprint exists to produce a prototype fast enough that a usability test can be run before any real build investment is made.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Test',
    note: 'The Test phase of Design Thinking is usability testing: putting the prototype or built solution in front of real users and watching what they do, without helping them. Design Thinking\'s iterative structure means Test feeds back into Define and Ideate: the behavioral evidence from watching users struggle recalibrates the problem understanding as well as the solution.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Deliver',
    note: 'Usability testing belongs in the Deliver phase, evaluating the built solution before and after release. In the Double Diamond, the Deliver phase is where prototypes become real products, and usability testing is the discipline that keeps execution honest: a concept can survive the whole Develop phase and still fail in Deliver because the thing is baffling to operate.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Sprint / Review',
    note: 'In Agile practice, usability testing fits naturally into the Sprint Review: testing recent sprint output with real users before the next sprint builds on it. This is the Agile instantiation of the cheap-and-iterative principle: test each increment before extending it, so that usability failures do not compound across sprints.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Measure',
    note: 'In the Lean Startup loop, usability testing is a Measure activity: after you Build, you need to understand whether people can actually use what you shipped. Build-Measure-Learn fails if the Measure step only captures business metrics (retention, conversion) without understanding the behavioral causes. Usability testing surfaces the specific interactions that are driving the numbers.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'The reciprocal pair, and the key distinction on this page. Concept Testing asks "do people WANT this?": it tests the IDEA and its desirability, usually before you build. Usability Testing asks "can people USE this?": it tests the EXECUTION, the built artifact. Different failure modes: a concept can test brilliantly and still fail because the thing is baffling to operate; a flawlessly usable product can fail because nobody wanted it. You need both answers, and neither method gives you the other\'s.',
  },
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    rel: 'The natural partner: prototypes are what you usability-test, and testing early with rough artifacts is far cheaper than discovering the confusion after you have built the real thing. A paper sketch usability test catches the structural navigation failures; a high-fidelity prototype test catches the interaction detail failures. The earlier you run the test, the cheaper the fix.',
  },
  {
    slug: 'contextual-observation',
    name: 'Contextual Observation',
    rel: 'A shared core discipline (watching what people actually DO, not what they say) at a different altitude. Contextual observation watches people in their real environment to understand their world: their tasks, tools, workarounds, and context. Usability testing watches one person attempt a specific task with your specific artifact. The discipline (say nothing; watch behavior) is identical; the focus is different.',
  },
  {
    slug: 'flow-mapping',
    name: 'Flow Mapping',
    rel: 'Complementary, and worth distinguishing, since both involve paths. Flow mapping maps the SYSTEM\'s branching structure: every path through the product or process, all the forks, dead ends, and loops that have accreted over time. Usability testing traces ONE PERSON\'S actual struggle against it: the specific route a specific person takes in a specific session, with the hesitations and wrong turns that only appear when a real mind meets the interface. Flow mapping shows you the topology. Usability testing shows you where a human falls over inside it.',
  },
  {
    slug: 'mvp-mlp',
    name: 'MVP & MLP',
    rel: 'Directly relevant to the core warning on the MVP & MLP page. A product people cannot figure out how to use produces a FALSE NEGATIVE: the team concludes the idea failed when in fact the execution did. Usability testing is how you tell those apart. If you skip usability testing and launch an MVP that is confusing to operate, the behavioral signal (low engagement, high abandonment) looks like the concept failed. It may not have.',
  },
  {
    slug: null,
    name: 'Post-Launch Feedback Loops',
    rel: 'Downstream: usability problems do not stop surfacing at launch. Support tickets, drop-off data, abandonment rates, and session recordings are all pointing at usability failures that continued to occur in the live product. Post-launch feedback loops are how you keep catching them after the test sessions have ended. The discipline is the same (watch behavior, not stated opinions) at a different cadence and scale.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function UsabilityTestingPage() {
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
              Usability Testing
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Watching a real person attempt a real task with the thing you built, without helping them, to find out whether they can actually use it.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              It is obvious to you because you built it. The only way to find out whether it is obvious to anyone else is to watch a stranger try, and say nothing.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <UTEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={BRICK}>What it is</SectionLabel>
            <SectionHeadingLight>Watching behavior, not collecting opinions. The question is whether they can use it, not whether they like it.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Usability testing puts a real person in front of the thing you built, gives them a real task,
                and watches what they actually do, without helping them. The output is not their opinion of
                the product; it is their BEHAVIOR: where they hesitated, where they clicked the wrong thing,
                where they backtracked, where they gave up. You are not asking whether they like it. You are
                finding out whether they can use it.
              </Body>
              <Body>
                The distinction from concept testing is worth stating plainly, because the two answer completely
                different questions and catch completely different failures. Concept testing asks &ldquo;do people
                WANT this?&rdquo;, it tests the IDEA, the value proposition, usually before you have built anything.
                Usability testing asks &ldquo;can people USE this?&rdquo;, it tests the EXECUTION, the actual built
                artifact. A concept can test brilliantly and the product still fail, because the thing turned
                out to be baffling to operate. A product can be flawlessly usable and still fail, because
                nobody wanted it in the first place. You need both answers, and neither method gives you the
                other&rsquo;s.
              </Body>
              <Body>
                The core insight is that you cannot do this by thinking. Everything is obvious to the person
                who built it: you know where the button is, you know what the label means, you know what happens
                next, because you designed it. That knowledge is precisely what makes you unable to see the
                interface as a stranger sees it. The gap between &ldquo;obvious to me&rdquo; and &ldquo;obvious to someone
                who has never seen this&rdquo; is invisible from the inside, and no amount of careful reasoning
                closes it. It only becomes visible when you watch a real person fall into it, which is
                why the hardest and most important discipline of the method is watching someone struggle and
                saying nothing.
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
            <SectionLabel accent={BRICK}>The expectation-versus-behavior gap</SectionLabel>
            <SectionHeadingDark>The clean line is what you imagined. The wandering one is what happened. Follow it.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click the intended path to understand what it represents, or click any friction point along
              the actual path to see what happened there, and why the confident wrong turn is the most
              instructive failure the method produces.
            </p>
            <UTInteractive />
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
            <SectionHeadingLight>When you have something a person can operate, and you need to know whether they can.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: BRICK }}>
                  Use Usability Testing when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have something a person can operate (a prototype, a working build, a live product) and need to know whether they can navigate it without help.',
                    'The team believes the design is obvious, which is exactly the condition under which it usually is not.',
                    'You are seeing unexplained drop-off, abandonment, or support load, and suspect the cause is structural confusion rather than lack of desire.',
                    'You are about to ship, and want to catch the failures that only appear when a stranger meets the thing cold.',
                    'You have just changed or redesigned part of the product and want to know whether the change created new confusion.',
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
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Do NOT lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You do not yet know whether anyone wants the idea; that is concept testing. A perfectly usable product nobody wants is a very well-executed failure.',
                    'There is nothing to operate yet; usability testing needs an artifact. You can test rough prototypes and should, but you need something a person can act on.',
                    'You intend to explain the interface to participants while they use it; a test in which you help is not a test, and it is the single most common way teams destroy the method\'s value.',
                    'You will only run it to confirm the design is good; a usability test run to validate rather than to discover will find nothing, because the facilitator will unconsciously smooth the path.',
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
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                <span className="font-semibold" style={{ color: BRICK }}>The honest limit:</span>{' '}
                Usability testing tells you whether people can USE the thing. It tells you almost nothing about
                whether they want it, whether it is valuable, or whether they would pay for it. It is a test of
                execution, not of the idea. And it can only be as good as the facilitator&rsquo;s discipline: the
                moment you start helping, the data disappears.
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
            <SectionHeadingLight>Six principles. The discipline is in following them, especially the one about saying nothing.</SectionHeadingLight>

            <div className="flex flex-col gap-6 mt-2">
              {[
                {
                  n: '01',
                  title: 'Choose the real tasks, not the tour',
                  body: 'Decide the specific tasks a participant will attempt, the things people genuinely need to do with the product. Frame them as goals, not instructions ("find and cancel your subscription," not "click the account menu, then billing"). Naming the path gives away the very thing you are testing. The task must state a destination, never a route.',
                },
                {
                  n: '02',
                  title: 'Recruit five people who resemble your actual users',
                  body: 'Five participants surface about 85 percent of usability issues, the Nielsen Norman Group finding that makes the method cheap and repeatable, and removes any excuse not to run it. Recruit people who resemble real users and have never seen the product. Colleagues, or anyone who has already used it, cannot show you the stranger\'s experience, which is the only experience that matters here.',
                },
                {
                  n: '03',
                  title: 'Give the task, then be quiet',
                  body: 'Hand over the task and stop talking. Do not hint, do not clarify, do not rescue. The instinct to help is overwhelming and it is fatal: every intervention replaces the data you came for with a demonstration of your own knowledge of the product. Watching someone struggle in silence, without helping, is the core discipline of the method, and it is genuinely hard.',
                },
                {
                  n: '04',
                  title: 'Watch behavior, not opinions',
                  body: 'Attend to what they DO: where they pause, what they click, when they backtrack, when they give up. What people say about an interface afterwards is far less reliable than what they were observed doing in it. Ask them to think aloud if it helps, but treat behavior as the evidence. People are unreliable narrators of their own confusion; they will blame themselves rather than your interface.',
                },
                {
                  n: '05',
                  title: 'Note every divergence from the intended path',
                  body: 'Each hesitation, wrong turn, backtrack, and stall is a finding. Pay special attention to CONFIDENT wrong turns: a participant who does the wrong thing without hesitating has been told something by your interface that you did not mean to say. That is not their error; it is your interface\'s communication failure, and it is the most instructive finding the method produces.',
                },
                {
                  n: '06',
                  title: 'Fix, and retest',
                  body: 'Usability testing is iterative and cheap. Address the problems found, then run it again with a few new participants: fixes create new problems, and the second round is nearly always worth it. Two rounds of five participants with a fix in between is the classic pattern, and it is almost always more valuable than one round of ten.',
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
            <SectionHeadingLight>What separates a usability test that teaches from one that confirms what you already believed.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              {[
                {
                  title: 'Frame tasks as goals, never routes',
                  body: '"Cancel your subscription" tests everything. "Click the account menu, then billing, and cancel" tests nothing. The task must state what the person is trying to accomplish; it must not name the path to accomplish it. Naming the path is the test.',
                  isMistake: false,
                },
                {
                  title: 'Never help, not even a little',
                  body: 'The cardinal discipline, and the most commonly broken. Every hint, clarification, or rescue replaces the data with a demonstration of your product knowledge. Silence is uncomfortable. The discomfort is the point: what you are watching is the experience of every user who will encounter this without you there to help.',
                  isMistake: true,
                },
                {
                  title: 'Watch for the confident wrong turn above all else',
                  body: 'Hesitation is uncertainty. A confident wrong turn is something more instructive: the person was not confused, they were certain, and certain of the wrong thing. This means your interface told them something. Finding out what it told them, and why it told them that, is the finding that drives the most impactful fixes.',
                  isMistake: false,
                },
                {
                  title: 'Watch behavior; do not ask for self-reports',
                  body: 'Asking "did you find that easy?" invites politeness. People will rate tasks as easy that they visibly struggled with. Watch what they did; treat the observed behavior as the evidence. Post-task questions are useful for surfacing sentiment, but they cannot overturn what you saw.',
                  isMistake: true,
                },
                {
                  title: 'Run to find problems, not to confirm the design is good',
                  body: 'A team hoping to be told the design is good will unconsciously smooth the path, interpret struggle as participant error, and declare results inconclusive. Run the test to find problems. Treat every struggle as a defect in the product, not in the person. The facilitator who enters the test wanting to find problems will find more of them, and more of them will be real.',
                  isMistake: true,
                },
                {
                  title: 'Retest after fixing',
                  body: 'The two-round pattern is the gold standard: test, fix, retest with new participants. Fixes create new problems, and the second round catches them cheaply. A team that tests once and ships has treated usability testing as a box to tick rather than a practice to iterate.',
                  isMistake: false,
                },
              ].map(({ title, body, isMistake }, i) => (
                <div key={i} className="rounded-lg p-5"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  {isMistake && (
                    <p className="font-mono uppercase tracking-widest mb-1"
                      style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.70)' }}>
                      Common mistake
                    </p>
                  )}
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
            <SectionHeadingLight>Five people, a few hours, and the discipline to stay quiet. The barrier to entry is low by design.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  label: 'Time required',
                  items: [
                    '2–4 hours per round of five participants (30–45 min per session)',
                    'Analysis and synthesis: 1–2 hours',
                    'Total per round: half a day to a day',
                    'Two rounds (test-fix-retest): 1–2 days total',
                  ],
                },
                {
                  label: 'Team',
                  items: [
                    '1 facilitator (the one who says nothing)',
                    '1–3 observers (ideally including a developer or decision-maker)',
                    '5 participants per round',
                    'Optional: a note-taker or recording setup',
                  ],
                },
                {
                  label: 'What you need',
                  items: [
                    'Something a person can operate: sketch, clickable prototype, or live product',
                    'Tasks framed as goals (not routes)',
                    'Participants who resemble real users and have not seen the product',
                    'A facilitator who can stay quiet for 30–45 minutes while someone struggles',
                  ],
                },
                {
                  label: 'Practical notes',
                  items: [
                    'Remote testing tools (screen recording, session replay) are widely available, use whatever your team already has',
                    'Get the team to watch live where possible; no report conveys a struggling user as effectively as watching one',
                    'Paper and rough prototypes are valid test artifacts; earlier is cheaper',
                    'Recruiting: ask colleagues to forward an invitation to people outside the organisation, or use a panel service',
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
          S9 - How AI is evolving   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={BRICK}>AI &amp; this method</SectionLabel>
            <SectionHeadingDark>AI can tell you what the usability principles say. It cannot watch a real person get confused, and that is the entire method.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle to see what AI can genuinely contribute (heuristic review of the intended path)
              and the specific, structural thing it cannot: drawing the actual path, because that path
              only exists when a real person walks it.
            </p>
            <UTAIReactivated />
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
            <SectionHeadingLight>A subscription cancellation screen the whole team agreed was obvious. Five strangers disagreed.</SectionHeadingLight>
            <p className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              Two approaches to the same problem. The traditional test runs five participants. The hypothetical
              AI version runs a heuristic review. Compare what each produces, and what each cannot.
            </p>
            <UTExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20" style={{ borderTop: '1px solid var(--color-neutral-100)' }}>
            <SectionLabel accent={BRICK}>Used in these frameworks</SectionLabel>
            <SectionHeadingLight>Where Usability Testing sits in the broader innovation frameworks.</SectionHeadingLight>

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
            <SectionHeadingLight>The methods that sit beside, before, and after usability testing.</SectionHeadingLight>

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
            <SectionHeadingLight>The three books worth reading on this method.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {[
                'Krug, S. (2000). Don\'t Make Me Think. New Riders. The classic, and still the best short argument for cheap, frequent usability testing. The five-users insight, the sit-down-and-shut-up principle, and the practical rhythm of the method in one readable book.',
                'Krug, S. (2009). Rocket Surgery Made Easy. New Riders. The practical sequel: how to run a do-it-yourself usability test, from recruiting to facilitation to note-taking to making the fixes that matter. Directly actionable.',
                'Norman, D. (1988). The Design of Everyday Things. Basic Books. The foundational text on why things are hard to use and why the fault lies with the design rather than the person. The conceptual underpinning for why usability testing is the designer\'s responsibility, not a test of the participant.',
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

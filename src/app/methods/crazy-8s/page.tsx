import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import C8ExampleToggle from './C8ExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Crazy 8s · Methods',
}

const C8Establishing  = dynamic(() => import('./C8Establishing'),  { ssr: false })
const C8Interactive   = dynamic(() => import('./C8Interactive'),   { ssr: false })
const C8AIReactivated = dynamic(() => import('./C8AIReactivated'), { ssr: false })

const CLAY = '#B5613E'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Tuesday',
    note: 'Tuesday in a Design Sprint is when the team sketches solutions after Monday\'s problem mapping and Lightning Demos. Crazy 8s is the core rapid ideation activity on Tuesday: each person runs their own eight panels against the HMW question agreed on Monday, producing a wide range of individual sketches before the team converges on a single strong concept to carry into the Solution Sketch. The method\'s ability to generate genuine variety fast is exactly what Tuesday needs.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Ideate',
    note: 'The Ideate phase calls for divergent thinking: generating a wide range of ideas before converging on the most promising. Crazy 8s is one of the most reliable divergence tools in the Ideate phase, producing genuine variety fast while preventing premature convergence on the first comfortable idea. The eight-minute constraint ensures the phase actually diverges rather than quickly settling on the obvious.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'The Develop phase opens the second diamond with concept generation. Crazy 8s is one of the fastest ways to produce a wide range of candidate concepts at the start of Develop, enough variety that the team has genuinely different options to prototype and test rather than variations on a single obvious direction. The late-panel ideas are what make the Develop phase worth running.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Sprint / Discovery Sprint',
    note: 'Crazy 8s fits both the Discovery Sprint and the regular sprint within an Agile Innovation engagement. In the Discovery Sprint, it generates a wide range of solution hypotheses quickly. In the regular sprint, it provides fast divergence before selecting what to build and test. The low setup cost (paper and a timer) makes it well-suited to the pace of sprint-based work.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'how-might-we',
    name: 'How Might We',
    rel: 'The natural upstream prompt: a well-scoped How Might We question is what you sketch the eight panels against. Frame the challenge there, diverge here. A sharp HMW is the difference between eight minutes of focused divergence and eight minutes of scattered sketching. Frame first, then run Crazy 8s.',
  },
  {
    slug: 'analogs-precursors',
    name: 'Analogs & Precursors',
    rel: 'Strong upstream stimulus: the abstracted structural principles from an analog session are excellent raw material to sketch against in Crazy 8s, seeding the eight panels with non-obvious frames before the session starts. Each abstracted principle from the analog search becomes a potential frame for one panel, preventing the early sketches from collapsing into variations on the same obvious idea.',
  },
  {
    slug: null,
    name: 'Rapid Prototyping',
    rel: 'The natural next step: the promising late-panel ideas selected from Crazy 8s get made tangible enough to learn from. Crazy 8s produces rough sketches at volume; rapid prototyping takes the most promising of those sketches and makes them concrete enough to test with real users. The two methods are sequential, not alternatives.',
  },
  {
    slug: null,
    name: 'Co-Creation Workshops',
    rel: 'A companion setting: Crazy 8s is one of the most common divergence activities run inside a broader co-creation session. It produces individual sketches that can be shared, clustered, and built on collaboratively, making it a reliable warm-up for group concept development. The individual-first, group-second structure it enforces is especially valuable in co-creation contexts where group dynamics can otherwise anchor everyone to the first idea voiced.',
  },
  {
    slug: null,
    name: 'Assumption Mapping',
    rel: 'The selected ideas rest on assumptions; assumption mapping surfaces the riskiest ones to test before building. Running assumption mapping after Crazy 8s and selection is a way to turn a promising late-panel idea into a testable hypothesis rather than an untested leap. The combination catches the ideas worth pursuing and the risks hiding inside them.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function C8Page() {
  return (
    <>
      {/* S1 - Header DARK */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <Container className="relative z-10 w-full flex flex-col justify-center flex-1">
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize:   'var(--text-2xs)',
                color:       '#FFD588',  /* CLAY, brightened for text contrast */
                background: 'rgba(181,97,62,0.12)',
                border:     '1px solid rgba(181,97,62,0.28)',
              }}
            >
              Ideation &amp; Prototyping
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Crazy 8s
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Eight ideas, one per panel, one per minute, eight minutes: a brutal time constraint
              that forces you past your obvious ideas to the ones you did not know you had.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}
            >
              Your first three ideas are the ones everyone has. The method exists to drag you, fast, to idea number seven.
            </p>
          </div>
        </Container>

        {/* Establishing visual: full width, outside Container, matching the
            framework hero treatment */}
        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <C8Establishing />
        </div>
      </DarkSection>

      {/* S3 - What it is LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>What it is</SectionLabel>
            <SectionHeadingLight>Not a brainstorm. A forcing function: a brutal time constraint designed to exhaust the obvious and reach the non-obvious.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Crazy 8s is a rapid, time-boxed ideation method in which each participant folds a
                sheet of paper into eight panels and sketches one distinct idea per panel, one every
                minute, for eight minutes. The brutal time constraint is not an inconvenience; it is the
                entire mechanism. Eight minutes for eight ideas is deliberately too little time to be
                careful, and that is the point: it forces quantity over polish, prevents premature
                attachment to any single concept, and, above all, pushes people past their obvious first
                ideas.
              </Body>
              <Body>
                Its defining insight is counterintuitive and well-documented. The ideas teams actually
                select for prototyping are disproportionately drawn from panels five through eight, not
                one through four. The reason is structural: the first few ideas any person sketches are
                the obvious ones (the solutions already lurking in their mind, the conventional
                responses everyone in the room would also produce). It is only after those are exhausted,
                somewhere around the fifth panel, that people are forced to reach for something genuinely
                new. The late panels, where it gets hard and slightly desperate, are where the breakthrough
                ideas tend to live.
              </Body>
              <Body>
                Crazy 8s is a forcing function. It uses speed and a rigid constraint to do
                something people cannot reliably do on their own: exhaust the obvious and keep going into
                the non-obvious. Jake Knapp, who codified the method in the Design Sprint context, calls
                it &ldquo;a forcing function for the ideas you did not know you had.&rdquo; The rough sketches
                are almost beside the point; the value is that the constraint drags out ideas that a
                comfortable, unhurried brainstorm never would.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S4 - Interactive DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Fill the eight panels. Feel where it gets hard.</SectionLabel>
            <SectionHeadingDark>No single panel contains the breakthrough. It lives on the far side of the wall, click through to find it.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click any panel to see what kind of idea lands there and why. The early panels
              produce the obvious; the late panels produce what you did not know you had.
              The wall is around panel five, that is exactly where it starts to get interesting.
            </p>
            <C8Interactive />
          </div>
        </Container>
      </DarkSection>

      {/* S5 - When to deploy LIGHT */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={CLAY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>For fast divergence when you need genuine variety. Not for refinement, analysis, or problems with one correct answer.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have a well-scoped prompt (ideally a How Might We question) and need to generate a lot of divergent ideas fast.',
                    'The team is stuck on the obvious solutions and needs to be forced past them into genuine variety.',
                    'You want broad participation and many ideas quickly, without the polish or commitment of prototyping.',
                    'You are early in ideation and want quantity and range before converging.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: CLAY, flexShrink: 0, marginTop: 2 }}>→</span>
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
                    'The prompt is too vague to sketch against. Scope it first: Crazy 8s needs a clear challenge, not "improve the product."',
                    'You need depth on one concept rather than breadth across many. Crazy 8s is a divergence tool, not a refinement one.',
                    'The problem genuinely has one correct answer to be analysed rather than a space of possibilities to be explored.',
                    'Participants are so blocked by "I can\'t draw" anxiety that the sketching itself prevents ideas. Reassure them first: the sketches are rough and private by design.',
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
                The honest limit: Crazy 8s generates raw, rough ideas at volume; it does not evaluate,
                refine, or validate them. Most of the eight panels will be bad, that is expected and
                fine. The method trades quality-per-idea for quantity and range, on the bet that a few
                late panels hold something worth developing. It is a divergence engine that must be paired
                with convergence to produce anything real.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S6 - How it works LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from a clear prompt to a selection of late-panel ideas worth developing.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Start from a clear, well-scoped prompt.',
                  body: 'Crazy 8s sketches against a specific challenge, ideally a well-scoped How Might We question. A sharp prompt focuses the divergence; a vague one scatters it. Spend the setup time making sure everyone in the room is sketching against the same clear challenge before the clock starts. A minute clarifying the prompt saves eight minutes of off-target sketching.',
                },
                {
                  n: '02',
                  title: 'Fold the sheet into eight panels and set the timer.',
                  body: 'Each participant divides a sheet into eight panels. One minute per panel, eight minutes total. The rigid timing is non-negotiable. It is the forcing function. Protect it: run a visible timer, call the minute, and keep moving. A relaxed, drifting version of the timing loses the effect entirely.',
                },
                {
                  n: '03',
                  title: 'Sketch one distinct idea per panel, fast.',
                  body: 'One idea per minute, moving on whether or not the panel feels finished. Distinct ideas, not variations of one concept. Rough is required. Polish is impossible in a minute, and that is the point. The sketches are meant to be ugly; they are capturing an idea, not demonstrating drafting skill.',
                },
                {
                  n: '04',
                  title: 'Push through the wall past panel four.',
                  body: 'Expect the obvious ideas to come first and run out around panel five. Keep going. The instruction that matters most: do not stop when it gets hard. That is exactly when the original ideas start. The time constraint refuses to let you stop at four ideas and call it done. Honour the constraint.',
                },
                {
                  n: '05',
                  title: 'Do it individually, then share.',
                  body: 'Everyone sketches their own eight in silence, so the loudest voice does not shape the room. Individual divergence first, collective sense-making after. When the team shares, the full range of ideas becomes visible, including the late-panel ideas that no brainstorm converging on the first voiced idea would have reached.',
                },
                {
                  n: '06',
                  title: 'Select and carry forward.',
                  body: 'After sharing, the team identifies the most promising ideas (often, tellingly, from the late panels) and carries them into the next step: further sketching, prototyping, or co-creation. Crazy 8s ends by feeding convergence, not by choosing a winner on its own. The selection is where the method hands off to the next phase.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(181,97,62,0.12)', lineHeight: 1.1, width: 40 }}
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

      {/* S7 - Best practices LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Best practices</SectionLabel>
            <SectionHeadingLight>What separates a session that reaches panel seven from one that stops at panel four.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The prompt is sharp and well-scoped, so eight minutes of divergence stays focused on the right challenge.',
                'The time constraint is held strictly (one minute per panel) because the pressure is the entire mechanism.',
                'People push through the wall past panel four and reach for the non-obvious ideas in panels five through eight.',
                'Everyone sketches individually first, so the room produces genuine variety rather than an echo of the loudest voice.',
                'The team treats rough as required and judgment as deferred: generating first and evaluating later.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: CLAY, flexShrink: 0, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              The mistakes, and how to avoid them
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: 'Stopping at the obvious ideas.',
                  fix: 'Quitting mentally around panel four, when it gets hard, forfeits exactly the late panels where the breakthroughs live. Push through the wall. That is the point of the exercise. The instruction "keep going when it gets hard" is not encouragement; it is the mechanism.',
                },
                {
                  mistake: 'Letting people polish.',
                  fix: 'Trying to make a panel look good burns the minute and defeats the quantity-over-polish mechanism. Keep it rough and fast. Remind participants before the session starts: the sketches are private, ugly is correct, the idea matters and not the drawing.',
                },
                {
                  mistake: 'Softening the time constraint.',
                  fix: 'Giving "a little more time" removes the forcing function and lets people retreat to comfortable, obvious ideas. Hold the timer. The eight minutes is not a guideline.',
                },
                {
                  mistake: 'Sketching as a group too early.',
                  fix: 'Diverging together lets the first loud idea anchor everyone. Sketch individually first, share after. The moment the group starts converging before each person has finished their own eight, the method loses its core mechanism.',
                },
                {
                  mistake: 'Judging in the moment.',
                  fix: 'Evaluating ideas as they are drawn kills the divergence. Defer all judgment to the sharing-and-selection step. The rule is: generate first, evaluate after, always.',
                },
                {
                  mistake: 'Letting "I can\'t draw" stop ideas.',
                  fix: 'Sketching anxiety blocks participation. Reassure the team before the session: the sketches are rough, private, and about ideas, not art. Show an example of what an acceptable panel looks like: a few lines and a label is enough.',
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

      {/* S8 - Logistics LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Logistics</SectionLabel>
            <SectionHeadingLight>Keep it dead simple. The beauty of Crazy 8s is that it needs almost nothing.</SectionHeadingLight>
            <Body>
              Crazy 8s needs paper, a pen, and a timer. That is almost everything. Resist adding
              complexity. The low setup is part of why it is so reliable and repeatable. It can
              run anywhere, with any team, against almost any prompt, in eight minutes plus the time
              to share and select.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Scope the prompt before the clock starts',
                  body: 'Spend the setup time making sure everyone is sketching against the same clear, well-scoped challenge. A minute clarifying the prompt saves eight minutes of scattered, off-target sketching. The most common failure mode in Crazy 8s is a prompt so vague that the eight panels produce eight different interpretations of the problem rather than eight different solutions to it.',
                },
                {
                  label: 'Protect the timing ritual',
                  body: 'Run a visible timer and call the minute. The strict cadence is what creates the productive pressure; a relaxed, drifting version loses the effect entirely. One minute per panel, no negotiation. Calling the time, even when participants are still mid-sketch, is not harsh; it is the mechanism.',
                },
                {
                  label: 'Set expectations about roughness and volume',
                  body: 'Tell participants up front that the sketches will be ugly, that most of the eight will be bad, and that both are expected and fine. This defuses the "I can\'t draw" block and gives permission to reach for the strange late ideas. A participant who understands that roughness is required produces more varied panels than one who is trying to make each one presentable.',
                },
                {
                  label: 'Plan the share and selection in advance',
                  body: 'Decide in advance how the team will share sketches and select promising ideas afterward. Silent review with dot-voting is common. Crazy 8s produces raw material; the share-and-select step turns it into direction. Without a planned selection process, the session ends with a pile of sketches and no clear next step. The selection is part of the method.',
                },
                {
                  label: 'In person or remote, analog or digital',
                  body: 'Crazy 8s works in person (paper, folded) and remotely (a shared digital canvas such as a collaborative whiteboard tool). In remote sessions, the digital canvas allows the team to share sketches in the same space without the delay of a photo. Named as common examples, not endorsements: the method is the constraint and the structure, not the tool.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(181,97,62,0.28)', marginTop: 4 }}
                  />
                  <div>
                    <p className="font-semibold mb-1"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
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

      {/* S9 - AI and this method DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={CLAY}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI can generate a hundred ideas in seconds. That is not what Crazy 8s was ever for.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what AI produces when it replaces the eight minutes,
              and why more ideas is not the same as reaching idea seven. The value of Crazy 8s
              was never the raw count; it was the constraint and the ownership.
            </p>
            <C8AIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* S10 - In-depth example LIGHT */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={CLAY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The robotics company: the panel-seven idea that almost wasn&rsquo;t drawn.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A team running Crazy 8s for a robotics product pushes through the wall and discovers
              a personality-forward direction in the late panels that they had nearly self-censored.
              The one-minute constraint forced it onto the page. It became the product&rsquo;s defining
              characteristic. Toggle to see what a hypothetical AI-first approach would have produced.
            </p>
            <C8ExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* S11 - Frameworks LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Crazy 8s shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A fast divergence method for the ideation moments of frameworks where teams need to
              generate many ideas quickly. It appears at the start of phases where genuine variety
              matters and settling on the first comfortable direction is the main risk.
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
                    style={{ fontSize: 'var(--text-2xs)', color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {phase}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S12 - Related methods LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to pair with Crazy 8s.</SectionHeadingLight>

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
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S13 - Sources LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Sprint',
                  author: 'Jake Knapp, John Zeratsky, and Braden Kowitz',
                  year:   '2016',
                  note:   'The defining account of Crazy 8s in the Design Sprint context. Knapp codified the method as the core rapid ideation activity for Tuesday in a sprint, and his description of the late-panel insight (that the ideas teams actually select come disproportionately from the final panels rather than the first) is the insight that makes the method worth understanding rather than just running. The book\'s framing of the method as a "forcing function for the ideas you did not know you had" is the clearest articulation of why the time constraint is the whole point, not an inconvenience to be managed.',
                },
                {
                  title:  'Gamestorming',
                  author: 'Dave Gray, Sunni Brown, and James Macanufo',
                  year:   '2010',
                  note:   'A comprehensive reference for rapid ideation methods, including the broader family of time-boxed sketching and divergence practices that Crazy 8s belongs to. Gray, Brown, and Macanufo\'s treatment of the generative value of constraints, and of why a well-designed game produces better outcomes than an open brainstorm, provides the theoretical grounding for why Crazy 8s works as a structural intervention rather than merely a fun activity. The book\'s broader catalogue situates Crazy 8s within a family of related practices.',
                },
                {
                  title:  'Creative Confidence',
                  author: 'Tom Kelley and David Kelley',
                  year:   '2013',
                  note:   'On getting past the fear that blocks fast, generative sketching. The Kelleys\' treatment of creative confidence (the belief that you can generate good ideas and make them real) is directly relevant to the "I can\'t draw" block that stops participants from committing the strange late-panel ideas to paper. Their core argument, that creative capacity is learned and sustained by practice rather than innate, is the foundation for the reassurance that rough sketches are required and that the drawing is beside the point. The book\'s cases show repeatedly that the constraints that appear to limit creativity are often the ones that produce it.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(181,97,62,0.30)' }} />
                  <div>
                    <p className="font-semibold"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                      <em>{title}</em>
                    </p>
                    <p className="mb-1"
                      style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
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

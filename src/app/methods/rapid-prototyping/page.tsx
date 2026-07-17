import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import RPExampleToggle from './RPExampleToggle'
import RPFidelitySelector from './RPFidelitySelector'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Rapid Prototyping — Methods — Innovation 101',
}

const RPEstablishing  = dynamic(() => import('./RPEstablishing'),  { ssr: false })
const RPInteractive   = dynamic(() => import('./RPInteractive'),   { ssr: false })
const RPAIReactivated = dynamic(() => import('./RPAIReactivated'), { ssr: false })

const CLAY = '#B5613E'


// ── Data ───────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Wednesday / Thursday',
    note: 'Wednesday in a Design Sprint is when the team decides on the solution to prototype. Thursday is when they build it — a realistic-looking prototype made in one day, good enough to provoke honest reactions from the Friday test users. Rapid prototyping at Design Sprint fidelity is a compressed, high-intensity version of the method, with a firm one-day build budget and a clear test on the other side.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Prototype',
    note: 'The Prototype phase is the dedicated make-it-tangible moment of Design Thinking. Rapid prototyping is the method that populates this phase — turn the most promising Ideate ideas into rough tangible forms that can be tested with real users. Design Thinking\'s Prototype phase emphasises fast, low-fidelity prototypes intended to generate learning from the Test phase, not finished artifacts intended to be handed off.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'In the Develop phase, rough solutions are built and tested to learn which directions are worth refining. Rapid prototyping is the primary build-to-learn mechanism here — producing multiple rough, testable versions of candidate directions before converging. The Develop phase deliberately expects multiple rounds of rapid prototyping and discard before the team reaches something ready to deliver.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'The Build step in the Lean Startup\'s Build–Measure–Learn loop is where rapid prototyping lives at the early stages of an idea — making something tangible to measure against, fast. The discipline is identical: build the least needed to answer the next most important question, measure the response, and learn. Lean Startup\'s MVP concept (the smallest real market thing) is the downstream relative of the rapid learning prototype.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Sprint',
    note: 'Each sprint in Agile Innovation produces an increment to learn from. Rapid prototyping supplies the build-to-learn discipline within the sprint — making ideas tangible quickly enough to get feedback within the sprint cycle. The sprint\'s short timeboxes match the method\'s requirement for fast, rough, disposable artifacts rather than polished, permanent ones.',
  },
]

type RelatedMethod = { slug: string | null; name: string; rel: string }

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'crazy-8s',
    name: 'Crazy 8s',
    rel: 'The natural upstream: the promising ideas selected from a Crazy 8s session are exactly what you make tangible and test with a rapid prototype. Diverge there — generate a wide range of candidate directions fast — then build-to-learn here with the most promising late-panel ideas. The two methods are sequential: Crazy 8s produces the raw material; rapid prototyping turns the best of it into something learnable.',
  },
  {
    slug: null,
    name: 'Concept Testing',
    rel: 'The disciplined partner: rapid prototyping makes the idea tangible; concept testing is the structured act of learning from real users\' reactions to it. Prototype, then test. The two methods are one sequence — rapid prototyping without a test is just building, and concept testing without a prototype is just asking people about an abstraction. Run them together.',
  },
  {
    slug: null,
    name: 'MVP & MLP',
    rel: 'The downstream, higher-stakes relative in Delivery & Validation. A learning prototype is built to learn and then discarded; an MVP or MLP is the smallest real thing put into the market. Same build-to-learn spirit, fundamentally different stakes and permanence. The scope boundary matters: a rapid prototype is not an MVP, and treating it as one is how prototype artifacts become products before the concept is validated.',
  },
  {
    slug: 'how-might-we',
    name: 'How Might We',
    rel: 'A well-scoped How Might We frames what the prototype should explore. The learning question that drives a prototype (“what are we trying to learn?”) and the challenge framing of a HMW (“how might we achieve X?”) are the same question from two directions. Scope the challenge with HMW, then prototype the most promising approaches to that challenge.',
  },
  {
    slug: null,
    name: 'Assumption Mapping',
    rel: 'The riskiest assumptions a concept rests on are what a prototype should be designed to test first. Running assumption mapping after ideation and before prototyping identifies which open questions carry the most risk — and those become the learning questions that drive prototype fidelity and structure. Prototype the riskiest assumption first, not the most interesting feature.',
  },
]

// ── Page ───────────────────────────────────────────────────────────────────────

export default function RPPage() {
  return (
    <>
      {/* S1 — Header DARK */}
      <DarkSection>
        <Container>
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize:   'var(--text-2xs)',
                color:       CLAY,
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
              Rapid Prototyping
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Making an idea tangible quickly and cheaply, at whatever rough fidelity is just enough
              to learn from it, rather than describing or debating it.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The point is not to build something good. It is to build something rough, fast, that
              answers your biggest question before you have spent anything making it pretty.
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* S2 — Establishing visual DARK */}
      <DarkSection>
        <Container>
          <div className="pb-20">
            <RPEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* S3 — What it is LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>What it is</SectionLabel>
            <SectionHeadingLight>Not a small product. A question made tangible — built to learn, not to keep.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Rapid prototyping is the practice of making ideas tangible quickly and cheaply, in
                whatever fidelity is just enough to generate real learning, rather than describing or
                debating them. Instead of arguing about whether an idea will work, you build a rough
                version and find out. A prototype can be a hand-drawn paper sketch, a quickly drawn
                conceptual visual, a clickable mockup in a tool like Figma, a physical model, a
                roleplay, or a Wizard-of-Oz facade where humans manually simulate what software will
                eventually do. What unites them is not the medium but the mindset: build the least you
                can to answer the most important open question, then learn, then build again.
              </Body>
              <Body>
                The defining principle &mdash; and the one most often misunderstood &mdash; is that
                low fidelity is the point, not a limitation to apologise for. Rapid means rough. A
                prototype is meant to be unrefined and unpolished, because polish costs time you have
                not yet earned and because the whole purpose is speed of learning, not quality of
                artifact. A prototype is a question made tangible, not a product made small.
              </Body>
              <Body>
                There is a second, subtler reason to keep fidelity low: the fidelity of a prototype
                shapes the feedback you get. Show someone a rough paper sketch and they comment on the
                concept, because it is obviously unfinished. Show them a polished, pixel-perfect mockup
                and they comment on the polish, because it looks done. Low fidelity is not just cheaper
                and faster; it actively invites feedback on the things that matter early and defers the
                things that matter later. Roughness is a feature. It keeps the conversation on the concept.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S4 — Interactive DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Move up the fidelity ladder. Watch the cost rise and the feedback drift to polish.</SectionLabel>
            <SectionHeadingDark>The sweet spot for a learning prototype is deliberately low. Click a level to see why &mdash; and what kind of feedback it invites.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click a fidelity level to see what it costs, what kind of feedback it invites, and
              when to use it. The insight is counterintuitive: for a learning prototype, lower is
              usually better, and each rung up the ladder costs more time and pulls feedback toward
              polish rather than concept.
            </p>
            <RPInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* S5 — When to deploy LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>Use it to turn debate into learning. Do not use it as a substitute for defining what you want to learn.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have a promising idea (often selected from Crazy 8s) and need to learn whether it works before investing in building it.',
                    'The team is debating an idea in the abstract and going in circles; a rough prototype turns opinion into something testable.',
                    'You need to answer a specific open question cheaply and fast — does this flow make sense? is this concept understood?',
                    'You want to test with users early, when changing direction is still cheap and the artifacts are still disposable.',
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
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                  Do not lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have not defined what you are trying to learn. A prototype without a learning question is just building, and tends to drift toward polish. Decide the question first.',
                    'The question genuinely requires high fidelity or real data to answer — some interaction or performance questions do. Match fidelity to the question rather than defaulting low.',
                    'You are actually building the shippable thing. That is production work (or the MVP/MLP), not a learning prototype. Do not confuse built-to-learn with built-to-keep.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: 'var(--color-neutral-400)', flexShrink: 0, marginTop: 2 }}>×</span>
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
                The honest limit: a rapid prototype is built to answer a question and often to be
                discarded; its value is the learning, not the artifact. Its most common failure is
                fidelity creep &mdash; the prototype quietly becoming a polished thing the team falls
                in love with and cannot bear to throw away, which both wastes effort and biases the
                team toward a direction they have not actually validated. Keep it rough, keep it
                disposable, keep it pointed at a question.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S6 — How it works LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from a named learning question to a decision about what to do next.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Start with the learning question.',
                  body: 'Before building anything, name the single most important thing you need to learn. The question determines the right prototype and the right fidelity; without it, you are just making something. A concept question ("will users understand this?") needs different fidelity than a flow question ("does this navigation make sense?") or a behavior question ("will people actually use this?").',
                },
                {
                  n: '02',
                  title: 'Choose the lowest fidelity that answers it.',
                  body: 'Match the medium and fidelity to the question, and default low. A concept question needs only a paper sketch; only a flow-or-interaction question justifies climbing to a clickable mock. Do not build more fidelity than the question requires. The section below maps each type of question to the approach that answers it best.',
                },
                {
                  n: '03',
                  title: 'Build it fast and rough.',
                  body: 'Make it quickly and cheaply — paper, a quick visual, a clickable mock, a roleplay, a Wizard-of-Oz facade — keeping it deliberately unpolished. Speed and roughness are the point; resist the urge to refine. A prototype built in fifteen minutes is not inferior to one built in a day; it is appropriately scoped to the question.',
                },
                {
                  n: '04',
                  title: 'Put it in front of real people and watch.',
                  body: 'A prototype exists to be tested. Show it to real users, give them something to do, and watch where they get confused or delighted. The rough form keeps their feedback on the concept. Three to five users will surface most of the significant patterns; the goal is directional learning, not statistical significance.',
                },
                {
                  n: '05',
                  title: 'Learn, then decide: iterate or discard.',
                  body: 'Capture what you learned, and let it drive the next move: refine the idea and prototype again, or kill it. Expect to throw prototypes away — that is success, not waste. The learning is the deliverable. A prototype you cannot discard is a prototype you over-invested in.',
                },
                {
                  n: '06',
                  title: 'Climb fidelity only as questions demand.',
                  body: 'As an idea survives and the open questions shift from "does this concept work?" to "is this flow right?" to "is this refined?", raise fidelity deliberately, one rung at a time, always in service of the next learning question, never for polish\'s own sake. The discipline of matching fidelity to the question is what separates rapid prototyping from just making things.',
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

      {/* S7 — Matching fidelity to the question LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Matching fidelity to the question</SectionLabel>
            <SectionHeadingLight>Which approach when &mdash; the practical heart of the method.</SectionHeadingLight>

            <div className="flex flex-col gap-5 mb-10">
              <Body>
                There is no single &ldquo;right&rdquo; prototype. The right one is the
                lowest-fidelity, fastest approach that answers the specific question you are trying to
                learn. The medium is a choice you make from the learning question, not a habit you
                default to. Start from your question below: select it to highlight the matching
                approach on the spectrum and in the table.
              </Body>
            </div>

            <RPFidelitySelector />

            <div className="mt-12 flex flex-col gap-5">
              <h3 className="font-semibold"
                style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
                The through-line: default low, climb only as the question demands.
              </h3>
              <Body>
                Start at the lowest fidelity that could answer your question &mdash; usually paper
                for a concept question &mdash; and climb deliberately only when the open question
                genuinely shifts. The clickable mockup earns its place the moment the question becomes
                about flow and interaction, not before. Every rung up costs more time and pulls
                feedback toward polish, so each climb should buy you a specific piece of learning you
                could not get more cheaply.
              </Body>
              <div
                className="rounded-lg p-5"
                style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)', borderLeft: `3px solid rgba(181,97,62,0.35)` }}
              >
                <p className="font-semibold mb-2"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                  For digital products specifically
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  The practical path is often: paper or quick sketch to settle the concept and rough
                  layout, then a clickable mockup to test the flow and interaction, and only later a
                  high-fidelity prototype when the questions become about refinement. Jumping straight
                  to a polished clickable mock &mdash; which AI now makes tempting &mdash; skips the
                  cheap concept test and pulls feedback to the surface before the concept is settled.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S8 — Best practices LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Best practices</SectionLabel>
            <SectionHeadingLight>What separates a prototype that teaches from one that just builds.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'Every prototype starts from a clear learning question, so it is built to answer something specific rather than to build.',
                'Fidelity is matched to the question and defaults low — the least that answers it, no more.',
                'Prototypes are made fast and rough, and the roughness is treated as a feature that keeps feedback on the concept.',
                'They are put in front of real users early, when changing course is still cheap.',
                'The team treats prototypes as disposable, learns, and readily throws them away.',
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
                  mistake: 'Fidelity creep.',
                  fix: 'The signature failure: the prototype quietly becomes polished, and the team falls in love with the artifact and cannot throw it away. Keep it deliberately rough and disposable. Timebox the build — an hour, an afternoon — so it stays pointed at the question.',
                },
                {
                  mistake: 'Building without a learning question.',
                  fix: 'A prototype with no question to answer drifts toward polish and produces no clear learning. Name the question first, always, before building anything.',
                },
                {
                  mistake: 'Over-polishing early, and getting the wrong feedback.',
                  fix: 'A finished-looking prototype makes users critique color and fonts instead of the concept. Keep early prototypes obviously unfinished to keep the conversation on the idea.',
                },
                {
                  mistake: 'Confusing a prototype with a product.',
                  fix: 'Treating a learning prototype as the thing to ship (or as the MVP) blurs "built to learn, then discard" with "built to keep." Know which you are making — they have different standards, different life expectancies, and different success criteria.',
                },
                {
                  mistake: 'Not testing it.',
                  fix: 'A prototype never put in front of a real person is just an artifact. The learning comes from the test, so plan the test as part of the prototype — decide who will try it, what task you will give them, and what you are watching for.',
                },
              ].map(({ mistake, fix }) => (
                <div key={mistake}
                  className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
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

      {/* S9 — Logistics LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Logistics</SectionLabel>
            <SectionHeadingLight>Keep it dead simple. The humble toolkit is a feature, not a limitation.</SectionHeadingLight>
            <Body>
              The classic rapid-prototyping toolkit is deliberately humble: paper, pens, sticky notes,
              scissors, and for digital flows a mockup tool. The cheaper and more familiar the
              materials, the faster you build and the less precious you feel about throwing the result
              away. Resist adding complexity. The low setup is part of why the method is reliable and
              repeatable.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Timebox the build',
                  body: 'Give the prototype a tight time budget (an hour, an afternoon, a day) so it stays rough and pointed. A timebox is the simplest guard against fidelity creep. Running out of time before the prototype is polished is a feature, not a failure.',
                },
                {
                  label: 'Prepare a simple test alongside the prototype',
                  body: 'A prototype and its test go together: decide who will try it, what task you will give them, and what you are watching for. Planning the test as you build keeps the prototype honest about its learning question.',
                },
                {
                  label: 'Choose the medium for the question, not the habit',
                  body: 'Do not default to whatever tool you always use. A flow question may need a clickable mock; a concept question is often better as paper; a service idea may be best roleplayed; a "will people act on this?" question may call for a Wizard-of-Oz facade. The medium should serve the question.',
                },
                {
                  label: 'Protect the throwaway mindset',
                  body: 'Make it socially and practically easy to discard prototypes: keep them rough, do not over-invest, and celebrate the ones that failed fast and taught something. The disposability is what keeps learning velocity high and keeps the team from committing to unvalidated directions.',
                },
                {
                  label: 'Works in person and remote',
                  body: 'Rapid prototyping works in person (paper, physical) and remotely (a shared digital canvas or collaborative mockup tool). In remote sessions, a shared digital canvas allows teams to co-sketch and share rough ideas without the logistics of paper. The method is the constraint and the structure, not the tool.',
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

      {/* S10 — AI and this method DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={CLAY}>How AI is evolving this method</SectionLabel>
            <SectionHeadingDark>AI can turn a sentence into a clickable, near-real prototype in minutes. That is a genuine superpower, and it quietly attacks the discipline that made prototyping work.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what changes when the cost of fidelity collapses &mdash;
              and why the &ldquo;just enough to learn&rdquo; judgment matters more, not less,
              when AI makes high fidelity nearly free.
            </p>
            <RPAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* S11 — In-depth example LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same feature, two approaches: what low fidelity produced, and what AI produced.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A team prototypes a new app feature to learn whether the concept and flow work.
              Tab A runs the method as it was designed &mdash; rough, disposable, concept-focused.
              Tab B uses AI and is honest about both the genuine power and the trap.
              Both tabs are real approaches; the contrast teaches which questions each one answers.
            </p>
            <RPExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* S12 — Frameworks LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Used in these frameworks</SectionLabel>
            <SectionHeadingLight>Where rapid prototyping shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Rapid prototyping is a core build-to-learn method, mapping to the develop-and-build
              moments of nearly every framework. It appears wherever the method calls for making
              ideas tangible before committing to them.
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
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 180 }}>
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

      {/* S13 — Related methods LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to pair with rapid prototyping.</SectionHeadingLight>

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

      {/* S14 — Sources LIGHT */}
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
                  note:   'The most focused account of rapid prototyping in a time-boxed, high-stakes frame. Knapp\'s Design Sprint compresses a week into five days and dedicates Thursday entirely to building a realistic-enough prototype to test on Friday. The book\'s treatment of what "good enough to learn from" means in practice — not polished, not rough to the point of incomprehensibility, but targeted at the test questions — is the clearest applied account of matching fidelity to the learning objective. The sprint prototype is the worked example of the method\'s core discipline.',
                },
                {
                  title:  'Creative Confidence',
                  author: 'Tom Kelley and David Kelley',
                  year:   '2013',
                  note:   'On the mindset that makes rapid prototyping work. The Kelleys\' argument that creative capacity is learned and sustained by practice — and that the act of making things tangible fast is how ideas improve — is the theoretical foundation for why the method emphasises making over debating. Their treatment of prototyping as a way of thinking, not just a production technique, is what distinguishes rapid prototyping as a discipline from rapid prototyping as a skill. The book\'s examples of the value of rough, fast, throw-away artifacts are directly applicable to the method.',
                },
                {
                  title:  'The Lean Startup',
                  author: 'Eric Ries',
                  year:   '2011',
                  note:   'The build-measure-learn loop and the discipline of learning velocity are the intellectual ancestors of rapid prototyping\'s core logic. Ries\' argument that the unit of progress is validated learning, and that the goal of the build step is to produce the minimum needed to measure, maps directly onto the "least that answers the question" principle. The book also introduces the MVP concept — the downstream, market-facing relative of the learning prototype — and the distinction between the two (built to learn vs. built to keep) is the scope boundary this method page observes.',
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

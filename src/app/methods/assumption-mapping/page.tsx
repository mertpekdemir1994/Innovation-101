import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import AMPExampleToggle from './AMPExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Assumption Mapping — Methods — Innovation 101',
}

const AMPEstablishing  = dynamic(() => import('./AMPEstablishing'),  { ssr: false })
const AMPInteractive   = dynamic(() => import('./AMPInteractive'),   { ssr: false })
const AMPAIReactivated = dynamic(() => import('./AMPAIReactivated'), { ssr: false })

const CLAY = '#B5613E'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'Identifying the leap-of-faith assumption before building the MVP. The Lean Startup discipline is to test the riskiest assumption first, with the smallest possible experiment, and Assumption Mapping is how you find that assumption in the first place. You map the concept, locate the high-importance / high-uncertainty belief, and design the MVP to test it.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'Surfacing and prioritising the assumptions a selected concept rests on before committing to develop and test it. The Develop phase generates and refines concepts; Assumption Mapping ensures the team knows which belief the concept most critically depends on before resources are committed to testing it.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Monday / Tuesday',
    note: 'Surfacing the assumptions and questions the week\'s prototype and test will address. A sprint maps expert knowledge and picks a target; Assumption Mapping ensures the team understands which critical belief the Friday test is designed to answer. The prototype is the test; the assumption map defines what it is testing.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Backlog',
    note: 'Maintaining a hypothesis-driven backlog: prioritising backlog items whose underlying assumptions are both most consequential and least evidenced. Assumption Mapping applied to backlog management shifts priority from features to the riskiest untested beliefs behind each feature.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'orthodoxies',
    name: 'Orthodoxies',
    rel: 'A close cousin at a different altitude: worth distinguishing. Assumption Mapping surfaces the risky assumptions behind a SPECIFIC concept (what does this idea depend on, and which belief is the leap to test?). Orthodoxies surfaces the unquestioned assumptions of an entire INDUSTRY (what does everyone in this field take for granted, and what if the opposite were true?). Assumption mapping de-risks an idea; orthodoxies breaks an industry convention to find opportunity.',
  },
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    rel: 'The natural next step: the leap-of-faith assumption is exactly what a rapid prototype should be built to test first, cheaply. Assumption mapping identifies the target; the prototype is the test instrument. The output of the map is a test design brief for the prototype.',
  },
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'The disciplined way to test a desirability assumption from the map with real users. If the leap-of-faith assumption is about whether people want the thing, concept testing is the appropriate experiment to run.',
  },
  {
    slug: 'crazy-8s',
    name: 'Crazy 8s',
    rel: 'Upstream: the ideas generated in ideation are what you then map for their riskiest assumptions before building. Crazy 8s generates eight concepts in eight minutes; Assumption Mapping identifies which of those concepts rests on the least dangerous bet.',
  },
  {
    slug: 'balanced-breakthrough',
    name: 'Balanced Breakthrough',
    rel: 'Complementary: the Balanced Breakthrough names the three lenses (desirability, feasibility, viability). Assumption Mapping surfaces and prioritises the specific untested beliefs within each lens for a given concept. They work together: the Breakthrough frame tells you which lens is missing; Assumption Mapping finds the specific critical-and-unknown belief within it.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AssumptionMappingPage() {
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
              Assumption Mapping
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Surfacing the beliefs a concept secretly depends on and sorting them by importance and
              uncertainty, so you test the one that could kill the idea first, before building.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Every idea rests on a stack of assumptions. One or two are both critical and completely untested.
              Find those, and test them before you build anything.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <AMPEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>What it is</SectionLabel>
            <SectionHeadingLight>The beliefs a concept secretly depends on, sorted by how dangerous they are.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Assumption mapping is the discipline of surfacing the beliefs an idea secretly depends on,
                and then sorting them by risk so you test the dangerous ones first. Every concept rests on
                a stack of assumptions: that customers want this, that they will pay this price, that you
                can build it, that regulators will allow it, that partners will cooperate. Most of them feel
                safe. But usually one or two are both critical (if wrong, the whole idea collapses) and
                unknown (you have no real evidence either way), and those are the ones that quietly kill
                projects when a team builds for months before discovering that a foundational belief was false.
              </Body>
              <Body>
                The method sorts assumptions along two axes. IMPORTANCE asks how much the concept depends
                on this assumption being true: would the idea survive if it turned out false?
                UNCERTAINTY asks how much evidence you actually have: do you know this, or are you
                just hoping? Plotting every assumption on this importance-by-uncertainty grid reveals the
                one quadrant that matters most: high importance and high uncertainty, the assumptions that
                are both critical and untested. These are the leap-of-faith assumptions, and they are exactly
                where your testing energy should go first.
              </Body>
              <Body>
                The whole point is prioritisation of risk. It is tempting to validate the assumptions you
                are confident about (they are comfortable to confirm) or the ones that do not much matter
                (they are easy to check). Assumption mapping forces the harder, more valuable move:
                identify the belief that is both most consequential and least proven, and design the
                cheapest possible test for it, before committing to build. Test the thing that could kill
                the idea first, while it is still cheap to be wrong.
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
            <SectionLabel accent={CLAY}>Place each assumption. The dangerous corner is critical and untested.</SectionLabel>
            <SectionHeadingDark>The dangerous corner is critical and untested. Test that first.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Each card is an assumption the concept rests on. Click it to see which quadrant it sits in
              and what to do about it, discovering that the high-importance / high-uncertainty corner is
              where your testing energy belongs.
            </p>
            <AMPInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>For de-risking a specific concept before building. Not for vague ideas or risk you will not act on.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>
                  Use Assumption Mapping when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have a concept and are deciding what to test or prototype first, before committing to build.',
                    'You want to de-risk an idea by finding the belief most likely to be both critical and wrong.',
                    'A team is confident about an idea and you suspect that confidence rests on untested assumptions.',
                    'You are prioritising a backlog or set of experiments and need to aim testing energy at the highest-risk beliefs.',
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
                    'The idea is too vague to have concrete assumptions yet, shape the concept first, then map what it depends on.',
                    'You are not actually willing to test (or kill the idea over) the leap-of-faith assumption. Mapping risk you will ignore is theater.',
                    'The relevant uncertainty is trivial or already well-evidenced across the board (rare, and worth double-checking).',
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
                The honest limit: assumption mapping identifies and prioritises risk; it does not resolve it.
                Placing an assumption in the leap-of-faith corner tells you what to test, not what the answer is.
                The test still has to be run. Its most common failure is dishonesty about the axes: rating
                a shaky assumption as &ldquo;known&rdquo; because admitting the uncertainty is uncomfortable, which quietly
                moves the real risk out of view. The method is only as good as the team&rsquo;s honesty about how
                little it actually knows.
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
            <SectionLabel accent={CLAY}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from surfacing every assumption to testing the one that matters most.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Surface every assumption the concept rests on.',
                  body: 'Brainstorm the full set of beliefs the idea depends on, across desirability (will people want it?), feasibility (can we build it?), and viability (will it work as a business?). Push past the obvious to the buried assumptions no one has said out loud. The dangerous belief is often a buried one.',
                },
                {
                  n: '02',
                  title: 'Rate each on importance.',
                  body: 'For each assumption, ask: if this turned out to be false, would the idea survive or collapse? An assumption the idea cannot survive without is high importance. This places it on the vertical axis.',
                },
                {
                  n: '03',
                  title: 'Rate each on uncertainty: honestly.',
                  body: 'Ask how much real evidence you have: do you actually know this, or are you assuming it? This is the axis teams fudge. Be rigorous about admitting what is genuinely untested, because comfortable overconfidence here hides the real risk. For each "known" assumption, ask what the actual evidence is.',
                },
                {
                  n: '04',
                  title: 'Plot them and find the leap-of-faith corner.',
                  body: 'Place every assumption on the importance-by-uncertainty grid. The high-importance / high-uncertainty quadrant holds the leap-of-faith assumptions: the critical, untested beliefs that should be tested first. This corner is the entire point of the method.',
                },
                {
                  n: '05',
                  title: 'Design the cheapest test for the riskiest assumption.',
                  body: 'Take the top leap-of-faith assumption and design the smallest, fastest experiment that could prove it wrong. Favour a rough prototype, a concept test, a fake-door, or a manual simulation over an expensive build. The Zappos model (photograph shoes, build a simple site, buy at retail and ship manually) is the benchmark: answer the belief in days with no engineering investment.',
                },
                {
                  n: '06',
                  title: 'Test, learn, and re-map.',
                  body: 'Run the test, update your evidence, and re-plot. A tested assumption moves out of the uncertainty zone; the next-riskiest belief becomes the priority. Assumption mapping is iterative: it continually points testing at the highest remaining risk.',
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

      {/* ─────────────────────────────────────────────────────────
          S7 - Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the mistakes that prevent it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The team surfaces the buried assumptions, not just the obvious ones, across desirability, feasibility, and viability.',
                'Uncertainty is rated honestly, with real rigour about admitting what is genuinely untested.',
                'Testing energy goes to the leap-of-faith corner (critical AND unknown), not to comfortable or trivial assumptions.',
                'The riskiest assumption gets the cheapest possible test, run before committing to build.',
                'The map is treated as living: after each test, evidence is updated and the grid re-plotted so testing keeps aiming at the highest remaining risk.',
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
                  mistake: 'Being dishonest about uncertainty.',
                  fix: 'Rating a shaky belief as "known" because the uncertainty is uncomfortable moves the real risk out of view. Be ruthlessly honest about what you actually have evidence for. For each "known" assumption, ask: what is the actual evidence?',
                },
                {
                  mistake: 'Validating the comfortable assumptions.',
                  fix: 'Teams love confirming what they are already confident about. Aim at the critical-and-unknown corner instead: the belief that could kill the idea, not the one that will confirm it.',
                },
                {
                  mistake: 'Testing the trivial.',
                  fix: 'Spending scarce experiments on low-importance assumptions (however uncertain) wastes energy. Prioritise by both axes, not just uncertainty. Nice-to-know is never the priority.',
                },
                {
                  mistake: 'Listing only the obvious assumptions.',
                  fix: 'The dangerous belief is often a buried one no one has said aloud. Push past the surface to the assumptions the idea silently depends on, the beliefs that feel too obvious to question.',
                },
                {
                  mistake: 'Mapping risk you will not act on.',
                  fix: 'Identifying a leap-of-faith assumption and then building anyway, without testing it, is theatre. Map only if you are willing to test, and possibly kill the idea.',
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
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Logistics</SectionLabel>
            <SectionHeadingLight>How to run it well, and the discipline that makes the map trustworthy.</SectionHeadingLight>
            <Body>
              Assumption mapping works best with a cross-functional group, because different people hold
              different assumptions and see different risks, and because a team that maps its own idea
              alone tends to be blind to its own leaps of faith. Explicitly invite the sceptic&rsquo;s view:
              &ldquo;what would have to be true for this to work, and how do we know it is?&rdquo;
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Separate surfacing from rating',
                  body: 'First get all the assumptions on the table (diverge), then rate them on importance and uncertainty (converge). Mixing the two (judging assumptions as they are named) suppresses the buried ones that matter. Name everything first, evaluate nothing.',
                },
                {
                  label: 'Push hard on the uncertainty axis',
                  body: 'Because this axis is the one teams fudge, build in a deliberate challenge: for each "known" assumption, ask what the actual evidence is. If the honest answer is "we just think so," it belongs in the uncertain column. This single discipline is what makes the map trustworthy.',
                },
                {
                  label: 'Design cheap, fast tests for the top assumptions',
                  body: 'The output of the map is a test plan for the leap-of-faith corner. Favour the smallest experiment that could disprove each critical assumption (a rough prototype, a concept test, a fake-door, a manual simulation) over an expensive build. The Zappos-style cheap test is the model: answer the belief in days with no engineering investment.',
                },
                {
                  label: 'Use common tools as examples, not recipes',
                  body: 'Whiteboards and sticky notes are the classic format; digital canvases (Miro, Mural, FigJam, named as common examples, not endorsements) work well for distributed teams. The tool is not the method; the discipline of honest placement on the two axes is.',
                },
                {
                  label: 'Keep it visible and re-map after tests',
                  body: 'Maintain the grid where the team can see it, and update it as tests return evidence. A tested assumption moves; the next-riskiest becomes the focus. Assumption mapping is a living document, not a one-time exercise.',
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

      {/* ─────────────────────────────────────────────────────────
          S9 - How AI is evolving this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={CLAY}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI will list your assumptions in seconds. It cannot tell you which one is the leap of faith, because that depends on what you actually know.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI helps build the map, and why judging
              the two axes stays human.
            </p>
            <AMPAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same scenario. Two approaches, one finds the leap of faith, one misses it.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A founder mapping the assumptions behind an online shoe store. The genuine leap of faith:
              will people buy shoes without trying them on? Toggle between the traditional approach and
              a hypothetical AI-first approach to see what each finds, and what each misses.
            </p>
            <AMPExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Used in these frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Assumption Mapping shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A de-risking method that sits between having an idea and testing it, Assumption Mapping
              maps to the build-and-test framing moments of frameworks: where a concept is selected
              and the team must decide what to test before committing.
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

      {/* ─────────────────────────────────────────────────────────
          S12 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with Assumption Mapping.</SectionHeadingLight>

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

      {/* ─────────────────────────────────────────────────────────
          S13 - Sources   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Testing Business Ideas',
                  author: 'David Bland and Alexander Osterwalder',
                  year:   '2019',
                  note:   'The definitive source for the assumptions map (importance by evidence) and cheap experiment design. Bland and Osterwalder\'s framework structures the full cycle from assumption to experiment to learning, making this the closest companion to the method as described here. Their assumption map is an importance-by-uncertainty grid; their experiment library shows how to design the cheapest possible test for each type of assumption.',
                },
                {
                  title:  'The Lean Startup',
                  author: 'Eric Ries',
                  year:   '2011',
                  note:   'The source of the "leap-of-faith assumption" concept and the discipline of testing the riskiest belief first. Ries argues that the job of an early-stage team is not to build a product but to test whether the foundational beliefs behind it are true, and that the MVP is an instrument for testing the leap-of-faith assumption, not a minimum version of the final product.',
                },
                {
                  title:  'The Right It',
                  author: 'Alberto Savoia',
                  year:   '2019',
                  note:   'On testing whether an idea is worth building before you build it. Savoia\'s "pretotype" approach is the practical toolkit for the cheap experiment design that assumption mapping calls for: the smallest, fastest, cheapest test that could answer the leap-of-faith question before any engineering investment.',
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

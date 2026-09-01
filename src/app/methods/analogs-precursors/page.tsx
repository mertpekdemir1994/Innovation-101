import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import APExampleToggle from './APExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Analogs & Precursors — Methods — Innovation 101',
}

const APEstablishing  = dynamic(() => import('./APEstablishing'),  { ssr: false })
const APInteractive   = dynamic(() => import('./APInteractive'),   { ssr: false })
const APAIReactivated = dynamic(() => import('./APAIReactivated'), { ssr: false })
const APDistinction   = dynamic(() => import('./APDistinction'),   { ssr: false })

const CLAY = '#B5613E'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Tuesday',
    note: 'Tuesday in a sprint is when the team sketches solutions after Monday\'s problem mapping. An analog session run at the top of Tuesday dramatically increases the range of those sketches: instead of each person reaching for the nearest familiar solution, they arrive with structural principles borrowed from distant domains. Precursors surface on Monday but are refined on Tuesday as the team decides which ideas are genuinely new versus previously tried and abandoned.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Ideate',
    note: 'The ideation phase generates concepts through divergent thinking, and the quality of concepts depends entirely on the richness of the inputs. Analogs expand the input library by showing how other domains have solved structurally similar problems. Precursors inform ideation by preventing the team from reinventing a wheel that already failed. The timing diagnosis tells you whether to revisit the idea with fresh conditions or move on.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'The Develop phase opens the second diamond with concept generation. Analogs and precursors are the method that seeds this divergence with structural principles from other domains rather than variations on familiar solutions. A team that enters the Develop phase without an analogical library tends to generate solutions that are incremental because they are drawing only from within their own field.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'The Discovery Sprint establishes the problem frame and the early concepts that will be tested. Analogs and precursors run in the Discovery Sprint ensure the concepts being generated draw on structural principles from outside the team\'s immediate experience. Precursors are especially valuable here: knowing what was tried before and why it stalled shapes the Discovery Sprint\'s hypothesis about what is now different.',
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
    rel: 'The natural downstream pair: an analog produces a structural principle; How Might We converts it into an ideation prompt. "The hotel orchestrates service across every staff member, not just the guest-facing ones" becomes "How Might We make every member of our team responsible for the customer experience?" The principle is the raw material; the HMW question is the form that seeds ideation.',
  },
  {
    slug: 'orthodoxies',
    name: 'Orthodoxies',
    rel: 'Complementary provocation tools that attack the same problem from different directions. Orthodoxies identifies what your industry treats as impossible and asks what if the opposite were true. Analogs then provide the evidence that another domain already did the opposite, and survived. The combination is compelling: an orthodoxy names the constraint; an analog shows it was never necessary.',
  },
  {
    slug: null,
    name: 'Crazy 8s',
    rel: 'Rapid parallel concept sketching that benefits directly from a rich analogical library. Running Crazy 8s after a thorough analog session produces more diverse, structurally distinct concepts than starting from first principles. Each structural principle abstracted from an analog becomes a frame for one of the eight sketches, preventing the method from collapsing into variations on the same idea.',
  },
  {
    slug: null,
    name: 'Co-Creation',
    rel: 'Involving users or external stakeholders in the analog and precursor search surfaces leads the core team would not see. Users often know precursors: failed attempts at solving their own problem that the company never heard about. Co-creation sessions that include an analog segment also produce richer concepts because participants bring structural intuitions from their own domains that insiders lack.',
  },
  {
    slug: null,
    name: 'Assumption Mapping',
    rel: 'Precursor research feeds directly into assumption mapping. A failed precursor is a validated failure mode: it answers the question "what has to be true for this idea to work?" with "these specific things that were not true the last time anyone tried." Running assumption mapping after a precursor review sharpens the hypothesis about what is different now and what risks remain.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function APPage() {
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
              Analogs &amp; Precursors
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Borrowing solutions that already exist (looking sideways across other industries and backward through
              your own industry&rsquo;s past) to spark genuinely new ideas without inventing from nothing.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Every good idea already exists somewhere. The skill is knowing where to look and what to abstract from what you find.
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
            <APEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>What it is</SectionLabel>
            <SectionHeadingLight>A structured search for solutions that already exist: across other industries and back through your own.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Analogs and precursors are two directions you can search when you need a genuinely new idea
                but do not want to start from nothing. Both directions are based on the same insight: the solution
                you need almost certainly exists in a form somewhere, because most problems have already been
                solved, either by another industry working on a structurally similar challenge, or by a
                previous generation working on your exact challenge before the conditions were right.
              </Body>
              <Body>
                <strong>Analogs</strong> search <em>across space</em>: they look sideways at other domains, industries, and
                contexts that have already solved a problem structurally similar to yours, even when the surface
                contexts look nothing alike. The connection is never obvious. A hospital and a luxury hotel share
                no surface similarity; what they share is the structural challenge of orchestrating consistent,
                dignity-centred service across a large, distributed team. The hospital finds the principle by
                abstracting past the surface similarity. That abstracted principle, not the imitated practice,
                but the structural insight, is what makes the analog productive.
              </Body>
              <Body>
                <strong>Precursors</strong> search <em>back through time</em>: they examine the history of your own industry
                for earlier attempts at solving the same problem you are now facing. Something tried and stalled.
                A patent that was filed and never shipped. A startup that was ahead of its time. The question
                precursors ask is not &ldquo;what happened?&rdquo; but &ldquo;why?&rdquo;, and specifically, was the earlier attempt
                premature (the infrastructure, cost curve, or behavioural readiness was not yet there) or fundamentally
                flawed (the concept itself was wrong)? That distinction is the timing diagnosis, and it is the
                entire value of the precursor search.
              </Body>
              <Body>
                The two directions are perpendicular on purpose. Analogs give you freshness from distance: the further
                the domain, the less obvious the principle, and the more genuinely new it feels when applied to your
                problem. Precursors give you ripe ideas hiding in history: already validated by the need, already
                refined through failure, waiting for the conditions to catch up. Together they create a search space
                that is broader and more generative than any amount of brainstorming from first principles.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Interactive visual   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Explore the search space</SectionLabel>
            <SectionHeadingDark>Click an axis to understand the search direction. Click a point to see a specific example.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              The horizontal axis searches across industries for structural matches. The vertical axis searches
              backward through time for earlier attempts. Both originate at your current problem.
            </p>
            <APInteractive />
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
            <SectionHeadingLight>For ideation that needs range. Not for optimization that needs refinement.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>
                  Use Analogs &amp; Precursors when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Your team keeps generating variations on the same familiar solutions, a sign the search space is too narrow.',
                    'You need a genuinely new concept and first-principles thinking is producing either nothing or the obvious.',
                    'You are entering an established category and need to understand both the landscape of analogous domains and the history of earlier attempts in your own.',
                    'Ideation feels stuck inside the conventions of the industry, and you need structural distance from those conventions before anything else will work.',
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
                    'You are optimizing an existing concept rather than generating new ones: analog research has a high setup cost that is not justified for incremental refinement.',
                    'The team treats the analog as a solution to copy rather than a source of structural principle to abstract. Imitation of surface features (the chocolates on the pillow) is not the method; abstraction of the structural insight is.',
                    'There is no time or appetite for genuine abstraction. The method fails when teams list analogs but skip the step of articulating what principle from the analog is actionable in their context.',
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
                The honest limit: the abstraction step is genuinely hard, and most teams skip it. Finding the analog is
                easy; articulating the structural principle it contains (the transferable insight that is not
                domain-specific) requires careful thinking and often multiple iterations. A list of analogs that has
                not been abstracted produces imitation, not innovation.
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
            <SectionHeadingLight>Seven moves, for analogs and precursors run together or each run independently.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Frame the underlying problem structurally.',
                  body: 'Before searching, translate the problem from its domain-specific terms into structural language. Not "how do we improve hospital patient experience?" but "how do we orchestrate consistent, dignity-centred service across a large, distributed team with many handoffs?" The structural framing is what makes the analog search work: it opens the field to every domain that has solved the same underlying structure, regardless of surface appearance.',
                },
                {
                  n: '02',
                  title: 'Search for analogs across industries.',
                  body: 'Ask who else has already solved the structural problem you framed. Cast deliberately far: the near analogs (other hospitals, other clinics) are obvious and will surface naturally. The search that pays off is the one that finds the far structural match: the hotel, the pit crew, the airport. Push past the first tier of obvious answers. The most productive analogs are rarely the ones the team names in the first five minutes.',
                },
                {
                  n: '03',
                  title: 'Abstract the structural principle from each analog.',
                  body: 'For each analog, identify the structural insight: not what they do, but why it works. This is the most important and most often skipped step. "Hotels do chocolates on pillows" is a surface observation that produces nothing actionable. "Hotels train every person in the building to the same service standard, not just the guest-facing roles" is a structural principle that transfers. Write the principle in terms your problem space can act on.',
                },
                {
                  n: '04',
                  title: 'Search backward for precursors in your own industry.',
                  body: 'Look for earlier attempts at solving the same problem: products launched and abandoned, patents filed and not used, startups that tried and did not scale, research projects that demonstrated the concept but could not ship it. The search is historical and focused on your category or close adjacencies. The question is not "what happened?" but "what are we looking at?": is this a dead end or a ripe idea?',
                },
                {
                  n: '05',
                  title: 'Diagnose the timing of each precursor.',
                  body: 'For every precursor found, make a timing judgment: was this premature (the infrastructure, technology, cost curve, or behavioral readiness was not yet there) or structurally flawed (the concept itself was wrong)? These are different findings. A premature precursor suggests the idea may now be ripe; a structurally flawed one is a warning. The diagnosis requires examining what specifically was missing and whether it is now present.',
                },
                {
                  n: '06',
                  title: 'Synthesize across both axes into a working hypothesis.',
                  body: 'After running both searches, look for convergent signals: an analog pointing in the same direction as a ripe precursor is a strong signal. The combination of "another domain already solved this" and "someone tried this before and was merely premature" is a compelling case for moving forward. Synthesize the structural principles from analogs with the timing insights from precursors into a clear hypothesis about what to try.',
                },
                {
                  n: '07',
                  title: 'Carry the principles into ideation and concept development.',
                  body: 'The output of analog and precursor research is not a solution; it is a set of structural principles and timing hypotheses that seed concept development. Each abstracted principle becomes a frame for How Might We questions or for Crazy 8s sketches. The research done here is the fuel for the next step. It must be actively fed into whatever ideation method follows, not left as a research report that gets filed away.',
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
            <SectionHeadingLight>What separates a productive search from a list of interesting examples that goes nowhere.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The structural framing is crisp before the search begins, not domain-specific but expressed in terms that could apply to multiple industries.',
                'The analog search pushes deliberately far. The team fights the pull toward near, surface-similar examples and looks for the truly distant structural match.',
                'Every analog is abstracted to a structural principle, not left as a domain description. The principle is expressed in terms the problem space can act on.',
                'Precursors are diagnosed for timing, not just listed. The team distinguishes premature from flawed and records the specific conditions that were missing.',
                'Both axes are run, and the outputs are synthesized before feeding into ideation. Convergent signals from both directions are weighted heavily.',
                'The research is actively fed into the ideation method that follows. It does not remain a report, it becomes the input material for What Might We and sketch sessions.',
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
                  mistake: 'Skipping the structural framing.',
                  fix: 'Jumping straight into "find analogies" without first translating the problem into structural language produces near, surface-similar results. The hotel shows up when you frame the problem as "how do we orchestrate consistent service across many handoffs?", not when you frame it as "how do we improve hospital experience?"',
                },
                {
                  mistake: 'Stopping at near analogs.',
                  fix: 'The first tier of analogs is always the obvious: other hospitals, other clinics, hotel brands already mentioned in the healthcare literature. These near analogs are too close to produce genuinely new principles. Push past them deliberately. Set a rule: if the team heard about the analog in their own industry\'s articles, it is too near.',
                },
                {
                  mistake: 'Not abstracting the principle.',
                  fix: 'A list of interesting examples with no abstraction step produces nothing actionable. "Disney does X" is not a deliverable. "Disney designs every element of the physical environment to produce a specific emotional response at each moment, and rehearses every staff interaction to be consistent with that design" is a structural principle you can apply. The extra step is mandatory.',
                },
                {
                  mistake: 'Treating precursors as a dead-end list.',
                  fix: 'Finding that something was tried before and failed is the beginning of the precursor analysis, not the end. Without the timing diagnosis (was it premature or flawed?) the list of failures is a caution sign, not a finding. The diagnosis is what makes precursor research valuable.',
                },
                {
                  mistake: 'Filing the research and not feeding it forward.',
                  fix: 'Analog and precursor research is only as valuable as what it seeds. If the structural principles and timing hypotheses go into a slide deck and not into a How Might We session or a sketch exercise, the method has produced inputs with no outputs. Run the ideation session immediately, while the research is still fresh.',
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
            <SectionHeadingLight>Building an analog library and running the precursor diagnosis as a team practice.</SectionHeadingLight>
            <Body>
              Analogs and precursors can be run as a single focused session or as an ongoing practice that the
              team builds over time. A one-time sprint session produces a narrow set of inputs; a team that
              continuously builds an analogical library and monitors its category&rsquo;s history produces
              richer ideation material whenever it needs it.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Assign research in advance',
                  body: 'The productive analog session is not a blank brainstorm. It is a structured debrief of research done in advance. Assign each team member two or three domains to investigate before the session: how has the hotel industry solved service consistency? How have airports managed complex, stressful multi-stage journeys? Individuals bring structured findings; the session synthesizes and abstracts, not generates.',
                },
                {
                  label: 'Use a consistent reporting format per analog',
                  body: 'For each analog brought to the session, document: the domain, the structural problem they solved, the specific practice or mechanism they used, and the abstracted structural principle. That four-field format creates a consistent vocabulary for comparison across domains and makes the abstraction step explicit rather than implicit. Without it, sessions produce lists of interesting examples rather than actionable principles.',
                },
                {
                  label: 'Run analogs and precursors in parallel, not in sequence',
                  body: 'Split the team: half searches the analog axis (across industries), half searches the precursor axis (backward through time). The parallel search prevents either direction from being neglected when time is short. Converge after both directions have been researched, not during the research itself.',
                },
                {
                  label: 'Build the analogical library as an ongoing practice',
                  body: 'The most effective teams treat analog collection as a continuous background practice rather than a session-specific activity. A shared repository where any team member can log an interesting domain, a structural principle they noticed, or a relevant precursor they came across means that ideation sessions always start with a richer library than a single research sprint can produce.',
                },
                {
                  label: 'Document the timing diagnosis explicitly',
                  body: 'For every precursor, record the timing judgment in writing: premature or flawed, and specifically what was missing. This is the finding that is most commonly lost. Teams note that something was tried before and forget to record why it failed and whether the conditions have changed. The diagnosis belongs in the team\'s working document, not just in the facilitator\'s head.',
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
            <SectionHeadingDark>AI retrieves near analogs fluently and lists precursors readily. It struggles with the far jump and the timing diagnosis.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see how the search space changes when AI leads the search,
              what it clusters on, and what it misses.
            </p>
            <APAIReactivated />
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
            <SectionHeadingLight>Cleveland Clinic: a far analog and a precursor diagnosis that changed the category.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Cleveland Clinic needed to transform patient experience. The breakthrough came from a single
              far structural analog (luxury hotels) and a precise precursor diagnosis about what
              earlier attempts had borrowed wrong. Toggle to see what changed with a hypothetical AI-first search.
            </p>
            <APExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Analogs vs Precursors distinction   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Two directions, one method</SectionLabel>
            <SectionHeadingLight>The two axes are perpendicular on purpose. Each direction requires a different search skill.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Analogs search outward across other industries in the present. Precursors search backward through your
              own industry&rsquo;s history. The skill each requires (abstraction versus timing diagnosis) is
              different enough that they benefit from being run separately before being synthesized.
            </p>
            <APDistinction />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Used in these frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Analogs &amp; Precursors shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              An ideation-phase method designed to expand the solution space before convergence begins.
              It appears at the moments in each framework when conceptual range matters most
              and incremental thinking is the main risk.
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
          S13 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with Analogs &amp; Precursors.</SectionHeadingLight>

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
          S14 - Sources   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'The Medici Effect',
                  author: 'Frans Johansson',
                  year:   '2004',
                  note:   'The defining account of intersection thinking: the idea that breakthrough innovations occur at the intersection of concepts from different fields, not within any single field. Johansson\'s central argument is that the further you search from your starting domain, the higher the density of potential ideas, because you encounter concepts and principles that have never been combined with your field\'s problems before. This is the core intuition behind the analogs direction: the value of the far search grows with distance.',
                },
                {
                  title:  'Creative Confidence',
                  author: 'Tom Kelley and David Kelley',
                  year:   '2013',
                  note:   'The Kelleys\' treatment of how design thinkers build the habit of looking to other domains for structural inspiration. Their concept of the analogical library (a team\'s personal collection of insights, principles, and mechanisms from adjacent and distant domains, built continuously as a practice rather than a one-time exercise) maps directly onto the analog axis of this method. The book\'s cases show repeatedly how far structural matches produced solutions that near matches could not.',
                },
                {
                  title:  'Where Good Ideas Come From',
                  author: 'Steven Johnson',
                  year:   '2010',
                  note:   'Johnson\'s analysis of innovation patterns across centuries provides the best conceptual frame for why precursors matter. His concepts of the "slow hunch" (ideas that circulate and develop over years before becoming viable) and "the adjacent possible" (the space of ideas that are one step beyond what currently exists) explain why historical precursors are such a rich source of ripe innovations. An idea that failed in 1990 because the cost curve had not moved is a slow hunch waiting for the adjacent possible to catch up, exactly what the precursor timing diagnosis is designed to identify.',
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

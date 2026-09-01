import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import VPCExampleToggle from './VPCExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Value Proposition Canvas — Methods — Innovation 101',
}

const VPCEstablishing  = dynamic(() => import('./VPCEstablishing'),  { ssr: false })
const VPCInteractive   = dynamic(() => import('./VPCInteractive'),   { ssr: false })
const VPCAIReactivated = dynamic(() => import('./VPCAIReactivated'), { ssr: false })

const PLUM = '#6B4A77'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'During the Develop phase, the team tests emerging solutions against the research gathered in Discover. The Value Proposition Canvas makes that test explicit: the Customer Profile carries the evidence from research, and the fit-gap analysis reveals whether the developing solution actually addresses what was found, or only what the team imagined.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: "Before the team builds, the VPC narrows the Minimum Viable Product to the connections with the strongest fit evidence. Wasted features (those with no corresponding pain or gain in the Customer Profile) are the first candidates to cut. The canvas makes the scope decision a research decision, not a preference one.",
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Ideate · Prototype',
    note: 'The VPC links the Empathize insights to the Ideate and Prototype stages by making fit a design criterion. Concepts that address extreme pains or create sought-after gains with specific product mechanisms are stronger candidates for prototyping. The gaps exposed by the canvas guide ideation toward what the research actually requires.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Backlog',
    note: 'The canvas translates customer research into backlog rationale. Features that connect to real pains or gains get a defensible reason to exist; those that do not become visible candidates for de-prioritisation or removal. The gap analysis makes the backlog prioritisation conversation about evidence rather than opinion.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'jobs-to-be-done',
    name: 'Jobs To Be Done',
    rel: "Upstream: JTBD discovers the job the customer is trying to do: the primary Customer Job that anchors the Customer Profile. Without the JTBD lens, the jobs section fills with vague activity descriptions rather than the specific progress the customer is trying to make. A well-formed job statement gives the canvas its most important input.",
  },
  {
    slug: null,
    name: 'Concept Testing',
    rel: "Downstream: the VPC claims FIT based on research inference; Concept Testing validates those claims against real customer reactions before the team commits to building. The canvas identifies which connections to test first: the ones with the weakest evidence or the highest strategic weight.",
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'The primary source of evidence for the Customer Profile. The extreme pains (the ones worth building pain relievers for) are almost never volunteered; they emerge from the probing and silence that only good interview technique surfaces. A Customer Profile built without real interviews is a speculation map.',
  },
  {
    slug: 'empathy-mapping',
    name: 'Empathy Mapping',
    rel: "A complementary synthesis tool for the same research. The empathy map captures the emotional register: the Feels quadrant and the Says-vs-Does gap. The emotional truth in Feels often reveals the pains and gains the VPC's Customer Profile needs to record but that the research on its surface did not name.",
  },
  {
    slug: 'ambition-matrix',
    name: 'Ambition Matrix',
    rel: 'Downstream prioritisation: once the VPC exposes gaps (wasted features and unmet needs) the Ambition Matrix frames the strategic choices about which gaps to address, at what horizon, and with what level of commitment. The canvas identifies what the gaps are; the matrix frames the strategic response.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ValuePropositionCanvasPage() {
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
              Value Proposition Canvas
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A two-part canvas, a Customer Profile and a Value Map, that forces an honest match between what customers actually need and what a product actually offers, and exposes every gap between them.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The gaps are not the failure. They are the finding. A canvas with visible wasted features and unmet needs is doing its job; one with perfect fit throughout is almost certainly filled from imagination.
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
            <VPCEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>Two tools in one. The fit between them is the work.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                The Value Proposition Canvas, developed by Alexander Osterwalder, is a structured tool for testing whether
                a product or service creates value for the specific customers it is designed to serve. It has two sides.
                The <strong>Customer Profile</strong> maps what the team has learned about the customer: the jobs they are trying
                to accomplish, the pains they encounter along the way, and the gains they are hoping for. The <strong>Value Map</strong>
                captures what the product offers: its products and services, its pain relievers, and its gain creators.
              </Body>
              <Body>
                The tool&rsquo;s core insight is in the gap analysis. <em>Fit</em> occurs when a pain reliever connects to a
                real customer pain, or a gain creator connects to a real customer gain. The canvas makes every connection
                , and every missing connection, visible. Features that relieve pains nobody has are wasted.
                Pains with no reliever in the product are unmet needs. Both are strategic findings, not failures.
              </Body>
              <Body>
                Its one dangerous failure mode is the same as every synthesis canvas: filled from assumption rather than
                evidence, it produces a picture of perfect fit: every feature connected to a need, no gaps. A
                canvas with no gaps is almost always a canvas built without research. The method has no value without an
                honest Customer Profile filled from actual customer evidence.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Interactive canvas   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>The six regions</SectionLabel>
            <SectionHeadingDark>Click a region to see what goes there and how to fill it honestly.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Each of the six regions has a distinct discipline. Toggle Show&nbsp;Fit to overlay the connections
              and gaps on the same canvas: the wasted features and unmet needs are the most important
              output of the exercise.
            </p>
            <VPCInteractive />
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
            <SectionHeadingLight>A strategic audit tool, not a substitute for research or for prioritisation.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}
                >Use it when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have enough customer research to populate the Customer Profile honestly: jobs, pains, and gains should trace to real evidence, not guesses.',
                    'You want to systematically audit whether your product creates value for your target customer, or whether the team has been building based on internal assumptions.',
                    'You are heading into a prioritisation conversation and need a common frame for deciding which features deserve investment and which should be cut.',
                    "You are early in ideation and want to scope solutions around what the research actually requires, not the solution the team is most attached to.",
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
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                >Do not lean on it when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "You have no customer research. A VPC without evidence is a speculation map: it will show perfect fit, no gaps, and give the team false confidence. The research comes first.",
                    "You want to validate an idea that is already built. The canvas is a design input, not a post-hoc audit. Use Concept Testing to validate rather than VPC to rationalise.",
                    "You treat it as a one-time exercise. The Customer Profile changes every time significant new research is done. A canvas that is never updated becomes a historical document rather than a live strategic tool.",
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
                The honest limit: the canvas is only as good as the Customer Profile, and the Customer Profile
                is only as good as the research beneath it. A team that fills the Customer Profile in a
                workshop from collective memory is not doing customer research; they are synthesising their
                assumptions, which is a different and far less reliable activity.
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
            <SectionHeadingLight>Five moves, from research to strategic finding.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Build the Customer Profile from research.',
                  body: 'Start on the right side. Populate Customer Jobs, Pains, and Gains from actual research: job statement interviews, in-depth interviews, ethnographic observation. Do not start with the Value Map; the product focus will bias what you listen for in the customer research. The Customer Profile is an output of research, not a product-team brainstorm.',
                },
                {
                  n: '02',
                  title: 'Rank what matters most.',
                  body: 'Not all jobs, pains, and gains are equal. Identify the most important jobs: the ones the customer most needs to accomplish. Identify the extreme pains: the ones that are most severe, most frequent, and most likely to block the job from being done. Identify the essential gains: those the customer expects and cannot go without. The ranking is a guide for the connection exercise that follows.',
                },
                {
                  n: '03',
                  title: 'Map the Value Proposition honestly.',
                  body: 'Complete the left side: list every product and service you offer (Products & Services), then describe specifically how each one relieves a customer pain (Pain Relievers) or creates a customer gain (Gain Creators). Be concrete. A pain reliever that says "improves efficiency" is not doing the work; it must name the specific pain it relieves and the specific mechanism by which it does so.',
                },
                {
                  n: '04',
                  title: 'Draw the connections and expose the gaps.',
                  body: 'Connect each pain reliever to the specific customer pain it addresses, and each gain creator to the specific gain it creates. Then audit ruthlessly. Pain relievers with no corresponding customer pain are wasted features. Extreme customer pains with no corresponding pain reliever are unmet needs. Label both explicitly. The gaps are not problems to hide; they are the most valuable output of the exercise.',
                },
                {
                  n: '05',
                  title: 'Act on the gaps.',
                  body: "The strategic decisions emerge from the gaps, not from the fits. Wasted features are candidates for removal or de-prioritisation; they consume resources and create no value. Unmet extreme needs are candidates for new product development or repositioning. The canvas is not finished when every region is filled; it is finished when the team has an action plan for the gaps it exposed.",
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
                'The Customer Profile traces every entry to real research evidence: a specific interview, observation, or job statement study.',
                'The team argues about which connections are real. Disagreements about whether a feature genuinely relieves a specific pain are exactly the right conversation to have.',
                'Gaps are named explicitly and treated as strategic findings, not as evidence of failure or things to explain away.',
                'The canvas is revisited every time significant new research is completed. A stale Customer Profile is more dangerous than no canvas at all.',
                'The output is an action plan for the gaps, not a presentation of the fits.',
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
                  mistake: 'Starting with the Value Map.',
                  fix: 'The most common sequencing error. If you fill the Value Map first, confirmation bias shapes the Customer Profile: the team unconsciously identifies pains that match features already built, and ignores pains the product cannot address. Always build the Customer Profile from research before touching the Value Map.',
                },
                {
                  mistake: 'Filling the Customer Profile in a workshop.',
                  fix: "A workshop with no prior research does not produce a Customer Profile; it produces a shared list of assumptions. The Customer Profile should be assembled from research already in hand, with the team interpreting and synthesising evidence, not generating it from memory.",
                },
                {
                  mistake: 'Connecting everything.',
                  fix: "A canvas where every pain reliever connects to a customer pain and every gain creator connects to a customer gain is almost certainly not honest. Real products have wasted features. Real customers have unmet needs. If your canvas has no gaps, examine each connection and ask: 'What is the specific research evidence for this?'",
                },
                {
                  mistake: 'Treating it as a one-time exercise.',
                  fix: 'The canvas should be a living document. Every significant research round has the potential to change the Customer Profile, which changes the fit analysis. A canvas updated once and never revisited will understate the gaps within months of any meaningful new research.',
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
            <SectionHeadingLight>Running the canvas from research to strategic finding.</SectionHeadingLight>
            <Body>
              The Value Proposition Canvas works best as a structured workshop session after research is complete,
              not as a substitute for doing research. A typical session runs two to four hours for a single customer
              segment, with the most contentious time spent on the connection-drawing and gap-identification steps.
              That contention is a sign the session is working.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Sequence: Customer Profile first, always',
                  body: 'Do not let the team see the Value Map until the Customer Profile is complete. If the team knows what the product offers before mapping what the customer needs, confirmation bias will shape the Customer Profile. Cover or hide the Value Map half until the research synthesis on the right side is done.',
                },
                {
                  label: 'One canvas per customer segment',
                  body: 'Different customer segments have genuinely different jobs, pains, and gains. A canvas that tries to capture "our customers" in general will produce a blurred average that is not quite true for any specific segment. If you serve meaningfully different types of customer, make a canvas for each.',
                },
                {
                  label: 'The connection session should generate disagreement',
                  body: 'When the team connects pain relievers to customer pains, the most valuable moments are the disagreements: "does this feature actually relieve that pain, or do we just hope it does?" The discipline of requiring evidence for each connection forces the team to distinguish between confirmed fit and assumed fit.',
                },
                {
                  label: 'Label gaps explicitly and prominently',
                  body: "Wasted features and unmet needs should not be quietly acknowledged and moved past. Label them clearly on the canvas; they are the strategic findings that justify the entire exercise. A canvas where the team has to be reminded what the gaps were is a canvas that did not do its job.",
                },
                {
                  label: 'Remote: works well with structure',
                  body: 'The canvas works well remotely on shared digital canvases. The key facilitation requirement is enforcing the sequential discipline: Customer Profile first, silent individual population before group discussion, and explicit gap labelling before the session closes. Without that structure, the session collapses into a group brainstorm and loses the method\'s value.',
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
            <SectionHeadingDark>AI generates a complete canvas. Research generates an honest one. Only one of them exposes the gaps.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what AI produces versus what research-grounded synthesis produces.
              The distinction is not which canvas looks more complete; it is which canvas tells you something actionable.
            </p>
            <VPCAIReactivated />
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
            <SectionHeadingLight>The same product. Two canvases. One strategic finding that only one of them could make.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A startup with a feature-heavy project-management tool is struggling to win small creative agencies.
              Both versions of the canvas map the same product and the same target customer. Only the source of
              the Customer Profile differs. Toggle between them to see where the gap that changed their strategy came from.
            </p>
            <VPCExampleToggle />
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
            <SectionHeadingLight>Where the Value Proposition Canvas shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              The canvas maps to the moments in each framework where the task is connecting customer research
              to strategic or design decisions: the transition from understanding the customer to building
              for them.
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
            <SectionHeadingLight>What to combine with the Value Proposition Canvas.</SectionHeadingLight>

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
                  title:  'Value Proposition Design',
                  author: 'Alexander Osterwalder, Yves Pigneur, Gregory Bernarda, and Alan Smith',
                  year:   '2014',
                  note:   "The canonical reference for the Value Proposition Canvas. Osterwalder's framing makes explicit what every practitioner learns the hard way: the canvas's value is in the gap analysis, not in the fit claims. The book's emphasis on testing each connection against customer evidence, and on treating unmet needs as strategic opportunities, is the most important discipline the method requires.",
                },
                {
                  title:  'Business Model Generation',
                  author: 'Alexander Osterwalder and Yves Pigneur',
                  year:   '2010',
                  note:   "Introduces the Business Model Canvas, of which the Value Proposition Canvas is the most detailed component. Reading both together clarifies the relationship: the VPC zooms into the Value Proposition and Customer Segments blocks of the Business Model Canvas, making those two blocks legible in terms that bridge customer research and product design.",
                },
                {
                  title:  'Testing Business Ideas',
                  author: 'David Bland and Alexander Osterwalder',
                  year:   '2019',
                  note:   "The practical companion for the step after the canvas is complete. Bland and Osterwalder provide a library of experiments for testing the connections drawn in the VPC, specifically, for validating that the claimed fit between pain relievers and customer pains holds up under real customer testing. Fills the gap between the canvas's output and what the team should actually build or test next.",
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

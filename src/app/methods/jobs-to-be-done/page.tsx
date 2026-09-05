import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import JTBDExampleToggle from './JTBDExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Jobs To Be Done · Methods',
}

const JTBDEstablishing  = dynamic(() => import('./JTBDEstablishing'),  { ssr: false })
const JTBDInteractive   = dynamic(() => import('./JTBDInteractive'),   { ssr: false })
const JTBDAIReactivated = dynamic(() => import('./JTBDAIReactivated'), { ssr: false })

const NAVY = '#1F3A5F'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Define',
    note: 'JTBD is a core reframing tool during the Define phase, used to translate what the Discover research revealed into the underlying job people are trying to get done, before the team converges on a problem definition. The job statement often replaces a demographic description as the basis for the How Might We question that frames ideation.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: "The job defines what the MVP is actually being hired to do, which shapes what is built, what is tested, and what success looks like. Without a clear job, the MVP tests the team's assumption about the product; with a clear job, it tests whether the product does the job better than alternatives. The job is the hypothesis the build-measure-learn cycle is structured around.",
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Backlog',
    note: "JTBD reframes backlog items from features to jobs: instead of 'add a notification system,' the item becomes 'help users remember to act on time-sensitive progress.' The job framing prevents the backlog from becoming a list of features nobody hired and keeps the team focused on what actually drives value for the person using the product.",
  },
  {
    slug: 'fde',
    name: 'Forward Deployed Engineering',
    phase: 'Embed',
    note: "Being embedded in a customer's context is the richest possible source of JTBD evidence: it provides direct access to the circumstances of use and the switching moments that reveal the real job. The embedded engineer is uniquely positioned to observe not just what the customer asks for but what they are actually trying to accomplish, including the un-obvious job behind the stated request.",
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Monday',
    note: "Monday's work in a Design Sprint includes framing the sprint target: who the user is and what problem the sprint is solving for. JTBD sharpens that framing: the sprint target becomes the job the solution must do, not the feature to build. A sprint framed around a job is harder to scope wrong and easier to evaluate at Friday's test.",
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'personas-archetypes',
    name: 'Personas & Archetypes',
    rel: "The instructive contrast: personas describe WHO the user is; JTBD describes the JOB they are trying to get done. They are complementary lenses, not competitors. The demographic cannot predict the job; the job can explain behavior that no demographic could. Together they are stronger than either alone: the persona gives the person, the job gives the reason for their choices.",
  },
  {
    slug: null,
    name: 'Value Proposition Canvas',
    rel: "The natural next step: once the job is defined, the Value Proposition Canvas maps how an offering fits that job's pains and gains. The job is the input; the canvas is the mapping tool that translates a well-defined job into a clear fit-to-demand story. Without a clear job, the canvas maps against an imagined customer; with one, it maps against a defined demand.",
  },
  {
    slug: 'how-might-we',
    name: 'How Might We',
    rel: "A well-defined job makes excellent raw material for a well-scoped How Might We question. The job's outcome, what the person is ultimately after, translates directly into the HMW's framing: 'How might we help someone [job outcome] when they are [job situation]?' The job-to-HMW path is one of the cleaner handoffs in the synthesis toolkit.",
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: "The primary research method for surfacing the circumstances of use and the moment of switching that reveal the real job. JTBD research works specifically by getting people to narrate the episode of a recent switch: when and why they hired something new, what they had before, what finally pushed them, and in-depth interviews are the best tool for eliciting those narratives in enough depth to find the job.",
  },
  {
    slug: 'ambition-matrix',
    name: 'Ambition Matrix',
    rel: "Jobs can reveal adjacent and transformational opportunities that reshape where bets sit on the portfolio. A well-defined job that spans a wider situation than the team's current product suggests an adjacent opportunity; a job that points to a different kind of progress entirely suggests a transformational one. The job is one of the strongest inputs to an honest portfolio ambition conversation.",
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function JobsToBeDonePage() {
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
                color:       '#4480D1',  /* NAVY, brightened for text contrast */
                background: 'rgba(31,58,95,0.12)',
                border:     '1px solid rgba(31,58,95,0.28)',
              }}
            >
              Synthesis &amp; Framing
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Jobs To Be Done
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A lens that frames innovation around the progress a person is trying to make, the job they hire a
              product to do, rather than the product&rsquo;s features or the customer&rsquo;s demographics.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}
            >
              People do not buy products. They hire them to do a job, and they fire them when something does it
              better. Understand the job and you understand the demand.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <JTBDEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>What it is</SectionLabel>
            <SectionHeadingLight>Stop describing the customer. Describe the job.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Jobs To Be Done is a way of understanding customer needs by focusing on the progress a person is
                trying to make in a particular circumstance, the &ldquo;job&rdquo; they are trying to get done, rather
                than on the product&rsquo;s attributes or the customer&rsquo;s profile. The core idea, associated with Clayton
                Christensen, is that people do not buy products; they hire them to do a job, and they fire them
                when something does it better. Understanding the job, including its functional, emotional, and social
                dimensions, reveals why people really make the choices they do, and where the genuine opportunities
                for innovation lie.
              </Body>
              <Body>
                Its distinctive move is to look past two things most analysis fixates on: product features and
                customer demographics. Neither reliably predicts behavior. A demographic tells you who bought the
                product; the job tells you why they hired it. A feature tells you what the product does; the job tells
                you what progress the person was trying to make. Expressed as a job, &ldquo;when I am commuting alone
                and bored, I want something engaging and filling I can manage one-handed, so I can arrive at work
                feeling ready&rdquo;, the same need makes the true competitors and the real improvement immediately
                visible. Neither the demographic nor the feature would have revealed either.
              </Body>
              <Body>
                The job is expressed as progress in a circumstance: when [situation], I want to [motivation], so I
                can [outcome]. Note what is absent: no product, no demographic, only the situation, the desired
                progress, and the outcome. That is the reframe, and it is the whole method.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Interactive builder   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Build the job statement</SectionLabel>
            <SectionHeadingDark>Stop describing the product. Build the job. Click the slots.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between the wrong framing (a feature/demographic) and the right one (a job statement)
              to feel the reframe. In the job view, click each slot to reveal what belongs there and how to
              get it right.
            </p>
            <JTBDInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A lens for understanding demand, not a source of data.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: NAVY }}
                >Use JTBD when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You want to reframe what you are really solving for, past features and past demographics, in terms of the progress people are trying to make.',
                    'You suspect the team is too focused on product attributes or demographic segments that do not actually predict behavior or drive switching decisions.',
                    'You need to find unmet needs, or to see the true competition, which is often not what the product category implies.',
                    "You are trying to understand why people switch to or from a solution: the moment of hiring and firing, which is where the job is most legible.",
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: NAVY, flexShrink: 0, marginTop: 2 }}>→</span>
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
                    'You need an execution or build process. JTBD is a lens for understanding demand, not a method for building. It reframes the question; it does not answer it.',
                    "You have no real research into the circumstances of use. A job written from assumption is just a feature or a guess dressed as a job, and it carries the same false confidence.",
                    "The job is already well understood and the decision genuinely is about a feature or a segment. Not every problem needs reframing.",
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
              style={{ background: 'var(--color-neutral-50)', borderLeft: '3px solid var(--color-neutral-300)' }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: JTBD is a lens, not a source of data. It reframes understanding you already have into
                terms of progress; it cannot substitute for the research into real circumstances of use that a true
                job statement depends on. Its most common failure mode is a &ldquo;job&rdquo; that is secretly a product feature
                or a demographic in disguise.
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
            <SectionLabel accent={NAVY}>How it works</SectionLabel>
            <SectionHeadingLight>Five moves, from circumstance to demand.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Investigate the circumstances of use, especially the switch.',
                  body: 'Study when and why people hire a solution, paying special attention to the moment of switching: what triggered them to seek something new, what they used before, and what progress they were chasing. The switch is where the job is most visible. It reveals the unmet demand that finally became acute enough to produce a behavior change.',
                },
                {
                  n: '02',
                  title: 'Articulate the job as progress in a circumstance.',
                  body: 'Write the job independent of any solution: "when [situation], I want to [motivation], so I can [outcome]." If a product name or a demographic appears in the statement, it is not yet a job; keep rewriting until only progress-in-circumstance remains. The test: could a completely different product satisfy this job statement? If yes, you have a job.',
                },
                {
                  n: '03',
                  title: 'Surface all three dimensions.',
                  body: "Identify the functional (the practical task), emotional (how the person wants to feel), and social (how they want to be perceived) dimensions of the job. The emotional and social dimensions are usually where the non-obvious insight lives, and where the teams that see only the functional job miss most of the real demand.",
                },
                {
                  n: '04',
                  title: 'Find the real competition.',
                  body: 'With the job defined, ask what else people hire to do this job. The true competitors are often nothing like your product: the milkshake competes with bananas and boredom, not other milkshakes. This cross-category competition is one of JTBD\'s biggest strategic payoffs, and it is invisible until the job is defined.',
                },
                {
                  n: '05',
                  title: 'Reframe the problem and the opportunity.',
                  body: 'Use the job to redirect the team from improving the product\'s features to serving the job better. This often points to entirely different improvements than a feature-focused view would: the thicker milkshake that lasts the commute, not the cheaper one that competes on dessert value.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(31,58,95,0.10)', lineHeight: 1.1, width: 40 }}
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
            <SectionLabel accent={NAVY}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and what prevents it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The job is defined in terms of progress and circumstance: no product name, no demographic, only the situation and the desired outcome.',
                'The emotional and social dimensions are surfaced alongside the functional one: the job includes how the person wants to feel and to be perceived, not just what they want to accomplish.',
                'The framing reveals unexpected competition: things people actually hire to do this job that look nothing like your product.',
                'It is grounded in real investigation of the circumstances of use, especially the switching moment, where the job is most clearly legible.',
                'It redirects the team from feature-polishing to job-serving, pointing at improvements that a feature-focused view never would have reached.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: NAVY, flexShrink: 0, marginTop: 3 }}>✓</span>
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
                  mistake: 'Writing the job as a product feature in disguise.',
                  fix: '"The job is a thicker milkshake" is not a job; it is a feature. If a solution appears in the statement, keep rewriting until only progress-in-circumstance remains. The test: remove your product from the statement. Is the need still clear? If not, a solution crept in.',
                },
                {
                  mistake: 'Only capturing the functional dimension.',
                  fix: 'The practical task surfaces easily; the emotional and social dimensions take deliberate effort. Build in a specific step to ask how the person wants to feel and to be perceived, or the team will stop at the functional layer and miss most of the job.',
                },
                {
                  mistake: 'Confusing the job with the demographic.',
                  fix: '"The job is what suburban parents want" collapses back into segmentation. The circumstance predicts behavior; the demographic does not. Keep the person\'s profile out of the job statement and keep the situational trigger in.',
                },
                {
                  mistake: 'Skipping the switching moment.',
                  fix: 'The moment someone hires a new solution or fires an old one is where the job is clearest and most specific. Analysis that ignores the switch misses the strongest evidence and often produces a job that is too generic to reveal real competition or real improvement.',
                },
              ].map(({ mistake, fix }) => (
                <div key={mistake} className="rounded-lg p-4" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
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
            <SectionLabel accent={NAVY}>Logistics</SectionLabel>
            <SectionHeadingLight>Running the investigation from switching moment to job statement.</SectionHeadingLight>
            <Body>
              JTBD is primarily a research and synthesis orientation, not a workshop exercise. The richest evidence
              comes from interviewing people about a specific recent switch, and the interview technique matters.
              These are some of the practical things that determine whether the investigation finds the real job.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Research the switch directly',
                  body: "The richest JTBD evidence comes from interviewing people about a recent switch: when and why they started using something new, what they had before, what finally pushed them. Structure the research around the switching moment rather than around satisfaction with the current product. 'Walk me through the last time you changed how you were doing this' is more revealing than 'how satisfied are you with our product?'",
                },
                {
                  label: 'Interview for circumstance, not opinion',
                  body: "JTBD research works by getting people to narrate specific recent episodes, not by asking what they want. 'Walk me through the last time you...' reveals the job; 'what would you like us to improve?' reveals stated preferences, which are much weaker evidence. The job hides in the story of a real circumstance.",
                },
                {
                  label: 'Push past the functional job in the room',
                  body: "The functional job surfaces easily and tends to dominate early synthesis. The emotional and social dimensions take deliberate probing. Build in a specific prompt to ask how the person wanted to feel during and after the job, and how they wanted to be perceived, or the team will stop at the functional layer and produce a job statement that looks complete but misses the job's deepest drivers.",
                },
                {
                  label: 'Watch for solutions sneaking into the job',
                  body: "As the team writes job statements, actively police them for product names, features, and demographics. A quick test: could a completely different product also satisfy this job statement? If not, a solution has crept in. A job that passes the test opens the space to see real competition and real alternatives.",
                },
                {
                  label: 'Map the real competition explicitly',
                  body: "Once the job is defined, run a short exercise listing everything people hire to do this job, however unlike your product. This is where the strategic surprise and the real market definition usually appear. The non-obvious competition is often the most revealing output of the whole investigation.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-0.5 shrink-0 rounded-full" style={{ background: 'rgba(31,58,95,0.28)', marginTop: 4 }} />
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
            <SectionLabel accent={NAVY}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI writes clean job statements instantly. The real job is usually the surprising one it does not reach.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what AI produces from a product description, and where the
              counterintuitive real job, the emotional dimensions, and the non-obvious competition stay out of reach.
            </p>
            <JTBDAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same product. Two investigations. One found the job; one did not.</SectionHeadingLight>
            <p className="mb-10" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              A fast-food chain wants to sell more milkshakes. Sales are flat. Both approaches investigate the same
              product and the same purchase; only the method differs. Toggle between them to see which one found
              the job, and what the job revealed.
            </p>
            <JTBDExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Jobs To Be Done shows up.</SectionHeadingLight>
            <p className="mb-8" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              JTBD is a demand-understanding lens, so it maps to the moments in each framework where the task is
              deciding what to build and for what underlying need, before the team commits to a direction.
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
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 220 }}
                  >{name}</span>
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-2xs)', color: NAVY, textTransform: 'uppercase', letterSpacing: '0.08em' }}
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
            <SectionLabel accent={NAVY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with JTBD.</SectionHeadingLight>

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
                      <span className="font-semibold" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
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
            <SectionLabel accent={NAVY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Competing Against Luck',
                  author: 'Clayton Christensen, Taddy Hall, Karen Dillon, and David Duncan',
                  year:   '2016',
                  note:   'The definitive book on Jobs To Be Done and the source of the milkshake study. Christensen lays out the full theory of why people hire products and what drives switching, with the milkshake research as its most famous illustration. The book makes the counterintuitive argument, that the job, not the product or the customer, is the unit of innovation, in its most developed form.',
                },
                {
                  title:  'Jobs to Be Done',
                  author: 'Anthony Ulwick',
                  year:   '2016',
                  note:   "Ulwick's Outcome-Driven Innovation variant of the theory, which operationalizes JTBD with a more quantitative methodology for identifying and prioritizing jobs. Where Christensen's version is more conceptual, Ulwick's provides structured techniques for mapping jobs to outcomes and scoring them against importance and satisfaction. A complement to Competing Against Luck for teams who want more process.",
                },
                {
                  title:  'When Coffee and Kale Compete',
                  author: 'Alan Klement',
                  year:   '2016',
                  note:   "Klement's demand-side perspective on JTBD focuses on the emotional and social dimensions of the job: the parts that product teams most consistently miss. His framing of the job as a system of progress, involving not just the functional task but the emotional and social progress the person is trying to make, is the clearest treatment of why the method reaches deeper than features or demographics.",
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(31,58,95,0.30)' }} />
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

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import TTIExampleToggle from './TTIExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: '10 Types of Innovation — Methods — Innovation 101',
}

const TTIEstablishing        = dynamic(() => import('./TTIEstablishing'),        { ssr: false })
const TTIInteractive         = dynamic(() => import('./TTIInteractive'),         { ssr: false })
const TTIDefensibilityBuilder = dynamic(() => import('./TTIDefensibilityBuilder'), { ssr: false })
const TTIAIReactivated       = dynamic(() => import('./TTIAIReactivated'),       { ssr: false })

const PLUM = '#6B4A77'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'Stress-testing whether a concept developed in the Develop phase innovates across multiple types or leans entirely on product performance. The 10 Types is the diagnostic lens that ensures the concept being developed is broad and defensible, not just feature-rich.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Backlog',
    note: 'Shaping a portfolio of backlog work that innovates beyond product performance. The 10 Types helps ensure the backlog invests in the non-product types (process, channel, customer engagement) not only in feature development, which is where backlogs almost always cluster.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'Considering whether the business model, not just the product, is the innovation. In Lean Startup, the Build step defines what gets tested. The 10 Types is the diagnostic that asks: are we testing the product or the system? Especially relevant for profit-model and channel bets that a minimal product alone cannot test.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'ambition-matrix',
    name: 'Ambition Matrix',
    rel: 'The natural companion lens: the Ambition Matrix handles the scale of bets (core / adjacent / transformational); the 10 Types handles the type of bets (which of the ten dimensions). Used together, they shape both how bold and how broad a portfolio of innovation is. This is the key strategic pairing for portfolio design.',
  },
  {
    slug: 'value-proposition-canvas',
    name: 'Value Proposition Canvas',
    rel: 'Complementary at the concept level: the canvas ensures fit to customer needs; the 10 Types ensures the innovation is broad and defensible across dimensions, not just a better feature. After the 10 Types identifies the right combination of types, the canvas tests whether that combination actually resonates with the people it is designed for.',
  },
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'A multi-type innovation still has to be desirable. The 10 Types identifies the combination of innovation dimensions the concept should operate on; concept testing validates that the combined concept is something customers actually want: that the strategic boldness matches real demand.',
  },
  {
    slug: 'jobs-to-be-done',
    name: 'Jobs To Be Done',
    rel: 'The job a customer is hiring the offering to do can reveal which innovation types (beyond product) would serve it best. A job that is about social belonging points to brand and customer engagement; a job about reliability points to process and service. JTBD and the 10 Types together tell you what the customer needs and which innovation dimensions should serve it.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function TenTypesInnovationPage() {
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
              10 Types of Innovation
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A diagnostic framework identifying ten distinct dimensions a business can innovate on, far beyond the product, and showing that the most durable advantages combine several at once.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Most companies pour everything into a better product, the one kind of innovation that is easiest to copy. This framework reveals the nine other dimensions they are ignoring.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <TTIEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>Ten dimensions to innovate on. Most organizations use one.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                The 10 Types of Innovation, developed by Doblin (Larry Keeley and colleagues), identifies ten distinct types of
                innovation organized into three categories. Configuration covers the innermost workings of a business: the profit
                model, network, structure, and process. Offering covers the product itself: product performance and product system.
                Experience covers the customer-facing side: service, channel, brand, and customer engagement.
              </Body>
              <Body>
                Its central insight is uncomfortable and valuable: most organizations innovate almost entirely on product
                performance, which is the hardest type to sustain an advantage in and the easiest for competitors to copy,
                while neglecting the other nine. A better feature can be matched within a season. The framework argues that
                the most durable and defensible innovations combine multiple types at once, because a combination of interlocking
                innovations (across profit model, network, channel, brand, and more) is far harder for a competitor
                to replicate than any single product feature.
              </Body>
              <Body>
                So the framework does two jobs. As a diagnostic, it maps where an organization (or a competitor) currently
                innovates across the ten types, which almost always reveals a heavy concentration in product performance and
                gaps everywhere else. As a generative tool, it deliberately pushes a team to innovate in the under-used types,
                and, crucially, to combine several into a system rivals cannot easily copy.
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
            <SectionLabel accent={PLUM}>The ten types</SectionLabel>
            <SectionHeadingDark>Ten ways to innovate, not one.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click any tile to read what that type means, why it matters, and a concrete example. One tile at a time
              : the goal here is depth, not breadth.
            </p>
            <TTIInteractive />
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
            <SectionHeadingLight>A strategic lens, not a fast workshop tool.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Use the 10 Types when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You want to stress-test whether a concept is innovating on multiple dimensions or leaning entirely on product performance.',
                    'You need to deliberately generate ideas in neglected, higher-leverage types: profit model, network, channel, customer engagement.',
                    'You are analyzing why a competitor\'s advantage is so durable, or diagnosing your own organization\'s innovation blind spots.',
                    'You are trying to build a defensible position, not just a better feature that rivals will match next season.',
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
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Do not lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You need a quick, in-the-moment session method; this is a strategic, analytical lens, not a fast workshop tool.',
                    'You have no real understanding of the business or market to diagnose; the framework organizes strategic thinking, it does not supply the underlying knowledge.',
                    'The task is purely to improve one product feature and combination is genuinely not on the table, though the framework\'s whole point is to question that assumption.',
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
                The honest limit: the 10 Types is a lens for seeing and combining innovation dimensions, not a source of the
                ideas themselves or the market knowledge behind them. Its most common failure is being used as a checklist to
                tick, one idea per type, filed away, rather than as a tool to combine under-used types into a system. The
                framework&rsquo;s value is in the combination; used as a checklist, it becomes an inventory.
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
            <SectionHeadingLight>Five moves, from diagnostic to defensible combination.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Use it first as a diagnostic.',
                  body: 'Map where your organization (or a competitor) currently innovates across the ten types. This almost always reveals a heavy concentration in product performance and thin or empty coverage across the other nine, which is itself the insight. Seeing the concentration in product performance, and the empty columns elsewhere, is what motivates the generative work that follows.',
                },
                {
                  n: '02',
                  title: 'Name the neglected, high-leverage types.',
                  body: 'Look deliberately at the under-used types, especially the often-overlooked profit model, network, and customer engagement, and ask what innovating there could look like. These are consistently the most neglected and frequently the most defensible, precisely because competitors are not focused there either.',
                },
                {
                  n: '03',
                  title: 'Generate ideas in the under-used types.',
                  body: 'For the concept at hand, ask the generative questions: could the profit model be different? the channel novel? the customer engagement distinctive? the network structure advantageous? Push past product performance, where the instinct always pulls.',
                },
                {
                  n: '04',
                  title: 'Combine several types into a system.',
                  body: 'This is the decisive move. Rather than one idea per type, deliberately combine several under-used types into an interlocking whole, because a combination is far harder to copy than any single innovation. Ask which types reinforce each other: which profit model, if paired with which channel and which customer engagement, would create a system rather than a feature.',
                },
                {
                  n: '05',
                  title: 'Test for defensibility.',
                  body: 'For the combined concept, ask the durability question: to copy this, how many things would a competitor have to match at once? One feature is fragile; an interlocking set of profit-model, network, channel, brand, and engagement innovations is durable. The answer to this question is what makes the strategy worth backing.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(107,74,119,0.10)', lineHeight: 1.1, width: 40 }}
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
          S7 - The Defensibility Builder   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>The Defensibility Builder</SectionLabel>
            <SectionHeadingDark>Select the types you&rsquo;re combining. See how hard they become to copy.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Any single type can be replicated. Combine five or more, especially across all three categories,
              and a rival must match everything at once. Select the types to test the defensibility of the combination.
            </p>
            <TTIDefensibilityBuilder />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S8 - Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the mistakes that prevent it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The team sees past product features to the full range of ten innovation dimensions.',
                'The concept innovates across several types in deliberate combination, not just one.',
                'Neglected, high-leverage types (profit model, network, customer engagement) get genuine consideration, not a token mention.',
                'The diagnostic is honest about how concentrated the organization is in product performance.',
                'Defensibility is assessed: the team can name how many things a competitor would have to copy at once.',
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
                  mistake: 'Defaulting to product-performance innovation.',
                  fix: 'The instinct always pulls back to a better feature, the crowded, copyable type. Deliberately force attention to the other nine. Do not let the session end without genuine ideas in the non-product types.',
                },
                {
                  mistake: 'Treating the ten types as a checklist to tick.',
                  fix: 'Generating one idea per type and filing it away misses the entire point. The value is combining under-used types into a system. Restructure the session to end with a small number of interlocking combinations, not ten separate single-type ideas.',
                },
                {
                  mistake: 'Underestimating the non-product types.',
                  fix: 'Profit model, network, and customer engagement are often the most defensible and the most ignored. Do not treat them as secondary to the product. The strongest advantages in almost every studied case involve at least one non-product type.',
                },
                {
                  mistake: 'Stopping at a single type.',
                  fix: 'A one-type innovation, however clever, is usually copyable. Push to combine several into an interlocking whole. The combination is the method\'s entire point.',
                },
                {
                  mistake: 'Using it without market knowledge.',
                  fix: 'The framework organizes strategic thinking; it does not replace understanding of the business and market. Bring real knowledge of the profit model, channels, and competitive landscape to it; the framework shapes that knowledge, not the other way around.',
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
          S9 - Logistics   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Logistics</SectionLabel>
            <SectionHeadingLight>Running it as a strategic session, not a workshop.</SectionHeadingLight>
            <Body>
              The 10 Types rewards analytical depth and cross-functional knowledge. It is a strategic session rather
              than a discovery workshop, and the practical questions are about who is in the room, how the session
              is structured, and what the team walks away with.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Treat it as a strategic session, not a quick workshop',
                  body: 'Run it with people who understand the business\'s profit model, operations, channels, and brand (not just the product team) because innovating on the non-product types requires knowing how those parts of the business actually work. Cross-functional representation is not a nice-to-have; it is what makes the session able to generate real ideas in the non-product types.',
                },
                {
                  label: 'Diagnose before you generate',
                  body: 'Begin by honestly mapping current innovation across the ten types, for your organization and a key competitor or two. Seeing the concentration in product performance, and the empty columns elsewhere, is what motivates the generative work that follows. The diagnostic is the session\'s opening, not a preamble.',
                },
                {
                  label: 'Deliberately budget time for the neglected types',
                  body: 'Because conversational gravity pulls toward the product, explicitly reserve time to work the profit-model, network, and customer-engagement types, or the session will drift back to features and the framework\'s value will be lost. Name the time allocation at the start.',
                },
                {
                  label: 'Push for combination, not coverage',
                  body: 'Structure the session to end not with ten separate ideas but with a small number of combined concepts that interlock several types. A simple prompt: "pick three under-used types that could reinforce each other, and design the system they form." The combination is the deliverable.',
                },
                {
                  label: 'Use it analytically on winners',
                  body: 'One practical use is to reverse-engineer why a dominant competitor is hard to beat. Mapping their advantage across the ten types usually reveals a combination, not a single feature, which reframes how to compete with them. Tools and books named as examples, not endorsements.',
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
          S10 - AI and this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI will fill all ten types with ideas in seconds. The strategy is in the combination it does not choose.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI genuinely accelerates the 10 Types diagnostic, and the strategic
              judgment it populates columns around but does not make.
            </p>
            <TTIAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same case. The same question. Two approaches, one finds the system, one finds a list.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Nespresso&rsquo;s advantage held for years even though its coffee was good but not categorically better than rivals&rsquo;.
              Toggle between the traditional 10 Types analysis and an AI-assisted version to see why one reveals a
              defensible system while the other produces a menu.
            </p>
            <TTIExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Used in these frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where the 10 Types shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              As a strategic and analytical lens, the 10 Types maps to the develop and strategy moments where a
              concept&rsquo;s defensibility and breadth of innovation are assessed. It is intentionally absent at
              fast discovery or session-level phases.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link
                  key={slug}
                  href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <span className="font-semibold shrink-0" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}>
                    {name}
                  </span>
                  <span className="font-mono shrink-0" style={{ fontSize: 'var(--text-2xs)', color: PLUM, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {phase}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-6" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontStyle: 'italic' }}>
              Note: the 10 Types is a strategic diagnostic tool. It intentionally maps to fewer frameworks than the universal research methods, and is blank at fast-discovery or session-level phases. These blanks are intentional.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S13 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with the 10 Types.</SectionHeadingLight>

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
          S14 - Sources   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Ten Types of Innovation: The Discipline of Building Breakthroughs',
                  author: 'Larry Keeley, Helen Walters, Ryan Pikkel, and Brian Quinn',
                  year:   '2013',
                  note:   'The definitive book on the framework, from Doblin. Keeley and colleagues present the ten types with detailed case examples and a systematic approach to using them for both diagnosis and generation. The combination thesis, that durable advantage comes from interlocking several types, not from any one, is the book\'s central argument.',
                },
                {
                  title:  'The Innovator\'s Dilemma',
                  author: 'Clayton Christensen',
                  year:   '1997',
                  note:   'The broader theory of why product-only advantages erode. Christensen\'s work explains why incumbents, who focus almost entirely on product performance, are consistently disrupted by entrants who innovate on other dimensions: a thesis that the 10 Types framework gives practical shape to.',
                },
                {
                  title:  'Business Model Generation',
                  author: 'Alexander Osterwalder and Yves Pigneur',
                  year:   '2010',
                  note:   'For innovating on the business model: the several non-product types. Osterwalder and Pigneur\'s canvas makes the profit model, network, and channel dimensions of innovation concrete and practical, complementing the 10 Types framework\'s diagnostic scope.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(107,74,119,0.30)' }} />
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

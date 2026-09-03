import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import AMExampleToggle from './AMExampleToggle'
import { DarkSection, LightSection, WarmSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Ambition Matrix — Methods — Innovation 101',
}

const AMEstablishing  = dynamic(() => import('./AMEstablishing'),  { ssr: false })
const AMInteractive   = dynamic(() => import('./AMInteractive'),   { ssr: false })
const AMAIReactivated = dynamic(() => import('./AMAIReactivated'), { ssr: false })

const PLUM = '#6B4A77'


// ── Data ─────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop & Deliver',
    note: 'Positioning concepts within the wider portfolio as they mature toward delivery.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Backlog',
    note: 'Balancing the innovation backlog across safe and bold bets before sprint prioritization.',
  },
]

const RELATED_METHODS = [
  {
    slug: '10-types-of-innovation',
    name: '10 Types of Innovation',
    rel: 'The natural companion: the Ambition Matrix shows how bold each bet is; 10 Types shows on which dimensions you could innovate. Used together for portfolio strategy.',
  },
  {
    slug: 'value-proposition-canvas',
    name: 'Value Proposition Canvas',
    rel: 'Evaluates whether an individual bet actually fits a customer need, complementing the matrix\'s portfolio-level view.',
  },
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'Validates whether a specific concept in the portfolio holds up, where the matrix only judges balance.',
  },
  {
    slug: 'assumption-mapping',
    name: 'Assumption Mapping',
    rel: 'Surfaces the riskiest assumptions behind the bolder (adjacent and transformational) bets the matrix highlights.',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function AmbitionMatrixPage() {
  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          S1 - Header / Identity + Establishing visual   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <Container className="relative z-10 w-full flex flex-col justify-center flex-1">
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize: 'var(--text-2xs)',
                color: PLUM,
                background: 'rgba(107,74,119,0.10)',
                border: '1px solid rgba(107,74,119,0.22)',
              }}
            >
              Strategy &amp; Prioritization
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Ambition Matrix
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A portfolio tool that maps innovation bets across how new the offering is and how new the market is, so you can deliberately balance safe and bold.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Most organizations starve their boldest bets without realizing it. This is the tool that makes the imbalance visible.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <AMEstablishing />
        </div>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>See your whole portfolio of bets on one picture.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                The Ambition Matrix plots innovation initiatives on two axes: how new the product or offering is, and how new the market or customer is. Those two axes produce three broad zones. Core innovations improve existing offerings for existing customers. Adjacent innovations extend into new-but-related offerings or markets. Transformational innovations create entirely new offerings for markets that do not yet exist.
              </Body>
              <Body>
                Its value is strategic and almost diagnostic: it lets an organization see its whole portfolio of innovation bets at once, on a single picture, and judge whether the balance across the three zones is deliberate or accidental. Almost always, the picture reveals the same thing: a portfolio crowded into the safe, measurable core, with the adjacent and transformational zones quietly starved. The matrix makes that imbalance impossible to ignore.
              </Body>
              <Body>
                It is not a project method. You do not &ldquo;run an Ambition Matrix&rdquo; the way you run an interview or a sprint. It is a lens applied across a set of initiatives, used to allocate resources and to argue, with a picture rather than an opinion, for protecting the bolder bets that secure the future.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S4 - Interactive signature visual   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>The zones</SectionLabel>
            <SectionHeadingDark>Three kinds of bet. Click a zone.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Every innovation initiative sits somewhere on this grid. The zone it lands in determines its risk profile, expected return horizon, and how much of your portfolio it should represent.
            </p>
            <AMInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A portfolio tool, not a project tool.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Use the Ambition Matrix when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have multiple innovation initiatives and need to allocate resources across them deliberately.',
                    'You suspect (or want to check) that your portfolio is unconsciously over-weighted toward safe, near-term bets.',
                    'Leadership needs to see the whole portfolio of bets on one picture to make a strategic allocation decision.',
                    'You are positioning a single initiative and want to understand where it sits relative to the rest of the portfolio.',
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
                    'You have a single project and no portfolio to balance: it is a portfolio tool, not a project tool.',
                    'You need to evaluate the desirability, feasibility, or viability of a specific concept (use Value Proposition Canvas, Assumption Mapping, or Concept Testing).',
                    'You treat the 70-20-10 ratio as a law rather than a starting reference; the right balance depends heavily on industry, maturity, and ambition.',
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
              className="max-w-prose mx-auto rounded-lg p-5 mt-10"
              style={{ background: 'var(--color-warm-100)', borderLeft: '3px solid var(--color-neutral-300)' }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: the matrix tells you about balance and allocation, not about whether any individual bet is good. A perfectly balanced portfolio of bad bets is still a bad portfolio. Pair it with the methods that judge individual concepts.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S6 - How it works   WARM
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>How it works</SectionLabel>
            <SectionHeadingLight>Five moves, in order.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Define the two axes.',
                  body: 'Horizontal: how new is the market or customer (from existing to brand new). Vertical: how new is the offering or product (from existing to brand new). Agree on concrete criteria up front (what specifically counts as a "new market" versus an "existing" one) so placement is argued from criteria rather than enthusiasm.',
                },
                {
                  n: '02',
                  title: 'Place every initiative.',
                  body: 'Plot each current and proposed innovation bet on the grid by how new its offering and its market are. Each lands somewhere along the core-to-transformational diagonal.',
                },
                {
                  n: '03',
                  title: 'Map resources, not just dots.',
                  body: 'Gather the actual investment behind each initiative (budget, headcount, leadership attention) so the matrix reflects where resources truly go, not just where projects nominally sit. This is what surfaces the starved-transformational-zone problem.',
                },
                {
                  n: '04',
                  title: 'Read the balance and compare to a deliberate target.',
                  body: 'Step back and look at the distribution. Where is the weight? Nagji and Tuff\'s research suggested high-performing companies tend toward roughly a 70-20-10 split across core, adjacent, and transformational, but treat that as a reference point to react to, not a rule.',
                },
                {
                  n: '05',
                  title: 'Rebalance, and mean it.',
                  body: 'The matrix only earns its keep if the picture changes a decision: shifting resources toward starved zones, killing redundant core bets, or deliberately protecting a transformational slice. Labeling the portfolio without then reallocating is the most common way the tool gets wasted.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(107,74,119,0.10)', lineHeight: 1.1, width: 40 }}
                  >
                    {n}
                  </span>
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
      </WarmSection>

      {/* ────────────────────────────────────────────────────────────
          S7 - Best practices   LIGHT
          ──────────────────────────────────────────────────────────── */}
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
                'The entire portfolio of bets is visible on one picture, and the balance across the three zones is a deliberate choice rather than an accident.',
                'The adjacent and transformational zones are genuinely funded, not starved to feed the core.',
                'Resource percentages are mapped, not just project counts, because ten tiny transformational projects can still mean almost no real investment in transformation.',
                'The picture actually changes an allocation decision, not just a label.',
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
                  mistake: 'Over-investing in core because it feels safe.',
                  fix: 'Core returns are near-term and measurable, so they win every resource argument unless the matrix forces the bigger view. Protect the bolder zones explicitly.',
                },
                {
                  mistake: 'Treating 70-20-10 as a law.',
                  fix: 'It is a reference from one study, not a universal truth. A deep-tech startup and a mature consumer-goods company should look completely different.',
                },
                {
                  mistake: 'Counting projects instead of resources.',
                  fix: 'A zone can look populated while receiving almost no money or talent. Weight by actual investment.',
                },
                {
                  mistake: 'Labeling without rebalancing.',
                  fix: 'Producing a beautiful matrix and then changing nothing is the most common failure. The output is a decision, not a diagram.',
                },
                {
                  mistake: 'Mistaking balance for quality.',
                  fix: 'The matrix says nothing about whether each bet is good. Use it alongside the methods that evaluate individual concepts.',
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

      {/* ────────────────────────────────────────────────────────────
          S8 - Logistics   WARM
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Logistics</SectionLabel>
            <SectionHeadingLight>Getting the right people and honest inputs.</SectionHeadingLight>
            <Body>
              Unlike a research method, the Ambition Matrix is run as a strategic exercise, usually with leadership in the room. The practical questions are about getting honest inputs and the right people.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Who needs to be there',
                  body: 'The people who actually control resource allocation, because the output is a reallocation decision they must be willing to make. A matrix built by a team that cannot move money or people is an interesting picture with no consequences. Include the budget owners.',
                },
                {
                  label: 'Getting honest placement',
                  body: 'The hard part is candidly assessing how new each bet really is. Teams tend to overstate the ambition of their pet projects (everything sounds "transformational" in a pitch). Define concrete criteria for each axis up front (what specifically counts as a "new market" versus an "existing" one) so placement is argued from criteria rather than enthusiasm.',
                },
                {
                  label: 'Mapping resources, not just dots',
                  body: 'Gather the actual investment behind each initiative (budget, headcount, leadership attention) so the matrix reflects where resources truly go, not just where projects nominally sit. This is what surfaces the starved-transformational-zone problem.',
                },
                {
                  label: 'Cadence',
                  body: 'The Ambition Matrix is most useful as a recurring portfolio review (for example, quarterly or annually alongside planning), not a one-time workshop, because the portfolio and the balance drift over time.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-0.5 shrink-0 rounded-full" style={{ background: 'rgba(107,74,119,0.28)', marginTop: 4 }} />
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
      </WarmSection>

      {/* ────────────────────────────────────────────────────────────
          S9 - How AI is evolving this method   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI does not place the bets. It sharpens how you assess them.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle each zone to see how AI changes the analysis behind bets of that type, what it accelerates, and where human strategic judgment remains essential.
            </p>
            <AMAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same portfolio, analysed two ways.</SectionHeadingLight>
            <p className="mb-10" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              Below is the same eleven-initiative portfolio worked through traditionally and with AI assistance. The contrast is the teaching.
            </p>
            <AMExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S11 - Used in these frameworks   WARM
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where the Ambition Matrix shows up.</SectionHeadingLight>
            <p className="mb-8" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              The Ambition Matrix is a portfolio and strategy tool, so it maps to fewer frameworks than the universal research methods. It fits where frameworks take a portfolio or backlog view.
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
              Note: the Ambition Matrix does not map to Design Thinking, Design Sprint, Lean Startup, or FDE: those are single-initiative or field frameworks without a portfolio-allocation step. These blanks are intentional.
            </p>
          </div>
        </Container>
      </WarmSection>

      {/* ────────────────────────────────────────────────────────────
          S12 - Related methods   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with the Ambition Matrix.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <Link
                  key={slug}
                  href={`/methods/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)' }}
                >
                  <span className="font-semibold shrink-0" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}>
                    {name}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S13 - Sources   WARM
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Managing Your Innovation Portfolio',
                  author: 'Bansi Nagji and Geoff Tuff',
                  year:   '2012',
                  note:   'Harvard Business Review. The foundational article that defined the innovation ambition matrix and the 70-20-10 reference heuristic.',
                },
                {
                  title:  'Ten Types of Innovation',
                  author: 'Larry Keeley, Helen Walters, Ryan Pikkel, and Brian Quinn',
                  year:   '2013',
                  note:   'Complementary portfolio and innovation-dimension thinking, pairs naturally with the Ambition Matrix for a fuller strategic picture.',
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
      </WarmSection>
    </>
  )
}

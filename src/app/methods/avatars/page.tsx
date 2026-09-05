import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import AvatarsExampleToggle from './AvatarsExampleToggle'
import AvatarsBoundarySection from './AvatarsBoundarySection'
import { DarkSection, LightSection, WarmSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Avatars · Methods',
}

const AvatarsEstablishing  = dynamic(() => import('./AvatarsEstablishing'),  { ssr: false })
const AvatarsInteractive   = dynamic(() => import('./AvatarsInteractive'),   { ssr: false })
const AvatarsAIReactivated = dynamic(() => import('./AvatarsAIReactivated'), { ssr: false })

const PLUM = '#6B4A77'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  { slug: 'lean-startup',     name: 'Lean Startup',     phase: 'Hypothesis', note: 'The Avatar defines who you are running the first experiment for: the beachhead customer whose validation is the only validation that matters early.' },
  { slug: 'double-diamond',   name: 'Double Diamond',   phase: 'Define',     note: 'The Avatar is a key Define output: narrowing from a broad problem space to the specific user group you are committing to solve it for.' },
  { slug: 'agile-innovation', name: 'Agile Innovation', phase: 'Backlog',    note: 'Avatar framing shapes the backlog: features that serve the Avatar go to the top, regardless of how appealing they might be for other user types.' },
]

const RELATED_METHODS = [
  { slug: 'personas-archetypes',     name: 'Personas & Archetypes',     rel: 'The behavioral-range counterpart. An Avatar picks the market; personas describe the types of people within it. The boundary section explores this precisely.' },
  { slug: 'ambition-matrix',         name: 'Ambition Matrix',           rel: 'Frames the strategic risk level of the opportunity you are pursuing. Avatar discipline and ambition framing together sharpen the whole strategy.' },
  { slug: 'value-proposition-canvas', name: 'Value Proposition Canvas', rel: 'The Avatar defines who you are designing the value proposition for. VPC fills in what that specific group needs from you.' },
  { slug: 'jobs-to-be-done',         name: 'Jobs To Be Done',           rel: 'Once the Avatar is chosen, JTBD asks what specific job that group is hiring you to do. Avatar and JTBD together are a complete market-and-need picture.' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AvatarsPage() {
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
                fontSize:   'var(--text-2xs)',
                color:       '#EBA3FF',  /* PLUM, brightened for text contrast */
                background: 'rgba(107,74,119,0.10)',
                border:     '1px solid rgba(107,74,119,0.22)',
              }}
            >
              Strategy
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Avatars
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              The single specialized target you commit to first: the narrow beachhead you choose to dominate before you try to serve anyone else.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}
            >
              It is easier to own 100 percent of a tiny market than 1 percent of a huge one. The Avatar is the discipline of choosing the tiny market on purpose.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <AvatarsEstablishing />
        </div>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>One market. Not one person. A beachhead, not a portrait.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                An Avatar is a specific, named target market: the narrowest viable group you are willing to organize your entire go-to-market strategy around in the early phase. Not a demographic slice, not a user persona, and emphatically not a fictional character with a stock photo. The Avatar answers a strategic question: which specific type of customer will we dominate first, before we try to serve anyone else?
              </Body>
              <Body>
                The concept borrows its logic from military beachhead strategy: secure a small, defensible position with overwhelming force before expanding. Applied to market strategy, it means picking a group small enough that you can realistically own it (earn the reputation, generate the referrals, understand the needs at a depth that no generalist competitor can match) and using that position to take the next ring outward.
              </Body>
              <Body>
                The Avatar is not a permanent constraint. Geoffrey Moore&rsquo;s technology adoption lifecycle, Thiel&rsquo;s last mover advantage, and Clay Christensen&rsquo;s disruptive innovation all reach the same conclusion by different routes: win a small market completely first, then expand from strength. Amazon was the bookstore. Google was for researchers. Facebook was for Harvard students. The Avatar is the discipline of picking your bookstore moment on purpose, rather than defaulting to &ldquo;everyone who might conceivably need this.&rdquo;
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S4 - Interactive bullseye   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>The market funnel</SectionLabel>
            <SectionHeadingDark>Four levels. The Avatar is the innermost ring. Click each to see why.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Each ring represents a different level of market commitment. Moving inward means increasing focus and decreasing addressable market, and dramatically increasing the probability of actually winning.
            </p>
            <AvatarsInteractive />
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
            <SectionHeadingLight>A strategy tool for early-stage focus, not a permanent constraint.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Use Avatars when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You are pre-product-market fit and need to concentrate limited resources rather than spread thin across multiple potential customer types.',
                    'Your current message is trying to speak to too many people and landing with none of them: no word-of-mouth, poor referrals, high CAC.',
                    'You need to identify which specific group\'s problem to solve first before building features for everyone.',
                    'The team has a genuine choice between multiple plausible customer groups and needs a principled way to pick one to go deep on.',
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
                    'You already have strong product-market fit and a clear customer base. The Avatar discipline solves an early-stage focus problem, not a scaling one.',
                    'You need to understand the range of behavioral types within your customer base: that is Personas & Archetypes, not an Avatar.',
                    'You are doing market sizing or segmentation analysis. Those are quantitative tools for a different question.',
                    'The commitment will be used as permanent permission to ignore everyone else. The Avatar is a first-mover discipline, not a forever constraint.',
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
              className="max-w-prose rounded-lg p-5 mt-10"
              style={{ background: 'var(--color-warm-100)', borderLeft: '3px solid var(--color-neutral-300)' }}
            >
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: the Avatar discipline requires a real commitment, and most leadership teams resist it. &ldquo;Why would we exclude potential customers?&rdquo; is a reasonable objection, until you do the math on how much it costs to market to five different groups simultaneously versus dominating one and expanding from strength.
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
                  title: 'List the candidate groups.',
                  body: 'Generate a list of every plausible customer type who might buy what you are building. Resist collapsing them into categories; be specific. "Small business owners" is not specific. "Independent yoga studio owners in urban markets with 15–50 clients" is closer. You are looking for named, observable groups, not demographic blends.',
                },
                {
                  n: '02',
                  title: 'Score each group on Avatar criteria.',
                  body: 'For each candidate, answer: Do they have the problem we solve urgently and frequently? Can we reach them through a concentrated, low-cost channel? Will they talk to each other (i.e., does a natural community exist)? Is the group large enough to be a real business but small enough to be ownable? Score honestly. Avoid the temptation to pick the largest group rather than the most winnable one.',
                },
                {
                  n: '03',
                  title: 'Choose one, explicitly.',
                  body: 'Pick one group. Write the decision down. Name the Avatar by describing the person precisely enough that a new hire can identify them in the wild (their role, their context, their most urgent pain, and the specific moment they would reach for your product). The act of writing it forces clarity that "we\'re targeting SMBs" never achieves.',
                },
                {
                  n: '04',
                  title: 'Organize everything around the Avatar.',
                  body: 'Every marketing message, every sales conversation, every product decision, and every new hire description runs through the Avatar test: is this serving the beachhead we committed to? Features that serve other customer types go to the bottom of the backlog. This is uncomfortable. It is also the mechanism that makes the strategy work.',
                },
                {
                  n: '05',
                  title: 'Expand when the beachhead is saturated, not before.',
                  body: 'The signal to expand is not restlessness, investor pressure, or the presence of adjacent opportunities. The signal is that the beachhead is effectively owned: strong organic referrals, high market share within the target group, a reputation that precedes you in the community. Move to the next ring outward when the inner ring is filled, not when the inner ring is inconvenient.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(107,74,119,0.12)', lineHeight: 1.1, width: 40 }}
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
            <SectionHeadingLight>What good Avatar discipline looks like, and what breaks it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The Avatar is specific enough that someone in the market would read the description and immediately say "that\'s me."',
                'The decision is explicit and written down, not implicit and assumed. Everyone on the team can name the Avatar from memory.',
                'Product, marketing, and sales are all organized around the same Avatar: there is no disagreement about who the primary customer is.',
                'The team can explain *why* this group was chosen over alternatives: the criteria and the trade-offs are understood, not just the conclusion.',
                'Expansion happens from a position of beachhead strength, with a clear playbook for taking the next ring.',
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
                  mistake: 'Picking the biggest group instead of the most winnable one.',
                  fix: 'TAM obsession leads to Avatar failure. A 50M-person market where you can\'t generate referrals is harder to win than a 5,000-person niche where you become the obvious choice. Score for winnability, not size.',
                },
                {
                  mistake: 'The implicit Avatar.',
                  fix: 'When the Avatar is never stated explicitly, every team member unconsciously defaults to a different one. Product builds for the power user; marketing writes for the enterprise; sales closes whoever will convert. The strategy fragments.',
                },
                {
                  mistake: 'Confusing the Avatar with a persona.',
                  fix: 'The Avatar is a market. A persona is a behavioral type. You can have three personas within your Avatar market: the owner, the front-desk manager, the instructor. These are different tools answering different questions. See the boundary section.',
                },
                {
                  mistake: 'Expanding before the beachhead is saturated.',
                  fix: 'Pressure from investors, restlessness, or the appeal of a large adjacent market all drive premature expansion. The company leaves the beachhead before it is owned, loses its concentrated advantage, and enters the adjacent market with no dominance to build from.',
                },
                {
                  mistake: 'Using the Avatar as an excuse to ignore everyone else.',
                  fix: 'The Avatar is a sequencing discipline, not a permanent wall. Customers outside the Avatar who show up should be served. The Avatar filters proactive pursuit. It does not refuse revenue.',
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
            <SectionHeadingLight>Running the Avatar selection session.</SectionHeadingLight>
            <Body>
              Avatar selection is a leadership team exercise (product, marketing, and sales at minimum). Half a day is the right scope: enough time to surface all candidate groups, score them rigorously, and reach an explicit commitment the whole team will actually follow.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Who needs to be in the room',
                  body: 'Product leadership, head of marketing, head of sales, and the CEO or founder. If these functions are not aligned on the Avatar, the output will not be followed. Alignment in the room is the product of the session, not a prerequisite for it.',
                },
                {
                  label: 'Candidate generation (first hour)',
                  body: 'Each participant silently lists every plausible customer type on sticky notes: one group per note. Share and cluster. You are looking for genuinely distinct types, not variations on the same group. Expect 8–15 candidates from a motivated team.',
                },
                {
                  label: 'Scoring each candidate (second hour)',
                  body: 'Score each candidate on five criteria: urgency of the problem, reachability through a concentrated channel, community self-reference (will they talk to each other?), market size (large enough for a business, small enough to own), and the team\'s ability to build a distinctive advantage here. Be honest about the last one: domain knowledge and relationships are a real edge.',
                },
                {
                  label: 'Making the decision (third hour)',
                  body: 'Narrow to the top two or three candidates and debate the trade-offs explicitly. Then pick one. The test of a good Avatar decision is that the conversation about why this group over the others is productive and specific, not that the room is enthusiastic. Enthusiasm about a broad group is a warning sign, not a positive signal.',
                },
                {
                  label: 'Writing the Avatar',
                  body: 'Draft the Avatar description collaboratively at the end of the session: one paragraph, specific enough that a new hire could recognize an Avatar in the wild after reading it. Include their role, their context, their most urgent pain, the channel where you find them, and the specific trigger that makes them reach for your product.',
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
          S9 - AI and this method   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI is confident about the outer rings. It cannot choose the inner one.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what the bullseye looks like when AI drives the analysis versus when human judgment makes the commitment.
            </p>
            <AvatarsAIReactivated />
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
            <SectionHeadingLight>The same team. Two approaches to finding the Avatar.</SectionHeadingLight>
            <p className="mb-10" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              A scheduling software startup uses the same product and the same market opportunity: once with traditional Avatar discipline, once with AI-led market analysis. The difference in outcome reveals exactly what the Avatar discipline is doing that AI analysis is not.
            </p>
            <AvatarsExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S11 - Avatars vs Personas vs Segments   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Boundaries</SectionLabel>
            <SectionHeadingDark>Three things that get confused, and are not the same.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Avatar, Personas & Archetypes, and Segments are regularly muddled in strategy conversations. They answer genuinely different questions and are used at genuinely different moments.
            </p>
            <AvatarsBoundarySection />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S12 - Frameworks   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where the Avatar shows up.</SectionHeadingLight>
            <p className="mb-8" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              The Avatar appears wherever a framework requires an explicit commitment to a primary customer, typically early in the process, before resources are committed to building.
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
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S13 - Related methods   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with the Avatar.</SectionHeadingLight>

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
          S14 - Sources & further reading   WARM
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Crossing the Chasm',
                  author: 'Geoffrey A. Moore',
                  year:   '1991',
                  note:   'The foundational text on beachhead strategy in technology markets. Moore\'s niche market entry model, the bowling pin strategy, and the "tornado" expansion sequence are the intellectual backbone of the Avatar discipline as a go-to-market tool.',
                },
                {
                  title:  'Zero to One',
                  author: 'Peter Thiel with Blake Masters',
                  year:   '2014',
                  note:   'Thiel\'s argument for dominating small markets as a prerequisite for building monopoly power. The Avatar as a first-mover discipline is developed here in its most direct form: start small, win completely, then expand.',
                },
                {
                  title:  'The Startup Owner\'s Manual',
                  author: 'Steve Blank and Bob Dorf',
                  year:   '2012',
                  note:   'Customer development methodology applied to market selection. The process of identifying, scoring, and committing to a beachhead customer type is treated systematically alongside the broader customer discovery and validation process.',
                },
                {
                  title:  'Traction: How Any Startup Can Achieve Explosive Customer Growth',
                  author: 'Gabriel Weinberg and Justin Mares',
                  year:   '2015',
                  note:   'Provides the channel-side complement to Avatar selection: once you know who your Avatar is, which channel reaches them at lowest cost? The bullseye framework in Traction is directly analogous to the Avatar framework in market selection.',
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

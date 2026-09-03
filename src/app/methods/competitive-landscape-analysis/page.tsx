import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import CLAExampleToggle from './CLAExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Competitive Landscape Analysis — Methods — Innovation 101',
}

const CLAEstablishing  = dynamic(() => import('./CLAEstablishing'),  { ssr: false })
const CLAInteractive   = dynamic(() => import('./CLAInteractive'),   { ssr: false })
const CLAAIReactivated = dynamic(() => import('./CLAAIReactivated'), { ssr: false })

const SAGE = '#3D6B5A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Discover / Define',
    note: 'The Discover phase needs a clear picture of the competitive field before the team can define where to play. Competitive landscape analysis maps who is already there and how they are positioned, so the Define phase can make a deliberate choice, not inherit the conventional position by default. A team that defines the problem without mapping the field will often define it inside the crowded center without noticing.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'Before committing to a build, the team needs to understand what the product must differ from: which competitors it will be compared to, on what dimensions, and where the genuine point of differentiation is. Competitive analysis maps that context before the build begins, so the value proposition is designed against a clear picture of the existing alternatives rather than a vague sense of the market.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Monday',
    note: 'Monday in a sprint maps the competitive context alongside the experts\' knowledge and the target. A competitive landscape analysis run before or at the start of Monday ensures the sprint is working on a positioning challenge that the team actually understands: who is already in the space, where the white space might be, and what the target differentiator could be. A sprint without competitive context will often prototype solutions to the wrong positioning problem.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'The Discovery Sprint establishes the product context, the user problem, and the early positioning hypothesis. Competitive landscape analysis in the Discovery Sprint ensures the team understands what the product enters: who is already in the market, how they are positioned, and where the white space is. Without this, the Discovery Sprint produces a hypothesis in a competitive vacuum.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'ecosystem-mapping',
    name: 'Ecosystem Mapping',
    rel: 'A different altitude, and worth distinguishing: Competitive Landscape Analysis maps the competitive field: who is playing, how they are positioned, where the white space is. Ecosystem Mapping maps the whole system of actors and value flows around a market: competitors, customers, suppliers, regulators, and the relationships between them. Competitors are just one actor type in an ecosystem. Use competitive analysis to find a position; use ecosystem mapping to understand the system the business lives in.',
  },
  {
    slug: 'orthodoxies',
    name: 'Orthodoxies',
    rel: 'A useful pairing: when every competitor in a category is bunched in the same crowded zone, doing the same thing on the same axes, that sameness is often a shared industry orthodoxy made visible. Competitive analysis reveals the pattern (every player does this) and Orthodoxies names and challenges the belief behind it. The axis no competitor is competing on is usually an orthodoxy nobody has questioned.',
  },
  {
    slug: 'ten-types-innovation',
    name: '10 Types of Innovation',
    rel: 'Complementary diagnostics: competitive analysis shows WHERE competitors sit in the positioning space; the 10 Types of Innovation helps diagnose WHY a competitor\'s advantage is durable: which combination of profit model, network, structure, process, product performance, product system, service, channel, brand, and customer engagement innovations underpin the position. Understanding the innovation stack is what tells you whether a gap is defensible and where to attack.',
  },
  {
    slug: 'jobs-to-be-done',
    name: 'Jobs To Be Done',
    rel: 'Jobs To Be Done reveals the true competition: the other things customers hire to do the same job, which often includes indirect substitutes that never appear on a conventional competitive map. A customer who hires an expensive restaurant for a date night is not comparing it only to other expensive restaurants. She might be comparing it to a cooking class, a concert, or staying home. Including indirect competitors in the landscape is what Jobs To Be Done makes visible.',
  },
  {
    slug: 'value-proposition-canvas',
    name: 'Value Proposition Canvas',
    rel: 'Once a white space has been chosen, the Value Proposition Canvas designs the fit for the customers in that space, matching the pains and gains of the target segment to the specific features and benefits of the product or service. Competitive analysis identifies the un-served position; the Value Proposition Canvas designs the offering that occupies it.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CLAPage() {
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
                color:       SAGE,
                background: 'rgba(61,107,90,0.12)',
                border:     '1px solid rgba(61,107,90,0.28)',
              }}
            >
              Discovery &amp; Research
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Competitive Landscape Analysis
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Mapping who is playing in a market and how they are positioned, so you can find the space
              nobody occupies rather than crowd into where everyone already is.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The point is not to match your competitors. It is to see, clearly, the position none of them has taken, and ask whether that empty space is where you should be.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <CLAEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>What it is</SectionLabel>
            <SectionHeadingLight>Not a benchmark exercise. A search for the position nobody has taken.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Competitive Landscape Analysis is the structured study of who else is playing in a market
                and how they are positioned, so a team can understand the field it is entering or competing
                in and, most importantly, find where the opportunity lies. It catalogs the competitors
                (direct and indirect) maps how each is positioned, and reveals the shape of the field:
                where players cluster, where they differentiate, and, decisively, where no one is.
              </Body>
              <Body>
                Its most common use is also its weakest: benchmarking. Listing competitors&rsquo; features and
                matching or beating them. Done only this way, competitive analysis is a recipe for sameness.
                It pulls a company toward the crowded center where everyone already competes, chasing
                feature parity and eroding margins. The far more valuable use is the opposite: to find the
                WHITE SPACE, the position on the map that no competitor occupies, and ask whether that
                un-served space is where the real opportunity is. The goal is not to be a slightly better
                version of what exists; it is to see clearly the space that does not yet exist.
              </Body>
              <Body>
                The single most important move in the method is reframing the axes. A market&rsquo;s competitors all
                tend to compete on the same one or two dimensions, the ones the industry takes for granted.
                Mapping the field on those conventional axes shows the crowded cluster, which is useful but
                limited. The breakthrough often comes from mapping the field on a <em>different</em> axis,
                a dimension the industry is not paying attention to, on which the crowded cluster suddenly
                reveals a wide-open gap. Finding the right axes is where competitive analysis stops being
                benchmarking and becomes strategy.
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
            <SectionLabel accent={SAGE}>Plot the players. Reframe the axes.</SectionLabel>
            <SectionHeadingDark>A market that looks saturated on one axis can reveal a wide gap on a different one.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click a competitor to see its positioning. Click the white space to surface the
              &ldquo;opportunity or void?&rdquo; question. Then reframe the axes and watch the white space shift.
            </p>
            <CLAInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={SAGE}>When to deploy it</SectionLabel>
            <SectionHeadingLight>For finding a position, not for chasing parity. For entering a field, not for refining what is already built.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: SAGE }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You are entering a market or category and need to understand who is already there and how they are positioned.',
                    'You want to find an un-served position (white space) rather than compete head-on in the crowded center.',
                    'You need to understand why an incumbent is hard to beat, or where an incumbent is vulnerable.',
                    'You suspect the whole industry is competing on the same two dimensions and want to find a third one.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: SAGE, flexShrink: 0, marginTop: 2 }}>→</span>
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
                    'You would use it only to benchmark and match competitors\' features. That pulls you into the crowded center and produces sameness, the opposite of the method\'s value.',
                    'You have no real understanding of customer needs. A white space that no competitor occupies may be empty because customers do not want it. Only customer research can tell you which empty spaces are opportunities.',
                    'You need to understand the whole system of actors and value flows around a market, not just competitors. For that, use Ecosystem Mapping, a different altitude.',
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
                The honest limit: a competitive map shows where players are, not whether an empty space is
                worth occupying. White space is necessary but not sufficient. Some gaps are unmet
                opportunities, others are graveyards where no viable business can survive. The method finds
                the gaps; customer research and concept testing determine which are real. Its most common
                failure is being used for benchmarking rather than for finding and validating white space.
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
            <SectionLabel accent={SAGE}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from identifying the players to making a positioning decision.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Identify the competitors: direct and indirect.',
                  body: 'List not just the obvious direct rivals but the indirect ones, the different solutions customers use for the same need. The true competition, as Jobs To Be Done also reveals, is often not another product in your category: a customer choosing between a home-cooked meal and a restaurant is competing with delivery apps, meal kits, and supermarkets, not just other restaurants. Missing indirect competitors is how a competitive map misleads.',
                },
                {
                  n: '02',
                  title: 'Choose meaningful axes and map the conventional view.',
                  body: 'Select the two dimensions on which to map the field. Start with the conventional ones the industry competes on (the axes everyone uses) to see the crowded center and understand how the market frames itself. Plot each competitor on that first map. See where they cluster; that dense zone is the conventional battleground, the place where matching them means fighting for parity.',
                },
                {
                  n: '03',
                  title: 'Hunt the white space and reframe the axes to find more.',
                  body: 'Look for the empty regions on the conventional map. Then, the decisive move, remap the field on different axes: dimensions the industry is not competing on. Watch new white space appear. The gap that opens on a fresh axis is often the real opportunity, because no competitor has staked a claim there and no competitor is even measuring it.',
                },
                {
                  n: '04',
                  title: 'Interrogate each white space honestly.',
                  body: 'For every gap, ask the hard question: is this empty because it is an un-served opportunity, or because no viable business can live there? Both exist. An empty space on a competitive map is a candidate, not a verdict. Use customer understanding (interviews, observation, concept testing) to tell them apart. Do not assume empty means valuable.',
                },
                {
                  n: '05',
                  title: 'Include perceived positioning, not just stated positioning.',
                  body: 'Competitors describe themselves one way; customers often perceive them differently. The perceived positioning (how customers actually see the alternatives) is usually more useful than the stated positioning (how competitors describe themselves). Where possible, gather customer perspective on the competitive field, not just the competitors\' own claims about themselves.',
                },
                {
                  n: '06',
                  title: 'Decide where to play.',
                  body: 'Use the map to make a positioning choice: occupy a validated white space, or, if you must enter the crowded zone, know exactly how you will differentiate within it. The output of competitive analysis is a positioning decision, not just a chart. A competitive map that ends without a "where to play" choice has produced research without strategy.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(61,107,90,0.12)', lineHeight: 1.1, width: 40 }}
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
            <SectionLabel accent={SAGE}>Best practices</SectionLabel>
            <SectionHeadingLight>What separates a map that finds strategy from one that documents the obvious.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The analysis includes indirect competitors (the other solutions customers actually use for the same need) not just the obvious direct rivals.',
                'The team maps the field on more than the conventional axes, deliberately reframing to reveal white space the industry is not measuring.',
                'White space is interrogated, not assumed valuable. Every gap is tested against real customer need before being treated as an opportunity.',
                'The output is a positioning decision (where to play and how to differ) not just a chart.',
                'The analysis uses perceived positioning (how customers see competitors) as well as stated positioning (how competitors describe themselves).',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: SAGE, flexShrink: 0, marginTop: 3 }}>✓</span>
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
                  mistake: 'Benchmarking toward sameness.',
                  fix: 'Listing competitors\' features to match or beat pulls you into the crowded center and erodes differentiation. The method\'s value is in finding white space, not parity. Use the map to see where no one is, not to improve on what everyone is already doing.',
                },
                {
                  mistake: 'Mapping only on conventional axes.',
                  fix: 'Plotting the field on the dimensions everyone already competes on shows the crowded cluster and hides the opportunity. Reframe deliberately. Try axes the industry is not using. A map drawn only on the industry\'s own dimensions cannot reveal what the industry cannot see.',
                },
                {
                  mistake: 'Ignoring indirect competitors.',
                  fix: 'Missing the non-obvious alternatives customers actually consider produces a map that flatters you and misleads. Draw the boundary around the need, not the category label, and include everything a customer might use instead of you.',
                },
                {
                  mistake: 'Assuming empty means opportunity.',
                  fix: 'A white space can be a graveyard. Interrogate every gap against real customer need before committing resources to occupying it. The map identifies candidates; interviews and concept testing determine which are real.',
                },
                {
                  mistake: 'Treating the map as the answer.',
                  fix: 'A positioning chart is an input to a decision, not the decision itself. Finish by choosing where to play and how to differentiate. A map that produces no "where to play" choice is research, not strategy.',
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
            <SectionLabel accent={SAGE}>Logistics</SectionLabel>
            <SectionHeadingLight>Gathering the right information and creating conditions for the reframe that finds white space.</SectionHeadingLight>
            <Body>
              Competitive landscape analysis can be a one-time session or a continuous practice. A
              one-time sprint produces a snapshot; the most strategic teams maintain a living competitive
              map that is updated as the field shifts, so that positioning decisions are always made against
              current information.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Gather from many sources, including customers',
                  body: 'A good competitive map draws on public information (competitor sites, pricing, positioning statements, reviews, analyst reports) and, ideally, real customer perspective on how the alternatives are actually perceived. Stated positioning and perceived positioning diverge more than companies expect. Customers who can describe "what brand X feels like" are describing perceived positioning, and that view is usually more useful than the brand\'s own claims.',
                },
                {
                  label: 'Define the market boundary deliberately, and include indirect competitors',
                  body: 'Decide what counts as a competitor before you start mapping. Drawing the boundary too narrowly (only direct rivals in your category) is the most common way a competitive analysis misses real threats and real white space. Draw the boundary around the customer need, not the product category, and include every viable substitute a customer might use instead.',
                },
                {
                  label: 'Try several sets of axes',
                  body: 'Because the choice of axes determines what the map reveals, deliberately map the field several ways. Start with the conventional dimensions (the ones every analyst uses) to understand the crowded center. Then try unconventional ones. A rule of thumb: if you heard the axis in the industry\'s own trade publications, it is conventional; if you had to invent it, it might reveal something.',
                },
                {
                  label: 'Pair it with customer research',
                  body: 'A competitive map alone cannot tell you whether a white space is an opportunity or a void. Plan to validate promising gaps against real customer need (interviews, observation, concept testing) before committing. The research sequence is: map first, to know where to look; then talk to customers, to know whether the gap is real.',
                },
                {
                  label: 'Keep it current',
                  body: 'Competitive landscapes shift as players enter, exit, and reposition. A map is a snapshot; revisit it as the field moves, and especially before major positioning decisions. A competitive map that is eighteen months old is usually worse than having no map at all, because it produces false confidence about a field that may look entirely different now.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(61,107,90,0.28)', marginTop: 4 }}
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
            <SectionLabel accent={SAGE}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI can map every competitor on the usual axes in minutes. The opportunity is usually on an axis the industry is not using.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI accelerates the analysis and where the strategic
              reframe that finds the real white space stays human.
            </p>
            <CLAAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={SAGE}>In-depth example</SectionLabel>
            <SectionHeadingLight>Entering the wine market: the reframe that revealed a category-sized gap.</SectionHeadingLight>
            <p
              className="max-w-prose mx-auto px-6 md:px-8 mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A company mapping the wine market on its conventional axis sees a saturated, crowded field.
              The same company reframing the axes finds an enormous gap no competitor is occupying.
              Toggle between the human-led analysis and a hypothetical AI-first approach to see what each finds.
            </p>
            <CLAExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Used in these frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Competitive Landscape Analysis shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A discovery and positioning method, it maps to the early understanding phases and the
              moments each framework makes a &ldquo;where to play&rdquo; decision. It is intentionally blank
              at delivery and optimization phases.
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
                    style={{ fontSize: 'var(--text-2xs)', color: SAGE, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {phase}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-6"
              style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', fontStyle: 'italic' }}>
              Note: Competitive Landscape Analysis is a market discovery and positioning method. It maps to
              early understanding and &ldquo;where to play&rdquo; decisions and is intentionally blank at
              delivery and optimization phases.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S12 - Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Related methods</SectionLabel>
            <SectionHeadingLight>What to pair with Competitive Landscape Analysis.</SectionHeadingLight>

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
            <SectionLabel accent={SAGE}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Blue Ocean Strategy',
                  author: 'W. Chan Kim and Renée Mauborgne',
                  year:   '2005',
                  note:   'The definitive treatment of finding uncontested market space rather than competing in crowded markets. Kim and Mauborgne\'s strategy-canvas mapping technique (plotting competitors on the dimensions an industry competes on, then deliberately choosing which to eliminate, reduce, raise, or create) is the most rigorous version of the axis-reframe move this method relies on. Their cases show that the breakthrough came not from a better product on the conventional axes but from drawing a new strategy canvas on dimensions competitors were not measuring.',
                },
                {
                  title:  'Competitive Strategy',
                  author: 'Michael E. Porter',
                  year:   '1980',
                  note:   'The foundational text on analyzing industry structure and competitive positioning. Porter\'s five-forces framework provides the structural underpinning for understanding why competitive positions are defensible, and his generic strategy framework (cost leadership, differentiation, focus) is the original vocabulary for the "where to play" choice. Understanding Porter\'s framework makes the competitive landscape map more analytically precise: it moves the analysis from "who is where" to "why is it hard to move."',
                },
                {
                  title:  'Playing to Win',
                  author: 'A.G. Lafley and Roger Martin',
                  year:   '2013',
                  note:   'On making the "where to play and how to win" choices that competitive analysis informs. Lafley and Martin\'s framework (the strategy cascade from winning aspiration through where to play, how to win, capabilities, and management systems) gives competitive landscape analysis its natural downstream home. The competitive map produces the "where to play" candidates; their framework structures the choice and connects it to the capabilities required to win in the chosen position.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(61,107,90,0.30)' }} />
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

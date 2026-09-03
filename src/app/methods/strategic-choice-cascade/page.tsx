import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SCCExampleToggle from './SCCExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Strategic Choice Cascade — Methods — Innovation 101',
}

const SCCEstablishing  = dynamic(() => import('./SCCEstablishing'),  { ssr: false })
const SCCInteractive   = dynamic(() => import('./SCCInteractive'),   { ssr: false })
const SCCAIReactivated = dynamic(() => import('./SCCAIReactivated'), { ssr: false })

const PLUM = '#6B4A77'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Define',
    note: 'The Define phase converges the research findings from Discover into a clear problem framing. At this moment, the cascade is the tool for translating that problem understanding into strategic choices: defining the where-to-play and how-to-win that will bound the Develop and Deliver phases. A strategic choice cascade run during Define prevents the second diamond from exploring in directions the organisation cannot or should not pursue.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Strategy framing',
    note: 'The Lean Startup\'s Build-Measure-Learn loop tests assumptions within a strategic bet. The cascade provides the framing for that bet: the where-to-play and how-to-win that the business model expresses and that each iteration of the loop is designed to test. Without an explicit cascade, Lean Startup teams risk iterating rapidly within an arena or on a how-to-win that was never genuinely chosen, treating the speed of iteration as a substitute for the quality of the strategic bet.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Roadmap / Backlog framing',
    note: 'In Agile Innovation, the cascade sets the strategic choices that prioritise what the portfolio pursues (which arenas, which ways of winning) so that sprint-level work stays connected to a coherent strategic direction rather than accumulating in every direction at once. Without a cascade, agile teams can work efficiently on things that do not collectively add up to a strategy.',
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
    rel: 'A companion strategy lens: the Ambition Matrix maps the portfolio by level of ambition (core, adjacent, transformational) across the bets being made. The cascade defines the actual where-to-play and how-to-win behind each of those bets. Together they answer both "what kind of bet is this?" (Ambition Matrix) and "what specifically are we betting on and how?" (cascade). Use the Ambition Matrix to balance the portfolio; use the cascade to sharpen each bet within it.',
  },
  {
    slug: 'ten-types-innovation',
    name: '10 Types of Innovation',
    rel: 'Feeds the how-to-win choice: the ten types (profit model, network, structure, process, product performance, product system, service, channel, brand, customer engagement) are dimensions on which a how-to-win can be built. Most strategies compete only on product performance; the 10 Types framework reveals the other nine dimensions on which a defensible, hard-to-copy way of winning can be constructed. Use it to enrich and stress-test the how-to-win choice in the cascade.',
  },
  {
    slug: 'balanced-breakthrough',
    name: 'Balanced Breakthrough',
    rel: 'Complementary evaluation: the cascade sets the strategic choices; Balanced Breakthrough checks that the specific concepts emerging from those choices are desirable (people want them), feasible (the organisation can deliver them), and viable (the economics work). The cascade answers "where do we play and how do we win?"; Balanced Breakthrough answers "does this specific concept actually pass all three lenses?"; the two tools operate at different levels of abstraction and are natural complements.',
  },
  {
    slug: 'competitive-landscape-analysis',
    name: 'Competitive Landscape Analysis',
    rel: 'Informs both where-to-play and how-to-win: understanding the competitive field (who is competing, on what dimensions, in which arenas, with what gaps and white spaces) is direct input to the cascade\'s two most important choices. A where-to-play chosen without a competitive landscape analysis is chosen in a vacuum; a how-to-win that does not account for what competitors do and cannot replicate is a how-to-win that will not be defensible.',
  },
  {
    slug: null,
    name: 'Capability Building',
    rel: 'The natural downstream (in Delivery & Validation): the cascade names the capabilities required to win as its fourth choice. Capability Building is how the organisation actually develops those capabilities: the specific programmes, investments, and organisational changes needed to close the gap between the capabilities the cascade requires and the capabilities the organisation currently has. The cascade names the destination; Capability Building is the journey.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SCCPage() {
  return (
    <>
      {/* S1 - Header + Establishing visual DARK */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <Container className="relative z-10 flex flex-col justify-center flex-1">
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
              Strategic Choice Cascade
            </h1>

            <p
              className="mb-3 max-w-[640px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Five linked choices (aspiration, where to play, how to win, capabilities,
              systems) that must fit together as a coherent whole, because a strategy is
              not a vision and not a plan, it is a set of hard choices that reinforce one another.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Strategy is not a vision statement or a plan. It is a small set of hard choices that fit together, and the hardest part is deciding where you will NOT play.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <SCCEstablishing />
        </div>
      </DarkSection>

      {/* S3 - What it is LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>Not a plan, not a vision. A set of five linked choices that must cohere, and the hardest part is what you rule out.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                The Strategic Choice Cascade, from A.G. Lafley and Roger Martin&rsquo;s
                &ldquo;Playing to Win,&rdquo; defines strategy as a set of five integrated, cascading
                choices. First, the WINNING ASPIRATION: what does winning actually look like, what is the
                purpose and the definition of success? Second, WHERE TO PLAY: in which markets, segments,
                geographies, channels, and product categories will we compete, and, just as
                importantly, where will we not? Third, HOW TO WIN: within those chosen arenas, how will
                we create unique value and sustainable advantage? Fourth, CAPABILITIES: what set of
                activities and capabilities must we have in place to win the way we have chosen? Fifth,
                MANAGEMENT SYSTEMS: what systems, structures, and measures are required to build the
                capabilities and sustain the choices? An answer to all five, coherent and reinforcing,
                is a strategy.
              </Body>
              <Body>
                Its central insight is that strategy is a set of CHOICES, not a plan, a vision, or
                an aspiration alone. Many organisations mistake a vision statement, a budget, or a list
                of goals for strategy. The cascade insists that strategy is about deciding:
                choosing where to play and how to win means choosing where NOT to play and how NOT to
                win, and a strategy that tries to play everywhere and win every way is not a
                strategy at all. The discipline is in the hard choices and the things they rule out.
              </Body>
              <Body>
                The second insight is that the choices CASCADE and must reinforce one another. They
                are not five independent boxes to fill; each constrains and informs the next, and they
                must cohere as a whole. Where-to-play and how-to-win, the heart of the strategy,
                must fit together, and both must be supported by real capabilities and the right
                management systems. If the capabilities do not support the how-to-win, or the
                where-to-play contradicts the aspiration, the strategy breaks no matter how good any
                single choice looks. The cascade is a test of coherence as much as a set of questions.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S4 - Interactive DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Make the five choices. Then change one, and watch whether the others still hold.</SectionLabel>
            <SectionHeadingDark>Strategy is five linked choices that must reinforce one another. A contradiction anywhere breaks the whole cascade.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click any choice to reveal what it means and how it connects to the others.
              Where to Play and How to Win are the heart, they must fit each other tightly,
              and everything else in the cascade must fit around them.
            </p>
            <SCCInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* S5 - When to deploy LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>When to deploy it</SectionLabel>
            <SectionHeadingLight>For setting or stress-testing a real strategy. Not for execution planning, and not when you would fill the boxes without actually choosing.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You need to set or clarify a real strategy, and want to move past vision statements and goal lists to actual choices.',
                    'A team is trying to play everywhere and win every way, and needs to be forced into the hard choices strategy requires.',
                    'You need to check whether an existing strategy is coherent: whether the where-to-play, how-to-win, capabilities, and systems actually fit together.',
                    'You are aligning a leadership team around a shared, explicit set of strategic choices.',
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
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Do not lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You need day-to-day execution planning; the cascade sets strategic direction, it is not a project plan or an operating roadmap.',
                    'The situation is pure early-stage exploration where the choices cannot yet be made honestly; you need enough understanding of the market and your capabilities to choose.',
                    'You would fill the five boxes without making real choices; a cascade completed with inclusive, everything-for-everyone answers is a vision statement in disguise, not a strategy.',
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
                The honest limit: the cascade is a framework for making and testing strategic choices;
                it does not make the choices for you, and it does not supply the market and capability
                understanding the choices require. Its most common failure is being completed without
                genuine choosing: five boxes filled with comprehensive, non-committal answers that
                avoid the hard trade-offs, which produces the appearance of strategy without its
                substance. The value is entirely in the honesty and coherence of the choices.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S6 - How it works LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from naming the winning aspiration to testing the whole cascade for coherence.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Define the winning aspiration.',
                  body: 'State what winning actually looks like: the purpose and the concrete definition of success, not a vague mission. This frames every choice below it. A winning aspiration is specific enough that any strategic choice below it can be evaluated against it: does this where-to-play serve our aspiration? Does this how-to-win realise it? Without a concrete aspiration, there is no way to evaluate the choices that follow.',
                },
                {
                  n: '02',
                  title: 'Choose where to play, and where not to.',
                  body: 'Decide the specific markets, segments, geographies, channels, and categories you will compete in, and be explicit about where you will NOT. This is the defining act of choice; refusing to choose here is refusing to have a strategy. The exclusions are where the strategic value lives; a where-to-play that includes everywhere is a non-choice. Name what you are giving up. That discomfort is the evidence that real choosing is happening.',
                },
                {
                  n: '03',
                  title: 'Choose how to win.',
                  body: 'Within the chosen arenas, decide how you will create unique, sustainable value and advantage. Where-to-play and how-to-win are the heart of the strategy and must fit each other: a how-to-win that would work in every arena is not a competitive advantage. The source of advantage might be product superiority, cost structure, customer relationships, proprietary assets, or something else, but it must be genuinely distinctive in the chosen where-to-play and hard for competitors to replicate.',
                },
                {
                  n: '04',
                  title: 'Identify the capabilities required.',
                  body: 'Name the set of reinforcing activities and capabilities you must have to win the way you have chosen. If the required capabilities are absent, the how-to-win is a wish, not a strategy. Identifying capability gaps is valuable: it converts vague ambition into a specific investment agenda, and it surfaces cases where the how-to-win must change because the capabilities required to execute it are genuinely out of reach.',
                },
                {
                  n: '05',
                  title: 'Define the management systems.',
                  body: 'Decide the systems, structures, and measures needed to build those capabilities and sustain the choices: what makes the strategy hold in practice rather than on paper. Without management systems, strategies are intentions. The systems close the loop: they provide the measurement and governance that catch drift from the strategic direction before it compounds.',
                },
                {
                  n: '06',
                  title: 'Test the whole cascade for coherence.',
                  body: 'Step back and check that the five choices reinforce one another: does the where-to-play serve the aspiration? Does how-to-win fit where-to-play? Do the capabilities support how-to-win? Do the systems build the capabilities? A strategy is only as strong as its coherence; fix any choice that contradicts the others, and iterate until the cascade locks together. Coherence is not a one-time check; revisit it as conditions change.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(107,74,119,0.12)', lineHeight: 1.1, width: 40 }}
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
            <SectionLabel accent={PLUM}>Best practices</SectionLabel>
            <SectionHeadingLight>What separates a strategy from a vision statement written in the shape of one.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The team makes real choices, including explicit decisions about where NOT to play and how NOT to win.',
                'Where-to-play and how-to-win are treated as the heart and are made to fit each other tightly.',
                'The five choices are tested for coherence as a whole, not filled in as independent boxes.',
                'Capabilities and management systems are honestly assessed against the chosen how-to-win, not assumed.',
                'The output is a coherent, explicit strategy the leadership team shares and can act on.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: PLUM, flexShrink: 0, marginTop: 3 }}>✓</span>
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
                  mistake: 'Filling the boxes without choosing.',
                  fix: 'Completing the cascade with inclusive, everything-for-everyone answers produces a vision statement, not a strategy. Force real choices and real exclusions. If no one is uncomfortable with the where-to-play, it probably includes everywhere.',
                },
                {
                  mistake: 'Refusing to say where you will not play.',
                  fix: 'A where-to-play that includes everywhere is not a choice. Name what you are deliberately giving up. The discomfort of naming the exclusions is not a sign that something is wrong; it is the evidence that real strategic choosing is happening.',
                },
                {
                  mistake: 'Letting the choices contradict each other.',
                  fix: 'A brilliant how-to-win that the capabilities cannot support, or a where-to-play at odds with the aspiration, breaks the strategy. Test the whole cascade for coherence as a chain. A contradiction anywhere in the five-choice sequence means the strategy fails not because a single choice is wrong but because the choices do not fit.',
                },
                {
                  mistake: 'Mistaking aspiration for strategy.',
                  fix: 'A winning aspiration alone (the top box) is a goal, not a strategy; the strategy is the full set of reinforcing choices beneath it. An inspiring aspiration paired with five empty or vague boxes is a mission statement. The aspiration is where the cascade starts; strategy is where it ends.',
                },
                {
                  mistake: 'Treating it as a one-time document.',
                  fix: 'Markets and capabilities shift; a cascade filed away goes stale. Revisit and re-test coherence as conditions change. The cascade is a living set of choices, not a document produced once and handed down.',
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
            <SectionLabel accent={PLUM}>Logistics</SectionLabel>
            <SectionHeadingLight>The cascade works best made together, anchored in real evidence, and treated as a living set of choices.</SectionHeadingLight>
            <Body>
              The cascade is a set of consequential, shared choices. Its logistics follow from that:
              the people who make the choices must be accountable for them, the choices must be
              grounded in real evidence, and the session must be structured to force the hard
              decisions rather than defer them.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Do it with the leadership team, together',
                  body: 'The cascade is a set of consequential, shared choices, so it works best made collectively by the people accountable for the strategy. Choices made by one person and handed down rarely get the buy-in, or the honest debate, that good strategy needs. The conversation is as valuable as the output.',
                },
                {
                  label: 'Anchor the choices in real evidence',
                  body: 'The cascade organises choices; it does not supply the understanding behind them. Bring real inputs (market and competitive analysis for where-to-play, a clear source of advantage for how-to-win, an honest capability audit) so the choices reflect reality rather than ambition alone. A cascade built on assumptions produces a strategy that will fail when it meets the market.',
                },
                {
                  label: 'Spend the most time on where-to-play and how-to-win',
                  body: 'These two are the heart of the strategy and where coherence most often succeeds or fails. Budget disproportionate discussion here, and keep testing that the two fit each other. The session is not well-spent if it gives equal time to all five choices; the aspiration is usually quick and the systems can wait; where-to-play and how-to-win should dominate.',
                },
                {
                  label: 'Make the exclusions explicit',
                  body: 'Because the discipline is choice, deliberately write down where you will NOT play and how you will NOT win. Naming what you are giving up is uncomfortable and is exactly where the strategic value lives. If the team cannot agree on the exclusions, the cascade is not done.',
                },
                {
                  label: 'Test coherence out loud, and iterate',
                  body: 'Walk the cascade as a chain, checking each link reinforces the next, and revise until it locks together. Treat it as a living set of choices to revisit as the market and the organisation change. The cascade is only as good as the coherence of its five choices at any point in time.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(107,74,119,0.28)', marginTop: 4 }}
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
            <SectionLabel accent={PLUM}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI will happily fill in all five boxes. But strategy is deciding what NOT to do, and that is exactly what AI avoids.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI can genuinely help articulate and pressure-test
              the cascade, and why the essential act, choice and exclusion, resists it.
              AI&rsquo;s inclusive default runs directly against the discipline that strategy requires.
            </p>
            <SCCAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* S10 - In-depth example LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>In-depth example</SectionLabel>
            <SectionHeadingLight>The spread-thin company: the strategic choices that turned a competitor in many arenas into a winner in few.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A mid-sized company competing in many segments and winning in none works the cascade
              together. The hard part is the where-to-play: naming which segments to exit. Everything
              else follows from that choice. Toggle to see what a hypothetical AI-run cascade might
              have produced, and why the comprehensive output it generates is the opposite of strategy.
            </p>
            <SCCExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* S11 - Frameworks LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where the Strategic Choice Cascade shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              The cascade maps to the strategy-and-framing moments of the major innovation
              frameworks, when teams need to decide where to play and how to win, not
              just how to execute. It is intentionally absent at hands-on discovery, ideation,
              and delivery phases, where the strategic direction it sets is taken as given.
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
                    style={{ fontSize: 'var(--text-2xs)', color: PLUM, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
            <SectionLabel accent={PLUM}>Related methods</SectionLabel>
            <SectionHeadingLight>What to pair with the Strategic Choice Cascade.</SectionHeadingLight>

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
            <SectionLabel accent={PLUM}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Playing to Win: How Strategy Really Works',
                  author: 'A.G. Lafley and Roger Martin',
                  year:   '2013',
                  note:   'The definitive source for the Strategic Choice Cascade. Lafley and Martin built the framework from Lafley\'s two tenures as CEO of Procter & Gamble and Martin\'s decades of strategy work at Monitor and the Rotman School. Their core argument, that strategy is a set of reinforcing choices, not a plan or a vision, and that the two most important are where-to-play and how-to-win, is the origin of the cascade. The book\'s insistence that strategy is about deciding what NOT to do, and its treatment of the cascade as a coherence test as much as a question set, is the intellectual foundation this method page builds on.',
                },
                {
                  title:  'Good Strategy Bad Strategy',
                  author: 'Richard Rumelt',
                  year:   '2011',
                  note:   'Rumelt\'s account of what distinguishes real strategy (hard choices with a coherent logic) from the "fluff" that impersonates it (vague aspirations, generic goals, a list of actions without an underlying diagnosis). His concept of the "kernel of good strategy" (a diagnosis, a guiding policy, and coherent actions) complements the cascade by providing a different language for the same underlying discipline: strategy requires hard, specific choices about where to direct effort, not comprehensive statements of intention.',
                },
                {
                  title:  'Competitive Strategy',
                  author: 'Michael Porter',
                  year:   '1980',
                  note:   'The foundational text on strategic positioning that underpins the where-to-play and how-to-win choices. Porter\'s five forces, his generic strategies (cost leadership, differentiation, focus), and his concept of strategic fit (that a strategy is a set of mutually reinforcing activities, not a single choice) provide the theoretical grounding for why the cascade\'s choices must cohere and why a how-to-win that is not genuinely distinctive in the chosen arena is not a competitive advantage.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(107,74,119,0.30)' }} />
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

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SWOTExampleToggle from './SWOTExampleToggle'
import { DarkSection, LightSection, WarmSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'SWOT Analysis — Methods — Innovation 101',
}

const SWOTEstablishing  = dynamic(() => import('./SWOTEstablishing'),  { ssr: false })
const SWOTInteractive   = dynamic(() => import('./SWOTInteractive'),   { ssr: false })
const SWOTAIReactivated = dynamic(() => import('./SWOTAIReactivated'), { ssr: false })

const PLUM      = '#6B4A77'
const PLUM_RGBA = 'rgba(107,74,119,'

const FRAMEWORK_LINKS = [
  { slug: 'double-diamond',  name: 'Double Diamond',  phase: 'Discover / Define', note: 'Orienting to the current situation, internal and external, before framing the problem.' },
  { slug: 'design-thinking', name: 'Design Thinking', phase: 'Empathize / Define', note: 'Situational context around the human need before defining the challenge.' },
  { slug: 'lean-startup',    name: 'Lean Startup',    phase: 'Build',              note: 'A fast read of position before committing to what to build and test first.' },
]

const RELATED_METHODS = [
  { slug: 'strategic-choice-cascade', name: 'Strategic Choice Cascade', rel: 'The natural next step. SWOT produces a wide set of strategic options via the crossings; the cascade makes the actual choices — where to play, how to win. Use SWOT to generate the moves, the cascade to choose among them.' },
  { slug: 'business-model-canvas',    name: 'Business Model Canvas',    rel: 'Complementary and deeper on the internal side. SWOT\'s strengths and weaknesses are a fast, flat read; the canvas is a structured model of how the business creates and captures value. Where SWOT says "weak logistics", the canvas shows exactly which blocks break.' },
  { slug: 'balanced-breakthrough',    name: 'Balanced Breakthrough',    rel: 'Both weigh a situation against multiple criteria, but differently: Balanced Breakthrough evaluates a CONCEPT against desirability, feasibility, and viability; SWOT scans a SITUATION on internal/external and helpful/harmful. One tests an idea; the other reads a position.' },
  { slug: 'design-principles',        name: 'Design Principles',        rel: 'The tradeoffs a SWOT exposes — we cannot be strong everywhere — are exactly what design principles then commit to in advance.' },
  { slug: 'ambition-matrix',          name: 'Ambition Matrix',          rel: 'The prioritization partner: SWOT surfaces strategic options as crossings but does not rank them; the Ambition Matrix helps place the resulting moves by ambition and sequence them.' },
]

export default function SWOTAnalysisPage() {
  return (
    <>
      {/* S1 — Header DARK */}
      <DarkSection>
        <Container>
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{ fontSize: 'var(--text-2xs)', color: PLUM, background: `${PLUM_RGBA}0.10)`, border: `1px solid ${PLUM_RGBA}0.22)` }}
            >
              Strategy &amp; Prioritization
            </span>
            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              SWOT Analysis
            </h1>
            <p className="mb-3 max-w-[600px]" style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}>
              A four-quadrant view of your strengths, weaknesses, opportunities, and threats — whose actual value is not the four lists but the strategic moves you find by crossing them.
            </p>
            <p className="max-w-[520px]" style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>
              Anyone can fill in four boxes. The strategy is not in the boxes. It is in the lines you draw between them.
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* S2 — Establishing visual DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM} dark>The cross-pairing engine</SectionLabel>
            <SectionHeadingDark>Four quadrants. Four crossings. The crossings are the point.</SectionHeadingDark>
            <p className="mb-12 max-w-[520px]" style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.45)' }}>
              The boxes sort your situation. The diagonal connections between them — the crossings — are where every strategic move in a SWOT is found.
            </p>
            <SWOTEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* S3 — What it is LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>The four lists are not the analysis. The crossings are.</SectionHeadingLight>
            <div className="flex flex-col gap-5">
              <Body>
                SWOT is a four-quadrant view of a situation: your STRENGTHS and WEAKNESSES, which are internal and largely within your control, and your OPPORTUNITIES and THREATS, which are external and are not. Two axes give the four boxes their meaning: internal versus external, and helpful versus harmful. Those axes matter more than they look, because the most common way a SWOT goes wrong at the very first step is miscategorizing — dropping an external market trend into a &ldquo;Strength&rdquo; box, or listing an aspiration as an opportunity. A strength is something you HAVE; an opportunity is something in the WORLD. Keep the axes honest and the rest of the method has a chance.
              </Body>
              <Body>
                But here is the thing almost everyone misses, and it is the difference between a method and a wall of sticky notes: the four lists are not the analysis. Filling in four boxes is easy, it feels productive, and it produces a satisfying sense of completion that is entirely unearned — because four lists sitting in four quadrants tell you nothing about what to DO. They sort nothing, they prioritize nothing, and they force no choice. A SWOT that ends at four lists is a brainstorm wearing a strategy costume.
              </Body>
              <Body>
                The actual method is the CROSS-PAIRING. You take the quadrants two at a time and ask what their intersection implies — and this is where strategy appears. STRENGTHS crossed with OPPORTUNITIES asks: where can we press an advantage we actually have against an opening that actually exists? WEAKNESSES crossed with THREATS asks: where are we exposed, what could sink us, what must we defend or fix first? STRENGTHS crossed with THREATS asks: how do we use what we have to blunt what is coming? And WEAKNESSES crossed with OPPORTUNITIES asks: what would we need to build or fix in order to reach for this? These four crossings turn four inert lists into four families of strategic move. This cross-pairing step has its own name — TOWS — precisely because it is the part that does the work. A SWOT that never crosses its quadrants has not been done. It has merely been started.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S4 — Interactive DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM} dark>Cross-pairing engine</SectionLabel>
            <SectionHeadingDark>Fill the boxes, and nothing happens. Cross them, and a strategy appears.</SectionHeadingDark>
            <p className="mb-12 max-w-[520px]" style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}>
              Click the axes, the quadrants, and the crossings. The quadrants are setup; the crossings are strategy.
            </p>
            <SWOTInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* S5 — When to deploy LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>When to deploy it</SectionLabel>
            <SectionHeadingLight>Right tool, right moment — and when to reach for something else.</SectionHeadingLight>
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Use SWOT when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You need a fast, shared, whole-situation picture before a strategic decision — and you intend to cross the quadrants, not just fill them.',
                    'A team holds scattered, unstated views of where the organization stands, and you need one honest artifact to align and argue against.',
                    'You are entering a new market, launching a new line, or reassessing position, and want internal reality and external forces on one page.',
                    'You will use the crossings to generate actual moves — press, defend, counter, build — and take them forward.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: PLUM, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}>
                  Do not lean on it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You will stop at four lists. A SWOT that never crosses its quadrants is a brainstorm — and it is worse than nothing because it looks like analysis and produces none.',
                    'You want depth on the business model (that is the Business Model Canvas) or a committed strategic choice (that is the Strategic Choice Cascade). SWOT is a wide, shallow situational scan.',
                    'The team cannot be honest about weaknesses. A SWOT whose weakness box is empty or diplomatic makes the W×T and W×O crossings — often the most important — impossible.',
                    'You need prioritization among the moves. SWOT surfaces strategic options; it does not rank them. Take the crossings to a prioritization method afterwards.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: 'var(--color-neutral-400)', flexShrink: 0, marginTop: 2 }}>×</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="rounded-lg p-5 mt-10" style={{ background: 'var(--color-warm-100)', borderLeft: '3px solid var(--color-neutral-300)' }}>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)', fontStyle: 'italic' }}>
                The honest limit: SWOT is only as good as the honesty and specificity of its entries, and both are usually poor. It invites vague, unfalsifiable items that feel true and mean nothing. It is also a snapshot with no sense of magnitude or probability — a trivial threat and an existential one sit in the same box. Treat it as the opening move of a strategy conversation, never the conclusion of one.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S6 — How it works WARM */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>How it works</SectionLabel>
            <SectionHeadingLight>At a strategic level: axes first, specificity second, crossings always.</SectionHeadingLight>
            <div className="flex flex-col gap-7 mt-2">
              {[
                { n: '01', title: 'Get the axes right first.', body: 'Sort every item by two questions: is this INTERNAL (about us, within our control) or EXTERNAL (about the world, outside it)? And is it HELPFUL or HARMFUL? This is not pedantry — it is what keeps the analysis honest. An external trend filed as a strength, or an aspiration filed as an opportunity, corrupts every crossing that follows.' },
                { n: '02', title: 'Force specificity, and kill the platitudes.', body: '"Strong brand" is not a strength; "the brand commands a 20 percent price premium with buyers over 40" is. For each entry, demand something falsifiable and specific enough to act on. Vague entries feel productive and generate vague crossings. Cut them.' },
                { n: '03', title: 'Be genuinely honest about weaknesses and threats.', body: 'The two harmful quadrants are where the value is, and where teams flinch. A diplomatic weakness list makes the two most important crossings (W×T and W×O) impossible. Make it safe to be blunt, or do not bother.' },
                { n: '04', title: 'Now cross the quadrants — this is the actual method.', body: 'Take them two at a time: Strengths × Opportunities (press), Weaknesses × Threats (defend), Strengths × Threats (counter), Weaknesses × Opportunities (build). For each meaningful pairing, write the strategic MOVE it implies. This is the step that turns four lists into strategy, and it is the step almost everyone skips.' },
                { n: '05', title: 'Weight the crossings by magnitude and likelihood.', body: 'SWOT itself is flat — every item looks equally important. Before acting, ask which threats are large and probable, which opportunities are real and reachable, and let that shape which crossings matter. A W×T defend move against an existential, likely threat outranks an exciting S×O move against a marginal one.' },
                { n: '06', title: 'Take the moves onward to prioritization.', body: 'The crossings give you a set of strategic options, not a plan. Hand them to a prioritization method to sequence and choose. SWOT opens the conversation; it does not close it.' },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span className="font-mono shrink-0" style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: `${PLUM_RGBA}0.10)`, lineHeight: 1.1, width: 40 }}>{n}</span>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>{title}</h3>
                    <Body>{body}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </WarmSection>

      {/* S7 — Best practices LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like — and the mistakes that prevent it.</SectionHeadingLight>
            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>When it goes well</h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'Every item is correctly sorted on the two axes (internal/external, helpful/harmful).',
                'Entries are specific and falsifiable, not platitudes.',
                'The weakness and threat quadrants are genuinely honest, not diplomatic.',
                'The team crosses the quadrants and writes the strategic move each crossing implies (press, defend, counter, build).',
                'The crossings are weighted by magnitude and likelihood, then taken onward to prioritization.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: PLUM, flexShrink: 0, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>{item}</span>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>The mistakes, and how to avoid them</h3>
            <div className="flex flex-col gap-5">
              {[
                { mistake: 'Stopping at four lists.', fix: 'The defining failure. Four filled boxes feel like a finished analysis and are not one. If you have not crossed the quadrants, you have not done a SWOT.' },
                { mistake: 'Platitude entries.', fix: '"Strong brand", "great team", "digital disruption". Unfalsifiable, universally applicable, and useless. Demand specificity or delete.' },
                { mistake: 'A diplomatic weakness box.', fix: 'Protecting feelings empties the two most valuable crossings. If weaknesses cannot be named honestly, the exercise is theatre.' },
                { mistake: 'Miscategorizing on the axes.', fix: 'Filing an external trend as a strength, or an aspiration as an opportunity. It corrupts every crossing built on it. Sort ruthlessly by internal/external and helpful/harmful.' },
                { mistake: 'Treating all items as equal.', fix: 'SWOT is flat; a trivial and an existential threat look identical. Weight by magnitude and probability before acting.' },
                { mistake: 'Mistaking options for priorities.', fix: 'The crossings are strategic options, not a ranked plan. Take them to a prioritization method; do not act on them in list order.' },
              ].map(({ mistake, fix }) => (
                <div key={mistake} className="rounded-lg p-5" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
                  <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>{mistake}</p>
                  <Body>{fix}</Body>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S8 — Logistics LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Logistics</SectionLabel>
            <SectionHeadingLight>Practical considerations for a session that actually works.</SectionHeadingLight>
            <div className="flex flex-col gap-5 mt-6">
              {[
                { head: 'Do it with a mixed group, and expect disagreement.', body: 'Strengths and weaknesses look different from different seats, and the disagreement is data. A SWOT built by one person records one person\'s blind spots.' },
                { head: 'Bring outside-in evidence for the external quadrants.', body: 'Opportunities and threats are about the world, and a room full of insiders will guess at them. Where you can, ground the external quadrants in actual market, competitor, and customer evidence rather than assumption.' },
                { head: 'Reserve most of the time for the crossings, not the filling-in.', body: 'Teams routinely spend an hour filling boxes and five minutes crossing them — exactly backwards. Fill fast, cross slowly. The crossings are where the hour should go.' },
                { head: 'Force a specificity pass before crossing.', body: 'Between filling and crossing, go through every entry and challenge it: is this specific and true, or comfortable and vague? Crossings built on platitudes produce platitudes.' },
                { head: 'Keep it as the opener, and connect it forward.', body: 'A SWOT\'s output — the strategic moves from the crossings — should flow into a prioritization method and, often, into a fuller strategy instrument. Do not let a SWOT be the last word on a strategy.' },
              ].map(({ head, body }) => (
                <div key={head} className="rounded-lg p-5" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}>
                  <p className="font-semibold mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>{head}</p>
                  <Body>{body}</Body>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S9 — AI DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM} dark>How AI is evolving this method</SectionLabel>
            <SectionHeadingDark>AI fills all four boxes in seconds. The four boxes were never the work.</SectionHeadingDark>
            <p className="mb-12 max-w-[560px]" style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}>
              So this is the least useful thing it could possibly do well. Two uses are genuinely good — and both are the opposite of &ldquo;fill the boxes.&rdquo;
            </p>
            <SWOTAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* S10 — Example LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>In practice</SectionLabel>
            <SectionHeadingLight>The same scenario, two ways. The difference is the crossings.</SectionHeadingLight>
            <p className="mb-10" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
              A regional grocery chain facing a national online entrant. Toggle between the traditional approach and an AI-assisted version.
            </p>
            <SWOTExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* S11 — Used in frameworks LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Used in these frameworks</SectionLabel>
            <SectionHeadingLight>Where SWOT fits in the larger process.</SectionHeadingLight>
            <div className="grid md:grid-cols-2 gap-4 mt-8">
              {FRAMEWORK_LINKS.map(fw => (
                <Link
                  key={fw.slug}
                  href={`/framework/${fw.slug}`}
                  className="block rounded-xl p-6 transition-colors"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}
                >
                  <p className="font-semibold mb-1" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>{fw.name}</p>
                  <p className="font-mono uppercase tracking-widest mb-2" style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>{fw.phase}</p>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>{fw.note}</p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S12 — Related methods LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Related methods</SectionLabel>
            <SectionHeadingLight>What to reach for before, after, or alongside.</SectionHeadingLight>
            <div className="flex flex-col gap-4 mt-8">
              {RELATED_METHODS.map(m => (
                <div key={m.slug} className="rounded-xl p-6" style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}>
                  <Link href={`/methods/${m.slug}`} className="font-semibold mb-2 block" style={{ fontSize: 'var(--text-sm)', color: PLUM }}>{m.name}</Link>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>{m.rel}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S13 — Sources LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>What to read next.</SectionHeadingLight>
            <div className="flex flex-col gap-4 mt-8">
              {[
                {
                  title: 'Understanding Michael Porter',
                  author: 'Joan Magretta',
                  year: '2011',
                  description: 'For what competitive strategy actually requires, and why a situational scan is only ever a starting point.',
                },
                {
                  title: 'Good Strategy / Bad Strategy',
                  author: 'Richard Rumelt',
                  year: '2011',
                  description: 'On the difference between a real strategy and a list of good things — directly relevant to why a four-box SWOT is not a strategy.',
                },
                {
                  title: 'Playing to Win',
                  author: 'A.G. Lafley and Roger Martin',
                  year: '2013',
                  description: 'For turning situational understanding into actual, committed strategic choices.',
                },
              ].map(source => (
                <div
                  key={source.title}
                  className="rounded-lg p-5"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-200)' }}
                >
                  <p className="font-semibold mb-1" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {source.title} <span style={{ color: 'var(--color-neutral-400)', fontWeight: 400 }}>({source.year})</span>
                  </p>
                  <p className="mb-2" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>{source.author}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>{source.description}</p>
                </div>
              ))}
            </div>
            <p className="mt-8" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', lineHeight: 'var(--leading-relaxed)' }}>
              The cross-pairing step is also known as TOWS, formalized by Heinz Weihrich (1982).
            </p>
          </div>
        </Container>
      </LightSection>
    </>
  )
}

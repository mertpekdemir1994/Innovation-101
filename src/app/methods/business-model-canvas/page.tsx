import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import BMCEstablishing from './BMCEstablishing'
import BMCExampleToggle from './BMCExampleToggle'
import { SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

const BMCInteractive   = dynamic(() => import('./BMCInteractive'),   { ssr: false })
const BMCAIReactivated = dynamic(() => import('./BMCAIReactivated'), { ssr: false })

export const metadata: Metadata = {
  title: 'Business Model Canvas · Methods',
  description: 'A one-page model of how a business creates, delivers, and captures value across nine linked blocks, used to see whether the whole thing holds together.',
}

const PLUM = '#6B4A77'

// ── Layout helpers ──────────────────────────────────────────────────────────

function DarkSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="dark-section" style={{ background: 'var(--color-dark)' }}>
      <div className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
        {children}
      </div>
    </section>
  )
}

function LightSection({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ background: 'var(--color-background)' }}>
      <div className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
        {children}
      </div>
    </section>
  )
}

function Container({ children, prose = false }: { children: React.ReactNode; prose?: boolean }) {
  return (
    <div className={prose ? 'max-w-prose' : 'w-full'}>
      {children}
    </div>
  )
}

// ── Data ────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build / Learn',
    note: 'The canvas holds the hypotheses the Build-Measure-Learn loop exists to test. Every block is an assumption: which segment, which channel, which revenue mechanism, which cost model. The canvas makes those assumptions explicit and organised before the loop begins, so each experiment targets a named claim rather than a vague belief.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Define / Deliver',
    note: 'In the Define phase, the canvas maps the business model behind the concept and checks whether it holds together. In Deliver, it is revisited as the model becomes concrete, ensuring that operational commitments (channel, cost structure, partnerships) are consistent with the value proposition and segment choices made earlier.',
  },
  {
    slug: 'fde',
    name: 'Front-End of Innovation',
    phase: 'Concept development / Business case',
    note: 'During concept development, the canvas is the business model behind the concept, made explicit and checkable. At the business case stage, the coherence between blocks determines whether the concept is investable: not just desirable, but financially viable as a whole model.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Define',
    note: 'Design Thinking addresses desirability, feasibility, and viability. The canvas is the viability half of that question: does the business model that delivers the desirable solution work? It is the structured check that the viable business model exists, not just the desirable product.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'value-proposition-canvas',
    name: 'Value Proposition Canvas',
    rel: 'The nesting sibling, by the same authors. The Value Proposition Canvas zooms into one block (the value proposition against the customer segment) and does it in depth, forcing an honest match between what customers need and what you offer. The Business Model Canvas is the whole board, and its concern is whether all nine blocks fit together. Use the VPC to get one block right; use the BMC to see whether the whole thing stands up.',
  },
  {
    slug: 'assumption-mapping',
    name: 'Assumption Mapping',
    rel: 'The essential downstream partner. Every block on a canvas contains untested claims, and a completed canvas is a well-organised set of guesses. Assumption Mapping is how you sort those guesses by importance and uncertainty and decide which to test first. The canvas organises the hypotheses; Assumption Mapping prioritises them.',
  },
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'Where the canvas\'s riskiest assumptions go to meet reality. Coherence is not truth, and a perfectly consistent business model can still be one nobody wants. Concept Testing checks whether the value proposition, the channel, and the revenue model work with real customers, not just with each other.',
  },
  {
    slug: 'ten-types-innovation',
    name: '10 Types of Innovation',
    rel: 'Complementary lenses on the same object. The 10 Types framework diagnoses where innovation is happening (or not happening) across ten dimensions from configuration to experience. The canvas describes how the business model works as a whole. Together they show both what the model is and where it is and is not being innovated.',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function BMCPage() {
  return (
    <>
      {/* S1 - Header DARK */}
      <DarkSection>
        <span
          className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
          style={{
            fontSize: 'var(--text-2xs)',
            color: '#EBA3FF',  /* PLUM, brightened for text contrast */
            background: 'rgba(107,74,119,0.12)',
            border: '1px solid rgba(107,74,119,0.28)',
          }}>
          Strategy &amp; Prioritization
        </span>
        <h1
          className="font-display font-semibold text-balance mb-5"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}>
          Business Model Canvas
        </h1>
        <p className="mb-4 max-w-[680px]"
          style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}>
          A one-page model of how a business creates, delivers, and captures value across nine linked blocks,
          used to see whether the whole thing holds together.
        </p>
        <p className="max-w-[540px]"
          style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}>
          Nine boxes anyone can fill in. The method is not the filling in. It is discovering that block three
          contradicts block seven, on paper, before it does so in the market.
        </p>
      </DarkSection>

      {/* S2 - Establishing visual DARK */}
      <DarkSection>
        <SectionLabel accent={PLUM}>The visual</SectionLabel>
        <SectionHeadingDark>Nine blocks. One structure. The links between them are the method.</SectionHeadingDark>
        <p className="max-w-prose mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.55)', lineHeight: 'var(--leading-relaxed)' }}>
          The canonical nine-block canvas, but built as a coherence engine rather than a form.
          The blocks are visibly linked: which blocks constrain which, and what changes when one block moves.
          One link is already under tension.
        </p>
        <BMCEstablishing />
      </DarkSection>

      {/* S3 - What it is LIGHT */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={PLUM}>What it is</SectionLabel>
          <SectionHeadingLight>The canvas is not nine boxes to fill in. It is a coherence test disguised as a template.</SectionHeadingLight>
          <Body>
            The Business Model Canvas describes, on a single page, how a business creates, delivers, and
            captures value. It does this across nine blocks: who you serve (Customer Segments), what you offer
            them (Value Propositions), how you reach them (Channels), how you relate to them (Customer
            Relationships), and what you earn (Revenue Streams), together with what you need to do it
            (Key Resources), what you do (Key Activities), who helps (Key Partners), and what it costs
            (Cost Structure). Together, they are a complete account of a business model, compressed into
            something you can see all at once.
          </Body>
          <Body>
            But the canvas is almost universally misunderstood as a form, and this is the thing worth being
            clear about: the method is not filling in the boxes. Anyone can fill in nine boxes plausibly,
            and doing so produces a satisfying feeling of completion that is entirely unearned. The method
            is coherence. The nine blocks are not independent. They are linked, and they constrain each other.
            Choose a premium, high-touch channel and your cost structure changes. Choose a new customer segment
            and your value proposition, your channels, and your customer relationships all move with it,
            whether you update them or not.
          </Body>
          <Body>
            The canvas earns its keep at the moment you discover that two of your blocks contradict each other.
            A business model that is internally inconsistent does not work, and the whole point of putting it
            on one page is to make that inconsistency visible before the market makes it visible for you,
            expensively. Filling in the canvas is the beginning of the work. A completed canvas is a hypothesis.
          </Body>
        </Container>
      </LightSection>

      {/* S4 - Interactive DARK */}
      <DarkSection>
        <SectionLabel accent={PLUM}>Try it</SectionLabel>
        <SectionHeadingDark>Change one block. Watch another break. That is the method.</SectionHeadingDark>
        <p className="max-w-prose mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
          Click any block to see what it holds and what it depends on. No block stands alone. Use the
          scenario buttons to see how changing one block propagates, and how a premium channel change produces
          a visible break in the cost structure. The break is the payoff.
        </p>
        <BMCInteractive />
      </DarkSection>

      {/* S5 - When to deploy LIGHT */}
      <LightSection>
        <Container>
          <SectionLabel accent={PLUM}>When to deploy it</SectionLabel>
          <SectionHeadingLight>Use it when you need to see the whole model at once and check whether it holds.</SectionHeadingLight>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <p className="font-mono uppercase tracking-widest mb-4"
                style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Use it when</p>
              <ul className="flex flex-col gap-3">
                {[
                  'You need to check whether the parts of a business model are consistent with each other.',
                  'You are changing one part of a business (a new segment, a new channel, a new revenue model) and need to see what else must change with it.',
                  'Different people in the room hold different models of the business, and you need one shared, visible artifact to argue against.',
                  'You are evaluating a new venture and want to expose untested assumptions in an organised way.',
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
                style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>Do not lean on it when</p>
              <ul className="flex flex-col gap-3">
                {[
                  'You want depth on the customer and the offer specifically: that is the Value Proposition Canvas, which zooms into a single block and does it properly.',
                  'You want to explore the full range of innovation interventions beyond the model itself: the canvas describes what IS; other methods help you decide what to CHANGE.',
                  'Filling it in will be treated as the work. A completed canvas is a hypothesis; if the organisation mistakes it for a plan, the canvas has done harm.',
                  'The business is unknown and unformed. The canvas is excellent at organising what you believe; it can make a pile of guesses look like a strategy.',
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

          <div className="max-w-prose mt-8 p-5 rounded-lg"
            style={{ background: 'rgba(107,74,119,0.05)', border: '1px solid rgba(107,74,119,0.16)' }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>The honest limit</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              The canvas describes; it does not validate. Every block is a claim, and the canvas has no opinion
              about whether any of them are true. It is also static: a snapshot with no time, no competition,
              and no dynamics. And because it is fast, tidy, and universally recognised, it produces an
              often unwarranted sense that the business has been figured out. The canvas is a beginning.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* S6 - How it works LIGHT */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={PLUM}>How it works</SectionLabel>
          <SectionHeadingLight>Six steps: the last one is the only one that matters.</SectionHeadingLight>

          <div className="flex flex-col gap-6 mt-8">
            {[
              {
                n: '01',
                title: 'Start with the customer segment, not the product',
                body: 'Who, precisely, is this for? Everything else in the canvas hangs off this block, and a vague segment produces a vague and unfalsifiable model. If you cannot name who is NOT the customer, you have not chosen a segment.',
              },
              {
                n: '02',
                title: 'Work the value-creation side, then the delivery side',
                body: 'Fill the customer-facing blocks first (segments, value propositions, channels, relationships, revenue), because they define what the business must be able to do. Then work the delivery side (key resources, activities, partners, costs), which is what it takes to keep that promise.',
              },
              {
                n: '03',
                title: 'Make the links explicit, not just the blocks',
                body: 'For each block, ask what it depends on and what depends on it. This is the step teams skip, and it is where the method\'s value lives. A canvas without stated dependencies is a list of nine opinions, not a model.',
              },
              {
                n: '04',
                title: 'Stress-test it: change one block and see what breaks',
                body: 'This is the actual method. Change the segment and see whether the value proposition, channels, and relationships still make sense. Change the channel and see whether the cost structure works against the revenue streams. If nothing breaks when you change something significant, you have not connected the blocks.',
              },
              {
                n: '05',
                title: 'Find the contradiction, and take it seriously',
                body: 'Somewhere, two blocks will not agree. This is the finding. Do not resolve it by softening the language; resolve it by changing the business model, or by acknowledging that you have a real problem to solve.',
              },
              {
                n: '06',
                title: 'Name the hypotheses inside each block',
                body: 'Every block contains claims that could be false. Write them down as assumptions and hand the riskiest ones to Assumption Mapping and Concept Testing. The canvas organises your guesses; it does not test them.',
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-6">
                <div className="flex-shrink-0 w-8 pt-1">
                  <span className="font-mono" style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>{n}</span>
                </div>
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
        </Container>
      </LightSection>

      {/* S7 - Best practices LIGHT */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={PLUM}>Best practices</SectionLabel>
          <SectionHeadingLight>If nothing broke, you did not use the canvas.</SectionHeadingLight>

          <div className="space-y-4 mt-6">
            <p className="font-mono uppercase tracking-widest mb-4"
              style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>When it goes well</p>
            <div className="grid gap-3">
              {[
                'The customer segment is specific enough that you can say who is NOT the customer.',
                'The dependencies between blocks are made explicit, not just the blocks themselves.',
                'The canvas is stress-tested: something significant is changed and the team watches what breaks.',
                'A contradiction is found, taken seriously, and resolved by changing the model rather than softening the words.',
                'Every block\'s untested claims are written down as assumptions and handed onward to be tested.',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-lg"
                  style={{ background: 'rgba(107,74,119,0.04)', border: '1px solid rgba(107,74,119,0.12)' }}>
                  <span style={{ color: PLUM, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-mono uppercase tracking-widest mt-8 mb-4"
              style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>The mistakes</p>
            <div className="grid gap-3">
              {[
                { label: 'Treating it as a form.', body: 'Nine boxes filled in plausibly, admired, and filed. The filling in is not the method; the coherence check is. If nothing broke, you did not use it.' },
                { label: 'Mistaking a completed canvas for a validated one.', body: 'It is a hypothesis, and a tidy one, which makes it more dangerous rather than less. Every block is a guess until tested.' },
                { label: 'Changing one block and not the others.', body: 'Teams routinely swap in a new customer segment and leave the value proposition, channels, and relationships untouched. At that point, the canvas is describing a business that does not exist.' },
                { label: 'A vague segment.', body: '"SMEs", "consumers", "enterprises". Vague segments make every downstream block unfalsifiable, and the canvas becomes unfalsifiable with them.' },
                { label: 'Ignoring the contradiction.', body: 'When two blocks do not agree, the temptation is to reword until they seem to. The contradiction is the single most valuable thing the canvas produced. Do not talk it away.' },
              ].map(({ label, body }) => (
                <div key={label} className="p-4 rounded-lg"
                  style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-200)' }}>
                  <p className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S8 - Logistics LIGHT */}
      <LightSection>
        <Container>
          <div className="border-t pt-20" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={PLUM}>Logistics</SectionLabel>
            <SectionHeadingLight>Do it together. Sketch several. Expect the disagreement.</SectionHeadingLight>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Time</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  A focused session of 2–3 hours to map and stress-test. Revisited whenever a significant
                  block changes, not on a calendar cadence.
                </p>
              </div>
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Who</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  Cross-functional team of 4–8. The most valuable moment is discovering that people who have
                  worked together for years hold quietly different models of the business. A canvas produced
                  by one person records one person&rsquo;s assumptions.
                </p>
              </div>
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Approach</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  Sketch several canvases (the current model, then two or three alternatives) and compare.
                  Write the assumptions on the canvas itself. Present it as a model to be attacked, not a
                  plan to be approved. Keep the versions.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S9 - AI DARK */}
      <DarkSection>
        <SectionLabel accent={PLUM}>AI and this method</SectionLabel>
        <SectionHeadingDark>AI fills all nine blocks in seconds, beautifully. A completed canvas was never the achievement, and now it is not even work.</SectionHeadingDark>
        <p className="max-w-prose mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)', lineHeight: 'var(--leading-relaxed)' }}>
          Toggle between modes to see what changes when AI generates the canvas, and the one use where
          it is a genuinely valuable adversary.
        </p>
        <BMCAIReactivated />
      </DarkSection>

      {/* S10 - Example LIGHT */}
      <LightSection>
        <SectionLabel accent={PLUM}>In practice</SectionLabel>
        <SectionHeadingLight>An enterprise software company moves down-market. One block changes. Almost everything else breaks.</SectionHeadingLight>
        <p className="max-w-prose mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
          Tab A shows the structured canvas working: mapping the current model, changing one block, following
          the dependencies, and finding the contradiction that tells them what the move requires.
          Tab B shows what happens when the canvas is produced by AI instead.
        </p>
        <BMCExampleToggle />
      </LightSection>

      {/* S11 - Frameworks LIGHT */}
      <LightSection>
        <Container>
          <div className="border-t pt-8" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={PLUM}>Where it fits in the frameworks</SectionLabel>
            <SectionHeadingLight>The canvas appears at the moments where frameworks decide what the business will be.</SectionHeadingLight>

            <div className="flex flex-col gap-6 mt-8">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <div key={slug} className="p-6 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Link href={`/framework/${slug}`}
                      className="font-semibold hover:opacity-70 transition-opacity"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {name}
                    </Link>
                    <span style={{ color: 'var(--color-neutral-300)' }}>·</span>
                    <span className="font-mono uppercase tracking-widest"
                      style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                      {phase}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S12 - Related methods LIGHT */}
      <LightSection>
        <Container>
          <div className="border-t pt-8" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={PLUM}>Related methods</SectionLabel>
            <SectionHeadingLight>Methods that work alongside, before, or after the canvas.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-8">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <div key={slug} className="p-5 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="mb-2">
                    <Link href={`/methods/${slug}`}
                      className="font-semibold hover:opacity-70 transition-opacity"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                      {name}
                    </Link>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S13 - Sources LIGHT */}
      <LightSection>
        <Container prose>
          <div className="border-t pt-8" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={PLUM}>Sources and further reading</SectionLabel>
            <SectionHeadingLight>The books behind the method.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-8">
              {[
                {
                  citation: 'Osterwalder, A., & Pigneur, Y. (2010). Business Model Generation. Wiley.',
                  note: 'The book that introduced the canvas, and still the clearest guide to using it. The nine-block structure, the canonical arrangement, and the visual grammar are all here.',
                },
                {
                  citation: 'Osterwalder, A., Pigneur, Y., Bernarda, G., & Smith, A. (2014). Value Proposition Design. Wiley.',
                  note: 'The companion volume that goes deep on the single most important block (the value proposition against the customer segment) and provides the Value Proposition Canvas as the tool for that depth.',
                },
                {
                  citation: 'Bland, D., & Osterwalder, A. (2019). Testing Business Ideas. Wiley.',
                  note: 'The essential counterpart: how to test the assumptions a canvas exposes, rather than admiring the canvas. Turns the hypothesis list a completed canvas produces into a structured testing programme.',
                },
              ].map(({ citation, note }) => (
                <div key={citation} className="p-5 rounded-lg"
                  style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-200)' }}>
                  <p className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {citation}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom nav */}
            <div className="mt-20 pt-10 border-t" style={{ borderColor: 'rgba(107,74,119,0.12)' }}>
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                  <p className="font-mono uppercase tracking-widest mb-1"
                    style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                    Strategy &amp; Prioritization · Method 9 of 9
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    40 methods across 6 stage groups
                  </p>
                </div>
                <Link href="/methods"
                  className="font-semibold hover:underline"
                  style={{ fontSize: 'var(--text-base)', color: PLUM }}>
                  All methods →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>
    </>
  )
}

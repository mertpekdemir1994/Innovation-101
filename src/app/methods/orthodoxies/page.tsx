import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import OrthodoxiesExampleToggle from './OrthodoxiesExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Orthodoxies — Methods — Innovation 101',
}

const OrthodoxiesEstablishing  = dynamic(() => import('./OrthodoxiesEstablishing'),  { ssr: false })
const OrthodoxiesInteractive   = dynamic(() => import('./OrthodoxiesInteractive'),   { ssr: false })
const OrthodoxiesAIReactivated = dynamic(() => import('./OrthodoxiesAIReactivated'), { ssr: false })

const SAGE = '#3D6B5A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Discover / Define',
    note: 'Challenging the assumptions that bound the problem before defining it. The Discover phase needs genuine divergence; orthodoxies is what opens the possibility space before the Define phase converges on a frame. A team that has not surfaced its orthodoxies will define the problem inside the same invisible constraints.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Empathize / Define',
    note: 'Questioning the assumptions that frame how the problem is seen. The Empathize phase surfaces real human needs; the Define phase translates those needs into a problem frame. Orthodoxies is the tool for ensuring that frame is not constrained by industry assumptions the team did not know it was making.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Monday',
    note: 'Surfacing and challenging the assumptions behind the week\'s problem as it is mapped on Monday. The sprint maps experts\' knowledge into a target; orthodoxies ensures that map is not drawn inside invisible industry constraints. A sprint that does not surface its orthodoxies will prototype solutions to a conventionally-framed problem.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'Challenging the assumptions behind what the team plans to build before it enters the build cycle. The Discovery Sprint is the last opportunity to reframe the problem before delivery begins; orthodoxies is the tool for ensuring the frame is not inherited unchallenged from the industry\'s conventional thinking.',
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
    rel: 'The natural downstream handoff and the key pairing: a flipped orthodoxy, "what if customers never owned the product?", is excellent raw material for a well-scoped How Might We question. Surface and flip here; reframe there. The relationship is directional: orthodoxies opens the space, How Might We structures the ideation prompt.',
  },
  {
    slug: null,
    name: 'Competitive Landscape Analysis',
    rel: 'A natural pairing: mapping what every competitor does the same way is one of the most reliable routes to a shared industry orthodoxy. When every player in a category has the same channel, the same pricing model, the same delivery format, that uniformity is the orthodoxy made visible. Landscape analysis surfaces it; orthodoxies names and challenges it.',
  },
  {
    slug: null,
    name: 'Analogs & Precursors',
    rel: 'Complementary provocation: analogs and precursors show that another domain or historical era did it differently, which is direct evidence that an orthodoxy is a choice, not a law of physics. "Another industry already solved this differently" is one of the strongest arguments that a shared industry assumption is breakable.',
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'Talking to customers and, especially, outsiders helps surface the assumptions insiders can no longer see. Customers often articulate the industry\'s implicit rules by voicing their frustrations: "I wish I didn\'t have to go in person," "I can\'t believe it costs this much." Those frustrations are orthodoxies from the customer\'s point of view.',
  },
  {
    slug: null,
    name: 'Assumption Mapping',
    rel: 'A close cousin at a different altitude: assumption mapping surfaces the risky assumptions behind a specific concept or business model; orthodoxies surfaces the assumptions behind an entire industry category. Use orthodoxies to escape the category\'s constraints first, then assumption mapping to stress-test the specific concept that emerges from the flip.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function OrthodoxiesPage() {
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
              Orthodoxies
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Surfacing the unquestioned &ldquo;this is just how our industry works&rdquo; beliefs that invisibly constrain what a team thinks is possible, so they can be deliberately challenged.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Every industry is quietly governed by rules nobody wrote down and nobody questions. The breakthrough usually lives on the other side of one of them.
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
            <OrthodoxiesEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>What it is</SectionLabel>
            <SectionHeadingLight>The unquestioned &ldquo;of course&rdquo; statements that lock an industry into the same patterns.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Orthodoxies are the deeply held beliefs, unwritten rules, and unquestioned assumptions about how
                things are done in an industry or organization. They are the &ldquo;of course&rdquo; statements: of course
                customers won&rsquo;t pay before they see it, of course this is sold through this channel, of course the
                product has to work this way, that everyone in a field accepts as true. Because they are
                treated as undeniable facts rather than choices, they act as invisible constraints, quietly locking
                companies into the same repetitive patterns and ruling out entire categories of idea before anyone
                even considers them.
              </Body>
              <Body>
                The insidious thing about an orthodoxy is that it does not feel like an assumption; it feels like
                reality. Nobody argues about it because nobody notices it. It is the water the whole industry is
                swimming in. And that is precisely why surfacing orthodoxies is such a direct route to breakthrough:
                the most valuable innovations frequently come from a company that identified an industry-wide
                &ldquo;truth,&rdquo; recognized it as a mere assumption, and did the opposite. Low-cost airlines challenged
                &ldquo;air travel is a premium service.&rdquo; Streaming challenged &ldquo;you own your media.&rdquo; Direct-to-consumer brands
                challenged &ldquo;you need retail distribution to reach customers.&rdquo; In each case the breakthrough was not
                a new technology; it was the violation of an orthodoxy everyone else still obeyed.
              </Body>
              <Body>
                So the method is a disciplined act of noticing and then defiance. First, surface the unquestioned
                assumptions your industry treats as truth, the hardest part, because they are invisible from the inside.
                Then challenge them deliberately: for each orthodoxy, ask &ldquo;what if the opposite were true?&rdquo; and
                explore the opportunity space that opens. The method does not assume every orthodoxy is wrong; it
                insists that every orthodoxy is a choice, and that examining the choice is where breakthroughs hide.
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
            <SectionLabel accent={SAGE}>Name it. Then flip it.</SectionLabel>
            <SectionHeadingDark>Name the invisible rule. Then flip it.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Each wall is an unquestioned industry orthodoxy. Click it to name the hidden belief. Then flip it to
              &ldquo;what if the opposite were true?&rdquo; and see the opportunity space beyond.
            </p>
            <OrthodoxiesInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>When to deploy it</SectionLabel>
            <SectionHeadingLight>For breakthrough, not optimization. For escaping patterns, not refining them.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: SAGE }}>
                  Use Orthodoxies when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You are seeking breakthrough or category-redefining ideas, not incremental improvement, and need to escape the industry\'s default patterns.',
                    'The team keeps producing variations on the same familiar solutions, a reliable sign that invisible constraints are at work.',
                    'You are entering an established industry and want to find where incumbents\' shared assumptions leave an opening.',
                    'You want to set up ideation with genuinely provocative, assumption-breaking prompts rather than safe, conventional ones.',
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
                    'You need incremental optimization within the existing model; challenging foundational assumptions is the wrong tool for a small tuning problem.',
                    'The "orthodoxy" is actually a hard constraint: a law of physics, a binding regulation, a genuine safety requirement. The method targets assumed rules, not real limits, and part of the skill is telling them apart.',
                    'The team is not prepared to sit with genuinely uncomfortable provocations; a half-hearted session that flinches from its own flips produces nothing.',
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
                The honest limit: not every orthodoxy is wrong, and flipping one does not guarantee a viable idea.
                The method&rsquo;s value is not that inversions are always right; it is that it forces examination of
                assumptions that were never examined, some of which turn out to be choices worth reversing. Its
                hardest part, and its main failure mode, is that the assumptions are genuinely invisible from
                inside the industry, so a team relying only on insiders will fail to name its own deepest orthodoxies.
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
            <SectionHeadingLight>Six moves, from surfacing the invisible rule to carrying the opening into ideation.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Surface the "of course" statements.',
                  body: 'List the things everyone in your industry treats as obviously true: the assumptions about pricing, channel, ownership, format, customer behavior, business model, that no one questions. Hunt specifically for the beliefs so taken for granted they feel like facts rather than choices. If the team can name them in five minutes, they are probably not the deepest ones.',
                },
                {
                  n: '02',
                  title: 'Use outsiders and newcomers to see the water.',
                  body: 'Because orthodoxies are invisible from inside the industry, deliberately draw on people who have not yet absorbed the assumptions: new hires, customers, people from adjacent fields, founders from outside the category. They can point at what insiders no longer see. The question "why does it have to be that way?" is easy for an outsider and nearly impossible for a veteran.',
                },
                {
                  n: '03',
                  title: 'State each orthodoxy plainly as an assumption.',
                  body: 'Write each one as a clear belief: "we assume customers will not pay before delivery," "we assume the service must be delivered in person." The act of stating it as an assumption, rather than a fact, already begins to loosen its grip. An orthodoxy loses power the moment it is spoken aloud as a mere assumption rather than a description of reality.',
                },
                {
                  n: '04',
                  title: 'Flip each one: what if the opposite were true?',
                  body: 'For every orthodoxy, deliberately invert it and explore the opportunity space the inversion opens. Do this for all of them, including the ones that feel absurd to flip, because the most defended assumptions often hide the biggest openings. Sit with the provocation before dismissing it.',
                },
                {
                  n: '05',
                  title: 'Separate assumed rules from real constraints.',
                  body: 'Test each orthodoxy: is this actually a law of physics, a binding regulation, or a genuine safety requirement, or just a shared belief? Discard the genuine hard limits; keep the assumed rules, which are where the opportunity lives. The method is only as good as the team\'s ability to make this distinction honestly.',
                },
                {
                  n: '06',
                  title: 'Carry the promising flips into framing and ideation.',
                  body: 'The most provocative flipped orthodoxies become the seeds of How Might We questions and ideation prompts. The method surfaces and inverts; the framing and ideation methods turn the openings into concepts. This handoff, from a flipped orthodoxy to a well-framed HMW question, is the method\'s most important output.',
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
            <SectionHeadingLight>What good looks like, and the mistakes that prevent it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The team names genuinely deep orthodoxies: the assumptions so basic they felt like facts, not just surface preferences.',
                'Outsiders and newcomers are used deliberately to spot the assumptions insiders can no longer see.',
                'Every orthodoxy is actually flipped, including the ones that feel absurd, and the opened space is explored rather than dismissed.',
                'Assumed rules are separated from real constraints, so effort goes to the choices that can actually be reversed.',
                'The most provocative flips are carried forward into framing and ideation, not left as a clever exercise with no output.',
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
                  mistake: 'Naming only shallow orthodoxies.',
                  fix: 'Listing mild preferences ("we usually use blue in our branding") instead of foundational beliefs ("customers must own the product") produces weak flips. Push for the assumptions that feel like bedrock: the ones nobody would think to write down because they feel so obviously true.',
                },
                {
                  mistake: 'Failing to see your own water.',
                  fix: 'The deepest orthodoxies are invisible from inside the industry. A team relying only on insiders will miss its most important assumptions. Bring in outside eyes, and give them real license to ask "why does it have to be that way?"',
                },
                {
                  mistake: 'Flinching from the uncomfortable flip.',
                  fix: 'Dismissing an inversion as "obviously impossible" is exactly how the biggest openings stay closed. Sit with the provocation before rejecting it. The most defended assumptions often hide the most significant opportunities.',
                },
                {
                  mistake: 'Confusing real constraints with orthodoxies.',
                  fix: 'Treating a genuine legal or physical limit as a "flippable" assumption wastes effort and discredits the method. Test each one honestly; keep the assumed rules, drop the hard limits. This is a judgment the team has to make, not one the method makes for you.',
                },
                {
                  mistake: 'Stopping at the list.',
                  fix: 'Surfacing orthodoxies without flipping them, or flipping them without carrying the openings into ideation, leaves the method\'s value on the table. The point is the new territory, not the list of walls. Set up How Might We framing immediately after the most promising flips.',
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
            <SectionHeadingLight>Assembling the right room and creating conditions for genuine heresy.</SectionHeadingLight>
            <Body>
              Orthodoxies is a strategic provocation method. It does not require special tools, but it does
              require a specific social condition: genuine permission to question the things that feel most
              obviously true. That permission has to be created deliberately, because the assumptions the
              method targets are the ones the organization has the most invested in not examining.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Assemble a mix of insiders and outsiders',
                  body: 'The single most important practical choice. Insiders know the industry\'s assumptions intimately but cannot see them; outsiders (newcomers, customers, people from adjacent fields) can see them precisely because they have not absorbed them yet. Put both in the room, and give the outsiders real license to ask "why does it have to be that way?" without being dismissed as naive.',
                },
                {
                  label: 'Create psychological safety for heresy',
                  body: 'Challenging "how things are done" can feel like criticizing colleagues or the organization itself. The session needs explicit permission to voice and flip sacred assumptions without it being taken as an attack. Frame it as examining choices, not indicting people. The facilitator\'s job is to protect this frame throughout.',
                },
                {
                  label: 'Prompt for orthodoxies across every dimension',
                  body: 'Do not let the list stay narrow. Deliberately probe assumptions about the business model, pricing, channel, ownership, customer behavior, product format, timing, and who the customer even is. Orthodoxies hide in every dimension, and teams tend to surface only the ones nearest the product, which are rarely the most important.',
                },
                {
                  label: 'Do the flips out loud, together',
                  body: 'The inversion works best as a live, collective act (stating the orthodoxy, flipping it, and exploring the opening as a group) because one person\'s flip sparks another\'s. A simple repeatable prompt: "We all assume X. What if the opposite were true?" Say it aloud, every time.',
                },
                {
                  label: 'Hand off to How Might We while the energy is high',
                  body: 'The best flipped orthodoxies are generative and should flow straight into How Might We framing and ideation, ideally in the same or adjacent session, before the openings cool back into "well, that would never work." The handoff is the method\'s most important practical move.',
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
            <SectionHeadingDark>AI is trained on the industry consensus. Ask it the rules and it hands you the very orthodoxies you were trying to break.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI reinforces the walls by default, and where, aimed
              correctly, it can help name and flip them.
            </p>
            <OrthodoxiesAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same scenario. Two approaches, one escapes the orthodoxies, one recites them.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A team entering the eyewear industry uses an orthodoxies session to find an opening.
              Toggle between the traditional approach and a hypothetical AI-first approach to see what each reveals
              about the industry, and what each misses.
            </p>
            <OrthodoxiesExampleToggle />
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
            <SectionHeadingLight>Where Orthodoxies shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A breakthrough-oriented provocation method, Orthodoxies maps to the early divergent phases where
              teams need to escape default thinking before they frame or solve the problem. It is intentionally
              blank at delivery and optimization phases.
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
              Note: Orthodoxies is a breakthrough-oriented framing provocation. It is intentionally blank at delivery
              and optimization phases; its value is in opening the possibility space before convergence, not in
              refining a direction already chosen.
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
            <SectionHeadingLight>What to combine with Orthodoxies.</SectionHeadingLight>

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
                  note:   'The landmark treatment of breaking industry conventions to create uncontested market space. Kim and Mauborgne\'s strategy canvas and four-actions framework are systematic ways of seeing and challenging the assumptions every competitor shares, making this the closest strategic companion to the orthodoxies method. Their cases show repeatedly that the breakthrough came not from a new technology but from a deliberate refusal to accept the industry\'s settled structure.',
                },
                {
                  title:  'The Innovator\'s Dilemma',
                  author: 'Clayton Christensen',
                  year:   '1997',
                  note:   'On how incumbents\' entrenched assumptions leave them open to disruption. Christensen\'s core argument is that established companies fail not because they do not execute well, but because they execute the assumptions of their current business model so well that they cannot see past them. Disruptors succeed precisely by ignoring those assumptions: a perfect description of what orthodoxies-breaking looks like at the industry level.',
                },
                {
                  title:  'Seeing What Others Don\'t: The Remarkable Ways We Gain Insights',
                  author: 'Gary Klein',
                  year:   '2013',
                  note:   'On the nature of insight and how people come to question what everyone else accepts. Klein\'s research shows that breakthrough insight is not primarily a divergent-thinking skill but a noticing skill: the ability to see something obvious that everyone else has stopped seeing. This makes it the best scientific foundation for the orthodoxies method\'s core move: the act of noticing the water.',
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

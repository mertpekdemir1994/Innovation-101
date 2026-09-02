import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import BBExampleToggle from './BBExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Balanced Breakthrough — Methods — Innovation 101',
}

const BBEstablishing  = dynamic(() => import('./BBEstablishing'),  { ssr: false })
const BBInteractive   = dynamic(() => import('./BBInteractive'),   { ssr: false })
const BBAIReactivated = dynamic(() => import('./BBAIReactivated'), { ssr: false })

const PLUM = '#6B4A77'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Core lens throughout',
    note: 'Desirability, Feasibility, and Viability are the organising framework for Design Thinking as codified by IDEO and the d.school. They are not a checklist applied at the end. They are the three questions that every phase of a Design Thinking process is implicitly trying to answer. Balanced Breakthrough makes that implicit check explicit, ensuring that each lens is genuinely tested rather than assumed.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop / Deliver',
    note: 'In the Double Diamond, Balanced Breakthrough functions as the sign-off lens at the transition from Develop to Deliver. Before committing to building and launching, the team explicitly checks whether the converged concept passes all three lenses, not just Desirability, which the research phase emphasised, but Feasibility (can we execute?) and Viability (will the economics sustain this?). It is the gate that prevents a well-loved concept from becoming an operationally or financially stranded launch.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build-Measure-Learn',
    note: 'The Build-Measure-Learn loop in Lean Startup is fundamentally a mechanism for testing DFV assumptions iteratively. Each loop cycle is a prioritised test of the riskiest assumption across the three lenses: what the Lean Startup calls the Leap-of-Faith assumption. Balanced Breakthrough provides the explicit framework for naming which lens each assumption belongs to, so the team can sequence tests to surface fatal flaws before investment rather than after.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Backlog / Review',
    note: 'In Agile Innovation sprints, the DFV lens surfaces most explicitly at two moments: backlog prioritisation (which items address the riskiest lens?) and sprint review (did the sprint output move one of the three lenses?). Balanced Breakthrough prevents sprint teams from optimising only for Feasibility (what they can build) at the expense of Desirability and Viability checks that require user research and financial modelling rather than code.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'The primary method for filling the Desirability lens with real data. Balanced Breakthrough identifies that Desirability needs to be tested; Concept Testing is the structured method for running that test. The two are sequential: use the DFV framework to name what you need to learn, then use Concept Testing to learn it from real users.',
  },
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    rel: 'Rapid Prototyping tests the Feasibility lens by making the idea tangible and attempting to deliver a version of it. The prototype surfaces operational constraints, capability gaps, and delivery complexity that abstract feasibility assessments miss. A prototype that proves the team can build a version of the thing is one of the strongest feasibility inputs available.',
  },
  {
    slug: 'value-proposition-canvas',
    name: 'Value Proposition Canvas',
    rel: 'Provides depth within the Desirability circle by mapping customer jobs, pains, and gains against the proposed value proposition. Where Balanced Breakthrough asks "do people want this?", the Value Proposition Canvas provides the structured method for answering that question rigorously, making it a natural companion for filling the Desirability lens.',
  },
  {
    slug: 'ten-types-innovation',
    name: '10 Types of Innovation',
    rel: 'Provides depth within the Viability circle by expanding the concept of business model innovation beyond the product itself. A financially unsustainable product idea may become viable through a different profit model, channel structure, or network configuration. The 10 Types framework is a tool for finding viability routes when the obvious model fails.',
  },
  {
    slug: 'ambition-matrix',
    name: 'Ambition Matrix',
    rel: 'A portfolio-level companion: the Ambition Matrix maps ideas by how much change they require across each lens. Balanced Breakthrough operates on individual ideas; the Ambition Matrix places them in relation to one another and to the organisation\'s risk and capability profile. Together they answer both "does this specific idea pass all three lenses?" and "what is the right mix of lens-challenging ideas across the portfolio?"',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function BBPage() {
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
              Balanced Breakthrough
            </h1>

            <p
              className="mb-3 max-w-[640px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              An idea that passes all three lenses simultaneously: Desirability, Feasibility, and
              Viability, the only location in the model where a genuine breakthrough lives.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              An idea that passes two lenses is not a breakthrough. It is a trap with a blind spot, and the one that passes two is usually harder to kill than the one that passes none.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <BBEstablishing />
        </div>
      </DarkSection>

      {/* S3 - What it is LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>What it is</SectionLabel>
            <SectionHeadingLight>Not a checklist. A diagnostic: three overlapping questions that together define the only zone worth building in.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Balanced Breakthrough is the condition that must be true for an innovation idea to be
                worth building: it must be desirable (people genuinely want it), feasible (the organisation
                can reliably deliver it), and viable (the economics work sustainably). These are not three
                independent tests passed one after another. They are three simultaneously active lenses,
                each capable of making an idea unworkable regardless of how strongly the others hold.
                A breakthrough lives only at the centre, where all three overlap.
              </Body>
              <Body>
                The model was developed at IDEO and codified in Design Thinking as the three-circle
                framework that organises human-centred innovation work. Its core insight is that the most
                dangerous ideas are not the ones that fail all three lenses. Those are easy to stop.
                The most expensive ideas are the ones that pass two. An idea that is desirable and
                feasible but not viable will be built with confidence and love, attract real users, and
                then fail when the economics catch up. An idea that is desirable and viable but not
                feasible will be sold, funded, and committed to, and then fail in delivery.
              </Body>
              <Body>
                The three lenses are named for a reason. Desirability is not the same as expressed
                interest or survey approval; it is genuine human need, confirmed through research rather
                than assumed. Feasibility is not theoretical buildability; it is the real operational and
                technical capability of this organisation to deliver this thing consistently. Viability is
                not optimistic projection; it is sustainable unit economics under realistic assumptions.
                The discipline the model demands is applying each lens with honesty, not using it to
                validate a direction the team has already decided to pursue.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S4 - Interactive DARK */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Explore the seven zones. Only one is the breakthrough.</SectionLabel>
            <SectionHeadingDark>Each zone has a name, a failure mode, and an example. The centre is the only place worth building.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click any region of the Venn to see what kind of idea lives there and what happens
              when teams build in that zone without recognising it. Most promising ideas sit in
              one of the overlap zones, not the centre, close enough to feel like breakthroughs,
              far enough to be traps.
            </p>
            <BBInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* S5 - When to deploy LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>When to deploy it</SectionLabel>
            <SectionHeadingLight>Before committing investment. The DFV check is most valuable when the stakes of getting it wrong are still low enough to change direction.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You are evaluating which ideas to take forward from a set of candidates, and need to distinguish genuine opportunities from exciting traps.',
                    'A promising concept is generating momentum and you want to ensure the enthusiasm is not masking a fatal gap in one of the lenses.',
                    'You are preparing to commit resources (funding, headcount, operational capacity) and need to verify that all three lenses are genuinely solid before doing so.',
                    'A cross-functional team needs a shared language for evaluating ideas across their different domains of expertise.',
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
                    'The team treats it as a validation tool rather than a diagnostic one, using it to confirm a direction already decided, not to test it honestly.',
                    'The inputs to each lens are hypothetical rather than evidenced. An assessment run on assumptions alone produces structured-looking conclusions built on nothing.',
                    'The analysis is used to declare an idea a breakthrough before each lens is genuinely tested. Labelling something viable because it is feasible and desirable is the most common way the model fails.',
                    'You need a tool for generating ideas rather than evaluating them: Balanced Breakthrough is an evaluative lens, not an ideation method.',
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
                The honest limit: Balanced Breakthrough is a diagnostic frame, not a decision engine.
                It tells you which zone an idea sits in and what the implication of that zone is.
                It does not tell you whether to stop or reshape, how to bridge a gap, or which trade-off
                to accept. Those decisions require context, organisational judgment, and information
                the model itself cannot provide.
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
            <SectionHeadingLight>Five moves, from naming the idea to identifying precisely where it sits and what to do about it.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Name the idea clearly enough to test it.',
                  body: 'Before checking any lens, the team needs to agree on what the idea actually is, specifically enough that each lens can be applied without ambiguity. A vague idea produces vague lens checks. A clearly stated idea (what is it, for whom, delivered how, at what economics) makes the three questions answerable. Spend time on this before moving to the lenses.',
                },
                {
                  n: '02',
                  title: 'Check Desirability with evidence from real people.',
                  body: 'Desirability is confirmed or denied by real human research, not by assumption, survey approval ratings, or the team\'s intuition about what customers want. It requires direct contact with the people the idea is designed for: observing their behaviour, understanding their unmet needs, and testing whether the proposed idea genuinely addresses something they care about. The Desirability check is weak if the team has not spoken to, or observed, real intended users.',
                },
                {
                  n: '03',
                  title: 'Check Feasibility with operational honesty.',
                  body: 'Feasibility is about what this organisation can actually do, not what is theoretically possible or what comparable organisations have achieved. It requires an honest assessment of current capabilities, the gap to what delivery would require, and the cost and timeline of bridging that gap. Feasibility checks often require input from operations, technology, and people with hands-on delivery experience rather than only from the strategists and designers who conceived the idea.',
                },
                {
                  n: '04',
                  title: 'Check Viability with real financial modelling.',
                  body: 'Viability requires actual unit economics: the real cost to serve, the realistic price ceiling, the volume at which the model works, and the competitive dynamics that affect margin over time. Optimistic projections, analogues from adjacent industries, or "this will work at scale" assumptions do not constitute a viability check. The model must hold at realistic entry scale, not just at a hypothetical future state. If the numbers only work at a scale that is years away, the viability check is not yet passed.',
                },
                {
                  n: '05',
                  title: 'Locate the idea in the Venn and decide what the location means.',
                  body: 'With evidence in each lens, the team can identify which zone the idea occupies. Centre means the idea passes all three and is worth building. Pairwise overlap means a specific lens is missing and the team must decide: is the gap bridgeable (can we acquire the capability, change the model, or shift the price point?), or does it make the idea not viable in this form? Single-circle means the idea is not ready and the team should either radically change direction or stop. The location is diagnostic; the decision is human.',
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
            <SectionHeadingLight>What separates a genuine three-lens check from the appearance of one.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it works well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'Each lens is checked with genuine evidence: real user research for Desirability, operational self-assessment for Feasibility, real unit economics for Viability.',
                'The team includes people who can speak with authority to all three lenses, not just the people who had the idea.',
                'The analysis is used to locate the idea honestly, including when the location is uncomfortable.',
                'When a lens fails, the team treats it as a specific, addressable question ("what would need to be true about the economics for this to work?") rather than as a final verdict.',
                'The tool is applied iteratively as each lens is tested: the picture updates as evidence comes in rather than being set once at the start.',
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
              The failure modes, and how to avoid them
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: 'Using it as a validation tool, not a diagnostic one.',
                  fix: 'The most common failure: the team has already decided to pursue the idea and uses the DFV framework to confirm, not challenge. The lens that is weakest gets the most optimistic treatment. Run the analysis before the team has committed to a direction, or explicitly ask "what would make us stop?" for each lens.',
                },
                {
                  mistake: 'Running the analysis without real inputs.',
                  fix: 'A DFV analysis built on assumptions produces structured-looking conclusions built on nothing. If the research has not been done, the Desirability check is not real. If the financial model has not been built, the Viability check is not real. The framework cannot generate the evidence it requires; it only structures the evidence you already have.',
                },
                {
                  mistake: 'Treating all three lenses as equally certain.',
                  fix: 'Teams often have strong evidence for one or two lenses and much weaker evidence for the third. The analysis should name the confidence level for each lens, not collapse them into a single verdict. "Strong Desirability signal, operational Feasibility confirmed, Viability based on analogues, needs real modelling" is more honest and more useful than a single thumbs-up.',
                },
                {
                  mistake: 'Only including people who designed the idea in the analysis.',
                  fix: 'The Desirability lens is weakened if no one who has spoken to real users is in the room. The Feasibility lens is weakened if no one from operations or delivery is present. The Viability lens is weakened without someone who has built financial models. The DFV check requires cross-functional input by design.',
                },
                {
                  mistake: 'Treating a failed lens as a project-ending verdict.',
                  fix: 'A lens that fails is a specific question: what would need to change for this lens to hold? The answer sometimes leads to a different model, a different price point, a different target user, or a different operational approach. The failure of one lens rarely means the idea is worthless. It means the current form of the idea has a specific gap that needs to be addressed or accepted.',
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
            <SectionHeadingLight>The tool is simple. The inputs are not, and that distinction matters.</SectionHeadingLight>
            <Body>
              Running a DFV analysis requires a cross-functional team that can speak to all three
              lenses, evidence (not assumptions) for each, and enough time to have an honest conversation
              about what the evidence actually says. The framework itself is three questions. The work
              that makes it real is the research, modelling, and operational assessment that must happen
              before, or alongside, the conversation.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Assemble a genuinely cross-functional team',
                  body: 'The Desirability lens needs someone who has done real user research and can speak to what customers actually want. The Feasibility lens needs someone from operations or delivery who understands what the organisation can and cannot do. The Viability lens needs someone with financial and commercial expertise. If any of these voices is missing, one lens will default to assumption.',
                },
                {
                  label: 'Gather evidence before the session, not during it',
                  body: 'The DFV conversation is most productive when the team has real evidence for each lens going in, not when they are constructing the evidence during the session itself. User research, financial modelling, and operational assessment should be done before the DFV discussion, so the session can focus on interpreting what the evidence means rather than generating it from first principles.',
                },
                {
                  label: 'Name the confidence level for each lens explicitly',
                  body: 'Not all lenses will be equally evidenced. Making the confidence level explicit ("we have strong evidence on Desirability, moderate on Feasibility, and Viability is still primarily assumption") keeps the analysis honest and points directly to what needs to be done next. A falsely even presentation of all three lenses hides exactly the work that still needs doing.',
                },
                {
                  label: 'Ask the kill question for each lens',
                  body: 'For each lens, the team should ask: what would make us kill this idea? What result from user research would tell us Desirability is not real? What operational constraint would make Feasibility impossible? What unit economics finding would make Viability unachievable? Pre-defining the kill criteria reduces the risk of motivated reasoning when the results come in.',
                },
                {
                  label: 'Return to the framework as evidence accumulates',
                  body: 'The DFV analysis is not a one-time check. As each lens is tested through research, prototyping, and financial modelling, the picture updates. Teams that run one DFV session and treat it as final are applying the framework incorrectly. The model is most valuable when it is revisited each time a significant piece of evidence changes the picture in any lens.',
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
            <SectionHeadingDark>AI shifts the weight of the three lenses unevenly, and cannot integrate them.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see how AI contributes differently to each of the three
              lenses, most strongly to Viability, moderately to Feasibility, and least
              to Desirability, where the limit of language-based analysis matters most.
              The integrating judgment at the centre remains irreducibly human.
            </p>
            <BBAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* S10 - In-depth example LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>In-depth example</SectionLabel>
            <SectionHeadingLight>The premium cleaning service: a D+F idea that looked like a breakthrough until the numbers arrived.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A founding team runs a rigorous DFV check on a premium on-demand cleaning service
              and discovers the idea sits in the Desirability + Feasibility overlap, not the centre.
              Strong customer love, clear operational feasibility, fatal unit economics.
              Toggle to see what a hypothetical AI-run DFV analysis might produce and why
              the false balance it generates is more dangerous than no analysis at all.
            </p>
            <BBExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* S11 - Frameworks LIGHT */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={PLUM}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Balanced Breakthrough shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              The DFV lens appears at the evaluation and gate moments of the major innovation
              frameworks, when teams need to decide whether a concept is genuinely worth building,
              not just promising. It is the common language across frameworks that otherwise differ
              significantly in their approach and vocabulary.
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
            <SectionHeadingLight>What to pair with Balanced Breakthrough, and where in the DFV model each method operates.</SectionHeadingLight>

            <p className="mb-6"
              style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              Balanced Breakthrough is the integrating lens. The methods below operate within specific
              circles: generating evidence for Desirability, testing Feasibility in practice, or
              mapping the dimensions of Viability. The DFV framework names the question each method
              is answering.
            </p>

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
                  title:  'Change by Design',
                  author: 'Tim Brown',
                  year:   '2009',
                  note:   'Brown\'s account of Design Thinking at IDEO places the Desirability-Feasibility-Viability framework at the centre of human-centred innovation practice. His treatment of the three circles is not a checklist but a dynamic tension: the most interesting work in innovation happens at the intersections and the gaps, and the task of the designer is to navigate toward the centre by understanding why the balance is currently off. Brown\'s framing of the framework as a diagnostic rather than a gate is the account that most clearly captures how the model is meant to function in practice.',
                },
                {
                  title:  'The Innovator\'s Dilemma',
                  author: 'Clayton M. Christensen',
                  year:   '1997',
                  note:   'Christensen\'s account of why good companies fail illuminates the Viability trap in particular: incumbents optimise for the viability of their existing business model, which leaves them blind to desirable new offerings that would undermine that model. The DFV framework, read through Christensen, reveals that Viability is not a single fixed lens. It depends on whose economics you are measuring and over what time horizon. The book is the best account of what happens when the Viability lens is applied only to the existing model and not to the emerging one.',
                },
                {
                  title:  'Ten Types of Innovation',
                  author: 'Larry Keeley, Ryan Pikkel, Brian Quinn, and Helen Walters',
                  year:   '2013',
                  note:   'Keeley and colleagues provide the most systematic treatment of Viability as a multi-dimensional lens. The ten types (spanning profit model, network, structure, process, product performance, product system, service, channel, brand, and customer engagement) show that Viability is not simply "does the product make money?" but a composite of business model dimensions, most of which are not product features at all. Teams using the DFV framework benefit from the Ten Types as a tool for finding Viability routes when the obvious model fails.',
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

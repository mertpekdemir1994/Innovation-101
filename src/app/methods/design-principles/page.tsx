import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import DPEstablishing from './DPEstablishing'
import DPExampleToggle from './DPExampleToggle'
import { SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

const DPInteractive    = dynamic(() => import('./DPInteractive'),    { ssr: false })
const DPAIReactivated  = dynamic(() => import('./DPAIReactivated'),  { ssr: false })

export const metadata: Metadata = {
  title: 'Design Principles — Innovation 101',
  description: 'Pre-committed tradeoffs that decide, in advance, how a team will choose when a hard choice arrives, and what it has agreed to say no to.',
}

const PLUM = '#6B4A77'

// ── Layout primitives ──────────────────────────────────────────────────────

function DarkSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-neutral-950 text-white ${className}`} style={{ '--color-focus-ring': 'var(--color-dark-text)' } as React.CSSProperties}>
      <div className="max-w-content mx-auto px-6 py-24">
        {children}
      </div>
    </section>
  )
}

function LightSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="max-w-content mx-auto px-6 py-24">
        {children}
      </div>
    </section>
  )
}

function Container({ prose = false, children, className = '' }: { prose?: boolean; children: React.ReactNode; className?: string }) {
  return (
    <div className={`${prose ? 'max-w-prose' : 'w-full'}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function DesignPrinciplesPage() {
  return (
    <>
      {/* S1 - Hero (dark) */}
      <DarkSection>
        <Container prose>
          <SectionLabel accent={PLUM} dark>Strategy &amp; Prioritization · Method</SectionLabel>
          <h1 className="font-display font-semibold text-balance mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}>
            Design Principles
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.72)', lineHeight: 'var(--leading-relaxed)' }}>
            Pre-committed tradeoffs that decide, in advance, how a team will choose when a hard choice arrives,
            and what it has agreed to say no to.
          </p>

          <div className="mt-12 flex gap-8 flex-wrap">
            <div>
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(107,74,119,0.60)' }}>Time required</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.70)' }}>
                2–3 hours to derive; revisited when strategy or product stage changes
              </p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(107,74,119,0.60)' }}>Group size</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.70)' }}>
                The team that faces the recurring choices, not representatives, the decision-makers themselves
              </p>
            </div>
          </div>
        </Container>
      </DarkSection>

      {/* S2 - The fork (dark) */}
      <DarkSection>
        <SectionLabel accent={PLUM} dark>The visual</SectionLabel>
        <SectionHeadingDark>A principle is a fork with one branch closed</SectionHeadingDark>
        <div className="max-w-prose mx-auto px-6 md:px-8 mb-10">
          <Body className="mb-6 last:mb-0">
            A design principle is not a value. It is a pre-committed decision about a specific recurring tradeoff,
            made before the hard choice arrives, by the people who will be held to it, with the sacrifice
            explicitly named.
          </Body>
          <Body className="mb-6 last:mb-0">
            Visualised as a fork, the principle sits on the incoming path. At the junction, one branch is taken
            and one branch is closed. The closed branch (the thing the team has agreed to say no to) is the
            point. Without a closed branch, you have not written a principle. You have written a platitude.
          </Body>
        </div>
        <DPEstablishing />
      </DarkSection>

      {/* S3 - The two tests (light) */}
      <LightSection>
        <Container prose className="mx-auto px-6 md:px-8">
          <SectionLabel accent={PLUM}>The tests</SectionLabel>
          <SectionHeadingLight>Two tests: arguability and closure</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            A valid design principle must pass two tests. It must close a branch, and it must be arguable.
            Together, they filter out everything that sounds good but decides nothing.
          </Body>

          <div className="space-y-6 mt-8">
            <div className="rounded-lg p-6" style={{ background: `rgba(107,74,119,0.05)`, border: `1px solid rgba(107,74,119,0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Test 1: closure</p>
              <p className="font-semibold mb-3" style={{ fontSize: 'var(--text-base)', color: PLUM }}>
                Bring a real choice to the fork. Does the principle close one branch?
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                Take the last real disagreement your team had. Apply the principle. Did it decide the question
                unambiguously, or did both routes through the fork remain open? If both remain open, the principle
                is not doing work. It is decoration.
              </p>
            </div>

            <div className="rounded-lg p-6" style={{ background: `rgba(107,74,119,0.05)`, border: `1px solid rgba(107,74,119,0.18)` }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Test 2: arguability</p>
              <p className="font-semibold mb-3" style={{ fontSize: 'var(--text-base)', color: PLUM }}>
                Can a reasonable person argue the opposite and be taken seriously?
              </p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                &ldquo;Be user-centred&rdquo; fails this test: no reasonable person advocates user-hostility. &ldquo;We favour
                speed over configurability, even when power users ask for options&rdquo; passes it: many excellent
                products chose configurability over speed and won. If the opposite cannot be defended, the
                principle is not describing a real choice. It is describing a preference so universal it
                constrains nothing.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-lg p-6" style={{ background: `rgba(245,158,11,0.05)`, border: `1px solid rgba(245,158,11,0.20)` }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.75)' }}>
              The combined test
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              If it passes arguability but fails closure: you have identified the right territory but not yet
              committed to a side. Keep working. If it passes closure but fails arguability: the choice it
              makes is trivially obvious and nobody was going to make the other choice anyway. If it passes
              both: you have a principle.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* S4 - The platitude problem (dark) */}
      <DarkSection>
        <Container prose className="mx-auto px-6 md:px-8">
          <SectionLabel accent={PLUM} dark>The failure mode</SectionLabel>
          <SectionHeadingDark>Why platitudes proliferate</SectionHeadingDark>
          <Body className="mb-6 last:mb-0">
            Platitudes proliferate because they are easy to agree with. A platitude has no enemies. It survives
            every review, because nobody can argue against &ldquo;be user-centred&rdquo; or &ldquo;delight our customers&rdquo; without
            sounding cynical. That is precisely what makes them useless.
          </Body>
          <Body className="mb-6 last:mb-0">
            The mechanism of failure is social. In a workshop, a principle that names a real sacrifice will be
            challenged immediately by everyone whose interests are on the wrong side of the fork. A principle
            that closes nothing faces no such challenge. It gets unanimous agreement, goes on the wall, and
            decides nothing when the next hard choice arrives.
          </Body>
          <Body className="mb-6 last:mb-0">
            The warning sign is unanimous agreement at the moment of writing. If everyone in the room agrees
            with the principle without discussion, check whether it names a sacrifice. If it does not, you have
            written something that costs nothing to agree with, and will give nothing back when you need it.
          </Body>

          <div className="mt-8 rounded-lg p-5"
            style={{ background: 'rgba(107,74,119,0.08)', border: '1px solid rgba(107,74,119,0.22)' }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: 'rgba(107,74,119,0.60)' }}>A useful test in the room</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.70)', lineHeight: 'var(--leading-relaxed)' }}>
              Before the session ends, read each candidate principle aloud and ask: &ldquo;Who in this room would
              argue the opposite?&rdquo; If nobody raises their hand, not because everyone agrees, but because the
              opposite is impossible to defend, you have written a platitude. Try again.
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* S5 - How to derive (light) */}
      <LightSection>
        <Container prose className="mx-auto px-6 md:px-8">
          <SectionLabel accent={PLUM}>Derivation</SectionLabel>
          <SectionHeadingLight>Start from the recurring argument</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            The best source for a design principle is a decision your team keeps making badly, slowly, or
            inconsistently. Not a hypothetical tradeoff someone invents in a workshop, a real argument that
            surfaced three times in the last quarter and never stayed decided.
          </Body>
          <Body className="mb-6 last:mb-0">
            The derivation question is: what is the real tension underneath the repeating argument? Two people
            disagree about a feature. Why, specifically? One believes the product should serve power users. One
            believes it should serve new users. That tension is the principle waiting to be named. The feature
            debate is just the surface.
          </Body>
          <Body className="mb-6 last:mb-0">
            Once the tension is named, the next question is: which side does this team commit to? Not in
            theory, in the next version of the product, given what we know about our users and our strategy.
            That commitment, written with the sacrifice explicitly stated, is the principle.
          </Body>

          <div className="mt-8 space-y-4">
            <div className="rounded-lg p-5" style={{ border: '1px solid rgba(107,74,119,0.18)' }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Step 1</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Collect the last 3–5 decisions your team found difficult, slow, or where the answer kept changing.
                These are the candidates. Do not invent hypothetical tensions.
              </p>
            </div>
            <div className="rounded-lg p-5" style={{ border: '1px solid rgba(107,74,119,0.18)' }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Step 2</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                For each one, ask: what is the underlying tension? Not the surface feature, the competing value
                underneath it. Speed vs. quality. Expert vs. new user. Breadth vs. depth. Name it as a pair.
              </p>
            </div>
            <div className="rounded-lg p-5" style={{ border: '1px solid rgba(107,74,119,0.18)' }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Step 3</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Commit to a side. Write the principle in the form: &ldquo;We [do A], even when [the pressure to do B
                arrives].&rdquo; The second clause names what you are giving up. Without it, you have not committed.
              </p>
            </div>
            <div className="rounded-lg p-5" style={{ border: '1px solid rgba(107,74,119,0.18)' }}>
              <p className="font-mono uppercase tracking-widest mb-2"
                style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Step 4</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                Run both tests. Bring a real scenario to the fork: does it close a branch? Ask the room to
                argue the opposite: does someone genuinely believe the other side? If both pass, you have a
                principle.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S6 - Writing them well (light) */}
      <LightSection>
        <Container prose className="mx-auto px-6 md:px-8">
          <SectionLabel accent={PLUM}>Language</SectionLabel>
          <SectionHeadingLight>&ldquo;Even when&rdquo; is the whole principle</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            The most important words in a design principle are the ones after the comma. &ldquo;We optimise for the
            first-time user&rdquo; is a preference. &ldquo;We optimise for the first-time user, <strong>even at the expense of
            the expert</strong>&rdquo; is a principle. The sacrifice clause is what makes the commitment real.
          </Body>
          <Body className="mb-6 last:mb-0">
            A good formulation names the highest-pressure exception the principle will face (the case that will
            most tempt the team to abandon it) and commits in advance. If the principle would not hold under
            that pressure, it is not a principle. It is a preference that bends.
          </Body>
          <Body className="mb-6 last:mb-0">
            Aim for a single sentence that contains the commitment and the sacrifice. Principles that require two
            sentences to state often contain an unresolved tension in the middle. They are two competing
            principles sharing one slot.
          </Body>

          <div className="mt-8 rounded-lg p-6" style={{ background: 'rgba(107,74,119,0.05)', border: '1px solid rgba(107,74,119,0.18)' }}>
            <p className="font-mono uppercase tracking-widest mb-3"
              style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>The anatomy</p>
            <div className="rounded p-4" style={{ background: 'rgba(107,74,119,0.08)', border: '1px solid rgba(107,74,119,0.20)' }}>
              <p className="font-mono" style={{ fontSize: 'var(--text-sm)', color: PLUM, letterSpacing: '0.02em' }}>
                &ldquo;We favour{' '}
                <span style={{ color: '#fff', background: 'rgba(107,74,119,0.60)', padding: '0 4px', borderRadius: 3 }}>speed</span>
                {' '}over{' '}
                <span style={{ color: 'rgba(245,158,11,0.90)', background: 'rgba(245,158,11,0.10)', padding: '0 4px', borderRadius: 3 }}>configurability</span>
                , even when{' '}
                <span style={{ color: 'rgba(245,158,11,0.90)', background: 'rgba(245,158,11,0.10)', padding: '0 4px', borderRadius: 3 }}>power users ask for options</span>
                .&rdquo;
              </p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>Commitment</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>The branch you take, stated in terms of what you are optimising for</p>
              </div>
              <div>
                <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.75)' }}>Sacrifice</p>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>The branch you close, named explicitly, including the pressure that will test it</p>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S7 - When a principle gets tested (light) */}
      <LightSection>
        <Container prose className="mx-auto px-6 md:px-8">
          <SectionLabel accent={PLUM}>Pressure</SectionLabel>
          <SectionHeadingLight>A principle is tested when the pressure arrives</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            A principle that has never been tested is a hypothesis. You do not know yet whether it is a
            principle or a preference. The test arrives the first time someone influential asks for something
            that is on the wrong side of the fork, and it is compelling.
          </Body>
          <Body className="mb-6 last:mb-0">
            If the principle holds, two things happen: the decision is made faster, because the reasoning was
            done in advance. And the team learns that the principle is real, that they are actually committed
            to what it says, not just to the words on a wall.
          </Body>
          <Body className="mb-6 last:mb-0">
            If the principle does not hold, if the team votes to make an exception, or silently drifts to the
            closed branch, that is also information. It does not mean the principle was wrong. It means either
            the strategy has shifted (update the principle) or the team was not genuinely committed to it in the
            first place (do the harder derivation work again).
          </Body>

          <div className="mt-8 rounded-lg p-5"
            style={{ background: 'rgba(107,74,119,0.05)', border: '1px solid rgba(107,74,119,0.18)' }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>The exception question</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              Every team eventually faces someone who argues &ldquo;this case is different.&rdquo; It usually is, in some
              specific way. The principle does not have to be applied robotically, but it does have to be the
              starting position, and overriding it requires a conscious decision, not just the loudest voice in
              the room. If you find yourself regularly making exceptions, the principle no longer reflects your
              actual commitments. Revisit it.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* S8 - When to revisit (light) */}
      <LightSection>
        <Container prose className="mx-auto px-6 md:px-8">
          <SectionLabel accent={PLUM}>Maintenance</SectionLabel>
          <SectionHeadingLight>Principles have a shelf life</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            A principle written for an early product may be wrong for the same product at scale. &ldquo;Optimise for
            the first-time user&rdquo; is an excellent principle when you are in acquisition mode. It may be the
            wrong principle when your growth is driven by expansion within existing accounts, and experts are
            the ones with the budget.
          </Body>
          <Body className="mb-6 last:mb-0">
            The trigger for revisiting a principle is not elapsed time but changed conditions: a shift in
            business model, a shift in who the primary user is, a shift in competitive position. Revisiting
            does not mean abandoning. It means running the derivation process again and asking whether this
            is still the right side of the fork to commit to.
          </Body>
          <Body className="mb-6 last:mb-0">
            Principles that are never revisited eventually become dogma. The team applies them past the point
            where they are right, because nobody questions what has been on the wall for three years. Schedule
            a deliberate review when major strategy decisions are made, not on a calendar cadence.
          </Body>
        </Container>
      </LightSection>

      {/* S9 - Interactive (dark) */}
      <DarkSection>
        <SectionLabel accent={PLUM} dark>Try it</SectionLabel>
        <SectionHeadingDark>Bring a candidate principle to the fork</SectionHeadingDark>
        <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.62)', lineHeight: 'var(--leading-relaxed)' }}>
          Select one of the five candidates below. Real principles close a branch and pass the arguability test.
          Platitudes close nothing. The fork stays undecided.
        </p>
        <DPInteractive />
      </DarkSection>

      {/* S10 - When to run this (light) */}
      <LightSection>
        <Container prose className="mx-auto px-6 md:px-8">
          <SectionLabel accent={PLUM}>When to use</SectionLabel>
          <SectionHeadingLight>When the same argument keeps coming back</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            Design principles are worth deriving when a team is making the same type of decision repeatedly
            and reaching inconsistent conclusions, or when decisions that should be fast are consuming hours
            of senior time in every planning cycle.
          </Body>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { label: 'Right moment', items: [
                'The same tradeoff keeps surfacing in planning sessions',
                'Different people are making similar decisions differently',
                'The team is scaling and making decisions without the founders',
                'A major product direction is being set and commitments need to be documented',
              ]},
              { label: 'Wrong moment', items: [
                'You have not yet made enough product decisions to know what the real tensions are',
                'Strategy is changing so fast that commitments would be outdated in weeks',
                'The team wants to feel aligned without doing the work of actual alignment',
                'It is used as a substitute for a specific decision that is being avoided',
              ]},
            ].map(col => (
              <div key={col.label} className="rounded-lg p-5" style={{ border: '1px solid rgba(107,74,119,0.18)' }}>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map(item => (
                    <li key={item} className="flex gap-2"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                      <span style={{ color: PLUM, marginTop: 2, flexShrink: 0 }}>-</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-lg p-5"
            style={{ background: 'rgba(107,74,119,0.05)', border: '1px solid rgba(107,74,119,0.18)' }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: PLUM }}>On quantity</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              Most teams need three to five principles, not twenty. Each principle should cover a distinct,
              recurring decision type. If you have ten principles, check whether they are all distinct. Teams
              often generate many statements that collapse onto the same underlying tension, restated in
              different language.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* S11 - AI (light) */}
      <LightSection>
        <SectionLabel accent={PLUM}>AI &amp; this method</SectionLabel>
        <SectionHeadingLight>When AI helps and when it misleads</SectionHeadingLight>
        <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          AI produces polished, balanced principles by design. At the fork, that means both branches
          remain open, the fork is always undecided. Here is where the boundary runs.
        </p>
        <DPAIReactivated />
      </LightSection>

      {/* S12 - Example (light) */}
      <LightSection>
        <SectionLabel accent={PLUM}>Example</SectionLabel>
        <SectionHeadingLight>A product team and a power-user problem</SectionHeadingLight>
        <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          A team faces a recurring argument about configurability. The traditional tab shows the derivation
          method working. The AI tab shows what happens when the process is shortcut, and where AI
          genuinely earns its place.
        </p>
        <DPExampleToggle />
      </LightSection>

      {/* S13 - Framework connections + related methods (light) */}
      <LightSection>
        <SectionLabel accent={PLUM}>Connections</SectionLabel>
        <SectionHeadingLight>Where this sits in the wider work</SectionHeadingLight>

        <div className="grid gap-16 lg:grid-cols-2">

          {/* Framework connections */}
          <div>
            <p className="font-mono uppercase tracking-widest mb-6"
              style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
              Frameworks
            </p>
            <div className="space-y-5">
              {[
                {
                  slug: 'double-diamond',
                  name: 'Double Diamond',
                  phase: 'Define',
                  note: 'Principles derived in the Define phase anchor the Develop phase against feature drift: they are the boundary conditions that govern what the team builds next.',
                },
                {
                  slug: 'design-thinking',
                  name: 'Design Thinking',
                  phase: 'Define / Ideate',
                  note: 'In Design Thinking, the Define phase closes in on a problem statement. Design Principles extend that closure into the solution space: they constrain what counts as a valid answer.',
                },
                {
                  slug: 'design-sprint',
                  name: 'Design Sprint',
                  phase: 'Monday',
                  note: 'Sprints start by agreeing a long-term goal and then mapping the critical path. If design principles already exist, Monday&rsquo;s goal-setting is faster. If they do not, the sprint often surfaces the recurring tensions that become them.',
                },
                {
                  slug: 'agile-innovation',
                  name: 'Agile Innovation',
                  phase: 'Planning / Review',
                  note: 'Principles give the team something stable to plan against and review decisions against: without them, each sprint carries the cost of redeciding the same tradeoffs.',
                },
              ].map(f => (
                <div key={f.slug}>
                  <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                    <Link href={`/framework/${f.slug}`}
                      className="font-semibold hover:underline"
                      style={{ fontSize: 'var(--text-base)', color: PLUM }}>
                      {f.name}
                    </Link>
                    <span className="font-mono uppercase tracking-widest"
                      style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                      {f.phase}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                    dangerouslySetInnerHTML={{ __html: f.note }} />
                </div>
              ))}
            </div>
          </div>

          {/* Related methods */}
          <div>
            <p className="font-mono uppercase tracking-widest mb-6"
              style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
              Related methods
            </p>
            <div className="space-y-5">
              {[
                {
                  slug: 'strategic-choice-cascade',
                  name: 'Strategic Choice Cascade',
                  note: 'The closest sibling. The Cascade answers &ldquo;what will we win at&rdquo; and &ldquo;where will we play.&rdquo; Design Principles answer &ldquo;how will we choose when the choice arrives.&rdquo; Together they form a complete strategic pre-commitment system.',
                },
                {
                  slug: 'balanced-breakthrough',
                  name: 'Balanced Breakthrough',
                  note: 'A design principle can govern which lens gets prioritised when desirability, feasibility, and viability pull against each other. The principle makes explicit which tradeoff the team makes when two lenses conflict.',
                },
                {
                  slug: 'concept-testing',
                  name: 'Concept Testing',
                  note: 'Concept testing surfaces what users actually respond to, which often conflicts with the team&rsquo;s existing commitments. Design principles help the team decide whether to update the principle or resist the pull of a local user preference.',
                },
                {
                  slug: 'orthodoxies',
                  name: 'Orthodoxies',
                  note: 'Orthodoxies surfaces the assumptions the industry treats as given. Design principles can be built by questioning them, a principle that commits against the orthodoxy is often the most consequential and the most contested.',
                },
                {
                  slug: 'ambition-matrix',
                  name: 'Ambition Matrix',
                  note: 'Different innovation horizons require different principles. What is the right principle for a core product may be the wrong one for a new venture. Mapping your portfolio across the matrix surfaces where the same principle needs to hold, and where it does not.',
                },
              ].map(m => (
                <div key={m.slug}>
                  <Link href={`/methods/${m.slug}`}
                    className="font-semibold hover:underline block mb-1"
                    style={{ fontSize: 'var(--text-base)', color: PLUM }}>
                    {m.name}
                  </Link>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
                    dangerouslySetInnerHTML={{ __html: m.note }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom navigation */}
        <div className="mt-20 pt-10 border-t" style={{ borderColor: 'rgba(107,74,119,0.12)' }}>
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                Strategy &amp; Prioritization — Method 8 of 9
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
      </LightSection>
    </>
  )
}

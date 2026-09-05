import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SMEstablishing from './SMEstablishing'
import SMExampleToggle from './SMExampleToggle'
import { SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

const SMInteractive   = dynamic(() => import('./SMInteractive'),   { ssr: false })
const SMAIReactivated = dynamic(() => import('./SMAIReactivated'), { ssr: false })

export const metadata: Metadata = {
  title: 'Systems Mapping · Methods',
  description: 'Modelling the feedback loops, delays, and leverage points that explain why a system keeps producing the same outcome, no matter how many times you fix it.',
}

const TEAL = '#2A6F7A'

function DarkSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-neutral-950 text-white ${className}`} style={{ '--color-focus-ring': 'var(--color-dark-text)' } as React.CSSProperties}>
      <div className="max-w-content mx-auto px-6 py-24">{children}</div>
    </section>
  )
}

function LightSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`bg-white ${className}`}>
      <div className="max-w-content mx-auto px-6 py-24">{children}</div>
    </section>
  )
}

function Container({ prose = false, children, className = '' }: { prose?: boolean; children: React.ReactNode; className?: string }) {
  return <div className={`${prose ? 'max-w-prose' : 'w-full'}${className ? ` ${className}` : ''}`}>{children}</div>
}

export default function SystemsMappingPage() {
  return (
    <>
      {/* S1 - Hero (dark) */}
      <DarkSection>
        <Container prose>
          <SectionLabel accent={TEAL} dark>Experience &amp; Systems Mapping · Method</SectionLabel>
          <h1 className="font-display font-semibold text-balance mb-5"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}>
            Systems Mapping
          </h1>
          <p style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.72)', lineHeight: 'var(--leading-relaxed)' }}>
            Modelling the feedback loops, delays, and leverage points that explain why a system keeps
            producing the same outcome, no matter how many times you fix it.
          </p>

          <div className="mt-12 flex gap-8 flex-wrap">
            <div>
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(42,111,122,0.60)' }}>Time required</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.70)' }}>
                Several sessions with the people inside the system; days to weeks, not hours
              </p>
            </div>
            <div>
              <p className="font-mono uppercase tracking-widest mb-1"
                style={{ fontSize: 'var(--text-2xs)', color: 'rgba(42,111,122,0.60)' }}>Group size</p>
              <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(255,255,255,0.70)' }}>
                The team inside the system: people who know what actually happens, not what is written down
              </p>
            </div>
          </div>
        </Container>
      </DarkSection>

      {/* S2 - Establishing visual (dark) */}
      <DarkSection>
        <SectionLabel accent={TEAL} dark>The visual</SectionLabel>
        <SectionHeadingDark>Two loops. One explains why it always comes back.</SectionHeadingDark>
        <div className="max-w-prose mb-10">
          <Body className="mb-6 last:mb-0">
            A systems map contains VARIABLES that rise and fall and CAUSAL ARROWS showing what drives
            what. The arrows form CLOSED LOOPS, and this is what makes a systems map different from
            every other map on this site. A loop can feed itself, amplify itself, or resist change and
            restore a previous state. An ecosystem map shows who is in the system; a systems map shows
            why the system keeps doing what it does.
          </Body>
          <Body className="mb-6 last:mb-0">
            The diagram below shows two loops. The REINFORCING loop on the left amplifies: once
            running, it runs away. The BALANCING loop on the right resists: it absorbs interventions
            and restores the previous state. The DELAY on the cross-arrow is why nobody connects cause
            to symptom. The LEVERAGE POINT glows far from where the pain is felt.
          </Body>
        </div>
        <SMEstablishing />
      </DarkSection>

      {/* S3 - What it is (light) */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={TEAL}>What it is</SectionLabel>
          <SectionHeadingLight>A model of why, not a picture of who</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            Systems mapping models why a system behaves the way it does, and why it keeps doing it.
            Where every other mapping method produces a picture of an arrangement (who is connected
            to whom, what sits beneath a moment, how many paths there are) a systems map is a model
            of a DYNAMIC: it has time and causality in it, and it explains behavior rather than
            describing structure.
          </Body>
          <Body className="mb-6 last:mb-0">
            Its raw material is three things. FEEDBACK LOOPS are closed causal chains where an effect
            comes back around to influence its own cause. REINFORCING loops amplify: success breeds
            success, or decline breeds decline, and once running they run away. BALANCING loops resist:
            they pull the system back toward equilibrium, and they are the reason your intervention
            seemed to work and then quietly stopped working.
          </Body>
          <Body className="mb-6 last:mb-0">
            DELAYS are the gaps between a cause and its visible symptom, and they are the single
            greatest source of confident, wrong action, because when the delay is long enough, nobody
            connects the two. LEVERAGE POINTS are the places where a small change produces a large
            effect, which are reliably NOT where the pain is felt, and not where everyone is already
            pushing.
          </Body>

          <div className="mt-8 rounded-lg p-6"
            style={{ background: `rgba(42,111,122,0.05)`, border: `1px solid rgba(42,111,122,0.18)` }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: TEAL }}>The core teaching</p>
            <p className="font-semibold mb-2"
              style={{ fontSize: 'var(--text-base)', color: TEAL }}>
              You cannot fix a system by attacking the symptom.
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              If a problem keeps returning after you solve it, you did not solve it. You disturbed a
              system whose structure produces that problem, and the structure recovered. Systems push
              back: the harder you push on the symptom, the harder the balancing loops push back. This
              is so reliable it has a name: policy resistance. The recurring problem is not evidence that
              people are not trying hard enough. It is evidence that the structure is intact.
            </p>
          </div>

          <div className="mt-6 rounded-lg p-5"
            style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.18)' }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.75)' }}>
              The boundary with Ecosystem Mapping
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              An ecosystem map can show you a bottleneck. Only a systems map can tell you the bottleneck
              REGENERATES, every time you clear it, because a balancing loop restores it. Ecosystem
              mapping asks how the system is connected. Systems mapping asks why it keeps doing what it
              does. They are the cast and the wiring versus the physics.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* S4 - Interactive (dark) */}
      <DarkSection>
        <SectionLabel accent={TEAL} dark>Try it</SectionLabel>
        <SectionHeadingDark>Fix the symptom. Watch the system put it back. Then find the leverage.</SectionHeadingDark>
        <p className="max-w-prose mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.62)', lineHeight: 'var(--leading-relaxed)' }}>
          The same two interventions, in the same system. One is what most organizations do, forever.
          One is what actually changes the outcome. The contrast is the whole point.
        </p>
        <SMInteractive />
      </DarkSection>

      {/* S5 - When to deploy (light) */}
      <LightSection>
        <Container>
          <SectionLabel accent={TEAL}>When to deploy</SectionLabel>
          <SectionHeadingLight>The signature symptom is a problem that keeps coming back</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            Systems mapping is worth the trouble when something specific is happening: a problem that
            returns after being solved, repeatedly, by competent people. That pattern is almost always
            structural, and structure is what this method finds.
          </Body>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { label: 'Right moment', items: [
                'A problem keeps returning after being solved, this has happened more than twice',
                'Interventions seem to work and then quietly stop working, or make things worse elsewhere',
                'Cause and effect appear unrelated, or separated by long stretches of time',
                'Everyone is already pushing hard on the obvious lever and nothing is moving',
              ]},
              { label: 'Wrong moment', items: [
                'The problem is genuinely simple and linear, not everything is a system',
                'You need to know who is in the system and what flows between them (use Ecosystem Mapping first)',
                'The organization will not act on a counterintuitive answer, the leverage point is always uncomfortable',
                'You need an answer this week, building an honest model requires the people inside the system, and that takes time',
              ]},
            ].map(col => (
              <div key={col.label} className="rounded-lg p-5"
                style={{ border: '1px solid rgba(42,111,122,0.18)' }}>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: TEAL }}>{col.label}</p>
                <ul className="space-y-2">
                  {col.items.map(item => (
                    <li key={item} className="flex gap-2"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                      <span style={{ color: TEAL, marginTop: 2, flexShrink: 0 }}>&middot;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="max-w-prose mt-8 rounded-lg p-5"
            style={{ background: 'rgba(42,111,122,0.05)', border: '1px solid rgba(42,111,122,0.18)' }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: TEAL }}>The honest limit</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              A systems map is a model, and every model is wrong in some way that matters. Its loops are
              hypotheses about causality, not measurements of it, and a confident, elegant diagram of
              the wrong loops is one of the most persuasive ways to justify an intervention that cannot
              work. Hold it loosely, test its predictions against history, and be willing to redraw it.
              The method&rsquo;s other limit is political: the real loops in an organization are frequently
              ones nobody wants to name out loud, because naming them implicates someone.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* S6 - How it works (light) */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={TEAL}>How it works</SectionLabel>
          <SectionHeadingLight>Build the model from the recurring behavior outward</SectionHeadingLight>

          <div className="space-y-4 mt-4">
            {[
              { step: '1', label: 'Start from the recurring behavior, not the incident', body: 'Name the pattern that keeps happening. A systems map explains behavior over time, so it needs behavior over time as its subject: not the latest sprint, the pattern across the last year.' },
              { step: '2', label: 'Identify the variables that actually move', body: 'Find the things that go up and down: workload, quality, trust, headcount, backlog, morale, technical debt. A variable is something with a level; if it cannot rise or fall, it does not belong on this map.' },
              { step: '3', label: 'Draw the causal arrows honestly', body: 'For each pair, ask what genuinely drives what, and whether it strengthens or weakens. This is where most of the argument lives: teams routinely discover here that they disagree profoundly about what causes what. The argument is the work.' },
              { step: '4', label: 'Close the loops, and name them', body: 'Follow the arrows until they come back around. A chain that does not close is not a feedback loop; it is a line, and lines do not explain recurring behavior. Then classify: REINFORCING (amplifying) or BALANCING (resisting)? The balancing loops are usually where the mystery lives.' },
              { step: '5', label: 'Mark the delays, especially the long ones', body: 'Wherever a cause takes time to produce its symptom, mark it. Long delays are why organizations misattribute causes; finding one often explains an entire history of confident, failed interventions.' },
              { step: '6', label: 'Find the leverage point', body: 'Look for where a small structural change would alter the loops themselves, rather than fighting their output. It is reliably not where the pain is, and often something unglamorous or politically awkward, which is why nobody has done it.' },
              { step: '7', label: 'Test the model against history', body: 'Ask what the map predicts about the past. If these loops are real, the organization should have already seen X. If the model cannot explain history you already have, it is wrong, and far better to find that out now.' },
            ].map(({ step, label, body }) => (
              <div key={step} className="rounded-lg p-5"
                style={{ border: '1px solid rgba(42,111,122,0.18)' }}>
                <div className="flex gap-4 mb-2">
                  <span className="font-mono font-semibold flex-shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: TEAL }}>{step}</span>
                  <p className="font-semibold"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>{label}</p>
                </div>
                <p className="ml-8"
                  style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S7 - Best practices (light) */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={TEAL}>Best practices</SectionLabel>
          <SectionHeadingLight>What good looks like, and the mistakes</SectionHeadingLight>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg p-5"
              style={{ background: 'rgba(42,111,122,0.05)', border: '1px solid rgba(42,111,122,0.18)' }}>
              <p className="font-mono uppercase tracking-widest mb-3"
                style={{ fontSize: 'var(--text-2xs)', color: TEAL }}>When it goes well</p>
              <ul className="space-y-2">
                {[
                  'The subject is a recurring behavior, not a single incident',
                  'The loops actually CLOSE, and each is classified as reinforcing or balancing',
                  'DELAYS are marked, especially the long ones that have disguised causality for years',
                  'The leverage point is somewhere structurally distant from the pain, and the team is prepared to act there',
                  'The model is tested against history: if these loops are real, we should already have seen X',
                  'The map is held loosely as a hypothesis about causality, and redrawn when it fails',
                ].map(item => (
                  <li key={item} className="flex gap-2"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    <span style={{ color: TEAL, flexShrink: 0 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {[
              { mistake: 'Drawing lines instead of loops', fix: 'A causal chain that does not come back around cannot explain a recurring problem. If nothing closes, you have drawn a flowchart, not a system.' },
              { mistake: 'Attacking the symptom anyway', fix: 'The most common outcome of a systems map is that the organization understands the structure and then goes and pushes harder on the symptom anyway, because that is what looks decisive. The balancing loop will absorb it, as it always has.' },
              { mistake: 'Ignoring the delays', fix: 'Unmarked delays are how a team confidently attributes today\'s symptom to last week\'s cause. Finding the delay is often the whole insight.' },
              { mistake: 'Mistaking it for an ecosystem map', fix: 'If your diagram is actors and value flows, you have drawn an ecosystem map with circular arrows. Systems maps contain VARIABLES that rise and fall, not actors.' },
              { mistake: 'Believing the model', fix: 'An elegant diagram of the wrong loops is powerfully persuasive and will justify an intervention that cannot work. Test predictions before acting on them.' },
              { mistake: 'Avoiding the loops nobody wants to name', fix: 'The real dynamics are often political and implicate people in the room. A map that includes only the comfortable loops explains nothing, because the uncomfortable ones are usually the load-bearing ones.' },
            ].map(({ mistake, fix }) => (
              <div key={mistake} className="rounded-lg p-5"
                style={{ border: '1px solid rgba(245,158,11,0.18)' }}>
                <p className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: 'rgba(245,158,11,0.70)' }}>
                  Mistake: {mistake}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  {fix}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S8 - Logistics (light) */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={TEAL}>Logistics</SectionLabel>
          <SectionHeadingLight>Build it with the people inside, and expect argument</SectionHeadingLight>
          <Body className="mb-6 last:mb-0">
            The causal arrows are where teams discover they disagree profoundly about what drives what.
            That disagreement is not an obstacle to the method; it IS the method. Surface it. A map
            produced by one analyst in isolation records one person&rsquo;s theory.
          </Body>
          <Body className="mb-6 last:mb-0">
            Go looking for the loops nobody has written down. The documented causality is the
            organization&rsquo;s official story about itself, and it is usually the story that has already
            failed to fix the problem. The real loops are found by asking people what actually happens,
            and by watching.
          </Body>
          <Body className="mb-6 last:mb-0">
            Keep it small enough to be readable. A diagram with forty variables explains nothing to
            anyone. Find the handful of variables and the two or three loops that genuinely drive the
            behavior. If the map is not legible on one page, it is not a model; it is a mural.
          </Body>
          <Body className="mb-6 last:mb-0">
            Mark delays explicitly and estimate them roughly. &ldquo;Months&rdquo; versus &ldquo;years&rdquo; changes
            everything about what the map means. A delay long enough to outlast the average tenure in
            a role will never be attributed correctly by the people in it. Common mapping tools include
            whiteboards, digital canvases (Miro, MURAL), and network-specific tools like Kumu, named
            as common examples, not endorsements.
          </Body>
        </Container>
      </LightSection>

      {/* S9 - AI (dark) */}
      <DarkSection>
        <SectionLabel accent={TEAL} dark>AI &amp; this method</SectionLabel>
        <SectionHeadingDark>AI draws the elegant version of the loops that have already failed</SectionHeadingDark>
        <p className="max-w-prose mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.62)', lineHeight: 'var(--leading-relaxed)' }}>
          Toggle between the complete model and the AI-generated map. The contrast shows where AI
          genuinely helps, and why a confident diagram of the wrong loops is the most dangerous
          artifact the method can produce.
        </p>
        <SMAIReactivated />
      </DarkSection>

      {/* S10 - Example (light) */}
      <LightSection>
        <SectionLabel accent={TEAL}>Example</SectionLabel>
        <SectionHeadingLight>A quality problem that three leaders could not fix</SectionHeadingLight>
        <p className="max-w-prose mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
          The traditional tab shows the two loops that explain two years of failure: the obvious
          balancing loop everyone knew and the reinforcing loop nobody had named. The AI tab shows
          what happens when the model is built from the description alone.
        </p>
        <SMExampleToggle />
      </LightSection>

      {/* S11 - Framework connections (light) */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={TEAL}>Frameworks</SectionLabel>
          <SectionHeadingLight>Where this sits in the wider process</SectionHeadingLight>

          <div className="space-y-5 mt-4">
            {[
              {
                slug: 'double-diamond',
                name: 'Double Diamond',
                phase: 'Pre-diamond / Discover',
                note: 'The 2019 Double Diamond explicitly added a pre-diamond systems-mapping step: mapping actors, relationships, feedback loops, leverage points, and unintended consequences of potential interventions BEFORE entering the first diamond. This is a strong, deliberate link; the framework content names it directly.',
              },
              {
                slug: 'design-thinking',
                name: 'Design Thinking',
                phase: 'Empathize / Define',
                note: 'In Design Thinking, empathy typically means understanding one person\'s experience. Systems mapping extends that to understanding the structural forces producing the problem, not just the felt experience, but the dynamics that explain why the felt experience keeps happening.',
              },
              {
                slug: 'fde',
                name: 'Forward Deployed Engineering',
                phase: 'Opportunity identification',
                note: 'Structural dynamics are where durable opportunity, and durable failure, actually live. Understanding why a customer\'s system keeps producing the same problem is often what distinguishes a transformative engagement from a feature addition.',
              },
              {
                slug: 'agile-innovation',
                name: 'Agile Innovation',
                phase: 'Retrospective',
                note: 'Why does the same impediment keep returning, sprint after sprint, after being resolved in multiple retros? If the answer is not obvious, a systems map is the right next step: the impediment is probably structural, and its cause is probably not where the team is looking.',
              },
            ].map(f => (
              <div key={f.slug}>
                <div className="flex items-baseline gap-3 mb-1 flex-wrap">
                  <Link href={`/framework/${f.slug}`}
                    className="font-semibold hover:underline"
                    style={{ fontSize: 'var(--text-base)', color: TEAL }}>
                    {f.name}
                  </Link>
                  <span className="font-mono uppercase tracking-widest"
                    style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                    {f.phase}
                  </span>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  {f.note}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S12 - Related methods (light) */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={TEAL}>Related methods</SectionLabel>
          <SectionHeadingLight>How Systems Mapping connects to the wider taxonomy</SectionHeadingLight>

          <div className="space-y-5 mt-4">
            {[
              {
                slug: 'ecosystem-mapping',
                name: 'Ecosystem Mapping',
                note: 'The reciprocal pair, and the distinction this page most needs to hold. An ecosystem map shows STRUCTURE: the actors and value flows: a picture of how the system is CONNECTED. A systems map models BEHAVIOR OVER TIME: the feedback loops, delays, and leverage points that explain why the system keeps producing the same outcome. Ecosystem is the cast and the wiring; systems is the physics. Ecosystem mapping usually comes first. Reach for systems mapping when a behavior is stubborn and recurring and nobody can work out why.',
              },
              {
                slug: 'service-blueprinting',
                name: 'Service Blueprinting',
                note: 'A different axis entirely, no overlap. A blueprint works in DEPTH: the layers beneath a moment in a journey. It explains why a MOMENT fails. A systems map works in CAUSALITY OVER TIME. It explains why the PROBLEM COMES BACK.',
              },
              {
                slug: 'flow-mapping',
                name: 'Flow Mapping',
                note: 'A different axis (BRANCHING: the paths through a thing), and a shared blind spot worth knowing. Like the real flow of a process, a system\'s real feedback loops are UNDOCUMENTED, and both methods find the truth by asking and watching the people inside, not by reading what is written down.',
              },
              {
                slug: 'orthodoxies',
                name: 'Orthodoxies',
                note: 'A natural companion. The balancing loops that defeat your interventions are frequently held in place by unexamined beliefs about how things must be done. Systems mapping finds the structure; Orthodoxies finds the belief holding the structure in place.',
              },
              {
                slug: 'assumption-mapping',
                name: 'Assumption Mapping',
                note: 'Downstream. A systems map produces a hypothesis about causality and a proposed leverage point, and both are assumptions. Treat the leverage point as a leap-of-faith assumption and test it before betting the organization on it.',
              },
            ].map(m => (
              <div key={m.slug}>
                <Link href={`/methods/${m.slug}`}
                  className="font-semibold hover:underline block mb-1"
                  style={{ fontSize: 'var(--text-base)', color: TEAL }}>
                  {m.name}
                </Link>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  {m.note}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </LightSection>

      {/* S13 - Sources (light) */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={TEAL}>Sources &amp; further reading</SectionLabel>
          <SectionHeadingLight>Where to go deeper</SectionHeadingLight>

          <div className="space-y-4 mt-4">
            {[
              { title: 'Thinking in Systems', author: 'Donella Meadows', year: '2008', note: 'The essential and most readable introduction to feedback loops, delays, and leverage points, and the source of the leverage-point insight this page is built around.' },
              { title: 'The Fifth Discipline', author: 'Peter Senge', year: '1990', note: 'For systems thinking in organizations, and the archetypes (including "fixes that fail" and "shifting the burden") that describe most recurring corporate problems.' },
              { title: 'Systems Thinking for Social Change', author: 'David Peter Stroh', year: '2015', note: 'A practical guide to building causal loop maps with the people inside the system, and to navigating the political reality that the real loops are often ones nobody wants to name.' },
            ].map(b => (
              <div key={b.title} className="rounded-lg p-5"
                style={{ border: '1px solid rgba(42,111,122,0.18)' }}>
                <p className="font-semibold mb-1"
                  style={{ fontSize: 'var(--text-base)', color: TEAL }}>
                  {b.title}
                </p>
                <p className="font-mono mb-2"
                  style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
                  {b.author} · {b.year}
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                  {b.note}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom navigation */}
          <div className="mt-20 pt-10 border-t" style={{ borderColor: 'rgba(42,111,122,0.12)' }}>
            <div className="flex items-center justify-between flex-wrap gap-6">
              <div>
                <p className="font-mono uppercase tracking-widest mb-1"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                  Experience &amp; Systems Mapping — Method 6 of 6
                </p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                  40 methods across 6 stage groups
                </p>
              </div>
              <Link href="/methods"
                className="font-semibold hover:underline"
                style={{ fontSize: 'var(--text-base)', color: TEAL }}>
                All methods →
              </Link>
            </div>
          </div>
        </Container>
      </LightSection>
    </>
  )
}

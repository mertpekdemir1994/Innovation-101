import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SMInteractive from './SMInteractive'
import SMExampleToggle from './SMExampleToggle'
import SMAIReactivated from './SMAIReactivated'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Stakeholder Mapping — Methods — Innovation 101',
}

const SMEstablishing = dynamic(() => import('./SMEstablishing'), { ssr: false })

const SAGE = '#3D6B5A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Discover',
    note: 'The Discover phase generates insight by talking to people, but which people? Without a stakeholder map, teams default to interviewing the most accessible or most obvious users, missing the indirect recipients, hidden blockers, and community advocates who often hold the most reframing information. The map defines the research cast before the research begins.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Monday',
    note: 'Monday in a Design Sprint maps the problem, sets the target, and hears from experts. A stakeholder map done before or at the start of Monday ensures the sprint invites the right experts, including those whose opposition, if unaddressed, could sink the solution before Thursday. A sprint that only hears from obvious stakeholders will often miss the constraint that the final solution needs to clear.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'The Discovery Sprint establishes the research agenda for an Agile Innovation engagement. A stakeholder map at this stage identifies who the team needs access to, who has the power to approve or block the solution, and who holds context no one in the core team has yet seen. Without it, the Discovery Sprint risks researching the most accessible people, not the most relevant ones.',
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
    rel: 'A related but different altitude: Stakeholder Mapping identifies who has a stake in a specific problem or solution and characterises their power, interest, attitude, and influence. Ecosystem Mapping charts the whole system of actors around a market or domain: organisations, people, flows of value, and the relationships between them. Stakeholders are a subset of ecosystem actors. Use stakeholder mapping to direct your research; use ecosystem mapping to understand the system your solution lives in.',
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'Stakeholder mapping determines WHO to interview; in-depth interviews determine HOW to extract insight from those people. These two methods work in sequence: the map defines the full cast of people the team needs to understand, and then IDI provides the structured practice for going deep with each of them. Running IDIs without first mapping the stakeholders risks systematic gaps: certain perspectives are never researched, and no one notices until implementation stalls.',
  },
  {
    slug: 'contextual-observation',
    name: 'Contextual Observation',
    rel: 'Another research-method pairing: stakeholder mapping identifies whose practice to observe; contextual observation provides the method for observing it. The non-obvious stakeholders surfaced by a thorough mapping session are often the most valuable to observe in context, because their practice, not their stated preferences, reveals the constraints and needs that conventional research misses.',
  },
  {
    slug: 'orthodoxies',
    name: 'Orthodoxies',
    rel: 'Stakeholder mapping can surface an orthodoxy: the standard list of stakeholders that every similar project has always included, and never questioned. Applying Orthodoxies to the map means asking which roles are assumed because they always appear rather than because they are always relevant, and which non-obvious actors are consistently absent from the standard list for no good reason. The non-obvious stakeholders are often the orthodoxy challenge.',
  },
  {
    slug: 'journey-mapping',
    name: 'Journey Mapping',
    rel: 'Stakeholder mapping identifies whose journey is worth mapping; journey mapping traces what that journey looks and feels like. For complex services with multiple actor types (the patient and the nurse and the administrator) you need a stakeholder map to decide whose journey to prioritise, before investing in the detailed journey work. A journey map without a stakeholder map often defaults to the most obvious actor and misses the supporting cast whose experience determines whether the service works.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SMPage() {
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
              Stakeholder Mapping
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Identifying everyone who has a stake in a problem, and characterising each by their power,
              interest, and attitude, so you research the right range of people and engage each one well.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The team that only researches the obvious stakeholders will always be surprised by the non-obvious ones, usually at the moment they matter most.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <SMEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>What it is</SectionLabel>
            <SectionHeadingLight>Not a list of who to consult. A cast of everyone whose behaviour, needs, or opposition shapes what a solution must do.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Stakeholder Mapping is the process of identifying every person or group with a stake in
                the problem a team is trying to solve, and characterising each by their power over the
                outcome, their interest in it, their current attitude toward it, and their influence over
                others. The result is a structured cast of actors that the team uses to guide who to
                research, who to engage, and who needs to be managed or addressed before a solution can
                actually reach the people it was designed for.
              </Body>
              <Body>
                It is easy to mistake for a reporting or communication exercise: a list of who will
                be told about the work. That misreads it entirely. Its purpose is research and strategy:
                to ensure the team understands the full range of people and organisations who will shape
                the problem, use the solution, resist the change, or feel its effects downstream. A
                stakeholder map that only names the obvious actors (the direct users, the decision
                makers, the budget holders) is incomplete. The most important stakeholder in a
                project is frequently the one no one in the initial team thought to list.
              </Body>
              <Body>
                The four attributes (power, interest, attitude, and influence) are not fixed.
                They are a snapshot that must be updated as the work progresses and as the team learns
                more. A stakeholder who appears neutral at the start of a project can become a blocker
                when their informal authority is threatened. A downstream-affected group who seemed
                irrelevant can turn out to be the strongest signal of whether the solution is right.
                The map is a living research tool, not a project management diagram.
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
            <SectionLabel accent={SAGE}>Sort the cast. Change the priority order.</SectionLabel>
            <SectionHeadingDark>The same eight stakeholders reveal completely different research priorities when sorted by different attributes.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Sort by power &times; interest to see who needs the most active management.
              Sort by attitude to see who to mobilise and who to plan around.
              Sort by influence to see whose opinion others will follow.
              Click any card to see what makes this stakeholder matter.
            </p>
            <SMInteractive />
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
            <SectionHeadingLight>For defining who to research. For planning who to engage. For surfacing hidden resistance before it surfaces itself.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: SAGE }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You are beginning a research phase and need to decide who the team must understand before designing anything.',
                    'You need to plan engagement: who to involve closely, who to keep informed, who to satisfy, and who to monitor.',
                    'A previous initiative failed or stalled late in implementation and you suspect a stakeholder who was never adequately engaged.',
                    'The solution requires behaviour change from people who did not choose the change, and you need to understand who will resist and why.',
                    'You are entering an unfamiliar domain and need to build a picture of whose knowledge, approval, and cooperation the work depends on.',
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
                    'You would use it only as a project communication plan: listing who to send updates to. That is stakeholder management, not stakeholder mapping. The method\'s value is in research coverage, not comms logistics.',
                    'You treat it as fixed. Stakeholder maps decay; as the work progresses and relationships become clearer, the map must be updated. A map that was correct at week one may be badly wrong by week six.',
                    'You use it to confirm the cast you already had in mind. The value is in the non-obvious stakeholders the facilitated session surfaces, not in documenting the obvious ones.',
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
                The honest limit: a stakeholder map is only as good as the session that produces it. A map
                built by one person at a desk will reflect one person&rsquo;s field of view. A map built by a
                cross-functional team in a facilitated session, where each person is asked to challenge and
                extend the list, reliably surfaces people that no individual team member would have named
                alone. The session design matters as much as the framework.
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
            <SectionHeadingLight>Seven moves, from an initial list to a living research and engagement plan.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Start with who is already in the room, then push past them.',
                  body: 'Begin by listing the stakeholders the team already knows: the direct users, the decision makers, the budget holders. This is the minimum viable cast. The method\'s real work starts next: systematically push the list past the obvious. Who is affected downstream? Who has informal influence that doesn\'t appear on an org chart? Who has historically opposed similar initiatives and is likely to do so again? Who has context no one on the team currently has?',
                },
                {
                  n: '02',
                  title: 'Characterise each stakeholder by four attributes.',
                  body: 'Assign each stakeholder a reading on power (their ability to advance or block the outcome), interest (how much they care about the problem or solution), attitude (supporter, neutral, or blocker), and influence (their ability to shape others\' opinions). These are working hypotheses, not facts; they should be revised as the team learns more. They exist to structure the prioritisation, not to categorise people permanently.',
                },
                {
                  n: '03',
                  title: 'Sort the cast to reveal priority and risk.',
                  body: 'Map the cast onto a power-interest grid: high-power, high-interest stakeholders need the most active engagement; high-power, low-interest stakeholders need to be kept satisfied; low-power, high-interest stakeholders need to be kept informed. Separately, surface the blockers and plan around them. Surface the high-influence stakeholders and understand who listens to them.',
                },
                {
                  n: '04',
                  title: 'Design a research plan from the map.',
                  body: 'Use the map to decide who the team needs to understand deeply, not just consult. The most valuable research subjects are often the stakeholders who are non-obvious, who have high interest but low formal power, or who are downstream recipients whose experience reveals systemic failure. Do not only research the most powerful or most available stakeholders; that produces a map of what the loudest voices think, not what the problem actually is.',
                },
                {
                  n: '05',
                  title: 'Design an engagement plan from the map.',
                  body: 'Plan specifically: how to involve high-priority stakeholders, how to keep others informed without consuming their attention unnecessarily, and how to surface and address blockers before they can act. The plan should name real next steps (who talks to whom, by when) not describe a communication philosophy.',
                },
                {
                  n: '06',
                  title: 'Revisit the map as the work progresses.',
                  body: 'Stakeholder relationships shift. A neutral middle manager can become an active blocker when they understand what the project actually implies for their team. A downstream-affected community can become an active advocate when they are meaningfully involved. The map should be reviewed at each major phase gate, not archived after the first session.',
                },
                {
                  n: '07',
                  title: 'Treat non-obvious stakeholders as primary, not secondary.',
                  body: 'The most common and most consequential error in stakeholder mapping is relegating the non-obvious actors to a "secondary considerations" footnote. The stakeholders who are not obviously relevant are often the ones who reveal the most important constraint, the most important unmet need, or the most important implementation risk. Treat them as research priorities, not as edge cases.',
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
            <SectionHeadingLight>What separates a map that changes the research plan from one that documents the obvious.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The session is cross-functional: different team members see different stakeholders, and the combination consistently surfaces actors no individual would have named alone.',
                'The facilitation actively pushes past the obvious, asking "who else?" at every step until the cast genuinely surprises the room.',
                'Non-obvious stakeholders are treated as research priorities, not secondary considerations. They are in the research plan, not the footnote.',
                'The map is treated as a hypothesis, not a fact. Each stakeholder\'s attributes are provisional and revisited as the team learns more.',
                'The engagement plan that follows is specific: who speaks to which stakeholder, by what method, and by when.',
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
                  mistake: 'Stopping at the obvious cast.',
                  fix: 'Listing only the well-known direct users, decision makers, and budget holders produces a map of the people the team was already aware of. The method\'s value is in discovering who else matters. A session that does not surprise the room has not been pushed far enough.',
                },
                {
                  mistake: 'Building the map in isolation.',
                  fix: 'A map built by one person reflects one person\'s field of view. The cross-functional facilitated session is not optional; it is the mechanism for aggregating knowledge that no single team member has. Different functions see different actors, and the combination reliably surfaces what any individual would miss.',
                },
                {
                  mistake: 'Treating blockers as people to avoid.',
                  fix: 'A stakeholder with a blocking attitude is an early warning, not a threat to be ignored. The goal is to understand why they are opposed (what fear, incentive, or genuine concern drives the resistance) and address it before implementation begins. Blockers who are not engaged become the reason good solutions fail.',
                },
                {
                  mistake: 'Confusing stakeholder mapping with stakeholder management.',
                  fix: 'Comms planning (who to send the update to and how often) is a downstream activity. Stakeholder mapping is about research coverage and strategy: who the team needs to understand, and how to engage each person in a way that reflects their actual role and motivation.',
                },
                {
                  mistake: 'Filing the map after the first session.',
                  fix: 'Stakeholder relationships change throughout a project. A map that was accurate in week one is often wrong by week eight. Revisit it at each phase gate: update attitudes, add newly discovered actors, remove those who are no longer relevant. The map is a living tool.',
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
            <SectionHeadingLight>Running a session that surfaces the whole cast, not just the cast the team already had.</SectionHeadingLight>
            <Body>
              Stakeholder mapping typically takes one to two hours for an initial session, with a small
              cross-functional team of two to six people. The output is a living document: the initial
              map is a first draft, not a final answer. Plan for at least two or three revisit sessions
              as the work progresses and the team learns more about who actually matters.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Facilitate, do not just document',
                  body: 'The session\'s value is in the conversation, not in writing names on a 2x2. The facilitator\'s job is to keep pushing past the obvious, asking "who else?" after each category of stakeholder until the room has genuinely exhausted the cast. A session where no one in the room is surprised by the final map has not been facilitated well.',
                },
                {
                  label: 'Use triggering questions to surface non-obvious actors',
                  body: 'Reliable questions for extending the cast: Who feels the effects of the solution but has no direct relationship with the team? Who has historically resisted changes like this, and why? Whose informal opinion does this organisation tend to follow? Who delivers or implements the adjacent systems that this solution depends on? Who is typically forgotten in projects like this, and what happens when they are?',
                },
                {
                  label: 'Score attributes as a team, not in advance',
                  body: 'Power, interest, attitude, and influence should be assigned in the session, not prepared beforehand. The disagreements that arise, "I think she\'s a supporter but you think she\'s neutral", are the valuable conversation. They surface differences in perception that need to be resolved before the team commits to an engagement strategy.',
                },
                {
                  label: 'Plan the follow-on research in the same session',
                  body: 'While the map is fresh and the team is aligned, commit to a research plan: which stakeholders need deep qualitative research, which need a shorter conversation, and which can be monitored rather than engaged directly. Move from map to plan in the same session so that the cast produces a concrete next step.',
                },
                {
                  label: 'Schedule the revisit before the session ends',
                  body: 'Book the first map review into the project calendar before the session closes. Without a specific scheduled date, revisit sessions do not happen. The map becomes a historical document rather than a living tool, and the team is surprised by the stakeholders who changed.',
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
            <SectionHeadingDark>AI generates the obvious cast in seconds. The non-obvious cast requires the people in the room who have lived in the domain.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see who AI surfaces reliably, and where the most important
              stakeholders, the non-obvious ones who change the brief, tend to appear only in
              a facilitated human session.
            </p>
            <SMAIReactivated />
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
            <SectionHeadingLight>The Swiffer: the stakeholder that changed the design brief.</SectionHeadingLight>
            <p
              className="max-w-prose mx-auto px-6 md:px-8 mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A product team mapping stakeholders for a floor-cleaning product pushes past the obvious
              users and discovers that the non-obvious group, elderly and limited-mobility users,
              reveals the job was never about cleaning power. Toggle between the human-led session and
              a hypothetical AI-first approach to see what each produces.
            </p>
            <SMExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Stakeholder Mapping shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A discovery and research-planning method, it appears at the start of any phase where
              the team needs to know whose input and cooperation the work depends on. It is intentionally
              blank at later execution phases; by then, the map should already have been built and
              the engagement plan already be running.
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
            <SectionHeadingLight>What to pair with Stakeholder Mapping.</SectionHeadingLight>

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
                  title:  'Universal Methods of Design',
                  author: 'Bella Martin and Bruce Hanington',
                  year:   '2012',
                  note:   'A comprehensive reference for design research methods, including stakeholder mapping as a foundational practice. Martin and Hanington\'s treatment situates stakeholder mapping within the broader research toolkit and makes explicit its relationship to other methods: the map tells you who to study, and the other methods tell you how. Their emphasis on the facilitated session as the mechanism for surfacing non-obvious actors is the insight that separates a stakeholder map from a stakeholder list.',
                },
                {
                  title:  'This Is Service Design Doing',
                  author: 'Marc Stickdorn, Markus Edgar Hormess, Adam Lawrence, and Jakob Schneider',
                  year:   '2018',
                  note:   'The most thorough practical guide to service design methods, including a rigorous treatment of stakeholder mapping in the context of service development. The book\'s coverage of multi-actor systems (where a service involves many different types of people whose experiences and roles intersect) makes the case that a thorough stakeholder map is a prerequisite for any service design work. Its framing of "backstage" actors (those whose work enables a service but who are invisible to the user) is the foundation for understanding why non-obvious stakeholders are so often the decisive ones.',
                },
                {
                  title:  'Systems Thinking for Social Change',
                  author: 'David Peter Stroh',
                  year:   '2015',
                  note:   'On the systemic nature of stakeholder relationships and the way that solutions designed for obvious actors often produce unintended consequences for the non-obvious ones. Stroh\'s framework for understanding how actors in a system interact, and how an intervention aimed at one actor sends ripples through the whole system, makes the case for the comprehensive stakeholder map on systemic grounds: missing a stakeholder is not just a research gap; it is a design failure that tends to surface at implementation time.',
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

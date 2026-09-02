import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import CCWExampleToggle from './CCWExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Co-Creation Workshops — Methods — Innovation 101',
}

const CCWEstablishing  = dynamic(() => import('./CCWEstablishing'),  { ssr: false })
const CCWInteractive   = dynamic(() => import('./CCWInteractive'),   { ssr: false })
const CCWAIReactivated = dynamic(() => import('./CCWAIReactivated'), { ssr: false })

const CLAY = '#B5613E'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'The Develop phase opens the second diamond with concept generation: creating solutions with the people they serve. Co-creation workshops are one of the most direct expressions of the Develop phase: inviting users and stakeholders into the generative process itself, so the concepts that emerge are grounded in real priorities and already carry ownership before they reach testing.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Wednesday',
    note: 'Wednesday in a Design Sprint is when the team generates and sharpens solution concepts after Tuesday\'s Lightning Demos and sketching. Co-creation elements (where participants actively shape concepts rather than merely reacting) fit most naturally here, bringing the people the solution serves into the concept-refinement stage before committing to a prototype.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'The Lean Startup\'s build stage is served by co-creation in two ways: involving the customers who will use the product in shaping what to build, and building shared ownership that increases the likelihood of real adoption. Co-creation with customers at the Build stage reduces the risk of building something well-engineered but misaligned with what users actually need.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Sprint',
    note: 'Co-creation workshops within an Agile Innovation engagement bring users and stakeholders into sprint work as active contributors rather than audience members. This is most valuable at the start of a sprint cycle (before the team commits to what to build) or at the start of a discovery sprint, where the brief itself is being shaped.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'crazy-8s',
    name: 'Crazy 8s',
    rel: 'A common activity run INSIDE a co-creation workshop: Crazy 8s is a structured way to get every participant (including non-designers) contributing ideas individually before the group builds on them. Its individual-first structure prevents the loudest voice from anchoring everyone, which is especially valuable in co-creation contexts. A natural fit: the eight-minute constraint gives all participants a way in, and the resulting variety gives the group something real to build from.',
  },
  {
    slug: 'analogs-precursors',
    name: 'Analogs & Precursors',
    rel: 'Strong stimulus material to bring into a co-creation session: analogous examples and precedents from other domains give participants provocations to build on and react against. Rather than starting from a blank canvas, participants can modify, combine, or reject the analogous examples: a reliable way to get non-designers generating real material fast.',
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'THE KEY DISTINCTION. Interviews are design-FOR: you learn from people, they are subjects; you go away and design based on what you heard. Co-creation is design-WITH: you make with people, they are contributors; what they build becomes part of the solution. Interviews gather understanding; co-creation builds solutions and ownership together. They are complementary, not interchangeable. Interviews often inform what participants bring to the co-creation session.',
  },
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    rel: 'Co-created concepts get made tangible to learn from: the natural next step after a workshop. Prototyping and co-creation pair naturally because participants can even build rough prototypes in the session itself, using physical materials or digital tools. The co-created concept becomes the brief for the prototype; the prototype tests whether the concept worked as intended.',
  },
  {
    slug: 'how-might-we',
    name: 'How Might We',
    rel: 'A well-scoped How Might We question makes a strong prompt for a co-creation workshop\'s generative activities. Frame the challenge as a HMW question before the session starts and use it to give participants a clear and well-bounded making target. The scoping discipline of HMW prevents the workshop from sprawling into a general discussion rather than a focused making session.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CoCreationWorkshopsPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          S1 - Header / Identity + Establishing visual   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden">
        <Container className="relative z-10 flex flex-col justify-center flex-1">
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize:   'var(--text-2xs)',
                color:       CLAY,
                background: 'rgba(181,97,62,0.12)',
                border:     '1px solid rgba(181,97,62,0.28)',
              }}
            >
              Ideation &amp; Prototyping
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Co-Creation Workshops
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Inviting the people a solution is meant to serve into the creation process itself, as
              active contributors who build and shape concepts alongside the team, not just react to them.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              There is a world of difference between asking people what they think of your idea and
              building the idea together with them. The second one is co-creation.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <CCWEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>What it is</SectionLabel>
            <SectionHeadingLight>Designing WITH people, not FOR them, and why it is a fundamentally different thing.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                A co-creation workshop invites the people a solution is meant to serve (users,
                customers, frontline staff) into the generative process itself, as active contributors
                who build, modify, and reimagine concepts alongside the team. It is fundamentally different
                from gathering feedback or running interviews: participants are not reacting to the
                team&rsquo;s ideas, they are helping create them. The distinction is the whole method. In research,
                you learn from people; in co-creation, you make with them.
              </Body>
              <Body>
                This design-with (rather than design-for) stance produces two distinct payoffs. First,
                the solutions themselves are better grounded: because the people being served are shaping
                the concept directly, the output carries their real language, their mental models, and
                their actual priorities, rather than the team&rsquo;s assumptions about them. Ideas that would
                never have occurred to the team, because they come from lived experience the team does not
                have, surface naturally when the people with that experience are building alongside you.
              </Body>
              <Body>
                Second, and often underrated, co-creation builds ownership. When the people affected by
                a solution have helped create it, they are invested in it, they understand it from the
                inside, and they become advocates rather than skeptics. That shared ownership smooths the
                later, hardest part of innovation: adoption. A solution handed to people is resisted; a
                solution built with them is championed. The investment that comes from having co-created
                something is itself one of the method&rsquo;s most valuable outputs, and it is not something
                you can add on later.
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
            <SectionLabel accent={CLAY}>Design WITH people, not FOR them. See the difference.</SectionLabel>
            <SectionHeadingDark>Contribution, not reaction, is the dividing line. Toggle between the two, and see why it matters.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between design-WITH and design-FOR to see how the same people, in the same
              room, produce entirely different results depending on whether they are contributing
              or reacting, and why only contribution produces grounded insight and ownership.
            </p>
            <CCWInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>For making with the people a solution serves. Not for evaluating a finished idea, or when participants can&rsquo;t contribute, or you won&rsquo;t let them.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You want solutions grounded in the real language, mental models, and priorities of the people they serve, not just the team\'s assumptions about them.',
                    'The people affected have lived experience or context the team genuinely lacks and could contribute directly.',
                    'Later adoption will depend on buy-in from users, customers, or frontline staff, and building ownership early will smooth it.',
                    'You are generating or shaping concepts, not just validating a finished one, and want the served people to help create them.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: CLAY, flexShrink: 0, marginTop: 2 }}>→</span>
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
                    'You actually need feedback on a finished concept: that is concept testing or an interview, not co-creation. Do not dress a feedback session up as co-creation.',
                    'The participants lack the context to contribute meaningfully. Without enough grounding, people cannot genuinely co-create and the session produces little.',
                    'You are unwilling to let participants genuinely shape the outcome. Inviting "co-creation" when decisions are already made is tokenism that erodes trust.',
                    'The problem is so highly technical that participants cannot contribute directly, though they can often still shape the experience around it.',
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
                The honest limit: co-creation&rsquo;s value depends entirely on genuine contribution and genuine
                influence. Its defining failure mode is the session that is really feedback in disguise:
                participants reacting rather than building, which forfeits both the grounded insight and
                the ownership. Its other failures are inviting people without the context to contribute,
                and failing to give them tangible materials to build with. Set up for real making, or do
                not call it co-creation.
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
            <SectionLabel accent={CLAY}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from recruiting the right participants to capturing the concept and the ownership it built.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Invite the right participants: the people the solution serves.',
                  body: 'Bring in actual users, customers, or frontline staff, the people with the lived experience the solution must fit, and make sure they have enough context to contribute meaningfully. A short orientation that lowers the intimidation of "designing" pays off in richer contribution.',
                },
                {
                  n: '02',
                  title: 'Set it up as making, not reacting.',
                  body: 'Design the session around participants building, modifying, and reimagining, not approving or rejecting. The structure itself must invite contribution; if the team presents and participants respond, it has become a feedback session. This is the design decision that matters most.',
                },
                {
                  n: '03',
                  title: 'Give people tangible materials to build with.',
                  body: 'Provide concrete stuff to make with: sketching materials, cards, props, building blocks, templates, rough prototypes to modify. Tangible materials are what let non-designers actually co-create rather than just talk. Their absence is a common failure mode.',
                },
                {
                  n: '04',
                  title: 'Use structured generative activities.',
                  body: 'Run the session through activities that channel contribution, often hosting methods like Crazy 8s inside the workshop, and using Analogs & Precursors as stimulus. Structure gives every participant a way in and keeps the making productive rather than scattered.',
                },
                {
                  n: '05',
                  title: 'Let participants genuinely shape the outcome.',
                  body: "Ensure participants' contributions actually influence the solution: their language, priorities, and ideas showing up in the output. This genuine influence is what produces the grounded insight and the ownership. Tokenistic inclusion produces neither.",
                },
                {
                  n: '06',
                  title: "Capture the output and the ownership.",
                  body: "Synthesize what was created, keeping participants' real language and priorities intact, and recognize the investment built. The participants who co-created are now advocates. Both the grounded concept and the ownership are deliverables of the session.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(181,97,62,0.12)', lineHeight: 1.1, width: 40 }}
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
            <SectionLabel accent={CLAY}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the mistakes that turn co-creation into feedback in disguise.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                "Participants genuinely shape the solution rather than approving or rejecting it, and their language and priorities show up in the output.",
                "The right people are in the room (those the solution serves) with enough context to contribute.",
                "People are given tangible materials to build with, so non-designers can make, not just talk.",
                "Adoption is eased downstream because the people affected helped build it, they arrive as advocates.",
                "The session is structured for contribution (often hosting activities like Crazy 8s), keeping the making productive.",
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: CLAY, flexShrink: 0, marginTop: 3 }}>✓</span>
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
                  mistake: 'Running a feedback session disguised as co-creation.',
                  fix: 'The defining failure: participants react to the team\'s finished idea rather than build with the team. Structure the session so people genuinely contribute and shape the outcome. Presenting a finished concept at any point is the tell that it has become feedback.',
                },
                {
                  mistake: 'Inviting participants who lack the context to contribute.',
                  fix: 'People without enough grounding cannot meaningfully co-create. Choose participants with the relevant lived experience and give them the context they need: a short warm-up that frames the space without anchoring them to the team\'s existing thinking.',
                },
                {
                  mistake: 'Failing to give people tangible materials to build with.',
                  fix: 'Without concrete stuff to make with, non-designers default to talking, and the session loses its generative power. Prepare real materials in advance: sketch supplies, cards, props, templates, rough prototypes. The materials are what make co-creation possible.',
                },
                {
                  mistake: 'Tokenistic inclusion.',
                  fix: "Inviting 'co-creation' when the decisions are already made is worse than not asking. It erodes trust and is worse than a straightforward feedback session. Only co-create if participants can genuinely influence the result.",
                },
                {
                  mistake: "Losing participants' real language in synthesis.",
                  fix: "The grounded insight lives in how participants actually talk and prioritize. Preserve their language and framing rather than translating it into the team's. Generic summary is exactly what co-creation exists to get past.",
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
            <SectionLabel accent={CLAY}>Logistics</SectionLabel>
            <SectionHeadingLight>Recruit the right people, prepare real materials, and structure the session for making, not presenting.</SectionHeadingLight>
            <Body>
              Co-creation works best with a cross-functional group: the people who will use or be
              affected by the solution, alongside the team building it. Recruit participants with real
              lived experience, and give them a short orientation that provides enough context to
              contribute without anchoring them to the team&rsquo;s existing thinking. A warm-up that lowers
              the intimidation of &ldquo;designing&rdquo; pays off in richer contribution.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Prepare tangible making materials in advance',
                  body: 'The single most important logistical act. Have concrete materials ready (sketch supplies, cards, props, building kits, templates, rough prototypes to modify) so participants can build rather than just discuss. The materials are what make co-creation possible for non-designers; their absence is the most common failure mode.',
                },
                {
                  label: 'Design the session as a sequence of generative activities',
                  body: 'Structure the workshop around activities that channel contribution. Co-creation sessions commonly host methods like Crazy 8s inside them, and use Analogs & Precursors as stimulus material. A good structure gives every participant a way in and keeps energy on making, not discussing.',
                },
                {
                  label: 'Separate surfacing from presenting',
                  body: "Get participants contributing before anyone on the team presents any direction. The moment the team presents a finished idea, the session risks becoming feedback. The structure should invite participants to build from their own experience, not react to the team's.",
                },
                {
                  label: 'Facilitate for contribution, protect quieter voices',
                  body: "The facilitator's job is to draw out genuine input from everyone, not let the team or the loudest participant dominate. Techniques that ensure individual contribution before group discussion (as in Crazy 8s) help every participant actually shape the output.",
                },
                {
                  label: 'Plan to honor the contributions afterward',
                  body: "Decide in advance how participants' contributions will be captured, carried into the solution, and acknowledged. Nothing erodes co-creation's ownership benefit faster than people seeing their input ignored. Common formats include in-person workshops with physical materials and remote sessions on a shared digital canvas, named as common examples, not endorsements.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(181,97,62,0.28)', marginTop: 4 }}
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
            <SectionLabel accent={CLAY}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI can help run the workshop and synthesize what comes out of it. It cannot be the people in the room, or manufacture the ownership they build.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see where AI genuinely assists a co-creation session,
              and the two things it fundamentally cannot supply: real participation and real ownership.
            </p>
            <CCWAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same problem. Two approaches, one surfaces what the team couldn&rsquo;t know, one misses it entirely.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A health system redesigning a frustrating chronic-care programme. The team could design
              a fix and ask for feedback, or design WITH the patients and frontline nurses who live
              the experience. Toggle between the traditional approach and a hypothetical AI-first
              approach to see what each produces, and what each misses.
            </p>
            <CCWExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Used in these frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={CLAY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where Co-Creation Workshops show up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A generative, design-with method, co-creation maps to the develop-and-ideate moments
              of frameworks: where solutions are created with the people they serve, before committing
              to prototype or build.
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
                    style={{ fontSize: 'var(--text-2xs)', color: CLAY, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
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
            <SectionLabel accent={CLAY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to pair with Co-Creation Workshops.</SectionHeadingLight>

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
            <SectionLabel accent={CLAY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Convivial Toolbox',
                  author: 'Liz Sanders and Pieter Jan Stappers',
                  year:   '2012',
                  note:   "The definitive source for generative co-creation and participatory design. Sanders and Stappers' framework distinguishes between designing FOR (expert-led, user as subject), designing WITH (collaborative, user as partner), and designing BY (user-led), and makes the case for why the design-with stance produces both better-grounded solutions and the shared ownership that eases adoption. Their treatment of generative tools (the tangible materials that enable non-designers to contribute as makers) directly underpins the method's logistics requirements.",
                },
                {
                  title:  'Gamestorming',
                  author: 'Dave Gray, Sunni Brown, and James Macanufo',
                  year:   '2010',
                  note:   "For collaborative workshop activities that channel group contribution. Gray, Brown, and Macanufo's catalogue of generative activities (many of which work well inside a co-creation session) provides the structural vocabulary for running sessions that produce genuine making rather than discussion. Their treatment of group dynamics and facilitation for divergence is directly relevant to the co-creation facilitator's job of ensuring everyone contributes.",
                },
                {
                  title:  'This Is Service Design Doing',
                  author: 'Marc Stickdorn, Markus Edgar Hormess, Adam Lawrence, and Jakob Schneider',
                  year:   '2018',
                  note:   "For co-creation in service design practice. Stickdorn et al.'s account of co-creation as a core service design method (alongside the practical tools and facilitation approaches that make it work in real organizational settings) is the most comprehensive practical guide to the method as applied in service contexts. Their emphasis on involving frontline staff alongside customers as co-creators reflects the method's full scope.",
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(181,97,62,0.30)' }} />
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

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import PAExampleToggle from './PAExampleToggle'
import PABoundarySection from './PABoundarySection'
import { DarkSection, LightSection, WarmSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Personas & Archetypes — Methods — Innovation 101',
}

const PAEstablishing  = dynamic(() => import('./PAEstablishing'),  { ssr: false })
const PAInteractive   = dynamic(() => import('./PAInteractive'),   { ssr: false })
const PAAIReactivated = dynamic(() => import('./PAAIReactivated'), { ssr: false })

const NAVY = '#1F3A5F'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  { slug: 'double-diamond',   name: 'Double Diamond',   phase: 'Define',           note: 'Synthesizing discovery research into who the problem is for.' },
  { slug: 'design-thinking',  name: 'Design Thinking',  phase: 'Define',           note: 'A core synthesis artifact of the define stage, where research becomes design targets.' },
  { slug: 'agile-innovation', name: 'Agile Innovation', phase: 'Discovery Sprint', note: 'Grounding the backlog in specific, research-based user types.' },
  { slug: 'lean-startup',     name: 'Lean Startup',     phase: 'Build',            note: 'Informs the hypothesis: who the early-adopter customer actually is and what job they need done.' },
]

const RELATED_METHODS = [
  { slug: 'avatars',                name: 'Avatars',                rel: 'The single-target counterpart. Personas capture the range; an avatar captures the one. See the boundary section above.' },
  { slug: 'in-depth-interviews',    name: 'In-Depth Interviews',    rel: 'The primary research source personas are built from. Personas are the synthesis; interviews are the evidence.' },
  { slug: 'contextual-observation', name: 'Contextual Observation', rel: 'Observation of real behavior in context is core evidence for grounded personas alongside interviews.' },
  { slug: 'empathy-mapping',        name: 'Empathy Mapping',        rel: 'A companion synthesis tool; empathy maps often feed directly into a persona.' },
  { slug: 'jobs-to-be-done',        name: 'Jobs To Be Done',        rel: 'A complementary lens: JTBD focuses on the job the person is trying to do; personas focus on who the person is. Useful together.' },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PersonasArchetypesPage() {
  return (
    <>
      {/* ────────────────────────────────────────────────────────────
          S1 - Header / Identity   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20 md:py-28">
            <span
              className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
              style={{
                fontSize: 'var(--text-2xs)',
                color: NAVY,
                background: 'rgba(31,58,95,0.10)',
                border: '1px solid rgba(31,58,95,0.22)',
              }}
            >
              Synthesis &amp; Framing
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Personas &amp; Archetypes
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Research-grounded portraits of the range of people you are designing for, so the team designs for real users instead of for itself.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              Not fictional people invented to feel real. Evidence-based representations built to keep the diversity of actual users in the room.
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S2 - Establishing visual   DARK (scroll-in)
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="pb-20">
            <PAEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>What it is</SectionLabel>
            <SectionHeadingLight>A set of real people held in the room while you design.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                A persona is a research-grounded portrait of a type of user: their goals, motivations, behaviors, frustrations, and context, distilled into a single, memorable, shareable representation. Archetypes are the same idea at a higher level of abstraction: rather than a named, detailed individual, an archetype captures a behavioral pattern or role (the Optimizer, the Reluctant Adopter, the Power User) stripped of biographical specifics. Personas are concrete; archetypes are abstract; both do the same job.
              </Body>
              <Body>
                That job is to keep the real diversity of users in the room. Left unchecked, every team designs for itself: for the user it imagines, who tends to look suspiciously like the team. A well-built set of personas, covering the meaningful range of real users (the confident and the anxious, the expert and the first-timer), forces the team to design for people who are not them. When a designer asks &ldquo;but what would the Avoider do here?&rdquo;, the persona is doing its job.
              </Body>
              <Body>
                The single most important thing about a persona is what it is <em>not</em>: it is not a fictional character invented in a workshop to feel plausible. A persona invented from assumption is worse than no persona, because it wears the authority of a real user while teaching the team only its own biases back. A persona is only as valuable as the research beneath it.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S4 - Interactive signature visual   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>The personas</SectionLabel>
            <SectionHeadingDark>Meet the range. Click any persona.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              As you click across the cards, the range becomes tangible, genuinely different people with genuinely different needs. Designing for only one of them would fail the others.
            </p>
            <PAInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A synthesis tool, not a research method.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4" style={{ fontSize: 'var(--text-2xs)', color: NAVY }}>
                  Use Personas & Archetypes when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have done real user research and need to synthesize it into a shared, memorable form the whole team can design against.',
                    'The team is at risk of designing for itself, and needs the diversity of real users made concrete and present.',
                    'Multiple distinct user types genuinely exist, and designing for the range (not just the average) matters.',
                    'You need a common language for "who we are designing for" across a cross-functional team.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: NAVY, flexShrink: 0, marginTop: 2 }}>→</span>
                      <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                        {item}
                      </span>
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
                    'You have no research to ground them in. A persona built from assumption is actively misleading; see Best Practices.',
                    'You genuinely have one sharp target customer and want to align focus around them, not cover a range (use an Avatar instead, see section 11).',
                    'You need statistical market sizing or demographic segmentation. That is market segmentation, a different tool.',
                    'The team will make beautiful persona posters and then never look at them again. A persona that never enters a real decision is decoration.',
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <span style={{ color: 'var(--color-neutral-400)', flexShrink: 0, marginTop: 2 }}>×</span>
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
                The honest limit: personas are a synthesis and communication tool, not a research method. They are only as good as the research upstream of them, and only as valuable as the decisions downstream of them. Sandwiched between weak research and unused output, they become theater.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S6 - How it works   WARM
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, in order.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Start from real research.',
                  body: 'Personas are built from in-depth interviews, contextual observation, and other primary research. The raw material is real people; the persona is the distillation. Budget the research first, not after.',
                },
                {
                  n: '02',
                  title: 'Find the patterns, not the average.',
                  body: "Look across the research for meaningful clusters of behavior and motivation: distinct types, not a single blended 'average user' who is, in fact, nobody. The clusters become the personas.",
                },
                {
                  n: '03',
                  title: 'Decide personas or archetypes.',
                  body: 'Choose the level of abstraction. Detailed personas (named, contextual, specific) when vividness and empathy matter. Archetypes (abstract behavioral patterns) when you want to strip away biographical noise and focus on roles.',
                },
                {
                  n: '04',
                  title: 'Build each portrait around what drives decisions.',
                  body: 'Goals, motivations, behaviors, frustrations, and context: the things that actually change a design decision. Resist padding personas with irrelevant biographical detail (favorite coffee, a stock photo) that adds realism but no design value.',
                },
                {
                  n: '05',
                  title: 'Cover the meaningful range.',
                  body: 'Build a small set (usually three to five) that spans the real diversity of users, including the edge cases that stress the design (the anxious first-timer, the impatient expert). Too many personas and none get used; too few and the range collapses.',
                },
                {
                  n: '06',
                  title: 'Put them to work.',
                  body: 'The persona set earns its keep only when it enters real decisions: design reviews conducted "as" a persona, features justified against specific personas, prioritization that asks which personas a choice serves. A persona that never leaves the poster is wasted.',
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(31,58,95,0.10)', lineHeight: 1.1, width: 40 }}
                  >
                    {n}
                  </span>
                  <div>
                    <h3 className="font-semibold mb-2" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {title}
                    </h3>
                    <Body>{body}</Body>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </WarmSection>

      {/* ────────────────────────────────────────────────────────────
          S7 - Best practices   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and the mistakes that prevent it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'Every persona traces back to real research; you can point to the interviews and observations behind each one.',
                'The set covers the meaningful range of real users, including the uncomfortable edge cases, not just the flattering core user.',
                'Personas are built around what drives decisions (goals, motivations, frustrations), not padded with decorative biography.',
                'The team actually uses them: they show up in design reviews, prioritization, and feature debates.',
                'They are revisited and updated as understanding deepens, treated as living tools rather than a finished deliverable.',
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span style={{ color: NAVY, flexShrink: 0, marginTop: 3 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              The mistakes, and how to avoid them
            </h3>
            <div className="flex flex-col gap-5">
              {[
                {
                  mistake: 'Inventing personas from assumption.',
                  fix: "The cardinal sin. A persona conjured in a workshop with no research is a mirror of the team's biases wearing the mask of a real user. Ground every persona in evidence, or do not build it.",
                },
                {
                  mistake: 'The "average user" persona.',
                  fix: 'Blending all users into one composite produces a person who does not exist and needs nothing in particular. Build distinct types that span the range, not an average.',
                },
                {
                  mistake: 'Decoration over substance.',
                  fix: 'Stock photos, names, and favorite-snack details create a feeling of realism while adding zero design value. Include only what changes a decision.',
                },
                {
                  mistake: 'Too many personas.',
                  fix: 'A set of nine personas gets used as often as zero. Keep it to a memorable, usable few: three to five is the usual range.',
                },
                {
                  mistake: 'Building them and shelving them.',
                  fix: 'The most common failure: beautiful personas that never enter a real decision. If they are not changing design choices, they are theater.',
                },
                {
                  mistake: 'Confusing personas with segments or avatars.',
                  fix: 'Treating a demographic segment or a single marketing avatar as a persona muddles the work. The boundary section (11) draws these lines precisely.',
                },
              ].map(({ mistake, fix }) => (
                <div
                  key={mistake}
                  className="rounded-lg p-4"
                  style={{ background: 'var(--color-neutral-50)', border: '1px solid var(--color-neutral-100)' }}
                >
                  <p className="font-semibold mb-1" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
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

      {/* ────────────────────────────────────────────────────────────
          S8 - Logistics   WARM
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Logistics</SectionLabel>
            <SectionHeadingLight>Building personas that actually get used.</SectionHeadingLight>
            <Body>
              A persona is downstream of primary research. Budget the research before the personas; the personas are a synthesis step, not a substitute for talking to users.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'The research comes first',
                  body: 'In-depth interviews and contextual observation are the usual primary sources. The same research that feeds empathy maps and journey maps feeds personas. There is no shortcut; a persona without research is an assumption in costume.',
                },
                {
                  label: 'Build them collaboratively',
                  body: "Personas are best built with the cross-functional team, not handed down by one researcher. When the people who will use the personas help distill them from the research, they trust and actually use them. A persona built in isolation and delivered as a poster tends to be ignored.",
                },
                {
                  label: 'How many, and how detailed',
                  body: 'A common working range is three to five personas, detailed enough to feel real and distinct, lean enough to be remembered. Match the detail level to use: rich personas for empathy-heavy design work, spare archetypes for pattern-level strategy.',
                },
                {
                  label: 'Keeping them alive',
                  body: 'Personas drift out of date as the user base and the product change. The most useful sets are revisited periodically and updated from fresh research, rather than frozen at the moment of a single project.',
                },
                {
                  label: 'Sharing them',
                  body: 'Personas live where the team works: on the wall, in the design system, in the project workspace, referenced by name. Common formats are one-page persona cards; the format matters less than whether people actually reach for them.',
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-0.5 shrink-0 rounded-full" style={{ background: 'rgba(31,58,95,0.28)', marginTop: 4 }} />
                  <div>
                    <p className="font-semibold mb-1" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
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
      </WarmSection>

      {/* ────────────────────────────────────────────────────────────
          S9 - How AI is evolving this method   DARK
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI will generate a full set of personas in seconds. That is exactly the danger.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle each persona to see what changes when AI generates it from nothing versus when AI synthesizes it from your real research. The difference is the whole point.
            </p>
            <PAAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same brief, built two ways.</SectionHeadingLight>
            <p className="mb-10" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              The same team, the same research brief, two different methods. The contrast reveals exactly why the source of a persona matters.
            </p>
            <PAExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S11 - Personas vs Avatars vs Segments   DARK  [ADDED]
          ──────────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Boundaries</SectionLabel>
            <SectionHeadingDark>Three things that get confused, and are not the same.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              This method is muddled in practice because three different tools wear similar clothes. Getting the distinction right is most of the skill.
            </p>
            <PABoundarySection />
          </div>
        </Container>
      </DarkSection>

      {/* ────────────────────────────────────────────────────────────
          S12 - Used in these frameworks   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where personas show up.</SectionHeadingLight>
            <p className="mb-8" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}>
              Personas are a synthesis output, so they appear where frameworks turn research into a shared understanding of the user.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link
                  key={slug}
                  href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <span className="font-semibold shrink-0" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}>
                    {name}
                  </span>
                  <span className="font-mono shrink-0" style={{ fontSize: 'var(--text-2xs)', color: NAVY, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {phase}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </span>
                </Link>
              ))}
            </div>

            <p className="mt-6" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-400)', fontStyle: 'italic' }}>
              Note: the Design Sprint tends to import an existing persona rather than build one in the five days, and FDE relies on continuous direct embedding rather than distilled personas. These blanks are intentional.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S13 - Related methods   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with personas.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <Link
                  key={slug}
                  href={`/methods/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)' }}
                >
                  <span className="font-semibold shrink-0" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}>
                    {name}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ────────────────────────────────────────────────────────────
          S14 - Sources & further reading   LIGHT
          ──────────────────────────────────────────────────────────── */}
      <WarmSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'About Face: The Essentials of Interaction Design',
                  author: 'Alan Cooper, Robert Reimann, David Cronin, and Christopher Noessel',
                  year:   '2014',
                  note:   'Cooper originated the persona method. This is its definitive treatment, where the concept of the persona as a research-grounded design tool was first fully articulated.',
                },
                {
                  title:  'The User Is Always Right',
                  author: 'Steve Mulder and Ziv Yaar',
                  year:   '2006',
                  note:   'A practical guide to creating and using personas grounded in research, with clear guidance on the research-to-synthesis process.',
                },
                {
                  title:  'Universal Methods of Design',
                  author: 'Bella Martin and Bruce Hanington',
                  year:   '2012',
                  note:   'Personas among the wider catalog of research and synthesis methods, useful for understanding how personas fit alongside other tools.',
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div className="w-0.5 shrink-0 rounded-full self-stretch" style={{ background: 'rgba(31,58,95,0.30)' }} />
                  <div>
                    <p className="font-semibold" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                      <em>{title}</em>
                    </p>
                    <p className="mb-1" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
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
      </WarmSection>
    </>
  )
}

import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import EMPExampleToggle from './EMPExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Empathy Mapping — Methods — Innovation 101',
}

const EMPEstablishing  = dynamic(() => import('./EMPEstablishing'),  { ssr: false })
const EMPInteractive   = dynamic(() => import('./EMPInteractive'),   { ssr: false })
const EMPAIReactivated = dynamic(() => import('./EMPAIReactivated'), { ssr: false })

const NAVY = '#1F3A5F'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Define',
    note: 'Empathy mapping is a core synthesis tool during the Define phase, used to organize what the Discover research revealed about a specific person into a shared artifact before the team converges on a problem definition. The completed map often feeds directly into a point of view or a How Might We question.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Empathize · Define',
    note: 'Empathy mapping spans two phases in the design thinking tradition. During Empathize it organizes field research into a shared portrait of one person; during Define it feeds the point-of-view synthesis that frames the design challenge. It is the primary artifact of the Empathize stage.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'A fast empathy map at the start of a Discovery Sprint aligns the whole team (including those who were not in the interviews) around a shared, evidence-based understanding of the person behind the backlog. It prevents the sprint from optimizing for an imagined user.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Monday',
    note: "Monday's work in a Design Sprint includes building shared understanding of the user before the team begins sketching. Empathy mapping is used as a fast alignment tool to make the target user legible to the whole room, especially team members who were not part of prior research.",
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'affinity-mapping',
    name: 'Affinity Mapping',
    rel: 'The companion synthesis tool. Affinity mapping clusters ALL the research into themes across all participants; empathy mapping organizes what you know about ONE person into four dimensions. Often used together: affinity mapping first to find patterns, then an empathy map to go deep on a specific person those patterns describe.',
  },
  {
    slug: 'personas-archetypes',
    name: 'Personas & Archetypes',
    rel: 'An empathy map often feeds directly into a persona. The map is the fast synthesis, the persona is the shareable, referenceable portrait. The empathy map is the working document; the persona is the artifact the team carries forward. The emotional truth in the Feels quadrant is the material the persona most needs.',
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'The primary source of evidence for every quadrant, especially the emotional register that allows FEELS to be filled honestly. Without good interviews (ones that reach the unspoken) the empathy map has no raw material for its most valuable quadrant.',
  },
  {
    slug: 'journey-mapping',
    name: 'Journey Mapping',
    rel: 'Complementary: the empathy map captures the person\'s inner world at a point in time: their beliefs, behaviors, and emotional state. The journey map sequences their experience across time. Used together, empathy maps give the emotional depth that journey maps can reference for each stage.',
  },
  {
    slug: null,
    name: 'Jobs To Be Done',
    rel: "A deeper lens on the same person. JTBD asks what progress the person is trying to make: what they are hiring the product to do. The empathy map's tensions, especially the Says-vs-Does gap and the emotional truth in Feels, often point directly to the underlying job and the reasons the person struggles to make progress.",
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function EmpathyMappingPage() {
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
                color:       NAVY,
                background: 'rgba(31,58,95,0.12)',
                border:     '1px solid rgba(31,58,95,0.28)',
              }}
            >
              Synthesis &amp; Framing
            </span>

            <h1
              className="font-display font-semibold text-balance mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
            >
              Empathy Mapping
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              A four-quadrant canvas (Says, Thinks, Does, Feels) that captures one person&rsquo;s experience, where the insight lives in the gaps between the quadrants.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              What people say is rarely the whole story. The empathy map exists to expose the distance between what they say, what they do, and what they feel, and that distance is where the design problem actually lives.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <EMPEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>What it is</SectionLabel>
            <SectionHeadingLight>Four quadrants, one person. The insight is in the gaps.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                An empathy map is a structured canvas, usually divided into four quadrants (Says, Thinks, Does, and
                Feels) used to synthesize what a team has learned about a person into a single shared artifact. Where
                affinity mapping clusters <em>all</em> the research into themes, an empathy map focuses on <em>one</em> person
                and organizes what you know about them into four dimensions so the team can see them whole.
              </Body>
              <Body>
                Its power is not in filling the quadrants; it is in reading <em>across</em> them. The most valuable insight in
                an empathy map lives in the gaps and contradictions between quadrants: when what someone <em>says</em> differs
                from what they <em>think</em>, or when what they <em>do</em> contradicts how they <em>feel</em>. A person who
                says &ldquo;I know I should save more,&rdquo; does nothing about it, and feels quiet shame is telling you
                something no single quadrant could reveal, and it is exactly the kind of tension worth designing for.
                The map forces a distinction between the said and the thought, the done and the felt, and the distance between
                them is the gold.
              </Body>
              <Body>
                It is a lightweight, fast tool, often used in a workshop as a quick step toward a persona or a point of view.
                Its simplicity is a strength, but it has one dangerous failure mode: filled from imagination rather than
                evidence, an empathy map just launders the team&rsquo;s assumptions into an official-looking artifact.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 - Interactive canvas   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>The four quadrants</SectionLabel>
            <SectionHeadingDark>Four quadrants, one person. The insight is in the gaps.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click a quadrant to reveal what goes there, how to fill it honestly, and how to read it in relation to the others.
              Select SAYS&nbsp;≠&nbsp;DOES to see where the most valuable insight lives.
            </p>
            <EMPInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 - When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A fast synthesis tool, not a substitute for research.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: NAVY }}
                >Use empathy mapping when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'You have done initial research and have enough material to characterize a specific person or a well-defined user type based on evidence.',
                    'You need to quickly align a cross-functional team around a shared, evidence-based understanding of one person before ideation begins.',
                    'You suspect there is a gap between what your users say and what they actually do or feel, and you want to surface it through structured synthesis.',
                    'You are on the way to building a persona or a point of view and need a fast intermediate synthesis step that the team does together.',
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
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}
                >Do not lean on it when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "You have no real research. Filling an empathy map from imagination is the single most common abuse of the method. It produces confident fiction dressed as insight.",
                    "You need to synthesize a large volume of data across many people. Use affinity mapping, which clusters all the research; an empathy map focuses on one person and is not designed for cross-participant pattern-finding.",
                    "You treat the map as a final deliverable. Its value is the shared understanding it builds and the tensions it surfaces, not the artifact. Do not mistake a filled canvas for a finished insight.",
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
                The honest limit: an empathy map is only as true as the research beneath it, and its most valuable
                output (the Feels quadrant and the Says-vs-Does tension) is inferred, not observed. Done carelessly
                or from assumption, it reassures the team with a tidy picture instead of challenging them with a real one.
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
            <SectionLabel accent={NAVY}>How it works</SectionLabel>
            <SectionHeadingLight>Five moves, from raw research to named tension.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Draw the canvas.',
                  body: "Four quadrants, Says, Thinks, Does, Feels, around a central representation of the person. Some versions add Pains and Gains at the bottom; the four quadrants are the core. The canvas itself is trivial: a whiteboard, a digital template, a piece of paper with lines drawn on it. What matters is the evidence and the honest reading.",
                },
                {
                  n: '02',
                  title: 'Populate each quadrant from evidence.',
                  body: "Fill each quadrant with entries drawn from actual research: quotes from interviews for Says, observed behavior for Does, and careful inference for Thinks and Feels. Every entry should trace to something real. The discipline of pointing to the source for each note is the main guard against filling the map from imagination.",
                },
                {
                  n: '03',
                  title: 'Spend the most time on Feels.',
                  body: "The natural tendency is to fill Says and Does quickly (they are observable and stated) and stop. Budget explicitly for Feels. Ask: what is the emotional register of this person? What did they not say, but that was present in the tone? The emotion they named is often not the deepest emotion. Read for what they avoided.",
                },
                {
                  n: '04',
                  title: 'Read across the quadrants for contradictions.',
                  body: "The valuable work is comparative, not descriptive. Where does Says diverge from Does? Where does Feels explain a behavior that Says would not predict? Hunt the contradictions. A map with no tension is usually a map filled from assumption. Real research rarely produces a person with no internal conflict.",
                },
                {
                  n: '05',
                  title: 'Name the tension worth designing for.',
                  body: "Identify the central gap (usually the contradiction between what the person says or does and what they feel) and treat it as the thing the design must address. The empathy map is a thinking tool on the way to a framed design problem, not a destination. It feeds a point of view, a How Might We question, or a persona: what comes next is where the synthesis is used.",
                },
              ].map(({ n, title, body }) => (
                <div key={n} className="flex gap-5">
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-3xl)', fontWeight: 600, color: 'rgba(31,58,95,0.10)', lineHeight: 1.1, width: 40 }}
                  >{n}</span>
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
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S7 - Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like, and what prevents it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'Every entry traces to real research evidence: a quote, an observed behavior, or a carefully inferred emotion drawn from the emotional register of the interview.',
                'The map surfaces a genuine tension, usually a contradiction between what the person says and what they do, explained by what they feel.',
                "The Feels quadrant carries real emotional weight: not a single bland word but a specific, inferred emotional truth that the person may never have named.",
                "The team reads across the quadrants for gaps, rather than just filling each one in isolation and declaring the exercise complete.",
                "It is used as a stepping stone to a point of view, a How Might We question, or a persona, not filed away as a finished deliverable.",
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
                  mistake: 'Filling it from assumption.',
                  fix: 'The single most common abuse. An empathy map built from imagination dresses the team\'s guesses up as insight. Ground every quadrant in evidence, and keep the source research visible during the session so each entry can be pointed to.',
                },
                {
                  mistake: 'Neglecting Feels, or filling it lazily.',
                  fix: 'A Feels quadrant with one word ("frustrated") has not done the work. The emotional truth the method exists to hold is specific, inferred, and usually un-stated. Budget the session\'s discussion time for Feels, and read carefully for what the person did not name.',
                },
                {
                  mistake: 'Treating all four quadrants as equal.',
                  fix: 'They are not. The gap between Says and Does is the gold. A map that fills all four neatly but surfaces no tension has missed the point. The contradictions are the output, not the completeness.',
                },
                {
                  mistake: 'Producing a reassuring map.',
                  fix: "A tidy empathy map that confirms what the team already believed is a warning sign. A good one should contain something uncomfortable. If the map doesn't surprise anyone, it was probably filled from assumption rather than evidence.",
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

      {/* ─────────────────────────────────────────────────────────
          S8 - Logistics   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Logistics</SectionLabel>
            <SectionHeadingLight>Running the session from evidence to shared understanding.</SectionHeadingLight>
            <Body>
              Empathy mapping is quick and collaborative by design. It works well as a short, focused session where the team
              fills the quadrants together from the research, then steps back to read across them. Its speed is a feature:
              the session should take 45-90 minutes for a single well-researched person. Do not over-engineer it.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Work from real research, visibly',
                  body: "Keep the source research (interview quotes, observation notes) in front of the team as they fill the map, so each entry can be traced to evidence. A sticky note that cannot be sourced to the research is an assumption. The discipline of pointing to the source is the main guard against the imagination-filled map.",
                },
                {
                  label: 'One map, one person',
                  body: "An empathy map is for a single person or a single well-defined user type. Trying to map 'our users' in general produces a blurred average that is true of nobody in particular. If you have distinct types who behave very differently, make a map for each.",
                },
                {
                  label: 'Spend the most time on Feels and the gaps',
                  body: "Says and Does fill quickly because they are stated and observable. The session's most valuable time is in the Feels quadrant and in the conversation about contradictions across quadrants. Budget explicitly: reserve at least a third of the session for Feels and the cross-quadrant reading.",
                },
                {
                  label: 'Build shared understanding, not just the artifact',
                  body: "The map is not the output. The shared understanding the team builds by filling it together is the output. Every team member who fills a sticky note is building their own model of the person. The conversation about which notes belong in Feels, and which ones are assumptions, is where the value is generated.",
                },
                {
                  label: 'Remote: works with light facilitation',
                  body: "Empathy mapping works well remotely on shared digital canvases (Miro, Mural, FigJam, named as common examples). The key facilitation requirement is enforcing the silent individual fill phase before discussion. Without it, the dominant voice in the room defines the map before the evidence is examined.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-4">
                  <div
                    className="w-0.5 shrink-0 rounded-full"
                    style={{ background: 'rgba(31,58,95,0.28)', marginTop: 4 }}
                  />
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
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S9 - AI and this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI fills Says and Does well. Thinks and Feels are inferences, and the inference is where the method lives.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see which quadrants AI handles reliably, and where it produces a
              plausible, emotionally flat map that misses the tension worth designing for.
            </p>
            <EMPAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 - In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same research. Two maps. One insight that only one of them could make.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A financial-services team is designing a retirement-planning tool for people in their early thirties.
              Research is complete. Both versions map the same person from the same interview transcripts; only
              the method of synthesis differs. Toggle between them to see where the reframing insight comes from.
            </p>
            <EMPExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 - Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where empathy mapping shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Empathy mapping is a fast synthesis tool, so it maps to the moments in each framework where the task is
              building shared understanding of a specific person before design decisions are made.
            </p>

            <div className="flex flex-col gap-3">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <Link
                  key={slug}
                  href={`/framework/${slug}`}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4 transition-colors"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <span
                    className="font-semibold shrink-0"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)', minWidth: 200 }}
                  >{name}</span>
                  <span
                    className="font-mono shrink-0"
                    style={{ fontSize: 'var(--text-2xs)', color: NAVY, textTransform: 'uppercase', letterSpacing: '0.08em' }}
                  >{phase}</span>
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
            <SectionLabel accent={NAVY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with empathy mapping.</SectionHeadingLight>

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
                      <span
                        className="font-semibold"
                        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
                      >{name}</span>
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
          S13 - Sources & further reading   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Gamestorming',
                  author: 'Dave Gray, Sunni Brown, and James Macanufo',
                  year:   '2010',
                  note:   "The book that popularized the empathy map format and remains the best source on the structure and intent of the four-quadrant canvas. Gray's framing of the method emphasizes the Feels quadrant and the reading-across discipline, making the gaps between quadrants the productive output, not the completeness of each.",
                },
                {
                  title:  'This Is Service Design Thinking',
                  author: 'Marc Stickdorn and Jakob Schneider',
                  year:   '2011',
                  note:   'Situates empathy mapping within service design practice, where understanding the emotional experience of a user at each service touchpoint is central to the design task. The emphasis on the emotional and contextual dimensions of the person (what they feel throughout a service journey) is directly relevant to the Feels quadrant.',
                },
                {
                  title:  'Interviewing Users',
                  author: 'Steve Portigal',
                  year:   '2013',
                  note:   "The definitive guide to gathering the research, and the emotional signal, that a good empathy map depends on. Portigal's techniques for reading tone, silence, and what is not said are exactly what separates a Feels quadrant filled with real emotional truth from one filled with surface words. The quality of the interview determines the quality of the map.",
                },
              ].map(({ title, author, year, note }) => (
                <div
                  key={title}
                  className="flex gap-4 p-4 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-100)', background: 'var(--color-background)' }}
                >
                  <div
                    className="w-0.5 shrink-0 rounded-full self-stretch"
                    style={{ background: 'rgba(31,58,95,0.30)' }}
                  />
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
      </LightSection>
    </>
  )
}

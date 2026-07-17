import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import AMExampleToggle from './AMExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Affinity Mapping — Methods — Innovation 101',
}

const AMEstablishing  = dynamic(() => import('./AMEstablishing'),  { ssr: false })
const AMInteractive   = dynamic(() => import('./AMInteractive'),   { ssr: false })
const AMAIReactivated = dynamic(() => import('./AMAIReactivated'), { ssr: false })

const NAVY = '#1F3A5F'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Define',
    note: 'Affinity mapping is the primary tool for converting raw Discover research into the insight clusters that define the problem. The Define phase begins when individual observations become named patterns — and affinity mapping is how that transition happens.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Define',
    note: 'After Empathize produces a body of qualitative research, affinity mapping converts it into structured insights during the Define phase. The synthesis work happens here: moving from "what we observed" to "what it means" before ideation begins.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Learn',
    note: "At the Learn step of a Build-Measure-Learn cycle, affinity mapping converts customer interview data and usage observation into the insight clusters that inform the next hypothesis. It turns raw learning into structured knowledge before the next build decision.",
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'Discovery Sprints produce a body of user research in a short window. Affinity mapping is the synthesis event that converts Discovery Sprint interviews and observations into the insight clusters that feed the sprint backlog.',
  },
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Monday',
    note: "Monday's How Might We exercise produces many question-format observations. Affinity mapping organizes them into insight clusters before the team votes on which to pursue on Tuesday. It is the organizing step between generating observations and choosing a direction.",
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
    rel: 'The natural next step after affinity mapping. Each named cluster is a candidate for conversion into a HMW design challenge. Affinity mapping produces the insight; HMW converts it into an open design question. The two methods form a chain: cluster → name → reframe → design brief.',
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: "The primary source of the raw observations that affinity mapping organizes. Interviews produce the cards; affinity mapping produces the clusters. The quality of the mapping is a direct function of the quality of the interviews — thin data produces thin clusters.",
  },
  {
    slug: null,
    name: 'Contextual Observation',
    rel: 'Field observation produces behavioral evidence that often contradicts what people say in interviews. Affinity mapping that combines interview cards and observation cards regularly produces clusters that neither source alone could generate.',
  },
  {
    slug: null,
    name: 'Empathy Mapping',
    rel: 'Empathy mapping organizes research into four quadrants (thinks, feels, says, does) per persona. Affinity mapping is complementary: it works across all observations from all participants to find cross-person patterns that empathy maps, which are person-specific, cannot show.',
  },
  {
    slug: null,
    name: 'Jobs To Be Done',
    rel: 'JTBD analysis identifies the underlying job a person is hiring a product to do. Affinity mapping that surfaces clusters about motivation, context, and substitutes is often a precursor to identifying the job — the cluster names become candidates for JTBD framing.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AffinityMappingPage() {
  return (
    <>
      {/* ─────────────────────────────────────────────────────────
          S1 — Header / Identity   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
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
              Affinity Mapping
            </h1>

            <p
              className="mb-3 max-w-[600px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Clustering raw research, one observation per card, until patterns emerge that no single data point could reveal &mdash; then naming each cluster as an insight.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The insight is not in the card. It is in the grouping. And in the name you give the grouping &mdash; which is not a category. It is a claim.
            </p>
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S2 — Establishing visual   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="pb-20">
            <AMEstablishing />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 — What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>What it is</SectionLabel>
            <SectionHeadingLight>A synthesis method that turns raw observation into structured insight.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                Affinity mapping &mdash; sometimes called affinity diagramming or the KJ method, after its originator
                Jiro Kawakita &mdash; is a structured process for organizing qualitative research into insight clusters.
                Each observation, quote, or behavioral note is written on a separate card. The cards are then grouped
                by affinity: placed near other cards they feel related to, without pre-defining what the categories
                will be. The groupings emerge from the data rather than being imposed on it.
              </Body>
              <Body>
                The distinguishing act of affinity mapping is the naming. Once a cluster is formed, the team names it
                not as a category (&ldquo;payment issues&rdquo;) but as an insight: a claim about what the data in
                that cluster reveals (&ldquo;users feel the payment step is a test they might fail&rdquo;). The category
                describes what the observations are about. The insight describes what they mean. This distinction &mdash;
                between description and interpretation &mdash; is where the method does its real work.
              </Body>
              <Body>
                The method is particularly powerful for large bodies of qualitative research where no single observation
                is sufficient to support a design decision, but the pattern across many observations is clear. The IDEO
                toothbrush redesign, the Contextual Design method, and the Design Sprint&rsquo;s Monday HMW exercise
                all use affinity mapping at the point where raw research must become structured knowledge before action
                is possible.
              </Body>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S4 — Interactive cluster explorer   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Cluster formation</SectionLabel>
            <SectionHeadingDark>The insight lives in the cluster. The cluster is named as a claim.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[560px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              A fitness app research corpus: 16 observations, 4 clusters. Tap any cluster to reveal the constituent
              observations and the insight statement that names what the cluster means.
            </p>
            <AMInteractive />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S5 — When to deploy   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>When to deploy it</SectionLabel>
            <SectionHeadingLight>A post-research synthesis tool — not a real-time note-taker.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p
                  className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: NAVY }}
                >Use affinity mapping when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    'Research is complete and you have a body of individual observations — at least 30 cards, more often 60–150 — that need organizing before decisions can be made.',
                    'The team has done the research together (or most of it) and needs to share what they learned before synthesis begins. Affinity mapping is also a knowledge-transfer ritual.',
                    'You need to move from "what we observed" to "what it means" before ideation begins. The Define phase in most frameworks begins with this transition.',
                    'Contradictory or surprising observations need confronting. Clusters that refuse to resolve — that hold observations which do not obviously belong together — are often the most generative.',
                    'A cross-functional team includes people who were not in the research and need to internalize what the research found. Handling the cards is the fastest way to build that understanding.',
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
                  style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-400)' }}
                >Do not reach for it when</p>
                <ul className="flex flex-col gap-3">
                  {[
                    "Research hasn't happened yet. Affinity mapping organizes existing observations; it cannot generate them. Running it from memory, from assumptions, or from secondary sources produces clusters of opinion, not insight.",
                    'The data is primarily quantitative. Affinity mapping is designed for qualitative observations: quotes, behaviors, emotional responses. Survey results and analytics belong in a different kind of synthesis.',
                    'The team is too large. Beyond eight people, the session loses coherence. For large research teams, split into groups that synthesize subsets of the data, then share cluster outputs.',
                    'Speed is the priority and good-enough structure is sufficient. A quick thematic sort without the naming discipline produces categories, not insights — but that may be enough for a fast decision.',
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
                The honest limit: affinity mapping produces the insights the research can support. If the research was
                thin, or if the team never encountered the actual human experience they were studying, the clusters will
                be superficial. The method surfaces what is latent in the data — it cannot put something there that was
                never captured.
              </p>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S6 — How it works   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>How it works</SectionLabel>
            <SectionHeadingLight>Six moves, from raw observation to named insight cluster.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Transcribe everything to individual cards.',
                  body: 'Before the session, each observation is written on a separate card or sticky note — one item per card. A quote, a behavior, an emotional response, an unexpected finding. The card should be specific enough to stand alone: not "users had trouble with checkout" but "user abandoned the basket at the payment step — said it felt like a test she was about to fail." Specificity is the raw material.',
                },
                {
                  n: '02',
                  title: 'Lay all cards out. Read everything.',
                  body: 'The session begins with silence. Everyone reads every card. This step is not optional — it is the knowledge-transfer mechanism that ensures the whole team is working from the same evidence, not just what they personally observed. For large corpora, each researcher reads a subset and then shares what surprised them.',
                },
                {
                  n: '03',
                  title: 'Group by affinity — silently, without pre-defining categories.',
                  body: 'Team members begin moving cards near other cards they feel belong together. No one explains their logic yet. The grouping is intuitive at first — cards that feel related are placed together. Disagreements are visible: if two people place the same card in different groups, that card goes in both (it is duplicated) and the disagreement is examined after.',
                },
                {
                  n: '04',
                  title: 'Discuss and refine. Let clusters stabilize.',
                  body: 'The silent phase gives way to discussion. Groups are challenged, split, merged. A cluster that grows too large is usually a sign that it contains two separate insights — split it. A cluster that stays small may belong inside a larger one, or may be the most important insight in the room. Resist the pull to merge the uncomfortable singleton into a larger group.',
                },
                {
                  n: '05',
                  title: 'Name each cluster as an insight, not a category.',
                  body: 'This is the highest-value step and the most commonly skipped. The cluster name is not a label for what the cards are about — it is a claim about what the cards reveal. "Payment flow" is a category. "Users feel the payment step is a test they are about to fail" is an insight. The insight is a sentence that a design direction can argue with or act on. The category is not.',
                },
                {
                  n: '06',
                  title: 'Convert insights to design challenges.',
                  body: 'Once each cluster is named, the team has a set of specific, evidenced insights. These are the raw material for How Might We questions: each insight becomes a candidate for conversion into an open design challenge. The affinity map is not the final output — it is the input to the next step of synthesis.',
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
          S7 — Best practices   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Best practices</SectionLabel>
            <SectionHeadingLight>What good looks like — and what prevents it.</SectionHeadingLight>

            <h3 className="font-semibold mb-4" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'The team includes at least two people who were in the research — they remember context that the card cannot carry.',
                'The naming step is taken seriously: cluster names are complete sentences that make a specific claim about what the data means.',
                'The most uncomfortable cluster — the one the team keeps moving cards out of — is examined carefully. Discomfort often marks the most important insight.',
                'Small clusters are not prematurely merged. A cluster of two cards that resists joining a larger group may be more important than the larger group.',
                'The session produces 4–8 named clusters from a typical body of research — enough to be comprehensive, few enough to hold in working memory and act on.',
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
                  mistake: 'Naming clusters as categories, not insights.',
                  fix: '"User pain points," "app usability," and "social features" are categories. They describe what the cards are about. An insight is a claim: "Users tolerate the first three steps because they expect checkout to be hard — but abandon when they feel the process has become unfair." The category is safe. The insight is arguable. Arguable is useful.',
                },
                {
                  mistake: 'Doing it without the people who were in the research.',
                  fix: 'A card says "felt judged." The researcher who was in the room knows whether this means judged by the instructor, by other participants, or by herself — a distinction that changes the design direction entirely. Affinity mapping without the researchers produces clusters of text, not clusters of meaning.',
                },
                {
                  mistake: 'Merging every small cluster into a larger one.',
                  fix: "A cluster that refuses to grow — one or two cards that don't fit anywhere — is either noise or the most important signal in the room. Before merging it, ask: why don't these cards fit with anything else? The answer is often more interesting than the merge.",
                },
                {
                  mistake: 'Stopping at the cluster instead of naming the insight.',
                  fix: 'A completed affinity map with unlabelled clusters is not a completed synthesis. The naming is not a label. It is the output. The name is what the team will carry into ideation, into briefings, into stakeholder conversations. An unnamed cluster is potential that has not been converted.',
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
          S8 — Logistics   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Logistics</SectionLabel>
            <SectionHeadingLight>Running the session from raw cards to named clusters.</SectionHeadingLight>
            <Body>
              Affinity mapping is best run in person on a large wall with physical cards &mdash; the physical act of
              moving cards is part of how meaning is made. For remote sessions, digital tools work, but the facilitator
              must be more active in managing the silent grouping phase: breakout rooms with card-sorting tasks are
              more effective than open collaborative canvases during the initial pass.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Time and preparation',
                  body: 'Allow 2–4 hours for a typical corpus of 60–120 cards. Larger bodies of research need more time, or should be split across multiple sessions by research theme. Preparation matters: all observations must be written on individual cards before the session begins. Transcribing during the session kills the rhythm.',
                },
                {
                  label: 'The silent phase is non-negotiable',
                  body: 'The initial grouping must happen without discussion. Discussion before grouping produces consensus around the most confident person in the room, not around what the data suggests. Silence during grouping reveals where disagreement actually lives — the cards that keep moving between groups are the ones worth talking about.',
                },
                {
                  label: 'One card can belong to two clusters',
                  body: "When a card creates genuine disagreement about where it belongs, duplicate it. A card that appears in two clusters often marks the boundary between two insights — understanding why it fits in both is usually more valuable than deciding which cluster 'wins.'",
                },
                {
                  label: 'The naming session is a separate step',
                  body: 'Do not try to name clusters during the grouping phase. Wait until the clusters have stabilized. Then call a naming session as a distinct activity: the team looks at each cluster and argues about what claim the cards in that cluster collectively support. The claim that survives the argument is the insight.',
                },
                {
                  label: 'Remote: works with preparation',
                  body: 'Affinity mapping works remotely on tools like Miro or FigJam. The key preparation: pre-populate the digital canvas with all cards before the session, use breakout rooms for the silent grouping phase to avoid herding, and run the naming step as a full-group plenary. The physical wall is better, but the method transfers.',
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
          S9 — AI and this method   DARK
          ───────────────────────────────────────────────────────── */}
      <DarkSection>
        <Container>
          <div className="py-20">
            <SectionLabel accent={NAVY}>AI and this method</SectionLabel>
            <SectionHeadingDark>AI clusters. Only the researcher can name what the cluster means.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see what changes when AI performs the clustering &mdash; and why the naming
              step cannot be delegated.
            </p>
            <AMAIReactivated />
          </div>
        </Container>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S10 — In-depth example   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>In-depth example</SectionLabel>
            <SectionHeadingLight>The same research corpus, organized two ways.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              An IDEO team is redesigning children&rsquo;s toothbrushes for Oral-B. Field research is complete.
              The mapping session uses the same 90 observation cards in both scenarios: once with the research team
              working from their notes, once with AI given the transcribed observations as text.
            </p>
            <AMExampleToggle />
          </div>
        </Container>
      </LightSection>

      {/* ─────────────────────────────────────────────────────────
          S11 — Frameworks   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Frameworks</SectionLabel>
            <SectionHeadingLight>Where affinity mapping shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Affinity mapping is a synthesis-phase tool. It appears in every framework that moves from raw qualitative
              research to structured insight &mdash; the moment when individual observations become patterns the team
              can design from.
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
          S12 — Related methods   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Related methods</SectionLabel>
            <SectionHeadingLight>What to combine with affinity mapping.</SectionHeadingLight>

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
          S13 — Sources & further reading   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={NAVY}>Sources &amp; further reading</SectionLabel>
            <SectionHeadingLight>The work behind this method.</SectionHeadingLight>

            <div className="flex flex-col gap-4">
              {[
                {
                  title:  'Contextual Design',
                  author: 'Hugh Beyer and Karen Holtzblatt',
                  year:   '1998',
                  note:   "The foundational text on Contextual Inquiry and affinity diagramming as a synthesis method. Beyer and Holtzblatt formalized the affinity mapping process — including the wall-based, bottom-up clustering approach and the emphasis on naming clusters as insights rather than categories — as part of the Contextual Design methodology.",
                },
                {
                  title:  'The Art of Innovation',
                  author: 'Tom Kelley and Jonathan Littman',
                  year:   '2001',
                  note:   "Documents IDEO's use of affinity mapping as a primary synthesis tool, including the toothbrush redesign case. Kelley's account of the process describes the physical wall, the silent sorting phase, and the critical act of naming what emerges — converting a cluster of cards into a design direction.",
                },
                {
                  title:  'Sprint',
                  author: 'Jake Knapp, John Zeratsky, and Braden Kowitz',
                  year:   '2016',
                  note:   "The Design Sprint book uses affinity mapping as a core tool for organizing the How Might We notes generated during Monday's observation sessions. Knapp's adaptation is compressed — the sprint context requires fast synthesis — and demonstrates how the method scales down to a one-hour session when the research corpus is small.",
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

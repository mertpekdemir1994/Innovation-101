import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import DSAIReactivated from './DSAIReactivated'
import DSExampleToggle from './DSExampleToggle'
import { DarkSection, LightSection, Container, SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

export const metadata: Metadata = {
  title: 'Diary Studies — Methods — Innovation 101',
}

const DSEstablishing = dynamic(() => import('./DSEstablishing'), { ssr: false })
const DSInteractive  = dynamic(() => import('./DSInteractive'),  { ssr: false })

const SAGE = '#3D6B5A'


// ── Data ──────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Discover',
    note: 'The Discover phase is built around understanding people before designing anything. A diary study is one of the few methods in the toolkit that captures what people actually do and feel over time, in natural context, without a researcher present. It produces the longitudinal, in-the-wild evidence the Discover phase is supposed to generate, and is especially suited to problems where a single interview or observation session would give an incomplete or misleading picture.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Empathize',
    note: 'The Empathize phase asks teams to understand the people they are designing for at a depth that goes beyond surface preferences and stated needs. Diary studies give access to the private, in-the-moment emotional experience (the friction, the workarounds, the moments of failure) that participants would not think to mention in an interview and would not perform accurately if asked. For behaviours that happen in private, over time, or in contexts a researcher cannot enter, diary studies are the Empathize method.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Informs the hypothesis',
    note: 'The Lean Startup cycle asks teams to form and test hypotheses quickly. A diary study sits upstream of the hypothesis: it surfaces the real behaviour pattern (what people actually do, when, where, and how they feel) before any hypothesis is built. A team running a diary study before their first experiment builds hypotheses grounded in observed longitudinal behaviour rather than assumed or retrospective answers. That is the difference between testing the right thing and testing the thing you already believed.',
  },
  {
    slug: 'agile-innovation',
    name: 'Agile Innovation',
    phase: 'Discovery Sprint',
    note: 'The Discovery Sprint establishes the research foundation for an Agile Innovation engagement. A diary study in the Discovery Sprint gives the team longitudinal behavioural evidence that sprint-based ethnography cannot provide: what patterns emerge across real days and weeks, not just in a single observed session. Where contextual observation produces depth on a specific moment, diary studies produce evidence on the pattern across moments, a critical complement for problems that live in habits, routines, and recurring friction.',
  },
]

type RelatedMethod = {
  slug: string | null
  name: string
  rel: string
  keyDistinction?: boolean
}

const RELATED_METHODS: RelatedMethod[] = [
  {
    slug: 'contextual-observation',
    name: 'Contextual Observation',
    keyDistinction: true,
    rel: 'The critical distinction: contextual observation places a researcher in the participant\'s environment for a single session (usually one to three hours) to observe behaviour in real context. Diary studies ask participants to log their own experience over days or weeks, without a researcher present. The methods are complementary but not interchangeable. Contextual observation produces depth on a specific moment with a researcher present to probe, follow threads, and notice what the participant does not. Diary studies produce breadth across time, capturing the recurring pattern, the private context, and the accumulated friction that no single observation session can access. Use contextual observation when the behaviour can be usefully observed in a single visit; use diary studies when the behaviour is longitudinal, private, or distributed across contexts.',
  },
  {
    slug: 'in-depth-interviews',
    name: 'In-Depth Interviews',
    rel: 'Diary studies and in-depth interviews work powerfully in sequence. A diary study accumulates real in-the-moment entries over time; the follow-up in-depth interview uses those entries as the conversation substrate: asking the participant to unpack specific entries, explain what was happening at a logged moment, and elaborate on the patterns the researcher has already identified across the accumulation. The entries make the interview richer because they are based on documented real experience, not memory reconstruction. Running both methods gives the team the longitudinal behavioural record and the contextual depth to interpret it.',
  },
  {
    slug: 'affinity-mapping',
    name: 'Affinity Mapping',
    rel: 'Diary studies produce a body of raw entries (often hundreds of logged moments across multiple participants) that need synthesis before they become insight. Affinity mapping is the primary method for organising and clustering that volume of material: each entry, quote, or observation is treated as a data point, and the mapping process groups them by theme, pattern, and meaning. The longitudinal pattern that a diary study reveals is usually not obvious in any individual entry; affinity mapping across the full corpus makes it legible.',
  },
  {
    slug: 'empathy-mapping',
    name: 'Empathy Mapping',
    rel: 'Empathy mapping synthesises what a person says, thinks, does, and feels into a structured representation of their inner experience. Diary entries are one of the richest inputs to an empathy map because they capture the emotional and behavioural reality of the moment: the actual feeling at the time, not a reconstructed or averaged version of it. An empathy map built from diary study data is grounded in real self-reported evidence rather than researcher inference.',
  },
  {
    slug: 'journey-mapping',
    name: 'Journey Mapping',
    rel: 'Journey mapping traces the arc of an experience across time: typically the steps of a process or interaction, and the emotions at each point. Diary study entries are a particularly strong input to a journey map because they are real in-the-moment records of what happened and how it felt, rather than reconstructed from memory after the fact. A journey map built from diary data reflects the actual emotional arc, including the friction and dropout moments that participants would not think to mention in a retrospective conversation.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DSPage() {
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
              Diary Studies
            </h1>

            <p
              className="mb-3 max-w-[620px]"
              style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}
            >
              Asking participants to log their own experiences in the moment, over days or weeks,
              to reveal the longitudinal patterns and private moments no single interview or
              observation could catch.
            </p>

            <p
              className="max-w-[520px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}
            >
              The pattern you are looking for is usually invisible in any single entry. It only surfaces across the accumulation.
            </p>
          </div>
        </Container>

        <div className="relative z-10 w-full px-space-6 md:px-space-10 pb-space-12 pt-space-6">
          <DSEstablishing />
        </div>
      </DarkSection>

      {/* ─────────────────────────────────────────────────────────
          S3 - What it is   LIGHT
          ───────────────────────────────────────────────────────── */}
      <LightSection>
        <Container prose>
          <div className="py-20">
            <SectionLabel accent={SAGE}>What it is</SectionLabel>
            <SectionHeadingLight>Not a snapshot. A self-reported record of real behaviour, accumulated over real time, until a pattern emerges.</SectionHeadingLight>

            <div className="flex flex-col gap-5">
              <Body>
                A diary study is a longitudinal research method in which participants document their
                own experiences, actions, emotions, and contexts as they happen, over a period that
                typically runs from several days to several weeks. The participant is the instrument.
                Rather than a researcher observing a moment or a participant recalling the past in an
                interview, the diary study captures the real, in-the-moment record from the person
                actually living the experience, in the context where it actually happens.
              </Body>
              <Body>
                The central premise of the method is that the most important behavioural truths are
                invisible in cross-sections. A single interview, a single observation, a single survey
                response each catches a moment but misses the pattern across moments. The recurring
                friction, the workaround that has become invisible through repetition, the emotional
                state that emerges only in a specific context at a specific time of day: these are
                the findings that live in the accumulation of entries, not in any individual one. The
                pattern is in the longitudinal record.
              </Body>
              <Body>
                The method does require sustained participation from real people across real time.
                That is not a limitation to be designed around. It is the mechanism of the method.
                The entries are only valuable because they are real, unmediated, and distributed across
                the variation of actual life. Any shortcut that generates entries without real people
                living real days destroys the method.
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
            <SectionLabel accent={SAGE}>Advance through the entries. Reveal the pattern.</SectionLabel>
            <SectionHeadingDark>No single entry contains the insight. Advance through the days until the pattern becomes impossible to miss.</SectionHeadingDark>
            <p
              className="mb-10 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Click each entry to read what the participant logged. Advance through the study
              period one entry at a time. The pattern (recurring context friction leading to
              dropout) only becomes visible after enough entries accumulate.
            </p>
            <DSInteractive />
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
            <SectionHeadingLight>For longitudinal behaviour, private context, and patterns that live across time rather than within any single moment.</SectionHeadingLight>

            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-4"
                  style={{ fontSize: 'var(--text-2xs)', color: SAGE }}>
                  Use it when
                </p>
                <ul className="flex flex-col gap-3">
                  {[
                    'The behaviour you need to understand plays out over days or weeks, not in a single moment: habits, routines, recurring friction, gradual adaptation.',
                    'The relevant context is private or inaccessible: the home, the early morning, the moment of frustration at a desk, places and times where a researcher cannot be present.',
                    'Retrospective interviews keep producing generic, averaged, or post-rationalised answers that do not match what you observe when you are present.',
                    'You suspect there is a pattern across moments (a recurring trigger, a recurring failure, a recurring workaround) that is invisible in any single data point.',
                    'You need to understand how experiences and emotions vary across contexts, times of day, or days of the week for the same person.',
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
                    'The behaviour is a one-time event or a single-session interaction. Diary studies derive their value from the accumulation across time: if there is no time dimension, there is no pattern to reveal.',
                    'You need the evidence quickly. A rigorous diary study runs for at least one to two weeks. If the timeline does not allow for that, a contextual observation session or in-depth interview is the right substitute.',
                    'Participant burden is prohibitively high. Diary studies require ongoing effort from participants across multiple days. If participants cannot sustain that commitment (due to the nature of the task, the population, or the incentive structure) participation will collapse and the accumulation will be incomplete.',
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
                The honest limit: participation decay is the method&rsquo;s primary failure mode. Participants
                log richly for the first few days and then entries become sparser, shorter, and less
                specific as the study progresses. Any study design that does not actively address
                sustaining participation will produce a front-loaded dataset that tells you about the
                first few days and almost nothing about the rest. The entry quality at day ten matters
                more than the quality at day one.
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
            <SectionHeadingLight>Seven moves, from study design to longitudinal pattern.</SectionHeadingLight>

            <div className="flex flex-col gap-7 mt-2">
              {[
                {
                  n: '01',
                  title: 'Define exactly what you need participants to log.',
                  body: 'The logging prompt is the most consequential design decision in a diary study. It must be specific enough to generate comparable, analysable entries across participants, but open enough to capture the unexpected. A prompt that asks only for what happened will produce event lists; a prompt that asks for what happened, where, how the participant felt, and what they did or did not do next is far more likely to produce the emotional and contextual richness that makes the method worth running.',
                },
                {
                  n: '02',
                  title: 'Choose a logging medium that minimises friction.',
                  body: 'The easier it is to log, the more entries you will get, and the more entries you get, the richer the accumulation. The medium should match the participant\'s natural context: text messages for quick in-the-moment captures, voice notes for moments when typing is not possible, photos for context that words do not capture efficiently. Avoid logging media that require participants to sit down, open a laptop, or fill in a form. Each step between the moment and the log is an opportunity for the moment to pass unrecorded.',
                },
                {
                  n: '03',
                  title: 'Recruit for the range of contexts you need to understand.',
                  body: 'Diary study participants are not just informants. They are the environment for the study. Recruiting for homogeneity produces homogeneous entries; recruiting for the range of contexts, life situations, and usage patterns relevant to the problem produces the variation that reveals what is universal and what is context-dependent. Six to eight participants is a common target for a focused study; more can be valuable when the range of contexts is wide.',
                },
                {
                  n: '04',
                  title: 'Brief participants fully before the study begins.',
                  body: 'Participants need to understand what to log, when to log it, how to log it, and why the in-the-moment timing matters. The single most important thing to communicate is that a log made at the moment of the experience is worth ten logs made from memory an hour later. Participants who understand the mechanism of the method (that the value is in the real-time record) are more likely to log immediately rather than defer and forget.',
                },
                {
                  n: '05',
                  title: 'Maintain active contact throughout the study period.',
                  body: 'The researcher should check in regularly, not to evaluate the participant, but to sustain engagement and log quality. A message that asks about a specific entry ("you mentioned feeling frustrated on day 3, can you tell me more about that context?") does two things simultaneously: it signals to the participant that their entries are being read and matter, and it generates richer data on the moments that appear most significant. Passive diary studies where the researcher disappears for two weeks produce decaying data.',
                },
                {
                  n: '06',
                  title: 'Read the whole corpus before looking for patterns.',
                  body: 'Analysis begins with immersion: reading every entry from every participant across the full study period before drawing any conclusions. The pattern is in the accumulation, and it will not be visible if the researcher is pattern-matching on individual entries. Read first; cluster and code after. The entries that seem unremarkable in isolation are often the ones that anchor the most important pattern when seen in the context of what came before and after them.',
                },
                {
                  n: '07',
                  title: 'Follow up with participants to interrogate the entries.',
                  body: 'The diary entries are a starting point, not an end product. The follow-up interview (conducted after the study period, with the entries as the conversation substrate) is where the researcher interrogates the most significant moments: what was happening, what the participant was feeling, what they did next, and whether what they logged captures the full experience or only part of it. Participants often log the outcome; the interview surfaces the process. Both are needed.',
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
            <SectionHeadingLight>What separates a diary study that reveals a pattern from one that produces a pile of sparse entries.</SectionHeadingLight>

            <h3 className="font-semibold mb-4"
              style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
              When it goes well
            </h3>
            <ul className="flex flex-col gap-3 mb-10">
              {[
                'Participants log immediately at the moment of the experience, not retrospectively, and the researcher has done the design work to make immediate logging as low-friction as possible.',
                'The researcher maintains active contact throughout: following up on specific entries, asking about significant moments, and sustaining participation from day one to the end.',
                'The briefing communicates clearly why the in-the-moment timing matters, and participants understand that deferred logging loses the emotional truth of the moment.',
                'Analysis begins with full immersion in the complete corpus before any coding or pattern work begins.',
                'Follow-up interviews use the entries as the conversation substrate, interrogating the most significant moments to surface the context and process behind what was logged.',
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
                  mistake: 'Logging prompts that are too open.',
                  fix: 'A prompt that simply says "log your experiences today" produces diary entries: narrative summaries of the day, written from memory, that reproduce the same retrospective abstractions an interview would generate. The prompt must specify the unit (the moment, the event, the incident) and ask for the real-time emotional and contextual data: where, what, how it felt, what you did or did not do. The prompt design determines the data quality.',
                },
                {
                  mistake: 'Passive study management.',
                  fix: 'A researcher who sends the briefing, waits two weeks, and collects the entries at the end will get a front-loaded, decaying dataset. Participation collapses without active maintenance. Regular check-ins, specific questions about previous entries, and genuine engagement from the researcher across the study period are not optional extras. They are the mechanism that sustains the data quality the method depends on.',
                },
                {
                  mistake: 'Accepting retrospective logs as equivalent to in-the-moment logs.',
                  fix: 'A log made six hours after the moment it describes has been filtered through memory, edited by reflection, and stripped of the emotional immediacy that makes it useful. The most valuable data in a diary study is the log made while the participant is still in the context, or immediately after leaving it. Study design should make that the path of least resistance, not the effortful option.',
                },
                {
                  mistake: 'Pattern-matching on individual entries.',
                  fix: 'The most common analysis error is reading entries as they come in and building a theory from the most striking ones. The pattern is in the accumulation. The entry that appears ordinary in isolation often turns out to be part of the most important recurring sequence when seen across the full corpus. Read everything first; analyse after.',
                },
                {
                  mistake: 'Treating the entries as the final data.',
                  fix: 'Diary entries capture what the participant logged, which is often the outcome or the surface event, not the full experience. The follow-up interview, with the entries on the table, is where the researcher asks about process: what was happening before the logged moment, what the participant tried and rejected, what they did not log and why. The entries and the interviews together are the complete dataset.',
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
            <SectionHeadingLight>Running a study that sustains participation from day one to the end.</SectionHeadingLight>
            <Body>
              A diary study typically runs for one to four weeks with five to fifteen participants.
              The study period length should be determined by the behaviour being studied: long enough
              to capture the recurring pattern across multiple cycles, short enough that participants
              can sustain meaningful engagement. For many consumer and workplace behaviours, two weeks
              is sufficient; longer studies require especially strong participant motivation and active
              researcher maintenance throughout.
            </Body>

            <div className="flex flex-col gap-7 mt-10">
              {[
                {
                  label: 'Design for minimum logging friction',
                  body: 'Every barrier between the participant and the log is a dropout risk. The ideal logging medium is the one participants already have in their hand at the moment of the experience: their phone. Text messages, voice notes, and photos are more likely to generate timely entries than dedicated apps or web forms that require opening a browser, logging in, and navigating to a form. The study design should match the logging medium to the natural behaviour of the participant in the relevant context.',
                },
                {
                  label: 'Send a sample entry before the study begins',
                  body: 'Participants often do not know what a "good" diary entry looks like until they have seen one. Provide a worked example, a sample entry for a different topic that shows the level of specificity expected: the time, the place, what was happening, what the participant felt, and what they did or did not do as a result. A participant who has seen a model entry produces richer data from day one.',
                },
                {
                  label: 'Build a triggering prompt into the logging medium',
                  body: 'If participants are logging via a messaging channel, send a triggering reminder at the times and contexts where the relevant behaviour is most likely to occur. This is not surveillance. It is a prompt that says "now might be a relevant moment." The best triggers are context-specific: "heading into a meeting that involves the thing we\'re studying?" rather than a generic daily notification. The prompt converts the method\'s reliance on participant memory into an active researcher intervention.',
                },
                {
                  label: 'Schedule follow-up interviews before the study ends',
                  body: 'Book follow-up interviews with each participant before the study period closes. Having a confirmed conversation on the calendar provides a natural deadline that sustains participation through the final days. Participants are more likely to log consistently when they know they will be asked about their entries. The interviews should be scheduled immediately after the study period ends, while the experience is still fresh.',
                },
                {
                  label: 'Plan for a corpus, not individual entries',
                  body: 'The unit of analysis is the corpus across the full study period, not the individual entry. Plan the analysis process before the study begins: what will be done with 200 entries across 10 participants? Affinity mapping is the most common approach: each entry is a data point that is clustered, coded, and synthesised. Budget for the full analysis, which is typically one to three days for a focused study. Entries that accumulate without a synthesis plan are insight-generation opportunities that do not convert into insight.',
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
            <SectionHeadingDark>AI can scale the analysis and sustain the logging. It cannot be the participant. The entries must come from real people living real days.</SectionHeadingDark>
            <p
              className="mb-12 max-w-[580px]"
              style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)' }}
            >
              Toggle between modes to see how human-led analysis surfaces the longitudinal pattern,
              and how AI can cluster and tag the same real entries at scale, and where the method&rsquo;s
              dependency on real lived experience creates a hard boundary for AI substitution.
            </p>
            <DSAIReactivated />
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
            <SectionHeadingLight>Spotify: the pattern that was invisible in every interview, visible across two weeks of diary entries.</SectionHeadingLight>
            <p
              className="mb-10"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              Retrospective interviews about music listening produced generic, occasion-based answers.
              A two-week diary study, capturing the moment across real listening contexts, revealed
              that music is driven by context and mood, not genre, and that recurring friction at
              context transitions is the product problem. Toggle between the human-led study and the
              AI paths to see what each produces.
            </p>
            <DSExampleToggle />
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
            <SectionHeadingLight>Where Diary Studies shows up.</SectionHeadingLight>
            <p
              className="mb-8"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)' }}
            >
              A discovery and research method for longitudinal behavioural evidence, it appears
              at the start of phases where the team needs to understand what people actually do
              and feel across time and private contexts, not just what they remember or report.
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
            <SectionHeadingLight>What to pair with Diary Studies.</SectionHeadingLight>

            <div className="flex flex-col gap-3">
              {RELATED_METHODS.map(({ slug, name, rel, keyDistinction }) => (
                <div
                  key={name}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 rounded-lg p-4"
                  style={{
                    border: keyDistinction
                      ? `1px solid rgba(61,107,90,0.28)`
                      : '1px solid var(--color-neutral-100)',
                    background: keyDistinction ? 'rgba(61,107,90,0.03)' : undefined,
                  }}
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
                    {keyDistinction && (
                      <p className="font-mono uppercase tracking-widest mt-1"
                        style={{ fontSize: 'var(--text-2xs)', color: SAGE }}>
                        key distinction
                      </p>
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
                  note:   'The standard reference for design research methods, including diary studies as a longitudinal technique for accessing the private, in-context, over-time behaviours that other methods cannot reach. Martin and Hanington\'s treatment of diary studies situates them within the broader research toolkit and makes explicit the relationship between the method\'s reliance on participant self-reporting and the kinds of behavioural truth that no researcher-present method can access. Their emphasis on logging immediacy (the moment, not the memory) is the operational insight that distinguishes a well-designed diary study from an extended survey.',
                },
                {
                  title:  'Convivial Toolbox: Generative Research for the Front End of Design',
                  author: 'Elizabeth B.-N. Sanders and Pieter Jan Stappers',
                  year:   '2012',
                  note:   'Sanders and Stappers provide the theoretical grounding for why self-documentation methods (diaries, probes, cultural inventories) access a different layer of human experience than researcher-led methods. Their framing of the "design probe" and self-documentation as a way to access the tacit, the private, and the pre-verbal is the foundation for understanding what diary studies are doing epistemologically: generating evidence about the participant\'s experience from inside it, rather than from a researcher\'s observation of it from outside. The book also situates diary studies within generative research, the front end of design where the question is not "does this solution work?" but "what is the real problem?"',
                },
                {
                  title:  'Interviewing Users: How to Uncover Compelling Insights',
                  author: 'Steve Portigal',
                  year:   '2013',
                  note:   'Portigal\'s treatment of contextual and longitudinal research is the clearest articulation of why the diary study follow-up interview is not optional. The entries a participant logs are what they logged, not necessarily what they experienced. The interview, conducted with the entries on the table, is where the researcher asks about the process, the context, the emotion, and the meaning behind what was documented. Portigal\'s techniques for using artefacts and documents as conversation substrates apply directly to diary study follow-up interviews: the entry is the artefact that makes the conversation specific, grounded, and resistant to the post-rationalisation that characterises retrospective interviews conducted without such grounding.',
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

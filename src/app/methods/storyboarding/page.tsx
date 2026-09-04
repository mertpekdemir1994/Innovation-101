import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SBEstablishing from './SBEstablishing'
import SBExampleToggle from './SBExampleToggle'
import { SectionLabel, SectionHeadingDark, SectionHeadingLight, Body } from '../../../components/method/Primitives'

const SBInteractive   = dynamic(() => import('./SBInteractive'),   { ssr: false })
const SBAIReactivated = dynamic(() => import('./SBAIReactivated'), { ssr: false })

export const metadata: Metadata = {
  title: 'Storyboarding · Methods',
  description: 'Drawing a proposed experience frame by frame, before anything is built, so that the moments you cannot draw reveal the parts of the idea that do not work.',
}

const CLAY = '#B5613E'

// ── Layout helpers ──────────────────────────────────────────────────────────

function DarkSection({ children }: { children: React.ReactNode }) {
  return (
    <section className="dark-section" style={{ background: 'var(--color-dark)' }}>
      <div className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
        {children}
      </div>
    </section>
  )
}

function LightSection({ children }: { children: React.ReactNode }) {
  return (
    <section style={{ background: 'var(--color-background)' }}>
      <div className="max-w-content mx-auto px-6 md:px-8 py-20 md:py-28">
        {children}
      </div>
    </section>
  )
}

function Container({ children, prose = false }: { children: React.ReactNode; prose?: boolean }) {
  return (
    <div className={prose ? 'max-w-prose mx-auto px-6 md:px-8' : 'w-full'}>
      {children}
    </div>
  )
}

// ── Data ────────────────────────────────────────────────────────────────────

const FRAMEWORK_LINKS = [
  {
    slug: 'design-sprint',
    name: 'Design Sprint',
    phase: 'Wednesday',
    note: 'On Wednesday of a Design Sprint, the team sketches solutions individually. Storyboarding is not a named step, but the act of drawing a solution in sequential frames is the Wednesday motion. The critical discipline is the same: any frame that says the product "intelligently" does something must be made concrete before Thursday\'s prototype can be built. The gap that appears in a Wednesday sketch is a signal, not a problem: it names what the prototype needs to test.',
  },
  {
    slug: 'design-thinking',
    name: 'Design Thinking',
    phase: 'Ideate / Prototype',
    note: 'Storyboarding sits at the junction of Ideate and Prototype. In Ideation it is generative: drawing multiple concept sequences quickly exposes which directions survive contact with a real experience. In Prototype it becomes evaluative: the frame nobody can draw signals which concept has not reached a specific enough idea to build. The method\'s job changes at the boundary, but the logic is the same in both phases.',
  },
  {
    slug: 'double-diamond',
    name: 'Double Diamond',
    phase: 'Develop',
    note: 'In the Develop phase, storyboarding is how rough concepts become concrete enough to test. The sequence forces specificity about what the user actually does, not what they might do, and not what the product "magically" enables. The gap in the storyboard is the signal that development has not yet reached a specific enough idea. You cannot develop what you cannot draw.',
  },
  {
    slug: 'lean-startup',
    name: 'Lean Startup',
    phase: 'Build',
    note: 'Before a build begins, a storyboard is a narrative check on the hypothesis. The frame nobody can draw is the frame the build is going to be wrong about. Drawing the sequence before sprint planning gives the team a visible map of what they are claiming to make, and makes the untested mechanisms visible before they are embedded in architecture.',
  },
]

const RELATED_METHODS = [
  {
    slug: 'journey-mapping',
    name: 'Journey Mapping',
    rel: 'Journey Mapping traces the full end-to-end experience across all touchpoints and emotional states. Storyboarding focuses on a single scenario, usually a specific moment of value, and asks whether the concept for that moment holds together. Use the map to find the moment worth storyboarding; use the storyboard to find out whether the concept for that moment actually works. They answer different questions at different scales.',
  },
  {
    slug: 'rapid-prototyping',
    name: 'Rapid Prototyping',
    rel: 'Storyboarding and rapid prototyping are two ends of the same intent: making the concept concrete before it is built. The storyboard is earlier: it is the test of whether the concept is worth prototyping. The gap in the storyboard identifies what the prototype needs to prove. Build the prototype to answer the question the gap named, not to bring the storyboard to life.',
  },
  {
    slug: 'assumption-mapping',
    name: 'Assumption Mapping',
    rel: 'Storyboarding surfaces assumptions by forcing you to draw them. Assumption Mapping takes the assumptions the storyboard revealed (especially those in the gap) and sorts them by importance and uncertainty. The storyboard is the excavation; Assumption Mapping is the triage. Use them in sequence: the storyboard to find what you are assuming, and Assumption Mapping to decide which assumption to test first.',
  },
  {
    slug: 'crazy-8s',
    name: 'Crazy 8s',
    rel: 'Crazy 8s generates many rough concept directions quickly; storyboarding takes one of those directions and asks whether it holds together in sequence. They are close in time: sketch the breadth with Crazy 8s, then follow the most promising direction into a storyboard to find out whether the concept survives the full experience. The frame nobody can draw in the storyboard is often the frame that would have been the decisive eighth sketch.',
  },
  {
    slug: 'concept-testing',
    name: 'Concept Testing',
    rel: 'When the storyboard exposes a specific gap, concept testing is the method that fills it. You cannot draw the frame because you do not know what the user will do, or whether the mechanism you have in mind will work. Concept testing finds out. The storyboard names the question precisely enough to test; concept testing runs the experiment. Together they move from "we do not know" to "we tested it."',
  },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default function StoryboardingPage() {
  return (
    <>
      {/* S1 - Header DARK */}
      <DarkSection>
        <span
          className="inline-block font-mono uppercase tracking-widest rounded-full px-3 py-1 mb-6"
          style={{
            fontSize: 'var(--text-2xs)',
            color: '#FFD588',  /* CLAY, brightened for text contrast */
            background: 'rgba(181,97,62,0.12)',
            border: '1px solid rgba(181,97,62,0.28)',
          }}>
          Ideation &amp; Prototyping
        </span>
        <h1
          className="font-display font-semibold text-balance mb-5"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}>
          Storyboarding
        </h1>
        <p className="mb-4 max-w-[680px]"
          style={{ fontSize: 'var(--text-xl)', color: 'rgba(255,255,255,0.70)', lineHeight: 1.5 }}>
          Drawing a proposed experience frame by frame, before anything is built, so that the moments you
          cannot draw reveal the parts of the idea that do not work.
        </p>
        <p className="max-w-[540px]"
          style={{ fontSize: 'var(--text-base)', color: 'var(--color-dark-muted)', fontStyle: 'italic' }}>
          A deck lets you write &ldquo;and then it intelligently surfaces the right answer.&rdquo; A storyboard
          makes you draw it. The frame you cannot draw is the idea you do not have.
        </p>
      </DarkSection>

      {/* S2 - Establishing visual DARK */}
      <DarkSection>
        <SectionLabel accent={CLAY}>The visual</SectionLabel>
        <SectionHeadingDark>Five frames. The sequence halts at the one nobody could draw. That halt is the method.</SectionHeadingDark>
        <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.55)', lineHeight: 'var(--leading-relaxed)' }}>
          Three frames build the story. The fourth, the frame nobody could draw, is empty. The fifth frame
          shows the outcome, dimmed and unreachable until the gap is crossed. The gap is not a failure of the
          exercise. It is the finding.
        </p>
        <SBEstablishing />
      </DarkSection>

      {/* S3 - What it is LIGHT */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={CLAY}>What it is</SectionLabel>
          <SectionHeadingLight>If you cannot draw the frame, you do not have the idea.</SectionHeadingLight>
          <Body>
            Storyboarding is the practice of drawing a proposed experience frame by frame, not to produce a
            beautiful illustration, but to force the concept into specific, sequential decisions. You choose
            what happens in each frame. You draw who is involved, what they are doing, what they see, and what
            the product does. The act of drawing is the discipline: it is much harder to claim a mechanism
            exists when you have to show it.
          </Body>
          <Body>
            The core teaching is not about drawing. It is about what happens when you cannot draw a frame. A
            team pitching a meal-planning app can write &ldquo;the app intelligently suggests a recipe based on
            what the user has at home&rdquo; in a slide, in a document, in a brief. None of those formats asks
            the team to draw how the app knows what is in the fridge. A storyboard does. And at the moment
            they try to draw frame four (the mechanism by which the app knows the fridge contents) they
            discover they have three different assumptions about it, none of which they have tested.
          </Body>
          <Body>
            That moment of discovery is the method. The gap in the storyboard is not a problem with the
            exercise. It is the exercise doing its job. A story that cannot get from frame three to frame five
            is a concept that has not been thought through. Storyboarding exists to find that gap before the
            build begins, not after sprint four.
          </Body>
        </Container>
      </LightSection>

      {/* S4 - Interactive DARK */}
      <DarkSection>
        <SectionLabel accent={CLAY}>Try it</SectionLabel>
        <SectionHeadingDark>Click each frame. Find what it assumes. Try to fill the gap.</SectionHeadingDark>
        <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.50)', lineHeight: 'var(--leading-relaxed)' }}>
          Every frame contains an assumption. The first two are probably safe. The third is less safe than
          it looks. When you try to fill the gap, you will find that every attempt names a new assumption
          rather than closing the old one. That is not a failure of the exercise.
        </p>
        <SBInteractive />
      </DarkSection>

      {/* S5 - When to deploy LIGHT */}
      <LightSection>
        <Container>
          <SectionLabel accent={CLAY}>When to deploy it</SectionLabel>
          <SectionHeadingLight>Use it before you build anything, especially before you are confident the concept works.</SectionHeadingLight>

          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <div>
              <p className="font-mono uppercase tracking-widest mb-4"
                style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>Use it when</p>
              <ul className="flex flex-col gap-3">
                {[
                  'The team can describe the concept but has not drawn what the user actually does in each moment of it.',
                  'A mechanism in the concept has been named but not designed: anything described with "automatically," "intelligently," or "seamlessly."',
                  'Different people in the room hold different mental models of the experience, and you need a shared, honest sequence to compare them.',
                  'You are about to begin building and want to confirm that every frame of the concept is specific enough to be built.',
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
                style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>Do not lean on it when</p>
              <ul className="flex flex-col gap-3">
                {[
                  'You want to generate many concept directions quickly; that is Crazy 8s, which produces breadth; storyboarding asks one concept to go deep.',
                  'The concept is at the level of a whole journey across many sessions and touchpoints; that is Journey Mapping; storyboarding works best on a single, specific scenario.',
                  'The purpose is communication or presentation rather than discovery. A storyboard used to sell an idea rather than test it loses its honesty.',
                  'The team is drawing frames they cannot yet draw, and labelling them rather than naming the gap. A storyboard filled with labels is a slide deck.',
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

          <div className="max-w-prose mx-auto mt-8 p-5 rounded-lg"
            style={{ background: 'rgba(181,97,62,0.05)', border: '1px solid rgba(181,97,62,0.16)' }}>
            <p className="font-mono uppercase tracking-widest mb-2"
              style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>The honest limit</p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              Storyboarding finds gaps; it does not close them. The gap names a question the team cannot yet answer.
              That question still needs an answer: from concept testing, from a prototype, from a research session.
              Finding the gap is the first job. Crossing it is the next one.
            </p>
          </div>
        </Container>
      </LightSection>

      {/* S6 - How it works LIGHT */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={CLAY}>How it works</SectionLabel>
          <SectionHeadingLight>Draw the sequence. Name the assumptions. Find the frame you cannot draw.</SectionHeadingLight>

          <div className="flex flex-col gap-6 mt-8">
            {[
              {
                n: '01',
                title: 'Choose a specific scenario, not a typical user',
                body: 'A storyboard begins with one person, in one situation, doing one thing. Not "a user wants to plan meals", but "a parent, opening the fridge at 5pm on a Wednesday, with no idea what to cook." The more specific the scenario, the harder it is to hide behind generality in later frames.',
              },
              {
                n: '02',
                title: 'Agree on the beginning and end before drawing the middle',
                body: 'What is the first frame? What does the experience look like before the concept exists? What is the last frame? What does success look like for this person? Fix both ends first. The frames in between are the claim your concept is making.',
              },
              {
                n: '03',
                title: 'Draw rough: the quality of the drawing is not the point',
                body: 'Stick figures, rough rectangles, gestural marks. The drawing does not need to be understood by anyone outside the room. It needs to be honest. A sophisticated illustration can mask the same gap that a rough sketch exposes immediately. Do not let drawing skill become drawing confidence.',
              },
              {
                n: '04',
                title: 'Name what each frame shows, and what it assumes',
                body: 'For each frame: what does the user see? What does the user do? What does the product do? And what has to be true for this frame to work? Writing the assumption explicitly is the step teams skip, and it is where the method\'s value lives.',
              },
              {
                n: '05',
                title: 'Find the frame nobody can draw',
                body: 'At some point in the sequence, a frame will resist being drawn. Someone will reach for a label instead: "the app intelligently...", "the system automatically...". Stop there. That is the gap. Mark it, name it, and treat it as the most important frame in the board. Everything before it builds toward it; everything after it depends on it.',
              },
              {
                n: '06',
                title: 'Let the gap determine what comes next',
                body: 'The gap is not the end of the exercise; it is the beginning of the next one. What question does the gap name? Who can answer it? Does crossing the gap require a research session, a prototype, a technical spike? The storyboard gives you the question; the answer comes from whatever comes next.',
              },
            ].map(({ n, title, body }) => (
              <div key={n} className="flex gap-6">
                <div className="flex-shrink-0 w-8 pt-1">
                  <span className="font-mono" style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>{n}</span>
                </div>
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
        </Container>
      </LightSection>

      {/* S7 - Best practices LIGHT */}
      <LightSection>
        <Container prose>
          <SectionLabel accent={CLAY}>Best practices</SectionLabel>
          <SectionHeadingLight>A storyboard with no gaps is a slide deck. A gap is a finding, not a failure.</SectionHeadingLight>

          <div className="space-y-4 mt-6">
            <p className="font-mono uppercase tracking-widest mb-4"
              style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>When it goes well</p>
            <div className="grid gap-3">
              {[
                'The scenario is specific enough that a real person in a real situation can be drawn in frame one.',
                'Every frame shows a behaviour: what the user does or sees, not a mechanism or a label.',
                'The team finds at least one frame they cannot draw, and treats it as the most valuable output of the session.',
                'The gap is named precisely: not "the app does something here" but "we need to know whether users will photograph their fridge contents weekly."',
                'The storyboard ends with a question, not a conclusion, and the question determines what the next method is.',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 p-4 rounded-lg"
                  style={{ background: 'rgba(181,97,62,0.04)', border: '1px solid rgba(181,97,62,0.12)' }}>
                  <span style={{ color: CLAY, flexShrink: 0 }}>✓</span>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <p className="font-mono uppercase tracking-widest mt-8 mb-4"
              style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>The mistakes</p>
            <div className="grid gap-3">
              {[
                { label: 'Drawing what the product does instead of what the user does.', body: 'A storyboard full of product screens and UI wireframes is a prototype in disguise. The sequence should follow the person, not the interface. What is the user doing, and why, in each frame?' },
                { label: 'Labelling the gap instead of naming it.', body: '"Frame 4: App suggests recipe." That is a label, not a frame. A frame shows what the person sees and does. The label hides the question. Name the question instead: what must be true for this frame to exist?' },
                { label: 'Treating the finished storyboard as the output.', body: 'The output is the gap. If the team leaves the session with a complete storyboard and no named question, the method has been used as a presentation tool rather than a discovery tool.' },
                { label: 'Skipping the assumptions.', body: 'Every frame contains a claim. Not writing the claim down means it will be carried forward implicitly, unexamined, into the prototype and the build. The assumption that was never written is always the one that breaks last and costs most.' },
                { label: 'Drawing only one version.', body: 'If the concept has a gap, there may be several ways to cross it. Drawing two or three versions of the gap frame (each with a different mechanism) reveals that each version is actually a different product. That is useful information.' },
              ].map(({ label, body }) => (
                <div key={label} className="p-4 rounded-lg"
                  style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-200)' }}>
                  <p className="font-semibold mb-1"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {label}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S8 - Logistics LIGHT */}
      <LightSection>
        <Container>
          <div className="border-t pt-20" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={CLAY}>Logistics</SectionLabel>
            <SectionHeadingLight>Everyone draws. Small enough that the gap is felt by everyone in the room.</SectionHeadingLight>

            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>Time</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  One to two hours for a first-pass sequence. An afternoon to walk it with the team, name the
                  assumptions, and find the gap. Revisited when the concept changes, not on a calendar.
                </p>
              </div>
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>Who</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  3–8 people. Small enough that everyone draws; if someone is watching rather than drawing,
                  they are observing another team&rsquo;s assumptions rather than examining their own. The gap is most
                  useful when it is felt collectively: the moment the room falls silent at frame four matters.
                </p>
              </div>
              <div>
                <p className="font-mono uppercase tracking-widest mb-3"
                  style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>Approach</p>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
                  Physical first: large paper, markers, rough drawings pinned to a wall. Digital tools add
                  friction and tempt teams toward visual quality. Keep the drawings rough. The gap is easier
                  to find when the board looks unfinished.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S9 - AI DARK */}
      <DarkSection>
        <SectionLabel accent={CLAY}>AI and this method</SectionLabel>
        <SectionHeadingDark>AI eliminates the drawing barrier. It does not eliminate the gap; it hides it.</SectionHeadingDark>
        <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.48)', lineHeight: 'var(--leading-relaxed)' }}>
          Toggle between modes. AI as author generates a complete storyboard quickly, and illustrates the gap
          with a label rather than a frame. AI as adversary reads your storyboard and finds the label faster
          than any workshop can. One of these uses is valuable.
        </p>
        <SBAIReactivated />
      </DarkSection>

      {/* S10 - Example LIGHT */}
      <LightSection>
        <SectionLabel accent={CLAY}>In practice</SectionLabel>
        <SectionHeadingLight>A meal-planning app team draws five frames. The fourth one stops the room.</SectionHeadingLight>
        <p className="max-w-prose mx-auto px-6 md:px-8 mb-10"
          style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
          Tab A shows the storyboard working: the team finds the gap, names it precisely, and changes the
          concept before a single line of code is written. Tab B shows what happens when AI generates the
          storyboard instead, and the gap is illustrated rather than crossed.
        </p>
        <SBExampleToggle />
      </LightSection>

      {/* S11 - Frameworks LIGHT */}
      <LightSection>
        <Container>
          <div className="border-t pt-8" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={CLAY}>Where it fits in the frameworks</SectionLabel>
            <SectionHeadingLight>Storyboarding appears wherever a framework needs a concept to become specific.</SectionHeadingLight>

            <div className="flex flex-col gap-6 mt-8">
              {FRAMEWORK_LINKS.map(({ slug, name, phase, note }) => (
                <div key={slug} className="p-6 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <Link href={`/framework/${slug}`}
                      className="font-semibold hover:opacity-70 transition-opacity"
                      style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
                      {name}
                    </Link>
                    <span style={{ color: 'var(--color-neutral-300)' }}>·</span>
                    <span className="font-mono uppercase tracking-widest"
                      style={{ fontSize: 'var(--text-2xs)', color: CLAY }}>
                      {phase}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S12 - Related methods LIGHT */}
      <LightSection>
        <Container>
          <div className="border-t pt-8" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={CLAY}>Related methods</SectionLabel>
            <SectionHeadingLight>Methods that work before, alongside, or after the storyboard, including the rest of the Ideation &amp; Prototyping group.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-8">
              {RELATED_METHODS.map(({ slug, name, rel }) => (
                <div key={slug} className="p-5 rounded-lg"
                  style={{ border: '1px solid var(--color-neutral-200)' }}>
                  <div className="mb-2">
                    <Link href={`/methods/${slug}`}
                      className="font-semibold hover:opacity-70 transition-opacity"
                      style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                      {name}
                    </Link>
                  </div>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {rel}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </LightSection>

      {/* S13 - Sources LIGHT */}
      <LightSection>
        <Container prose>
          <div className="border-t pt-8" style={{ borderColor: 'var(--color-neutral-200)' }}>
            <SectionLabel accent={CLAY}>Sources and further reading</SectionLabel>
            <SectionHeadingLight>The books and practices behind the method.</SectionHeadingLight>

            <div className="flex flex-col gap-4 mt-8">
              {[
                {
                  citation: 'Knapp, J., Zeratsky, J., & Kowitz, B. (2016). Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days. Simon & Schuster.',
                  note: 'The Design Sprint book describes the Wednesday sketching session in detail: the closest equivalent to formal storyboarding in any widely used framework. The logic of drawing before prototyping is core to the Sprint methodology.',
                },
                {
                  citation: 'Buxton, B. (2007). Sketching User Experiences. Morgan Kaufmann.',
                  note: 'The essential text on the value of rough, honest sketching over polished illustration in the early stages of design. The argument for why drawing quality should not track confidence applies directly to the storyboard discipline.',
                },
                {
                  citation: 'Goodwin, K. (2009). Designing for the Digital Age. Wiley.',
                  note: 'Covers scenario-based design and the use of storyboards as tools for testing conceptual coherence, particularly the gap between what a product is supposed to do and what it can actually be designed to do.',
                },
              ].map(({ citation, note }) => (
                <div key={citation} className="p-5 rounded-lg"
                  style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-neutral-200)' }}>
                  <p className="font-semibold mb-2"
                    style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
                    {citation}
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom nav */}
            <div className="mt-20 pt-10 border-t" style={{ borderColor: 'rgba(181,97,62,0.12)' }}>
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div>
                  <p className="font-mono uppercase tracking-widest mb-1"
                    style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-neutral-500)' }}>
                    Ideation &amp; Prototyping — Method 6 of 6
                  </p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-500)' }}>
                    40 methods across 6 stage groups
                  </p>
                </div>
                <Link href="/methods"
                  className="font-semibold hover:underline"
                  style={{ fontSize: 'var(--text-base)', color: CLAY }}>
                  All methods →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </LightSection>
    </>
  )
}

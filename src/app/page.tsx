import Link from 'next/link'
import Image from 'next/image'
import {
  DarkSection,
  LightSection,
  WarmSection,
  Container,
  SectionLabel,
  SectionHeadingDark,
  SectionHeadingLight,
  Body,
} from '../components/method/Primitives'
import HeroField from '@/components/homepage/HeroField'
import FrameworksCarousel from '@/components/homepage/FrameworksCarousel'
import MethodsBands from '@/components/homepage/MethodsBands'

export const metadata = {
  title: 'Innovation 101',
  description:
    'Six frameworks, forty methods, and the thinking that connects them. Interactive, not decorative.',
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: HERO
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection className="relative min-h-screen flex flex-col overflow-hidden" ariaLabelledBy="hero-heading">

        {/* Drifting SVG motif field: decorative, aria-hidden */}
        <HeroField />

        {/* Radial glow: draws eye toward the text */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 70% 55% at 30% 55%, rgba(124,58,237,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Legibility scrim: independent of the contour field's own gradient/
            opacity, this guarantees the text block always sits on a clean,
            sufficiently dark patch — text contrast doesn't depend on where
            the animation happens to be. Static (does not scroll or move with
            the parallax/loop), centered on the same spot the text occupies. */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 62% 52% at 24% 54%, rgba(9,9,11,0.60) 0%, rgba(9,9,11,0.30) 45%, transparent 78%)',
            pointerEvents: 'none',
          }}
        />

        {/* Foreground content */}
        <div className="relative z-10 max-w-content mx-auto px-6 md:px-8 w-full flex flex-col justify-center flex-1 py-24">
          <SectionLabel accent="rgba(255,255,255,0.50)">INNOVATION 101</SectionLabel>

          <h1
            id="hero-heading"
            className="font-display text-balance"
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              fontWeight: 600,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#FAFAFA',
              maxWidth: '16ch',
              marginBottom: '1.5rem',
            }}
          >
            How innovation actually gets done.
          </h1>

          <p
            style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.52)',
              maxWidth: '48ch',
            }}
          >
            Six frameworks, forty methods, organized by the problem they
            solve: not by how they look in a slide deck. Every framework
            is interactive; every method comes with enough context to know
            when not to use it.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'rgba(255,255,255,0.22)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-2xs)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
            <path
              d="M 8,2 L 8,14 M 3,10 L 8,15 L 13,10"
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </div>
      </DarkSection>


      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: FRAMEWORKS
      ══════════════════════════════════════════════════════════════════════ */}
      <WarmSection ariaLabelledBy="frameworks-heading">
        <Container>
          <div style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <SectionLabel accent="var(--color-framework)">THE LENSES</SectionLabel>
            <SectionHeadingLight id="frameworks-heading">Six frameworks for six ways of working.</SectionHeadingLight>
            <Body className="mb-2">
              A framework is a named structure for running an innovation process from
              end to end: not a method (a single tool), not a metaphor. There are six
              here because different problems call for fundamentally different approaches.
            </Body>
            <Body className="mb-10">
              Pick the one that fits how your problem is shaped, then use the methods
              inside it.
            </Body>
            <FrameworksCarousel />
          </div>
        </Container>
      </WarmSection>


      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: METHODS
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection ariaLabelledBy="methods-heading">
        <Container>
          <div style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <SectionLabel accent="rgba(255,255,255,0.50)" dark>THE WORK</SectionLabel>
            <SectionHeadingDark id="methods-heading">Forty methods, organized by the problem they solve.</SectionHeadingDark>
            <Body dark className="mb-10">
              Not a list to scroll, but a toolkit to deploy. Each group is for
              a different kind of stuck.
            </Body>
            <MethodsBands />
          </div>
        </Container>
      </DarkSection>


      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: WHO MADE THIS
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection ariaLabelledBy="who-made-this-heading">
        <Container>
          <div style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <h2 id="who-made-this-heading" className="sr-only">Who made this</h2>
            <SectionLabel accent="var(--color-neutral-600)">WHO MADE THIS</SectionLabel>
            <p
              style={{
                fontSize: 'var(--text-base)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'var(--color-neutral-600)',
                marginBottom: '2rem',
                maxWidth: '60ch',
              }}
            >
              Built by Mert Pekdemir, with Claude and Claude Code: a practitioner
              and an AI, on purpose.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: '1.5rem' }}>

              {/* ── Mert card ─────────────────────────────────────────── */}
              <div
                style={{
                  border: '1px solid var(--color-neutral-100)',
                  borderRadius: '8px',
                  padding: '2rem',
                  background: 'var(--color-background)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header: photo + name */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      position: 'relative',
                      width: '52px',
                      height: '52px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      flexShrink: 0,
                      border: '1px solid var(--color-neutral-100)',
                    }}
                  >
                    <Image
                      src="/images/mert.jpg"
                      alt="Mert Pekdemir"
                      fill
                      sizes="52px"
                      style={{ objectFit: 'cover', objectPosition: '65% center' }}
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                        color: 'var(--color-neutral-500)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      The Practitioner
                    </p>
                    <h2
                      className="font-display font-semibold"
                      style={{
                        fontSize: 'var(--text-xl)',
                        lineHeight: 1.2,
                        color: 'var(--color-neutral-900)',
                      }}
                    >
                      Mert Pekdemir
                    </h2>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--color-neutral-600)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Design researcher and strategist at Deloitte&apos;s Innovation and
                  Product Strategy team, formerly known as Doblin. He leads research
                  and strategy engagements for Fortune 50 to 500 companies across
                  financial services, healthcare, and enterprise technology.
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--color-neutral-600)',
                    marginBottom: '1.5rem',
                    flexGrow: 1,
                  }}
                >
                  He brought the practice and the judgment: which methods belong,
                  where their boundaries sit, and what is honest to say about each.
                </p>

                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                  <Link
                    href="/about"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--color-neutral-900)',
                      textDecoration: 'none',
                    }}
                  >
                    Read more <span aria-hidden="true">→</span>
                  </Link>
                  <a
                    href="https://calendar.app.google/753ZRix7sw4XVtzC7"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 600,
                      color: 'var(--color-framework)',
                      textDecoration: 'none',
                    }}
                  >
                    Book time <span aria-hidden="true">→</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </div>

              {/* ── Claude card ───────────────────────────────────────── */}
              <div
                style={{
                  border: '1px solid var(--color-neutral-100)',
                  borderRadius: '8px',
                  padding: '2rem',
                  background: 'var(--color-background)',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Header: original AI mark + name */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
                  {/*
                    Original mark: three concentric rings with a center dot.
                    Not Anthropic's logo. No brand assets used.
                    Reads as "signal" or "focus": an abstract AI presence.
                  */}
                  <svg
                    viewBox="0 0 52 52"
                    width="52"
                    height="52"
                    fill="none"
                    aria-hidden="true"
                    style={{ flexShrink: 0 }}
                  >
                    <circle cx="26" cy="26" r="23" stroke="var(--color-neutral-200)" strokeWidth="1" />
                    <circle cx="26" cy="26" r="15" stroke="var(--color-neutral-400)" strokeWidth="1.2" />
                    <circle cx="26" cy="26" r="8"  stroke="var(--color-neutral-700)" strokeWidth="1.5" />
                    <circle cx="26" cy="26" r="2.5" fill="var(--color-neutral-900)" />
                  </svg>
                  <div>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-2xs)',
                        letterSpacing: '0.10em',
                        textTransform: 'uppercase',
                        color: 'var(--color-neutral-500)',
                        marginBottom: '0.2rem',
                      }}
                    >
                      The AI Collaborator
                    </p>
                    <h3
                      className="font-display font-semibold"
                      style={{
                        fontSize: 'var(--text-xl)',
                        lineHeight: 1.2,
                        color: 'var(--color-neutral-900)',
                      }}
                    >
                      Claude &amp; Claude Code
                    </h3>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--color-neutral-600)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Claude helped draft, structure, and build the site: writing
                  content, reasoning through editorial decisions, and translating
                  design specs into working code via Claude Code.
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    lineHeight: 'var(--leading-relaxed)',
                    color: 'var(--color-neutral-600)',
                    flexGrow: 1,
                  }}
                >
                  It is a demonstration of the same idea the site keeps returning
                  to: that AI is genuinely useful for fluent production, and that
                  the judgment about what is true and what matters stays human.
                </p>
              </div>

            </div>
          </div>
        </Container>
      </LightSection>


    </>
  )
}

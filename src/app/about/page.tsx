import Image from 'next/image'
import {
  DarkSection,
  LightSection,
  Container,
  Body,
} from '../../components/method/Primitives'

export const metadata = {
  title: 'About — Innovation 101',
  description:
    'Forty methods, six frameworks, and the practitioner behind them. A working reference built from real consulting work.',
}

const CREDENTIALS = [
  'Deloitte Consulting LLP - Innovation & Product Strategy (formerly known as Doblin)',
  'MS, Engineering Design & Innovation — Northwestern University',
  'BS, Mechanical Engineering — Illinois Institute of Technology',
  'Chicago, IL',
]

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — dark, no photo, specific opening claim
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection className="relative overflow-hidden">
        <Container>
          <div style={{ paddingTop: '6rem', paddingBottom: '6rem', maxWidth: '38rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.40)',
                marginBottom: '2rem',
              }}
            >
              About this site
            </p>
            <h1
              className="font-display font-semibold text-balance"
              style={{
                fontSize: 'clamp(2.25rem, 5vw, 3.5rem)',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#FAFAFA',
                marginBottom: '1.5rem',
              }}
            >
              Forty methods. Six frameworks. The map between them.
            </h1>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                lineHeight: 'var(--leading-relaxed)',
                color: 'rgba(255,255,255,0.50)',
                maxWidth: '44ch',
              }}
            >
              A practitioner&apos;s reference built from real consulting work —
              specific about what each tool is for, and honest about where it
              stops working.
            </p>
          </div>
        </Container>
      </DarkSection>


      {/* ═══════════════════════════════════════════════════════════════════
          WHAT THIS IS — no template, just two strong paragraphs
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container prose>
          <div style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
            <p
              style={{
                fontSize: 'var(--text-lg)',
                lineHeight: 1.65,
                color: 'var(--color-neutral-900)',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              Most innovation writing treats methods like recipes. Follow these
              steps, get this outcome. It doesn&apos;t tell you which tool to
              reach for when your client has too much data to act on, or what to
              do when discovery has surfaced six equally credible problem frames.
              The real questions are never &ldquo;how do I run a journey map&rdquo; —
              they&apos;re &ldquo;is a journey map the right tool right now, and if
              not, what is.&rdquo;
            </p>
            <Body>
              Innovation 101 is organized around those questions. Every method
              explains where it fits in the process, what kind of problem it
              solves, and where its limits are. The frameworks section maps six
              end-to-end approaches — not as alternatives to pick between, but as
              lenses for different types of problems. The scenarios section
              connects specific situations to the tools that actually address them.
            </Body>
          </div>
        </Container>
      </LightSection>


      {/* ═══════════════════════════════════════════════════════════════════
          MERT — photo + bio together, no "THE PRACTITIONER" eyebrow
      ══════════════════════════════════════════════════════════════════════ */}
      <LightSection>
        <Container prose>
          <div
            style={{
              paddingTop: '1rem',
              paddingBottom: '5rem',
              borderTop: '1px solid var(--color-neutral-100)',
            }}
          >

            {/* Name + role — above the grid so it spans full width */}
            <div style={{ paddingTop: '3rem', marginBottom: '2rem' }}>
              <h2
                className="font-display font-semibold"
                style={{
                  fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
                  lineHeight: 1.15,
                  color: 'var(--color-neutral-900)',
                  marginBottom: '0.375rem',
                }}
              >
                Mert Pekdemir
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-2xs)',
                  letterSpacing: '0.08em',
                  color: 'var(--color-neutral-400)',
                  textTransform: 'uppercase',
                }}
              >
                Senior Consultant, Lead Design Researcher &amp; Strategist · Chicago
              </p>
            </div>

            {/* Photo + bio grid */}
            <div
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] items-start"
              style={{ gap: '2.5rem' }}
            >
              {/* Photo */}
              <div
                style={{
                  position: 'relative',
                  width: '180px',
                  height: '220px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid var(--color-neutral-100)',
                  flexShrink: 0,
                }}
              >
                <Image
                  src="/images/mert.jpg"
                  alt="Mert Pekdemir"
                  fill
                  priority
                  sizes="180px"
                  style={{ objectFit: 'cover', objectPosition: '65% center' }}
                />
              </div>

              {/* Bio */}
              <div>
                <Body>
                  Mert is a Senior Consultant, Lead Design Researcher and
                  Strategist on Deloitte&apos;s Innovation and Product Strategy
                  team, formerly known as Doblin. He leads research and
                  experience-strategy engagements for Fortune 50 to 500 companies
                  across financial services, healthcare, and enterprise technology,
                  uncovering user needs, shaping product strategy, and delivering
                  customer-centered products and services.
                </Body>
                <Body>
                  His path ran from engineering to design. After a BS in
                  Mechanical Engineering at the Illinois Institute of Technology,
                  where he learned how to build things but not the why behind each
                  decision, he pursued an MS in Engineering Design and Innovation
                  at Northwestern University to study human-centered design in
                  depth. The methods on this site are the ones he uses in
                  practice, written by someone who has had to make them work under
                  real constraints, with real stakes, for real clients.
                </Body>
              </div>
            </div>

            {/* Credentials strip */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '2rem 0 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {CREDENTIALS.map(cred => (
                <li
                  key={cred}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    letterSpacing: '0.06em',
                    color: 'var(--color-neutral-600)',
                    display: 'flex',
                    gap: '0.5rem',
                  }}
                >
                  <span aria-hidden="true" style={{ color: 'var(--color-neutral-400)', flexShrink: 0 }}>·</span>
                  {cred}
                </li>
              ))}
            </ul>

            {/* Contact links */}
            <div
              id="calendar"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2rem',
                marginTop: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-neutral-100)',
              }}
            >
              <a
                href="mailto:mertpekdemir@gmail.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-neutral-900)',
                  textDecoration: 'none',
                }}
              >
                mertpekdemir@gmail.com <span aria-hidden="true">→</span>
              </a>
              <a
                href="https://www.linkedin.com/in/mpekdemir/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-neutral-500)',
                  textDecoration: 'none',
                }}
              >
                LinkedIn <span aria-hidden="true">→</span>
              </a>
              <a
                href="https://calendar.app.google/753ZRix7sw4XVtzC7"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 600,
                  color: 'var(--color-framework)',
                  textDecoration: 'none',
                }}
              >
                Book time <span aria-hidden="true">→</span>
              </a>
            </div>

          </div>
        </Container>
      </LightSection>


      {/* ═══════════════════════════════════════════════════════════════════
          HOW IT WAS BUILT — no template headline, direct and specific
      ══════════════════════════════════════════════════════════════════════ */}
      <DarkSection>
        <Container prose>
          <div style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)',
                marginBottom: '0.4rem',
              }}
            >
              Transparency
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-2xs)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.30)',
                marginBottom: '2rem',
              }}
            >
              Built with Claude and Claude Code
            </p>

            <Body dark>
              Mert built the substance of this site — the selection of methods,
              the frameworks they sit inside, the editorial calls about what
              belongs and what doesn&apos;t, the language for describing where
              each tool actually works and where it doesn&apos;t. That part
              required years of doing this work for real clients.
            </Body>
            <Body dark>
              Claude and Claude Code handled the production. Claude drafted
              content from Mert&apos;s outlines and notes, structured the site
              architecture, and translated design decisions into working code.
              The split isn&apos;t a technicality — it&apos;s the actual point.
              AI is genuinely good at fluent production. It&apos;s not the thing
              that decides what&apos;s true.
            </Body>

          </div>
        </Container>
      </DarkSection>


    </>
  )
}

import { getReadingCategories } from '../../lib/content'
import { DarkSection, Container, SectionHeadingDark, Body } from '../../components/method/Primitives'
import ReadingCategorySection from './ReadingCategorySection'

export const metadata = { title: 'Reading' }

const READING = 'rgba(220,38,38,'

export default function ReadingPage() {
  const categories = getReadingCategories()

  return (
    <>
      {/* Hero: same structure as the /methods and /frameworks index pages
          (eyebrow, h1, one-line intro, inside max-w-content ... py-16) so
          the top padding matches exactly instead of the bespoke spacing
          this page used before. */}
      <DarkSection className="relative" ariaLabelledBy="reading-hero-heading">
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(220,38,38,0.09) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="max-w-content mx-auto px-6 md:px-8 py-16" style={{ position: 'relative', zIndex: 1 }}>
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ color: `${READING}0.80)` }}>
            Reading
          </p>
          <h1
            id="reading-hero-heading"
            className="font-display font-semibold text-balance mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', lineHeight: 1.05, letterSpacing: '-0.02em', color: '#FAFAFA' }}
          >
            Twenty books, five shelves.
          </h1>
          <p className="text-lg max-w-[560px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.50)' }}>
            The reading behind the rest of this site, grouped by the question each book answers.
          </p>
        </div>
      </DarkSection>

      {categories.map((category) => (
        <DarkSection
          key={category.slug}
          ariaLabelledBy={`reading-category-${category.slug}-heading`}
          className="border-t border-white/10"
        >
          <Container>
            <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
              <SectionHeadingDark id={`reading-category-${category.slug}-heading`}>
                {category.name}
              </SectionHeadingDark>
              <Body dark className="max-w-[640px]">
                {category.description}
              </Body>
              <ReadingCategorySection books={category.books} />
            </div>
          </Container>
        </DarkSection>
      ))}
    </>
  )
}

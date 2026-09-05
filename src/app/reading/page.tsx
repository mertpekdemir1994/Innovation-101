import { getReadingCategories } from '../../lib/content'
import { DarkSection, Container, SectionLabel, SectionHeadingDark, Body } from '../../components/method/Primitives'
import ReadingCategorySection from './ReadingCategorySection'

export const metadata = { title: 'Reading' }

// --color-reading (#DC2626) itself measures well under 4.5:1 as small mono
// label text on --color-dark, and SectionLabel's own `dark` prop multiplies
// whatever color it's given by a further 0.6 opacity -- compounding to
// under 4:1 even at full-strength input. Rather than edit the shared
// Primitives module (used across every method/framework page) to fix that
// generally, this page passes dark={false} to keep SectionLabel's opacity
// at 1 and supplies its own already-brightened, already-verified color:
// 6.6:1 against --color-dark per axe-core, computed against the actual
// WCAG relative-luminance formula.
const READING_TEXT = 'rgba(255,140,140,0.85)'

export default function ReadingPage() {
  const categories = getReadingCategories()

  return (
    <>
      <DarkSection ariaLabelledBy="reading-hero-heading">
        <Container>
          <div style={{ paddingTop: '6rem', paddingBottom: '4rem' }}>
            <SectionLabel accent={READING_TEXT}>Reading</SectionLabel>
            <h1
              id="reading-hero-heading"
              className="font-display font-semibold text-balance"
              style={{
                fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.02em',
                color: '#FAFAFA',
                marginBottom: '1rem',
              }}
            >
              Twenty books, five shelves.
            </h1>
            <p style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.60)', maxWidth: '46rem', lineHeight: 'var(--leading-relaxed)' }}>
              The reading behind the rest of this site, grouped by the question each book answers.
            </p>
          </div>
        </Container>
      </DarkSection>

      {categories.map((category, i) => (
        <DarkSection
          key={category.slug}
          ariaLabelledBy={`reading-category-${category.slug}-heading`}
          className={i > 0 ? 'border-t border-white/10' : undefined}
        >
          <Container>
            <div style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
              <SectionLabel accent={READING_TEXT}>
                Category {i + 1} of {categories.length}
              </SectionLabel>
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

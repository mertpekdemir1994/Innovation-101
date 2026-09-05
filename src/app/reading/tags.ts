// Tag pill colors for the /reading page. Each tag in the controlled
// vocabulary (documented at the top of content/reading/reading.md) maps to
// one of the site's six stage-group accent colors -- the same palette used
// to classify methods elsewhere on the site -- rather than inventing a new
// color per tag. RGB triplets are the exact decimal equivalents of the
// --stage-* hex tokens in src/app/styles/tokens.css.
//
// Cards are white (matching the site's method-card pattern), so pill text
// sits on white, not near-black -- the opposite direction from most of this
// site's dark-background text-safety work. Verified against the actual
// WCAG relative-luminance formula: four of the six raw stage colors clear
// 4.5:1 at full opacity on white already (5.75-9.1:1), but --stage-ideation
// only reaches 4.43:1 even fully opaque (just under the minimum) and
// --stage-reading reaches 4.83:1 with no safety margin -- both get a
// darkened variant instead, following the same text-safe-derivative
// pattern used for dark backgrounds elsewhere on the site, just inverted.
const DISCOVERY = 'rgba(61,107,90,'    // --stage-discovery  #3D6B5A -- 6.09:1 @ 1.0 on white
const SYNTHESIS = 'rgba(31,58,95,'     // --stage-synthesis  #1F3A5F -- 8.52:1 @ 1.0
const EXPERIENCE = 'rgba(42,111,122,'  // --stage-experience #2A6F7A -- 5.75:1 @ 1.0
const IDEATION = 'rgba(181,97,62,'     // --stage-ideation   #B5613E -- 4.43:1 @ 1.0, under minimum
const IDEATION_TEXT = 'rgba(140,65,35,'   // darkened for text-on-white -- 7.25:1 @ 1.0
const STRATEGY = 'rgba(107,74,119,'    // --stage-strategy   #6B4A77 -- 5.68:1 @ 1.0

export const TAG_COLOR: Record<string, string> = {
  'Design Research': DISCOVERY,
  'Methods': DISCOVERY,
  'Design Thinking': SYNTHESIS,
  'Innovation': SYNTHESIS,
  'Systems': EXPERIENCE,
  'Service Design': EXPERIENCE,
  'Ideation': IDEATION,
  'Prototyping': IDEATION,
  'Creativity': IDEATION,
  'Strategy': STRATEGY,
  'Business Model': STRATEGY,
  'Leadership': STRATEGY,
}

// Text-safe variant per tag, for use on white cards. Only Ideation needs
// the darkened value; the rest reuse their own raw color, which already
// clears 4.5:1 at full opacity.
export const TAG_TEXT_COLOR: Record<string, string> = {
  'Design Research': DISCOVERY,
  'Methods': DISCOVERY,
  'Design Thinking': SYNTHESIS,
  'Innovation': SYNTHESIS,
  'Systems': EXPERIENCE,
  'Service Design': EXPERIENCE,
  'Ideation': IDEATION_TEXT,
  'Prototyping': IDEATION_TEXT,
  'Creativity': IDEATION_TEXT,
  'Strategy': STRATEGY,
  'Business Model': STRATEGY,
  'Leadership': STRATEGY,
}

// Fallback for a tag not yet added to the maps above (should not happen if
// reading.md sticks to the documented controlled vocabulary).
export const TAG_COLOR_FALLBACK = 'rgba(107,114,128,'   // var(--color-neutral-500) equivalent
export const TAG_TEXT_COLOR_FALLBACK = 'rgba(75,85,99,' // var(--color-neutral-600) equivalent

// The site's Reading nav/identity accent (--color-reading, #DC2626). Used
// for the hero card's accent bar (decorative, any opacity is fine) and,
// darkened, for its "Start here" label text on the white card -- the raw
// color only reaches 4.83:1 on white at full opacity, no safety margin, so
// text uses the darkened value (6.53:1) instead.
export const READING = 'rgba(220,38,38,'
export const READING_TEXT = 'rgba(185,25,25,'

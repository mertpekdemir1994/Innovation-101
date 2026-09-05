// Tag pill colors for the /reading page. Each tag in the controlled
// vocabulary (documented at the top of content/reading/reading.md) maps to
// one of the site's six stage-group accent colors -- the same palette used
// to classify methods elsewhere on the site -- rather than inventing a new
// color per tag. RGB triplets are the exact decimal equivalents of the
// --stage-* hex tokens in src/app/styles/tokens.css, following the same
// `rgba(r,g,b,` + opacity-suffix pattern used throughout the method pages.
//
// Two variants per color: the raw stage color for background/border fills
// (decorative, not text, so the 3:1 non-text threshold applies and the raw
// value is fine at low opacity), and a brightened _TEXT variant for the
// pill's label itself. Verified via axe-core: the raw colors at the
// opacities this file used originally measured 1.5-3.2:1 against the
// page's near-black background, failing the 4.5:1 text minimum -- these
// _TEXT values were computed against the actual WCAG relative-luminance
// formula (not eyeballed) and clear 6.6:1 or better at 0.85 alpha.
const DISCOVERY = 'rgba(61,107,90,'         // --stage-discovery  #3D6B5A
const DISCOVERY_TEXT = 'rgba(150,210,185,'  // 8.48:1 @ 0.85 on --color-dark

const SYNTHESIS = 'rgba(31,58,95,'          // --stage-synthesis  #1F3A5F
const SYNTHESIS_TEXT = 'rgba(150,175,220,'  // 6.66:1 @ 0.85

const EXPERIENCE = 'rgba(42,111,122,'       // --stage-experience #2A6F7A
const EXPERIENCE_TEXT = 'rgba(140,205,220,' // 8.26:1 @ 0.85

const IDEATION = 'rgba(181,97,62,'          // --stage-ideation   #B5613E
const IDEATION_TEXT = 'rgba(240,170,130,'   // 7.52:1 @ 0.85

const STRATEGY = 'rgba(107,74,119,'         // --stage-strategy   #6B4A77
const STRATEGY_TEXT = 'rgba(200,170,215,'   // 7.14:1 @ 0.85

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

export const TAG_TEXT_COLOR: Record<string, string> = {
  'Design Research': DISCOVERY_TEXT,
  'Methods': DISCOVERY_TEXT,
  'Design Thinking': SYNTHESIS_TEXT,
  'Innovation': SYNTHESIS_TEXT,
  'Systems': EXPERIENCE_TEXT,
  'Service Design': EXPERIENCE_TEXT,
  'Ideation': IDEATION_TEXT,
  'Prototyping': IDEATION_TEXT,
  'Creativity': IDEATION_TEXT,
  'Strategy': STRATEGY_TEXT,
  'Business Model': STRATEGY_TEXT,
  'Leadership': STRATEGY_TEXT,
}

// Fallback for a tag not yet added to the maps above (should not happen if
// reading.md sticks to the documented controlled vocabulary).
export const TAG_COLOR_FALLBACK = 'rgba(255,255,255,'
export const TAG_TEXT_COLOR_FALLBACK = 'rgba(255,255,255,'

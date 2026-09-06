'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReadingCategory, ReadingBook } from '../../types/content'
import { TAG_COLOR, TAG_COLOR_FALLBACK, TAG_TEXT_COLOR, TAG_TEXT_COLOR_FALLBACK, READING } from './tags'

// Measuring a panel's natural height for the mobile accordion (below)
// needs to happen in a layout effect so it's ready before paint, but
// layout effects warn during SSR since there's no DOM to measure --
// this falls back to a plain effect there.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

/*
  Two nested single-select widgets, both built to the WAI-ARIA APG
  patterns rather than approximated:

  - The 5 categories are a real tablist: role="tablist"/"tab"/"tabpanel",
    roving tabindex, ArrowLeft/Right + Home/End move focus AND activate
    (automatic activation, the simpler of the two standard tab models).
  - The 4 books within a category are a real listbox: role="listbox"/
    "option", roving tabindex, ArrowUp/Down move focus and selection
    together (selection-follows-focus, matching a native <select>).
    Selection can never become empty -- there is no toggle-off, clicking
    or arrowing to the already-selected option is a no-op, exactly the
    "must always have one selected" requirement.

  This site's own accessibility work already caught and fixed several
  "tablist" components elsewhere that had the role and aria-selected
  attributes but no actual keyboard handling -- a real conformance
  failure, not a nicety. Both widgets here implement the full keyboard
  model rather than repeating that.
*/

function TagPill({ tag }: { tag: string }) {
  const fill = TAG_COLOR[tag] ?? TAG_COLOR_FALLBACK
  const text = TAG_TEXT_COLOR[tag] ?? TAG_TEXT_COLOR_FALLBACK
  return (
    <span
      className="font-mono uppercase tracking-widest rounded-full px-2.5 py-1 whitespace-nowrap"
      style={{ fontSize: 'var(--text-2xs)', color: `${text}1)`, background: `${fill}0.09)` }}
    >
      {tag}
    </span>
  )
}

function BookCover({ book, width, height }: { book: ReadingBook; width: number; height: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        flexShrink: 0,
        borderRadius: 4,
        overflow: 'hidden',
        background: 'var(--color-neutral-100)',
        border: '1px solid var(--color-neutral-200)',
      }}
    >
      <Image src={book.coverUrl} alt="" fill sizes={`${width}px`} style={{ objectFit: 'cover' }} />
    </div>
  )
}

// ── Category tablist ─────────────────────────────────────────────────────

function CategoryTabs({
  categories,
  activeIndex,
  onSelect,
}: {
  categories: ReadingCategory[]
  activeIndex: number
  onSelect: (i: number) => void
}) {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function focusAndSelect(i: number) {
    const next = (i + categories.length) % categories.length
    onSelect(next)
    tabRefs.current[next]?.focus()
  }

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === 'ArrowRight') { e.preventDefault(); focusAndSelect(i + 1) }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); focusAndSelect(i - 1) }
    else if (e.key === 'Home') { e.preventDefault(); focusAndSelect(0) }
    else if (e.key === 'End') { e.preventDefault(); focusAndSelect(categories.length - 1) }
  }

  return (
    // flex-nowrap + horizontal scroll rather than flex-wrap: five pills of
    // uneven length ("Learning the Groundwork" vs "Doing the Work") could
    // wrap one tab onto its own second row at in-between viewport widths.
    // Scrolling keeps every tab's label on one line at any width instead.
    <div role="tablist" aria-label="Reading categories" className="flex flex-nowrap gap-2 overflow-x-auto pb-1 -mb-1">
      {categories.map((category, i) => {
        const isActive = i === activeIndex
        return (
          <button
            key={category.slug}
            ref={(el) => { tabRefs.current[i] = el }}
            role="tab"
            id={`reading-tab-${category.slug}`}
            aria-selected={isActive}
            aria-controls={`reading-tabpanel-${category.slug}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className="rounded-full px-4 py-2 font-semibold whitespace-nowrap flex-shrink-0"
            style={{
              fontSize: 'var(--text-sm)',
              background: isActive ? `${READING}0.85)` : 'rgba(255,255,255,0.06)',
              color: isActive ? '#FAFAFA' : 'rgba(255,255,255,0.65)',
              border: `1px solid ${isActive ? `${READING}0.85)` : 'rgba(255,255,255,0.12)'}`,
            }}
          >
            {category.name}
          </button>
        )
      })}
    </div>
  )
}

// ── Mobile accordion (replaces the master-detail split below md) ────────

// Framer Motion's `height: 'auto'` gets permanently stuck at 0 in this
// codebase (verified earlier on this same page) -- animating to a
// measured pixel value instead, taken from the content's own scrollHeight,
// is what actually works.
//
// The panel stays mounted at all times (collapsed to height 0 rather than
// unmounted) rather than using AnimatePresence to remove it: this page's
// tablist already had a real bug from the opposite choice, where
// aria-controls on an inactive tab pointed at an id that didn't exist in
// the DOM. Keeping every panel mounted means a collapsed row's
// aria-controls always resolves to a real element; aria-hidden plus
// pulling its one focusable descendant out of tab order (below) is what
// keeps it out of the accessibility tree and keyboard flow while closed.
function MeasuredExpand({ id, isOpen, children }: { id: string; isOpen: boolean; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const prefersReduced = useReducedMotion()

  // A ResizeObserver, not a one-time scrollHeight read on mount: every
  // book in every category mounts up front, but 4 of the 5 categories
  // start out inside a `hidden` tabpanel, which collapses everything in
  // it to a zero-size box. A single read at mount time would permanently
  // record 0 for those, so their accordion content would never show once
  // the tab became active. A ResizeObserver re-fires when the element's
  // rendered size actually changes, including the 0 -> real transition
  // that happens the moment its tab opens, so the height stays correct.
  useIsomorphicLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height
      if (h !== undefined) setHeight(h)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      id={id}
      role="region"
      aria-hidden={!isOpen}
      initial={false}
      animate={{ height: isOpen ? height : 0, opacity: isOpen ? 1 : 0 }}
      transition={prefersReduced ? { duration: 0 } : { duration: 0.3, ease: 'easeInOut' }}
      style={{ overflow: 'hidden' }}
    >
      <div ref={ref}>{children}</div>
    </motion.div>
  )
}

function MobileBookAccordionItem({ book, isSelected, onToggle }: {
  book: ReadingBook
  isSelected: boolean
  onToggle: () => void
}) {
  const prefersReduced = useReducedMotion()
  const panelId = `reading-mobile-panel-${book.slug}`

  return (
    <div style={{ borderBottom: '1px solid var(--color-neutral-100)' }}>
      <button
        type="button"
        aria-expanded={isSelected}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <BookCover book={book} width={40} height={60} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold leading-snug" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}>
            {book.title}
          </p>
          <p className="mt-0.5" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-500)' }}>
            {book.author} &middot; {book.year}
          </p>
        </div>
        <motion.svg
          aria-hidden="true"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="flex-shrink-0"
          style={{ color: 'var(--color-neutral-400)' }}
          animate={prefersReduced ? {} : { rotate: isSelected ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <MeasuredExpand id={panelId} isOpen={isSelected}>
        <div className="px-4 pb-5">
          <div className="flex flex-wrap gap-2 mb-4">
            {book.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
          </div>
          <p className="mb-3" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
            {book.summary}
          </p>
          <p className="mb-4" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
            {book.detail}
          </p>
          {/* Same inert placeholder as the desktop CTA -- see the
              comment by the desktop "View on Amazon" button below.
              tabIndex is pulled to -1 while collapsed so this button,
              which stays mounted at height 0, can't pick up keyboard
              focus it has no visible home for. */}
          <button
            type="button"
            aria-disabled="true"
            data-affiliate-pending
            tabIndex={isSelected ? 0 : -1}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold"
            style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--color-neutral-500)',
              background: 'var(--color-neutral-100)',
              border: '1px solid var(--color-neutral-200)',
              cursor: 'not-allowed',
            }}
          >
            View on Amazon
          </button>
        </div>
      </MeasuredExpand>
    </div>
  )
}

// ── Book listbox (left) ──────────────────────────────────────────────────

function BookOption({ book, isSelected, onSelect, onKeyDown, optionRef }: {
  book: ReadingBook
  isSelected: boolean
  onSelect: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  optionRef: (el: HTMLDivElement | null) => void
}) {
  return (
    <div
      ref={optionRef}
      role="option"
      id={`reading-option-${book.slug}`}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      onClick={onSelect}
      onKeyDown={onKeyDown}
      className="flex items-start gap-3 px-4 py-3 cursor-pointer"
      style={{
        // Fourth pass at this: a red-tinted background alone read as a
        // warning state, and a neutral background plus a check circle
        // looked like it was doing too much for a plain "you're reading
        // this one" marker. This lands on a 30%-opacity fill of the
        // section's own accent color plus the left border, with the
        // *other* three rows' title receded to neutral-500 so the
        // selected one reads as the current one by contrast too, not
        // just its own decoration. The meta line darkens to neutral-700
        // when selected -- neutral-500 (its usual color on white) drops
        // to under 3:1 against the tinted pink background.
        background: isSelected ? `${READING}0.3)` : 'transparent',
        borderLeft: `4px solid ${isSelected ? `${READING}1)` : 'transparent'}`,
        borderBottom: '1px solid var(--color-neutral-100)',
      }}
    >
      <BookCover book={book} width={40} height={60} />
      <div className="flex-1 min-w-0 pt-0.5">
        <p
          className="font-semibold leading-snug line-clamp-2"
          style={{ fontSize: 'var(--text-sm)', color: isSelected ? 'var(--color-neutral-900)' : 'var(--color-neutral-500)' }}
        >
          {book.title}
        </p>
        <p className="mt-0.5" style={{ fontSize: 'var(--text-xs)', color: isSelected ? 'var(--color-neutral-700)' : 'var(--color-neutral-500)' }}>
          {book.author} &middot; {book.year}
        </p>
      </div>
    </div>
  )
}

function CategoryPanel({ category, selectedIndex, onSelect, hidden, listHeight, onMeasureListHeight }: {
  category: ReadingCategory
  selectedIndex: number
  onSelect: (i: number) => void
  hidden: boolean
  listHeight: number | null
  onMeasureListHeight: (h: number) => void
}) {
  const optionRefs = useRef<(HTMLDivElement | null)[]>([])
  const listRef = useRef<HTMLDivElement>(null)
  const books = category.books

  // The book list's own natural height (4 rows, now uniform-height rows
  // via the title's line-clamp) becomes the panel's height, instead of a
  // fixed guess or letting the taller side win: it's what makes the list
  // flush with no padding under the 4th book, and what makes every
  // category's panel come out the same height as the others, since every
  // category's list has the same 4-row shape.
  //
  // listHeight itself lives one level up, shared by all 5 panels, rather
  // than each panel measuring and holding its own: every list has the
  // same 4-row shape, so they all measure to the same value anyway, and
  // sharing it means a category you're opening for the first time
  // already has the right height the instant it's shown -- borrowed from
  // whichever category measured first -- instead of rendering at its own
  // natural (usually taller, detail-driven) auto height for a moment and
  // visibly dropping down to the measured one a beat later. A
  // ResizeObserver rather than a one-time read on mount, because this
  // list sits inside a `hidden` tabpanel for 4 of the 5 categories at
  // mount time and needs to pick up its real size once that tab opens.
  useIsomorphicLayoutEffect(() => {
    const el = listRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const h = entries[0]?.contentRect.height
      if (h) onMeasureListHeight(h)
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [onMeasureListHeight])

  function moveAndSelect(i: number) {
    const next = (i + books.length) % books.length
    onSelect(next)
    optionRefs.current[next]?.focus()
  }

  function onOptionKeyDown(e: React.KeyboardEvent, i: number) {
    if (e.key === 'ArrowDown') { e.preventDefault(); moveAndSelect(i + 1) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); moveAndSelect(i - 1) }
    else if (e.key === 'Home') { e.preventDefault(); moveAndSelect(0) }
    else if (e.key === 'End') { e.preventDefault(); moveAndSelect(books.length - 1) }
    else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(i) }
  }

  const selected = books[selectedIndex]

  return (
    <div
      role="tabpanel"
      id={`reading-tabpanel-${category.slug}`}
      aria-labelledby={`reading-tab-${category.slug}`}
      tabIndex={0}
      hidden={hidden}
    >
      <CategoryDescription text={category.description} />

      {/*
        Desktop: one shared white surface, list and detail as two columns
        of the same panel divided by a single line rather than a gap
        between two cards. The panel's height is set explicitly to the
        list's own measured height (above), and grid's default
        align-items: stretch does the rest -- the list already fits that
        height exactly (it's its own natural size), so stretching it is a
        no-op, while the detail column gets stretched/clipped to it and
        scrolls its own text internally if the selected book's summary
        runs longer than the list. That's what makes the list flush with
        no padding under the 4th book, and what makes every category's
        panel come out the same height, since every list has the same
        4-row shape.
      */}
      <div
        className="hidden md:grid md:grid-cols-[320px_1fr] bg-white rounded-xl overflow-hidden mt-6"
        style={{
          border: '1px solid var(--color-neutral-200)',
          boxShadow: 'var(--shadow-subtle)',
          // Explicit no-transition: this height is a measured value, not
          // a state the panel should visibly animate into -- switching
          // tabs should show the new category at its right size
          // immediately, not shrink/grow into place.
          transition: 'none',
          ...(listHeight ? { height: `${listHeight}px` } : {}),
        }}
      >
        <div
          ref={listRef}
          role="listbox"
          aria-label={`Books in ${category.name}`}
          // self-start, not the grid's default stretch: without it, the
          // list gets stretched to match whatever height is *currently*
          // applied to the grid, and its ResizeObserver dutifully reports
          // that stretched size back -- which, the first time a category
          // opens (before any height is set yet, so the row still
          // auto-sizes to the taller detail pane), feeds a too-tall
          // number back in, gets applied, gets re-measured slightly
          // smaller as things settle, and so on: exactly the frame-by-
          // frame shrinking this was supposed to not do. self-start makes
          // the list always report its own true content height,
          // independent of whatever height the container currently has,
          // so there's one measurement and no loop to settle.
          className="flex flex-col self-start md:border-r"
          style={{ borderColor: 'var(--color-neutral-200)' }}
        >
          {books.map((book, i) => (
            <BookOption
              key={book.slug}
              book={book}
              isSelected={i === selectedIndex}
              onSelect={() => onSelect(i)}
              onKeyDown={(e) => onOptionKeyDown(e, i)}
              optionRef={(el) => { optionRefs.current[i] = el }}
            />
          ))}
        </div>

        <div className="p-6 flex flex-col min-h-0">
          <div className="flex items-start justify-between gap-4 flex-shrink-0">
            <div className="flex gap-5 min-w-0">
              <BookCover book={selected} width={80} height={120} />
              <div className="min-w-0">
                <p className="font-semibold leading-snug" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-neutral-900)' }}>
                  {selected.title}
                </p>
                <p className="mt-0.5" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
                  {selected.author} &middot; {selected.year}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {selected.tags.map((tag) => <TagPill key={tag} tag={tag} />)}
                </div>
              </div>
            </div>

            {/*
              amazonUrl is blank for every book right now (see
              content/reading/reading.md). This button never gets an href
              and never gets an onClick, so it cannot navigate -- aria-
              disabled and data-affiliate-pending mark it as present but
              inert for assistive tech and for whoever wires up affiliate
              tracking later. Filling in AmazonUrl in the source file is
              the only change needed to activate a book's link. Placed as
              a compact top-right CTA rather than a full-width button
              under the paragraphs, to keep it out of the way of the
              summary text below.
            */}
            <button
              type="button"
              aria-disabled="true"
              data-affiliate-pending
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold flex-shrink-0"
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-neutral-500)',
                background: 'var(--color-neutral-100)',
                border: '1px solid var(--color-neutral-200)',
                cursor: 'not-allowed',
              }}
            >
              View on Amazon
            </button>
          </div>

          <div className="mt-5 flex-1 min-h-0 overflow-y-auto" style={{ borderTop: '1px solid var(--color-neutral-100)', paddingTop: '1.25rem' }}>
            <p className="mb-3" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              {selected.summary}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              {selected.detail}
            </p>
          </div>
        </div>
      </div>

      {/*
        Mobile: the master-detail split doesn't work below md -- stacking
        the list above the detail pane meant picking a book required
        scrolling down to read it, then back up to pick another. A
        single-select accordion instead: the same `selectedIndex` state
        drives which one row is expanded in place, right under its own
        header, so picking and reading never leave the same spot. Exactly
        one row is expanded at all times (never zero), matching the
        listbox's own "always one selected" rule one level down.
      */}
      <div className="md:hidden bg-white rounded-xl overflow-hidden mt-6" style={{ border: '1px solid var(--color-neutral-200)', boxShadow: 'var(--shadow-subtle)' }}>
        {books.map((book, i) => (
          <MobileBookAccordionItem
            key={book.slug}
            book={book}
            isSelected={i === selectedIndex}
            onToggle={() => onSelect(i)}
          />
        ))}
      </div>
    </div>
  )
}

function CategoryDescription({ text }: { text: string }) {
  // Single line only at md+, where the panel is wide enough for the whole
  // sentence to fit without wrapping. Below md the same sentence doesn't
  // fit the narrower width, and nowrap+ellipsis there was cutting off
  // real words instead of just avoiding an unnecessary wrap -- mobile
  // gets normal wrapping so the full sentence always shows.
  return (
    <p className="md:whitespace-nowrap md:overflow-hidden md:text-ellipsis" style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.60)' }}>
      {text}
    </p>
  )
}

export default function ReadingExplorer({ categories }: { categories: ReadingCategory[] }) {
  const [activeTab, setActiveTab] = useState(0)
  const [selections, setSelections] = useState<number[]>(
    () => categories.map((c) => Math.max(0, c.books.findIndex((b) => b.hero)))
  )
  // Shared across all 5 panels -- see the comment in CategoryPanel.
  const [listHeight, setListHeight] = useState<number | null>(null)

  return (
    <div>
      <CategoryTabs categories={categories} activeIndex={activeTab} onSelect={setActiveTab} />
      <div className="mt-8">
        {/*
          All 5 panels stay mounted (hidden via the native `hidden`
          attribute for inactive ones), not conditionally rendered --
          otherwise every inactive tab's aria-controls points at an id
          that doesn't exist in the DOM. Same fix as the accordion this
          page used before: `hidden` removes a panel from the
          accessibility tree and tab order natively, no per-element
          tabIndex bookkeeping needed the way the accordion's
          height-animated (but still-mounted) panels required.
        */}
        {categories.map((category, i) => (
          <CategoryPanel
            key={category.slug}
            category={category}
            selectedIndex={selections[i]}
            onSelect={(bookIndex) => setSelections((prev) => prev.map((v, idx) => (idx === i ? bookIndex : v)))}
            hidden={i !== activeTab}
            listHeight={listHeight}
            onMeasureListHeight={setListHeight}
          />
        ))}
      </div>
    </div>
  )
}

'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import type { ReadingCategory, ReadingBook } from '../../types/content'
import { TAG_COLOR, TAG_COLOR_FALLBACK, TAG_TEXT_COLOR, TAG_TEXT_COLOR_FALLBACK, READING, READING_TEXT } from './tags'

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

// ── Book listbox (left) ──────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="8" cy="8" r="8" fill={`${READING}1)`} />
      <path d="M4.5 8.2l2.2 2.2 4.8-4.8" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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
        // Solid neutral fill, not a tint of the site's red identity color:
        // a reddish background read as a warning/error state rather than
        // a plain selection, which was likely why it looked off. A small
        // check circle (the one place red still appears here) marks the
        // selection instead of a colored row background.
        background: isSelected ? 'var(--color-neutral-50)' : 'transparent',
        borderBottom: '1px solid var(--color-neutral-100)',
      }}
    >
      <BookCover book={book} width={40} height={60} />
      <div className="flex-1 min-w-0 pt-0.5">
        {book.hero && (
          <p className="font-mono uppercase tracking-widest mb-1" style={{ fontSize: '0.6rem', color: `${READING_TEXT}1)` }}>
            Start here
          </p>
        )}
        <p
          className="font-semibold leading-snug"
          style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-900)' }}
        >
          {book.title}
        </p>
        <p className="mt-0.5" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-neutral-600)' }}>
          {book.author} &middot; {book.year}
        </p>
      </div>
      {isSelected && <CheckIcon />}
    </div>
  )
}

function CategoryPanel({ category, selectedIndex, onSelect, hidden }: {
  category: ReadingCategory
  selectedIndex: number
  onSelect: (i: number) => void
  hidden: boolean
}) {
  const optionRefs = useRef<(HTMLDivElement | null)[]>([])
  const books = category.books

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
        One shared white surface instead of two separate bordered/shadowed
        boxes side by side: the list and the detail pane are sections of
        the same panel, divided by a single line rather than a visible
        gap between two cards of different heights.

        A fixed height (not just matched to each other) so all 5
        categories render at the identical height regardless of how long
        that category's currently-selected summary/detail text is --
        switching tabs no longer resizes the panel. Content that doesn't
        fit scrolls in its own area (the paragraphs on the right, and the
        book list on the left as a safety net) rather than growing the
        container.
      */}
      <div
        // The fixed height only applies at the md: breakpoint where list
        // and detail sit side by side and need to match; on mobile they
        // stack vertically instead, where a fixed height would cramp both
        // sections rather than solve anything, so it's left auto there.
        className="grid md:grid-cols-[320px_1fr] bg-white rounded-xl overflow-hidden mt-6 md:h-[460px]"
        style={{ border: '1px solid var(--color-neutral-200)', boxShadow: 'var(--shadow-subtle)' }}
      >
        <div
          role="listbox"
          aria-label={`Books in ${category.name}`}
          className="flex flex-col border-b md:border-b-0 md:border-r overflow-y-auto"
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
                {selected.hero && (
                  <p className="font-mono uppercase tracking-widest mb-1.5" style={{ fontSize: 'var(--text-2xs)', color: `${READING_TEXT}1)` }}>
                    Start here
                  </p>
                )}
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
              under the paragraphs, so the detail pane doesn't run
              noticeably taller than the book list next to it.
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

          <div className="mt-5 flex-1 overflow-y-auto" style={{ borderTop: '1px solid var(--color-neutral-100)', paddingTop: '1.25rem' }}>
            <p className="mb-3" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}>
              {selected.summary}
            </p>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}>
              {selected.detail}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CategoryDescription({ text }: { text: string }) {
  return (
    <p style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.60)', lineHeight: 'var(--leading-relaxed)', maxWidth: '640px' }}>
      {text}
    </p>
  )
}

export default function ReadingExplorer({ categories }: { categories: ReadingCategory[] }) {
  const [activeTab, setActiveTab] = useState(0)
  const [selections, setSelections] = useState<number[]>(
    () => categories.map((c) => Math.max(0, c.books.findIndex((b) => b.hero)))
  )

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
          />
        ))}
      </div>
    </div>
  )
}

'use client'

import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReadingBook } from '../../types/content'
import { TAG_COLOR, TAG_COLOR_FALLBACK, TAG_TEXT_COLOR, TAG_TEXT_COLOR_FALLBACK } from './tags'

// SSR-safe layout effect: measuring the panel's natural height must happen
// before paint (useLayoutEffect) to avoid a visible flash for the
// pre-expanded hero book, but useLayoutEffect warns during server
// rendering, so fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

// The site's Reading nav/identity accent (--color-reading, #DC2626),
// reused here so the hero-book treatment reads as "this section" rather
// than introducing a new accent color for the page. READING is used only
// for decorative fills/borders (3:1 non-text threshold); READING_TEXT is
// the brightened variant used for actual label text (verified via axe-core
// against the WCAG relative-luminance formula: 6.6:1 at 0.85 alpha on
// --color-dark, versus 3.2:1 for the raw color).
const READING = 'rgba(220,38,38,'
const READING_TEXT = 'rgba(255,140,140,'

function TagPill({ tag }: { tag: string }) {
  const fill = TAG_COLOR[tag] ?? TAG_COLOR_FALLBACK
  const text = TAG_TEXT_COLOR[tag] ?? TAG_TEXT_COLOR_FALLBACK
  return (
    <span
      className="font-mono uppercase tracking-widest rounded-full px-2.5 py-1 whitespace-nowrap"
      style={{
        fontSize: 'var(--text-2xs)',
        color: `${text}0.85)`,
        background: `${fill}0.14)`,
        border: `1px solid ${fill}0.32)`,
      }}
    >
      {tag}
    </span>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0, marginTop: 4 }}
    >
      <path d="M4 6l4 4 4-4" stroke="rgba(255,255,255,0.55)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BookRow({ book, isOpen, onToggle, isLast }: { book: ReadingBook; isOpen: boolean; onToggle: () => void; isLast: boolean }) {
  const prefersReduced = useReducedMotion()
  const headerId = `reading-header-${book.slug}`
  const panelId = `reading-panel-${book.slug}`
  const contentRef = useRef<HTMLDivElement>(null)
  const [measuredHeight, setMeasuredHeight] = useState(0)

  // Animate to a measured pixel height, not the string 'auto': Framer
  // Motion's built-in auto-value interpolation got stuck at height:0
  // indefinitely in this component (verified live -- height never
  // progressed past 0px, with or without reduced motion). Measuring the
  // panel's natural height up front and animating numeric px to numeric
  // px sidesteps that entirely. useIsomorphicLayoutEffect measures before
  // the browser paints, so the pre-expanded hero book never flashes
  // collapsed-then-expanded on first load.
  useIsomorphicLayoutEffect(() => {
    if (contentRef.current) setMeasuredHeight(contentRef.current.scrollHeight)
  }, [])

  return (
    <div
      style={{
        borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.10)',
        borderLeft: book.hero ? `3px solid ${READING}0.55)` : '3px solid transparent',
        background: book.hero ? `${READING}0.05)` : 'transparent',
      }}
    >
      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-start justify-between gap-4 py-5 px-4 md:px-6 text-left"
        >
          <div className="flex-1 min-w-0">
            {book.hero && (
              <p
                className="font-mono uppercase tracking-widest mb-1.5"
                style={{ fontSize: 'var(--text-2xs)', color: `${READING_TEXT}0.85)` }}
              >
                Start here
              </p>
            )}
            <p className="font-semibold" style={{ fontSize: 'var(--text-lg)', color: 'var(--color-dark-text)' }}>
              {book.title}
            </p>
            <p className="mt-0.5" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-dark-muted)' }}>
              {book.author}
            </p>
            <div className="flex flex-wrap gap-2 mt-3">
              {book.tags.map((tag) => (
                <TagPill key={tag} tag={tag} />
              ))}
            </div>
          </div>
          <ChevronIcon open={isOpen} />
        </button>
      </h3>
      {/*
        Always mounted (never conditionally rendered) so aria-controls on
        the header button always resolves to a real element, open or
        closed -- collapsing is purely a height/opacity change, not an
        unmount. aria-hidden plus tabIndex={-1} on the Amazon button below
        keep the collapsed content out of the accessibility tree and the
        tab order without removing it from the DOM.
      */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        aria-hidden={!isOpen}
        initial={false}
        animate={{ height: isOpen ? measuredHeight : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div ref={contentRef}>
          <PanelContent book={book} isOpen={isOpen} />
        </div>
      </motion.div>
    </div>
  )
}

function PanelContent({ book, isOpen }: { book: ReadingBook; isOpen: boolean }) {
  return (
    <div className="px-4 md:px-6 pb-6">
      <p
        className="mb-3"
        style={{ fontSize: 'var(--text-base)', color: 'rgba(255,255,255,0.85)', lineHeight: 'var(--leading-relaxed)' }}
      >
        {book.summary}
      </p>
      <p
        className="mb-5"
        style={{ fontSize: 'var(--text-sm)', color: 'var(--color-dark-muted)', lineHeight: 'var(--leading-relaxed)' }}
      >
        {book.detail}
      </p>
      {/*
        amazonUrl is blank for every book right now (see
        content/reading/reading.md). This button never gets an href and
        never gets an onClick, so it cannot navigate -- aria-disabled and
        data-affiliate-pending mark it as present but inert for assistive
        tech and for whoever wires up affiliate tracking later. Filling in
        AmazonUrl in the source file is the only change needed to activate
        a book's link.
      */}
      <button
        type="button"
        aria-disabled="true"
        data-affiliate-pending
        tabIndex={isOpen ? 0 : -1}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold"
        style={{
          fontSize: 'var(--text-sm)',
          color: 'var(--color-dark-muted)',
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.14)',
          cursor: 'not-allowed',
        }}
      >
        View on Amazon
      </button>
    </div>
  )
}

export default function ReadingCategorySection({ books }: { books: ReadingBook[] }) {
  const heroIndex = books.findIndex((b) => b.hero)
  const [openIndex, setOpenIndex] = useState<number | null>(heroIndex >= 0 ? heroIndex : null)

  return (
    <div className="mt-8 rounded-xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.10)' }}>
      {books.map((book, i) => (
        <BookRow
          key={book.slug}
          book={book}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
          isLast={i === books.length - 1}
        />
      ))}
    </div>
  )
}

'use client'

import { useState, useRef, useLayoutEffect, useEffect } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReadingBook } from '../../types/content'
import { TAG_COLOR, TAG_COLOR_FALLBACK, TAG_TEXT_COLOR, TAG_TEXT_COLOR_FALLBACK, READING, READING_TEXT } from './tags'

// SSR-safe layout effect: measuring the panel's natural height must happen
// before paint (useLayoutEffect) to avoid a visible flash for the
// pre-expanded hero book, but useLayoutEffect warns during server
// rendering, so fall back to useEffect there.
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

function TagPill({ tag }: { tag: string }) {
  const fill = TAG_COLOR[tag] ?? TAG_COLOR_FALLBACK
  const text = TAG_TEXT_COLOR[tag] ?? TAG_TEXT_COLOR_FALLBACK
  return (
    <span
      className="font-mono uppercase tracking-widest rounded-full px-2.5 py-1 whitespace-nowrap"
      style={{
        fontSize: 'var(--text-2xs)',
        // Full-opacity text: computed against the pill's own tinted
        // background (not page-white), the worst case at 0.90 alpha
        // (Experience) measured 4.11:1, under the minimum. Full opacity
        // clears 5.08:1 there and 5.4-9.8:1 for the rest.
        color: `${text}1)`,
        background: `${fill}0.09)`,
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
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', flexShrink: 0 }}
    >
      <path d="M4 6l4 4 4-4" stroke="var(--color-neutral-400)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Fixed-size, fixed-aspect-ratio frame so all 20 covers (sourced from
// covers.openlibrary.org by ISBN, each a slightly different native size)
// read as one consistent grid rather than 20 differently-shaped thumbnails.
function BookCover({ book }: { book: ReadingBook }) {
  return (
    <div
      style={{
        position: 'relative',
        width: 64,
        height: 96,
        flexShrink: 0,
        borderRadius: 4,
        overflow: 'hidden',
        background: 'var(--color-neutral-100)',
        border: '1px solid var(--color-neutral-200)',
      }}
    >
      <Image
        src={book.coverUrl}
        alt=""
        fill
        sizes="64px"
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}

function BookCard({ book, isOpen, onToggle }: { book: ReadingBook; isOpen: boolean; onToggle: () => void }) {
  const prefersReduced = useReducedMotion()
  const headerId = `reading-header-${book.slug}`
  const panelId = `reading-panel-${book.slug}`
  const contentRef = useRef<HTMLDivElement>(null)
  const [measuredHeight, setMeasuredHeight] = useState(0)

  // Animate to a measured pixel height, not the string 'auto': Framer
  // Motion's built-in auto-value interpolation got stuck at height:0
  // indefinitely in this component in an earlier version (verified live).
  // Measuring the panel's natural height up front and animating numeric
  // px to numeric px sidesteps that. useIsomorphicLayoutEffect measures
  // before the browser paints, so the pre-expanded hero book never
  // flashes collapsed-then-expanded on first load.
  useIsomorphicLayoutEffect(() => {
    if (contentRef.current) setMeasuredHeight(contentRef.current.scrollHeight)
  }, [])

  return (
    <div
      className="bg-white rounded-xl overflow-hidden"
      style={{ border: '1px solid var(--color-neutral-200)', boxShadow: 'var(--shadow-subtle)' }}
    >
      <div style={{ height: 4, background: book.hero ? `${READING}0.85)` : 'var(--color-neutral-100)' }} />

      <h3 className="m-0">
        <button
          type="button"
          id={headerId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-start gap-4 p-5 text-left"
        >
          <BookCover book={book} />

          <div className="flex-1 min-w-0 pt-0.5">
            {book.hero && (
              <p
                className="font-mono uppercase tracking-widest mb-1.5"
                style={{ fontSize: 'var(--text-2xs)', color: `${READING_TEXT}0.95)` }}
              >
                Start here
              </p>
            )}
            <p className="font-semibold leading-snug" style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-900)' }}>
              {book.title}
            </p>
            <p className="mt-0.5" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)' }}>
              {book.author} &middot; {book.year}
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
          <div className="px-5 pb-5" style={{ borderTop: '1px solid var(--color-neutral-100)', paddingTop: '1.25rem' }}>
            <p
              className="mb-3"
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-neutral-700)', lineHeight: 'var(--leading-relaxed)' }}
            >
              {book.summary}
            </p>
            <p
              className="mb-5"
              style={{ fontSize: 'var(--text-sm)', color: 'var(--color-neutral-600)', lineHeight: 'var(--leading-relaxed)' }}
            >
              {book.detail}
            </p>
            {/*
              amazonUrl is blank for every book right now (see
              content/reading/reading.md). This button never gets an href
              and never gets an onClick, so it cannot navigate -- aria-
              disabled and data-affiliate-pending mark it as present but
              inert for assistive tech and for whoever wires up affiliate
              tracking later. Filling in AmazonUrl in the source file is
              the only change needed to activate a book's link.
            */}
            <button
              type="button"
              aria-disabled="true"
              data-affiliate-pending
              tabIndex={isOpen ? 0 : -1}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold"
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-neutral-500)',
                background: 'var(--color-neutral-100)',
                border: '1px solid var(--color-neutral-200)',
                cursor: 'not-allowed',
              }}
            >
              View on Amazon
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function ReadingCategorySection({ books }: { books: ReadingBook[] }) {
  const heroIndex = books.findIndex((b) => b.hero)
  const [openIndex, setOpenIndex] = useState<number | null>(heroIndex >= 0 ? heroIndex : null)

  return (
    <div className="grid gap-4 mt-8">
      {books.map((book, i) => (
        <BookCard
          key={book.slug}
          book={book}
          isOpen={openIndex === i}
          onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
        />
      ))}
    </div>
  )
}

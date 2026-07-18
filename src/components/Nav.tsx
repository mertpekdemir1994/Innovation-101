'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
  { label: 'Frameworks', href: '/frameworks', color: 'var(--color-framework)' },
  { label: 'Methods',    href: '/methods',    color: 'var(--color-methods)'   },
  { label: 'Scenarios',  href: '/scenarios',  color: 'var(--color-scenario)'  },
  { label: 'Reading',    href: '/reading',    color: 'var(--color-reading)'   },
  { label: 'About',      href: '/about',      color: 'var(--color-neutral-900)' },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

export default function Nav() {
  const pathname  = usePathname()
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Scroll-lock while menu is open.
  // position:fixed is used instead of overflow:hidden because iOS Safari ignores
  // overflow:hidden on <body> for touch-scroll — this pattern works universally.
  // We save the current scrollY so we can restore the exact position on close.
  useEffect(() => {
    if (menuOpen) {
      const y = window.scrollY
      document.body.dataset.scrollY = String(y)
      document.body.style.position  = 'fixed'
      document.body.style.top       = `-${y}px`
      document.body.style.width     = '100%'
      document.body.style.overflowY = 'scroll' // keep scrollbar gutter, prevents layout shift
    } else {
      const y = Number(document.body.dataset.scrollY ?? 0)
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      document.body.style.overflowY = ''
      delete document.body.dataset.scrollY
      window.scrollTo(0, y)
    }
    return () => {
      // Safety cleanup if component unmounts while menu is open
      document.body.style.position  = ''
      document.body.style.top       = ''
      document.body.style.width     = ''
      document.body.style.overflowY = ''
    }
  }, [menuOpen])

  const headerClass = 'fixed top-0 left-0 right-0 z-50 bg-white border-b border-neutral-100'

  // Returns the colour a desktop nav link should render at
  const linkColor = (href: string, color: string): string => {
    if (isActive(pathname, href)) return color
    if (hoveredHref === href)     return color
    return 'var(--color-neutral-500)'
  }

  return (
    <>
      <header className={headerClass}>
        <div className="max-w-content mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="font-semibold text-lg tracking-tight transition-opacity duration-200 hover:opacity-70"
            style={{ color: 'var(--color-neutral-900)' }}
          >
            Innovation 101
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map(({ label, href, color }) => (
              <Link
                key={href}
                href={href}
                className="text-sm transition-colors duration-150"
                style={{
                  color:      linkColor(href, color),
                  fontWeight: isActive(pathname, href) ? 600 : 400,
                }}
                onMouseEnter={() => setHoveredHref(href)}
                onMouseLeave={() => setHoveredHref(null)}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span
              className="block w-5 h-px bg-neutral-900 transition-transform duration-200"
              style={{ transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
            />
            <span
              className="block w-5 h-px bg-neutral-900 transition-opacity duration-200"
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className="block w-5 h-px bg-neutral-900 transition-transform duration-200"
              style={{ transform: menuOpen ? 'translateY(-5px) rotate(-45deg)' : 'none' }}
            />
          </button>
        </div>
      </header>

      {/*
        Mobile overlay — rendered OUTSIDE <header> so that backdrop-filter on the
        header (which makes it a containing block for fixed descendants per CSS spec)
        does not collapse this panel to zero height. Position uses inline style for
        `top` so it is always relative to the viewport, never the header.
      */}
      {menuOpen && (
        <div
          className="fixed left-0 right-0 bottom-0 z-[60] flex flex-col overflow-y-auto bg-white px-6 pt-12 pb-12 gap-2 md:hidden"
          style={{ top: '4rem' }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <Link
            href="/"
            className="text-2xl font-semibold py-3 transition-colors duration-150"
            style={{ color: pathname === '/' ? 'var(--color-framework)' : 'var(--color-neutral-900)' }}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {NAV_ITEMS.map(({ label, href, color }) => (
            <Link
              key={href}
              href={href}
              className="text-2xl font-semibold py-3 transition-colors duration-150"
              style={{ color: isActive(pathname, href) ? color : 'var(--color-neutral-900)' }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

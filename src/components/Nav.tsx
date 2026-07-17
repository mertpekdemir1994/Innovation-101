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

// Pages whose hero is dark — nav uses white text and a dark background until scroll
const DARK_HERO_PREFIXES = ['/framework/', '/process/']

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname.startsWith(href)
}

export default function Nav() {
  const pathname  = usePathname()
  const [menuOpen,    setMenuOpen]    = useState(false)
  const [scrolled,    setScrolled]    = useState(false)
  const [hoveredHref, setHoveredHref] = useState<string | null>(null)

  const isDarkPage = pathname === '/' || DARK_HERO_PREFIXES.some(p => pathname.startsWith(p))
  // Before scrolling on dark pages, nav sits on a dark hero — use a dark background
  // so the bar is always visually present (not floating transparent text)
  const isDarkUnscrolled = isDarkPage && !scrolled

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Prevent body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Scroll awareness
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerClass = [
    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
    scrolled
      ? 'bg-white/95 backdrop-blur-sm border-b border-neutral-100 shadow-subtle'
      : isDarkPage
        ? 'bg-zinc-950/75 backdrop-blur-sm border-b border-white/[0.06]'
        : 'bg-white border-b border-neutral-100',
  ].join(' ')

  const logoColor      = isDarkUnscrolled ? '#FAFAFA'                    : 'var(--color-neutral-900)'
  const inactiveColor  = isDarkUnscrolled ? 'rgba(255,255,255,0.55)'     : 'var(--color-neutral-500)'
  const barColor       = isDarkUnscrolled ? 'bg-white'                   : 'bg-neutral-900'

  // Returns the colour a desktop nav link should render at
  const linkColor = (href: string, color: string): string => {
    const active  = isActive(pathname, href)
    const hovered = hoveredHref === href
    if (active)                       return isDarkUnscrolled ? '#FFFFFF' : color
    if (hovered && isDarkUnscrolled)  return 'rgba(255,255,255,0.95)'
    if (hovered)                      return color
    return inactiveColor
  }

  return (
    <>
      <header className={headerClass}>
        <div className="max-w-content mx-auto px-6 md:px-8 h-16 flex items-center justify-between">

          {/* Logo */}
          <Link
            href="/"
            className="font-semibold text-lg tracking-tight transition-opacity duration-200 hover:opacity-70"
            style={{ color: logoColor }}
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
              className={`block w-5 h-px ${barColor} transition-transform duration-200`}
              style={{ transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
            />
            <span
              className={`block w-5 h-px ${barColor} transition-opacity duration-200`}
              style={{ opacity: menuOpen ? 0 : 1 }}
            />
            <span
              className={`block w-5 h-px ${barColor} transition-transform duration-200`}
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

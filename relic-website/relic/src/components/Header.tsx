import { useEffect, useRef, useState } from 'react'
import { NAV } from '../data/media'
import { Wordmark } from './Logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const firstLink = useRef<HTMLAnchorElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    firstLink.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-700 ${
        scrolled || open ? 'bg-night/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-6 text-ivory md:h-[4.5rem] md:px-10">
        <a href="#top" aria-label="RELIC — back to top" className="block">
          <Wordmark className="h-[15px] w-auto md:h-[17px]" title="RELIC" />
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  className="text-[0.72rem] uppercase tracking-caps text-ivory/75 transition-colors duration-500 hover:text-ivory"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <button
          ref={toggle}
          type="button"
          className="text-[0.72rem] uppercase tracking-caps md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <nav
        id="mobile-menu"
        aria-label="Mobile"
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-16 bg-night px-6 pt-10 md:hidden"
      >
        <ul className="space-y-6">
          {NAV.map((n, i) => (
            <li key={n.href}>
              <a
                ref={i === 0 ? firstLink : undefined}
                href={n.href}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-light text-ivory"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

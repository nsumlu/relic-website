import { CONTACT, NAV } from '../data/media'
import { Monogram } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-night text-ivory/70">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 py-14 md:px-10 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex items-start gap-5">
          <Monogram className="h-12 w-auto text-brass-light" />
          <p className="max-w-sm text-[0.8rem] leading-relaxed">
            RELIC No. 001 is presented as a concept. The photography and film on this site are conceptual
            visualisations of the object.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.72rem] uppercase tracking-caps">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="transition-colors hover:text-ivory">
                  {n.label}
                </a>
              </li>
            ))}
            <li>
              <a href={CONTACT.mailto} className="transition-colors hover:text-ivory">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-[1500px] px-6 pb-10 text-[0.7rem] uppercase tracking-caps text-ivory/40 md:px-10">
        © 2026 RELIC
      </div>
    </footer>
  )
}

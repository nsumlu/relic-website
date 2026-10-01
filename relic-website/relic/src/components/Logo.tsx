import type { SVGProps } from 'react'

/**
 * RELIC identity — generated from /brand/*.svg (single source of truth: path data below).
 * Colour follows `currentColor`, so the mark inherits from its parent.
 */
const GLYPHS: { x: number; paths: string[] }[] = [
  { x: 0, paths: ['M2,0H27V3.2H20.5V96.8H27V100H2V96.8H7.5V3.2H2Z', 'M20.5,0H31A28,28 0 0 1 31,56H20.5V52.6H31A14.4,24.6 0 0 0 31,3.4H20.5Z', 'M30.6,52.6H45.2L64,96.8H75V100H46V96.8H50Z'] },
  { x: 101, paths: ['M2,0H64V21H60V3.2H20.5V48.5H44V38.5H48V61.5H44V52H20.5V96.8H60V79H64V100H2V96.8H7.5V3.2H2Z'] },
  { x: 191, paths: ['M2,0H27V3.2H20.5V96.8H54V85H58.5V100H2V96.8H7.5V3.2H2Z'] },
  { x: 275.5, paths: ['M0,0H26V3.2H19.5V96.8H26V100H0V96.8H6.5V3.2H0Z'] },
  { x: 327.5, paths: ['M74.31,18.48A41,51.2 0 1 0 73.41,82.91L63.50,78.73L62.30,80.73A26.5,47.800000000000004 0 1 1 62.88,20.57L61.38,40.48L74.31,40.48Z'] },
]

const WORDMARK_VIEWBOX = '-2 -2 414.5 104'

export function Wordmark({ title = 'RELIC', ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={WORDMARK_VIEWBOX} role="img" aria-label={title} {...props}>
      <g fill="currentColor">
        {GLYPHS.map((g, i) => (
          <g key={i} transform={`translate(${g.x} 0)`}>
            {g.paths.map((d, j) => (
              <path key={j} d={d} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  )
}

export function Monogram(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 100" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M23,8C23,28 6,44 6,74C6,85 18,91 32,91C46,91 58,85 58,74C58,44 41,28 41,8"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M19,8H45" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="32" cy="68" r="4.2" fill="currentColor" />
    </svg>
  )
}

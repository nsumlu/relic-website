import { useEffect, useRef, useState } from 'react'
import { VIDEO } from '../data/media'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { Wordmark } from './Logo'
import { delay } from '../lib/css'

const HEADLINE = ['A', 'New', 'Form', 'of', 'the', 'Flame']

export function Hero() {
  const reduced = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  // Respect reduced motion: show the poster frame and let the visitor opt in.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (reduced) {
      v.pause()
      setPlaying(false)
    } else {
      v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }, [reduced])

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => undefined)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <section id="top" className="relative bg-night text-ivory" aria-label="Introduction">
      <div className="relative mx-auto grid h-[100svh] min-h-[640px] max-w-[1500px] lg:grid-cols-[5fr_7fr]">
        {/* Film frame: full-bleed on small screens, framed portrait on large ones */}
        <div className="absolute inset-0 lg:relative lg:col-start-2 lg:row-start-1 lg:flex lg:items-center lg:justify-center lg:py-20">
          <div className="relative h-full w-full lg:h-[calc(100svh-9rem)] lg:w-auto lg:aspect-[9/16]">
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              src={VIDEO.hero.src}
              poster={VIDEO.hero.poster}
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Film: the RELIC lamp moving from a pale studio to a lit window at night."
            />
            <button
              type="button"
              onClick={toggle}
              aria-label={playing ? 'Pause background film' : 'Play background film'}
              className="absolute bottom-4 right-4 z-10 rounded-full border border-ivory/40 bg-night/40 px-4 py-2 text-[0.65rem] uppercase tracking-caps text-ivory backdrop-blur transition hover:border-ivory"
            >
              {playing ? 'Pause' : 'Play'}
            </button>
          </div>
        </div>

        {/* Small-screen legibility: a soft floor behind the text only */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%] bg-gradient-to-t from-night/85 via-night/35 to-transparent lg:hidden"
        />

        <div className="relative z-10 flex flex-col justify-end px-6 pb-14 pt-28 md:px-10 lg:col-start-1 lg:row-start-1 lg:justify-center lg:pb-0 lg:pt-0">
          <p className="eyebrow hero-fade mb-8 text-brass-light" style={delay(300)}>
            No. 001 — Collectible lighting
          </p>
          <h1 className="m-0">
            <span className="sr-only">RELIC — A New Form of the Flame</span>
            <span
              aria-hidden="true"
              className="hero-fade block w-[min(70vw,24rem)] text-ivory lg:w-[min(30vw,26rem)]"
              style={delay(500)}
            >
              <Wordmark className="h-auto w-full" title="" aria-hidden="true" />
            </span>
          </h1>
          <p
            aria-hidden="true"
            className="font-display mt-8 text-[clamp(1.5rem,2.6vw,2.4rem)] font-light italic leading-tight text-ivory/90"
          >
            {HEADLINE.map((w, i) => (
              <span key={i} className="word-mask mr-[0.28em]">
                <span className="hero-word" style={delay(1100 + i * 140)}>
                  {w}
                </span>
              </span>
            ))}
          </p>
          <a
            href="#object"
            className="link-quiet hero-fade mt-10 w-fit text-ivory"
            style={delay(2200)}
          >
            Discover the Object <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>

      {/* Hairline that carries the eye across the dark → ivory threshold */}
      <div
        aria-hidden="true"
        className="scroll-line pointer-events-none absolute bottom-0 left-1/2 z-20 hidden h-28 w-px translate-y-1/2 bg-brass lg:block"
      />
    </section>
  )
}

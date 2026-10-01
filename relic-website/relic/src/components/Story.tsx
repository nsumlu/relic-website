import { IMAGES } from '../data/media'
import { delay } from '../lib/css'
import { Img } from './Img'

const MEMORIES = [
  ['01', 'Memory', 'A single light in a quiet room, and the way everything near it softens.'],
  ['02', 'Material', 'Brass that has already lived a little. Glass that holds the colour of honey.'],
  ['03', 'Atmosphere', 'Not brightness, but presence: a warmth you notice more than you see.'],
] as const

export function Story() {
  return (
    <section id="story" className="bg-night text-ivory" aria-labelledby="story-title">
      <div className="mx-auto max-w-[1500px] px-6 pb-28 pt-32 md:px-10 lg:pb-44 lg:pt-52">
        <p className="eyebrow reveal text-brass-light">The Story</p>
        <h2 id="story-title" className="display-xl reveal mt-6 max-w-[14ch]" style={delay(120)}>
          An Object <em className="font-light italic text-brass-light">of Memory</em>
        </h2>

        <div className="mt-20 grid gap-y-16 lg:mt-32 lg:grid-cols-12 lg:gap-x-16">
          <div className="order-2 lg:order-1 lg:col-span-5 lg:pt-56">
            <p className="lede reveal text-ivory/90">
              RELIC begins with a feeling rather than a form: the hush that settles over a room when one lamp is lit.
            </p>
            <div className="reveal mt-8 max-w-md space-y-5 text-[0.98rem] text-ivory/70" style={delay(150)}>
              <p>
                Traditional oil and gas lamps carried that warmth for generations. RELIC keeps what mattered — the
                glass, the flame, the glow on a wooden table — and gives it a form of its own.
              </p>
              <p>Made for intimate rooms: the corner of a table, a windowsill, the last hour of the evening.</p>
            </div>
          </div>

          <figure className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <div className="reveal-img mx-auto aspect-[1086/1448] w-full max-w-[560px] bg-espresso lg:ml-auto lg:mr-0">
              <Img asset={IMAGES.livingRoom} sizes="(min-width:1024px) 560px, 92vw" className="h-full w-full" />
            </div>
            <figcaption className="mx-auto mt-5 max-w-[560px] text-[0.78rem] italic text-ivory/55 lg:ml-auto lg:mr-0">
              Fig. 1 — {IMAGES.livingRoom.caption}
            </figcaption>
          </figure>
        </div>

        <ol className="mt-28 grid gap-12 border-t border-ivory/15 pt-12 md:grid-cols-3 md:gap-10 lg:mt-44">
          {MEMORIES.map(([n, t, body], i) => (
            <li key={n} className="reveal" style={delay(i * 140)}>
              <span className="font-display text-sm italic text-brass-light">{n}</span>
              <h3 className="eyebrow mt-3 text-ivory">{t}</h3>
              <p className="font-display mt-4 max-w-[28ch] text-[1.45rem] font-light leading-snug text-ivory/80">{body}</p>
            </li>
          ))}
        </ol>

        <blockquote className="reveal mt-32 max-w-4xl lg:mt-48">
          <p className="display-md italic text-ivory">
            Not a copy of the past. <span className="text-brass-light">A new form of the flame.</span>
          </p>
        </blockquote>
      </div>
    </section>
  )
}

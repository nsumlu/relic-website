import { useState } from 'react'
import { IMAGES } from '../data/media'
import { Img } from './Img'
import { delay } from '../lib/css'

const VIEWS = [
  { id: 'studio', asset: IMAGES.studio, label: 'Studio light' },
  { id: 'alt', asset: IMAGES.alt, label: 'Ivory backdrop' },
] as const

const FACTS = [
  ['Form', 'Sculptural, flowing'],
  ['Metal', 'Aged brass'],
  ['Glass', 'Handcrafted amber'],
  ['Light', 'Warm, atmospheric'],
] as const

export function ObjectSection() {
  const [active, setActive] = useState<number>(0)

  return (
    <section id="object" className="on-light bg-ivory text-espresso" aria-labelledby="object-title">
      <div className="mx-auto grid max-w-[1500px] gap-y-16 px-6 pb-28 pt-32 md:px-10 lg:grid-cols-12 lg:gap-x-16 lg:pb-40 lg:pt-48">
        <div className="lg:col-span-7">
          <div className="reveal-img relative mx-auto aspect-[1122/1402] w-full max-w-[640px] bg-parchment lg:mx-0">
            {VIEWS.map((v, i) => (
              <Img
                key={v.id}
                asset={v.asset}
                priority={i === 0}
                sizes="(min-width:1024px) 640px, 92vw"
                alt={i === active ? v.asset.alt : ''}
                className={`absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-[1400ms] ease-quiet ${
                  i === active ? 'scale-100 opacity-100' : 'scale-[1.03] opacity-0'
                }`}
              />
            ))}
          </div>

          <div className="mx-auto mt-6 flex max-w-[640px] items-end justify-between gap-6 lg:mx-0">
            <p className="text-[0.78rem] italic text-bronze/80" aria-live="polite">
              Fig. {active + 1} — {VIEWS[active].label}
            </p>
            <div className="flex gap-3" role="group" aria-label="Choose a view of the object">
              {VIEWS.map((v, i) => (
                <button
                  key={v.id}
                  type="button"
                  aria-pressed={i === active}
                  aria-label={`Show view ${i + 1}: ${v.label}`}
                  onClick={() => setActive(i)}
                  className={`relative h-[4.5rem] w-14 overflow-hidden bg-parchment transition-opacity duration-500 ${
                    i === active ? 'opacity-100 ring-1 ring-espresso ring-offset-4 ring-offset-ivory' : 'opacity-55 hover:opacity-100'
                  }`}
                >
                  <Img asset={v.asset} sizes="56px" alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pt-24">
          <p className="eyebrow reveal text-bronze">The Object</p>
          <h2 id="object-title" className="display-lg reveal mt-5" style={delay(120)}>
            No. 001
          </h2>
          <p className="lede reveal mt-10 text-bronze" style={delay(240)}>
            A lighting object that lives between function and collectible art.
          </p>
          <div className="reveal mt-8 max-w-md space-y-5 text-[0.98rem] text-espresso/80" style={delay(360)}>
            <p>
              Aged brass rises in a single flowing gesture around a flared chimney of handcrafted amber glass. The
              flame sits at the centre; everything else is shaped to hold it, frame it and warm the room around it.
            </p>
            <p>
              It borrows the quiet of the traditional oil and gas lamp, and leaves the antique behind.
            </p>
          </div>

          <dl className="reveal mt-14 max-w-md" style={delay(480)}>
            {FACTS.map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between border-t border-espresso/15 py-4">
                <dt className="eyebrow text-bronze">{k}</dt>
                <dd className="font-display text-xl">{v}</dd>
              </div>
            ))}
            <div className="border-t border-espresso/15" />
          </dl>
        </div>
      </div>
    </section>
  )
}

import { CONTACT, IMAGES } from '../data/media'
import { delay } from '../lib/css'
import { Img } from './Img'
import { Wordmark } from './Logo'

export function Closing() {
  return (
    <section id="contact" className="bg-night text-ivory" aria-labelledby="closing-title">
      <div className="mx-auto grid max-w-[1500px] items-center gap-y-16 px-6 py-28 md:px-10 lg:grid-cols-12 lg:gap-x-16 lg:py-44">
        <div className="lg:col-span-6">
          <p className="eyebrow reveal text-brass-light">Closing</p>
          <h2 id="closing-title" className="display-xl reveal mt-6 max-w-[10ch]" style={delay(120)}>
            The Warmth That <em className="font-light italic text-brass-light">Remains</em>
          </h2>
          <p className="lede reveal mt-10 max-w-md text-ivory/80" style={delay(240)}>
            Some light stays with you long after the room has gone quiet.
          </p>

          <div className="reveal mt-16 w-[min(70vw,22rem)] text-ivory" style={delay(360)}>
            <Wordmark className="h-auto w-full" title="RELIC" />
          </div>

          <div className="reveal mt-12" style={delay(480)}>
            <p className="eyebrow text-ivory/60">Enquiries</p>
            <a href={CONTACT.mailto} className="link-quiet mt-4 text-ivory">
              {CONTACT.email}
            </a>
          </div>
        </div>

        <figure className="lg:col-span-5 lg:col-start-8">
          <div className="reveal-img mx-auto aspect-[1024/1536] w-full max-w-[520px] bg-espresso lg:ml-auto lg:mr-0">
            <Img
              asset={IMAGES.windowNight}
              sizes="(min-width:1024px) 520px, 92vw"
              className="drift h-full w-full"
            />
          </div>
        </figure>
      </div>
    </section>
  )
}

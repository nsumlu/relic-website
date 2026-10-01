import { VIDEO } from '../data/media'
import { delay } from '../lib/css'
import { VideoPlayer } from './VideoPlayer'

const SCENES = [
  'A lit lamp on a pale stone surface against a soft grey wall.',
  'The view draws back: the lamp now stands on a round wooden table.',
  'Books and dried stems come into view beside it.',
  'Seen through a window, the lamp glows in a warm interior.',
  'The window darkens; the lamp is the room’s only light.',
] as const

export function Film() {
  return (
    <section id="film" className="bg-night text-ivory" aria-labelledby="film-title">
      <div className="mx-auto grid max-w-[1500px] items-center gap-y-14 px-6 py-28 md:px-10 lg:grid-cols-12 lg:gap-x-16 lg:py-44">
        <div className="lg:col-span-5">
          <p className="eyebrow reveal text-brass-light">Film</p>
          <h2 id="film-title" className="display-lg reveal mt-6" style={delay(120)}>
            RELIC <em className="font-light italic text-brass-light">in Motion</em>
          </h2>
          <p className="lede reveal mt-10 max-w-md text-ivory/85" style={delay(240)}>
            Ten seconds of changing light, from a pale studio to the glow of a window at night.
          </p>

          <details className="reveal group mt-12 max-w-md border-t border-ivory/15 pt-5" style={delay(360)}>
            <summary className="eyebrow cursor-pointer list-none text-ivory/75 transition-colors hover:text-ivory">
              <span className="inline-block transition-transform duration-500 group-open:rotate-45">+</span>{' '}
              Scene description
            </summary>
            <ol className="mt-5 space-y-3 text-[0.92rem] text-ivory/70">
              {SCENES.map((s, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display italic text-brass-light">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </details>
        </div>

        <div className="reveal lg:col-span-6 lg:col-start-7" style={delay(200)}>
          <VideoPlayer
            src={VIDEO.film.src}
            poster={VIDEO.film.poster}
            width={VIDEO.film.width}
            height={VIDEO.film.height}
            label="RELIC in Motion — a ten-second film of the lamp in changing light."
          />
        </div>
      </div>
    </section>
  )
}

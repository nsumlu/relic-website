import { IMAGES } from '../data/media'
import { delay } from '../lib/css'
import { Img } from './Img'

const NOTES = [
  {
    asset: IMAGES.detailBrass,
    title: 'Aged brass',
    text: 'A darkened, softly worn surface that catches light along its edges rather than mirroring it, with fine brushed grain visible up close.',
  },
  {
    asset: IMAGES.detailLight,
    title: 'Amber glass',
    text: 'Handcrafted glass in warm honey tones. It holds the flame, then lets the light spread gradually into the room.',
  },
  {
    asset: IMAGES.detailGlass,
    title: 'Patina & reflection',
    text: 'Every curve gathers its own reflections. The object changes as the light around it changes.',
  },
] as const

export function Craft() {
  return (
    <section id="craft" className="bg-bronze text-ivory" aria-labelledby="craft-title">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 lg:py-44">
        <p className="eyebrow reveal text-brass-light">Material &amp; Craft</p>
        <h2 id="craft-title" className="display-lg reveal mt-6 max-w-[18ch]" style={delay(120)}>
          Aged brass. <em className="font-light italic text-brass-light">Handcrafted amber glass.</em>
        </h2>

        <div className="mt-20 grid gap-y-20 lg:mt-28 lg:grid-cols-12 lg:gap-x-16">
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-24">
              <div className="reveal-img mx-auto aspect-[1122/1402] w-full max-w-[560px] bg-espresso lg:mx-0">
                <Img asset={IMAGES.macro} sizes="(min-width:1024px) 560px, 92vw" className="h-full w-full" />
              </div>
              <p className="mx-auto mt-5 max-w-[560px] text-[0.78rem] italic text-ivory/60 lg:mx-0">
                Detail — brass and amber glass
              </p>
            </div>
          </div>

          <div className="space-y-24 lg:col-span-6 lg:space-y-32 lg:pt-24">
            {NOTES.map((n, i) => (
              <article key={n.title} className="reveal" style={delay(60)}>
                <div className="reveal-img aspect-[4/3] w-full max-w-[520px] bg-espresso">
                  <Img asset={n.asset} sizes="(min-width:1024px) 520px, 92vw" className="h-full w-full object-cover" />
                </div>
                <div className="mt-7 flex max-w-[520px] items-baseline gap-5">
                  <span className="font-display text-sm italic text-brass-light">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-3xl font-light">{n.title}</h3>
                    <p className="mt-3 text-[0.96rem] text-ivory/70">{n.text}</p>
                  </div>
                </div>
              </article>
            ))}
            <p className="font-display reveal max-w-[22ch] text-3xl font-light italic text-ivory/90">
              Traditional craft, contemporary form.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

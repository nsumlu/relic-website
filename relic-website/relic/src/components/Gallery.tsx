import { useState } from 'react'
import { IMAGES, type ImageAsset } from '../data/media'
import { delay } from '../lib/css'
import { Img } from './Img'
import { Lightbox } from './Lightbox'

/** Reading order == viewer order. */
const ITEMS: ImageAsset[] = [
  IMAGES.tableEvening,
  IMAGES.sunbeams,
  IMAGES.windowNight,
  IMAGES.livingRoom,
  IMAGES.alt,
]

interface TileProps {
  asset: ImageAsset
  index: number
  onOpen: (i: number) => void
  sizes: string
  className?: string
  d?: number
}

function Tile({ asset, index, onOpen, sizes, className = '', d = 0 }: TileProps) {
  return (
    <figure className={className}>
      <button
        type="button"
        onClick={() => onOpen(index)}
        aria-label={`Open image ${index + 1} of ${ITEMS.length} full screen: ${asset.caption}`}
        className="group block w-full cursor-zoom-in text-left"
      >
        <span className="reveal-img block bg-parchment" style={delay(d)}>
          <Img
            asset={asset}
            sizes={sizes}
            className="h-auto w-full transition-transform duration-[1600ms] ease-quiet group-hover:scale-[1.02]"
          />
        </span>
      </button>
      <figcaption className="mt-4 flex items-baseline justify-between text-[0.78rem] italic text-bronze/80">
        <span>{asset.caption}</span>
        <span className="font-sans not-italic tabular-nums tracking-caps">0{index + 1}</span>
      </figcaption>
    </figure>
  )
}

export function Gallery() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="gallery" className="on-light bg-ivory text-espresso" aria-labelledby="gallery-title">
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-10 lg:py-44">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow reveal text-bronze">Gallery</p>
            <h2 id="gallery-title" className="display-lg reveal mt-6" style={delay(120)}>
              Light <em className="font-light italic text-amber">&amp;</em> Space
            </h2>
          </div>
          <p className="reveal max-w-xs text-[0.92rem] text-espresso/70" style={delay(240)}>
            Select any image to view it full screen, at its original proportions.
          </p>
        </div>

        <div className="mt-20 grid gap-x-16 gap-y-20 lg:mt-28 lg:grid-cols-12">
          <Tile
            asset={ITEMS[0]}
            index={0}
            onOpen={setOpen}
            sizes="(min-width:1024px) 52vw, 92vw"
            className="lg:col-span-7"
          />
          <Tile
            asset={ITEMS[1]}
            index={1}
            onOpen={setOpen}
            sizes="(min-width:1024px) 36vw, 92vw"
            className="lg:col-span-5 lg:mt-48"
            d={150}
          />

          <Tile
            asset={ITEMS[2]}
            index={2}
            onOpen={setOpen}
            sizes="(min-width:1024px) 30vw, 92vw"
            className="lg:col-span-4 lg:col-start-2"
          />
          <Tile
            asset={ITEMS[3]}
            index={3}
            onOpen={setOpen}
            sizes="(min-width:1024px) 46vw, 92vw"
            className="lg:col-span-6 lg:col-start-7 lg:mt-32"
            d={150}
          />

          <div className="lg:col-span-12 lg:grid lg:grid-cols-12 lg:gap-x-16">
            <Tile
              asset={ITEMS[4]}
              index={4}
              onOpen={setOpen}
              sizes="(min-width:1024px) 40vw, 92vw"
              className="lg:col-span-5 lg:col-start-4"
            />
          </div>
        </div>
      </div>

      <Lightbox items={ITEMS} index={open} onChange={setOpen} />
    </section>
  )
}

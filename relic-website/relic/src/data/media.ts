/** Resolve a path inside /public respecting the configured Vite base (GitHub Pages sub-path safe). */
export const url = (p: string) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`

export interface ImageAsset {
  key: string
  w: number
  h: number
  sizes: number[]
  alt: string
  caption?: string
}

/**
 * Every file lives in /public/media/img as `<key>-<width>.webp`.
 * Widths are native or below — nothing is upscaled. Dimensions are the original aspect ratios.
 */
export const IMAGES = {
  studio: {
    key: 'object-studio',
    w: 1122,
    h: 1402,
    sizes: [480, 800, 1122],
    alt: 'The RELIC lamp on a pale stone surface: a flowing aged-brass frame around a flared amber glass chimney with a single lit flame.',
    caption: 'No. 001 — studio light',
  },
  alt: {
    key: 'object-alt',
    w: 1122,
    h: 1402,
    sizes: [480, 800, 1122],
    alt: 'The RELIC lamp against a soft ivory backdrop, its amber glass glowing around the flame.',
    caption: 'No. 001 — ivory backdrop',
  },
  macro: {
    key: 'craft-macro',
    w: 1122,
    h: 1402,
    sizes: [480, 800, 1122],
    alt: 'Macro view of brushed, aged brass curving around amber glass with bright flame reflections and tiny bubbles.',
  },
  detailBrass: {
    key: 'craft-detail-brass',
    w: 600,
    h: 450,
    sizes: [600],
    alt: 'Close-up of aged brass showing fine brushed grain beside glowing amber glass.',
  },
  detailLight: {
    key: 'craft-detail-light',
    w: 600,
    h: 450,
    sizes: [600],
    alt: 'Close-up of the flame’s glow diffused through amber glass.',
  },
  detailGlass: {
    key: 'craft-detail-glass',
    w: 600,
    h: 450,
    sizes: [600],
    alt: 'Close-up of amber glass with small bubbles meeting the dark edge of the brass.',
  },
  livingRoom: {
    key: 'life-living-room',
    w: 1086,
    h: 1448,
    sizes: [480, 800, 1086],
    alt: 'A warm, lived-in sitting room in afternoon light; the RELIC lamp glows on a wooden table beside a window.',
    caption: 'A lived-in room, one lit lamp',
  },
  sunbeams: {
    key: 'life-sunbeams',
    w: 1122,
    h: 1402,
    sizes: [480, 800, 1122],
    alt: 'The RELIC lamp on a worn stone surface, with low sunlight and drifting dust behind it.',
    caption: 'Low sun, drifting dust',
  },
  tableEvening: {
    key: 'life-table-evening',
    w: 1122,
    h: 1402,
    sizes: [480, 800, 1122],
    alt: 'The RELIC lamp on an aged wooden table in warm evening light, with window shadows on the wall behind.',
    caption: 'Evening, at the table',
  },
  windowNight: {
    key: 'life-window-night',
    w: 1024,
    h: 1536,
    sizes: [480, 800, 1024],
    alt: 'A lit RELIC lamp seen through a dark window at night, framed by patterned curtains.',
    caption: 'From outside, a lit window',
  },
} satisfies Record<string, ImageAsset>

export type ImageAssetKey = keyof typeof IMAGES

export const imgSrcSet = (a: ImageAsset) =>
  a.sizes.map((s) => `${url(`media/img/${a.key}-${s}.webp`)} ${s}w`).join(', ')

export const imgSrc = (a: ImageAsset, w?: number) =>
  url(`media/img/${a.key}-${w ?? a.sizes[Math.min(1, a.sizes.length - 1)]}.webp`)

export const VIDEO = {
  hero: { src: url('media/video/relic-hero.mp4'), poster: url('media/video/hero-poster.webp') },
  film: {
    src: url('media/video/relic-film.mp4'),
    poster: url('media/video/film-poster.webp'),
    width: 720,
    height: 1280,
    durationLabel: '0:10',
  },
}

export const CONTACT = {
  email: 'nsumlu@hotmail.com',
  mailto: 'mailto:nsumlu@hotmail.com?subject=RELIC%20No.%20001',
}

export const NAV = [
  { href: '#object', label: 'The Object' },
  { href: '#story', label: 'Story' },
  { href: '#craft', label: 'Craft' },
  { href: '#film', label: 'Film' },
  { href: '#gallery', label: 'Gallery' },
] as const

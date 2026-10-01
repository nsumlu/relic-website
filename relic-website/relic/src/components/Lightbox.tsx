import { useCallback, useEffect, useRef, type KeyboardEvent } from 'react'
import { imgSrc, imgSrcSet, type ImageAsset } from '../data/media'

interface Props {
  items: ImageAsset[]
  index: number | null
  onChange: (i: number | null) => void
}

/** Full-screen viewer built on the native <dialog>: focus trap, Esc to close, focus returns to the trigger. */
export function Lightbox({ items, index, onChange }: Props) {
  const ref = useRef<HTMLDialogElement>(null)
  const open = index !== null

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (open && !d.open) {
      d.showModal()
      document.body.style.overflow = 'hidden'
    }
    if (!open && d.open) d.close()
    if (!open) document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return
      onChange((index + dir + items.length) % items.length)
    },
    [index, items.length, onChange],
  )

  const onKeyDown = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      step(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      step(-1)
    }
  }

  const current = index !== null ? items[index] : null
  const next = index !== null ? items[(index + 1) % items.length] : null
  const prev = index !== null ? items[(index - 1 + items.length) % items.length] : null

  return (
    <dialog
      ref={ref}
      className="lightbox"
      aria-label="Image viewer"
      onKeyDown={onKeyDown}
      onClose={() => onChange(null)}
      onClick={(e) => {
        if (e.target === e.currentTarget) onChange(null)
      }}
    >
      {current && (
        <div className="relative flex h-full w-full flex-col">
          <div className="flex items-center justify-between px-6 py-5 text-[0.72rem] uppercase tracking-caps md:px-10">
            <span className="tabular-nums text-ivory/70" aria-live="polite">
              {String((index ?? 0) + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button type="button" onClick={() => onChange(null)} className="py-2 text-ivory hover:text-brass-light">
              Close
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 md:px-24">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 -translate-y-1/2 px-3 py-6 text-3xl text-ivory/70 transition hover:text-ivory md:left-6"
            >
              <span aria-hidden="true">‹</span>
            </button>

            <img
              key={current.key}
              src={imgSrc(current, current.sizes[current.sizes.length - 1])}
              srcSet={imgSrcSet(current)}
              sizes="90vw"
              width={current.w}
              height={current.h}
              alt={current.alt}
              className="lb-fade max-h-full max-w-full object-contain"
              style={{ maxHeight: 'calc(100svh - 10rem)', width: 'auto', height: 'auto' }}
            />

            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next image"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-6 text-3xl text-ivory/70 transition hover:text-ivory md:right-6"
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <p className="px-6 py-5 text-center text-[0.85rem] italic text-ivory/65">{current.caption}</p>

          {/* Warm the cache for neighbouring slides */}
          <div hidden>
            {next && <img src={imgSrc(next)} alt="" />}
            {prev && <img src={imgSrc(prev)} alt="" />}
          </div>
        </div>
      )}
    </dialog>
  )
}

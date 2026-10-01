import type { CSSProperties } from 'react'
import { imgSrc, imgSrcSet, type ImageAsset } from '../data/media'

interface Props {
  asset: ImageAsset
  /** Responsive `sizes` attribute — describes the rendered width, not the source. */
  sizes: string
  className?: string
  style?: CSSProperties
  priority?: boolean
  alt?: string
}

/** Responsive WebP with intrinsic dimensions (prevents layout shift) and lazy loading by default. */
export function Img({ asset, sizes, className, style, priority = false, alt }: Props) {
  return (
    <img
      src={imgSrc(asset)}
      srcSet={imgSrcSet(asset)}
      sizes={sizes}
      width={asset.w}
      height={asset.h}
      alt={alt ?? asset.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      style={style}
    />
  )
}

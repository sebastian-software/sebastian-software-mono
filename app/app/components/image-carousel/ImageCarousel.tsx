import type { CSSProperties } from "react"

import useSize from "~/hooks/size"

import {
  imageClass,
  imageContainerClass,
  imageTrackClass
} from "./ImageCarousel.css"

export interface ImageCarouselProps {
  readonly images: string[] // Array of image URLs
  readonly speed?: number
  readonly overscroll?: string
  readonly filter?: string
}

export function ImageCarousel({
  images,
  speed = 50,
  overscroll = "10cqw",
  filter = ""
}: ImageCarouselProps) {
  const outer = useSize()
  const inner = useSize()

  const duration = Math.round(
    Math.max(inner.rect.width - outer.rect.width, 0) / speed
  )

  return (
    <div ref={outer.ref} className={imageContainerClass}>
      <div
        ref={inner.ref}
        className={imageTrackClass}
        style={
          {
            "--duration": `${duration}s`,
            "--over-scroll": overscroll
          } as CSSProperties
        }
      >
        {images.map((src, index) => (
          <img
            key={src}
            src={src}
            alt={`Image ${index + 1}`}
            className={imageClass}
            style={{ filter }}
          />
        ))}
      </div>
    </div>
  )
}

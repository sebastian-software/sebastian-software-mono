import { clsx } from "clsx"
import type { CSSProperties, PropsWithChildren } from "react"

import useSize from "~/hooks/size"

import { containerClass, trackClass } from "./ImageCarousel.css"

export interface ImageCarouselProps extends PropsWithChildren {
  readonly speed?: number
  readonly overscroll?: string
  readonly filter?: string
  readonly className?: string
}

export function ImageCarousel({
  speed = 50,
  overscroll = "10cqw",
  filter = "",
  className,
  children
}: ImageCarouselProps) {
  const outer = useSize()
  const inner = useSize()

  const duration = Math.round(
    Math.max(inner.rect.width - outer.rect.width, 0) / speed
  )

  return (
    <div ref={outer.ref} className={containerClass}>
      <ul
        ref={inner.ref}
        className={clsx(trackClass, className)}
        style={
          {
            filter,
            "--duration": `${duration}s`,
            "--over-scroll": overscroll
          } as CSSProperties
        }
      >
        {children}
      </ul>
    </div>
  )
}

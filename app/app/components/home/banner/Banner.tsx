import { Image, Source } from "@unpic/react"
import type { PropsWithChildren } from "react"

import { contentClass, imageClass, rootClass } from "./Banner.css"

export interface BannerProps extends PropsWithChildren {
  readonly alt?: string
}

export function Banner({ children, alt }: BannerProps) {
  return (
    <div className={rootClass}>
      <div className={contentClass}>{children}</div>
      <picture className={imageClass}>
        {/* Hero image, displayed on screens 768px or wider */}
        <Source
          src="https://a.storyblok.com/f/299556/10000x3500/a184076908/home-banner-extended.jpg"
          media="(min-width: 768px)"
          width={10000}
          height={3500}
        />
        {/* Portrait image for screens below that size */}
        <Source
          src="https://a.storyblok.com/f/299556/4800x3500/e0a63a0965/home-banner-portrait.jpg"
          media="(max-width: 767px)"
          width={4800}
          height={3500}
        />
        <Image
          unstyled
          priority
          alt={alt}
          layout="fullWidth"
          src="https://a.storyblok.com/f/299556/10000x3500/a184076908/home-banner-extended.jpg"
        />
      </picture>
    </div>
  )
}

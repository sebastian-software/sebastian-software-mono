import { getSrcSetSteps } from "~/utils/imageBuilder"
import type { SlicedPictureBlock } from "~/utils/pictureHandler"

export interface SanityImageProps {
  readonly url: string
  readonly alt?: string | null
  readonly rect: number[]

  readonly media?: string
  readonly preview?: string
  readonly quality?: number
}

export const DEFAULT_QUALITY = 80
export const DEFAULT_MIN_WIDTH = 100
export const DEFAULT_STEP_REDUCER = 0.8

export function SanityImage(props: SanityImageProps) {
  const baseParams = new URLSearchParams({
    auto: "format",
    q: `${props.quality ?? DEFAULT_QUALITY}`,
    rect: props.rect.join(",")
  })

  // eslint-disable-next-line unicorn/no-unreadable-array-destructuring
  const [, , width, height] = props.rect
  const baseUrl = props.url + "?" + baseParams.toString()
  const srcSet = getSrcSetSteps(
    baseUrl,
    width,
    DEFAULT_MIN_WIDTH,
    DEFAULT_STEP_REDUCER
  )

  if (props.media) {
    return (
      <source
        media={props.media}
        srcSet={srcSet}
        width={width}
        height={height}
      />
    )
  }

  return (
    <img
      style={{
        height: "auto",
        backgroundImage: `url(${props.preview})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      alt={props.alt ?? ""}
      src={baseUrl}
      srcSet={srcSet}
      width={width}
      height={height}
    />
  )
}

export interface SanityPortableImageProps {
  readonly value: SlicedPictureBlock
}

/**
 * Wrapper for SanityImage to use in PortableText
 */
export function SanityPortableImage({ value }: SanityPortableImageProps) {
  if (!value.url) {
    return null
  }

  // We assume that the first image is the one that is shown by default
  // and the further sources are being used.. for desktop
  // TODO: Needs fine tuning especially regarding the hard-baked mediaquery.
  const [img, ...sources] = value.slices

  return (
    <picture>
      {sources.map((slice) => (
        <SanityImage
          key={slice.aspectRatio}
          media="(min-width: 768px)"
          aspectRatio={slice.aspectRatio}
          url={value.url}
          alt={value.alt}
          rect={slice.rect}
          preview={slice.preview}
        />
      ))}
      <SanityImage
        key={img.aspectRatio}
        url={value.url}
        alt={value.alt}
        rect={img.rect}
        preview={img.preview}
      />
    </picture>
  )
}

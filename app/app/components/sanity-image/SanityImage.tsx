import { getSrcSetSteps } from "~/utils/imageBuilder"

export interface SanityImageProps {
  readonly url: string
  readonly alt: string
  readonly rect: number[]

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
    rect: props.rect?.join(",")
  })

  const [, , width, height] = props.rect
  const baseUrl = props.url + "?" + baseParams.toString()
  const srcSet = getSrcSetSteps(
    baseUrl,
    width,
    DEFAULT_MIN_WIDTH,
    DEFAULT_STEP_REDUCER
  )

  return (
    <img
      style={{
        width: width,
        aspectRatio: `${width} / ${height}`,
        backgroundImage: `url(${props.preview})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
      }}
      alt={props.alt ?? ""}
      src={baseUrl}
      srcSet={srcSet}
    />
  )
}

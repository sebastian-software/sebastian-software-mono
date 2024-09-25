import type {
  SanityBaseImageCrop,
  SanityBaseImageHotspot
} from "~/utils/imageBuilder"
import { computeRect, getSrcSetSteps } from "~/utils/imageBuilder"

export interface SanityImageProps {
  // input config
  readonly url: string
  readonly width: number
  readonly height: number

  readonly alt?: string | null
  readonly crop?: SanityBaseImageCrop
  readonly hotspot?: SanityBaseImageHotspot

  // output config
  readonly aspect?: number | null
  readonly zoom?: number | null
}

export function SanityImage(props: SanityImageProps) {
  const rect = computeRect(
    {
      width: props.width,
      height: props.height,
      crop: props.crop,
      hotspot: props.hotspot
    },
    { aspectRatio: props.aspect, zoom: props.zoom }
  )

  const baseParams = new URLSearchParams({
    rect: `${rect.left},${rect.top},${rect.width},${rect.height}`
  })
  const baseUrl = props.url + "?" + baseParams.toString()
  // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  const srcSet = getSrcSetSteps(baseUrl, rect.width, 100, 0.8)

  return <img alt={props.alt ?? ""} src={baseUrl} srcSet={srcSet} />
}

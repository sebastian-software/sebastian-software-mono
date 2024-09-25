import type { SanityImageCrop, SanityImageHotspot } from "sanity.types"

import { computeRect } from "~/utils/imageBuilder"

export interface SanityImageProps {
  // input config
  readonly url: string
  readonly width: number
  readonly height: number

  readonly alt?: string | null
  readonly crop?: SanityImageCrop | null
  readonly hotspot?: SanityImageHotspot | null

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
  console.log("URL:", baseUrl)

  return <img alt={props.alt} src={baseUrl} />
}

import type { SanityImageCrop, SanityImageHotspot } from "sanity.types"

import { computeRect } from "~/utils/imageBuilder"

export interface SanityImageProps {
  // input config
  readonly url: string
  readonly alt: string

  readonly width: number
  readonly height: number
  readonly crop?: SanityImageCrop
  readonly hotspot?: SanityImageHotspot

  // output config
  readonly aspect: number
  readonly zoom: number
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

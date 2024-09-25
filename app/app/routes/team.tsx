import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { loadQuery, useQuery } from "@sanity/react-loader"
import { Image } from "@unpic/react"
import type {
  PAGES_QUERYResult,
  SanityImageCrop,
  SanityImageDimensions,
  SanityImageHotspot
} from "sanity.types"
import { SanityImage } from "sanity-image"

import { RichText } from "~/components/richtext/RichText"
import { getAppLanguage } from "~/language.server"
import { PAGES_QUERY } from "~/queries/pages"
import { dataset, projectId } from "~/sanity/env"
import { urlFor } from "~/sanity/image"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request),
    id: "team"
  }

  const initial = await loadQuery<PAGES_QUERYResult>(PAGES_QUERY, params)
  return { initial, query: PAGES_QUERY, params }
}

export default function Index() {
  const { initial, query, params } = useLoaderData<typeof loader>()
  const { data } = useQuery<PAGES_QUERYResult>(
    query,
    params,
    // Note: There is a typing issue in Sanity with sourcemap content types
    // This Required<> cast is a workaround until the issue is fixed.
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    { initial: initial as Required<typeof initial> }
  )

  return (
    <RichText>
      <h1>{data[0].title}</h1>

      <PortableText
        value={data[0].content}
        components={{
          types: {
            picture: SanityPortableImage
          }
        }}
      />
    </RichText>
  )
}

export interface SanityPortableImageProps {
  readonly value: SanityImageSource
}

export interface SanityImageParams extends Record<string, string | number> {
  "fp-x": "number"
  "fp-y": "number"
  fit: "string"
  crop: "string"
}

interface Dimensions {
  width: number
  height: number
}

function findLargestDimensions(
  origWidth: number,
  origHeight: number,
  targetAspectRatio: number
): Dimensions {
  // Step 1: Calculate the width that fits within the original height
  const widthForTargetHeight = origHeight * targetAspectRatio

  // Step 2: Calculate the height that fits within the original width
  const heightForTargetWidth = origWidth / targetAspectRatio

  // Step 3: Determine the largest dimension that fits within the original bounds
  if (widthForTargetHeight <= origWidth) {
    // The width based on the original height fits within the original width
    return {
      width: widthForTargetHeight,
      height: origHeight
    }
  }

  // The height based on the original width fits within the original height
  return {
    width: origWidth,
    height: heightForTargetWidth
  }
}

interface DimensionsWithHotspot {
  width: number
  height: number
  x: number
  y: number
}

interface Hotspot {
  x: number // X coordinate as a percentage (0 to 1)
  y: number // Y coordinate as a percentage (0 to 1)
  width: number // Width of the hotspot as a percentage
  height: number // Height of the hotspot as a percentage
}
function findLargestDimensionsWithHotspot(
  origWidth: number,
  origHeight: number,
  targetAspectRatio: number,
  hotspot: Hotspot
): DimensionsWithHotspot {
  // Step 1: Calculate the width that fits within the original height
  const widthForTargetHeight = origHeight * targetAspectRatio

  // Step 2: Calculate the height that fits within the original width
  const heightForTargetWidth = origWidth / targetAspectRatio

  let finalWidth: number
  let finalHeight: number

  // Step 3: Determine the largest dimension that fits within the original bounds
  if (widthForTargetHeight <= origWidth) {
    finalWidth = widthForTargetHeight
    finalHeight = origHeight
  } else {
    finalWidth = origWidth
    finalHeight = heightForTargetWidth
  }

  // Step 4: Calculate the hotspot's center in pixels
  const hotspotCenterX = hotspot.x * origWidth
  const hotspotCenterY = hotspot.y * origHeight

  // Step 5: Ensure the final crop includes the hotspot, adjusting for the aspect ratio
  // We want the hotspot to be centered in the resulting crop

  const cropX = Math.max(
    0,
    Math.min(hotspotCenterX - finalWidth / 2, origWidth - finalWidth)
  )
  const cropY = Math.max(
    0,
    Math.min(hotspotCenterY - finalHeight / 2, origHeight - finalHeight)
  )

  // Step 6: Round the results to avoid subpixel values
  return {
    width: Math.round(finalWidth),
    height: Math.round(finalHeight),
    x: Math.round(cropX),
    y: Math.round(cropY)
  }
}

function cropImage(
  origWidth: number,
  origHeight: number,
  crop: SanityImageCrop
) {
  // Berechne die tatsächlichen Pixel-Werte für den Zuschnitt
  const croppedWidth = Math.round(
    origWidth * (1 - (crop.left ?? 0) - (crop.right ?? 0))
  )
  const croppedHeight = Math.round(
    origHeight * (1 - (crop.top ?? 0) - (crop.bottom ?? 0))
  )

  // Berechne die Startposition des Zuschnitts
  const left = Math.round(origWidth * (crop.left ?? 0))
  const top = Math.round(origHeight * (crop.top ?? 0))

  // Gib die Zuschnittwerte zurück
  return {
    width: croppedWidth,
    height: croppedHeight,
    left,
    top
  }
}

export interface SanityProImageProps {
  readonly url: string
  readonly alt: string
  readonly size: Required<SanityImageDimensions>
  readonly aspect: number
  readonly crop?: SanityImageCrop
  readonly hotspot?: SanityImageHotspot
}

function SanityProImage(props: SanityProImageProps) {
  const cropped = cropImage(props.size.width, props.size.height, props.crop)

  const start = findLargestDimensionsWithHotspot(
    props.size.width,
    props.size.height,
    props.aspect,
    props.hotspot
  )

  console.log("Original Size:", props.size)
  console.log("Cropped Size:", cropped)
  console.log("Max Aspect Size:", start)

  const baseParams = new URLSearchParams({
    rect: `${start.x},${start.y},${start.width},${start.height}`
  })
  const baseUrl = props.url + "?" + baseParams.toString()
  console.log("URL:", baseUrl)

  return <img alt={props.alt} src={baseUrl} />
}

export function SanityPortableImage({ value }) {
  console.log("CMS VALUE:", JSON.stringify(value, null, 2))

  return (
    <SanityProImage
      aspect={4 / 5}
      url={value.url}
      alt={value.alt}
      size={value.size}
      crop={value.crop}
      hotspot={value.hotspot}
    />
  )

  const image = value.image
  console.log("IMAGE DATA:", JSON.stringify(image, null, 2))
  console.log("IMAGE ALT:", value.alt)
  console.log("IMAGE URL:", value.url)

  return (
    <SanityImage
      alt={value.alt}
      id={image.asset._ref}
      projectId={projectId}
      dataset={dataset}
      width={200}
      height={250}
      mode="cover"
      // Have hotspot or crop data from Sanity? Pass it in!
      hotspot={image.hotspot}
      crop={image.crop}
      //
      // Want low-quality image previews? Fetch them from Sanity and pass them in too.
      // preview={image.asset.metadata.lqip}
    />
  )

  const baseUrl = urlFor(image)
    // ?.focalPoint(value.image.hotspot.x, value.image.hotspot.y)
    // .crop("focalpoint")
    .fit("crop")
    .width(2000)
    .height(3000)
    .url()

  console.log("IMAGE DATA:", JSON.stringify(value.image, null, 2))

  // const params = new URLSearchParams({
  //   "fp-x": value.image.hotspot.x,
  //   "fp-y": value.image.hotspot.y,
  //   fit: "crop",
  //   crop: "focalpoint"
  // } as SanityImageParams)

  // console.log("BUILD-1: " + value.url.slice(7) + "?" + params.toString())
  console.log("BUILD-2: " + baseUrl.slice(7))

  return <Image src={baseUrl} alt={value.alt} width={200} aspectRatio={4 / 5} />
}

import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { loadQuery, useQuery } from "@sanity/react-loader"
import { Image } from "@unpic/react"
import type { PAGES_QUERYResult } from "sanity.types"
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

export function SanityPortableImage({ value }) {
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

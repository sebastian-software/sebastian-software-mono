import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { loadQuery, useQuery } from "@sanity/react-loader"
import type { PAGES_QUERYResult } from "sanity.types"

import { RichText } from "~/components/richtext/RichText"
import { SanityImage } from "~/components/sanity-image"
import { getAppLanguage } from "~/language.server"
import { PAGES_QUERY } from "~/queries/pages"
import { computeRect } from "~/utils/imageBuilder"
import { fetchAsBlurHash } from "~/utils/imagePreview"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const params = {
    language: await getAppLanguage(request),
    id: "team"
  }

  const initial = await loadQuery<PAGES_QUERYResult>(PAGES_QUERY, params)

  const content = initial.data[0].content
  const pictures = content.filter((block) => block._type === "picture")

  const output = {
    aspect: 4 / 5,
    zoom: undefined
  }

  const rects = pictures.map((image) =>
    computeRect(
      {
        width: image.width,
        height: image.height,
        crop: image.crop,
        hotspot: image.hotspot
      },
      { aspectRatio: output.aspect, zoom: output.zoom }
    )
  )

  const urls = pictures.map((image, index) => {
    const rect = rects[index]
    return `${image.url}?rect=${rect.left},${rect.top},${rect.width},${rect.height}&w=100`
  })

  const hashes = await Promise.all(
    urls.map(async (url) => fetchAsBlurHash(url))
  )

  console.log("Initial data:", JSON.stringify(pictures, null, 2))
  console.log("RECTS:", rects, urls, hashes)

  return { initial, query: PAGES_QUERY, params }
}

type PictureContent = Extract<
  PAGES_QUERYResult[number]["content"][number],
  { _type: "picture" }
>

export interface PortableTextPictureRendererProps {
  readonly value: PictureContent
}

export function PortableTextPictureRenderer({
  value
}: PortableTextPictureRendererProps) {
  if (value.url && value.width && value.height) {
    return (
      <SanityImage
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        aspect={4 / 5}
        url={value.url}
        alt={value.alt}
        width={value.width}
        height={value.height}
        crop={value.crop}
        hotspot={value.hotspot}
      />
    )
  }

  return null
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
            picture: PortableTextPictureRenderer
          }
        }}
      />
    </RichText>
  )
}

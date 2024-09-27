import { PortableText } from "@portabletext/react"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { loadQuery, useQuery } from "@sanity/react-loader"
import type { PAGES_QUERYResult } from "sanity.types"

import { RichText } from "~/components/richtext/RichText"
import { SanityImage } from "~/components/sanity-image"
import { getAppLanguage } from "~/language.server"
import { PAGES_QUERY } from "~/queries/pages"
import { computeRect, resizeToArea } from "~/utils/imageBuilder"
import { fetchToDataUrl } from "~/utils/imagePreview"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const language = await getAppLanguage(request)
  const params = { language, id: "team" }

  const output = { aspect: 4 / 5, zoom: undefined }

  const initial = await loadQuery<PAGES_QUERYResult>(PAGES_QUERY, params)

  // Ensure that initial data exists
  const content = initial.data?.[0]?.content || []

  // Process each content block using modular functions
  await Promise.all(
    content.map(async (block) => {
      switch (block._type) {
        case "picture":
          await processPictureBlock(block, output)
          break

        // Optionally handle unknown block types or do nothing
        default:
          break
      }
    })
  )

  return { initial, query: PAGES_QUERY, params }
}

// Modular function to process picture blocks
const processPictureBlock = async (
  block: EnrichedPictureBlock,
  output: { aspect: number; zoom: number | undefined }
) => {
  const { width, height, crop, hotspot, url } = block

  if (width && height) {
    const rectValues = computeRect(
      { width, height, crop, hotspot },
      { aspectRatio: output.aspect, zoom: output.zoom }
    )

    const { targetWidth } = resizeToArea(
      rectValues.width,
      rectValues.height,
      100
    )
    const rect = `${rectValues.left},${rectValues.top},${rectValues.width},${rectValues.height}`
    const previewUrl = `${url}?rect=${rect}&q=80&w=${targetWidth}&fm=webp&blur=10`

    // Enhance block data with pre-computed values
    block.rect = rect
    block.preview = await fetchToDataUrl(previewUrl)
  }
}

type PictureBlock = Extract<
  PAGES_QUERYResult[number]["content"][number],
  { _type: "picture" }
>

type EnrichedPictureBlock = PictureBlock & {
  preview?: string
  rect?: string
}

export interface PortableTextPictureRendererProps {
  readonly value: EnrichedPictureBlock
}

export function PortableTextPictureRenderer({
  value
}: PortableTextPictureRendererProps) {
  if (value.url && value.width && value.height) {
    console.log("PortableImageProps:", value)
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
        preview={value.preview}
        rect={value.rect}
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

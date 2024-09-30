import type { QueryResponseInitial } from "@sanity/react-loader"
import type {
  PAGES_QUERYResult,
  SanityImageCrop,
  SanityImageHotspot
} from "sanity.types"

import { computeRect, resizeToArea } from "./imageBuilder"
import { fetchToDataUrl } from "./imagePreview"

export interface SanityPortableBlock extends Record<string, unknown> {
  _type: string
}

export interface SanityReferenceBlock extends SanityPortableBlock {
  _id: string
}

export interface InputPictureBlock extends SanityReferenceBlock {
  url: string
  width: number
  height: number
  crop?: SanityImageCrop | null
  hotspot?: SanityImageHotspot | null
  alt?: string | null
}

export interface OutputPictureBlock extends SanityReferenceBlock {
  url: string
  alt?: string | null
  rect: [number, number, number, number]
  preview: string
}

/**
 * Custom type guard to detect picture blocks
 */
function isPictureBlock(
  block: SanityPortableBlock
): block is InputPictureBlock {
  return (
    block._type === "picture" &&
    block._id != null &&
    typeof block.width === "number" &&
    typeof block.height === "number" &&
    block.url != null
  )
}

export const DEFAULT_ASPECT_RATIO = 4 / 5
export const DEFAULT_PREVIEW_SIZE = 100

/**
 * Modular function to process picture blocks
 */
async function processPictureBlock(
  block: SanityPortableBlock
): Promise<OutputPictureBlock | SanityPortableBlock> {
  // Directly return in case of missing data
  if (!isPictureBlock(block)) {
    return block
  }

  const { _id, _type, width, height, crop, hotspot, url, alt } = block
  const output = {
    aspect: DEFAULT_ASPECT_RATIO,
    zoom: undefined,
    previewSize: DEFAULT_PREVIEW_SIZE
  }

  const rectValues = computeRect(
    { width, height, crop, hotspot },
    { aspectRatio: output.aspect, zoom: output.zoom }
  )

  const { targetWidth } = resizeToArea(
    rectValues.width,
    rectValues.height,
    output.previewSize
  )

  // Using a more compact internal data structure
  const rect: OutputPictureBlock["rect"] = [
    rectValues.left,
    rectValues.top,
    rectValues.width,
    rectValues.height
  ]

  // Generate a preview image URL for downloading
  const previewUrl = `${url}?rect=${rect.join(",")}&q=80&w=${targetWidth}&fm=webp&blur=10`
  const preview = await fetchToDataUrl(previewUrl)

  const processedPicture: OutputPictureBlock = {
    // core block data
    _type,

    // original data
    _id,
    url,
    alt,

    // computed data
    rect,
    preview
  }

  return processedPicture
}

export type SanityBlockProcessHelper = (
  block: SanityPortableBlock
) => Promise<SanityPortableBlock>

// Define handler functions for each block type
const blockHandlers: Record<string, SanityBlockProcessHelper | undefined> = {
  picture: processPictureBlock
  // Add more handlers as needed
}

export async function postProcessContent(
  content: SanityPortableBlock[]
): Promise<SanityPortableBlock[]> {
  // Update document.content with processed blocks
  return Promise.all(
    content.map(async (block) => {
      const handler = blockHandlers[block._type]
      return handler ? handler(block) : block
    })
  )
}

export async function postProcessData(
  initial: QueryResponseInitial<PAGES_QUERYResult>
) {
  const document = initial.data[0]
  const modifiedContent = await postProcessContent(document.content)

  const result = {
    ...initial,
    data: [
      {
        ...document,
        content: modifiedContent
      }
    ]
  }

  return result
}

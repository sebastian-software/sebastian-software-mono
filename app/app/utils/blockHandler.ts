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

// Default values for picture processing is portrait 4:5
export const DEFAULT_ASPECT_RATIO = 0.8
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

export type QueryDefinedPage = NonNullable<PAGES_QUERYResult["page"]>
export type QueryDefinedContent = QueryDefinedPage["content"]
export type QueryDefinedContentTypes = QueryDefinedContent[number]

export async function postProcessContent(content: QueryDefinedContent) {
  return Promise.all(
    content.map(async (block) => {
      const handler = blockHandlers[block._type]
      return handler ? handler(block) : block
    })
  )
}

export type QueryDefinedPicture = Extract<
  QueryDefinedContentTypes,
  { _type: "picture" }
>

export type QueryDefinedNonPicture = Exclude<
  QueryDefinedContentTypes,
  { _type: "picture" }
>

export interface ProcessedPicture extends QueryDefinedPicture {
  // Remove these properties
  width: never
  height: never
  hotspot: never
  crop: never

  // Add these properties
  rect: [number, number, number, number]
  preview: string
}

export type ProcessedContent = Array<QueryDefinedNonPicture | ProcessedPicture>

export type ProcessedPage = Omit<QueryDefinedPage, "content"> & {
  content: Array<QueryDefinedContent | ProcessedPicture>
}

export interface ProcessedData {
  data: {
    page: {
      content: ProcessedContent
      _id: string
      title: string
    }
  }
}

export async function postProcessPage<
  T extends QueryResponseInitial<PAGES_QUERYResult>
>(initial: T): Promise<T | (T & ProcessedData)> {
  const page = initial.data.page
  if (page) {
    const modifiedContent = await postProcessContent(page.content)
    const modifiedPage = {
      ...page,
      content: modifiedContent as ProcessedContent
    }

    const modifiedInitial = {
      ...initial,
      data: {
        ...initial.data,
        page: modifiedPage
      }
    }

    return modifiedInitial
  }

  return initial
}

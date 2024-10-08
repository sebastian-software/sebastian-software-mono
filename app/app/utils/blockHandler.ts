/**
 * This module processes content blocks retrieved from Sanity CMS.
 * It focuses on processing picture blocks by computing the required cropping rectangle
 * and generating preview images, enhancing the data for use in the application.
 */

import type { QueryResponseInitial } from "@sanity/react-loader"
import type {
  PAGES_QUERYResult,
  SanityImageCrop,
  SanityImageHotspot
} from "sanity.types"

import { computeRect, resizeToArea } from "./imageBuilder"
import { fetchToDataUrl } from "./imagePreview"

/**
 * Base interface for all portable blocks.
 */
export interface SanityPortableBlock {
  _type: string
  [key: string]: unknown
}

/**
 * Interface for portable blocks that include a reference ID.
 */
export interface SanityReferenceBlock extends SanityPortableBlock {
  _id: string
}

/**
 * Interface representing an unprocessed picture block from Sanity.
 */
export interface PictureBlock extends SanityReferenceBlock {
  _type: "picture"
  url: string
  width: number
  height: number
  crop?: SanityImageCrop | null
  hotspot?: SanityImageHotspot | null
  alt?: string | null
}

/**
 * Interface representing a processed picture block with computed properties.
 */
export interface ProcessedPictureBlock extends SanityPortableBlock {
  _id: string
  _type: "picture"
  url: string
  alt?: string | null
  rect: [number, number, number, number]
  preview: string
  // 'width', 'height', 'crop', and 'hotspot' are intentionally omitted
}

/**
 * Type guard to determine if a block is a PictureBlock.
 */
function isPictureBlock(block: SanityPortableBlock): block is PictureBlock {
  return (
    block._type === "picture" &&
    typeof block._id === "string" &&
    typeof block.url === "string" &&
    typeof block.width === "number" &&
    typeof block.height === "number"
  )
}

export const DEFAULT_ASPECT_RATIO = 0.8
export const DEFAULT_PREVIEW_SIZE = 100

/**
 * Processes a picture block by computing the required cropping rectangle and generating a preview image.
 */
async function processPictureBlock(
  block: SanityPortableBlock
): Promise<SanityPortableBlock> {
  // Return the block unmodified if it is not a picture block
  if (!isPictureBlock(block)) {
    return block
  }

  const { _id, _type, width, height, crop, hotspot, url, alt } = block

  const aspectRatio = DEFAULT_ASPECT_RATIO
  const previewSize = DEFAULT_PREVIEW_SIZE

  // Compute the cropping rectangle based on the aspect ratio
  const rectValues = computeRect(
    { width, height, crop, hotspot },
    { aspectRatio }
  )

  // Resize the rectangle to match the preview size
  const { targetWidth } = resizeToArea(
    rectValues.width,
    rectValues.height,
    previewSize
  )

  // Format the rectangle as an array
  const rect: ProcessedPictureBlock["rect"] = [
    rectValues.left,
    rectValues.top,
    rectValues.width,
    rectValues.height
  ]

  // Generate a URL for the preview image
  const previewUrl = `${url}?rect=${rect.join(",")}&q=80&w=${targetWidth}&fm=webp&blur=10`

  // Fetch the preview image and convert it to a data URL
  const preview = await fetchToDataUrl(previewUrl)

  // Construct the processed picture block
  const processedPicture: ProcessedPictureBlock = {
    _id,
    _type,
    url,
    alt,
    rect,
    preview
  }

  return processedPicture
}

export type SanityBlockProcessHelper = (
  block: SanityPortableBlock
) => Promise<SanityPortableBlock>

const blockHandlers: Record<string, SanityBlockProcessHelper | undefined> = {
  picture: processPictureBlock
  // Add more handlers as needed
}

export type QueryDefinedPage = NonNullable<PAGES_QUERYResult["page"]>
export type QueryDefinedContent = QueryDefinedPage["content"]
export type QueryDefinedContentTypes = QueryDefinedContent[number]

export type QueryDefinedPicture = Extract<
  QueryDefinedContentTypes,
  { _type: "picture" }
>

export type QueryDefinedNonPicture = Exclude<
  QueryDefinedContentTypes,
  { _type: "picture" }
>

/**
 * Processes an array of content blocks, applying the appropriate handler to each block based on its _type.
 */
export async function postProcessContent(
  content: QueryDefinedContent
): Promise<SanityPortableBlock[]> {
  return Promise.all(
    content.map(async (block) => {
      const handler = blockHandlers[block._type]
      return handler ? handler(block) : block
    })
  )
}

export type ProcessedContent = Array<
  QueryDefinedNonPicture | ProcessedPictureBlock
>

export type ProcessedPage = Omit<QueryDefinedPage, "content"> & {
  content: ProcessedContent
}

export interface ProcessedData {
  data: {
    page: ProcessedPage
  }
}

/**
 * Processes the page content by applying the appropriate handlers to each block.
 */
export async function postProcessPage<
  T extends QueryResponseInitial<PAGES_QUERYResult>
>(initial: T): Promise<T | (T & ProcessedData)> {
  const page = initial.data.page
  if (page) {
    const modifiedContent = await postProcessContent(page.content)
    const modifiedPage: ProcessedPage = {
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

// pictureHandler.ts

import type { SanityImageCrop, SanityImageHotspot } from "sanity.types"

import type { BlockHandler, SanityPortableBlock } from "./blockProcessor"
import { computeRect, resizeToArea } from "./imageBuilder"
import { fetchToDataUrl } from "./imagePreview"

/**
 * Interface representing an unprocessed picture block from Sanity.
 */
export interface PictureBlock extends SanityPortableBlock {
  _type: "picture"
  _id: string
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
  _type: "picture"
  _id: string
  url: string
  alt?: string | null
  rect: [number, number, number, number]
  preview: string
  // 'width', 'height', 'crop', and 'hotspot' are intentionally omitted
}

export const DEFAULT_ASPECT_RATIO = 0.8
export const DEFAULT_PREVIEW_SIZE = 100

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

/**
 * Processes a picture block by computing the required cropping rectangle and generating a preview image.
 */
export const processPictureBlock: BlockHandler = async (block) => {
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

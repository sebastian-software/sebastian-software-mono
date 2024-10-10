// pictureHandler.ts

import type {
  PAGES_QUERYResult,
  SanityImageCrop,
  SanityImageHotspot
} from "sanity.types"

import type { SanityPortableBlock } from "./blockProcessor"
import { computeRect, resizeToArea } from "./imageBuilder"
import { fetchToDataUrl } from "./imagePreview"

/**
 * Interface representing an unprocessed picture block from Sanity.
 */
export type PictureBlock = Extract<
  NonNullable<PAGES_QUERYResult["page"]>["content"][number],
  { _type: "picture" }
>

export type SlidePictureRect = [number, number, number, number]

/**
 * Interface representing a processed picture block with computed properties.
 */
export interface SlicedPictureBlock
  extends Pick<PictureBlock, "_id" | "url" | "alt"> {
  _type: "sliced-picture"
  rect: SlidePictureRect
  preview: string
  // 'width', 'height', 'crop', and 'hotspot' are intentionally omitted
}

export const DEFAULT_ASPECT_RATIO = 0.8
export const DEFAULT_PREVIEW_SIZE = 100

/**
 * Type guard to determine if a block is a PictureBlock.
 */
function isPictureBlock(block: SanityPortableBlock): block is PictureBlock {
  return block._type === "picture"
}

/**
 * Type guard to determine if a block is a ProcessedPictureBlock.
 */
export function isSlicedPictureBlock(
  block: SanityPortableBlock
): block is SlicedPictureBlock {
  return block._type === "sliced-picture"
}

/**
 * Processes a picture block by computing the required cropping rectangle and generating a preview image.
 */
export async function processPictureBlock<T extends SanityPortableBlock>(
  block: T
): Promise<T | SlicedPictureBlock> {
  if (!isPictureBlock(block)) {
    return block
  }

  const { _id, width, height, crop, hotspot, url, alt } = block

  if (width == null || height == null || url == null) {
    throw new Error("Missing width, height or url for picture block!")
  }

  const aspectRatio = DEFAULT_ASPECT_RATIO
  const previewSize = DEFAULT_PREVIEW_SIZE

  // Compute the cropping rectangle based on the aspect ratio
  const { rect, preview } = await slicePicture({
    width,
    height,
    crop,
    hotspot,
    aspectRatio,
    previewSize,
    url
  })

  // Construct the processed picture block
  const processedPicture: SlicedPictureBlock = {
    _id,
    _type: "sliced-picture",
    url,
    alt,
    rect,
    preview
  }

  return processedPicture
}

export interface SlidePictureArgs {
  width: number
  height: number
  crop: SanityImageCrop | null
  hotspot: SanityImageHotspot | null
  aspectRatio: number
  previewSize: number
  url: string
}

async function slicePicture({
  width,
  height,
  crop,
  hotspot,
  aspectRatio,
  previewSize,
  url
}: SlidePictureArgs) {
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
  const rect: SlidePictureRect = [
    rectValues.left,
    rectValues.top,
    rectValues.width,
    rectValues.height
  ]

  // Generate a URL for the preview image
  const previewUrl = `${url}?rect=${rect.join(",")}&q=80&w=${targetWidth}&fm=webp&blur=10`

  // Fetch the preview image and convert it to a data URL
  const preview = await fetchToDataUrl(previewUrl)
  return { rect, preview }
}

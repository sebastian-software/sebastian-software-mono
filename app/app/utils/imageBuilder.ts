import type { SanityImageCrop, SanityImageHotspot } from "sanity.types"

export interface InputParameters {
  width: number
  height: number
  crop?: SanityImageCrop | null // Optional crop
  hotspot?: SanityImageHotspot | null // Optional hotspot
}

export interface Options {
  aspectRatio?: number | null // Optional target aspect ratio
  zoom?: number | null // Optional zoom factor
  debug?: boolean // Optional debug flag to enable/disable console messages
}

interface Context {
  log: (...args: any[]) => void
}

/**
 * Computes the rectangle that contains the hotspot, matches the target aspect ratio,
 * and fits within the cropped image boundaries, optionally maximizing the zoom.
 * @param input - The input parameters including source dimensions, crop, and hotspot.
 * @param options - Additional options including aspect ratio, zoom, and debug flag.
 * @returns The computed rectangle with properties: left, top, width, and height.
 */
export function computeRect(
  input: InputParameters,
  options: Options = {}
): { left: number; top: number; width: number; height: number } {
  const { width: sourceWidth, height: sourceHeight, crop, hotspot } = input
  const { zoom, debug } = options
  // If aspectRatio is not provided, default to source image's aspect ratio
  const aspectRatio = options.aspectRatio ?? sourceWidth / sourceHeight

  // Create a logger function based on the debug flag
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const log = debug ? console.log.bind(console) : () => {}

  // Create a context object to pass the logger function to helper functions
  const context: Context = { log }

  // Step 1: Compute cropped image boundaries
  const croppedBoundaries = computeCroppedBoundaries(
    { width: sourceWidth, height: sourceHeight, crop },
    context
  )

  // Step 2: Compute hotspot in pixels (center-based)
  const hotspotPixels = computeHotspotPixels(
    { width: sourceWidth, height: sourceHeight },
    hotspot,
    context
  )

  // Step 3: Compute the minimal rect that contains the hotspot and matches the aspect ratio
  let rectDimensions = computeMinimalRect(hotspotPixels, aspectRatio, context)

  let effectiveZoom = zoom

  // Step 4: If zoom is not provided, calculate the maximum possible zoom
  effectiveZoom ??= computeMaximumZoom(
    hotspotPixels,
    rectDimensions,
    croppedBoundaries,
    context
  )

  // Step 5: Apply zoom (increase size by zoom factor)
  rectDimensions.width *= effectiveZoom
  rectDimensions.height *= effectiveZoom

  // Step 6: Ensure the rect does not exceed the cropped area dimensions
  rectDimensions = adjustRectSizeToFit(
    rectDimensions,
    aspectRatio,
    croppedBoundaries,
    context
  )

  // Step 7: Center the rect on the hotspot center
  let rectPosition = centerRectOnHotspot(hotspotPixels, rectDimensions, context)

  // Step 8: Adjust position to fit within cropped boundaries
  rectPosition = adjustRectPositionToFit(
    rectPosition,
    rectDimensions,
    croppedBoundaries,
    context
  )

  // Step 9: Round all values to integers
  rectPosition.rectLeft = Math.round(rectPosition.rectLeft)
  rectPosition.rectTop = Math.round(rectPosition.rectTop)
  rectDimensions.width = Math.round(rectDimensions.width)
  rectDimensions.height = Math.round(rectDimensions.height)

  // Debug output
  context.log("Final rect rounded to integers:", {
    rectLeft: rectPosition.rectLeft,
    rectTop: rectPosition.rectTop,
    width: rectDimensions.width,
    height: rectDimensions.height
  })

  return {
    left: rectPosition.rectLeft,
    top: rectPosition.rectTop,
    width: rectDimensions.width,
    height: rectDimensions.height
  }
}

/**
 * Computes the boundaries of the cropped image.
 * @param source - The source image dimensions and optional crop information.
 * @param context - The context containing the logger function.
 * @returns The cropped boundaries and dimensions.
 */
export function computeCroppedBoundaries(
  source: { width: number; height: number; crop?: Crop },
  context: Context
): {
  left: number
  top: number
  right: number
  bottom: number
  width: number
  height: number
} {
  const { width: sourceWidth, height: sourceHeight, crop } = source
  // If crop is undefined, default to no cropping (full image)
  const left = crop?.left ?? 0
  const top = crop?.top ?? 0
  const right = sourceWidth - (crop?.right ?? 0)
  const bottom = sourceHeight - (crop?.bottom ?? 0)
  const width = right - left
  const height = bottom - top

  context.log("Cropped image boundaries:", {
    left,
    top,
    right,
    bottom
  })

  return {
    left,
    top,
    right,
    bottom,
    width,
    height
  }
}

/**
 * Converts the hotspot's percentage coordinates to pixel values relative to the source image.
 * @param source - The source image dimensions.
 * @param hotspot - The optional hotspot area defined as percentage coordinates.
 * @param context - The context containing the logger function.
 * @returns The hotspot's center coordinates and dimensions in pixels.
 */
export function computeHotspotPixels(
  source: { width: number; height: number },
  hotspot: Hotspot | undefined,
  context: Context
): {
  centerX: number
  centerY: number
  width: number
  height: number
} {
  const { width: sourceWidth, height: sourceHeight } = source

  // If hotspot is undefined or missing properties, default to center and reasonable size
  const centerX = (hotspot?.x ?? 0.5) * sourceWidth
  const centerY = (hotspot?.y ?? 0.5) * sourceHeight
  const width = (hotspot?.width ?? 0.1) * sourceWidth // Default width: 10% of source width
  const height = (hotspot?.height ?? 0.1) * sourceHeight // Default height: 10% of source height

  context.log("Hotspot in pixels (center-based):", {
    centerX,
    centerY,
    width,
    height
  })

  return { centerX, centerY, width, height }
}

/**
 * Computes the minimal rectangle that contains the hotspot and matches the aspect ratio.
 * @param hotspotPixels - The hotspot dimensions in pixels.
 * @param aspectRatio - The desired aspect ratio (width / height).
 * @param context - The context containing the logger function.
 * @returns The width and height of the minimal rectangle.
 */
export function computeMinimalRect(
  hotspotPixels: {
    width: number
    height: number
  },
  aspectRatio: number,
  context: Context
): { width: number; height: number } {
  const { width: hotspotWidth, height: hotspotHeight } = hotspotPixels

  let width: number
  let height: number

  // Determine whether to expand width or height to match the aspect ratio
  if (hotspotWidth / aspectRatio >= hotspotHeight) {
    // Expand height to match aspect ratio
    width = hotspotWidth
    height = width / aspectRatio
    context.log("Expanded height to match aspect ratio:", { width, height })
  } else {
    // Expand width to match aspect ratio
    height = hotspotHeight
    width = height * aspectRatio
    context.log("Expanded width to match aspect ratio:", { width, height })
  }

  return { width, height }
}

/**
 * Calculates the maximum possible zoom factor that keeps the rectangle within the cropped boundaries.
 * @param hotspotPixels - The hotspot center coordinates in pixels.
 * @param rectDimensions - The rectangle dimensions before zoom.
 * @param croppedBoundaries - The boundaries of the cropped area.
 * @param context - The context containing the logger function.
 * @returns The maximum zoom factor.
 */
export function computeMaximumZoom(
  hotspotPixels: {
    centerX: number
    centerY: number
  },
  rectDimensions: { width: number; height: number },
  croppedBoundaries: {
    left: number
    top: number
    right: number
    bottom: number
  },
  context: Context
): number {
  const { centerX: hotspotCenterX, centerY: hotspotCenterY } = hotspotPixels
  const { width, height } = rectDimensions
  const {
    left: croppedLeft,
    top: croppedTop,
    right: croppedRight,
    bottom: croppedBottom
  } = croppedBoundaries

  // Handle zero or negative width and height to prevent division by zero
  if (width <= 0 || height <= 0) {
    context.log("Width or height is zero or negative, defaulting zoom to 1", {
      width,
      height
    })
    return 1
  }

  const maxZoomLeft = (hotspotCenterX - croppedLeft) / (width / 2)
  const maxZoomRight = (croppedRight - hotspotCenterX) / (width / 2)
  const maxZoomTop = (hotspotCenterY - croppedTop) / (height / 2)
  const maxZoomBottom = (croppedBottom - hotspotCenterY) / (height / 2)

  context.log("Maximum zoom factors:", {
    maxZoomLeft,
    maxZoomRight,
    maxZoomTop,
    maxZoomBottom
  })

  // Remove Number.MAX_VALUE from the arguments
  let zoom = Math.min(maxZoomLeft, maxZoomRight, maxZoomTop, maxZoomBottom)

  context.log("Calculated maximum zoom:", zoom)

  // Ensure zoom is at least 1 (do not shrink the rectangle)
  zoom = Math.max(zoom, 1)

  context.log("Adjusted zoom (minimum 1):", zoom)

  return zoom
}

/**
 * Adjusts the rectangle's size to ensure it fits within the cropped area, maintaining the aspect ratio.
 * @param rectDimensions - The current rectangle dimensions.
 * @param targetAspectRatio - The desired aspect ratio (width / height).
 * @param croppedBoundaries - The boundaries of the cropped area.
 * @param context - The context containing the logger function.
 * @returns The adjusted rectangle dimensions.
 */
export function adjustRectSizeToFit(
  rectDimensions: { width: number; height: number },
  targetAspectRatio: number,
  croppedBoundaries: { width: number; height: number },
  context: Context
): { width: number; height: number } {
  let { width, height } = rectDimensions
  const { width: maxAvailableWidth, height: maxAvailableHeight } =
    croppedBoundaries

  // Adjust width and height if they exceed the cropped area dimensions
  if (width > maxAvailableWidth) {
    width = maxAvailableWidth
    height = width / targetAspectRatio
    context.log("Adjusted width to max available width:", { width, height })
  }

  if (height > maxAvailableHeight) {
    height = maxAvailableHeight
    width = height * targetAspectRatio
    context.log("Adjusted height to max available height:", { width, height })
  }

  return { width, height }
}

/**
 * Centers the rectangle on the hotspot center.
 * @param hotspotPixels - The hotspot center coordinates.
 * @param rectDimensions - The rectangle dimensions.
 * @param context - The context containing the logger function.
 * @returns The rectangle's top-left position.
 */
export function centerRectOnHotspot(
  hotspotPixels: { centerX: number; centerY: number },
  rectDimensions: { width: number; height: number },
  context: Context
): { rectLeft: number; rectTop: number } {
  const { centerX: hotspotCenterX, centerY: hotspotCenterY } = hotspotPixels
  const { width, height } = rectDimensions

  const rectLeft = hotspotCenterX - width / 2
  const rectTop = hotspotCenterY - height / 2

  context.log("Rect centered on hotspot:", { rectLeft, rectTop, width, height })

  return { rectLeft, rectTop }
}

/**
 * Adjusts the rectangle's position to ensure it stays within the cropped boundaries.
 * @param rectPosition - The current rectangle position.
 * @param rectDimensions - The rectangle dimensions.
 * @param croppedBoundaries - The boundaries of the cropped area.
 * @param context - The context containing the logger function.
 * @returns The adjusted rectangle position.
 */
export function adjustRectPositionToFit(
  rectPosition: { rectLeft: number; rectTop: number },
  rectDimensions: { width: number; height: number },
  croppedBoundaries: {
    left: number
    top: number
    right: number
    bottom: number
  },
  context: Context
): { rectLeft: number; rectTop: number } {
  let { rectLeft, rectTop } = rectPosition
  const { width, height } = rectDimensions
  const {
    left: croppedLeft,
    top: croppedTop,
    right: croppedRight,
    bottom: croppedBottom
  } = croppedBoundaries

  // Adjust rectLeft if it goes beyond the left boundary
  if (rectLeft < croppedLeft) {
    rectLeft = croppedLeft
    context.log("Adjusted rectLeft to croppedLeft:", { rectLeft })
  }

  // Adjust rectLeft if it goes beyond the right boundary
  if (rectLeft + width > croppedRight) {
    rectLeft = croppedRight - width
    context.log("Adjusted rectLeft to fit within croppedRight:", { rectLeft })
  }

  // Adjust rectTop if it goes beyond the top boundary
  if (rectTop < croppedTop) {
    rectTop = croppedTop
    context.log("Adjusted rectTop to croppedTop:", { rectTop })
  }

  // Adjust rectTop if it goes beyond the bottom boundary
  if (rectTop + height > croppedBottom) {
    rectTop = croppedBottom - height
    context.log("Adjusted rectTop to fit within croppedBottom:", { rectTop })
  }

  // Ensure rectLeft and rectTop do not go outside the image boundaries
  rectLeft = Math.max(rectLeft, croppedLeft)
  rectTop = Math.max(rectTop, croppedTop)

  return { rectLeft, rectTop }
}

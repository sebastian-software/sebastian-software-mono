// imageUtils.test.ts

import { describe, expect, it } from "vitest"

import type { Hotspot, Options, SourceImage } from "./imageBuilder"
import {
  adjustRectPositionToFit,
  adjustRectSizeToFit,
  centerRectOnHotspot,
  computeCroppedBoundaries,
  computeHotspotPixels,
  computeMaximumZoom,
  computeMinimalRect,
  computeRect
} from "./imageBuilder"

describe("computeRect", () => {
  it("should compute rect with all parameters provided", () => {
    const source: SourceImage = {
      width: 5000,
      height: 3000,
      crop: {
        left: 100,
        top: 100,
        right: 100,
        bottom: 100
      }
    }

    const hotspot: Hotspot = {
      x: 0.5,
      y: 0.5,
      width: 0.2,
      height: 0.2
    }

    const options: Options = {
      hotspot,
      zoom: 1.2,
      targetAspectRatio: 16 / 9
    }

    const rect = computeRect(source, options)

    expect(rect).toEqual({
      left: expect.any(Number),
      top: expect.any(Number),
      width: expect.any(Number),
      height: expect.any(Number)
    })
  })

  // Additional tests for computeRect as before...
})

describe("computeCroppedBoundaries", () => {
  it("should compute cropped boundaries when crop is provided", () => {
    const source: SourceImage = {
      width: 5000,
      height: 3000,
      crop: {
        left: 100,
        top: 200,
        right: 150,
        bottom: 250
      }
    }
    const context = { log() {} }
    const result = computeCroppedBoundaries(source, context)
    expect(result).toEqual({
      left: 100,
      top: 200,
      right: 4850,
      bottom: 2750,
      width: 4750,
      height: 2550
    })
  })

  it("should compute full boundaries when crop is undefined", () => {
    const source: SourceImage = {
      width: 5000,
      height: 3000
    }
    const context = { log() {} }
    const result = computeCroppedBoundaries(source, context)
    expect(result).toEqual({
      left: 0,
      top: 0,
      right: 5000,
      bottom: 3000,
      width: 5000,
      height: 3000
    })
  })
})

describe("computeHotspotPixels", () => {
  it("should compute hotspot pixels when hotspot is provided", () => {
    const source: SourceImage = {
      width: 4000,
      height: 3000
    }
    const hotspot: Hotspot = {
      x: 0.25,
      y: 0.75,
      width: 0.1,
      height: 0.2
    }
    const context = { log() {} }
    const result = computeHotspotPixels(source, hotspot, context)
    expect(result).toEqual({
      centerX: 1000,
      centerY: 2250,
      width: 400,
      height: 600
    })
  })

  it("should use default hotspot values when hotspot is undefined", () => {
    const source: SourceImage = {
      width: 4000,
      height: 3000
    }
    const context = { log() {} }
    const result = computeHotspotPixels(source, undefined, context)
    expect(result).toEqual({
      centerX: 2000,
      centerY: 1500,
      width: 400,
      height: 300
    })
  })
})

describe("computeMinimalRect", () => {
  it("should expand height to match aspect ratio", () => {
    const hotspotPixels = {
      width: 800,
      height: 600
    }
    const targetAspectRatio = 4 / 3 // Aspect ratio is 1.333...
    const context = { log() {} }
    const result = computeMinimalRect(hotspotPixels, targetAspectRatio, context)
    expect(result.width).toBeCloseTo(800)
    expect(result.height).toBeCloseTo(600)
  })

  it("should expand width to match aspect ratio", () => {
    const hotspotPixels = {
      width: 800,
      height: 900
    }
    const targetAspectRatio = 16 / 9 // Aspect ratio is 1.777...
    const context = { log() {} }
    const result = computeMinimalRect(hotspotPixels, targetAspectRatio, context)
    expect(result.width).toBeCloseTo(1600)
    expect(result.height).toBeCloseTo(900)
  })
})

describe("computeMaximumZoom", () => {
  it("should compute maximum zoom without exceeding boundaries", () => {
    const hotspotPixels = {
      centerX: 2000,
      centerY: 1500
    }
    const rectDimensions = {
      width: 800,
      height: 600
    }
    const croppedBoundaries = {
      left: 0,
      top: 0,
      right: 4000,
      bottom: 3000
    }
    const context = { log() {} }
    const result = computeMaximumZoom(
      hotspotPixels,
      rectDimensions,
      croppedBoundaries,
      context
    )
    expect(result).toBeGreaterThanOrEqual(1)
  })

  it("should handle cases where zoom is infinite due to zero width or height", () => {
    const hotspotPixels = {
      centerX: 2000,
      centerY: 1500
    }
    const rectDimensions = {
      width: 0,
      height: 0
    }
    const croppedBoundaries = {
      left: 0,
      top: 0,
      right: 4000,
      bottom: 3000
    }
    const context = { log() {} }
    const result = computeMaximumZoom(
      hotspotPixels,
      rectDimensions,
      croppedBoundaries,
      context
    )
    expect(result).toEqual(1) // Should default to zoom of 1
  })
})

describe("adjustRectSizeToFit", () => {
  it("should adjust width and height to fit within boundaries", () => {
    const rectDimensions = {
      width: 5000,
      height: 2500
    }
    const targetAspectRatio = 2 // Width should be twice height
    const croppedBoundaries = {
      width: 4000,
      height: 3000
    }
    const context = { log() {} }
    const result = adjustRectSizeToFit(
      rectDimensions,
      targetAspectRatio,
      croppedBoundaries,
      context
    )
    expect(result.width).toEqual(4000)
    expect(result.height).toEqual(2000)
  })

  it("should not adjust if dimensions already fit", () => {
    const rectDimensions = {
      width: 3500,
      height: 1750
    }
    const targetAspectRatio = 2
    const croppedBoundaries = {
      width: 4000,
      height: 3000
    }
    const context = { log() {} }
    const result = adjustRectSizeToFit(
      rectDimensions,
      targetAspectRatio,
      croppedBoundaries,
      context
    )
    expect(result).toEqual(rectDimensions)
  })
})

describe("centerRectOnHotspot", () => {
  it("should center rect on hotspot", () => {
    const hotspotPixels = {
      centerX: 2000,
      centerY: 1500
    }
    const rectDimensions = {
      width: 800,
      height: 600
    }
    const context = { log() {} }
    const result = centerRectOnHotspot(hotspotPixels, rectDimensions, context)
    expect(result.rectLeft).toEqual(1600)
    expect(result.rectTop).toEqual(1200)
  })
})

describe("adjustRectPositionToFit", () => {
  it("should adjust position to fit within boundaries", () => {
    const rectPosition = {
      rectLeft: -100,
      rectTop: -100
    }
    const rectDimensions = {
      width: 2000,
      height: 1500
    }
    const croppedBoundaries = {
      left: 0,
      top: 0,
      right: 4000,
      bottom: 3000
    }
    const context = { log() {} }
    const result = adjustRectPositionToFit(
      rectPosition,
      rectDimensions,
      croppedBoundaries,
      context
    )
    expect(result.rectLeft).toEqual(0)
    expect(result.rectTop).toEqual(0)
  })

  it("should adjust position when rect exceeds right and bottom boundaries", () => {
    const rectPosition = {
      rectLeft: 2500,
      rectTop: 2000
    }
    const rectDimensions = {
      width: 2000,
      height: 1500
    }
    const croppedBoundaries = {
      left: 0,
      top: 0,
      right: 4000,
      bottom: 3000
    }
    const context = { log() {} }
    const result = adjustRectPositionToFit(
      rectPosition,
      rectDimensions,
      croppedBoundaries,
      context
    )
    expect(result.rectLeft).toEqual(2000)
    expect(result.rectTop).toEqual(1500)
  })

  it("should not adjust if position is within boundaries", () => {
    const rectPosition = {
      rectLeft: 1000,
      rectTop: 500
    }
    const rectDimensions = {
      width: 2000,
      height: 1500
    }
    const croppedBoundaries = {
      left: 0,
      top: 0,
      right: 4000,
      bottom: 3000
    }
    const context = { log() {} }
    const result = adjustRectPositionToFit(
      rectPosition,
      rectDimensions,
      croppedBoundaries,
      context
    )
    expect(result).toEqual(rectPosition)
  })
})

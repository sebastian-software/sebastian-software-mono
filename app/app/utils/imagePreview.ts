import { encode } from "blurhash"
import sharp from "sharp"

/**
 * Fetches an image from the given URL and encodes it into a BlurHash string.
 * Assumes the image is in RGB format.
 * @param url - The URL of the image to fetch and encode.
 * @returns A promise that resolves to the BlurHash string of the image.
 */
export async function fetchAsBlurHash(url: string): Promise<string> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`)
  }

  const arrayBuffer = await response.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  // Use sharp to read the image and ensure it has an alpha channel
  const { data, info } = await sharp(buffer)
    .ensureAlpha() // Adds an alpha channel if the image doesn't have one
    .raw()
    .toBuffer({ resolveWithObject: true })

  const { width, height, channels } = info

  // Ensure we have 4 channels (RGBA)
  if (channels !== 4) {
    throw new Error(`Expected 4 channels (RGBA), but got ${channels}`)
  }

  const pixels = new Uint8ClampedArray(data)

  // Encode the image data into a BlurHash string
  const blurHash = encode(pixels, width, height, 4, 3)

  return blurHash
}

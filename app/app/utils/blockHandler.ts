import { SanityImageCrop, SanityImageHotspot } from "sanity.types"
import { computeRect, resizeToArea } from "./imageBuilder"
import { fetchToDataUrl } from "./imagePreview"

interface PictureBlock extends SanityBlock {
  _id: string
  crop: SanityImageCrop | null
  hotspot: SanityImageHotspot | null
  width: number | null
  height: number | null
  url: string | null
  alt: string | null
}

// Modular function to process picture blocks
async function processPictureBlock(block: PictureBlock) {
  const { width, height, crop, hotspot, url, alt } = block
  const output = { aspect: 4 / 5, zoom: undefined, previewSize: 100 }

  if (width && height) {
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
    const rect = [
      rectValues.left,
      rectValues.top,
      rectValues.width,
      rectValues.height
    ]

    // Generate a preview image URL for downloading
    const previewUrl = `${url}?rect=${rect.join(",")}&q=80&w=${targetWidth}&fm=webp&blur=10`
    const preview = await fetchToDataUrl(previewUrl)

    return {
      _type: "picture",
      url,
      alt,
      rect,
      preview
    }
  }

  return block
}

// Define handler functions for each block type
const blockHandlers: Record<
  string,
  (block: SanityBlock) => Promise<SanityBlock>
> = {
  picture: processPictureBlock
  // Add more handlers as needed
}

interface SanityBlock {
  _type: string
}

export function postProcessContent(content: SanityBlock[]) {
  // Update document.content with processed blocks
  return Promise.all(
    content.map((block) => {
      const handler = blockHandlers[block._type]
      return handler ? handler(block) : block
    })
  )
}

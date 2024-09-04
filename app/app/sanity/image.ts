import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types/types"

import { dataset, projectId } from "~/sanity/env"

const builder = imageUrlBuilder({ projectId, dataset })

export function urlFor(source: SanityImageSource | null) {
  return source ? builder.image(source) : null
}

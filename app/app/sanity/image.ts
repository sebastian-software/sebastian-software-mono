import imageUrlBuilder from "@sanity/image-url"

import { dataset, projectId } from "~/sanity/env"

const builder = imageUrlBuilder({ projectId, dataset })

export function urlFor(source: string) {
  return builder.image(source)
}

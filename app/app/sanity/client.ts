import { createClient } from "@sanity/client"

import { dataset, projectId, stegaEnabled, studioUrl } from "./env"

// Do not import this into client-side components unless lazy-loaded
export const client = createClient({
  projectId,
  dataset,
  useCdn: false,
  apiVersion: "2023-03-20",
  stega: {
    enabled: stegaEnabled,
    studioUrl
  }
})

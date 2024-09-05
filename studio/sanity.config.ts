/* eslint-disable @typescript-eslint/naming-convention */
import { assist } from "@sanity/assist"
import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { presentationTool } from "sanity/presentation"
import { structureTool } from "sanity/structure"
import { internationalizedArray } from "sanity-plugin-internationalized-array"

import { schemaTypes } from "./schemas"

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID
export const dataset = process.env.SANITY_STUDIO_DATASET
export const previewUrl =
  process.env.SANITY_STUDIO_PREVIEW_URL ?? "http://localhost:3000"

if (!projectId) {
  throw new Error(
    "The `SANITY_STUDIO_PROJECT_ID` environment variable is missing!"
  )
}

if (!dataset) {
  throw new Error(
    "The `SANITY_STUDIO_DATASET` environment variable is missing!"
  )
}

export default defineConfig({
  name: "default",
  title: "Sebastian Software Homepage",
  projectId,
  dataset,
  plugins: [
    assist({}),
    structureTool(),
    presentationTool({
      previewUrl
    }),
    visionTool(),
    internationalizedArray({
      languages: [
        { id: "de", title: "Deutsch" },
        { id: "en", title: "English" }
      ],
      defaultLanguages: ["de"],
      fieldTypes: ["string", "text"]
    })
    // documentInternationalization({
    //   supportedLanguages: [
    //     { id: "en", title: "English" },
    //     { id: "de", title: "Deutsch" }
    //   ],
    //   schemaTypes: []
    // })
  ],
  schema: {
    types: schemaTypes
  }
})

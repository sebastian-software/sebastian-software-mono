import { assist } from "@sanity/assist"
import { visionTool } from "@sanity/vision"
import { defineConfig } from "sanity"
import { presentationTool } from "sanity/presentation"
import { structureTool } from "sanity/structure"
import { internationalizedArray } from "sanity-plugin-internationalized-array"

import { schemaTypes } from "./schemas"

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: "default",
  title: "Sebastian Software Homepage",
  projectId,
  dataset,
  plugins: [
    assist({}),
    structureTool(),
    presentationTool({
      previewUrl:
        process.env.SANITY_STUDIO_PREVIEW_URL || "http://localhost:3000"
    }),
    visionTool(),
    internationalizedArray({
      languages: [
        { id: "en", title: "English" },
        { id: "de", title: "Deutsch" }
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

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'
import {presentationTool} from 'sanity/presentation'

export const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
export const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'default',
  title: 'Sebastian Software Homepage',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000',
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})

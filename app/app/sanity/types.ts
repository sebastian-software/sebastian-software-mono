import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug, DateDefinition } from '@sanity/types'

export interface TestimonialData {
  _type: 'post'
  _id: string
  slug: Slug
  excerpt?: string
  date: string
  quote: string
}

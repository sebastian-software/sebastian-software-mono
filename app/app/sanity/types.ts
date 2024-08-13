import type { PortableTextBlock } from '@portabletext/types'
import type { ImageAsset, Slug, DateDefinition } from '@sanity/types'

export interface Post {
  _type: 'post'
  _id: string
  _createdAt: string
  title?: string
  slug: Slug
  excerpt?: string
  mainImage?: ImageAsset
  date: DateDefinition
  quote: PortableTextBlock[]
}

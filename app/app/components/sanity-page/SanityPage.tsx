import { PortableText } from "@portabletext/react"

import type { SanityPortableBlock } from "~/utils/blockProcessor"

import { RichText } from "../richtext"
import { SanityPortableImage } from "../sanity-image"

export interface SanityPageProps {
  readonly page?: {
    title: string
    content: SanityPortableBlock[]
  } | null
}

export function SanityPage({ page }: SanityPageProps) {
  if (!page) {
    return null
  }

  return (
    <RichText>
      <h1>{page.title}</h1>

      <PortableText
        value={page.content}
        components={{
          types: {
            "sliced-picture": SanityPortableImage
          }
        }}
      />
    </RichText>
  )
}

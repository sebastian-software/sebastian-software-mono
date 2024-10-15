import { PortableText } from "@portabletext/react"
import { clsx } from "clsx"

import type { SanityPortableBlock } from "~/utils/blockProcessor"

import { RichText } from "../richtext"
import { SanityPortableImage } from "../sanity-image"
import { rootClass, titleClass, visualHideClass } from "./SanityPage.css"

export interface SanityPageProps {
  readonly page?: {
    title: string
    hideTitle: boolean
    content: SanityPortableBlock[]
  } | null
}

export function SanityPage({ page }: SanityPageProps) {
  if (!page) {
    return null
  }

  return (
    <RichText className={rootClass}>
      <h1 className={clsx(titleClass, page.hideTitle && visualHideClass)}>
        {page.title}
      </h1>

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

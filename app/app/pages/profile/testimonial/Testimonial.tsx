import type { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { Image } from "@unpic/react"

import { urlFor } from "~/sanity/image"

import {
  captionClass,
  figureClass,
  imageClass,
  quoteClass,
  rootClass
} from "./Testimonial.css"

// Define an interface for the testimonial props
interface TestimonialBlockProps {
  readonly author: string
  readonly headshot?: SanityImageSource | null
  readonly position?: string | null
  readonly company?: string | null
  readonly text?: string | null
}

// The Testimonial component using a named function and explicit return type
export function TestimonialBlock({
  author,
  headshot,
  position,
  company,
  text
}: TestimonialBlockProps) {
  const headShotImage = urlFor(headshot)?.url()
  return (
    <li className={rootClass}>
      <figure className={figureClass}>
        <Image
          src={headShotImage}
          width={120}
          aspectRatio={1}
          className={imageClass}
        />

        <figcaption className={captionClass}>
          <cite>{author}</cite>
          {position && (
            <>
              <br />
              {position}
            </>
          )}
          {company && (
            <>
              <br />
              {company}
            </>
          )}
        </figcaption>
      </figure>
      <blockquote className={quoteClass}>{text}</blockquote>
    </li>
  )
}

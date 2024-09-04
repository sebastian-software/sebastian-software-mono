import { Image } from "@unpic/react"

import { urlFor } from "~/sanity/image"

import {
  captionClass,
  imageClass,
  quoteClass,
  rootClass
} from "./Testimonial.css"

// Define an interface for the testimonial props
interface TestimonialBlockProps {
  readonly author: string
  readonly headshot?: string | null
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
    <article className={rootClass}>
      {headShotImage && (
        <Image
          src={headShotImage}
          width={80}
          height={80}
          className={imageClass}
        />
      )}
      <blockquote className={quoteClass}>
        <p>{text}</p>
      </blockquote>
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
    </article>
  )
}

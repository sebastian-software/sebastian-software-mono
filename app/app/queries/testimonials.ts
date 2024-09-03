import { defineQuery } from "groq"

export const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial"] | order(date desc){
    _id,
    slug,
    date,
    author->{
      name,
      headshot,
      status
    },
    "position": position[_key == $language][0].value,
    company->{
      name
    }
  }
`)

import { defineQuery } from "groq"

export const TESTIMONIALS_QUERY =
  defineQuery(`*[_type == "testimonial"] | order(date desc){
    _id,
    date,
    consultant->{
      name
    },
    author->{
      name,
      headshot
    },
    "position": position[_key == $language][0].value,
    company->{
      name
    }
  }
`)

export const TESTIMONIAL_QUERY =
  defineQuery(`*[_type == "testimonial" && string::startsWith(_id, $shortId)][0] {
    date,
    consultant->{
      name
    },
    author->{
      name,
      headshot,
    },
    language,
    "quote": quote[_key == $language][0].value,
    "position": position[_key == $language][0].value,
    company->{
      name
    }
  }
`)

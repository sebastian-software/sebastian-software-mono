import groq from 'groq'

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && defined(slug.current)] | order(publishedAt desc){
  _id,
  slug,
  date,
  author->{
    name,
    headshot,
    position,
    company->{
      name
    }
  },
  position,
  company->{
    name
  }
}`
export const TESTIMONIAL_QUERY = groq`*[_type == "testimonial" && slug.current == $slug][0] {
  date,
  quote,
  author->{
    name,
    headshot,
    position,
    company->{
      name
    }
  },
  position,
  company->{
    name
  }

}`

import groq from 'groq'

export const POSTS_QUERY = groq`*[_type == "testimonial" && defined(slug.current)] | order(publishedAt desc){
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
export const POST_QUERY = groq`*[_type == "testimonial" && slug.current == $slug][0]`

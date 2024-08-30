import { defineQuery } from "groq"
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && consultant->name == $name]
  {
    _id,
    "title": title[$language],
    "description": description[_key == $language][0].value,
    contractStart,
    contractEnd,
    consultant->{
      name,
    },
    customer->
    {
      name,
      "city": city[$language],
      country,
      industry,
      logo
    },
    "role": role[$language],
    technologies,
    testimonials[]->
    {
      _id,
      "quote": quote[$language],
      "position": position[$language],
      author->{
        name,
        headshot
      },
      company->{
        name
      }
    }
  } | order(contractStart desc)
`)

import { defineQuery } from "groq"
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project" && consultant->name == $name]
  {
    _id,
    "title": title[_key == $language][0].value,
    "description": description[_key == $language][0].value,
    "role": role[_key == $language][0].value,
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

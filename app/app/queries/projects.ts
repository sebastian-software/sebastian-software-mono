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
    client->
    {
      name,
      city,
      country,
      industry,
      logo
    },
    agent->
    {
      name,
      city,
      country,
      logo
    },
    testimonials[]->
    {
      _id,
      "quote": quote[_key == $language][0].value,
      "position": position[_key == $language][0].value,
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

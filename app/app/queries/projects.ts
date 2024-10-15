import { defineQuery } from "groq"
export const PROJECTS_QUERY = defineQuery(`
  {
    "consultant": *[_type == "consultant" && name == $name][0]
    {
      name,
      headshot->
      {
        _id,
        _type,
        "crop": image.crop,
        "hotspot": image.hotspot,
        "width": image.asset->metadata.dimensions.width,
        "height": image.asset->metadata.dimensions.height,
        "url": image.asset->url,
        "alt": alt[_key == $language][0].value
      }
    },
    "projects": *[_type == "project" && consultant->name == $name]
    {
      _id,
      "title": title[_key == $language][0].value,
      "description": description[_key == $language][0].value,
      "role": role[_key == $language][0].value,
      contractStart,
      contractEnd,
      client->
      {
        name,
        city,
        country,
        industry,
        logo
        {
          "url":asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      },
      agent->
      {
        name,
        city,
        country,
        logo
        {
          "url":asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      },
      testimonials[]->
      {
        _id,
        "quote": quote[_key == $language][0].value,
        "position": position[_key == $language][0].value,
        author->{
          name,
          headshot->
          {
            _id,
            _type,
            "crop": image.crop,
            "hotspot": image.hotspot,
            "width": image.asset->metadata.dimensions.width,
            "height": image.asset->metadata.dimensions.height,
            "url": image.asset->url,
            "alt": alt[_key == $language][0].value
          }
        },
        company->{
          name
        }
      }
    } | order(contractStart desc)
  }
`)

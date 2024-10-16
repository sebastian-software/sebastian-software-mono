import { defineQuery } from "groq"
export const PAGES_QUERY = defineQuery(`
  {
    "page": *[_type == "page" && id == $id && language == $language][0] {
      _id,
      title,
      hideTitle,
      content[] {
        _type == "block" => {
          _key,
          _type,
          children,
          style,
          level,
          listItem,
          markDefs
        },
        _type == "reference" => @->{
          _id,
          _type,
          "crop": image.crop,
          "hotspot": image.hotspot,
          "width": image.asset->metadata.dimensions.width,
          "height": image.asset->metadata.dimensions.height,
          "url": image.asset->url,
          "alt": alt[_key == $language][0].value
        }
      }
    }
  }
`)

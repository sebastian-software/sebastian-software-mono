import { defineQuery } from "groq"
export const PAGES_QUERY = defineQuery(`
  *[_type == "page" && id == $id]
  {
    _id,
    "title": title[_key == $language][0].value,
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
        "size": image.asset->metadata.dimensions,
        "preview": image.asset->metadata.blurHash,
        "url": image.asset->url,
        "alt": alt[_key == $language][0].value
      }
    }
  }
`)

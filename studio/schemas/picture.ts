import { defineField, defineType } from "sanity"

import type { Picture } from "../sanity.types"
import { PREVIEW_LANGUAGE } from "./utils"

export const pictureType = defineType({
  name: "picture",
  title: "Picture",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "alt",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "date",
      type: "date",
      validation: (Rule) => Rule.required()
    })
  ],
  preview: {
    select: {
      title: "alt",
      subtitle: "date",
      media: "image"
    },
    prepare(selection) {
      const title = selection.title as Picture["alt"]

      return {
        ...selection,
        title: title.find((variant) => variant._key === PREVIEW_LANGUAGE)?.value
      }
    }
  }
})

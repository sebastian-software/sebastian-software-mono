import { defineField, defineType } from "sanity"

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
    prepare({ title, subtitle, media }) {
      const translatedTitle = title?.find(
        (variant: { _key: string; value: string }) =>
          variant._key === PREVIEW_LANGUAGE
      )?.value

      return {
        title: translatedTitle,
        subtitle,
        media
      }
    }
  },
  orderings: [
    {
      title: "Alt Description",
      name: "alt",
      by: [{ field: "alt.en", direction: "asc" }]
    }
  ]
})

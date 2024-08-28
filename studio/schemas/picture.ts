import { defineField, defineType } from "sanity"

import { defaultLanguage } from "./localeStringType"

export const pictureType = defineType({
  name: "picture",
  title: "Picture",
  type: "document",
  fields: [
    defineField({
      name: "image",
      type: "image"
    }),

    defineField({
      name: "alt",
      type: "localeString"
    }),

    defineField({
      name: "date",
      type: "date"
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: (doc) => `${doc.date}-${doc.alt[defaultLanguage]}`,
        maxLength: 80
      }
    })
  ],
  preview: {
    select: {
      title: "alt." + defaultLanguage,
      subtitle: "date",
      media: "image"
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

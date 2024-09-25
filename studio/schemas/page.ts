import { defineField, defineType } from "sanity"

export const pageType = defineType({
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "id",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "title",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Quote", value: "blockquote" }
          ]
        },
        { type: "reference", to: [{ type: "picture" }] }
      ],

      validation: (Rule) => Rule.required()
    })
  ]
})

import { defineField, defineType } from "sanity"

export const consultantType = defineType({
  name: "consultant",
  title: "Consultant",
  type: "document",
  fields: [
    defineField({
      name: "headshot",
      type: "image",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "birthday",
      type: "date",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "address",
      type: "reference",
      to: [{ type: "address" }]
    })
  ]
})

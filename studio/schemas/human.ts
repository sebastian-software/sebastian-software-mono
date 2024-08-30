import { defineField, defineType } from "sanity"

export const humanType = defineType({
  name: "human",
  title: "Human",
  type: "document",
  fields: [
    defineField({
      name: "headshot",
      type: "image"
    }),

    defineField({
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { title: "Freelancer", value: "freelancer" },
          { title: "Business Owner", value: "owner" },
          { title: "Employee", value: "employee" }
        ]
      }
    }),

    defineField({
      name: "position",
      type: "localeString"
    }),

    defineField({
      name: "company",
      type: "reference",
      to: [{ type: "company" }]
    })
  ]
})

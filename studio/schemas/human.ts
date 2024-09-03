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
        ],
        layout: "radio"
      }
    }),

    defineField({
      name: "position",
      description: "Last known position",
      type: "internationalizedArrayString"
    }),

    defineField({
      name: "company",
      description: "Last known company",
      type: "reference",
      to: [{ type: "company" }]
    })
  ]
})

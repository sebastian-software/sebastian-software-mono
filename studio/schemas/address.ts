import { defineField, defineType } from "sanity"

export const addressType = defineType({
  name: "address",
  title: "Address",
  type: "document",
  groups: [
    {
      name: "core",
      title: "Core Information",
      default: true
    },
    {
      name: "postal",
      title: "Postal Information"
    }
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: "core",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "street",
      type: "string",
      group: "postal"
    }),

    defineField({
      name: "houseNumber",
      type: "string",
      group: "postal"
    }),

    defineField({
      name: "zipCode",
      type: "number",
      group: "postal"
    }),

    defineField({
      name: "city",
      type: "string",
      group: "core",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "country",
      type: "string",
      group: "core",
      validation: (Rule) => Rule.required(),
      initialValue: "Germany",
      options: {
        list: [
          "Germany",
          "Switzerland",
          "Austria",
          "Luxembourg",
          "France",
          "Netherlands",
          "Belgium"
        ]
      }
    })
  ]
})

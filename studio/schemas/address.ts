import { defineField, defineType } from "sanity"

export const addressType = defineType({
  name: "address",
  title: "Address",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string"
    }),

    defineField({
      name: "street",
      type: "string"
    }),

    defineField({
      name: "houseNumber",
      type: "string"
    }),

    defineField({
      name: "zipCode",
      type: "number"
    }),

    defineField({
      name: "city",
      type: "string"
    }),

    defineField({
      name: "country",
      type: "string"
    })
  ]
})

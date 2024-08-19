import { defineField, defineType } from "sanity"

export const companyType = defineType({
  name: "company",
  title: "Company",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      type: "image"
    }),

    defineField({
      name: "name",
      type: "string"
    }),

    defineField({
      name: "city",
      type: "localeString",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "country",
      type: "string",
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
    }),

    defineField({
      name: "industry",
      type: "string"
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name"
      }
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "address.city",
      media: "logo"
    }
  }
})

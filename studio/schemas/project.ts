import { defineField, defineType } from "sanity"

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "consultant",
      type: "reference",
      to: [{ type: "consultant" }],
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "title",
      type: "localeString",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "role",
      type: "localeString",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "customer",
      type: "reference",
      to: [{ type: "company" }],
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "slug",
      type: "localeString",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "contractStart",
      type: "date",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "contractEnd",
      type: "date",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "description",
      type: "internationalizedArrayText",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }]
    })
  ],
  preview: {
    select: {
      title: "title.de",
      subtitle: "customer.name",
      media: "customer.logo"
    }
  },
  orderings: [
    {
      title: "Customer",
      name: "customer",
      by: [{ field: "customer.name", direction: "asc" }]
    }
  ]
})

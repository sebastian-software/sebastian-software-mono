import { defineField, defineType } from "sanity"

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "consultant",
      type: "reference",
      to: [{ type: "consultant" }]
    }),

    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true
    }),

    defineField({
      name: "title",
      type: "string"
    }),

    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title"
      }
    }),

    defineField({
      name: "role",
      type: "string"
    }),

    defineField({
      name: "customer",
      type: "reference",
      to: [{ type: "company" }]
    }),

    defineField({
      name: "contractStart",
      type: "date"
    }),

    defineField({
      name: "contractEnd",
      type: "date"
    }),

    defineField({
      name: "description",
      type: "array",
      of: [{ type: "block" }]
    }),

    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "string" }]
    }),

    defineField({
      name: "testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }]
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "customer.name"
    }
  }
})

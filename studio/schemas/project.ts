import { defineField, defineType } from "sanity"

import { PREVIEW_LANGUAGE } from "./utils"

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
      name: "customer",
      type: "reference",
      to: [{ type: "company" }],
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "title",
      type: "internationalizedArrayString",
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
      name: "role",
      type: "internationalizedArrayString",
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
      title: `title`,
      subtitle: "customer.name",
      media: "customer.logo"
    },
    prepare({ title, subtitle, media }) {
      const translatedTitle = title?.find(
        (variant: { _key: string; value: string }) =>
          variant._key === PREVIEW_LANGUAGE
      )?.value

      return {
        title: translatedTitle,
        subtitle,
        media
      }
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

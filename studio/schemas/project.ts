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
      name: "client",
      type: "reference",
      to: [{ type: "company" }],
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "agent",
      type: "reference",
      to: [{ type: "company" }]
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
      subtitle: "client.name",
      media: "client.logo"
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
      title: "Client",
      name: "client",
      by: [{ field: "client.name", direction: "asc" }]
    }
  ]
})

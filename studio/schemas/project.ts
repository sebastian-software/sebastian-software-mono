import { defineField, defineType } from "sanity"

import type { Project } from "../sanity.types"
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
    prepare(selection) {
      const title = selection.title as Project["title"]

      return {
        ...selection,
        title: title.find((variant) => variant._key === PREVIEW_LANGUAGE)?.value
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

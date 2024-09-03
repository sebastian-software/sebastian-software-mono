import type { SanityDocument } from "sanity"
import { defineField, defineType } from "sanity"

function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, "0")
  const day = String(today.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

const clientOptions = { apiVersion: getCurrentDate() }

// Minimal type definition for a testimonial document
// for correctly supporting the custom `source` function
interface TestimonialDoc extends SanityDocument {
  date?: string

  author?: {
    _ref: string
  }

  consultant?: {
    _ref: string
  }
}

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "consultant",
      type: "reference",
      to: [{ type: "consultant" }],
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "date",
      type: "date",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "human" }],
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "position",
      type: "internationalizedArrayString"
    }),

    defineField({
      name: "company",
      type: "reference",
      to: [{ type: "company" }]
    }),

    defineField({
      name: "quoteLanguage",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Deutsch", value: "de" }
        ]
      }
    }),

    defineField({
      name: "source",
      type: "string",
      options: {
        list: [
          { title: "LinkedIn", value: "linkedin" },
          { title: "Xing", value: "xing" },
          { title: "Email", value: "email" },
          { title: "Other", value: "other" }
        ]
      }
    }),

    defineField({
      name: "quote",
      type: "internationalizedArrayText"
    })
  ],
  preview: {
    select: {
      title: "author.name",
      subtitle: "company.name",
      media: "author.headshot"
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.subtitle || "-",
        media: selection.media
      }
    }
  },
  orderings: [
    {
      title: "Author",
      name: "author",
      by: [{ field: "author.name", direction: "asc" }]
    },
    {
      title: "Date (oldest)",
      name: "date-asc",
      by: [{ field: "date", direction: "asc" }]
    },
    {
      title: "Date (newest)",
      name: "date-desc",
      by: [{ field: "date", direction: "desc" }]
    }
  ]
})

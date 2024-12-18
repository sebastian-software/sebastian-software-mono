import { defineField, defineType } from "sanity"

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
      description: "The position the author holds at the time of the quote.",
      type: "internationalizedArrayString"
    }),

    defineField({
      name: "company",
      type: "reference",
      description:
        "The company the author worked for at the time of the quote.",
      to: [{ type: "company" }]
    }),

    defineField({
      name: "quoteLanguage",
      type: "string",
      description: "The original language of the quote",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "English", value: "en" },
          { title: "Deutsch", value: "de" }
        ],
        layout: "radio"
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
        ],
        layout: "radio"
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
      const subtitle = selection.subtitle as string
      return {
        ...selection,
        subtitle: subtitle || "-"
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

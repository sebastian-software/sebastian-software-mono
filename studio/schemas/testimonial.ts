import { defineField, defineType, SanityDocument } from "sanity"

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
  author?: {
    _ref: string
  }
}

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "language",
      type: "string",
      readOnly: true,
      hidden: true
    }),

    defineField({
      name: "consultant",
      type: "reference",
      to: [{ type: "consultant" }]
    }),

    defineField({
      name: "date",
      type: "date"
    }),

    defineField({
      name: "author",
      type: "reference",
      to: [{ type: "human" }]
    }),

    defineField({
      name: "position",
      type: "localeString"
    }),

    defineField({
      name: "company",
      type: "reference",
      to: [{ type: "company" }]
    }),

    defineField({
      name: "quoteLanguage",
      type: "string",
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
          { title: "Email", value: "email" },
          { title: "Other", value: "other" }
        ]
      }
    }),

    defineField({
      name: "quote",
      type: "localeText"
    }),

    defineField({
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: async (doc: TestimonialDoc, context) => {
          const client = context.getClient(clientOptions)

          if (!doc.date) {
            throw new Error("Date is missing")
          }

          const authorId = doc.author?._ref
          const consultantId = doc.consultant?._ref

          if (!authorId) {
            throw new Error("Author reference is missing")
          }

          if (!consultantId) {
            throw new Error("Consultant reference is missing")
          }

          // Fetch the referenced author document
          const author = await client.fetch(`*[_id == $id][0]`, {
            id: authorId
          })

          if (!author) {
            throw new Error("Referenced author not found")
          }

          // Fetch the referenced author document
          const consultant = await client.fetch(`*[_id == $id][0]`, {
            id: consultantId
          })

          if (!consultant) {
            throw new Error("Referenced consultant not found")
          }

          // Combine title, author and consultant name to create a unique slug
          return `${author.name}-${doc.date}-${consultant.name}`
        }
      }
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
  }
})

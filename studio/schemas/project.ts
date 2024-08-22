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
interface ProjectDoc extends SanityDocument {
  title?: string

  customer?: {
    _ref: string
  }
}

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
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        maxLength: 80,
        source: async (doc: ProjectDoc, context) => {
          const client = context.getClient(clientOptions)

          const customerId = doc.customer?._ref

          if (!customerId) {
            throw new Error("Author reference is missing")
          }

          // Fetch the referenced customer document
          const customer = await client.fetch(`*[_id == $id][0]`, {
            id: customerId
          })

          if (!customer) {
            throw new Error("Referenced customer not found")
          }

          // Combine title, author and consultant name to create a unique slug
          return `${customer.name}-${doc.title}`
        }
      }
    }),

    defineField({
      name: "role",
      type: "localeString",
      validation: (Rule) => Rule.required()
    }),

    defineField({
      name: "customer",
      type: "reference",
      to: [{ type: "company" }]
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
      type: "localeText",
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
      title: "title",
      subtitle: "customer.name",
      media: "customer.logo"
    }
  }
})

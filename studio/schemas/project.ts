import type { SanityDocument } from "sanity"
import { defineField, defineType } from "sanity"

import { clientOptions } from "./utils"

// Minimal type definition for a testimonial document
// for correctly supporting the custom `source` function
interface ProjectDocument extends SanityDocument {
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
      to: [{ type: "company" }]
    }),

    defineField({
      name: "slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        maxLength: 80,
        async source(document: ProjectDocument, context) {
          const client = context.getClient(clientOptions)

          const customerId = document.customer?._ref

          if (!customerId) {
            throw new Error("Customer reference is missing")
          }

          // Fetch the referenced customer document
          const customer = await client.fetch(`*[_id == $id][0]`, {
            id: customerId
          })

          if (!customer) {
            throw new Error("Referenced customer not found")
          }

          // Combine title, author and consultant name to create a unique slug
          return `${customer.slug.current}-${document.title.en}`
        }
      }
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
      title: "title.de",
      subtitle: "customer.name",
      media: "customer.logo"
    }
  }
})

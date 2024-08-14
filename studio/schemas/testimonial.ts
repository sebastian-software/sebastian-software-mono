import { defineField, defineType, SanityDocument } from 'sanity'

function getCurrentDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
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
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),

    defineField({
      name: 'consultant',
      type: 'reference',
      to: [{ type: 'consultant' }],
    }),

    defineField({
      name: 'project',
      type: 'reference',
      to: [{ type: 'project' }],
    }),

    defineField({
      name: 'quote',
      type: 'text',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: async (doc: TestimonialDoc, context) => {
          const authorId = doc.author?._ref

          if (!authorId) {
            throw new Error('Author reference is missing')
          }

          // Fetch the referenced author document
          const client = context.getClient(clientOptions)
          const author = await client.fetch(`*[_id == $id][0]`, {
            id: authorId,
          })

          if (!author) {
            throw new Error('Referenced author not found')
          }

          // Combine title and author name to create a unique slug
          return `${author.name}-${doc.date}-${doc.language}`
        },
      },
    }),

    defineField({
      name: 'date',
      type: 'date',
    }),

    defineField({
      name: 'author',
      type: 'reference',
      to: [{ type: 'human' }],
    }),

    defineField({
      name: 'position',
      type: 'string',
    }),

    defineField({
      name: 'company',
      type: 'reference',
      to: [{ type: 'company' }],
    }),
  ],
  preview: {
    select: {
      title: 'author.name',
      subtitle: 'company.name',
      media: 'author.headshot',
      language: 'language',
    },
    prepare(selection) {
      return {
        title: `${selection.title} ${selection.language ? `(${selection.language})` : ''}`,
        subtitle: selection.subtitle,
        media: selection.media,
      }
    },
  },
})

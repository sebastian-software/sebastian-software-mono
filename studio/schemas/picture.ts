import { defineField, defineType } from 'sanity'

export const pictureType = defineType({
  name: 'picture',
  title: 'Picture',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      type: 'image',
    }),

    defineField({
      name: 'alt',
      type: 'string',
    }),

    defineField({
      name: 'date',
      type: 'date',
    }),

    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.alt} - ${doc.date}`,
      },
    }),
  ],
  preview: {
    select: {
      title: 'alt',
      subtitle: 'date',
      media: 'image',
    },
  },
})

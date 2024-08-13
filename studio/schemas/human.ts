import {defineField, defineType} from 'sanity'

export const humanType = defineType({
  name: 'human',
  title: 'Human',
  type: 'document',
  fields: [
    defineField({
      name: 'headshot',
      type: 'image',
    }),

    defineField({
      name: 'name',
      type: 'string',
    }),

    defineField({
      name: 'position',
      type: 'string',
    }),

    defineField({
      name: 'company',
      type: 'reference',
      to: [{type: 'company'}],
    }),
  ],
})

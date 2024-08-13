import {defineField, defineType} from 'sanity'

export const consultantType = defineType({
  name: 'consultant',
  title: 'Consultant',
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
      name: 'birthday',
      type: 'date',
    }),

    defineField({
      name: 'address',
      type: 'reference',
      to: [{type: 'address'}],
    }),
  ],
})

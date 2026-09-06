import {defineField, defineType} from 'sanity'

export const categoryType = defineType({
  name: 'category',
  title: 'Категории',
  type: 'document',

  fields: [
    defineField({
      name: 'title',
      title: 'Название',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
    }),
  ],
})
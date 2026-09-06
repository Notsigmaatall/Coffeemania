import {defineField, defineType} from 'sanity'

export const dishType = defineType({
  name: 'dish',
  title: 'Блюда',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Название',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),
    
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'reference',
      to: [{type: 'category'}],
    }),

    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      description: 'Чем меньше число, тем выше блюдо в списке',
    }),

    defineField({
      name: 'price',
      title: 'Цена',
      type: 'number',
      validation: (rule) => rule.required().min(0),
    }),

    defineField({
      name: 'image',
      title: 'Фотография',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'available',
      title: 'Доступно',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
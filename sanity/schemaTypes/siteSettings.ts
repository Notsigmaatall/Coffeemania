import {defineField, defineType} from 'sanity'

export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Настройки кафе',
  type: 'document',

  fields: [
    defineField({
      name: 'name',
      title: 'Название кафе',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
    }),

    defineField({
      name: 'heroImage',
      title: 'Главное фото',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'logo',
      title: 'Логотип',
      type: 'image',
    }),

    defineField({
      name: 'address',
      title: 'Адрес',
      type: 'string',
    }),

    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
    }),

    defineField({
      name: 'workingHours',
      title: 'Режим работы',
      type: 'string',
      description: 'Например: Ежедневно, 08:00–22:00',
    }),

    defineField({
        name: 'mapUrl',
        title: 'Ссылка на карту',
        type: 'url',
        description: 'Например, ссылка на Яндекс Карты или Google Maps',
      }),
      
      defineField({
        name: 'telegramUrl',
        title: 'Telegram',
        type: 'url',
        description: 'Ссылка на Telegram заведения',
      }),
      
      defineField({
        name: 'socialUrl',
        title: 'Соцсеть / сайт',
        type: 'url',
        description: 'Например, VK или другая страница',
      }),

      defineField({
        name: 'aboutTitle',
        title: 'Заголовок блока «О нас»',
        type: 'string',
        initialValue: 'О нас',
      }),
      
      defineField({
        name: 'aboutText',
        title: 'Текст «О нас»',
        type: 'text',
      }),
      
      defineField({
        name: 'aboutImage',
        title: 'Фото для блока «О нас»',
        type: 'image',
        options: {
          hotspot: true,
        },
      }),

  ],
})
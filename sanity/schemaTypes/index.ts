import {dishType} from './dish'
import {categoryType} from './category'
import {siteSettingsType} from './siteSettings'

export const schema = {
  types: [
    siteSettingsType,
    categoryType,
    dishType,
  ],
}
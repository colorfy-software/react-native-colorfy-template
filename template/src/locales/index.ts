import * as RNLocalize from 'react-native-localize'
import I18n from 'i18n-js'

import en from './en.json'

I18n.translations = { en }
I18n.fallbacks = false

const fallback = { languageTag: 'en', isRTL: false }
const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(I18n.translations)) ||
  fallback

I18n.locale = languageTag

export const currentLocale = I18n.currentLocale()
export const getLocalizedString = (value: string) => I18n.t(value)
export const getLocalizedStringWithParam = (name: string, value: string) =>
  I18n.t(name, { value })
export const getLocalizedStringWithParams = (name: string, values: object) =>
  I18n.t(name, { ...values })

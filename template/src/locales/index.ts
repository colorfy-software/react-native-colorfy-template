import * as RNLocalize from 'react-native-localize'
import I18n from 'i18n-js'

import en from './en.json'
import de from './de.json'

I18n.translations = { en, de }
I18n.fallbacks = false

const fallback = { languageTag: 'en', isRTL: false }
const { languageTag } =
  RNLocalize.findBestAvailableLanguage(Object.keys(I18n.translations)) ||
  fallback

I18n.locale = languageTag

export const currentLocale = I18n.currentLocale()
export const getLocalizedString = (value: string): string => I18n.t(value)
export const getLocalizedStringWithParam = (
  name: string,
  value: string,
): string => I18n.t(name, { value })
export const getLocalizedStringWithParams = (
  name: string,
  values: Record<string, unknown>,
): string => I18n.t(name, { ...values })

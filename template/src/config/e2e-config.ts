/**
 * NOTE: GENERATED CODE -- DO NOT EDIT!
 */

import en from '../locales/en.json'
import de from '../locales/de.json'

const translations = { en, de }

const E2E_CONFIG = {
  /**
   * Boolean that indicates if the app is running Detox and
   * therefore should use the mocked version of the code when
   * it exists.
   */
  IS_MOCKING_ENABLED: false,
  /**
   * Name of the only test files to run.
   * Only meant for debugging, run all test cases by default.
   * @example ['login']
   * @default undefined
   */
  RUN_ONLY: undefined,
}

export const getE2EString = <Locale extends keyof typeof translations>(
  locale: Locale,
  fn: (strings: typeof translations[Locale]) => string | string[],
): string => {
  const item = fn(translations[locale])
  let variable = null
  let string = ''

  if (typeof item === 'object') {
    string = item[0]
    variable = item[1]
  } else string = item

  return string.replace(/({{|@@)(.+?)(@@|}})/g, variable ?? '__NO VARIABLE ARGUMENT PROVIDED__').replace(/\*/g, '')
}

export default E2E_CONFIG

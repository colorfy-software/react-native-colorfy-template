import { getLocalizedString, getLocalizedStringWithParam } from '../locales'

/**
 * Checks if string has any length. Trims for empty spaces.
 * If isLengthy returns false, otherwise returns error message.
 * This is mainly used with useForm hook to provide form validation
 * @param str -`{ string }`— Pass the string you want to test.
 */
export const isLengthy = (str: string): false | string => {
  if (str?.trim?.()?.length) return false

  return getLocalizedString('errors.requiredField')
}

/**
 * Checks if a string is a valid email. Returns false if valid, and error if not.
 * @param email -`{ string }`—  Pass the string you want to test for.
 */
export const isValidEmail = (email: string): false | string => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  const isEmail = re.test(email)

  if (isEmail) return false

  return getLocalizedStringWithParam('errors.invalidEmail', email)
}

/**
 * Checks if a string is a valid password. Returns false if valid, and error if not.
 * @param password - `{ string }`— Pass the string you want to test for.
 */
export const isValidPassword = (password: string): false | string => {
  const isThirtyOrLonger = password?.length >= 30

  if (isThirtyOrLonger) return getLocalizedString('errors.passwordTooLong')

  const re = /^(?=.{8,})((?=.*[^a-zA-Z\s])(?=.*[a-z])(?=.*[A-Z])|(?=.*[^a-zA-Z0-9\s])(?=.*\d)(?=.*[a-zA-Z])).*$/

  const isPassword = re.test(password)

  if (isPassword) return false

  return getLocalizedString('chatbot.passwordRules')
}

export function isString(value: unknown): boolean {
  return typeof value === 'string'
}

export function isNumber(value: unknown): boolean {
  return typeof value === 'number'
}

export function isObject(value: unknown): boolean {
  return typeof value === 'object' && value !== null
}

export function isFunction(value: unknown): boolean {
  return !!(value && {}.toString.call(value) === '[object Function]')
}

export function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean'
}

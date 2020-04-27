import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

/**
 * @description `boolean` - Is device an iPhone X, XS, XR, 11 or 11 Pro
 */
export const hasNotch =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (width > 800 || height > 800)

/**
 * @description iPhoneX's bottom indicator zone height
 * @constant 83
 */
export const indicatorHeight = hasNotch ? 83 : 0

/**
 * @description iPhoneX's bottom indicator zone padding
 * @constant 34
 */
export const indicatorPadding = hasNotch ? 34 : 0

/**
 * @description Device's status bar height
 */
export const statusBarHeight =
  Platform.OS === 'android' ? 0 : hasNotch ? 44 : 24

/**
 * @description iPhoneX's status bar padding
 * @constant 24
 */
export const statusBarPadding = hasNotch ? 24 : 0

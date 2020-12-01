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
const indicatorHeight = hasNotch ? 83 : 0

/**
 * @description iPhoneX's bottom indicator zone padding
 * @constant 34
 */
const indicatorPadding = hasNotch ? 34 : 0

/**
 * @description Device's status bar height
 */
const statusBarHeight = Platform.OS === 'android' ? 0 : hasNotch ? 44 : 24

/**
 * @description iPhoneX's status bar padding
 * @constant 24
 */
const statusBarPadding = hasNotch ? 24 : 0

export default {
  /**
   * @description iPhoneX's bottom indicator zone height
   * @constant 83
   */
  indicatorHeight,
  /**
   * @description iPhoneX's bottom indicator zone padding
   * @constant 34
   */
  indicatorPadding,
  /**
   * @description Device's status bar height
   */
  statusBarHeight,
  /**
   * @description iPhoneX's status bar padding
   * @constant 24
   */
  statusBarPadding,
}

import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

/**
 * `boolean` - Is device an iPhone X, XS, XR, 11 or 11 Pro
 */
export const hasNotch =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (width > 800 || height > 800)

/**
 * iPhoneX's bottom indicator zone height
 * @constant 83
 */
const indicatorHeight = hasNotch ? 83 : 0

/**
 * iPhoneX's bottom indicator zone padding
 * @constant 34
 */
const indicatorPadding = hasNotch ? 34 : 0

/**
 * Device's status bar height
 */
const statusBarHeight = Platform.OS === 'android' ? 0 : hasNotch ? 44 : 24

/**
 * iPhoneX's status bar padding
 * @constant 24
 */
const statusBarPadding = hasNotch ? 24 : 0

export default {
  /**
   * Is device an iPhone X, XS, XR, 11 or 11 Pro
   * @returns boolean
   */
  hasNotch,
  /**
   * iPhoneX's bottom indicator zone height
   * @constant 83
   */
  indicatorHeight,
  /**
   * iPhoneX's bottom indicator zone padding
   * @constant 34
   */
  indicatorPadding,
  /**
   * Device's status bar height
   */
  statusBarHeight,
  /**
   * iPhoneX's status bar padding
   * @constant 24
   */
  statusBarPadding,
}

import { Dimensions, Platform } from 'react-native'

type StyleSheet = {
  [key: string]:
    | {
        [key: string]: string | number
      }
    | string
    | number
}
type Breakpoints = Partial<
  {
    [key in 'maxHeight' | 'minHeight' | 'maxWidth' | 'minWidth']: number
  }
>
type Input = StyleSheet
type Output = StyleSheet

// iPhone X
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const { width: ww, height: wh } = Dimensions.get('window')
const [shortDimension, longDimension] = ww < wh ? [ww, wh] : [wh, ww]

const hasNotch =
  Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  (ww > 800 || wh > 800)
const indicatorHeight = hasNotch ? 83 : 0
const indicatorPadding = hasNotch ? 34 : 0
const statusBarHeight = Platform.OS === 'android' ? 0 : hasNotch ? 44 : 24
const statusBarPadding = hasNotch ? 24 : 0

const mq = (breakpoints: Breakpoints, input: Input): Output => {
  const { minWidth, maxWidth, minHeight, maxHeight } = breakpoints
  const minWidthCondition = minWidth ? ww > minWidth : true
  const maxWidthCondition = maxWidth ? ww < maxWidth : true
  const minHeightCondition = minHeight ? wh > minHeight : true
  const maxHeightCondition = maxHeight ? wh < maxHeight : true
  return minWidthCondition &&
    maxWidthCondition &&
    minHeightCondition &&
    maxHeightCondition
    ? input
    : {}
}

const vw = (percentage: number): number => (percentage / 100) * ww

const vh = (percentage: number): number => (percentage / 100) * wh

export const screen = {
  /**
   * @description `boolean` - Is device an iPhone with notch
   */
  hasNotch,
  /**
   * Media queries based on screen size
   */
  mq,
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
   * @description Is device an Android phone with a width <= 360
   */
  isSmallAndroid:
    Platform.OS === 'android' && Dimensions.get('window').width <= 360,
  /**
   * @description Is device screen "small" (by 2020 standards).
   * Also includes non-notch Plus size iPhones.
   */
  isSmall: ww <= 375 || (ww <= 414 && !hasNotch),
  /**
   * @description Device's status bar height
   */
  statusBarHeight,
  /**
   * @description iPhoneX's status bar padding
   * @constant 24
   */
  statusBarPadding,
  /**
   * @param { number } percentage - Desired percentage of the screen (from 0 to 100)
   * @returns Screen's width corresponding to the percentage asked
   */
  vh,
  /**
   * @param { number } percentage - Desired percentage of the screen (from 0 to 100)
   * @returns Screen's height corresponding to the percentage asked
   */
  vw,
  /**
   * @param value - value to be interpolated
   * @returns On scale of 0-1 width of the screen value given represents
   */
  width: (value: number): number => value * ww,
  /**
   * @param value - value to be interpolated
   * @returns On scale of 0-1 height of the screen value given represents
   */
  height: (value: number): number => value * wh,
  /**
   * @description Scales width from base size to screen size.
   * @param width - width to be scaled
   * @returns Will return a linear scaled result of the provided width, based on your device's screen width
   */
  horizontalScale: (width: number) =>
    (shortDimension / guidelineBaseWidth) * width,
  /**
   * @description Scales height from base size to screen size.
   * @param height - height to be scaled
   * @returns Will return a linear scaled result of the provided height, based on your device's screen height
   */
  verticalScale: (height: number) =>
    (longDimension / guidelineBaseHeight) * height,
} as const

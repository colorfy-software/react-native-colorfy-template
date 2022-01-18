import { Dimensions, Platform, NativeModules, StatusBar } from 'react-native'

type StyleSheet = {
  [key: string]:
    | {
        [key: string]: string | number
      }
    | string
    | number
}
type Breakpoints = Partial<{
  [key in 'maxHeight' | 'minHeight' | 'maxWidth' | 'minWidth']: number
}>
type Input = StyleSheet
type Output = StyleSheet

// iPhone X
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

const navBarHeight = Dimensions.get('screen').height - windowHeight
const hasVisibleNavigationKeys = Boolean(NativeModules.NavigationBar?.defaultHeight)
const hasNotch =
  Platform.OS === 'ios' && !Platform.isPad && !Platform.isTVOS && (windowWidth > 800 || windowHeight > 800)
const indicatorHeight = hasNotch ? 83 : 0
const indicatorPadding = hasNotch ? 34 : 0
const statusBarHeight = Platform.OS === 'android' ? 0 : hasNotch ? 44 : 24
const statusBarPadding = hasNotch ? 24 : 0

const mq = (breakpoints: Breakpoints, input: Input): Output => {
  const { minWidth, maxWidth, minHeight, maxHeight } = breakpoints
  const minWidthCondition = minWidth ? windowWidth > minWidth : true
  const maxWidthCondition = maxWidth ? windowWidth < maxWidth : true
  const minHeightCondition = minHeight ? windowHeight > minHeight : true
  const maxHeightCondition = maxHeight ? windowHeight < maxHeight : true
  return minWidthCondition && maxWidthCondition && minHeightCondition && maxHeightCondition ? input : {}
}

const vw = (percentage: number): number => (percentage / 100) * windowWidth

const vh = (percentage: number): number => (percentage / 100) * windowHeight

export const deviceStyles = {
  /**
   * Is device an iPhone with notch
   * @returns boolean
   */
  hasNotch,
  /**
   * Media queries based on screen size
   */
  mq,
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
   * Is device an Android phone with a width <= 360
   * @returns boolean
   */
  isSmallAndroid: Platform.OS === 'android' && Dimensions.get('window').width <= 360,
  /**
   * Is device screen "small" (by 2020 standards).
   * Also includes non-notch Plus size iPhones.
   * @returns boolean
   */
  isSmall: windowWidth <= 375 || (windowWidth <= 414 && !hasNotch),
  /**
   * Device's status bar height.
   */
  statusBarHeight,
  /**
   * iPhoneX's status bar padding.
   * @constant 24
   */
  statusBarPadding,
  /**
   * Calculates screen's width corresponding to the percentage asked.
   * @param percentage - Desired percentage of the screen (from 0 to 100)
   */
  vh,
  /**
   * Calculates screen's height corresponding to the percentage asked.
   * @param percentage - Desired percentage of the screen (from 0 to 100)
   */
  vw,
  /**
   * Calculates on scale of 0-1 width of the screen value given represents.
   * @param value - value to be interpolated
   */
  width: (value: number): number => value * windowWidth,
  /**
   * Calculates on scale of 0-1 height of the screen value given represents.
   * @param value - value to be interpolated
   */
  height: (value: number): number => value * windowHeight,
  /**
   * Scales width from base size to screen size.
   * @param width - width to be scaled
   * @returns Will return a linear scaled result of the provided width, based on your device's screen width
   */
  horizontalScale: (width: number) => (windowWidth / guidelineBaseWidth) * width,
  /**
   * Scales height from base size to screen size.
   * @param height - height to be scaled
   * @returns Will return a linear scaled result of the provided height, based on your device's screen height
   */
  verticalScale: (height: number) => (windowHeight / guidelineBaseHeight) * height,
  /**
   * Device screen height (minus status bar height on Android).
   */
  screenHeight:
    Platform.OS === 'android' ? Dimensions.get('screen').height - (StatusBar.currentHeight ?? 0) : windowHeight,
  /**
   * Device window height (minus status bar height on Android).
   */
  windowHeight: Platform.OS === 'android' ? windowHeight - (StatusBar.currentHeight ?? 0) : windowHeight,
  /**
   * Navigation bar height on Android.
   */
  navBarHeight:
    Platform.OS === 'android' && hasVisibleNavigationKeys
      ? /**
         * NOTE: The biggest possible value is the default navigation bar height of 48dp,
         * the smallest one is the new Android 10 bottom bar with 16dp.
         */
        navBarHeight >= 48
        ? 48
        : 16
      : 0,
} as const

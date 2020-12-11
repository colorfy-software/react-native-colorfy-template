import { Dimensions } from 'react-native'

const { width: ww, height: wh } = Dimensions.get('window')
const [shortDimension, longDimension] = ww < wh ? [ww, wh] : [wh, ww]

// iPhone 6
const guidelineBaseWidth = 375
const guidelineBaseHeight = 667

export default {
  /**
   * @param value - value to be interpolated
   * @returns On scale of 0-1 width of the screen value given represents
   */
  width: (value: number): number => value * ww,
  /**
   *
   * @param value - value to be interpolated
   * @returns On scale of 0-1 height of the screen value given represents
   */
  height: (value: number): number => value * wh,
  /**
   * Scales width from base size to screen size.
   * @param width - width to be scaled
   * @returns Will return a linear scaled result of the provided width, based on your device's screen width
   */
  horizontalScale: (width: number): number =>
    (shortDimension / guidelineBaseWidth) * width,
  /**
   * Scales height from base size to screen size.
   * @param height - height to be scaled
   * @returns Will return a linear scaled result of the provided height, based on your device's screen height
   */
  verticalScale: (height: number): number =>
    (longDimension / guidelineBaseHeight) * height,
}

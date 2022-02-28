import Animated, { interpolate } from 'react-native-reanimated'

interface InputType {
  value: number
  inputRange: number[]
  outputRange: string[]
}

const { round, Extrapolate, color } = Animated

const colorRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i

type RGBType = {
  r: number
  g: number
  b: number
}

const hexToRgb = (hex: string): RGBType | null => {
  const result = colorRegex.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

const white = { r: 255, g: 255, b: 255 }

/**
 * Used to animate changes in color. Pass in your animated value, inputRange, and hexColor[] as an outputRange
 * @param input
 */
const animateColors = (input: InputType): Animated.Node<number | string> => {
  const colors = input.outputRange.map(hexColor => hexToRgb(hexColor) || white)
  const r = round(
    interpolate(
      input.value,
      input.inputRange,
      colors.map(c => c.r),
      Extrapolate.CLAMP,
    ),
  )
  const g = round(
    interpolate(
      input.value,
      input.inputRange,
      colors.map(c => c.g),
      Extrapolate.CLAMP,
    ),
  )
  const b = round(
    interpolate(
      input.value,
      input.inputRange,
      colors.map(c => c.b),
      Extrapolate.CLAMP,
    ),
  )
  return color(r, g, b)
}

export default animateColors

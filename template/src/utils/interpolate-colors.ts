import Animated from 'react-native-reanimated'

interface Input {
  animatedValue: Animated.Adaptable<number>
  inputRange: number[]
  outputRange: string[]
}

const { round, interpolate, Extrapolate, color } = Animated

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

export default (input: Input): Animated.Node<number> => {
  const colors = input.outputRange.map(hexColor => hexToRgb(hexColor) || white)
  const r = round(
    interpolate(input.animatedValue, {
      inputRange: input.inputRange,
      outputRange: colors.map(c => c.r),
      extrapolate: Extrapolate.CLAMP,
    }),
  )
  const g = round(
    interpolate(input.animatedValue, {
      inputRange: input.inputRange,
      outputRange: colors.map(c => c.g),
      extrapolate: Extrapolate.CLAMP,
    }),
  )
  const b = round(
    interpolate(input.animatedValue, {
      inputRange: input.inputRange,
      outputRange: colors.map(c => c.b),
      extrapolate: Extrapolate.CLAMP,
    }),
  )
  return color(r, g, b)
}

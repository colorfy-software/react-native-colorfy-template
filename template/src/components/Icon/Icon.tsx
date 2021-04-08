import { createElement, memo } from 'react'
import { ViewProps, ViewStyle, StyleProp } from 'react-native'

import * as SVGs from './files'

/**
 * NOTE: Ensure icons are normalized by the design team before accepting them.
 * If needed, recommend using: https://jakearchibald.github.io/svgomg/ to do so.
 * Avoid adding static illustrations in this file as it's only meant for iconography.
 */

interface PropsType {
  name: keyof typeof SVGs
  size?: number
  color?: string
  fill?: string
  stroke?: string
  style?: StyleProp<ViewStyle>
  testID?: ViewProps['testID']
}

const Icon = ({ name, size, fill, style, stroke, testID, color = 'transparent' }: PropsType): JSX.Element => {
  const icon = SVGs[name]

  if (!icon) throw new Error(`"${name}" is not a valid icon name!`)

  return createElement(icon, {
    fill: fill || color,
    stroke: stroke || color,
    width: size,
    height: size,
    style,
    testID,
  })
}

export default memo(Icon)

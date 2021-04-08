import { createElement, memo } from 'react'
import { ViewProps, ViewStyle } from 'react-native'

import * as SVGs from './files'

/**
 * NOTE: Ensure icons are normalized by the design team before accepting them.
 * If needed, recommend using: https://jakearchibald.github.io/svgomg/ to do so.
 * Avoid adding static illustrations in this file as it's only meant for iconography.
 */

interface Props {
  name: keyof typeof SVGs
  size?: number
  color?: string
  style?: ViewStyle
  testID?: ViewProps['testID']
}

const Icon = ({
  name,
  size,
  style,
  testID,
  color = 'red',
}: Props): JSX.Element => {
  const icon = SVGs[name]

  if (!icon) throw new Error(`"${name}" is not a valid icon name!`)

  return createElement(icon, {
    fill: color,
    stroke: color,
    width: size,
    height: size,
    style,
    testID,
  })
}

export default memo(Icon)

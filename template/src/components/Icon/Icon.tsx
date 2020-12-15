import { createElement, memo } from 'react'
import { ViewStyle } from 'react-native'

import * as SVGs from './files'

/**
 * NOTE: Always use icons with the same view box size.
 * Make sure icons are normalized by the design team before accepting them.
 * If needed, recommend using: https://jakearchibald.github.io/svgomg/ to do so.
 * Avoid adding static illustrations in this file as it's only meant for iconography.
 */

export const ICONS = {
  sun: SVGs.sun,
  moon: SVGs.moon,
}

interface Props {
  name: keyof typeof ICONS
  size?: number
  stroke?: string
  fill?: string
  style?: ViewStyle
}

const Icon = ({
  name,
  size,
  style,
  stroke = 'transparent',
  fill = 'transparent',
}: Props): JSX.Element => {
  const icon = ICONS[name]

  if (!icon) throw new Error(`"${name}" is not a valid icon name!`)

  return createElement(icon, { fill, stroke, width: size, height: size, style })
}

export default memo(Icon)

import React, { memo } from 'react'
import Svg, { G, Path } from 'react-native-svg'

/**
 * ALWAYS USE ICONS WITH THE SAME VIEW BOX SIZE (preferably 24). IF THE ICONS AREN'T NORMALIZED BY THE DESIGNER, SEND THEM BACK
 */

/**
 * Avoid static illustrations in this file. It's only meant for iconography.
 */

export const ICONS = {
  home: (
    <Path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
  ),
}

interface Props {
  icon: keyof typeof ICONS
  size: number
  stroke?: string
  fill?: string
}

const Icon = ({
  icon,
  size,
  stroke = 'transparent',
  fill = 'transparent',
}: Props): JSX.Element => {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <G fill={fill} stroke={stroke}>
        {ICONS[icon]}
      </G>
    </Svg>
  )
}

export default memo(Icon)

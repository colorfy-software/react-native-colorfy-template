import { memo } from 'react'
import { Text as TextModule, StyleProp, TextStyle, TextProps, GestureResponderEvent } from 'react-native'

import { Colors, FontFamily, Typography } from '../styles/style-guide'

interface PropsType {
  type?: keyof typeof Typography
  color?: string
  children?: React.ReactNode
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  style?: StyleProp<TextStyle>
  fontSize?: TextStyle['fontSize']
  bold?: boolean
  light?: boolean
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined
  numberOfLines?: number | undefined
  selectable?: boolean | undefined
  testID?: TextProps['testID']
}

const AppText = ({
  bold,
  light,
  type = 'body',
  color,
  children,
  style,
  numberOfLines,
  ellipsizeMode,
  selectable = true,
  fontSize,
  onPress,
  testID,
  ...textProps
}: PropsType): JSX.Element => {
  const predefinedStyles = (type && Typography[type]) || {}
  const passedStyles = style || {}
  const boldStyles: {
    fontFamily?: TextStyle['fontFamily']
  } = bold ? { fontFamily: FontFamily.notoSansScBold } : {}
  const lightStyles: {
    fontFamily?: TextStyle['fontFamily']
  } = light ? { fontFamily: FontFamily.notoSansScLight } : {}
  const compiledStyles: StyleProp<TextStyle> = [
    predefinedStyles,
    { fontSize: fontSize ?? predefinedStyles.fontSize },
    passedStyles,
    boldStyles,
    lightStyles,
    { color: color || (style as TextStyle)?.color || Colors.text },
  ]

  return (
    <TextModule
      testID={testID}
      selectable={selectable}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={compiledStyles}
      onPress={onPress && onPress}
      {...textProps}>
      {children}
    </TextModule>
  )
}

export default memo(AppText)

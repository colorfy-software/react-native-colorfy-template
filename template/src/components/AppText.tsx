/* eslint-disable react-native/no-unused-styles */
import React, { memo } from 'react'
import {
  Text as NativeText,
  StyleSheet,
  StyleProp,
  TextStyle,
  GestureResponderEvent,
} from 'react-native'

import size from '../styles/size'

const TEXT_STYLES = StyleSheet.create({
  tabLabel: {
    // fontFamily: 'Roboto-Medium',
    fontSize: size.horizontalScale(18),
  },
  largeHeaderTitle: {
    // fontFamily: 'Roboto-Thin',
    fontSize: size.horizontalScale(36),
  },
  headerTitle: {
    // fontFamily: 'Roboto',
    fontSize: size.horizontalScale(18),
  },
  headerSubtitle: {
    // fontFamily: 'Roboto-Medium',
    fontSize: size.horizontalScale(14),
  },
  body: {
    // fontFamily: 'Roboto-Light',
    fontSize: size.horizontalScale(16),
    lineHeight: size.horizontalScale(16) * 1.38,
  },
  bodyBold: {
    // fontFamily: 'Roboto-Bold',
    fontSize: size.horizontalScale(16),
    lineHeight: size.horizontalScale(16) * 1.38,
  },
  bodyThin: {
    // fontFamily: 'Roboto-Light',
    fontSize: size.horizontalScale(16),
    lineHeight: size.horizontalScale(16) * 1.38,
  },
  sectionTitle: {
    // fontFamily: 'Roboto-Bold',
    fontSize: size.horizontalScale(14),
  },
  label: {
    // fontFamily: 'Roboto',
    fontSize: size.horizontalScale(14),
  },
  smallLabel: {
    // fontFamily: 'Roboto-Bold',
    fontSize: size.horizontalScale(14),
  },
})

interface Props {
  type: keyof typeof TEXT_STYLES
  color: string
  children?: React.ReactChild | React.ReactChild[]
  onPress?: ((event: GestureResponderEvent) => void) | undefined
  style?: StyleProp<TextStyle>
  bold?: boolean
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined
  numberOfLines?: number | undefined
  selectable?: boolean | undefined
}

const AppText = ({
  bold,
  type,
  color,
  children,
  style,
  numberOfLines,
  ellipsizeMode,
  onPress,
  selectable = true,
}: Props): JSX.Element => {
  const predefinedStyles = (type && TEXT_STYLES[type]) || {}
  const passedStyles = style || {}
  const boldStyles = bold ? { fontWeight: '900' } : {}
  const compiledStyles = StyleSheet.flatten([
    predefinedStyles,
    passedStyles,
    boldStyles,
    { color },
  ])

  return (
    <NativeText
      selectable={selectable}
      numberOfLines={numberOfLines || undefined}
      ellipsizeMode={ellipsizeMode || undefined}
      style={compiledStyles}
      onPress={onPress && onPress}>
      {children}
    </NativeText>
  )
}

export default memo(AppText)

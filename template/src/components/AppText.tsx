/* eslint-disable react-native/no-unused-styles */
import React, { memo } from 'react'
import {
  Text as NativeText,
  StyleSheet,
  StyleProp,
  TextStyle,
  TextProps,
  GestureResponderEvent,
} from 'react-native'

import { screen } from '../styles/style-guide'

const TEXT_STYLES = StyleSheet.create({
  title: {
    // fontFamily: 'Roboto',
    fontSize: screen.horizontalScale(32),
  },
  heading: {
    // fontFamily: 'Roboto',
    fontSize: screen.horizontalScale(24),
  },
  subtitle: {
    // fontFamily: 'Roboto-Medium',
    fontSize: screen.horizontalScale(18),
  },
  body: {
    // fontFamily: 'Roboto-Light',
    fontSize: screen.horizontalScale(16),
    lineHeight: screen.horizontalScale(16) * 1.38,
  },
  label: {
    // fontFamily: 'Roboto',
    fontSize: screen.horizontalScale(13),
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
  testID?: TextProps['testID']
}

const AppText = ({
  bold,
  type,
  color,
  children,
  style,
  numberOfLines,
  ellipsizeMode,
  selectable = true,
  onPress,
  testID,
}: Props): JSX.Element => {
  const predefinedStyles = (type && TEXT_STYLES[type]) || {}
  const passedStyles = style || {}
  const boldStyles: {
    fontWeight:
      | 'bold'
      | '900'
      | 'normal'
      | '100'
      | '200'
      | '300'
      | '400'
      | '500'
      | '600'
      | '700'
      | '800'
      | undefined
  } = bold
    ? { fontWeight: '900' }
    : {
        fontWeight: undefined,
      }
  const compiledStyles: StyleProp<TextStyle> = StyleSheet.flatten([
    predefinedStyles,
    passedStyles,
    boldStyles,
    { color },
  ])

  return (
    <NativeText
      testID={testID}
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

import { memo } from 'react'
import { ActivityIndicator, Pressable, StyleSheet, StyleProp, TextStyle, ViewStyle, PressableProps } from 'react-native'

import AppText from './AppText'

import { colors, screen } from '../styles/style-guide'

interface PropsType {
  children?: React.ReactNode
  title?: string
  color?: string
  loading?: boolean
  disabled?: boolean
  secondary?: boolean
  tertiary?: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  testID?: PressableProps['testID']
  titleStyle?: StyleProp<TextStyle>
}

const Button = ({
  style,
  color,
  title,
  testID,
  loading,
  disabled,
  secondary,
  tertiary,
  children,
  onPress,
  titleStyle,
  ...pressableProps
}: PropsType): JSX.Element => {
  const isNotPrimary = secondary || tertiary

  const borderRadius = isNotPrimary ? 20 : 8
  const textColor = isNotPrimary ? color || colors.SECONDARY : 'white'
  const borderColor = secondary ? color || colors.SECONDARY : 'transparent'
  const backgroundColor = isNotPrimary ? 'transparent' : color || colors.SECONDARY

  return (
    <Pressable
      testID={testID}
      disabled={loading || disabled}
      style={[
        styles.container,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          borderColor,
          borderRadius,
          backgroundColor,
          opacity: disabled ? 0.4 : 1,
        },
        style,
      ]}
      onPress={onPress}
      {...pressableProps}>
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        children || (
          <AppText bold color={textColor} numberOfLines={2} style={[styles.title, titleStyle]}>
            {title}
          </AppText>
        )
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: screen.verticalScale(5),
    paddingHorizontal: screen.horizontalScale(25),
    borderWidth: 2,
  },
  title: {
    fontSize: screen.horizontalScale(16),
    lineHeight: 20,
    textAlign: 'center',
  },
})

export default memo(Button)

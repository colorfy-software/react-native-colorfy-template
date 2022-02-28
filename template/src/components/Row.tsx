import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Switch,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { PropsWithChildren } from 'react'

import AppText from './AppText'

import { Icons } from '../assets'
import { COLORS, DEVICE } from '../styles/style-guide'

interface PropsType {
  title?: string
  value?: boolean
  loading?: boolean
  onPress?: () => void
  style?: StyleProp<ViewStyle>
  testID?: ViewProps['testID']
  titleStyle?: StyleProp<TextStyle>
  icon?: typeof Icons[keyof typeof Icons]
}

const Row = ({
  icon: Icon = Icons.Arrow,
  titleStyle,
  children,
  loading,
  onPress,
  testID,
  title,
  value,
  style,
}: PropsWithChildren<PropsType>): JSX.Element => {
  const shouldRenderToggle = typeof value !== null && typeof value !== 'undefined'
  const selectable = !shouldRenderToggle && !onPress

  const renderToggle = () => <Switch value={value} onValueChange={() => onPress?.()} />
  const renderIcon = () => <Icon size={18} color={COLORS.icon} style={styles.icon} />

  return (
    <Pressable
      testID={testID}
      style={[styles.container, style]}
      disabled={loading || !onPress}
      onPress={() => onPress?.()}>
      <AppText selectable={selectable} style={[styles.text, titleStyle]}>
        {title || children}
      </AppText>
      <View style={styles.iconContainer}>
        {loading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator color={COLORS.secondary} size="small" />
          </View>
        )}
        {shouldRenderToggle ? renderToggle() : onPress ? renderIcon() : null}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: DEVICE.verticalScale(12),
  },
  text: {
    maxWidth: '80%',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    marginRight: DEVICE.horizontalScale(10),
  },
  icon: {
    transform: [{ rotate: '180deg' }],
  },
})

export default Row

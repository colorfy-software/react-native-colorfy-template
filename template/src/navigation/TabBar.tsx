import { View, Pressable, PressableProps, StyleSheet } from 'react-native'
import type { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import { Icons, IconType } from '../assets'

import AppText from '../components/AppText'

import { getLocalizedString } from '../locales'
import { COLORS, DEVICE } from '../styles/style-guide'

interface TabBarItemType {
  isFocused: boolean
  routeName: keyof typeof LABELS
  onPress: PressableProps['onPress']
  options: BottomTabNavigationOptions
  onLongPress: PressableProps['onLongPress']
}

const LABELS = {
  home: getLocalizedString('general.home'),
  tips: getLocalizedString('general.tips'),
  activity: getLocalizedString('general.activity'),
  settingsstack: getLocalizedString('general.settings'),
}

const getIcon = (routeName: keyof typeof LABELS): IconType => {
  switch (routeName) {
    case 'home':
      return Icons.Home
    case 'activity':
      return Icons.Activity
    case 'settingsstack':
      return Icons.Settings
    case 'tips':
      return Icons.Tips
    default:
      return Icons.Settings
  }
}

const TabBarItem = ({ isFocused, routeName, onLongPress, onPress, options }: TabBarItemType): JSX.Element => {
  const color = isFocused ? COLORS.secondary : COLORS.icon
  const Icon = getIcon(routeName)
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : { disabled: true }}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      style={styles.tab}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon size={28} color={color} />
      <AppText type="label" color={color}>
        {LABELS[routeName]}
      </AppText>
    </Pressable>
  )
}

const TabBar = ({ state, descriptors, navigation }: BottomTabBarProps): JSX.Element | null => (
  <View style={styles.container}>
    {state.routes.map((route, index) => {
      const { options } = descriptors[route.key]
      const label =
        options.tabBarLabel !== undefined
          ? options.tabBarLabel
          : options.title !== undefined
          ? options.title
          : route.name

      const isFocused = state.index === index

      const onPress = (): void => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        })

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name)
        }
      }

      const onLongPress = (): void => {
        navigation.emit({
          type: 'tabLongPress',
          target: route.key,
        })
      }

      return (
        <TabBarItem
          key={index}
          {...{
            label,
            onPress,
            options,
            isFocused,
            onLongPress,
            routeName: route.name.toLowerCase() as keyof typeof LABELS,
          }}
        />
      )
    })}
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: DEVICE.vw(100),
    height: DEVICE.hasNotch ? 49 + DEVICE.indicatorPadding : 55,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.16,
    shadowRadius: 12,
  },
  tab: {
    width: DEVICE.vw(100 / Object.keys(LABELS).length),
    height: 75,
    alignItems: 'center',
    justifyContent: DEVICE.hasNotch ? 'flex-start' : 'center',
    paddingTop: DEVICE.hasNotch ? 5 : 0,
  },
})

export default TabBar

import { View, Pressable, PressableProps, StyleSheet } from 'react-native'
import { BottomTabBarProps, BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import Icon from '../components/icon/Icon'
import AppText from '../components/AppText'

import { getLocalizedString } from '../locales'
import { Colors, Device } from '../styles/style-guide'

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
  profilestack: getLocalizedString('general.profile'),
}

const TabBarItem = ({ isFocused, routeName, onLongPress, onPress, options }: TabBarItemType): JSX.Element => {
  const color = isFocused ? Colors.secondary : Colors.icon
  const iconName = routeName === 'profilestack' ? 'settings' : routeName
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : { disabled: true }}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      style={styles.tab}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon size={28} color={color} name={iconName} />
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
    width: Device.vw(100),
    height: Device.hasNotch ? 49 + Device.indicatorPadding : 55,
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
    width: Device.vw(100 / Object.keys(LABELS).length),
    height: 75,
    alignItems: 'center',
    justifyContent: Device.hasNotch ? 'flex-start' : 'center',
    paddingTop: Device.hasNotch ? 5 : 0,
  },
})

export default TabBar

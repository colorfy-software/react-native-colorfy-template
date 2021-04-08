import React from 'react'
import { View, Text, Pressable, PressableProps, StyleSheet } from 'react-native'
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from '@react-navigation/bottom-tabs'

import Icon from '../components/icon/Icon'

import { colors, screen } from '../styles/style-guide'
import { getLocalizedString } from '../locales'

interface TabBarItemType {
  isFocused: boolean
  routeName: keyof typeof LABELS
  onLongPress: PressableProps['onLongPress']
  onPress: PressableProps['onPress']
  options: BottomTabNavigationOptions
}

const LABELS = {
  home: getLocalizedString('general.home'),
  tips: getLocalizedString('general.tips'),
  activity: getLocalizedString('general.activity'),
  profile: getLocalizedString('general.profile'),
}

const TabBarItem = ({
  isFocused,
  routeName,
  onLongPress,
  onPress,
  options,
}: TabBarItemType): JSX.Element => {
  const color = isFocused ? colors.PRIMARY : colors.ICON
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : { disabled: true }}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      style={styles.tab}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon size={28} color={color} name={routeName} />
      <Text style={{ color }}>{LABELS[routeName]}</Text>
    </Pressable>
  )
}

const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element | null => {
  const focusedOptions = descriptors[state.routes[state.index].key].options

  if (focusedOptions.tabBarVisible === false) return null

  return (
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

        // TODO: Implement scroll to top on press if route is focused
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
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: screen.vw(100),
    height: screen.hasNotch ? 49 + screen.indicatorPadding : 55,
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
    width: screen.vw(100 / Object.keys(LABELS).length),
    height: 75,
    alignItems: 'center',
    justifyContent: screen.hasNotch ? 'flex-start' : 'center',
    paddingTop: screen.hasNotch ? 5 : 0,
  },
})

export default TabBar

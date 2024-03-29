import { useEffect, useRef } from 'react'
import { Platform, StatusBar } from 'react-native'
import { useRehydrate } from '@colorfy-software/zfy'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackCardInterpolatedStyle, createStackNavigator } from '@react-navigation/stack'

import TabBar from './TabBar'
import AuthStack from './AuthStack'
import SettingsStack from './SettingsStack'

import Home from '../screens/home/Home'
import Tips from '../screens/tips/Tips'
import Activity from '../screens/activity/Activity'

import type { MainStackParamsType, AppBottomTabParamsType } from '../types/navigation-types'

import core from '../core/core'
import sleep from '../utils/sleep'
import appStore from '../stores/app-store'
import userStore from '../stores/user-store'
import NavigationUtil from '../utils/navigation'

const MainStack = createStackNavigator<MainStackParamsType>()
const AppBottomTab = createBottomTabNavigator<AppBottomTabParamsType>()

const disableDefaultAnimation = (): StackCardInterpolatedStyle => ({
  // NOTE: FYI this can be animated for both the current & next screens if needed.
  // Check the doc for cardStyleInterpolator under https://reactnavigation.org/docs/stack-navigator#animation-related-options
  cardStyle: { transform: [{ translateX: 0 }] },
})

const AppBottomTabComponent = (): JSX.Element => (
  <AppBottomTab.Navigator
    initialRouteName="Home"
    screenOptions={{ headerShown: false }}
    tabBar={(props): JSX.Element => <TabBar {...props} />}>
    <AppBottomTab.Screen name="Home" component={Home} />
    <AppBottomTab.Screen name="Tips" component={Tips} />
    <AppBottomTab.Screen name="Activity" component={Activity} />
    <AppBottomTab.Screen name="SettingsStack" component={SettingsStack} />
  </AppBottomTab.Navigator>
)

export default (): JSX.Element => {
  const isRehydrated = useRehydrate([appStore, userStore])
  const navigationState = appStore(({ data }) => data.navigationState)
  const hasValidToken = userStore(({ data }) => data.UID)
  const routeNameRef = useRef<string | undefined>()

  useEffect(() => {
    if (isRehydrated) {
      core.app.update({ navigationState: hasValidToken ? 'app' : 'auth' })
      if (Platform.OS === 'ios') StatusBar.setBarStyle('dark-content', false)
      /**
       * NOTE: Hides the auth screen that appears briefly
       * before rehydration when the user was already logged in.
       */
      sleep(500).then(() => SplashScreen?.hide())
    }
  }, [hasValidToken, isRehydrated])

  return (
    <NavigationContainer
      ref={NavigationUtil.setRef}
      onReady={() => {
        // @ts-expect-error NOTE: Implemented as per https://reactnavigation.org/docs/navigating-without-navigation-prop#handling-initialization
        NavigationUtil.isReadyRef.current = true
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = NavigationUtil.setRef?.current?.getCurrentRoute()?.name

        if (previousRouteName !== currentRouteName) {
          console.log('screenView', currentRouteName)
        }

        // NOTE: Saving the current route name for later comparison
        routeNameRef.current = currentRouteName
      }}>
      <MainStack.Navigator screenOptions={{ headerShown: false, presentation: 'transparentModal' }}>
        {navigationState === 'auth' && (
          <MainStack.Screen
            name="Auth"
            component={AuthStack}
            options={{ cardStyleInterpolator: disableDefaultAnimation }}
          />
        )}
        {navigationState === 'app' && (
          <MainStack.Screen
            name="App"
            component={AppBottomTabComponent}
            options={{ cardStyleInterpolator: disableDefaultAnimation }}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

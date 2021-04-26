import { useEffect, useRef } from 'react'
import { Platform, StatusBar } from 'react-native'
import { useRehydrate } from '@colorfy-software/zfy'
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StackCardInterpolatedStyle, createStackNavigator } from '@react-navigation/stack'

import TabBar from './TabBar'
import AuthStack from './AuthStack'
import ProfileStack from './ProfileStack'

import Home from '../screens/home/Home'
import Tips from '../screens/tips/Tips'
import Activity from '../screens/activity/Activity'

import { MainStackParamType, MainTabParamType } from '../types/navigation-types'

import core from '../core/core'
import sleep from '../utils/sleep'
import NavigationUtil from '../utils/navigation'
import appStore from '../store/stores/app-store'
import userStore from '../store/stores/user-store'

const MainStack = createStackNavigator<MainStackParamType>()
const MainBottomTab = createBottomTabNavigator<MainTabParamType>()

const disableDefaultAnimation = (): StackCardInterpolatedStyle => ({
  // NOTE: FYI this can be animated for both the current & next screens if needed.
  // Check the doc for cardStyleInterpolator under https://reactnavigation.org/docs/stack-navigator#animation-related-options
  cardStyle: { transform: [{ translateX: 0 }] },
})

const AppBottomTab = (): JSX.Element => (
  <MainBottomTab.Navigator initialRouteName="Home" tabBar={(props): JSX.Element => <TabBar {...props} />}>
    <MainBottomTab.Screen name="Home" component={Home} />
    <MainBottomTab.Screen name="Tips" component={Tips} />
    <MainBottomTab.Screen name="Activity" component={Activity} />
    <MainBottomTab.Screen name="Profile" component={ProfileStack} />
  </MainBottomTab.Navigator>
)

export default (): JSX.Element => {
  const isRehydrated = useRehydrate({ app: appStore, user: userStore })
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
      sleep(250).then(() => SplashScreen?.hide())
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
      <MainStack.Navigator headerMode="none">
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
            component={AppBottomTab}
            options={{ cardStyleInterpolator: disableDefaultAnimation }}
          />
        )}
      </MainStack.Navigator>
    </NavigationContainer>
  )
}

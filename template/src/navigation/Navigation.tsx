import React, { useEffect } from 'react'
import {
  StackCardInterpolatedStyle,
  createStackNavigator,
} from '@react-navigation/stack'
import SplashScreen from 'react-native-splash-screen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import TabBar from './TabBar'
import AuthStack from './AuthStack'
import ProfileStack from './ProfileStack'

import Home from '../screens/home/Home'
import Tips from '../screens/tips/Tips'
import Activity from '../screens/activity/Activity'

import { MainStackParamType, MainTabParamType } from '../types/navigation-types'

import core from '../core/core'
import useRehydrate from '../hooks/use-rehydrate'
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
  <MainBottomTab.Navigator
    initialRouteName="Home"
    // eslint-disable-next-line react/jsx-props-no-spreading
    tabBar={(props): JSX.Element => <TabBar {...props} />}>
    <MainBottomTab.Screen name="Home" component={Home} />
    <MainBottomTab.Screen name="Tips" component={Tips} />
    <MainBottomTab.Screen name="Activity" component={Activity} />
    <MainBottomTab.Screen name="Profile" component={ProfileStack} />
  </MainBottomTab.Navigator>
)

export default (): JSX.Element => {
  const isRehydrated = useRehydrate()
  const navigationState = appStore(({ data }) => data.navigationState)
  // TODO: Simple placeholder, to be replaced once Gigya is set up
  const hasValidToken = userStore(({ data }) => data.id)

  useEffect(() => {
    if (isRehydrated) {
      core.app.update({ navigationState: hasValidToken ? 'app' : 'auth' })
      SplashScreen?.hide()
    }
  }, [hasValidToken, isRehydrated])

  return (
    <NavigationContainer>
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

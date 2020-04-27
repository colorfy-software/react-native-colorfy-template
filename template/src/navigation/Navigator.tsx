import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Launch from '../screens/launch/Launch'
import Auth from '../screens/auth/Auth'
import App from '../screens/app/App'

import {
  SWITCH_NAVIGATION_STATES,
  SwitchNavigationStateType,
  LaunchStackParamType,
  AuthStackParamType,
  AppStackParamType,
} from '../types/navigation-types'

const LaunchStack = createStackNavigator<LaunchStackParamType>()
const AuthStack = createStackNavigator<AuthStackParamType>()
const AppStack = createStackNavigator<AppStackParamType>()

export default (): JSX.Element => {
  const [navigationState, setNavigationState] = useState<
    SwitchNavigationStateType
  >(SWITCH_NAVIGATION_STATES.LAUNCH)

  return (
    <NavigationContainer>
      {navigationState === SWITCH_NAVIGATION_STATES.LAUNCH && (
        <LaunchStack.Navigator headerMode="none">
          <LaunchStack.Screen
            name="Launch"
            component={Launch}
            initialParams={{
              setNavigationState: setNavigationState,
            }}
          />
        </LaunchStack.Navigator>
      )}
      {navigationState === SWITCH_NAVIGATION_STATES.AUTH && (
        <AuthStack.Navigator headerMode="none">
          <AuthStack.Screen
            name="Auth"
            component={Auth}
            initialParams={{
              setNavigationState: setNavigationState,
            }}
          />
        </AuthStack.Navigator>
      )}
      {navigationState === SWITCH_NAVIGATION_STATES.APP && (
        <AppStack.Navigator headerMode="none">
          <AppStack.Screen
            name="App"
            component={App}
            initialParams={{
              setNavigationState: setNavigationState,
            }}
          />
        </AppStack.Navigator>
      )}
    </NavigationContainer>
  )
}

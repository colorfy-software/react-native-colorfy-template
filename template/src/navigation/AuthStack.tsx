import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { AuthStackParamType } from '../types/navigation-types'

import Welcome from '../screens/welcome/Welcome'

const AuthStack = createStackNavigator<AuthStackParamType>()

export default (): JSX.Element => (
  <AuthStack.Navigator headerMode="none">
    <AuthStack.Screen name="Welcome" component={Welcome} />
    {/* NOTE: You can add the auth screens here */}
  </AuthStack.Navigator>
)

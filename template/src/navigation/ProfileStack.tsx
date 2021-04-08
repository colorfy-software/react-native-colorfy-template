import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { ProfileStackParamType } from '../types/navigation-types'

import Profile from '../screens/profile/Profile'

const ProfileStack = createStackNavigator<ProfileStackParamType>()

export default (): JSX.Element => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="ProfileScreen" component={Profile} />
    {/* NOTE: You can add the profile screens here */}
  </ProfileStack.Navigator>
)

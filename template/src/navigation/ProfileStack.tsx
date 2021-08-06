import { createStackNavigator } from '@react-navigation/stack'

import { ProfileStackParamsType } from '../types/navigation-types'

import Profile from '../screens/profile/Profile'

const ProfileStack = createStackNavigator<ProfileStackParamsType>()

export default (): JSX.Element => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="Profile" component={Profile} />
    {/* NOTE: You can add the profile screens here */}
  </ProfileStack.Navigator>
)

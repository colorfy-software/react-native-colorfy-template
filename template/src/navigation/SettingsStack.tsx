import { createStackNavigator } from '@react-navigation/stack'

import type { SettingsStackParamsType } from '../types/navigation-types'

import Settings from '../screens/settings/Settings'

const SettingsStack = createStackNavigator<SettingsStackParamsType>()

export default (): JSX.Element => (
  <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
    <SettingsStack.Screen name="Settings" component={Settings} />
    {/* NOTE: You can add the profile screens here */}
  </SettingsStack.Navigator>
)

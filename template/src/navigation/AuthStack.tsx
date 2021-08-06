import { createStackNavigator } from '@react-navigation/stack'

import { AuthStackParamsType } from '../types/navigation-types'

import Welcome from '../screens/welcome/Welcome'

const AuthStack = createStackNavigator<AuthStackParamsType>()

export default (): JSX.Element => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Welcome" component={Welcome} />
    {/* NOTE: You can add the auth screens here */}
  </AuthStack.Navigator>
)

import 'react-native-gesture-handler'
import { AppRegistry, Platform, UIManager } from 'react-native'

import App from './App'

import { name as appName } from './app.json'

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

AppRegistry.registerComponent(appName, () => App)

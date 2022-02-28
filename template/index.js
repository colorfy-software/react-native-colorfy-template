import 'react-native-gesture-handler'
import NetInfo from '@react-native-community/netinfo'
import { AppRegistry, LogBox, Platform, UIManager } from 'react-native'

import App from './src/App'

import { name as appName } from './app.json'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

NetInfo.configure({ shouldFetchWiFiSSID: true })

AppRegistry.registerComponent(appName, () => App)

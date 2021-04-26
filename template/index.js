import 'react-native-gesture-handler'
import { initZfy } from '@colorfy-software/zfy'
import EncryptedStorage from 'react-native-encrypted-storage'
import { AppRegistry, Platform, UIManager } from 'react-native'

import App from './src/App'

import CONFIG from './src/config/app-config'
import { name as appName } from './app.json'

initZfy({
  persistKey: appName,
  storage: EncryptedStorage,
  enableLogging: CONFIG.IS_REMOTE_DEBUGGING,
})

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true)
}

AppRegistry.registerComponent(appName, () => App)

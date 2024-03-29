import DeviceInfo from 'react-native-device-info'

export const CONFIG = {
  /**
   * Backend URL
   * @constant 'https://rnct9852.free.beeceptor.com'
   */
  END_POINT: 'https://rnct9852.free.beeceptor.com',
  /**
   * Boolean that indicates if the app is running with remote debugging enabled.
   */
  IS_REMOTE_DEBUGGING: global?.location?.pathname?.includes('/debugger-ui') || global?.__REMOTEDEV__,
  /**
   * Function that indicates if the app is running the DEV target
   */
  IS_DEV: (): boolean => {
    const bundleId = DeviceInfo.getBundleId()
    if (bundleId === 'com.appstarter.dev') return true
    return false
  },
  /**
   * Function that indicates if the app is running the STAGING target
   */
  IS_STAGING: (): boolean => {
    const bundleId = DeviceInfo.getBundleId()
    if (bundleId === 'com.appstarter.staging') return true
    return false
  },
  /**
   * Function that indicates if the app is running the PROD target
   */
  IS_PROD: (): boolean => {
    const bundleId = DeviceInfo.getBundleId()
    if (bundleId === 'com.appstarter.prod') return true
    return false
  },
}

export default CONFIG

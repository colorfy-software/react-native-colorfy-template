import DeviceInfo from 'react-native-device-info'

export const CONFIG = {
  /**
   * Backend URL
   * @constant 'https://rnct9852.free.beeceptor.com'
   */
  END_POINT: 'https://rnct9852.free.beeceptor.com',
  /**
   * Function that indicates if the app is running the STAGING target
   */
  IS_STAGING: (): boolean => {
    const bundleId = DeviceInfo.getBundleId()
    if (
      bundleId === 'com.appstarter.staging' ||
      bundleId === 'org.reactjs.native.example.STAGING'
    ) {
      return true
    }
    return false
  },
  /**
   * Function that indicates if the app is running the PROD target
   */
  IS_PROD: (): boolean => {
    const bundleId = DeviceInfo.getBundleId()
    if (
      bundleId === 'com.appstarter.prod' ||
      bundleId === 'org.reactjs.native.example.PROD'
    ) {
      return true
    }
    return false
  },
}

export default CONFIG

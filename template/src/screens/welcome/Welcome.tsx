import DeviceInfo from 'react-native-device-info'
import { Image, StyleSheet, View } from 'react-native'

import Button from '../../components/Button'
import AppText from '../../components/AppText'

import core from '../../core/core'
import { Assets } from '../../assets'
import { DEVICE } from '../../styles/style-guide'

const Welcome = (): JSX.Element => {
  const onLoginPress = (): void => {
    core.user.update({ UID: '42', firstName: 'Tim', lastName: 'Apple' })
    core.app.update({ navigationState: 'app' })
  }

  return (
    <View testID="Login" style={styles.container}>
      <View style={styles.header}>
        <Image testID="Login.Logo" style={styles.logo} source={Assets.imgLogo} />
        <AppText type="title">{DeviceInfo.getApplicationName()}</AppText>
      </View>
      <Button testID="Login.Button" title="Log in" onPress={onLoginPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: DEVICE.vw(100),
    height: DEVICE.vh(100),
    justifyContent: 'space-around',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    borderRadius: DEVICE.horizontalScale(50),
    width: DEVICE.horizontalScale(100),
    height: DEVICE.horizontalScale(100),
    marginBottom: DEVICE.verticalScale(30),
  },
})

export default Welcome

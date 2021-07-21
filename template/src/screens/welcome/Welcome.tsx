import DeviceInfo from 'react-native-device-info'
import { Image, StyleSheet, View } from 'react-native'

import Button from '../../components/Button'
import AppText from '../../components/AppText'

import core from '../../core/core'
import { device } from '../../styles/style-guide'

const Welcome = (): JSX.Element => {
  const onLoginPress = (): void => {
    core.user.update({ UID: '42', firstName: 'Tim', lastName: 'Apple' })
    core.app.update({ navigationState: 'app' })
  }

  return (
    <View testID="Login" style={styles.container}>
      <View style={styles.header}>
        <Image testID="Login.Logo" style={styles.logo} source={require('../../assets/logo.png')} />
        <AppText type="title">{DeviceInfo.getApplicationName()}</AppText>
      </View>
      <Button testID="Login.Button" title="Log in" onPress={onLoginPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: device.vw(100),
    height: device.vh(100),
    justifyContent: 'space-around',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    borderRadius: device.horizontalScale(50),
    width: device.horizontalScale(100),
    height: device.horizontalScale(100),
    marginBottom: device.verticalScale(30),
  },
})

export default Welcome

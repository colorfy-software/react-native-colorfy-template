import shallow from 'zustand/shallow'
import { StyleSheet, View } from 'react-native'

import Button from '../../components/Button'
import AppText from '../../components/AppText'

import core from '../../core/core'
import { useStores } from '../../stores/stores'
import { DEVICE } from '../../styles/style-guide'
import { getLocalizedString } from '../../locales'

const Settings = (): JSX.Element => {
  const helloMessage = useStores('user', data => `👋 ${data.firstName} ${data.lastName}!`, shallow)

  return (
    <View style={styles.container}>
      <AppText type="subTitle">{helloMessage}</AppText>
      <Button title={getLocalizedString('general.logout')} style={styles.button} onPress={() => core.user.logout()} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: DEVICE.verticalScale(30),
  },
})

export default Settings

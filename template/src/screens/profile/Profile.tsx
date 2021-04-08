import shallow from 'zustand/shallow'
import { StyleSheet, View } from 'react-native'

import Button from '../../components/Button'
import AppText from '../../components/AppText'

import core from '../../core/core'
import { screen } from '../../styles/style-guide'
import { getLocalizedString } from '../../locales'
import userStore from '../../store/stores/user-store'

const Profile = (): JSX.Element => {
  const helloMessage = userStore(({ data }) => `👋 ${data.firstName} ${data.lastName}!`, shallow)
  const onLogoutPress = () => core.user.logout()

  return (
    <View style={styles.container}>
      <AppText type="subTitle">{helloMessage}</AppText>
      <Button title={getLocalizedString('general.logout')} style={styles.button} onPress={onLogoutPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: screen.verticalScale(30),
  },
})

export default Profile

import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

import core from '../../core/core'
import { colors } from '../../styles/colors'
import { getLocalizedString } from '../../locales'
import userStore from '../../store/stores/user-store'

const Profile = (): JSX.Element => {
  const helloMessage = userStore(
    ({ data }) => `👋 ${data.firstName} ${data.lastName}!`,
  )
  const onLogoutPress = (): void => {
    core.user.logout()
  }
  return (
    <View style={styles.container}>
      <Text>{helloMessage}</Text>
      <Button
        title={getLocalizedString('general.logout')}
        color={colors.SECONDARY}
        onPress={onLogoutPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Profile

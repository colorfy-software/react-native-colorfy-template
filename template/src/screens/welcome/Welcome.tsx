import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'

import core from '../../core/core'
import { colors, screen } from '../../styles/style-guide'

const Welcome = (): JSX.Element => {
  const onLoginPress = (): void => {
    core.user.update({ id: '42', firstName: 'Tim', lastName: 'Apple' })
    core.app.update({ navigationState: 'app' })
  }

  return (
    <View testID="Login" style={styles.container}>
      <View style={styles.header}>
        <Image
          testID="Login.Logo"
          style={styles.logo}
          source={require('../../assets/logo.png')}
          fadeDuration={0}
        />
        <Text style={styles.text}>App Starter</Text>
      </View>
      <Button
        testID="Login.Button"
        title="Log in"
        color={colors.SECONDARY}
        onPress={onLoginPress}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: screen.vw(100),
    height: screen.vh(100),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  text: {
    fontSize: 22,
    fontWeight: '900',
  },
})

export default Welcome

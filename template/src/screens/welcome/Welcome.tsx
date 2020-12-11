import React, { useCallback, useEffect, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native'
import shallow from 'zustand/shallow'

import core from '../../core/core'
import useRehydrate from '../../hooks/use-rehydrate'
import userStore from '../../store/stores/user-store'
import themeStore from '../../store/stores/theme-store'

const Welcome = (): JSX.Element => {
  const isRehydrated = useRehydrate()
  const [isLoggedIn, setLogin] = useState(false)
  const firstName = userStore(({ data }) => data.firstName)
  const [backgroundColor, color] = themeStore(
    ({ data }) => [data.background, data.text],
    shallow,
  )

  const onPress = useCallback(async () => {
    if (isLoggedIn) {
      core.user.logout()
      setLogin(false)
      return
    }

    await core.user.login({
      email: 'hello@world.com',
      password: 'super_secure_1234',
    })
    setLogin(true)
  }, [isLoggedIn])

  useEffect(() => {
    if (isRehydrated) {
      setLogin(Boolean(userStore.getState().data.id))
    }
  }, [isRehydrated])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <Text style={{ color }}>{isLoggedIn ? `Hello, ${firstName}` : ''}</Text>
      <Button
        title={isLoggedIn ? 'Log out' : 'Log in'}
        color={color}
        onPress={onPress}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Welcome

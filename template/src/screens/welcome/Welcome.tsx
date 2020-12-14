import React, { useCallback, useEffect, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native'
import shallow from 'zustand/shallow'

import AppText from '../../components/AppText'

import core from '../../core/core'
import useRehydrate from '../../hooks/use-rehydrate'
import userStore from '../../store/stores/user-store'
import themeStore from '../../store/stores/theme-store'
import ScreenLoader from '../../components/ScreenLoader'
import { colors } from '../../styles/colors'

const Welcome = (): JSX.Element => {
  const isRehydrated = useRehydrate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true)
  const firstName = userStore(({ data }) => data.firstName)
  const [backgroundColor, color] = themeStore(
    ({ data }) => [data.background, data.text],
    shallow,
  )

  console.log('isRehydrated: ', isRehydrated)

  useEffect(() => {
    console.log('isRehydrated: ', isRehydrated)
    if (isRehydrated) {
      setIsLoggedIn(core.user.isUserLoggedIn())
      setIsLoadingAuth(false)
    }
  }, [isRehydrated])

  /**
   * Based on whether `isLoggedIn` is true or not, we
   * either log the user in or log the user out
   */
  const onAuthPress = useCallback(async () => {
    setIsLoadingAuth(true)

    //  If user is already logged in we log them out
    if (isLoggedIn) {
      core.user.logout()
      setIsLoggedIn(false)
      setIsLoadingAuth(false)
      return
    }

    // If user isn't logged in, we try to perform login request
    try {
      await core.user.login({
        email: 'hello@world.com',
        password: 'super_secure_1234',
      })

      setIsLoggedIn(true)
      setIsLoadingAuth(false)
    } catch (error) {
      console.log('ERROR logging in: ', error)
    }
  }, [isLoggedIn])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      <AppText type="subtitle" color={color}>
        {isLoggedIn ? `Hello, ${firstName}` : ''}
      </AppText>

      <Button
        title={isLoggedIn ? 'Log out' : 'Log in'}
        color={color}
        onPress={onAuthPress}
      />

      {/* When loading state is true, we overlay the screen with a loader */}
      <ScreenLoader
        shown={isLoadingAuth}
        backgroundColor="white"
        loaderColor={colors.PRIMARY}
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

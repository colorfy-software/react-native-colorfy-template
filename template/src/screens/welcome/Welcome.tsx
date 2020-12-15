import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, SafeAreaView, StyleSheet, View } from 'react-native'
import shallow from 'zustand/shallow'

import AppText from '../../components/AppText'
import ScreenLoader from '../../components/ScreenLoader'

import core from '../../core/core'
import { colors } from '../../styles/colors'
import useRehydrate from '../../hooks/use-rehydrate'
import userStore from '../../store/stores/user-store'
import themeStore from '../../store/stores/theme-store'
import AnimatedWrapper from '../../components/AnimatedWrapper'
import { Value } from 'react-native-reanimated'
import size from '../../styles/size'
import screen from '../../styles/screen'

const Welcome = (): JSX.Element => {
  const isRehydrated = useRehydrate()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const firstName = userStore(({ data }) => data.firstName)
  const [backgroundColor, color] = themeStore(
    ({ data }) => [data.background, data.text],
    shallow,
  )

  const animatedAuthState = useRef(new Value(0))

  useEffect(() => {
    if (isRehydrated) {
      setIsLoggedIn(core.user.isUserLoggedIn())
    }
  }, [isRehydrated])

  /**
   * Based on whether `isLoggedIn` is true or not, we
   * either log the user in or log the user out
   */
  const onAuthPress = useCallback(async () => {
    //  If user is already logged in we log them out
    if (isLoggedIn) {
      core.user.logout()
      setIsLoggedIn(false)
      return
    }

    // If user isn't logged in, we try to perform login request
    try {
      await core.user.login({
        email: 'hello@world.com',
        password: 'super_secure_1234',
      })

      setIsLoggedIn(true)
    } catch (error) {
      console.log('ERROR logging in: ', error)
    }
  }, [isLoggedIn])

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <AnimatedWrapper>
        <AppText type="title" color={color} style={{ fontSize: 72 }}>
          Hi 👋
        </AppText>
      </AnimatedWrapper>

      <AnimatedWrapper staggerIndex={1}>
        <AppText type="subtitle" color={color}>
          {isLoggedIn ? `Hello, ${firstName}` : ''}
        </AppText>
      </AnimatedWrapper>

      <AnimatedWrapper staggerIndex={3}>
        <Button
          title={isLoggedIn ? 'Log out' : 'Log in'}
          color={color}
          onPress={onAuthPress}
        />
      </AnimatedWrapper>
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

export default Welcome

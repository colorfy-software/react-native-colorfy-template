import { useCallback, useEffect, useRef, useState } from 'react'
import { ModalOptions, ModalProvider, ModalStackConfig, createModalStack } from 'react-native-modalfy'
import { Animated, EmitterSubscription, Keyboard, LayoutAnimation, Platform, View } from 'react-native'

import core from './core/core'
import * as Modals from './modals'
import Navigator from './navigation/Navigation'

import { Device } from './styles/style-guide'

// NOTE: Definition of the modal stack
const modalConfig: ModalStackConfig = { ...Modals }

const animation = (animatedValue: Animated.Value, toValue: number, callback?: () => void) => {
  Animated.spring(animatedValue, {
    toValue,
    damping: 10,
    mass: 0.35,
    stiffness: 77.5,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    useNativeDriver: true,
  }).start(({ finished }) => {
    if (finished) callback?.()
  })
}

const defaultOptions: ModalOptions = {
  animationIn: animation,
  animationOut: animation,
  position: 'bottom',
  transitionOptions: animatedValue => ({
    opacity: animatedValue.interpolate({
      inputRange: [0, 1, 2],
      outputRange: [0, 1, 0.9],
    }),
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [Device.vh(100), 0, Device.vh(100)],
        }),
      },
    ],
  }),
}

const modalStack = createModalStack(modalConfig, defaultOptions)

const App = (): JSX.Element => {
  const [windowHeight, setWindowHeight] = useState(Device.screenHeight - Device.navBarHeight)
  const keyboardWillShowSubscription = useRef<EmitterSubscription | null>(null)
  const keyboardWillHideSubscription = useRef<EmitterSubscription | null>(null)
  const keyboardDidShowSubscription = useRef<EmitterSubscription | null>(null)
  const keyboardDidHideSubscription = useRef<EmitterSubscription | null>(null)

  // NOTE: Sending the available window height to all listeners on core.events.listen('windowHeight') channel.
  const syncWindowHeight = useCallback(height => {
    setWindowHeight(height - Device.navBarHeight)
    core.events.send('windowHeight', height - Device.navBarHeight)
  }, [])

  const keyboardWillShow = useCallback(
    (e: { endCoordinates: { height: number } }) => {
      LayoutAnimation.easeInEaseOut()
      syncWindowHeight(Device.screenHeight - e.endCoordinates.height)
    },
    [syncWindowHeight],
  )

  const keyboardWillHide = useCallback(() => {
    LayoutAnimation.easeInEaseOut()
    syncWindowHeight(Device.screenHeight)
  }, [syncWindowHeight])

  const keyboardDidShow = useCallback(
    (e: { endCoordinates: { height: number } }) => {
      Platform.OS === 'android' && syncWindowHeight(Device.screenHeight - e.endCoordinates.height)
    },
    [syncWindowHeight],
  )
  const keyboardDidHide = useCallback(() => {
    Platform.OS === 'android' && syncWindowHeight(Device.screenHeight)
  }, [syncWindowHeight])

  useEffect(() => {
    keyboardWillShowSubscription.current = Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    keyboardWillHideSubscription.current = Keyboard.addListener('keyboardWillHide', keyboardWillHide)

    keyboardDidShowSubscription.current = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    keyboardDidHideSubscription.current = Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    return () => {
      keyboardWillShowSubscription.current?.remove()
      keyboardWillHideSubscription.current?.remove()
      keyboardDidShowSubscription.current?.remove()
      keyboardDidHideSubscription.current?.remove()
    }
  }, [keyboardDidHide, keyboardDidShow, keyboardWillHide, keyboardWillShow])

  return (
    <View style={[{ width: Device.width(1), height: windowHeight }]}>
      <ModalProvider stack={modalStack}>
        <Navigator />
      </ModalProvider>
    </View>
  )
}

export default App

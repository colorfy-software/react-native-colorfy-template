import { useCallback, useEffect, useState } from 'react'
import { Animated, Keyboard, LayoutAnimation, Platform, View } from 'react-native'
import { ModalOptions, ModalProvider, ModalStackConfig, createModalStack } from 'react-native-modalfy'

import core from './core/core'
import * as Modals from './modals'
import Navigator from './navigation/Navigation'

import { device } from './styles/style-guide'

// NOTE: Definition of the modal stack
const modalConfig: ModalStackConfig = { ...Modals }

const animation = (animatedValue: Animated.Value, toValue: number) => {
  Animated.spring(animatedValue, {
    toValue,
    damping: 10,
    mass: 0.35,
    stiffness: 77.5,
    overshootClamping: true,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    useNativeDriver: true,
  }).start()
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
          outputRange: [device.vh(100), 0, device.vh(100)],
        }),
      },
    ],
  }),
}

const modalStack = createModalStack(modalConfig, defaultOptions)

const App = (): JSX.Element => {
  const [windowHeight, setWindowHeight] = useState(device.screenHeight - device.navBarHeight)

  // NOTE: Sending the available window height to all listeners on core.events.listen('windowHeight') channel.
  const syncWindowHeight = useCallback(height => {
    setWindowHeight(height - device.navBarHeight)
    core.events.send('windowHeight', height - device.navBarHeight)
  }, [])

  const keyboardWillShow = useCallback(
    (e: { endCoordinates: { height: number } }) => {
      LayoutAnimation.easeInEaseOut()
      syncWindowHeight(device.screenHeight - e.endCoordinates.height)
    },
    [syncWindowHeight],
  )

  const keyboardWillHide = useCallback(() => {
    LayoutAnimation.easeInEaseOut()
    syncWindowHeight(device.screenHeight)
  }, [syncWindowHeight])

  const keyboardDidShow = useCallback(
    (e: { endCoordinates: { height: number } }) => {
      Platform.OS === 'android' && syncWindowHeight(device.screenHeight - e.endCoordinates.height)
    },
    [syncWindowHeight],
  )
  const keyboardDidHide = useCallback(() => {
    Platform.OS === 'android' && syncWindowHeight(device.screenHeight)
  }, [syncWindowHeight])

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', keyboardWillShow)
    Keyboard.addListener('keyboardWillHide', keyboardWillHide)

    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    return () => {
      Keyboard.removeListener('keyboardWillShow', keyboardWillShow)
      Keyboard.removeListener('keyboardWillHide', keyboardWillHide)
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide)
    }
  }, [keyboardDidHide, keyboardDidShow, keyboardWillHide, keyboardWillShow])

  return (
    <View style={[{ width: device.width(1), height: windowHeight }]}>
      <ModalProvider stack={modalStack}>
        <Navigator />
      </ModalProvider>
    </View>
  )
}

export default App

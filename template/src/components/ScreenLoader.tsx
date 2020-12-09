import React, { memo, useEffect, useRef } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import Animated, { Value } from 'react-native-reanimated'

import { colors } from '../styles/colors'
import { SPRING_CONFIG } from './AnimatedWrapper'

interface Props {
  loaderColor?: string
  backgroundColor?: string
  shown: boolean
}

const ScreenLoader = ({
  loaderColor,
  backgroundColor,
  shown,
}: Props): JSX.Element => {
  const color = loaderColor || 'white'
  const bgColor = backgroundColor || colors.PRIMARY
  const transition = useRef(new Value(0)).current

  useEffect(() => {
    if (shown) {
      Animated.spring(transition, {
        toValue: 1,
        ...SPRING_CONFIG,
      }).start()
    } else {
      Animated.spring(transition, {
        toValue: 0,
        ...SPRING_CONFIG,
      }).start()
    }
  }, [shown, transition])

  const opacity = Animated.interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, 1],
  })

  return (
    <Animated.View
      pointerEvents={shown ? 'auto' : 'none'}
      style={StyleSheet.flatten([
        styles.container,
        { backgroundColor: bgColor, opacity },
      ])}>
      <ActivityIndicator size="large" color={color} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    zIndex: 2,
  },
})

function propsAreEqual(prevProps: Props, nextProps: Props): boolean {
  return prevProps.shown === nextProps.shown
}

export default memo(ScreenLoader, propsAreEqual)

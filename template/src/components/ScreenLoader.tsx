import React, { memo, useEffect, useRef } from 'react'
import { StyleSheet, ActivityIndicator } from 'react-native'
import Animated, { Value } from 'react-native-reanimated'

import { colors } from '../styles/colors'
import AnimatedWrapper, { SPRING_CONFIG } from './AnimatedWrapper'

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
  const transition = useRef(new Value(Number(shown))).current

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
  return (
    <AnimatedWrapper
      pointerEvents={shown ? 'auto' : 'none'}
      animatedValue={transition}
      type="animatedChange"
      animation="fadeIn"
      style={StyleSheet.flatten([
        styles.container,
        { backgroundColor: bgColor },
      ])}>
      <AnimatedWrapper
        animatedValue={transition}
        type="animatedChange"
        staggerIndex={2}>
        <ActivityIndicator size="large" color={color} />
      </AnimatedWrapper>
    </AnimatedWrapper>
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

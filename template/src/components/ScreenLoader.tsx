import { memo, useEffect, useRef, useState } from 'react'
import Animated, { Value } from 'react-native-reanimated'
import { StyleSheet, ActivityIndicator, ViewProps } from 'react-native'

import AnimatedWrapper, { SPRING_CONFIG } from './AnimatedWrapper'

import { colors } from '../styles/style-guide'

interface PropsType {
  loaderColor?: string
  backgroundColor?: string
  shown: boolean
  testID?: ViewProps['testID']
}

const ScreenLoader = ({ loaderColor, backgroundColor, testID, shown }: PropsType): JSX.Element | null => {
  const color = loaderColor || 'white'
  const bgColor = backgroundColor || colors.PRIMARY
  const transition = useRef(new Value(Number(shown))).current
  // NOTE: This is needed for Detox not go into an infinite loop because of the ongoing loader animation.
  const [shouldRender, setShouldRender] = useState(shown)

  useEffect(() => {
    if (shown) {
      if (!shouldRender) setShouldRender(true)
      Animated.spring(transition, {
        toValue: 1,
        ...SPRING_CONFIG,
      }).start()
    } else {
      Animated.spring(transition, {
        toValue: 0,
        ...SPRING_CONFIG,
      }).start(({ finished }) => {
        if (finished) setShouldRender(false)
      })
    }
  }, [shouldRender, shown, transition])

  if (!shouldRender) return null

  return (
    <AnimatedWrapper
      testID={testID}
      pointerEvents={shown ? 'auto' : 'none'}
      animatedValue={transition}
      type="animatedChange"
      animation="fadeIn"
      style={StyleSheet.flatten([styles.container, { backgroundColor: bgColor }])}>
      <AnimatedWrapper animatedValue={transition} type="animatedChange" staggerIndex={2}>
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

function propsAreEqual(prevProps: PropsType, nextProps: PropsType): boolean {
  return prevProps.shown === nextProps.shown
}

export default memo(ScreenLoader, propsAreEqual)

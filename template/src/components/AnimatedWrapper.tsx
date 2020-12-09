import React, { memo, useRef, useEffect } from 'react'
import { StyleProp, ViewStyle, LayoutChangeEvent } from 'react-native'
import Animated, {
  Value,
  Node,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated'

import size from '../styles/size'
import { useSpringTransition } from 'react-native-redash'

/**
 * @description Used to define the stagger time of each element when using animation type "mount"
 */
const SINGLE_ELEMENT_DELAY = 85
export const SPRING_CONFIG = {
  damping: 80,
  mass: 6,
  stiffness: 350,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
}

interface Props {
  children: JSX.Element | JSX.Element[]
  animation?: 'fadeInUp' | 'fadeInDown' | 'fadeIn'
  type?: 'mount' | 'interpolation' | 'animatedChange' | 'stateChange'
  staggerTime?: number | undefined
  springConfig?: typeof SPRING_CONFIG
  hidden?: boolean
  interpolationValue?: Value<number> | Node<number>
  animatedValue?: Value<number> | Node<number>
  stateValue?: boolean
  staggerIndex?: number
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>
  initialDelay?: number
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto' | undefined
  onLayout?:
    | ((event: LayoutChangeEvent) => void)
    | Animated.Node<((event: LayoutChangeEvent) => void) | undefined>
    | undefined
}

function createPaddingForValue(
  side: 'left' | 'right',
  type: Props['type'],
  staggerIndex: number | undefined,
): number {
  let value = side === 'left' ? 0 : 2

  if (type === 'interpolation' || type === 'animatedChange') {
    const leftPadding = 0.1 * (staggerIndex || 0)
    const rightPadding = Math.min(1.5 + 0.1 * (staggerIndex || 0), 2)

    value = side === 'left' ? leftPadding : rightPadding
  }

  return value
}

function createInputRange(
  type: Props['type'],
  staggerIndex: Props['staggerIndex'],
): number[] {
  return [
    createPaddingForValue('left', type, staggerIndex),
    1,
    createPaddingForValue('right', type, staggerIndex),
  ]
}

function createYValue(
  type: Props['type'],
  animation: Props['animation'],
  animatedValue: Value<number> | Node<number>,
  staggerIndex: Props['staggerIndex'],
): Node<number> {
  switch (animation) {
    case 'fadeInUp':
      return interpolate(animatedValue, {
        inputRange: createInputRange(type, staggerIndex),
        outputRange: [size.verticalScale(100), 0, -size.verticalScale(100)],
      })
    case 'fadeInDown':
      return interpolate(animatedValue, {
        inputRange: createInputRange(type, staggerIndex),
        outputRange: [-size.verticalScale(50), 0, size.verticalScale(50)],
      })

    default:
      return new Value(0)
  }
}

function createOpacityValue(
  type: Props['type'],
  animation: Props['animation'],
  animatedValue: Value<number> | Node<number>,
  staggerIndex: Props['staggerIndex'],
): Node<number> {
  switch (animation) {
    case 'fadeInUp':
      return interpolate(animatedValue, {
        inputRange: createInputRange(type, staggerIndex),
        outputRange: [0, 1, 0],
      })
    case 'fadeInDown':
      return interpolate(animatedValue, {
        inputRange: createInputRange(type, staggerIndex),
        outputRange: [0, 1, 0],
      })
    case 'fadeIn':
      return interpolate(animatedValue, {
        inputRange: createInputRange(type, staggerIndex),
        outputRange: [0, 1, 0],
        extrapolate: Extrapolate.CLAMP,
      })
    default:
      return new Value(1)
  }
}

function createScaleValue(animation: Props['animation']): Node<number> {
  switch (animation) {
    default:
      return new Value(1)
  }
}

function createXValue(animation: Props['animation']): Node<number> {
  switch (animation) {
    default:
      return new Value(0)
  }
}

function getAnimatedValue(
  type: Props['type'],
  mountAnimatedValue: Value<number> | Node<number>,
  interpolationValue?: Value<number> | Node<number>,
  animatedValue?: Value<number> | Node<number>,
  stateAnimatedValue?: Value<number> | Node<number>,
): Value<number> | Node<number> {
  if (type === 'interpolation' && interpolationValue) {
    return interpolationValue
  } else if (type === 'animatedChange' && animatedValue) {
    return animatedValue
  } else if (type === 'stateChange' && stateAnimatedValue) {
    return stateAnimatedValue
  }

  return mountAnimatedValue
}

const AnimateComponent = ({
  children,
  animation = 'fadeInUp',
  interpolationValue,
  animatedValue,
  stateValue = false,
  type = 'mount',
  staggerIndex = 0,
  staggerTime: delay = SINGLE_ELEMENT_DELAY,
  style = {},
  initialDelay = 0,
  onLayout,
}: Props): JSX.Element => {
  const mountAnimatedValue = useRef(new Value(0)).current
  const stateAnimatedValue = useSpringTransition(stateValue, {
    damping: 600,
    mass: 6 + staggerIndex * 1.15 * 7,
    stiffness: 1000,
    overshootClamping: false,
    restDisplacementThreshold: 0.001,
    restSpeedThreshold: 0.001,
  })

  useEffect(() => {
    let timer: number | undefined

    if (type === 'mount') {
      timer = window.setTimeout(() => {
        Animated.spring(mountAnimatedValue, {
          toValue: 1,
          ...SPRING_CONFIG,
        }).start()
      }, staggerIndex * delay + initialDelay)
    }
    return (): void => clearTimeout(timer)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const animatedValueToUse = getAnimatedValue(
    type,
    mountAnimatedValue,
    interpolationValue,
    animatedValue,
    stateAnimatedValue,
  )

  const translateY = createYValue(
    type,
    animation,
    animatedValueToUse,
    staggerIndex,
  )

  const translateX = createXValue(animation)
  const scale = createScaleValue(animation)
  const opacity = createOpacityValue(
    type,
    animation,
    animatedValueToUse,
    staggerIndex,
  )

  return (
    <Animated.View
      style={[
        style,
        { opacity, transform: [{ translateY }, { translateX }, { scale }] },
      ]}
      onLayout={onLayout}>
      {children}
    </Animated.View>
  )
}

export default memo(AnimateComponent)

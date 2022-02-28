import type { StyleProp, ViewStyle } from 'react-native'
import React, { memo, PropsWithChildren, useEffect, useState } from 'react'
import Animated, { useAnimatedStyle, withDelay, withSpring } from 'react-native-reanimated'

export const SPRING_CONFIG = {
  damping: 50,
  mass: 2,
  stiffness: 350,
  overshootClamping: false,
  restDisplacementThreshold: 0.001,
  restSpeedThreshold: 0.001,
}

export const STAGGER_DELAY = 85

interface AnimatedWrapperPropsType {
  testID?: ViewStyle['testID']
  hideDirection?: 'up' | 'down'
  isVisible?: boolean | undefined
  staggerIndex?: number | undefined
  backStaggerIndex?: number | undefined
  style?: StyleProp<Animated.AnimateStyle<ViewStyle>>
}

const AnimatedWrapper = ({
  testID,
  children,
  isVisible,
  hideDirection = 'up',
  staggerIndex = 0,
  backStaggerIndex = 0,
  style = {},
}: PropsWithChildren<AnimatedWrapperPropsType>): JSX.Element => {
  // NOTE: Using a state to control the animation on mount when no isVisible is provided
  const [visibilityState, setVisibilityState] = useState(isVisible)

  useEffect(() => {
    if (typeof isVisible === 'undefined') {
      setVisibilityState(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const visibility = visibilityState || isVisible

  const animatedStyles = useAnimatedStyle(() => {
    const direction = hideDirection === 'up' ? -100 : 100

    return {
      opacity: withSpring(
        withDelay(Number(visibility), STAGGER_DELAY * (visibility ? staggerIndex : backStaggerIndex)),
        SPRING_CONFIG,
      ),
      transform: [
        {
          translateY: withSpring(
            withDelay(visibility ? 0 : direction, STAGGER_DELAY * (visibility ? staggerIndex : backStaggerIndex)),
            SPRING_CONFIG,
          ),
        },
      ],
    }
  })

  return (
    <Animated.View
      testID={testID}
      style={[animatedStyles, style]}
      pointerEvents={isVisible || typeof isVisible === 'undefined' ? 'auto' : 'none'}>
      {children}
    </Animated.View>
  )
}

export default memo(AnimatedWrapper)

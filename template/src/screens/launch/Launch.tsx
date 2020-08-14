import React, { useEffect } from 'react'
import { View, StyleSheet } from 'react-native'

import useRehydrate from '../../hooks/useRehydrate'
import {
  LaunchStackRouteType,
  LaunchStackType,
  SWITCH_NAVIGATION_STATES,
} from '../../types/navigation-types'

interface Props {
  navigation: LaunchStackType<'Launch'>
  route: LaunchStackRouteType<'Launch'>
}

const Launch = ({ route }: Props): JSX.Element => {
  // Handles switch navigation in the parent
  const { setNavigationState } = route.params

  // Hydrating the store
  const isRehydrated = useRehydrate()

  useEffect(() => {
    // When rehydrated we navigate to app
    if (isRehydrated) {
      setNavigationState(SWITCH_NAVIGATION_STATES.APP)
    }
  }, [isRehydrated])

  return <View style={styles.container} />
}

export default Launch

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
